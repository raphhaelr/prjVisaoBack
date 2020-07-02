const connection = require('../../../database/connection')

module.exports = {
    async deleteSprint({ id }) {
        const verifySprintExists = await connection('sprints')
            .select('*')
            .where('id', id)

        if(verifySprintExists.length === 0){
            throw new Error('This sprint not exists.')
        }

        await connection('sprints').del().where('id', id)

        return id
    }
}