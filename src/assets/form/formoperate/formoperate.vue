<template>
  <div class="f_operate">

    <div v-show="isNotShowOperate" class="btn" :style="{margin:'0'}" style="position: relative">
      <div v-show="titleShow" style="position: absolute;margin: 0;" :style="{'left':titleLeft+'px'}">
        <slot name="titleLeft"></slot>
      </div>
      <slot name="btn"></slot>
      <div v-show="titleShow" style="position: absolute;margin: 0;" :style="{'left':titleRight+'px'}">
        <slot name="titleRight"></slot>
      </div>
    </div>
    <div class="info" v-if="!noTimeTip">
      <div>
        <p>首次添加：<span>{{createName}}</span></p>
        <p>时间：<span>{{insertDate}}</span></p>
      </div>
      <div>
        <p>最后修改：<span>{{updateName}}</span></p>
        <p>时间：<span>{{updateDate}}</span></p>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'yhm-formoperate',
    props:{
      isNotShowOperate:{
        type:Boolean,
        default:true
      },
      titleShow:{
        type:Boolean,
        default:false
      },
      titleLeft:{
        type:String,
        default:'80'
      },
      titleRight:{
        type:String,
        default:'700'
      },
      createName:{
        type:String,
        default:""
      },
      insertDate:{
        type:String,
        default:"当前时间"
      },
      updateName:{
        type:String,
        default:""
      },
      updateDate:{
        type:String,
        default:"当前时间"
      },
      noTimeTip: {
        type: Boolean,
        default: false
      }
    }
  }
</script>

<style scoped>

</style>
