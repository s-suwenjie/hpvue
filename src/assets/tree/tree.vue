<template>
  <div class="t_item" :class="{t_child:!isTop}">

    <div v-if="getVerticalLineShow(item,index)" v-for="(item,index) in lineArr" :key="index" :style="{left:getVerticalLineLeft(index + 1)}" class="t_vertical_line"></div>
    <div v-if="!isTop" class="t_horizontal_line"></div>
    <div class="t_btn"  @mouseout="mouseoutEvent" @mouseover="mouseoverEvent" @click="clickEvent">
      <div v-if="getShowMenu" class="t_menu" @click.stop="menuClick">
        <div class="t_arrow">
          <img src="../../../static/css/images/arrowwhite.png">
        </div>
        <div class="t_menu_content">
          <div v-if="getShowMenuItem(item.category,value.menuCategory)" @click="menuClickEvent(item.name,value)" v-for="(item,index) in menu" :key="index">{{item.name}}</div>
        </div>
      </div>
      <span :class="getIcon"></span>
      <div class="t_mame">{{value.name}}</div>
    </div>
    <yhm-tree @call="treeEvent" v-show="getOpen" :menu="menu" :content="value.details" :index="i" :isLast="lastArr" :last="i === value.details.length - 1" v-for="(item,i) in value.details" :key="item.id" :value="item" :is-top="false">
    </yhm-tree>
  </div>
</template>

<script>
  import {accAdd,accMul} from '@/assets/common.js'
  export default {
    name: 'yhm-tree',
    data(){
      return{
        lastArr:this.isLast.slice(),
        lineArr:[]
      }
    },
    props:{
      menu:{
        type:Array,
        default:function () {
          return [
            {name:"选择",category:""}
          ]
        }
      },
      index:{
        type:Number,
        required:true
      },
      content:{
        type:Array,
        required:true
      },
      isLast:{
        type:Array,
        default:function () {
          return []
        }
      },
      last:{
        type:Boolean,
        required:true
      },
      value:{
        type:Object,
        required:true
      },
      isTop:{
        type:Boolean,
        default: true
      }
    },
    methods:{
      //鼠标放上事件
      mouseoverEvent(){
        this.menuShow = true
      },
      //鼠标移出事件
      mouseoutEvent(){
        this.menuShow = false
      },
      //按钮点击展开关闭事件
      clickEvent(){
        if(this.value.details.length > 0) {
          if (this.value.open === '0') {
            this.value.open = '1'
            for(var i = 0;i < this.content.length; i++){
              if(i !== this.index){
                this.content[i].open = '0'
                this.recursiveClose(this.content[i].details)
              }
            }
          } else {
            this.value.open = '0'
            this.recursiveClose(this.value.details)
          }
        }
      },
      //递归关闭菜单
      recursiveClose(list){
        for(var i = 0; i < list.length;i++){
          list[i].open = '0'
          this.recursiveClose(list[i].details)
        }
      },
      //辅助菜单事件
      menuClick(){
        return false
      },
      //点击辅助菜单事件
      menuClickEvent(category,item){
        this.$emit("call",category,item)
      },
      treeEvent(category,item){
        this.$emit("call",category,item)
      }
    },
    created(){
      this.lastArr.push(this.last)
      for(let i = 1; i < this.lastArr.length; i++){
        this.lineArr.push(this.lastArr[i])
      }
    },
    computed:{
      getShowMenuItem(){
        return function (categoryArray,menuCategory) {
          if(categoryArray.length === 0 || !menuCategory){
            return true
          }
          else{
            return categoryArray.indexOf(menuCategory) !== -1
          }
        }
      },
      getShowMenu(){
        var menuCount = 0
        if(!this.value.menuCategory){
          return this.menu && this.menu.length > 0
        }
        else {
          for (var i = 0; i < this.menu.length; i++) {
            if(this.menu[i].category.length === 0){
              menuCount++
            }
            else {
              if (this.menu[i].category.indexOf(this.value.menuCategory) !== -1) {
                menuCount++
              }
            }
          }
          return menuCount > 0
        }
      },
      getVerticalLineShow(){
        return function (item,index) {
          var temp = this.lineArr.slice()
          temp.reverse()
          if(index === 0){
            return true
          }
          else {
            return !temp[index]
          }
        }
      },
      getIcon(){
        if(this.value.details.length === 0){
          if(this.value.icon){
            return this.value.icon
          }
          return 'tree_no'
        }
        else{
          if(this.value.open === '1'){
            return 'tree_close'
          }
          else{
            return 'tree_open'
          }
        }
        return this.value.details.length === 0
      },
      getVerticalLineLeft(){
        return function (index) {
          return accAdd(accMul(index,-40),20) + "px"
        }
      },
      getOpen(){
        return this.value.open === '1'
      }
    }
  }
</script>

<style scoped>

</style>
