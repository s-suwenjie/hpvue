<template>
  <td v-show="show" :rowspan="rowspan" ref="control" @mouseover="mouseoverEvent" @mouseout="mouseoutEvent" @click="clickEvent" @dblclick="dblclickEvent">
    <div v-show="getEmpty" class="md_center">
      -----
    </div>
    <div v-if="type=='vehicle'&&value!=''" :style="{textAlign:vehicleTextAlign}" style="padding: 0 6px;">
      <span style="font-size: 14px;font-weight: 700;" v-if="value!=''">{{(value+'').trim().slice(0,2)}}</span>
      <span v-if="value!=''" style="font-size: 14px;font-weight: 700;">-</span>
      <span v-if="value!=''">{{(value+'').trim().slice(2,value.length)}}</span>
      <span style="text-align: center;" v-if="value==''">------</span>
    </div>
    <div v-show="!getEmpty" v-else class="md_left md_relative" :style="{overflow:overflow,color: color,textAlign:textAlign}">
      <span v-if="!isHtml">{{value}}</span>
      <span v-if="isHtml" v-html="value"></span>
      <div @click.stop="afterClick" v-if="afterIcon !== ''" class="md_afterIcon" :style="{color:afterIconColor}" :class="[afterIcon,afterIconFontSize]"></div>
      <slot></slot>
    </div>
    <div ref="tip" v-if="tip&&tipType!='r'" v-show="showTip" class="c_tip" :style="getPosition">
      <div class="c_tip_img">
        {{tipShow?tipValue:value}}
        <img style="position: absolute; bottom: -19px;" src="./images/arrow.png">
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
      type:{
        type:String,
        default:''
      },
      vehicleTextAlign:{
        type:String,
        default:'left'
      },
      isHtml:{
        type:Boolean,
        default:false
      },
      overflow:{
        type:String,
        default:'hidden'
      },
      rowspan:{
        type:Number,
        default:1
      },
      textAlign:{
        type:String,
        default:''
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
      tipTypeLeft:{//等于 r 时 是做当回显在列表最后一个显示不全的处理 用来调整距离 不需要加单位
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
      },
      show:{
        type:Boolean,
        default:true
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
      afterClick(){
        this.$nextTick(() => {
          this.$emit('afterClick')
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
          result += 'left:' + (this.left-100-Number(this.tipTypeLeft)) + 'px;'
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
