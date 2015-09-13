'use strict'

const jsonPointer = require('../lib')
const expect = require('chai').expect

describe('get()', function () {
  const testDoc = {
    foo: ['bar', 'baz'],
    person: { name: { firstName: 'bob' } },
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
    { pointer: 'person/name/firstName', expected: 'bob' },
    { pointer: '/foo/0', expected: 'bar' }
  ]

  tests.forEach(function (test) {
    it('dereferences "' + test.pointer + '"', function () {
      const result = jsonPointer.get(testDoc, test.pointer)
      expect(result).to.deep.equal(test.expected)
    })
  })
})

