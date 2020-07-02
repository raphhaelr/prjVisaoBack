const { createStep } = require('../../../services/CreateStepService')
const { findStepsByProjectID, findStep } = require('../../../services/ListStepsFromProject')
const { updateStep, updateStepStatus } = require('../../../services/UpdateStepService')
const { deleteStep } = require('../../../services/DeleteStepService')


module.exports = {
    async create(request, response) {

        const {
            name,
            id_project,
        } = request.body

        const step = await createStep({
            name,
            id_project,
        })

        return response.json(step)
    },

    async index(request, response) {
        const { id_project } = request.params
       
        const steps = await findStepsByProjectID({ id_project })

        return response.json(steps)
    },

    async update(request, response) {
        const { id } = request.params

        const { name, status } = request.body

        const step = await updateStep({ id, name, status })

        return response.json(step)
    },

    async deleteOne(request, response) {
        const { id } = request.params

        const step = await deleteStep({
            id
        })

        return response.json(step)
    },

    async findOne(request, response) {
        const { id } = request.params

        const step = await findStep({
            id
        })

        return response.json(step)
    },

    async updateStatus(request, response) {
        const { id } = request.params
        const { status } = request.body

        const step = await updateStepStatus({ id, status })

        return response.json(step)
    }

}