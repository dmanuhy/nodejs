const bookAppointmentService = (data) => {
    return new Promise((resolve, reject) => {
        try {
            console.log(data)
            if (!data || !data.patientID || !data.doctorID || !data.patientName || !data.gender
                || !data.dob || !data.phoneNumber || !data.reason || !data.date || !data.timeType) {
                resolve({
                    errorCode: 1,
                    message: 'Missing parameter(s) !'
                })
            } else {
                console.log(data)
                resolve({
                    errorCode: 0
                })
            }
        } catch (e) {
            reject(e);
        }
    })
}

module.exports = {
    bookAppointmentService: bookAppointmentService
}