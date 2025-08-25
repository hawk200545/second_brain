import express from "express";
import { json } from "express";
import user_middleware from "./middleware";
import { user_route } from "./user";
import { content_route } from "./content";
import { link_route } from "./share";
import cors from "cors"
const app = express();

app.use(
  cors({
    origin: "",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "token"],
  })
);

app.use(json());
app.use("/api/v1",user_route); // User Route doesn't need a middleware
app.use("/api/v1/brain",link_route);
app.use(user_middleware); // Adding middleware for verification of jwt and parsing the userId
app.use("/api/v1",content_route); 

export default app; //for vercel serverless






