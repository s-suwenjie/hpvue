<template>
  <td>
    <div class="md_center" @click="pdfOpenView">
      <div @mouseover="mouseoverEvent" @mouseout="mouseoutEvent" v-show="tipShow" class="preview_showImg" :style="getStyle" :class="getImgStyle">
        <img :src="getUrl">
      </div>
      <img @mouseover="mouseoverEvent" @mouseout="mouseoutEvent" @click="clickEvent" class="md_img" :src="getUrl">
    </div>
  </td>
</template>

<script>
  export default {
    name: 'yhm-manager-td-img-self',
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
      pdfUrl: {
        type: String,
        default: ''
      }
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
      },
      pdfOpenView(){
        if(this.tag === 'ElectronicInvoice' && this.pdfUrl){
          window.open( this.pdfUrl)
        }
      }
    },
    computed:{
      getImgStyle(){
        if(this.tag === 'ElectronicInvoice' && this.pdfUrl){
          return 'pdfStyle'
        }else{
          return 'imgStyle'
        }
      },
      getUrl(){
        return this.value
      },
      getStyle(){
        return 'top:' + this.top + 'px;left:' + this.left + 'px;width:' + this.width + 'px;height:' + this.height + 'px'
      }
    },
    created() {

    }
  }
</script>

<style scoped lang="less">
  .imgStyle>img{
    /*height: 600px;*/
   width: 100%;
    /*max-height: 100%;*/
  }
  .pdfStyle>img{
    width: 95%;
  }
</style>
