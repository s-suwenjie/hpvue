<template>
    <div class="f_main">
      <yhm-formbody>
        <template #title>基本信息</template>
        <template #control>
          <yhm-form-text :show="isCheckNum" title="支票号码" :value="checkNum" id="checkNum" rule="R9000"></yhm-form-text>
          <yhm-form-text :show="isCheckFir" :title="isFirWord?'首张':''" subtitle="支票号码" :value="checkFir" id="checkFir" rule="R9000"></yhm-form-text>
          <yhm-form-text :show="isCheckSheet" title="支票张数" :value="checkSheet" id="checkSheet" rule="R1300" :max-length="3"></yhm-form-text>
          <yhm-form-text :show="isCheckLast" title="末张" subtitle="支票号码" :value="checkLast" id="checkLast" rule="R9000"></yhm-form-text>
        </template>
      </yhm-formbody>
      <yhm-formoperate :createName="createName" :insertDate="insertDate" :updateName="updateName" :updateDate="updateDate">
        <template #btn>
          <yhm-commonbutton value="保存" icon="btnSave" :flicker="true" @call="save()"></yhm-commonbutton>
        </template>
      </yhm-formoperate>
    </div>
</template>

<script>
  import { formmixin } from '@/assets/form.js'
  export default {
    name: 'addCheckNumForm',
    mixins: [formmixin],
    data(){
      return{
        numType:'',
        checkNum:'',
        checkFir:'',
        checkSheet:'',
        checkLast:'',
        isCheckNum: false,
        isCheckFir: false,
        isCheckSheet: false,
        isCheckLast: false,
        quantity: '',
        isFirWord: true
      }
    },
    methods:{
      save(){
        if(this.validator()){
          let checkParams = {
            checkNum: this.checkNum,
            checkFir: this.checkFir,
            checkSheet: this.checkSheet,
            checkLast: this.checkLast,
          }
          this.$dialog.setReturnValue(checkParams)
          this.$dialog.close()
        }
      }
    },
    created () {
      this.setQuery2Value('numType')
      this.setQuery2Value('quantity')

      // if(this.numType === '0' || this.quantity === '1'){
      //   this.isCheckNum = true
      // }else if(this.numType === '1' || this.quantity === '1'){
      //   this.isCheckFir = true
      // }else if(this.numType === '2' || this.quantity === '1'){
      //   this.isCheckFir = true
      // }


      if(this.numType === '0'){
        this.isCheckNum = true
        this.isCheckSheet = false
      }else if(this.numType === '1'){
        this.isCheckFir = true
        this.isCheckSheet = true
      }else{
        this.isCheckFir = true
        this.isCheckLast = true
        this.isCheckSheet = false
      }
      if(this.quantity === '1'){
        this.isFirWord = false
        this.isCheckLast = false
        this.checkSheet = '1'
        this.isCheckSheet = false
      }
    }
  }
</script>

<style scoped>
</style>
