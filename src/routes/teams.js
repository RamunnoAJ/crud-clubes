import { Router } from 'express'
import {
  getTeams,
  updateTeam,
  createTeam,
  resetTeams,
  deleteTeam,
  getTeamByID,
} from '../api/teams.js'
import { teamApiMapper } from '../mappers/teamsApi.js'
import { handleErrorsCreateTeam } from '../utils/handleErrors.js'
import multer from 'multer'
import path from 'path'

const storage = multer.diskStorage({
  destination: (_, __, cb) => {
    cb(null, 'public/uploads/')
  },
  filename: (_, file, cb) => {
    const ext = path.extname(file.originalname)
    cb(null, `${Date.now()}${ext}`)
  },
})

const upload = multer({ storage })

const teamRouter = Router()

teamRouter.post('/reset', (_, res) => {
  try {
    resetTeams()
  } catch (error) {
    res.status(400).send(error)
  }

  res.status(200).send()
})

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
  if (!req.file) return res.status(400).send('No file uploaded.')

  req.body.image = '/' + req.file.path
  const teamData = teamApiMapper(req.body)
  if (teamData === undefined) return res.status(400).send('Invalid team data.')

  const errors = handleErrorsCreateTeam(teamData)
  if (errors.length > 0) return res.status(400).send(errors.join('\n'))

  const team = createTeam(teamData)
  if (team instanceof Error)
    return res.status(400).send('Abbreviation already exists.')

  return res.status(200).send(`Team created successfully.`)
})

teamRouter.delete('/teams/:id', (req, res) => {
  const { id } = req.params
  const idNumber = Number(id)
  const team = getTeamByID(idNumber)

  if (team === undefined) {
    return res.status(404).render('404', {
      layout: 'main',
      message: 'It seems that the team you are looking for is not registered.',
    })
  }

  deleteTeam(team.id)

  return res.status(200).send(`Team ${team.abbreviation} deleted successfully`)
})

teamRouter.get('/teams/:id', (req, res) => {
  const { id } = req.params
  const idNumber = Number(id)
  const team = getTeams().find(team => team.id === idNumber)

  if (team === undefined) {
    return res.status(404).render('404', {
      layout: 'main',
      message: 'It seems that the team you are looking for is not registered.',
    })
  }

  res.render('team', {
    layout: 'main',
    team,
  })
})

teamRouter.get('/teams/:id/edit', (req, res) => {
  const { id } = req.params
  const idNumber = Number(id)
  const team = getTeamByID(idNumber)

  if (team === undefined) {
    return res.status(404).render('404', {
      layout: 'main',
      message: 'It seems that the team you are looking for is not registered.',
    })
  }

  res.render('team-edit', {
    layout: 'main',
    team,
  })
})

teamRouter.patch('/teams/:id', upload.single('image'), (req, res) => {
  if (req.file !== undefined) {
    req.body.image = '/' + req.file.path
  }

  const { id } = req.params
  const idNumber = Number(id)
  const teamData = teamApiMapper(req.body)
  const team = getTeamByID(idNumber)

  if (team === undefined) return res.status(400).send()

  updateTeam(team.id, teamData)

  return res.status(200).send()
})

teamRouter.use((_, res) => {
  res.status(404).render('404', {
    layout: 'main',
    message: '',
  })
})

export default teamRouter
