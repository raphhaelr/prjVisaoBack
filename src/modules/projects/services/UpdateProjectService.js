const connection = require('../../../database/connection')


module.exports = {
    async updateProject({ id, name, customer_name, description, start_date, end_date }) {
     
        const verifyProjectExists = await connection('projects')
            .select('*')
            .where('id', id)

        if (verifyProjectExists.length === 0) {
            throw new Error('This project not exists.')
        }

        const verifyProjectNewNameExists = await connection('projects')
            .select('*')
            .where('name', name)
            .andWhereNot('id', id)

        if(verifyProjectNewNameExists.length > 0){
            throw new Error('This project name is already used')
        }

        const project = await connection('projects')
            .update({ name, start_date, end_date, description })
            .where('id', id)
            .returning('*')

        return project
    }
}