'use strict'

const jsonPointer = require('../lib')
const expect = require('chai').expect

it('dereferences root document', function () {
  const doc = {
    name: {
      firstName: 'Joe',
      secondName: 'Smith'
    }
  }
  const pointer = ''

  const result = jsonPointer.get(doc, pointer)

  expect(result).to.deep.equal(doc)
})

it('dereferences first level node', function () {
  const doc = {
    name: {
      firstName: 'Joe',
      secondName: 'Smith'
    }
  }
  const pointer = 'name'

  const result = jsonPointer.get(doc, pointer)

  expect(result).to.deep.equal(doc.name)
})

it('dereferences nested node', function () {
  const doc = {
    person: {
      name: {
        firstName: 'Joe',
        secondName: 'Smith'
      }
    }
  }
  const pointer = 'person/name/firstName'

  const result = jsonPointer.get(doc, pointer)

  expect(result).to.deep.equal(doc.person.name.firstName)
})
