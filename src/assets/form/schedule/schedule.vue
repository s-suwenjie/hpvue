<!--
html

<yhm-schedule ref="schedule" :config="scheduleConfig"></yhm-schedule>
<div v-show="showSchedule(scheduleConfig,0)">第一步</div>
<div v-show="showSchedule(scheduleConfig,1)">第二步</div>
-->
<!--
data

/*步骤条配置信息*/
scheduleConfig:{
  list:[
    {name:'第一步',show:true},
    {name:'第二步',show:true}
  ],
  current:1,          //当前步骤
  reject:false,       //是否驳回状态
  event:true,         //步骤条能不能点击
  isFinish:false,     //当前步骤是否完成
  select:-1,          //当流程结束后选择的节点（流程走完了，查看使用，isFinish = true）
  autoAddFinish:true  //自动添加完成步骤
}
-->

<!--
//上一步
this.$refs.schedule.prev()
//下一步
this.$refs.schedule.next()
//终止
this.$refs.schedule.stop()
-->


<template>
  <div>
    <div class="f_schedule f_scheduleFixed">
      <div @click="clickEvent(index)" v-for="(item,index) in list" :key="index" class="item"
           :class="{itemReject:getItemReject(index),itemHistory:getItemHistory(index),itemCurrent:getItemCurrent(index)}">
        <div class="leftUp"></div>
        <div class="leftDown"></div>
        <div class="content">{{getItemName(item)}}</div>
        <div class="after"></div>
      </div>
    </div>
    <div class="f_schedule"></div>
    <div v-show="getFinish">
      <slot>
        <yhm-formbody no-title>
          <template #title>已完成</template>
          <template #control>
            <div class="f_schedulefinish">
              <div class="icon i-btn-check-number"></div>
              <div class="txt">操作已完成</div>
            </div>
          </template>
        </yhm-formbody>
      </slot>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'yhm-schedule',
    data(){
      return{
        conf:this.config,
        list:[]
      }
    },
    props: {
      config:{
        type:Object,
        default:{}
      },
      psd:{
        type:Array,
        default: function(){
          return []
        }
      }
    },
    created(){
      this.init()
    },
    methods:{
      //初始化
      init(){
        // this.conf = Object.assign(this.conf,this.config)
        this.list = []
        for(let item of this.conf.list){
          if(item.show){
            this.list.push(item.name)
          }
        }
        if(this.conf.autoAddFinish){
          this.list.push("已完成")
        }
      },
      //上一步
      prev(){
        if(!this.conf.reject && !this.conf.isFinish){
          if(this.conf.current > 0){
            this.conf.current--
          }
        }
      },
      //下一步
      next(){
        if(!this.conf.reject && !this.conf.isFinish) {
          if (this.conf.current < this.list.length) {
            this.conf.current++
          }
          console.log(this.conf.current + "+1")
          console.log(this.list.length + "-1")
          if(this.conf.current === this.list.length - 1){
            this.conf.current++
            this.conf.isFinish = true
            this.conf.select = this.list.length-1
          }
        }
      },
      //终止
      stop () {
        if(!this.conf.isFinish){
          this.conf.reject = true
        }
      },
      clickEvent(index){
        if(this.conf.event) {
          if (index <= this.conf.current) {
            if (!this.conf.reject && !this.conf.isFinish) {
              //没有驳回、没有完成
              this.conf.current = index
            } else {
              //驳回或者完成
              this.conf.select = index
            }
          }
        }
      }
    },
    computed:{
      //获取节点是否已经完成
      getFinish(){
        if(!this.conf.reject && !this.conf.isFinish){
          return this.conf.current === this.list.length - 1
        }
        else{
          return this.conf.select === this.list.length - 1
        }
      },
      getItemCurrent(){
        return function (index) {
          if(!this.conf.reject && !this.conf.isFinish){
            return index === this.conf.current && !this.conf.reject
          }
          else{
            return index === this.conf.select
          }
        }
      },
      getItemHistory(){
        return function (index) {
          if(index < this.conf.current){
            return true
          }
          return false
        }
      },
      getItemReject(){
        return function (index) {
          return index === this.conf.current && this.conf.reject
        }
      },
      getItemName(){
        return function (code) {
          if(this.psd && this.psd.length > 0){
            for (let item of this.psd) {
              if(item.num == code){
                return item.showName
              }
            }
            return code
          }
          else{
            return code
          }
        }
      }
    },
    watch:{
      config:{
        handler (newVal,oldVal) {
          this.conf = newVal
          this.init()
        },
        deep: true
      }
    }
  }
</script>

<style scoped>

</style>
