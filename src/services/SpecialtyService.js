const db = require('../models/index');

const createSpecialtyService = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.name || !data.image || !data.description) {
                resolve({
                    errorCode: 1,
                    message: "Missing parameter"
                })
            } else {

            }
        } catch (e) {
            reject(e)
        }
    })
}

module.exports = {
    createSpecialtyService
}