---
title: Validation example
---

# Complete validation example

You can check the [examples folder](https://github.com/adrianmiu/siriusjs-validation) to see some simple integrations with jQuery and VueJS.

In this example we are going to show how to use the library to validate a simple referral form that a user might use to send a message to multiple friends.

## 1. Initialize the validator

#### Specify the rules

```javascript
let rules = {
  'name': 'required | min_length(6)',
  'email': 'required | email',
  'confirm_email': 'required | email | equal("@email")',
  'message': 'required | min_length(20)',
  'recipients': 'required | array_min_length(1)',
  'recipients[*][email]': 'required | email'
};
```

The rules are provided as a string and separated by ` | ` (space pipe space). If a validator supports parameters, they are passed in paranthesis separated by comma. They are processed via `JSON.parse` so you have to use quotes if they are not a number.

The rules are asigned to a "selector" which specifies which path(s) in the object that it can match. It can be as deep as you want and the `*` is used to denote any child of that object. The last rule can be read as "for all recipients the email field is required and must be a valid email"

#### Create a change handler

```javascript
function change_handler(type, path) {
  if (type === 'validation') {
    
    // validation for the element identified by path
    // here you can toggle an `has-error` class on DOM element
    // or inject the error message or show an an alert like so
    if (this.hasError(path)) {
      alert(this.getError(path));
    }
    
  } else if (type === 'state') {
    
    // the pending state of the element identified by that path was set to true/false
    // here you can toggle a class on the field or parent element to show a spinner or something
     
  }
}
```

For the change handler `this` is bound to the validator instance

#### Create an error handler (optional, defaults to console.log)

```javascript
function error_handler(type, error) {
  console.log(type, error);
}
```

In case there's an error during the validation of a you can use the handler to do something about it. The library tries to catch any errors so the rest of the application can continue working.

#### Custom error messages (optional)

```javascript
let messages = {
  'required': 'You must fill out this field',
  'confirm_email:equal': 'You do not know your own email address?',
  'recipients[*][email]:email': 'We can sent emails to invalid emails :)'
}
```

The key for the messages has the format `selector:validation_rule_name` or `validation_rule_name`. The message that contains the selector has priority. 

#### Custom error message compiler (optional)

You can provide a function that will generate the error message if you are not happy with the default one. This can be useful if you want to translate the error message.

#### Create the validator instance

```javascript
let validator = SiriusValidation.build(rules, change_handler, error_handler, messages, error_compiler);
```

## 2. Pass data to the validator

#### Populate a specific path

Set a single value if the user changed the `name` field:

```javascript
validator.set('name', value);
```

Set an object when the user clicked on the "Add recipient" button. You can skip the validation so the user won't get an error for the email field
```javascript
validator.set('recipients[1]', {email: ''}, /* skip_validation */)
```

#### Populate the entire form

```javascript
validator.setData(obj, /* skip_validation - boolean, reset_validator_state - boolean */)
```

You may want to skip the validation if the data comes from an external source (ie: not user input)

You may want to reset the validator state if you have a 'reset' form button

## 3. Respond to validator changes

If you don't skip validation when setting data the validation is performed automatically. In your `change_handler` callback you can perform a lot of operations like in the example below

```javascript
// remember `this` is bound to the validator

this.hasError(path); // returns true/false if there's an error message attached to that path

this.getError(path); // returns the error message for that path

this.isTouched(path); // return true/false if there was an attempt to set value to a path

this.isDirty(path); // returns true/false if when the value was set to that path, it changed the value from its initial value

// of course you can access anything related to the form

this.getError('another_path')
```

Checkout the [examples folder](https://github.com/adrianmiu/siriusjs-validation) to see how to respond to validation changes with jQuery or VueJS

## 4. Validate the entire object

After all the data is set or user clicks on "Submit"

```javascript
validator.validate().then(function(isValid) {
  if (isValid) {
    // send data to server or save to database (in Node)
  } else {
    // show an alert ask the user to check out the form's errors
    // or return a JSON with the list of message (in Node)
  }
})
```

