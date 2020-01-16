<template>
  <div class="disable_menu app_fixed" :style="{zIndex:zIndex,top:top+'px',position:position}">
    <div v-if="category === 3" class="app_center">
      <div class="a_dialog_toast" :class="{a_dialog_toast_hide:hide}">
        <div class="a_dialog_toast_main">
          <div v-if="alertImg === 'error'" class="a_dialog_toast_main_i error btnDel"></div>
          <div v-if="alertImg === 'ok'" class="a_dialog_toast_main_i ok i-complete"></div>
          <div v-if="alertImg === 'warn'" class="a_dialog_toast_main_i warn i-warn"></div>
          <div class="a_dialog_toast_main_content" :class="alertImg" v-html="tipValue"></div>
        </div>
      </div>
    </div>
    <div v-if="category === 2" class="a_dialog_confirm">
      <div class="a_dialog_confirm_content" v-html="tipValue"></div>
      <div class="a_dialog_confirm_operate">
        <yhm-app-dialog-button @call="cancelEvent" :value="btnCancel"></yhm-app-dialog-button>
        <yhm-app-dialog-button @call="okEvent" :value="btnOk" class="primary"></yhm-app-dialog-button>
      </div>
    </div>
    <div v-if="category === 1" class="a_dialog_url_main">
      <div class="a_dialog_head">
        <div class="btn" @touchend="close">
          <span class="i-btn-del"></span>
        </div>
        <div class="title">{{title}}</div>
        <div class="btn" @touchend="refresh">
          <span class="i-btn-refresh"></span>
        </div>
      </div>
      <div class="a_dialog_url">
        <iframe :src="url" style="width:100%; height:100%;"  frameborder="0" tabindex="1"></iframe>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'yhm-app-dialog',
    props:{
      top:{
        type:String,
        default:'0'
      },
      position:{
        type:String,
        default:'fixed'
      },
      hide:{
        type:Boolean,
        default:false
      },
      tipValue:{
        type:String,
        default:''
      },
      id:{
        type:String,
        default:''
      },
      url:{
        type:String,
        default:''
      },
      title:{
        type:String,
        default:''
      },
      category:{
        type:Number,
        default:0
      },
      zIndex:{
        type:Number,
        default:99999991
      },
      btnOk:{
        type:String,
        default:'确定'
      },
      btnCancel:{
        type:String,
        default:'取消'
      },
      alertImg:{
        type:String,
        default:'ok'
      },
      returnValue:Object,
      closeCallBack:{
        type:Function
      },
    }
  }
</script>

<style scoped>

</style>
