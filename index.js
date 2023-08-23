import * as url from 'url'
import fs from 'fs'
import express from 'express'
import expresshbs from 'express-handlebars'

const __dirname = url.fileURLToPath(new URL('.', import.meta.url))
const PORT = 8080

const app = express()
const hbs = expresshbs.create()

app.engine('handlebars', hbs.engine)
app.set('view engine', 'handlebars')

app.use(express.json())
app.use(express.text('*/*'))
app.use(express.urlencoded({ extended: true }))
app.use(express.static(__dirname + '/public'))

app.get('/', (req, res) => {
  const teams = JSON.parse(fs.readFileSync('./data/equipos.json', 'utf8'))
  console.log(teams[0])
  console.log('GET /')
  res.render('index', {})
})

app.listen(PORT)
console.log(`Listening on port ${PORT}`)
