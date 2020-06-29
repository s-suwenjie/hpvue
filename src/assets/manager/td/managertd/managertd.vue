<template>
  <td :rowspan="rowspan" ref="control" @mouseover="mouseoverEvent" @mouseout="mouseoutEvent" @click="clickEvent" @dblclick="dblclickEvent">
    <div v-if="getEmpty" class="md_center">
      -----
    </div>
    <div v-if="!getEmpty" class="md_left md_relative" :style="{color: color}">
      {{value}}
      <div v-if="afterIcon !== ''" class="md_afterIcon" :style="{color:afterIconColor}" :class="[afterIcon,afterIconFontSize]"></div>
      <slot></slot>

    </div>
    <div ref="tip" v-if="tip&&tipType!='r'" v-show="showTip" class="c_tip" :style="getPosition">
      <div class="c_tip_img">
        {{tipShow?tipValue:value}}
        <img src="./images/arrow.png">
      </div>
    </div>
    <div ref="tip" v-if="tipType=='r'?true:false&&tip" v-show="showTip" class="c_tip c_tipRight"  :style="getPositionRight">
      <div>
        {{tipShow?tipValue:value}}
        <img style="position: absolute;right: 100px;bottom: -16px;" src="./images/arrow.png">
      </div>
    </div>
  </td>
</template>

<script>
  export default {
    name: 'yhm-manager-td',
    data(){
      return{
        showTip:false,
        x:0,
        y:0,
        left:'',
        right:'',
        top:'',
        bottom:''
      }
    },
    props: {
      rowspan:{
        type:Number,
        default:1
      },
      nodeClassName:{
        type:String,
        default:'m_main'
      },
      tip:{
        type: Boolean,
        default: false
      },
      tipType:{//等于 r 时 是做当回显在列表最后一个显示不全的处理
        type: String,
        default: ''
      },
      tipShow: {
        type: Boolean,
        default: false
      },
      tipValue: {
        type: String,
        default: ''
      },
      value: {
        type: String,
        required: true
      },
      valueObject:{
        type:Object
      },
      afterIcon:{
        type:String,
        default:''
      },
      afterIconColor:{
        type:String,
        default:'#18d123'
      },
      afterIconFontSize:{
        type:String,
        default:'fs14'
      },
      color: {
        type: String,
        default: '#333'
      }
    },
    methods:{
      dblclickEvent(){
        this.$nextTick(() =>{
          this.$emit("dblclick")
        })
      },
      getRelativeNode(control){
        let name = control.parentNode.className
        if(name !== this.nodeClassName){
          this.getRelativeNode(control.parentNode)
        }
        else{
          let rect = control.parentNode.getBoundingClientRect()
          this.x = rect.x
          this.y = rect.y
        }
      },
      mouseoverEvent(){
        if(!this.getEmpty) {
          if(this.tip){
            this.showTip = true
            let rect = this.$el.getBoundingClientRect()
            this.getRelativeNode(this.$el)
            this.left = rect.left - this.x
            this.$nextTick(() => {
              let tipRect = this.$refs.tip.getBoundingClientRect()
              this.top = rect.top - this.y - tipRect.height - 8
            })
          }
          this.$nextTick(() => {
            this.$emit('mouseover', this.valueObject, this.$refs.control)
          })
        }
      },
      clickEvent(){
        this.$nextTick(() => {
          this.$emit('click')
        })
      },
      mouseoutEvent() {
        this.showTip = false
        if (!this.getEmpty) {
          this.$nextTick(() => {
            this.$emit('mouseout', this.valueObject, this.$refs.control)
          })
        }
      }
    },
    computed:{
      getEmpty(){
        return this.value === ''
      },
      getPositionRight(){
        let result = ''
        if(this.left !== ''){
          result += 'left:' + (this.left-100) + 'px;'
        }
        if(this.top !== ''){
          result += 'top:' + this.top + 'px;'
        }
        if(result !== ''){
          result += 'bottom:auto;'
        }
        return result
      },
      getPosition(){
        let result = ''
        if(this.left !== ''){
          result += 'left:' + this.left + 'px;'
        }
        if(this.top !== ''){
          result += 'top:' + this.top + 'px;'
        }
        if(result !== ''){
          result += 'bottom:auto;'
        }
        return result
      }
    }
  }
</script>

<style scoped>

</style>
