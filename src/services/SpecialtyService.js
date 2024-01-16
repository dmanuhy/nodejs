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

const getAllSpecialtyService = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let allSpecialty = await db.Specialty.findAll({
                attributes: ['id', 'name', 'description', 'image']
            });
            if (allSpecialty && allSpecialty.length > 0) {
                allSpecialty.map(item => {
                    item.image = new Buffer(item.image, 'base64').toString('binary');
                    return item;
                })
                resolve({
                    errorCode: 0,
                    data: allSpecialty
                })
            }
        } catch (error) {
            console.log(error)
            reject(error)
        }
    })
}


module.exports = {
    createSpecialtyService,
    getAllSpecialtyService
}