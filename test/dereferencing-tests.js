'use strict'

const jsonPointer = require('../lib')
const expect = require('chai').expect

describe('get()', function () {
  it('dereferences arbitrary length pointer', function () {
    const testDoc = { one: { two: { three: [{ four: 4 }] } } }
    const result = jsonPointer.get(testDoc, '/one/two/three/0/four')
    expect(result).to.deep.equal(4)
  })

  it('returns undefined when pointer references non-existent value', function () {
    const testDoc = { one: 1 }
    const result = jsonPointer.get(testDoc, '/two')
    expect(result).to.be.undefined
  })

  describe('validation', function () {
    it('throws for pointers not beginning with "/"', function () {
      const expectedErrorMatcher = /Non-empty pointer must start with "\/"/
      expect(function () {
        jsonPointer.get({}, 'one')
      }).to.throw(Error, expectedErrorMatcher)
    })
  })

  describe('rfc6901 compliance', function () {
    // See https://tools.ietf.org/html/rfc6901#section-5

    const testDoc = {
      foo: ['bar', 'baz'],
      '': 0,
      'a/b': 1,
      'c%d': 2,
      'e^f': 3,
      'g|h': 4,
      'i\\j': 5,
      'k\"l': 6,
      ' ': 7,
      'm~n': 8
    }

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
      { pointer: '/k\"l', expected: 6 },
      { pointer: '/ ', expected: 7 },
      { pointer: '/m~0n', expected: 8 }
    ]

    tests.forEach(function (test) {
      it('dereferences "' + test.pointer + '"', function () {
        const result = jsonPointer.get(testDoc, test.pointer)
        expect(result).to.deep.equal(test.expected)
      })
    })
  })
})

