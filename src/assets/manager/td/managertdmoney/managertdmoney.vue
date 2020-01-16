<template>
  <td ref="control" @mouseover="mouseoverEvent" @mouseout="mouseoutEvent" @click="clickEvent">
    <div class="md_right md_relative">
      <div v-if="beforeIcon !== ''" class="md_beforeIcon" :style="{color:beforeIconColor}" :class="[beforeIcon,beforeIconFontSize]"></div>
      <div v-html="getTxt(value)"></div>
    </div>
  </td>
</template>

<script>
  import {tenThousandFormatHtml} from '@/assets/common.js'
  export default {
    name: 'yhm-manager-td-money',
    inject: ["p____page"],
    props: {
      tipCategory:{
        type:Number,
        default :0
      },
      value: {
        type: String,
        required: true
      },
      valueObject:{
        type:Object
      },
      beforeIcon:{
        type:String,
        default:''
      },
      beforeIconColor:{
        type:String,
        default:'#18d123'
      },
      beforeIconFontSize:{
        type:String,
        default:'fs14'
      }
    },
    methods:{
      mouseoverEvent(){
        this.$nextTick(() => {
          this.$emit('mouseover',this.valueObject,this.$refs.control,this.tipCategory)
        })
      },
      mouseoutEvent(){
        this.$nextTick(() => {
          this.$emit('mouseout',this.valueObject,this.$refs.control,this.tipCategory)
        })
      },
      clickEvent(){
        this.$nextTick(() => {
          this.$emit('click')
        })
      }
    },
    computed:{
      getTxt(){
        return function (val) {
          return tenThousandFormatHtml(val) + '&nbsp;'
        }
      }
    }
  }
</script>

<style scoped>

</style>
