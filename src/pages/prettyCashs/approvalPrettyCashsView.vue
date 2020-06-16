<template>
  <div class="f_main">
    <yhm-view-body>
      <template #title>基本信息</template>
      <template #body>
        <yhm-view-control title="所属单位" :content="unit"></yhm-view-control>
        <yhm-view-control title="申请人员" :content="person"></yhm-view-control>
        <yhm-view-control title="发票类型" :content="invoiceCategory" :psd="invoiceCategoryList"></yhm-view-control>
        <yhm-view-control type="date" title="申请日期" :content="workDate"></yhm-view-control>
        <yhm-view-control title="业务相关" :psd="isTravelList" :content="isTravel"></yhm-view-control>
        <yhm-view-control type="money" title="申请金额" :content="money"></yhm-view-control>
        <yhm-view-control title="申请编号" :content="code"></yhm-view-control>
        <yhm-view-control title="事由" :content="subject"></yhm-view-control>
        <yhm-view-control title="预计核销日期" type="date"  :content="estimateDate"></yhm-view-control>
        <yhm-view-control title="备注" :content="remark" v-if="remark!==''"></yhm-view-control>
        <yhm-view-control title="文件" :content="list" type="files" v-if="list.length !== 0"></yhm-view-control>
      </template>
    </yhm-view-body>
    <yhm-formoperate :createName="createName" :insertDate="insertDate" :updateName="updateName" :updateDate="updateDate">
      <template #btn>
        <yhm-commonbutton v-show="approval === '4'&&isApproval === '0'" :no-click="isApproval==='4'" @call="approFund()" value="拨付资金" icon="i-btn-grant" color="#be08e3"></yhm-commonbutton>
        <yhm-commonbutton v-show="(isApproval === '0' && approval !== '4' && state !== '15') || (isApproval === '1' && state!=='15' ) && isApproval !== '1'  && state !== '-1'" :no-click="isApproval!=='0'" @call="adoptEvent()" value="通过" icon="i-btn-applicationSm" color="#49a9ea" :flicker="true"></yhm-commonbutton>
        <yhm-commonbutton v-show="state !== '15' && state !== '-1' && isApproval !== '1'" :no-click="isApproval!=='0' && state!=='15'" @call="rejectEvent()"  value="驳回" icon="i-btn-turnDown" color="#FF0000" category="ten"></yhm-commonbutton>
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
        isFinish:'',
        approval:'',
        estimateDate: '',
        list: [],
        invoiceCategory: '',
        invoiceCategoryList: [],
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

              if(data){
                this.initData()
              }
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
            this.$dialog.OpenWindow({
              width: 650,
              height: 230,
              title: '审批留言',
              url: '/passMessage?id=' + this.id+ '&tableName=47&kind=0',
              closeCallBack: (data)=>{
                this.$dialog.setReturnValue(this.id)
                this.approvalNext()
              }
            })
            // let params = {
            //   id: this.id,
            //   kind: '0',
            //   tableName: '47'
            // }
            // this.$dialog.confirm({
            //   width: 300,
            //   tipValue: '是否通过?',
            //   alertImg: 'warn',
            //   okCallBack: (data)=>{
            //     this.ajaxJson({
            //       url: '/PersonOffice/approvalYesVue',
            //       data: params,
            //       call: (data)=>{
            //         if(data.type === 0){
            //           this.$dialog.setReturnValue(this.id)
            //           this.$dialog.alert({
            //             tipValue: data.message,
            //             closeCallBack: () => {
            //               this.approvalNext()
            //             }
            //           })
            //         }else{
            //           this.$dialog.alert({
            //             tipValue: data.message,
            //             alertImg: 'error',
            //             closeCallBack: () => {
            //             }
            //           })
            //         }
            //       }
            //     })
            //   }
            // })
          }
        }
      },

      approvalNext(){
        let params = {
          id: this.id,
          category: 4
        }
        this.ajaxJson({
          url: '/Com/approvalNext',
          data: params,
          call: (data)=>{
            if(data.type === 0){
              let dataID = data.id

              let txt = ''
              let width = ''
              if(data.html === '0'){
                txt = '当前批次中还有<b class="red">【' + data.message + '】</b>条没有审批,是否继续审批?'
                width = '450'
              }else if(data.html === '1'){
                txt = '检测到<b class="red">【' + data.val + '】</b>名下还有<b class="red">【' + data.message + '】</b>条没有审批,是否继续审批?'
                width = '550'
              }else{
                txt = '检测到其他人名下还有<b class="red">【' + data.message + '】</b>条没有审批,是否继续审批?'
                width = '500'
              }

              this.$dialog.confirm({
                width: width,
                height: '100',
                tipValue: txt,
                btnValueOk: '继续审批',
                btnValueCancel: '暂不审批',
                okCallBack: ()=>{
                  window.location = '/approvalPrettyCashsView?id=' + dataID + '&isApproval=' + this.isApproval+'&approval='+this.approval
                },
                cancelCallBack: ()=>{
                  this.$dialog.close()
                }
              })
            }else{
              this.$dialog.close()
            }
          }
        })
      },

      rejectEvent () {
        if(this.isApproval!=='1') {
          this.$dialog.OpenWindow({
            width: 1050,
            height: 720,
            title: '驳回理由',
            url: '/rejectReason?category=0&id=' + this.id+'&tableName=47&kind=0',
            closeCallBack: (data) => {
              if(data){
                this.$dialog.setReturnValue(this.id)
                this.approvalNext()
              }
              // if(data.type === 0){
              //   this.$dialog.setReturnValue(this.id)
              //   this.$dialog.close()
              // }else if(data.type === 1){
              //   this.$dialog.alert({
              //     tipValue: data.message,
              //     alertImg: 'error',
              //     closeCallBack: () => {
              //     }
              //   })
              // }
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
            this.invoiceCategoryList = data.invoiceCategoryPsd.list
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
            this.isFinish=data.isFinish
            this.estimateDate = data.estimateDate
            this.list = data.list
            this.invoiceCategory = data.invoiceCategory
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
