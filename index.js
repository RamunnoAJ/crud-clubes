import * as url from 'url'
import fs from 'fs'
import express from 'express'
import expresshbs from 'express-handlebars'
import { teamMapper } from './src/mappers/teams.js'

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
  const apiTeams = JSON.parse(fs.readFileSync('./data/equipos.json', 'utf8'))
  const teams = apiTeams.map(team => teamMapper(team))

  console.log('GET /')
  res.render('index', {
    layout: 'main',
    teams,
  })
})

app.get('/teams/:id', (req, res) => {
  const { id } = req.params
  const apiTeam = JSON.parse(fs.readFileSync(`./data/equipos.json`, 'utf8'))
  const teams = apiTeam.map(team => teamMapper(team))
  const team = teams.find(team => team.id === Number(id))

  console.log(`GET /teams/${id}`)
  res.render('team', {
    layout: 'main',
    team,
  })
})

app.listen(PORT)
console.log(`Listening on port ${PORT}`)
