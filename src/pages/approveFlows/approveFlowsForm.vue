<template>
  <div class="f_main">
    <yhm-formbody>
      <template #title>基本信息</template>
      <template #control>
        <yhm-form-text no-edit="1" title="所属公司" :value="unit" id="unit" rule="R0000"></yhm-form-text>
        <yhm-form-text title="高层" subtitle="审批额度" :value="topQuota" id="topQuota" rule="R3000"></yhm-form-text>
        <yhm-form-radio title="部门无权" subtitle="越级审批" :select-list="isIumpHighLevelByAmountList" :value="isIumpHighLevelByAmount" id="isIumpHighLevelByAmount"></yhm-form-radio>
        <yhm-form-text title="高层领导" subtitle="审批额度" :value="highLevel" id="highLevel" rule="R3000"></yhm-form-text>
        <yhm-form-radio width="1" title="流程类型" :select-list="categoryList" :value="category" id="category"></yhm-form-radio>
        <yhm-form-radio width="1" title="流程等级" :select-list="gradeList" :value="grade" id="grade"></yhm-form-radio>
        <yhm-form-text title="通知地址" :value="noticeUrl" id="noticeUrl"></yhm-form-text>
        <yhm-form-text title="审批地址" :value="approveUrl" id="approveUrl" rule="R0000"></yhm-form-text>
        <yhm-form-text title="驳回" subtitle="通知地址" :value="rejectNoticeUrl" id="rejectNoticeUrl" rule="R0000"></yhm-form-text>
        <yhm-form-text title="抄送地址" :value="ccUrl" id="ccUrl" rule="R0000"></yhm-form-text>

      </template>
    </yhm-formbody>
    <div class="f_split"></div>
    <yhm-form-list-show v-show="showDetails">
      <template #title>审批流程节点管理</template>
      <template #operate>
        <yhm-commonbutton value="添加审批流程节点" icon="btnAdd" @call="add()"></yhm-commonbutton>
      </template>
      <template #listHead>
        <yhm-managerth style="width: 38px" title="查看"></yhm-managerth>
        <yhm-managerth style="width: 60px" title="步骤"></yhm-managerth>
        <yhm-managerth title="审批类型"></yhm-managerth>
        <yhm-managerth style="width: 70px" title="节点类型"></yhm-managerth>
        <yhm-managerth style="width: 55px" title="转申"></yhm-managerth>
        <yhm-managerth style="width: 55px" title="代理"></yhm-managerth>
        <yhm-managerth style="width: 120px" title="节点名称"></yhm-managerth>
        <yhm-managerth style="width: 50px" title="值"></yhm-managerth>
        <yhm-managerth style="width: 55px" title="驳回"></yhm-managerth>
        <yhm-managerth style="width: 55px" title="审批"></yhm-managerth>
        <yhm-managerth style="width: 55px" title="抄送"></yhm-managerth>
        <yhm-managerth style="width: 130px" title="驳回节点名称"></yhm-managerth>
        <yhm-managerth style="width: 50px" title="值"></yhm-managerth>
        <yhm-managerth style="width: 80px" title="操作"></yhm-managerth>
      </template>
      <template #listBody>
        <tr v-for="(item,index) in flowDetails" :key="index" :class="{InterlacBg:index%2!==0}">
          <yhm-manager-td-look @click="add(item.id)"></yhm-manager-td-look>
          <yhm-manager-td-center-html>第<b class="red">{{item.orderNum}}</b>步</yhm-manager-td-center-html>
          <yhm-manager-td-psd :value="item.category" :list="flowCategoryList"></yhm-manager-td-psd>
          <yhm-manager-td-psd :value="item.approveCategory" :list="approveCategoryList"></yhm-manager-td-psd>
          <yhm-manager-td-yesno :value="item.isTransferApprove == 0 ? '1':'0'"></yhm-manager-td-yesno>
          <yhm-manager-td-yesno :value="item.isProxy == 0 ? '1':'0'"></yhm-manager-td-yesno>
          <yhm-manager-td-icon-txt-color :color="item.titleColor" :icon="item.titleUrl" :show-name="item.title"></yhm-manager-td-icon-txt-color>
          <yhm-manager-td-center :value="item.titleVal"></yhm-manager-td-center>
          <yhm-manager-td-yesno :value="item.isReject == 0 ? '1':'0'"></yhm-manager-td-yesno>
          <yhm-manager-td-yesno :value="item.isApproval == 0 ? '1':'0'"></yhm-manager-td-yesno>
          <yhm-manager-td-yesno :value="item.isAuto == 0 ? '1':'0'"></yhm-manager-td-yesno>
          <yhm-manager-td-icon-txt-color :is-empty="item.isReject == 0" :color="item.rejectTitleColor" :icon="item.rejectTitleUrl" :show-name="item.rejectTitle"></yhm-manager-td-icon-txt-color>
          <yhm-manager-td-center :is-empty="item.isReject == 0" :value="item.rejectTitleVal"></yhm-manager-td-center>
          <yhm-manager-td-operate>
            <yhm-manager-td-operate-customize style="margin-right: 10px" @click="upEvent(item)" :no-click="item.orderNum == 1" icon="i-income" color="#c700df"></yhm-manager-td-operate-customize>
            <yhm-manager-td-operate-customize style="margin-right: 10px" @click="downEvent(item)" :no-click="item.orderNum == flowDetails.length" icon="i-expenditure" color="#49a9ea"></yhm-manager-td-operate-customize>
            <yhm-manager-td-operate-delete @click="delDetail(item)"></yhm-manager-td-operate-delete>
          </yhm-manager-td-operate>
        </tr>
      </template>
      <template #empty>
        <span class="m_listNoData" v-show="empty">暂时没有数据</span>
      </template>
    </yhm-form-list-show>
    <yhm-formoperate :createName="createName" :insertDate="insertDate" :updateName="updateName" :updateDate="updateDate">
      <template #btn>
        <yhm-commonbutton value="保存" icon="btnSave" :flicker="true" @call="save()"></yhm-commonbutton>
      </template>
    </yhm-formoperate>
  </div>
</template>

<script>
  import { formmixin } from '@/assets/form.js'
  import ViewCheck from '../check/checkOpera/viewCheck'
  export default {
    name: 'approveFlowsForm',
    components: { ViewCheck },
    mixins: [formmixin],
    data () {
      return {
        showDetails:false,
        unitID: '',
        unit: '',
        topQuota: '', // 高层审批额度
        isIumpHighLevelByAmount: '', // 部门无权越级审批
        highLevel: '', // 高层领导审批额度
        category: '', // 流程类型
        grade:'',//流程等级

        noticeUrl:'',       //通知地址
        approveUrl:'',      //审批地址
        rejectNoticeUrl:'', //驳回通知地址
        ccUrl:'',           //抄送地址

        isIumpHighLevelByAmountList: [], // 部门无权越级审批选项
        categoryList: [], // 流程类型选项
        approveCategoryList:[],//审批节点类型
        gradeList: [],//流程等级选项
        flowCategoryList:[],  //审批流程节点类型
        flowDetails: [],
        empty: true
      }
    },
    methods:{
      add (id) {
        if (!id) {
          id = ''
        }
        this.$dialog.OpenWindow({
          width: 1050,
          height: 680,
          title: '添加审批流程节点信息',
          url:'/approveFlowsDetailForm?id=' + id + "&ownerID=" + this.id,
          closeCallBack:(data) => {
            if(data){
              this.$dialog.setReturnValue(this.id)
              this.initPageChildDate()
            }
          }
        })
      },
      initPageChildDate(){
        let params = {
          ownerID:this.id
        }
        this.ajaxJson({
          url: '/sys/approveFlowDetail/getManager',
          data: params,
          call: (data) => {
            if(data){
              this.flowDetails = data
              this.empty = this.flowDetails.length === 0
            }
          }
        })
      },
      upEvent(item){
        this.$dialog.confirm({
          tipValue: '确定将此流程节点向上调整顺序吗？',
          btnValueOk: '向上调整',
          width: 350,
          okCallBack: () => {
            let params = {
              id:item.id,
              ownerID:item.ownerID,
              orderNum:item.orderNum,
              direction:0
            }
            this.ajaxJson({
              url: '/sys/approveFlowDetail/updateOrderNum',
              data: params,
              call: (data) => {
                if(data.type === 0){
                  this.initPageChildDate()
                }
              }
            })
          }
        })
      },
      downEvent(item){
        this.$dialog.confirm({
          tipValue: '确定将此流程节点向下调整顺序吗？',
          btnValueOk: '向下调整',
          width: 350,
          okCallBack: () => {
            let params = {
              id:item.id,
              ownerID:item.ownerID,
              orderNum:item.orderNum,
              direction:1
            }
            this.ajaxJson({
              url: '/sys/approveFlowDetail/updateOrderNum',
              data: params,
              call: (data) => {
                if(data.type === 0){
                  this.initPageChildDate()
                }
              }
            })
          }
        })
      },
      delDetail(item){
        this.$dialog.confirm({
          tipValue: '确定删除此审批流程节点吗？',
          btnValueOk: '确定删除',
          width: 300,
          okCallBack: () => {
            let params = {
              id:item.id,
              ownerID:item.ownerID,
              orderNum:item.orderNum
            }
            this.ajaxJson({
              url: '/sys/approveFlowDetail/del',
              data: params,
              call: (data) => {
                if(data.type === 0){
                  this.$dialog.setReturnValue(this.id)
                  this.initPageChildDate()
                }
              }
            })
          }
        })
      },
      save () {
        if (this.validator()) {
          let params = {
            id: this.id,
            unitID: this.unitID,
            unit: this.unit,
            topQuota: this.topQuota,
            isIumpHighLevelByAmount: this.isIumpHighLevelByAmount,
            highLevel: this.highLevel,
            category: this.category,
            grade: this.grade,
            noticeUrl:this.noticeUrl,
            approveUrl:this.approveUrl,
            rejectNoticeUrl:this.rejectNoticeUrl,
            ccUrl:this.ccUrl,
          }
          this.ajaxJson({
            url: '/sys/approveFlows/save',
            data: params,
            call: (data) => {
              if (data.type == 0) {
                this.$dialog.setReturnValue(this.id)
                this.$dialog.alert({
                  tipValue: data.message,
                  closeCallBack: () => {
                    this.showDetails = true
                  }
                })
              }
            }
          })
        }
      },

    },
    created () {
      this.showDetails = !this.isAdd
      this.init({
        url: '/sys/approveFlows/initForm',
        all: (data) => {
          this.categoryList = data.categoryPsd.list
          this.approveCategoryList = data.approveCategoryPsd.list
          this.gradeList = data.gradePsd.list
          this.isIumpHighLevelByAmountList = data.isIumpHighLevelByAmountPsd.list
          this.unitID = data.unitID
          this.unit = data.unit
          this.category = data.categoryPsd.value
          this.grade = data.gradePsd.value
          this.isIumpHighLevelByAmount = data.isIumpHighLevelByAmountPsd.value
          this.flowCategoryList = data.flowCategoryPsd.list
        },
        add: (data) => {
        },
        look: (data) => {
          this.topQuota = data.topQuota
          this.highLevel = data.highLevel
          this.noticeUrl = data.noticeUrl
          this.approveUrl = data.approveUrl
          this.rejectNoticeUrl = data.rejectNoticeUrl
          this.ccUrl = data.ccUrl
          this.flowDetails = data.flowDetails
          this.empty = this.flowDetails.length === 0
        }
      })
    }
  }
</script>

<style scoped>

</style>
