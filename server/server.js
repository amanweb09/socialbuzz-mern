require('dotenv').config()

const express = require('express');
const app = express();
const PORT = process.env.PORT || 5500
const Emitter = require('events');

const server = require('http').createServer(app);

const eventEmitter = new Emitter();
app.set('eventEmitter', eventEmitter)

const io = require('socket.io')(server, {
    cors: {
        origin: 'http://127.0.0.1:3000',
        methods: ['GET', 'POST']
    }
})

const cors = require('cors'); 
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}))

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

const cookieParser = require('cookie-parser')
app.use(cookieParser(process.env.COOKIE_SECRET))

const dbConnection = require('./database/connection')
dbConnection()

app.use(require('./router/auth'))
app.use(require('./router/user_routes'))

server.listen(PORT, () => {
    console.log("Listening server on port", PORT);
})

io.on('connection', (socket) => {
    
    socket.on('like', ({ userId, postId }) => {
        eventEmitter.emit('post_liked', { userId, postId })
    })
    socket.on('comment', ({ userId, postId, comment }) => {
        eventEmitter.emit('post_commented', { userId, postId, comment })
    })
})