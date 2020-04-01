<template>
  <td>
    <div @click="clickEvent" class="mt_psd" :class="{mt_psd_left:isLeft}" :style="getColor">
      <div class="font" :class="[getIcon,fsb]"></div>
      <div :class="{ml3:getMl}">{{item.showName}}</div>
    </div>
  </td>
</template>

<script>
  export default {
    name: 'yhm-manager-td-psd',
    data(){
      return{
        item:null
      }
    },
    props: {
      fsb:{
        type: String,
        default: ''
      },
      isLeft:{
        type:Boolean,
        default:false
      },
      value: {
        type: String,
        required: true
      },
      list: {
        type: Array,
        required: true
      },
    },
    methods:{
      clickEvent(){
        this.$emit("click")
      }
    },
    created(){
      for(var i = 0; i < this.list.length; i++){
        if(this.list[i].num === this.value){
          this.item = this.list[i]
          break
        }
      }
    },
    computed:{
      getMl(){
        if(this.item.img.indexOf('i-') === 0){
          return true
        }
        else {
          return false
        }
      },
      getIcon(){
        if(this.item.img.indexOf('i-') === 0){
          return this.item.img
        }
        else if(this.item.code.indexOf('i-') === 0){
          return this.item.code
        }
        else{
          return ''
        }
      },
      getColor(){
        if(this.item.code.indexOf("#") === 0){
          return 'color:' + this.item.code
        }
        else if(this.item.img.indexOf("#") === 0){
          return 'color:' + this.item.img
        }
        return ""
      }
    },
    watch:{
      value(newVal){
        for(var i = 0; i < this.list.length; i++){
          if(this.list[i].num === newVal){
            this.item = this.list[i]
            break
          }
        }
      },
      // list:{
      //   handler(newVal) {
      //     for(var i = 0; i < newVal.length; i++){
      //       if(newVal[i].num === this.value){
      //         this.item = newVal[i]
      //         break
      //       }
      //     }
      //   },
      //   deep: true
      // }
    }
  }
</script>

<style scoped>

</style>
