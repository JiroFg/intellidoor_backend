import { Router } from 'express'
import { deleteClassrooms, getClassroom, getClassrooms, patchClassrooms, postClassrooms } from '../controllers/crs.controller.js'
//se crea un enrutador para los classrooms
const crsRouter = Router()
//se hace un crud con los respectivos verbos HTTP
crsRouter.get('', getClassrooms)//OK
crsRouter.get('/:id', getClassroom)
crsRouter.post('', postClassrooms)//OK
crsRouter.patch('/:id', patchClassrooms)//OK
crsRouter.delete('/:id', deleteClassrooms)//OK

export default crsRouter