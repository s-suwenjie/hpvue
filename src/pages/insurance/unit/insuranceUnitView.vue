<template>
  <div class="f_main">
    <yhm-view-body>
      <template #title>基本信息</template>
      <template #body>
        <yhm-view-control title="别名" :content="shortName"></yhm-view-control>
        <yhm-view-control title="公司用途" category="2" :content="category" :psd="categoryList"></yhm-view-control>
        <yhm-view-control title="汇款公司名称" category="1" :content="unit" ></yhm-view-control>
        <yhm-view-control title="回款公司名称" category="1" :content="incomeUnit" ></yhm-view-control>
        <yhm-view-control title="第三方回款公司名称" category="1" :content="tripartiteUnit" ></yhm-view-control>
        <yhm-view-control title="开票类型" category="3" :content="billingTypeVal" ></yhm-view-control>
        <yhm-view-control title="商业险种" category="3" :content="commercialVal" ></yhm-view-control>
       </template>
    </yhm-view-body>
    <div class="f_split"></div>
    <div class="f_split"></div>
    <yhm-view-tab>
      <template #tab>
        <yhm-view-tab-button :list="tabState" :index="0" @click="listPage">保险信息</yhm-view-tab-button>
        <yhm-view-tab-button :list="tabState" :index="1" @click="billView">回款对账单</yhm-view-tab-button>
        <yhm-view-tab-button :list="tabState" :index="2" @click="filesView">对账单</yhm-view-tab-button>
        <yhm-view-tab-button :list="tabState" :index="3" @click="contractView">合同</yhm-view-tab-button>
      </template>
      <template #content>
        <yhm-view-tab-list :customize="true"  v-show="tabState[0].select">
          <template #listHead>
            <yhm-managerth  title="启用日期" ></yhm-managerth>
            <yhm-managerth  title="客户新车费率"></yhm-managerth>
            <yhm-managerth  title="客户费率"></yhm-managerth>
            <yhm-managerth  title="特殊车型费率"></yhm-managerth>

          </template>
          <template #listBody>
            <tr v-for="(item,index) in listPages" :key="index" :class="{InterlacBg:index%2!==0}">
              <yhm-manager-td-date :value="item.startDate==='1900-01-01'?'-----':item.startDate" typeof="data"></yhm-manager-td-date>
              <yhm-manager-td-rgt  :value="item.newRate+'  %'"></yhm-manager-td-rgt>
              <yhm-manager-td-rgt :value="item.clientRate+'  %'" ></yhm-manager-td-rgt>
              <yhm-manager-td-rgt :value="item.vipRate+'  %'" ></yhm-manager-td-rgt>
            </tr>
          </template>
          <template #empty>
            <span class="m_listNoData" v-show="empty">暂时没有数据</span>
          </template>
          <template #pager>
            <yhm-pagination :pager="pager" is-page-size="false" :is-select-info="false" @initData="listPage(false)"></yhm-pagination>
          </template>
        </yhm-view-tab-list>
        <yhm-view-tab-list :customize="true" :pager="true" v-show="tabState[1].select">
          <template #customizedListHead>
            <div style="display: flex;justify-content: center">
              <p class="table_tr table_tr1">年份</p>
              <p class="table_tr table_tr2">月份</p>
            </div>
          </template>
          <template #customizedListBody>
            <div v-for="(item,index) in excelList" :key="index" class="tbody_flex">
              <p class="tbody_td1">{{item.year}}</p>
              <p class="tbody_td2">
                <span v-for="(items,indexs) in 12" :key="indexs" @click="listView(item,indexs)" :class="{'tbody_td2_red':colorEvent(item,indexs)==1?true:false}">
                  {{monthList[indexs]}}
                </span>
              </p>
            </div>
          </template>
          <template #empty>
            <span class="m_listNoData" v-show="excelList.length!=0?false:true">暂时没有数据</span>
          </template>
        </yhm-view-tab-list>
        <yhm-view-tab-list :customize="true" :pager="true" v-show="tabState[2].select">
          <template #listHead>
            <yhm-managerth style="width: 60px" title="文件" ></yhm-managerth>
            <yhm-managerth  title="对账单开始日期"></yhm-managerth>
            <yhm-managerth  title="对账单结束日期"></yhm-managerth>
            <yhm-managerth  title="账单总金额"></yhm-managerth>
            <yhm-managerth  title="账单剩余回款金额"></yhm-managerth>
            <yhm-managerth  title="是否回款"></yhm-managerth>
            <yhm-managerth  title="已开发票"></yhm-managerth>
            <yhm-managerth  style="width: 150px" title="勾选对应的收支明细"></yhm-managerth>
          </template>
          <template #listBody>
            <tr v-for="(item,index) in excelList" :key="index" :class="{InterlacBg:index%2!==0}">
              <yhm-manager-td  value=" " @click="downloadEvent(item)">
                <img  style="margin: auto;" width="30" height="30" src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1594275457602&di=5ebf487929ced264a201d33766b21f42&imgtype=0&src=http%3A%2F%2F5b0988e595225.cdn.sohucs.com%2Fimages%2F20180920%2F2397b5b7b5024319bf98035b72c2ca47.png" alt="">
              </yhm-manager-td>

              <yhm-manager-td-date  :value="item.monthsDate"></yhm-manager-td-date>
              <yhm-manager-td-date  :value="item.endDate"></yhm-manager-td-date>
              <!--<yhm-manager-td-money   :value="item.money"></yhm-manager-td-money>-->
              <yhm-manager-td @click="excelViewClick(item)" @afterClick="afterClick(item)" :value="item.money" after-icon="i-wave" @mouseout="tableTipHideEvent" :value-object="item"></yhm-manager-td>
              <yhm-manager-td-money  :value="item.useMoney"></yhm-manager-td-money>

              <yhm-manager-td-center v-if="item.state==0" :value="'未回款'" color="red" style="font-weight: bold"></yhm-manager-td-center>
              <yhm-manager-td-center v-else :value="'已回款'" color="#55AA66"></yhm-manager-td-center>
              <!--<yhm-manager-td :value="item.invoiceStorename" ></yhm-manager-td>-->
              <yhm-manager-td-operate v-if="item.invoiceStorename!=''">
                <img  style="margin: auto;" width="30" height="30" @click="viewClick(item)" :src="'/UploadFile/Invoice/'+item.invoiceStorename" alt="">
              </yhm-manager-td-operate>
              <yhm-manager-td-operate v-else>
                <yhm-manager-td-operate-button  @click="addOpenInvoice(item)"  value="去开票" icon="im_go" color="#56B4F4"></yhm-manager-td-operate-button>
              </yhm-manager-td-operate>
              <yhm-manager-td-operate>
                <yhm-manager-td-operate-button v-if="item.state==1" @click="selectBankView(item)"  value="查看" icon="list_look" color="#56B4F4"></yhm-manager-td-operate-button>
                <yhm-manager-td-operate-button v-else @click="bankView(item)"  value="待勾选" icon="i-zoom" color="#FF0000"></yhm-manager-td-operate-button>

              </yhm-manager-td-operate>
            </tr>
          </template>

          <template #empty>
            <span class="m_listNoData" v-show="excelList.length!=0?false:true">暂时没有数据</span>
          </template>
          <template #pager>
            <yhm-pagination :pager="pager"  :is-select-info="false" @initData="filesView(false)"></yhm-pagination>
          </template>
        </yhm-view-tab-list>
        <yhm-view-tab-list :customize="true" :pager="true" v-show="tabState[3].select">
          <template #listHead>
            <yhm-managerth  title="合同文件"></yhm-managerth>
            <yhm-managerth  title="合同名称" ></yhm-managerth>
            <yhm-managerth  title="签订日期"></yhm-managerth>
            <yhm-managerth  title="合同到期日"></yhm-managerth>
            <yhm-managerth  title="对方名称"></yhm-managerth>
            <yhm-managerth  title="剩余天数"></yhm-managerth>

          </template>
          <template #listBody>
            <tr v-for="(item,index) in contractList" :key="index" :class="{InterlacBg:index%2!==0}">
              <yhm-manager-td  value=" " @click="contractEvent(item)">
                <svg  t="1597803685080" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2270" width="30" height="30" style="margin: auto;"><path d="M804 573.928C773.76 547.213 734.023 531 690.5 531c-34.53 0-66.677 10.205-93.588 27.763h-303.22c-6.627 0-12 5.373-12 12v77.52h246.054C522.072 665.325 519 683.554 519 702.5c0 44.49 16.94 85.022 44.723 115.5H222V165c0-13.255 10.745-24 24-24h558v432.928zM326.462 349.882c24.725 0 44.769-20.04 44.769-44.76 0-24.721-20.044-44.761-44.77-44.761-24.725 0-44.769 20.04-44.769 44.76s20.044 44.76 44.77 44.76z m86.615-89.521c-6.627 0-12 5.372-12 12v77.52h331.23c6.628 0 12-5.372 12-12v-77.52h-331.23zM293.692 409.562c-6.627 0-12 5.373-12 12v77.52h450.616c6.627 0 12-5.372 12-12v-77.52H293.692zM690 859c-86.709 0-157-70.067-157-156.5S603.291 546 690 546s157 70.067 157 156.5S776.709 859 690 859z m-72-88a8 8 0 0 0-8 8h152a8 8 0 0 0 8-8H618z m80-56v-32.8c18.258-3.706 32-19.848 32-39.2 0-22.091-17.909-40-40-40s-40 17.909-40 40c0 19.352 13.742 35.494 32 39.2V715h-40c-8.837 0-16 7.163-16 16v32h112c8.837 0 16-7.163 16-16v-32h-56z" p-id="2271" fill="#1296db"></path></svg>
              </yhm-manager-td>
              <yhm-manager-td  :value="item.contractName"></yhm-manager-td>
              <yhm-manager-td-date :value="item.signedDate"></yhm-manager-td-date>
              <yhm-manager-td-date :value="item.maturityDate" ></yhm-manager-td-date>
              <yhm-manager-td :value="item.otherSideName" ></yhm-manager-td>
              <yhm-manager-td-img :value="item.maturityDay+'天'" width="20" height="30" position="right" v-show="item.maturityDay>60" num="1"></yhm-manager-td-img>
              <yhm-manager-td-img :value="item.maturityDay+'天'" width="20" height="30" position="right" v-show="item.maturityDay<=60& item.maturityDay>30" num="2"></yhm-manager-td-img>
              <yhm-manager-td-img :value="item.maturityDay+'天'" width="20" height="30" position="right" v-show="item.maturityDay<=30& item.maturityDay>15" num="3"></yhm-manager-td-img>
              <yhm-manager-td-img :value="item.maturityDay+'天'" width="20" height="30" position="right" v-show="item.maturityDay<=15" num="4"></yhm-manager-td-img>

            </tr>
          </template>
          <template #empty>
            <span class="m_listNoData" v-show="empty">暂时没有数据</span>
          </template>
          <template #pager>
            <yhm-pagination :pager="pager"  :is-select-info="false" @initData="contractView(false)"></yhm-pagination>
          </template>
        </yhm-view-tab-list>
      </template>
    </yhm-view-tab>
    <yhm-formoperate :createName="createName" :insertDate="insertDate" :updateName="updateName" :updateDate="updateDate">
      <template #btn>
        <yhm-commonbutton value="编辑" v-if="isInsuredUnit" style="margin-right: 20px" icon="i-edit" :flicker="false" @call="editBtn()"></yhm-commonbutton> </template>
    </yhm-formoperate>
  </div>
</template>

<script>
  import { formatDate} from '@/assets/common.js'
  import { viewmixin } from '@/assets/view.js'
  export default {
    name: 'insuranceUnitView',
    mixins: [viewmixin],
    data(){
      return {
        id:'',
        empty:true,
        tabState: [{ select: true },{ select: false},{ select: false},{ select: false}],
        monthList:['一月','二月','三月','四月','五月','六月','七月','八月','九月','十月','十一月','十二月'],
        shortName:'',
        unit:'',
        incomeUnit:'',
        incomeUnitID:'',
        tripartiteUnit:'',
        details:[],
        excelList:[],
        createName:'',
        insertDate:'',
        updateName:'',
        updateDate:'',
        billingTypeVal: '',
        commercialVal: '',
        isInsuredUnit:true,
        monthsDate:'',
        contractList:[],
        listPages:[],
        categoryList:[],
        category:'',
      }
    },
    methods:{
      afterClick(item){
        if(item.money==item.useMoney){
          this.$dialog.OpenWindow({
            width: '1050',
            height: '390',
            title: '修改对账单总金额',
            url: '/waveForm?id=' + item.id,
            closeCallBack: (data) => {
              if (data) {
                this.filesView()
              }
            }
          })
        }else{
          this.$dialog.alert({
            tipValue:'已经对账后不能修改',
            alertImg: 'warn',
            width:'300'
          })
        }
      },
      tableTipHideEvent(){
        this.tableTip = true
      },

      addOpenInvoice(item){
        this.$dialog.OpenWindow({
          width: '1050',
          height: '790',
          title: '添加开票申请信息',
          url: '/openInvoiceForm?isAdd=true&ownerID=' + item.id + '&ownerCategory=3',
          closeCallBack: (data) => {
            if (data) {
              this.initPageData(false)
            }
          }
        })
      },
      viewClick(item){
        window.open('/UploadFile/Invoice/'+item.invoiceStorename)
      },
      selectBankView(item){
        this.$dialog.OpenWindow({
          width: '1050',
          height: '750',
          title: '查看'+this.unit+'回款对应单',
          url: '/selectBankView?ownerID='+item.id,
          closeCallBack: (data)=>{
            if(data){
              this.filesView()
            }
          }
        })
      },
      listPage(){
        let list = this.details.concat()
        this.pager.total=this.details.length
        this.pager.pageSize=5
        let a=(this.pager.pageIndex-1)*this.pager.pageSize
        let arr=[]
        arr=list.splice(a,this.pager.pageSize)
        this.listPages=arr

        // pager:{total:0,pageSize:15,pageIndex:1,selectCount:0}
      },
      contractEvent(item){
        window.open('/UploadFile/' + item.tag + '/' + item.storeName)
      },
      contractView(){
        let params={
          id:this.id,
          pageSize: this.pager.pageSize, // 单页数据条数
          pageIndex: this.pager.pageIndex, // 当前页码
          orderColumn:'maturityDay',
          order:'desc'
        }
        this.ajaxJson({
          url: '/Basic/getContract',
          data: params,
          call: (data) => {
            this.contractList=data.content
            this.pager.total = data.count
          }
        })
      },

      bankView(item){
        if (item.state==1){

        }else {
          this.$dialog.OpenWindow({
            width: '1050',
            height: '750',
            title: '查看'+this.unit+'回款对应单',
            url: '/insuranceBankDetailForm?unitID='+this.incomeUnitID+'&ownerID='+item.id+'&money='+item.useMoney,
            closeCallBack: (data)=>{
              if(data){
                this.filesView()
              }
            }
          })
        }
        // let params={
        //   unitID:this.incomeUnitID
        // }
        // this.ajaxJson({
        //   url: '/Basic/UnitInBankAll',
        //   data: params,
        //   call: (data) => {
        //     console.log(  data)
        //   }
        // })
      },
      downloadEvent(item){
        window.open('/UploadFile/' + item.tag + '/' + item.storeName)
      },
      filesView(){
        let params={
          id:this.id,
          pageSize: this.pager.pageSize, // 单页数据条数
          pageIndex: this.pager.pageIndex, // 当前页码
        }
        this.ajaxJson({
          url: '/Basic/UnitInGetFiles',
          data: params,
          call: (data) => {

            this.excelList=data.content
            this.pager.total = data.count
          }
        })

      },
      colorEvent(item,index){
        let result = ""
        let js = 'result = item.month' + (index+1)
        eval(js)
        return result
      },
      getLastDay(time){
        let current=new Date(time);
        let currentMonth=current.getMonth();
        let nextMonth=++currentMonth;
        let nextMonthDayOne =new Date(current.getFullYear(),nextMonth,1);
        let minusDate=1000*60*60*24;
        return new Date(nextMonthDayOne.getTime()-minusDate);
      },
      excelViewClick(item){
        this.$dialog.OpenWindow({
          width: '1050',
          height: '750',
          title: '查看'+this.unit+'回款对应单',
          url: '/insuranceUnitUploadView?id=' + this.id+'&monthsDate='+item.monthsDate.slice(0,7)+'&endDate='+item.endDate.slice(0,10)+'&unitID='+this.unitID,
          closeCallBack: (data)=>{
            if(data){
              this.initPageData(false)
            }
          }
        })
      },
      listView(item,index){
        if(this.colorEvent(item,index)==1){
          let num=index + 1
          if (num<10){
            num='0'+num
          }
          this.monthsDate=item.year+'-'+num
          let dateTime=item.year+'-'+num+'-01'
          let lastDay =formatDate(this.getLastDay(dateTime));

          this.$dialog.OpenWindow({
            width: '1050',
            height: '750',
            title: '查看'+this.unit+'回款对应单',
            url: '/insuranceUnitUploadView?id=' + this.id+'&monthsDate='+this.monthsDate+'&endDate='+lastDay+'&unitID='+this.unitID,
            closeCallBack: (data)=>{
              if(data){
                this.initPageData(false)
              }
            }
          })

        }
      },
      billView(){
        let params={
          id:this.id
        }
        this.ajaxJson({
          url: '/Basic/UnitInGetExcelAll',
          data: params,
          call: (data) => {
            this.excelList=data.content
          }
        })
      },
      editBtn(){
        this.$dialog.OpenWindow({
          width: '1050',
          height: '700',
          title: '编辑保险信息',
          url: '/insuranceUnitForm?id=' + this.id,
          closeCallBack: (data)=>{
            if(data){
              this.$dialog.setReturnValue(this.id)
              this.$dialog.refresh()
            }
          }
        })
      },

    },
    created () {
      this.setQuery2Value('isCustomer')
      let arr = []
      for(let i in this.excelList){
        arr.push(this.ex)
      }
      if(this.isCustomer === '0'){
        this.isInsuredUnit = false
      }

      let params = {
        id: this.id,
      }
      this.ajaxJson({
        url: '/Basic/getUnitInsurance',
        data: params,
        call: (data)=>{
          this.shortName=data.shortName
          this.unitID=data.unitID
          this.unit=data.unit
          this.incomeUnit=data.incomeUnit
          this.incomeUnitID=data.incomeUnitID
          this.tripartiteUnitID=data.tripartiteUnitID
          this.tripartiteUnit=data.tripartiteUnit
          this.commercialVal=data.commercialVal
          this.billingTypeVal=data.billingTypeVal
          this.createName=data.createName
          this.insertDate=data.insertDate
          this.updateName=data.updateName
          this.updateDate=data.updateDate
          this.details=data.details
          this.categoryList=data.categoryPsd.list
          this.category=data.category
          this.listPage()
          if (this.details.length === 0){
            this.empty=true
          }else {
            this.empty=false
          }


        }
      })
    }
  }
</script>

<style lang="less" scoped>
.table_tr{
  font: bold 14px/0.75em Arial,'Times New Roman','Microsoft YaHei',SimHei;
  color: #fff;
  height: 34px;
  padding: 0 3px;
  vertical-align: middle;
  line-height: 32px;
  background: -webkit-gradient(linear, left bottom, left top, from(#49a9ea), to(#66c0ff) );
  background: linear-gradient(0deg, #49a9ea, #66c0ff );
  white-space: nowrap;
  cursor: pointer;
  overflow: hidden;
  position: relative;
}
.table_tr:before{
  display: inline-block;
  content: '';
  position: absolute;
  right: 0;
  top: 8px;
  height: 18px;
  border-right: 1px solid #fff;
}
.table_tr1{
  width: 60px;
  text-align: center;
}
.table_tr2{
  text-align: center;
  flex: 1;
}
.tbody_flex{
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 5px;
}
.tbody_td1{
  width: 60px;
  height: 50px;
  font-size: 15px;
  line-height: 50px;
  text-align: center;
  color: #fff;
  background-color: #49a9ea;
}
.tbody_td2{
  width: 100%;
  height: 50px;
  display: flex;
  align-items: center;
  padding: 0 20px;
  box-sizing: border-box;
  background-color: #daecf8;
}
.tbody_td2 span{
  display: inline-block;
  width: 55px;
}
.tbody_td2 span:nth-child(n){
  margin-left: 15px;
}
.tbody_td2_red{
  cursor: pointer;
  color: red;
}
</style>
