const admin = require('firebase-admin');
// const firebase = require('firebase');
const serviceAccount = require('../../assets/firebase-admin.json');
// firebase.initializeApp(serviceAccount);

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
  var response = await firebase?.messaging()?.sendMulticast(message);
  console.log(
    response?.responses?.[0]?.error,
    'send push notification response'
  );
  return response;
};
