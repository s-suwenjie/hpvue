<template>
  <div>
    <yhm-managerpage opera-lft-top="60px">
      <!--导航条-->
      <template #navigation>售后业务&gt;&nbsp;库存管理&nbsp;&gt;&nbsp;<span @click="deleteReception()">旧件回收</span></template>
      <!--操作区-->
      <template #operate>

        <!--<yhm-commonbutton value="添加" icon="btnAdd" :flicker="true" @call="add()"></yhm-commonbutton>-->
        <!--        <yhm-commonbutton value="添加工单入口" icon="btnAdd" :flicker="true" @call="addWordOrder()"></yhm-commonbutton>-->
        <yhm-managersearch :value="searchStr" :history="shortcutSearchContent" id="searchStr" @call="initData"></yhm-managersearch>
        <yhm-radiofilter  @initData="initChoose('state')" title="客户意向" :content="statePsd"></yhm-radiofilter>
        <yhm-radiofilter  @initData="initChoose('applicableModels')" title="品牌" :content="applicableModelsPsd"></yhm-radiofilter>
        <yhm-radiofilter  @initData="initChoose('recycle')"  title="入库状态" all="0" :content="recyclePsd"></yhm-radiofilter>
        <yhm-radiofilter style="margin-top: 6px;" @initData="initChoose('dateType')" title="时间" :content="dateTypeList"></yhm-radiofilter>
        <yhm-radiofilter  @initData="initChoose('worktype')" title="工单类型" :content="worktypePsd"></yhm-radiofilter>
        <yhm-radiofilter  @initData="initChoose('category')" title="业务来源" :content="categoryPsd"></yhm-radiofilter>

        <!--        <yhm-commonbutton v-show="selectValue.length=='1'" value="删除" icon=" " @call="deleteReception()"></yhm-commonbutton>-->

      </template>

      <template #operateMore>
        <div :class="{customTimeShow:timeShow,customTimeHide:!timeShow}" >
          <yhm-form-date v-show="dateShow" title="开始时间" @call="dateSelection(startDateStr,endDateStr)" style="width: 350px;" :value="startDateStr" id="startDateStr" position="t"></yhm-form-date>
          <yhm-form-date v-show="dateShow" title="结束时间" @call="dateSelection(startDateStr,endDateStr)" style="width: 350px;margin-left: 30px;" :value="endDateStr" id="endDateStr" position="t"></yhm-form-date>
        </div>
      </template>

      <!--数据表头-->
      <template #listHead>
        <yhm-managerth  width="34" title="选择"></yhm-managerth>
        <yhm-managerth  width="34" title="查看"></yhm-managerth>
        <yhm-managerth  width="85" title="接待日期" value="visitDate"></yhm-managerth>
        <yhm-managerth  width="55" title="接待人"></yhm-managerth>
        <yhm-managerth  width="91" title="车牌号"></yhm-managerth>
        <yhm-managerth  width="85" title="品牌"></yhm-managerth>
        <yhm-managerth  width="65" title="送修人"></yhm-managerth>
        <yhm-managerth  width="85" title="送修人电话"></yhm-managerth>
        <yhm-managerth  width="80" title="车主"></yhm-managerth>
        <yhm-managerth  width="170" title="OA项目号"></yhm-managerth>
        <yhm-managerth  width="140" title="传奇及DMS工单号"></yhm-managerth>
        <yhm-managerth  width="70" title="维修类型"></yhm-managerth>
        <yhm-managerth  width="66" title="保险公司"></yhm-managerth>
        <yhm-managerth  width="65" title="客户意向"></yhm-managerth>
        <yhm-managerth  width="130" title="工单状态"></yhm-managerth>
        <yhm-managerth  width="65" title="工单类型"></yhm-managerth>
        <yhm-managerth  width="70" title="业务来源"></yhm-managerth>
        <yhm-managerth  title="操作"></yhm-managerth>
      </template>
      <!--数据明细-->
      <template #listBody>
        <tr :class="[{twinkleBg: item.id==lastData},{InterlacBg:index%2!=0}]" v-for="(item,index) in content" :key="index">
          <yhm-manager-td-checkbox  @call="checkboxChange(item)" :value="item"></yhm-manager-td-checkbox>
          <yhm-manager-td-look    @click="listView(item)"></yhm-manager-td-look>
          <yhm-manager-td-center title="右键可筛选"  :value="item.visitDate" v-if="item.visitDate!=null" :menu-list="visitDateMenu.indexOf('取消当前筛选')!='-1'?['取消当前筛选']:['筛选当前日期']" @rightClick="workOrderItem = item" @menuClick="visitDateMenuClick"></yhm-manager-td-center>

          <yhm-manager-td :tip="true"  :value="item.personName"></yhm-manager-td>
          <yhm-manager-td type="vehicle"  :value="item.carName"></yhm-manager-td>

          <yhm-manager-td-center  v-if="item.applicableModels==''" value="-----"></yhm-manager-td-center>
          <yhm-manager-td-psd   v-else :value="item.applicableModels" :list="applicableModelsList"></yhm-manager-td-psd>

          <yhm-manager-td :tip="true" :value="item.contactPerson" v-if="item.contactPerson!=''" @click="lookOverPerson(item)"></yhm-manager-td>
          <yhm-manager-td-center  value="-----" v-else ></yhm-manager-td-center>

          <yhm-manager-td-center :value="item.contactPersonPhone"></yhm-manager-td-center>

          <yhm-manager-td :tip="true" :value="item.carOwner" v-if="item.carOwner!=''" @click="lookOverCarOwner(item)"></yhm-manager-td>
          <yhm-manager-td-center  value="-----" v-else ></yhm-manager-td-center>

          <yhm-manager-td  @click="lookOver(item)" :value="item.fixorder.code"></yhm-manager-td>
          <yhm-manager-td-center @click="lookOver(item)" :value="item.otherNode"></yhm-manager-td-center>

          <yhm-manager-td-center  v-if="item.fixorder.category==''||item.fixorder.category==null" value="-----"></yhm-manager-td-center>
          <yhm-manager-td-psd     v-else :value="item.fixorder.category" :list="categoryList"></yhm-manager-td-psd>

          <yhm-manager-td-center  value="-----" v-if="item.fixorder.subid==''||item.fixorder.subid==null" ></yhm-manager-td-center>
          <yhm-manager-td-psd     v-else :value="item.fixorder.subid" :list="subList"></yhm-manager-td-psd>

          <yhm-manager-td-center  :value="stateList[item.state].showName" ></yhm-manager-td-center>

          <yhm-manager-td-center  v-if="item.fixorder.state==null||item.fixorder.state==''" value="-----"></yhm-manager-td-center>
          <yhm-manager-td-psd   v-else :value="item.fixorder.state" :list="fixorderStateList"></yhm-manager-td-psd>

          <yhm-manager-td-center  v-if="item.fixorder.worktype==null||item.fixorder.worktype==''" value="-----"></yhm-manager-td-center>
          <yhm-manager-td-psd   v-else :value="item.fixorder.worktype" :list="worktypePsd.list"></yhm-manager-td-psd>

          <yhm-manager-td-psd  :value="item.worksource" :list="workSourcePsd.list"></yhm-manager-td-psd>

          <yhm-manager-td-operate >
            <yhm-manager-td-operate-button v-if="recyclePsd.value==123" @click="recoveryClick(item)" icon="i-btn-applicationSm" value="旧件入库" color="#329EE7"></yhm-manager-td-operate-button>
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
    name: 'stockInventoryManager',
    mixins: [managermixin],
    data(){
      return{
        visitDateMenu:[],//接待日期筛选时间
        workOrderItem:{},//右键选中的数据
        dateType:'',
        startDateStr:'',//开始时间
        endDateStr:'',//结束时间
        timeShow:false,//自定义时间选择 显示隐藏
        worktypePsd:{},//工单类型
        orderstatePsd:{},//工单状态
        categoryPsd:{},//维修类型
        workSourcePsd:{},//业务来源
        workSource:{},//业务来源
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
        stateList:[
          {
            num:'0',
            img:'',
            code:'',
            showName:'有意'
          },
          {
            num:'1',
            img:'',
            code:'',
            showName:'无意'
          },
        ],
        fixorderStateList:[],//工单状态
        subList:[],//保险公司
        categoryList:[],
        statePsd:{
          list:[
            {
              num:'0',
              img:'',
              code:'',
              showName:'有意'
            },
            {
              num:'1',
              img:'',
              code:'',
              showName:'无意'
            },
          ],
          value:''
        },//状态筛选
        recycle:'',
        recyclePsd:{
          list:[
            {
              num:'3',
              img:'',
              code:'#01DF01',
              showName:'已完成'
            },
            {
              num:'123',
              img:'',
              code:'#B40431',
              showName:'未完成'
            },
          ],
          value:'123'
        },
        applicableModelsList:[],//品牌
        applicableModelsPsd:{},//筛选 品牌

        checkboxID:'',//选中数据的id
      }
    },
    methods:{
      recoveryClick(item){
        this.$dialog.OpenWindow({
          width: '1070',
          height: '750',
          url:'/coreRecyclingFrom?otherID='+item.fixorder.id+'&modelID='+item.modelID,
          title:'添加旧件回收',
          closeCallBack:(data) =>{

          }
        })
      },
      checkboxChange(item){
        this.selectValue = []
        this.checkboxID = item.fixorder.id
        this.selectValue.push(item.id)
      },


      visitDateMenuClick(title,index){
        if(title=='筛选当前日期'){
          this.startDateStr = this.workOrderItem.visitDate
          this.endDateStr = this.workOrderItem.visitDate
          this.dateTypeList.value = '9'
          this.visitDateMenu = ['取消当前筛选']
          this.initChoose('dateType')
        }else if(title=='取消当前筛选'){
          this.startDateStr = ''
          this.endDateStr = ''
          this.dateTypeList.value = ''
          this.visitDateMenu = ['筛选当前日期']
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
            this.visitDateMenu = ['筛选当前日期']
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
          // this.dateTypeList.value=''
          this.initPageData(false)
        }
      },
      gathering(item){
        this.ajaxJson({
          url:'/fix/fixOrder/sendWXmessage',
          data:{id:item.id},
          call: (data) => {
            if (data.type === 0) {
              this.$dialog.alert({
                tipValue: data.message,
                closeCallBack: () => {
                  // this.initPageData(false)
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
      },
      // lookOverContactPerson
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
          this.$dialog.OpenWindow({
            width: '1070',
            height: '750',
            url:'/unitView?id='+item.subid,
            title:'查看保险公司信息',
            closeCallBack:(data) =>{
              if (data) {
              }
            }
          })
        }
      },
      lookOverPrincipal(item){//查看负责人信息
        if(item.principalID!=''){
          this.$dialog.OpenWindow({
            width: '1070',
            height: '750',
            url:'/personView?id='+item.principalID,
            title:'查看联系人信息',
            closeCallBack:(data) =>{
              if (data) {
              }
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
            title:'查看送修人信息',
            closeCallBack:(data) =>{
              if (data) {
              }
            }
          })
        }
      },
      lookOverVehicle(item){//查看车辆信息
        this.$dialog.OpenWindow({
          width: '1070',
          height: '750',
          url:'/vehicleView?id='+item.vehicleID,
          title:'查看车辆信息',
          closeCallBack:(data) =>{
            if (data) {
            }
          }
        })
      },
      listView(item){
        let url = ''
        let title = ''
        if(item.fixorder.id!=''&&item.fixorder.id!=null){
          url = '/collectionOfDataView?id='+item.id
          title = '查看接待单信息'
        }else{
          url = '/receptionForm?listViewType=1&id='+item.id
          title = '编辑接待单信息'
        }
        this.$dialog.OpenWindow({
          width: '1050',
          height: '750',
          url: url,
          title: title,
          closeCallBack:(data) =>{
            // if (data) {
            this.initPageData(false)
            // }
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
            recycle:this.recyclePsd.value
          }
        } else {
          params = {
            startDateStr:this.startDateStr,//开始时间
            endDateStr:this.endDateStr,//结束时间
            state:this.statePsd.value,
            category:this.categoryPsd.value,//维修类型
            worktype:this.worktypePsd.value,//工单类型
            workSource:this.workSourcePsd.value,//业务来源
            orderstate:this.orderstatePsd.value,//工单状态
            dateType:this.dateTypeList.value=='9'?'':this.dateTypeList.value,
            applicableModels:this.applicableModelsPsd.value,
            recycle:this.recyclePsd.value
          }
        }
        this.init({
          initValue:initValue,
          url: '/fix/fixreception/oldPatsgetManager',
          data:params,
          all:(data) =>{
            //不管是不是初始化都需要执行的代码



          },
          init:(data)=>{
            //初始化时需要执行的代码
            // 这边初始化筛选信息
            this.categoryList = data.categoryPsd.list
            this.categoryPsd = data.categoryPsd
            this.workSourcePsd = data.workSourcePsd
            this.applicableModelsPsd = data.applicableModelsPsd
            this.applicableModelsList = data.applicableModelsPsd.list
            this.fixorderStateList = data.statePsd.list
            this.worktypePsd = data.worktypePsd
            this.subList = data.mapList
            this.orderstatePsd = data.statePsd
          }
        })

      }
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
