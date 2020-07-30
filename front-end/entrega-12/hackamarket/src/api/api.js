//DECLARANDO LOS MÓDULOS INSTALADOS
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const mysql = require('mysql')
const app = express()

//MÓDULOS QUE INDICAMOS QUE USE APP

app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

//CONEXIÓN A LA BD
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'Raquel',
    password: 'Raquel',
    database: 'notas'
})

//REALIZANDO CONEXIÓN
connection.connect(error => {
    if (error) throw error
    console.log('DATABASE UP 🚀')
})

//CONEXION A LA API
const PORT = 3050

app.listen(PORT, () => console.log('API UP 🚀'))



//RECOGER TODOS LOS PRODUCTOS DE LA BD
app.get('/productos', (req, res) => {
    //SECUENCIA SQL
    const sql = 'SELECT * FROM listaproductos'

    //CONEXIÓN BD

    connection.query(sql, (error, results) => {
        if (error) throw error
        if (results.length > 0) {
            res.json(results)
        } else {
            'no hay productos que mostrar.'
        }
    })
})

//AÑADIR CLIENTES A LA BD
app.post('/add', (req, res) => {
    const sql = 'INSERT INTO listaclientes SET ?'

    //OBJETO DE DATOS DEL NUEVO CLIENTE
    const nuevoCliente = {
        nombre: req.body.nombre,
        usuario: req.body.usuario,
        password: req.body.password,
        email: req.body.email,
        foto: req.body.foto
    }
    //CONEXIÓN BD
    connection.query(sql, nuevoCliente, error => {
        if (error) throw error
        console.log('cliente creado con éxito')
    })
})

//RECOGER TODOS LOS CLIENTES DE LA BD
app.get('/clientes', (req, res) => {
    //SECUENCIA SQL
    const sql = 'SELECT * FROM listaclientes'

    //CONEXIÓN BD

    connection.query(sql, (error, results) => {
        if (error) throw error
        if (results.length > 0) {
            res.json(results)
        } else {
            'no hay clientes que mostrar.'
        }
    })
})


//ACTUALIZAR CLIENTES
app.put('/update/:id', (req, res) => {
    //DATOS ACTUALIZADOS
    const id = req.params.id
    const nombre = req.body.nombre
    const usuario = req.body.usuario
    const password = req.body.password
    const foto = req.body.foto

    //SECUENCIA SQL
    const sql = `UPDATE listaclientes SET nombre = '${nombre}', usuario = '${usuario}',
    password = '${password}', foto = '${foto}' WHERE id=${id}`

    //CONEXIÓN BD
    connection.query(sql, error => {
        if (error) throw error
        console.log('cliente modificado con éxito')
    })
})

//BORRAR CLIENTE
app.delete('/delete/:id', (req, res) => {

    //RECOGER ID DEL CLIENTE
    const id = req.params.id

    //SECUENCIA SQL
    const sql = `DELETE FROM listaclientes WHERE id=${id}`

    //CONEXIÓN BD
    connection.query(sql, error => {
        if (error) throw error
        console.log('cliente eliminado')
    })
})



