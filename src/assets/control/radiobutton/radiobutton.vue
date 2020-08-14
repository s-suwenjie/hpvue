<template>
  <div v-if="show" class="c_main" :class="{c_main_m:category}" :style="getWidth">
    <div @mouseout="mouseoutEvent" @mouseover="mouseoverEvent" class="c_box" :class="{c_hover:mouseStyle,p4:!category,p2:category,c_disable:noEdit}" :style="getIsCenter">
      <div @contextmenu.prevent @click="selectItem(item)" v-for="(item,index) in selectList" :key="index" class="c_b_item disable_menu" :class="{c_b_item_select:getSelect(item.num),c_b_item_m:category}">
        <div class="radio_button_icon" :class="{radio_button_icon_select:getSelect(item.num)}"></div>
        <span class="txt">{{item.showName}}</span>
      </div>
    </div>
  </div>
</template>

<script>
  import {accAdd} from '@/assets/common.js'
    export default {
      name: "yhm-radio",
      inject: ["p____page"],
      data(){
        return{
          txt:this.value || this.selectList[0].num,
          mouseStyle:false
        }
      },
      props: {
        width: {
          type: String,
          default: ""
        },
        category:{
          type:Boolean,
          default:false
        },
        id:{
          type:String,
          default:""
        },
        value:{
          type:String,
          default:""
        },
        noEdit:{
          type: Boolean,
          default: false
        },
        show:{
          type:Boolean,
          default:true
        },
        selectList:{
          type:Array,
          default:function () {
            return []
          }
        }
      },
      methods:{
        //鼠标放上事件
        mouseoverEvent(){
          this.mouseStyle = true
        },
        //鼠标移出事件
        mouseoutEvent(){
          this.mouseStyle = false
        },
        selectItem(item){
          if(!this.noEdit) {
            this.txt = item.num
            this.$nextTick(() => {
              this.$emit("call", item.num)
            })
          }
        }
      },
      computed:{
        getSelect(){
          return function(val) {
            return this.txt === val
          }
        },
        getWidth(){
          if(this.width !== '') {
            return 'width:' + this.width + 'px !important;'
          }
          else{
            return ''
          }
        },
        //获取项是否居中显示
        getIsCenter(){
          if(this.category){
            return 'justify-content: center;'
          }
          return ''
        }
      },
      watch:{
        show(newVal,oldVal){
          if(!newVal){
            this.error = false
            this.txt = this.selectlist[0].num
            var js = "this.p____page." + this.id + " = \"" + this.selectList[0].num + "\""
            eval(js);
          }
        },
        txt(newVal,oldVal){
          var js = "this.p____page." + this.id + " = \"" + newVal + "\""
          eval(js);
        },
        value(newVal,oldVal){
          this.txt = newVal
        }
      }
    }
</script>

<style scoped>

</style>
