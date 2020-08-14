<template>
    <div>
      <yhm-app-form-body>
        <template #title>基本信息{{category}}</template>
        <template #operate>基本信息</template>
        <template #controls>
          <yhm-app-form-text-box :value="name" id="name" rule="R0000"></yhm-app-form-text-box>
          <yhm-app-form-radio-button :value="category" id="category" :list="categoryList"></yhm-app-form-radio-button>
          <yhm-app-form-date-box rule="#" title="日期" min="2019-12-02" max="2019-12-20" :value="workDate" id="workDate"></yhm-app-form-date-box>
          <yhm-app-form-select @call="selectUnit" title="选择" :value="unit" id="unit" rule="#"></yhm-app-form-select>
          <yhm-app-form-upload :owner-id="id" :value="fileList" id="fileList" rule="#"></yhm-app-form-upload>


          <br><br><br><br><br><br><br><br><br><br><br><br><br><br>1
        </template>
      </yhm-app-form-body>
      <div class="af_split_bottom"></div>

      <yhm-app-form-operate>
        <!--<yhm-app-button @call="save" value="保存"></yhm-app-button>-->
        <yhm-app-button @call="save" category="two"></yhm-app-button>
        <yhm-app-button @call="save" category="three"></yhm-app-button>
        <yhm-app-button @call="save" category="four"></yhm-app-button>
        <yhm-app-button @call="save" category="ten"></yhm-app-button>
      </yhm-app-form-operate>
    </div>
</template>

<script>
  import { accMul, accAdd, guid, formatDate,formatTime } from '@/assets/common.js'
  export default {
    name: 'testApp',
    provide(){
      return{
        p____page:this
      }
    },
    data(){
      return {
        id:'11111',
        fileList: [], // 单据
        name:'',
        workDate:'',
        category:'0',
        unit:'',
        categoryList:[{"showName":"本单位","num":"0","code":"#0000ff"},{"showName":"外单位","num":"1","code":"#00a8a8"}],

        p____rule:[]
      }
    },
    methods : {
      aaa(){
        return false
      },
      selectUnit(){
        this.$appDialog.openWindow()
      },
      save(){
        if(this.validator()){
        }
        else{
        }
      }
    },
    computed : {

    }
  }
</script>

<style scoped>

</style>
