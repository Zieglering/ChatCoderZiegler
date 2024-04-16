import { Router } from 'express'

const router = Router();

const products = [
    {id:'1', title:'producto 1', precio:'100'},
    {id:'2', title:'producto 2', precio:'101'},
    {id:'3', title:'producto 3', precio:'102'},
    {id:'4', title:'producto 4', precio:'103'},
    {id:'5', title:'producto 5', precio:'104'},
]

const user = {
    username: 'fed',
    nombre: 'Federico',
    apellido: 'Osandon',
    role:'admin',
    mail:'user@mail.com',
    password:'123'
}

// router.get('/', (req, res) => {
//     res.render('index', {
//         username: user.username,
//         nombre: user.nombre,
//         apellido: user.apellido,
//         role: user.role === 'admin',
//         title: 'mercadito || Fede',
//         products,
//         styles: 'indexstyles.css'
//     })
// })

// router.get('/register', (req,res) => {
//     res.render('register', {
//         username: user.username,
//         mail: user.mail,
//         password: user.password
//     })
// })

// router.post('/user', (req, res) => {
//     res.render('')
//     mail
// })

// router.get('/chat', (req,res) => {
//     res.render('chat.handlebars', {
//         styles: 'indexstyles.css'
//     })
// })

router.get('/', (req, res) => {
    res.render('index.handlebars', {})
})

export default router