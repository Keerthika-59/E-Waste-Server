const mongoose = require("mongoose");

const currentDate = () => {
  const test = new Date();
  return test.toLocaleString();
};

const UserActivitySchema = new mongoose.Schema({
  placedOn: {
    type: String,
    default: currentDate,
  },
  bioWaste: Boolean,
  nonBioWaste: Boolean,
  donation: Boolean,
  st: Boolean,
  cl: Boolean,
  fo: Boolean,
  el: Boolean,
  to: Boolean,

  status: {
    type: Boolean,
    default: false,
  },
  userId: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
  },

  repId: {
    type: mongoose.Schema.ObjectId,
    ref: "Representative",
  },
});

const Activity = mongoose.model("Activity", UserActivitySchema);
module.exports = Activity;
