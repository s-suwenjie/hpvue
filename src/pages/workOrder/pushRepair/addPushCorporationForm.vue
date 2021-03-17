<template>
  <div class="f_main">
    <yhm-formbody>
      <template #title>基本信息</template>
      <template #control>
        <yhm-form-select title="推修公司" @click="corporationEvent" :value="companyName" id="companyName">
<!--          <div style="display: flex;justify-content: center;align-items: center;" title="添加推修公司">-->
<!--            <svg t="1600673661423" style="cursor:pointer;" title="添加推修公司" @click="addIconCompanyClick" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1594" width="32" height="32"><path d="M800 192c19.2 0 32 12.8 32 32v256c0 19.2-12.8 32-32 32s-32-12.8-32-32V256H256v512h224c19.2 0 32 12.8 32 32s-12.8 32-32 32H224c-19.2 0-32-12.8-32-32V224c0-19.2 12.8-32 32-32h576z" fill="#221814" p-id="1595"></path><path d="M704 560c16 0 28.8 12.8 32 28.8V672h80c19.2 0 32 12.8 32 32 0 16-12.8 28.8-28.8 32H736v80c0 19.2-12.8 32-32 32-16 0-28.8-12.8-32-28.8V736h-80c-19.2 0-32-12.8-32-32 0-16 12.8-28.8 28.8-32H672v-80c0-19.2 12.8-32 32-32zM640 352c19.2 0 32 12.8 32 32 0 16-12.8 28.8-28.8 32H384c-19.2 0-32-12.8-32-32 0-16 12.8-28.8 28.8-32H640z" fill="#C70019" p-id="1596"></path></svg>-->
<!--          </div>-->
        </yhm-form-select>
        <yhm-form-select title="联系人" @click="personEvent" :no-click="companyName==''?true:false" :value="personName" id="personName">
<!--          <div style="display: flex;justify-content: center;align-items: center;" title="添加联系人"  v-show="companyName==''?false:true">-->
<!--            <svg t="1600673661423" style="cursor:pointer;" title="添加联系人" @click="addIconPersonClick" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1594" width="32" height="32"><path d="M800 192c19.2 0 32 12.8 32 32v256c0 19.2-12.8 32-32 32s-32-12.8-32-32V256H256v512h224c19.2 0 32 12.8 32 32s-12.8 32-32 32H224c-19.2 0-32-12.8-32-32V224c0-19.2 12.8-32 32-32h576z" fill="#221814" p-id="1595"></path><path d="M704 560c16 0 28.8 12.8 32 28.8V672h80c19.2 0 32 12.8 32 32 0 16-12.8 28.8-28.8 32H736v80c0 19.2-12.8 32-32 32-16 0-28.8-12.8-32-28.8V736h-80c-19.2 0-32-12.8-32-32 0-16 12.8-28.8 28.8-32H672v-80c0-19.2 12.8-32 32-32zM640 352c19.2 0 32 12.8 32 32 0 16-12.8 28.8-28.8 32H384c-19.2 0-32-12.8-32-32 0-16 12.8-28.8 28.8-32H640z" fill="#C70019" p-id="1596"></path></svg>-->
<!--          </div>-->
        </yhm-form-select>
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
  import { formmixin } from '@/assets/form.js'
  export default {
    name: 'addPushCorporationForm',
    mixins: [formmixin],
    data(){
      return{
        unitID:'',//推修公司数据id
        companyID:'',//推修公司ID
        companyName:'',//推修公司名称
        personID:'',//联系人ID
        personName:'',//联系人姓名
      }
    },
    methods:{
      save(){
        let params = {
          id:this.id,
          companyID:this.companyID,
          companyName:this.companyName,
          personID:this.personID,
          personName:this.personName,
        }
        this.ajaxJson({
          url: '/fix/fixCompanyOrder/save',
          data:params,
          call: (data) => {
            if(data.type=='0'){
              this.$dialog.alert({
                tipValue:data.message,
                closeCallBack: () => {
                  this.$dialog.close();
                }
              })
            }else{
              this.$dialog.alert({
                width:'350',
                alertImg: 'error',
                tipValue:data.message,
                closeCallBack: () => {
                }
              })
            }
          }
        })
      },
      addIconCompanyClick(){
        this.$dialog.OpenWindow({
          width: 1050,
          height: 720,
          url:'/pushRepairForm?isAdd=1',
          title:'添加推修公司',
          closeCallBack:(data)=>{
            this.initPageData()
          }
        })
      },
      corporationEvent(){
        this.$dialog.OpenWindow({
          width: '1070',
          height: '750',
          url:'/pushCorporationSelect',
          title:'选择推修公司',
          closeCallBack:(data) =>{
            if(data){
              this.unitID = data.id
              this.companyID = data.unitID
              this.companyName = data.unit
              this.$dialog.OpenWindow({
                width: '1070',
                height: '750',
                url:'/pushPersonSelect?id='+data.id+'&name='+this.companyName,
                title:'选择推修公司联系人' + ' ( ' + this.companyName + ' ) ',
                closeCallBack:(data) =>{
                  if(data){
                    this.personName = data.person
                    this.personID = data.personID

                  }

                }
              })
            }
            console.log(data)

          }
        })
      },
      addIconPersonClick(){
        this.$dialog.OpenWindow({
          width: 1050,
          height: 720,
          url:'/pushRepairAddPersonForm?companyID=' + this.unitID,
          title:'添加推修公司联系人' + ' ( ' + this.companyName + ' ) ',
          closeCallBack:(data) =>{
            // if (data) {
            this.initPageData(false)
            // }
          }
        })
      },
      personEvent(){
        this.$dialog.OpenWindow({
          width: '1070',
          height: '750',
          url:'/pushPersonSelect?id='+this.unitID+'&name='+this.companyName,
          title:'选择推修公司联系人' + ' ( ' + this.companyName + ' ) ',
          closeCallBack:(data) =>{
            if(data){
              this.personName = data.person
              this.personID = data.personID

            }

          }
        })
      }
    }
  }
</script>

<style scoped>

</style>
