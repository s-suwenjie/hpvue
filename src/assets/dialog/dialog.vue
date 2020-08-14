<template>
  <div>
    <div v-show="isShow" class="AlertBox" :style="{width: width+ 'px',height: height+ 'px',marginLeft:marginLeft + 'px',marginTop:marginTop + 'px',zIndex:zIndex}">
      <div v-if="isHead" class="AlertBoxHead" @mousedown.self="dialogmousedown">
        <h3>
          <span>{{title}}</span>
          <img v-show="!isAutoClose" @click="close" title="关闭" src="./images/close.svg" />
          <img v-if="isRefresh" @click="refresh" title="刷新" style="margin-right:20px;" src="./images/Refresh.svg" />
          <img v-if="isEdit" title="编辑" style="margin-right:20px;" src="./images/edit.svg" />
          <img v-if="isEdit" title="返回" style="margin-right:20px;" src="./images/back.svg" />
        </h3>
      </div>
      <div v-if="isHead" class="AlertBoxMain" :style="{width: width+ 'px',height: height - 40+ 'px'}">
        <iframe v-if="category == 0" :src="url" style="width:100%; height:100%;"  frameborder="0" tabindex="1"></iframe>
        <!-- alert -->
        <div v-if="category == 2" class="alter" :style="{height: (height - 40) + 'px'}">
          <div class="content">
            <div class="img">
              <img v-if="alertImg == 'ok'" src="./images/ok.gif"/>
              <img v-if="alertImg == 'error'" src="./images/error.gif"/>
              <img v-if="alertImg == 'ask'" src="./images/ask.gif"/>
              <img v-if="alertImg == 'warn'" src="./images/warn.gif"/>
            </div>
            <div v-html="tipValue" class="tipValue"></div>
          </div>
          <div class="operate">
            <yhm-dialog-button @call="okEvent" :flicker="true" :value="btnOk"></yhm-dialog-button>
            <yhm-dialog-button v-if="alertImg == 'ask'" @call="cancelEvent" :value="btnCancel"></yhm-dialog-button>
          </div>
        </div>
        <!-- preview -->
        <div v-if="category == 3" class="imgPreview">
          <div class="imgCarousel">
            <div v-show="index+1 === previewIndex" v-for="(item,index) in previewArr" :key="index" :class="{zoom:zoom === 1}">
              <img :src="item" alt="" @click="clickEvent($event)" :style="{maxWidth:previewWidth,maxHeight:previewHeight,transform: getTransForm}">
            </div>
          </div>
          <div class="imgPreviewTip">
            <a href="javascript:;" class="arrorRgt i-leftArrow" @click="next"></a>
            <a href="javascript:;" class="aleft i-rotateLeft" @click="gotoLeft"></a>
            <a href="javascript:;" class="aleft i-zoom" @click="setBig"></a>
            <span>{{previewIndex}}/{{previewArr.length}}</span>
            <a href="javascript:;" class="aright i-narrow" @click="setSmall"></a>
            <a href="javascript:;" class="aright i-rotateRight" @click="gotoRight"></a>
            <a href="javascript:;" class="arrowLft i-rightArrow" @click="prev"></a>
          </div>
        </div>
      </div>
      <div v-if="!isHead" class="AlertBoxMain" :style="{width: width+ 'px',height: height+ 'px'}">
        <div v-if="category == 1" class="alter" :style="{height: height+ 'px'}">
          <div class="content">
            <img src="./images/loading.gif" style="width:40px; height:40px;"/>
            <div v-html="tipValue" class="tipValue"></div>
          </div>
        </div>
      </div>
    </div>
    <div v-if="isHead" class="AlertBoxMove" v-show="!isShow" @mouseout="dialogmouseout" @mouseup="dialogmouseup" @mousemove="dialogmousemove" :style="{width: width+ 'px',height: height+ 'px',marginLeft:marginLeft + 'px',marginTop:marginTop + 'px',zIndex:zIndex}"></div>
  </div>
</template>

<script>
  import {accMul} from '@/assets/common.js'
    export default {
        name: "yhm-dialog",
      data(){
        return{
          previewWidth:"",
          previewHeight:"",
          zoom:0,
          rotate:0,
          zoomMultiple:1
        }
      },
      props:{
          id:String,
          title:String,
          width:Number,
          height:Number,
          marginLeft:Number,
          marginTop:Number,
          pointX:Number,
          pointY:Number,
          isHead:Boolean,
          isAutoClose:Boolean,
          isRefresh:Boolean,
          isEdit:Boolean,
          isShow:Boolean,
          category:Number,
          url:String,
          sourceUrl:String,
          sourceID:String,
          innerHTML:String,
          tipValue:String,
          returnValue:Object,
          isClose:Boolean,
          zIndex:Number,
          btnOk:String,
          btnCancel:String,
          closeCallBack:Function,
          alertImg:String,
          previewArr:Array,
          previewIndex:Number
      },
      methods:{
        setBig(){
          this.previewWidth = accMul(this.previewWidth.replace("px",''),1.1) + 'px'
          this.previewHeight = accMul(this.previewHeight.replace("px",''),1.1) + 'px'
        },
        setSmall(){
          this.previewWidth = accMul(this.previewWidth.replace("px",''),0.9) + 'px'
          this.previewHeight = accMul(this.previewHeight.replace("px",''),0.9) + 'px'
        },
        gotoLeft(){
          this.rotate -= 90
        },
        gotoRight(){
          this.rotate += 90
        },
        prev(){
          this.zoom = 0
          this.rotate = 0
          this.previewWidth = accMul(this.width,0.95) + "px"
          this.previewHeight = accMul(this.height - 40,0.95) + "px"
          this.previewIndex--
          if( this.previewIndex < 1){
            this.previewIndex = this.previewArr.length
          }
        },
        next(){
          this.zoom = 0
          this.rotate = 0
          this.previewWidth = accMul(this.width,0.95) + "px"
          this.previewHeight = accMul(this.height - 40,0.95) + "px"
          this.previewIndex++;
          if(this.previewIndex > this.previewArr.length){
            this.previewIndex = 1
          }
        },
        clickEvent(event){
          // if(this.zoom === 0){
          //   this.zoom = 1
          //   this.previewWidth = accMul(event.target.naturalWidth,0.90) + "px"
          //   this.previewHeight = accMul(event.target.naturalHeight,0.90) + "px"
          //   /*放大后，给图片的老爸设置宽100% 高100%*/
          // }
          // else{
          //   this.zoom = 0
          //   this.previewWidth = accMul(this.width,0.95) + "px"
          //   this.previewHeight = accMul(this.height - 40,0.95) + "px"
          // }
        }
      },
      watch:{
          width(newValue){
            if(this.category == 3) {
              this.previewWidth = accMul(newValue, 0.95) + "px"
            }
          },
          height(newValue){
            if(this.category == 3) {
              this.previewHeight = accMul(newValue - 40, 0.95) + "px"
            }
          }
      },
      computed : {
        getTransForm(){
          return 'rotate(' + this.rotate + 'deg)'
        }
      },
      created () {

      }
    }
</script>

<style scoped>
  .AlertBox{
    position:absolute;
    left:50%;
    top:50%;
    border-radius:8px;
    box-shadow:0 0 12px #000;
    background-color:#fff;
  }
  .AlertBoxHead {
    height:40px;
    width:100%;
    background-color:#329EE7;
    border-radius:8px 8px 0 0;
    cursor:move;
  }
  .AlertBoxHead h3{
    font-size:16px;
    font-family:"宋体";
    font-weight:bold;
    color:#fff;
    line-height:40px;
    padding-left:16px;}
  .AlertBoxHead h3 span{ float:left;}
  .AlertBoxHead h3 img{ float:right; cursor:pointer; margin-top:10px; margin-right:10px; width:20px; height:20px;}
  .AlertBoxMain{
    overflow:hidden;
    border-radius: 0 0 8px 8px;
  }
  .AlertBoxMove{
    position:absolute;
    left:50%;
    top:50%;
    border:3px dashed #f0eeee;
    z-index:99999991;
    cursor:move;
  }

  .AlertTest img{ vertical-align:middle; margin-top:20px;}
  .AlertTest span{ vertical-align:middle; margin-left:10px; margin-top:20px; display:inline-block; text-align:left;}

  .AlertButton{
    width:auto;
    padding:0 15px;
    border:1px solid #a2a2a2;
    border-radius: 4px;
    background: linear-gradient(0deg, #f1effa, #e8e9ed);
    font-size: 14px !important;
    font-family: 微软雅黑 !important;
    color: #5988a6;
    cursor: pointer;
    vertical-align: middle;
    line-height: 30px;
    height:30px;
    margin: 0 5px;
  }
  .AlertButton:hover{
    color:#fdfdfd;
    border:1px solid #037dca;
    background: linear-gradient(0deg, #1ea0ff, #77c6ff);
  }

  .alter{
    display: flex;
    flex-direction: column;
  }
  .alter .content{
    flex: 1;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
  }
  .alter .content .img{
    width: 70px;
  }

  .alter .content .img img{
    width: 70px;
    height: 70px;
  }

  .alter .content .tipValue{
    font-size: 16px;
  }

  .alter .operate{
    height: 50px;
    display: flex;
    justify-content: center;
  }

  .imgPreview{
    background-color: #2e2e2e;
    width: 100%;
    height: 100%;
  }

  .imgPreview .imgCarousel{
    margin: 0 auto;
    position: relative;
    height: 100%;
    display: grid;
    justify-content: center;
    align-items: center;
    overflow: scroll;
  }

  .imgPreview .imgPreviewTip {
    width: 100%;
    position: absolute;
    bottom: 16px;
    text-align: center;
    height: 60px;
    line-height: 60px;
    font-size: 30px;
    color: #333;
    background-color: #fff;
    z-index: 0;
    overflow: hidden;
  }
  .imgPreview .imgPreviewTip .imgPreviewIcon{
    position: relative;
    text-align: center;
    height: 50px;
    bottom: 60px;
  }
  .imgPreview .imgPreviewTip>span{
    margin: 0 10px;
  }
  .imgPreviewTip>a{
    margin: 0 15px;
    font-size: 24px;
  }
  .imgPreviewTip>a:hover{
    color: #49a9ea !important;
  }
  .imgPreview a.arrowLft {
    display: inline-block;
    left: 0;
    right: -80px;
    color: #888;
  }

  .imgPreview a.arrorRgt {
    display: inline-block;
    right: 80px;
    left: 0;
    color: #888;
  }
  .imgPreview a.aleft {
    display: inline-block;
    left: -150px;
    right: 0;
    color: #888;
  }

  .imgPreview a.aright {
    display: inline-block;
    left: 150px;
    right: 0;
    color: #888;
  }

  .zoom{
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

</style>
