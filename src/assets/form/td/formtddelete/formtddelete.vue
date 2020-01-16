<template>
  <td class="fd_in_txt" :style="getWidth">
    <div @click="clickEvent" class="delete red fd_center fontSize18" :class="{mt_button_disabled:noClick}"></div>
  </td>
</template>

<script>
  export default {
    name: 'yhm-form-td-delete',
    inject: ["p____page"],
    props: {
      noClick:{
        type: Boolean,
        default: false
      },
      delClick:{
        type: Boolean,
        default: false
      },
      must:{
        type: Number,
        default: 0
      },
      width:{
        type: String,
        required: true
      },
      list: {
        type: Array,
        required: true
      },
      value: {
        type: Object,
        required: true
      },
      show: {
        type: Boolean,
        default: true
      }
    },
    methods:{
      clickEvent() {
        if (!this.noClick) {
          if (this.list.length > this.must) {
            this.$dialog.confirm({
              alertImg: 'warn',
              tipValue: '是否删除当前列?',
              okCallBack: () => {
                if (this.delClick) {
                  this.$nextTick(() => {
                    this.$emit('click')
                  })
                } else {
                  let index = this.list.indexOf(this.value)
                  if (index !== -1) {
                    this.list.splice(index, 1)
                  }
                }
              }
            })
          } else {
            this.$dialog.alert({
              tipValue: "此列表要求最少保留" + this.must + "列",
              width: "300",
              alertImg: "warn"
            })
          }
        }
      }
    },
    computed:{
      getWidth(){
        if(this.width !== '') {
          return 'width:' + this.width + 'px !important;'
        }
        else{
          return ''
        }
      }
    }
  }
</script>

<style scoped>

</style>
