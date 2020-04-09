<template>
  <th class="sort disable_menu" @click="clickEvent" v-lplload="addup" :style="getWidth">
    <span :style="{color:beforeColor}">{{beforeTitle}}</span><span>{{title}}</span><span :style="{color:afterColor}">{{afterTitle}}</span>
    <template v-if="value !== ''">
    <div v-show="this.order === ''" class="sort_both">
      <img src="./images/sort_both.png">
    </div>
    <div v-show="this.order === 'desc'" class="sort_desc">
      <img src="./images/sort_desc.png">
    </div>
    <div v-show="this.order === 'asc'" class="sort_asc">
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
      }
    },
    props: {
      beforeTitle:{
        type: String,
        default: ''
      },
      beforeColor:{
        type: String,
        default: ''
      },
      title: {
        type: String,
        required: true
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
      }
    },
    computed:{
      getWidth(){
        return this.width === "" ? "" : "width:" + this.width + "px"
      }
    },
    created(){

    },
    methods:{
      //装载页面控件
      addup(category){
        if(this.value !== '') {
          if (category === "bind") {
            this.p____page.sortTh.push(this)
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
    right: 0;
    top: 3px;
  }
  .sort .sort_desc{
    position: absolute;
    right: 0;
    top: 6px;
  }
  .sort .sort_asc{
    position: absolute;
    right: 0;
    top: 0;
  }
</style>
