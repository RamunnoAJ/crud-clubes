/** @typedef {import('../entities/teams.js').Team} Team */
import fs from 'fs'
import * as url from 'url'
import { teamApiMapper, teamMapper } from '../mappers/teams.js'
import { checkTeamExists } from '../utils/checkTeamExists.js'

const __dirname = url.fileURLToPath(new URL('.', import.meta.url))
const teamsDirectory = __dirname + '../../data/equipos.json'
const teamsBackupDirectory = __dirname + '../../data/equipos-backup.json'

const apiTeam = JSON.parse(fs.readFileSync(teamsDirectory, 'utf8'))
const teamsDB = apiTeam.map(team => teamMapper(team))

const teamsBackupDB = JSON.parse(
  fs.readFileSync(teamsBackupDirectory, 'utf8'),
).map(team => teamApiMapper(team))

export function resetTeams() {
  return fs.writeFileSync(teamsDirectory, JSON.stringify(teamsBackupDB))
}

/**
 * @param {string} abbreviation
 * */
export function deleteTeam(abbreviation) {
  const team = getTeamByAbbreviation(abbreviation)
  const newTeams = teamsDB
    .toSpliced(teamsDB.indexOf(team), 1)
    .map(team => teamApiMapper(team))

  return fs.writeFileSync(teamsDirectory, JSON.stringify(newTeams))
}

/**
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
        team[key] = newTeam[key] || team[key]
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
 * @returns {Array<Team>}
 * */
export function getTeams() {
  return teamsDB
}

/**
 * @param {string} abbreviation
 * @returns {Team}
 * */
export function getTeamByAbbreviation(abbreviation) {
  if (!abbreviation) throw new Error('Invalid team abbreviation')

  const team = teamsDB.find(team => team.abbreviation === abbreviation)

  return team
}

/**
 * @param {number} id
 * @returns {Team}
 */
export function getTeamByID(id) {
  if (!id) throw new Error('Invalid team id')

  const team = teamsDB.find(team => team.id === id)

  return team
}

/**
 * @param {Team} newTeam
 * */
export function createTeam(newTeam) {
  newTeam.lastUpdated = new Date().toISOString()
  newTeam.id = getLastTeam().id + 1

  const isExistent = checkTeamExists(teamsDB, newTeam.tla)
  if (isExistent !== undefined) {
    return new Error('Abbreviation already exists')
  }

  const teams = teamsDB.toSpliced(teamsDB.length, 0, newTeam)
  const updatedTeams = teams.map(team => teamApiMapper(team))

  return fs.writeFileSync(teamsDirectory, JSON.stringify(updatedTeams))
}

/**
 * @returns {Team}
 * */
export function getLastTeam() {
  return teamsDB[teamsDB.length - 1]
}
