const connection = require('../../../database/connection')

module.exports = {
    async listAllProjects() {
        const projects = await connection('projects')
            .join('customers as cust', 'projects.id_customer', '=', 'cust.id')
            .select(
                'projects.id',
                'projects.name',
                'projects.description',
                'projects.start_date',
                'projects.end_date',
                'projects.id_manager',
                'projects.id_customer',
                'cust.name as customer_name'
            )

        return projects
    },
    async findProjectByID({ id }) {
        const project = await connection('projects')
            .join('customers as cust', 'projects.id_customer', '=', 'cust.id')
            .select(
                'projects.id',
                'projects.name',
                'projects.description',
                'projects.start_date',
                'projects.end_date',
                'projects.id_manager',
                'projects.id_customer',
                'cust.name as customer_name'
            ).where('projects.id', id)



        return project
    },

    async findProjectByName({ name }) {
        
        const projects = await connection('projects')
            .select('*')
            .where('name', 'ilike', '%'+ name + '%')



        return projects
    }
}