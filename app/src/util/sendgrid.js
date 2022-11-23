const axios = require('axios');

const callMethod = async (data) => {
  await axios({
    method: "post",
    url: "https://api.sendgrid.com/v3/mail/send",
    headers: {
      Authorization: `Bearer ${process.env.SENDGRID_API_KEY}`,
    },
    data: {...data}
  }).then(
    res => console.log(res.status)
    ).catch(function (error) {
      console.log(error.response.data);
      throw error;
  });
};

exports.send = callMethod;
