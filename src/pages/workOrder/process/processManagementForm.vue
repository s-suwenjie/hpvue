<template>
  <div class="f_main">
    <yhm-formbody>
      <template #title>基本信息</template>
      <template #control>
        <yhm-form-text title="服务名称" :value="proName" id="proName" rule="R0000"></yhm-form-text>
        <yhm-form-text title="服务编号" :value="proNum" id="proNum"></yhm-form-text>
        <yhm-form-text title="成本" :value="baseprice" id="baseprice" @blur="basepriceChange" rule="R2100"></yhm-form-text>
        <yhm-form-text title="服务工时" :value="hours" id="hours"></yhm-form-text>
        <yhm-form-text title="考核工时" :value="assessment" id="assessment"></yhm-form-text>

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
        hours:'0',//服务工时
        assessment:'0',//考核工时
      }
    },
    methods:{
      basepriceChange(){
        if((this.baseprice+'').indexOf('-')!=-1){
          // let arr = this.baseprice.split("");
          // arr.splice((this.baseprice+'').indexOf('-'),1);
          // this.baseprice = arr.join("");
          // if((this.baseprice+'').indexOf('-')==0){
          //   this.baseprice = 0
          // }
          this.baseprice = this.baseprice.replace(/[^\w^\s^\u4e00-\u9fa5]/gi, '')
        }else{
          this.baseprice = parseFloat(this.baseprice).toFixed(2)
        }
      },
      hoursChange(){
        this.baseprice = (Number(this.hours)*100)
      },
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
                this.$dialog.setReturnValue(this.id)
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
            if(data.assessment==null){
              this.assessment = 0
            }else{
              this.assessment = data.assessment
            }
            this.baseprice = data.baseprice
          }
        })
      }
    },
    created () {
      this.setQuery2Value('id')
      this.setQuery2Value('type')
      if(this.type=='1'){
        // this.updateDate = formatDate(new Date())
        // this.proName = 'QWE' + Math.ceil(Math.random()*100000) + Math.ceil(Math.random()*1000) + ''
        // this.proNum = 'W' + Math.ceil(Math.random()*1000000) + Math.ceil(Math.random()*100000) + ''
        // this.hours = Math.ceil(Math.random()*100) + ''
        // this.assessment = Math.ceil(Math.random()*100) + ''
      }else{
        this.initData()
      }
    }
  }
</script>

<style scoped>

</style>
