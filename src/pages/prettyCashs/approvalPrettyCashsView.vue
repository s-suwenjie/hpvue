<template>
  <div class="f_main">
    <yhm-view-body>
      <template #title>基本信息</template>
      <template #body>
        <yhm-view-control title="所属单位" :content="unit"></yhm-view-control>
        <yhm-view-control title="申请人员" :content="person"></yhm-view-control>
        <yhm-view-control type="date" title="申请日期" :content="workDate"></yhm-view-control>
        <yhm-view-control title="业务相关" :psd="isTravelList" :content="isTravel"></yhm-view-control>
        <yhm-view-control type="money" title="申请金额" :content="money"></yhm-view-control>
        <yhm-view-control title="申请编号" :content="code"></yhm-view-control>
        <yhm-view-control title="事由" :content="subject"></yhm-view-control>
        <yhm-view-control title="预计核销日期" type="date"  :content="estimateDate"></yhm-view-control>
        <yhm-view-control title="备注" :content="remark" v-if="remark!==''"></yhm-view-control>
      </template>
    </yhm-view-body>
    <yhm-formoperate :createName="createName" :insertDate="insertDate" :updateName="updateName" :updateDate="updateDate">
      <template #btn>
        <yhm-commonbutton v-show="approval === '4'&&isApproval === '0'" :no-click="isApproval==='4'" @call="approFund()" value="拨付资金" icon="i-btn-grant" color="#be08e3"></yhm-commonbutton>
        <yhm-commonbutton v-show="(isApproval === '0'&& approval !== '4')||isApproval === '1'" :no-click="isApproval!=='0'" @call="adoptEvent()" value="通过" icon="i-btn-applicationSm" color="#49a9ea" :flicker="true"></yhm-commonbutton>
        <yhm-commonbutton :no-click="isApproval!=='0'" @call="rejectEvent()"  value="驳回" icon="i-btn-turnDown" color="#FF0000" category="ten"></yhm-commonbutton>
      </template>
    </yhm-formoperate>
  </div>
</template>

<script>
  import { formmixin } from '@/assets/form.js'
  export default {
    name: 'approvalPrettyCashsView',
    mixins: [formmixin],
    data(){
      return{
        unitID:'',
        unit:'',
        person:'',
        personID:'',
        workDate:'',
        code:'',
        isTravel:'',
        isTravelList:[],
        money:'',
        remark:'',
        isAdd:'',
        subject:'',
        subjectID:'',
        state:'',
        isApproval:'',
        approval:'',
        estimateDate: ''
      }
    },
    methods:{
      /* 拨付资金 */
      approFund(){
        if(this.approval === '4'){
          this.$dialog.OpenWindow({
            width: '1050',
            height: '690',
            title: '拨付资金',
            url: '/bankDetailForm?ownerID=' + this.id +'&bankDetailType=' + '5' + '&directionBefore=1',
            closeCallBack: (data)=>{
              this.initPageData(false)
            }
          })
        }else{
          this.$dialog.alert({
            tipValue: '已拨付'
          })
        }
      },
      adoptEvent () { //
        if(this.isApproval!=='1'){
          if(this.id){
            let params = {
              id: this.id,
              kind: '0',
              tableName: '47'
            }
            this.$dialog.confirm({
              width: 300,
              tipValue: '是否通过?',
              alertImg: 'warn',
              okCallBack: (data)=>{
                this.ajaxJson({
                  url: '/PersonOffice/approvalYesVue',
                  data: params,
                  call: (data)=>{
                    if(data.type === 0){
                      this.$dialog.setReturnValue(this.id)
                      this.$dialog.alert({
                        tipValue: data.message,
                        closeCallBack: () => {
                          this.$dialog.close()
                        }
                      })
                    }else if(data.type === 1){
                      this.$dialog.alert({
                        tipValue: data.message,
                        alertImg: 'error',
                        closeCallBack: () => {
                        }
                      })
                    }
                  }
                })
              }
            })
          }
        }
      },
      rejectEvent () {
        if(this.isApproval!=='1') {
          this.$dialog.OpenWindow({
            width: 1050,
            height: 720,
            title: '驳回理由',
            url: '/rejectReason?category=0&id=' + this.id+'&tableName=47&kind=0',
            closeCallBack: (data) => {
              if(data.type === 0){
                this.$dialog.setReturnValue(this.id)
                this.$dialog.close()
              }else if(data.type === 1){
                this.$dialog.alert({
                  tipValue: data.message,
                  alertImg: 'error',
                  closeCallBack: () => {
                  }
                })
              }
            }
          })
        }
      },
      initData(){
        this.init({
          url: '/PersonOffice/prettyCashsForm',
          all: (data)=>{
            this.isTravel=data.isTravelPsd.value
            this.isTravelList=data.isTravelPsd.list
            this.unit = data.unit
            this.unitID=data.unitID
          },
          add: (data)=>{

          },
          look: (data)=>{
            this.personID=data.personID
            this.person=data.person
            this.money=data.money
            this.code=data.code
            this.workDate=data.workDate
            this.subject=data.subject
            this.subjectID=data.subjectID
            this.remark=data.remark
            this.state=data.state
            this.estimateDate = data.estimateDate
          }
        })
      }
    },
    created () {
      this.setQuery2Value('isApproval')
      this.setQuery2Value('approval')
      this.initData()
    }
  }
</script>

<style scoped>

</style>
