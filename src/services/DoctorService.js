import db from "../models/index";
import _ from "lodash";

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
            if (!inputData.doctorID || !inputData.contentMarkdown || !inputData.contentHTML || !inputData.action) {
                resolve({
                    errorCode: -1,
                    message: 'Missed require paramaters'
                })
            } else {
                if (inputData.action === "CREATE") {
                    await db.Markdown.create({
                        contentHTML: inputData.contentHTML,
                        contentMarkdown: inputData.contentMarkdown,
                        description: inputData.description,
                        doctorID: inputData.doctorID
                    })
                } else {
                    if (inputData.action === "UPDATE") {
                        let doctorMarkdown = await db.Markdown.findOne({
                            where: { doctorID: inputData.doctorID },
                            raw: false
                        })
                        if (doctorMarkdown) {
                            doctorMarkdown.contentHTML = inputData.contentHTML;
                            doctorMarkdown.contentMarkdown = inputData.contentMarkdown;
                            doctorMarkdown.description = inputData.description;
                            await doctorMarkdown.save();
                        }
                    }
                }

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
                        exclude: ['password']
                    },
                    include: [
                        {
                            model: db.Markdown,
                            attributes: ['description', 'contentHTML', 'contentMarkdown']
                        },
                        {
                            model: db.AllCode, as: `positionData`,
                            attributes: [`valueEN`, `valueVI`, `valueJA`]
                        }
                    ],
                    raw: false,
                    nest: true

                })
                if (data) {
                    if (data.image) {
                        data.image = new Buffer(data.image, 'base64').toString('binary');
                    }
                } else {
                    data = {};
                }
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
    getDoctorDetailByIDService,

}