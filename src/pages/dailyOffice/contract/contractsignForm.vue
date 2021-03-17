<template>
  <div class="f_main f_main_customize">
    <yhm-formbody>
      <template #title>添加信息</template>
      <template #control>
        <yhm-form-text placeholder=""  title="合同名称" subtitle=""  :value="name" id="name" rule="R0000"  ></yhm-form-text>
        <yhm-form-radio title="合同格式" subtitle=""   :select-list="formatList" :value="format" id="format" rule="R0000" ></yhm-form-radio>
        <yhm-form-select  title="负责人"  :value="chargePerson" id="chargePerson" @click="chargePersonEvent" rule="R0000"></yhm-form-select>
        <yhm-form-select  title="所属客户"  :value="customers" id="customers" @click="customersEvent" rule="R0000">
          <span class="formBoxIcon beinSpan" :class="'i-uniE9b0'+insuredState" @click="iconClick"></span>
        </yhm-form-select>
        <yhm-form-radio title="签署类型" subtitle="" @call="sigCall" width="1" :select-list="signatureTypeList" :value="signatureType" id="signatureType" rule="R0000" ></yhm-form-radio>
        <yhm-form-radio title="合同状态" subtitle=""  width="1" :select-list="stateList" :value="state" id="state" rule="R0000" ></yhm-form-radio>
        <yhm-form-radio title="合同" subtitle="收付款项" :select-list="paymentItemsList" :value="paymentItems" id="paymentItems" rule="R0000" ></yhm-form-radio>
        <yhm-form-text placeholder=""  title="总金额" subtitle=""  :value="totalMoney" id="totalMoney" :rule="totalMoney==''?'':'R1501'" ></yhm-form-text>

        <yhm-form-date title="开始日期"  :value="startTime" id="startTime " position="t" rule="R0000"></yhm-form-date>
        <yhm-form-date title="结束日期" :min="startTime" :value="endTime" id="endTime " position="t"></yhm-form-date>
        <yhm-formupload :ownerID="id" :value="fileList" id="fileList" title="合同文件" tag="contract" multiple="multiple" category="3" ></yhm-formupload>
      </template>
    </yhm-formbody>
    <div class="f_split"></div>
    <yhm-form-list-edit >
      <template #title>产品详情信息</template>
      <template #operate>
        <yhm-commonbutton value="选择商品" color="#9F0B9F" icon="btnAdd" @call="selectProduct"></yhm-commonbutton>
        <yhm-commonbutton value="添加商品" color="#0606A5" icon="btnAdd" @call="addPromotions"></yhm-commonbutton>
        <!--        <yhm-commonbutton value="添加优惠活动" icon="btnAdd" @call="addDetail"></yhm-commonbutton>-->
      </template>
      <template #listHead>
        <yhm-managerth style="width: 40px" title="序号"></yhm-managerth>
        <yhm-managerth  title="名称"></yhm-managerth>
        <yhm-managerth  title="规格型号"></yhm-managerth>
        <yhm-managerth  title="计量单位"></yhm-managerth>
        <yhm-managerth  title="单价"></yhm-managerth>
        <yhm-managerth  title="数量"></yhm-managerth>
        <yhm-managerth  title="总金额"></yhm-managerth>
        <yhm-managerth  style="width: 40px" title="删除"></yhm-managerth>
      </template>
      <template #listBody>
        <tr v-for="(item,index) in detailsList" :key="index" :class="{InterlacBg:index%2!==0}">
          <yhm-manager-td-center   :value="index+1+''"></yhm-manager-td-center>

          <yhm-form-td-textbox width="150" :list="detailsList"  listid="detailsList" :value="item" id="productName" rule="R0000"></yhm-form-td-textbox>
          <yhm-form-td-textbox width="150" :list="detailsList" listid="detailsList" :value="item" id="productSpec" ></yhm-form-td-textbox>
          <yhm-form-td-textbox width="150" :list="detailsList"  listid="detailsList" :value="item" id="productCompany" rule="R0000"></yhm-form-td-textbox>
          <yhm-form-td-textbox width="150" :list="detailsList" @input="spec(item,index)"  listid="detailsList" :value="item" id="productPrice"  rule="R0000"></yhm-form-td-textbox>
          <yhm-form-td-textbox width="150" :list="detailsList" @input="price(item,index)" listid="detailsList" :value="item" id="productNumber" rule="R0000"></yhm-form-td-textbox>
          <div style="text-align: center;">{{item.money}}</div>
          <yhm-form-td-delete   width="40" :list="detailsList"  listid="detailsList" :value="item" :del-click="true" @click="delDiscount(index,item)"></yhm-form-td-delete>
        </tr>
      </template>
      <template #empty>
        <span class="m_listNoData" v-show="detailsList.length>0?false:true">暂时没有数据</span>
      </template>
    </yhm-form-list-edit>
    <yhm-formoperate :createName="createName" :insertDate="insertDate" :updateName="updateName" :updateDate="updateDate">
      <template #btn>
        <yhm-commonbutton value="保存" icon="btnSave" @call="save()"></yhm-commonbutton>
        <!--<yhm-commonbutton value="保存并提交" icon="btnSave" :flicker="true" @call="submit()"></yhm-commonbutton>-->
      </template>
    </yhm-formoperate>

  </div>
</template>

<script>
  import { accMul, accAdd, guid, formatDate,formatTime } from '@/assets/common.js'
  import { formmixin } from '@/assets/form.js'
  export default {
    name: 'contractsignForm',
    mixins: [formmixin],
    data(){
      return {
        id:'',
        name:'',//合同名称
        chargePerson:'',
        chargePersonID:'',//负责人
        startTime:'',//签署时间
        endTime:'',//结束时间
        insuredState:'0',//0联系人
        customers:'',
        customersID:'',//签署客户
        signatureType:'',
        signatureTypeList:[],//签署类型
        totalMoney:'',
        fileList:[],
        state:'',
        stateList:[],// 合同状态
        type:'',//合同签署
        detailsList:[],
        productName:'',//商品名称
        productSpec:'', //规格型号
        productPrice:'', //单价
        productNumber:'1', //数量
        productCompany:'',   //计量单位
        money:'',
        format:'',
        formatList:[], //合同格式
        paymentItems:'',
        paymentItemsList:[],//合同收付款
        isCarWash:false
      }
    },
    methods: {
      sigCall(val,item){
          // console.log(item)
        // if (item.code==0){
        //   this.isCarWash=true
        // }
      },
      selectProduct(){
        this.$dialog.OpenWindow({
          width: 1050,
          height: 603,
          url: '/selectProduct',
          title: '选择商品信息',
          closeCallBack: (data) => {
            if (data) {
              for(let i in this.detailsList){
                if(this.detailsList[i].productName==data.name){
                  this.$dialog.alert({
                    tipValue:'当前数据已存在',
                    alertImg:'warn',
                    width:'300'
                  })
                  return
                }
              }
              let insertDate = new Date(accAdd(new Date().getTime(), accMul(this.detailsList.length, 1000)))
              this.detailsList.push({
                id: guid(),
                insertDate: formatTime(insertDate),
                ownerID: this.id,
                state:'1',
                productID:data.id,
                productName: data.name,
                productSpec: '',
                productPrice:'',
                productNumber: '1',
                productCompany:data.unit,
              })
            }
          }
        })
      },
      spec(item,index) {
        if(item.productNumber!=''){
          item.money=Number(item.productPrice)*Number(item.productNumber)+''
        }else {
          item.money='0'
        }
        this.$set(this.detailsList, index, item)
      },
      price(item,index) {
        if(item.productPrice!=''){
          item.money=Number(item.productPrice)*Number(item.productNumber)+''
        }else {
          item.money='0'
        }
        this.$set(this.detailsList, index, item)
      },
      addPromotions(){
        // let index = this.detailsList.length+1
        let insertDate = new Date(accAdd(new Date().getTime(), accMul(this.detailsList.length, 1000)))
        this.detailsList.push({
          id: guid(),
          insertDate: formatTime(insertDate),
          ownerID: this.id,
          state:'0',
          productID:'',
          productName: '',
          productSpec: '',
          productPrice:'',
          productNumber: '',
          productCompany:'',
        })
      },
      delDiscount(index,item){
        // this.$dialog.alert({
        //   tipValue: '删除成功！！！',
        //   closeCallBack: ()=>{
            this.detailsList.splice(index, 1)
            for(let i in this.promotionsList){
              if(this.detailsList[i].coupon==item.coupon){
                this.detailsList.splice(i, 1)
              }
            }
            // if(this.detailsList.length === 0){
            //   this.addDetail()
            // }
          // }
        // })
      },
      chargePersonEvent(){
        this.$dialog.OpenWindow({
          width: 950,
          height: 692,
          url: '/selectPerson?category=0',
          title: '选择负责人',
          closeCallBack: (data) => {
            if (data) {
              this.chargePersonID=data.id
              this.chargePerson = data.name

            }
          }
        })
      },
      save(){
        if (this.totalMoney==''){
          this.totalMoney=0
        }
        if (this.validator()) {
          if (this.detailsList.length>0){

            let useMoney=0.00
            for(let i in this.detailsList){
              useMoney+=Number(this.detailsList[i].money)
              if (this.detailsList[i].productID==''){
                this.detailsList[i].productID=this.detailsList[i].productName
              }
            }
            if (useMoney==this.totalMoney) {
              let params = {
                id: this.id,
                name: this.name,
                format:this.format,
                paymentItems:this.paymentItems,
                startTime: this.startTime,
                endTime: this.endTime,
                custState:this.insuredState,
                chargePersonID:this.chargePersonID,
                customersID: this.customersID,
                signatureType: this.signatureType,
                state:this.state,
                totalMoney: this.totalMoney,
                type:this.type,
                files: this.fileList,
                detailsList:this.detailsList,
              }
              // console.log(params)
              // return
              this.ajaxJson({
                url: '/dailyoffice/contractSign/save',
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
                  } else {
                    this.$dialog.alert({
                      alertImg: 'warn',
                      tipValue: data.message
                    })
                  }
                }
              })
            }else{

              this.$dialog.confirm({
                tipValue: '总金额和产品实际金额不符,是否修改总金额?',
                btnValueOk:'确定',
                btnValueCancel:'取消',
                width: 350,
                okCallBack: () => {
                  this.totalMoney=useMoney
                },
                cancelCallBack:() => {
                  let params = {
                    id: this.id,
                    name: this.name,
                    format:this.format,
                    paymentItems:this.paymentItems,
                    startTime: this.startTime,
                    endTime: this.endTime,
                    custState:this.insuredState,
                    chargePersonID:this.chargePersonID,
                    customersID: this.customersID,
                    signatureType: this.signatureType,
                    state:this.state,
                    totalMoney: this.totalMoney,
                    type:this.type,
                    files: this.fileList,
                    detailsList:this.detailsList,
                  }
                  // console.log(params)
                  // return
                  this.ajaxJson({
                    url: '/dailyoffice/contractSign/save',
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
                      } else {
                        this.$dialog.alert({
                          alertImg: 'warn',
                          tipValue: data.message
                        })
                      }
                    }
                  })
                }
              })
            }
          }else{
            let params = {
              id: this.id,
              name: this.name,
              startTime: this.startTime,
              endTime: this.endTime,
              format:this.format,
              paymentItems:this.paymentItems,
              custState:this.insuredState,
              chargePersonID:this.chargePersonID,
              customersID: this.customersID,
              signatureType: this.signatureType,
              state:this.state,
              totalMoney: this.totalMoney,
              type:this.type,
              files: this.fileList,
              detailsList:this.detailsList,
            }
            // console.log(params)
            // return
            this.ajaxJson({
              url: '/dailyoffice/contractSign/save',
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
                } else {
                  this.$dialog.alert({
                    alertImg: 'warn',
                    tipValue: data.message
                  })
                }
              }
            })
          }



        }
      },
      customersEvent(){
        if(this.insuredState == '0'){
          this.$dialog.OpenWindow({
            width: 950,
            height: 692,
            url: '/selectPerson?category=1',
            title: '选择签署人',
            closeCallBack: (data) => {
              if (data) {
                this.customersID=data.id
                this.customers = data.name

              }
            }
          })
        }else if(this.insuredState == '1'){
          this.$dialog.OpenWindow({
            width: 950,
            height: 692,
            url: '/selectUnit?category=1',
            title: '选择签署公司',
            closeCallBack: (data) => {
              if (data) {
                this.customersID=data.id
                this.customers = data.name

              }
            }
          })
        }

      },
      iconClick(){
        if(this.insuredState == '0'){
          this.insuredState = '1'
        }else if(this.insuredState == '1') {
          this.insuredState = '0'
        }
      },
    },
    created () {
    this.setQuery2Value('type')
      this.init({
        url: '/dailyoffice/contractSign/initForm',
        all: (data) => {
          this.stateList = data.statePsd.list
          this.state = data.statePsd.value
          this.signatureTypeList = data.signatureTypePsd.list
          this.formatList = data.formatPsd.list
          this.paymentItemsList = data.paymentItemsPsd.list
        },
        add: (data) => {
          /* 需要添加的数据 */
          /* 获取session的登录用户和登陆用户ID */


        },
        look: (data) => {
          /* 需要查看的数据 */
            this.name=data.name,
            this.type=data.type,
            this.startTime=data.startTime,
            this.endTime=data.endTime,
            this.insuredState=data.custState,
            this.chargePerson=data.chargePerson,
            this.chargePersonID=data.chargePersonID,
            this.customers=data.customers,
            this.format=data.format,
            this.paymentItems=data.paymentItems,
            this.customersID=data.customersID,
            this.signatureType=data.signatureType,
            this.totalMoney=data.totalMoney,
            this.fileList=data.files
            this.detailsList=data.detailsList
        }
      })
    },
  }
</script>
<style scoped>

  .beinSpan::before{
    color: #1AE642;
  }
</style>
<style scoped lang="less">
  .tipShow{display: none;width: 240px;}
</style>
