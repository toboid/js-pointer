'use strict';

module.exports = {
  deref: deref
};

function deref (pointer, doc) {
  var segments = compact(pointer.split('/'));

  if(segments.length === 0) {
    return doc;
  }

  var context = doc;

  segments.forEach(function (segment) {
    context = context[segment];
  });

  return context;
}

function compact (collection) {
  return collection.filter(function (item) {
    return item;
  });
}
