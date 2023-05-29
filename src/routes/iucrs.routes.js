import { Router } from 'express'
import { deleteInuseclassrooms, getInuseclassrooms, patchInuseclassrooms, postInuseclassrooms, getInuseclassroom } from '../controllers/iucrs.controller.js'

const iucrsRouter = Router()

iucrsRouter.get('', getInuseclassrooms)
iucrsRouter.get('/:id', getInuseclassroom)
iucrsRouter.post('', postInuseclassrooms)
iucrsRouter.patch('/:id', patchInuseclassrooms)
iucrsRouter.delete('/:id', deleteInuseclassrooms)

export default iucrsRouter