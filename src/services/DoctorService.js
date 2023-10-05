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

let getAllDoctorService = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let doctors = await db.User.findAll({
                where: { roleID: 'R2' },
                attributes: {
                    exclude: ['password', 'image']
                }
            })
            resolve({
                errorCode: 0,
                data: doctors
            })
        } catch (e) {
            reject(e);
        }
    })
}

let saveDoctorInfoService = (inputData) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!inputData.doctorId || !inputData.contenMarkdown || !inputData.contentHTML) {
                resolve({
                    errorCode: -1,
                    message: 'Missed require paramaters'
                })
            } else {
                await db.Markdown.create({
                    contentHTML: inputData.contentHTML,
                    contenMarkdown: inputData.contenMarkdown,
                    description: inputData.description,
                    doctorId: inputData.doctorId
                })
                resolve({
                    errorCode: 0,
                    message: "Saved doctor infomation!"
                })
            }
        } catch (e) {
            reject(e);
        }
    })
}

const getDoctorDetailByIDService = (inputID) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!inputID) {
                resolve({
                    errorCode: 1,
                    message: "Missing required parameter"
                })
            } else {
                let data = await db.User.findOne({
                    where: { id: inputID },
                    attributes: {
                        exclude: ['password', 'image']
                    },
                    include: [
                        {
                            model: db.Markdown,
                            attributes: ['description', 'contentHTML', 'contentMarkdown']
                        },
                        {
                            model: db.AllCode, as: `positionData`, attributes: [`valueEN`, `valueVI`, `valueJA`]
                        }
                    ],
                    raw: true,
                    nest: true
                })
                resolve({
                    errorCode: 0,
                    data: data
                })
            }
        } catch (e) {
            reject(e);
        }
    })
}

module.exports = {
    getTopDoctorService,
    getAllDoctorService,
    saveDoctorInfoService,
    getDoctorDetailByIDService
}