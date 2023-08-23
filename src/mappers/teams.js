import { Team } from '../entities/teams.js'

export function teamMapper(apiData) {
  const {
    id,
    area,
    name,
    tla: abbreviation,
    crestUrl: image,
    address,
    phone,
    website,
    email,
    founded,
    clubColors: colors,
    venue: stadium,
  } = apiData

  return new Team(
    id,
    area,
    name,
    abbreviation,
    image,
    address,
    phone,
    website,
    email,
    founded,
    colors,
    stadium,
  )
}
