import Vue from 'vue'

const clickControlOutside = {
  bind (el, binding) {
    function documentClick (e) {
      if (el.contains(e.target)) {
        return false
      }
      if (binding.expression) {
        binding.value()
      }
    }

    el.____documentClick = documentClick
    document.addEventListener('click', documentClick)

  },
  unbind (el) {
    document.removeEventListener('click', el.____documentClick)
    delete el.____documentClick
  }
}
Vue.directive('clickControlOutside', clickControlOutside)

//
const rightClickControlOutside = {
  bind (el, binding) {
    function documentContextMenu (e) {
      if (el.contains(e.target)) {
        return false
      }
      if (binding.expression) {
        binding.value()
      }
    }

    el.____documentContextMenu = documentContextMenu
    document.addEventListener('contextmenu', documentContextMenu)

  },
  unbind (el) {
    document.removeEventListener('contextmenu', el.____documentContextMenu)
    delete el.____documentContextMenu
  }
}

Vue.directive('rightClickControlOutside', rightClickControlOutside)


const validator = {
  bind (el, binding) {
    if (binding.expression) {
      binding.value('bind')
    }
  },
  unbind (el, binding) {
    if (binding.expression) {
      binding.value('unbind')
    }
  }
}

Vue.directive('validator', validator)

const lplload = {
  bind (el, binding) {
    if (binding.expression) {
      binding.value('bind')
    }
  },
  unbind (el, binding) {
    if (binding.expression) {
      binding.value('unbind')
    }
  }
}

Vue.directive('lplload', lplload)

const drop = {
  bind (el, binding) {
    el.addEventListener('drop', function (e) {//拖入后的释放事件
      e.stopPropagation()
      e.preventDefault()
      if (binding.expression) {
        let files = e.dataTransfer.files
        binding.value('drop', files)
      }
    }, false)
    el.addEventListener('dragleave', function (e) {//拖入后离开事件
      e.stopPropagation()
      e.preventDefault()
      if (binding.expression) {
        binding.value('dragleave')
      }
    }, false)
    el.addEventListener('dragenter', function (e) {//拖入事件
      e.stopPropagation()
      e.preventDefault()
      if (binding.expression) {
        binding.value('dragenter')
      }
    }, false)
    el.addEventListener('dragover', function (e) {//拖入后的移动事件
      e.stopPropagation()
      e.preventDefault()
    }, false)
  }
}
Vue.directive('drop', drop)

