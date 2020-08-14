<template>
  <div class="f_main">
    <yhm-view-body>
      <template #title>基本信息</template>
      <template #body>
        <yhm-view-control title="单位类型" :content="category" :psd="categoryList"></yhm-view-control>
        <yhm-view-control title="性别" :content="sex" :psd="sexList"></yhm-view-control>
        <yhm-view-control title="是否重要联系人" :content="important" :psd="importantList"></yhm-view-control>
        <yhm-view-control title="政治面貌" v-if="isThisUnit" :content="politicsStatus" :psd="politicsStatusList"></yhm-view-control>
        <yhm-view-control title="姓名" :content="expatriate=='0'?name+'':name+'-外籍'"></yhm-view-control>
        <yhm-view-control title="手机号码" :content="phone"></yhm-view-control>
        <yhm-view-control title="手机号码2" :content="phoneReserve"></yhm-view-control>
        <yhm-view-control title="所属公司" v-if="isThisUnit" :content="unit"></yhm-view-control>
        <yhm-view-control title="所属部门" v-if="isThisUnit" :content="department"></yhm-view-control>
        <yhm-view-control title="身份证号" v-if="expatriate=='0'" :content="idNo"></yhm-view-control>
        <yhm-view-control title="护照号" v-if="expatriate=='1'" :content="idNo"></yhm-view-control>
        <yhm-view-control title="籍贯" :content="nativePlace"></yhm-view-control>
        <yhm-view-control title="生日历法" :content="calendar" :psd="calendarList"></yhm-view-control>
        <yhm-view-control title="公历生日" :content="birthday" type="date"></yhm-view-control>
        <yhm-view-control title="农历生日" :content="birthdayLunar"></yhm-view-control>
        <yhm-view-control title="属相" :content="zodiac"></yhm-view-control>
        <yhm-view-control title="星座" :content="constellation"></yhm-view-control>
        <yhm-view-control title="民族" :content="nation"></yhm-view-control>
        <yhm-view-control title="血型" :content="bloodType"></yhm-view-control>
        <yhm-view-control title="备注" v-if="isThisUnit" :content="remarkStr"></yhm-view-control>
        <yhm-view-control title="标签" v-if="!isThisUnit" :content="tag" :psd="tagList"></yhm-view-control>
      </template>
    </yhm-view-body>
    <div class="f_split"></div>
    <yhm-view-tab>
      <template #tab>
        <yhm-view-tab-button :list="tabState" :index="0">交易明细</yhm-view-tab-button>
        <yhm-view-tab-button :list="tabState" :index="1" @click="maintain">保险理赔</yhm-view-tab-button>
      </template>
      <template #tab_total>
        <div style="display:flex;align-items: center;">
          <div  v-show="tabState[1].select" style="margin-right: 30px">
            <yhm-datebox type="year" width="200px" :maxYear="maxYear" :isSm="true" @call="selectYear" style="width: 120px" :value="yearTxt" id="yearTxt" position="r"></yhm-datebox>
          </div>
          <div v-show="tabState[1].select" style="background: #c5daeb;margin-right: 2px;">
            <table style="width:250px;height: 50px;" >
              <thead>
              <th >总数</th>
              <th style="color: #49a9ea; width: 150px;">总金额</th>
              </thead>
              <tbody>
              <tr  style="background: #fff;box-sizing: border-box;">
                <td style="text-align: center;">{{totalNumber}} </td>
                <td v-html="tenThousandFormatShow(aggregateAmount+'')" style="text-align: right;box-sizing: border-box;padding-right:10px "></td>
              </tr>
              </tbody>
            </table>
          </div>

        </div>
      </template>
      <template #content>
        <yhm-view-tab-list :customize="true"  v-show="tabState[0].select">
          <template #listHead>
            <yhm-managerth style="width:28px" title="查看" ></yhm-managerth>
            <yhm-managerth style="width:88px" title="账户" ></yhm-managerth>
            <yhm-managerth style="width: 100px" title="交易对象"></yhm-managerth>
            <yhm-managerth style="width: 100px" title="交易日期"></yhm-managerth>
            <yhm-managerth style="width: 20px" title="方向"></yhm-managerth>
            <yhm-managerth style="width: 70px" title="事由"></yhm-managerth>
            <yhm-managerth style="width: 70px" title="收入金额"></yhm-managerth>
            <yhm-managerth style="width: 70px" title="支出金额"></yhm-managerth>
          </template>
          <template #listBody>
            <tr v-for="(item,index) in list" :key="index" :class="{InterlacBg:index%2!==0}">
              <yhm-manager-td-look @click="listView(item.id)"></yhm-manager-td-look>
              <yhm-manager-td width="130"  :value="item.bankName+item.account+item.nature"></yhm-manager-td>
              <yhm-manager-td-center width="130" v-if="item.otherName.indexOf('style')===-1?true:false" :value="item.otherName"></yhm-manager-td-center>
              <yhm-manager-td v-if="item.otherName.indexOf('style')!==-1?true:false" v-html="item.otherName"></yhm-manager-td>
              <yhm-manager-td-date :value="item.insertDate" typeof="data"></yhm-manager-td-date>
              <yhm-manager-td-direction :direction="item.direction" :value="item.direction" class="dfJcc" :dir-val="false"></yhm-manager-td-direction>
              <yhm-manager-td :value="item.subject" ></yhm-manager-td>
              <yhm-manager-td-money :value="money" v-if="item.direction==='0'?money=item.money:money='0'" style="color:#001CCE;"></yhm-manager-td-money>
              <yhm-manager-td-money :value="money" v-if="item.direction==='1'?money=item.money:money='0'" style="color:#f00;"></yhm-manager-td-money>
            </tr>
          </template>
          <template #empty>
            <span class="m_listNoData" v-show="empty">暂时没有数据</span>
          </template>
          <template #pager>
            <yhm-pagination :pager="pager" is-page-size="false" @initData="initPageData(false)"></yhm-pagination>
          </template>
        </yhm-view-tab-list>
        <yhm-view-tab-list :customize="true"  v-show="tabState[1].select">
          <template #operate>
            <yhm-radiofilter @initData="maintain('screening')" title="查看" :content="screening" style="margin: 5px 0;"></yhm-radiofilter>
          </template>
          <template #listHead>
            <yhm-managerth style="width: 38px;" title="查看"></yhm-managerth>
            <yhm-managerth style="width: 80px" title="客户姓名"></yhm-managerth>
            <yhm-managerth title="收入来源"></yhm-managerth>
            <yhm-managerth style="width: 120px;" title="工单号"></yhm-managerth>
            <yhm-managerth style="width: 60px" title="业务员"></yhm-managerth>
            <yhm-managerth style="width:60px;" title="车型品牌"></yhm-managerth>
            <yhm-managerth style="width: 70px" title="车牌号"></yhm-managerth>
            <yhm-managerth style="width: 100px;" title="回款日期"></yhm-managerth>
            <yhm-managerth style="width: 100px" title="发生额"></yhm-managerth>
            <yhm-managerth style="width: 120px" title="收款银行"></yhm-managerth>
            <yhm-managerth style="width: 160px" title="银行摘要" ></yhm-managerth>
          </template>
          <template #listBody>
            <tr v-for="(item,index) in content" :key="index" :class="{InterlacBg:index%2!==0}">
              <yhm-manager-td-look @click="lookOver(item)"></yhm-manager-td-look>
              <yhm-manager-td :tip="true" node-class-name="f_main" :value="item.customer" ></yhm-manager-td>
              <yhm-manager-td :tip="true" node-class-name="f_main" :value="item.otherName" @click="unitClickLeft(item)" ></yhm-manager-td>
              <yhm-manager-td :value="item.workOrderID" ></yhm-manager-td>

              <yhm-manager-td :tip="true" node-class-name="f_main" :value="item.operator" @click="operatorClickLeft(item)"></yhm-manager-td>
              <yhm-manager-td :tip="true" node-class-name="f_main" :value="item.vehicleBrand" ></yhm-manager-td>
              <yhm-manager-td :value="item.licensePlateNumber" :tip="true" node-class-name="f_main"></yhm-manager-td>
              <yhm-manager-td-date :value="item.moneyBackDate"></yhm-manager-td-date>

              <yhm-manager-td-money :value="item.money === null ? ' ':item.money"></yhm-manager-td-money>
              <yhm-manager-td :value="item.bankName"></yhm-manager-td>
              <yhm-manager-td :value="item.bankSummary === null ? ' ': item.bankSummary"></yhm-manager-td>
            </tr>
          </template>
          <template #empty>
            <span class="m_listNoData" v-show="content.length=='0'?true:false">暂时没有数据</span>
          </template>
          <template #pager>
            <yhm-pagination :pager="pager" is-page-size="false" @initData="initPageData(false)"></yhm-pagination>
          </template>
        </yhm-view-tab-list>
      </template>
    </yhm-view-tab>
    <yhm-formoperate :createName="createName" :insertDate="insertDate" :updateName="updateName" :updateDate="updateDate">
      <template #btn>
        <yhm-commonbutton value="编辑" icon="i-edit" :show="isdisplay" :flicker="true" @call="editBtn()"></yhm-commonbutton>
      </template>
    </yhm-formoperate>
  </div>

</template>

<script>
  // import { formmixin } from '@/assets/form.js'
  import { viewmixin } from '@/assets/view.js'
  // import { managermixin } from '../../assets/manager'
  import {formatDate} from '@/assets/common.js'

  export default {
    name: 'personView',
    mixins: [viewmixin],
    data (){
      return {
        maxYear: parseInt(formatDate(new Date()).substr(0, 4)),
        yearTxt:'',
        pager: { // 分页数据
          total: '', // 数据总条数
          pageSize: 5, // 单页数据条数
          pageIndex: 1, // 当前页码
          selectCount: 0 // 选中数据的条数
        },
        list:[],
        tabState:[{select:true},{select:false}],
        category: '',
        categoryList: [],
        sex: '',
        sexList: [],
        important: '',
        importantList: [],
        politicsStatus: '',
        politicsStatusList: [],
        name: '',
        phone: '',
        phoneReserve:'',
        unit: '',
        department: '',
        idNo: '',
        nativePlace: '',
        calendar: '',
        calendarList: [],
        nation: '',
        birthday: '',
        birthdayLunar: '',
        zodiac: '',
        constellation: '',
        nationEvent: '',
        bloodType: '',
        remarkStr: '',
        tagList: [],
        tag: '',
        id:'',
        isThisUnit: true,
        isdisplay:true,
        customerName:'',
        expatriate:'',
        screening:{
          list:[
            {
              code:"",
              img:'',
              num:'0',
              showName:'保险理赔'
            },
            {
              code:"",
              img:'',
              num:'1',
              showName:'自费维修'
            },
          ],
          value:'0',
        },
        contentTotal:[],
        totalNumber:'',
        aggregateAmount:'',
        content:[],
        insertDate:'',
        createName:'',
        updateName:'',
        updateDate:'',
      }
    },
    methods: {
      selectYear(val){
        this.yearTxt = val+''
        this.maintain()
      },
      maintain(){
        let params = {
          year:this.yearTxt,
          type:this.screening.value,
          customerName:this.id,
        }
        this.ajaxJson({
          url: '/Fin/getPersonBankDetailInsurance',
          data: params,
          call: (data) => {
            this.content = data.content
            this.pager.total = data.count
            this.contentTotal = data.total
            this.totalNumber = data.total[0].count
            this.aggregateAmount = data.total[0].money
          }
        })
      },
      editBtn(){
        this.$dialog.OpenWindow({
          width: '1050',
          height: '750',
          title: '编辑联系人信息',
          url: '/addPersonForm?id=' + this.id+'&url=0',
          closeCallBack: (data)=>{
            if(data){
              this.$dialog.setReturnValue(this.id)
              this.initData()
            }
          }
        })
      },
      lookOver(item){
        this.$dialog.OpenWindow({
          width: '1050',
          height: '450',
          url: '/claimsView?id=' + item.ownerID ,
          title: '查看'+this.screening.list[this.screening.value].showName +'详情',
          closeCallBack: (data)=>{
          }
        })
      },
      listView(id){
        this.$dialog.OpenWindow({
          width: '1050',
          height: '750',
          url: '/unitDetailView?id=' + id  + '&ID=' + this.id,
          title: '查看收支明细信息',
          closeCallBack: (data)=>{
          }
        })
      },
      initPageData (initValue) {
        let params = {}
        if (initValue) {
          // 页面初始化是需要的参数
          params = {
            unitID:this.id,

          }
        } else {
          // 页面非初始化时需要的参数
          params = {

          }
        }
        this.init({
          url: '/Fin/getUnitOrPersonBankDetail',
          data: params,
          all: (data) => {
            // 不管是不是初始化都需要执行的代码
          },
          init: (data) => {
            this.pager.total = data.count

            // 初始化时需要执行的代码
            // 这边初始化筛选信息
          }
        })
      },
      viewTabList(){
        let params = {
          personID:this.id,
          pageIndex:this.pager.pageIndex,
          pageSize:this.pager.pageSize,
        }
        this.ajaxJson({
          url: '/Fin/getUnitOrPersonBankDetail',
          data: params,
          call: (data) => {
            this.pager.total = data.count
            this.list = data.content
          }
        })
      },
      initData(){
        let params = {
          id: this.id
        }
        this.ajaxJson({
          url: '/Basic/personVueForm',
          data: params,
          call: (data) => {
            this.list = data.content
            this.pager.total = data.count
            this.categoryList = data.categoryPsd.list
            this.category = data.categoryPsd.value
            this.sexList = data.sexPsd.list
            this.sex = data.sexPsd.value
            this.importantList = data.importantPsd.list
            this.important = data.importantPsd.value
            this.politicsStatusList = data.politicsStatusPsd.list
            this.politicsStatus = data.politicsStatusPsd.value
            this.name = data.name
            this.phone = data.phone
            this.phoneReserve = data.phoneReserve
            this.unit = data.unit
            this.department = data.department
            this.idNo = data.idNo
            this.nativePlace = data.nativePlace
            this.calendarList = data.calendarPsd.list
            this.calendar = data.calendarPsd.value
            this.nation = data.nation
            this.birthday = data.birthday
            this.birthdayLunar = data.birthdayLunar
            this.zodiac = data.zodiac
            this.constellation = data.constellation
            this.nationEvent = data.nationEvent
            this.bloodType = data.bloodType
            this.remarkStr = data.remarkStr
            this.tagList = data.tagPsd.list
            this.tag = data.tagPsd.value
            this.isThisUnit = this.category !== '1';

            this.updateName = data.updateName
            this.updateDate = data.updateDate
            this.insertDate = data.insertDate
            this.createName = data.createName

            this.expatriate=data.expatriate

          }
        })
        // this.init({
        //   url: '/Basic/personVueForm',
        //   data: params,
        //   all: (data)=>{
        //
        //   },
        //   add: (data)=>{
        //
        //   },
        //   look: (data)=>{
        //
        //   }
        // })
      }
    },
    created () {
      this.initData()
      this.viewTabList()
      this.setQuery2Value('videoUrl')
      this.setQuery2Value('isBilling')
      let nowDate = new Date();
      let newYear = nowDate.getFullYear();
      this.yearTxt = newYear+''
      if (this.isBilling==='0'){
          this.isdisplay=false
      }
    },
    watch:{
      list(){
        if(this.list!==undefined){
          this.empty = this.list.length === 0;
        }
      }
    },
  }
</script>

<style scoped>

</style>
