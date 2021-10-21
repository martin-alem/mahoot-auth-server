import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  emailAddress: {
    type: String,
    unique: true,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  quizzes: {
    type: [mongoose.ObjectId],
    required: false,
    default: [],
  },
});

const User = mongoose.model("User", UserSchema);

export default User;
