<template>
  <td class="fd_in_txt fd_center" :style="getTxtWidth" v-validator="validatorEvent">
    <div @mouseoutEvent="mouseoutEvent" @mouseoverEvent="mouseoverEvent">
    <yhm-upload @mouseoutEvent="mouseoutEvent" @mouseoverEvent="mouseoverEvent" :no-upload="noUpload" @call="callEvent" @progressCall="progressCallEvent" :width="getWidth" height="24" :accept="accept" :tag="tag">
      <template>
        <div v-show="getUploadShow" :style="getTxtWidth" class="fd_center c_content_m c_box icon-btn-upload" :class="{c_focus:mouseOver,c_error:error}">
          {{accept==' '?'上传图片或文件':'上传图片'}}
        </div>
        <div v-show="showSchedule" :style="getTxtWidth" class="fd_center c_content_m c_box">
          {{schedule}}%
        </div>
        <div v-show="getContentEmpty" :style="getTxtWidth" class="fd_center c_content_m c_box" :class="{c_focus:mouseOver,c_error:error,c_disable:noUpload,mt_button_disabled:noUpload}">
          <span class="i-btn-upload mr5"></span>|<span class="i-btn-image ml5 fs15"></span>
        </div>
      </template>
    </yhm-upload>
    </div>
  </td>
</template>

<script>
  import {accAdd} from '@/assets/common.js'
  export default {
    name: 'yhm-form-td-upload-image',
    inject: ["p____page"],
    data(){
      return{
        mouseOver:false,
        txt:this.value[this.id],
        txtKey: this.listid + '[' + this.list.indexOf(this.value) + '].' + this.id,
        showSchedule:false,
        schedule:'',
        error:false
      }
    },
    props: {
      tag: {
        type: String,
        default: 'temp'
      },
      accept:{
        type: String,
        default: 'image/*'
      },
      width:{
        type: String,
        required: true
      },
      list: {
        type: Array,
        required: true
      },
      listid: {
        type: String,
        required: true
      },
      id: {
        type: String,
        required: true
      },
      rule: {
        type: String,
        default: ''
      },
      noUpload:{
        type:Boolean,
        default:false
      },
      value: {
        type: Object,
        required: true
      }
    },
    methods:{
      //初始化验证事件
      validatorEvent(category) {
        if (this.rule !== "") {
          var id = this.txtKey;
          id = id.replace(".", "_")
          if (category === "bind") {
            if (this.p____page.p____rule.indexOf(id) === -1) {
              this.p____page.p____rule.push(id)
              this.p____page.p____rule[id] = this
            }
          } else if (category === "unbind") {
            let index = this.p____page.p____rule.indexOf(id)
            if (index !== -1) {
              this.p____page.p____rule.splice(index, 1)
              this.p____page.p____rule[id] = null
            }
          }
        }
      },
      progressCallEvent(data,key){
        this.showSchedule = true
        this.schedule = data
      },
      callEvent(data){
        this.showSchedule = false
        if(data.image === '1'){
          let storeName = data.storeName
          this.txt = storeName
          let js = "this.p____page." + this.listid + "[" + this.list.indexOf(this.value) + '].' + this.id + " = \"" + storeName +"\""
          eval(js);
          this.$dialog.OpenWindow({
            width: 1050,
            height: 640,
            url:'/handleImageForm?tag=' + data.tag + '&path='+data.storeName,
            title:'预览图片',
            closeCallBack:() => {

            }
          })

        }
        else{
          if(this.accept!= ' '){
            this.$dialog.alert({
              tipValue:'请上传图片',
              alertImg:'error'
            })
          }else{
            let storeName = data.storeName
            this.txt = storeName
            let js = "this.p____page." + this.listid + "[" + this.list.indexOf(this.value) + '].' + this.id + " = \"" + storeName +"\""
            eval(js);
          }

        }
        //this.$emit("call",data)
      },
      //鼠标放上事件
      mouseoverEvent(){
        this.error = false
        this.mouseOver = true
        this.$emit("mouseover",this.value)
      },
      //鼠标移出事件
      mouseoutEvent(){
        this.mouseOver = false
        this.$emit("mouseout",this.value)
      },
      verification() {
        var result = true;
        if(this.rule === "#"){
          if (this.txt === '') {
            result = false
          }
        }
        this.error = !result
        return result
      }
    },
    computed: {
      getWidth () {
        if (this.width !== '') {
          return accAdd(this.width,-6) + ''
        } else {
          return ''
        }
      },
      getTxtWidth(){
        if(this.width !== '') {
          return 'width:' + accAdd(this.width,-6) + 'px !important;'
        }
        else{
          return ''
        }
      },
      getUploadShow(){
        if(this.showSchedule){
          return false
        }
        else {
          return this.txt === ''
        }
      },
      getContentEmpty(){
        if(this.showSchedule){
          return false
        }
        else {
          return this.txt !== ''
        }
      }
    },
    watch:{
      value:{
        handler(newValue, oldValue) {
          this.txt = newValue[this.id]
        },
        deep: true
      }
    }
  }
</script>

<style scoped>

</style>
