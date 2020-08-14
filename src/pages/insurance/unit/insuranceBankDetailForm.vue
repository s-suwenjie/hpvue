<template>
  <div>
    <yhm-managerpage category="1" mainWidth="1050" mainHeight="690" menu-tab-width="1014"  :total-table="true">
      <!--导航条-->
      <template #navigation>基本信息</template>
      <template #choose>
        <div style="padding-bottom: 20px;width: 1014px;margin: 0 auto;display: flex;">
          <yhm-managersearch :value="searchStr" :history="shortcutSearchContent" id="searchStr" @call="initPageData(false)"></yhm-managersearch>
        </div>
      </template>

      <!--数据表头-->
      <template #listHead>
        <yhm-managerth style="width: 40px;" title="选择"></yhm-managerth>
        <yhm-managerth style="width: 40px;" title="查看"></yhm-managerth>
        <yhm-managerth style="width: 300px" title="账户" value="bankName"></yhm-managerth>
        <yhm-managerth title="交易对象" value="otherName" ></yhm-managerth>
        <yhm-managerth style="width: 120px;" title="交易日期" value="cccurDate"></yhm-managerth>
        <yhm-managerth style="width: 80px" title="方向" value="direction"></yhm-managerth>
        <yhm-managerth style="width: 120px;" title="事由" value="subject"></yhm-managerth>
        <yhm-managerth style="width: 120px" title="金额" value="money"></yhm-managerth>
        <yhm-managerth style="width: 120px" title="可待核销金额" value="useMoney"></yhm-managerth>
<!--        <yhm-managerth style="width: 330px" title="备注" value="remark"></yhm-managerth>-->
      </template>

      <!--数据明细-->
      <template #listBody>
        <tr :class="[{twinkleBg: item.id==lastData},{InterlacBg:index%2!=0}]" v-for="(item,index) in content" :key="index">
          <yhm-manager-td-checkbox :value="item" @call="checkboxEvent"></yhm-manager-td-checkbox>
          <yhm-manager-td-look @click="listView(item)"></yhm-manager-td-look>
          <yhm-manager-td :value="item.bankName + item.account + item.nature" v-if="item.bankName===''"  :tip="true"></yhm-manager-td>
          <yhm-manager-td-center :tip="true" :value="item.bankName + item.account + item.nature" v-else ></yhm-manager-td-center>
          <yhm-manager-td :is-html="true" :value="item.otherName" v-if="item.otherName==''"  :tip="true"></yhm-manager-td>
          <yhm-manager-td-center :is-html="true" :tip="true" :value="item.otherName" v-else></yhm-manager-td-center>
          <yhm-manager-td-date :value="item.cccurDate"></yhm-manager-td-date>
          <yhm-manager-td-direction :direction="item.direction" class="dfJcc" :value="item.direction" :dir-val="false"></yhm-manager-td-direction>
          <yhm-manager-td :value="item.subject"></yhm-manager-td>
          <yhm-manager-td-money :value="item.money+''"></yhm-manager-td-money>
          <yhm-manager-td-money :value="item.useMoney+''"></yhm-manager-td-money>
<!--          <yhm-manager-td :value="item.remark" :tip="true"></yhm-manager-td>-->
        </tr>
      </template>
      <template #listTotalHead >

        <yhm-managerth before-color="black" style="width: 60px" width="60px" title="" before-title="应收账款金额" ></yhm-managerth>
        <yhm-managerth before-color="black" style="width: 60px" width="60px" title="" before-title="待对账金额" ></yhm-managerth>
      </template>
      <template #listTotalBody>
        <tr>
          <yhm-manager-td-money  style="text-align: center;" :value="bankMoney"></yhm-manager-td-money>
          <yhm-manager-td-money style="text-align: center;" :value="money"></yhm-manager-td-money>
        </tr>
      </template>
      <!--数据空提示-->
      <template #empty>
        <span class="m_listNoData" v-show="content.length!='0'?false:true">暂时没有数据</span>
      </template>
      <template #listTotalRight>
        <yhm-commonbutton  style="margin-top: 40px; margin-left: 40px;"  value="保存" icon="btnSave" @call="save" :flicker="true"></yhm-commonbutton>
      </template>
      <!--分页控件-->
      <template #pager>
        <yhm-pagination :pager="pager" isPageSize="false" @initData="initPageData(false)"></yhm-pagination>
      </template>

    </yhm-managerpage>
  </div>
</template>

<script>
  import { managermixin } from '@/assets/manager.js'
  import { accAdd } from '../../../assets/common'
  export default {
    name: 'insuranceBankDetailForm',
    mixins: [managermixin],
    data(){
      return{
        id:'',
        iidList:[
          {
            id: '',
            ownerID: this.ownerID,
            money: this.money

          }
        ],
        bankMoney:'0',
      }
    },
    methods:{
      save(){

       /* let param = {
          ownerID : this.unitID,
          category : '3'
        }
        this.ajaxJson({
          url: '/finance/receivableDetail/getWriteOffBalanceOther',
          data: param,
          call: (balance) => {
              console.log(  balance)
          }
        })*/
        let params;
        if (this.id==''){
          let id = []
          for (let i in this.content){
            id.push(this.content[i].id)
          }
          this.id=id.join(',')
           params={
            id:this.id,
            ownerID: this.ownerID,
            money: this.money
          }

        }else{
           params={
            id:this.id,
            ownerID: this.ownerID,
            money: this.money
          }
        }
        this.ajaxJson({
          url: '/Basic/UnitInTickMoney',
          data:params,
          call:(data) =>{
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
      },
      checkboxEvent(selectValue){
        let id = []
       if (this.selectValue.length>0){
         for (let i=0; i<this.selectValue.length; i++){
          id.push(this.selectValue[i])
         }
         this.id= id.join(',')
         //this.iidList[0].id = ids
         // this.iidList[0].ownerID = this.ownerID
         // this.iidList[0].money = this.money
         let arr = []
         let s = 0;
         if(selectValue.length!='0'){
           this.isSelected = true
           for(let i in selectValue){
             for(let j in this.content){
               if(this.content[j].id==selectValue[i]){
                 arr.push(parseInt(this.content[j].useMoney))
               }
             }
           }
           for (let q=arr.length-1; q>=0; q--) {
             s =accAdd(arr[q],s) ;
           }
           this.bankMoney = s+''
         }

       }
      },
      //搜索
      initPageData (initValue) {
        this.setQuery2Value("unitID")
        this.setQuery2Value("ownerID")
        this.setQuery2Value("money")
        let params = {}
        if (initValue) {
          params = {
            unitID:this.unitID
          }
        } else {
          params = {
            unitID:this.unitID
          }
        }
        this.init({
          initValue:initValue,
          url: '/Basic/UnitInBankAll',
          data:params,
          all:(data) =>{
            let num=0
            for (let i in data.content){

              num=accAdd(num,data.content[i].useMoney)
            }
            this.bankMoney= num+''
          },
          init:(data)=>{
            //初始化时需要执行的代码
            // 这边初始化筛选信息
          }
        })
      },
    },
    created () {

    }
  }
</script>

<style scoped>

</style>
