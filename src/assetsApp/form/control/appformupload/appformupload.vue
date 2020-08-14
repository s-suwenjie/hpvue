<template>
  <div class="afc_main" v-validator="validatorEvent">
    <!--上传按钮-->
    <div class="afc_upload">
      <yhm-app-upload @change="selectFileEvent" :multiple="multiple">
        <yhm-app-button category="two" :value="title" icon="i-btn-upload"></yhm-app-button>
      </yhm-app-upload>
    </div>
    <!--上传文件展示-->
    <div class="aml16 amr16">
      <template v-for="item in value">
        <yhm-app-upload-detail :content="value" :item="item" :key="item.id"></yhm-app-upload-detail>
      </template>
    </div>
    <!--上传进度展示-->
    <div class="aml16">
      <template v-for="item in uploadingFileKeys">
        <div v-if="getShowProgressRates(item)" :key="item" class="ac_rate">{{getProgressRates(item)}}%</div>
      </template>
    </div>
    <!--为空显示-->
    <div v-show="getEmptyShow" class="ac_main amt4">
      <div class="ac_box ac_box_show" :class="{ac_error:error}">
        <input type="text" readonly="readonly" v-model="emptyMessageContent">
      </div>
    </div>
    <!--错误显示-->
    <div class="afc_error"><span v-if="error">{{errorTipMessage}}</span></div>
  </div>
</template>

<script>
  import {guid,accAdd,accMul,formatTime} from '@/assets/common.js'
  import { formcontrolmixin } from '@/assetsApp/form/control/formcontrol.js'
  export default {
    name: 'yhm-app-form-upload',
    mixins: [formcontrolmixin],
    data(){
      return {
        uploadingFileKeys:[],
        uploadingFileFinishKeys:[],
        uploadingFileProgressRates:[],
      }
    },
    props:{
      title:{
        type:String,
        default:"上传文件"
      },
      emptyMessageContent : {
        type:String,
        default:'暂时没有数据'
      },
      emptyMessage: {
        type: String,
        default: '不能为空'
      },
      multiple:{
        type:Boolean,
        default:true
      },
      ownerId:{
        type:String,
        required: true
      },
      value:{
        type:Array,
        required: true
      },
      id:{
        type:String,
        required: true
      },
      tag:{
        type:String,
        default:"temp"
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
    methods : {
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
      verification(){
        let result = true;
        if(this.show && this.rule === "#") {
          result = this.value.length !== 0
        }
        //初始化错误信息
        if(!result){
          this.errorTipMessage = this.title + this.emptyMessage
        }
        this.error = !result
        return result;
      },
      selectFileEvent(e){
        this.uploadBefore(e.currentTarget.files)
      },
      //根据Key修改上传进度
      updateProgressRates(key,val){
        this.uploadingFileProgressRates[key] = val
        this.uploadingFileKeys.splice(0,0)
      },
      uploadBefore(files){
        if(files.length > 0){
          for (let i = 0; i < files.length; i++){
            let image = 0
            if(files[i].type.indexOf('image') !== -1){
              image = 1
            }
            let key = guid()
            this.uploadingFileKeys.push(key)
            this.uploadingFileProgressRates[key] = 0

            let fd = new FormData()
            fd.append("myfile",files[i])
            fd.append("tag", this.tag)
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
            })
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
      }
    },
    computed:{
      getEmptyShow(){
        return this.value.length === 0
      },
      getShowProgressRates(){
        return function(key) {
          return this.uploadingFileFinishKeys.indexOf(key) === -1
        }
      },
      getProgressRates(){
        return function (key) {
          return this.uploadingFileProgressRates[key]
        }
      }
    }
  }
</script>

<style scoped>

</style>
