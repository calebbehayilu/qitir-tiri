require("dotenv").config();
const helmet = require("helmet");
const morgan = require("morgan");
const express = require("express");
const cors = require("cors");
const { connect } = require("./utils/dbconnect");
const user = require("./routes/user");
const auth = require("./routes/auth");
const app = express();

connect();

app.use(cors());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Welcome.");
});

app.use("/user", user);
app.use("/auth", auth);

app.get("*", (req, res) => {
  res.send({ error: "404 Not Found" });
});
app.listen(3000, () => {
  console.log(`connected to 3000`);
});
