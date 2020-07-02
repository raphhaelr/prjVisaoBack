const connection = require('../../../database/connection')
const { hash } = require('bcryptjs')

module.exports = {
    async updateUser({
        id,
        name,
        email,
        password,
        type
    }) {

        const verifyUserExists = await connection('users')
            .select('*')
            .where('id', id)

        if (verifyUserExists.length === 0) {
            throw new Error('This project not exists.')
        }

        const verifyUserEmailExists = await connection('users')
            .select('*')
            .where('email', email)
            .andWhereNot('id', id)

        if (verifyUserEmailExists.length > 0) {
            throw new Error('This email is already used')
        }

        let user

        if (!password) {
            user = await connection('users')
                .update({
                    name,
                    email,
                    type
                })
                .where('id', id)
                .returning('*')

            delete user[0].password
                console.log('vazio')
            return user
        }

        const hashedPassword = await hash(password, 8)

        user = await connection('users')
            .update({
                name,
                email,
                password: hashedPassword,
                type
            })
            .where('id', id)
            .returning('*')

        delete user[0].password

        return user
    }
}