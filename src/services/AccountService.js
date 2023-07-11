const AccountModel = require('../models/AccountModel')
const ServiceError = require('../utils/Exception')

module.exports = {
    async createAccount(name, balance, userId) {
        if (!name || !balance) {
            throw new ServiceError(400, 'Неполные данные')
        }

        const isAccountCreated = await AccountModel.findOne({
            where: {
                name
            }
        })

        if (isAccountCreated) {
            throw new ServiceError(400, 'Счёт с таким именем уже существует')
        }

        return await AccountModel.create({
            userId: +userId,
            name,
            balance: +balance
        })
    },
    async getAllAccounts(userId) {
        return await AccountModel.findAll({
            where: {
                userId
            }
        })
    }
}