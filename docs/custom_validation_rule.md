---
title: How to create a custom validation rule
---

# Create custom validation rule

Here's how you would implement a validator that checks if a value is between to numbers

```javascript
function betweenValidationFactory(min, max) {
  return {
    refs: [], // this is used if the validator
    params: {
      min,
      max
    },
    validate: function(value, path, context) {
      // the value is not required so if it's falsy we return true
      if (!value) {
        return true;
      }

      return value >= this.params.min && value <= this.params.max
    }
  }
}
SiriusValidation.add_rule('custom_rule', betweenValidationFactory, 'This field should be between {min} and {max}');
```

To recap:

1. You need a validator factory that returns an object that has to have at least the `validate()` method
2. `params` property holds the values that the validator depends on
3. `refs` property holds a list of referenced paths. This is required when you need contextual validation so that some elements are re-validated when the referenced paths change.

In the example above `min` and `max` are assumed to be numbers but they could be references to other elements in the form (for example you could have a selling price to be set between the purchase price and an arbitrary high number). In this case the `refs` property should be populated accordingly. This is how we did it for the `equal` [built-in rule](/validation_rules.html).

The `validate()` method should return a boolean OR a promise that returns a boolean, for [async validators](/async_validation_rule.html)
