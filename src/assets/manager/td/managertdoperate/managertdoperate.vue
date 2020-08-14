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
.md_center{
  justify-content: flex-start;
  margin-left: 16px;
}
</style>
