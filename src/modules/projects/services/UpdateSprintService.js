const connection = require('../../../database/connection')


module.exports = {
    async updateSprint({ id, name, description, status, start_date, end_date }) {

        const verifySprintExists = await connection('sprints')
            .select('*')
            .where('id', id)

        if (verifySprintExists.length === 0) {
            throw new Error('This sprint not exists.')
        }

        const sprint = await connection('sprints')
            .update({ name, description, status, start_date, end_date })
            .where('id', id)
            .returning('*')

        return sprint
    }
}