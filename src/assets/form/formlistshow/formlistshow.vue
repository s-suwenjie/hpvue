<template>
  <div class="f_area" :class="[getWidth,{w620: !smTable}]">
    <div class="f_title f_listtitle">
      <p class="f_titleTxt">
        <slot name="title"></slot>
      </p>
      <div>
        <slot name="operate"></slot>
      </div>
    </div>
    <div class="t_list t_list_form">
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
      <slot name="customize"></slot>
      <slot name="pager"></slot>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'yhm-form-list-show',
    props:{
      width:{
        type:String,
        default: ''
      },
      smTable:{
        type:Boolean,
        default:true
      }
    },
    computed:{
      getWidth(){
        if(this.width){
          return "f_area" + this.width
        }
        else{
          return ""
        }
      }
    }
  }
</script>

<style scoped>

</style>
