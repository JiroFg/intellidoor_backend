import { Router } from 'express'
import { deleteUsers, getUser, getUsers, postUsers, patchUsers } from '../controllers/users.controller.js'

const usersRouter = Router()

usersRouter.get('', getUsers)
usersRouter.get('/:id', getUser)
usersRouter.post('', postUsers)
usersRouter.patch('/:id', patchUsers)
usersRouter.delete('/:id', deleteUsers)

export default usersRouter