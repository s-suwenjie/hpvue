<template>
  <td v-show="show"  @mouseover="mouseoverEvent" @mouseout="mouseoutEvent">
    <div  @click="clickEvent" class="mt_psd" :class="{mt_psd_left:isLeft,'overflow':menuShow}" :style="getColor" @contextmenu.prevent="contextMenuEvent($event)">
      <div class="font" :class="[getIcon,fsb]"></div>
      <div :class="{ml3:getMl}">{{befotrValue}}{{item.showName}}{{afterValue}}</div>
    </div>
    <div v-show="menuShow" v-if="menuList.length>0" ref="menuRight" class="menuRight" v-click-control-outside="outsideClick">
      <p v-for="(item,index) in menuList" :key="index" @click.stop="menuClick(item,index)">{{item}}</p>
    </div>
  </td>
</template>

<script>
  export default {
    name: 'yhm-manager-td-psd',
    data(){
      return{
        menuShow:false,
        item:null
      }
    },
    props: {
      menuList:{
        type:Array,
        default:function() {
          return []
        }
      },
      fsb:{
        type: String,
        default: ''
      },
      isLeft:{
        type:Boolean,
        default:false
      },
      befotrValue:{
        type: String,
        default:""
      },
      afterValue:{
        type: String,
        default:""
      },
      value: {
        type: String,
        required: true
      },
      list: {
        type: Array,
        required: true
      },
      show:{
        type:Boolean,
        default:true
      }
    },
    methods:{
      mouseoverEvent(){
        this.$nextTick(() => {
          this.$emit('mouseover')
        })
      },
      mouseoutEvent() {
        this.$nextTick(() => {
          this.$emit('mouseout')
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
          let styles = this.$refs.menuRight.style
          styles.left = event.x+'px'
          styles.top = event.y+'px'
          styles.display = 'block'
          this.menuShow = true
        }
        this.$emit('rightClick')
      },
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

<style lang="less" scoped>
  .menuRight{
    position: fixed;
    width: auto;
    min-width: 100px;
    max-width: 200px;
    height: auto;
    padding: 5px 0;
    background: #fff;
    z-index: 99999;
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
