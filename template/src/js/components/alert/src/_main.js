import Vue from 'vue';
import { PopupManager } from 'element-ui/lib/utils/popup';
let AlertConstructor = Vue.extend(require('./main.vue'));

let instance;
let instances = [];
let seed = 1;

var Alert = function(options) {
  if (Vue.prototype.$isServer) return;
  options = options || {};
  if (typeof options === 'string') {
    options = {
      Alert: options
    };
  }
  let userOnClose = options.onClose;
  let id = 'Alert_' + seed++;

  options.onClose = function() {
    Alert.close(id, userOnClose);
  };

  instance = new AlertConstructor({
    data: options
  });
  instance.id = id;
  instance.vm = instance.$mount();
  document.body.appendChild(instance.vm.$el);
  instance.vm.visible = true;
  instance.dom = instance.vm.$el;
  instance.dom.style.zIndex = PopupManager.nextZIndex();
  instances.push(instance);
  return instance.vm;
};

['success', 'warning', 'info', 'error'].forEach(type => {
  Alert[type] = options => {
    if (typeof options === 'string') {
      options = {
        Alert: options
      };
    }
    options.type = type;
    return Alert(options);
  };
});

Alert.close = function(id, userOnClose) {
  for (let i = 0, len = instances.length; i < len; i++) {
    if (id === instances[i].id) {
      if (typeof userOnClose === 'function') {
        userOnClose(instances[i]);
      }
      instances.splice(i, 1);
      break;
    }
  }
};

Alert.closeAll = function() {
  for (let i = instances.length - 1; i >= 0; i--) {
    instances[i].close();
  }
};

export default Alert;
