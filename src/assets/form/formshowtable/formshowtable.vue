<template>
  <div v-show="show" class="f_tb" :style="{left: getLeft,top: getTop}">
    <table width="100%" border="1" cellspacing="0" class="">
      <thead>
        <tr>
          <yhm-managerth  v-show="false" v-for="(item,index) in thHeadCon" :key="index" :width="item.width" :title="item.title"></yhm-managerth>
        </tr>
      </thead>
      <tbody>
      <tr v-for="(detail,i) in tdBodyCon" :key="i" :class="[{InterlacBg:i%2!==0}]">
        <template v-for="(item,index) in thHeadCon">
          <yhm-manager-td-look v-if="item.category === 'id'"></yhm-manager-td-look>
          <yhm-manager-td v-if="item.category === ''" :value="detail[item.key]" :key="index"></yhm-manager-td>
          <yhm-manager-td-date v-if="item.category === 'date'" :value="detail[item.key]" :key="index"></yhm-manager-td-date>
          <yhm-manager-td-money v-if="item.category === 'money'" :value="detail[item.key]" :key="index"></yhm-manager-td-money>
        </template>
      </tr>
      </tbody>

    </table>
  </div>
</template>

<script>
  import {accAdd} from "../../common";

  export default {
    name: "yhm-form-show-table",
    data(){
      return{
        x:0,
        y:0,
        left:0,
        top:0
      }
    },
    props: {
      show: {
        type: Boolean,
        default: false
      },
      thHeadCon: {
        type: Array,
        default:function () {
          //行宽，标题，使用空间类型,显示的列名
          return [{width:'',title:'',category:'',key:''}]
        }
      },
      tdBodyCon: {
        type: Array,
        required: true
      },
      mouseControl:{
        required: true
      },
      nodeClassName:{
        type:String,
        default:'f_main'
      },
      align:{
        type:String,
        default:'center'
      },
      verticalAlign:{
        type:String,
        default:'bottom'
      },
    },
    methods: {
      getRelativeNode(control){
        let name = control.parentNode.className
        if(name !== this.nodeClassName){
          this.getRelativeNode(control.parentNode)
        }
        else{
          let rect = control.parentNode.getBoundingClientRect()

          this.x = rect.x
          this.y = rect.y
        }
      },
    },
    computed: {
      getTotalWidth(){
        let result = 0;
        for(let item in this.thHeadCon){
          result = accAdd(result, this.thHeadCon[item].width)
        }
        return result + 'px'
      },
      getLeft(){
        return this.left + 'px'
      },
      getTop(){
        return this.top + 'px'
      }
    },
    created() {

    },
    watch: {
      mouseControl(newVal){
        let clientRect = newVal.getBoundingClientRect()
        this.getRelativeNode(newVal)
        if(this.align === 'center') {
          this.left = clientRect.x - this.x - (this.getTotalWidth.replace('px','') - clientRect.width)/2
        }
        if(this.verticalAlign === 'bottom') {
          this.top = clientRect.y - this.y + clientRect.height + 5
        }
      }
    }
  }
</script>

<style scoped lang="less">
.f_tb{
  width: 960px;
}
</style>
