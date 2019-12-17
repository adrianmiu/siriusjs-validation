---
title: How to create an async validation rule
---

# Create async validation rule

Expanding on [how to create a custom validator](/custom_validation_rule.html), here's how you would implement a validator that checks with a server if a username is unique

```javascript
function validator_factory(min, max) {
  return {
    refs: [], // this is used if the validator
    params: {
      min,
      max
    },
    validate: function(value, path, context) {
      return fetch('/users/check_unique?username=' + value)
          .then((response) => response.json())
          .then((json) => json.ok)
          .catch(() => false)
    }
  }
}
SiriusValidation.add_rule('unique_username', validator_factory, 'The username is not unique');
```

