<template>
  <div class="f_main">
    <yhm-formbody>
      <template #title>基本信息</template>
      <template #control>
        <yhm-form-check title="审批类型" width="1" :select-list="categoryList" :value="category" id="category" rule="#"></yhm-form-check>
        <yhm-form-date title="代理" :min="startDateMin" subtitle="开始日期" :value="startDate" id="startDate" rule="R0000"></yhm-form-date>
        <yhm-form-date title="代理" :min="startDate" subtitle="结束日期" :value="endDate" id="endDate" rule="R0000"></yhm-form-date>
        <yhm-form-select title="代理人" @click="selectProxyPerson" @clear="clearProxyPerson" :value="proxyPerson" id="proxyPerson" rule="R0000"></yhm-form-select>
        <yhm-form-radio no-edit title="状态" :select-list="stateList" :value="state" id="state"></yhm-form-radio>
        <yhm-form-textarea title="备注" :value="remark" id="remark"></yhm-form-textarea>
      </template>
    </yhm-formbody>

    <yhm-formoperate :createName="createName" :insertDate="insertDate" :updateName="updateName" :updateDate="updateDate">
      <template #btn>
        <yhm-commonbutton value="保存" v-show="isSave" icon="btnSave" :flicker="isSave" @call="save()"></yhm-commonbutton>
        <yhm-commonbutton value="确认代理" v-show="isState1" icon="i-complete" :flicker="true" @call="updateState(1)"></yhm-commonbutton>
        <yhm-commonbutton value="终止代理" v-show="isState2" icon="i-complete" :flicker="true" @call="updateState(2)"></yhm-commonbutton>
      </template>
    </yhm-formoperate>
  </div>
</template>

<script>
  import { accMul, accAdd, guid, formatDate, formatTime } from '@/assets/common.js'
  import { formmixin } from '@/assets/form.js'
  export default {
    name: 'approveProxyForm',
    mixins: [formmixin],
    data(){
      return {
        categoryList:[],  //有审批权限的节点流程
        category:[],//选中的节点流程
        personID:'',//当前人员
        startDate:'',//开始日期
        endDate:'',//结束日期
        proxyPersonID:'',//代理人ID
        proxyPerson:'',//代理人
        state:'0',//代理状态（待确认、代理中、已终止）
        remark:'',//备注

        isSave:true,          //是否显示保存按钮
        isState1:false,        //是否显示确认代理按钮
        isState2:false,        //是否显示终止代理按钮

        startDateMin:'',
        stateList: [],//状态类型选项
      }
    },
    methods:{
      //选择代理人员
      selectProxyPerson(){
        this.$dialog.OpenWindow({
          width: 950,
          height: 690,
          url: '/selectPerson?category=0&categoryBefore=1',
          title: '选择代理人员',
          closeCallBack: (data) => {
            if (data) {
              if(this.personID === data.id){
                this.$dialog.alert({
                  width:350,
                  tipValue: "代理人不能是自己！！！",
                  closeCallBack: () => {
                    this.showDetails = true
                  }
                })
              }
              else {
                this.proxyPersonID = data.id
                this.proxyPerson = data.name
              }
            }
          }
        })
      },
      //清空代理人员
      clearProxyPerson(){
        this.proxyPersonID = ''
      },
      updateState(state){
        let content = "确定将此代理设置为进行中吗？",btnValueOk = '设置为进行中'
        if (state == 2){
          content = "确定将此代理设置为已终止吗？"
          btnValueOk = '设置为已终止'
        }
        this.$dialog.confirm({
          width: 350,
          tipValue: content,
          btnValueOk: btnValueOk,
          btnValueCancel:'暂不设置',
          alertImg: 'warn',
          okCallBack: () => {
            let params = {
              id:this.id,
              state: state
            }
            this.ajaxJson({
              url: '/sys/approveProxy/updateState',
              data: params,
              call: (data) => {
                if (data.type == 0) {
                  if(state == 1){
                    this.state = '1'
                    this.isState1 = false        //是否显示确认代理按钮
                    this.isState2 = true        //是否显示终止代理按钮
                  }
                  else{
                    this.state = '2'
                    this.isSave = false          //是否显示保存按钮
                    this.isState2 = false        //是否显示终止代理按钮
                  }

                  this.$dialog.alert({
                    tipValue: data.message,
                    closeCallBack: () => {

                    }
                  })
                }
              }
            })
          }
        })
      },
      save () {
        if (this.validator()) {
          if(this.state == 0) {
            let details = []
            for (let index of this.category) {
              for (let item of this.categoryList) {
                if (item.num === index) {
                  let insertDate = new Date(accAdd(new Date().getTime(), accMul(details.length, 1000)))
                  details.push({
                    id: guid(),
                    insertDate: formatTime(insertDate),
                    ownerID: this.id,
                    category: item.img,
                    categoryDetail: item.code
                  })
                }
              }
            }
            let params = {
              id: this.id,
              personID: this.personID,
              startDate: this.startDate,
              endDate: this.endDate,
              proxyPersonID: this.proxyPersonID,
              proxyPerson: this.proxyPerson,
              state: this.state,
              remark: this.remark,
              details: details
            }
            this.ajaxJson({
              url: '/sys/approveProxy/save',
              data: params,
              call: (data) => {
                if (data.type == 0) {
                  this.isSave = true          //是否显示保存按钮
                  this.isState1 = true        //是否显示确认代理按钮
                  this.isState2 = false        //是否显示终止代理按钮
                  this.$dialog.setReturnValue(this.id)
                  this.$dialog.confirm({
                    width: 350,
                    tipValue: "是否直接将此代理设置为代理中？",
                    btnValueOk: "设置为代理中",
                    btnValueCancel: '稍后设置',
                    alertImg: 'warn',
                    okCallBack: () => {
                      let params = {
                        id: this.id,
                        state: 1
                      }
                      this.ajaxJson({
                        url: '/sys/approveProxy/updateState',
                        data: params,
                        call: (data) => {
                          if (data.type == 0) {
                            this.state = '1'
                            this.isSave = false          //是否显示保存按钮
                            this.isState1 = false        //是否显示确认代理按钮
                            this.isState2 = true        //是否显示终止代理按钮
                            this.$dialog.alert({
                              tipValue: data.message,
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
            })
          }
          else{
            this.$dialog.alert({
              tipValue: "此状态下不能更新数据",
              closeCallBack: () => {

              }
            })
          }
        }
      }
    },
    created () {
      this.init({
        url: '/sys/approveProxy/initForm',
        all: (data) => {
          this.categoryList = data.categoryPsds
          this.category = data.category
          this.stateList = data.statePsd.list
          this.state = data.statePsd.value
        },
        add: (data) => {
          this.startDateMin = formatDate(new Date())
          this.personID = sessionStorage.getItem("____currentUserID")
        },
        look: (data) => {
          this.personID = data.personID
          this.startDate = data.startDate
          this.endDate = data.endDate
          this.proxyPersonID = data.proxyPersonID
          this.proxyPerson = data.proxyPerson
          this.state = data.state
          this.remark = data.remark
          if(this.state == 0){
            this.isSave = true          //是否显示保存按钮
            this.isState1 = true        //是否显示确认代理按钮
            this.isState2 = false        //是否显示终止代理按钮
          }
          else if(this.state == 1){
            this.isSave = false          //是否显示保存按钮
            this.isState1 = false        //是否显示确认代理按钮
            this.isState2 = true        //是否显示终止代理按钮
          }
          else if(this.state == 2){
            this.isSave = false          //是否显示保存按钮
            this.isState1 = false        //是否显示确认代理按钮
            this.isState2 = false        //是否显示终止代理按钮
          }
        }
      })
    }
  }
</script>

<style scoped>

</style>
