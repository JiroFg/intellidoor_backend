import { pool } from "../db/db.js";
import jwt from 'jsonwebtoken'
import { KEY } from "../config/config.js";

const postAuth = async (req, res) =>{
  try{
  const { email, password } = req.body
  const exists = await pool.query(`SELECT * FROM users WHERE email = ? AND password = ?`, [email, password])
  if(exists[0].length === 0) return res.sendStatus(401)
  const token = jwt.sign({
    email,
    password,
    exp: Date.now() + (60*1000*60)
  }, KEY)
  res.send({token})
  }catch(error){
    return res.sendStatus(401)
  }
}

export default postAuth