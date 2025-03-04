import jwt from "jsonwebtoken";

import { JWT_SECRET } from "backendcommon";
import { Request,Response,NextFunction} from "express";

interface reqwithid extends Request{
    id?:string
}
export const authMiddleware = (req:reqwithid,res:Response,next:NextFunction)=>{
    const token = req.headers.authorization;
    if(token === undefined){
        res.status(401).send("Unauthorized")
        return;
    }
    try{
        const decoded = jwt.verify(token,JWT_SECRET)
        if (typeof decoded !== "object"){
            res.status(401).send("Unauthorized")
            return;
        }
        req.id = decoded.id;
        next();
    }catch(err){
        res.status(401).send("Unauthorized")
    }
}