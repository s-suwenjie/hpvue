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
      </template>
    </yhm-formbody>
    <div class="f_split"></div>
    <yhm-form-list-show>
      <template #title>流程节点管理</template>
      <template #operate>
        <yhm-commonbutton value="添加流程节点" icon="btnAdd" @call="add()"></yhm-commonbutton>
      </template>
      <template #listHead>
        <yhm-managerth style="width: 38px" title="查看"></yhm-managerth>
        <yhm-managerth style="width: 70px" title="步骤"></yhm-managerth>
        <yhm-managerth title="审批类型"></yhm-managerth>
        <yhm-managerth style="width: 130px" title="节点名称"></yhm-managerth>
        <yhm-managerth style="width: 80px" title="状态值"></yhm-managerth>
        <yhm-managerth style="width: 100px" title="是否允许驳回"></yhm-managerth>
        <yhm-managerth style="width: 100px" title="是否需要审批"></yhm-managerth>
        <yhm-managerth style="width: 130px" title="驳回节点名称"></yhm-managerth>
        <yhm-managerth style="width: 80px" title="状态值"></yhm-managerth>
        <yhm-managerth style="width: 38px" title="排序"></yhm-managerth>
        <yhm-managerth style="width: 38px" title="删除"></yhm-managerth>
      </template>
      <template #listBody>
        <tr v-for="(item,index) in flowDetails" :key="index" :class="{InterlacBg:index%2!==0}">
          <yhm-manager-td-look @click="add(item.id)"></yhm-manager-td-look>
          <yhm-manager-td-center-html>第<b class="red">{{index + 1}}</b>步</yhm-manager-td-center-html>
          <yhm-manager-td-icon-txt-color :is-empty="item.isAuto !== '1'" :color="item.titleColor" :icon="item.categoryClass + 'Approval'" :show-name="item.categoryShowName"></yhm-manager-td-icon-txt-color>
          <yhm-manager-td-icon-txt-color :color="item.titleColor" :icon="item.titleUrl" :show-name="item.title"></yhm-manager-td-icon-txt-color>
          <yhm-manager-td-center :value="item.titleVal"></yhm-manager-td-center>
          <yhm-manager-td-yesno :value="item.isReject"></yhm-manager-td-yesno>
          <yhm-manager-td-yesno :value="item.isApproval"></yhm-manager-td-yesno>
          <yhm-manager-td-icon-txt-color :is-empty="item.isReject === '1'" :color="item.rejectTitleColor" :icon="item.rejectTitleUrl" :show-name="item.rejectTitle"></yhm-manager-td-icon-txt-color>
          <yhm-manager-td-center :is-empty="item.isReject === '1'" :value="item.rejectTitleVal"></yhm-manager-td-center>
          <yhm-manager-td-operate>
            <yhm-manager-td-operate-customize :no-click="item.isAuto !== '1'" icon="i_tableSort" color="#d92ec8"></yhm-manager-td-operate-customize>
          </yhm-manager-td-operate>
          <yhm-manager-td-operate>
            <yhm-manager-td-operate-delete :no-click="item.isAuto !== '1'" @click="delDetail(item)"></yhm-manager-td-operate-delete>
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
export default {
  name: 'flowsForm',
  mixins: [formmixin],
  data () {
    return {
      unitID: '',
      unit: '',
      topQuota: '', // 高层审批额度
      isIumpHighLevelByAmount: '', // 部门无权越级审批
      highLevel: '', // 高层领导审批额度
      category: '', // 流程类型

      isIumpHighLevelByAmountList: [], // 部门无权越级审批选项
      categoryList: [], // 流程类型选项

      flowDetails: [],

      empty: true
    }
  },
  methods: {
    // 添加流程明细
    add (id) {
      if (!id) {
        id = ''
      }
      this.$dialog.OpenWindow({
        width: 1050,
        height: 540,
        url: '/flowDetailForm?ownerID=' + this.id + '&id=' + id +
            '&parentUnitID=' + this.unitID +
            '&parentTopQuota=' + this.topQuota +
            '&parentIsIumpHighLevelByAmount=' + this.isIumpHighLevelByAmount +
            '&parentHighLevel=' + this.highLevel +
            '&parentCategory=' + this.category,
        title: '添加流程节点信息',
        closeCallBack: (data) => {
          if (data) {
            let params = {
              ownerID: this.id
            }
            this.ajaxJson({
              url: '/PersonOffice/getFlowDetailByOwnerID',
              data: params,
              call: (result) => {
                this.flowDetails = result
                this.empty = this.flowDetails.length === 0
              }
            })
          }
        }
      })
    },
    delDetail (item) {
      this.$dialog.confirm({
        tipValue: '确定删除此流程节点吗？',
        btnValueOk: '确定删除',
        width: 300,
        okCallBack: () => {
          let index = this.flowDetails.indexOf(item)
          let sortInfo = ''
          for (var i = 0; i < this.flowDetails.length; i++) {
            if (i !== index) {
              if (sortInfo !== '') {
                sortInfo += '☆'
              }
              sortInfo += this.flowDetails[i].id
            }
          }
         
          let params = {
            id: item.id,
            sortInfo: sortInfo
          }
          this.ajaxJson({
            url: '/PersonOffice/delFlowDetailByID',
            data: params,
            call: (data) => {
              if (data.type == 0) {
                this.flowDetails.splice(index, 1)
                this.$dialog.alert({
                  tipValue: data.message
                })
              } else {
                this.$dialog.alert({
                  tipValue: data.message,
                  alertImg: 'error'
                })
              }
            }
          })
        }
      })
    },
    save () {
      if (this.validator()) {
        if (this.flowDetails.length < 3) {
          this.$dialog.alert({
            tipValue: '流程节点至少添加三条',
            alertImg: 'error',
            width: '300'
          })
        } else {
          let sortInfo = ''
          for (var i = 0; i < this.flowDetails.length; i++) {
            if (sortInfo !== '') {
              sortInfo += '☆'
            }
            sortInfo += this.flowDetails[i].id
          }
          var params = {
            id: this.id,
            unitID: this.unitID,
            unit: this.unit,
            topQuota: this.topQuota,
            isIumpHighLevelByAmount: this.isIumpHighLevelByAmount,
            highLevel: this.highLevel,
            category: this.category,
            sortInfo: sortInfo
          }
          this.ajaxJson({
            url: '/PersonOffice/saveFlows',
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
    }
  },
  created () {
    this.init({
      url: '/personOffice/initFlowsForm',
      all: (data) => {
        this.categoryList = data.categoryPsd.list
        this.isIumpHighLevelByAmountList = data.isIumpHighLevelByAmountPsd.list
        this.unitID = data.unitID
        this.unit = data.unit
        this.category = data.categoryPsd.value
        this.isIumpHighLevelByAmount = data.isIumpHighLevelByAmountPsd.value
      },
      add: (data) => {
      },
      look: (data) => {
        this.topQuota = data.topQuota
        this.highLevel = data.highLevel
        this.flowDetails = data.flowDetails
        this.empty = this.flowDetails.length === 0
      }
    })
  }
}
</script>

<style scoped>

</style>
