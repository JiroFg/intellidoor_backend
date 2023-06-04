import { Router } from 'express'
import { deleteInuseclassrooms, getInuseclassrooms, postInuseclassrooms, getInuseclassroomByUserId } from '../controllers/iucrs.controller.js'
//se crea un enrutador para las aulas en uso
const iucrsRouter = Router()
//dispone casi de un crud, sin la opción de actualizar, ya que no es necesario para nuestro proyecto
iucrsRouter.get('', getInuseclassrooms)//OK
iucrsRouter.get('/:userId', getInuseclassroomByUserId)//OK
iucrsRouter.post('', postInuseclassrooms)//OK
iucrsRouter.delete('/:id', deleteInuseclassrooms)//OK

export default iucrsRouter