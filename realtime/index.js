const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
});

app.post('/broadcast', (req, res) => {
  const { event, data } = req.body;
  if (!event || !data) {
    return res.status(400).json({ error: 'Missing event or data' });
  }

  io.emit(event, data);
  console.log(`Broadcasted event: ${event}`, data);
  res.json({ success: true });
});

io.on('connection', (socket) => {
  console.log('A user connected:', socket.id);

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Realtime server running on port ${PORT}`);
});
