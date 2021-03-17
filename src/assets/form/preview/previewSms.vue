<template>
    <div v-show="previewShow">
      <div :class="{main:shadeShow}" @click="previewShow = false" title="点击关闭"></div>
      <div class="mainImg" :style="{top:previewTop==''?'50%':previewTop}">
        <img src="https://hp.yhm.hk/UploadFile/8C4503C2-4659-438C-927D-EA970065F0D4.svg"  height="350px" alt="">
        <div class="mainImgTest">
          {{value}}
        </div>
        <div class="promptMessage">
          当前为短信预览内容,具体内容以真是内容为准!
        </div>
      </div>
    </div>
</template>

<script>
  export default {
    name: 'yhm-preview-sms',
    inject: ['p____page'],

    data(){
      return{
        previewShow:false
      }
    },
    props:{
      shadeShow:{//遮罩层开关
        type:Boolean,
        default:false,
      },
      previewTop:{//距离顶部距离的定位
        type:String,
        default:'',
      },
      value:{
        type:String,
        default:'',
      }
    },
    mounted: function () {
      this.$nextTick(function () {
        this.$on('switch', function (type) {
          if(type=='0'){//0打开 1关闭 2自适应打开关闭
            this.previewShow = true
          }else if(type=='1'){
            this.previewShow = false
          }else if(type=='2'){
            this.previewShow = !this.previewShow
          }
        })
      })
    }
  }
</script>

<style lang="less" scoped>
.main{
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  z-index: 100000;
  opacity: 0.5;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #333;
}

.mainImg{
  width: 378px;
  height: 350px;
  position: absolute;
  top: 50%;
  left: 50%;
  z-index: 100002;
  transform: translate(-50%,-50%);
  border-radius: 20% 20% 0 0;
  background-color: #fff;
  box-shadow:0px 0px 20px #000;

}
.mainImgTest{
  width: 296px;
  min-height: 100px;
  position: absolute;
  padding: 12px 8px;
  font-size: 13px;
  text-align: left;
  line-height: 22px;
  border-radius: 10px;
  box-sizing: border-box;
  top: 98px;
  left: 50%;
  transform: translateX(-50%);
  background-color: #e5f1ff;
}
.promptMessage{
  width: 300px;
  font-size: 14px;
  text-align: center;
  position: absolute;
  bottom: 22px;
  left: 50%;
  transform: translateX(-50%);
  color: #bfbfbf;
}
</style>
