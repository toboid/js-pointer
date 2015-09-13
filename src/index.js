module.exports = {
  get: get
}

function get (doc, pointer) {
  const segments = compact(pointer.split('/'))
  return traverse(doc, segments)
}

function traverse (doc, segments) {
  if (!segments.length) return doc

  return traverse(doc[first(segments)], segments.slice(1))
}

function compact (collection) {
  return collection.filter((item) => item)
}

function first (arr) {
  return arr[0]
}
