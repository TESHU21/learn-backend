import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";
import { type } from "node:os";
import { maxLength, minLength, minSize, required } from "zod/mini";
import { string } from "zod";

const userSchema = new Schema(
  {
    firstName: {
      type: String,
      minLength: 1,
      maxLength: 30,
      trim: true,
      default: undefined,
    },
    lastName: {
      type: String,
      minLength: 1,
      maxLength: 30,
      trim: true,
      default: undefined,
    },
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
    bio: {
      type: String,
      default: "",
    },
    phone: {
      type: String,
      default: "",
    },
    address: {
      type: String,
      default: "",
    },
    refreshTokens: [
      {
        token: {
          type: String,
          required: true, // hashed refresh token
        },
        device: {
          type: String, // optional, device name or identifier
        },
        ip: {
          type: String, // optional, IP address for logging
        },
        createdAt: {
          type: Date,
          default: Date.now,
        },
        expiresAt: {
          type: Date,
          required: true,
        },
      },
    ],
    avatar: {
      url: {
        type: String,
        default:
          "https://res.cloudinary.com/demo/image/upload/v1690000000/default-avatar.png",
      },
      public_id: {
        type: String,
        default: null,
      },
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
userSchema.pre("save", async function () {
  if (!this.isModified("password")) return;

  this.password = await bcrypt.hash(this.password, 10);
});

// compare password
userSchema.methods.comparePassword = async function (Candidatepassword) {
  return await bcrypt.compare(Candidatepassword, this.password);
};
// add reresh Token
userSchema.methods.addRefreshToken = async function (
  refreshToken,
  expiresAt,
  device,
  ip
) {
  const hashedToken = await bcrypt.hash(refreshToken, 10);
  this.refreshTokens.push({
    token: hashedToken,
    device,
    ip,
    expiresAt,
  });
  await this.save();
};
// Validate Refresh Token
userSchema.methods.validateRefreshToken = async function (refreshToken) {
  for (const storedToken of this.refreshTokens) {
    const isMatch = await bcrypt.compare(refreshToken, storedToken.token);
    if (isMatch && storedToken.expiresAt > new Date()) {
      return storedToken;
    }
  }
  return null;
};
userSchema.methods.removeRefreshToken = async function (refreshToken) {
  this.refreshTokens = await Promise.all(
    this.refreshTokens.filter(async (t) => {
      return !(await bcrypt.compare(refreshToken, t.token));
    })
  );

  await this.save();
};

export const User = mongoose.model("User", userSchema);
