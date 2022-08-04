const mongo = require("mongoose");
const connectDB = (url) => {
  return mongo.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
};
module.exports = connectDB;
