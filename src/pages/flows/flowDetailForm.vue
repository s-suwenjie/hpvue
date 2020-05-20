<template>
  <div class="f_main">
    <yhm-formbody>
      <template #title>基本信息</template>
      <template #control>
        <yhm-form-radio :show="categoryShow" width="1" title="审批类型" :select-list="categoryList" :value="category" id="category" @call="categoryClickEvent"></yhm-form-radio>
        <yhm-titlenumimagecolor title="节点信息" @colorConfirm="colorConfirm" value-tip="节点名称" :value="title" valueID="title" num-tip="节点值" :num="titleVal" numID="titleVal" :icon="titleUrl" iconID="titleUrl" :color="titleColor" colorID="titleColor" rule="#"></yhm-titlenumimagecolor>
        <yhm-form-radio title="是否" subtitle="允许驳回" :select-list="isRejectList" :value="isReject" id="isReject" @call="isRejectClickEvent"></yhm-form-radio>
        <yhm-titlenumimagecolor :show="rejectShow" @colorConfirm="colorConfirm2" title="驳回" subtitle="节点信息" value-tip="节点名称" :value="rejectTitle" valueID="rejectTitle" num-tip="节点值" :num="rejectTitleVal" numID="rejectTitleVal" :icon="rejectTitleUrl" iconID="rejectTitleUrl" :color="rejectTitleColor" colorID="rejectTitleColor" rule="#"></yhm-titlenumimagecolor>
        <div v-show="rejectShow" class="f_br"></div>
        <yhm-form-radio title="是否" subtitle="需要审批" :select-list="isApprovalList" :value="isApproval" id="isApproval" @call="isApprovalClickEvent"></yhm-form-radio>
        <yhm-form-select-more :show="detailShow" title="审批" subtitle="人员明细" :value="details" id="details" @click="selectPerson()" rule="#"></yhm-form-select-more>
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
import { guid, accAdd, accMul } from '@/assets/common.js'
import { formmixin } from '@/assets/form.js'
export default {
  name: 'flowDetailForm',
  mixins: [formmixin],
  data () {
    return {

      ownerID: '',
      parentHighLevel: '',
      parentIsIumpHighLevelByAmount: '',
      parentUnitID: '',
      parentCategory: '',
      parentTopQuota: '',

      orderNum: '',
      isAuto: '1',
      category: '', // 审批类型
      categoryShow: true,
      title: '',
      titleVal: '',
      titleUrl: '',
      titleColor: '',

      isReject: '', // 是否允许驳回
      isApproval: '', // 是否需要审批

      rejectShow: true,

      rejectTitle: '',
      rejectTitleVal: '',
      rejectTitleUrl: '',
      rejectTitleColor: '#FF0000',

      detailShow: true,
      details: [],

      categoryList: [], // 审批类型选项
      isRejectList: [], // 是否允许驳回选项
      isApprovalList: [], // 是否需要审批选项

    }
  },
  methods: {
    colorConfirm(colorValue){
      this.titleColor = colorValue
    },
    colorConfirm2(colorValue){
      this.rejectTitleColor = colorValue
    },
    // 切换审批类型
    categoryClickEvent () {
      var categoryCode = this.categoryList[this.category].code
      this.titleUrl = categoryCode + 'ApprovalOK'
      this.rejectTitleUrl = categoryCode + 'ApprovalReject'
    },
    // 是否允许返回
    isRejectClickEvent () {
      if (this.isReject === '0') {
        this.rejectShow = true
        var categoryCode = this.categoryList[this.category].code
        this.rejectTitleUrl = categoryCode + 'ApprovalReject'
        this.rejectTitleColor = '#FF0000'
      } else {
        this.rejectShow = false
      }
    },
    // 是否需要审批
    isApprovalClickEvent () {
      if (this.isApproval === '0') {
        this.detailShow = true
      } else {
        this.detailShow = false
      }
    },
    // 选择审批人员
    selectPerson () {
      this.$dialog.OpenWindow({
        width: 950,
        height: 690,
        url: '/selectPerson?category=0&categoryBefore=1&selectType=1',
        title: '选择审批人员',
        closeCallBack: (data) => {
          if (data) {
            for (var j = 0; j < data.length; j++) {
              var temp = data[j]
              var index = -1

              for (var i = 0; i < this.details.length; i++) {
                if (this.details[i].id === temp.id) {
                  index = 0
                  break
                }
              }
              if (index === -1) {
                this.details.push({
                  id: guid(),
                  insertDate: new Date(accAdd(new Date().getTime(), accMul(1, this.details.length))),
                  ownerID: this.id,
                  category: '',
                  otherID: temp.id,
                  otherName: temp.name
                })
              }
            }
          }
        }
      })
    },
    save () {
      if (this.validator()) {
        var params = {
          id: this.id,
          isAuto: this.isAuto,
          orderNum: this.orderNum,
          isAuto: this.isAuto,
          ownerID: this.ownerID,
          parentHighLevel: this.parentHighLevel,
          parentIsIumpHighLevelByAmount: this.parentIsIumpHighLevelByAmount,
          parentUnitID: this.parentUnitID,
          parentCategory: this.parentCategory,
          parentTopQuota: this.parentTopQuota,
          title: this.title,
          titleVal: this.titleVal,
          titleUrl: this.titleUrl,
          titleColor: this.titleColor,
          category: this.category,
          isReject: this.isReject,
          isApproval: this.isApproval,
          rejectTitle: this.rejectTitle,
          rejectTitleVal: this.rejectTitleVal,
          rejectTitleUrl: this.rejectTitleUrl,
          rejectTitleColor: this.rejectTitleColor,
          details: this.details
        }
        this.ajaxJson({
          url: '/PersonOffice/saveFlowDetail',
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
    this.setQuery2Value('parentUnitID')
    this.setQuery2Value('parentTopQuota')
    this.setQuery2Value('parentIsIumpHighLevelByAmount')
    this.setQuery2Value('parentHighLevel')
    this.setQuery2Value('parentCategory')
    this.init({
      url: '/personOffice/initFlowDetailForm',
      all: (data) => {
        this.categoryList = data.categoryPsd.list
        this.isRejectList = data.isRejectPsd.list
        this.isApprovalList = data.isApprovalPsd.list
      },
      add: (data) => {
        this.category = data.categoryPsd.value
        this.isReject = data.isRejectPsd.value
        this.isApproval = data.isApprovalPsd.value
        var categoryCode = this.categoryList[this.category].code
        this.titleUrl = categoryCode + 'ApprovalOK'
        this.rejectTitleUrl = categoryCode + 'ApprovalReject'
      },
      look: (data) => {
        this.ownerID = data.ownerID
        this.orderNum = data.orderNum
        this.category = data.category
        this.isReject = data.isReject
        this.isApproval = data.isApproval
        this.details = data.details
        this.isAuto = data.isAuto
        this.title = data.title
        this.titleVal = data.titleVal
        this.titleUrl = data.titleUrl
        this.titleColor = data.titleColor
        this.rejectTitle = data.rejectTitle
        this.rejectTitleVal = data.rejectTitleVal
        this.rejectTitleUrl = data.rejectTitleUrl
        this.rejectTitleColor = data.rejectTitleColor
        this.rejectShow = this.isReject === '0'
        this.detailShow = this.isApproval === '0'
        this.categoryShow = this.isAuto === '1'
      }
    })
  }
}
</script>

<style lang="less" scoped>

</style>
