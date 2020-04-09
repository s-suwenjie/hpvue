<template>

  <td >

    <div v-if="getEmpty" class="md_center">
      -----
    </div>
    <div v-if="!getEmpty" class="md_left md_relative">
      <input type="text" v-model="valueIpt" @blur="blurEvent" @focus="focusEvent">
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
      getEmpty () {
        return this.value === ''
      },
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
  }
}
</style>
