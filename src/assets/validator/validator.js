const Validator = function () {
  var result = true
  if(this.p____rule && this.p____rule.length > 0){
    for (var i = 0; i < this.p____rule.length; i++){
      var key = this.p____rule[i];
      if(!this.p____rule[key].verification()){
        result = false
      }
    }
  }
  return result
}

export default {
  install (Vue, options) {
    Vue.prototype.validator = Validator
  }
}
