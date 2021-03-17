<template>
  <td class="fd_in_txt" :style="getWidth">
    <div @click="clickEvent" style="float: left;" :class="[buttonDisabled,iconName]" class="fd_center fontSize18" :style="{float:float,padding:padding,color:iconColor}"></div>
<!--    disabled-->
<!--    mt_button_disabled:noClick-->
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
      float:{
        type: String,
        default: "center"
      },
      iconName:{
        type: String,
        default: "delete"
      },
      iconColor:{
        type: String,
        default: "red"
      },
      tipValue:{
        type: String,
        default: "是否删除当前列?"
      },
      padding:{
        type: String,
        default: ""
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
              tipValue: this.tipValue,
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
      buttonDisabled(){
        if(this.noClick){
          return 'mt_button_disabled'
        }
      },
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
