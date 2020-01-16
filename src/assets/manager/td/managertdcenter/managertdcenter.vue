<template>
    <td @click="clickEvent">
      <div class="md_center" :style="{color: color}">
        {{value|formats(format,emptyValue,isEmpty)}}
      </div>
    </td>
</template>

<script>
  export default {
    name: 'yhm-manager-td-center',
    inject: ["p____page"],
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
      },
      color: {
        type: String,
        default: '#333'
      }
    },
    methods: {
      clickEvent(){
        this.$nextTick(() => {
          this.$emit('click')
        })
      },
    },
    filters:{
      formats(data,format,emptyValue,isEmpty){
        if(data === '' || isEmpty){
          return emptyValue
        }
        else {
          if (format === 'phone') {
            return data.substring(0,3) + ' ' + data.substring(3,7) + ' ' + data.substring(7,11)
          }
          else if (format === 'phone*') {
            return data.substring(0,3) + ' **** ' + data.substring(7,11)
          }
          else if (format === 'idno') {
            return data.substring(0,6) + ' ' + data.substring(6,10) + ' ' + data.substring(10,14) + ' ' + data.substring(14,18)
          }
          else if (format === 'idno*') {
            return data.substring(0,6) + ' **** **** ' + data.substring(14,18)
          }
          else{
            return data
          }
        }
      }
    }
  }
</script>

<style scoped>

</style>
