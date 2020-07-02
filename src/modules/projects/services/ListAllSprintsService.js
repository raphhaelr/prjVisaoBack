const connection = require('../../../database/connection')
const { parseDate } = require('../../../shared/utils/parseDate')

module.exports = {
    async findSprintsOfProject({ id_project }) {
        const sprints = await connection('steps')
            .join('sprints as spr', 'spr.id_step', '=', 'steps.id')
            .join('projects as prj', 'steps.id_project', '=', 'prj.id')
            .select('spr.id', 'spr.name', 'steps.name as step', 'spr.description', 'spr.status', 'spr.start_date', 'spr.end_date')
            .where('prj.id', id_project)

        const parsedSprints = sprints.map(sprints => {

            const dates = parseDate(sprints.start_date, sprints.end_date)

            sprints.start_date = dates.start_date
            sprints.end_date = dates.end_date

            return sprints
        })

        return parsedSprints
    },
    async findOne({ id }) {
 
        const sprints = await connection('sprints').select('*').where('id', id)

        
        
        const parsedSprints = sprints.map(sprint => {

            const dates = parseDate(sprint.start_date, sprint.end_date)

            sprint.start_date = dates.start_date
            sprint.end_date = dates.end_date

            return sprint
        })

              
        return parsedSprints
    }
}