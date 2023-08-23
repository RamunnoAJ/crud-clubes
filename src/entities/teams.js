export class Team {
  /*
   *  @param {Number} id
   *  @param {Object} area
   *  @param {String} name
   *  @param {String} abbreviation
   *  @param {String} image
   *  @param {String} address
   *  @param {String} phone
   *  @param {String} website
   *  @param {String} email
   *  @param {Number} founded
   *  @param {Array<String>} colors
   *  @param {String} stadium
   * */
  constructor(
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
  ) {
    this.id = id
    this.area = area
    this.name = name
    this.abbreviation = abbreviation
    this.image = image
    this.address = address
    this.phone = phone
    this.website = website
    this.email = email
    this.founded = founded
    this.colors = colors
    this.stadium = stadium
  }
}
