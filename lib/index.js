'use strict';

module.exports = {
  deref: deref
};

function deref (pointer, doc) {
  if(pointer === '') {
    return doc;
  }
}
