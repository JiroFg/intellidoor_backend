import { Router } from 'express'
import { closeDoor, openDoor } from '../controllers/door.controller.js'

const doorRouter = Router()

doorRouter.get('/:id', openDoor)
doorRouter.delete('/:id', closeDoor)

export default doorRouter