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
<!--      <yhm-managerth style="width: 40px;" title="查看"></yhm-managerth>-->
      <yhm-managerth title="投保日期" value="insuredDate"></yhm-managerth>
      <yhm-managerth title="车牌号" value="plate"></yhm-managerth>
      <yhm-managerth title="联系人" value="contactName"></yhm-managerth>
      <yhm-managerth title="保险公司" value="insuredUnit"></yhm-managerth>
      <yhm-managerth  title="应收账款金额"></yhm-managerth>
      <yhm-managerth title="申请编号" value="numbering"></yhm-managerth>
    </template>

    <!--数据明细-->
    <template #listBody>
      <tr :class="[{twinkleBg: item.id==lastData},{InterlacBg:index%2!=0}]" v-for="(item,index) in content" :key="index">
        <yhm-manager-td-checkbox :value="item" @call="checkboxEvent"></yhm-manager-td-checkbox>
<!--        <yhm-manager-td-look @click="listView(item)"></yhm-manager-td-look>-->
        <yhm-manager-td-date :value="item.insuredDate"></yhm-manager-td-date>
        <yhm-manager-td  :value="item.plate"></yhm-manager-td>
        <yhm-manager-td :value="item.contactName"></yhm-manager-td>
        <yhm-manager-td :value="item.insuredUnitVal"></yhm-manager-td>
        <yhm-manager-td-money :value="item.receivable" style="color: #2c9208;font-weight:bold;" ></yhm-manager-td-money>
        <yhm-manager-td-center :value="item.numbering"></yhm-manager-td-center>
      </tr>
    </template>



      <template #total>
        <div class="listTotalCrente m_list" style="width: 600px">
          <div>
            <div class="listTotalLeft">
              <span class="test"></span>
              <span class="test">金额</span>
            </div>
          </div>
          <div style="width: 400px">
            <table width="100%" cellpadding="0" cellspacing="0" class="m_content_table m_content_total_table" >
              <thead>
              <tr>
                <yhm-managerth before-color="black" style="width: 60px" width="60px" title="" before-title="应收账款总数" ></yhm-managerth>
                <yhm-managerth before-color="black" style="width: 60px" width="60px" title="" before-title="应收账款金额" ></yhm-managerth>
                <yhm-managerth before-color="black" style="width: 60px" width="60px" title="" before-title="保险手续费总金额" ></yhm-managerth>
              </tr>
              </thead>

              <tbody>
              <tr>
                <yhm-manager-td-rgt  style="text-align: center;" :value="contentTotal[0].count"></yhm-manager-td-rgt>
                <yhm-manager-td-money  style="text-align: center;" :value="contentTotal[0].money"></yhm-manager-td-money>
                <yhm-manager-td-money style="text-align: center;" :value="useMoney"></yhm-manager-td-money>
              </tr>

              </tbody>
            </table>
          </div>
          <div>
            <yhm-commonbutton  style="margin-top: 40px; margin-left: 40px;"  value="核销" icon="btnSave" @call="save" :flicker="true"></yhm-commonbutton>
          </div>
        </div>

      </template>


    <!--数据空提示-->
    <template #empty>
      <span class="m_listNoData" v-show="content.length!='0'?false:true">暂时没有数据</span>
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
    name: 'commissionFeeForm',
    mixins: [managermixin],
    data(){
      return{
        contentTotal:[{
          count:'',
          money:''
        }],
        backupsTotal:[{
          count:'',
          money:''
        }],//备份的汇总数据
        content:[],
        iidList:[],
        money:'',
        index:'0',
        pager: {
          total: 0, // 总条数
          pageSize: 10, // 每页条数
          pageIndex: 1, // 当前页码
          selectCount: 0 // 选中条数
        },
         orderColumn:'insuredDate',
        order:'asc'
      }
    },
    methods:{

      save(){
        if (this.index!=1){
          let idd=[]
          let params={}
          for (let i in this.contentTotal){
            this.money=this.contentTotal[i].money
          }

          if (parseFloat(this.money) <=parseFloat(this.useMoney) ){
            if (this.iidList.length==0){

              for (let i in this.content){
                idd.push({
                  'id':this.content[i].id,
                  'ownerID':this.ownerID,
                  'useMoney':this.money
                })
              }
              params={
                iidList:idd
              }
            }else{
              this.iidList = []
              for(let j in this.content){
                for(let i=0; i<this.selectValue.length; i++){
                  if(this.content[j].id==this.selectValue[i]){
                    this.iidList.push({
                      'id':this.selectValue[i],
                      'ownerID':this.ownerID,
                      'useMoney':this.content[j].receivable
                    })
                  }
                }
              }

               params={
                iidList:this.iidList
              }
            }

            this.ajaxJson({
              url: '/Insurance/SaveCommissionFee',
              data:params,
              call:(data) =>{
                if (data.type === 0) {
                  let paramsTime={
                    ownerID: this.ownerID,
                    useMoney:this.money
                  }
                  this.ajaxJson({
                    url: '/Insurance/upComFee',
                    data:paramsTime,
                    call:(dataTime) =>{
                      if (dataTime.type === 0) {
                        this.$dialog.setReturnValue(11111)
                        this.$dialog.alert({
                          tipValue: data.message,
                          closeCallBack: () => {
                            this.selectValue=[]
                            this.initPageData(false)
                            // this.$dialog.close()
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
                    tipValue: data.message
                  })
                }
              }
            })
          }else {
            this.$dialog.confirm({
              tipValue: '应收账款金额不能大于手续费总金额',
              width: 350,
            })
          }
        }else {
          let idd=[]
          let params={}
          for (let i in this.contentTotal){
            this.money=this.contentTotal[i].money
          }

          if (parseFloat(this.money) <=parseFloat(this.useMoney) ) {
            if (this.iidList.length == 0) {
              for (let i in this.content) {
                idd.push(
                  this.content[i].id,
                )
              }
              params = {
                iidList: idd.join(','),
                ownerIDList: JSON.parse(sessionStorage.idlist).join(','),
                money:this.money
              }

            } else {
              if(this.index!=0){
                this.iidList=[]
                for(let i=0; i<this.selectValue.length;i++){

                  this.iidList.push(
                    this.selectValue[i]
                  )
                }
              }
              // console.log( idd.join(',') )

              params = {
                iidList: this.iidList.join(','),
                ownerIDList: JSON.parse(sessionStorage.idlist).join(','),
                money:this.money
              }
            }

            this.ajaxJson({
              url: '/Insurance/getSaveMony',
              data:params,
              call:(data) =>{
                if (data.type === 0) {
                  this.$dialog.setReturnValue(this.id)
                  this.$dialog.alert({
                    tipValue: data.message,
                    closeCallBack: () => {
                      this.initPageData(false)
                      // this.$dialog.close()
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
          }
        }
      },
      checkboxEvent(selectValue){
        let arr = []
        let s = 0;

        if(selectValue.length!='0'){
          this.isSelected = true
          for(let i in selectValue){
            for(let j in this.content){
              if(this.content[j].id ==selectValue[i]){
                arr.push(parseFloat(this.content[j].receivable))
                if(this.iidList.find((element) => (element.id == selectValue[i]))===undefined){
                  if (this.index==0){
                    this.iidList.push({
                      'id':this.selectValue[i],
                      'ownerID':this.ownerID,
                      'useMoney':''
                    })
                  }else {
                    this.iidList.push({
                      'id':this.selectValue[i],
                      'ownerID':this.ownerID,
                      'useMoney':''
                    })
                  }
                }
              }
            }
          }

          for (let q=arr.length-1; q>=0; q--) {
            s =accAdd(arr[q], s) ;
          }
          console.log(this.selectValue)
          this.contentTotal = [{count:selectValue.length+'', money:s+'',}]
        }else{
          this.contentTotal = this.backupsTotal
        }
      },
      //搜索
      initPageData (initValue) {
        this.setQuery2Value("insuredUnit")
        this.setQuery2Value("useMoney")
        this.setQuery2Value("ownerID")
        this.setQuery2Value("index")
        this.setQuery2Value("cccurDate")

        let params = {}
        if (initValue) {
          params = {
            cccurDate:this.cccurDate,
            orderColumn:this.orderColumn,
            order:this.order,
            insuredUnit:this.insuredUnit,
          }
        } else {
          params = {
            cccurDate:this.cccurDate,
            orderColumn:this.orderColumn,
            order:this.order,
            insuredUnit:this.insuredUnit,
          }
        }
        this.init({
          initValue:initValue,
          url: '/Insurance/getCommissionFeeManager',
          data:params,
          all:(data) =>{
            this.content = data.content
            this.contentTotal=data.total
            this.backupsTotal = data.total
          },
          init:(data)=>{
            //初始化时需要执行的代码
            // 这边初始化筛选信息



          }
        })
      }
    },
    created () {

    }
  }
</script>

<style scoped>

</style>
