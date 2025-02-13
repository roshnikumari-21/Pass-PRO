import mongoose from "mongoose";


const passwordSchema = new mongoose.Schema({
  site: { type: String, required: true },
  username: { type: String, required: true },
  password: { type: String, required: true },
});

const Password= mongoose.model("passsword",passwordSchema);

export default Password;