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
            <template v-for="(item,index) in column" >
              <yhm-manager-td-look  v-if="item.category === 'look'" :value="detail[item.key]" :key="index" @click="clickEvent(detail,item)"></yhm-manager-td-look>
              <yhm-manager-td v-if="item.category === ''" :value="detail[item.key]" :key="index" @click="clickEvent(detail,item)"></yhm-manager-td>
              <yhm-manager-td-date v-if="item.category === 'date'" :value="detail[item.key]" :key="index" @click="clickEvent(detail,item)"></yhm-manager-td-date>
              <yhm-manager-td-money v-if="item.category === 'money'" :value="detail[item.key]" :key="index" @click="clickEvent(detail,item)"></yhm-manager-td-money>
              <yhm-manager-td-rgt v-if="item.category === 'right'" :value="detail[item.key]" :key="index" @click="clickEvent(detail,item)"></yhm-manager-td-rgt>
              <yhm-form-td-delete v-if="item.category === 'delete'" :tip-value="customDeleteTipValue" :icon-color="customDeleteIconColor" :icon-name="customDeleteIcon" width="40" :list="content" :value="detail" :key="index" :del-click="true" @click="delServe(detail,'删除')" ></yhm-form-td-delete>
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
      customDeleteIcon:{//自定义delete组件的icon图标
        type: String,
        default: "delete"
      },
      customDeleteIconColor:{//自定义delete组件的icon图标颜色
        type: String,
        default: "red"
      },
      customDeleteTipValue:{//自定义delete组件的弹出框提示标题
        type: String,
        default: "是否删除当前列?"
      },
      // title: {
      //   type: String,
      //   required: true
      // }
    },
    methods:{
      clickEvent(item,title){
        this.$nextTick(()=>{
          this.$emit('call',item,title.title)
        })
      },
      delServe(item,title){
        this.$nextTick(()=>{
          this.$emit('call',item,title)
        })
      },
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
          this.top = clientRect.y - this.y + clientRect.height + 0
        }
      }
    }
  }
</script>

<style scoped lang="less">
  tbody{
    font-size: 14px;
  }
</style>
