import make from './make'
import rules from './builtInRules'
import get from './utils/get'
import set from './utils/set'
import getReferencePath from './utils/getReferencePath'
import pathMatchesSelector from './utils/pathMatchesSelector'
import messages from './lang/en'

let SiriusValidation = {
  messages,
  rules,
  rule(name, factory, message) {
    rules[name] = factory;
    messages[name] = message;
  },
  utils: {
    get,
    set,
    getReferencePath,
    pathMatchesSelector
  },
  make
};

export default SiriusValidation
