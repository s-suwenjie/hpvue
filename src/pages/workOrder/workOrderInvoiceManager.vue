<template>
    <div>
      <yhm-managerpage opera-lft-top="60px">
        <!--导航条-->
        <template #navigation>售后业务&gt;&nbsp;工单&nbsp;&gt;&nbsp;工单开票</template>
        <!--操作区-->
        <template #operate>
<!--          <yhm-commonbutton value="工单打印"  icon="btnAdd" :flicker="true" @call="shuibian" category="one"></yhm-commonbutton>-->
          <yhm-commonbutton value="选中开票" v-show="selectValue.length>0" icon=" " :flicker="true" @call="makeOutAnInvoice"></yhm-commonbutton>
<!--          <yhm-commonbutton value="跳转"  icon="btnAdd" :flicker="true" @call="skip" category="one"></yhm-commonbutton>-->
          <yhm-commonbutton :value="choose?'收起筛选':'展开筛选'" :icon="choose?'btnUp':'btnDown'" @call="switchChoose()"></yhm-commonbutton>
          <yhm-managersearch :value="searchStr" :history="shortcutSearchContent" id="searchStr" @call="initData"></yhm-managersearch>
          <yhm-radiofilter  @initData="initChoose('category')" title="维修类型" :content="categoryPsd"></yhm-radiofilter>
          <yhm-radiofilter style="margin-top: 6px" @initData="initChoose('applicableModels')" title="品牌" :content="applicableModelsPsd"></yhm-radiofilter>
          <yhm-radiofilter  @initData="initChoose('sub')" title="保险公司" :content="subPsd"></yhm-radiofilter>
          <yhm-radiofilter style="margin-top: 6px" @initData="initChoose('dateType')" title="时间" :content="dateTypeList"></yhm-radiofilter>
        </template>
        <!--筛选区-->
        <template #choose>
          <div v-show="choose" class="buttonBody mptZero">
            <yhm-radiofilter  height="auto" @initData="initChoose('state')" title="状态" :content="statePsd"></yhm-radiofilter>
          </div>
        </template>
        <template #operateMore>
          <div :class="{customTimeShow:timeShow,customTimeHide:!timeShow}" >
            <yhm-form-date v-show="dateShow" title="开始时间" @call="dateSelection(startDateStr,endDateStr)" style="width: 350px;" :value="startDateStr" id="startDateStr" position="t"></yhm-form-date>
            <yhm-form-date v-show="dateShow" title="结束时间" @call="dateSelection(startDateStr,endDateStr)" style="width: 350px;margin-left: 30px;" :value="endDateStr" id="endDateStr" position="t"></yhm-form-date>
          </div>
        </template>
        <template #video>
          <yhm-td-checkbox-show width="180px" height="550px" value="----- 自定义查看列表 -----" :options-list="optionsList" :select-list="columnShow"></yhm-td-checkbox-show>
        </template>

        <!--数据表头-->
        <template #listHead>
          <yhm-managerth :show="columnShow[0]" style="width: 38px" title="选择"></yhm-managerth>
          <yhm-managerth :show="columnShow[1]" style="width: 38px" title="查看"></yhm-managerth>
          <yhm-managerth :show="columnShow[2]" width="110" title="接待日期" value="workDate"></yhm-managerth>
          <yhm-managerth :show="columnShow[3]" width="74" title="接待人"></yhm-managerth>
          <yhm-managerth :show="columnShow[4]" width="150" title="OA项目号"></yhm-managerth>

          <yhm-managerth :show="columnShow[5]" width="150" title="传奇及DMS工单号"></yhm-managerth>

          <yhm-managerth :show="columnShow[6]" width="70" title="维修类型"></yhm-managerth>
          <yhm-managerth :show="columnShow[7]" width="80" title="车牌号"></yhm-managerth>
          <yhm-managerth :show="columnShow[8]" width="90" title="品牌"></yhm-managerth>
          <yhm-managerth :show="columnShow[9]" width="70" title="车主"></yhm-managerth>
          <yhm-managerth :show="columnShow[10]" width="70" title="送修人"></yhm-managerth>
          <yhm-managerth :show="columnShow[11]" width="70" title="保险公司"></yhm-managerth>
          <yhm-managerth :show="columnShow[12]" width="100" title="合计金额" subtitle="(未收金额+已收金额)"></yhm-managerth>

          <yhm-managerth :show="columnShow[13]" width="100" title="未收金额"></yhm-managerth>

          <yhm-managerth :show="columnShow[14]" width="100" title="已收金额"></yhm-managerth>

          <yhm-managerth :show="columnShow[15]" width="100" title="未开金额"></yhm-managerth>

          <yhm-managerth :show="columnShow[16]" width="100" title="已开金额"></yhm-managerth>

          <yhm-managerth :show="columnShow[17]" width="130" title="状态"></yhm-managerth>
          <yhm-managerth :show="columnShow[18]" width="70" title="工作人员"></yhm-managerth>
          <yhm-managerth :show="columnShow[19]" width="180" title="操作"></yhm-managerth>
        </template>

        <!--数据明细-->
        <template #listBody>
          <tr :class="[{InterlacBg:index%2!=0}]" v-for="(item,index) in content" :key="index">
            <yhm-manager-td-checkbox :show="columnShow[0]" @call="checkboxChange" :value="item"></yhm-manager-td-checkbox>
            <yhm-manager-td-look   :show="columnShow[1]" @click="listView(item)"></yhm-manager-td-look>

            <yhm-manager-td-date title="右键可筛选" :show="columnShow[2]" :value="item.workDate" v-if="item.workDate!=null" :menu-list="workDateMenu.indexOf('取消当前筛选')!='-1'?['取消当前筛选']:['筛选当前日期']" @rightClick="workOrderItem = item" @menuClick="workDateMenuClick"></yhm-manager-td-date>
<!--            <yhm-manager-td-date   :show="columnShow[2]" :value="item.workDate"></yhm-manager-td-date>-->

            <yhm-manager-td-center :show="columnShow[3]" :value="item.client" @click="lookOverPrincipal(item)"></yhm-manager-td-center>
            <yhm-manager-td :show="columnShow[4]" @click="listView(item)" :value="item.code"></yhm-manager-td>
            <yhm-manager-td-center :show="columnShow[5]" :value="item.otherCode"></yhm-manager-td-center>
            <yhm-manager-td-psd    :show="columnShow[6]" :value="item.category" :list="categoryList"></yhm-manager-td-psd>
            <yhm-manager-td type="vehicle" :show="columnShow[7]" :value="item.vehicle" @click="lookOverVehicle(item)"></yhm-manager-td>

            <yhm-manager-td-center :show="columnShow[8]" v-if="item.applicableModels==''" value="-----"></yhm-manager-td-center>
            <yhm-manager-td-psd    :show="columnShow[8]" v-else :value="item.applicableModels" :list="applicableModelsList" @click="lookOverVehicle(item)"></yhm-manager-td-psd>

            <yhm-manager-td :show="columnShow[9]" :tip="true"  :value="item.carOwner" @click="lookOverCarOwner(item)"></yhm-manager-td>

            <yhm-manager-td :show="columnShow[10]" :tip="true" :value="item.contactPerson" @click="lookOverPerson(item)"></yhm-manager-td>

            <yhm-manager-td-center :show="columnShow[11]" v-if="item.subid==''||item.subid==null" value="------" @click="lookOverSub(item)" color="#9a8478"></yhm-manager-td-center>
            <yhm-manager-td-psd  :show="columnShow[11]" v-else :value="item.subid" :list="subList" @click="lookOverSub(item)"></yhm-manager-td-psd>

            <yhm-manager-td-money  :show="columnShow[12]" @click="listView(item)" style="color:#49a9ea" :value="item.expend==''?'0':item.expend"></yhm-manager-td-money>

            <yhm-manager-td-money  :show="columnShow[13]" style="color:#f00" :value="item.remreceivedMoney"></yhm-manager-td-money>

            <yhm-manager-td-money  :show="columnShow[14]" style="color:#00b300" :value="item.receivedMoney"></yhm-manager-td-money>

            <yhm-manager-td-money  :show="columnShow[15]" @click="makeOutAnInvoice(item)" style="color:#fd6802" :value="item.remamountOpened"></yhm-manager-td-money>

            <yhm-manager-td-money  :show="columnShow[16]" @click="viewOpenInvoice(item)" style="color:#2193b0" :value="item.amountOpened"></yhm-manager-td-money>


            <yhm-manager-td-psd   @click="stateClick(item)"  :show="columnShow[17]" :value="item.state" :list="stateList"></yhm-manager-td-psd>
            <yhm-manager-td-center :show="columnShow[18]" v-if="item.fixTeam==null" value="-----"></yhm-manager-td-center>
            <yhm-manager-td-center :show="columnShow[18]" v-else :value="item.fixTeam.userName"></yhm-manager-td-center>

            <yhm-manager-td-operate :show="columnShow[19]" >
<!--              <yhm-manager-td-operate-button @click="stateClick(item)" icon="i-btn-applicationSm" value="派工" v-show="item.state=='0'" color="#4bb414"></yhm-manager-td-operate-button>-->
<!--              <yhm-manager-td-operate-button @click="operation(item)" icon="i-btn-applicationSm" value="操作" :no-click="item.state=='5'||item.state=='24'?true:false" color="#8e08e3"></yhm-manager-td-operate-button>-->
<!--              <yhm-manager-td-operate-button @click="allocation(item)" icon="i-btn-applicationSm" value="分配" :no-click="item.state=='5'?true:false" color="#49a9ea"></yhm-manager-td-operate-button>-->

              <yhm-manager-td-operate-button @click="makeOutAnInvoice(item)" v-show="Number(item.remamountOpened)!='0'" icon="i-btn-applicationSm" value="开票管理" color="#8e08e3"></yhm-manager-td-operate-button>
              <yhm-manager-td-operate-button @click="viewOpenInvoice(item)" v-show="Number(item.amountOpened)>0" icon="i-btn-applicationSm" value="查看发票" color="#49a9ea"></yhm-manager-td-operate-button>

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
  import { guid } from '@/assets/common.js'
  export default {
    name: 'workOrderInvoiceManager',
    mixins: [managermixin],
    data(){
      return{
        value:'',
        ownerID:guid(),
        list:[],
        fileList:[],
        stateList:[],//状态
        statePsd:[],//筛选 状态
        categoryList:[],//维修类型
        categoryPsd:[],//筛选 维修类型
        applicableModelsList:[],//品牌
        applicableModelsPsd:[],//筛选 品牌
        subList:[],//保险公司
        subPsd:{},//筛选 保险公司
        optionsList:['选择','查看','接待日期','接待人','OA项目号','传奇及DMS工单号','维修类型','车牌号','品牌','车主','联系人','保险公司','合计金额','未收金额','已收金额','未开金额','已开金额','状态','工作人员','操作'],
        columnShow:[true,true,true,false,true,false,true,true,true,true,true,false,true,true,true,true,true,false,false,true],
        workDateMenu:[],//接待日期筛选时间
        workOrderItem:{},//右键选中的数据
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
        dateType:'',
      }
    },
    methods:{
      skip(){
        this.$dialog.OpenWindow({
          width: '1070',
          height: '800',
          url:'/selectOfficialWorkOrder',
          title:'工单选择页面',
          closeCallBack:(dt) =>{
            if(dt){
              console.log(dt)
            }
          }
        })
      },
      dateSelection(start,finish){//选择时间段
        if(start!=''&&finish!=''){
          this.initPageData(false)
        }
      },
      workDateMenuClick(title){
        if(title=='筛选当前日期'){
          this.startDateStr = this.workOrderItem.workDate
          this.endDateStr = this.workOrderItem.workDate
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
      viewOpenInvoice(item){
        if(Number(item.amountOpened)!=0){
          this.$dialog.OpenWindow({
            width: '750',
            height: '390',
            title: '查看开票申请信息',
            url: '/claimsOpenInvoice?ownerID=' + item.id,
            closeCallBack: (data) => {
              // if(data){
              this.initPageData(false)
              // }
            }
          })
        }
      },
      checkboxChange(selectValue,item){
        let that = this
        let id = []
        let index
        this.list = []
        // if(item.paymentid!=null&&item.paymentid!=''){
        console.log(that.selectValue)
        for(let q=0; q<this.selectValue.length; q++){
          if(Number(item.remamountOpened)<=0){
            if(that.selectValue[q]==item.id){
              console.log(this.selectValue[q],item.id,'对比id')
              that.selectValue.splice(q,1)
            }
          }
        }
        if(Number(item.remamountOpened)<=0){
          this.$dialog.alert({
            tipValue: '当前数据未开金额为0',
            alertImg: 'warn',
            width: '350',
            closeCallBack () {
              // that.selectValue.splice(i,1)
            }
          })
        }
        for(let i=0; i<this.selectValue.length; i++){
          console.log(this.selectValue)
          console.log(item.id)
          id.push(that.selectValue[i])
        }
        // for(let j in this.content){
        //   if(id.indexOf(this.content[j].id)!=-1){
        //     this.list.push(this.content[j])
        //   }
        // }
        for(let j=0; j<this.selectValue.length; j++){
          if(id.indexOf(this.selectValue[j])!=-1){
            var js = id[id.indexOf(this.selectValue[j])]
            this.list.push(this.selectValue[js])
            console.log(this.list,'js')
          }
        }
        // }else{
        //   this.$dialog.alert({
        //     tipValue: '当前数据未维护付款方',
        //     alertImg: 'warn',
        //     width: '350',
        //     closeCallBack () {
        //       for(let k in selectValue){
        //         if(selectValue[k]==item.id){
        //           selectValue.splice(k,1)
        //         }
        //       }
        //     }
        //   })
        // }
        // console.log(this.list)
      },
      makeOutAnInvoice(item){
        if(item){
          this.list = []
          this.list.push(item)
        }
        // this.ajaxJson({
        //   url: '/fix/fixOrder/getTotalMoney',
        //   data: {
        //     principal:this.list
        //   },
        //   call: (data) => {
        //     if(data){
        sessionStorage.offlineWorlOrderTicketFormList = JSON.stringify(this.list)//选中的工单数据
          // sessionStorage.offlineWorlOrderTicketForm = JSON.stringify(data)//返回的收支明细和工单
          this.$dialog.OpenWindow({
            width: '1070',
            height: '800',
            url:'/offlineWorlOrderTicketForm',
            title:'开票',
            closeCallBack:(dt) =>{
              // if(dt){
              this.initPageData(false)
              // }
            }
        })

        //     }
        //   }
        // })
      },
      // preOpening(item){
      //
      // },
      // shuibian(){
      //   if(this.selectValue.length==1 ) {
      //     this.ajaxJson({
      //       url: '/fix/fixOrder/print',
      //       data:{
      //         id:this.selectValue[0]
      //       },
      //       call: (data) => {
      //         window.open('/UploadFile/' + data.message)
      //       }
      //     })
      //   }else if(this.selectValue.length==0){
      //     this.$dialog.alert({
      //       tipValue:'必须选择一条数据',
      //       alertImg:'warn',
      //       width:'330',
      //       closeCallBack: () => {
      //
      //       }
      //     })
      //   }else{
      //     this.$dialog.alert({
      //       tipValue:'只能选择一条数据',
      //       alertImg:'warn',
      //       width:'330',
      //       closeCallBack: () => {
      //         this.selectValue = []
      //       }
      //     })
      //   }
      // },
      allocation(item){
        this.$dialog.OpenWindow({
          width: '1050',
          height: '750',
          url:  '/workOrderAllocationForm?orderid='+item.id+'&worktype='+item.worktype,
          title: '自动分配工作设置',
          closeCallBack:(data) =>{
            this.initPageData(false)
          }
        })
      },
      uploadFile(){
        this.ajaxJson({
          url: '/fix/Offer/Excelsave',
          data:{
            commonUploadFile:this.fileList
          },
          method: 'post',
          call: (data) => {
          }
        })
      },
      skipUploadFile(){
        this.$dialog.OpenWindow({
          width: '1050',
          height: '500',
          url:  '/workOrderUploadFile',
          title: '导入离线数据',
          closeCallBack:(data) =>{
            this.initPageData(false)
          }
        })
      },
      addWordOrder(){
        this.$dialog.OpenWindow({
          width: '1050',
          height: '800',
          url:  '/workOrderForm',
          title: '添加工单',
          closeCallBack:(data) =>{
            this.initPageData(false)
          }
        })
      },
      transferworkOrder(){//转为工单
        this.$dialog.confirm({
          tipValue: '是否创建工单？',
          btnValueOk:'是',
          btnValueCancel:'否',
          flickerIndex:'1',
          okCallBack: (data) => {
          }
        })
      },
      lookOverCarOwner(item){//查看车主
        if(item.carOwnerID!=''&&item.unitType=='1'){
          this.$dialog.OpenWindow({
            width: '1070',
            height: '750',
            url:'/personView?id='+item.carOwnerID,
            title:'查看车主信息',
            closeCallBack:(data) =>{
              this.initPageData(false)
            }
          })
        }else{
          this.$dialog.OpenWindow({
            width: '1070',
            height: '750',
            url:'/unitView?id='+item.carOwnerID,
            title:'查看车主信息',
            closeCallBack:(data) =>{
              this.initPageData(false)
            }
          })
        }
      },
      lookOverSub(item) {//查看保险公司
        if(item.subid!=''){
          let id = ''
          for(let i in this.subList){
            if(this.subList[i].id==item.subid){
              id = this.subList[i].insuranceid
            }
          }
          this.$dialog.OpenWindow({
            width: '1070',
            height: '750',
            url:'/unitView?id='+id,
            title:'查看保险公司信息',
            closeCallBack:(data) =>{
              this.initPageData(false)
            }
          })
        }
      },
      lookOverPrincipal(item){//查看接待人信息
        if(item.clientID!=''){
          this.$dialog.OpenWindow({
            width: '1070',
            height: '750',
            url:'/personView?id='+item.clientID,
            title:'查看接待人信息',
            closeCallBack:(data) =>{
              this.initPageData(false)
            }
          })
        }
      },
      lookOverPerson(item){//查看联系人信息
        if(item.contactPersonID!=''){
          this.$dialog.OpenWindow({
            width: '1070',
            height: '750',
            url:'/personView?id='+item.contactPersonID,
            title:'查看联系人信息',
            closeCallBack:(data) =>{
              this.initPageData(false)
            }
          })
        }
      },
      lookOverVehicle(item){//查看车辆信息
        if(item.vehicleID!=''){
          this.$dialog.OpenWindow({
            width: '1070',
            height: '750',
            url:'/vehicleView?id='+item.vehicleID,
            title:'查看车辆信息',
            closeCallBack:(data) =>{
              this.initPageData(false)
            }
          })
        }
      },
      listView(item){
        this.$dialog.OpenWindow({
          width: '1050',
          height: '700',
          url: '/workOrderView?id='+item.id,
          title: '查看工单信息',
          closeCallBack:(data) =>{
            if (data) {
              this.initPageData(false)
            }
          }
        })
      },
      stateClick(item){
        if(item.state!='5'&&item.state!='24'){
          this.$dialog.OpenWindow({
            width: '1150',
            height: '750',
            url:'/workOrderFlowChartForm?initiative=0&ownerID='+item.id+'&proState='+item.proState+'&aid='+item.applicableModels,
            title:'主流程管理',
            closeCallBack:(data) =>{
              if (data) {
                this.initPageData(false)
              }
            }
          })
        }
      },
      operation(item){
        this.$dialog.OpenWindow({
          width: '1150',
          height: '750',
          url:'/workOrderFlowChartForm?ownerID='+item.id+'&proState='+item.proState+'&aid='+item.applicableModels,
          title:'流程管理',
          closeCallBack:(data) =>{
            if (data) {
              this.initPageData(false)
            }
          }
        })
      },
      add(){
        this.$dialog.OpenWindow({
          width: '1050',
          height: '750',
          url:'/receptionForm',
          title:'添加接待单',
          closeCallBack:(data) =>{
            if (data) {
              this.initPageData(false)
            }
          }
        })
      },
      //搜索
      initPageData (initValue) {
        let params = {}
        if (initValue) {
          params = {
            // startDate:'',
            // endDate:'',
            // accountID:'',
            stateStr:'0'
          }
        } else {
          params = {
            startDateStr:this.startDateStr,//开始时间
            endDateStr:this.endDateStr,//结束时间
            dateType:this.dateTypeList.value=='9'?'':this.dateTypeList.value,
            subid:this.subPsd.value,
            state:this.statePsd.value,
            stateStr:this.statePsd.value!=''?'':'0',//传任意值去除待确认的工单
            category:this.categoryPsd.value,
            applicableModels:this.applicableModelsPsd.value
          }
        }
        this.init({
          initValue:initValue,
          url: '/fix/fixOrder/getManager',
          data:params,
          all:(data) =>{
            //不管是不是初始化都需要执行的代码

          },
          init:(data)=>{
            let mapList = data.mapList.concat()
            this.subPsd = {
              list:mapList,
              value:''
            }
            this.subList = mapList
            this.categoryList = data.categoryPsd.list
            this.categoryPsd = data.categoryPsd
            this.stateList = data.statePsd.list
            this.statePsd = data.statePsd
            this.applicableModelsList = data.applicableModelsPsd.list
            this.applicableModelsPsd = data.applicableModelsPsd

            //初始化时需要执行的代码
            // 这边初始化筛选信息

          }
        })

      }
    }
  }
</script>

<style lang="less" scoped>
  .operationBtn :hover .operationIcon{
    color:#f00;
  }
  .operationIcon:after{
    color: #49a9ea;
  }

</style>
