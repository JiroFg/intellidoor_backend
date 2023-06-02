import { pool } from "../db/db.js";
import jwt from 'jsonwebtoken'
import { KEY } from "../config/config.js";

const postAuth = async (req, res) =>{
  try{
  const { email, password } = req.body
  const exists = await pool.query(`SELECT * FROM users WHERE email = ? AND password = ?`, [email, password])
  if(exists[0].length === 0) return res.sendStatus(401)
  const [user] = exists[0]
  const id = user.id
  const name = user.name
  const admin = user.admin
  const token = jwt.sign({
    id,
    name,
    email,
    admin,
    exp: Date.now() + (60*1000*60*2)
  }, KEY)
  res.send([{token},{"admin":admin}])
  }catch(error){
    return res.sendStatus(401)
  }
}

export default postAuth