/**
 * @param {Array} array
 * @param {number} index
 * @param {any} newElement
 * @returns {Array}
 */
export function replaceElement(array, index, newElement) {
  const newArray = array.slice()
  newArray[index] = newElement

  return newArray
}
