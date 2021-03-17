<template>
  <div>
    <div class="Pager">
      <nobr>
        <a :class="this.getPageFirstDisabled" href="javascript:void(0);" @click="gotoFirst" class="PageButton">首页</a>
        <a :class="this.getPagePrevDisabled" href="javascript:void(0);" @click="gotoPrev" class="PageButton">&lt;&lt;</a>
        <a v-for="(item,index) in this.getShowPageContent" :key="index" href="javascript:void(0);" @click="gotoDesignation(item)" class="PageButton" :class="{PageButtonHover:item == pager.pageIndex}">{{item}}</a>
        <a :class="this.getPageNextDisabled" href="javascript:void(0);" @click="gotoNext" class="PageButton">&gt;&gt;</a>
        <a :class="this.getPageLastDisabled" href="javascript:void(0);" @click="gotoLast" class="PageButton">末页</a>
        <span class="PageSpan">当前第
          <input type="text" class="PageTextBox" @keyup.enter="reInitDataPrev" @blur="reInitData" @input="pageIndexEvent" v-model="pageIndex"/>
          页<button class="managerGo" type="button">Go</button>
          每页
          <input v-if="isPageSize == 'true'" type="text" class="PageTextBox" @keyup.enter="reInitDataPrev" @blur="reInitData" @input="pageSizeEvent" v-model="pageSize" />
          <span v-else>
            &nbsp;{{pageSize}}&nbsp;
          </span>
          条记录，共{{this.getPageCount}}页{{pager.total}}条记录<span v-if="isSelectInfo">当前选中&nbsp;<span id="PagerSelectCount" style="color:red;">{{pager.selectCount}}</span>&nbsp;条记录</span>。
        </span>
      </nobr>
    </div>
    <div class="PagerRight" v-if="!isNotRight">
      <div @click="gotoDesignation(getPrev)" class="left i-leftArrow fs18b" v-if="getPrev > 0"></div>
      <div @click="gotoDesignation(getNext)" class="right i-rightArrow fs18b" v-if="getNext <= getPageCount"></div>
    </div>
  </div>
</template>

<script>
import {accAdd,accMul} from '@/assets/common.js'
export default {
  name: 'yhm-pagination',
  data(){
    return{
      pageFirstDisabled:true,     //首页按钮默认不可点击
      pagePrevDisabled:true,      //向前按钮默认不可点击
      pageSize:1,
      pageIndex:1,
      pageNextDisabled:false,     //向后按钮默认可以点击
      pageLastDisabled:false      //末页按钮默认可以点击
    }
  },
  props:{
    isNotRight:{
      type: Boolean,
      default: false
    },
    isSelectInfo:{
      type: Boolean,
      default: true
    },
    isPageSize:{
      type: String,
      default: "true"
    },
    pager:{total:0,pageSize:15,pageIndex:1,selectCount:0}
  },
  created(){
    this.pageSize = this.pager.pageSize
    this.pageIndex = this.pager.pageIndex
  },
  methods:{
    //跳转到第一页
    gotoFirst(){
      if(!this.pageFirstDisabled) {
        this.pager.pageIndex = 1
        this.pageIndex = this.pager.pageIndex
        this.$emit("initData");
      }
    },
    //向前跳转五页
    gotoPrev(){
      if(!this.pagePrevDisabled) {
        this.pager.pageIndex -= 5
        this.pageIndex = this.pager.pageIndex
        this.$emit("initData");
      }
    },
    //向后跳转五页
    gotoNext(){
      if(!this.pageNextDisabled) {
        this.pager.pageIndex += 5
        this.pageIndex = this.pager.pageIndex
        this.$emit("initData");
      }
    },
    //跳转到指定页面
    gotoDesignation(index){
      if(this.pager.pageIndex != index){
        this.pager.pageIndex = index
        this.pageIndex = this.pager.pageIndex
        this.$emit("initData");
      }
    },
    //跳转到最后一页
    gotoLast(){
      if(!this.pageLastDisabled) {
        this.pager.pageIndex = this.getPageCount
        this.pageIndex = this.pager.pageIndex
        this.$emit("initData");
      }
    },
    //页码输入事件
    pageIndexEvent(event){
      var val = event.target.value.replace(/[^\d]/g,'');
      if(val == ""){
        val = 1;
      }
      else if(parseInt(val) == 0){
        val = 1;
      }
      else if(parseInt(accAdd(accMul(this.getPageCount,-1),val)) > 0){
        val = this.getPageCount
      }
      this.pageIndex = val
    },
    //页面大小输入事件
    pageSizeEvent(event){
      var val = event.target.value.replace(/[^\d]/g,'');
      if(val == ""){
        val = 15;
      }
      else if(parseInt(val) == 0){
        val = 15;
      }
      this.pageSize = val
      this.pageIndex = this.pageIndex > this.getPageCountTemp ? this.getPageCountTemp : this.pageIndex;
    },
    reInitDataPrev(event){
      event.target.blur();
    },
    //从新初始化关联数据
    reInitData(){
      this.pager.pageSize = this.pageSize
      this.pager.pageIndex = this.pageIndex
      this.$emit("initData");
    }
  },
  computed:{
    //上一页
    getPrev(){
      let index = accAdd(this.pager.pageIndex,-1)
      return index
    },
    //下一页
    getNext(){
      let index = accAdd(this.pager.pageIndex,1)
      return index
    },
    //获取页码总数
    getPageCount(){
      return this.pager.total == 0 ? 1 : this.pager.total % this.pager.pageSize == 0 ? parseInt(this.pager.total / this.pager.pageSize):parseInt(this.pager.total / this.pager.pageSize) + 1;
    },
    getPageCountTemp(){
      return this.pager.total == 0 ? 1 : this.pager.total % this.pageSize == 0 ? parseInt(this.pager.total / this.pageSize):parseInt(this.pager.total / this.pageSize) + 1;
    },
    //获取显示页码的数量
    getShowPageCount(){
      return this.getPageCount > 5 ? 5 : this.getPageCount == 0 ? 1 : this.getPageCount;
    },
    //获取显示的页码
    getShowPageContent(){
      var arr = [];
      var start = this.pager.pageIndex - 2
      if(start < 1){
        start = 1;
      }
      if(start + 4 > this.getPageCount){
        start = this.getPageCount - 4
      }
      if(start < 1){
        start = 1;
      }
      for(var i = 0;i < this.getShowPageCount; i++){
        arr.push(accAdd(start , i));
      }
      return arr;
    },
    //获取首页按钮是否可用
    getPageFirstDisabled(){
      this.pageFirstDisabled = this.pager.pageIndex == 1;
      return this.pageFirstDisabled ? "PageButtonDisabled" : "";
    },
    //获取向前移动五个页面按钮是否可用
    getPagePrevDisabled(){
      this.pagePrevDisabled = this.pager.pageIndex < 6;
      return this.pagePrevDisabled ? "PageButtonDisabled" : "";
    },
    //获取向后移动五个页面按钮是够可用
    getPageNextDisabled(){
      this.pageNextDisabled = this.getPageCount - this.pager.pageIndex < 5;
      return this.pageNextDisabled ? "PageButtonDisabled" : "";
    },
    //获取末页按钮是否可用
    getPageLastDisabled(){
      this.pageLastDisabled = this.pager.pageIndex == this.getPageCount;
      return this.pageLastDisabled ? "PageButtonDisabled" : "";
    },
  },
  watch:{
    pager:{
      handler(newValue, oldValue) {
        this.pageIndex = newValue.pageIndex
      },
      deep: true
    }
  }
}
</script>

<style scoped>
  .PagerRight{
    float: right;
    display: flex;
    height: 40px;
    /*width: 60px;*/
    margin-right: 10px;
    margin-top:5px;
    justify-content: flex-end;
    align-items: center;
  }

  .PagerRight>.left{
    width: 45px;
    height: 45px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 15px;
    cursor: pointer;
  }

  .PagerRight>.left:before{
    font-size: 24px !important;
    color: #c700df;
  }

  .PagerRight>.left:hover{
    background-color: #c700df;
  }
  .PagerRight>.left:hover:before{
    color: #FFFFFF;
  }


  .PagerRight>.right{
    width: 45px;
    height: 45px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 15px;
    cursor: pointer;
  }

  .PagerRight>.right:before{
    font-size: 24px !important;
    color: #49a9ea;
  }

  .PagerRight>.right:hover{
    background-color: #49a9ea;
  }
  .PagerRight>.right:hover:before{
    color: #FFFFFF;
  }


  .Pager {
    vertical-align: middle;
    padding: 8px 10px 10px 0;
    overflow: hidden;
    color: #606060;
    font-size: 12px;
    text-align: left;
    display: inline-block;
    font-family: "宋体";
  }
  .PageButton {
    background-color: #ffffff;
    padding: 7px 10px;
    margin: 0 1px 0 0;
    border: 1px solid #e5e5e5;
    display: inline-block;
    vertical-align: middle;
    cursor: pointer;
    text-align: center;
    font-size: 12px;
    text-decoration: none;
    color: #606060;
  }
  .PageButton:hover {
    background-color: #e1f1fb;
    color: #0467ab;
  }
  .PageButtonHover {
    background-color: #e1f1fb;
    color: #0467ab;
  }
  .PageButtonDisabled:hover {
    background-color: #ffffff;
    cursor: not-allowed;
  }
  .managerGo {
    width: 33px;
    height: 22px;
    background-color: #fff !important;
    background-image: none;
    vertical-align: middle;
    margin-left: 10px;
    cursor: pointer;
  }
  .PageSpan {
    padding: 3px 0 3px 0;
    margin: 1px;
    vertical-align: middle;
    text-align: center;
    font-size: 12px;
    text-decoration: none;
    color: #333;
  }
  .PageTextBox {
    background-color: #ffffff;
    padding: 5px 6px;
    margin: 1px;
    border: 1px solid #d9d9d9;
    display: inline-block;
    vertical-align: middle;
    cursor: pointer;
    _padding-left: 10px;
    _padding-right: 10px;
    text-align: center;
    font-size: 12px;
    color: #606060;
    width: 30px;
    height: 12px;
    border-radius: 4px;
  }
</style>
