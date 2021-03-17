<template>
  <td :class="{td_yes:value === '0',td_no:value === '1'}">
    <div class="md_center fs18b mr3b" :class="'i-whether' + value">{{value === "0"?"是":"否"}}</div>
  </td>
</template>

<script>
  export default {
    name: 'yhm-manager-td-yesno',
    props: {
      value: {
        type: String,
        required: true
      }
    }
  }
</script>

<style scoped>

</style>
