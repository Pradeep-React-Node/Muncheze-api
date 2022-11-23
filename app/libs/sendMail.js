const nodemailer = require("nodemailer");

exports.sendMail = async (params) => {
  try {
    const { subject, email, content, attachments = [] } = params;
    var transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "noreply.test017@gmail.com",
        pass: "piotrxvooqefudwp",
      },
    });

    var mailOptions = {
      from: "noreply.test017@gmail.com",
      to: email,
      subject: subject,
      text: content,
      attachments: attachments,
    };

    var info = await transporter.sendMail(mailOptions);
    if (info.response) {
      return true;
    } else {
      throw { message: "Mail doesn't sent" };
    }
  } catch (e) {
    throw e;
  }
};
