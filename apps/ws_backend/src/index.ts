import {WebSocketServer} from "ws"

const wss = new WebSocketServer({port: 8080})

wss.on("connection", (ws,reqest) => {
  const url = reqest.url
  if (!url) {
    ws.close()
    return
  }
  const token = url.split("=")[1]
  console.log(token)
  console.log(typeof token)
  ws.on("message", (message) => {
    
  })
})