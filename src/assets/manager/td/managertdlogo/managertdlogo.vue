<template>
  <td>
    <div :class={md_center:center}>
      <img class="logoImg" :src="getUrl" alt="">
      {{value}}
    </div>
  </td>
</template>

<script>
  export default {
    name: 'yhm-manager-td-logo',
    props:{
      value: {
        type: String,
        required: true
      },
      logo: {
        type: String,
        required: true
      },
      tag: {
        type: String,
        required: true,
        default: 'BankLogo'
      },
      center: {
        type: Boolean,
        default: false
      },
    },
    created(){
    },
    computed:{
      getUrl(){
        return '/UploadFile/' + this.tag + '/' + this.logo
      }
    }
  }
</script>

<style scoped>
  .logoImg{
    padding-left: 5px;
    width: 28px;
    margin-right: 5px;
    vertical-align: middle;
  }
</style>
