const connection = require('../../../database/connection')
const { uuid } = require('uuidv4')

module.exports = {
    async createStep({ name, id_project }) {


        const verifyProjectExists = await connection('projects')
            .select('*')
            .where('id', id_project)

        if (verifyProjectExists.length === 0) {
            throw new Error('This project not exists.')
        }

        const verifyIfStepNewNameExists = await connection('steps')
            .select('*')
            .where('name', name)

        if(verifyIfStepNewNameExists.length > 0){
            throw new Error('This step name is already used.')
        }

        const newStep = {
            id: uuid(),
            name,
            id_project
        }

        const step = await connection('steps').insert(newStep).returning('*')

        return step
    }
}