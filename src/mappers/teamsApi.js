import { TeamApi } from '../entities/teamsApi.js'

/** @typedef {import('../entities/teams.js').Team} Team
 * @typedef {import('../entities/teams.js').TeamApi} TeamApi
 * */

/**
 * @param {Team} team
 * @return {TeamApi}
 * */
export function teamApiMapper(team) {
  const {
    id,
    name,
    name: shortName,
    abbreviation,
    tla,
    image,
    crestUrl,
    address,
    phone,
    website,
    email,
    founded,
    colors,
    clubColors,
    stadium,
    venue,
    lastUpdated,
    area,
  } = team

  let country = team.country

  if (typeof country === 'string') {
    country = { name: country }
  } else {
    country = area
  }

  return new TeamApi(
    id,
    country,
    name,
    shortName,
    abbreviation || tla,
    image || crestUrl,
    address,
    phone,
    website,
    email,
    Number(founded),
    colors || clubColors,
    stadium || venue,
    lastUpdated,
  )
}
