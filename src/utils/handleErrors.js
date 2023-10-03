/**
 * @typedef {import('../entities/teams.js').TeamApi} Team
 * @param {Team} team
 * */
export function handleErrorsCreateTeam(team) {
  const errors = []

  if (!team.name) {
    errors.push('Name is required')
  }

  if (!team.tla) {
    errors.push('Abbreviation is required')
  }

  if (!team.area.name) {
    errors.push('Country is required')
  }

  if (!team.address) {
    errors.push('Address is required')
  }

  if (!team.email) {
    errors.push('Email is required')
  }

  return errors
}
