<template>
  <td @click="clickEvent">
    <div class="md_rgt">
      {{value}}
    </div>
  </td>
</template>

<script>
  export default {
    name: 'yhm-manager-td-rgt',
    props: {
      isEmpty:{
        type:Boolean,
        default:false
      },
      value: {
        type: String,
        required: true
      },
      format: {
        type: String,
        default:''
      },
      emptyValue:{
        type: String,
        default:'-----'
      }
    },
    methods:{
      clickEvent(){
        this.$nextTick(() => {
          this.$emit('click')
        })
      }
    }
  }
</script>

<style scoped>

</style>
