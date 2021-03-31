<template>
    <div class="f_main">
      <yhm-view-body>
        <template #title>接待单信息</template>
        <template #body>
          <yhm-view-control title="接待人" :content="personName"></yhm-view-control>
          <yhm-view-control title="车辆" :content="carName"></yhm-view-control>
          <yhm-view-control title="车主" :content="carOwner"></yhm-view-control>
          <yhm-view-control title="联系人" :content="contactPerson"></yhm-view-control>
          <yhm-view-control title="联系人电话" :content="contactPersonPhone"></yhm-view-control>
          <yhm-view-control title="接待日期" :content="visitDate" type="date"></yhm-view-control>
          <yhm-view-control title="传奇及DMS工单号" :content="otherNode"></yhm-view-control>
          <yhm-view-control title="工单来源" :content="business" :psd="businessList"></yhm-view-control>
          <yhm-view-control title="状态" :content="state" :psd="stateList"></yhm-view-control>
          <yhm-view-control title="业务来源" :content="worksource" :psd="worksourceList"></yhm-view-control>
          <yhm-view-control title="适用车型" :content="applicableModels" :psd="applicableModelsList"></yhm-view-control>
          <yhm-view-control title="里程数" :content="milage"></yhm-view-control>
          <yhm-view-control title="邮箱" :content="emailaddress"></yhm-view-control>
          <yhm-view-control title="地址" :content="address" category="2"></yhm-view-control>
        </template>
      </yhm-view-body>
      <div class="f_split" v-show="companyName!=''||companyName!=null?true:false"></div>
      <yhm-view-body v-show="companyName!=''||companyName!=null?true:false">
        <template #title>推修信息</template>
        <template #body>
          <yhm-view-control title="推修公司" :content="companyName"></yhm-view-control>
<!--          <yhm-view-control title="推修联系人" :content="pushPersonName"></yhm-view-control>-->
          <yhm-view-control title="自保费率" :content="selfrate+' %'"></yhm-view-control>
          <yhm-view-control title="非自保费率" :content="noselfrate+' %'" ></yhm-view-control>
          <yhm-view-control title="结算类型" :content="companyType" :psd="typeList"></yhm-view-control>
        </template>
      </yhm-view-body>
      <div class="f_split"></div>
      <yhm-view-body>
        <template #title>工单信息</template>
        <template #body>
<!--          <yhm-view-control title="工单创建日期" :content="workDate"></yhm-view-control>-->
          <yhm-view-control title="预计交车日期" :content="endDate" type="date"></yhm-view-control>
          <yhm-view-control title="OA项目号" :content="code"></yhm-view-control>
          <yhm-view-control title="维修类型" :content="category" :psd="categoryList"></yhm-view-control>
          <yhm-view-control title="保险公司" v-show="category=='0'" :content="subName"></yhm-view-control>
          <yhm-view-control title="备注" :content="remark" category="2"></yhm-view-control>
          <yhm-view-control title="文件" :content="photoList" type="files" category="3"></yhm-view-control>
        </template>
      </yhm-view-body>
      <div class="f_split"></div>
      <yhm-view-tab>
        <template #tab>
          <yhm-view-tab-button :list="tabState" :index="0" @click="pager.pageIndex=1,listPage(list,'0')">定损单详情</yhm-view-tab-button>
          <yhm-view-tab-button :list="tabState" :index="1" @click="pager.pageIndex=1,listPage(list2,'1')">工单详情</yhm-view-tab-button>
          <yhm-view-tab-button :list="tabState" :index="2" @click="pager.pageIndex=1,listPage(list3,'2')">维修配件</yhm-view-tab-button>
          <yhm-view-tab-button :list="tabState" :index="3" @click="pager.pageIndex=1,listPage(deliveryRecord,'3')">出库记录</yhm-view-tab-button>
          <yhm-view-tab-button :list="tabState" :index="4" @click="pager.pageIndex=1,listPage(detailList,'4')">收入详情</yhm-view-tab-button>
          <yhm-view-tab-button :list="tabState" v-if="fixOrderUnitConcatList.length>0" :index="5" @click="pager.pageIndex=1,listPage(fixOrderUnitConcatList,'5')">保险公司条约</yhm-view-tab-button>

        </template>
        <template #content>
          <yhm-view-tab-list :customize="true" v-show="tabState[0].select">
            <template #listHead>
              <yhm-managerth title="序号" width="40"></yhm-managerth>
              <yhm-managerth title="项目名称"></yhm-managerth>
              <yhm-managerth title="类型"></yhm-managerth>
              <yhm-managerth style="width: 120px" title="数量"></yhm-managerth>
              <yhm-managerth title="单价"></yhm-managerth>
              <yhm-managerth style="width: 120px;" title="工时费"></yhm-managerth>
            </template>
            <template #listBody>
              <tr v-for="(item,index) in feeList" :key="index" :class="{InterlacBg:index%2!==0}">
                <yhm-manager-td-center :value="item.index"></yhm-manager-td-center>
                <yhm-manager-td  :tip="true" node-class-name="f_main" :value="item.nameStr+''"></yhm-manager-td>
                <yhm-manager-td-center :value="formTypeList[item.category].showName+''"></yhm-manager-td-center>
                <yhm-manager-td-center :value="item.quantity+''"></yhm-manager-td-center>
                <yhm-manager-td-money :value="item.price+''"></yhm-manager-td-money>
                <yhm-manager-td-money :value="item.money+''"></yhm-manager-td-money>
              </tr>
            </template>
            <template #empty>
              <span class="m_listNoData" v-show="list.length=='0'?true:false">暂时没有数据</span>
            </template>
            <template #pager>
              <yhm-pagination :pager="pager" is-page-size="false" @initData="listPage(list,'0')"></yhm-pagination>
            </template>
          </yhm-view-tab-list>
          <yhm-view-tab-list :customize="true" v-show="tabState[1].select">
            <template #listHead>
              <yhm-managerth title="序号" width="40"></yhm-managerth>
              <!--<yhm-managerth style="width: 38px" title="查看"></yhm-managerth>-->
              <yhm-managerth  title="项目名称"></yhm-managerth>
              <yhm-managerth style="width: 120px;" title="创建日期"></yhm-managerth>
              <yhm-managerth style="width: 120px;" title="变化金额"></yhm-managerth>
              <yhm-managerth style="width: 80px;" title="收支方向"></yhm-managerth>
              <yhm-managerth  title="备注"></yhm-managerth>
              <yhm-managerth style="width: 80px" title="状态"></yhm-managerth>
            </template>
            <template #listBody>
              <tr v-for="(item,index) in workOrderList" :key="index" :class="{InterlacBg:index%2!==0}">
                <!--<yhm-manager-td-look @click="listView(item)"></yhm-manager-td-look>-->
                <yhm-manager-td-center :value="item.index"></yhm-manager-td-center>
                <yhm-manager-td :tip="true" node-class-name="f_main" :value="item.name"></yhm-manager-td>
                <yhm-manager-td-date :value="item.workDate"></yhm-manager-td-date>
                <yhm-manager-td-money :value="item.money+''"></yhm-manager-td-money>
                <yhm-manager-td-psd :value="item.direction" :list="directionList"></yhm-manager-td-psd>
                <yhm-manager-td-center :value="item.remark"></yhm-manager-td-center>
                <yhm-manager-td-psd :value="item.state+''" :list="content.statePsd.list"></yhm-manager-td-psd>
              </tr>
            </template>
            <template #empty>
              <span class="m_listNoData" v-show="list2.length=='0'?true:false">暂时没有数据</span>
            </template>
            <template #pager>
              <yhm-pagination :pager="pager" is-page-size="false" @initData="listPage(list2,'1')"></yhm-pagination>
            </template>
          </yhm-view-tab-list>
          <yhm-view-tab-list :customize="true" v-show="tabState[2].select">
            <template #listHead>
              <yhm-managerth title="序号" width="40"></yhm-managerth>
              <yhm-managerth title="商品名称"></yhm-managerth>
              <yhm-managerth title="规格型号"></yhm-managerth>
              <yhm-managerth style="width: 120px" title="拆分数量"></yhm-managerth>
              <yhm-managerth style="width: 120px" title="整件数量"></yhm-managerth>
              <yhm-managerth title="单价"></yhm-managerth>
              <yhm-managerth title="总价"></yhm-managerth>
            </template>
            <template #listBody>
              <tr v-for="(item,index) in repairablePartList" :key="index" :class="{InterlacBg:index%2!==0}">
                <yhm-manager-td-center :value="item.index"></yhm-manager-td-center>
                <yhm-manager-td :tip="true" node-class-name="f_main" :value="item.product"></yhm-manager-td>
                <yhm-manager-td :tip="true" node-class-name="f_main" :value="item.model"></yhm-manager-td>
                <yhm-manager-td-center :value="item.mdo"></yhm-manager-td-center>
                <yhm-manager-td-center :value="item.quantity+''"></yhm-manager-td-center>
                <yhm-manager-td-money :value="item.price"></yhm-manager-td-money>
                <yhm-manager-td-money :value="item.money"></yhm-manager-td-money>
              </tr>
            </template>
            <template #empty>
              <span class="m_listNoData" v-show="list3.length=='0'?true:false">暂时没有数据</span>
            </template>
            <template #pager>
              <yhm-pagination :pager="pager" is-page-size="false" @initData="listPage(list3,'2')"></yhm-pagination>
            </template>
          </yhm-view-tab-list>
          <yhm-view-tab-list :customize="true" v-show="tabState[3].select">
            <template #listHead>
              <yhm-managerth title="序号" width="40"></yhm-managerth>
              <yhm-managerth title="商品名称"></yhm-managerth>
              <yhm-managerth title="规格型号"></yhm-managerth>
              <yhm-managerth style="width: 80px" title="拆分数量"></yhm-managerth>
              <yhm-managerth style="width: 60px" title="拆分单位"></yhm-managerth>
              <yhm-managerth style="width: 80px" title="整件数量"></yhm-managerth>
              <yhm-managerth style="width: 60px" title="整件单位"></yhm-managerth>
              <yhm-managerth title="单价"></yhm-managerth>
              <yhm-managerth title="总价"></yhm-managerth>
            </template>
            <template #listBody>
              <tr v-for="(item,index) in deliveryRecordList" :key="index" :class="{InterlacBg:index%2!==0}">
                <yhm-manager-td-center :value="item.index"></yhm-manager-td-center>
                <yhm-manager-td :tip="true" node-class-name="f_main" :value="item.product"></yhm-manager-td>
                <yhm-manager-td :tip="true" node-class-name="f_main" :value="item.model"></yhm-manager-td>
                <yhm-manager-td-center :value="item.splitVal=='0'?item.quantity+'':'-----'"></yhm-manager-td-center>
                <yhm-manager-td-center :value="item.mdoStr"></yhm-manager-td-center>
                <yhm-manager-td-center :value="item.splitVal=='1'?item.quantity+'':'-----'"></yhm-manager-td-center>
                <yhm-manager-td-center :value="item.uuStr"></yhm-manager-td-center>
                <yhm-manager-td-money :value="item.price"></yhm-manager-td-money>
                <yhm-manager-td-money :value="item.money"></yhm-manager-td-money>
              </tr>
            </template>
            <template #empty>
              <span class="m_listNoData" v-show="deliveryRecord.length=='0'?true:false">暂时没有数据</span>
            </template>
            <template #pager>
              <yhm-pagination :pager="pager" is-page-size="false" @initData="listPage(deliveryRecord,'3')"></yhm-pagination>
            </template>
          </yhm-view-tab-list>
          <yhm-view-tab-list :customize="true"  v-show="tabState[4].select">
            <template #listHead>
              <yhm-managerth title="查看" width="38"></yhm-managerth>
<!--              <yhm-managerth width="38" title="序号"></yhm-managerth>-->
              <yhm-managerth title="我方账户"></yhm-managerth>
              <yhm-managerth width="110" title="交易日期"></yhm-managerth>
              <yhm-managerth title="对方账户"></yhm-managerth>
              <yhm-managerth width="40" title="收支"></yhm-managerth>
              <yhm-managerth width="110" title="事由"></yhm-managerth>
              <yhm-managerth width="105" title="交易金额"></yhm-managerth>
              <yhm-managerth width="150" title="备注"></yhm-managerth>
            </template>
            <template #listBody>
              <tr v-for="(item,index) in detailList2" :class="[{InterlacBg:index%2!=0}]" :key="item.id">
                <yhm-manager-td-look @click="lookOver(item)"></yhm-manager-td-look>
<!--                <yhm-manager-td-center :value="index+1"></yhm-manager-td-center>-->
                <yhm-manager-td :tip="true" node-class-name="f_main" :value="item.bankName"></yhm-manager-td>
                <yhm-manager-td-date :value="item.cccurDate"></yhm-manager-td-date>
                <yhm-manager-td-html :tip="true" node-class-name="f_main" :value="item.otherName"></yhm-manager-td-html>
                <yhm-manager-td-center value="收入" color="#49a9ea" class="dfJcc"></yhm-manager-td-center>
                <yhm-manager-td :tip="true" tip-type="r" tip-type-left="100" node-class-name="f_main" :value="item.subject"></yhm-manager-td>
                <yhm-manager-td-money :value="item.actualMoney"></yhm-manager-td-money>
                <yhm-manager-td :tip="true" tip-type-left="130" tip-type="r" node-class-name="f_main" :value="item.remark"></yhm-manager-td>
              </tr>
            </template>
            <template #empty>
              <span class="m_listNoData" v-show="detailList2.length=='0'?true:false">暂时没有数据</span>
            </template>
            <template #pager>
              <yhm-pagination :pager="pager" is-page-size="false" @initData="listPage(detailList,'4')"></yhm-pagination>
            </template>
          </yhm-view-tab-list>

          <yhm-view-tab-list :customize="true" v-if="fixOrderUnitConcatList.length>0"  v-show="tabState[5].select">
            <template #listHead>
<!--              <yhm-managerth title="查看" width="38"></yhm-managerth>-->
              <!--              <yhm-managerth width="38" title="序号"></yhm-managerth>-->
              <yhm-managerth title="条约名称"></yhm-managerth>
              <yhm-managerth width="150" title="文件或图片"></yhm-managerth>
            </template>
            <template #listBody>
              <tr v-for="(item,index) in fixOrderUnitConcatList2" :class="[{InterlacBg:index%2!=0}]" :key="item.id">
<!--                <yhm-manager-td-look @click="lookOver(item)"></yhm-manager-td-look>-->
                <!--                <yhm-manager-td-center :value="index+1"></yhm-manager-td-center>-->
                <yhm-manager-td :value="item.detailname"></yhm-manager-td>

                <yhm-manager-td-center v-if="!/\.(gif|jpg|jpeg|png|GIF|JPG|PNG|svg)$/.test(item.filepath)" @click="checkFile(item.filepath)" color="#49a9ea" value="点击查看文件"></yhm-manager-td-center>
                <yhm-manager-td-image v-else :tip="true" left="-130" width="900" height="550" :value="item.filepath" tag=""></yhm-manager-td-image>

              </tr>
            </template>
            <template #empty>
              <span class="m_listNoData" v-show="fixOrderUnitConcatList2.length=='0'?true:false">暂时没有数据</span>
            </template>
            <template #pager>
              <yhm-pagination :pager="pager" is-page-size="false" @initData="listPage(detailList,'4')"></yhm-pagination>
            </template>
          </yhm-view-tab-list>
        </template>
      </yhm-view-tab>
      <yhm-formoperate :createName="createName" :insertDate="insertDate" :updateName="updateName" :updateDate="updateDate"></yhm-formoperate>
    </div>
</template>

<script>
  import { viewmixin } from '@/assets/view.js'
  export default {
    name: 'collectionOfDataView',
    mixins: [viewmixin],
    data(){
      return{
        cont:'',//推修信息
        content:{},
        typeList:{},//结算类型
        companyType:'',//结算类型
        companyName:'',//推修公司
        pushPersonName:'',//推修联系人
        selfrate:'0',//自保费率
        noselfrate:'0',//非自保费率
        deliveryRecord:[],//出库记录
        deliveryRecordList:[],//出库记录
        milage:'',//里程数
        state:'',//状态
        carName:'',//车辆
        address:'',//地址
        business:'',//工单来源
        carOwner:'',//车主
        otherNode:'',//其它系统编号
        visitDate:'',//到访日期
        worksource:'',//业务来源
        personName:'',//接待人
        contactPerson:'',//联系人
        applicableModels:'',//适用车型
        contactPersonPhone:'',//联系人电话
        emailaddress:'',//邮箱

        orderid:'',//工单id
        sub:'0',//保险公司
        subid:'',//保险公司id
        subName:'',//保险公司姓名
        code:'',//编号
        remark:'',//备注
        endDate:'',//预计交车日期
        workDate:'',//发生日期
        category:'',//维修类型

        feeList:[],//定损单详情
        list:[],//定损单详情
        workOrderList:[],//工单详情
        list2:[],//工单详情
        repairablePartList:[],//维修配件
        list3:[],//维修配件
        detailList:[],//收支明细数据 全部数据
        detailList2:[],//收支明细 分页的数组
        details:[],//列表备份数据
        details2:[],//列表备份数据
        subList:[],//保险公司
        tabState:[{select:true},{select:false},{select:false},{select:false},{select:false},{select:false}],
        fixOrderUnitConcatList:[],//上传的保险公司条约
        fixOrderUnitConcatList2:[],//保险公司条约分页数据

        photoList:[],//文件
        stateList:[],//状态
        businessList:[],//工单来源
        worksourceList:[],//业务来源
        applicableModelsList:[],//适用车型

        directionList:[],//收支方向
        detailsStateList:[],//工单详情状态
        sourceList:[],//业务来源
        categoryList:[],//维修类型
        formTypeList:[],//定损单详情的类型
      }
    },
    methods:{
      checkFile(value){
        window.open(value)
      },
      lookOver(item){
        this.$dialog.OpenWindow({
          width: '1050',
          height: '650',
          url: '/unitDetailView?id='+item.dependid,
          title: '查看收支明细',
          closeCallBack:(data) =>{
          }
        })
      },
      deliveryRecordClick(){
        let params = {
          orderid: this.orderid
        }
        this.ajaxJson({
            url: '/fix/fixOrder/getListForStockOut',
            data: params,
            call: (data) => {
              this.deliveryRecord = data
              for(let v in this.deliveryRecord){
                this.deliveryRecord[v].index = Number(v)+1
              }
            }
        })
      },
      listPage(arrayList,listType){
        // console.log(arrayList,listType)
        let list = arrayList.concat()
        this.pager.total=arrayList.length
        this.pager.pageSize=5
        let a=(this.pager.pageIndex-1)*this.pager.pageSize
        let arr=[]
        arr=list.splice(a,this.pager.pageSize)
        if(listType=='0'){
          this.feeList = arr
        }else if(listType=='1'){
          this.workOrderList = arr
        }else if(listType=='2'){
          this.repairablePartList = arr
        }else if(listType=='3'){
          this.deliveryRecordList = arr
        }else if(listType=='4'){
          console.log(arr)
          this.detailList2 = arr
        }else if(listType=='5'){
          this.fixOrderUnitConcatList2 = arr
        }
      },
      initData () {
        let params = {
          id:this.id,
        }
        this.ajaxJson({
          url: '/fix/fixreception/initForm',
          data: params,
          call: (data) => {
            if (data) {
              this.category = data.fixorder.category//维修类型
              this.orderid = data.fixorder.id//工单id
              this.typeList = data.typePsd.list//结算类型
              this.milage = data.fixorder.milage//里程数
              this.list = data.fixorder.fixedForm.list
              this.list2 = data.fixorder.fixOrderDetail.list
              this.list3 = data.fixorder.fixOrderMater.list
              this.detailList = data.fixorder.summary.reslist0//收支明细 全部数据
              this.detailList2 = data.fixorder.summary.reslist0//收支明细 用来分页
              this.fixOrderUnitConcatList = data.fixOrderUnitConcatList//上传的保险公司条约
              console.log(this.detailList)
              for(let v in this.list){
                this.list[v].index = Number(v)+1
              }
              for(let b in this.list2){
                this.list2[b].index = Number(b)+1
              }
              for(let n in this.list3){
                this.list3[n].index = Number(n)+1
              }
              this.content = data
              // this.cont = data.cont

              if(data.fixCompanyOrder.companyName!=null&&data.fixCompanyOrder.companyName!=''){
                this.selfrate = data.fixCompanyOrder.selfrate
                this.noselfrate = data.fixCompanyOrder.noselfrate
                this.companyName = data.fixCompanyOrder.companyName
                this.companyType = data.fixCompanyOrder.type//结算类型
                // this.pushPersonName = data.fixCompanyOrder.personName
              }
              this.sub = data.fixorder.sub//保险公司
              this.subid =  data.fixorder.subid//保险公司id
              this.directionList = data.directionPsd.list//收支方向
              this.detailsStateList = data.statePsd.list//工单详情状态
              this.sourceList = data.workSourcePsd.list//业务来源
              this.categoryList = data.categoryPsd.list//维修类型
              this.formTypeList = data.formTypePsd.list//定损单详情的类型
              this.emailaddress = data.emailaddress//邮箱
              this.address = data.address//地址

              this.listPage(this.list,'0')
              this.deliveryRecordClick()

              this.subList = data.mapList//保险公司
              for(let i in this.subList){
                this.subList[i].num = i
                if(this.subList[i].id == this.subid){
                  this.subName = this.subList[i].showName
                }
              }
              // this.subName = this.subList[this.sub].showName//保险公司
              this.stateList = data.statePsd.list//状态
              this.businessList = data.businessPsd.list//工单来源
              this.worksourceList = data.workSourcePsd.list//业务来源
              this.applicableModelsList = data.applicableModelsPsd.list//适用车型

              this.state = data.state//状态
              this.carName = data.carName //车辆
              this.business = data.business//工单来源
              this.carOwner = data.carOwner//车主
              this.otherNode = data.otherNode//其它系统编号
              this.visitDate = data.visitDate//到访日期
              this.worksource = data.worksource//业务来源
              this.personName = data.personName//接待人
              this.contactPerson = data.contactPerson//联系人
              this.applicableModels = data.applicableModels//适用车型
              this.contactPersonPhone = data.contactPersonPhone//联系人电话


              this.code = data.fixorder.code//编号
              this.remark = data.fixorder.remark//备注
              this.workDate = data.fixorder.workDate//发生日期
              this.endDate = data.fixorder.endDate//预计交车日期
              this.photoList = data.fixorder.fixedForm.photoList//文件

              this.createName = data.createName
              this.insertDate = data.insertDate
              this.updateName = data.updateName
              this.updateDate = data.updateDate

            }
          }
        })
      }
    },
    created () {
      this.setQuery2Value('id')
      this.initData()
    }
  }
</script>

<style scoped>

</style>
