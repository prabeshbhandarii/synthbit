import express from 'express'
import { createServer } from 'http'
import { WebSocketServer } from 'ws'
import cors from 'cors'
import url from 'url'

const app = express()
const server = createServer(app)

const wss = new WebSocketServer({ server })

const connections = {}
app.use(express.json())
app.use(cors())

wss.on('connection', (socket, request) => {
  const { roomId } = url.parse(request.url, true).query;

  console.log('a user connected')
  if(!connections[roomId]){
    connections[roomId] = []
  }
  connections[roomId].push(socket)


  socket.on('message', msg => {
    Object.keys(connections).forEach(roomId => {
      connections[roomId].forEach(conn => {
        if (conn !== socket) {
          conn.send(msg.toString());
        }
      });
    });

  })

  socket.on('close', () => {
    console.log('User disconnected');
    if (connections[roomId]) {
      connections[roomId] = connections[roomId].filter(conn => conn !== socket);

      if (connections[roomId].length === 0) {
        delete connections[roomId];
      }
    }
  });

})


server.listen(8000, () => {
  console.log('WebSocket server running on port 8000')
})

