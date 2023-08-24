import * as url from 'url'
import express from 'express'
import expresshbs from 'express-handlebars'
import teamRouter from './src/routes/teams.js'

const __dirname = url.fileURLToPath(new URL('.', import.meta.url))
const PORT = 8080

const app = express()
const hbs = expresshbs.create()

app.engine('handlebars', hbs.engine)
app.set('view engine', 'handlebars')

app.use(express.json())
app.use(express.text('*/*'))
app.use(express.urlencoded({ extended: true }))
app.use(express.static(__dirname + 'public/'))
app.use(express.static(__dirname + 'public/assets'))
app.use(express.static(__dirname + 'public/src'))

app.use('/', teamRouter)

app.listen(PORT)
console.log(`Listening on  localhost:${PORT}`)
