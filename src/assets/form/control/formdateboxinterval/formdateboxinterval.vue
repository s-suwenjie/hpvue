<template>
  <div v-if="show" class="fc_main">
    <div class="fc_box">
      <div class="fc_title">
        <div>{{title}}</div>
        <div v-if="subtitle !== ''">{{subtitle}}</div>
      </div>
      <yhm-date-interval ref="control" @call="callEvent" @formVerification="verificationEvent" :title="title" :subtitle="subtitle" :type="type" :category="category" :startId="startId" :start="start" :endId="endId" :end="end" :max="max" :min="min" :noEdit="noEdit" :rule="rule" :emptyMessage="emptyMessage" :position="position"></yhm-date-interval>
    </div>
    <div class="fc_error"><span v-if="error">{{errorTipMessage}}</span></div>
  </div>
</template>

<script>
  export default {
    name: "yhm-form-date-interval",
    inject: ['p____page'],
    data () {
      return {
        error: false,
        errorTipMessage: this.emptyMessage
      }
    },
    props: {
      title: {
        type: String,
        default: '标题'
      },
      subtitle: {
        type: String,
        default: ''
      },
      type:{
        type:String,
        default:'date'
      },
      width:{
        type: String,
        default:""
      },
      category:{
        type:String,
        default:""
      },
      startId:{
        type:String,
        required:true
      },
      start:{
        type:String,
        required:true
      },
      endId:{
        type:String,
        required:true
      },
      end:{
        type:String,
        required:true
      },
      max:{
        type:String,
        default:""
      },
      min:{
        type:String,
        default:""
      },
      noEdit:{
        type:Boolean,
        default:false
      },
      rule:{
        type:String,
        default:""
      },
      emptyMessage:{
        type:String,
        default:"不能为空"
      },
      show:{
        type:Boolean,
        default:true
      },
      position:{
        type:String,
        default:"down"
      }
    },
    methods:{
      verificationEvent(){
        this.error = this.$refs.control.error
        this.errorTipMessage = this.$refs.control.errorTipMessage
      },
      callEvent(){
        this.$nextTick(() => {
          this.$emit("call")
        })
      }
    }
  }
</script>

<style scoped>
  *{
    box-sizing: border-box;
  }
</style>
