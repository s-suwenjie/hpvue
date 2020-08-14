<template>
  <div class="f_area">
    <div class="f_title">
      <p class="f_titleTxt">
        <slot name="title"></slot>
      </p>
      <div>
        <slot name="opera"></slot>
      </div>
    </div>
    <div class="f_controls">
      <slot name="control"></slot>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'yhm-formbody',
    props: {

    }
  }
</script>

<style scoped>
  *{
    box-sizing: border-box;
  }
</style>
