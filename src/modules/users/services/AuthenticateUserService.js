const connection = require('../../../database/connection')
const { compare, hash } = require('bcryptjs')
const { sign } = require('jsonwebtoken')
const authConfig = require('../../../config/auth')

module.exports = {
    async authenticate({ email, password }) {
        const [user] = await connection('users').select('*').where('email', email)
    
        if (user.length === 0) {
            throw new Error('Incorrect email or password combination.')
        }

        const passwordMatched = await compare(password, user.password)

        if (!passwordMatched) {
            throw new Error('Incorrect email or password combination.')
        }

        const token = sign({ type: user.type }, authConfig.jwt.secret, {
            subject: user.id,
            expiresIn: authConfig.jwt.expiresIn,

        })

        return {
            user,
            token
        }
    }
}