import { pool } from "../db/db.js";
import verifyAuth from "../helpers/verify-auth.js";
import mqtt from "mqtt";

const getInuseclassrooms = async (req, res) => {
  try {
    verifyAuth(req.headers.authorization);
    const [rows] = await pool.query(`SELECT * FROM inuseclassrooms`);
    res.status(200).send(rows);
  } catch (error) {
    return res.status(500).json({
      message: "Something goes wrong",
    });
  }
};

const getInuseclassroom = async (req, res) => {
  try {
    //comprueba el header con el token de authorización
    verifyAuth(req.headers.authorization);
    const [rows] = await pool.query(
      `SELECT * FROM inuseclassrooms WHERE id = ?`,
      [req.params.id]
    );
    if (rows.length <= 0)
      return res.status(400).json({ message: "Classroom is not in use" });
    res.status(200).send(rows[0]);
  } catch (error) {
    //Si se cacha un error devuelve un estatus 500
    return res.status(500).json({
      message: "Something goes wrong",
    });
  }
};

const postInuseclassrooms = async (req, res) => {
  try {
    //comprueba el header con el token de authorización
    verifyAuth(req.headers.authorization);
    //se toman los valores del body
    const { crId, userId, time } = req.body;
    //se comprueba que no exista ya un elemento con ese ID de classroom
    const exists = await pool.query(
      `SELECT * FROM inuseclassrooms WHERE crId = ?`,
      [crId]
    );
    //si se encuentra algun elemento devuelve un error 409
    if (exists[0].length > 0)
      return res.status(409).json({ message: "Classroom in use" });
    //si no se encuentra procede a hacer la inserción
    const [rows] = await pool.query(
      `INSERT INTO inuseclassrooms VALUES (null, ?, ?, ?)`,
      [crId, userId, time]
    );
    //abrir el chunche 
    openDoor(crId)
    //finalmente devuelve un estatus 200 si todo salio bien
    res.status(200).send(rows);
  } catch (error) {
    //si se cacha algun error devuelve el estatus 500
    return res.status(500).json({
      message: "Something goes wrong",
    });
  }
};

//función para mandar mensaje al broker de la puerta que se desea abrir
function openDoor(message){
  const client = mqtt.connect("mqtt://test.mosquitto.org");

  client.on("connect", function () {
    client.subscribe("TecoUV/Intellidoor/Classrooms", function (err) {
      if (!err) {
        client.publish("TecoUV/Intellidoor/Classrooms", message.toString()+" 1");
        console.log("se abrio la puerta")
      }
    });
  });

  client.on("message", function (topic, message) {
    console.log(message.toString());
    client.end();
  });
}

//función para mandar mensaje al broker de la puerta que se desea cerrar
function closeDoor(message){
  const client = mqtt.connect("mqtt://test.mosquitto.org");

  client.on("connect", function () {
    client.subscribe("TecoUV/Intellidoor/Classrooms", function (err) {
      if (!err) {
        client.publish("TecoUV/Intellidoor/Classrooms", message.toString()+" 0");
        console.log("se cerror la puerta")
      }
    });
  });

  client.on("message", function (topic, message) {
    console.log(message.toString());
    client.end();
  });
}

const patchInuseclassrooms = async (req, res) => {
  try {
    //comprueba el header con el token de autorización
    verifyAuth(req.headers.authorization);
    //se obtiene el ide de los parametros
    const { id } = req.params;
    //se obtienen los valores del body
    const { crId, userId, time } = req.body;
    //se realiza la actualización, si algun atributo no es mandado se deja el que ya esta en la tupla
    const [result] = await pool.query(
      `UPDATE inuseclassrooms SET crId = IFNULL(?, crId), userId = IFNULL(?, userId), time = IFNULL(?, time) WHERE id = ?`,
      [crId, userId, time, id]
    );
    //si no se afecto ninguna tupla se devuelve un estatus 404
    if (result.affectedRows == 0)
      return res.status(404).json({ message: "Classroom is not in use" });
    //si se realizo con exito devuelve un estatus 200
    res.status(200).send(result);
  } catch (error) {
    //si se cacha algun error devuelve un estatus 500
    return res.status(500).json({
      message: "Something goes wrong",
    });
  }
};

const deleteInuseclassrooms = async (req, res) => {
  try {
    //comprueba el header con el token de autorización
    verifyAuth(req.headers.authorization);
    //se realiza la eliminación en la base de datos
    const [result] = await pool.query(
      `DELETE FROM inuseclassrooms WHERE id = ?`,
      [req.params.id]
    );
    //si no se afecto ninguna tupla se devuelve un error 404
    if(result.affectedRows <= 0) return res.status(404).json({message: "User not found"});
    //si se realizo correctamente la inserción devuelve un estatus 200
    closeDoor(req.params.id)
    res.status(200).send(result);
  } catch (error) {
    //si se cacha algun error se devuelve un estatus 500
    return res.status(500).json({
      message: "Something goes wrong",
    });
  }
};

export {
  getInuseclassrooms,
  getInuseclassroom,
  postInuseclassrooms,
  patchInuseclassrooms,
  deleteInuseclassrooms,
};
