import { Router } from 'express'
import {
  getTeams,
  getTeamByAbbreviation,
  updateTeam,
  createTeam,
} from '../api/teams.js'
import { teamApiMapper } from '../mappers/teams.js'
import { handleErrorsCreateTeam } from '../utils/handleErrors.js'
import multer from 'multer'
import path from 'path'

const storage = multer.diskStorage({
  destination: (_, __, cb) => {
    cb(null, 'public/uploads/images/')
  },
  filename: (_, file, cb) => {
    const ext = path.extname(file.originalname)
    cb(null, `${Date.now()}${ext}`)
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
  if (!req.file) return res.status(400).send('No file uploaded.')

  req.body.image = '/' + req.file.path
  const teamData = teamApiMapper(req.body)
  if (teamData === undefined) return res.status(400).send('Invalid team data.')

  const errors = handleErrorsCreateTeam(teamData)
  if (errors.length > 0) return res.status(400).send(errors.join('\n'))

  const team = createTeam(teamData)
  if (team instanceof Error)
    return res.status(400).send('Abbreviation already exists.')

  return res.status(200).send()
})

teamRouter.get('/teams/:abbreviation', (req, res) => {
  const { abbreviation } = req.params
  const team = getTeams().find(team => team.abbreviation === abbreviation)

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

teamRouter.get('/teams/:abbreviation/edit', (req, res) => {
  const { abbreviation } = req.params
  const team = getTeamByAbbreviation(abbreviation)

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

teamRouter.post(
  '/teams/update/:abbreviation',
  upload.single('image'),
  (req, res) => {
    const { abbreviation } = req.params
    const teamData = teamApiMapper(req.body)
    const team = getTeamByAbbreviation(abbreviation)

    if (team === undefined) return res.status(400).send()

    updateTeam(team.abbreviation, teamData)

    return res.status(200).send()
  },
)

teamRouter.use((_, res) => {
  res.status(404).render('404', {
    layout: 'main',
    message: '',
  })
})

export default teamRouter
