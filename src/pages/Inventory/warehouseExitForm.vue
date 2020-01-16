<template>
  <div class="f_main">
    <yhm-formbody>
      <template #title>基本信息</template>
      <template #control>
        <yhm-form-select title="经办人" :value="person" id="person" @click="selectPerson" rule="R0000"></yhm-form-select>
        <yhm-form-date title="出库日期" :value="workDate" id="workDate" rule="R0000" @call="initCode"></yhm-form-date>
        <yhm-form-text title="总金额" tip="money" before-icon="rmb" :value="money" id="money" no-edit="1"></yhm-form-text>
        <yhm-form-text title="编号" :value="code" id="code" no-edit="1"></yhm-form-text>
        <yhm-form-textarea title="备注" :value="remark" id="remark"></yhm-form-textarea>
      </template>
    </yhm-formbody>
    <div class="f_split"/>
    <yhm-form-list-edit>
      <template #title>出库商品列表</template>
      <template #operate>
        <yhm-commonbutton  value="添加商品明细" icon="btnAdd" @call="addProduct"></yhm-commonbutton>
      </template>
      <template #listHead>
        <yhm-managerth style="width: 50px" title="序号"></yhm-managerth>
        <yhm-managerth style="width: 160px" title="商品名称"></yhm-managerth>
        <yhm-managerth style="width: 180px" title="型号"></yhm-managerth>
        <yhm-managerth style="width: 80px" title="数量"></yhm-managerth>
        <yhm-managerth style="width: 80px" title="存量"></yhm-managerth>
        <yhm-managerth style="width: 60px" title="单位"></yhm-managerth>
        <yhm-managerth style="width: 90px" title="单价"></yhm-managerth>
        <yhm-managerth style="width: 90px" title="总额"></yhm-managerth>
        <yhm-managerth style="width: 130px" title="备注"></yhm-managerth>
        <yhm-managerth style="width: 40px" title="删除"></yhm-managerth>
      </template>
      <template #listBody>
        <tr v-for="(item,index) in warehouseExitDetails" :key="index" :class="{InterlacBg:index%2!==0}">
          <yhm-form-td-textbox width="50"  no-edit="1" id="num" :list="warehouseExitDetails" listid="warehouseExitDetails" :value="item"></yhm-form-td-textbox>
          <yhm-form-td-textbox width="160" tip="value" no-edit="1" id="product" :list="warehouseExitDetails" listid="warehouseExitDetails" :value="item" ></yhm-form-td-textbox>
          <yhm-form-td-select-dialog width="180" tip="value" @call="selectModel(item)" id="model" :list="warehouseExitDetails" listid="warehouseExitDetails" :value="item" rule="#"></yhm-form-td-select-dialog>
          <yhm-form-td-textbox width="80" @input="calculationTotalMoney(item)" :list="warehouseExitDetails" listid="warehouseExitDetails" :value="item" id="quantity"></yhm-form-td-textbox>
          <yhm-form-td-textbox width="80"  id="remainder" no-edit="1" :list="warehouseExitDetails" listid="warehouseExitDetails" :value="item"  ></yhm-form-td-textbox>
          <yhm-form-td-textbox width="60" tip="value" no-edit="1" id="unit" :list="warehouseExitDetails" listid="warehouseExitDetails" :value="item"></yhm-form-td-textbox>
          <yhm-form-td-textbox width="90" tip="money" before-icon="rmb" @input="calculationTotalMoney(item)" :list="warehouseExitDetails" listid="warehouseExitDetails" :value="item" id="price"></yhm-form-td-textbox>
          <yhm-form-td-textbox width="90" tip="money" no-edit="1" tip-left="-53" tip-arrow-left="70" before-icon="rmb" id="totalMoney"  :list="warehouseExitDetails" listid="warehouseExitDetails" :value="item"></yhm-form-td-textbox>
          <yhm-form-td-textbox width="130"  id="remark" :list="warehouseExitDetails" listid="warehouseExitDetails" :value="item"  ></yhm-form-td-textbox>
          <yhm-form-td-delete width="40" :list="warehouseExitDetails" :value="item" :del-click="true" @click="delProduct(index,item)"></yhm-form-td-delete>
        </tr>
      </template>
      <template #empty>
        <span class="m_listNoData" v-show="empty">暂时没有数据</span>
      </template>
    </yhm-form-list-edit>

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
    name: 'warehouseExitForm',
    mixins: [formmixin],
    data(){
      return{
        id:'',
        personID:'',        //经办人ID
        person:'',          //经办人
        workDate:'',        //出库日期
        money:'',           //总金额
        code:'',            //编号
        remark:'',
        warehouseExitDetails:[],  //商品明细

        empty:true,
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
              this.initCode()
            }
          }
        })
      },
      //初始化编号
      initCode(){
        let params = {
          workDate:this.workDate,
          personID:this.personID,
        }
        this.ajaxJson({
          url: '/Basic/initWarehouseExitCode',
          data: params,
          call: (data) => {
            let personCount = data.val
            if(personCount < 10){
              personCount = '00'+data.val
            }else {
              personCount = '0'+data.val
            }
            this.code = 'CK'+data.id+personCount
          }
        })
      },
      //添加商品明细
      addProduct(){
        this.$dialog.OpenWindow({
          width: 950,
          height: 603,
          url: '/selectProduct',
          title: '选择商品信息',
          closeCallBack: (data) => {
            if (data) {
              let insertDate = new Date(accAdd(new Date().getTime(), accMul(this.warehouseExitDetails.length, 1000)))
              let num = accAdd(this.warehouseExitDetails.length,1) + ''
              this.warehouseExitDetails.push({
                id: guid(),
                insertDate: formatTime(insertDate),
                ownerID: this.id,
                num:num,
                productID:data.id,
                product:data.name,
                modelID:'',
                model:'',
                quantity:'1',
                remainder:'1',
                unit:data.unit,
                price:'',
                totalMoney:'',
                remark:'',
              })
              this.empty = this.warehouseExitDetails.length === 0
            }
          }
        })
      },
      //删除商品
      delProduct(index,item){
        this.warehouseExitDetails.splice(index,1)
        this.empty = this.warehouseExitDetails.length === 0
        this.calculationMoney()
      },
      //选择商品型号
      selectModel(item){
        this.$dialog.OpenWindow({
          width: 950,
          height: 603,
          url: '/selectModel?ownerID=' + item.productID,
          title: '选择商品规格型号信息',
          closeCallBack: (data) => {
            if (data) {
              let that = data;
              this.ajaxJson({
                url: '/Basic/getModelQuantity?modelID='+data.id,
                call: (data) => {
                  if (data){
                    if(data === '0'){
                      this.$dialog.alert({
                        tipValue: '该商品暂无库存',
                        alertImg: 'warn'
                      })
                    }else {
                      item.remainder = data
                      item.modelID = that.id
                      item.model = that.name
                      item.price = that.price
                      this.calculationTotalMoney(item)
                    }
                  }
                }
              })
            }
          }
        })
      },
      //计算单条总价
      calculationTotalMoney(item){
        let price = item.price
        let quantity = item.quantity
        let remainder = item.remainder
        if(isNaN(price) || price === ''){
          price = 0
        }
        if(isNaN(quantity) || quantity === ''){
          quantity = 0
        }
        if(isNaN(remainder) || remainder === ''){
          remainder = 0
        }
        if (parseFloat(quantity)>parseFloat(remainder)){
          quantity = remainder
          item.quantity = item.remainder
        }
        item.totalMoney = accMul(price,quantity) + ''
        this.calculationMoney()
      },
      //计算总额
      calculationMoney(){
        let money = 0
        for (let i = 0; i < this.warehouseExitDetails.length; i++){
          let temp = this.warehouseExitDetails[i].totalMoney
          if(isNaN(temp) || temp === ''){
            temp = 0
          }
          money = accAdd(money,temp)
        }
        this.money = money + ''
      },
      //保存
      save(){
        let a = this.validator()
        let b = this.warehouseExitDetails.length > 0
        if(a && !b){
          this.$dialog.alert({
            tipValue: '商品明细必须添加',
            alertImg: 'warn',
            closeCallBack:() => {
              this.addProduct()
            }
          })
        }
        if(a && b){
          let params = {
            id:this.id,
            personID:this.personID,        //经办人ID
            person:this.person,        //经办人
            workDate:this.workDate,        //入库日期
            money:this.money,          //总金额
            code:this.code,            //编号
            remark:this.remark,            //编号
            warehouseExitDetails:this.warehouseExitDetails,  //商品明细
          }
          this.ajaxJson({
            url: '/Basic/saveWarehouseExit',
            data: params,
            call: (data) => {
              if (data.type == 0) {
                this.category = data.val
                this.$dialog.setReturnValue(this.id)
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
        url: '/Basic/initWarehouseExitForm',
        all: (data) => {
          //添加查看的时候都需要的代码
        },
        add: (data) => {
          //添加时独有的代码
          //初始化分组成员信息

        },
        look: (data) => {
          //查看时独有的信息
          this.id = data.id
          this.personID = data.personID
          this.person = data.person
          this.workDate = data.workDate
          this.money = data.money
          this.code = data.code
          this.remark = data.remark
          this.warehouseExitDetails = data.warehouseExitDetails
          if (this.warehouseExitDetails.length>0){
            this.empty = false
          }
        }
      })
    }
  }
</script>

<style scoped>

</style>
