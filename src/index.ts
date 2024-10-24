import express, { Request, Response } from "express";
import dotenv from "dotenv";
import register from "./api/v0.1/controllers/register";
import control from './api/v0.1/controllers/product.control';

dotenv.config();

import "./api/v0.1/config/mongodb";
import bodyParser from "body-parser";
import fileupload from 'express-fileupload';
import cors from 'cors';
import path from "path";

const app = express();
const PORT = process.env.PORT || 8001;

// Middleware
app.use(bodyParser.json());
app.use(cors({ origin: true }));
app.use(fileupload());

// API Routes
app.use("/", register);
app.use('/api/v0.1', control);

if (process.env.NODE_ENV === 'production') {
  const buildPath = path.join(__dirname, "../build");
  app.use(express.static(buildPath));

  app.get('*', (req: Request, res: Response) => {
    res.sendFile(path.resolve(buildPath, 'index.html'));
  });
} else {
  app.get('/', (req: Request, res: Response) => res.send('Please set to production'));
}


app.get("/hello", (req: Request, res: Response) => {
  res.status(200).json("Hello World !");
});


app.listen(PORT, () => {
  console.log(`Connected to PORT ${PORT}`);
});
