const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const axios = require("axios");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(bodyParser.json());
const PORT = process.env.PORT;

const omise = require("omise")({
  publicKey: process.env.OMISE_PUBLIC_KEY,
  secretKey: process.env.OMISE_SECRET_KEY,
});

app.post("/checkout-credit-card", async (req, res, next) => {
  // Data sent from front-end
  const { email, name, amount, token } = req.body;

  try {
    const customer = await omise.customers
      .create({
        email: email,
        description: name,
        card: token,
      })
      .catch((err) => console.log(err));

    const charge = await omise.charges
      .create({
        amount: amount,
        currency: "thb",
        customer: customer.id,
      })
      .catch((err) => console.log(err));

    console.log(charge);
    console.log(customer);
    res.send({
      amount: charge.amount,
      status: charge.status,
      name: customer.description,
      email: customer.email,
    });
  } catch (error) {
    console.log(error);
  }

  next();
});

app.get("/checkout-credit-card", async (req, res, next) => {
  // Data sent from front-end
  const { email, name, amount, token } = req.body;

  try {
    const customer = await omise.customers
      .create({
        email: email,
        description: name,
        card: token,
      })
      .catch((err) => console.log(err));

    const charge = await omise.charges
      .create({
        amount: amount,
        currency: "thb",
        customer: customer.id,
      })
      .catch((err) => console.log(err));

    console.log(charge);
    console.log(customer);
  } catch (error) {
    console.log(error);
  }

  next();
});

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
