import { Router, Response, Request } from "express";
import Signup from "../schema/SignUp";
import { compareHashedPassword } from "../services/HashedPassword";
import jwt from "jsonwebtoken";

const router = Router();

router.post("/", async (req: Request, res: Response) => {
  const secretKey: string | undefined = process.env.JWT_SECRET_KEY;

  if (!secretKey) return res.status(500).send("Server Error");
  // fetching credentials
  const { username, password } = req.body;
  if (!username || !password)
    return res.status(400).json({ error: "Missing username or password" });
  try {
    // finding data in database
    let user = await Signup.findOne({ username });
    if (!user) return res.status(404).json("User not found");
    // compare passwords - bcrypt
    const isPasswordValid = compareHashedPassword(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: "Wrong credentials!" });
    }
    console.log(user._id)
    const token = jwt.sign({ userId: user._id }, secretKey, {
      expiresIn: "7d",
    });

    return res.status(200).json({
      id: user._id,
      username: user.username,
      token,
      message: "Login successful",
    });
  } catch (error) {
    console.log("Oops! Some error Occurs.", error);
  }
});

export default router;