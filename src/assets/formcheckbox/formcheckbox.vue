<template>
  <div v-if="show" class="formradiobutton" :class="{formradiobuttonWidth:getWidth}" v-validator="validatorEvent">
    <div class="context">
      <div class="title">
        <div>{{title}}</div>
        <div v-if="subtitle !== ''">{{subtitle}}</div>
      </div>
      <div class="content">
        <div @mouseout="mouseoutEvent" @mouseover="mouseoverEvent" class="box" :class="{error:error,hover:mouseStyle,boxWidth:getWidth}">
          <div @contextmenu.prevent @click="selectItem(item)" v-for="(item,index) in selectList" :key="index" class="item" :class="{select:getSelect(item.num)}">
            <div class="radiocheck" :class="{radiochecked:getSelect(item.num)}"></div>
            <div class="txt">{{item.showName}}</div>
          </div>
        </div>
      </div>
    </div>
    <div class="error"><span v-if="error">{{errorTipMessage}}</span></div>
  </div>
</template>

<script>
  import {guid,accAdd,accMul} from '@/assets/common.js'
  export default {
    name: "yhm-form-check",
    inject: ["p____page"],
    data(){
      return{
        mouseStyle:false,
        mouseOver:false,
        error:false,
        errorTipMessage:this.errorMessage
      }
    },
    props:{
      title:{
        type:String,
        default:"标题"
      },
      subtitle:{
        type:String,
        default:""
      },
      width:{
        type:String,
        default:"0"
      },
      value:{
        type:Array,
        default:function () {
          return []
        }
      },
      submitValue:{
        type:String,
        default:""
      },
      ownerID:{
        type:String,
        default:""
      },
      tableName:{
        type: String,
        default: ""
      },
      selectList:{
        type:Array,
        default:function () {
          return []
        }
      },
      id:{
        type:String,
        default:""
      },
      rule:{
        type:String,
        default:""
      },
      errorMessage:{
        type:String,
        default:"至少选择一项"
      },
      show:{
        type:Boolean,
        default:true
      },

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
      selectItem(item){
        let index = this.value.indexOf(item.num)
        if(index === -1){
          this.value.push(item.num)
        }
        else{
          this.value.splice(index,1)
        }
        this.$emit("click")
        this.verification()
      },
      //验证
      verification(){
        var result = true;
        if(this.show && this.rule === "#") {
          result = this.value.length !== 0
          this.error = !result
        }
        return result;
      }
    },
    created(){
      if(this.value.length > 0){
        let js = "this.p____page." + this.submitValue + ".splice(0,this.p____page." + this.submitValue + ".length)"
        eval(js);
        for(var i = 0; i < this.value.length; i++){
          var insertDate = new Date(accAdd(new Date().getTime(),accMul(i,1000)));
          var temp = {
            id:guid(),
            insertDate:insertDate,
            ownerID: this.ownerID,
            tableName: this.tableName + '',
            value:this.value[i]
          }
          js = "this.p____page." + this.submitValue + ".push(temp)"
          eval(js);
        }
      }
    },
    computed:{
      getSelect(){
        return function(val) {
          return this.value.indexOf(val) !== -1
        }
      },
      getWidth(){
        return this.width === "1"
      }
    },
    watch:{
      value:{
        handler:function(newVal,oldVal){
          var js = "this.p____page." + this.submitValue + ".splice(0,this.p____page." + this.submitValue + ".length)"
          eval(js);
          for(var i = 0; i < newVal.length; i++){
            var insertDate = new Date(accAdd(new Date().getTime(),accMul(i,1000)));
            var temp = {
              id:guid(),
              insertDate:insertDate,
              ownerID:this.ownerID,
              tableName: this.tableName + '',
              value:newVal[i]
            }
            js = "this.p____page." + this.submitValue + ".push(temp)"
            eval(js);
          }
        },
        deep: true
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
  .formradiobutton {
    width: 500px;
    background-color: #E9E9E9;
    padding: 1px 0;
    position: relative;
  }

  .formradiobuttonWidth{
    width: 1000px;
  }

  .formradiobutton .context{
    min-height: 40px;
    display:flex;
    flex-direction: row;
    justify-items: center;
  }

  .formradiobutton .context .title{
    width: 85px;
    display:flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-end;
    font-size: 14px;
    color: #666666;
    padding-right: 10px;
  }
  .formradiobutton .context .content{
    flex: 1;
    display: flex;
    flex-direction: column;
  }
  .formradiobutton .context .content .box{
    min-height: 40px;
    width: 380px;
    background-color: #FFFFFF;
    border: 1px solid #BFBFBF;
    border-radius: 5px;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    padding: 4px;
  }
  .formradiobutton .context .content .boxWidth{
    width: 880px;
  }
  .formradiobutton .context .content .hover{
    border: 1px solid #A5D6F7;
    cursor: pointer;
  }
  .formradiobutton .context .content .error{
    border: 1px solid #FF0000;
  }

  .formradiobutton>.context>.content>.box>.item{
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    height: 30px;
    line-height: 30px;
    font-size: 14px;
    margin-right: 15px;
    padding: 0 5px;
    color:#333;
    -webkit-touch-callout:none;  /*系统默认菜单被禁用*/
    -webkit-user-select:none; /*webkit浏览器*/
    -khtml-user-select:none; /*早期浏览器*/
    -moz-user-select:none;/*火狐*/
    -ms-user-select:none; /*IE10*/
    user-select:none;
  }
  .formradiobutton>.context>.content>.box>.item:hover{
    border-radius: 5px;
    color: #1489d7;
  }
  .formradiobutton>.context>.content>.box>.item>.txt{
    margin-left: 5px;
  }
  .formradiobutton>.context>.content>.box>.select{
    background-color: #49a9ea;
    border-radius: 5px;
    color: #FFFFFF;
  }
  .formradiobutton>.context>.content>.box>.select:hover{
    background-color: #1489d7;
    color: #FFFFFF;
  }
  .formradiobutton>.error{
    height: 20px;
    line-height: 20px;
    font-size: 12px;
    color: #FF0000;
    text-indent: 85px;
    text-align: left;
  }
  .formradiobutton .radiocheck{
    position: relative;
  }
  .formradiobutton .radiocheck:after{
    font-family: 'icomoon' !important;
    content: "\e902";
    font-size: 16px !important;
  }
  .formradiobutton .radiochecked{
    position: relative;
  }
  .formradiobutton .radiochecked:after{
    font-family: 'icomoon' !important;
    content: "\e903";
    font-size: 16px !important;
  }


  .aaa{
    border: 1px solid #FF0000;
  }
</style>
