const admin = require("firebase-admin");
const serviceAccount = require("../../assets/firebase-admin.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

module.exports = async (params) => {
  const { title, description, tokens = [], data = {} } = params;

  var message = {
    notification: {
      title: title,
      body: description,
    },
    data,
    tokens,
  };
  var response = await admin?.messaging()?.sendMulticast(message);
  console.log(
    response?.responses?.[0]?.error,
    "send push notification response"
  );
  return response;
};
