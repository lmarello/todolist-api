import express from 'express'
import morgan from 'morgan'
import pkg from '../package.json'
import todoRoutes from './routes/todo.routes'
import authRoutes from './routes/auth.routes'
import { isAuthenticated } from './middlewares'

require('dotenv').config()
require('./database')

const app = express()

app.set('pkg', pkg)

app.use(express.json())
app.use(morgan('dev'))

app.get('/api', (req, res) => {
    res.json({
        name: app.get('pkg').name,
        author: app.get('pkg').author,
        version: app.get('pkg').version,
        description: app.get('pkg').description,
    })
})

app.use('/api/todos', isAuthenticated, todoRoutes)
app.use('/api/auth', authRoutes)

if (process.env.DEVELOP) {
    const port = process.env.PORT
    app.listen(port)
    console.log('Server listening o port', port)
}

export default app
