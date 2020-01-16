<template>
  <td>
    <div class="md_center">
      <div @mouseover="mouseoverEvent" @mouseout="mouseoutEvent" v-show="tipShow" class="preview_showImg" :style="getStyle">
        <img :src="getUrl">
      </div>
      <img @mouseover="mouseoverEvent" @mouseout="mouseoutEvent" @click="clickEvent" class="md_img" :src="getUrl">
    </div>
  </td>
</template>

<script>
  export default {
    name: 'yhm-manager-td-image',
    data(){
      return{
        tipShow:false
      }
    },
    props: {
      tip:{
        type: Boolean,
        default: false
      },
      width:{
        type:String,
        default:'500'
      },
      height:{
        type:String,
        default:'300'
      },
      left:{
        type:String,
        default:'0'
      },
      top:{
        type:String,
        default:'0'
      },
      value: {
        type: String,
        required: true
      },
      tag: {
        type: String,
        required: true
      },
    },
    methods:{
      mouseoverEvent(){
        if(this.tip){
          this.tipShow = true
        }
        this.$nextTick(() => {
          this.$emit("mouseover",this.getUrl)
        })

      },
      mouseoutEvent(){
        if(this.tip){
          this.tipShow = false
        }
        this.$nextTick(() => {
          this.$emit("mouseout",this.getUrl)
        })
      },
      clickEvent(){
        this.$nextTick(() => {
          this.$emit("click")
        })
      }
    },
    computed:{
      getUrl(){
        return '/UploadFile/' + this.tag + '/' + this.value
      },
      getStyle(){
        return 'top:' + this.top + 'px;left:' + this.left + 'px;width:' + this.width + 'px;height:' + this.height + 'px'
      }
    }
  }
</script>

<style scoped>

</style>
