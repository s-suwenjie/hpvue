import Vue from 'vue'
import {accAdd,accMul} from '@/assets/common.js'


function customTouchBind (el,binding,category) {
  let isMove = false
  let sourcePoint = {x:0,y:0}
  let longTap = true
  function touchstartEvent(e){
    //将是否移动设置为false
    isMove = false
    //设置按下时的屏幕坐标
    sourcePoint.x = e.changedTouches[0].pageX
    sourcePoint.y = e.changedTouches[0].pageY
    if(category === 'longTap'){
      longTap = true
      setTimeout(function(){
        if(longTap) {
          longTap = false
          binding.value()
        }
      },900)
    }
  }
  function touchendEvent(e){
    let x = e.changedTouches[0].pageX - sourcePoint.x
    let y = e.changedTouches[0].pageY - sourcePoint.y
    if(category === 'tap'){
      if (!isMove && binding.expression) {
        binding.value()
      }
    }
    else if(category === 'longTap'){
      longTap = false
    }
    else if(category === 'selectVal'){
      if (!isMove && binding.expression) {
        binding.value(binding.arg)
      }
    }
    else if(category === 'leftSlide'){
      if(x < y && x < -100){
        binding.value()
      }
    }
    else if(category === 'rightSlide'){
      if(x > y && x > 100) {
        binding.value()
      }
    }
    else if(category === 'topSlide'){
      if(x > y && y < -100) {
        binding.value()
      }
    }
    else if(category === 'bottomSlide'){
      if(x < y && y > 100) {
        binding.value()
      }
    }
  }
  function touchmoveEvent(e){
    //设置为移动
    isMove = true
  }
  el.____touchstart = touchstartEvent
  el.addEventListener('touchstart',touchstartEvent,false)
  el.____touchend = touchendEvent
  el.addEventListener('touchend',touchendEvent,false)
  el.____touchmove = touchmoveEvent
  el.addEventListener('touchmove',touchmoveEvent,false)
}

function customTouchUnbind (el){
  el.removeEventListener('touchstart',el.____touchstart)
  delete el.____touchstart
  el.removeEventListener('touchend',el.____touchend)
  delete el.____touchend
  el.removeEventListener('touchmove',el.____touchmove)
  delete el.____touchmove
}


Vue.directive('selectVal', {
  bind(el,binding){
    new customTouchBind(el,binding,'selectVal')
  },
  update(el,binding){
    new customTouchUnbind(el)
    new customTouchBind(el,binding,'selectVal')
  },
  unbind(el){
    new customTouchUnbind(el)
  }
})

Vue.directive('tap', {
  bind(el,binding){
    new customTouchBind(el,binding,'tap')
  },
  unbind(el){
    new customTouchUnbind(el)
  }
})

Vue.directive('longTap', {
  bind(el,binding){
    new customTouchBind(el,binding,'longTap')
  },
  unbind(el){
    new customTouchUnbind(el)
  }
})

Vue.directive('leftSlide', {
  bind(el,binding){
    new customTouchBind(el,binding,'leftSlide')
  },
  unbind(el){
    new customTouchUnbind(el)
  }
})

Vue.directive('rightSlide', {
  bind(el,binding){
    new customTouchBind(el,binding,'rightSlide')
  },
  unbind(el){
    new customTouchUnbind(el)
  }
})

Vue.directive('topSlide', {
  bind(el,binding){
    new customTouchBind(el,binding,'topSlide')
  },
  unbind(el){
    new customTouchUnbind(el)
  }
})

Vue.directive('bottomSlide', {
  bind(el,binding){
    new customTouchBind(el,binding,'bottomSlide')
  },
  unbind(el){
    new customTouchUnbind(el)
  }
})

