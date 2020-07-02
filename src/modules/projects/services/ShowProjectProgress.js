const connection = require('../../../database/connection')

module.exports = {

    async projectProgress({ id }) {

        const steps = await connection('steps')
            .select('*')
            .where('id_project', id)

        const stepsWithStatusFinished = await connection('steps')
            .select('*')
            .where('status', 'Finalizada')
 
        const numberOfSteps = steps.length

        const numberOfStepsFinished = stepsWithStatusFinished.length

        let percent 

        if(numberOfStepsFinished > 0){
            percent = ((numberOfStepsFinished * 100)/numberOfSteps)
        } else {
            percent = 0
        }

        const progress = {
            value: percent
        }

        return progress
    }
}