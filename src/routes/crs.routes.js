import { Router } from 'express'
import { deleteClassrooms, getClassroom, getClassrooms, patchClassrooms, postClassrooms } from '../controllers/crs.controller.js'

const crsRouter = Router()

crsRouter.get('', getClassrooms)//OK
crsRouter.get('/:id', getClassroom)
crsRouter.post('', postClassrooms)//OK
crsRouter.patch('/:id', patchClassrooms)//OK
crsRouter.delete('/:id', deleteClassrooms)//OK

export default crsRouter