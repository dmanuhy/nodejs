import express from "express";
import homeController from "../controller/homeController";
import userController from "../controller/userController"
import allCodeController from "../controller/allCodeController";
import doctorController from "../controller/doctorController";
import scheduleController from "../controller/scheduleController";
import bookController from "../controller/bookController";
import specialtyController from "../controller/specialtyController";

let router = express.Router();

let initWebRoutes = (app) => {
    router.get('/', homeController.getHomePage);
    router.get('/about', homeController.getAboutPage);
    router.get('/crud', homeController.getCRUD);
    router.post('/post-crud', homeController.postCRUD);
    router.get('/get-crud', homeController.displayGetCRUD);
    router.get('/edit-crud', homeController.getEditCRUD);
    router.post('/put-crud', homeController.putEditCRUD);
    router.get('/delete-crud', homeController.deleteCRUD);

    router.post('/api/login', userController.handleLogin);
    router.get('/api/get-all-user', userController.handleGetAllUser);
    router.post('/api/create-user', userController.handleCreateUser);
    router.put('/api/edit-user', userController.handleEditUser);
    router.delete('/api/delete-user', userController.handleDeleteUser);

    router.get("/api/get-all-code", allCodeController.getAllCode);

    router.get("/api/get-top-doctor", doctorController.getTopDoctor);
    router.get("/api/get-all-doctor", doctorController.getAllDoctor);
    router.post('/api/save-doctor-detail', doctorController.saveDoctorDetail);
    router.get("/api/get-doctor-detail", doctorController.getDoctorDetailByID);

    router.post('/api/create-doctor-schedule', scheduleController.createDoctorSchedule);
    router.get('/api/get-doctor-schedule-by-date', scheduleController.getDoctorScheduleByDate);

    router.post('/api/book-appointment', bookController.bookAppointment);
    router.post('/api/verify-book-appointment', bookController.verifyBookAppointment)

    router.post('/api/specialty/create', specialtyController.createSpecialty)
    router.get('/api/specialty/get-all', specialtyController.getAllSpecialty)

    return app.use("/", router);
}

module.exports = initWebRoutes;