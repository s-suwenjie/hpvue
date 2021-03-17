<template>
  <div  class="f_main">
    <yhm-formbody>
      <template #title>基本信息</template>

      <template #control>
        <yhm-form-text ref="taxNumber" title="区县名称" @change="existShowName" :value="showName" id="showName" rule="R0000"></yhm-form-text>
        <yhm-form-radio title="是否存在地市" :select-list="categoryPsd" :value="value1" id="value1"></yhm-form-radio>
        <yhm-form-text ref="taxNumber" title="邮政编码" :value="value4" id="value4" rule="R0000"></yhm-form-text>
        <yhm-form-text ref="taxNumber" title="电话区号" :value="value2" id="value2" rule="R0000"></yhm-form-text>
        <yhm-form-text ref="taxNumber" title="电话号码位数" :value="value3" id="value3" rule="R0000"></yhm-form-text>

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
  import {formmixin} from '@/assets/form.js'
  import {number2chinese,accMul, accAdd, guid, formatTime, formatDate} from '@/assets/common.js'
  export default {
    name: 'dic16',
    mixins: [formmixin],
    data() {
      return {
        valueName1:'',
        name:'16',
        showName:'',
        value1:'1',
        value2:'',
        value3:'',
        valueName3:'',
        value4:'',
        value5:'',
        value6:'',
        value7:'',
        value8:'',
        value9:'',
        value10:'',
        value11:'',
        value12:'',
        categoryPsd:[
          {
            code:'',
            num:'0',
            img:'',
            showName:'是',
          },
          {
            code:'',
            num:'1',
            img:'',
            showName:'否',
          },
        ]
      }
    },
    created(){
      this.setQuery2Value('value12')
    },
    methods:{
      selectProvince(){
        this.$dialog.OpenWindow({
          width: 950,
          height: 690,
          url: '/selectDic?name=15',
          title: '选择省市县',
          closeCallBack: (data) => {
            if (data) {
              this.value1=data.id
              this.valueName1=data.showName
            }
          }
        })
      },
      existShowName() {
        let param={
          id:this.id,
          name:this.name,
          showName:this.showName
        }
        this.ajaxJson({
          url: '/Com/verifyShowName',
          data: param,
          call: (data) => {
            if(data.type===0){
              this.$dialog.alert({
                tipValue: '城市名称已存在!',
                alertImg: 'error',
                closeCallBack: () => {
                  this.showName=''
                }
              })
            }
          }
        })
      },
      save(){
        let a = this.validator()
        if(a){
          let param={
            id:this.id,
            name:'16',
            showName:this.showName,
            value1:this.value1,
            value2:this.value2,
            value3:this.value3,
            valueName3:this.valueName3,
            value4:this.value4,
            value5:this.value5,
            value6:this.value6,
            value7:this.value7,
            value8:this.value8,
            value9:this.value9,
            value10:this.value10,
            value11:this.value11,
            value12:this.value12,
          }
          this.ajaxJson({
            url: '/Com/dicVueSave',
            data: param,
            call: (data) => {
              if(data.type===0){
                this.$dialog.setReturnValue(this.id)
                this.$dialog.alert({
                  tipValue: data.message,
                  closeCallBack: () => {
                    this.$dialog.close()
                  }
                })
              }else{
                this.$dialog.alert({
                  tipValue: data.message,
                  alertImg: 'error',
                  closeCallBack: () => {
                    this.$dialog.close()
                  }
                })
              }
            }
          })
        }else{
          this.$dialog.alert({
            tipValue: '您未完整填写数据!',
            alertImg: 'error',
            closeCallBack: () => {
            }
          })
        }

      }
    }
  }
</script>

<style scoped>

</style>
