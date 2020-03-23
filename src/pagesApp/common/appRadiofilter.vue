<template>
    <div>
      <p class="app_alert_title">{{title}}:</p>
      <div class="app_main_btn" >
        <span v-for="(item,index) in list" :key="index" @click="activeClick(item.num,item.showName)" :class="{active:index==ins}" class="app_alert_btn app_alert_btn2">{{item.showName}}</span>
        <span :class="{active:list.length==ins}" @click="activeClick(list.length,'全部',)" class="app_alert_btn">全部</span>
      </div>
    </div>
</template>

<script>
  export default {
    name: 'appRadiofilter',
    data(){
      return{
        ins:String,
      }
    },
    props:{
      title:{
        type: String,
        before:''
      },
      list:{
        type:Array,
        default:function () {
          return []
        }
      },
    },
    methods:{
      activeClick(index,item){//获取选中索引以及值
        let value = index
        if(item=='全部'){
          this.ins = index
          value=""
        }else{
          this.ins = index
        }
        this.$emit('change',value,item)
      },
    },
    created () {
      this.$nextTick(()=>{
        setTimeout(()=>{
          console.log(this.list.length)
          this.ins = this.list.length
        },100)
      })

    }
  }
</script>

<style lang="less" scoped>
  @rem:375/10rem;
  .app_alert_title{
    margin-bottom: 8/@rem;
    font-size: 14/@rem;
    color: #999999;
  }
  .app_main_btn{
    display: flex;
    flex-wrap: wrap;
    align-items: center;
  }
  .app_alert_btn{
    height: 35/@rem;
    line-height: 35/@rem;
    box-sizing: border-box;
    font-size: 14/@rem;
    color: #666;
    margin-right: 20/@rem;
    background-color: #fff;
    border-radius: 4/@rem;
    border: solid 1/@rem #bfbfbf;
    padding: 0 0.3rem;
    margin-bottom: 0.2rem;
  }
  .active{
    background-color:#49a9ea;
    color:#fff;
    border: 1/@rem solid #49a9ea;
  }
</style>
