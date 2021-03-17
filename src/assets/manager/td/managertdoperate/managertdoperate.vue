<template>
  <td @mouseover="mouseOverEvent" @mouseout="mouseOutEvent" v-show="show" :class="{stickyLeft:stickyLeftShow,stickyRight:stickyRightShow}">
    <div class="md_center">
      <slot></slot>
    </div>
  </td>
</template>

<script>
  export default {
    name: 'yhm-manager-td-operate',
    props:{
      show:{
        type:Boolean,
        default: true
      },
      stickyLeftShow:{
        type: Boolean,
        default: false
      },
      stickyRightShow:{
        type: Boolean,
        default: false
      }
    },
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
.stickyLeft{
  position: sticky !important;
  left: 0;
  z-index: 90;
}
.stickyRight{
  position: sticky !important;
  right: 0;
  z-index: 90;
}
</style>
