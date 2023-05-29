import { KEY } from "../config/config.js";
import jwt from "jsonwebtoken";

const verifyAuth = (token) => {
  if(!token) throw new Error();
  const parts = token.split('.')
  if(parts.length !== 3) throw new Error();
  const payload = jwt.verify(token, KEY);
  if (Date.now() > payload.exp) throw new Error();
}

export default verifyAuth
