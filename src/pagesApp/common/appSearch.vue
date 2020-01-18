<template>
    <div>
      <div class="search">
        <div class="search_center">
          <div class="search_left">
            <input type="text" v-model="search" @blur="blurEvent" @focus="focusEvent" @keyup.enter="keyupEvent" placeholder="请输入搜索">
            <i class="icon-search search_icon" @click="blurEvent"></i>
            <div class="search_frequently" v-show="searchFrequentlyShow">
              <p v-for="(item,index) in list" @click="searchEvent(item.searchStr)" :key="index">TOP{{index}}:{{item.searchStr}}</p>
            </div>
          </div>
          <slot>

          </slot>
        </div>
      </div>
    </div>
</template>

<script>
  export default {
    name: 'appSearch',
    data(){
      return{

      }
    },
    props:{
      search:{
        type:String,
        before:''
      },
      leftAlert:{
        type:Boolean,
        before: false
      },
      list:{
        type:Array,
        default:function () {
          return []
        }
      },
      searchFrequentlyShow:{
        type:Boolean,
        before:true
      }
    },
    methods:{
      searchEvent(searchStr){
        this.searchStr = searchStr
        this.search = searchStr
        this.initPageData(false)
        this.searchFrequentlyShow = false
      },
      keyupEvent(){
        if(event.keyCode==13){
          this.initPageData(false)
          this.searchFrequentlyShow = false
          this.$emit('keyup')
        }
      },
      blurEvent(){
        setTimeout(()=>{
          this.searchFrequentlyShow = false
        },50)
        if(this.search == ''){return}
        this.initPageData(false)
        this.$emit('blur')
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
    border-radius: 12/@rem;
    padding-left: 6/@rem;
    box-shadow: 1/@rem 2/@rem 2/@rem 1/@rem #E6E6E6;
  }
  input::-webkit-input-placeholder{
    color: #BFBFBF;
  }

  .search_icon{
    font-size: 18/@rem;
    position: absolute;
    right: 8/@rem;
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
    height: 22/@rem;
    line-height: 22/@rem;
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
