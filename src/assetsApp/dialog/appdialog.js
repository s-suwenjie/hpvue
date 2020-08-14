import Vue from "vue"
import keyvalue from '@/assets/keyvalue.js'
import {guid} from '@/assets/common.js'
import appmask from '@/assetsApp/control/appmask/appmask.vue'
import appDialogVue from '@/assetsApp/dialog/appdialog.vue'

const AppDialogConstructor = Vue.extend(appDialogVue)
//承载弹窗的键值对集合
window.appDialogKeyValue = new keyvalue()
//承载遮罩层的键值对集合
window.appDialogMask = new keyvalue()
//承载当前最顶层弹窗的键值对集合
window.appDialogCurrent = new keyvalue()


const appDialog = function (id) {
  this.id = id                //弹框ID
  this.title = ''             //弹框标题
  this.url = ''               //弹框Url
  this.category = 0,          //类型
  this.tipValue = '',         //弹框显示文字
  this.btnOk = "";
  this.alertImg = ''
  this.btnCancel = ""
  this.closeCallBack = null   //弹框关闭回调函数
  this.okCallBack = null;
  this.cancelCallBack = null;
}

appDialog.prototype.showWindow = function() {
  let instance = new AppDialogConstructor().$mount()
  instance.id = this.id
  instance.url = this.url
  instance.title = this.title
  instance.zIndex = 99999991;
  instance.alertImg = this.alertImg;
  instance.tipValue = this.tipValue;
  instance.category = this.category;
  instance.btnOk = this.btnOk;
  instance.btnCancel = this.btnCancel;
  instance.closeCallBack = this.closeCallBack;
  instance.okCallBack = this.okCallBack;
  instance.cancelCallBack = this.cancelCallBack;

  if(window.top.appDialogKeyValue.size() === 0){
    const AppMaskConstructor = Vue.extend(appmask)
    let appMaskInstance = new AppMaskConstructor().$mount()
    window.top.appDialogMask.set("mask",appMaskInstance)
    window.top.document.getElementById("app").appendChild(appMaskInstance.$el)
    window.top.document.body.style.overflow = "hidden"
  }
  else{
    let count = window.top.appDialogKeyValue.size()
    for (let i = 0;i < count; i++){
      let predecessor = window.top.appDialogKeyValue.get(window.top.appDialogKeyValue.keys[i]);
      predecessor.zIndex = predecessor.zIndex - 2;
    }
  }
  window.top.document.getElementById("app").appendChild(instance.$el)
  window.top.appDialogKeyValue.set(this.id,instance)
  window.top.appDialogCurrent.set("current",instance)
}

appDialog.close = function(){
  let currentInstance = window.top.appDialogCurrent.get("current");

  const el = currentInstance.$el;
  window.top.appDialogKeyValue.remove(currentInstance.id);
  let maskInstance = window.top.appDialogMask.get("mask")
  let time = 0
  if(currentInstance.hide){
    maskInstance.hide = true
    time = 500
  }
  setTimeout(() => {
    maskInstance.hide = false
    if (window.top.appDialogKeyValue.size() === 0) {
      const maskEl = maskInstance.$el;
      maskEl.parentNode && maskEl.parentNode.removeChild(maskEl);
      window.top.document.body.style.overflow = "auto";
    } else {
      let count = window.top.appDialogKeyValue.size();
      for (let i = 0; i < count; i++) {
        let predecessor = window.top.appDialogKeyValue.get(window.top.appDialogKeyValue.keys[i]);
        predecessor.zIndex = predecessor.zIndex + 2;
        if (i === count - 1) {
          window.top.appDialogCurrent.set("current", predecessor);
        }
      }
    }
    el.parentNode && el.parentNode.removeChild(el)
    if (currentInstance.closeCallBack) {
      if (currentInstance.returnValue) {
        currentInstance.closeCallBack(currentInstance.returnValue);
      } else {
        currentInstance.closeCallBack();
      }
    }
  },time)
  return currentInstance;
}

appDialog.setReturnValue = function(value) {
  let currentInstance = window.top.appDialogCurrent.get("current");
  currentInstance.returnValue = value;
}

appDialog.setAaa = function(val,position){
  let currentInstance = window.top.appDialogCurrent.get("current");
  currentInstance.top = val
  currentInstance.position = position
}

appDialog.openWindow = function(options){
  let id = guid() + new Date().getTime()
  let dialog = new appDialog(id)
  dialog.title = options.title ? options.title : '我是标题'
  dialog.url = options.url
  dialog.closeCallBack = options.closeCallBack
  dialog.category = 1
  dialog.showWindow()
}

appDialog.confirm = function(options){
  let id = guid() + new Date().getTime()
  let dialog = new appDialog(id)
  dialog.category = 2
  dialog.tipValue = options && options.tipValue|| "系统提示"
  dialog.btnOk = options && options.btnValueOk || "确定"
  dialog.btnCancel = options && options.btnValueCancel || "取消"
  dialog.okCallBack = options && options.okCallBack
  dialog.cancelCallBack = options && options.cancelCallBack
  dialog.showWindow()
}

appDialog.refresh = function() {
  let currentInstance = window.top.appDialogCurrent.get("current")
  let url = currentInstance.url
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

appDialog.toast = function(options){
  let id = guid() + new Date().getTime()
  let dialog = new appDialog(id)
  dialog.category = 3
  dialog.tipValue = options && options.tipValue|| "系统提示"
  dialog.alertImg = options && options.alertImg || "ok"
  dialog.closeCallBack = options.closeCallBack
  dialog.showWindow()

  setTimeout(() => {
    appDialog.setHide()
    setTimeout(() =>{
      appDialog.close()
    },300)
  },1500)
}

appDialog.setHide = function(){
  let currentInstance = window.top.appDialogCurrent.get("current")
  currentInstance.hide = true
}

AppDialogConstructor.prototype.close = function(){
  appDialog.close();
}

AppDialogConstructor.prototype.refresh = function(){
  appDialog.refresh();
}

AppDialogConstructor.prototype.okEvent = function(){
  let currentInstance = appDialog.close();
  if(currentInstance.okCallBack){
    currentInstance.okCallBack();
  }
}

AppDialogConstructor.prototype.cancelEvent = function(){
  let currentInstance = appDialog.close();
  if(currentInstance.cancelCallBack){
    currentInstance.cancelCallBack();
  }
}


export default {
  install (Vue, options) {
    Vue.prototype.$appDialog = appDialog
  }
}
