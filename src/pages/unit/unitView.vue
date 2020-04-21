<template>
  <div class="f_main">
    <yhm-view-body :customize="true" :pager="false">
      <template #title>基本信息</template>
      <template #body>
        <yhm-view-control title="单位分类" :content="category" :psd="categoryList"></yhm-view-control>
        <yhm-view-control title="单位名称" :content="name" ></yhm-view-control>
        <yhm-view-control title="单位名称首字母" :content="prefixLetter" ></yhm-view-control>
        <yhm-view-control title="单位代码" :content="code" ></yhm-view-control>
        <yhm-view-control title="单位简称" :content="abbreviation" ></yhm-view-control>
        <yhm-view-control title="公司电话" :content="tel" ></yhm-view-control>
        <yhm-view-control title="统一社会信用代码" :content="registrationNumber" ></yhm-view-control>
        <yhm-view-control title="邮箱" :content="email" ></yhm-view-control>
        <yhm-view-control category="2" title="标签" :content="tag" :psd="tagList" v-show="isTagShow"></yhm-view-control>
        <yhm-view-control category="3" title="地址" :content="addressCN" ></yhm-view-control>
      </template>
    </yhm-view-body>
    <div class="f_split"></div>
    <yhm-view-tab>
      <template #tab>
        <yhm-view-tab-button :list="tabState" :index="0">更多信息</yhm-view-tab-button>
        <yhm-view-tab-button :list="tabState" :index="1" @click="listDetail">往来明细</yhm-view-tab-button>
      </template>
      <template #tab_total>
        <div v-show="tabState[1].select" style="background: #c5daeb;margin-right: 2px;">
          <table style="width: 400px;height: 50px;" >
            <thead>
            <th >总金额</th>
            <th style="color: #49a9ea;">收入金额</th>
            <th style="color: #ff0000;">支出金额</th>
            </thead>
            <tbody>
            <tr v-for="(item,index) in totalTotal" style="background: #fff;">
              <td v-html="tenThousandFormatShow(item.balance)" style="text-align: right;"></td>
              <td v-html="tenThousandFormatShow(item.income)" style="text-align: right;color: #49a9ea;"></td>
              <td v-html="tenThousandFormatShow(item.expend)" style="text-align: right;color: #ff0000;"></td>
            </tr>
            </tbody>
          </table>

        </div>
      </template>
      <template #content>
        <yhm-view-tab-content v-show="tabState[0].select">
            <yhm-view-control title="类型" :content="categoryUnit" ></yhm-view-control>
            <yhm-view-control title="法定代表人" :content="legalPersonID"></yhm-view-control>

            <yhm-view-control title="注册资本" :content="registeredCapital"></yhm-view-control>

            <yhm-view-control title="币种类型" :content="currency" ></yhm-view-control>
            <yhm-view-control title="成立日期" :content="establishDate" type="date"></yhm-view-control>
            <yhm-view-control title="营业期限自" :content="doBusinessDate" type="date"></yhm-view-control>
            <yhm-view-control title="核准日期" :content="approvalDate" type="date"></yhm-view-control>
            <yhm-view-control title="营业期限至" :content="noDoBusinessDate" type="date"></yhm-view-control>
            <yhm-view-control title="登记机关" :content="registerOffice" ></yhm-view-control>
            <yhm-view-control title="登记状态" :content="registerState" :psd="registerStateList"></yhm-view-control>
            <yhm-view-control category="3" title="经营范围" :content="management" ></yhm-view-control>
        </yhm-view-tab-content>
        <yhm-view-tab-list :customize="true"  v-show="tabState[1].select">
          <template #operate>
            <yhm-radiofilter @initData="initChoose('direction')" title="完成状态" :content="directionList" style="margin: 5px 0;"></yhm-radiofilter>
          </template>
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
            <tr v-for="(item,index) in content" :key="index" :class="{InterlacBg:index%2!==0}">
              <yhm-manager-td-look @click="listView(item.id)"></yhm-manager-td-look>
              <yhm-manager-td width="130"  :value="item.bankName+item.account+item.nature"></yhm-manager-td>
              <yhm-manager-td-center width="130" v-if="item.otherName.indexOf('style')===-1?true:false" :value="item.otherName"></yhm-manager-td-center>
              <yhm-manager-td v-if="item.otherName.indexOf('style')!==-1?true:false" v-html="item.otherName"></yhm-manager-td>
              <yhm-manager-td-date :value="item.cccurDate" typeof="data"></yhm-manager-td-date>
              <yhm-manager-td-direction :direction="item.direction" :value="item.direction" class="dfJcc" :dir-val="false"></yhm-manager-td-direction>
              <yhm-manager-td :value="item.subject" ></yhm-manager-td>
              <yhm-manager-td-money :value="money" v-if="item.direction==='0'?money=item.money:money='0'" style="color:#001CCE;"></yhm-manager-td-money>
              <yhm-manager-td-money :value="money" v-if="item.direction==='1'?money=item.money:money='0'" style="color:#f00;"></yhm-manager-td-money>
            </tr>
          </template>
          <template #empty v-if="isEmpty">
            <span class="m_listNoData">暂时没有数据</span>
          </template>
          <template #pager>
            <yhm-pagination :pager="pager" is-page-size="false" @initData="listDetail(false)"></yhm-pagination>
          </template>
        </yhm-view-tab-list>
      </template>
    </yhm-view-tab>
    <div class="f_split"></div>
    <yhm-formoperate :createName="createName" :insertDate="insertDate" :updateName="updateName" :updateDate="updateDate">
      <template #btn>
        <yhm-commonbutton value="编辑" icon="i-edit" :flicker="true" @call="editBtn()"></yhm-commonbutton>
      </template>
    </yhm-formoperate>
  </div>
</template>
<!--capital*capitalCompany-->
<script>
  import { viewmixin } from '@/assets/view.js'
  export default {
    name: 'unitView',
    mixins: [viewmixin],
    data() {
      return {
        directionList: {
          value: '',
          list: [
            {showName:"收入", num: "0", code: "", img: ""},
            {showName:"支出", num: "1", code: "", img: ""},
          ]
        },
        category: '',//单位分类
        totalTotal:[],
        name:'',//单位名称
        prefixLetter: '',   //单位名称首字母
        code:'',//单位代码
        abbreviation:'',//单位简称
        tel:'',//公司电话
        registrationNumber:'',//统一社会信用代码
        email:'',//邮箱
        tag:'',//标签
        addressCN:'',//地址
        categoryUnit:'',//类型
        legalPersonID:'',//法定代表人
        capital: '',//注册资本
        currency:'',//币种类型
        content:[],
        tabState:[{select:true},{select:false}],
        empty:false,
        isTagShow: false,

        id: '',
        categoryList: [] ,
        tagList: [],
        isEmpty: true,

        legalPerson: '',
        establishDate: '',              //成立日期
        doBusinessDate: '',              //营业日期
        noDoBusinessDate: '',              //营业日期至
        registerOffice: '',              //登记机关
        approvalDate: '',              //核准日期
        registerState: '',              //登记状态
        registeredCapital: '',              //註冊資本
        registerStateList: [],
        capitalCompany: '',              //金额单位
        management: '',              //经营范围
        stateBefore: '0', // 默认选择状态为可以选择，1为不可以选择,
      }
    },
    methods: {
      initChoose(){
        this.listDetail(false)
      },
      listDetail(initValue){
        let params = {}
        if (initValue) {
          // 页面初始化是需要的参数
          params = {

          }
        } else {
          // 页面非初始化时需要的参数
          params = {
            unitID:this.id,
            init:initValue,
            pageIndex: this.pager.pageIndex,
            pageSize:  this.pager.pageSize,
            direction: this.directionList.value
          }
        }
        this.ajaxJson({
          url: '/Fin/getUnitOrPersonBankDetail',
          data: params,
          call: (data) => {
            this.content = data.content
            this.totalTotal = data.total
            console.log(this.totalTotal)
            this.pager.total = data.count

          }
        })
      },
      listView(id){
        this.$dialog.OpenWindow({
          width: '1050',
          height: '750',
          url: '/unitDetailView?id=' + id  + '&&ID=' + this.id,
          title: '查看收支明细信息',
          closeCallBack: (data)=>{
          }
        })
      },
      editBtn(){
        this.$dialog.OpenWindow({
          width: '1050',
          height: '750',
          url: '/addUnitForm?id=' + this.id,
          title: '编辑单位信息',
          closeCallBack: (data)=>{
            if(data){
              this.$dialog.setReturnValue(this.id)
              this.$dialog.refresh()
            }
          }
        })
      },
      initPageData (initValue) {

        let params = {}
        if (initValue) {
          // 页面初始化是需要的参数
          params = {
            unitID:this.id
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
            // 初始化时需要执行的代码
            // 这边初始化筛选信息
          }
        })
      }
    },
    created () {

      let params = {
        id:this.id
      }
      this.ajaxJson({
        url: '/Basic/unitVueForm',
        data: params,
        call: (data) => {
          this.content = data.content
          this.createName = data.createName
          this.insertDate = data.insertDate
          this.updateDate = data.updateDate
          this.updateName = data.updateName
          this.registrationNumber = data.registrationNumber
          this.categoryList = data.categoryPsd.list
          this.category = data.categoryPsd.value
          this.tagList = data.tagPsd.list
          this.tag = data.tagPsd.value

          this.registerStateList = data.registerStatePsd.list
          this.registerState = data.registerStatePsd.value
          this.id = data.id
          this.name = data.name
          this.prefixLetter = data.prefixLetter
          this.abbreviation = data.abbreviation
          this.code = data.code
          this.addressCN = data.addressCN
          this.tel = data.tel

          this.email = data.email
          this.categoryUnit = data.categoryUnit
          this.legalPersonID = data.legalPersonID
          this.legalPerson = data.legalPerson
          this.capital = data.capital
          this.currency = data.currency
          this.establishDate = data.establishDate
          this.doBusinessDate = data.doBusinessDate
          this.noDoBusinessDate = data.noDoBusinessDate
          this.registerOffice = data.registerOffice
          this.approvalDate = data.approvalDate
          this.registerState = data.registerState
          this.capitalCompany = data.capitalCompany
          this.management = data.management


          if(this.capital && this.capitalCompany){
            this.registeredCapital = ( parseFloat(this.capital) * parseFloat(this.capitalCompany) ) + '';
            if(this.registeredCapital === '0'){
              this.registeredCapital = ''
            }
          }

          if(this.category === '1'){
            this.isTagShow = true
          }else{
            this.isTagShow = false
          }

        }
      })

    },
    watch:{
      content(){
        try {
          if(this.content.length === 0){
            this.isEmpty = true
          }else{
            this.isEmpty = false
          }
        }catch (e) {}

      }
    }
  }
</script>

<style scoped>
.select{
  justify-content: left;
}
</style>
