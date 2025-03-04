import express,{Router} from "express";
import { AuthSchema } from "@repo/zod";
import { prismaClient } from "db";
import { JWT_SECRET } from "backendcommon";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

const userRouter:Router = express.Router();

userRouter.post("/signup",async(req,res)=>{
    const data = req.body;
    const parsedData = AuthSchema.safeParse(data);

    if (!parsedData.success){
        res.status(411).send("Incorrect Inputs")
        return;
    }
    const existinguser =await prismaClient.user.findUnique({
        where:{
            username:parsedData.data.username
        }
    })

    if(existinguser !== null){
        res.status(409).send("User already exists")
        return;
    }
    const hashed = await bcrypt.hash(parsedData.data.password,10);
    const newUser = await prismaClient.user.create({
        data:{
            username:parsedData.data.username,
            password:hashed
        }
    })

    res.status(200).send("User Created")
})


userRouter.post("/signin",async(req,res)=>{
    const data = req.body;
    const parsedData = AuthSchema.safeParse(data);

    if (!parsedData.success){
        res.status(411).send("Incorrect Inputs")
        return;
    }
    const existinguser =await prismaClient.user.findUnique({
        where:{
            username:parsedData.data.username
        }
    })

    if(existinguser===null){
        res.status(409).send("User doesnt exists")
        return;
    }

    const ispasswordcorrect = await bcrypt.compare(parsedData.data.password,existinguser.password);
    if(!ispasswordcorrect){
        res.status(409).send("Incorrect Password")
        return;
    }
    const token = jwt.sign({id : existinguser.id},JWT_SECRET);
    res.status(200).send({token:token})
})

export default userRouter;