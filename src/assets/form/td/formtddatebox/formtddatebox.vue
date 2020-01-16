<template>
  <td ref="td_control" class="fd_in_txt" :style="getWidth">
    <yhm-datebox :position="position" :max="max" :min="min" :width="getTxtWidth" :noEdit="noEdit === '1'" :value="txt" :id="txtKey" :rule="rule" category="m"></yhm-datebox>
  </td>
</template>

<script>
  import {accAdd} from '@/assets/common.js'
    export default {
      name: "yhm-form-td-date",
      data(){
        return{
          txt:this.value[this.id],
          txtKey:this.listid + '[' + this.list.indexOf(this.value) + '].' + this.id
        }
      },
      props: {
        max:{
          type:String,
          default:""
        },
        min:{
          type:String,
          default:""
        },
        width:{
          type: String,
          required: true
        },
        list: {
          type: Array,
          required: true
        },
        listid: {
          type: String,
          required: true
        },
        id: {
          type: String,
          required: true
        },
        value: {
          type: Object,
          required: true
        },
        rule: {
          type: String,
          default: ''
        },
        tip: {
          type: String,
          default: ""
        },
        noEdit: {
          type: String,
          default: ""
        },
        position:{
          type:String,
          default:"down"
        },
        show: {
          type: Boolean,
          default: true
        }
      },
      computed:{
        getWidth(){
          if(this.width !== '') {
            return 'width:' + accAdd(this.width,-6) + 'px !important;'
          }
          else{
            return ''
          }
        },
        getTxtWidth(){
          if(this.width !== '') {
            return accAdd(this.width,-6) + ''
          }
          else{
            return ''
          }
        }
      },
      watch:{
        value:{
          handler(newValue, oldValue) {
            this.txt = newValue[this.id]
          },
          deep: true
        }
      }
    }
</script>

<style scoped>

</style>
