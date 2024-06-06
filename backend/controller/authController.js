import User from "../models/UserSchema.js";
import bcrypt from "bcryptjs";
import generateUserToken from "../../backend/jwt/user/userjwt.js";

// Registeration

export const register = async (req, res) => {
  const { name, email, number, confirmPassword } = req.body;
  try {
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "User is already exist" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(confirmPassword, salt);

    await User.create({
      name,
      email,
      number,
      password: hashPassword,
    });

    res
      .status(200)
      .json({ status: 200, message: "User registered Successfully" });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ failed: true, message: "Internal server error try Again" });
  }
};

//Login

export const login = async (req, res) => {
  let token;
  try {
    const { email, password, role } = req.body;

    const user = await User.findOne({ email: email });
    if (!user) {
      res.status(404).json({ message: "Invalid user" });
    }else{

      const isPasswordMatch=await bcrypt.compare(password,user.password)
      console.log(isPasswordMatch,"password match")

      if(!isPasswordMatch){
        res.status(400).json({message:"Invalid email or password"})
      }
      else{
        token=generateUserToken(user._id,res)
      }

      console.log(token,"token")

      const {password:userPassword,...rest}=user._doc

      res.status(200).json({
        status:true,
        message:"Login Successfull",
        token,
        user:rest
      })
    }

  } catch (error) {
    console.log(error)
  }
};
