const serverless = require("serverless-http");
const express = require("express");
const cors = require("cors")
const { todoRoute } = require("./routes/todo");
const { authRoute } = require("./routes/auth");
const app = express();

app.use(express.json({ strict: false }));
app.use(cors())
app.get("/hello", function (req, res) {
  res.send("Hello World!!!!!!!");
});

// app.use("/users", userRoutes)
app.use("/todos", todoRoute)
app.use("/auth", authRoute)

module.exports.handler = serverless(app);
