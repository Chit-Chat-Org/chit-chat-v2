import crypto from "crypto";
import 'dotenv/config'

const secretKey = process.env.secretKey

if(!secretKey){
    throw new Error('Secret key is missing!')
}
const salt = crypto.randomBytes(16);
const key = crypto.scryptSync(secretKey, salt, 32);

export const generateApiKey = (data:any) => {
    const dataString = JSON.stringify(data);
    const iv = crypto.randomBytes(16);
    const cipher = crypto.createCipheriv("aes-256-cbc", key, iv);
    let encrypted = cipher.update(dataString, "utf8", "hex");
    encrypted += cipher.final("hex");
    return iv.toString("hex") + encrypted;
  };