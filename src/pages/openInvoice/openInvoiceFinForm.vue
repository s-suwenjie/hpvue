<template>
  <div>
    <yhm-view-body :customize="true" :pager="false">
      <template #title>基本信息</template>
      <template #body>
        <yhm-view-control title="申请人" :content="person"></yhm-view-control>
        <yhm-view-control title="申请日期" :content="applyDate" type="date"></yhm-view-control>
        <yhm-view-control title="付款方" :content="payer" @iconClick="iconClick('0')" iconColor="#49a9ea" font-icon="uniE99E" @click="unitView('0')" color="#49a9ea" style="cursor: pointer;"></yhm-view-control>
        <yhm-view-control title="开票事由" :content="category" :psd="categoryList"></yhm-view-control>
        <yhm-view-control title="增票类型" :content="invoiceCategory" :psd="invoiceCategoryList"></yhm-view-control>
        <yhm-view-control title="款项状态" :content="isReceivables" :psd="isReceivablesList"></yhm-view-control>
        <yhm-view-control title="发票金额" :content="invoiceMoney" ></yhm-view-control>
        <yhm-view-control title="金额大写" :content="invoiceMoneyUp"></yhm-view-control>
      </template>
    </yhm-view-body>
    <div class="f_split"></div>
    <div style="height: 30px;"></div>
    <yhm-view-tab>
      <template #tab>
        <yhm-view-tab-button :list="tabState" :index="0" >工单信息</yhm-view-tab-button>
      </template>
      <template #content>
        <yhm-view-tab-list :customize="true">
          <template #listHead>
            <yhm-managerth style="width: 50px;" title="查看"></yhm-managerth>
            <yhm-managerth title="工单号"></yhm-managerth>
            <yhm-managerth title="车牌号"></yhm-managerth>
            <yhm-managerth title="剩余开票金额"></yhm-managerth>
            <yhm-managerth title="开票金额"></yhm-managerth>
            <yhm-managerth title="查看关联收支明细"></yhm-managerth>
            <yhm-managerth title="收支明细金额"></yhm-managerth>
            <yhm-managerth title="选择收支明细"></yhm-managerth>
            <yhm-managerth style="width: 60px;" title="删除关联"></yhm-managerth>
          </template>
          <template #listBody>
            <tr v-for="(item,index) in workOrderList" :class="{InterlacBg:index%2!=0}" :key="index">
              <yhm-manager-td-look @click="view(item)"></yhm-manager-td-look>
              <yhm-manager-td :value="item.workOrderID"></yhm-manager-td>
              <yhm-manager-td @click="viewVehicle(item)" :value="item.licensePlateNumber"></yhm-manager-td>
              <yhm-manager-td-money :value="item.balance"></yhm-manager-td-money>
              <yhm-manager-td-money :value="item.money"></yhm-manager-td-money>
              <yhm-manager-td-look :no-click="item.bankDetailID===''" @click="viewBankDetail(item)"></yhm-manager-td-look>
              <yhm-manager-td-money :value="item.bankDetailMoney"></yhm-manager-td-money>
              <yhm-manager-td-look @click="selectBankDetail(item,index)"></yhm-manager-td-look>
              <yhm-manager-td width="40" :class="{mt_button_disabled:item.bankDetailID===''}" class="delete red fd_center fontSize18" @click="delServe(index,item)"></yhm-manager-td>
            </tr>
          </template>
          <template #empty>
            <span class="m_listNoData"  v-show="workOrderList.length==0">暂时没有数据</span>
          </template>
        </yhm-view-tab-list>
      </template>
    </yhm-view-tab>
    <!--<yhm-form-list-show style="margin-top: 30px;" >-->
      <!--<template #title>查看相关事项</template>-->
      <!--<template #operate>-->
        <!--<yhm-commonbutton value="添加流水明细"  icon="icon-urge" @call="addDetail()" category="three"></yhm-commonbutton>-->
      <!--</template>-->
      <!--<template #listHead>-->
      <!--&lt;!&ndash;<yhm-managerth style="width: 40px" title="查看"></yhm-managerth>&ndash;&gt;-->
        <!--<yhm-managerth style="width: 90px;" title="我方账户"></yhm-managerth>-->
        <!--<yhm-managerth style="width: 110px;" title="交易日期"></yhm-managerth>-->
        <!--<yhm-managerth title="对方账户"></yhm-managerth>-->
        <!--<yhm-managerth style="width: 80px;" title="收支"></yhm-managerth>-->
        <!--<yhm-managerth style="width: 130px;" title="事由"></yhm-managerth>-->
        <!--<yhm-managerth style="width: 110px;" title="工单号"></yhm-managerth>-->
        <!--<yhm-managerth style="width: 110px;" title="交易金额"></yhm-managerth>-->
        <!--<yhm-managerth style="width: 110px;" title="剩余开票金额"></yhm-managerth>-->
        <!--<yhm-managerth style="width: 40px;" title="删除"></yhm-managerth>-->
      <!--</template>-->
      <!--<template #listBody>-->
        <!--<tr v-for="(item,index) in bankDetailList" :class="[{InterlacBg:index%2!=0}]" :key="index">-->
          <!--<yhm-manager-td-center :value="item.bankName"></yhm-manager-td-center>-->
          <!--<yhm-manager-td-date :value="item.cccurDate"></yhm-manager-td-date>-->
          <!--<yhm-manager-td-center :value="item.otherName"></yhm-manager-td-center>-->
          <!--<yhm-manager-td-psd :value="item.direction" :list="directionList"></yhm-manager-td-psd>-->
          <!--<yhm-manager-td-center :value="item.subject"></yhm-manager-td-center>-->
          <!--<yhm-manager-td-center :value="item.workOrderID"></yhm-manager-td-center>-->
          <!--<yhm-manager-td-money :value="item.money"></yhm-manager-td-money>-->
          <!--<yhm-manager-td-money :value="item.selfAccount"></yhm-manager-td-money>-->
          <!--<yhm-form-td-delete width="40" :list="bankDetailList" :value="item" :del-click="true" @click="delServe(index,item,'收入')"></yhm-form-td-delete>-->
        <!--</tr>-->
      <!--</template>-->
      <!--<template #empty>-->
        <!--<span class="m_listNoData" v-show="bankDetailList.length==0">暂时没有数据</span>-->
      <!--</template>-->
    <!--</yhm-form-list-show>-->

    <yhm-formoperate :createName="createName" :insertDate="insertDate" :updateName="updateName" :updateDate="updateDate">
      <template #btn>
        <yhm-commonbutton value="保存" icon="btnSave" :flicker="true" @call="save()"></yhm-commonbutton>
      </template>
    </yhm-formoperate>

  </div>
</template>

<script>
  import { formmixin } from '@/assets/form.js'
  import { accMul, accAdd, guid, formatDate, formatTime,tenThousandFormatHtml } from '@/assets/common.js'
  export default {
    name: 'openInvoiceFinForm',
    mixins: [formmixin],
    data(){
      return{
        tabState:[{select:true}],
        workOrderList:[],
        id:'',
        bankDetailList:[],
        incomeMoney:[],
        deleteList:[],
        invoiceMoney:'',
        payer:'',
        payerID:'',
        person:'',
        applyDate:'',
        category:'',
        categoryList:[],
        invoiceCategory:'',
        invoiceCategoryList:[],
        isReceivables:'',
        isReceivablesList:[],
        invoiceMoneyUp:'',
        directionList: [
          {
            code: '#3711e8',
            num: '0',
            img: '',
            showName: '收入',
          },
          {
            code: '',
            num: '1',
            img: '',
            showName: '支出',
          },
        ],
        createName:'',
        insertDate:'',
        updateName:'',
        updateDate:'',
      }
    },
    created(){
      this.setQuery2Value('id')
      this.init()
    },
    methods:{
      init(){
        let params={
          id:this.id
        }
        this.ajaxJson({
          url: '/Bill/workOrderCollectionRegistration',
          data: params,
          call: (data) => {
            this.payer=data.payer
            this.payerID=data.payerID
            this.person=data.person
            this.applyDate=data.applyDate
            this.category=data.category
            this.categoryList=data.categoryPsd.list
            this.invoiceCategory=data.category
            this.invoiceCategoryList=data.categoryPsd.list
            this.isReceivables=data.isReceivables
            this.isReceivablesList=data.isReceivablesPsd.list
            this.invoiceMoneyUp=data.invoiceMoneyUp
            this.invoiceMoney=data.invoiceMoney
            this.createName=data.createName
            this.insertDate=data.insertDate
            this.updateName=data.updateName
            this.updateDate=data.updateDate
            let list=[]
            for (let i = 0; i <data.workOrderList.length ; i++) {
              list.push(data.workOrderList[i].ownerID)
            }
            this.ajaxJson({
              url: '/fix/Offer/getManagerByidList',
              data: {
                ids:list
              },
              call: (workOrderData) => {
                if(workOrderData){
                  this.workOrderList=[]
                  for (let j = 0; j <data.workOrderList.length ; j++) {
                    let money=data.workOrderList[j].money
                    for (let i = 0; i < workOrderData.length; i++) {
                      if(data.workOrderList[j].ownerID===workOrderData[i].id){
                        let insertDate = new Date(accAdd(new Date().getTime(), accMul(this.workOrderList.length, 1000)))
                        this.workOrderList.push({
                          id: guid(),
                          insertDate: formatTime(insertDate),
                          ownerID: workOrderData[i].id,
                          invoiceID:data.workOrderList[j].invoiceID,
                          workOrderID:workOrderData[i].otherCode,
                          workOrder:'',
                          licensePlateNumber:workOrderData[i].vehicle,
                          balance:accAdd(workOrderData[i].finresult,-money).toString(),
                          money:money,
                          bankDetailID:'',
                          bankDetailMoney:'0.00',
                        })
                      }
                    }
                  }
                }
              }
            })
          }
        })
      },
      viewBankDetail(item){
        this.$dialog.OpenWindow({
          width: '1050',
          height: '750',
          url:  '/claimsForm?id=' + item.bankDetailID,
          title: '查看收款信息',
          closeCallBack: (data) => {
            if (data) {
            }
          }
        })
      },
      delServe(index,item){//删除详情时
        this.$dialog.confirm({
          alertImg: 'warn',
          tipValue: '是否删除关联?',
          okCallBack: () => {
            this.workOrderList[index].bankDetailMoney='0.00'
            this.workOrderList[index].bankDetailID=''
          }
        })
      },
      selectBankDetail(item,index){
        if(item.workOrderID){
          this.$dialog.OpenWindow({
            width: '1050',
            height: '692',
            title: '选择维修信息',
            url: '/selectBankDetailInsurance?workOrderID=' + item.workOrderID,
            closeCallBack: (data) => {
              if (data) {
                if(accAdd(-data.money,this.workOrderList[index].money)===0){
                  this.workOrderList[index].bankDetailMoney=data.money
                  this.workOrderList[index].bankDetailID=data.id
                }else{
                  this.$dialog.alert({
                    alertImg: 'error',
                    tipValue: '工单金额和所选维修信息不一致',
                    closeCallBack:() => {
                    }
                  })
                }
              }
            }
          })
        }
      },
      // addDetail(){
      //   let code=''
      //   for (let i = 0; i < this.workOrderList.length; i++) {
      //     if (i===0||i===this.workOrderList[i].workOrderID){
      //       code=this.workOrderList[i].workOrderID
      //     }else{
      //       code='\''+this.workOrderList[i].workOrderID+'\''
      //     }
      //   }
      //   this.$dialog.OpenWindow({
      //     width: '1050',
      //     height: '692',
      //     title: '选择维修信息',
      //     url: '/selectBankDetailInsurance?workOrderID='+code,
      //     closeCallBack: (data) => {
      //       if(data){
      //         let money = 0
      //         this.incomeMoney.push(Number(data.money).toFixed(2))
      //         let idList = []
      //         for(let p in this.bankDetailList){
      //           idList.push(this.bankDetailList[p].dependid)
      //           if(idList.indexOf(data.id)!='-1'){
      //             return
      //           }
      //         }
      //         this.bankDetailList.push({
      //           id: guid(),
      //           type:'0',
      //           ownerID:this.id,//主表id
      //           dependid:data.id,//当前收支明细id
      //           bankName:data.bankName+data.account,//我方账户
      //           cccurDate:data.moneyBackDate,//交易日期
      //           otherName:data.otherName,//对方账户名称
      //           otherID:'',//对方账户id
      //           direction:data.direction,
      //           subject:data.subject,//事由
      //           money:data.money,//金额
      //           selfAccount:data.actualMoney,//剩余开票金额
      //           workOrderID:data.workOrderID,//剩余开票金额
      //           remark:'',//备注
      //           account:'',
      //           num:guid(),
      //         })
      //       }
      //     }
      //   })
      // },
      save(){//save------------
        let num=0
        for (let i = 0; i < this.workOrderList.length; i++) {
          if(this.workOrderList[i].bankDetailID!==''&&this.workOrderList[i].bankDetailID!==null){
            num++;
          }
        }
        if(num===this.workOrderList.length){
          this.$dialog.confirm({
            width: 300,
            tipValue:'确认收款',
            alertImg: 'warn',
            okCallBack: () => {
              let params = {
                id:this.id,
                workOrderList:this.workOrderList
              }
              this.ajaxJson({
                url: '/Bill/workOrderCollectionRegistrationSave',
                data: params,
                call: (data) => {
                  if (data.type == 0) {
                    let list=[]
                    for (let i = 0; i < this.workOrderList.length; i++) {
                      list.push({
                        id:guid(),
                        ownerID:this.workOrderList[i].ownerID,
                        type:'0',
                        dependid:this.workOrderList[i].bankDetailID,
                        money:this.workOrderList[i].bankDetailMoney,
                      })
                    }
                    this.ajaxJson({
                      url: '/fix/Offer/sudetailSaveBath',
                      data: {
                        suList:list
                      },
                      call: (data) => {

                      }
                    })
                    this.$dialog.setReturnValue(this.id)
                    this.$dialog.alert({
                      tipValue: data.message,
                      closeCallBack: ()=>{
                        //this.$dialog.close()
                      }
                    })
                  }else{
                    this.$dialog.alert({
                      tipValue: data.message,
                      closeCallBack: ()=>{
                      }
                    })
                  }
                }
              })
            }
          })
        }else{
          this.$dialog.alert({
            alertImg: 'error',
            tipValue: '您有( <span style="color:red">'+accAdd(this.workOrderList.length,-num)+'</span> )工单未关联收支明细',
            closeCallBack:() => {
            }
          })
        }
      }
    }
  }
</script>

<style scoped>

</style>
