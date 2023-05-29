import { Router } from 'express'
import { deleteClassrooms, getClassroom, getClassrooms, patchClassrooms, postClassrooms } from '../controllers/crs.controller.js'

const crsRouter = Router()

crsRouter.get('', getClassrooms)
crsRouter.get('/:id', getClassroom)
crsRouter.post('', postClassrooms)
crsRouter.patch('/:id', patchClassrooms)
crsRouter.delete('/:id', deleteClassrooms)

export default crsRouter