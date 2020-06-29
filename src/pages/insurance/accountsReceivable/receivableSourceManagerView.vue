<template>
    <div class="f_main">
      <div class="i-left fs48b colorFFF lftSwitchArrow" title="上一条" v-show="isLeftID"  @click="strip('left')"></div>
      <div class="i-right fs48b colorFFF rgtSwitchArrow" title="下一条" v-show="isRightID" @click="strip('right')"></div>

      <yhm-view-body>
        <template #title>基本信息</template>
        <template #body>
<!--          <yhm-view-control title="欠款方" :content="belong"></yhm-view-control>-->
          <yhm-view-control title="证件号" content="4212121"></yhm-view-control>
          <yhm-view-control title="负责人" :content="createName"></yhm-view-control>
          <yhm-view-control title="欠款总金额" :content="money"></yhm-view-control>


        </template>
      </yhm-view-body>

      <div class="f_split"></div>

      <yhm-view-tab :customize="true" :pager="false">
        <template #tab>
          <yhm-view-tab-button :list="tabState" :index="0">来源信息</yhm-view-tab-button>
        </template>

        <template #content>
          <yhm-view-tab-list :customize="true" :pager="false" v-show="tabState[0].select">
            <template #listHead>
              <yhm-managerth style="width: 38px" title="查看"></yhm-managerth>
              <yhm-managerth title="欠款方"></yhm-managerth>
              <yhm-managerth style="width: 120px" title="来源"></yhm-managerth>
              <yhm-managerth style="width: 90px" title="证件号"></yhm-managerth>
              <yhm-managerth style="width: 200px" title="欠款金额"></yhm-managerth>
              <yhm-managerth style="width: 60px;" title="状态"></yhm-managerth>
            </template>
            <template #listBody>
              <tr :class="[{InterlacBg:index%2!=0}]" v-for="(item,index) in 1" :key="index">
                <yhm-manager-td-look  @click="listView(item)"></yhm-manager-td-look>
                <yhm-manager-td :value="item.ownerName"></yhm-manager-td>
                <yhm-manager-td value="item"></yhm-manager-td>
                <!--                <yhm-manager-td-psd :value="item.receivableSource" :list="receivableSourceList.list"></yhm-manager-td-psd>-->
                <yhm-manager-td value="item.certificateNo"></yhm-manager-td>
                <yhm-manager-td-money :value="item.money"></yhm-manager-td-money>
                <yhm-manager-td-center :value="item.isFinish=='0'?'待收款':''" ></yhm-manager-td-center>
               </tr>
            </template>
          </yhm-view-tab-list>
        </template>
      </yhm-view-tab>
      <yhm-formoperate :createName="createName" :insertDate="insertDate" :updateName="updateName" :updateDate="updateDate">
        <template #btn>
        </template>
      </yhm-formoperate>
<!--      <yhm-managerpage category="1" mainWidth="1050" mainHeight="490" menu-tab-width="1014"  :total-table="true" :totalWidth="true">-->
<!--        &lt;!&ndash;导航条&ndash;&gt;-->
<!--        <template #navigation>基本信息</template>-->
<!--        <template #choose>-->
<!--          <div style="padding-bottom: 20px;width: 1014px;margin: 0 auto;display: flex;">-->
<!--&lt;!&ndash;            <yhm-radiofilter @initData="initChooses('receivableSource')" title="收入来源" :content="receivableSourceList"></yhm-radiofilter>&ndash;&gt;-->
<!--&lt;!&ndash;            <yhm-commonbutton value="打开选中信息" icon="i-selectAll" @call="selectedList" :show="isSelected" category="three"></yhm-commonbutton>&ndash;&gt;-->
<!--          </div>-->
<!--        </template>-->

<!--        &lt;!&ndash;数据表头&ndash;&gt;-->
<!--        <template #listHead>-->
<!--&lt;!&ndash;          <yhm-managerth style="width: 38px;" title="选择"></yhm-managerth>&ndash;&gt;-->
<!--          <yhm-managerth style="width: 38px;" title="查看"></yhm-managerth>-->
<!--          <yhm-managerth title="欠款方" ></yhm-managerth>-->
<!--          <yhm-managerth style="width: 150px;" title="来源" ></yhm-managerth>-->
<!--          <yhm-managerth style="width: 150px;" title="证件号" ></yhm-managerth>-->
<!--          <yhm-managerth style="width:100px" title="欠款金额"></yhm-managerth>-->
<!--          <yhm-managerth style="width: 80px;" title="状态" ></yhm-managerth>-->
<!--        </template>-->

<!--        &lt;!&ndash;数据明细&ndash;&gt;-->
<!--        <template #listBody>-->
<!--          <tr :class="[{twinkleBg: item.id==lastData},{InterlacBg:index%2!=0}]" v-for="(item,index) in content" :key="index">-->
<!--&lt;!&ndash;            <yhm-manager-td-checkbox :value="item" @call="checkboxEvent"></yhm-manager-td-checkbox>&ndash;&gt;-->
<!--            <yhm-manager-td-look @click="listView(item)"></yhm-manager-td-look>-->
<!--            <yhm-manager-td :value="item.ownerName"></yhm-manager-td>-->
<!--            <yhm-manager-td-psd :value="item.receivableSource" :list="receivableSourceList.list"></yhm-manager-td-psd>-->
<!--            <yhm-manager-td :value="item.certificateNo"></yhm-manager-td>-->
<!--            <yhm-manager-td-money :value="item.money"></yhm-manager-td-money>-->
<!--            <yhm-manager-td-center :value="item.isFinish=='0'?'待收款':''" ></yhm-manager-td-center>-->
<!--          </tr>-->
<!--        </template>-->
<!--        <template #listTotalHead >-->
<!--          <yhm-managerth before-color="black" style="width: 60px" width="60px" title="" before-title="总数" ></yhm-managerth>-->
<!--          <yhm-managerth before-color="black" style="width: 60px" width="60px" title="" before-title="金额" ></yhm-managerth>-->
<!--        </template>-->
<!--        <template #listTotalBody>-->
<!--          <tr>-->
<!--            <yhm-manager-td-rgt @click="totalClick(item)" style="text-align: center;" :value="contentTotal[0].count"></yhm-manager-td-rgt>-->
<!--            <yhm-manager-td-money @click="totalClick(item)" style="text-align: center;" :value="contentTotal[0].money"></yhm-manager-td-money>-->
<!--          </tr>-->
<!--        </template>-->
<!--        &lt;!&ndash;数据空提示&ndash;&gt;-->
<!--        <template #empty>-->
<!--          <span class="m_listNoData" v-show="content.length!='0'?false:true">暂时没有数据</span>-->
<!--        </template>-->
<!--        &lt;!&ndash;分页控件&ndash;&gt;-->
<!--        <template #pager>-->
<!--          <yhm-pagination :pager="pager" isPageSize="true" @initData="initData(false)"></yhm-pagination>-->
<!--        </template>-->
<!--      </yhm-managerpage>-->
    </div>
</template>

<script>
  import { formmixin } from '@/assets/form.js'
  export default {
    name: 'receivableSourceManagerView',
    mixins: [formmixin],
    data(){
      return{
        tabState:[{select:true}],
        belong:'',//欠款方姓名
        belongID:'',//欠款方ID
        createName:'',//负责人
        money:'',//欠款总金额
        details:[],


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
        pager: {
          total: 0, // 总条数
          pageSize: 5, // 每页条数
          pageIndex: 1, // 当前页码
          selectCount: 0 // 选中条数
        }

      }
    },
    methods:{
      //打开选中信息
      selectedList(){
        this.$dialog.OpenWindow({
          width: '1050',
          height: '550',
          url: '/receivableManagerView?type=1',
          title: '查看应收账款',
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
        sessionStorage.receivablesSelectValue = JSON.stringify(selectValue)
      },
      initChooses(){
        this.initData()
      },
      listView(item){
        this.$dialog.OpenWindow({
          width: '1050',
          height: '550',
          url: '/receivableManagerView?ownerID='+item.id,
          title: '查看应收账款',
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
        let selectList = JSON.parse(sessionStorage.receivableSourceManagerView)//选中的数据的id
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
          let selectList = JSON.parse(sessionStorage.receivableSourceManagerView)//选中的数据的id
          this.ownerID=selectList[this.index]
        }else{
          this.setQuery2Value('ownerID')
        }
        this.initData(false)
      },
      initData (initValue) {
        let params = {}
        if (initValue) {
          params = {
            id:this.ownerID
          }
        } else {
          params = {
            init:true,
            id:this.ownerID,
            receivableSource:this.receivableSourceList.value,
          }
        }
        this.init({
          initValue:initValue,
          url: '/finance/receivableCenter/initView',
          data:params,
          all:(data) =>{
            this.details = data.details
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
