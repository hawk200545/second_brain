import { ContentModel, LinkModel } from "../database/mongoose";
import { Router } from "express";
import { Request, Response } from "express";
import { randHash } from "./utils";
import user_middleware from "./middleware";
import { ObjectId } from "mongoose";

interface UserRequest extends Request{
    user?: {
        id : string
    }
}

const app = Router();

//Use of User middleware for the sharable endpoint
app.post("/share", user_middleware, async(req : UserRequest, res: Response)=>{
    const share: boolean = req.body.share;
    const userId: string | undefined = req.user?.id;
    if(share === undefined){
        res.status(400).json({
            message : "Invalid request"
        })
        return ;
    }
    if(share){
        let user = await LinkModel.findOne({
            userId : userId
        })
        if(user){
            res.status(201).json({
                hash : user.hash
            })
        }else {
            const hash = randHash(10);
            await LinkModel.create({
                hash,
                userId
            })
            res.status(200).json({
                hash
            })
        }
    }else{
        let shared = await LinkModel.findOne({
            userId
        })
        if(shared){
            await LinkModel.deleteOne({
                userId
            })
            res.status(202).json({
                message : "The sharable link is deleted"
            })
        }else {
            res.status(205).json({
                message : "There is no sharable link to begin with!!!"
            })
        }
    }
})

app.get("/:sharelink", async(req : Request, res : Response) => {
    const hash = req.params.sharelink;

    try{
        let link = await LinkModel.findOne({
        hash
    })
    if(!link) {
        res.status(404).json({
            message : "The link does not contain any content"
        })
        return;
    }
    const userId = link.userId;
    let content = await ContentModel.find({
        userId 
    })
    res.status(200).json({
        content
    })
    }catch(err){
        res.status(500).json({
            message : "Internal message",
            err
        })
    }
})

export const link_route = app;
