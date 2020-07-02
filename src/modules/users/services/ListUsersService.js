const connection = require('../../../database/connection')

module.exports = {
    async listAllUsers() {
        const users = await connection('users').select('*')

        return users
    },
    async findUserByEmail({ email }) {

        const user = await connection('users').select('*').where('email', email)

        if (user.length === 0) {
            throw new Error('This user not exists')
        }

        return user
    },
    async findUserByID({ id }) {
        const user = await connection('users').select('*').where('id', id)

        if(user.length === 0){
            throw new Error('This user not exists')
        }

        delete user[0].password

        return user
    },

    async findTypeUserByID({ id }) {
        const user = await connection('users').select('type').where('id', id)

        if(user.length === 0){
            throw new Error('This user not exists')
        }
        
        return user
    }
}