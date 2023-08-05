import db from "../models/index";


let getTopDoctorService = (limitInput) => {
    return new Promise(async (resolve, reject) => {
        try {
            let doctorList = await db.User.findAll({
                limit: limitInput,
                where: { roleID: "R2" },
                order: [['createdAt', 'DESC']],
                attributes: { exclude: ['password'] },
                include: [
                    { model: db.AllCode, as: `positionData`, attributes: [`valueEN`, `valueVI`, `valueJA`] },
                    { model: db.AllCode, as: `genderData`, attributes: [`valueEN`, `valueVI`, `valueJA`] }
                ],
                raw: true,
                nest: true
            })
            resolve({
                errorCode: 0,
                data: doctorList
            })
        } catch (e) {
            reject(e);
        }
    })
}

module.exports = {
    getTopDoctorService
}