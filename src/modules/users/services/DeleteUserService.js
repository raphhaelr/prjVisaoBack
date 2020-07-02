const connection = require('../../../database/connection')

module.exports = {
    async deleteUser({ id }) {
        const user = await connection('users').select('*').where('id', id)

        if(user.length === 0){
            throw new Error('This user not exists')
        }

        await connection('users').del().where('id', id)

        return id
    }
}