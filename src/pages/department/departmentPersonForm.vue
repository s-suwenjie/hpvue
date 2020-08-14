<template>
  <div class="f_main f_main_customize">
    <yhm-form-list-show>
      <template #title>人员管理</template>
      <template #operate>
        <yhm-commonbutton value="添加人员" icon="btnAdd" @call="selectAddPersonEvent"></yhm-commonbutton>
      </template>
      <template #listHead>
        <yhm-managerth  style="width: 100px;" title="姓名"></yhm-managerth>
        <yhm-managerth  style="width: 70px;" title="性别"></yhm-managerth>
        <yhm-managerth  style="width: 80px;" title="是否领导"></yhm-managerth>
        <yhm-managerth  style="width: 120px;" title="员工电话"></yhm-managerth>
        <yhm-managerth  title="员工身份证号码"></yhm-managerth>
        <yhm-managerth  style="width: 200px;" title="操作"></yhm-managerth>
      </template>
      <template #listBody>
        <tr v-for="(item,index) in content" :key="index" :class="[{InterlacBg:index%2!=0}]">
          <yhm-manager-td :value="item.name"></yhm-manager-td>
          <yhm-manager-td-psd :value="item.sex" :list="sexItems"></yhm-manager-td-psd>
          <yhm-manager-td-yesno :value="item.isLeader"></yhm-manager-td-yesno>
          <yhm-manager-td-center :value="item.phone" format="phone*"></yhm-manager-td-center>
          <yhm-manager-td-center :value="item.idNo" format="idno*"></yhm-manager-td-center>
          <yhm-manager-td-operate>
            <yhm-manager-td-operate-button @click="changeDepartmentEvent(item)" value="更换部门" icon="i-btn-refresh" color="#27CA50"></yhm-manager-td-operate-button>
            <yhm-manager-td-operate-button @click="changeIsLeaderEvent(item)" :value="item.isLeader === '0'?'设置为员工':'设置为领导'" icon="i-btn-refresh" color="#49a9ea"></yhm-manager-td-operate-button>
          </yhm-manager-td-operate>
        </tr>
      </template>
      <template #empty>
        <span class="m_listNoData" v-show="content.length === 0">暂时没有数据</span>
      </template>
    </yhm-form-list-show>
  </div>
</template>

<script>
  import Qs from 'qs'
  import { accAdd,accMul } from '@/assets/common.js'
  export default {
    provide(){
      return{
        p____page:this
      }
    },
    name: 'departmentPersonForm',
    data(){
      return{
        id:'',
        sexItems:[],
        content:[]
      }
    },
    methods:{
      initPage(sign){
        this.ajaxJson({
          url:"/Basic/getDepartmentPersonByID",
          data:{
            id:this.id
          },
          call:(data) => {
            this.content = data.details
            if(sign) {
              this.sexItems = data.sexItems
            }
          }
        })
      },
      selectAddPersonEvent(){
        this.$dialog.OpenWindow({
          width: 950,
          height: 690,
          url: '/selectPerson?category=0&categoryBefore=1',
          title: '选择人员',
          closeCallBack: (data) => {
            if (data) {
              let params = {
                departmentID:this.id,
                personID:data.id
              }
              this.ajaxJson({
                url:"/Basic/personUnitSave",
                data:params,
                call:(resultData) => {
                  if(resultData.type === 0){
                    this.$dialog.alert({
                      tipValue: resultData.message,
                      closeCallBack:() => {
                        this.initPage(false)
                      }
                    })
                  }
                  else if(resultData.type === 1){
                    this.$dialog.alert({
                      tipValue:'已在此部门,无需添加',
                      alertImg: 'warn',
                      width:'300'
                    })
                  }
                }
              })
            }
          }
        })
      },
      changeDepartmentOperate(personID,targetDepartmentID,isLeader){
        let params = {
          departmentID: this.id,
          personID: personID,
          targetDepartmentID: targetDepartmentID,
          isLeader:isLeader
        }
        this.ajaxJson({
          url: "/Basic/personUnitSave",
          data: params,
          call: (resultData) => {
            if (resultData.type === 0) {
              this.$dialog.alert({
                tipValue: resultData.message,
                width:'300',
                closeCallBack: () => {
                  this.initPage(false)
                }
              })
            }
          }
        })
      },
      changeDepartmentEvent(item){
        this.$dialog.OpenWindow({
          url: "/selectDepartment?",
          width: "850",
          height: "600",
          title: "选择部门",
          closeCallBack: (data) => {
            if(data){
              if(this.id === data.id){
                this.$dialog.alert({
                  tipValue:'已在当前部门，不能调整到当前部门！！！',
                  width:'420',
                  alertImg:'warn'
                })
              }
              else {
                var width = accAdd(400,accMul(15,accAdd(item.name.length,data.name.length)))
                this.$dialog.confirm({
                  tipValue:'将<b class="red">（' + item.name + '）</b>调整到<b class="red">（' + data.name + '）</b>后的职位是什么？',
                  width:width,
                  btnValueOk:'领导',
                  btnValueCancel:'员工',
                  okCallBack:() => {
                    this.changeDepartmentOperate(item.id,data.id,0)
                  },
                  cancelCallBack:() => {
                    this.changeDepartmentOperate(item.id,data.id,1)
                  }
                })
              }
            }
          }
        })
      },
      changeIsLeaderEvent(item){
        var title = '确定要将<b class="red">（' + item.name + '）</b>设置为<b class="red">（'
        if(item.isLeader === '0'){
          title += '员工）</b>吗？'
        }
        else{
          title += '领导）</b>吗？'
        }
        let width = accAdd(accMul(item.name.length,15),350)
        this.$dialog.confirm({
          tipValue:title,
          width:width,
          okCallBack:() => {
            let params = {
              departmentID:this.id,
              personID:item.id,
              isLeader:item.isLeader === '0'?'1':'0'
            }
            this.ajaxJson({
              url:"/Basic/personUnitSave",
              data:params,
              call:(resultData) => {
                if(resultData.type === 0){
                  this.$dialog.alert({
                    tipValue: resultData.message,
                    width:'300',
                    closeCallBack:() => {
                      this.initPage(false)
                    }
                  })
                }
              }
            })
          }
        })
      }
    },
    created () {
      let query = Qs.parse(location.search.substring(1))
      let id = query.id
      if(id){
        this.id = id
        this.initPage(true)
      }
      else{
        this.$dialog.alert({
          tipValue:'没有获取到部门信息',
          width:'300',
          alertImg:'error',
          closeCallBack:() => {
            this.$dialog.close()
          }
        })
      }
    }
  }
</script>

<style scoped lang="less">

</style>
