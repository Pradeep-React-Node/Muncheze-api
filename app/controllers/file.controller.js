const fs = require("fs");

exports.uploadFile = async (req, res) => {
  try {
    let file = req?.files?.file;
    fs.writeFile(
      `${__dirname}/../../uploads/${file?.name}`,
      file?.data,
      (err) => {
        if (!err) {
          res?.send({
            status: "success",
            url: `${process.env.URL}${file?.name}`,
          });
        } else {
          res?.status(500)?.send({ status: "failed", message: err?.message });
        }
      }
    );
  } catch (err) {
    res?.status(500)?.send({ status: "failed", message: err?.message });
  }
};
