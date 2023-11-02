
import 'dotenv/config'
import * as url from 'url'
import express from 'express'
import expresshbs from 'express-handlebars'
import cors from 'cors'
import teamRouter from './src/routes/teams.js'

const __dirname = url.fileURLToPath(new URL('.', import.meta.url))
const NODE_URL = process.env.NODE_URL || 'http://localhost:8080/'

const app = express()
const hbs = expresshbs.create()

app.engine('handlebars', hbs.engine)
app.set('view engine', 'handlebars')

app.use(cors())
app.use(express.json())
app.use(express.text('*/*'))
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))

app.get('/public/uploads/images/:filename', (req, res) => {
  res.sendFile(__dirname + '/public/uploads/images/' + req.params.filename)
})

app.use('/', teamRouter)

app.listen(NODE_URL)
console.log(`Listening on ${NODE_URL}`)