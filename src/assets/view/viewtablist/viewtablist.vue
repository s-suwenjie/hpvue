<template>
    <div class="t_list t_list_form mr0 ml0 mb0">
        <table class="t_table" width="100%" border="1" cellspacing="0">
          <thead>
          <tr>
            <slot name="listHead"></slot>
          </tr>
          </thead>
          <tbody >
          <slot name="listBody"></slot>
          </tbody>
        </table>
      <div class="v_empty">
        <slot name="empty"></slot>
      </div>
      <div v-if="pager" class="m_pager">
        <slot name="pager"></slot>
      </div>
      <div class="v_customize">
        <slot v-if="customize" name="customize"></slot>
      </div>
    </div>
</template>

<script>
  export default {
    name: 'yhm-view-tab-list',
    props:{
      pager:{
        type:Boolean,
        default:true
      },
      customize:{
        type:Boolean,
        default: false
      }
    }
  }
</script>

<style scoped lang="less">
.m_main{
  width: auto;
  height: auto;
  min-height: auto;
  float: none;
  margin-bottom: 0;
  position: relative;
}
</style>
