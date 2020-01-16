<template>
  <div v-if="show" class="fc_main">
    <div class="fc_box">
      <div class="fc_title">
        <div>{{title}}</div>
        <div v-if="subtitle !== ''">{{subtitle}}</div>
      </div>
      <div class="c_main">
        <div class="c_box c_textarea">
          <div></div>
          <span class="c_icon i-input-right-arrow" :class="{rotate180:focusStyle}"></span>
        </div>
      </div>
    </div>
    <div class="fc_error"><span v-if="error">{{errorTipMessage}}</span></div>
  </div>
</template>

<script>
  import {verify,tenThousandFormat,number2chinese} from '@/assets/common.js'
  export default {
    name: 'yhm-form-zh-purview',
    inject: ['p____page'],
    data () {
      return {
        focusStyle: false,
        mouseStyle: false,
        mouseOver: false,
        error: false,
        errorTipMessage: ''
      }
    },
    props: {
      title: {
        type: String,
        default: '权限分享'
      },
      subtitle: {
        type: String,
        default: ''
      },
      show: {
        type: Boolean,
        default: true
      }
    }
  }
</script>

<style scoped>
  *{
    box-sizing: border-box;
  }
</style>
