<template>
  <div class="chooseBtnBox lplRadio">
    <p class="btnLine"></p>
    <p class="btnTit">{{title}}：</p>
    <div class="chooseContent">
      <button v-for="(item,index) in content.list" :key="index" :style="{'color':item.code}" @click="clickEvent($event,item.num)" class="btn" type="button" :class="{choice:item.num === content.value}">{{item.showName}}</button>
      <button v-if="all == '1'" @click="clickEvent($event,'')" class="btn" type="button" :class="{choice:content.value === ''}">全部</button>
    </div>
  </div>
</template>

<script>
    export default {
        name: "yhm-radiofilter",
        props:{
          title: String,
          all:{
            type:String,
            default:"1"
          },
          content:{
            value:String,
            list:Array
          },
          before:{
            type:String,
            default: "0"
          }
        },
        methods:{
          clickEvent(event,num){
            event.target.blur()
            if(this.before === "0") {
              this.content.value = num
              this.$emit("initData");
            }
          },
        }
    }
</script>

<style scoped>
  *{
    padding: 0;
    border: 0;
    margin: 0;
    box-sizing: border-box;
  }
  .chooseBtnBox {
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-right: 30px;
  }
  .chooseBtnBox .btnLine {
    width: 3px;
    height: 20px;
    background-color: #49a9ea;
    margin-right: 10px;
  }
  .chooseBtnBox .btnTit {
    color: #999;
    white-space: nowrap;
  }

  .chooseBtnBox .chooseContent {
    border: 1px solid #dedede;
    border-radius: 5px;
    display: flex;
    flex-direction: row;
  }
  .chooseBtnBox .chooseContent .btn {
    height: 30px;
    border-right: 1px solid #dedede;
    padding: 0 15px;
    cursor: pointer;
    color: #333;
    font-size: 12px;
    background-color: #FFF;
  }
  .chooseBtnBox .chooseContent .btn:first-child {
    border-radius: 5px 0 0 5px;
  }
  .chooseBtnBox .chooseContent .btn:last-child {
    border-right: none;
    border-radius: 0 5px 5px 0;
  }

  .chooseBtnBox .chooseContent .btn:hover{
    background-color: #49a9ea !important;
    color: #fff !important;
  }
  .chooseBtnBox .chooseContent .choice {
    background-color: #49a9ea !important;
    color: #fff !important;
  }
</style>
