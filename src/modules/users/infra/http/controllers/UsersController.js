const { createUser } = require('../../../services/CreateUserService')
const {
    listAllUsers,
    findUserByEmail,
    findUserByID,
    findTypeUserByID
} = require('../../../services/ListUsersService')
const { deleteUser } = require('../../../services/DeleteUserService')
const { updateUser } = require('../../../services/UpdateUserService')

module.exports = {
    async create(request, response) {
        const { email, name, password, type } = request.body

        const user = await createUser({ email, name, password, type })

        return response.json(user)
    },

    async index(request, response) {
        const users = await listAllUsers()

        return response.json(users)
    },

    async deleteOne(request, response) {

        const { id } = request.params

        const users = await deleteUser({
            id
        })

        return response.json(users)
    },
    async findUserById(request, response) {
        const { id } = request.params

        const user = await findUserByID({ id })


        return response.json(user)
    },

    async findByEmail(request, response) {
        const user = await findUserByEmail({ email })

        return response.json(user)
    },

    async findTypeOfUser(request, response) {
        const { id } = request.params

        const typeUser = await findTypeUserByID({
            id
        })

        return response.json(typeUser)
    },

    async update(request, response) {

        const { id } = request.params

        const { name, email, password, type } = request.body

        const user = await updateUser({
            id,
            name,
            email,
            password,
            type
        })

        

        return response.json(user)
    },

}