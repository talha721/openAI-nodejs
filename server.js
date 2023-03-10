const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const config = require('./config/config');

dotenv.config({ path: "./.env" });

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
// app.use(express.json);

app.use("/api/openai", require("./routes"));

app.listen(process.env.PORT || config.PORT, () => {
  console.log(`Server is running on PORT ${process.env.PORT || config.PORT}`);
});
