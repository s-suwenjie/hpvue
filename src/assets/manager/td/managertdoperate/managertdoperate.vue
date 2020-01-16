<template>
  <td @mouseover="mouseOverEvent" @mouseout="mouseOutEvent">
    <div class="md_center">
      <slot></slot>
    </div>
  </td>
</template>

<script>
  export default {
    name: 'yhm-manager-td-operate',
    methods: {
      mouseOverEvent(){
        this.$nextTick(() => {
          this.$emit('mouseover')
        })
      },
      mouseOutEvent(){
        this.$nextTick(() => {
          this.$emit('mouseout')
        })
      },
    }
  }
</script>

<style scoped>

</style>
