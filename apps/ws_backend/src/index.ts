import {JWT_SECRET} from "backendcommon"
import {WebSocketServer} from "ws"
import jwt from "jsonwebtoken"

const wss = new WebSocketServer({port: 8080})

wss.on("connection", (ws,reqest) => {
  const url = reqest.url
  if (!url) {
    ws.close()
    return
  }
  const token = url.split("=")[1]
    
  if (!token){
    ws.close()
    return
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET)
  console.log(decoded)
  if (!decoded){
    ws.close()
    return
  }

let request
  ws.on("message", (message) => { 
    
    try {
      if (typeof message == "string"){
        request = JSON.parse(message)
      }else{
        request = JSON.parse(message.toString())
      }


      
    } catch (error) {
      ws.close()
      return
    }
    

  })
  } catch (error) {
    ws.close()
  }
})