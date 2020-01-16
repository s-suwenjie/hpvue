<template>
  <div class="af_block">
    <div class="af_title">
      <div class="af_title_name">
        <slot name="title"></slot>
      </div>
      <div class="af_title_operate">
        <slot name="operate"></slot>
      </div>
    </div>
    <div class="af_controls">
      <slot name="controls"></slot>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'yhm-app-form-body'
  }
</script>

<style scoped>

</style>
