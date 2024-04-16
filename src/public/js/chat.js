// console.log('Bienvenido al chat')

const socket = io()

// emit manda o emite un evento
socket.emit('message', 'esto es data en forma de string')

socket.on('socket_individual', data => {
    console.log(data)
})

socket.on('para_todos_menos_el_actual', data => {
    console.log(data)
})

socket.on('eventos_para_todos', data => {
    console.log(data)
})
