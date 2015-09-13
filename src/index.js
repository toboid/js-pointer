module.exports = {
  get: get
}

function get (doc, pointer) {
  return traverse(doc, parse(pointer))
}

function traverse (doc, segments) {
  if (!segments.length) return doc

  return traverse(doc[first(segments)], rest(segments))
}

function parse (pointer) {
  if (pointer === '') return []

  if (!(first(pointer) === '/')) {
    const err = new Error('Non-empty pointer must start with "/"')
    err.name = 'InvalidPointerError'
    throw err
  }

  return rest(pointer.split('/'))
}

function first (arr) {
  return arr[0]
}

function rest (arr) {
  return arr.slice(1)
}

