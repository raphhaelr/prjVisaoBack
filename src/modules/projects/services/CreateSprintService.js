const { uuid } = require('uuidv4')
const connection = require('../../../database/connection')

module.exports = {
    async createSprint({ name, description, start_date, end_date, id_step }) {

        const verifyStepExists = await connection('steps')
            .select('*')
            .where('id', id_step)

        if (verifyStepExists.length === 0) {
            throw new Error('This step not exists')
        }

        const newSprint = {
            id: uuid(),
            name,
            description,
            status: '',
            start_date,
            end_date,
            id_step
        }

        const sprint = await connection('sprints')
            .insert(newSprint)
            .returning('*')

        return sprint
    }
}