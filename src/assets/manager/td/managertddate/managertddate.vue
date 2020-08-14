<template>
    <td ref="control" @mouseover="mouseoverEvent" @mouseout="mouseoutEvent" @click="clickEvent">
      <div class="md_center md_relative">
        <div v-if="beforeIcon !== ''" class="md_beforeIcon" :style="{color:beforeIconColor}" :class="[beforeIcon,beforeIconFontSize]"></div>
        {{getValue}}<span v-if="getEmpty" class="ml5" :class="{weekend:getWeekend}">{{getWeek}}</span>
      </div>
    </td>
</template>

<script>
  export default {
    name: 'yhm-manager-td-date',
    inject: ["p____page"],
    props: {
      value: {
        type: String,
        required: true
      },
      valueObject:{
        type:Object
      },
      beforeIcon:{
        type:String,
        default:''
      },
      empty:{
        type:String,
        default:'-----'
      },
      beforeIconColor:{
        type:String,
        default:'#18d123'
      },
      beforeIconFontSize:{
        type:String,
        default:'fs14'
      }
    },
    methods:{
      clickEvent(){
        this.$nextTick(()=>{
          this.$emit('click')
        })
      },
      mouseoverEvent(){
        this.$nextTick(() => {
          this.$emit('mouseover',this.valueObject,this.$refs.control)
        })
      },
      mouseoutEvent(){
        this.$nextTick(() => {
          this.$emit('mouseout',this.valueObject,this.$refs.control)
        })
      }
    },
    computed:{
      getValue(){
        if(new Date(this.value).getTime() === new Date('1900-01-01').getTime() || new Date(this.value).getTime() === new Date('1900-01-01 00:00:00').getTime()){
          return this.empty
        }
        return this.value
      },
      getEmpty(){
        if(new Date(this.value).getTime() === new Date('1900-01-01').getTime() || new Date(this.value).getTime() === new Date('1900-01-01 00:00:00').getTime()){
          return false
        }
        return true
      },
      getWeekend:{
        get:function () {
          var week = new Date(this.value).getDay();
          return week === 0 || week === 6
        }
      },
      getWeek:{
        get:function () {
          var weekday=["周日","周一","周二","周三","周四","周五","周六"];
          return weekday[new Date(this.value).getDay()]
        }
      }
    },
  }
</script>

<style scoped>

</style>
