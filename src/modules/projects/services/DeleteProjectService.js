const connection = require('../../../database/connection')

module.exports = {
    async deleteProject({ id }) {
        const verifyProjectExists = await connection('projects')
            .select('*')
            .where('id', id)

        if(verifyProjectExists.length === 0){
            throw new Error('This project not exists.')
        }

        await connection('projects').del().where('id', id)

        return id
    }
}