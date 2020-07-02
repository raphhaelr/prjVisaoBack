const connection = require('../../../database/connection')

module.exports = {
    async deleteStep({ id }) {
        const verifyStepExists = await connection('steps')
            .select('*')
            .where('id', id)

        if(verifyStepExists.length === 0){
            throw new Error('This step not exists.')
        }

        await connection('steps').del().where('id', id)

        return id
    }
}