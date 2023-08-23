import fs from 'fs'
import * as url from 'url'
import { teamMapper } from '../mappers/teams.js'

const __dirname = url.fileURLToPath(new URL('.', import.meta.url))

const apiTeam = JSON.parse(
  fs.readFileSync(__dirname + '../../data/equipos.json', 'utf8'),
)
const teamsDB = apiTeam.map(team => teamMapper(team))

export function deleteTeam(id) {
  const team = teamsDB.find(team => team.id === id)
  teamsDB.splice(teamsDB.indexOf(team), 1)
  return fs.writeFileSync(
    __dirname + '/../data/equipos.json',
    JSON.stringify(teamsDB),
  )
}

export function getTeams() {
  return teamsDB
}
