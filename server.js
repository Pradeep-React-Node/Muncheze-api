const express = require("express");
require("dotenv").config();
const upload = require("express-fileupload");
const cors = require("cors");
const fs = require("fs");
const Stripe = require("stripe");
const stripe = Stripe(
  "sk_test_51IJ3AIFgpBUqYvdFw5u8AdhkpByjcIDGs73joYYBADYXhOOhXRuT4zBxZSoBVPCDDVND57KYcF2oJGFxvl13PYt5000jflvCtt"
);
const app = express();

var corsOptions = {
  origin: "*",
};

app.use(cors(corsOptions));
app.use(express.json({ limit: "5mb" }));
app.use(express.urlencoded({ limit: "5mb", extended: true }));
app.use(upload());
app.use(express.static("./uploads"));

// app.use(express.json());
// app.use(express.urlencoded({
//   extended: true
// }));
const routesPath = "./app/routes";
const db = require("./app/models");
db.sequelize
  .sync()
  .then(() => console.log("db synced"))
  .catch((e) => console.log(e));

const User = db.users;

app.get("/", (req, res) => {
  res.send({ message: "Welcome to muncheze." });
});

app.post("/api/checkout", async (req, res) => {
  try {
    console.log(req?.body);
    let user = {};
    user = user?.dataValues || {};

    let customer;
    if (user?.stripe_id) {
      customer = await stripe.customers.retrieve(`${user?.stripe_id}`);
    } else {
      customer = await stripe.customers.create({
        email: req.body.email,
        name: "Name",
        address: {
          city: "Moradabad",
          country: "IN",
          line1: "line 1",
          line2: "line 2",
          postal_code: 244001,
          state: "Uttar Pradhesh",
        },
      });

      await db.users
        .update(
          { stripe_id: customer?.id },
          {
            where: {
              id: req?.body?.user_id,
            },
          }
        )
        .then((num) => {
          if (num >= 1) {
            console.log("stripe data update in user table");
          } else {
            console.log("stripe data not updated");
          }
        })
        .catch((err) => console.log(err));
    }

    const ephemeralKey = await stripe.ephemeralKeys.create(
      { customer: customer.id },
      { apiVersion: "2020-08-27" }
    );
    // console.log("yoyoyo", req.body.amount)
    // Create a PaymentIntent with the payment amount, currency, and customer
    const paymentIntent = await stripe.paymentIntents.create({
      amount: req.body.amount * 100,
      currency: "inr",
      customer: customer.id,
      description: "Food Delivering Services",
    });

    // Send the object keys to the client
    res.send({
      publishableKey: process.env.publishable_key, // https://stripe.com/docs/keys#obtain-api-keys
      paymentIntent: paymentIntent.client_secret,
      customer: customer.id,
      ephemeralKey: ephemeralKey.secret,
    });
  } catch (err) {
    console.log("err", err.message);
  }
});

app.delete("/api/payment/customer/delete/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const deleted = await stripe.customers.del(`${id}`);
    res.send({
      deleted: deleted,
    });
  } catch (err) {
    console.log("error", err);
  }
});

app.get("/api/payment/customers", async (req, res) => {
  try {
    const customers = await stripe.customers.list({
      limit: 10,
    });
    res.send({
      customers: customers,
    });
  } catch (err) {
    console.log("error", err);
  }
});

fs.readdirSync(routesPath).forEach(function (file) {
  if (file.indexOf(".js")) {
    let route = require(routesPath + "/" + file);
    route(app);
  }
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

// const hostname = "192.168.55.2";    //for mobile
// const port = "3002";
// app.listen(port, hostname, () => {
//     console.log(`Server running at http://${hostname}:${port}/`);
// });
