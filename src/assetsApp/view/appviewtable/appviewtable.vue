<template>
    <div class="structure_main">
      <table class="app_table" width="100%" border="1" cellspacing="0">
        <thead>
          <tr>
            <slot name="head"></slot>
          </tr>
        </thead>
        <tbody>
          <slot name="body"></slot>
        </tbody>
      </table>
    </div>
</template>

<script>
  export default {
    name: 'yhm-app-view-table'
  }
</script>

<style scoped>
  *{
    box-sizing: border-box;
  }
</style>
