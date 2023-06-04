import { KEY } from "../config/config.js";
import jwt from "jsonwebtoken";
//esta función recibe el token y verifica que este bien estructurado, posteriormente utiliza la función verify para verificar si este token fue creado por este servicio web o es falso
const verifyAuth = (token) => {
  if(!token) throw new Error();
  const parts = token.split('.')
  if(parts.length !== 3) throw new Error();
  const payload = jwt.verify(token, KEY);
  if (Date.now() > payload.exp) throw new Error();
}

export default verifyAuth
