import { Router } from 'express'
import {
  getTeams,
  getTeamByAbbreviation,
  updateTeam,
  createTeam,
} from '../api/teams.js'
import { teamApiMapper } from '../mappers/teams.js'
import multer from 'multer'

const storage = multer.diskStorage({
  destination: function (_, __, cb) {
    cb(null, 'public/uploads')
  },
  filename: function (_, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9)
    cb(null, file.fieldname + '-' + uniqueSuffix)
  },
})

const upload = multer({ storage })

const teamRouter = Router()

teamRouter.get('/', (_, res) => {
  const teams = getTeams()

  res.render('index', {
    layout: 'main',
    teams,
  })
})

teamRouter.get('/teams/create', (_, res) => {
  res.render('team-create', {
    layout: 'main',
  })
})

teamRouter.post('/teams/create', upload.single('image'), (req, res) => {
  console.log(req.body)
  const teamData = teamApiMapper(JSON.parse(req.body))
  if (teamData === undefined) return res.status(400).send()

  createTeam(teamData)
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

teamRouter.post(
  '/teams/update/:abbreviation',
  upload.single('image'),
  (req, res) => {
    console.log(req.file)
    const { abbreviation } = req.params
    const teamData = teamApiMapper(JSON.parse(req.body))
    const team = getTeamByAbbreviation(abbreviation)

    if (team === undefined) return res.status(400).send()

    updateTeam(team.abbreviation, teamData)

    return res.status(200).send()
  },
)

export default teamRouter
