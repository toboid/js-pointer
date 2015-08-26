'use strict';

var jsonPointer = require('../lib');
var expect = require('chai').expect;

it('dereferences root document', function () {
  var doc = {
    name: {
      firstName: 'Joe',
      secondName: 'Smith'
    }
  },
  pointer = '';

  var result = jsonPointer.deref(pointer, doc);

  expect(result).to.deep.equal(doc);
});

it('dereferences first level node', function () {
  var doc = {
    name: {
      firstName: 'Joe',
      secondName: 'Smith'
    }
  },
  pointer = 'name';

  var result = jsonPointer.deref(pointer, doc);

  expect(result).to.deep.equal(doc.name);
});

it('dereferences nested node', function () {
  var doc = {
    person: {
      name: {
        firstName: 'Joe',
        secondName: 'Smith'
      }
    }
  },
  pointer = 'person/name/firstName';

  var result = jsonPointer.deref(pointer, doc);

  expect(result).to.deep.equal(doc.person.name.firstName);
});
