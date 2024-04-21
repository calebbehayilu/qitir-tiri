const jwt = require("jsonwebtoken");
const express = require("express");
const route = express();
const bcrypt = require("bcrypt");
const Joi = require("joi");
const { User } = require("./../Models/Users");
const auth = require("../middleware/auth");

route.use(express.json());

route.post("/", async (req, res) => {
  const body = req.body;

  const { error } = validate(body);
  if (error) return res.status(400).send(error.details[0].message);

  const user = await User.findOne({ email: body.email });
  if (!user) return res.status(404).send("Incorrect Email or Password");

  const password = await bcrypt.compare(body.password, user.password);
  if (!password) return res.status(404).send("Incorrect Email or Password");

  const token = await generateToken(user);

  res
    .header("x-auth-token", token)
    .header("access-control-expose-headers", "x-auth-token")

    .send(user);
});

async function generateToken(user) {
  const token = jwt.sign({ id: user._id, user: user.name }, "keyjson");
  return token;
}

function validate(body) {
  const schema = Joi.object({
    email: Joi.string()
      .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
      .min(6)
      .max(30)
      .required(),
    password: Joi.string()
      .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
      .min(6)
      .max(30)
      .required(),
  });
  return schema.validate(body);
}

module.exports = route;
