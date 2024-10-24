import { Document } from "mongoose";

interface Isignup extends Document{
    email: string;
    username:string;
    password: string;
}

export default Isignup;