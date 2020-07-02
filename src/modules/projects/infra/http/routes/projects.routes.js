const express = require('express')
const projectsController = require('../controllers/ProjectsController')
const stepsController = require('../controllers/StepsController')
const sprintsController = require('../controllers/SprintsController')
const { ensureAuthenticated } = require('../../../../users/infra/http/middlewares/ensureAuthenticated')

const projectsRouter = express.Router()

projectsRouter.use(ensureAuthenticated)

projectsRouter.get('/', projectsController.index)
projectsRouter.get('/name', projectsController.findProjectsByNameWithLike)

projectsRouter.get('/:id', projectsController.findProject)
projectsRouter.post('/', projectsController.create)
projectsRouter.put('/:id', projectsController.update)
projectsRouter.delete('/delete/:id', projectsController.deleteOne)

projectsRouter.get('/steps/:id_project', stepsController.index)
projectsRouter.get('/steps/find/:id', stepsController.findOne)
projectsRouter.post('/steps', stepsController.create)
projectsRouter.delete('/steps/delete/:id', stepsController.deleteOne)
projectsRouter.put('/steps/update/:id', stepsController.update)

projectsRouter.put('/steps/update/:id', stepsController.update)
projectsRouter.put('/steps/update/status/:id', stepsController.updateStatus)

projectsRouter.get('/sprints/find/:id', sprintsController.findOneSprint)
projectsRouter.get('/sprints/:id_project', sprintsController.findSprints)
projectsRouter.get('/steps/sprints/:id_step', sprintsController.index)

projectsRouter.post('/steps/sprints', sprintsController.create)
projectsRouter.put('/sprints/update/:id', sprintsController.update)
projectsRouter.delete('/steps/sprints/delete/:id', sprintsController.deleteOne)

module.exports = projectsRouter
