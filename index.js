import 'dotenv/config'
import * as url from 'url'
import express from 'express'
import expresshbs from 'express-handlebars'
import cors from 'cors'
import teamRouter from './src/routes/teams.js'

const __dirname = url.fileURLToPath(new URL('.', import.meta.url))
const PORT = process.env.PORT || 8080

const app = express()
const hbs = expresshbs.create()

app.engine('handlebars', hbs.engine)
app.set('view engine', 'handlebars')

app.use(cors())
app.use(express.json())
app.use(express.text('*/*'))
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))

app.get('/public/uploads/:filename', (req, res) => {
  res.sendFile(__dirname + '/public/uploads/' + req.params.filename)
})

app.use('/', teamRouter)

app.listen(PORT)
console.log(`Listening on localhost:${PORT}`)
