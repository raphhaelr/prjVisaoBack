const { createProject } = require('../../../services/CreateProjectService')
const { listAllProjects, findProjectByID, findProjectByName } = require('../../../services/ListProjectsService')
const { projectProgress } = require('../../../services/ShowProjectProgress')
const { updateProject } = require('../../../services/UpdateProjectService')
const { getDate, getMonth, getYear } = require('date-fns')
const { parseDate } = require('../../../../../shared/utils/parseDate')
const { deleteProject } = require('../../../services/DeleteProjectService')

module.exports = {
    async create(request, response) {
        const {
            name,
            description,
            start_date,
            end_date,
            id_manager,
            customer_name
        } = request.body

        const project = await createProject({
            name,
            description,
            start_date,
            end_date,
            id_manager,
            customer_name
        })

        return response.json(project)
    },

    async index(request, response) {

        const projects = await listAllProjects()

        const parsedProjects = projects.map(project => {

            const dates = parseDate(project.start_date, project.end_date)

            project.start_date = dates.start_date
            project.end_date = dates.end_date

            return project
        })

        return response.json(parsedProjects)
    },

    async update(request, response) {
        const { id } = request.params
        
        const {
            name,
            description,
            id_customer,
            customer_name,
            start_date,
            end_date 
        } = request.body

        const project = await updateProject({
            id,
            name,
            description,
            id_customer,
            customer_name,
            start_date,
            end_date
        })



        return response.json(project)
    },

    async deleteOne(request, response) {
        const { id } = request.params

        const project = await deleteProject({
            id
        })

        return response.json(project)
    },


    async findProject(request, response) {
        const { id } = request.params

        const project = await findProjectByID({
            id
        })

        const dates = parseDate(project[0].start_date, project[0].end_date)

        project[0].start_date = dates.start_date
        project[0].end_date = dates.end_date

        const progress = await projectProgress({
            id
        })

        const fullProject = [{
            ...project[0],
            progress
        }]

        return response.json(fullProject)
    },

    async findProjectsByNameWithLike(request, response) {
        const { name } = request.query

        const projects = await findProjectByName({
            name
        })

        return response.json(projects)
    }
}