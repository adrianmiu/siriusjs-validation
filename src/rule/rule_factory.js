var rule_factory = function (validationFn, params_names) {
  return function () {
    let options = Array.prototype.slice.call(arguments);
    let params = {};
    let refs = [];
    if (params_names) {
      params = params_names.reduce(function(acc, name, idx) {
        acc[name] = options[idx];
        return acc;
      }, {});
      refs = params_names.reduce(function(acc, name, idx) {
        let param = options[idx];
        if ((typeof param === 'string' || param instanceof String) &&  param.substr(0, 1) === '@') {
          acc.push(param.substr(1));
        }
        return acc;
      }, [])
    } else {
      params = options
    }
    return {
      refs: refs,
      params: params,
      validate: validationFn
    }
  };
};

export default rule_factory
