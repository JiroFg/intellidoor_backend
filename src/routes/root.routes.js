import { Router } from 'express'
import root from '../controllers/root.controller.js'
//se crea un enrutador para la raiz
const rootRouter = Router()
//este solo tiene un get que devuelve un esquema para saber a grandes rasgo como esta constituido el API
rootRouter.get('', root)

export default rootRouter;