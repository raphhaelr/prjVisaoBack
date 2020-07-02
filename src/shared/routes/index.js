const express = require('express')
const routes = express.Router()

const usersRouter = require('../../modules/users/infra/http/routes/users.routes')
const sessionsRouter = require('../../modules/users/infra/http/routes/sessions.routes')
const projectsRouter = require('../../modules/projects/infra/http/routes/projects.routes')

routes.use('/users', usersRouter)
routes.use('/sessions', sessionsRouter)
routes.use('/projects', projectsRouter)

module.exports = routes