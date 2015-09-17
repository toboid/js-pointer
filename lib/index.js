module.exports = {
  get: get
}

function get (doc, pointer) {
  return traverse(doc, parse(pointer))
}

function traverse (doc, tokens) {
  if (!tokens.length) return doc

  const next = tokens.shift()
  return traverse(doc[next], tokens)
}

function parse (pointer) {
  if (pointer === '') return []

  if (!(pointer[0] === '/')) {
    const err = new Error('Non-empty pointer must start with "/"')
    err.name = 'InvalidPointerError'
    throw err
  }

  return pointer.split('/').slice(1).map(unescape)
}

function unescape (token) {
  return token.replace('~1', '/').replace('~0', '~')
}

