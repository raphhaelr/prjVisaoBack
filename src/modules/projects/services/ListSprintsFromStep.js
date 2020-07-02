const connection = require('../../../database/connection')
const { parseDate } = require('../../../shared/utils/parseDate')

module.exports = {
    async findSprintsByStepID({ id_step }) {

        const verifyStepsExists = await connection('steps')
            .select('*')
            .where('id', id_step)

        if (verifyStepsExists.length === 0) {
            throw new Error('This project does not have steps.')
        }


        const sprints = await connection('sprints').select('*').where('id_step', id_step)

        const [step] = verifyStepsExists

        const parsedSprints = sprints.map(sprint => {

            const dates = parseDate(sprint.start_date, sprint.end_date)

            sprint.start_date = dates.start_date
            sprint.end_date = dates.end_date

            return sprint
        })
      
        return {
            step,
            sprints: parsedSprints
        }
    }
}