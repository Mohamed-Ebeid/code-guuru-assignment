import mongoose from "mongoose";

var { Schema } = mongoose;
mongoose.Promise = global.Promise;

var userSchema = new Schema(
  {
    //creating collections
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    code: { type: String },
  },
  {
    timestamps: true,
  },
);

const User = mongoose.model("User", userSchema);
export default User;
