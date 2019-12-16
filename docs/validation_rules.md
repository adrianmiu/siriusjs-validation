---
title: Built-in validation rules
---

# Built-in validation rules

### Required validators
1. `required`: value should not be `null`, an empty string or an empty array
2. `required_with`: value is required when another item is present in the context. Rule params: `target`
3. `required_without`: value is required when another item is *not* present in the context. Rule params: `target`

### String validators
1. `alpha`: values must contain only letters and spaces
2. `alpha_num`: values must contain letters, numbers and spaces
3. `slug`: values must contain letters, numbers, dashes, underscores and spaces
4. `min_length`: string's length should be greater than a specified value. Rule params: `min`
5. `max_length`: string's length should be shorter than a specified value. Rule params: `max`
6. `contains`: string's length should be shorter than a specified value. Rule params: `max`
7. `starts_with`: string's length should be shorter than a specified value. Rule params: `max`
8. `ends_with`: string's length should be shorter than a specified value. Rule params: `max`

### Array validators
1. `array_min_length`: array must contain at least a specific number of items: Rule params: `min`
2. `array_max_length`: array must contain at most a specific number of items: Rule params: `max`

### Number validators
1. `number`: value must be a valid number
2. `integer`: value must be a valid integer
3. `min`: value must be less than a number. Rule params: `max`
4. `max`: value must be greater than a number. Rule params: `min`

### Email/URLs validators
1. `email`: value must be an email address. Uses a regular expression for validation
2. `url`: value must be a valid URL address (http, https, ftp etc)

### Other validators
1. `regex`: value must match a regular expression pattern.  Rule params: `pattern`
2. `equal`: the value must be the same as predefined value. Rule params: `target`
3. `in_list`: the value must be in a list of acceptable values. Rule params: `list`
4. `not_in_list`: the value must not be in a list of forbidden values: Rule params: `list`

