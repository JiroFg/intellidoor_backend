import { pool } from "../db/db.js";
import verifyAuth from "../helpers/verify-auth.js";

// función get para obtener todos los usuarios
const getUsers = async (req, res) => {
  try {
    //comprueba el header con el token de authorización
    verifyAuth(req.headers.authorization);
    //se realiza la consulta a la base de datos
    const [rows] = await pool.query(`SELECT * FROM users`);
    //se devuelven todas las tuplas obtenidas
    res.status(200).send(rows);
  } catch (error) {
    //si se cacha algun error devuelve un estatus 500
    return res.status(500).json({
      message: "Something goes wrong",
    });
  }
};

// función para obtener al usuario en especifico
const getUser = async (req, res) => {
  try {
    //comprueba el header con el token de authorización
    verifyAuth(req.headers.authorization);
    //se realiza la consulta a la base de datos utilizando el parametro ID
    const [rows] = await pool.query(`SELECT * FROM users WHERE id =`, [
      req.params.id,
    ]);
    //si no se devuelve ninguna tupla se manda un estatus 400
    if (rows.length <= 0)
      return res.status(400).json({ message: "User not found" });
    //si se encontro se devuelve la tupla
    res.status(200).send(rows[0]);
  } catch (error) {
    //Si se cacha un error devuelve un estatus 500
    return res.status(500).json({
      message: "Something goes wrong",
    });
  }
};

//función para crear un nuevo usuario
const postUsers = async (req, res) => {
  try {
    //comprueba el header con el token de authorización
    verifyAuth(req.headers.authorization);
    //se toman los valores del body
    const { name, email, password, admin } = req.body;
    //se comprueba que no exista ya un elemento con ese email
    const exists = await pool.query(`SELECT * FROM users WHERE email = ?`, [
      email,
    ]);
    //si se encuentra algun elemento devuelve un error 409
    if (exists[0].length > 0)
      return res.status(409).json({ message: "Existing user" });
    //si no se encuentra procede a hacer la inserción
    const [rows] = await pool.query(
      `INSERT INTO users VALUES (null, ?, ?, ?, ?)`,
      [name, email, password, admin]
    );
    //finalmente devuelve un estatus 200
    res.status(200).send(rows);
  } catch (error) {
    //si se cacha algun error devuelve un estatus 500
    return res.status(500).json({
      message: "Something goes wrong",
    });
  }
};

//función para modificar un usuario
const patchUsers = async (req, res) => {
  try {
    //comprueba el header con el token de authorización
    verifyAuth(req.headers.authorization);
    //se obtiene el id de los parametros
    const { id } = req.params;
    //se obtienen los valores del body
    const { name, email, password, admin } = req.body;
    //se realiza la actualización, si algun atributo no es mandado en el body se deja el que ya esta
    const [result] = await pool.query(
      `UPDATE users SET name = IFNULL(?, name), email = IFNULL(?, email), password = IFNULL(?, password), admin = IFNULL(?, admin) WHERE id = ?`,
      [name, email, password, admin, id]
    );
    //si no se afecto ninguna tupla se devuelve un estatus 404
    if (result.affectedRows == 0)
      return res.status(404).json({ message: "User not found" });
    //si se realizo con exito devuelve un estatus 200
    res.status(200).send(result);
  } catch (error) {
    //si se cacha algun error devuelve un estatus 500
    return res.status(500).json({
      message: "Something goes wrong"
    });
  }
};

//función para eliminar un usuario
const deleteUsers = async (req, res) => {
  try {
    //comprueba el header con el token de authorización
    verifyAuth(req.headers.authorization);
    //se realiza la eliminación en la base de datos
    const [result] = await pool.query(`DELETE FROM users WHERE id = ?`, [
      req.params.id
    ]);
    //si no se afecto ninguna tupla devuelve un error 404
    if (result.affectedRows <= 0)
      return res.status(404).json({ message: "User not found" });
    //si se realizo correctamente la inserción devuelve un estatus 200
    res.status(200).send(result);
  } catch (error) {
    //si se cacha algun error se devuelve un estatus 500
    return res.status(500).json({
      message: "Something goes wrong"
    });
  }
};

export { getUsers, postUsers, patchUsers, deleteUsers, getUser };
