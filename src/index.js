// TODO rename deref to get
module.exports = {
  deref: deref
}

// TODO put the doc first
function deref (pointer, doc) {
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
