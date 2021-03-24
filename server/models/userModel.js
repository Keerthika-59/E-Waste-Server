const mongoose = require("mongoose");

const currentDate = () => {
  const test = new Date();
  return test.toLocaleString();
};

const UserActivitySchema = new mongoose.Schema({
  bioWaste: Boolean,
  nonBioWaste: Boolean,
  placedOn: {
    type: String,
    default: currentDate,
  },
  donation:Boolean,
//   donation: 
//     {
//       name: String,
//       category: String,
//     },
  type1:Boolean,
  type2:Boolean,
  type3:Boolean,
  type4:Boolean,
  type5:Boolean,
  status: {
    type: Boolean,
    default: false,
  },

  repId: {
    type: String,
  },
});

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  phoneNumber: {
    type: Number,
    required: true,
  },

  email: {
    type: String,
    required: true,
  },

  gender: {
    type: String,
    required: true,
  },

  city: {
    type: String,
    required: true,
  },

  address: {
    type: String,
    required: true,
  },

  password: {
    type: String,
    required: true,
  },

  activity: [UserActivitySchema],
});

const User = mongoose.model("User", UserSchema);
module.exports = User;
