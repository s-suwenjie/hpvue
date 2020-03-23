<template>
    <div>
      <div class="search">
        <div class="search_center">
          <div class="search_left" :class="{'search_auto':btnShow}">
            <input type="text" v-model="search" @focus="focusEvent" @blur="blurEvent" @keyup.enter="keyupEvent" placeholder="请输入搜索">
            <i class="icon-search search_icon" @click="blurEvent"></i>
            <div class="search_frequently" v-show="searchFrequentlyShow">
              <p v-for="(item,index) in list" @click="searchEvent(item.searchStr)" :key="index">TOP{{index+1}}:{{item.searchStr}}</p>
            </div>
          </div>
          <span class="search_btn" v-show="!btnShow"  @click="filtrate">筛选</span>
        </div>
      </div>
      <!-- 父组件引用示例 -->
      <!-- <appSearch 
      @change="change" //用户触发回车 点击搜索图标 失去焦点事件时这个函数会返回value值,在当前函数下赋值并调用搜索接口即可
      @alertShow="" //用户点击筛选按钮的事件
      :list="shortcutSearchContent"  //常用搜索记录的数组
      :rightAlert="rightAlert">//筛选框的show值
      </appSearch> -->

    </div>
</template>

<script>
  export default {
    name: 'appSearch',
    data(){
      return{
        searchFrequentlyShow:false,
        search:'',
      }
    },
    props:{
      btnShow:{//是否开启筛选按钮
        type:Boolean,
        before: false
      },
      list:{
        type:Array,
        default:function () {
          return []
        }
      },
    },
    methods:{
      filtrate(){//筛选按钮的点击事件
        this.$emit('alertShow')
      },
      changeEvent(value){//当前函数接收用户收起键盘 回车搜索时的值
          this.$emit('change',value)
      },
      searchEvent(search){//用户点击常用搜索内容时
        this.search = search         
        this.searchFrequentlyShow = false
      },
      keyupEvent(){
        if(event.keyCode==13){
          this.searchFrequentlyShow = false
          this.changeEvent(this.search)
        }
      },
      blurEvent(){
        setTimeout(()=>{
           this.searchFrequentlyShow = false
        },100)
        setTimeout(()=>{
          // if(this.search == ''){return}
          this.changeEvent(this.search)
        },0)
      },
      focusEvent(){
        this.searchFrequentlyShow = true
        this.$emit('focus')
      },
    }
  }
</script>

<style scoped lang="less">
  @rem:375/10rem;
  .search_auto{
    margin: 0 !important;
  }
  .search{
    font-size: 14/@rem;
    padding: 11/@rem 16/@rem 5/@rem 16/@rem;

  .search_center{
    flex: 1;
    display: flex;
    justify-content: space-between;
  .search_left{
    position: relative;
    width: 100%;
    margin-right:16/@rem;

  input{
    width: 100%;
    height: 29/@rem;
    font-size: 15/@rem;
    border-radius: 12/@rem;
    padding-left: 6/@rem;
    box-shadow: 1/@rem 2/@rem 2/@rem 1/@rem #E6E6E6;
    box-sizing: border-box;
    padding-right:36/@rem;
  }
  input::-webkit-input-placeholder{
    color: #BFBFBF;
  }

  .search_icon{
    font-size: 18/@rem;
    position: absolute;
    right: 10/@rem;
    top: 5/@rem;
  }
  .search_frequently{
    width: 100%;
    margin-top: 2/@rem;
    transition: all 0.5s;
    height: auto;
    box-shadow: 1/@rem 2/@rem 2/@rem 1/@rem #E6E6E6;
    border-radius: 4/@rem;
    background-color: #fff;
  p{
    overflow: hidden;
    height:30/@rem;
    display: flex;
    align-items: center;
    padding-left: 6/@rem;

  }
  p:nth-child(even){
    background-color: #dcdbdb;
  }
  }
  }
  .search_btn{
    display:inline-flex;
    width: 56/@rem;
    height: 28/@rem;
    align-items: center;
    justify-content: center;
    background-color: #fff;
    color: #49A9EA;
    border-radius: 4/@rem;
    box-shadow: 1/@rem 2/@rem 2/@rem 1/@rem #E6E6E6;
  }
  }

  }
</style>
