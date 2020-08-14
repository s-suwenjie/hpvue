<template>
  <td v-if="show" ref="td_control" class="fd_in_txt" :style="getWidth">
    <yhm-radio @call="callEvent" :no-edit="noEdit" :width="getTxtWidth" :select-list="selectList" :value="txt" :id="txtKey" :category="true"></yhm-radio>
  </td>
</template>

<script>
  import {accAdd} from '@/assets/common.js'
    export default {
      name: "yhm-form-td-radio",
      data(){
        return{
          txt:this.value[this.id],
          txtKey:this.listid + '[' + this.list.indexOf(this.value) + '].' + this.id
        }
      },
      props: {
        /*下拉框中绑定的值*/
        selectList: {
          type: Array,
          default: function () {
            return []
          }
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
        noEdit:{
          type: Boolean,
          default: false
        },
        show: {
          type: Boolean,
          default: true
        }
      },
      methods:{
        callEvent(){
          this.$nextTick(()=>{
            this.$emit("call",this.value)
          })
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
            this.txt = this.value[this.id]
          },
          deep: true
        }
      }
    }
</script>

<style scoped>

</style>
