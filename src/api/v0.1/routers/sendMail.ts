import { Router, Request, Response } from "express";
import genrateOtp from "../services/genrateOtp";
import { sendMail } from "../services/nodemailer";
import { JwtAuth } from "../middlewares/JwtAuth";

const router = Router()

router.post('/',JwtAuth,async(req: Request, res: Response)=>{
    // verify email

    try {
        const {email} = req.body;

        const randomNumber = genrateOtp();

        const response = await sendMail({email,randomNumber})

        if(!response){
        throw new Error('Error in sending mail')
        }
        return res.status(201).json({otp: randomNumber, message:"Email has been sent"});
    } catch (error) {
        console.log("err", error);
    }
})

export default router;