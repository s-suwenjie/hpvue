<template>
  <td v-show="show">
    <div class="md_center">
      <span @click="selectEvent" class="md_select check_button_icon" :class="{md_selected:getChecked, check_button_icon_select:getChecked}"></span>
    </div>
  </td>
</template>

<script>
  export default {
    name: 'yhm-manager-td-checkbox',
    inject: ["p____page"],
    props: {
      value: {
        type: Object,
        required: true
      },
      noClick:{
        type:Boolean,
        default:true
      },
      show:{
        type:Boolean,
        default:true
      }
    },
    methods:{
      selectEvent(){
        if(this.noClick) {
          this.p____page.selectValue = this.selectItem(this.p____page.selectValue, this.value)
          this.$nextTick(()=>{
            this.$emit("call",this.p____page.selectValue,this.value)
          })
        }
      },
      selectItem (selectValue,data) {
        let index = selectValue.indexOf(data.id)
        if(index === -1){
          selectValue.push(data.id)
          selectValue[data.id] = data
        }
        else{
          selectValue[data.id] = null
          selectValue.splice(index,1)
        }
        return selectValue
      }
    },
    computed:{
      getChecked(){
        return this.p____page.checkSelect(this.value.id)
      }
    },
    created () {
      // console.log(this)
    }
  }
</script>

<style scoped>

</style>
