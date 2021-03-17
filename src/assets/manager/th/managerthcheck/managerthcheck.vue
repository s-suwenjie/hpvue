<template>
  <th>
    <div class="md_center">
      <span @click="selectEvent" class="mh_select check_button_icon" :class="{check_button_icon_select:select}"></span>
    </div>
  </th>
</template>

<script>
  export default {
    name: 'yhm-managerth-check',
    inject: ["p____page"],
    data(){
      return{
        select:this.check
      }
    },
    props: {
      isSelect:{
        type:Boolean,
        default:false
      },
      check:{
        type:Boolean,
        default:false
      }
    },
    methods:{
      selectEvent(){
        this.select = !this.select

        if(this.isSelect){
          if (this.select){
            for(let i in this.p____page.content){
              let id = this.p____page.content[i].id
              let sign = true
              if(this.p____page.selectValue.length > 0){
                for (var j = 0; j < this.p____page.selectValue.length; j++){
                  if(Object.keys(this.p____page.selectValue[j])[0] === id) {
                    sign = false
                    break;
                  }
                }
              }
              if(sign) {
                let val = {}
                val[id] = this.p____page.content[i]
                this.p____page.selectValue.push(val)
              }
            }
          }else{
            for(let i in this.p____page.content){
              if(this.p____page.selectValue.length > 0) {
                let id = this.p____page.content[i].id
                for (var j = 0; j < this.p____page.selectValue.length; j++){
                  if(Object.keys(this.p____page.selectValue[j])[0] === id) {
                    this.p____page.selectValue.splice(j,1)
                    break;
                  }
                }
              }
            }
          }
        }else {
          if (this.select) {
            //全选
            for (let i = 0; i < this.p____page.content.length; i++) {
              let item = this.p____page.content[i]
              if (this.p____page.selectValue.indexOf(item.id) === -1) {
                this.p____page.selectValue.push(item.id)
                this.p____page.selectValue[item.id] = item
              }
            }
          } else {
            //全不选
            for (let i = 0; i < this.p____page.content.length; i++) {
              let item = this.p____page.content[i]
              let index = this.p____page.selectValue.indexOf(item.id)
              if (index !== -1) {
                this.p____page.selectValue[item.id] = null
                this.p____page.selectValue.splice(index, 1)
              }
            }
          }
        }
        this.$emit('click',this.select)
      }
    },
    watch:{
      select (newVal, oldVal) {
        var js = 'this.p____page.allCheck = ' + newVal
        eval(js)
      },
      check (newVal, oldVal) {
        this.select = newVal
      }
    }
  }
</script>

<style scoped>

</style>
