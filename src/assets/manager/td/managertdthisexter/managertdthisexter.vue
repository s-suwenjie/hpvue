<template>
  <td>
    <div v-if="getEmpty" class="md_center">
      -----
    </div>
    <div v-if="!getEmpty" class="md_left">
      <span v-if="category === '1'" class="detailIcon external">外</span>
      <span v-if="category === '0'" class="detailIcon">本</span>
      {{value}}
    </div>
  </td>
</template>

<script>
  export default {
    name: 'yhm-manager-td-thisexter',
    props: {
      value: {
        type: String,
        required: true
      },
      category: {
        type: String,
        required: true,
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
