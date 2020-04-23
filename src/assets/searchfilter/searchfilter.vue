<template>
  <div @mouseout="mouseoutEvent" @mouseover="mouseoverEvent" class="search" v-click-control-outside="outsideCallEvent">
    <div class="">
      <input type="text" v-model="txt" @keyup="enterEvent"  @focus="focusEvent" @click="clickEvent" />
    </div>
    <div v-show="tipShow" class="tip">
      <div class="tipCon">
        <div>
          <p v-for="(item,index) in searchList" :key="index" @click="searchEvent(item,index)">{{item.searchStr}}</p>
        </div>
      </div>
    </div>
  </div>
</template>
<!--<yhm-managersearch :value="searchStr" :history="shortcutSearchContent" id="searchStr" @call="initData"></yhm-managersearch>-->
<script>
  export default {
    name: "yhm-searchfilter",
    props: {
      value: {
        type: String,
        default: ''
      },
      id: {
        type: String,
        default: ''
      },
      searchList: {
        type: Array,
        default: function () {
          return []
        }
      }
    },
    data(){
      return{
        tipShow: false,
        txt: this.value
      }
    },
    methods: {
      mouseoutEvent(){

      },
      mouseoverEvent(){

      },
      searchEvent(item,index){
        this.txt = item.searchStr;
        this.$emit("keyup",this.txt)
        this.tipShow = false
      },
      clickEvent(){
        this.tipShow = true
      },
      enterEvent(){
        if(this.txt !==''){
          this.$emit("keyup",this.txt)
        }
        if(this.txt === ''){
          this.$emit("keyup",'0')
        }
        if(this.searchList.length > 0){
          this.tipShow = true
        }
      },
      focusEvent(){
        // this.tipShow = true
      },
      outsideCallEvent(){
        this.tipShow = false
      }
    },
    computed: {

    },
    created() {

    },
    watch: {
      value(newVal, oldVal){
        this.txt = newVal
      }
    }
  }
</script>

<style scoped lang="less">
  .search {

    margin: 100px auto 0;

    width: 200px;
    input{
      width: 100%;
      height: 25px;
      border-radius: 4px;
      border: 1px solid #49a9ea;
      text-indent: .5em;
    }
  }

  .tipCon{
    background-color: #fff;
    div{
      border: 1px solid #dedede;
      border-top: none;
      p{
        padding: 4px;
        cursor: pointer;
      }
      p:hover{
        color: #fff;
        background-color: #49a9ea;
      }
    }
  }
</style>
