const express = require('express')
const usersController = require('../controllers/UsersController')

const usersRouter = express.Router()

usersRouter.get('/', usersController.index)
usersRouter.get('/:id', usersController.findUserById)
usersRouter.get('/type/:id', usersController.findTypeOfUser)
usersRouter.post('/', usersController.create)
usersRouter.put('/update/:id', usersController.update)
usersRouter.delete('/delete/:id', usersController.deleteOne)

module.exports  = usersRouter