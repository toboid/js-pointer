'use strict';

module.exports = {
  get: get
};

function get(doc, pointer) {
  return traverse(doc, parse(pointer));
}

function traverse(_x, _x2) {
  var _again = true;

  _function: while (_again) {
    var doc = _x,
        tokens = _x2;
    next = undefined;
    _again = false;

    if (!tokens.length) return doc;

    var next = tokens.shift();
    _x = doc[next];
    _x2 = tokens;
    _again = true;
    continue _function;
  }
}

function parse(pointer) {
  if (pointer === '') return [];

  if (!(pointer[0] === '/')) {
    var err = new Error('Non-empty pointer must start with "/"');
    err.name = 'InvalidPointerError';
    throw err;
  }

  return pointer.split('/').slice(1).map(unescape);
}

function unescape(token) {
  return token.replace('~1', '/').replace('~0', '~');
}