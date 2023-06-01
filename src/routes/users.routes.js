import { Router } from 'express'
import { deleteUsers, getUser, getUsers, postUsers, patchUsers } from '../controllers/users.controller.js'

const usersRouter = Router()

usersRouter.get('', getUsers)//OK
usersRouter.get('/:id', getUser)//OK
usersRouter.post('', postUsers)//OK
usersRouter.patch('/:id', patchUsers)//OK
usersRouter.delete('/:id', deleteUsers)//OK

export default usersRouter