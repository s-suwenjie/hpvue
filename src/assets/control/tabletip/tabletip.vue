<template>
    <div v-show="show" class="t_tip" :style="{left:getLeft,top:getTop,width:getTotalWidth}">
      <table class="t_table" width="100%" border="1" cellspacing="0">
        <thead>
          <tr>
            <yhm-managerth v-for="(item,index) in column" :key="index" :width="item.width" :title="item.title"></yhm-managerth>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(detail,i) in content" :key="i">
            <template v-for="(item,index) in column">
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
  import { accAdd } from '../../common'

  export default {
    name: 'yhm-table-tip',
    data(){
      return{
        x:0,
        y:0,
        left:0,
        top:0
      }
    },
    props: {
      content:{
        type:Array,
        required: true
      },
      column:{
        type:Array,
        default:function () {
          //行宽，标题，使用空间类型,显示的列名
          return [{width:'',title:'',category:'',key:''}]
        }
      },
      mouseControl:{
        required: true
      },
      nodeClassName:{
        type:String,
        default:'m_main'
      },
      align:{
        type:String,
        default:'center'
      },
      verticalAlign:{
        type:String,
        default:'bottom'
      },
      show:{
        type:Boolean,
        default:false
      },
      // title: {
      //   type: String,
      //   required: true
      // }
    },
    methods:{
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
    computed:{
      getTotalWidth(){
        var result = 0
        for(let item in this.column){
          result = accAdd(result,this.column[item].width)
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
    watch:{
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

<style scoped>

</style>
