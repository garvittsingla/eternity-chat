import express from "express"
import userRouter from "./routes/UserRouter"
import roomRouter from "./routes/RoomRouter"


const app = express()

app.use(express.json())
app.use("/user",userRouter)
app.use("/room",roomRouter)

app.listen(8000,()=>{
    console.log("Server is running on port 8000")
})