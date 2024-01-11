require('dotenv').config();
import db from "../models";
import EmailService from "./EmailService";
import { v4 as uuidv4 } from "uuid"

const buildEmail = (token) => {
    return `${process.env.URL_REACT}/verify-book-appointment/token=${token}`;
}

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
                    let token = uuidv4()
                    data.user = user;
                    data.redirectLink = buildEmail(token)
                    if (data && user) {
                        await EmailService.sendConfirmBookAppointmentEmail(data)
                        await db.Booking.create({
                            statusID: "S1",
                            userID: data.patientID,
                            doctorID: data.doctorID,
                            patientName: data.patientName,
                            gender: data.gender,
                            phoneNumber: data.phoneNumber,
                            dob: data.dob,
                            reason: data.reason,
                            date: data.date,
                            timeType: data.timeType,
                            token: token
                        })
                    }
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

const verifyBookAppointmentService = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.token) {
                resolve({
                    errorCode: 1,
                    message: 'Missing parameter(s) !'
                })
            } else {
                let appointment = await db.Booking.findOne({
                    where: {
                        token: data.token,
                        statusID: "S1"
                    },
                    raw: false
                })
                if (appointment) {
                    await appointment.update({ statusID: "S2" })
                    resolve({
                        errorCode: 0,
                        message: 'Comfirmed appointment !'
                    })
                } else {
                    resolve({
                        errorCode: 2,
                        message: `Appointment isn't exist or has confirmed!`
                    })
                }
            }
        } catch (e) {
            reject(e);
        }
    })
}

module.exports = {
    bookAppointmentService: bookAppointmentService,
    verifyBookAppointmentService: verifyBookAppointmentService
}