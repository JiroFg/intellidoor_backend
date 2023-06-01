import { Router } from 'express'
import { deleteInuseclassrooms, getInuseclassrooms, postInuseclassrooms, getInuseclassroomByUserId } from '../controllers/iucrs.controller.js'

const iucrsRouter = Router()

iucrsRouter.get('', getInuseclassrooms)//OK
iucrsRouter.get('/:userId', getInuseclassroomByUserId)//OK
iucrsRouter.post('', postInuseclassrooms)//OK
iucrsRouter.delete('/:id', deleteInuseclassrooms)//OK

export default iucrsRouter