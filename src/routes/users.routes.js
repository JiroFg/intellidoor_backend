import { Router } from 'express'
import { deleteUsers, getUser, getUsers, postUsers, patchUsers } from '../controllers/users.controller.js'
//se crea un enrutador para los usuarios
const usersRouter = Router()
//se crea un crud con los verbos http
usersRouter.get('', getUsers)//OK
usersRouter.get('/:id', getUser)//OK
usersRouter.post('', postUsers)//OK
usersRouter.patch('/:id', patchUsers)//OK
usersRouter.delete('/:id', deleteUsers)//OK

export default usersRouter