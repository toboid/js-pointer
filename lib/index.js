'use strict';

module.exports = {
  get: get
};

function get (doc, pointer) {
  return traverse(doc, parse(pointer));
}

function traverse (doc, tokens) {
  if (!tokens.length) return doc;

  const next = tokens.shift();
  return traverse(doc[next], tokens);
}

function parse (pointer) {
  validatePointer(pointer);
  return normaliseFragment(pointer).split('/').slice(1).map(unescape);
}

function normaliseFragment (pointer) {
  return isURIFragment(pointer) ? decodeURIComponent(pointer).slice(1) : pointer;
}

function isURIFragment (string) {
  return string && string[0] === '#';
}

function unescape (token) {
  return token.replace('~1', '/').replace('~0', '~');
}

const validPointer = /^([#\/]?$|#?\/.*)/;

function validatePointer (pointer) {
  if (!validPointer.test(pointer)) {
    throw new InvalidPointerError(pointer);
  }
}

class InvalidPointerError extends Error {
  constructor (pointer) {
    super(`Pointer "${pointer}" is invalid`);
    this.name = 'InvalidPointerError';
  }
}
