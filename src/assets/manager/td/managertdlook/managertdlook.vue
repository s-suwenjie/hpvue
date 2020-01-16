<template>
  <td>
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

</style>
