import { Team } from '../entities/teams.js'

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
