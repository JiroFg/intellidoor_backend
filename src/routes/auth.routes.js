import { Router } from 'express'
import postAuth from '../controllers/auth.controller.js'

const authRouter = Router()

authRouter.post('', postAuth)//OK

export default authRouter