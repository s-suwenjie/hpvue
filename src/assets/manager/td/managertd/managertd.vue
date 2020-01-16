<template>
  <td ref="control" @mouseover="mouseoverEvent" @mouseout="mouseoutEvent" @click="clickEvent">
    <div v-if="getEmpty" class="md_center">
      -----
    </div>
    <div v-if="!getEmpty" class="md_left md_relative" :style="{color: color}">
      {{value}}
      <div v-if="afterIcon !== ''" class="md_afterIcon" :style="{color:afterIconColor}" :class="[afterIcon,afterIconFontSize]"></div>
    </div>
    <div ref="tip" v-if="tip" v-show="showTip" class="c_tip" :style="getPosition">
      <div>
        {{value}}
        <img src="./images/arrow.png">
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
        top:''
      }
    },
    props: {
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
      }
    },
    methods:{
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
