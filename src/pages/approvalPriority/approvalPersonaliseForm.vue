approvalPersonaliseForm
<template>
  <div class="f_main">
    <yhm-formbody>
      <template #title>基本信息</template>

      <template #control>
        <yhm-form-select ref="person" title="用户名称" :value="person" id="person" rule="R0000" @click="selectPerson"></yhm-form-select>
        <!--<div id="aa" style="display: none">加过该用户，已自动带出剩余信息</div>-->
        <yhm-form-check title="审批节点" :select-list="nodeList" submit-value="nodeSubmit" :ownerID="id" :value="node" id="node" rule="#" width="1"></yhm-form-check>
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
  import Qs from 'qs'
  import { accMul, accAdd, guid } from '@/assets/common.js'
  import { formmixin } from '@/assets/form.js'
  export default {
    name: 'addPersonForm',
    mixins: [formmixin],
    data() {
      return {
        id: '',
        person: '',
        personID: '',

        nodeList: [],
        node: [],
        nodeSubmit:[],

        isNew:false,
      }
    },
    methods: {
      selectPerson(event){
        this.$dialog.OpenWindow({
          url: '/selectPerson?category=0&categoryBefore=1',
          width: 950,
          height: 690,
          closeCallBack: (data) => {
            if(data){
              this.person = data.name
              this.personID = data.id
              if (this.isNew){
                this.id = guid()
              }
              let params = {
                id:this.id,
                personID:this.personID
              }
              this.ajaxJson({
                url:"/Com/approvalPersonaliseVerify",
                data:params,
                loading:"0",
                call:(data) =>{
                  if(data.type === 1){
                    let params = {
                      id:data.id
                    }
                    this.ajaxJson({
                      url: '/Com/approvalPersonaliseForm',
                      data: params,
                      call: (data) => {
                        this.id = data.id
                        this.person = data.person   //单位
                        this.personID = data.personID
                        this.nodeList = data.nodePsd.list  //标签
                        this.node = data.nodePsd.value

                        this.isNew = true
                      }

                    })
                  }
                }
              })
            }
          }
        })
      },
      save(){
        if(this.validator()){
          let params = {
            id: this.id,
            personID: this.personID,
            nodeList: this.nodeSubmit,
          }
          this.ajaxJson({
            url: '/Com/approvalPersonaliseSave',
            data: params,
            call: (data)=>{
              if(data.type === 0){
                this.$dialog.setReturnValue(this.id)
                this.$dialog.alert({
                  tipValue: data.message,
                  closeCallBack: ()=>{
                    this.$dialog.close()
                  }
                })
              }else{
                this.$dialog.alert({
                  alertImg: 'warn',
                  tipValue: data.message
                })
              }
            }
          })
        }
      },
      initData(){
        this.init({
          url: '/Com/approvalPersonaliseForm',
          all: (data)=>{
            this.person = data.person   //单位
            this.personID = data.personID
            this.nodeList = data.nodePsd.list  //标签
            this.node = data.nodePsd.value
          },
          add: (data)=>{
            this.id = guid()
          },
          look: (data)=>{
          }
        })
      }
    },
    created () {
      this.initData()
    }
  }
</script>

<style scoped>

</style>
