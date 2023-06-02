import { Router } from 'express'
import root from '../controllers/root.controller.js'

const rootRouter = Router()

rootRouter.get('', root)

export default rootRouter;