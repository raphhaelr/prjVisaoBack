const { verify } = require("jsonwebtoken")
const authConfig = require('../../../../../config/auth')

module.exports = {
    ensureAuthenticated(request, response, next) {
        const authHeader = request.headers.authorization
   
        if (!authHeader) {
            throw new Error('JWT token is missing.')
        }

        const [, token] = authHeader.split(' ')

        try {
            const decoded = verify(token, authConfig.jwt.secret)
            
            const { sub, type } = decoded
            
            request.user = {
                id: sub,
                type
            }

            return next()
        } catch (error) {
            throw new Error('Invalid JWT token')
        }
    }
}