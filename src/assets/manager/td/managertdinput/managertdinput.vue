<template>

  <td >

    <div class="md_left md_relative">
      <input type="text" v-model="valueIpt" ref="inputFocus" @blur="blurEvent" @focus="focusEvent">
    </div>

  </td>

</template>

<script>
  export default {
    name: 'yhm-manager-td-input',
    data (){
      return {
        valueIpt: ''
      }
    },
    props: {
      value: {
        type: String,
        required: true
      },
      isFocus: {
        type: Boolean,
        default: false
      },
      id: {
        type: String,
        required: true
      },
    },
    methods: {
      blurEvent(){

        this.$nextTick(() =>{
          this.$emit("blur",this.id,this.valueIpt)
        })
      },
      focusEvent(){
        this.$nextTick(() =>{
          this.$emit("focus")
        })
      },
    },
    computed: {

    },
    watch: {
      isFocus(){
        this.$refs.inputFocus.focus()
      }
    },
    created () {
      this.valueIpt = this.value
    }
  }
</script>

<style scoped lang="less">

.md_left{
  input{
    text-indent: 4px;
    width: 100%;
    height: 32px;
    margin: 0 1px;
  }
}
</style>
