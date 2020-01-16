<template>
    <div class="ac_upload" :style="{width:getWidth,height:getHeight}">
      <div ref="box">
        <slot></slot>
        <input type="file" :multiple="multiple" @change="selectFileEvent($event)"/>
      </div>
    </div>
</template>

<script>
  export default {
    name: 'yhm-app-upload',
    data(){
      return{
        width:'',
        height:''
      }
    },
    props:{
      multiple:{
        type:Boolean,
        default:true
      },
    },
    methods:{
      selectFileEvent(e){
        this.$emit("change",e)
      }
    },
    computed:{
      getWidth(){
        return this.width + 'px'
      },
      getHeight(){
        return this.height + 'px'
      }
    },
    mounted () {
      this.width = this.$refs.box.clientWidth + 22
      this.height = this.$refs.box.clientHeight
    }
  }
</script>

<style scoped>

</style>
