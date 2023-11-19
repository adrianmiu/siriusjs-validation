# SiriusJS Validation

[![Source Code](https://img.shields.io/badge/source-siriusjs/validation-blue.svg?style=flat-square)](https://github.com/adrianmiu/siriusjs-validation)
[![Software License](https://img.shields.io/badge/license-MIT-brightgreen.svg?style=flat-square)](https://github.com/adrianmiu/siriusjs-validation/blob/master/LICENSE)
[![Build Status](https://github.com/adrianmiu/siriusjs-validation/actions/workflows/ci.yml/badge.svg)](https://github.com/adrianmiu/siriusjs-validation/actions/workflows/ci.yml/badge.svg)

Sirius Validation is stand-alone JS library for data validation in Node and browsers. It offers:

1. [23 build-in validation rules](validation_rules.md). There are validators for strings, array, numbers, emails, URLs
2. Ability to validate deep objects
3. Asynchronous validation support
4. Validation rules with references. Validation rules may have parameters which can be value or references to other paths
5. 98% code coverage
6. 8kb minified (4kb gziped)

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
  'social_profiles[*][url]': 'required_when("@social_profiles[*][provider])',
  'addresses': 'array_length(3)',
  'addresses[*][street]': 'required',
  'addresses[*][city]': 'required | min_length(5)',
  'addresses[*][country]': 'required | min_length(3)',
};

/**
 * A callback to handle changes to the validation status of a path or,
 * in case of async validator, changes to the state of a path
 */
function change_handler (type, path) {
  // type is `validation` (when the validation status for a path to a value is set)
  // or `state` (when doing async validation a path can have a "pending" state

  // `this` is bound to the validator
  if (type === 'validation') {
    if (this.hasError(path)) {
      console.log(path, ' is not valid: ', this.getError(path));
      // here you can inject the error in the DOM, set error messages into your state etc
    }
  }
  if (type === 'state') {
    if (this.isPending(path)) {
      console.log(path, ' is waiting validation result');
    }
  }
}

/**
 * A callback to handle errors that occur during validation
 * exception are caught and you can decide to either throw it again or not so the rest of the app keeps working
 */
function error_handler (type, error) {
  // Send error to a 3rd party service, console.log() it
}


/**
 * Custom validation messages
 * The library comes with predefined messages for its built-in-rules
 * but these messages are instance-specific
 */
let messages = {
  'password:min_length': 'Come on, you\'re not even trying',
  'password_confirmation:equal': 'Passwords should match'
}

let validator = SiriusValidation.make(rules, change_handler, error_handler, messages);
```

#### 2. Pass data to the validator

This has to be done depending on the tools you are using. Maybe you need to intercept browser events, set watchers in your framework of choice etc

```javascript
validator.set('addresses[0][city]', 'New York')

// or you can set an object
validator.set('addresses[0]', {city: 'New York'}, true) // 3rd argument skips validation

// or you can set everything at once (eg: you loaded data from API)
validator.setData(obj, true, true); // 2nd argument skips validation and resets the form (error messages, touched fields etc)

/**
 * At this point the `change_handler` is called and it should be able to make changes to the application.
 */
```

#### 3. Submit form

```javascript

function submit() {
  validator.validate()
    .then(function(isValid) {
      if (isValid) {
        // send data to the server
      }
    }).then(function(serverResponse) {
      // maybe set server-side validation errors, show success message etc
    });
}

```

## Why this style?

**1. Being a general-purpose library it should work with "classic" web applications where the HTML looks like this**

```html
<input name="lines[0][price]" value="123.00">
```

**2. If I am to do server side validation I can receive a JSON like this and push the messages into the page**

```json
{
	"errors": {
		"recipients[0]": "Field must be a valid email",
		"lines[2][price]": "Price must be a number",
	}
}
```

## Caveats & known-issues

1. Only one asynchronous validator per selector. It should be the last


## Links

- [documentation](http://sirius.ro/javascript/validation/)
- [changelog](CHANGELOG.md)
