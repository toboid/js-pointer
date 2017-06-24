'use strict';

module.exports = {
  get: get
};

function get (obj, pointer) {
  return traverse(obj, parse(pointer));
}

function traverse (obj, tokens) {
  if (!tokens.length) return obj;

  const next = tokens.shift();
  return traverse(obj[next], tokens);
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
  return token.replace(/~1/g, '/').replace(/~0/g, '~');
}

const validPointer = /^([#/]?$|#?\/.*)/;

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
