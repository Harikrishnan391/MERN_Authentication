import jwt from "jsonwebtoken"
import dotenv from "dotenv"
dotenv.config()

const generateUserToken=(userId,res)=>{
    const token=jwt.sign({userId,role:"user"},
        process.env.USER_JWT_SECRET_KEY,
        {
            expiresIn:"30d"
        }
    )

    res.cookie("jwtuser",token,{
        httpOnly:true,
        sameSite:"strict",
        maxAge:30*24*60*1000,
    })
    return token

}

export default generateUserToken