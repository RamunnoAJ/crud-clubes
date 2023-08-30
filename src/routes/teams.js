import { Router } from 'express'
import { getTeams, getTeamByAbbreviation, updateTeam } from '../api/teams.js'
import { teamApiMapper } from '../mappers/teams.js'

const teamRouter = Router()

teamRouter.get('/', (_, res) => {
  const teams = getTeams()

  res.render('index', {
    layout: 'main',
    teams,
  })
})

teamRouter.get('/teams/:abbreviation', (req, res) => {
  const { abbreviation } = req.params
  const team = getTeams().find(team => team.abbreviation === abbreviation)

  res.render('team', {
    layout: 'main',
    team,
  })
})

teamRouter.get('/teams/:abbreviation/edit', (req, res) => {
  const { abbreviation } = req.params
  const team = getTeamByAbbreviation(abbreviation)

  res.render('team-edit', {
    layout: 'main',
    team,
  })
})

teamRouter.post('/teams/update/:abbreviation', (req, res) => {
  const { abbreviation } = req.params
  const teamData = teamApiMapper(JSON.parse(req.body))
  const team = getTeamByAbbreviation(abbreviation)

  if (team === undefined) return res.status(400).send()

  updateTeam(team.abbreviation, teamData)

  return res.status(200).send()
})

export default teamRouter
