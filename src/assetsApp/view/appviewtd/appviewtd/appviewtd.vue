<template>
    <td>
      <div v-if="getEmpty" class="app_center">
        -----
      </div>
      <div v-if="!getEmpty" class="app_left">
        {{value}}
      </div>
    </td>
</template>

<script>
  export default {
    name: 'yhm-app-view-td',
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
