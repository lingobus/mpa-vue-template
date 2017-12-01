import Vue from 'vue'
import { PopupManager } from 'element-ui/lib/utils/popup'
let MessageDialogConstructor = Vue.extend(require('./main.vue'))

let instance
let instances = []
let seed = 1

var MessageDialog = function(options) {
  if (Vue.prototype.$isServer) return;
  options = options || {}
  if (typeof options === 'string') {
    options = {
      MessageDialog: options
    }
  }
  let userOnClose = options.onClose
  let id = 'MessageDialog_' + seed++

  options.onClose = function() {
    MessageDialog.close(id, userOnClose)
  }

  instance = new MessageDialogConstructor({
    data: options
  })
  instance.id = id
  instance.vm = instance.$mount()
  document.body.appendChild(instance.vm.$el)

  const vm = instance.vm
  vm.title = options.title || ''
  vm.message = options.message || ''
  vm.type = options.type || ''
  vm.buttons = options.buttons || [MessageDialog.OK]
  vm.promise = new Promise((resolve, reject) => {
    vm.onAction = (act) => {
      resolve(act)
      vm.$refs.dlg.close()
    }
  })

  instance.dom = instance.vm.$el
  instance.dom.style.zIndex = PopupManager.nextZIndex()
  instances.push(instance)
  vm.$refs.dlg.open()
  return instance.promise
}

;['success', 'warning', 'info', 'error'].forEach(type => {
  MessageDialog[type] = options => {
    if (typeof options === 'string') {
      options = {
        MessageDialog: options
      };
    }
    options.type = type
    return MessageDialog(options)
  };
})

MessageDialog.close = function(id, userOnClose) {
  for (let i = 0, len = instances.length; i < len; i++) {
    if (id === instances[i].id) {
      if (typeof userOnClose === 'function') {
        userOnClose(instances[i]);
      }
      instances.splice(i, 1)
      break
    }
  }
}


MessageDialog.closeAll = function() {
  for (let i = instances.length - 1; i >= 0; i--) {
    instances[i].close()
  }
}

export default MessageDialog
