import db from "../models/index";
import _ from "lodash";

require("dotenv").config();
const MAX_PATIENT_IN_SCHEDULE = process.env.MAX_PATIENT_IN_SCHEDULE

const createDoctorScheduleService = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.schedule) {
                resolve({
                    errorCode: 1,
                    message: "Missing required schedule data"
                })
            } else {
                let schedule = data.schedule;
                if (schedule && schedule.length > 0) {
                    schedule = schedule.map(item => {
                        item.maxNumber = MAX_PATIENT_IN_SCHEDULE;
                        return item;
                    })
                    let existSchedule = await db.Schedule.findAll({
                        where: {
                            doctorID: schedule[0].doctorID,
                            date: schedule[0].date,
                        },
                        attributes: ['doctorID', 'date', 'timeType', 'maxNumber'],
                        raw: true
                    })
                    if (existSchedule && existSchedule.length > 0) {
                        existSchedule = existSchedule.map(item => {
                            item.date = new Date(item.date).getTime();
                            return item;
                        })
                    }
                    let toCreate = _.differenceWith(schedule, existSchedule, (a, b) => {
                        return a.timeType === b.timeType && a.date === b.date;
                    })
                    if (toCreate && toCreate.length > 0) {
                        await db.Schedule.bulkCreate(toCreate);
                        resolve({
                            errorCode: 0,
                            message: "Created schedule(s) successfully!"
                        });
                    }
                }
            }
        } catch (e) {
            reject(e)
        }
    })
}

const getDoctorScheduleByDateService = (doctorID, date) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!doctorID || !date) {
                resolve({
                    errorCode: 1,
                    messsage: "Missing required parameter(s)"
                })
            } else {
                let dataSchedule = await db.Schedule.findAll({
                    where: {
                        doctorID: doctorID,
                        date: date
                    }
                })
                if (!dataSchedule) {
                    dataSchedule = [];
                } else {
                    resolve({
                        errorCode: 0,
                        data: dataSchedule
                    })
                }
            }
        }
        catch (e) {
            reject(e)
        }
    })
}

module.exports = {
    createDoctorScheduleService,
    getDoctorScheduleByDateService
}