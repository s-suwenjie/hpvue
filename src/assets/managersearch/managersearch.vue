<template>
<div @mouseout="mouseoutEvent" @mouseover="mouseoverEvent" class="managersearch" v-click-control-outside="outsideCallEvent">
  <div class="box" :class="{hover:mouseOver,focus:focusStyle}">
    <input ref="txt" v-model="txt" type="text" :placeholder="placeholder" @focus="focusEvent" @keydown="focusEvent" @blur="blurEvent" @keyup.enter="enterEvent">
    <span @click.stop="iconClick" class="icon" :class="commonIcon"></span>
  </div>
  <div v-show="tipShow" class="tip">
    <div class="tipbox">
      <div>
        <span v-for="(item,index) in history" :key="index" :class="{InterlacBg:index%2!=0}" @click="useHistory(item.searchStr)">TOP{{index + 1}}：{{item.searchStr}}</span>
      </div>
      <img src="./images/arrow.png">
    </div>
  </div>
</div>
</template>

<script>
  export default {
    name: 'yhm-managersearch',
    inject: ["p____page"],
    data(){
      return{
        oldTxt:"",
        txt:this.value,
        focusStyle:false,
        mouseOver:false,
        commonIcon:"search",
      }
    },
    props:{
      placeholder:{
        type:String,
        default:"请输入关键字或关键字首字母……"
      },
      id:{
        type:String,
        default:""
      },
      blankShow:{//是否去除搜索框内值的空格
        type:Boolean,
        default:false
      },
      value:{
        type:String,
        default:""
      },
      history:{
        type:Array,
        default:function () {
          return []
        }
      }
    },
    computed:{
      tipShow(){
        return this.history && this.history.length > 0 && this.mouseOver //&& (this.focusStyle || this.mouseOver)
      }
    },
    methods:{
      //使用历史记录查询
      useHistory(item){
        this.mouseOver = false
        this.txt = item
        this.oldTxt = item
        this.$nextTick(()=>{
          this.$emit("call")
        })
      },
      //鼠标放上事件
      mouseoverEvent(){
        this.mouseOver = true
        if(this.txt !== ""){
          this.commonIcon = "searchDelete"
        }
        else{
          this.commonIcon = "search"
        }
      },
      //鼠标移出事件
      mouseoutEvent(){
        this.mouseOver = false
        if(!this.focusStyle) {
          this.commonIcon = "search"
        }
      },
      //回车事件
      enterEvent() {
        if(this.txt !== this.oldTxt) {
          this.oldTxt = this.txt
          this.$emit("call")
        }
      },
      //点击控件以外区域
      outsideCallEvent(){
        if(this.txt !== this.oldTxt){
          this.oldTxt = this.txt
          this.$emit("call")
        }
      },
      //文本框获取焦点
      focusEvent(){
        this.focusStyle = true
        this.mouseOver = false
        if(this.txt !== ""){
          this.commonIcon = "searchDelete"
        }
        else{
          this.commonIcon = "search"
        }
      },
      //文本框失去焦点
      blurEvent(){
        this.focusStyle = false
        this.commonIcon = "search"
      },
      //点击图标
      iconClick(){
        this.focusStyle = true
        this.$refs.txt.focus()
        if(this.txt !== ""){
          this.txt = ""
          this.commonIcon = "search"
        }
      }
    },
    watch:{
      txt(newVal,oldVal){
        var js = "this.p____page." + this.id + " = \"" + newVal + "\""
        eval(js);
        if(newVal !== ""){
          this.commonIcon = "searchDelete"
        }
        if(this.blankShow){
          this.txt = newVal.replace(/^(\s|\xA0)+|(\s|\xA0)+$/g, '')
        }
      },
      value(newVal,oldVal){
        this.txt = newVal
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
.managersearch{
  width: 280px;
  height: 30px;
  position: relative;
  margin-right: 5px;
}

.managersearch .tip{
  position: absolute;
  /*bottom: -138px;*/
  left: 0;
  min-width: 280px;
  z-index: 999;
}

.managersearch .tip .tipbox{
  position: relative;
  box-shadow: 0 0 8px #333;
}
.managersearch .tip .tipbox>img{
  position: absolute;
  left: 20px;
  top: -9px;
  transform: rotate(180deg);
}

.managersearch .tip .tipbox>div{
  background-color: #FFF;
  color: #333;
  border:2px solid #D9D9D9;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  padding: 6px 0;
  margin-top: 10px;
}
  .managersearch .tip .tipbox>div>span{
    margin-bottom: 3px;
    white-space:nowrap;
    overflow:hidden;

    text-overflow:ellipsis;
    max-width: 500px;
    text-align: left;
    padding: 2px 8px;
  }
  .managersearch .tip .tipbox>div>span:last-child{
    margin-bottom: 0;
    white-space:nowrap;
    text-align: left;
  }
  .managersearch .tip .tipbox>div>span:hover{
    cursor: pointer;
    background-color: #49a9ea;
    color: #FFF;
    border-radius: 4px;
  }
.managersearch .box{
  width: 100%;
  height: 100%;
  border-radius: 4px;
  border: 1px solid #BFBFBF;
  display: flex;
  flex-direction: row;
  background-color: #fff;
}
.managersearch .box input{
  flex: 1;
  border-radius: 4px;
  padding-left: 5px;
  border: none;
  outline: none;
}
.managersearch .box .icon{
  width: 32px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #BFBFBF;
}

.managersearch .hover{
  border: 1px solid #A5D6F7;
  cursor: pointer;
}
.managersearch .hover>.icon{
  color:#A5D6F7;
}

.managersearch .focus{
  border: 1px solid #49a9ea;
  cursor: pointer;
}
.managersearch .focus>.icon{
  color:#49a9ea;
}


.search:after{
  font-family: 'icomoon' !important;
  content: "\e911";
}
.searchDelete:after{
  font-family: 'icomoon' !important;
  content: "\e904";
}
</style>
