<template>
  <div v-if="show" class="formradiobutton" :class="{formradiobuttonWidth:getWidth}">
    <div class="context">
      <div class="title">
        <div>{{title}}</div>
        <div v-if="subtitle !== ''">{{subtitle}}</div>
      </div>
      <div class="content">
        <div @mouseout="mouseoutEvent" @mouseover="mouseoverEvent" class="box" :class="{error:error,hover:mouseStyle,boxWidth:getWidth,c_disable_radio:noEdit}">
          <div v-show="getItemShow(item.num)" @contextmenu.prevent @click="selectItem(item)" v-for="(item,index) in selectList" :key="index" class="item" :class="{select:getSelect(item.num)}">
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
    export default {
      name: "yhm-form-radio",
      inject: ["p____page"],
      data(){
        return{
          txt:this.value,
          code:"",
          mouseStyle:false,
          mouseOver:false,
          error:false,
          errorTipMessage:""
        }
      },
      props:{
        noShowItem:{
          type:Array,
          default:function () {
            return []
          }
        },
        title:{
          type:String,
          default:"标题"
        },
        noEdit:{
          type: Boolean,
          default: false
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
          type:String,
          default:""
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
        show:{
          type:Boolean,
          default:true
        }
      },
      methods:{
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
          if(!this.noEdit){
            let oldVal = this.txt
            this.txt = item.num
            this.code = item.code
            this.$nextTick(()=>{
              this.$emit("call",oldVal)
            })
          }
        }
      },
      computed:{
        getItemShow(){
          return function(val){
            if(this.noShowItem.length === 0){
              return true
            }
            else{
              let index = this.noShowItem.indexOf(val)
              return index === -1
            }
          }
        },
        getSelect(){
          return function(val) {
            return this.txt === val
          }
        },
        getWidth(){
          return this.width === "1"
        }
      },
      watch:{
        show(newVal,oldVal){
          if(!newVal){
            this.error = false
            this.txt = this.selectList[0].num
            var js = "this.p____page." + this.id + " = \"" + this.selectList[0].num + "\""
            eval(js);
          }
        },
        txt(newVal,oldVal){
          var js = "this.p____page." + this.id + " = \"" + newVal + "\""
          eval(js);
        },
        value(newVal,oldVal){
          this.txt = newVal
        }
      }
    }
</script>

<style scoped>

  *{
    box-sizing: border-box;
  }

  .formradiobutton {
    width: 499px;
    padding: 1px 0;
    position: relative;
  }

  .formradiobuttonWidth{
    width: 998px;
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
    min-height: 30px;
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
    content: "\e900";
    font-size: 16px !important;
  }
  .formradiobutton .radiochecked{
    position: relative;
  }
  .formradiobutton .radiochecked:after{
    font-family: 'icomoon' !important;
    content: "\e901";
    font-size: 16px !important;
  }


  .aaa{
    border: 1px solid #FF0000;
  }
</style>
