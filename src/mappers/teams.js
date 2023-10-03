import { Team, TeamApi } from '../entities/teams.js'

/** @typedef {import('../entities/teams.js').Team} Team
 * @typedef {import('../entities/teams.js').TeamApi} TeamApi
 * */

/**
 * @param {TeamApi} apiData
 * @return {Team}
 * */
export function teamMapper(apiData) {
  const {
    id,
    area,
    name,
    tla,
    crestUrl,
    address,
    phone,
    website,
    email,
    founded,
    clubColors,
    venue,
    lastUpdated,
  } = apiData

  return new Team(
    id,
    area,
    name,
    tla,
    crestUrl,
    address,
    phone,
    website,
    email,
    founded,
    clubColors,
    venue,
    lastUpdated,
  )
}

/**
 * @param {Team} team
 * @return {TeamApi}
 * */
export function teamApiMapper(team) {
  const {
    id,
    name,
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
    name,
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
