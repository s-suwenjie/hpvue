<template>
    <div>
      <yhm-managerpage category="1" :total-table="true" :totalWidth="true">
<!--      <yhm-managerpage :total-table="true" :totalWidth="true">-->
        <!--导航条-->
<!--        <template #navigation>应收账款</template>-->
        <template #navigationTab>
          <router-link class="menuTabDiv menuTabActive" :to="{path:'/home/accountsReceivable/receivableManager'}">应收账款</router-link>
<!--          ./pages/insurance/accountsReceivable/receivableManager-->
          <router-link class="menuTabDiv " :to="{path:'/home/accountsReceivable/ReceivableForceWriteOffManager'}">添加强制核销对象</router-link>
        </template>
        <!--操作区-->
        <template #operate>
          <yhm-commonbutton value="添加" icon="btnAdd" :flicker="true" @call="add()" category="one"></yhm-commonbutton>
          <yhm-commonbutton :value="choose?'收起筛选':'展开筛选'" :icon="choose?'btnUp':'btnDown'" @call="switchChoose()"></yhm-commonbutton>
          <yhm-managersearch :value="searchStr" :history="shortcutSearchContent" id="searchStr" @call="initData"></yhm-managersearch>
          <yhm-commonbutton value="打开选中来源信息" icon="i-selectAll" @call="selectedList" :show="isSelected" category="three"></yhm-commonbutton>
<!--          :show="isSelected"-->
<!--          <yhm-commonbutton value="查看测试登记信息页面" icon="i-btn-applicationSm" @call="selectBadDebtList" category="three"></yhm-commonbutton>-->
        </template>
        <template #choose>
          <div v-show="choose" class="buttonBody mptZero">
            <yhm-radiofilter @initData="initChooses('unitOrPerson')" title="欠款方" :content="unitOrPersonList"></yhm-radiofilter>
            <yhm-radiofilter @initData="initChooses('state')" title="状态" :content="stateList"></yhm-radiofilter>
          </div>
        </template>
        <!--数据表头-->
        <template #listHead>
          <yhm-managerth style="width: 18px;" title="选择"></yhm-managerth>
          <yhm-managerth style="width: 18px;" title="查看"></yhm-managerth>
          <yhm-managerth style="width: 360px;" title="欠款方" ></yhm-managerth>
          <yhm-managerth style="width:200px" title="证件号"></yhm-managerth>
          <yhm-managerth style="width:200px" title="欠款金额" value="money"></yhm-managerth>
          <yhm-managerth style="width:200px" title="核销金额" value="money"></yhm-managerth>
        </template>

        <!--数据明细-->
        <template #listBody>
          <tr :class="[{twinkleBg: item.id==lastData},{InterlacBg:index%2!=0}]" v-for="(item,index) in content" :key="index">
            <yhm-manager-td-checkbox :value="item" @call="checkboxEvent"></yhm-manager-td-checkbox>
            <yhm-manager-td-look @click="listView(item)"></yhm-manager-td-look>
            <yhm-manager-td :value="item.belong" @click="skiPdetails(item)"></yhm-manager-td>
            <yhm-manager-td-center :value="item.certificateNo"></yhm-manager-td-center>
            <yhm-manager-td-money :value="item.money"></yhm-manager-td-money>
            <yhm-manager-td-money @click="selectWriteOff(item)" :value="item.writeOffMoney"></yhm-manager-td-money>
          </tr>
        </template>

        <template #listTotalHead >
          <yhm-managerth before-color="black" style="width: 60px" width="60px" title="" before-title="总数" ></yhm-managerth>
          <yhm-managerth before-color="black" style="width: 60px" width="60px" title="" before-title="金额" ></yhm-managerth>
        </template>
        <template #listTotalBody>
          <tr>
            <yhm-manager-td-rgt @click="totalClick(item)" style="text-align: center;" :value="contentTotal[0].count"></yhm-manager-td-rgt>
            <yhm-manager-td-money @click="totalClick(item)" style="text-align: center;"  :value="contentTotal[0].money"></yhm-manager-td-money>
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
  export default {
    name: 'receivableManager',
    mixins: [managermixin],
    data(){
      return{
        unitOrPersonList:{},//收入来源
        stateList:{},//收入来源
        contentTotal:[
          {
            count:'',
            money:''
          }
        ],
        backupsTotal:[],//备份的汇总数据
        name:'',
        lastData:''
      }
    },
    methods:{
      selectWriteOff(item){
        this.$dialog.OpenWindow({
          width: '1050',
          height: '550',
          url: '/receivableManagerView?ownerID='+item.belongID,
          title: '查看应收账款',
          closeCallBack: (data) => {
            if(data){
              this.initData(false)
            }
          }
        })
      },
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
        sessionStorage.receivableSourceManagerView = JSON.stringify(selectValue)
      },
      //打开坏账登记列表
      selectBadDebtList(){
        this.$dialog.OpenWindow({
          width: '1050',
          height: '550',
          url: '/receivableBadDebtView',
          title: '查看坏账登记信息',
          closeCallBack: (data) => {
            if (data) {
              this.initPageData(false)
            }
          }
        })
      },
      //打开选中来源信息
      selectedList(){
        let id = JSON.parse(sessionStorage.receivableSourceManagerView)[0].id//选中的数据的id

        this.$dialog.OpenWindow({
          width: '1050',
          height: '550',
          url: '/receivableCenterView?type=1&id='+id,//receivableSourceManagerView
          title: '查看来源信息列表',
          closeCallBack: (data) => {
            if (data) {
              this.initPageData(false)
            }
          }
        })
      },
      listView(item){
        this.$dialog.OpenWindow({
          width: '1050',
          height: '550',
          url: '/receivableCenterView?id='+item.id,
          title: '查看来源信息列表',
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
            state:'1'
          }
        } else {
          params = {
            unitOrPerson:this.unitOrPersonList.value,
            state:this.stateList.value
          }
        }
        this.init({
          initValue:initValue,
          url: '/finance/receivableCenter/getManager',
          data:params,
          all:(data) =>{
            this.selectValue=[]
            this.contentTotal = data.total
            this.backupsTotal = data.total
            this.lastData = data.lastData
          },
          init:(data)=>{
            //初始化时需要执行的代码
            // 这边初始化筛选信息
            this.unitOrPersonList = data.unitOrPersonPsd
            this.stateList = data.statePsd
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
