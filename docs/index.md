#SiriusJS Validation

[![Source Code](http://img.shields.io/badge/source-siriusjs/validation-blue.svg?style=flat-square)](https://github.com/siriusjs/validation)
[![Software License](https://img.shields.io/badge/license-MIT-brightgreen.svg?style=flat-square)](https://github.com/siriusjs/validation/blob/master/LICENSE)
[![Build Status](https://img.shields.io/travis/siriusjs/validation/master.svg?style=flat-square)](https://travis-ci.org/siriusjs/validation)
[![Coverage Status](https://img.shields.io/scrutinizer/coverage/g/siriusjs/validation.svg?style=flat-square)](https://scrutinizer-ci.com/g/siriusjs/validation/code-structure)
[![Quality Score](https://img.shields.io/scrutinizer/g/siriusjs/validation.svg?style=flat-square)](https://scrutinizer-ci.com/g/siriusjs/validation)
[![Total Downloads](https://img.shields.io/packagist/dt/siriusjs/validation.svg?style=flat-square)](https://packagist.org/packages/siriusjs/validation)

Sirius Validation is a pure-JS library for data validation in Node and browsers. It offers:

1. [21 build-in validation rules](validation_rules.md). There are validators for strings, array, numbers, emails, URLs
2. Deeply-nested validation rules.
3. Asynchronous validation rules.
4. Referenced validation rules. Validation rules may have parameters which can be value or references to other paths

##Elevator pitch

#### 1. Configure the validator object
```javascript
/**
 * Given a user profile creation form we have the following rules:
 * - username required and at least 6 characters long
 * - email required and valid email address
 * - password is required and must be confirmed
 * - add up to 6 social profiles; the URL for the social profile is required if a provider was selected
 * - add up to 3 addresses where street, city and country are required
 */
let rules = {
  'name': 'required | min_length(6)',
  'email': 'required | email',
  'password': 'required | min_length(8)',
  'password_confirmation': 'required | min_length(8) | equal("@password")',
  'social_profiles': 'array_length(6)',
  'social_profiles[*][url]': 'required_when("@social_profiles[*][provider]',
  'addresses': 'array_length(3)',
  'addresses[*][street]': 'required',
  'addresses[*][city]': 'required | min_length(5)',
  'addresses[*][country]': 'required | min_length(3)',
};

/**
 * do something when the validation is performed on a path
 * - type is `validation`
 * - path can be something like `addresses[0][city]`
 * 
 * or
 * 
 * when async validation starts/finishes
 * - type is `state`
 * - path can be something like `username` if you are checking if the username is available
 */
let change_handler = (type, path) => {};

/**
 * do something when an error occurs during validation
 */
let error_handler = (error) => {};


/**
 * Custom validation messages
 * The library comes with predefined messages for it's built-in-rules
 */
let messages = {
  'password:min_length': 'Come on, you\'re not even trying',
  'password_confirmation:equal': 'Passwords should match'
}

let validator = SiriusValidation.build(rules, change_handler, error_handler, messages); 
```

#### 2. Pass data to the validator

```javascript
validator.set('addresses[0][city]', 'New');

/**
 * At this point the change event is triggered and the `change_handler` should be able to make changes to the application. Here's an example of a handler
 * 
 * `this` is bound to the validator
 */ 

function change_handler(type, path) {
  // do this only for validation changes
  if (type === 'validation') {
    if (this.hasError(path)) {
      console.log(path, this.getError(path));
      // here you can inject the error in the DOM, set error messages into your state etc
    }
  }
}
```

## Why this style? 

#### 1. Being a general-purpose library it should work with "classic" web applications where the HTML looks like this

```html
<input name="lines[0][price]" value="123.00">
```

#### 2. If I am to do server side validation I can receive a JSON like this and push the messages into the page
```javascript
{
	"errors": {
		"recipients[0]": "Field must be a valid email",
		"lines[2][price]": "Price must be a number",
	}
}
```

## Caveats & known-issues

1. Only one asynchronous validator per selector. It should be the last
