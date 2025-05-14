export function formTextFormatter (inputString) {
  return inputString
    .trim()
    .replace(/[^a-zA-Z_\s]/g, '')
    .toLowerCase()
    .replace(/ /g, '_')
}
