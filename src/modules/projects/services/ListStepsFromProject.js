const connection = require('../../../database/connection')


module.exports = {
    async findStepsByProjectID({ id_project }) {
       
        const verifyProjectExists = await connection('projects')
            .select('*')
            .where('id', id_project)
        
        if (verifyProjectExists.length === 0) {
            throw new Error('This project not exists.')
        }

        const steps = await connection('steps')
            .select('*',)
            .where('id_project', id_project)

        return steps
    },

    async findStep({ id }) {
      
        const verifyProjectExists = await connection('steps')
            .select('*')
            .where('id', id)
        
        if (verifyProjectExists.length === 0) {
            throw new Error('This step not exists.')
        }

        const step = await connection('steps')
            .select('*',)
            .where('id', id)

        return step
    }

}