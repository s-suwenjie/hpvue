import Vue from "vue";
import keyvalue from '@/assets/keyvalue.js'
Vue.prototype.$dialogKeyValue = keyvalue
import {guid} from '@/assets/common.js'
import dialogVue from './dialog.vue'
import maskVue from './mask.vue'
const DialogConstructor = Vue.extend(dialogVue)
window.dialogKeyValue = new keyvalue();
window.dialogMask = new keyvalue();
window.dialogCurrent = new keyvalue();
const Dialog = function (id) {
  //弹窗的唯一ID
  this.id = id;
  this.title = "";
  //对话框的宽度
  this.width = 400;
  //对话框的高度
  this.height = 300;

  //显示表头
  this.isHead = true;
  //是否自动关闭。如果是true弹出窗口上没有关闭按钮
  this.isAutoClose = false;
  //是否有刷新按钮
  this.isRefresh = false;
  //弹窗类型（0表示URL,1表示静态内容）
  this.category = 0;
  //弹窗中要显示的URL地址
  this.url = "";
  this.tipValue = "";
  this.alertImg = "",
    this.btnOk = "";
  this.btnCancel = "";
  this.closeCallBack = null;
  this.okCallBack = null;
  this.cancelCallBack = null;

  this.previewArr = [];
  this.previewIndex = 0
}

Dialog.confirm = function (options) {
  var id = guid() + new Date().getTime();
  var dialog = new Dialog(id);
  dialog.title = "系统提示";
  dialog.width = options && options.width || 250;
  dialog.height = 160;
  dialog.tipValue = options && options.tipValue|| "系统提示";
  dialog.btnOk = options && options.btnValueOk || "确定";
  dialog.btnCancel = options && options.btnValueCancel || "取消";
  dialog.okCallBack = options && options.okCallBack;
  dialog.cancelCallBack = options && options.cancelCallBack;
  dialog.closeCallBack = options && options.closeCallBack;
  dialog.alertImg = "ask";
  dialog.isHead = true;
  dialog.isAutoClose = false;
  dialog.isRefresh = false;
  dialog.category = 2;
  dialog.flickerIndex = options && options.flickerIndex
  dialog.showWindow();
}

Dialog.prototype.showWindow = function(){
  var instance = new DialogConstructor().$mount();
  instance.id = this.id;
  instance.title = this.title;
  instance.width = this.width;
  instance.height = this.height;
  instance.marginLeft = this.width / -2;
  instance.marginTop = this.height / -2;
  instance.isHead = this.isHead;
  instance.isAutoClose = this.isAutoClose;
  instance.isRefresh = this.isRefresh;
  instance.category = this.category;
  instance.url = this.url;
  instance.tipValue = this.tipValue;
  instance.btnOk = this.btnOk;
  instance.btnCancel = this.btnCancel;
  instance.zIndex = 99999991;
  instance.closeCallBack = this.closeCallBack;
  instance.okCallBack = this.okCallBack;
  instance.cancelCallBack = this.cancelCallBack;
  instance.alertImg = this.alertImg;
  instance.isShow = true;
  instance.flickerIndex = this.flickerIndex;
  instance.previewArr = this.previewArr;
  instance.previewIndex = this.previewIndex;
  if(window.top.dialogKeyValue.size() == 0){
    const MaskConstructor = Vue.extend(maskVue)
    var maskInstance = new MaskConstructor().$mount();
    window.top.dialogMask.set("mask",maskInstance);
    window.top.document.getElementById("app").appendChild(maskInstance.$el);
    window.top.document.body.style.overflow = "hidden";
  }
  else{
    var count = window.top.dialogKeyValue.size();
    for (var i = 0;i < count; i++){
      var predecessor = window.top.dialogKeyValue.get(window.top.dialogKeyValue.keys[i]);
      predecessor.zIndex = predecessor.zIndex - 2;
    }
  }
  window.top.document.getElementById("app").appendChild(instance.$el)
  this.escClose();
  var key = this.id
  window.top.dialogKeyValue.set(key,instance);
  window.top.dialogCurrent.set("current",instance);
}

DialogConstructor.prototype.close = function(){
  Dialog.close();
}

DialogConstructor.prototype.refresh = function(){
  Dialog.refresh();
}

DialogConstructor.prototype.okEvent = function(){
  var currentInstance = Dialog.close();
  if(currentInstance.okCallBack){
    currentInstance.okCallBack();
  }
}

DialogConstructor.prototype.cancelEvent = function(){
  var currentInstance = Dialog.close();
  if(currentInstance.cancelCallBack){
    currentInstance.cancelCallBack();
  }
}


DialogConstructor.prototype.dialogmousedown = function(event){
  var currentInstance = window.top.dialogCurrent.get("current");
  currentInstance.isShow = false;
  currentInstance.pointX = event.x
  currentInstance.pointY = event.y
}

DialogConstructor.prototype.dialogmouseup = function(){
  var currentInstance = window.top.dialogCurrent.get("current");
  currentInstance.isShow = true;
}

DialogConstructor.prototype.dialogmouseout = function(){
  var currentInstance = window.top.dialogCurrent.get("current");
  currentInstance.isShow = true;
}

DialogConstructor.prototype.dialogmousemove = function(event){
  var currentInstance = window.top.dialogCurrent.get("current");
  var x = currentInstance.pointX;
  var y = currentInstance.pointY;
  var differenceX = x - event.x;
  var differenceY = y - event.y;
  currentInstance.marginLeft = currentInstance.marginLeft - differenceX;
  currentInstance.marginTop = currentInstance.marginTop - differenceY;
  currentInstance.pointX = event.x
  currentInstance.pointY = event.y
}

Dialog.prototype.escClose = function(){
  document.onkeydown = function(e) {
    let key = window.event.keyCode;
    if(key == 27){
      var currentInstance = window.top.dialogCurrent.get("current");
      if(!currentInstance.isAutoClose){
        Dialog.close();
      }
    }
  }
}


Dialog.getCount = function(){
  return window.top.dialogKeyValue.size();
}
Dialog.refresh = function(){
  var currentInstance = window.top.dialogCurrent.get("current");
  var url = currentInstance.url;
  let index = url.indexOf('times')
  if(index !== -1){
    url = url.substring(0,index - 1)
  }
  if(url.indexOf("?") == -1){
    url += "?times=" + new Date().getTime()
  }
  else{
    url += "&times=" + new Date().getTime()
  }
  currentInstance.url = url
}

Dialog.close = function(){
  var currentInstance = window.top.dialogCurrent.get("current");
  const el = currentInstance.$el;
  window.top.dialogKeyValue.remove(currentInstance.id);
  if(window.top.dialogKeyValue.size() == 0){
    var maskInstance = window.top.dialogMask.get("mask")
    const maskEl = maskInstance.$el;
    maskEl.parentNode && maskEl.parentNode.removeChild(maskEl);
    window.top.document.body.style.overflow = "auto";
  }
  else{
    var count = window.top.dialogKeyValue.size();
    for (var i = 0;i < count; i++){
      var predecessor = window.top.dialogKeyValue.get(window.top.dialogKeyValue.keys[i]);
      predecessor.zIndex = predecessor.zIndex + 2;
      if(i == count - 1){
        window.top.dialogCurrent.set("current",predecessor);
      }
    }
  }
  el.parentNode && el.parentNode.removeChild(el)
  if(currentInstance.closeCallBack){
    if(currentInstance.returnValue){
      currentInstance.closeCallBack(currentInstance.returnValue);
    }
    else{
      currentInstance.closeCallBack();
    }
  }
  return currentInstance;
}

Dialog.setReturnValue = function(value){
  var currentInstance = window.top.dialogCurrent.get("current");
  currentInstance.returnValue = value;
}

Dialog.OpenWindow = function (options) {
  var id = guid() + new Date().getTime();
  var dialog = new Dialog(id);
  dialog.title = options.title ? options.title : "系统提示";
  dialog.width = options.width ? options.width : 400;
  dialog.height = options.height ? options.height : 400;
  dialog.isAutoClose = false;
  dialog.isRefresh = true;
  dialog.category = 0;
  dialog.url = options.url;
  dialog.closeCallBack = options.closeCallBack;
  dialog.showWindow();
}

Dialog.openLoading = function (options) {
  var id = guid() + new Date().getTime();
  var dialog = new Dialog(id);
  dialog.width = options && options.width || 240;
  dialog.height = 70;
  dialog.tipValue = options && options.tipValue|| "数据请求中......";
  dialog.isHead = false;
  dialog.isAutoClose = true;
  dialog.isRefresh = false;
  dialog.category = 1;
  dialog.showWindow();
}

Dialog.alert = function (options) {
  var id = guid() + new Date().getTime();
  var dialog = new Dialog(id);
  dialog.title = "系统提示";
  dialog.width = options && options.width || 250;
  dialog.height = 160;
  dialog.tipValue = options && options.tipValue|| "系统提示";
  dialog.btnOk = options && options.btnValue || "确定";
  dialog.closeCallBack = options && options.closeCallBack;
  dialog.alertImg = options && options.alertImg || "ok";
  dialog.isHead = true;
  dialog.isAutoClose = false;
  dialog.isRefresh = false;
  dialog.category = 2;
  dialog.showWindow();
}

Dialog.preview = function (arr,index) {
  var id = guid() + new Date().getTime();
  var dialog = new Dialog(id);
  dialog.title = "图片预览";
  dialog.width = window.top.innerWidth
  dialog.height = window.top.innerHeight
  dialog.category = 3;
  dialog.previewArr = arr;
  dialog.previewIndex = index;
  dialog.showWindow();
}

export default {
  install (Vue, options) {
      Vue.prototype.$dialog = Dialog
  }
}
