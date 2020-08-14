<template>
  <div class="f_main">
    <yhm-formbody>
      <template #title>基本信息</template>
      <template #control>
        <yhm-form-text title="服务名称" :value="proName" id="proName"></yhm-form-text>
        <yhm-form-text title="服务编号" :value="proNum" id="proNum"></yhm-form-text>
        <yhm-form-text title="成本" :value="baseprice" id="baseprice" rule="R2100"></yhm-form-text>
        <yhm-form-text title="服务工时" :value="hours" id="hours" rule="R2100"></yhm-form-text>
        <yhm-form-text title="考核工时" :value="assessment" id="assessment" rule="R2100"></yhm-form-text>

      </template>
    </yhm-formbody>
    <yhm-formoperate>
      <template #btn>
        <yhm-commonbutton value="保存" icon="btnSave" :flicker="true" @call="save()"></yhm-commonbutton>
      </template>
    </yhm-formoperate>
  </div>
</template>

<script>
  import { formmixin } from '@/assets/form.js'
  import { guid, formatDate, formatTime } from '@/assets/common.js'
  export default {
    name: 'processManagementForm',
    mixins: [formmixin],
    data(){
      return{
        // currentDate:formatDate(new Date()),//当前日期
        type:'',//服务类型
        proName:'',//服务名称
        proNum:'',//服务编号
        baseprice:'0',//成本
        hours:'',//服务工时
        assessment:'',//考核工时
      }
    },
    methods:{
      save(){
        let a = this.validator()
        if(a){
          let params = {
            id:this.id,
            proName:this.proName,//服务名称
            proNum:this.proNum,//服务编号
            hours:this.hours,//服务工时
            baseprice:this.baseprice,//成本
            assessment:this.assessment,//考核工时
          }
          this.ajaxJson({
            url: '/fix/fixProduct/save',
            data: params,
            call: (data)=>{
              if (data.type == 0) {
                this.$dialog.alert({
                  tipValue: data.message,
                  closeCallBack: () => {
                    this.$dialog.close()
                  }
                })
              } else{
                this.$dialog.alert({
                  alertImg: 'error',
                  tipValue: data.message,
                  closeCallBack: () => {
                  }
                })
              }
            }
          })
        }
      },
      initData () {
        let params = {
          id:this.id,
        }
        this.ajaxJson({
          url: '/fix/fixProduct/initForm',
          data: params,
          call: (data)=>{
            this.proName = data.proName
            this.proNum = data.proNum
            this.hours = data.hours
            this.assessment = data.assessment
            this.baseprice = data.baseprice
          }
        })
      }
    },
    created () {
      this.setQuery2Value('id')
      this.setQuery2Value('type')
      console.log(  this.id)
      if(this.type=='1'){
        // this.updateDate = formatDate(new Date())
        this.proName = 'QWE' + Math.ceil(Math.random()*100000) + Math.ceil(Math.random()*1000) + ''
        this.proNum = 'W' + Math.ceil(Math.random()*1000000) + Math.ceil(Math.random()*100000) + ''
        this.hours = Math.ceil(Math.random()*100) + ''
        this.assessment = Math.ceil(Math.random()*100) + ''
      }else{
        this.initData()
      }

      // console.log(formatDate(new Date()) )
    }
  }
</script>

<style scoped>

</style>
