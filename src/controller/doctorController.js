import DoctorService from "../services/DoctorService";

let getTopDoctor = async (req, res) => {
    let limitInput = req.query.limitInput;
    if (!limitInput) {
        limitInput = 10;
    }
    try {
        let doctorList = await DoctorService.getTopDoctorService(+limitInput);
        return res.status(200).json(doctorList);
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errorCode: 1,
            message: "Error from server is occured!"
        })
    }
}

module.exports = {
    getTopDoctor: getTopDoctor
}