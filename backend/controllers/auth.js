import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/user.js";

const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      return res
        .status(404)
        .json({ mssg: "already we have you", success: false });
    }
    const hashpassword = await bcrypt.hash(password, 10);

    const newUser = new User({ name, email, password:hashpassword });
    await newUser.save();

    res.status(200).json({ mssg: "saved", success: true });
  } catch (error) {
    res.status(500).json({ mssg: "internal server error", success: false });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(404)
        .json({ mssg: "you are not registerd", success: false });
    }
    const isPass = await bcrypt.compare(password, user.password);
    if (!isPass) {
     return res.status(400).json({ mssg: "not a good user", success: false });
    }

    const jwtToken = jwt.sign(
      { email: user.email, _id: user.id },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );

    res
      .status(200)
      .json({
        mssg: "success",
        success: true,
        jwtToken,
        name: user.name,
        email,
      });
  } catch (error) {
    res.status(500).json({ mssg: "internal server error", success: false });
  }
};


export {signup,login};