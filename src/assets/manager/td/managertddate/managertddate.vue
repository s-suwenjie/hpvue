<template>
    <td v-show="show" ref="control" @mouseover="mouseoverEvent" @mouseout="mouseoutEvent" @click="clickEvent"
        class="menuTd" :class="{'overflow':menuShow}" @contextmenu.prevent="contextMenuEvent($event)"  @dblclick="dblclickEvent"
    >
      <div class="md_center md_relative">
        <div v-if="beforeIcon !== ''" class="md_beforeIcon" :style="{color:beforeIconColor}" :class="[beforeIcon,beforeIconFontSize]"></div>
        {{getValue}}<span v-if="getEmpty" class="ml5" :class="{weekend:getWeekend}">{{getWeek}}</span>
      </div>
      <div v-show="menuShow" v-if="menuList.length>0" ref="menuRight" class="menuRight" v-click-control-outside="outsideClick">
        <p v-for="(item,index) in menuList" :key="index" @click.stop="menuClick(item,index)">{{item}}</p>
      </div>
    </td>
</template>

<script>
  export default {
    name: 'yhm-manager-td-date',
    inject: ["p____page"],
    data(){
      return{
        menuShow:false,
      }
    },
    props: {
      menuList:{
        type:Array,
        default:function() {
          return []
        }
      },
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
      },
      show:{
        type:Boolean,
        default:true
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
      },
      dblclickEvent(){
        this.$nextTick(() =>{
          this.$emit("dblclick")
        })
      },
      menuClick(item,index){
        this.$nextTick(()=>{
          this.menuShow = false
          this.$emit('menuClick',item,index)
        })
      },
      outsideClick(){
        this.menuShow = false
      },
      contextMenuEvent(event){
        if(this.menuList.length>0){
          this.menuShow = false
          $(".menuRight").hide()
          let styles = this.$refs.menuRight.style
          styles.left = event.x+'px'
          styles.top = event.y+'px'
          styles.display = 'block'
          this.menuShow = true
        }
        this.$emit('rightClick')
      },
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

<style lang="less" scoped>
  .menuRight{
    position: fixed;
    width: auto;
    min-width: 100px;
    max-width: 200px;
    height: auto;
    padding: 5px 0;
    background: #fff;
    z-index: 999;
    border: 1px solid #D3D3D3;
    border-radius: 5px;
  p{
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0 6px;
    /*margin: 0 5px;*/
    height: 32px;
  }
  p:hover{
    background: #49a9ea;
    color: #FFFFFF;
  }
  }
  .overflow{
    overflow: inherit;
  }

  .menuTd{
    position: relative;
  }
</style>
