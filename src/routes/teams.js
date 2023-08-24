import { Router } from 'express'
import { getTeams, getTeamByAbbreviation } from '../api/teams.js'

const teamRouter = Router()

teamRouter.get('/', (_, res) => {
  const teams = getTeams()

  console.log('GET /')
  res.render('index', {
    layout: 'main',
    teams,
  })
})

teamRouter.get('/teams/:abbreviation', (req, res) => {
  const { abbreviation } = req.params
  const team = getTeams().find(team => team.abbreviation === abbreviation)

  console.log('GET /teams/:abbreviation')
  res.render('team', {
    layout: 'main',
    team,
  })
})

teamRouter.get('/teams/:abbreviation/edit', (req, res) => {
  const { abbreviation } = req.params
  const team = getTeams().find(team => team.abbreviation === abbreviation)

  console.log('GET /teams/:abbreviation/edit')
  res.render('team-edit', {
    layout: 'main',
    team,
  })
})

teamRouter.post('/teams/update/:abbreviation', (req, res) => {
  const { abbreviation } = req.params
  const team = getTeams().find(team => team.abbreviation === abbreviation)
  const teamData = req.body

  if (getTeamByAbbreviation(teamData.abbreviation) === undefined) return res.status(400).send()

  updateTeam(team.abbreviation, teamData)

  console.log(`POST /teams/update/${abbreviation}`)
  return res.status(200).send()
})

export default teamRouter
