# js-pointer
[![Build Status](https://travis-ci.org/toboid/js-pointer.svg?branch=master)](https://travis-ci.org/toboid/js-pointer)
[![Coverage Status](https://coveralls.io/repos/github/toboid/js-pointer/badge.svg?branch=master)](https://coveralls.io/github/toboid/js-pointer?branch=master)
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat)](http://standardjs.com/)
[![Dependencies](https://david-dm.org/toboid/js-pointer.svg)](https://github.com/toboid/js-pointer/blob/master/package.json)
[![npm version](https://badge.fury.io/js/js-pointer.svg)](https://badge.fury.io/js/js-pointer)

Tiny, spec compliant implementation of the JSON Pointer spec [RFC 6901](https://tools.ietf.org/html/rfc6901) with 100% test coverage and no dependencies.

## Getting started
Install via NPM
```
  npm i js-pointer --save
```

``` javascript
var jsPointer = require('js-pointer');

var object = { one: { two: { three: [{ four: 4 }] } } }
jsonPointer.get(object, '/one/two/three/0/four') // returns 4
```

Please see the [spec](https://tools.ietf.org/html/rfc6901) and [tests](https://github.com/toboid/js-pointer/blob/master/test/dereferencing-tests.js) for further detail of the json pointer format.

## API
`jsPointer.get(object, pointer)`

Returns sub-object or value in `object` referred to by `pointer`.
If `pointer` does not refer to an object or value then `undefined` will be returned.

### object
Plain **object** targeted by the pointer

### pointer
**string** JSON pointer. A pointer beginning with `#` indicates a URI fragment, which will be URI decoded before processing.
