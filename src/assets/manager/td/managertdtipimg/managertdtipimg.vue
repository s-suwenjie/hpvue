<template>
  <td >
    <div v-if="getEmpty" class="md_center" >
      -----
    </div>
    <div v-if="!getEmpty" class="md_left md_relative" :style="{color: color}">
      <div class="font fs20b" :class="getIcon" ref="control" @mouseover="mouseoverEvent" @mouseout="mouseoutEvent"></div>
      <div :class="{ml3:getMl}" >{{value}}</div>

      <div v-if="afterIcon !== ''" class="md_afterIcon" :style="{color:afterIconColor}" :class="[afterIcon,afterIconFontSize]"></div>
    </div>
    <div ref="tip" v-if="tip" v-show="showTip" :class="{custom:custom}" class="c_tip" :style="getPosition">
      <div>
        <div>
          <img :src="getUnitUrlImg" alt="">
        </div>
<!--        <img src="./images/arrow.png" v-show="!custom">-->
      </div>
    </div>
  </td>
</template>

<script>
  export default {
    name: 'yhm-manager-td-tip-img',
    data(){
      return{
        showTip:false,
        x:0,
        y:0,
        left:'',
        top:''
      }
    },
    props: {
      custom:{
        type:Boolean,
        default:false
      },
      nodeClassName:{
        type:String,
        default:'m_main'
      },
      tip:{
        type: Boolean,
        default: false
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
      unitUrl: {
        type: String,
        required: true
      },
      icon: {
        type: String,
        required: true
      }
    },
    methods: {
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
    computed: {
      getEmpty(){
        return this.value === ''
      },
      getUnitUrlImg(){
        return this.unitUrl
      },
      getMl(){
        if(this.icon === ''){
          return true
        }
        else {
          return false
        }
      },
      getIcon(){
        return this.icon
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

<style scoped lang="less">

.c_tip{
  width: 220px;
  height: 220px;
  border-radius: 5px;
  background-color: #49a9ea;
  border:0 !important;;
  box-shadow: 0 0 8px #04273e;
  margin: 0 !important;
  div{
    width: 100%;
    height: 100%;
    margin: 0;
    display: flex;
    img{
      bottom:-5px;
      width: 100%;
      border-radius: 4px;
      height: 100%;
    }
  }
}
  .custom{
    min-width: 160px;
    min-height: 80px;
    width:auto;
    height: auto;
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>
