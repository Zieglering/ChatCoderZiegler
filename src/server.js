import express from 'express'

import usersRouter from './routes/users.router.js'
import productsRouter from './routes/products.router.js'
import viewsRouter from './routes/views.router.js'
import { __dirname } from './utils.js'
import { uploader } from './multer.js'

//motor de plantilla
import handlebars from 'express-handlebars'
import { Server } from 'socket.io'

const app = express()
const PORT = process.env.PORT || 8080


// guardar en una constante el listen server
const httpServer = app.listen(PORT, error => {
    if(error) console.log(error)
    console.log('Server escuchando en el puerto 8080')
})
// creamos una instancia del socket server
const io = new Server(httpServer)


app.use(express.json())
app.use(express.urlencoded({extended: true}))

// app.use(express.static('public'))
// app.use('/static', express.static(__dirname+'/public'))
app.use(express.static(__dirname+'/public'))


// express usa este motor de plantillas
// app.engine('hbs', handlebars.engine({
//     extname: '.hbs'
// }))
// seteamos la dirección de mis vistas (plantlillas)
// app.set('views', __dirname+'/views')
// app.set('view engine', 'hbs')

// configuro express para que use este motor de plantillas handlebars
app.engine('handlebars', handlebars.engine())

// seteamos la direccion de mis vistas (plantillas)
app.set('views', __dirname + '/views')
app.set('view engine', 'handlebars')

// middleware
// app.use(productSOcket(io))

app.use('/subir-archivo', uploader.single('myFile') ,(req, res) => {
    if (!req.file) {
        return res.send('no se puede subir el archivo')        
    }

    res.send('archivo subido')
})

// http://localhost:8080 + /api/users

app.use('/', viewsRouter)
app.use('/api/users', usersRouter)

app.use('/api/products', productsRouter)

app.use((error, req, res, next) => {
    console.log(error)
    res.status(500).send('Error 500 en el server')
})

// on es modo escucha
io.on('connection', socket => {
    console.log('nuevo cliente conectado')
    socket.on('message', data => {
        console.log(data)
    })

    socket.emit('socket_individual', 'Este mensaje solo lo debe recibir este socket')

    // como en un chat el que manda el mensaje no lo recibe
    socket.broadcast.emit('para_todos_menos_el_actual', 'este evento lo veran todos los sockets conectados menos el actual')
    // este lo reciben todos incluso el que se conecta
    io.emit('eventos_para_todos', 'este mensaje lo reciben todos los sockets incluido el actual')
})

let messages = []
// podemos llamar a nuestro manager de productos 
io.on('connection', socket => {
    console.log('Cliente conectado')
    socket.on('message', data => {
        console.log('message data: ', data)

        //guardamos los mensajes
        messages.push(data)

        //emitimos los mensajes
        io.emit('messageLog', messages)
    })
})