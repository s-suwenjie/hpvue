<template>
  <div class="cbl_main" @click="clickAllEvent" @contextmenu.prevent="contextMenuEvent($event)" :style="{boxShadow: (mouseStyle ? getHoverColor : getColor)}" @mouseover="mouseOverEvent" @mouseout="mouseOutEvent" v-right-click-control-outside="closeRightMenu">
    <div v-show="mouseStylePrompt" class="cbl_main_prompt">
      <div class="cbl_main_prompt_content">
        右键操作
        <img src="/UploadFile/m_image/arrow.png">
      </div>
    </div>
    <div class="cbl_main_more" @mouseover="mouseOverPromptEvent" @mouseout="mouseOutPromptEvent">
      <div></div>
      <div></div>
      <div></div>
    </div>
    <div class="cbl_main_left">
      <div class="cbl_main_left_type" :class="getCategory">
        <span>{{getCategoryValue}}</span>
      </div>
    </div>
    <div class="cbl_main_right">
      <div class="cbl_main_right_num">
        <span class="cbl_main_right_num_before">{{getbeforeCode}}</span>
        <span class="cbl_main_right_num_after">{{getAfterCode}}</span>
        <span class="cbl_main_right_num_bigAfter">{{getAfterBigCode}}</span>
      </div>
      <div class="cbl_main_right_customize">
        <div class="cbl_main_right_content">
          <slot></slot>
        </div>
      </div>
    </div>
    <div v-show="rightMenuShow" :style="getRightMenuPosition" class="cbl_main_right_menu disable_menu" v-click-control-outside="closeRightMenu">
      <div class="item" v-for="(item,index) in menu[menuCategory]" :key="index" @click.stop="clickEvent(item)">{{item}}</div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'yhm-view-list-block',
    data(){
      return{
        mouseStyle:false,
        mouseStylePrompt:false,
        mouseX:0,
        mouseY:0,
        rightMenuShow:false
      }
    },
    props: {
      psd:{
        type:Array,
        default:function() {
          return []
        }
      },
      menu:{
        type:Array,
        default:function() {
          return []
        }
      },
      menuCategory:{
        type: String,
        default:'0'
      },
      item:{
        type:Object,
        default:function() {
          return {}
        }
      },
      //代码
      code:{
        type:String,
        default:''
      },
      //类型
      category:{
        type:String,
        default:'0'
      },
      //类型值
      categoryValue:{
        type:String,
        default:''
      },
      //底部颜色
      color:{
        type:String,
        default:'#7abcee'
      }
    },
    methods:{
      clickAllEvent(){
        this.$nextTick(() => {
          this.$emit('VIewEvent',this.item)
        })
      },
      mouseOverEvent(){
        this.mouseStyle = true
      },
      mouseOutEvent(){
        this.mouseStyle = false
      },
      mouseOverPromptEvent(){
        this.mouseStylePrompt = true
      },
      mouseOutPromptEvent(){
        this.mouseStylePrompt = false
      },
      contextMenuEvent(event){
        let rect = this.$el.getBoundingClientRect()
        this.mouseX = event.pageX - rect.x
        this.mouseY = event.pageY - rect.y
        this.rightMenuShow = true
      },
      closeRightMenu(){
        this.rightMenuShow = false
      },
      clickEvent(item){
        this.rightMenuShow = false
        this.$nextTick(() => {
          this.$emit('call',item,this.item)
        })
      }
    },
    computed:{
      getCategoryValue(){
        if(this.psd.length === 0){
          return this.categoryValue
        }
        else{
          let result = ''
          for(let i = 0; i < this.psd.length; i++){
            let item = this.psd[i]
            if(item.num === this.categoryValue){
              result = item.showName
              break
            }
          }
          return result
        }
      },
      getRightMenuPosition(){
        return 'left:' + this.mouseX + 'px;top:' + this.mouseY + 'px'
      },
      getColor(){
        return '0px 0px 4px 0px #bfbfbf, inset 0px -8px 0px 0px ' + this.color
      },
      getHoverColor(){
        return '0px 0px 12px 0px #49a9ea, inset 0px -8px 0px 0px ' + this.color
      },
      getCategory(){
        let result = this.category
        if(this.category === '' && this.category !== '1' && this.category !== '2' && this.category !== '3'&& this.category !== '4'){
          result = '0'
        }
        return 'cbl_main_left_type' + result
      },
      getbeforeCode(){
        let result = ''
        if (this.code.length > 8) {
          result = this.code.substring(0,this.code.length - 8)
        }
        return result
      },
      getAfterCode(){
        let result = ''
        if (this.code.length > 8) {
          result = this.code.substring(this.code.length - 8,this.code.length-4)
        }
        return result
      },
      getAfterBigCode(){
        let result = ''
        if (this.code.length > 8) {
          result = this.code.substring(this.code.length - 4,this.code.length)
        }
        return result
      }
    }
  }
</script>

<style scoped>
  *{
    box-sizing: border-box;
  }
</style>
