<template>
  <div class="f_main">
    <yhm-formbody>
      <template #title>基本信息</template>
      <template #control>
        <yhm-form-select title="所属公司" :value="name" id="name" @click="selectUnit" tip="value" rule="R0000" :no-click="true"></yhm-form-select>
        <yhm-form-date title="入库日期" :value="workDate" :no-edit="isWare" id="workDate" tip="value" rule="R0000" position="b"></yhm-form-date>
        <yhm-form-radio title="支票类型" :select-list="categoryList" :no-edit="isWare" @call="categoryEvent" :value="category" id="category" rule="R0000"></yhm-form-radio>
        <yhm-form-select title="购买人员" :value="getOperator" id="getOperator" v-if="isInit" @click="getOperatorEvent" rule="R0000" :no-click="true"></yhm-form-select>
        <yhm-form-date title="购买日期" :value="buyDate" :no-edit="isWare" :max="nowDate" v-if="isInit" id="buyDate" tip="value" rule="R0000" position="b"></yhm-form-date>
        <yhm-form-select title="对应账号" width="1" @click="accountEvent" :value="account" id="account" tip="value" rule="R0000" :no-click="isAcc"></yhm-form-select>
        <yhm-form-text title="购买张数" :value="quantity" :no-edit="isWare?'1':''" id="quantity" rule="R0000"></yhm-form-text>
        <yhm-form-text title="实际" subtitle="入库张数" :value="actualQuantity" id="actualQuantity" no-edit="1"></yhm-form-text>
      </template>
    </yhm-formbody>
    <div class="f_split"></div>
    <yhm-formbody>
      <template #title>支票号码明细</template>
      <template #opera>
        <yhm-commonbutton value="添加单张支票" icon="btnAdd" @call="addCheckNumEvent(0)"></yhm-commonbutton>
        <yhm-commonbutton value="添加连号支票（首张+张数）" icon="btnAdd" @call="addCheckNumEvent(1)"></yhm-commonbutton>
        <yhm-commonbutton value="添加连号支票（首尾）" icon="btnAdd" @call="addCheckNumEvent(2)"></yhm-commonbutton>
      </template>
      <template #control>
        <div class="check">
          <div class="check_main" v-for="(item,index) in list" :key="index">{{item.code}}<span @click="delCheck(index)" :class="{'red':deleteTheSwitch}" class="icon delete"></span></div>
          <div class="noTableData" v-if="isEmpty">暂时没有数据</div>
        </div>
      </template>
    </yhm-formbody>

    <yhm-formoperate :createName="createName" :insertDate="insertDate" :updateName="updateName" :updateDate="updateDate">
      <template #btn v-if="isBtn">
        <yhm-commonbutton value="保存" icon="btnSave" :flicker="true" @call="save()" category="one"></yhm-commonbutton>
      </template>
    </yhm-formoperate>
  </div>
</template>

<script>
  import { formmixin } from '@/assets/form.js'
  import { formatDate ,accAdd, guid,accMul} from '@/assets/common.js'
  export default {
    name: 'checkForm',
    mixins: [formmixin],
    data(){
      return {
        id:'',
        ownerID:'',
        name: '',
        workDate: formatDate(new Date()),
        getOperator: '',
        getOperatorID: '',
        category: '',
        category0: '',//现金初始化数量
        category1: '',//转账初始化数量

        categoryList: [],
        account: '',
        accountID: '',
        quantity: '',
        actualQuantity: '',
        isAcc: true,
        deleteTheSwitch: true,   //是否允许删除 true为可以删除
        list: [],
        isEmpty: true,
        listData: false,
        isState:'',
        isWare:false,
        isBtn: true,
        isInit: true,
        buyDate: '',
        nowDate: formatDate(new Date()),
        isInitType: ''
      }
    },
    methods:{
      delCheck(index){
        if(this.deleteTheSwitch === false){//不允许删除并将图标变为红色
        }else {this.$set(this.list.splice(index,1))}
      },
      /* 添加支票 */
      addCheckNumEvent(numType){
        if(!this.isWare) {
          if (this.quantity) {
            let title = '添加连号支票'
            if (numType === 0) {
              title = '添加单张支票'
            }
            this.$dialog.OpenWindow({
              width: '1050',
              height: '500',
              title: title,
              url: '/addCheckNumForm?numType=' + numType + '&quantity=' + this.quantity,
              closeCallBack: (data) => {
                if (data) {
                  this.checkNum = data.checkNum
                  this.checkFir = data.checkFir
                  this.checkSheet = data.checkSheet
                  this.checkLast = data.checkLast

                  if (numType === 0) {
                    if (this.list.find((element) => (element.code == this.checkNum)) === undefined) {
                      this.list.push({
                        id: guid(),
                        ownerID: this.id,
                        code: this.checkNum,
                      })
                    }
                  } else if (numType === 1) {
                    if (this.quantity !== '1') {
                      let aa = parseInt(this.checkFir) - 1
                      for (let i = 0; i < this.checkSheet; i++) {
                        aa += 1
                        if (this.list.find((element) => (element.code == aa)) === undefined) {
                          this.list.push({
                            id: guid(),
                            ownerID: this.id,
                            code: aa
                          })
                        }
                      }
                    } else {
                      if (this.list.find((element) => (element.code == this.checkNum)) === undefined) {
                        this.list.push({
                          id: guid(),
                          ownerID: this.id,
                          code: this.checkFir,
                        })
                      }
                    }
                  } else if (numType === 2) {
                    if (this.quantity !== '1') {
                      if (parseInt(this.checkLast) > parseInt(this.checkFir)) {
                        let aa = parseInt(this.checkLast) - parseInt(this.checkFir)
                        let bb = parseInt(this.checkFir) - 1
                        for (let i = 0; i < aa + 1; i++) {
                          bb += 1
                          if (this.list.find((element) => (element.code == bb)) === undefined) {
                            this.list.push({
                              id: guid(),
                              ownerID: this.id,
                              code: bb
                            })
                          }
                        }
                      }
                    } else {
                      if (this.list.find((element) => (element.code == this.checkNum)) === undefined) {
                        this.list.push({
                          id: guid(),
                          ownerID: this.id,
                          code: this.checkFir,
                        })
                      }
                    }
                  }
                }
              }
            })
          } else {
            this.$dialog.alert({
              width: '300',
              alertImg: 'warn',
              tipValue: '请输入购买张数！！！'
            })
          }
        }
      },
      /* 选择购买人员 */
      getOperatorEvent(){
        return
        this.$dialog.OpenWindow({
          width: '950',
          height: '692',
          title: '选择购买人员',
          url: '/selectPerson',
          closeCallBack: (data)=>{
            if(data){
              this.getOperator = data.name
              this.getOperatorID = data.id
            }
          }
        })
      },
      /* 选择所属公司 */
      selectUnit(){

      },
      /* 选择对应账号 */
      accountEvent(){
        this.$dialog.OpenWindow({
          width: '950',
          height: '692',
          title: '选择银行账户信息',
          url: '/selectPublicAccount?categoryBefore=1&categoryUnit=0&category=1&categoryAccBefore=1',
          closeCallBack: (data)=>{
            if(data){
              this.account = data.name +'  '+ data.publicAccountExplain
              this.accountID = data.id
            }
          }
        })
      },
      /* 支票类型 */
      categoryEvent(){
        this.isAcc = this.category !== '1';
        if(this.category0==='0'&&this.category==='0'){
          this.isInit = false
        }else if(this.category1==='0'&&this.category==='1'){
          this.isInit = false
        }else{
          this.isInit = true
        }
      },
      btnAddSave(){

      },
      save(){

        let aa = true
        if(parseInt(this.actualQuantity) < parseInt(this.quantity)){
          aa = false
        }

        if(!aa){
          this.$dialog.alert({
            width: '300',
            alertImg: 'warn',
            tipValue: '数量不够',
            closeCallBack: ()=>{

            }
          })
        }

        if(!this.listData){
          this.$dialog.alert({
            width: '300',
            alertImg: 'warn',
            tipValue: '支票数据不能为空！！！'
          })
        }

        if(this.validator() && this.listData && aa){
          if(this.category0==='0'&&this.category==='0'){
            this.buyDate=''
            this.getOperator=''
            this.getOperatorID=''
          }else if(this.category1==='0'&&this.category==='1'){
            this.buyDate=''
            this.getOperator=''
            this.getOperatorID=''
          }
          let params = {
            id: this.id,
            ownerID: this.ownerID,
            name: this.name,
            workDate: this.workDate,
            getOperator: this.getOperator,
            getOperatorID: this.getOperatorID,
            category: this.category,
            account: this.account,
            accountID: this.accountID,
            quantity: this.quantity,
            actualQuantity: this.actualQuantity,
            detailList: this.list,
            buyDate: this.buyDate,
          }
          this.ajaxJson({
            url: '/Bill/checksSave',
            data: params,
            call: (data)=>{
              if(data.type === 0){
                this.$dialog.setReturnValue(this.id)
                this.$dialog.alert({
                  tipValue: data.message,
                  closeCallBack: (data)=>{
                    this.$dialog.close()
                  }
                })
              }else{
                let width = 250
                width = accAdd(width, accMul(data.message.length, 10))
                this.$dialog.alert({
                  width: width,
                  alertImg: 'error',
                  tipValue: data.message
                })
              }
            }
          })
        }
      },
      initData(){
        this.init({
          url: '/Bill/checksForm',
          all: (data)=>{
            this.ownerID = data.ownerID
            this.name = data.name
            this.workDate = data.workDate

            this.categoryList = data.categoryPsd.list
            this.category = data.categoryPsd.value

            if(this.isInitType === '1'){
              this.getOperator = ''
              this.getOperatorID = ''
            }else {
              this.getOperator = data.getOperator
              this.getOperatorID = data.getOperatorID
              this.buyDate = data.buyDate
              if(!this.getOperator){
                this.isInit = false
              }
            }
            if(this.category0==='0'&&this.category==='0'){
              this.isInit = false
            }else if(this.category1==='0'&&this.category==='1'){
              this.isInit = false
            }else{
              if(data.operatorDate === '1900-01-01'&&data.id!==''){
                this.isInit = false
              }
            }

            this.account = data.account
            this.accountID = data.accountID
          },
          add: (data)=>{
            this.id = guid()
          },
          look: (data)=>{

            this.quantity = data.quantity
            this.actualQuantity = data.actualQuantity
            this.list = data.detailList
          }
        })
      }
    },
    created () {
      this.setQuery2Value('isState')
      this.setQuery2Value('isInitType')
      if(this.isInitType === '1'){
        this.isInit = false
      }else {
        this.isInit = true
      }
      if(this.isState === '1'){
        this.deleteTheSwitch = false
        this.isWare = true
        this.isBtn = false
      }else {
        this.deleteTheSwitch = true
        this.isWare = false
        this.isBtn = true
      }
      this.init({
        url: '/Bill/checksInitialization',
        all: (data)=>{
          this.category0=data.number0
          this.category1=data.number1
        }
      })
      this.initData()
    },
    watch: {
      list(){
        this.actualQuantity = this.list.length + ''
        if(this.list.length !== 0){
          this.isEmpty = false
          this.listData = true
        }else {
          this.isEmpty = true
          this.listData = false
        }
      }
    }
  }
</script>

<style scoped>
  .check{
    width: 100%;
    margin: -16px 16px 8px 16px;
  }
  .check_main{
    width: 180px;
    height: 30px;
    line-height: 30px;
    margin: 8px 5.5px 0 5.5px;
    background-color: #fff;
    border-radius: 4px;
    border: 1px solid #ccc;
    float: left;
    font-size: 15px;
    padding: 0 5px 0 20px;
  }
  .delete{
    float: right;
    font-size: 16px;
  }
  .red{
    color: #FF0000;
  }

</style>
