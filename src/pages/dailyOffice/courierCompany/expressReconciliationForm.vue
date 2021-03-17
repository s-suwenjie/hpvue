<template>
  <div class="f_main">
    <yhm-formbody>
      <template #title>基本信息</template>
      <template #control>
        <yhm-form-date title="对账单" subtitle="开始日期" @call="monetEvent"  :value="startDate" id="startDate " position="t"  rule="R0000"></yhm-form-date>

        <yhm-form-date title="对账单" subtitle="结束日期"   :value="endDate" id="endDate " position="t"  rule="R0000"></yhm-form-date>
        <yhm-formupload :ownerID="id" astrict="1" @call="callback()" :value="fileList"  id="fileList" title="快递对账单(支持单据)" tag="express" multiple="multiple" category="3" ></yhm-formupload>
      </template>
    </yhm-formbody>
    <div class="f_split"></div>
    <div class="f_split"></div>
    <yhm-form-list-edit>
      <template #title>
        <span>账单信息</span>
        <span style="font-size: 18px; margin-left: 500px;font-weight: bold" >账单总金额：</span>
        <span >{{countMoney}}</span>
      </template>
      <template #listHead>
        <yhm-managerth style="width:38px" title="序号"></yhm-managerth>
        <yhm-managerth style="width: 70px" title="时间"></yhm-managerth>
        <yhm-managerth style="width: 100px" title="单号"></yhm-managerth>
        <yhm-managerth style="width: 70px" title="地址"></yhm-managerth>
        <yhm-managerth style="width: 70px" title="姓名"></yhm-managerth>
        <yhm-managerth style="width: 70px" title="重量"></yhm-managerth>
        <yhm-managerth style="width: 100px" title="金额"></yhm-managerth>
        <yhm-managerth style="width: 100px" title="对账单金额"></yhm-managerth>
        <yhm-managerth style="width: 100px" title="操作"></yhm-managerth>
      </template>
      <template #listBody >
        <tr v-for="(item,index) in listDetails" :key="index" :class="{InterlacBg:index%2!==0}" >
          <yhm-manager-td-center  class="admin" :value="index+1+''"></yhm-manager-td-center>
          <yhm-manager-td   class="admin" :value="item.workDate"></yhm-manager-td>
          <yhm-manager-td-center class="admin" :value="item.code+''"></yhm-manager-td-center>
          <yhm-manager-td-rgt class="admin" :value="item.address"></yhm-manager-td-rgt>
          <yhm-manager-td-center class="admin" :value="item.name"></yhm-manager-td-center>
          <yhm-manager-td-center  class="admin" :value="item.weight+''"></yhm-manager-td-center>
          <yhm-manager-td-rgt   class="admin" :value="item.initialMoeny+''"></yhm-manager-td-rgt>
          <yhm-manager-td-money  class="admin" :value="item.money+''"></yhm-manager-td-money>
          <yhm-manager-td-operate>
            <yhm-manager-td-operate-button v-if="item.initialMoeny==item.money "    value="正常" icon="i-complete" color="#06E23A"></yhm-manager-td-operate-button>
            <yhm-manager-td-operate-button v-else   @click="selectDefault(item)" value="异常" icon="i-warn" color="#FF0000"></yhm-manager-td-operate-button>
          </yhm-manager-td-operate>
        </tr>
      </template>
      <template #empty>
        <span class="m_listNoData" v-show="listDetails.length!=0?false:true">暂时没有数据</span>
      </template>
    </yhm-form-list-edit>
    <yhm-formoperate :title-show="true" title-left="120" :createName="createName" :insertDate="insertDate" :updateName="updateName" :updateDate="updateDate">
      <template #titleLeft>
        <!--<yhm-manager-td-money style="font-weight: bold;font-size: 15px;" before-symbol="账单总金额为:￥" :value="this.countMoney+''"></yhm-manager-td-money>-->
      </template>
      <template #btn>
        <yhm-commonbutton value="核对账单" icon="btnSave" :flicker="true" @call="checkSave()"></yhm-commonbutton>
      </template>
    </yhm-formoperate>
  </div>
</template>

<script>
  import { formatDate,accAdd} from '@/assets/common.js'
  import { formmixin } from '@/assets/form.js'
  export default {
    name: 'expressReconciliationForm',
    mixins: [formmixin],
    data(){
      return{
        id:'',
        ownerID:'',
        startDate:'',
        endDate:'',
        isExcel:false,
        fileList:[],
        storeName:'',
        // countMoney:[],
        listDetails:[],
        countMoney:0.00,
      }
    },
    methods:{
      selectDefault(item){

        this.$dialog.confirm({
          width: 300,
          tipValue: '是否修改快递单金额吗?',
          btnValueOk: '确定',
          alertImg: 'warn',
          okCallBack: (data) => {
            let params = {
              id: item.id,
              amount:item.money
            }
            this.ajaxJson({
              //url: '/dailyoffice/expressCompany/updateMoney',
              url: '/dailyoffice/myExpress/updateDetailAmount',
              data: params,
              call: (data) => {
                if (data.type == '0') {
                  this.$dialog.alert({
                    tipValue: data.message,
                    closeCallBack: (data) => {
                      item.initialMoeny=item.money
                    }
                  })
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
      },
      callback(){
          //console.log(this.fileList[0].storeName)
        let params={
          ownerID:this.companyID,
          startDate:this.startDate +' 00:00:00',
          endDate:this.endDate +' 23:59:59',
          storeName:this.fileList[0].storeName,

        }
        this.ajaxJson({
          url: '/dailyoffice/expressCompany/getExpressDetail',
          data: params,
          call: (data) => {
            if (data) {
              this.isExcel=true
              this.listDetails=data
              let money=0.00
              for ( let i in data){
                money=accAdd(money,data[i].money)
              }
              this.countMoney=money

            }

          }
        })
      },
      checkSave(){
        let state = '-1'
        for (let i in this.listDetails){
          if (this.listDetails[i].initialMoeny!=this.listDetails[i].money){
            state='0'
            break;
          }
        }

        if(state==-1){
          let arr=[]
          for (let j in this.listDetails){
            arr.push(
              this.listDetails[j].id
            )
          }
          let params={
            id:this.id,
            ownerID:this.ownerID,
            startDate:this.startDate +' 00:00:00',
            endDate:this.endDate +' 23:59:59',
            fils:this.fileList,
            storeName:this.fileList[0].tag+'\\'+ this.fileList[0].storeName,
            countMoney:this.countMoney,
            listID:arr
          }

          this.ajaxJson({
            url: '/dailyoffice/expressCompany/insertReconciliation',
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
              }else{
                this.$dialog.alert({
                  alertImg:'warn',
                  tipValue: data.message
                })
              }
            }
          })
        }else{
          this.$dialog.alert({
            alertImg:'warn',
            tipValue:'请核对导入数据是否异常',
            width:350
          })
        }
      },
      getLastDay(time){    //获取月底的日期
        let current=new Date(time);
        let currentMonth=current.getMonth();
        let nextMonth=++currentMonth;
        let nextMonthDayOne =new Date(current.getFullYear(),nextMonth,1);
        let minusDate=1000*60*60*24;
        return new Date(nextMonthDayOne.getTime()-minusDate);
      },
      monetEvent(){
        let lastDay =formatDate(this.getLastDay(this.startDate));
        this.endDate=lastDay
      },
    },
    created(){
      this.setQuery2Value('ownerID')
      this.setQuery2Value('companyID')
    },
  }
</script>


<style scoped>
  .admin{
    border: 1px solid #ccc;
  }
</style>
