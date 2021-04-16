<template>
  <div class="f_main">
    <yhm-formbody>
      <template #title>基本信息</template>
      <template #control>
        <yhm-form-date title="对账单" subtitle="开始日期" @call="monetEvent"  :value="monthsDate" id="monthsDate " position="t"  rule="R0000"></yhm-form-date>

        <yhm-form-date title="对账单" subtitle="结束日期"   :value="endDate" id="endDate " position="t"  rule="R0000"></yhm-form-date>
        <yhm-formupload :ownerID="id" :value="fileList"  id="fileList" title="回款对应单(支持单据)" tag="statement" multiple="multiple" category="3" ></yhm-formupload>
      </template>
    </yhm-formbody>
    <div class="f_split"></div>
    <div class="f_split"></div>
    <yhm-form-list-edit v-if="isExcel">
      <template #title>账单信息</template>
      <template #listHead>
        <yhm-managerth style="width:38px" title="序号"></yhm-managerth>
        <yhm-managerth title="单号"></yhm-managerth>
        <yhm-managerth style="width: 100px" title="对账单金额"></yhm-managerth>
        <yhm-managerth style="width: 100px" title="实际金额"></yhm-managerth>
        <yhm-managerth style="width: 100px" title="车牌号"></yhm-managerth>
        <yhm-managerth style="width: 100px" title="被保险人"></yhm-managerth>
        <yhm-managerth style="width: 100px" title="联系人"></yhm-managerth>
        <yhm-managerth style="width: 100px" title="状态"></yhm-managerth>
      </template>
      <template #listBody >
        <tr v-for="(item,index) in content" :key="index" :class="{InterlacBg:index%2!==0}" >
          <yhm-manager-td-center  class="admin" :value="index+1+''"></yhm-manager-td-center>
          <yhm-manager-td-center   class="admin" :value="item.number"></yhm-manager-td-center>
          <yhm-manager-td-rgt class="admin" :value="item.money+''"></yhm-manager-td-rgt>
          <yhm-manager-td-rgt class="admin" :value="item.businessMoney==0.00?item.forceMoney+'':item.businessMoney+''"></yhm-manager-td-rgt>
          <yhm-manager-td-center  class="admin" :value="item.plate"></yhm-manager-td-center>
          <yhm-manager-td-center  class="admin" :value="item.beinsuredName"></yhm-manager-td-center>
          <yhm-manager-td-center  class="admin" :value="item.contactName"></yhm-manager-td-center>
<!--          <yhm-manager-td-state class="admin"  v-if="Math.abs( item.money-(item.businessMoney==0.00?item.forceMoney:item.businessMoney))<=1" :value="item.stateVal" @click="stateClick(item)" :state-color="item.stateColor" :state-img="item.stateImg"></yhm-manager-td-state>-->
          <yhm-manager-td-state class="admin"  :value="item.stateVal" @click="elseClick(item)" :state-color="item.stateColor" :state-img="item.stateImg"></yhm-manager-td-state>


        </tr>
      </template>

      <template #empty>
        <span class="m_listNoData" v-show="content.length!=0?false:true">暂时没有数据</span>
      </template>
    </yhm-form-list-edit>
    <yhm-formoperate :title-show="true" title-left="120" :createName="createName" :insertDate="insertDate" :updateName="updateName" :updateDate="updateDate">
      <template #titleLeft>
        <tr v-for="(item,index) in countMoney" :key="index" :class="{InterlacBg:index%2!==0}" >

          <yhm-manager-td-money style="font-weight: bold;font-size: 15px;" before-symbol="账单总金额为:￥" :value="''+item.countMoney"></yhm-manager-td-money>

        </tr>
      </template>
      <template #btn>

        <yhm-commonbutton value="核对账单" icon="btnSave" :flicker="true" @call="checkSave()"></yhm-commonbutton>
        <yhm-commonbutton value="保存" v-if="isExcel" icon="btnSave"  @call="save()"></yhm-commonbutton>
      </template>

    </yhm-formoperate>
  </div>
</template>

<script>
  import { formatDate,accAdd} from '@/assets/common.js'

  import { formmixin } from '@/assets/form.js'
  export default {
    name: 'insuranceUnitUpload',
    mixins: [formmixin],
    data(){
      return{
        id:'',
        ownerID :'',
        monthsDate:'',
        endDate:'',
        fileList:[],
        storeName:'',
        content:[],
        isExcel:false,
        state:'',
        countMoney:[],
      }
    },
    methods:{

      getLastDay(time){    //获取月底的日期
        let current=new Date(time);
        let currentMonth=current.getMonth();
        let nextMonth=++currentMonth;
        let nextMonthDayOne =new Date(current.getFullYear(),nextMonth,1);
        let minusDate=1000*60*60*24;
        return new Date(nextMonthDayOne.getTime()-minusDate);
      },
      monetEvent(item){
        let lastDay =formatDate(this.getLastDay(this.monthsDate));
        this.endDate=lastDay
      },
      elseClick(item){
        this.$dialog.OpenWindow({
          width: 650,
          height: 230,
          title: '通过留言',
          url: '/approvalPassMessage?id=' + item.id+'&page=6',
          closeCallBack: (data)=>{
            if (data){
              // this.initPageData(false)
              if(item.forceMoney=='0.00' && item.businessMoney=='0.00'){
                let params={
                  id:item.number
                }
                this.ajaxJson({
                  url: '/Basic/recordNumber',
                  data: params,
                  call: (data) => {
                    if (data.type === 0) {
                      this.stateClick(item)
                    }else{
                      this.$dialog.alert({
                        alertImg:'warn',
                        tipValue: data.message
                      })
                    }
                  }
                })
              }
              let money=item.businessMoney==0.00?item.forceMoney:item.businessMoney
              if (item.money < 0 &&Math.abs(item.money) < money) {
                this.stateClick(item)
              }else{
                if ( accAdd(item.money,money*-1)<-10){
                  this.$dialog.alert({
                    alertImg:'warn',
                    tipValue:'请仔细核对此条数据是否异常',
                    width:350
                  })
                } else{
                  this.stateClick(item)
                }
              }

            }
          }
        })
      },
      stateClick(item){
        item.stateImg = 'i-finishApprovalOK'
        item.state = '1'
      },
      save(){
        let state = '-1'
        for (let i in this.content){
          if (this.content[i].state=='0'){
            state='0'
            break;
          }
        }
        if (state=='0'){
          this.$dialog.alert({
            alertImg:'warn',
            tipValue:'请核对导入数据是否异常',
            width:350
          })
        }else{/////////////////////
          let params={
            id:this.id,
            endDate:this.endDate+' 23:59:59',
            monthsDate:this.monthsDate +' 00:00:00',
            unitID:this.unitID
          }
          this.ajaxJson({
            url: '/Basic/UnitInStatementSaveByID',
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
          ////////////////////
          }
        //this.monthsDate=this.monthsDate.slice(0,8)+'01'


      },
      checkSave(){

        for (let i in this.fileList){

          this.storeName=this.fileList[i].storeName
        }
        //this.monthsDate=this.monthsDate.slice(0,8)+'01'

        let params = {
          id:this.id,
          ownerID:this.ownerID,
          endDate:this.endDate+' 23:59:59',
          monthsDate:this.monthsDate +' 00:00:00',
          storeName:this.storeName,
          files:this.fileList,
          unitID:this.unitID
        }

        this.ajaxJson({
          url: '/Basic/UnitInStatementSave',
          data: params,
          call: (data) => {
            if (data.type === 0) {
              // this.$dialog.setReturnValue(this.id)
              // this.$dialog.alert({
              //   tipValue: data.message,
              //   closeCallBack: () => {
              //     this.$dialog.close()
              //   }
              // })
              //this.monthsDate=this.monthsDate.slice(0,8)+'01'
              let params={
                id:this.ownerID,
                endDate:this.endDate+' 23:59:59',
                monthsDate:this.monthsDate +' 00:00:00',
                unitID:this.unitID
              }

              this.ajaxJson({
                url: '/Basic/UnitInStatementManager',
                data: params,
                call: (data) => {
                  this.content=data.content
                  this.countMoney=data.countMoney
                  if (this.content.length>0){
                    this.isExcel=true
                  }
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
      },

    },
    created(){
        this.setQuery2Value('unitID')
        this.setQuery2Value('ownerID')
    },
  }
</script>

<style scoped>
  .admin{
    border: 1px solid #ccc;
  }
</style>
