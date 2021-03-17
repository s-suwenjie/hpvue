const Validator = function () {
  var result = true
  if(this.p____rule && this.p____rule.length > 0){

    for (var i = 0; i < this.p____rule.length; i++){
      var key = this.p____rule[i];
      const show = isShow(this.p____rule[key])
      if(show && !this.p____rule[key].verification()){
        result = false
      }
    }
  }
  function isShow(vueComponent){
    var display = true;
    var obj = vueComponent
    try {//obj.$el会拿到注释的标签 判断 undefined 或者使用 indexOf 无效（判断无效）
      // 现有逻辑 基于try中运行如果出现undefined会抛出错误执行catch中的逻辑 以此来判断是否为 undefined
      if(obj.$el.style.display !== 'none'){
        while (obj = obj.$parent) {
          if (obj.$el.id === "app"){
            break
          }
          if(obj.$el.style.display === 'none'){
            display = false;
            break;
          }
        }
      }
      else{
        display = false
      }
    }catch (e) {
      return display
    }
    return display
  }
  return result
}



export default {
  install (Vue, options) {
    Vue.prototype.validator = Validator
  }
}
