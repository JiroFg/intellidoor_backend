import { Router } from 'express'
import postAuth from '../controllers/auth.controller.js'
//se crea un enrutador para la autenticación
const authRouter = Router()
//solo se utiliza el metodo post
authRouter.post('', postAuth)//OK

export default authRouter