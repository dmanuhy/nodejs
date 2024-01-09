require('dotenv').config();
import nodemailer from 'nodemailer';

const sendConfirmBookAppointmentEmail = async (data) => {
    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
            // TODO: replace `user` and `pass` values from <https://forwardemail.net>
            user: process.env.EMAIL_APP,
            pass: process.env.EMAIL_APP_PASSWORD,
        },
    });
    const info = await transporter.sendMail({
        from: `"Booking Care" <${process.env.EMAIL_APP}>`, // sender address
        to: data.user.email,
        subject: "Thông tin lịch khám bệnh", // Subject line
        text: "Hello world?", // plain text body
        html: getBodyByLanguage(data.language, data), // html body
    });

}

const getBodyByLanguage = (language, data) => {
    switch (language) {
        case 'vi': return `
        <h3>Xin chào ${data.user.lastName} ${data.user.firstName}</h3>
        <p>Bạn nhận được email này vì đã đặt lịch khám bệnh online tại Booking Care</p>
        <h3>Thông tin chi tiết</h3>
        <h4>Thông tin bệnh nhân</h4>
        <div><b>Tên bệnh nhân: </b>${data.patientName} | <b>Sinh ngày: </b>${data.dobString}</div>
        <div><b>Giới tính: </b>${data.gender === "M" ? "Nam" : "Nữ"}</div>
        <div><b>Số điện thoại: </b>${data.phoneNumber}</div>
        <h5>Thông tin lịch khám</h5>
        <div><b>Bác sĩ: </b>${data.doctorFullname}</div>
        <div><b>Thời gian: </b>${data.dateTime}</div>
        <br/>
        <div>Nếu các thông tin trên là đúng sự thật, vui lòng bấm <a href=${data.redirectLink}>Xác nhận</a></div>
        <div>Xin chân thành cảm ơn</div>
        `
        case 'en': return `
        <h3>Dear ${data.user.lastName} ${data.user.firstName}</h3>
        <p>You received this email because you made an online medical appointment at Booking Care</p>
        <h3>Details</h3>
        <h4>Patient information</h4>
        <div><b>Patient name: </b>${data.patientName} | <b>Day of birth: </b>${data.dobString}</div>
        <div><b>Gender: </b>${data.gender === "M" ? "Nam" : "Nữ"}</div>
        <div><b>Phone number: </b>${data.phoneNumber}</div>
        <br/>
        <h5>Examination schedule information</h5>
        <div><b>Doctor: </b>${data.doctorFullname}</div>
        <div><b>Time: </b>${data.dateTime}</div>
        <br/>
        <div>If the above information is true, please click <a href=${data.redirectLink}>Confirm</a></div>
        <div>Sincerely thank</div>
        `
        case 'ja': return `
        <h3>${data.user.lastName} ${data.user.firstName} 様</h3>
        <p>このメールは、Booking Care でオンライン診療予約を行ったために受信しました。</p>
        <h3>詳細</h3>
        <h4>患者情報</h4>
        <div><b>患者名: </b>${data.patientName} | <b>生年月日: </b>${data.dobString}</div>
        <div><b>性別: </b>${data.gender === "M" ? "男性" : "女性"}</div>
        <div><b>電話番号: </b>${data.phoneNumber}</div>
        <br/>
        <h5>試験スケジュール情報</h5>
        <div><b>医師: </b>${data.doctorFullname}</div>
        <div><b>時間: </b>${data.dateTime}</div>
        <br/>
        <div>上記の情報が正しい場合は,<a href=${data.redirectLink}>「確認」</a>をクリックしてください</div>
        <div>心より感謝申し上げます</div>
        `
    }
}



module.exports = {
    sendConfirmBookAppointmentEmail: sendConfirmBookAppointmentEmail
}