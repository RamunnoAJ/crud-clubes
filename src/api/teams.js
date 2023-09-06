/* @typeof {import('../entities/teams.js').Team} Team */

import fs from 'fs'
import * as url from 'url'
import { teamApiMapper, teamMapper } from '../mappers/teams.js'
import { checkTeamExists } from '../utils/checkTeamExists.js'

const __dirname = url.fileURLToPath(new URL('.', import.meta.url))
const teamsDirectory = __dirname + '../../data/equipos.json'

const apiTeam = JSON.parse(fs.readFileSync(teamsDirectory, 'utf8'))
const teamsDB = apiTeam.map(team => teamMapper(team))

/*
 * @param {string} abbreviation
 * */
export function deleteTeam(abbreviation) {
  const team = getTeamByAbbreviation(abbreviation)
  teamsDB.splice(teamsDB.indexOf(team), 1)

  return fs.writeFileSync(teamsDirectory, JSON.stringify(teamsDB))
}

/*
 * @param {string} abbreviation
 * @param {Team} newTeam
 * */
export function updateTeam(abbreviation, newTeam) {
  const team = teamsDB.find(team => team.abbreviation === abbreviation)
  const isExistent = checkTeamExists(teamsDB, newTeam.tla)
  newTeam.lastUpdated = new Date().toISOString()

  for (const key in newTeam) {
    if (newTeam[key] !== undefined) {
      if (key === 'area') {
        team.country = newTeam.area.name
      } else if (key === 'crestUrl') {
        team.crestUrl = newTeam.image
      } else if (key === 'tla') {
        team.abbreviation = newTeam.tla
      } else {
        team[key] = newTeam[key]
      }
    }
  }

  if (isExistent !== undefined && team.abbreviation !== newTeam.tla) {
    throw new Error('Abbreviation already exists')
  }

  const teams = teamsDB.toSpliced(teamsDB.indexOf(team), 1, team)
  const updatedTeams = teams.map(team => teamApiMapper(team))

  return fs.writeFileSync(teamsDirectory, JSON.stringify(updatedTeams))
}

/*
 * @return {Array<Team>}
 * */
export function getTeams() {
  return teamsDB
}

/*
 * @param {string} abbreviation
 * @return {Team}
 * */
export function getTeamByAbbreviation(abbreviation) {
  if (!abbreviation) throw new Error('Invalid team abbreviation')

  const team = teamsDB.find(team => team.abbreviation === abbreviation)

  return team
}

export function createTeam(newTeam) {
  newTeam.lastUpdated = new Date().toISOString()

  const isExistent = checkTeamExists(teamsDB, newTeam.tla)
  if (isExistent !== undefined) {
    throw new Error('Abbreviation already exists')
  }

  console.log(newTeam)
  const teams = teamsDB.toSpliced(teamsDB.length, 0, newTeam)
  const updatedTeams = teams.map(team => teamApiMapper(team))

  return fs.writeFileSync(teamsDirectory, JSON.stringify(updatedTeams))
}
