<template>
  <div class="a_mask" :class="{a_mask_hide:hide,a_mask_show:!hide}"></div>
</template>

<script>
  export default {
    name: 'yhm-app-mask',
    props: {
      hide: {
        type: Boolean,
        default: false
      }
    }
  }
</script>

<style scoped>

</style>
