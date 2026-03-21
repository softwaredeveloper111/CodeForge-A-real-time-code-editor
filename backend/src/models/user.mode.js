import mongoose from "mongoose";
import bcrypt from "bcryptjs";


const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      trim: true,
      required: [true, "username should be required"],
      unique: [
        true,
        "username already used with another account, please choose a different one",
      ],
      match: [
        /^[a-zA-Z0-9_]+$/,
        "Username can only contain letters, numbers, and underscores",
      ],
      minlength: [3, "Username must be at least 3 characters long"],
      maxlength: [20, "Username must be at most 20 characters long"],
    },

    email: {
      type: String,
      trim: true,
      lowercase: true,
      required: [true, "email should be required"],
      unique: [
        true,
        "email already used with another account, please choose a different one",
      ],
      match: [
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        "Invalid email format",
      ],
    },

    password: {
      type: String,
      trim: true,
      required: [true, "password should be required"],
      match: [
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        "Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, one number, and one special character",
      ],
      select: false,
    },

    avatar: {
      type: String,
      default:
        "https://ik.imagekit.io/a490stdk4/stylish-spectacles-guy-3d-avatar-character-illustrations-png.webp?updatedAt=1770782847473",
    },

  },
  { timestamps: true },
);



/** password (when modified) converted into hash form then store in DB */
userSchema.pre("save", async function()  {
  const user = this;

  if (user.isModified("password")){
      user.password = await bcrypt.hash(user.password,Number(process.env.GEN_SALT));
  }

});



/** we can use this mehtods for compare your passwrod */
userSchema.methods.comparePassword = async function (candidatePassword) {
  const user = this;
  return await bcrypt.compare(candidatePassword, user.password);
};



const userModel = mongoose.model("user", userSchema);


export default userModel;
