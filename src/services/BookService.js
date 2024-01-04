import db from "../models";
import EmailService from "./EmailService";

const bookAppointmentService = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data || !data.patientID || !data.doctorID || !data.patientName || !data.gender
                || !data.dob || !data.phoneNumber || !data.reason || !data.date || !data.timeType) {
                resolve({
                    errorCode: 1,
                    message: 'Missing parameter(s) !'
                })
            } else {
                let user = await db.User.findOne({
                    attributes: ['email', 'firstName', 'lastName'],
                    where: { id: data.patientID },
                    raw: true
                })

                if (user) {
                    data.user = user;
                    console.log(data)
                    await EmailService.sendConfirmBookAppointmentEmail(data)
                    resolve({
                        errorCode: 0
                    })
                }
                else {
                    resolve({
                        errorCode: 1,
                        message: 'Cannot send EMAIL from NodeJS server'
                    })
                }
            }
        } catch (e) {
            reject(e);
        }
    })
}

module.exports = {
    bookAppointmentService: bookAppointmentService
}