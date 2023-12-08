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

let saveDoctorDetailService = (inputData) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!inputData.doctorID || !inputData.introduction || !inputData.description ||
                !inputData.provinceID || !inputData.priceID || !inputData.paymentID ||
                !inputData.clinicName || !inputData.clinicAddress || !inputData.action) {
                resolve({
                    errorCode: -1,
                    message: 'Missed require paramater(s) !'
                })
            } else {
                if (inputData.action === "CREATE") {
                    await db.Doctor_Detail.create({
                        introduction: inputData.introduction,
                        description: inputData.description,
                        doctorID: inputData.doctorID,
                        provinceID: inputData.provinceID,
                        priceID: inputData.priceID,
                        paymentID: inputData.paymentID,
                        clinicName: inputData.clinicName,
                        clinicAddress: inputData.clinicAddress,
                        note: inputData.note
                    })
                } else {
                    if (inputData.action === "UPDATE") {
                        let doctorDetail = await db.Doctor_Detail.findOne({
                            where: { doctorID: inputData.doctorID },
                            raw: false
                        })
                        if (doctorDetail) {
                            doctorDetail.introduction = inputData.introduction;
                            doctorDetail.description = inputData.description;
                            doctorDetail.provinceID = inputData.provinceID;
                            doctorDetail.priceID = inputData.priceID;
                            doctorDetail.paymentID = inputData.paymentID;
                            doctorDetail.clinicName = inputData.clinicName;
                            doctorDetail.clinicAddress = inputData.clinicAddress;
                            doctorDetail.note = inputData.note
                            await doctorDetail.save();
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
                            model: db.Doctor_Detail,
                            attributes: ['introduction', 'description', 'provinceID', 'priceID', 'paymentID', 'clinicName', 'clinicAddress', 'note', 'count'],
                            include: [
                                {
                                    model: db.AllCode, as: "provinceData",
                                    attributes: [`valueEN`, `valueVI`, `valueJA`]
                                },
                                {
                                    model: db.AllCode, as: "priceData",
                                    attributes: [`valueEN`, `valueVI`, `valueJA`]
                                },
                                {
                                    model: db.AllCode, as: "paymentData",
                                    attributes: [`valueEN`, `valueVI`, `valueJA`]
                                },
                            ]
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
    saveDoctorDetailService,
    getDoctorDetailByIDService,

}