import express from "express";
import { json } from "express";
import user_middleware from "./middleware";
import { user_route } from "./user";
import { content_route } from "./content";
import { link_route } from "./share";

const app = express();

app.use(json());
app.use("/api/v1",user_route); // User Route doesn't need a middleware
app.use("/api/v1/brain",link_route);
app.use(user_middleware); // Adding middleware for verification of jwt and parsing the userId
app.use("/api/v1",content_route); 

app.listen(3000,()=>{
    console.log(`Listening port : ${3000}`)
});





