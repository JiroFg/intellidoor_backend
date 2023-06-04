import { Router } from 'express'
import { closeDoor, openDoor } from '../controllers/door.controller.js'
//se crea un enrutador para las puertas 
const doorRouter = Router()
//get abre la puerta y delete la cierra
doorRouter.get('/:id', openDoor)
doorRouter.delete('/:id', closeDoor)

export default doorRouter