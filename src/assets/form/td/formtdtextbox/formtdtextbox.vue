<template>
    <td v-show="show" class="fd_in_txt" :style="getWidth">
      <yhm-text :show="show" @change="changeEvent" :input-red-show="inputRedShow" @focus="focusEvent" @input="inputEvent" @copyIconClick="copyIconClick" :copy-show="copyShow" :tip-left="tipLeft" :tip-arrow-left="tipArrowLeft" :width="getTxtWidth" @blur="blurEvent" :beforeIcon="beforeIcon" :afterIcon="afterIcon" :tip="tip" :noEdit="noEdit" :value="txt" :id="txtKey" :rule="rule" category="m" :maxNumber="maxNumber" :minNumber="minNumber"></yhm-text>
    </td>
</template>

<script>
  import {accAdd} from '@/assets/common.js'
  export default {
    name: "yhm-form-td-textbox",
    data(){
      return{
        txt:this.value[this.id],
        txtKey:this.listid + '[' + this.list.indexOf(this.value) + '].' + this.id
      }
    },
    props: {
      inputRedShow:{//这个是开启负数变红的
        type:Boolean,
        default: false
      },
      copyShow:{
        type:Boolean,
        default: false
      },
      tipLeft:{
        type: String,
        default:""
      },
      tipArrowLeft:{
        type: String,
        default:""
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
      value: {
        type: Object,
        required: true
      },
      rule: {
        type: String,
        default: ''
      },
      beforeIcon: {
        type: String,
        default: ""
      },
      afterIcon: {
        type: String,
        default: ""
      },
      tip: {
        type: String,
        default: ""
      },
      noEdit: {
        type: String,
        default: ""
      },
      show: {
        type: Boolean,
        default: true
      },
      maxNumber:{
        //type:Number,
        default:''
      },
      minNumber:{
        //type:Number,
        default:''
      }

    },
    methods:{
      copyIconClick(){
        this.$nextTick(() =>{
          this.$emit("copyIconClick")
        })
      },
      //文本框失去焦点
      blurEvent(){
        this.$nextTick(() =>{
          this.$emit("blur")
        })
      },
      focusEvent(){
        this.$nextTick(() =>{
          this.$emit("focus")
        })
      },
      changeEvent(){
        this.$nextTick(() =>{
          this.$emit("change")
        })
      },
      inputEvent(){
        this.$nextTick(() =>{
          this.$emit("input")
        })
      }
    },
    computed:{
      getWidth(){
        if(this.width !== '') {
          return 'width:' + accAdd(this.width,-6) + 'px !important;'
        }
        else{
          return ''
        }
      },
      getTxtWidth(){
        if(this.width !== '') {
          return accAdd(this.width,-6) + ''
        }
        else{
          return ''
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
