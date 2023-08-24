/* @typeof {import('../entities/teams.js').Team} Team */

import fs from 'fs'
import * as url from 'url'
import { teamMapper } from '../mappers/teams.js'
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
  const isExistent = checkTeamExists(teamsDB, newTeam.abbreviation)

  if (isExistent !== undefined && team.abbreviation !== newTeam.abbreviation) {
    throw new Error('Abbreviation already exists')
  }

  teamsDB.splice(teamsDB.indexOf(team), 1, newTeam)

  return fs.writeFileSync(teamsDirectory, JSON.stringify(teamsDB))
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
  if (!abbreviation || typeof abbreviation !== 'string')
    throw new Error('Invalid team abbreviation')

  const team = teamsDB.find(team => team.abbreviation === abbreviation)

  return team
}
