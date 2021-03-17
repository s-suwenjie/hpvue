<template>
  <div>
    <yhm-managerpage>
      <!--导航条-->
      <template #navigation>业务管理&nbsp;&gt;&nbsp;库存管理&nbsp;&gt;&nbsp;入库管理</template>
      <!--操作区-->
      <template #operate>
        <yhm-commonbutton value="添加" icon="btnAdd" :flicker="true" @call="add()"></yhm-commonbutton>
        <yhm-commonbutton value="入库单打印"  icon="btnAdd" :flicker="true" @call="shuibian" category="one"></yhm-commonbutton>
        <yhm-commonbutton :value="choose?'收起筛选':'展开筛选'" :icon="choose?'btnUp':'btnDown'" @call="switchChoose()"></yhm-commonbutton>
        <yhm-managersearch :value="searchStr" :history="shortcutSearchContent" id="searchStr" @call="initData"></yhm-managersearch>
        <yhm-radiofilter style="margin-top: 6px;" @initData="initChoose('dateType')" title="时间" :content="dateTypeList"></yhm-radiofilter>

      </template>
      <!--筛选区-->
      <template #choose>
        <div v-show="choose" class="buttonBody mptZero">
          <yhm-radiofilter @initData="initChoose('categoryUnit')" title="商品类型"  :content="listCategory"></yhm-radiofilter>
          <yhm-radiofilter @initData="initChoose('applicableModels')" title="规格型号" :content="applicableModelsPsd"></yhm-radiofilter>
          <yhm-radiofilter all="0" @initData="initChoose('state')" title="状态" :content="state"></yhm-radiofilter>

        </div>
      </template>
      <template #operateMore>
        <div :class="{customTimeShow:timeShow,customTimeHide:!timeShow}" >
          <yhm-form-date v-show="dateShow" title="开始时间" @call="dateSelection(startDateStr,endDateStr)" style="width: 350px;" :value="startDateStr" id="startDateStr" position="t"></yhm-form-date>
          <yhm-form-date v-show="dateShow" title="结束时间" @call="dateSelection(startDateStr,endDateStr)" style="width: 350px;margin-left: 30px;" :value="endDateStr" id="endDateStr" position="t"></yhm-form-date>
        </div>
      </template>
      <!--数据表头-->
      <template #listHead>
        <yhm-managerth style="width: 38px;" title="选择"></yhm-managerth>
        <yhm-managerth style="width: 38px;" title="查看"></yhm-managerth>
        <yhm-managerth style="width: 150px;" title="入库人员"></yhm-managerth>
        <yhm-managerth style="width: 150px;" title="商品类型"></yhm-managerth>
        <yhm-managerth style="width: 150px;" title="库存类型"></yhm-managerth>
        <yhm-managerth style="width: 150px;" title="入库时间" value="workDate" ></yhm-managerth>
        <yhm-managerth  title="入库编号"></yhm-managerth>
        <yhm-managerth style="width: 200px" title="操作"></yhm-managerth>
      </template>
      <!--数据明细-->
      <template #listBody>
        <tr :class="[{InterlacBg:index%2!=0}]" v-for="(item,index) in content"
            :key="index">
          <yhm-manager-td-checkbox :value="item" @call="check(selectValue,index)"></yhm-manager-td-checkbox>
          <yhm-manager-td-look @click="listView(item)"></yhm-manager-td-look>
          <yhm-manager-td-center :value="item.wareHouser" ></yhm-manager-td-center>
          <yhm-manager-td-center :value="item.category"></yhm-manager-td-center>
          <yhm-manager-td-psd :value="item.applicableModels" :list="applicableModelsList"></yhm-manager-td-psd>

<!--          <yhm-manager-td-date :value="item.workDate.slice(0,10)"></yhm-manager-td-date>-->
          <yhm-manager-td-center title="右键可筛选" :value="item.workDate.slice(0,10)" :menu-list="workDateMenu.indexOf('取消当前筛选')!='-1'?['取消当前筛选']:['筛选当前日期']" @rightClick="workOrderItem = item" @menuClick="workDateMenuClick"></yhm-manager-td-center>

          <yhm-manager-td-center :value="item.code"></yhm-manager-td-center>
          <yhm-manager-td-operate>
            <yhm-manager-td-operate-button @click="printFund(item,'1')" :no-click="item.state == '0'?false:true"  value="提交申请" icon="i-btn-applicationSm" :color="item.state == '0'?'#49a9ea':'#333'"></yhm-manager-td-operate-button>

          </yhm-manager-td-operate>
          <!--<yhm-manager-td-money :value="item.money" :before-icon="item.subjectList.length > 1?'i-btn-prompt':''" @mouseover="tableTipShowEvent" @mouseout="tableTipHideEvent" :value-object="item"></yhm-manager-td-money>-->

        </tr>
      </template>
      <!--数据空提示-->
      <template #empty>
        <span class="m_listNoData" v-show="empty">暂时没有数据</span>
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
    name: 'stockInManager',
    mixins: [managermixin],
    data () {
      return{
        searchStr:'',
        listCategory: {
          value: '',
          list: [],
        },
        workDateMenu:[],
        workOrderItem:[],
        startDateStr:'',//开始时间
        endDateStr:'',//结束时间
        timeShow:false,//自定义时间选择 显示隐藏
        dateShow:false,//时间组件 显示隐藏
        dateTypeList:{
          value: '', //默认为空
          list: [
            {showName:"本日", num: "0", code: "", img: ""},
            {showName:"昨日", num: "1", code: "", img: ""},
            {showName:"本周", num: "2", code: "", img: ""},
            {showName:"上周", num: "3", code: "", img: ""},
            {showName:"本月", num: "4", code: "", img: ""},
            {showName:"上月", num: "5", code: "", img: ""},
            {showName:"本季度", num: "6", code: "", img: ""},
            {showName:"上季度", num: "7", code: "", img: ""},
            {showName:"本年", num: "8", code: "", img: ""},
            // {showName:"上年", num: "9", code: "", img: ""},
            {showName:"选择时间", num: "9", code: "", img: ""},
          ]
        },
        applicableModelsPsd:{
          value:'',
          list:[]
        },
        state:{
          value:'',
          list:[
            {
              code:'',
              img:'',
              num:'4',
              showName:'进行中'
            },
            {
              code:'',
              img:'',
              num:'2',
              showName:'已完成'
            },
            {
              code:'',
              img:'',
              num:'',
              showName:'全部'
            },
          ]
        },
        applicableModelsList:[],
        select:'',
        ns:false,
        iid:[],
      }
    },
    methods:{
      workDateMenuClick(title,index){
        if(title=='筛选当前日期'){
          this.startDateStr = this.workOrderItem.workDate.slice(0,10)
          this.endDateStr = this.workOrderItem.workDate.slice(0,10)
          this.dateTypeList.value = '9'
          this.workDateMenu = ['取消当前筛选']
          this.initChoose('dateType')
        }else if(title=='取消当前筛选'){
          this.startDateStr = ''
          this.endDateStr = ''
          this.dateTypeList.value = ''
          this.workDateMenu = ['筛选当前日期']
          this.initChoose('dateType')
          return
        }
        setTimeout(()=>{
          this.initPageData(false)
        },0)
      },
      // 筛选事件
      initChoose (op) {
        this.pager.pageIndex = 1
        if(op === 'dateType'&&this.dateTypeList.value!=9){
          this.startDateStr=''//开始时间
          this.endDateStr=''//结束时间
        }
        if (this.dateTypeList.value==9&&op === 'dateType'){
          this.timeShow = true
          setTimeout(()=>{
            this.dateShow = true
          },300)
          return
        }else{
          if (op === 'dateType') {
            this.workDateMenu = ['筛选当前日期']
            this.timeShow = false
            setTimeout(()=>{
              this.dateShow = false
            },300)
            this.selectValue = []
          }
        }
        this.initPageData(false)
      },
      dateSelection(start,finish){//选择时间段
        if(start!=''&&finish!=''){
          this.initPageData(false)
        }
      },
      check(selectValue){
        this.select=selectValue
        console.log(selectValue)
        // let arr = []
        for(let i in selectValue){
          this.iid=selectValue[i]
        }
        console.log(this.iid)
      },
      //入库单打印-----------
      shuibian(){
        if(this.select.length==1 ) {
          console.log(this.select[1]);
          this.ajaxJson({
            url: '/stock/stockIn/print',
            data:{
              id:this.iid.id
            },
            call: (data) => {
              console.log(data);
              window.open('/UploadFile/' + data.message)
            }
          })
        }else if(this.select.length==0){
          this.$dialog.confirm({
            width: 300,
            tipValue: ' 必须选择一条数据',
            btnValueOk: '确定',
            alertImg: 'warn',
            okCallBack: (data) => {
            }
          })
        }else{
          this.$dialog.confirm({
            width: 300,
            tipValue: ' 只能选择一条',
            btnValueOk: '确定',
            alertImg: 'warn',
            okCallBack: (data) => {
            }
          })
        }
      },
      //console
      printFund(item,state){
        let tipValue = ''
        if(state=='1'){
          tipValue = '是否提交申请?'
        }else{
          tipValue = '是否入库?'
        }
        let params = {
          id:item.id,
          state:state
        }
        this.$dialog.confirm({
          width: 300,
          tipValue: tipValue,
          alertImg: 'warn',
          okCallBack: (data)=>{
            this.ajaxJson({
              url: '/stock/stockIn/updateForState',
              data: params,
              call: (data) => {
                if (data.type === 0) {
                  this.$dialog.setReturnValue(this.id)
                  this.$dialog.alert({
                    alertImg: 'ok',
                    tipValue: data.message,
                    closeCallBack: () => {
                      // this.$dialog.close()
                      this.initData()
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
      },
      //添加
      add () {
        this.$dialog.OpenWindow({
          width: '1050',
          height: '690',
          url:'/stockInForm?type=1',
          title:'添加入库单',
          closeCallBack:(data) =>{
            this.initPageData()
            if (data) {
              this.lastData = data   //最后添加一条数据给与动态闪烁
              this.initPageData(false)
              // /!*false->非初始化=>!import  true->初始化*!/
            }
          }
        })
      },
      listView(item){
        if(item.state=='0'){
          let url = ''
          let title = ''
          url = '/stockInForm?id=' + item.id
          title = '编辑入库单'
          this.$dialog.OpenWindow({
            width: '1050',
            height: '690',
            url:url,
            title:title,
            closeCallBack:(data) =>{
              // if (data) {
                this.initPageData(false)
              // }
            }
          })
        }else{
          let url = ''
          let title = ''
          url = '/stockOperateView?id=' + item.id
          title = '查看入库单'
          this.$dialog.OpenWindow({
            width: '1050',
            height: '690',
            url:url,
            title:title,
            closeCallBack:(data) =>{
              if (data) {
                this.initPageData(false)
              }
            }
          })

        }
      },
      // 搜索
      initPageData (initValue) {
        let params = {}
        if (initValue) {
          // 页面初始化是需要的参数
          params = {
            init: true,
            // searchStr:'0'
            __OwnerID:sessionStorage.getItem('____currentUserID'),
          }
        } else {
          // 页面非初始化时需要的参数
          params = {
            startDateStr:this.startDateStr,//开始时间
            endDateStr:this.endDateStr,//结束时间
            dateType:this.dateTypeList.value=='9'?'':this.dateTypeList.value,
            category: this.listCategory.value,
            applicableModels:this.applicableModelsPsd.value,
            init: false,
            searchStr:this.searchStr,
            stateStr:this.state.value,
            __OwnerID:sessionStorage.getItem('____currentUserID'),
            // pageDetail: this.pager.pageIndex,
          }
        }
        this.init({
          initValue: initValue,
          url: '/stock/stockIn/getManager',
          data: params,
          all: (data) => {
            // 不管是不是初始化都需要执行的代码
            this.content = data.content
            for (let i in this.content){
              this.content[i].category=data.categoryPsd.list[this.content[i].category].showName
            }
          },
          init: (data) => {
            // 初始化时需要执行的代码
            // 这边初始化筛选信息
            this.applicableModelsPsd.list = data.applicableModels.list
            this.applicableModelsPsd.value = data.applicableModels.value
            this.applicableModelsList = data.applicableModels.list
            this.listCategory.list=data.categoryPsd.list
            this.listCategory.value=data.categoryPsd.value
          }
        })
      }
    },
    created() {

    }
  }
</script>

<style scoped>
  .customTimeShow{
    width: 100%;
    height: 50px;
    position: relative;
    z-index: 2;
    display: flex;
    transition: all 0.5s;
  }
  .customTimeHide{
    width: 100%;
    height: 0px;
    display: flex;
    transition: all 0.5s;
  }
</style>
