<template>

  <th v-show="show" ref="managerth" :style="{lineHeight:subtitle!=''?'10px':'32px'}" :class="{stickyLeftThead:stickyLeftShow,stickyRightThead:stickyRightShow}" :colspan="colspan" class="sort disable_menu" @click="clickEvent" v-lplload="addup" :width="width">
<!--    <div class="tooltip">-->
<!--      <span class="tooltiptext">提示文本</span>-->
<!--    </div>-->
    <span :style="{color:beforeColor}">{{beforeTitle}}</span>
    <span :style="{fontSize:subtitle!=''?'12px':''}">{{title}}</span>
    <p v-if="subtitle!=''" style="font-size: 12px;margin-top: 2px;">{{subtitle}}</p>
    <span v-show="prompt!=''" :style="{color:afterColor,fontSize:afterSize}" style="margin-left: 5px;" class="tooltip">{{afterTitle}}<span :style="{left:tooltipLeft}" class="tooltiptext">{{prompt}}</span></span>
    <span v-show="afterIcon!=''" :style="{color:afterIconColor}" style="margin-left: 5px;" class="tooltip" :class="getIcon"><span v-show="prompt!=''" :style="{left:tooltipLeft}" class="tooltiptext">{{prompt}}</span></span>

    <template v-if="value !== ''">
    <div v-show="this.order === ''" class="sort_both" :style="{top:subtitle!=''?'10px':'3px'}">
      <img src="./images/sort_both.png">
    </div>
    <div v-show="this.order === 'desc'" class="sort_desc" :style="{top:subtitle!=''?'10px':'6px'}">
      <img src="./images/sort_desc.png">
    </div>
    <div v-show="this.order === 'asc'" class="sort_asc" :style="{top:subtitle!=''?'10px':'0px'}">
      <img src="./images/sort_asc.png">
    </div>
      <slot></slot>
    </template>
  </th>
</template>

<script>
  export default {
    name: 'yhm-managerth',
    inject: ["p____page"],
    data(){
      return{
        order:"",
        // dragTitle:'可拖拽'
      }
    },
    props: {
      colspan:{
        type: String,
        default: ''
      },
      beforeTitle:{
        type: String,
        default: ''
      },
      beforeColor:{
        type: String,
        default: ''
      },
      stickyLeftShow:{
        type: Boolean,
        default: false
      },
      stickyRightShow:{
        type: Boolean,
        default: false
      },
      title: {
        type: String,
        required: true
      },
      subtitle: {
        type: String,
        default: ''
      },
      afterTitle:{
        type: String,
        default: ''
      },
      afterColor:{
        type: String,
        default: ''
      },
      value: {
        type: String,
        default: ""
      },
      width:{
        type: String,
        default:""
      },
      size: {
        type: String,
        default: ""
      },
      sizeColor:{
        type: String,
        default: "#333"
      },
      show:{
        type:Boolean,
        default:true
      },
      prompt:{//提示语不为空时将会打开 tooltip开关
        type:String,
        default:''
      },
      tooltipLeft:{//提示语内容过长 导致tooltip过长且错位时 使用该属性调整左右位置
        type:String,
        default:''
      },
      afterSize:{//后边的文字 字体大小
        type: String,
        default: ''
      },
      afterIcon:{//后边的图标名称
        type: String,
        default: ''
      },
      afterIconColor:{//后边的图标颜色
        type:String,
        default:''
      }

    },
    computed:{
      getWidth(){
        return this.width === "" ? "" : "width:" + this.width + "px"
      },
      getIcon(){
        return this.afterIcon
      }
    },
    methods:{
      //装载页面控件
      addup(category){
        if(this.value !== '') {
          if (category === "bind") {
            try {//避免为空时会在页面抛出大量红色报错
              this.p____page.sortTh.push(this)
            }catch (e) {
              // console.log(e)
            }
          } else if (category === "unbind") {
            let index = this.p____page.sortTh.indexOf(this)
            if (index !== -1) {
              this.p____page.sortTh.splice(index, 1)
            }
          }
        }
      },
      clickEvent() {
        if (this.value !== '') {
          let index = this.p____page.sortTh.indexOf(this)
          for (var i = 0; i < this.p____page.sortTh.length; i++) {
            if (i !== index) {
              this.p____page.sortTh[i].order = ""
            }
          }
          this.p____page.orderColumn = this.value
          if (this.order === "") {
            this.order = "asc"
            this.p____page.order = "asc"
          } else if (this.order === "desc") {
            this.order = "asc"
            this.p____page.order = "asc"
          } else {
            this.order = "desc"
            this.p____page.order = "desc"
          }
          this.$nextTick(() => {
            this.$emit("call")
            this.p____page.initPageData(false);
          })
        }
        this.$nextTick(() => {
          this.$emit("call")
        })
      }
    },
    created () {
      // this.$nextTick(()=>{
      //   if(this.$refs.managerth.style[0] == 'width'){
      //     this.dragTitle = ''
      //   }else{
      //     this.dragTitle = '可拖拽'
      //   }
      // })
    }
  }
</script>

<style scoped>
  *{

    box-sizing: border-box;
  }

  .sort{
    position: relative;
  }
  .sort .sort_both{
    position: absolute;
    right: 4px;
    top: 3px;
  }
  .sort .sort_desc{
    position: absolute;
    right: 4px;
    top: 6px;
  }
  .sort .sort_asc{
    position: absolute;
    right: 4px;
    top: 0;
  }
  .stickyLeftThead{
    position: sticky !important;
    left: 0;
    z-index: 90;
  }
  .stickyRightThead{
    position: sticky !important;
    right: 0;
    z-index: 90;
  }
  .tooltip {
    position: relative;
    display: inline-block;
    /*border-bottom: 1px dotted black;*/
  }

  .tooltip .tooltiptext {
    visibility: hidden;
    /*width: auto;*/
    min-width: 120px;
    background-color: #88847f;
    color: #fff;
    text-align: center;
    border-radius: 6px;
    padding: 5px 12px;
    position: absolute;
    z-index: 99;
    bottom: 125%;
    left: 50%;
    font-size: 14px;
    margin-left: -60px;
  }

  .tooltip .tooltiptext::after {
    content: "";
    position: absolute;
    top: 100%;
    left: 50%;
    margin-left: -5px;
    border-width: 5px;
    border-style: solid;
    border-color: #88847f transparent transparent transparent;
  }

  .tooltip:hover .tooltiptext {
    visibility: visible;
  }
  .tooltip .tooltiptext {
    opacity: 0;
    transition: opacity 1s;
  }

  .tooltip:hover .tooltiptext {
    opacity: 1;
  }
</style>
