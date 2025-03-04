import { RoomSchema } from "@repo/zod";
import { prismaClient } from "db";
import express,{Router,Request} from "express";
import { authMiddleware } from "../middleware";

const roomRouter:Router = express.Router();

interface reqwithid extends Request{
    id?:string
}
roomRouter.get("/rooms",authMiddleware,async(req:reqwithid,res)=>{
    const rooms = await prismaClient.room.findMany();
    res.status(200).send(rooms)
})
roomRouter.post("/create",authMiddleware,async(req:reqwithid,res)=>{
    const name = req.body;
    const creater = req.id;
    const parsedData = RoomSchema.safeParse(name);
    if (!parsedData.success){
        res.status(411).send("Incorrect Inputs")
        return;
    }
    const existingRoom = await prismaClient.room.findFirst({
        where:{
            name:parsedData.data.name
        }
    })
    if(existingRoom !== null){
        res.status(409).send("Room already exists")
        return;
    }
    const newRoom = await prismaClient.room.create({
        data:{
            name:parsedData.data.name,
            creatorId:creater!
        }
    })
    res.status(200).send("Room Created")
})

export default roomRouter;