<template>
  <td>
    <div v-if="getEmpty" class="md_center">
      -----
    </div>
    <div v-if="!getEmpty" class="md_left">
      <span v-if="direction === '1'" class="detailIcon rf47">支</span>
      <span v-if="direction === '0'" class="detailIcon b49a">收</span>
      <template v-if="dirVal">{{value}}</template>
    </div>
  </td>
</template>

<script>
  export default {
    name: 'yhm-manager-td-direction',
    props: {
      value: {
        type: String,
        required: true
      },
      direction: {
        type: String,
        required: true,
      },
      dirVal: {
        type: Boolean,
        default: true
      }
    },
    computed:{
      getEmpty(){
        if(this.dirVal){
          return this.value === ''
        }
      }
    }
  }
</script>

<style scoped>

</style>
