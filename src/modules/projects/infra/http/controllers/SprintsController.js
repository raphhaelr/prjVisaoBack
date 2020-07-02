const { createSprint } = require('../../../services/CreateSprintService')
const { findSprintsByStepID } = require('../../../services/ListSprintsFromStep')
const { updateSprint } = require('../../../services/UpdateSprintService')
const { findSprintsOfProject, findOne } = require('../../../services/ListAllSprintsService')
const { deleteSprint } = require('../../../services/DeleteSprintService')


module.exports = {
    async create(request, response) {
    
        const {
            name,
            description,
            start_date,
            end_date,
            id_step
        } = request.body

 
        const sprint = await createSprint({
            name,
            description,
            start_date,
            end_date,
            id_step,
        })

        return response.json(sprint)
    },

    async index(request, response) {
        const { id_step } = request.params

        const sprints = await findSprintsByStepID({ id_step })

        return response.json(sprints)
    },

    async update(request, response) {
        const { id } = request.params

        const { name, description, status, start_date, end_date } = request.body

        const sprint = await updateSprint({
            id,
            name,
            description,
            status,
            start_date,
            end_date
        })

        return response.json(sprint)
    },

    async deleteOne(request, response) {
        const { id } = request.params

        const sprint = await deleteSprint({
            id
        })

        return response.json(sprint)
    },

    async findSprints(request, response) {
        const { id_project } = request.params

        const sprints = await findSprintsOfProject({
            id_project
        })

        return response.json(sprints)
    },
    

    async findOneSprint(request, response) {
        const { id } = request.params
        
        const sprint = await findOne({
            id
        })

        return response.json(sprint)
    }
}