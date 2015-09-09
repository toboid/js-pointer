'use strict';

const jsonPointer = require('../lib');
const expect = require('chai').expect;

it('dereferences root document', function () {
  const doc = {
    name: {
      firstName: 'Joe',
      secondName: 'Smith'
    }
  },
  pointer = '';

  const result = jsonPointer.deref(pointer, doc);

  expect(result).to.deep.equal(doc);
});

it('dereferences first level node', function () {
  const doc = {
    name: {
      firstName: 'Joe',
      secondName: 'Smith'
    }
  },
  pointer = 'name';

  const result = jsonPointer.deref(pointer, doc);

  expect(result).to.deep.equal(doc.name);
});

it('dereferences nested node', function () {
  const doc = {
    person: {
      name: {
        firstName: 'Joe',
        secondName: 'Smith'
      }
    }
  },
  pointer = 'person/name/firstName';

  const result = jsonPointer.deref(pointer, doc);

  expect(result).to.deep.equal(doc.person.name.firstName);
});
