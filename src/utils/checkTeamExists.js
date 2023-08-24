export function checkTeamExists(teams, abbreviation) {
  return teams.find(team => team.abbreviation === abbreviation)
}
