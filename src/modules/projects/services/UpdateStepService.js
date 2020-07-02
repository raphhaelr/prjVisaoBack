const connection = require('../../../database/connection')
const { uuid } = require('uuidv4')

module.exports = {
    async updateStep({ id, name, status }) {
    
        const verifyStepExists = await connection('steps')
            .select('*')
            .where('id', id)

        if (verifyStepExists.length === 0) {
            throw new Error('This step not exists.')
        }

        const verifyIfStepNewNameExists = await connection('steps')
            .select('*')
            .where('name', name)
            .andWhereNot('id', id)

        if (verifyIfStepNewNameExists.length > 0) {
            throw new Error('This step name is already used.')
        }

        const verifyIfStepHasSprints = await connection('sprints')
            .select('*')
            .where('id_step', id)


        if (status === 'Finalizada') {
            if (verifyIfStepHasSprints.length === 0) {
                throw new Error('This project not has sprints.')
            }

            const verifyIfSprintsAreNotFinisheds = await connection('sprints')
                .whereNot('status', 'Finalizada').andWhere('id_step', id)

           
            if (verifyIfSprintsAreNotFinisheds.length > 0) {
                throw new Error('This step has unfinisheds sprints')
            }
        }

        const step = await connection('steps')
            .update({ name, status })
            .where('id', id).returning('*')
        
        return step
    },

    async updateStepStatus({ id, status }) {
        const verifyStepExists = await connection('steps')
            .select('*')
            .where('id', id)

        if (verifyStepExists.length === 0) {
            throw new Error('This step not exists.')
        }

        const verifyIfStepHasSprints = await connection('sprints')
            .select('*')
            .where('id_step', id)


        if (verifyIfStepHasSprints.length === 0) {
            throw new Error('This project not has sprints.')
        }

        const verifyIfSprintsAreNotFinisheds = await connection('sprints')
            .whereNot('status', 'Finalizado')


        if (verifyIfSprintsAreNotFinisheds.length > 0) {
            throw new Error('This step has unfinisheds sprints')
        }

        const step = await connection('steps')
            .update({ status })
            .where('id', id).returning('*')

        return step
    }
}