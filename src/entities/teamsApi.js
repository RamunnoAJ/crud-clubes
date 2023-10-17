export class TeamApi {
  /**
   * @typedef {TeamApi}
   * @param {Number} id
   * @param {Object} area
   * @param {String} name
   * @param {String} shortName
   * @param {String} tla
   * @param {String} crestUrl
   * @param {String} address
   * @param {String} phone
   * @param {String} website
   * @param {String} email
   * @param {Number} founded
   * @param {String} clubColors
   * @param {String} venue
   * @param {String} lastUpdated
   * */
  constructor(
    id,
    area,
    name,
    shortName,
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
  ) {
    this.id = id
    this.area = area
    this.name = name
    this.shortName = shortName
    this.tla = tla
    this.crestUrl = crestUrl
    this.address = address
    this.phone = phone
    this.website = website
    this.email = email
    this.founded = founded
    this.clubColors = clubColors
    this.venue = venue
    this.lastUpdated = lastUpdated
  }
}
