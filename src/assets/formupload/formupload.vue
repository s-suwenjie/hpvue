<template>
  <div v-if="show" class="formupload" v-validator="validatorEvent">
    <div v-show="showTip" class="tip">
      <div>释放鼠标上传文件
        <img src="./images/arrow.png">
      </div>
    </div>
    <div class="operate">
      <div v-if="!noEdit" ref="uploadArea" class="btn" v-drop="dropEvent">
        {{title}}（点击或者将文件拖拽到此）
        <input @change="selectfile" ref="fileControl" type="file" :multiple="multiple == 'multiple'">
      </div>
      <div v-if="noEdit" class="btn gray">
        {{title}}（点击或者将文件拖拽到此）
      </div>
      <div class="content">{{subtitle}}</div>
    </div>
    <div class="filecontent" :class="{errorBox:error}">
      <div v-for="(item,index) in value" :key="index" @click="lookItem(item)" class="item" :class="{hover:item.isEdit === '1'}">
        <label v-if="!noEdit" @click.stop="editShowNameEvent(item)"  :class="{image:item.image === '1',file:item.image === '0'}"></label>
        <label v-if="noEdit" :class="{image_1:item.image === '1',file_1:item.image === '0'}"></label>
        <label v-show="item.isEdit === '0'" class="txt">{{item.showName}}</label>
        <input ref="edit" @keyup.enter="editBlurEvent(item)" @blur="editBlurEvent(item)" v-show="item.isEdit === '1'" class="updateTxt" type="text" v-model="item.showName" />
        <span v-if="!noEdit" @click.stop="deleteItem(item)"></span>
      </div>
      <template  v-for="item in uploadingFileKeys">
        <div v-if="getShowProgressRates(item)" :key="item" class="progress">{{getProgressRates(item)}}%</div>
      </template>
      <div v-show="getEmptyShow" class="empty">{{emptyContent}}</div>
    </div>
    <div class="error"><span v-if="error">{{errorTipMessage}}</span></div>
  </div>
</template>

<script>
  import {guid,accAdd,accMul,formatTime} from '@/assets/common.js'
  export default {
    name: 'yhm-formupload',
    inject: ["p____page"],
    data(){
      return{
        spin:false,
        imageArr:[],
        uploadingFileKeys:[],
        uploadingFileFinishKeys:[],
        uploadingFileProgressRates:[],
        showTip:false,
        error:false,
        errorTipMessage:this.emptyMessage
      }
    },
    props:{
      title:{
        type:String,
        default:"上传文件"
      },
      subtitle:{
        type:String,
        default:""
      },
      multiple:{
        type:String,
        default:""
      },
      id:{
        type:String,
        default:""
      },
      value:{
        type:Array,
        default:function () {
          return []
        }
      },
      rule:{
        type:String,
        default:""
      },
      ownerID:{
        type:String,
        default:""
      },
      category:{
        type:String,
        default:""
      },
      tag:{
        type:String,
        default:"temp"
      },
      emptyContent:{
        type:String,
        default:"暂时没有上传文件"
      },
      emptyMessage:{
        type:String,
        default:"不能为空"
      },
      noEdit:{
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
      dropEvent(category,file){
        if(category === "drop"){//拖入后释放事件
          this.error = false
          this.showTip = false
          this.uploadBefore(file)
        }
        else if(category === "dragenter"){//拖入事件
          this.showTip = true
        }
        else if(category === "dragleave"){//拖入后又离开事件
          this.showTip = false
        }
      },
      //选择文件
      selectfile(){
        this.error = false
        this.uploadBefore(this.$refs.fileControl.files)
      },
      //根据Key修改上传进度
      updateProgressRates(key,val){
        this.uploadingFileProgressRates[key] = val
        this.uploadingFileKeys.splice(0,0)
      },
      uploadBefore(files){
        if(files.length > 0){
          this.spin = false
          for (var i = 0; i < files.length; i++){
            var image = 0;
            if(files[i].type.indexOf('image') !== -1){
              image = 1
            }
            var key = guid();
            this.uploadingFileKeys.push(key)
            this.uploadingFileProgressRates[key] = 0

            var fd = new FormData();
            fd.append("myfile",files[i])
            fd.append("tag", this.tag);
            fd.append("key",key)
            fd.append("image",image)

            this.ajaxUpload({
              data:fd,
              progressCall:(data,k)=>{
                this.updateProgressRates(k,data)
              },
              call:(data,img,k) =>{
                this.uploadingFileFinishKeys.push(k)
                let message = data.message.split("☆");
                this.initResult(message,img)
              }
            });
          }
        }
      },
      initResult(message,img){
        let insertDate = new Date(accAdd(new Date().getTime(), accMul(this.value.length, 1000)))
        this.value.push({
          id:guid(),
          insertDate:formatTime(insertDate),
          ownerID:this.ownerID,
          category:this.category,
          tag:this.tag,
          showName:message[1],
          storeName:message[2],
          suffix:message[0],
          image:img,
          isEdit:"0"
        })
        if(img === '1'){
          this.imageArr.push({
            tag:this.tag,
            path:message[2],
          })
        }
      },
      //旋转图片
      spinImage(){
        if(this.imageArr.length > 0){
          setTimeout(function () {},1000)
          let item = this.imageArr[0]
          let tag = item.tag
          let path = item.path
          this.$dialog.OpenWindow({
            width: 1050,
            height: 640,
            url:'/handleImageForm?tag=' + tag + '&path='+path,
            title:'预览图片',
            closeCallBack:() => {
              this.imageArr.splice(0,1)
              this.spin = false
            }
          })
        }
      },
      //查看文件
      lookItem(item){
        if(item.isEdit === "0") {
          if (item.image === "0") {
            var url = "/UploadFile/" + this.tag + "/" + item.storeName;
            window.open(url)
          } else {
            var imgArr = [];
            for (var i = 0; i < this.value.length; i++) {
              var temp = this.value[i];
              if (temp.image === "1") {
                imgArr.push("/UploadFile/" + temp.tag + "/" + temp.storeName);
              }
            }
            var index = imgArr.indexOf("/UploadFile/" + item.tag + "/" + item.storeName) + 1;
            this.$dialog.preview(imgArr, index)
          }
        }
      },
      //修改文件显示名称
      editShowNameEvent(item){
        if(!this.noEdit) {
          let index = this.value.indexOf(item);
          this.value[index].isEdit = "1"
          this.$nextTick(() => {
            this.$refs.edit[index].focus();
          })
        }
        else{
          this.lookItem(item)
        }
      },
      editBlurEvent(item){
        let index = this.value.indexOf(item);
        this.value[index].isEdit = "0"
      },
      //删除文件
      deleteItem(item){
        let index = this.value.indexOf(item);
        this.value.splice(index,1)
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
    computed:{
      getShowProgressRates(){
        return function(key) {
          return this.uploadingFileFinishKeys.indexOf(key) === -1
        }
      },
      getProgressRates(){
        return function (key) {
          return this.uploadingFileProgressRates[key]
        }
      },
      getEmptyShow(){
        return this.value.length === 0
      }
    },
    watch:{
      rule(newVal){
        if(newVal === ''){
          this.error = false
        }
      },
      imageArr:{
        handler:function(newVal,oldVal){
          if(newVal.length >= 1 && !this.spin){
            this.spin = true
            this.spinImage()
          }
        },
        deep: true
      },
      spin(newVal){
        if(!newVal && this.imageArr.length > 0){
          this.spin = true
          this.spinImage()
        }
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
  .formupload{
    width: 1000px;
    background-color: #E9E9E9;
    padding: 1px 20px;
    position: relative;
  }
  .formupload .tip{
    width: 162px;
    line-height: 20px;
    position: absolute;
    top: -45px;
    left: 20px;
    padding: 8px;
    border-radius: 5px;
    background-color: #FFF;
    color: #333;
    border:1px solid #999;
    font-size: 18px;
  }

  .formupload .tip>div{
    position: relative;
  }
  .formupload .tip>div>img{
    position: absolute;
    left: 20px;
    bottom: -18px;
  }
  .formupload .operate{
    height: 32px;
    display: flex;
    flex-direction: row;
    justify-content: left;
    align-items: flex-end;
  }
  .formupload .operate .btn{
    height: 32px;
    background: #49a9ea;
    border-radius: 5px;
    color: #FFF;
    font-size: 14px;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0 20px;
    position: relative;
  }
  .formupload .operate .btn:before{
    font-family: 'icomoon' !important;
    content: "\e90f";
    margin-right: 10px;
  }
  .formupload .operate .btn:hover{
    background: #1489d7;
    cursor: pointer;
  }
  .formupload .operate .btn>input{
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
    opacity: 0;
  }
  .formupload .operate .content{
    font-size: 12px;
    color: #666;
    margin-left: 10px;
  }
  .formupload .filecontent{
    min-height: 48px;
    background-color: #FFFFFF;
    border-radius: 5px;
    margin-top: 8px;
    padding-top: 8px;
    border: 1px solid #BFBFBF;
    width: 945px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-wrap: wrap;
    -webkit-touch-callout:none;  /*系统默认菜单被禁用*/
    -webkit-user-select:none; /*webkit浏览器*/
    -khtml-user-select:none; /*早期浏览器*/
    -moz-user-select:none;/*火狐*/
    -ms-user-select:none; /*IE10*/
    user-select:none;
  }
  .formupload .filecontent .item{
    height: 30px;
    padding: 0 10px 0 20px;
    background-color: #76C8FF;
    color: #FFFFFF;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 5px;
    margin-left: 10px;
    margin-bottom: 8px;
    font-size: 12px;
  }
  .formupload .filecontent .item .updateTxt{
    height: 24px;
    padding-left: 5px;
    border-radius: 5px;
    width: 838px;
    border: none;
    outline: none;
  }
  .formupload .filecontent .item>label{
    text-overflow: ellipsis;
    max-width: 215px;
    overflow:hidden;
    white-space: nowrap;
    cursor: pointer;
  }
  .formupload .filecontent .item:hover{
    background-color: #49a9ea;
    cursor: pointer;
  }
  .formupload .filecontent .hover{
    background-color: #49a9ea;
    cursor: pointer;
  }
  .formupload .filecontent .item:hover>span:after{
    color: #ff8d46;
    background-color: #FFF;
  }

  .formupload .filecontent .item>span{
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .formupload .filecontent .item>span:after{
    font-family: 'icomoon' !important;
    content: "\e904";
    font-size: 18px !important;
    margin-left: 10px;
    color: #FFF;
    border-radius: 50%;
  }
  .formupload .filecontent .item>span:hover:after{
    color: #F00;
    background-color: #FFF;
  }

  .formupload .filecontent .item .image_1:before{
    font-family: 'icomoon' !important;
    content: "\e906";
    font-size: 18px !important;
    margin-right: 10px;
  }

  .formupload .filecontent .item .image:before{
    font-family: 'icomoon' !important;
    content: "\e906";
    font-size: 18px !important;
    margin-right: 10px;
  }
  .formupload .filecontent .item .file_1:before{
    font-family: 'icomoon' !important;
    content: "\e90d";
    font-size: 18px !important;
    margin-right: 10px;
  }
  .formupload .filecontent .item .file:before{
    font-family: 'icomoon' !important;
    content: "\e90d";
    font-size: 18px !important;
    margin-right: 10px;
  }
  .formupload .filecontent .item .image:hover:before{
    color: #00ff08;
  }
  .formupload .filecontent .item .file:hover:before{
    color: #00ff08;
  }
  .formupload .filecontent .hover>span:after{
    color: #ff8d46;
    background-color: #FFF;
  }
  .formupload .filecontent .item:hover>.image:before{
       font-family: 'icomoon' !important;
       content: "\e915";
       font-size: 17px !important;
     }
  .formupload .filecontent .hover>.image:before{
    font-family: 'icomoon' !important;
    content: "\e915";
    font-size: 17px !important;
  }
  .formupload .filecontent .item:hover>.file:before{
    font-family: 'icomoon' !important;
    content: "\e915";
    font-size: 17px !important;
  }
  .formupload .filecontent .hover>.file:before{
    font-family: 'icomoon' !important;
    content: "\e915";
    font-size: 17px !important;
  }
  .formupload .filecontent .progress{
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #49a9ea;
    color: #FFF;
    font-size: 12px;
    height: 30px;
    width: 30px;
    border-radius: 50%;
    margin-bottom: 8px;
    margin-left: 10px;
  }
  .formupload .filecontent .empty{
    font-size: 14px;
    color:#666;
    margin-left: 10px;
    margin-bottom: 8px;
  }
  .formupload .errorBox{
    border: 1px solid #FF0000;
  }
  .formupload .errorBox .empty{
    color:#FF0000;
  }
  .formupload>.error{
    height: 20px;
    line-height: 20px;
    font-size: 12px;
    color: #FF0000;
    text-align: left;
  }
</style>
