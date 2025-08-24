import { Router, Request, Response } from "express";
import * as z from "zod";
import { Types } from "mongoose";
import { UserModel as User, ContentModel as Content } from "../database/mongoose";

// Extending to include the user in the Request interface.
//  TODO : Should find a proper way to do this 
interface UserRequest extends Request {
  user?: {
    id: string;
  };
}

const app = Router();

// Zod Schema for the content
// Updated to match the card component in the frontent
const contentSchema = z
  .object({
    type: z.enum(["Tweet", "Document", "Video"]), 
    link: z.string().optional(), 
    title: z.string().min(1, { message: "Title cannot be empty" }),
    tags: z.array(z.string()).optional(),
    body: z.object({
      title: z.string().optional(),
      paragraph: z.string().optional(),
      points: z.array(z.string()).optional(),
    }).optional(),
  }).strict();

type IContent = z.infer<typeof contentSchema>;


// Content Creation Endpoint : @params{jwt -> userId, contentObject}
// Returns
// 1. 401 - For Unothorized entry, Imposiible to get {handled by middleware itself}
// 2. 404 - No user found, Cause maybe delection of the user.
// 3. 200 - Success !!! - Content created
// 4. 500 -  Internal Error [Maybe creation of content failed -> check the err in the json]
app.post("/content", async (req: UserRequest, res: Response) => {
  if (!req.user || !req.user.id) {
    return res.status(401).json({
      message: "Unauthorized: User information missing from token.",
    });
  }

  const { success, data, error } = contentSchema.safeParse(req.body);

  if (!success) {
    return res.status(400).json({
      message: "Wrong Inputs",
      errors: error.issues,
    });
  }

  const newContent: IContent = data;
  try {
    const userExists = await User.findOne({
      _id: req.user.id,
    });

    if (!userExists) {
      return res.status(404).json({
        message: "User not found.",
      });
    }

    const createdContent = await Content.create({
      ...newContent,
      userId: req.user.id, 
    });

    return res.status(200).json({
      message: "Content created successfully",
      content: createdContent,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      message: "Internal server error.",
      err
    });
  }
});

// Content Fetching endpoint @params{jwt -> userId}
// Returns 
// 1. 200 - Success!! -> returns all the contents of the user in json
// 2. 401 - Unauthorized | Prolly a Deleted User
// 3. 500 - Internal error {Prolly db error while fetching}
app.get("/content", async(req : UserRequest,res : Response)=>{
  if (!req.user || !req.user.id) {
    return res.status(401).json({
      message: "Unauthorized: User information missing from token.",
    });
  }
  try{
    let user = await User.findById(req.user.id);
    if(!user){
      res.json(401).json({
        message : "User does not exist"
      })
      return ;
    }
    let content = await Content.find({
      userId : req.user.id.toString()
    })
    res.status(200).json({
      content
    });
    
  }catch(err){
      res.status(500).json({
        message : "Internal error"
      })
  }
})

// Content deletion endpoint @params{id : Content id}
// Returns
// 200 - Success!!! - Deletion Successfull
// 401 - Unauthorized - No content_id{id} | user_id provied{handled by middleware}
app.delete("/content", async(req:UserRequest , res : Response)=>{
    const user_id = req.user?.id;
    const content_id = req.body.id;
    if(!user_id || !content_id) {
      res.status(401).json({
        message : "Unauthorized entry"
      })
      return ;
    }
    let content = await Content.findById(content_id);
    if(content?.userId && content.userId.equals(new Types.ObjectId(user_id))) {
        await Content.deleteOne({
          _id : content._id
        })
        res.status(200).json({ message: "Content deleted successfully" });
    } else {
        res.status(403).json({ message: "Unauthorized to delete this content" });
    }
})

export const content_route = app;