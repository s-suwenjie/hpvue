<template>
  <div class="f_main">
    <yhm-view-body>
      <template #title>基本信息</template>
      <template #body>
        <yhm-view-control title="showName" :content="showName"></yhm-view-control>
        <yhm-view-control title="value1" :content="value1"></yhm-view-control>
        <yhm-view-control title="value2" :content="value2"></yhm-view-control>
        <yhm-view-control title="value3" :content="value3"></yhm-view-control>
        <yhm-view-control title="value4" :content="value4"></yhm-view-control>
        <yhm-view-control title="value5" :content="value5"></yhm-view-control>
        <yhm-view-control title="value6" :content="value6"></yhm-view-control>
        <yhm-view-control title="value7" :content="value7"></yhm-view-control>
        <yhm-view-control title="value8" :content="value8"></yhm-view-control>
        <yhm-view-control title="value9" :content="value9"></yhm-view-control>
        <yhm-view-control title="value10" :content="value10"></yhm-view-control>
        <yhm-view-control title="value11" :content="value11"></yhm-view-control>
        <yhm-view-control title="value12" :content="value12"></yhm-view-control>
      </template>
    </yhm-view-body>
    <yhm-formoperate :createName="createName" :insertDate="insertDate" :updateName="updateName" :updateDate="updateDate">

    </yhm-formoperate>
  </div>

</template>

<script>
  import { viewmixin } from '@/assets/view.js'
  export default {
    name: 'dicView',
    mixins: [viewmixin],
    data (){
      return {
        showName:'',
        value1:'',
        value2:'',
        value3:'',
        value4:'',
        value5:'',
        value6:'',
        value7:'',
        value8:'',
        value9:'',
        value10:'',
        value11:'',
        value12:'',
        insertDate:'',
        createName:'',
        updateName:'',
        updateDate:'',

      }
    },
    methods: {

      initData(){
        let params = {
          id: this.id,
        }
        this.ajaxJson({
          url: '/Com/getDicVueByID',
          data: params,
          call: (data) => {
            this.showName = data.showName
            this.value1 = data.value1
            this.value2 = data.value2
            this.value3 = data.value3
            this.value4 = data.value4
            this.value5 = data.value5
            this.value6 = data.value6
            this.value7 = data.value7
            this.value8 = data.value8
            this.value9 = data.value9
            this.value10 = data.value10
            this.value11 = data.value11
            this.value12 = data.value12

            this.updateName = data.updateName
            this.updateDate = data.updateDate
            this.insertDate = data.insertDate
            this.createName = data.createName
          }
        })
        // this.init({
        //   url: '/Basic/personVueForm',
        //   data: params,
        //   all: (data)=>{
        //
        //   },
        //   add: (data)=>{
        //
        //   },
        //   look: (data)=>{
        //
        //   }
        // })
      }
    },
    created () {
      this.initData()
      // this.setQuery2Value('isBilling')
    },
  }
</script>

<style scoped>

</style>
