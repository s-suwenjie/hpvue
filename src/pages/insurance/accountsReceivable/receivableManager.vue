<template>
    <div>
      <yhm-managerpage :total-table="true" :totalWidth="true">
        <!--导航条-->
        <template #navigation>应收账款</template>

        <!--操作区-->
        <template #operate>
          <yhm-commonbutton value="添加" icon="btnAdd" :flicker="true" @call="add()" category="one"></yhm-commonbutton>
          <yhm-commonbutton :value="choose?'收起筛选':'展开筛选'" :icon="choose?'btnUp':'btnDown'" @call="switchChoose()"></yhm-commonbutton>
          <yhm-managersearch :value="searchStr" :history="shortcutSearchContent" id="searchStr" @call="initData"></yhm-managersearch>
          <yhm-commonbutton value="打开选中信息" icon="i-selectAll" @call="selectedList" :show="isSelected" category="three"></yhm-commonbutton>
        </template>
        <template #choose>
          <div v-show="choose" class="buttonBody mptZero">
            <yhm-radiofilter @initData="initChooses('unitOrPerson')" title="欠款方" :content="unitOrPersonList"></yhm-radiofilter>
          </div>
        </template>
        <!--数据表头-->
        <template #listHead>
          <yhm-managerth style="width: 18px;" title="选择"></yhm-managerth>
          <yhm-managerth style="width: 18px;" title="查看"></yhm-managerth>
          <yhm-managerth style="width: 360px;" title="欠款方" ></yhm-managerth>
          <yhm-managerth style="width:200px" title="证件号"></yhm-managerth>
          <yhm-managerth style="width:200px" title="欠款金额" value="money"></yhm-managerth>
        </template>

        <!--数据明细-->
        <template #listBody>
          <tr :class="[{twinkleBg: item.id==lastData},{InterlacBg:index%2!=0}]" v-for="(item,index) in content" :key="index">
            <yhm-manager-td-checkbox :value="item" @call="checkboxEvent"></yhm-manager-td-checkbox>
            <yhm-manager-td-look @click="listView(item)"></yhm-manager-td-look>
            <yhm-manager-td :value="item.other" @click="skiPdetails(item)"></yhm-manager-td>
            <yhm-manager-td-center :value="item.certificateNo"></yhm-manager-td-center>
            <yhm-manager-td-money :value="item.money"></yhm-manager-td-money>
          </tr>
        </template>

        <template #listTotalHead >
          <yhm-managerth before-color="black" style="width: 60px" width="60px" title="" before-title="总数" ></yhm-managerth>
          <yhm-managerth before-color="black" style="width: 60px" width="60px" title="" before-title="金额" ></yhm-managerth>
        </template>
        <template #listTotalBody>
          <tr>
            <yhm-manager-td-rgt @click="totalClick(item)" style="text-align: center;" v-for="(item,key) in contentTotal" :key="key" :value="item.count"></yhm-manager-td-rgt>
            <yhm-manager-td-money @click="totalClick(item)" style="text-align: center;" v-for="(item,index) in contentTotal" :key="index" :value="item.money"></yhm-manager-td-money>
          </tr>
        </template>
        <!--数据空提示-->
        <template #empty>
          <span class="m_listNoData" v-show="content.length!='0'?false:true">暂时没有数据</span>
        </template>
        <!--分页控件-->
        <template #pager>
          <yhm-pagination :pager="pager" @initData="initPageData(false)"></yhm-pagination>
        </template>
      </yhm-managerpage>
    </div>
</template>

<script>
  import { managermixin } from '@/assets/manager.js'
  // import {formatDate } from '@/assets/common.js'

  export default {
    name: 'receivableManager',
    mixins: [managermixin],
    data(){
      return{
        unitOrPersonList:{},//收入来源
        contentTotal:[],
        backupsTotal:[],//备份的汇总数据
        name:'',
        content:[],

      }
    },
    methods:{
      skiPdetails(item){
        if(item.unitOrPerson=='0'){
          this.$dialog.OpenWindow({
            width: '1050',
            height: '750',
            url: '/unitView?id='+item.id,
            title: '查看公司信息',
            closeCallBack: (data) => {
              if (data) {
                this.initPageData(false)
              }
            }
          })
        }else if(item.unitOrPerson=='1'){
          this.$dialog.OpenWindow({
            width: '1050',
            height: '750',
            url: '/personView?id='+item.id,
            title: '查看联系人信息',
            closeCallBack: (data) => {
              if (data) {
                this.initPageData(false)
              }
            }
          })
        }

      },
      initChooses(){
      this.pager.pageIndex = 1
      this.initPageData()
      },
      checkboxEvent(selectValue){
        let arr = []
        let s = 0;
        if(selectValue.length!='0'){
          this.isSelected = true
          for(let i in selectValue){
            for(let j in this.content){
              if(this.content[j].id==selectValue[i]){
                arr.push(parseInt(this.content[j].money))
              }
            }
          }
          for (let q=arr.length-1; q>=0; q--) {
            s += arr[q];
          }
          this.contentTotal = [{count:selectValue.length+'', money:s+'',}]
        }else{
          this.contentTotal = this.backupsTotal
          this.isSelected = false
        }
        sessionStorage.receivablesSelectValue = JSON.stringify(selectValue)
      },
      //打开选中信息
      selectedList(){
        this.$dialog.OpenWindow({
          width: '1050',
          height: '550',
          url: '/receivableManagerView?type=1',
          title: '查看应收账款',
          closeCallBack: (data) => {
            if (data) {
              this.initPageData(false)
            }
          }
        })
      },
      // //计算账龄
      // dateDiff(sDate2) {
      //   let sDate1 = formatDate(new Date())
      //   //sDate1和sDate2的格式为xxxx-xx-xx
      //   let aDate,oDate1,oDate2,iDays
      //   //转换为xx-xx-xxxx格式
      //   aDate = sDate1.split("-")
      //   oDate1 = new Date(aDate[1] + "," + aDate[2] + "," + aDate[0])
      //   aDate = sDate2.split("-")
      //   oDate2 = new Date(aDate[1] + "," + aDate[2] + "," + aDate[0])
      //   //把相差的毫秒数转换为天数
      //   iDays = parseInt(Math.abs(oDate1 - oDate2) / 1000 / 60 / 60 / 24 )
      //   return iDays
      // },
      // payment(item){
      //   this.$dialog.OpenWindow({
      //     width: '1050',
      //     height: '700',
      //     url: '/receivableBankDetailForm',
      //     title: '添加收支明细',
      //     closeCallBack: (data) => {
      //       if (data) {
      //         this.initPageData(false)
      //       }
      //     }
      //   })
      // },
      listView(item){
        console.log( item )
        this.$dialog.OpenWindow({
          width: '1050',
          height: '550',
          url: '/receivableManagerView?otherID='+item.otherID,
          title: '查看应收账款',
          closeCallBack: (data) => {
            if (data) {
              this.initPageData(false)
            }
          }
        })
      },
      add(){
        this.$dialog.OpenWindow({
          width: '1050',
          height: '700',
          url: '/receivableForm?type=2',
          title: '添加应收账款',
          closeCallBack: (data) => {
            if (data) {
              this.initPageData(false)
            }
          }
        })
      },
      initPageData (initValue) {
        let params = {}
        if (initValue) {
          params = {

          }
        } else {
          params = {
            unitOrPerson:this.unitOrPersonList.value
          }
        }
        this.init({
          initValue:initValue,
          url: '/finance/receivable/getManagerAll',
          data:params,
          all:(data) =>{
            this.contentTotal = data.total
            this.backupsTotal = data.total
          },
          init:(data)=>{
            //初始化时需要执行的代码
            // 这边初始化筛选信息
            this.unitOrPersonList = data.unitOrPersonList

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
