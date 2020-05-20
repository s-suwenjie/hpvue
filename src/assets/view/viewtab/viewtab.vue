<template>
  <div class="v_area_tab">
    <div class="v_tab_title">
      <div class="content">
        <slot name="tab"></slot>
      </div>
      <div>
        <span class="v_tab_title_total">
          <slot name="tab_total"></slot>
        </span>
      </div>
    </div>
    <slot name="operate"></slot>
    <slot name="content"></slot>
  </div>
</template>

<script>
  export default {
    name: 'yhm-view-tab',
  }
</script>

<style scoped>
.v_addButton{
  padding: 0;
  position: absolute;
  right: 0;
}
.v_tab_title{
  position: relative;
  border-bottom: 1px solid #49a9ea;
}
</style>
