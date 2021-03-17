import request from 'axios'
import qs from "qs";
import {accMul,accAdd} from '@/assets/common.js'
import { isLogin } from '@/assetsApp/app_login.js'
const requestInstance = request.create();

var that = null;
var loading = "1"
const AjaxJson = function (options) {
  that = this;
  var ajaxRequest = new AjaxRequest(options)
  if(ajaxRequest.init(options)){
    ajaxRequest.request()
  }
}

const AjaxJsonMobile = function (options) {
  that = this;
  var ajaxRequest = new AjaxRequest(options)
  if(ajaxRequest.init(options)){
    loading = "0"
    ajaxRequest.requestMobile()
  }
}

const AjaxAsync = async function (options) {
  let res;
  that = this;
  var ajaxRequest = new AjaxRequest(options)
  if(ajaxRequest.init(options)){
    res = await ajaxRequest.requestAsync()
  }
  console.log(res)
  return res;
}

const AjaxUpload = function (options) {
  that = this;
  options.url = "/Com/commonUploadFile"
  var ajaxRequest = new AjaxRequest(options)
  if(ajaxRequest.init(options)){
    loading = "0"
    ajaxRequest.upload()
  }
}

const AjaxRequest = function(options){
  this.url = ""
  this.data = ""
  this.category = "0"
  this.successCall = null
  this.errorCall = null
  this.progressCall = null
}

AjaxRequest.prototype.init = function(options){
  //请求的地址
  this.url = options && options.url || ""
  if(this.url == ""){
    that.$dialog.alert({
      tipValue:"请求的地址不能为空",
      alertImg:"error"
    })
    return false
  }
  //提交的数据
  this.data = options && options.data || {}
  this.category = options && options.category || "0"
  loading = options && options.loading || "1"
  this.successCall = options && options.call || null;
  this.errorCall = options && options.errorCall || null;
  this.progressCall = options && options.progressCall || null;
  return true;
}
requestInstance.interceptors.request.use(function (config) {
  if(loading === "1"){
    that.$dialog.openLoading()
  }
  return config;
},function (error) {
  return false
})

requestInstance.interceptors.response.use(function (response) {
  if(loading === "1"){
    that.$dialog.close()
  }
  if(response.status === 200){
      return response.data;
  }
  else{
    that.$dialog.alert({
      tipValue:"数据返回失败",
      alertImg:"error"
    })
  }
},function (error) {
})

AjaxRequest.prototype.requestMobile = function () {
  var ajaxRequest = this
  requestInstance.post(this.url,this.data).then(function (data) {
    if(data.type === 9){
      //处理登录问题
      window.location
    }
    else {
      if (ajaxRequest.successCall) {
        ajaxRequest.successCall(data)
      }
    }
  }).catch(function (data) {
    that.$appDialog.toast({
      tipValue:data,
      alertImg:"error"
    })
  })
}

AjaxRequest.prototype.request = function () {
  var ajaxRequest = this;
  if(this.category === "1"){
    this.data = qs.stringify(this.data)
  }
  requestInstance.post(this.url,this.data).then(function (data) {
    if(data.type === 9){
      //没有获取到session
      window.location = '/login'
    }
    else if(data.type === 8){
      //Sql异常
      let width = accAdd(200, accMul(data.message.length,13));
      that.$dialog.alert({
        tipValue: data.message,
        alertImg: "error",
        width: width,
        closeCallBack:() => {
          if(ajaxRequest.errorCall){
            ajaxRequest.errorCall()
          }
        }
      })

    }
    else if(data.type === 7){
      //重复异常
      let width = accAdd(200, accMul(data.message.length,13));
      that.$dialog.alert({
        tipValue: data.message,
        alertImg: "error",
        width: width,
        closeCallBack:()=>{
          that.autoVerify(data.controlID,data.message)
          if(ajaxRequest.errorCall){
            ajaxRequest.errorCall()
          }
        }
      })
    }
    else if(data.type === 6){
      //验证异常
      let width = accAdd(200, accMul(data.message.length,13));
      that.$dialog.alert({
        tipValue: data.message,
        alertImg: "error",
        width: width,
        closeCallBack:() => {
          if(ajaxRequest.errorCall){
            ajaxRequest.errorCall()
          }
        }
      })
    }
    else if(data.type === 5){
      //继承异常
      let width = accAdd(200, accMul(data.message.length,13));
      that.$dialog.alert({
        tipValue: data.message,
        alertImg: "error",
        width: width,
        closeCallBack:() => {
          if(ajaxRequest.errorCall){
            ajaxRequest.errorCall()
          }
        }
      })
    }
    else {
      if (ajaxRequest.successCall) {
        ajaxRequest.successCall(data)
      }
    }
  }).catch(function (data) {
    that.$dialog.close()
    if(ajaxRequest.errorCall){
      ajaxRequest.errorCall()
    }
    else {
      let width = accMul(data.toString().length,10);
      that.$dialog.alert({
        tipValue: data,
        alertImg: "error",
        width: width
      })
    }
  })
}

AjaxRequest.prototype.requestAsync = async function(){
  let res =  await requestInstance.post(this.url,this.data)
  return res;
}

AjaxRequest.prototype.upload = function () {
  var ajaxRequest = this;
  var key = ajaxRequest.data.get("key")
  var image = ajaxRequest.data.get("image")
  ajaxRequest.data.delete("key")
  requestInstance({
    method: 'post',
    url:ajaxRequest.url,
    data:ajaxRequest.data,
    headers: { 'Content-Type': 'multipart/form-data' },
    onUploadProgress(progressEvent){
      if (progressEvent.lengthComputable) {
        let val = (progressEvent.loaded / progressEvent.total * 100).toFixed(0);
        if(ajaxRequest.progressCall){
          ajaxRequest.progressCall(parseInt(val),key)
        }
      }
    }
  }).then(function (data) {
    if(ajaxRequest.successCall){
      if(data.type === 0) {
        ajaxRequest.successCall(data,image,key)
      }
    }
  }).catch(function (data) {
    let width = accMul(data.toString().length, 10);
    that.$dialog.close()
    that.$dialog.alert({
      tipValue: data,
      alertImg: "error",
      width: width
    })
  })
}

export default {
  install (Vue, options) {
    Vue.prototype.ajaxJson = AjaxJson
    Vue.prototype.ajaxJsonMobile = AjaxJsonMobile
    Vue.prototype.ajaxAsync = AjaxAsync
    Vue.prototype.ajaxUpload = AjaxUpload
  }
}
