require("dotenv").config();

const mongoose = require("mongoose");
mongoose.connect(process.env.MONGO_DB_URI, {
  useNewUrlParser: true
});

const UserEndpoint = mongoose.model("UserEndpoint", {
  user: String,
  endpoint: String
});

module.exports = UserEndpoint;
