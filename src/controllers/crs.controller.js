import { pool } from "../db/db.js";
import verifyAuth from "../helpers/verify-auth.js";
//obtener todas las aulas
const getClassrooms = async (req, res) => {
  try {
    //verifica que la autorización sea valida
    verifyAuth(req.headers.authorization);
    //realiza la consulta a la base de datos
    const [rows] = await pool.query(`SELECT * FROM classrooms`);
    //devuelve las tuplas obtenidas
    res.status(200).send(rows);
  } catch (error) {
    return res.sendStatus(401);
  }
};

const getClassroom = async (req, res) => {
  try {
    //verifica que la autorización sea valida
    verifyAuth(req.headers.authorization);
    //realiza la consulta a la base de datos tomando el parametro ID
    const [rows] = await pool.query(`SELECT * FROM classrooms WHERE id = ?`
    ,[
      req.params.id,
    ]);
    //si no se devuelve ninguna tupla entonces ese elemento no existe
    console.log(rows + " size "+ rows.length)
    if (rows.length <= 0)
      return res.status(400).json({ message: "Classroom not found" });
    //si lo encuentra devuelve la tupla
    res.status(200).send(rows[0]);
  } catch (error) {
    //si se cacha un error devuelve un estatus 500
    return res.status(500).json({
      message: "Something goes wrong",
    });
  }
};

const postClassrooms = async (req, res) => {
  try {
    //verifica que la autorización sea valida
    verifyAuth(req.headers.authorization);
    //se obtienen los valores del body
    const { num } = req.body;
    //se comprueba si ya existe un elemento con ese valor
    const exists = await pool.query(`SELECT * FROM classrooms WHERE num = ?`
    ,[
      num,
    ]);
    //si existe devuelve un error 409
    if (exists[0].length > 0)
      return res.status(409).json({ message: "Existing classroom" });
    //si no existe procede a hacer la inserción a la base de datos
    const [rows] = await pool.query(`INSERT INTO classrooms VALUES (null, ?)`, [
      num,
    ]);
    //devuelve las tuplas afectadas
    res.status(200).send(rows);
  } catch (error) {
    //si cacha algun error devuelve un estatus 500
    return res.status(500).json({
      message: "Something goes wrong",
    });
  }
};

const patchClassrooms = async (req, res) => {
  try {
    //verifica que la autorización sea valida
    verifyAuth(req.headers.authorization);
    //se obtiene el id de los parametros
    const { id } = req.params;
    //se obtiene el valor del body
    const { num } = req.body;
    //se actualiza el elemento en la tabla
    const [result] = await pool.query(
      `UPDATE classrooms SET num = ? WHERE id = ?`,
      [num, id]
    );
    //si ninguna tupla se vio afectada devuelve un estatus 404
    if(result.affectedRows == 0) return res.status(404).json({ message: "Classroom not found"});
    //si se realizo bien la actualización devuelve un estatus 200
    res.status(200).send(result)
  } catch (error) {
    //si se cacha algun error devuelve un estatus 500
    return res.status(500).json({
      message: "Something goes wrong"
    })
  }
};

const deleteClassrooms = async (req, res) => {
  try{
    //verifica que la autorización sea valida
    verifyAuth(req.headers.authorization);
    //se realiza la eliminación del elemento en la base de datos
    const [result] = await pool.query(`DELETE FROM classrooms WHERE id = ?`, [req.params.id])
    //si ninguna tupla se vio afectada devuelve un estatus 404
    if(result.affectedRows<=0) return res.status(404).json({message: "Classroom not found"})
    //si el eliminiación se realizo con exito devuelve un estatus 200
    res.status(200).send(result);
  }catch(error){
    //si se cacha algun error devuelve un estatus 500
    return res.status(500).json({
      message: "Somethign goes wrong"
    })
  }
}

export {
  getClassrooms,
  getClassroom,
  postClassrooms,
  patchClassrooms,
  deleteClassrooms,
};
