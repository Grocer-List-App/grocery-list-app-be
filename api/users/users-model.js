const db = require('../../data/db-config');

const findUser = async (userId) => {
    return await db('users').where({id: userId})
}

module.exports = {
    findUser
}