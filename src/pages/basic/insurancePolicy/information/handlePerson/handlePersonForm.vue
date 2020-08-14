<template>
  <div class="f_main">
    <yhm-formbody>
      <template #title>添加信息</template>
      <template #control>
        <yhm-form-select  title="负责人" tip="value" @click="principalEvent" :value="principal" id="principal" rule="R0000"></yhm-form-select>
        <yhm-form-select  title="业务员" tip="value" @click="salesmanEvent" :value="salesman" id="salesman" rule="R0000"></yhm-form-select>
        <yhm-form-text placeholder=""  title="出单员" subtitle="" :value="billClerk" id="billClerk" rule="R0000" :no-edit="isEdit"></yhm-form-text>
        <yhm-form-select  title="收银员" tip="value" @click="cashierEvent" :value="cashier" id="cashier" rule="R0000"></yhm-form-select>

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
    name: 'handlePersonForm',
    mixins: [formmixin],
    data(){
      return{
        id:'',
        principal:'',//负责人
        salesman:'',//业务员
        billClerk:'',//出单员
        cashier:'',//收银员
        isEdit: '1',

      }
    },
    methods: {
      principalEvent () {
        this.$dialog.OpenWindow({
          width: 950,
          height: 692,
          url: '/selectPerson?category=0&categoryBefore=1',
          title: '选择联系人',
          closeCallBack: (data) => {
            if (data) {
              this.principal = data.name
            }
          }
        })
      },
      salesmanEvent () { //客户经理点击事件
        this.$dialog.OpenWindow({
          width: 950,
          height: 692,
          url: '/selectPerson?category=0&categoryBefore=1',
          title: '选择联系人',
          closeCallBack: (data) => {
            if (data) {
              this.salesman = data.name
            }
          }
        })
      },
      cashierEvent () { //客户经理点击事件
        this.$dialog.OpenWindow({
          width: 950,
          height: 692,
          url: '/selectPerson?category=0&categoryBefore=1',
          title: '选择联系人',
          closeCallBack: (data) => {
            if (data) {
              this.cashier = data.name
            }
          }
        })
      },
      save() {
        if (this.validator()) {
          let params = {
            id: this.id,
            principal:this.principal,
            salesman:this.salesman,
            billClerk: this.billClerk,
            cashier: this.cashier,

          }
          this.ajaxJson({
            url: '/Basic/saveHandlePerson',
            data: params,
            call: (data) => {
              if (data.type === 0) {
                this.$dialog.setReturnValue(this.id)
                this.$dialog.alert({
                  tipValue: data.message,
                  closeCallBack: () => {
                    this.$dialog.close()
                  }
                })
              }else if(data.type === 1){
                this.$dialog.alert({
                  alertImg:'warn',
                  tipValue: data.message
                })
              }
            }
          })
        }
      }
    },
    created () {
      this.init({
        url: '/Basic/initHandlePersonForm',
        all: (data) => {
          this.billClerk=this.createName
        },
        add: (data) => {
          /* 需要添加的数据 */
        },
        look: (data) => {
          /* 需要查看的数据 */
          this.principal=data.principal //负责人
          this.salesman=data.salesman   //业务员
          this.billClerk=data.billClerk  //出单员
          this.cashier=data.cashier   //收银员
        }
      })
    }

  }
</script>

<style scoped>
.formdropdownselect{
  width: 490px !important;
}
</style>
