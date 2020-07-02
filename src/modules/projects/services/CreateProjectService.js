const { uuid } = require("uuidv4")
const connection = require("../../../database/connection")

module.exports = {
    async createProject({
        name,
        description,
        start_date,
        end_date,
        id_manager,
        customer_name
    }) {
        
        const verifyIfUserIsManager = await connection('users')
            .select('*')
            .where('id', id_manager)

        if (verifyIfUserIsManager.length === 0 || !(verifyIfUserIsManager[0].type === 'admin')) {
            throw new Error('This user not exists or is not are a manager')
        }

        const verifyCustomerExists = await connection('customers')
            .select('*')
            .where('name', customer_name)

        let customer

        if (verifyCustomerExists.length === 0) {

            customer = await connection('customers')
                .insert({ id: uuid(), name: customer_name })
                .returning('*')

        }
        else if (verifyCustomerExists.length > 0) {
            customer = verifyCustomerExists
        }

        const verifyProjectExists = await connection('projects')
            .select('*')
            .where('name', name)

        if (verifyProjectExists.length > 0) {
            throw new Error('This project name is already used')
        }

        const newProject = {
            id: uuid(),
            name,
            description,
            start_date,
            end_date,
            id_manager,
            id_customer: customer[0].id,
        }

        await connection('projects').insert(newProject)

        return newProject
    }
}