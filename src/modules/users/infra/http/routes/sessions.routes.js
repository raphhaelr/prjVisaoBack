const express = require('express')
const sessionsController = require('../controllers/SessionsController')

const sessionsRouter = express.Router()


sessionsRouter.post('/', sessionsController.create)

module.exports  = sessionsRouter