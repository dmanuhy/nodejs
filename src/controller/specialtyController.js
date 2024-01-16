import SpecialtyService from "../services/SpecialtyService";

const createSpecialty = async (req, res) => {
    try {
        let specialty = await SpecialtyService.createSpecialtyService(req.body)
        return res.status(200).json(specialty);
    } catch (error) {
        console.log(error)
        return res.status(200).json({
            errorCode: -1,
            message: "Error when creating Specialty NODEJS"
        })
    }
}

const getAllSpecialty = async (req, res) => {
    try {
        let allSpecialty = await SpecialtyService.getAllSpecialtyService(req.body)
        return res.status(200).json(allSpecialty);
    } catch (error) {
        console.log(error)
        return res.status(200).json({
            errorCode: -1,
            message: "Error when getting all Specialty NODEJS"
        })
    }
}

module.exports = {
    createSpecialty: createSpecialty,
    getAllSpecialty: getAllSpecialty
} 