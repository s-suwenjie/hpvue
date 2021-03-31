<template>
  <div>
    <yhm-managerpage>
      <!--      导航条      -->
      <template #navigation>业务管理&nbsp;&gt;&nbsp;库存管理&nbsp;&gt;&nbsp;出库管理</template>
      <!--      操作区      -->
      <template #operate>
        <yhm-commonbutton value="添加出库信息"  icon="btnAdd" :flicker="true" @call="add" category="one"></yhm-commonbutton>
        <yhm-commonbutton value="出库单打印"  icon="btnAdd" :flicker="true" @call="shuibianss" category="one"></yhm-commonbutton>
        <yhm-commonbutton :value="choose?'收起筛选':'展开筛选'" :icon="choose?'btnUp':'btnDown'" @call="switchChoose()"></yhm-commonbutton>
        <yhm-managersearch :value="searchStr" :history="shortcutSearchContent" id="searchStr" @call="initPageData"></yhm-managersearch>
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
      <template #listHead v-show="!empty">
        <yhm-managerth style="width: 40px;" title="选择" ></yhm-managerth>
        <yhm-managerth style="width: 40px;" title="查看" ></yhm-managerth>
        <yhm-managerth title="经办人" style="width: 150px;"></yhm-managerth>
        <yhm-managerth  title="出库日期" ></yhm-managerth>
        <yhm-managerth  title="商品类型" ></yhm-managerth>
        <yhm-managerth  title="规格型号" ></yhm-managerth>
        <yhm-managerth style="width: 270px;" title="出库编号"></yhm-managerth>
        <yhm-managerth style="width: 170px" title="总金额"></yhm-managerth>
        <yhm-managerth style="width: 170px" title="提交" ></yhm-managerth>
      </template>
      <!--      数据表单       -->
      <template #listBody >
        <tr :class="[{InterlacBg:index%2!=0}]" v-for="(item,index) in content" :key="index">
          <yhm-manager-td-checkbox :value="item" @call="check(selectValue,index)"></yhm-manager-td-checkbox>
          <yhm-manager-td-look @click="listView(item)"></yhm-manager-td-look>
          <yhm-manager-td :value="item.createNameStr"></yhm-manager-td>

<!--          <yhm-manager-td-date :value="item.insertDate.slice(0,10)"></yhm-manager-td-date>-->

          <yhm-manager-td-center title="右键可筛选" :value="item.insertDate.slice(0,10)" :menu-list="insertDateMenu.indexOf('取消当前筛选')!='-1'?['取消当前筛选']:['筛选当前日期']" @rightClick="workOrderItem = item" @menuClick="insertDateMenuClick"></yhm-manager-td-center>

          <yhm-manager-td-psd :value="item.category+''" :list="listCategory.list"></yhm-manager-td-psd>
          <yhm-manager-td-psd :value="item.applicableModels+''" :list="item.category=='3'?templeList:applicableModelsPsd.list"></yhm-manager-td-psd>
          <yhm-manager-td :value="item.code"></yhm-manager-td>
          <yhm-manager-td-money :value="item.totalStr+''" ></yhm-manager-td-money>
<!--          <yhm-manager-td :value="pos+''" @click="post(item)" :color="item.state == 1 ? 'rgba(0,0,0,0.4)' : '#333333'"></yhm-manager-td>-->
          <yhm-manager-td-operate>
            <yhm-manager-td-operate-button @click="printFund(item,'1')" :no-click="item.state == '0'?false:true"  value="提交申请" icon="i-btn-applicationSm" :color="item.state == '0'?'#49a9ea':'#333'"></yhm-manager-td-operate-button>

          </yhm-manager-td-operate>
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
    name: "stockOutManager",
    mixins: [managermixin],
    data(){
      return{
        workOrderItem:[],
        insertDateMenu:[],
        templeList:[],//行政
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
        color:'#333333',
        pos:'提交',
        lastData:'1',
        people:'',
        one:'',
        cont:'',
        content:'',
        applicableModelsPsd:{
          value:'',
          list:[]
        },
        listCategory:{
          value:'',
          list:[]
        },
        state:{
          value:'',
          list:[
            {
              code:'',
              img:'',
              num:'0',
              showName:'进行中'
            },
            {
              code:'',
              img:'',
              num:'1',
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
        select:'',
        lid:[],
      }
    },

    methods:{
      insertDateMenuClick(title,index){
        if(title=='筛选当前日期'){
          this.startDateStr = this.workOrderItem.insertDate.slice(0,10)
          this.endDateStr = this.workOrderItem.insertDate.slice(0,10)
          this.dateTypeList.value = '9'
          this.insertDateMenu = ['取消当前筛选']
          this.initChoose('dateType')
        }else if(title=='取消当前筛选'){
          this.startDateStr = ''
          this.endDateStr = ''
          this.dateTypeList.value = ''
          this.insertDateMenu = ['筛选当前日期']
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
        if (this.dateTypeList.value==9&&op=='dateType'){
          this.timeShow = true
          setTimeout(()=>{
            this.dateShow = true
          },300)
          return
        }else{
          if (op === 'dateType') {
            this.insertDateMenu = ['筛选当前日期']
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
        console.log(selectValue);
        for (let i in selectValue ) {
          this.lid=selectValue[i]
        }
      },
      //出库单打印
      shuibianss(){

        if(this.select.length==1 ){
          this.ajaxJson({
            url:'/stock/stockout/print',
            data:{
              id:this.lid.id,
            },
            call:(data)=>{
              console.log(data);
              window.open('/UploadFile/'+data.message)
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
      post(item){
        if(item.state==0){
          this.$dialog.confirm({
            width: 300,
            tipValue: ' 确认此操作?',
            btnValueOk: '确定',
            alertImg: 'warn',
            okCallBack: (data) => {
              let params = {
                id: item.id,
                state: '1'
              }
              this.ajaxJson({
                url: '/stock/stockout/updateToStockout',
                data: params,
                call: (data) => {
                  if (data.type === 0) {
                    this.$dialog.alert({
                      tipValue: data.message,
                      closeCallBack: (data) => {
                        this.initPageData(false)
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
        }
      },
      add() {
        this.$dialog.OpenWindow({
          width: 1050,
          height: 720,
          url:'/stockOutForm?type=0',
          title:'添加出库信息',
          closeCallBack:(data) =>{
            if (data) {
              this.lastData = data//接收子页面传的值
              this.initPageData(false)
            }
          }
        })
      },
      listView(item){
        if(item.state=='0'){
          this.$dialog.OpenWindow({
            width: 1050,
            height: 650,
            url:'/stockOutForm?idm=' + item.id ,
            title:'出库信息',
            closeCallBack:(data) =>{
              this.initPageData(false)
              if (data) {
                this.lastData = data//接收子页面传的值

              }
            }
          })
        }else {
          this.$dialog.OpenWindow({
            width: 1050,
            height: 650,
            url:'/stockOutView?id=' + item.id ,
            title:'查看出库信息'
          })
        }
        this.cont=item.person

      },


      initPageData (initValue) {
        let params = {}
        if (initValue) {
          // 页面初始化是需要的参数
          params = {

          }
        } else {
          let startDateStr = ''
          let endDateStr = ''
          if(this.dateTypeList.value=='9'){
            startDateStr = this.startDateStr +' 00:00:00'
            endDateStr = this.endDateStr + ' 23:59:59'
          }else{
            startDateStr = this.startDateStr
            endDateStr = this.endDateStr
          }
          // 页面非初始化时需要的参数
          params = {
            init: false,
            startDateStr:startDateStr,//开始时间
            endDateStr:endDateStr,//结束时间
            dateType:this.dateTypeList.value=='9'?'':this.dateTypeList.value,
            searchStr:this.searchStr,
            category: this.listCategory.value,
            applicableModels:this.applicableModelsPsd.value,
            stateStr: this.state.value,
            pageDetail: this.pager.pageIndex,
          }
        }
        this.init({
          initValue: initValue,
          url: '/stock/stockout/getManager',
          data: params,
          all: (data) => {
            // 不管是不是初始化都需要执行的代码
           this.content=data.content
          },
          init: (data) => {
            // 初始化时需要执行的代码
            // 这边初始化筛选信息
            this.applicableModelsPsd.list = data.applicableModels.list
            this.applicableModelsPsd.value = data.applicableModels.value
            this.listCategory.list=data.categoryPsd.list
            this.listCategory.value=data.categoryPsd.value
            this.templeList = data.templePsd.list
          }
        })
      },
      printFund(item,state){

        let tipValue = ''
        if(state=='1'){
          tipValue = '是否提交申请?'
        }else{
          tipValue = '是否入库?'
        }
        let params = {
          id:item.id,
          state:'2',
        }
        this.$dialog.confirm({
          width: 300,
          tipValue: tipValue,
          alertImg: 'warn',
          okCallBack: (data)=>{
            this.ajaxJson({
              url: '/stock/stockout/updateToStockout',
              data: params,
              call: (data) => {
                if (data.type === 0) {
                  this.$dialog.setReturnValue(this.id)
                  this.$dialog.alert({
                    alertImg: 'ok',
                    tipValue: data.message,
                    closeCallBack: () => {
                      // this.$dialog.close()
                      this.initPageData(false)
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
      },

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
