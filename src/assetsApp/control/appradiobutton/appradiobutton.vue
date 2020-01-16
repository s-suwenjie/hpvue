<template>
  <div class="ac_main">
    <div class="ac_box disable_menu pl4 pt4" :class="{ac_focus:touchStyle,ac_error:error}">
      <div @contextmenu.prevent class="ac_radio" :class="{ac_radio_checked:getSelect(item.num)}" v-for="(item,index) in list" :key="index" @touchstart="touchStartEvent" @touchend="touchEndEvent(item)">
        <div class="radio_button_icon amr4b afs17b" :class="{radio_button_icon_select:getSelect(item.num)}"></div>
        <span class="txt">{{item.showName}}</span>
      </div>
    </div>
  </div>
</template>

<script>
  import { controlmixin } from '@/assetsApp/control/control.js'
  export default {
    name: 'yhm-app-radio-button',
    mixins: [controlmixin],
    data(){
      return{
        txt:this.value || this.list[0].num,
        touchStyle:false,
        error:false,
        selected:false
      }
    },
    props: {
      id: {
        type: String,
        required: true
      },
      value: {
        type: String,
        required: true
      },
      list:{
        type:Array,
        default:function () {
          return []
        }
      },
      show:{
        type:Boolean,
        default:true
      }
    },
    methods:{
      touchStartEvent(){
        this.touchStyle = true
      },
      touchEndEvent(item){
        this.touchStyle = false
        this.txt = item.num
        this.$nextTick(() => {
          this.$emit("call")
        })
      }
    },
    computed:{
      getSelect(){
        return function(val) {
          return this.txt === val
        }
      },
    },
    watch:{
      show(newVal){
        if(!newVal){
          this.error = false
          this.txt = this.list[0].num
          var js = "this.p____page." + this.id + " = \"" + this.list[0].num + "\""
          eval(js);
        }
      },
      txt(newVal){
        var js = "this.p____page." + this.id + " = \"" + newVal + "\""
        eval(js);
      },
      value(newVal){
        this.txt = newVal
      }
    }
  }
</script>

<style scoped>
  *{
    box-sizing: border-box;
  }
</style>
