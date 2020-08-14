import { verify} from '@/assets/common.js'
const controlmixin = {
  inject: ["p____page"],
  data(){
    return {

    }
  },
  methods:{
    validatorEvent(category){
      if(this.rule !== "") {
        var id = this.id;
        id = id.replace(".","_")
        if (category === "bind") {
          if(this.p____page.p____rule.indexOf(id) === -1){
            this.p____page.p____rule.push(id)
            this.p____page.p____rule[id] = this
          }
        } else if (category === "unbind") {
          let index = this.p____page.p____rule.indexOf(id)
          if(index !== -1){
            this.p____page.p____rule.splice(index,1)
            this.p____page.p____rule[id] = null
          }
        }
      }
    },
    verifyEvent(val){
      return verify(val, this.rule)
    }
  },
  created(){

  }
}

export{
  controlmixin
}
