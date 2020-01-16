<template>
  <div class="f_area">
    <div class="f_title f_listtitle">
      <p class="f_titleTxt">
        <slot name="title"></slot>
      </p>
      <slot name="operate"></slot>
    </div>
    <!--<div class="formCont fcTable">-->
      <div class="f_table">
        <table width="100%" border="1" cellspacing="0">
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
        <div class="f_split"></div>
      </div>
    <!--</div>-->
  </div>
</template>

<script>
  export default {
    name: 'yhm-formlistbody'
  }
</script>

<style scoped>

</style>
