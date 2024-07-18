import mongoose from "mongoose";
import {genSaltSync, hashSync} from "bcrypt";
const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "Email is Required."],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Password is Required."],
  },
  firstName: {
    type: String,
    required: false,
  },
  lastName: {
    type: String,
    required: false,
  },
  role: {
    type: String,
    default: "USER",
  },
  image: {
    type: String,
    required: false,
  },
  color : {
    type: Number,
    required: false,
  },
  profileSetup: {
    type: Boolean,
    default: false,
  }
},{
  timestamps: true,
});

userSchema.pre("save", async function (next) {
  const salt = await genSaltSync(10);
  this.password = await hashSync(this.password, salt);
  next();
});

const User = mongoose.model("Users", userSchema);

export default User;