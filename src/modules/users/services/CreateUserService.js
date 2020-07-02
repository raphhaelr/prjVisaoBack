const connection = require('../../../database/connection')
const { uuid } = require("uuidv4")
const { hash } = require('bcryptjs')

module.exports = {
    async createUser({ email, name, type, password }) {
        const verifyUserExists = await connection('users')
            .select('*')
            .where('email', email)

        if (verifyUserExists.length > 0) {
            throw new Error('This email is already used')
        }

        const hashedPassword = await hash(password, 8)

        const newUser = {
            id: uuid(),
            name,
            email,
            type,
            password: hashedPassword
        }

        const user = await connection('users').insert(newUser).returning('*')


        return user
    }
}