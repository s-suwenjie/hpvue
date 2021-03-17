<template>
  <div class="f_main">
    <yhm-formbody>
      <template #title>基本信息</template>
      <template #control>
        <yhm-form-radio width="1" title="审批类型" :select-list="categoryList" :value="category" id="category" @call="categoryClickEvent"></yhm-form-radio>
        <yhm-form-radio title="审批" subtitle="节点类型" :select-list="approveCategoryList" :value="approveCategory" id="approveCategory"></yhm-form-radio>
        <yhm-form-radio title="转申" :select-list="isTransferApproveList" :value="isTransferApprove" id="isTransferApprove"></yhm-form-radio>
        <yhm-form-radio title="代理" :select-list="isProxyList" :value="isProxy" id="isProxy"></yhm-form-radio>
        <yhm-titlenumimagecolor title="节点信息" value-tip="节点名称" :value="title" valueID="title" num-tip="节点值" :num="titleVal" numID="titleVal" :icon="titleUrl" iconID="titleUrl" :color="titleColor" colorID="titleColor" rule="#"></yhm-titlenumimagecolor>
        <yhm-form-radio title="驳回" :select-list="isRejectList" :value="isReject" id="isReject" @call="isRejectClickEvent"></yhm-form-radio>
        <yhm-titlenumimagecolor :show="isReject === '1'" title="驳回" subtitle="节点信息" value-tip="节点名称" :value="rejectTitle" valueID="rejectTitle" num-tip="节点值" :num="rejectTitleVal" numID="rejectTitleVal" :icon="rejectTitleUrl" iconID="rejectTitleUrl" :color="rejectTitleColor" colorID="rejectTitleColor" rule="#"></yhm-titlenumimagecolor>
        <div class="f_br"></div>
        <yhm-form-radio title="审批" :select-list="isApprovalList" :value="isApproval" id="isApproval" @call="isApprovalClickEvent"></yhm-form-radio>
        <yhm-form-radio title="抄送" :select-list="isAutoList" :value="isAuto" id="isAuto" @call="isAutoClickEvent"></yhm-form-radio>
        <yhm-form-select :show="isApproval === '1'" title="审批" subtitle="人员标签" @click="selectApproveTag" @clear="clearApproveTag" :value="approveTag" id="approveTag" rule="R0000"></yhm-form-select>

        <yhm-form-select :show="isAuto === '1'" title="抄送" subtitle="人员标签" @click="selectCcTag" @clear="clearCcTag" :value="ccTag" id="ccTag" rule="R0000"></yhm-form-select>

        <!--<yhm-form-select-more :show="isApproval === '1'" title="审批" subtitle="人员标签" :value="approvalDetails" id="approvalDetails" @click="selectPerson" rule="#"></yhm-form-select-more>
        <yhm-form-select-more :show="isAuto === '1'" title="抄送" subtitle="人员标签" :value="ccDetails" id="ccDetails" @click="selectTag" rule="#"></yhm-form-select-more>-->
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
  import { guid, accAdd, accMul,formatTime } from '@/assets/common.js'
  import { formmixin } from '@/assets/form.js'
  export default {
    name: 'approveFlowsDetailForm',
    mixins: [formmixin],
    data () {
      return {
        ownerID: '',

        category: '', // 审批类型
        approveCategory:'',//审批节点类型
        isTransferApprove:'',//转申
        isProxy:'',//代理
        title: '',
        titleVal: '',
        titleUrl: '',
        titleColor: '',

        isReject: '', // 是否允许驳回
        isApproval: '', // 是否需要审批
        isAuto:'',      //是否需要抄送其他人
        rejectTitle: '',
        rejectTitleVal: '',
        rejectTitleUrl: '',
        rejectTitleColor: '',

        approveTagID:'',      //审批人所在标签ID
        approveTag:'',      //审批人所在标签
        ccTagID:'',           //抄送人坐在标签ID
        ccTag:'',           //抄送人坐在标签


        categoryList: [], // 审批类型选项
        categoryStateList:[],//审批类型状态选项
        approveCategoryList:[], //审批节点类型
        isTransferApproveList:[],//转申类型选项
        isProxyList:[], //代理类型选项
        isRejectList: [], // 是否允许驳回选项
        isApprovalList: [], // 是否需要审批选项
        isAutoList: [],// 是否需要抄送选项

        /*approvalDetails: [],    //审批人员明细
        ccDetails: [],//抄送人员明细*/
      }
    },
    methods: {
      //切换审批类型
      categoryClickEvent(){
        let current = null
        for(let item of this.categoryList){
          if(item.num == this.category){
            current = item
            break
          }
        }
        this.title = ''
        this.titleVal = ''
        this.titleUrl = ''
        this.titleColor = ''
        this.rejectTitle = ''
        this.rejectTitleVal = ''
        this.rejectTitleUrl = ''
        this.rejectTitleColor = ''
        for(let item of this.categoryStateList){
          if(item.showName === current.img){
            //审批中
            this.title = item.showName
            this.titleVal = item.num
            this.titleUrl = item.img
            this.titleColor = item.code
          }
          if(this.isReject === '1'){
            if(item.showName === current.code){
              //已驳回
              this.rejectTitle = item.showName
              this.rejectTitleVal = item.num
              this.rejectTitleUrl = item.img
              this.rejectTitleColor = item.code
            }
          }
        }
      },
      //是否允许驳回
      isRejectClickEvent(){
        this.categoryClickEvent();
      },
      //是否需要审批
      isApprovalClickEvent(){
        this.approveTagID = ''
        this.approveTag = ''
      },
      //是否需要抄送
      isAutoClickEvent(){
        this.ccTagID = ''
        this.ccTag = ''
      },
      //选择审批人员所在标签
      selectApproveTag(){
        this.$dialog.OpenWindow({
          width: 1050,
          height: 660,
          url:'/selectPersonTag',
          title:"选择审批人员所在标签",
          closeCallBack:(data) =>{
            this.approveTagID = data.id
            this.approveTag = data.name
          }
        })
      },
      //清空审批人员所在标签
      clearApproveTag(){
        this.approveTagID = ''
        this.approveTag = ''
      },
      //选择抄送人员所在标签
      selectCcTag(){
        this.$dialog.OpenWindow({
          width: 1050,
          height: 660,
          url:'/selectPersonTag',
          title:"选择抄送人员所在标签",
          closeCallBack:(data) =>{
            this.ccTagID = data.id
            this.ccTag = data.name
          }
        })
      },
      //清空抄送人员所在标签
      clearCcTag(){
        this.ccTagID = ''
        this.ccTag = ''
      },
      save () {
        if (this.validator()) {
          var params = {
            id: this.id,
            isAuto: this.isAuto,
            ownerID: this.ownerID,
            category: this.category,
            approveCategory:this.approveCategory,
            isTransferApprove: this.isTransferApprove,
            isProxy: this.isProxy,
            title: this.title,
            titleVal: this.titleVal,
            titleUrl: this.titleUrl,
            titleColor: this.titleColor,
            isReject: this.isReject,
            isApproval: this.isApproval,
            rejectTitle: this.rejectTitle,
            rejectTitleVal: this.rejectTitleVal,
            rejectTitleUrl: this.rejectTitleUrl,
            rejectTitleColor: this.rejectTitleColor,
            approveTagID:this.approveTagID,
            approveTag:this.approveTag,
            ccTagID:this.ccTagID,
            ccTag:this.ccTag
          }
          this.ajaxJson({
            url: '/sys/approveFlowDetail/save',
            data: params,
            call: (data) => {
              if (data.type == 0) {
                this.$dialog.setReturnValue(this.id)
                this.$dialog.alert({
                  tipValue: data.message,
                  closeCallBack: () => {

                  }
                })
              }
            }
          })
        }
      }
    },
    created () {
      this.setQuery2Value('ownerID')
      this.init({
        url: '/sys/approveFlowDetail/initForm',
        all: (data) => {
          this.categoryList = data.categoryPsd.list
          this.categoryStateList = data.categoryStatePsd.list
          this.approveCategoryList = data.approveCategoryPsd.list
          this.isTransferApproveList = data.isTransferApprovePsd.list
          this.isProxyList = data.isProxyPsd.list
          this.isRejectList = data.isRejectPsd.list
          this.isApprovalList = data.isApprovalPsd.list
          this.isAutoList = data.isAutoPsd.list
        },
        add: (data) => {
          this.category = data.categoryPsd.value
          this.categoryClickEvent()
          this.approveCategory = data.approveCategoryPsd.value
          this.isTransferApprove = data.isTransferApprovePsd.value
          this.isProxy = data.isProxyPsd.value
          this.isReject = data.isRejectPsd.value
          this.isApproval = data.isApprovalPsd.value
          this.isAuto = data.isAutoPsd.value
        },
        look: (data) => {
          this.ownerID = data.ownerID
          this.isAuto = data.isAuto
          this.category = data.category
          this.approveCategory = data.approveCategory
          this.isTransferApprove = data.isTransferApprove
          this.isProxy = data.isProxy
          this.title = data.title
          this.titleVal = data.titleVal
          this.titleUrl = data.titleUrl
          this.titleColor = data.titleColor
          this.isReject = data.isReject
          this.isApproval = data.isApproval
          this.rejectTitle = data.rejectTitle
          this.rejectTitleVal = data.rejectTitleVal
          this.rejectTitleUrl = data.rejectTitleUrl
          this.rejectTitleColor = data.rejectTitleColor
          this.approveTagID = data.approveTagID
          this.approveTag = data.approveTag
          this.ccTagID = data.ccTagID
          this.ccTag = data.ccTag
        }
      })
    }
  }
</script>

<style scoped>

</style>
