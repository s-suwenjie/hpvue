<template>
  <div v-if="show" class="fc_main">
    <div class="fc_box" >
      <div class="fc_title" :style="{color: color}">
        <div :style="{color:titleColor}">{{title}}</div>
        <div :style="{'color':subtitleColor}" v-if="subtitle !== ''" @click="subTitleClick" class="subTitleTest">{{subtitle}}</div>
      </div>
      <yhm-text :is-upper-case="isUpperCase" :show="show" :search-show="true" :lose-focus="false" @noEditClick="$emit('noEditClick')" :input-red-show="inputRedShow" v-if="!iconShou" :max-number="maxNumber" :min-number="minNumber" :blank-show="blankShow" :decimal-places="decimalPlaces" @focus="focusEvent" @blur="blurEvent" :max-length="maxLength" :lessEqual="lessEqual" :lessEqualMessage="lessEqualMessage" @change="changeEvent" @input="inputEvent" @keydownEnter="keydownenter" :placeholder="placeholder" :type="type" ref="control" :compared="compared" @repeatverify="verifyEvent" @verify="verify" :beforeIcon="beforeIcon" :afterIcon="afterIcon" :tip="tip" :tip-rule="tipRule" :noEdit="noEdit" :value="value" :id="id" :rule="rule" :emptyMessage="emptyMessage" :errorMessage="errorMessage" :repeatMessage="repeatMessage"></yhm-text>
      <slot></slot>
      <span class="c_icon formtextsearchC_icon" :class="[afterIcon]" @click="focusEvent"></span>

      <div v-show="searchShow" class="searchMain" id="searchMain" :class="[searchMainSite=='right'?'searchMainRight':'searchMainLeft']">
        <div  @mousedown="additionClickEvent()" v-show="searchAddShow" style="border-bottom: 1px solid #bfbfbf;display: flex;justify-content: center;align-items: center;height: 35px;cursor: pointer;color: #757575;">
          <span class="c_icon btnAdd formtextsearch2C_icon"></span>
          <span style="font-size: 14px;color: #bfbfbf;">添加数据</span>
        </div>
        <div v-for="(item,index) in searchList"  style="border-bottom: 1px solid #ccc" :style="{padding:searchTableList.length=='0'?'8px 10px':'0'}" :key="index" class="searchMainItem" @mousemove="checkedIndex = index" @mousedown.prevent="searchItemClick(index,item)" :class="{searchMainItemHover:checkedIndex==index}">
          <span v-if="searchTableList.length=='0'" :title="item[searchListKey]">{{item[searchListKey]}}</span>
          <div v-else class="searchListKeyClass">
            <div v-for="(items,i) in searchTableList" :key="i" class="searchTableListClass"
              :style="{width:items.width,textIndent:items.textIndent,fontSize:items.fontSize,color:items.color,backgroundColor:items.backgroundColor,textAlign:items.textAlign}"
              :title="item[items.key]"
            >
              {{item[items.key]==''?'-----':item[items.key]}}
            </div>
          </div>
        </div>
        <div v-show="searchLoading" class="searchLoadingClass" :style="{transition:searchTransitionTime,opacity:!searchLoading?'0':'1'}">
          <div class="pswp__preloader__icn" style="position: absolute;margin-right: 100px;" v-show="searchLoading" :style="{transition:searchTransitionTime,opacity:!searchLoading?'0':'1'}">
            <div class="pswp__preloader__cut">
              <div class="pswp__preloader__donut"></div>
            </div>
          </div>
          <div>
            加载中...
          </div>
        </div>
<!--        @mousedown="$emit('additionClick')"-->
        <div v-show="searchList.length=='0'&&!searchLoading" v-html="searchMessage"
             :style="{height:(Number(searchMainHeight)-55)+'px'}"
             style="width: 100%;display: flex;justify-content: center;align-items: center;transition: all 1.3s"></div>
      </div>
    </div>
    <div class="searchMainShade">
    </div>
    <div class="fc_error"><span v-if="error">{{errorTipMessage}}</span></div>
  </div>
</template>

<script>
  import {verify,tenThousandFormat,number2chinese,accAdd,formatPhone,formatCustomizeTip} from '@/assets/common.js'
  export default {
    name: 'yhm-form-text-search',
    inject: ["p____page"],
    data(){
      return{
        error: false,
        errorTipMessage: '',
        searchShow:false,//查询结果的显示隐藏
        checkedIndex:-1,//键盘选择搜索内容结果的索引值
        text:this.value,
        timing:'',
      }
    },
    props: {
      searchMainWidth:{//控制搜索结果框的宽度
        type:[String,Number],
        default :'700'
      },
      searchMainHeight:{//控制搜索结果框的高度
        type:[String,Number],
        default :'265'
      },
      searchMainSite:{//搜索结果内容框的位置 默认右对齐  left/right
        type:String,
        default :'right'
      },
      searchListKey:{//控制搜索结果 需要展示的字段变量的名称
        type:String,
        default :'name'
      },
      searchTableList:{//搜索结果 当前数组中如果有值则使用该表格数据展示
        type:Array,
        default :function () {
          return []
        }
      },
      searchList:{//搜索结果
        type:Array,
        default :function () {
          return []
        }
      },
      searchAddShow:{//是否显示添加数据的按钮
        type:Boolean,
        default:true
      },
      searchMessage:{//没有数据时的提示语 可以接收html标签等
        type:String,
        default :'暂无数据'
      },
      searchTransitionTime:{//动画延迟时间
        type:String,
        default:'all 1s'
      },
      searchLoading:{//加载中的loading显示隐藏
        type:Boolean,
        default:false
      },
      titleColor:{
        type:String,
        default :''
      },
      inputRedShow:{//这个是开启负数变红的
        type:Boolean,
        default: false
      },
      isUpperCase:{
        type:Boolean,
        default: false
      },
      iconTextShow:{
        type:Boolean,
        default: false
      },
      iconShou:{
        type:Boolean,
        default :false
      },
      iconName:{
        type:String,
        default :'list_look'
      },
      decimalPlaces:{
        type:Number,
        default :null
      },
      maxLength:{
        type: String,
        default:""
      },
      lessEqual:{
        type: String,
        default:""
      },
      lessEqualMessage:{
        type: String,
        default:""
      },
      placeholder:{
        type: String,
        default:""
      },
      compared:{
        type: String,
        default:""
      },
      type:{
        type: String,
        default:"text"
      },
      title: {
        type: String,
        default: '标题'
      },
      subtitle: {
        type: String,
        default: ''
      },
      subtitleColor: {
        type: String,
        default: '#333'
      },
      id: {
        type: String,
        required: true
      },
      value: {
        type: String,
        required: true
      },
      rule: {
        type: String,
        default: ''
      },
      emptyMessage: {
        type: String,
        default: ''
      },
      errorMessage: {
        type: String,
        default: ''
      },
      repeatMessage:{
        type:String,
        default:""
      },
      beforeIcon:{
        type:String,
        default:""
      },
      afterIcon:{
        type:String,
        default:""
      },
      blankShow:{//是否去除框内值的空格
        type:Boolean,
        default:false
      },
      tip:{
        type:String,
        default:""
      },
      tipRule:{
        type:String,
        default:""
      },
      noEdit:{
        type:String,
        default:""
      },
      show: {
        type: Boolean,
        default: true
      },
      color: {
        type: String,
        default: '#333'
      },
      FormShow:{
        type:Boolean,
        default:false
      },
      maxNumber:{
        //type:Number,
        default:''
      },
      minNumber:{
        //type:Number,
        default:''
      }
    },
    methods: {
      additionClickEvent(){
        this.$refs.control.$emit('loseFocus')

        setTimeout(()=>{
          this.$emit('additionClick')

        },0)

      },
      keydownenter(e){
        if(e.keyCode=='38'){//向上的方向键
          this.checkedIndex--
          if(Number(this.checkedIndex)<0){
            this.checkedIndex = 0
          }
        }else if(e.keyCode=='40'){//向下的方向键
          if(Number(this.checkedIndex)!=Number(this.searchList.length-1)){
            this.checkedIndex++
          }
        }
        if(e.keyCode=='13'){
          try {
            let item = this.searchList[this.checkedIndex]
            if(this.searchTableList.length=='0'){
              this.text = item[this.searchListKey]
            }else{
              this.text = item[this.searchTableList[0].key]
            }
            this.$refs.control.$emit('loseFocus')
          }catch (e) {
            this.$emit("keydown",e)
            return
          }
          this.searchMainSwitch('0')
          this.$emit('searchClick',this.checkedIndex,this.searchList[this.checkedIndex])
        }
        $(".searchMain").animate({'scrollTop':(35*this.checkedIndex)},0)
        window.clearInterval(this.timing);
        this.timing = window.setTimeout(()=>{
          if(e.keyCode!='37'&&e.keyCode!='38'&&e.keyCode!='39'&&e.keyCode!='40'){
            this.$emit("keydown",e)
          }
        },300)
        this.$refs.control.verification()

        console.log(this.checkedIndex,'this.checkedIndex')
      },
      subTitleClick(){
        this.$nextTick(() =>{
          this.$emit("subClick")
        })
      },
      iconClickEvent(){
        this.$nextTick(() =>{
          this.$emit("call")
        })
      },
      changeEvent(){
        this.$emit("change")
      },
      inputEvent(){
        this.$nextTick(() =>{
          this.$emit("input")
        })
      },
      verify(){
        this.error = this.$refs.control.error
        this.errorTipMessage = this.$refs.control.errorTipMessage
      },
      verifyEvent(){
        this.$emit("repeatverify")
      },
      //主动显示控件错误
      errorEvent(errorMessage){
        this.$refs.control.errorEvent(errorMessage)
      },
      searchItemClick(index,item){
        if(!this.searchLoading){
          if(this.searchTableList.length=='0'){
            this.text = item[this.searchListKey]
          }else{
            this.text = item[this.searchTableList[0].key]
          }
          setTimeout(()=>{
            document.getElementById('searchMain').style.height = '0px'
            document.getElementById('searchMain').style.width = '0px'
            this.searchShow = false
          },0)
          this.$refs.control.$emit('loseFocus')
          this.$emit('searchClick',index,item)
        }
      },
      searchMainSwitch(type){//0为关闭搜素内容以及动画效果 1为开启搜索内容以及动画效果
        this.$nextTick(()=>{
          if(type=='0'){
            document.getElementById('searchMain').style.height = '0px'
            document.getElementById('searchMain').style.width = '0px'
            setTimeout(()=>{
              this.searchShow = false
            },300)
          }else{
            this.searchShow = true
            setTimeout(()=>{
              document.getElementById('searchMain').style.height = this.searchMainHeight + 'px'
              document.getElementById('searchMain').style.width = this.searchMainWidth + 'px'
            },0)
          }
        })
      },
      blurEvent(){
        this.$nextTick(() => {
          this.searchMainSwitch('0')
          this.$emit("blur")
        })
      },
      focusEvent(){
        this.$nextTick(() => {
          if(this.value!=''){
            this.searchMainSwitch('1')
            this.$emit("keydown")
            $(".searchMain").animate({'scrollTop':0},0)

          }
          // this.$emit("focus")
        })
      },
      verifications(){
        this.$refs.control.verification()
      },
      spshow(){
        this.$emit("iconClick")
      }
    },
    watch: {
      searchLoading(newVal, oldVal){
        if(newVal){
          $(".searchMain").animate({'scrollTop':(0)},0)
        }
      },
      show (newVal, oldVal) {
        this.error = false
        if (!newVal) {
          this.txt = ''
          var js = 'this.p____page.' + this.id + ' = \'\''
          eval(js)
        }
      },
      text(newVal,oldVal){
        if(newVal==''){
          this.searchMainSwitch('0')
        }else{
          this.searchMainSwitch('1')
        }
        var js = "this.p____page." + this.id + " = \"" + newVal + "\""
        eval(js)

      },
      value(newVal, oldVal) {
        this.text = newVal
        this.error = this.$refs.control.error
        this.errorTipMessage = this.$refs.control.errorTipMessage
      }
    }
  }
</script>


<style scoped>
  *{
    box-sizing: border-box;
  }
  .searchTableListClass{
    height: 35px;
    line-height: 35px;
    white-space: nowrap;
    text-overflow:ellipsis;
    overflow:hidden;
  }
  .searchLoadingClass{
    position: absolute;
    height:100%;
    background-color:rgba(233,233,233,0.7);
    top: 0;
    left: 0;
    bottom: 0;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center
  }
  .formtextsearchC_icon{
    width: 30px;
    height: 30px;
    background-color: #fff;
    cursor: pointer;
    position: absolute;
    right: 38px;
    top: 6px;
  }
  .searchListKeyClass{
    height: 35px;
    padding: 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .searchMainLeft{
    position: absolute;
    left: 82px;
    top: 42px;
  }
  .searchMainRight{
    position: absolute;
    right: 34px;
    top: 42px;
  }
  .searchMain{
    width: 0px;
    height: 0px;
    background: #fff;
    /*position: absolute;*/
    z-index: 8;
    /*right: 34px;*/
    /*top: 42px;*/
    overflow-y: scroll;
    /*border-top: 1px solid #333;*/
    border-radius: 5px;
    transition: 0.3s all;
    box-sizing: border-box;
    box-shadow:0px 0px 10px #000;
    overscroll-behavior: contain;
  }
  .formtextsearch2C_icon::before{
    font-size: 16px;
  }
  .searchMainShade{
    /*width: 100%;*/
    /*height: 100%;*/
    /*!*background-color: #49a9ea;*!*/
    /*position: fixed;*/
    /*top: 0;*/
    /*left: 0;*/
  }
  .searchMainItem{
    font-size: 14px;
    cursor: pointer;
    padding: 8px 10px;
  }
  .searchMainItemHover{
    color:#fff !important;
    background-color: #49a9ea;
  }
  .keyboardCenter{
    display: flex;
    justify-content: space-between;
  }
  .keyboard::before{
    float: right;
    margin-left: 10px;
    font-size: 24px;
    color: #49a9ea;
    margin-top: 8px;
  }
  .icon_look{
    font-size: 20px;
    color: #49a9ea;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    margin-left: 10px;
  }
  .subTitleTest{
    cursor: pointer;
  }
</style>
