<template>
    <td @click="clickEvent" class="menuTd" :class="{'overflow':menuShow}" @contextmenu.prevent="contextMenuEvent($event)"  @dblclick="dblclickEvent">
      <div class="md_center md_relative" :style="{color: color}">
        <div v-if="afterIcon !== ''" class="md_afterIcon" :style="{color:afterIconColor}" :class="[afterIcon,afterIconFontSize]"></div>
        {{value|formats(format,emptyValue,isEmpty)}}
      </div>
      <div v-show="menuShow" v-if="menuList.length>0" ref="menuRight" class="menuRight" v-click-control-outside="outsideClick">
        <p v-for="(item,index) in menuList" @click.stop="menuClick(item,index)">{{item}}</p>
      </div>

    </td>

</template>

<script>
  export default {
    name: 'yhm-manager-td-center',
    inject: ["p____page"],
    data(){
      return{
        menuShow:false,
        mouseX:'',
        mouseY:'',
        // menuList:['编辑','编辑']
      }
    },
    props: {
      menuList:{
        type:Array,
        default:function() {
          return []
        }
      },
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
      },
      afterIcon:{
        type:String,
        default:''
      },
      afterIconColor:{
        type:String,
        default:'#18d123'
      },
      afterIconFontSize:{
        type:String,
        default:'fs14'
      },
    },
    methods: {
      clickEvent(){
        this.$nextTick(() => {
          this.$emit('click')
        })
      },
      dblclickEvent(){
        this.$nextTick(() =>{
          this.$emit("dblclick")
        })
      },
      menuClick(item,index){
        this.$nextTick(()=>{
          this.menuShow = false
          this.$emit('menuClick',item,index)
        })
      },
      outsideClick(){
        this.menuShow = false
      },
      contextMenuEvent(event){
        if(this.menuList.length>0){
          this.menuShow = false
          $(".menuRight").hide()
          let rect = this.$el.getBoundingClientRect()
          this.mouseX = event.pageX - rect.x
          this.mouseY = event.pageY - rect.y
          let styles = this.$refs.menuRight.style
          styles.left = this.mouseX+'px'
          styles.top = this.mouseY+'px'
          styles.display = 'block'
          this.menuShow = true
        }
        this.$emit('rightClick')
      },
    },
    filters:{
      formats(data,format,emptyValue,isEmpty){
        if(data===null){
          data = ''
        }
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

<style lang="less" scoped>
.menuRight{
  position: absolute;
  width: auto;
  min-width: 100px;
  max-width: 200px;
  height: auto;
  padding: 5px 0;
  background: #fff;
  z-index: 999;
  border: 1px solid #D3D3D3;
  border-radius: 5px;
  p{
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0 6px;
    /*margin: 0 5px;*/
    height: 32px;
  }
  p:hover{
    background: #49a9ea;
    color: #FFFFFF;
  }
}
.overflow{
  overflow: inherit;
}

.menuTd{
    position: relative;
  }
</style>
