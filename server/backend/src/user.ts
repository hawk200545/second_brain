import { Router } from "express";
import { hashSync, compareSync } from "bcrypt";
import * as z from "zod";
import { UserModel as User } from "../database/mongoose";
import jwt from "jsonwebtoken";
import { JWT_USER_SECRET } from "../config/config";
import { Request, Response } from "express";

if (!JWT_USER_SECRET) {
    throw new Error("JWT_USER_SECRET is not defined. Please set it in your .env file.");
}
const JWT_SECRET: string = JWT_USER_SECRET ;

const app = Router();


const userSchema = z.object({
  username: z
    .string()
    .min(3, { message: "name is too short" })
    .max(10, { message: "name is too long" }),
  password: z
    .string()
    .min(8, { message: "passord is too short" })
    .max(20, { message: "password is too long" })
    .regex(/^(?=.*[a-z])(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).+$/, {
      message:
        "Password must contain atleat 1 Uppercase, 1 LowerCase, 1 Digit and a Special Character",
    }),
});

app.get("/", async(req: Request, res: Response)=>{
  res.send("Deployed Succesfully")
})

app.post("/match", async(req :Request, res: Response)=> {
  const username = req.body.username;
  let response = await User.findOne({
    username
  })
  if(!response){
    res.status(200).json({
      message : "username available"
    })
  }else {
    res.status(201).json({
      message: "User already exists",
    });
  }
})

// Signup endpoint @params : {username,password} from body
// Returns
// 1. Status 200 - Signed up
// 2. Status 411 - Error in inputs
// 3. Status 403 -  User already exists with this username
// 4. Status 500 - Server error

app.post("/signup", async (req, res) => {
  const username: string = req.body.username;
  const password: string = req.body.password;

  const { success, data, error } = userSchema.safeParse({ username, password });

  if (!success) {
    res.status(411).json({
      message: "Error in Inputs",
      error,
    });
    return;
  }

  const exist = await User.findOne({
    username,
  }).catch((err : any)=>{
    res.status(500).json({
      message : "Internal error",
      err
    })
  })

  if (exist) {
    console.log(exist);
    res.status(403).json({
      message: "User already exist",
    });
    return;
  }

  let response = await User.create({
    username,
    password: hashSync(password, 3), //For test purpose, Have to change
    // password
  }).catch((err : any) => {
    res.status(500).send({ message: "Internal Error while creating User." , err});

    return;
  });

  if (response) {
    res.status(200).json({
      message: "You are Signed up",
    });
  }
});

// Signin endpoint @params : {username,password}
// Returns
// 1. 200 - JWT
// 2. 403 - Wrong email or password
// 3. 500 - Internal Error
// 4. 411 - Incorrect Password

app.post("/signin", async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  console.log(username,password)
  const { success, data, error } = userSchema.safeParse({ username, password });

  if (!success) {
    res.status(411).json({
      message: "Error in Inputs",
      error,
    });
    return;
  }

  const exist = await User.findOne({
    username,
  }).catch((err : any)=>{
    res.status(500).json({
      message : "Internal Error",
      err
    })
  })

  if (exist) {
    let check = compareSync(password, exist.password);
    if (check) {
      res.status(200).json({
        token: 'Bearer ' +  jwt.sign(
          {
            id: exist._id,
          },
          JWT_SECRET
        ),
        message: "You are logged in!!",
      });
    }
    else {
      res.status(411).json({
        message : "Incorrect Password"
      })
    }
  }
  else {
    res.status(403).json({
      message : "User dosen't exist"
    })
  }
});

export const user_route = app;