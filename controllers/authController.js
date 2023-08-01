import User from "../models/users.js";
import bcrypt from "bcryptjs";
import Jwt from "jsonwebtoken";
import Users from "../models/users.js";

export const createUser = async (req, res) => {
  try {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);
    const savedUser = new Users({
      name: req.body.name,
      email: req.body.email,
      password: hash,
      role: req.body.role,
    });
    await savedUser.save();
    res
      .status(200)
      .json({ sucess: true, message: "Sucessfulle created", data: savedUser });
  } catch (error) {
    res.status(500).json({ sucess: false, message: "Failed", data: error });
  }
};
export const login = async (req,res) => {
  const email = req.body.email;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ sucess: false, message: "User not found" });
    }
    const checkPass = bcrypt.compare(req.body.password, user.password);

    if (!checkPass) {
      return res
        .status(401)
        .json({ sucess: false, message: "Worng pass and email" });
    }
const {password,role,...rest} = user._doc;
    const token = Jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "15d" }
    );

    res.cookie("acessToken", token, {
      httpOnly: true,
      expires: token.expiresIn,
    }).status(200).json({sucess:true,message:"Logged In",data:{role,...rest}})
  } catch (error) {

res.status(500).json({sucess:false,message:'Failed to login'})

  }
};
