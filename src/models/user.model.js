import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      minlength: 1,
      maxlength: 30,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
      maxlength: 100, // allows room for hashed passwords
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, "Invalid email format"],
    },
    role: {
      type: String,
      enum: ["user", "admin", "moderator"],
      default: "user",
    },

    loggedIn: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

// before saving any password we need to hash it!
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password;
});
// compare password
userSchema.methods.comparePassword = async function (Candidatepassword) {
  return await bcrypt.compare(Candidatepassword, this.password);
};
export const User = mongoose.model("User", userSchema);
