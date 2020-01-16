<template>
  <div class="m_main">
    <div v-if="category" class="m_navigation">
      <slot name="navigation"></slot>
    </div>
    <div v-if="!category" class="menuTab">
      <div class="menuTabTit">
        <div class="menuTabLft">
          <slot name="navigationTab"></slot>
        </div>
      </div>
    </div>
    <slot name="customize"></slot>
  </div>
</template>

<script>
  export default {
    name: 'yhm-manager-empty-page',
    props:{
      category:{
        type:Boolean,
        default:true
      }
    }
  }
</script>

<style scoped>

</style>
