import build from './build'
import rule_registry from './rule_registry'
import get from './utils/get'
import set from './utils/set'
import get_ref_path from './utils/get_ref_path'
import is_path_matching_selector from './utils/is_path_matching_selector'
import default_messages from './lang/en'

function add_rule(name, factory, message) {
  rule_registry[name] = factory;
  default_messages[name] = message;
}

let SiriusValidation = {
  messages: default_messages,
  rules: rule_registry,
  add_rule,
  utils: {
    get,
    set,
    get_ref_path,
    is_path_matching_selector
  },
  build
};

export default SiriusValidation
