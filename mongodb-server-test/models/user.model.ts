import mongoose, {Schema, model, trusted} from "mongoose";

  const userSchema = new Schema(
    {
      name: {
        type: String,
        required: true,
      },
      image: {
        type: String,
        require: true,
      },
      email: {
        type: String,
        required: true,
        unique: true,
      },
      password: {
        type: String,
        required: true,
      },
      gender: {
        type: String,
        required: true,
      },
      phone: {
        type: String,
        required: true,
      },
      address: {
        type: String,
        required: false,
    },
    role: {
        type: String,
        required: true,
    },
},
    {
      timestamps: true,
    }
);
  
const User = mongoose.model("user", userSchema);

export default User