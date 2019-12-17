---
title: How to translate error messages
---

# Translate error messages

There are 2 ways to translate the error messages

## 1. Overwrite the default messages

```javascript

SiriusValidation.messages = {
  _default: 'Le champ n\'est pas valide',
  required: 'Ce champ est obligatoire',
  required_with: 'Ce champ est obligatoire',
  required_without: 'Ce champ est obligatoire',
  email: 'Ce champ n\'est pas un email valide',
}
```

## 2. Use a custom error compiler function

This is how you create a validator with a custom `error_compiler` function

```javascript

function error_compiler(validator, path, failed_rule_selector, failed_rule_name, messages) {
  /**
   * validator - validator instance
   * path - path of the value you want to generate the error for (eg: recipients[1][email]
   * failed_rule_selector - eg: recipients[*][email]
   * failed_rule_name - name of the rule you want to generate the error form (eg: required)
   * messages - the repository of available messages (this is optional and can be anything)
   */

  // you may end up with something like this  
  let error = messages.get('lang_fr.' + failed_rule_name);
  // here you process the error message to include the parameters if any
}

let validator = SiriusValidation.build(rules, change_handler, error_handler, messages, error_compiler);
```

Be sure to check the [default error compiler](https://github.com/adrianmiu/siriusjs-validation/blob/master/src/error_compiler.js) for inspiration

