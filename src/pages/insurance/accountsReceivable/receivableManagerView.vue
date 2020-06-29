<template>
    <div>
      <div class="i-left fs48b colorFFF lftSwitchArrow" title="上一条" v-show="isLeftID"  @click="strip('left')"></div>
      <div class="i-right fs48b colorFFF rgtSwitchArrow" title="下一条" v-show="isRightID" @click="strip('right')"></div>

      <yhm-managerpage category="1" mainWidth="1050" mainHeight="490" menu-tab-width="1014"  :total-table="true" :totalWidth="true">
        <!--导航条-->
        <template #navigation>基本信息</template>
        <template #choose>
          <div style="padding-bottom: 20px;width: 1014px;margin: 0 auto;display: flex;">
<!--            <yhm-radiofilter @initData="initChooses('receivableSource')" title="收入来源" :content="receivableSourceList"></yhm-radiofilter>-->
<!--            <yhm-radiofilter @initData="initChooses('writeOffType')" title="核销类型" :content="writeOffTypeList"></yhm-radiofilter>-->
            <yhm-commonbutton value="打开选中信息" icon="i-selectAll" @call="selectedList" :show="isSelected" category="three"></yhm-commonbutton>
          </div>
        </template>

        <!--数据表头-->
        <template #listHead>
          <yhm-managerth style="width: 38px;" title="选择"></yhm-managerth>
          <yhm-managerth style="width: 38px;" title="查看"></yhm-managerth>
          <yhm-managerth title="欠款方" ></yhm-managerth>
          <yhm-managerth style="width:100px" title="欠款金额"></yhm-managerth>
          <yhm-managerth style="width: 150px;" title="欠款发生日期" ></yhm-managerth>
          <yhm-managerth style="width: 150px;" title="预计收款日期" ></yhm-managerth>
          <yhm-managerth style="width:60px;" title="账龄" ></yhm-managerth>
<!--          <yhm-managerth style="width: 80px;" title="状态" ></yhm-managerth>-->
          <yhm-managerth style="width:130px;" title="操作"></yhm-managerth>
        </template>

        <!--数据明细-->
        <template #listBody>
          <tr :class="[{twinkleBg: item.id==lastData},{InterlacBg:index%2!=0}]" v-for="(item,index) in content" :key="index">
            <yhm-manager-td-checkbox :value="item" @call="checkboxEvent"></yhm-manager-td-checkbox>
            <yhm-manager-td-look @click="listView(item)"></yhm-manager-td-look>
            <yhm-manager-td :value="item.ownerName"></yhm-manager-td>
            <yhm-manager-td-money :value="item.money"></yhm-manager-td-money>
            <yhm-manager-td-date :value="item.workDate.slice(0,10)"></yhm-manager-td-date>
            <yhm-manager-td-date :value="item.collectMoneyDate.slice(0,10)" ></yhm-manager-td-date>
            <yhm-manager-td-center :value="item.accountAge+'天'"></yhm-manager-td-center>
<!--            <yhm-manager-td-center :value="item.isFinish=='0'?'待收款':''" ></yhm-manager-td-center>-->
            <yhm-manager-td-operate>
              <yhm-manager-td-operate-button @click="badDebtEvent(item)" v-show="item.isFinish==0" value="坏账登记" icon="i-btn-applicationSm" color="#49a9ea"></yhm-manager-td-operate-button>
              <yhm-manager-td-operate-button @click="registerEvent(item)" v-show="item.isFinish==1" value="查看登记信息" icon="i-btn-applicationSm" color="#333"></yhm-manager-td-operate-button>
            </yhm-manager-td-operate>
          </tr>
        </template>
        <template #listTotalHead>
          <yhm-managerth before-color="black" style="width: 60px" width="60px" title="" before-title="总数" ></yhm-managerth>
          <yhm-managerth before-color="black" style="width: 60px" width="60px" title="" before-title="金额" ></yhm-managerth>
        </template>
        <template #listTotalBody>
          <tr>
            <yhm-manager-td-rgt @click="totalClick(item)" style="text-align: center;" :value="contentTotal[0].count"></yhm-manager-td-rgt>
            <yhm-manager-td-money @click="totalClick(item)" style="text-align: center;" :value="contentTotal[0].money"></yhm-manager-td-money>
          </tr>
        </template>
        <!--数据空提示-->
        <template #empty>
          <span class="m_listNoData" v-show="content.length!='0'?false:true">暂时没有数据</span>
        </template>
        <!--分页控件-->
        <template #pager>
          <yhm-pagination :pager="pager" isPageSize="true" @initData="initData(false)"></yhm-pagination>
        </template>
      </yhm-managerpage>
    </div>
</template>

<script>
  import { managermixin } from '@/assets/manager.js'
  export default {
    name: 'receivableManagerView',
    mixins: [managermixin],
    data(){
      return{
        receivableSourceList:{},//收入来源
        writeOffTypeList:{},//核销类型
        contentTotal:[
          {
            count:'',
            money:''
          }
        ],
        backupsTotal:[],//备份的汇总数据
        name:'',
        content:[],
        index:0,
        isLeftID:false,
        isRightID:false,
        isSelected:false,
        lastData:'',
        pager: {
          total: 0, // 总条数
          pageSize: 5, // 每页条数
          pageIndex: 1, // 当前页码
          selectCount: 0 // 选中条数
        }

      }
    },
    methods:{
      //查看坏账登记信息
      registerEvent(item){
        this.$dialog.OpenWindow({
          width: '1050',
          height: '360',
          url: '/receivableBadDebtView?id='+item.id,
          title: '查看坏账登记信息',
          closeCallBack: (data) => {
            if (data) {
              this.initData(false)
            }
          }
        })
      },
      //坏账登记
      badDebtEvent(item){
        this.$dialog.OpenWindow({
          width: '1050',
          height: '600',
          url: '/receivableBadDebtForm?balance='+ item.money+'&ownerID='+item.id,
          title: '坏账登记',
          closeCallBack: (data) => {
            if (data) {
              this.initData(false)
            }
          }
        })
      },
      //打开选中信息
      selectedList(){
        this.$dialog.OpenWindow({
          width: '1050',
          height: '370',
          url: '/receivableView?type=1&id=1',
          title: '查看应收账款详情',
          closeCallBack: (data) => {
            if (data) {
              this.initData(false)
            }
          }
        })
      },
      checkboxEvent(selectValue){//用户点击选中信息
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
        sessionStorage.receivablesFormSelectValue = JSON.stringify(selectValue)
      },
      initChooses(){
        this.initData()
      },
      listView(item){
        this.$dialog.OpenWindow({
          width: '1050',
          height: '370',
          url: '/receivableView?id='+item.id,
          title: '查看应收账款详情',
          closeCallBack: (data) => {
            if(data){
              this.initData(false)
            }
          }
        })
      },
      strip(val){//点击左右按钮时
        if(this.type!='1'){
          this.switchover()
          return
        }
        let selectList = JSON.parse(sessionStorage.receivablesSelectValue)//选中的数据的id
        if(selectList.length>0){
          this.isRightID = true
        }else{
          this.isRightID = false
        }
        if(selectList.length==1){
          this.isRightID = false
          this.isLeftID = false
        }
        let a =selectList.indexOf(this.ownerID)
        if(a!=-1){//如果当前数据id不在全部id中的最前或者最后时 显示左右按钮
          if(a!=0||a!=selectList.length-1){
            this.isLeftID = true
            this.isRightID = true
          }
        }
        if(val=='right'){
          this.index++
          if(this.index==selectList.length-1){
            this.isRightID = false
          }else{
            this.isRightID = true
          }
        }else if(val=='left'){
          this.index--
          if(this.index==0){
            this.isLeftID = false
          }else{
            this.isLeftID = true
          }
        }
        this.switchover()
      },
      switchover (){
        if(this.type=='1'){//等于1的时候代表是从选中信息进来的
          let selectList = JSON.parse(sessionStorage.receivablesSelectValue)//选中的数据的id
          this.ownerID=selectList[this.index]
        }else{
          this.setQuery2Value('ownerID')
        }
        this.initData()
      },
      initData (initValue) {
        let params = {}
        if (initValue) {
          params = {
            ownerID:this.ownerID
          }
        } else {
          params = {
            init:true,
            ownerID:this.ownerID,
            receivableSource:this.receivableSourceList.value,
            writeOffType:this.writeOffTypeList.value
          }
        }

        this.init({
          initValue:initValue,
          url: '/finance/receivableDetail/getManager',
          data:params,
          all:(data) =>{
            this.receivableSourceList = data.receivableSourceList
            this.writeOffTypeList = data.writeOffTypeList
            this.contentTotal = data.total
            this.backupsTotal = data.total
            this.lastData = data.lastData
          },
          init:(data)=>{

            //初始化时需要执行的代码
            // 这边初始化筛选信息
          }
        })
      }
    },
    created () {
      this.setQuery2Value('type')
      this.strip()
    }
  }
</script>

<style scoped>

</style>
