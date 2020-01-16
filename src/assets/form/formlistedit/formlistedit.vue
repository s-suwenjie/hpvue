<template>
  <div class="f_area" v-if="show">
    <div class="f_title f_listtitle">
      <p class="f_titleTxt">
        <slot name="title"></slot>
      </p>
      <div>
        <slot name="operate"></slot>
      </div>
    </div>
    <div class="t_list t_list_form t_list_show">
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
      <slot name="empty"></slot>
      <div>
        <slot name="customize"></slot>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'yhm-form-list-edit',
    props:{
      show:{
        type:Boolean,
        default:true
      }
    }
  }
</script>

<style scoped>

</style>
