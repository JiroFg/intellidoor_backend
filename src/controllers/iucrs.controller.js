import { pool } from "../db/db.js";
import verifyAuth from "../helpers/verify-auth.js";

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

const getInuseclassroomByUserId = async (req, res) => {
  try {
    //comprueba el header con el token de authorización
    verifyAuth(req.headers.authorization);
    const [rows] = await pool.query(
      `SELECT * FROM inuseclassrooms WHERE userId = ?`,
      [req.params.userId]
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
      `SELECT * FROM inuseclassrooms WHERE crId = ? AND time = ?`,
      [crId, time]
    );
    //si se encuentra algun elemento devuelve un error 409
    console.log(exists[0]);
    console.log(exists[0].length);
    if (exists[0].length > 0) {
      return res.status(200).json({ message: "Classroom in use" });
    } else {
      //si no se encuentra procede a hacer la inserción
      const [rows] = await pool.query(
        `INSERT INTO inuseclassrooms VALUES (null, ?, ?, ?)`,
        [crId, userId, time]
      );
      //finalmente devuelve un estatus 200 si todo salio bien
      return res.status(200).send(rows);
    }
  } catch (error) {
    //si se cacha algun error devuelve el estatus 500
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
    if (result.affectedRows <= 0)
      return res.status(404).json({ message: "User not found" });
    //si se realizo correctamente la inserción devuelve un estatus 200
    closeDoor(req.params.id);
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
  getInuseclassroomByUserId,
  postInuseclassrooms,
  deleteInuseclassrooms,
};
