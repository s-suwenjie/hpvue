<template>
    <div style="font-size: 16px;">
        <sketch-picker v-show="colorShow" v-model="colors" @cancel="outsideClick" @ok="confirm" @input="updateValue"></sketch-picker>
    </div>
</template>

<script>
  import { Photoshop } from 'vue-color'
  export default {
    name: 'mineManager',
    components: {
      'sketch-picker': Photoshop,
    },
    data () {
        return {
          color: '#ff0000',
          colorShow: true,
          colors: {
            hex: '#194d33',
            hsl: { h: 150, s: 0.5, l: 0.2, a: 1 },
            hsv: { h: 150, s: 0.66, v: 0.30, a: 1 },
            rgba: { r: 25, g: 77, b: 51, a: 1 },
            a: 1
          }
        }
    },
    methods:{
      // 颜色选择器
      outsideClick () {
        if (this.colorShow) {
          this.colorShow = false
        } else {
          this.colorShow = true
        }
      },
      confirm(){
        console.log(this.colors.hex)
        this.outsideClick()
      },
      updateValue (val) {
        console.log('颜色选择', val,this.colors.hex)
        this.color = val.hex
      },
    },
    created(){

    },
    mounted() {

    }
  }
</script>

<style lang="less" scoped>


</style>
