<template>
  <div class="f_main">
    <yhm-formbody>
      <template #title>基本信息</template>
      <template #control>
        <yhm-form-text title="申请人" :value="person" id="person" no-edit="1"></yhm-form-text>
        <div class="fc_split"></div>
        <yhm-form-radio title="采购分类" @call="switchCategoryPurchase" :select-list="categoryPurchaseList" :value="categoryPurchase" id="categoryPurchase"></yhm-form-radio>
        <yhm-form-date :no-edit="true" title="申请日期" :value="workDate" id="workDate"></yhm-form-date>
        <yhm-form-radio title="采购类型" :no-show-item="modelNoList" :select-list="modelList" :value="model" id="model"></yhm-form-radio>
        <yhm-form-date title="预计" subtitle="使用日期" :value="lastDate" id="lastDate" :min="workDate" rule="R0000"></yhm-form-date>
        <yhm-form-text title="预估价值" tip="money" before-icon="rmb" :value="money" id="money" no-edit="1"></yhm-form-text>
        <yhm-form-text title="编号" :value="code" id="code" no-edit="1"></yhm-form-text>
      </template>
    </yhm-formbody>
    <div class="f_split"></div>

    <yhm-form-list-edit>
      <template #title>商品列表</template>
      <template #operate>
        <yhm-commonbutton  value="添加商品明细" icon="btnAdd" @call="addProduct"></yhm-commonbutton>
      </template>
      <template #listHead>
        <yhm-managerth style="width: 50px" title="序号"></yhm-managerth>
        <yhm-managerth style="width: 160px" title="商品名称"></yhm-managerth>
        <yhm-managerth style="width: 180px" title="型号"></yhm-managerth>
        <yhm-managerth style="width: 90px" title="数量"></yhm-managerth>
        <yhm-managerth style="width: 60px" title="单位"></yhm-managerth>
        <yhm-managerth style="width: 90px" title="参考单价"></yhm-managerth>
        <yhm-managerth style="width: 90px" title="参考总额"></yhm-managerth>
        <yhm-managerth style="width: 200px" title="建议品牌"></yhm-managerth>
        <yhm-managerth style="width: 40px" title="删除"></yhm-managerth>
      </template>
      <template #listBody>
        <tr v-for="(item,index) in productDetails" :key="index" :class="{InterlacBg:index%2!==0}">
          <yhm-form-td-textbox width="50"  no-edit="1" id="num" :list="productDetails" listid="productDetails" :value="item"></yhm-form-td-textbox>
          <yhm-form-td-textbox width="160" tip="value" no-edit="1" id="product" :list="productDetails" listid="productDetails" :value="item" ></yhm-form-td-textbox>
          <yhm-form-td-select-dialog width="180" tip="value" @call="selectModel(item)" id="model" :list="productDetails" listid="productDetails" :value="item" rule="#"></yhm-form-td-select-dialog>
          <yhm-form-td-textbox width="90" @input="calculationTotalMoney(item)" :list="productDetails" listid="productDetails" :value="item" id="quantity"></yhm-form-td-textbox>
          <yhm-form-td-textbox width="60" tip="value" no-edit="1" id="unit" :list="productDetails" listid="productDetails" :value="item"></yhm-form-td-textbox>
          <yhm-form-td-textbox width="90" tip="money" before-icon="rmb" @input="calculationTotalMoney(item)" :list="productDetails" listid="productDetails" :value="item" id="price"></yhm-form-td-textbox>
          <yhm-form-td-textbox width="90" tip="money" no-edit="1" tip-left="-53" tip-arrow-left="70" before-icon="rmb" id="totalMoney"  :list="productDetails" listid="productDetails" :value="item"></yhm-form-td-textbox>
          <yhm-form-td-textbox width="200"  id="remark" :list="productDetails" listid="productDetails" :value="item"  ></yhm-form-td-textbox>
          <yhm-form-td-delete width="40" :list="productDetails" :value="item" :del-click="true" @click="delProduct(index,item)"></yhm-form-td-delete>
        </tr>
      </template>
      <template #empty>
        <span class="m_listNoData" v-show="empty">暂时没有数据</span>
      </template>
    </yhm-form-list-edit>

    <yhm-formoperate :createName="createName" :insertDate="insertDate" :updateName="updateName" :updateDate="updateDate">
      <template #btn>
        <yhm-commonbutton value="保存" icon="btnSave" :flicker="true" @call="save(0)"></yhm-commonbutton>
        <yhm-commonbutton value="保存并提交" icon="btnSubSave" @call="save(1)"></yhm-commonbutton>
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
        category:'',        //流程类型
        code:'',
        unitID:'',
        categoryPurchase:'',        //采购分类
        categoryPurchaseList:[],    //采购分类明细
        model:'',           //采购类型
        modelList:[],       //采购类型明细
        modelNoList:[],     //不显示的采购类型明细
        personID:'',        //申请人ID
        person:'',          //申请人
        workDate:'',        //申请日期
        lastDate:'',        //最迟到货日期
        money:'',
        productDetails:[],  //商品明细

        state:'0',          //审批状态
        isFinish:'0',       //事件状态
        empty:true,
        isShowSubmit:false
      }
    },
    methods:{
      //切换采购分类
      switchCategoryPurchase(){
        this.initModelNoList()
        this.initCode()
      },
      initModelNoList(){
        if(this.categoryPurchase === '0'){//0,1
          if(this.model !== '0' || this.model !== '1'){
            this.model = '0'
          }
          this.modelNoList = ['2','3','4']
        }
        else if(this.categoryPurchase === '1'){//0,4
          if(this.model !== '0' || this.model !== '4'){
            this.model = '0'
          }
          this.modelNoList = ['1','2','3']
        }
        else if(this.categoryPurchase === '2'){//2,3
          if(this.model !== '2' || this.model !== '3'){
            this.model = '2'
          }
          this.modelNoList = ['0','1','4']
        }
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
              let insertDate = new Date(accAdd(new Date().getTime(), accMul(this.productDetails.length, 1000)))
              let num = accAdd(this.productDetails.length,1) + ''
              this.productDetails.push({
                id: guid(),
                insertDate: formatTime(insertDate),
                ownerID: this.id,
                num:num,
                productID:data.id,
                product:data.name,
                modelID:'',
                model:'',
                quantity:'1',
                unit:data.unit,
                price:'',
                totalMoney:'',
                remark:'',
              })
              this.empty = this.productDetails.length === 0
            }
          }
        })
      },
      //删除商品
      delProduct(index,item){
        this.productDetails.splice(index,1)
        this.empty = this.productDetails.length === 0
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
              item.modelID = data.id
              item.model = data.name
              item.price = data.price
              item.totalMoney = data.price
              this.calculationTotalMoney(item)
            }
          }
        })
      },
      //初始化编号
      initCode(){
        let money = this.money
        if(!isNaN(money) && money !== ''){
          let categoryPurchaseCode = ''
          for(let i = 0;i < this.categoryPurchaseList.length; i++){
            if(this.categoryPurchaseList[i].num === this.categoryPurchase){
              categoryPurchaseCode = this.categoryPurchaseList[i].code
              break
            }
          }
          let params = {
            id:this.id,
            workDate:this.workDate,
            categoryPurchase:this.categoryPurchase,
            categoryPurchaseCode:categoryPurchaseCode,
            money:money
          }
          this.ajaxJson({
            url: '/PersonOffice/initPurchaseCode',
            data: params,
            loading:'0',
            call: (data) => {
              if (data.type === 0) {
                this.code = data.val
              }
              else{
                this.$dialog.alert({
                  tipValue: data.message,
                  alertImg:'error',
                  closeCallBack: () => {
                    this.code = ''
                  }
                })
              }
            }
          })
        }
      },
      //计算单条总价
      calculationTotalMoney(item){
        let price = item.price
        let quantity = item.quantity
        if(isNaN(price) || price === ''){
          price = 0
        }
        if(isNaN(quantity) || quantity === ''){
          quantity = 0
        }
        item.totalMoney = accMul(price,quantity) + ''
        this.calculationMoney()
      },
      //计算总额
      calculationMoney(){
        let money = 0
        for (let i = 0; i < this.productDetails.length; i++){
          let temp = this.productDetails[i].totalMoney
          if(isNaN(temp) || temp === ''){
            temp = 0
          }
          money = accAdd(money,temp)
        }
        this.money = money + ''
        this.initCode()
      },
      //保存
      save(op){
        let a = this.validator()
        let b = this.productDetails.length > 0
        if(!b){
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
            unitID:this.unitID,
            code:this.code,
            categoryPurchase:this.categoryPurchase,
            model:this.model,
            personID:this.personID,
            person:this.person,
            workDate:this.workDate,
            lastDate:this.lastDate,
            money:this.money,
            state:this.state,
            isFinish:this.isFinish,
            productDetails:this.productDetails
          }
          this.ajaxJson({
            url: '/PersonOffice/savePurchase',
            data: params,
            call: (data) => {
              if (data.type == 0) {
                this.category = data.val
                this.$dialog.setReturnValue(this.id)
                if(op === 0) {
                  this.$dialog.alert({
                    tipValue: data.message,
                    closeCallBack: () => {
                      this.isShowSubmit = true
                    }
                  })
                }
                else{
                  //保存并提交
                  this.submitEvent()
                }
              }
            }
          })
        }
      },
      //提交申请
      submitEvent(){
        this.$dialog.confirm({
          width: 250,
          tipValue: '确定提交申请?',
          btnValueOk: '确定',
          alertImg: 'warn',
          okCallBack: (data) => {
            let params = {
              id: this.id,
              category: this.category,
              tableName: 46,
              isDetail: 0
            }
            this.ajaxJson({
              url: '/PersonOffice/approvalSubmitVue',
              data: params,
              call: (data) => {
                if (data.type === 0) {
                  if (this.category === '17'){
                    let params = {
                      id: this.id,
                      tableName: 46
                    }
                    this.ajaxJson({
                      url: '/PersonOffice/approvalAutoPass',
                      data: params,
                      call: (data) => {
                        this.$dialog.alert({
                          width: 350,
                          tipValue: data.message,
                          closeCallBack: () => {
                            this.$dialog.setReturnValue(data)
                            this.$dialog.close()
                          }
                        })
                      }
                    })
                  }else{
                    this.$dialog.alert({
                      tipValue: data.message,
                      closeCallBack: () => {
                        this.$dialog.setReturnValue(data)
                        this.$dialog.close()
                      }
                    })
                  }
                } else {
                  this.$dialog.alert({
                    alertImg: 'error',
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
    },
    created () {
      this.init({
        url: '/PersonOffice/initPurchaseForm',
        all: (data) => {
          //添加查看的时候都需要的代码
          this.categoryPurchase = data.categoryPurchasePsd.value
          this.categoryPurchaseList = data.categoryPurchasePsd.list
          this.model = data.modelPsd.value
          this.modelList = data.modelPsd.list
          this.initModelNoList()
          this.unitID = data.unitID
          this.personID = data.personID
          this.person = data.person
          this.workDate = data.workDate
        },
        add: (data) => {
          //添加时独有的代码
          //初始化分组成员信息

        },
        look: (data) => {
          //查看时独有的信息
          this.category = data.category
          this.code = data.code
          this.money = data.money
          this.lastDate = data.lastDate
          this.state = data.state
          this.isFinish = data.isFinish
          this.productDetails = data.productDetails
          this.empty = this.productDetails.length === 0
        }
      })
    }
  }
</script>

<style scoped>

</style>
