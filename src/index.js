module.exports = {
  get: get
}

function get (doc, pointer) {
  return traverse(doc, parse(pointer))
}

function traverse (doc, tokens) {
  if (!tokens.length) return doc

  return traverse(doc[first(tokens)], rest(tokens))
}

function parse (pointer) {
  if (pointer === '') return []

  if (!(first(pointer) === '/')) {
    const err = new Error('Non-empty pointer must start with "/"')
    err.name = 'InvalidPointerError'
    throw err
  }

  return rest(pointer.split('/')).map(unescape)
}

function first (arr) {
  return arr[0]
}

function rest (arr) {
  return arr.slice(1)
}

function unescape (token) {
  return token.replace('~1', '/').replace('~0', '~')
}

