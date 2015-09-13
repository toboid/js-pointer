'use strict'

const jsonPointer = require('../lib')
const expect = require('chai').expect

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

it('dereferences root document', function () {
  const pointer = ''

  const result = jsonPointer.get(testDoc, pointer)

  expect(result).to.deep.equal(testDoc)
})

it('dereferences first level node', function () {
  const pointer = '/foo'

  const result = jsonPointer.get(testDoc, pointer)

  expect(result).to.deep.equal(['bar', 'baz'])
})

it('dereferences nested node', function () {
  const pointer = 'person/name/firstName'

  const result = jsonPointer.get(testDoc, pointer)

  expect(result).to.deep.equal('bob')
})

it('dereferences array elements', function () {
  const pointer = '/foo/0'

  const result = jsonPointer.get(testDoc, pointer)

  expect(result).to.be.deep.equal('bar')
})
