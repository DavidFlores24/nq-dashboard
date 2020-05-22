require("dotenv").config();

const mongoose = require("mongoose");
const { path } = require("ramda");

const UserEndpoint = require("./models/UserEndpoint");

mongoose.connect(process.env.MONGO_DB_URI, {
  useNewUrlParser: true
});

const handler = async (event, context) => {
  const userId = path(["session", "user", "userId"], event);
  const userQuery = userId.replace("amzn1.ask.account.", "").substring(0, 10);

  const query = await UserEndpoint.find({ user: new RegExp(userQuery) }).then();
  let userEndpoint = {};

  if (query.length === 0) {
    // do default and set endpoint to prod lambda
  } else if (query.length > 1) {
    // throw error
  } else {
    userEndpoint = query[0];
  }

  const { endpoint } = userEndpoint;

  return fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(event)
  });
};

exports.handler = handler;
