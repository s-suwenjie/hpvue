<template>
  <td>
    <div class="md_center" @click="pdfOpenView">
      <div @mouseover="mouseoverEvent" @mouseout="mouseoutEvent" v-show="tipShow" class="preview_showImg" :style="getStyle" :class="getImgStyle">
        <img :class="{Graystyle:isGraystyle}" :src="getUrl">

      </div>
      <img @mouseover="mouseoverEvent" @mouseout="mouseoutEvent" @click="clickEvent" class="md_img" :class="{Graystyle:isGraystyle}" :src="getUrl" v-if="!ICONS">
<!--      {{geticon}}-->
      <div @mouseover="mouseoverEvent" @mouseout="mouseoutEvent" @click="clickEvent" class="md_img" :class="[geticon,{Graystyle:isGraystyle}]" v-if="ICONS" ></div>
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
      isGraystyle:{
        type: Boolean,
        default: false
      },
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
      },
      geticon:{
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
          window.open("/UploadFile/" + this.tag + "/" + this.pdfUrl)
        }
        this.$nextTick(() => {
          this.$emit("call")
        })
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
        if(this.tag==''){
          return  this.value
        }else{
          return '/UploadFile/' + this.tag + '/' + this.value
        }
      },
      getStyle(){
        return 'top:' + this.top + 'px;left:' + this.left + 'px;width:' + this.width + 'px;height:' + this.height + 'px'
      },
      ICONS(){
        if(this.geticon){
          return true
        }else{
          return false
        }
      }
    },
    created() {

    }
  }
</script>

<style scoped lang="less">
  .imgStyle>img{
    /*height: 600px;*/
    max-width: 100%;
    max-height: 100%;
  }
  .pdfStyle>img{
    width: 95%;
  }
</style>
