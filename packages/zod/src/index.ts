import {z} from 'zod';


export const AuthSchema = z.object({
    username:z.string().email(),
    password:z.string()
})

export const MessageSchema = z.object({
    content : z.string().min(1).max(100),
})

export  const RoomSchema = z.object({
    name : z.string().min(1).max(10),
})

