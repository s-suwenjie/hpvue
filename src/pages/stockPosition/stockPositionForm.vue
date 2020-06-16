<template>
  <div class="f_main">
    <yhm-formbody>
      <template #title>基本信息</template>
      <template #control>
        <yhm-form-radio title="库位类型" :select-list="categoryList" :value="category" id="category"></yhm-form-radio>
        <yhm-form-text title="库位名称" :value="name" id="name" rule="R0000"></yhm-form-text>
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
    name: 'stockPositionForm',
    mixins: [formmixin],
    data () {
      return {
        category: '',
        categoryList: [] ,
        name:''
      }
    },
    methods:{
      save(){
        let a = this.validator()
        if(a){
          let params = {
            id: this.id,  //id
            name: this.name,   //单位名称
            category: this.category
          }
          this.ajaxJson({
            url: '/stock/stockPosition/save',
            data: params,
            call: (data) => {
              if (data.type === 0) {
                this.$dialog.setReturnValue(this.id)
                this.$dialog.alert({
                  alertImg: 'ok',
                  tipValue: data.message,
                  closeCallBack: () => {
                    this.$dialog.close()
                  }
                })
              } else {
                this.$dialog.alert({
                  alertImg: 'warn',
                  tipValue: data.message
                })
              }
            }
          })
        }
      }
    },
    created () {
      this.setQuery2Value('type')
      this.setQuery2Value('id')
      let params = {}
      if(this.type=='1'){
        params = {}
      }else{
        params = {
          id:this.id
        }
      }

      this.init({
        url: '/stock/stockPosition/initForm',
        data:params,
        all: (data)=>{
          this.categoryList = data.categoryPsd.list
          this.category = data.categoryPsd.value
        },
        add: (data)=>{

        },
        look: (data)=>{
          this.name = data.name
        }
      })
    }
  }
</script>

<style scoped>

</style>
