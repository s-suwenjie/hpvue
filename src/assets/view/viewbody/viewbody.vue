<template>
  <div class="v_area">
    <div class="v_big_title">
      <p class="v_titleTxt">
        <slot name="title"></slot>
      </p>
      <div>
        <slot name="opera"></slot>
      </div>
    </div>
    <div class="v_controls">
      <slot name="body"></slot>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'yhm-view-body'
  }
</script>

<style scoped lang="less">

</style>
