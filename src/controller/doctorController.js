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

let getAllDoctor = async (req, res) => {
    try {
        let doctors = await DoctorService.getAllDoctorService();
        return res.status(200).json(doctors);
    } catch (e) {
        return res.status(200).json({
            errorCode: -1,
            message: 'Error from server'
        })
    }
}

let saveDoctorInfo = async (req, res) => {
    try {
        let response = await DoctorService.saveDoctorInfoService(req.body);
        return res.status(200).json(response);
    } catch (e) {
        return res.status(200).json({
            errorCode: -1,
            message: 'Error from server'
        })
    }

}

const getDoctorDetailByID = async (req, res) => {
    try {
        let doctorDetail = await DoctorService.getDoctorDetailByIDService(req.query.id);
        return res.status(200).json(doctorDetail);
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errorCode: -1,
            message: 'Error from server'
        })
    }
}



module.exports = {
    getTopDoctor: getTopDoctor,
    getAllDoctor: getAllDoctor,
    saveDoctorInfo: saveDoctorInfo,
    getDoctorDetailByID: getDoctorDetailByID,

}