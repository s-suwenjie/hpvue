<template>
  <td>
    <div class="app_center">
      <span class="app_select check_button_icon" :class="{app_selected:select,check_button_icon_select:select}"></span>
    </div>
  </td>
</template>

<script>
  export default {
    name: 'yhm-app-view-td-check',
    props: {
      select:{
        type:Boolean,
        default:false
      }
    }
  }
</script>

<style scoped>

</style>
