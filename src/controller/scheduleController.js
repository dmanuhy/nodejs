import ScheduleService from '../services/ScheduleService'

const createDoctorSchedule = async (req, res) => {
    try {
        let doctorSchedule = await ScheduleService.createDoctorScheduleService(req.body)
        return res.status(200).json(doctorSchedule);
    } catch (error) {
        console.log(error)
        return res.status(200).json({
            errorCode: -1,
            message: "Error when creating doctor schedule"
        })
    }
}

const getDoctorScheduleByDate = async (req, res) => {
    try {
        let data = await ScheduleService.getDoctorScheduleByDateService(req.query.doctorID, req.query.date)
        return res.status(200).json(data);
    } catch (e) {
        console.log(e)
        return res.status(200).json({
            errorCode: -1,
            message: "Error when from NODEJS server"
        })
    }
}

module.exports = {
    createDoctorSchedule: createDoctorSchedule,
    getDoctorScheduleByDate: getDoctorScheduleByDate
} 