require("dotenv").config({ path: "./.env.dev" });

const express = require("express");
const cors = require("cors");
const route = require("./route/index.js");

const app = express();
app.use(express.json());
app.use(cors("*"));
app.use("/", route);

app.listen(3000, () => {
  console.log("Community app listening on port 3000");
});
