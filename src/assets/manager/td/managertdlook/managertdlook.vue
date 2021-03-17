<template>
  <td v-show="show" :class="{stickyLeft:stickyLeftShow,stickyRight:stickyRightShow}">
    <div class="md_center">
      <span @click="clickEvent" class="list_look md_look" :class="{mt_button_disabled:noClick}"></span>
    </div>
  </td>
</template>

<script>
  export default {
    name: 'yhm-manager-td-look',
    props:{
      noClick:{
        type: Boolean,
        default: false
      },
      show:{
        type:Boolean,
        default:true
      },
      stickyLeftShow:{
        type: Boolean,
        default: false
      },
      stickyRightShow:{
        type: Boolean,
        default: false
      },
    },
    methods:{
      clickEvent(){
        if(!this.noClick){
          this.$emit("click")
        }
      }
    }
  }
</script>

<style scoped>
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
