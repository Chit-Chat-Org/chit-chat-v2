import mongoose from 'mongoose'
import Isignup from '../interfaces/Isignup';

const SignUp = new mongoose.Schema({
    email:{
        type:String,
        required:[true,'Please provide your Email'],
        unique: true
    },
    username:{
        type: String,
        require: true,
        maxLength: 20,
        minLength: 5,
    },
    password:{
        type: String,
        require: true,
    }
})

const Signup = mongoose.model<Isignup>('SignUp',SignUp);

export default Signup;