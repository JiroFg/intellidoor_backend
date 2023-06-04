import { pool } from "../db/db.js";
import jwt from 'jsonwebtoken'
import { KEY } from "../config/config.js";

const postAuth = async (req, res) =>{
  try{
  //primero se extran los datos del JSON que vienen en el body de la request
  const { email, password } = req.body
  //se consulta en la base de datos si los datos enviados coinciden
  const exists = await pool.query(`SELECT * FROM users WHERE email = ? AND password = ?`, [email, password])
  //si no se encontro coincidencia se retorna el error 401 que es unauthorized
  if(exists[0].length === 0) return res.sendStatus(401)
  //si se encontro saca del arreglo el elemento
  const [user] = exists[0]
  //se extraen los datos
  const id = user.id
  const name = user.name
  const admin = user.admin
  //se utilizan los datos para crear un nuevo token
  const token = jwt.sign({
    id,
    name,
    email,
    admin,
    exp: Date.now() + (60*1000*60*2)
  }, KEY)
  //se manda el token al cliente
  res.send([{token},{"admin":admin}])
  }catch(error){
    return res.sendStatus(401)
  }
}

export default postAuth