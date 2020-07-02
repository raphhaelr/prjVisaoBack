const AuthenticateService = require('../../../services/AuthenticateUserService')

module.exports = {
    async create(request, response) {
        const { email, password } = request.body
       
        const { user, token } = await AuthenticateService.authenticate({
            email,
            password
        })

        delete user.type
        delete user.password
        
        return response.json({ user, token })
    }
}