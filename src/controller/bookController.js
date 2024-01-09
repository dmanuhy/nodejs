import BookService from "../services/BookService";

const bookAppointment = async (req, res) => {
    try {
        let response = await BookService.bookAppointmentService(req.body)
        return res.status(200).json(response);
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errorCode: -1,
            message: 'Error from NODEJS server'
        })
    }
}

const verifyBookAppointment = async (req, res) => {
    try {
        let response = await BookService.verifyBookAppointmentService(req.body)
        return res.status(200).json(response);
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errorCode: -1,
            message: 'Error from NODEJS server'
        })
    }
}

module.exports = {
    bookAppointment: bookAppointment,
    verifyBookAppointment: verifyBookAppointment
}