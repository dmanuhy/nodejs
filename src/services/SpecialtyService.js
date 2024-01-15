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
                await db.Specialty.create({
                    name: data.name,
                    image: data.image,
                    description: data.description
                })
                resolve({
                    errorCode: 0,
                    message: "Create new specialty successfully!"
                })
            }
        } catch (e) {
            reject(e)
        }
    })
}

module.exports = {
    createSpecialtyService
}