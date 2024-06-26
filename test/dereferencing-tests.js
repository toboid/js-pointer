'use strict';

const { describe, it } = require('node:test');
const assert = require('assert');

const jsonPointer = require('../lib');

describe('get()', function () {
  it('dereferences arbitrary length pointer', function () {
    const testDoc = { one: { two: { three: [{ four: 4 }] } } };
    const result = jsonPointer.get(testDoc, '/one/two/three/0/four');

    assert.strictEqual(result, 4);
  });

  it('returns undefined when pointer references non-existent value', function () {
    const testDoc = { one: 1 };
    const result = jsonPointer.get(testDoc, '/two');

    assert.strictEqual(result, undefined);
  });

  it('decodes fragment pointer', function () {
    const testDoc = { 'c%d': 1 };
    const result = jsonPointer.get(testDoc, '#/c%25d');

    assert.strictEqual(result, 1);
  });

  it('does not uri decode none-fragment pointer', function () {
    const testDoc = { 'c%25d': 1 };
    const result = jsonPointer.get(testDoc, '/c%25d');

    assert.strictEqual(result, 1);
  });

  it('unescapes multiple occurrences of /', function () {
    const testDoc = { '/one/': 1 };
    const result = jsonPointer.get(testDoc, '/~1one~1');

    assert.strictEqual(result, 1);
  });

  it('unescapes multiple occurrences of ~', function () {
    const testDoc = { '~one~': 1 };
    const result = jsonPointer.get(testDoc, '/~0one~0');

    assert.strictEqual(result, 1);
  });

  describe('validation', function () {
    it('throws for none-empty pointers not beginning with "/"', function () {
      assert.throws(
        () => {
          jsonPointer.get({}, 'one');
        },
        { message: 'Pointer "one" is invalid' }
      );
    });

    it('throws for non-empty fragment pointers not beginning with "#/"', function () {
      assert.throws(
        () => {
          jsonPointer.get({}, '#one');
        },
        { message: 'Pointer "#one" is invalid' }
      );
    });
  });

  describe('rfc6901 compliance', function () {
    // See https://tools.ietf.org/html/rfc6901#section-5

    // eslint no-useless-escape rule disabled for some lines
    // as theses checks are taken straight from the spec so
    // don't want to change them.

    const testDoc = {
      foo: ['bar', 'baz'],
      '': 0,
      'a/b': 1,
      'c%d': 2,
      'e^f': 3,
      'g|h': 4,
      'i\\j': 5,
      'k"l': 6, // eslint-disable-line no-useless-escape
      ' ': 7,
      'm~n': 8,
    };

    const tests = [
      { pointer: '', expected: testDoc },
      { pointer: '/foo', expected: ['bar', 'baz'] },
      { pointer: '/foo/0', expected: 'bar' },
      { pointer: '/', expected: 0 },
      { pointer: '/a~1b', expected: 1 },
      { pointer: '/c%d', expected: 2 },
      { pointer: '/e^f', expected: 3 },
      { pointer: '/g|h', expected: 4 },
      { pointer: '/i\\j', expected: 5 },
      { pointer: '/k"l', expected: 6 }, // eslint-disable-line no-useless-escape
      { pointer: '/ ', expected: 7 },
      { pointer: '/m~0n', expected: 8 },
      { pointer: '#', expected: testDoc },
      { pointer: '#/foo', expected: ['bar', 'baz'] },
      { pointer: '#/foo/0', expected: 'bar' },
      { pointer: '#/', expected: 0 },
      { pointer: '#/a~1b', expected: 1 },
      { pointer: '#/c%25d', expected: 2 },
      { pointer: '#/e%5Ef', expected: 3 },
      { pointer: '#/g%7Ch', expected: 4 },
      { pointer: '#/i%5Cj', expected: 5 },
      { pointer: '#/k%22l', expected: 6 },
      { pointer: '#/%20', expected: 7 },
      { pointer: '#/m~0n', expected: 8 },
    ];

    tests.forEach(function (test) {
      it('dereferences "' + test.pointer + '"', function () {
        const result = jsonPointer.get(testDoc, test.pointer);

        assert.deepStrictEqual(result, test.expected);
      });
    });
  });
});
