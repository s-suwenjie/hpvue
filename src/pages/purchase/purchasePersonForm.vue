<template>
  <div class="f_main">
    <yhm-formbody>
      <template #title>基本信息</template>
      <template #control>
        <yhm-form-radio title="采购分类" @call="switchCategoryPurchase" :select-list="categoryPurchaseList" :value="categoryPurchase" id="categoryPurchase"></yhm-form-radio>
        <yhm-form-select @click="selectPerson" title="申请人" :value="person" id="person" rule="R0000"></yhm-form-select>
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
  import { accMul, accAdd, guid, formatDate,formatTime } from '@/assets/common.js'
  import { formmixin } from '@/assets/form.js'
  export default {
    name: 'myPurchaseForm',
    mixins: [formmixin],
    data(){
      return{
        categoryPurchase:'',        //采购分类
        personID:'',        //申请人ID
        person:'',          //申请人
      }
    },
    methods:{
      selectPerson(){
        this.$dialog.OpenWindow({
          width: 950,
          height: 692,
          title:'选择联系人信息',
          url:'/selectPerson?category=0&categoryBefore=1',
          closeCallBack: (data) => {
            if (data) {
              this.personID = data.id
              this.person = data.name
              let params = {
                categoryPurchase:this.categoryPurchase,
                personID:this.personID,
              }
              this.ajaxJson({
                url: '/PersonOffice/purchasePersonVerifi',
                data: params,
                call: (data) => {
                  if (data !== 0){
                    this.$dialog.alert({
                      width:'300',
                      alertImg: 'error',
                      tipValue: '此用户该类型已添加！',
                      closeCallBack: () => {
                        this.personID = ''
                        this.person = ''
                      }
                    })
                  }
                }
              })
            }
          }
        })
      },
      //保存
      save(){
        if(this.validator()){
          let params = {
            id:this.id,
            categoryPurchase:this.categoryPurchase,
            personID:this.personID,
            person:this.person,
          }
          this.ajaxJson({
            url: '/PersonOffice/purchasePersonSave',
            data: params,
            call: (data) => {
              if (data.type == 0) {
                this.$dialog.setReturnValue(this.id);
                this.$dialog.alert({
                  tipValue: data.message,
                  closeCallBack: () => {
                    this.$dialog.close()
                  }
                })
              }
            }
          })
        }
      },
    },
    created () {
      this.init({
        url: '/PersonOffice/initPurchasePersonForm',
        all: (data) => {
          //添加查看的时候都需要的代码
          this.categoryPurchase = data.categoryPurchasePsd.value
          this.categoryPurchaseList = data.categoryPurchasePsd.list
        },
        add: (data) => {
          //添加时独有的代码
          //初始化分组成员信息
        },
        look: (data) => {
          //查看时独有的信息
        }
      })
    }
  }
</script>

<style scoped>

</style>
