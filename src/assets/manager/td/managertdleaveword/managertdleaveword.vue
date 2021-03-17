<template>
  <td @click="clickEvent" class="menuTd leaveword">
    <span @click="iconClickEvent" v-show="leaveWordShow" class="i-uniE9AD" :style="{color:colorValue}" style="font-size: 18px;"></span>
    <span v-show="!leaveWordShow">------</span>
  </td>
</template>

<script>
  export default {
    name: 'yhm-manager-td-leaveword',
    inject: ["p____page"],
    data(){
      return{

      }
    },
    props: {
      leaveWordShow:{
        type:Boolean,
        default:false
      },
      colorValue:{
        type:String,
        default: '#49a9ea'
      }
    },
    methods: {
      iconClickEvent(){
        this.$nextTick(() => {
          this.$emit('iconClick')
        })
      },
      clickEvent(){
        this.$nextTick(() => {
          this.$emit('click')
        })
      },
    }
  }
</script>

<style lang="less" scoped>
.leaveword{
  width: 100%;
  height: 34px;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
