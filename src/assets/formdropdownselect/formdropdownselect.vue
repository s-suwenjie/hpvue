<template>
  <div v-if="show" class="formdropdownselect" :class="{formdropdownselectWidth:getWidth}" v-validator="validatorEvent">
    <div class="context">
      <div class="title">
        <div>{{title}}</div>
        <div v-if="subtitle !== ''">{{subtitle}}</div>
      </div>
      <div class="content">
        <div @mouseout="mouseoutEvent" @mouseover="mouseoverEvent" class="box" :class="{error:error,hover:mouseStyle,boxWidth:getWidth,focus:focusStyle}">
          <div v-click-control-outside="closeSelectPanel" @mouseout="mouseoutLeftEvent" @mouseover="mouseoverLeftEvent" @click="dropdownEvent" class="left" :style="{width:dropdownwidth + 'px'}" :class="{hover:mouseLeftOver,c_disable:noClick}">
            <div class="txt">{{getSelectValue}}</div>
            <div class="dropdownicon" :class="{dropdowniconRotate:focusStyle}"></div>
            <div v-show="focusStyle" class="items">
              <span><img src="./images/arrow.png"></span>
              <div v-for="(item,index) in selectList" :key="index" @click.stop="selectItemEvent(item.num)" :class="{selected:defaultSelectValue === item.num}">{{item.showName}}</div>
            </div>
          </div>
          <div @click="selectEvent('o')" @mouseout="mouseoutRightEvent" @mouseover="mouseoverRightEvent" class="right" :class="{hover:mouseRightOver,c_disable:noClick}">
            <div class="txt">{{defaultTxt}}</div>
            <div class="selecticon"></div>
          </div>
        </div>
      </div>
    </div>
    <div class="error"><span v-if="error">{{errorTipMessage}}</span></div>
  </div>
</template>

<script>
  import {verify} from '@/assets/common.js'
    export default {
      name: "yhm-form-drop-down-select",
      inject: ["p____page"],
      data(){
        return{
          defaultTxt:this.value,
          defaultSelectValue:this.selectValue,
          focusStyle:false,
          mouseStyle:false,
          mouseOver:false,
          mouseLeftOver:false,
          mouseRightOver:false,
          error:false,
          errorTipMessage:this.errorMessage
        }
      },
      props:{
        dropdownwidth:{
          type:String,
          default:"110"
        },
        title:{
          type:String,
          default:"标题"
        },
        subtitle:{
          type:String,
          default:""
        },
        selectList:{
          type:Array,
          default:function () {
            return []
          }
        },
        selectValue:{
          type:String,
          default:""
        },
        selectid:{
          type:String,
          default:""
        },
        value:{
          type:String,
          default:""
        },
        id:{
          type:String,
          default:""
        },
        rule:{
          type:String,
          default:""
        },
        width:{
          type:String,
          default:"0"
        },
        emptyMessage:{
          type:String,
          default:""
        },
        errorMessage:{
          type:String,
          default:""
        },
        repeatMessage:{
          type:String,
          default:""
        },
        noClick:{
          type:Boolean,
          default:false
        },
        noBeforeClick:{
          type:Boolean,
          default:false
        },
        show:{
          type:Boolean,
          default:true
        }
      },
      methods:{
        //初始化验证事件
        validatorEvent(category){
          if(this.rule !== "") {
            var id = this.id;
            id = id.replace(".","_")
            if (category === "bind") {
              if(this.p____page.p____rule.indexOf(id) === -1){
                this.p____page.p____rule.push(id)
                this.p____page.p____rule[id] = this
              }
            } else if (category === "unbind") {
              let index = this.p____page.p____rule.indexOf(id)
              if(index !== -1){
                this.p____page.p____rule.splice(index,1)
                this.p____page.p____rule[id] = null
              }
            }
          }
        },
        //关闭弹出选项
        closeSelectPanel(){
          this.focusStyle = false
        },
        //鼠标放上事件
        mouseoverEvent(){
          if (!this.error){
            this.mouseStyle = true
          }
          this.mouseOver = true
        },
        //鼠标移出事件
        mouseoutEvent(){
          if (!this.error) {
            this.mouseStyle = false
          }
          this.mouseOver = false
        },
        //鼠标放上事件
        mouseoverLeftEvent(){
          this.mouseLeftOver = true
        },
        //鼠标移出事件
        mouseoutLeftEvent(){
          this.mouseLeftOver = false
        },
        //鼠标放上事件
        mouseoverRightEvent(){
          this.mouseRightOver = true
        },
        //鼠标移出事件
        mouseoutRightEvent(){
          this.mouseRightOver = false
        },
        dropdownEvent(){
          if(!this.noClick && !this.noBeforeClick) {
            this.focusStyle = true
            this.error = false
          }
        },
        selectItemEvent(item){
          if(this.defaultSelectValue != item) {
            this.$nextTick(() =>{
              this.selectEvent('i');
            })
          }
          this.defaultSelectValue = item
          this.focusStyle = false
        },
        selectEvent(op){
          if(!this.noClick) {
            this.error = false
            // var js = "this.p____page." + this.id + " = \"\""
            // eval(js);
            this.$nextTick(() => {
              this.$emit("select",op)
            })
          }
        },
        //验证
        verification(){
          var result = true;
          if(this.show && this.rule !== "") {
            var val = this.defaultTxt
            var res = verify(val, this.rule)
            result = res.key
            if(!result) {
              if(res.category === 0){
                if(this.emptyMessage === ""){
                  this.errorTipMessage = res.value
                }
                else{
                  this.errorTipMessage = this.emptyMessage
                }
              }
              else if(res.category === 1){
                if(this.errorMessage === ""){
                  this.errorTipMessage = res.value
                }
                else{
                  this.errorTipMessage = this.errorMessage
                }
              }
            }
            this.error = !result
          }
          return result;
        }
      },
      computed:{
        getSelectValue(){
          var result = "";
          for(var i = 0; i < this.selectList.length; i++){
            if(this.selectList[i].num === this.defaultSelectValue){
              result = this.selectList[i].showName;
              break;
            }
          }
          return result;
        },
        getWidth(){
          return this.width === "1"
        }
      },
      watch:{
        selectValue(newVal,oldVal){
          this.defaultSelectValue = newVal
        },
        defaultSelectValue(newVal,oldVal){
          var js = "this.p____page." + this.selectid + " = \"" + newVal + "\""
          eval(js);
        },
        value(newVal,oldVal){
          this.defaultTxt = newVal
          this.verification()
        },
        defaultTxt(newVal,oldVal){
          var js = "this.p____page." + this.id + " = \"" + newVal + "\""
          eval(js);
        }
      }
    }
</script>

<style scoped>
  *{
    padding: 0;
    border: 0;
    margin: 0;
    box-sizing: border-box;
  }
  .formdropdownselect {
    width: 500px;
    background-color: #E9E9E9;
    padding: 1px 0;
    position: relative;
  }
  .formdropdownselectWidth{
    width: 1000px;
  }
  .formdropdownselect .context{
    min-height: 40px;
    display:flex;
    flex-direction: row;
    justify-items: center;
  }

  .formdropdownselect .context .title{
    width: 85px;
    display:flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-end;
    font-size: 14px;
    color: #666666;
    padding-right: 10px;
  }

  .formdropdownselect .context .content{
    flex: 1;
    display: flex;
    flex-direction: column;
  }
  .formdropdownselect .context .content .box{
    min-height: 40px;
    width: 380px;
    background-color: #FFFFFF;
    border: 1px solid #BFBFBF;
    border-radius: 5px;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;

    -webkit-touch-callout:none;  /*系统默认菜单被禁用*/
    -webkit-user-select:none; /*webkit浏览器*/
    -khtml-user-select:none; /*早期浏览器*/
    -moz-user-select:none;/*火狐*/
    -ms-user-select:none; /*IE10*/
    user-select:none;
  }
  .formdropdownselect .context .content .boxWidth{
    width: 880px;
  }

  .formdropdownselect .context .content>.hover{
    border: 1px solid #A5D6F7;
    cursor: pointer;
  }
  .formdropdownselect .context .content>.hover>.left{
    border-right: 1px solid #A5D6F7 !important;
  }
  .formdropdownselect .context .content .focus{
    border: 1px solid #49a9ea;
    cursor: pointer;
  }
  .formdropdownselect .context .content .focus>.left{
    border-right: 1px solid #49a9ea !important;
  }
  .formdropdownselect .context .content .box .left{
    border-right: 1px solid #BFBFBF;
    border-radius: 5px 0 0 5px;
    display: flex;
    flex-direction: row;
    align-items: center;
    position: relative;
  }
  .formdropdownselect .context .content .box .left .items{
    position: absolute;
    left: 0px;
    top: 55px;
    background-color: #FFFFFF;
    border: 1px solid #999999;
    width: 100%;
    border-radius: 5px;
    display: flex;
    flex-direction: column;
    z-index: 999;

  }
  .formdropdownselect .context .content .box .left .items>span{
    position: relative;
  }
  .formdropdownselect .context .content .box .left .items>span>img{
    position: absolute;
    left: -10px;
    top: -11px;
    margin-left: 50%;
  }
  .formdropdownselect .context .content .box .left .items>div{
    display: flex;
    justify-content: center;
    align-items: center;
    height: 40px;
  }

  .formdropdownselect .context .content .box .left .items>div:hover{
    /*background-color: #49a9ea;*/
    color: #49a9ea;
    cursor: pointer;
  }

  .formdropdownselect .context .content .box .left .items>.selected{
    background-color: #49a9ea;
    color: #FFF;
    cursor: pointer;
    margin: 5px 0;
  }
  .formdropdownselect .context .content .box .left .items>.selected:hover{
    color: #FFF !important;
  }

  .formdropdownselect .context .content .box .left .txt{
    flex: 1;
    display: flex;
    flex-direction: row;
    align-items: center;
    padding-left: 10px;
    font-size: 14px;
  }
  .formdropdownselect .context .content .box .left .dropdownicon{
    color: #BFBFBF;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    width: 30px;
    transition: transform .3s;
  }
  .formdropdownselect .context .content .box>.hover>.dropdownicon{
    color:#A5D6F7;
  }
  .formdropdownselect .context .content .focus>.left>.dropdownicon{
    color:#49a9ea;
  }
  .formdropdownselect .context .content .box .left .dropdownicon:after{
    font-family: 'icomoon' !important;
    content: "\e90a";
    font-size: 18px;
  }

  .dropdowniconRotate{
    transform: rotate(180deg);
  }

  .formdropdownselect .context .content .box .right{
    flex: 1;
    border-radius: 0 5px 5px 0;
    display: flex;
    flex-direction: row;
    align-items: center;
  }

  .formdropdownselect .context .content .box .right .txt{
    flex: 1;
    display: flex;
    flex-direction: row;
    align-items: center;
    padding-left: 10px;
    font-size: 14px;
  }
  .formdropdownselect .context .content .box .right .selecticon{
    color: #BFBFBF;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    width: 30px;
  }

  .formdropdownselect .context .content .box>.hover>.selecticon{
    color:#A5D6F7;
  }
  .formdropdownselect .context .content .box .right .selecticon:after{
    font-family: 'icomoon' !important;
    content: "\e90b";
    font-size: 18px;
  }
  .formdropdownselect .context .content .error{
    border: 1px solid #FF0000;
  }
  .formdropdownselect .context .content .error>span{
    color:#FF0000;
  }
  .formdropdownselect .context .content .error>.left {
    border-right: 1px solid #FF0000;
  }
  .formdropdownselect .context .content .error>.right>.selecticon {
    color:#FF0000;
  }
  .formdropdownselect>.error{
    height: 20px;
    line-height: 20px;
    font-size: 12px;
    color: #FF0000;
    text-indent: 85px;
    text-align: left;
  }
</style>
