import express from "express";
import { json } from "express";
import user_middleware from "../src/middleware";
import { user_route } from "../src/user";
import { content_route } from "../src/content";
import { link_route } from "../src/share";
import { connectDB } from "../database/mongoose";
connectDB();
import cors from "cors"
const app = express();

app.use(
  cors({
    origin: "https://second-brain-app-three.vercel.app/",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "token"],
  })
);

app.use(json());
app.use("/api/v1",user_route); // User Route doesn't need a middleware
app.use("/api/v1/brain",link_route);
app.use(user_middleware); // Adding middleware for verification of jwt and parsing the userId
app.use("/api/v1",content_route); 
app.listen(3000, () => console.log("Server ready on port 3000."));

export default app; //for vercel serverless






