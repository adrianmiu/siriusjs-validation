---
title: Validation example
---

# Complete validation example

You can check the [examples folder](https://github.com/adrianmiu/siriusjs-validation) to see some simple integrations with jQuery and VueJS.

In this example we are going to show how to use the library to validate a simple referral form that a user might use to send a message to multiple friends.

## 1. Make a validator instance

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

The rules are provided as a string and separated by ` | ` (space pipe space). If a validator supports parameters, they are passed in parentheses separated by comma. They are processed using `JSON.parse` so you have to use quotes if they are not a number.

The rules are assigned to a "selector" which specifies which path(s) in the object that it can match. It can be as deep as you want and the `*` is used to denote any child of that object.

The last rule in the example above can be read as "for all recipients the email field is required and must be a valid email"

#### Create a change handler

```javascript
function changeHandler(type, path) {
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

For the change handler `this` is bound to the validator instance and it is called whenever something changes in the validator (eg: a field changes its validation status (valid/invalid), or state (pending/not pending).

The `type` can be `validation` or `state`. The `path` is the path to the element that was validated or has its state changed.

#### Create an error handler (optional, defaults to console.log)

```javascript
function errorHandler(type, error) {
  console.log(type, error);
}
```

This is executed if an error occurs during the validation. The library tries to catch any errors so the rest of the application can continue working.

This would be a good place to send the error to a 3rd party service.

#### Custom error messages (optional)

```javascript
let messages = {
  // override default message for the `required` rule
  'required': 'You must fill out this field',
  // field-specific message
  'confirm_email:equal': 'You do not know your own email address?',
  // field-specific message for a "deep" selector
  'recipients[*][email]:email': 'We can sent emails to invalid emails :)'
}
```

The key for the messages has the format `selector:validation_rule_name` or `validation_rule_name`. The message that contains the selector has priority.

#### Custom error message compiler (optional)

You can provide a function that will generate the error message if you are not happy with the default one. This can be useful if you want to translate the error message.

```javascript
function errorMessageCompilerfunction (validator, path, failedRuleSelector, failedRuleName, messages) {
  // compute the message to be shown
  let message = messages[failedRuleName] || 'Field is not valid';
  // compute the string replacements for the message
  // like {min: 6} for a rule like `min_length(6)`
  let replacements = {}
  return translate(message, replacements);
}
```

#### Create the validator instance

```javascript
let validator = SiriusValidation.make(rules, changeHandler, errorHandler, messages, error_compiler);
```

## 2. Pass data to the validator

#### Populate a specific path

Set a single value if the user changed the `name` field:

```javascript
validator.set('name', value);
```

Set an object when the user clicked on the "Add recipient" button. You can skip the validation so the user won't get an error for the email field
```javascript
validator.set('recipients[1]', {email: ''}, /* skipValidation */)
```

#### Populate the entire form

```javascript
validator.setData(obj, /* skipValidation - boolean, resetValidatorState - boolean */)
```

You may want to skip the validation if the data comes from an external source (ie: not user input)

You may want to reset the validator state if you have a 'reset' form button

```javascript
validator.reset()
```

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

