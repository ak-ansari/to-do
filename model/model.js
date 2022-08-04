const mongo = require("mongoose");

const Schema = new mongo.Schema({
  name: {
    type: String,
    required: [true, "must provide a valid name"],
    trim: true,
    maxlength: [20, "name can not be more then 20 charactors"],
  },
  completed: {
    type: Boolean,
    default: false,
  },
});
module.exports = mongo.model("Tasks", Schema);
