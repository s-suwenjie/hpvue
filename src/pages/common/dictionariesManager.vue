<template>
  <div>
    <yhm-managerpage>
      <!--      导航条      -->
      <template #navigation>&nbsp;字典</template>
      <template #operate>
        <!-- 操作区-->
        <yhm-radiofilter  @initData="initChoose('list')" title="字典" :content="list" all="0"></yhm-radiofilter>

      </template>
      <!--分页控件-->
      <template #pager>
        <yhm-pagination :pager="pager" @initData="initData(false)"></yhm-pagination>
      </template>
    </yhm-managerpage>
  </div>
</template>

<script>
  export default {
    name: 'dictionariesManager',
    data(){
      return{
        list:[]
      }
    },
    methods:{
      initChoose(){
        // console.log(this.list.value)
        this.$router.push({
          path: `/home/dicManager?name=`+this.list.value,
          // query: {
          //   name: this.list.value
          // }
        })
        // for(let i in this.list){
        //   if(this.list[i].num==this.value){
        //
        //   }
        // }
      },
      initData(){
        this.ajaxJson({
          url: '/Com/sourceMaterial',
          call: (data) => {
            this.list = data
            this.value = data.value
          }
        })
      }

    },
    created () {
      this.initData()
    }
  }
</script>

<style scoped>

</style>
