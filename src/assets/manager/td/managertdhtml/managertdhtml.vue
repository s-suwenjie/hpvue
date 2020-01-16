<template>
<td>
  <div v-if="getEmpty" class="md_center">
    -----
  </div>
  <div style="text-indent: 5px">
    <div v-html="value"></div>
  </div>
</td>
</template>

<script>
  export default {
    name: 'yhm-manager-td-html',
    props: {
      value: {
        type: String,
        required: true
      },
    },
    computed:{
      getEmpty(){
        return this.value === ''
      }
    }
  }
</script>

<style scoped>

</style>
