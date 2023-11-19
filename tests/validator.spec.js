import SiriusValidation from '../src/index'

describe('Sirius Validation library', () => {
  let on_change;
  let on_error;

  beforeEach(function () {
    on_change = jest.fn();
    on_error = jest.fn();
  });

  test('Validator with no starting data', () => {
    let rules = {
      'username': 'required'
    };
    let validator = SiriusValidation.make(rules, on_change);

    validator.set('username', '');
    expect(validator.hasError('username')).toBe(true);
    expect(validator.isDirty('username')).toBe(true);
    expect(validator.isTouched('username')).toBe(true);
    expect(on_change).toBeCalled();

    validator.set('username', 'pass');
    expect(validator.hasError('username')).toBe(false);
  });


  test('Validator with starting data', () => {
    let rules = {
      'username': 'required'
    };
    let validator = SiriusValidation.make(rules, on_change);
    validator.setData({
      username: 'cool'
    });
    validator.reset();

    expect(validator.hasError('username')).toBe(false);
    expect(validator.isDirty('username')).toBe(false);
    expect(validator.isTouched('username')).toBe(false);

    validator.set('username', '');
    expect(validator.hasError('username')).toBe(true);
    expect(validator.isDirty('username')).toBe(true);
    expect(validator.isTouched('username')).toBe(true);
    expect(on_change).toBeCalled();
  });

  test('Validator with complex rules', () => {
    let rules = {
      'password': 'required | min_length(6)',
      'confirm_password': 'required | min_length(6) | equal("@password")',
    };
    let validator = SiriusValidation.make(rules, on_change);

    validator.set('password', 'abcdef');

    validator.set('confirm_password', 'abc');
    expect(validator.getError('confirm_password')).toBe('This field should have at least 6 characters');

    validator.set('confirm_password', 'abcdee');
    expect(validator.getError('confirm_password')).toBe('This field should be equal to abcdef');
  });

  test('Test custom error messages', () => {
    let rules = {
      'password': 'required | min_length(6)',
      'confirm_password': 'required | min_length(6) | equal("@password")',
    };
    let messages = {
      'min_length': 'This field must have at least {min} characters',
      'confirm_password:equal': 'Passwords must match'
    };

    let validator = SiriusValidation.make(rules, on_change, null, messages);

    validator.set('password', 'abcdef');

    validator.set('confirm_password', 'abc');
    expect(validator.getError('confirm_password')).toBe('This field must have at least 6 characters');

    validator.set('confirm_password', 'abcdee');
    expect(validator.getError('confirm_password')).toBe('Passwords must match');
  });

  test('Test error thrown during item validation', () => {
    let rules = {
      'password': 'required | custom_rule'
    };
    let messages = {};

    SiriusValidation.rule('custom_rule', function () {
      return {
        validate: function (value, path, context) {
          throw 'Exception during validation';
        }
      };
    }, 'Field does not match custom rule');
    let validator = SiriusValidation.make(rules, on_change, on_error, messages);

    validator.set('password', 'abcdef');
    expect(on_error).toHaveBeenCalled();
  });

  test('Test custom validation rule', () => {
    let rules = {
      'password': 'required | custom_rule'
    };
    let messages = {};

    SiriusValidation.rule('custom_rule', function () {
      return {
        validate: function (value) {

          return value === 'secret';
        }
      };
    }, 'Field does not match custom rule');
    let validator = SiriusValidation.make(rules, on_change, on_error, messages);

    validator.set('password', 'abcdef');
    expect(validator.getError('password')).toBe('Field does not match custom rule');
  });

  test('Test validation rule with references', () => {
    let rules = {
      'password': 'required | equal("@confirm_password")',
    };
    let messages = {
      'password:equal': 'Password must be confirmed'
    };

    let validator = SiriusValidation.make(rules, on_change, on_error, messages);

    validator.set('password', 'abcdef');
    validator.set('confirm_password', 'abcdef234');
    expect(validator.getError('password')).toBe('Password must be confirmed');
  });


  test('Test multiple selectors that match the same item', () => {
    // all emails are required but the first 2 must have specific values
    // we use different order to test that the required rule is applied first
    let rules = {
      'emails[1]': 'equal("another@email.com")',
      'emails[*]': 'required',
      'emails[0]': 'equal("email@domain.com")',
    };
    let messages = {};
    let validator = SiriusValidation.make(rules, on_change, on_error, messages);

    validator.set('emails[0]', '');
    expect(validator.getError('emails[0]')).toBe('This field is required');

    validator.set('emails[0]', 'wrong@email.com');
    expect(validator.getError('emails[0]')).toBe('This field should be equal to email@domain.com');

    validator.set('emails[0]', 'email@domain.com');
    expect(validator.hasError('emails[0]')).toBe(false);

    validator.set('emails[1]', '');
    expect(validator.getError('emails[1]')).toBe('This field is required');

    validator.set('emails[1]', 'another@email.com');
    expect(validator.hasError('emails[1]')).toBe(false);
  });

  test('Test async validation rule', (done) => {
    let data = {};
    let rules = {
      'username': 'required | async_rule'
    };
    let messages = {};

    SiriusValidation.rule('async_rule', function () {
      return {
        validate: function (value, path, context) {
          return new Promise(function (resolve, reject) {
            setTimeout(() => {
              resolve(false);
            }, 100)
          });
        }
      };
    }, 'Field does not match async rule');

    let validator = SiriusValidation.make(rules, on_change, on_error, messages);

    validator.set('username', 'abcdef');
    expect(validator.isPending('username')).toBe(true);

    setTimeout(() => {
      expect(validator.isPending('username')).toBe(false);
      expect(validator.getError('username')).toBe('Field does not match async rule');
      done();
    }, 200);
  });

  test('Test item without a matching rule', () => {
    let data = {};
    let rules = {
      'username': {
        required: SiriusValidation.rules.required()
      }
    };

    let validator = SiriusValidation.make(rules, on_change);

    validator.set('password', '123456');
    expect(validator.hasError('password')).toBe(false);
  });

  test('Test invalid rule is ignored', () => {
    let data = {};
    let rules = {
      'username': {
        required: SiriusValidation.rules.required(),
        min_length: {},
      }
    };

    let validator = SiriusValidation.make(rules, on_change);

    validator.set('username', 'abc');
    expect(validator.hasError('username')).toBe(false);
  });

  test('Test rules passed as object', () => {
    let data = {};
    let rules = {
      'username': {
        required: SiriusValidation.rules.required(),
        min_length: SiriusValidation.rules.min_length(6),
      }
    };

    let validator = SiriusValidation.make(rules, on_change);

    validator.set('username', 'abc');
    expect(validator.hasError('username')).toBe(true);

    validator.set('username', 'abcdef');
    expect(validator.hasError('username')).toBe(false);
  });

  test('Test exception thrown if rule definition is not a string', () => {
    let data = {};
    let rules = {
      'username': 10
    };

    let builder = () => {
      return SiriusValidation.make(rules, on_change)
    }

    expect(builder).toThrow('Validation rules definition should be a string');
  });

  test('Test exception thrown if rule definition does not have the proper format', () => {
    let data = {};
    let rules = {
      'username': 'required | min_length(10]'
    };

    let builder = () => {
      return SiriusValidation.make(rules, on_change)
    };

    expect(builder).toThrow('Rule expression is not correct. Good expression: "between(3,5)"');
  });

  test('Test exception thrown if rule is missing', () => {
    let data = {};
    let rules = {
      'username': 'required | unknown_rule()'
    };

    let builder = () => {
      return SiriusValidation.make(rules, on_change)
    };

    expect(builder).toThrow('Rule named unknown_rule is not registered');
  });

  test('Test default validation message', () => {
    let data = {};
    let rules = {
      'username': 'required | custom_rule_without_message'
    };

    SiriusValidation.rule('custom_rule_without_message', function () {
      return {
        validate: (value) => {
          return value === 'custom'
        }
      };
    }, '');
    let validator = SiriusValidation.make(rules, on_change);
    validator.set('username', 'not_custom');

    expect(validator.getError('username')).toBe('Field is not valid');
  });

  test('Test custom validation message as a function', () => {
    let data = {};
    let rules = {
      'username': 'required | custom_rule_without_message'
    };

    SiriusValidation.rule('custom_rule_without_message', function () {
      return {
        validate: (value) => {
          return value === 'custom'
        }
      };
    }, (validator, path) => {
      return validator.get(path) + ' is wrong!'
    });
    let validator = SiriusValidation.make(rules, on_change);
    validator.set('username', 'not_custom');

    expect(validator.getError('username')).toBe('not_custom is wrong!');
  });

  test('Setting data in bulk using setData()', () => {
    let data = {
      range: {start: 2, end: 10},
      emails: ['email@domain.com']
    };
    let rules = {
      'range[start]': 'required | max("@range[end]")',
      'range[end]': 'required | min("@range[start]")',
      'emails[*]': 'required | email'
    };

    let validator = SiriusValidation.make(rules, on_change);
    validator.setData({
      range: {start: 2, end: 1},
      emails: ['new_email@domain.com', 'wrong_email']
    }, false, true);

    expect(validator.getError('range[end]')).toBe('This field should be greater or equal to 2');
    expect(validator.getError('emails[1]')).toBe('This field is not a valid email');
  });

  test('Validation of the entire data w/o async validators', (done) => {
    let rules = {
      'range[start]': 'required | max("@range[end]")',
      'range[end]': 'required | min("@range[start]")',
      'emails[*]': 'required | email'
    };

    let validator = SiriusValidation.make(rules, on_change);
    validator.setData({
      range: {start: 2, end: 1},
      emails: ['email@domain.com', 'wrong_email']
    }, true);
    validator.validate()
      .then(() => {
        expect(validator.getError('range[end]')).toBe('This field should be greater or equal to 2');
        expect(validator.getError('emails[1]')).toBe('This field is not a valid email');
        done();
      });
  });

  test('Validation of the entire data with async validators', (done) => {
    let rules = {
      'start': 'required | async_rule',
      'stop': 'required | async_rule'
    };

    SiriusValidation.rule('async_rule', function () {
      return {
        validate: function (value, path, context) {
          return new Promise(function (resolve, reject) {
            setTimeout(() => {
              resolve(value === 'ok');
            }, 1000)
          });
        }
      };
    }, 'Field does not match async rule');

    let validator = SiriusValidation.make(rules, on_change);
    validator.setData({
      start: 'ok',
      stop: 'not ok'
    }, true);
    validator.validate()
      .then(() => {
        expect(validator.getError('start')).toBe(null);
        expect(validator.getError('stop')).toBe('Field does not match async rule');
        expect(validator.isPending()).toBe(false);
        expect(validator.isValid()).toBe(false);
        done();
      });
  });

  test('Test removing rules', () => {
    let data = {};
    let rules = {
      'username': 'required | min_length(6)'
    };

    let validator = SiriusValidation.make(rules, on_change);

    validator.set('username', 'abc');
    expect(validator.hasError('username')).toBe(true);

    validator.removeRules('password', 'required'); // rule doesn't exist, should not fail
    validator.removeRules('username', 'min_length');
    validator.set('username', 'abcd');
    expect(validator.hasError('username')).toBe(false);
  });

  test('Test adding rules', () => {
    let data = {};
    let rules = {};

    let validator = SiriusValidation.make(rules, on_change);
    validator.addRules('username', 'required');

    validator.set('username', '');
    expect(validator.hasError('username')).toBe(true);
  });

  test('Test reset() method', () => {
    let data = {};
    let rules = {
      'username': 'required'
    };

    let validator = SiriusValidation.make(rules, on_change);

    validator.set('username', '');
    expect(validator.hasError('username')).toBe(true);
    expect(validator.isDirty('username')).toBe(true);
    expect(validator.isTouched('username')).toBe(true);

    validator.reset();
    expect(validator.hasError('username')).toBe(false);
    expect(validator.isDirty('username')).toBe(false);
    expect(validator.isTouched('username')).toBe(false);
  });


});
