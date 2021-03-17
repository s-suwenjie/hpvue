<template>
  <div>
    <yhm-managerpage category="1">
      <!--导航条-->
      <template #navigationTab>
        <router-link class="menuTabDiv menuTabActive" :to="{path:'/home/courierCompanyManager'}">快递公司</router-link>
      </template>
      <!--操作区-->
      <template #operate>
        <yhm-commonbutton  value="添加" icon="btnAdd" :flicker="true" @call="add()"></yhm-commonbutton>
        <!--<yhm-commonbutton  value="储值卡选择列表" icon="btnAdd" :flicker="true" @call="test()"></yhm-commonbutton>-->
        <!--<yhm-commonbutton  value="月结账号选择列表" icon="btnAdd" :flicker="true" @call="test2()"></yhm-commonbutton>-->
        <yhm-managersearch :value="searchStr" :history="shortcutSearchContent" id="searchStr" @call="initChoose()"></yhm-managersearch>
        <yhm-radiofilter :before="expressCompanyBefore" @initData="initChoose('expressCompany')" title="快递公司" :content="listExpressCompany"></yhm-radiofilter>
        <!--<yhm-commonbutton  value="测试" icon="btnAdd" :flicker="true" @call="test()"></yhm-commonbutton>-->
      </template>
      <!--数据表头-->
      <template #listHead>
        <yhm-managerth style="width: 40px;" title="选择"></yhm-managerth>
        <yhm-managerth style="width: 40px;" title="查看"></yhm-managerth>
        <yhm-managerth title="名称" value="unitID"></yhm-managerth>
        <yhm-managerth title="付款公司" ></yhm-managerth>
        <!--<yhm-managerth title="编码" value="unitCoding"></yhm-managerth>-->
        <yhm-managerth title="电子下单" value="orderOnline"></yhm-managerth>
        <yhm-managerth title="预约取件" value="reservation"></yhm-managerth>
        <yhm-managerth title="是否默认项" value="defaults"></yhm-managerth>
        <yhm-managerth title="查单网址" value="inquiryURL"></yhm-managerth>
        <yhm-managerth title="查单电话" value="inquiryPhone"></yhm-managerth>
        <yhm-managerth title="导入对账单" ></yhm-managerth>
        <yhm-managerth style="width: 200px;" title="操作"></yhm-managerth>
      </template>
      <!--数据明细-->
      <template #listBody>
        <tr :class="[{twinkleBg: item.id==lastData},{InterlacBg:index%2!=0}]" v-for="(item,index) in content" :key="index">
          <yhm-manager-td-checkbox :value="item"></yhm-manager-td-checkbox>
          <yhm-manager-td-look @click="listView(item)"></yhm-manager-td-look>
          <yhm-manager-td :value="item.unitID"></yhm-manager-td>
          <yhm-manager-td :value="item.paymentUnit"></yhm-manager-td>
          <!--<yhm-manager-td :value="item.unitCoding"></yhm-manager-td>-->
          <yhm-manager-td-psd :value="item.orderOnline" :list="listOrderOnline.list"></yhm-manager-td-psd>
          <yhm-manager-td-psd :value="item.reservation" :list="listReservation.list" ></yhm-manager-td-psd>
          <yhm-manager-td-psd :value="item.defaults" :list="listDefaults.list"></yhm-manager-td-psd>
          <yhm-manager-td @click="inquiryURLClick(item)" :value="item.inquiryURL"></yhm-manager-td>
          <yhm-manager-td :value="item.inquiryPhone"></yhm-manager-td>
          <yhm-manager-td-operate>
            <yhm-manager-td-operate-button  @click="uploadDefault(item)" value="导入对账单" icon="i-export" color="#ff0000"></yhm-manager-td-operate-button>

          </yhm-manager-td-operate>
          <yhm-manager-td-operate>
            <yhm-manager-td-operate-button v-if="item.defaults==0"   @click="selectDefault(item)" value="设置为默认选项" icon="icon-longtap" color="#06E23A"></yhm-manager-td-operate-button>
            <yhm-manager-td-operate-button v-else   @click="selectDefault(item)" value="设置为常规选项" icon="icon-longtap" color="#FF0000"></yhm-manager-td-operate-button>
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
    name: 'courierCompanyManager',
    mixins: [managermixin],
    data(){
      return{
        expressCompanyBefore:'0',
        listOrderOnline:{
          value:"",
          list:[]
        },
        listReservation:{
          value:"",
          list:[]
        },
        listDefaults:{
          value:"",
          list:[]
        },
        listExpressCompany:{
          value:"",
          list:[]
        },
      }
    },
    methods:{
      // test2(){
      //   this.$dialog.OpenWindow({
      //   width: '1050',
      //   height: '750',
      //   url: '/selectMonthlyAccount?id=B87BCAA4-2383-41DE-9A6C-4D857E6E9F15',
      //   title: '查看快递信息',
      //   closeCallBack: (data) => {
      //     if (data) {
      //       this.lastData = data
      //       this.initPageData(false)
      //       /*false->非初始化=>!import  true->初始化*/
      //     }
      //   }
      // })
      // },
      // test(){
      //   this.$dialog.OpenWindow({
      //     width: '1050',
      //     height: '750',
      //     url: '/selectStoredCard?id=1FFC4F07-7AAC-440F-AD3B-A9B6D4B3662E',
      //     title: '查看快递信息',
      //     closeCallBack: (data) => {
      //       if (data) {
      //         this.lastData = data
      //         this.initPageData(false)
      //         /*false->非初始化=>!import  true->初始化*/
      //       }
      //     }
      //   })
      // },
      // test(){
      //   this.$dialog.OpenWindow({
      //     width: '1050',
      //     height: '750',
      //     title: '选择快递对账单',
      //     url: '/selectExpressNot?paymentUnitID=E695050F-2307-4C59-BB6F-65289ADEC8BA',
      //     closeCallBack: (data)=>{
      //       if(data){
      //         this.initPageData(false)
      //       }
      //     }
      //   })
      // },
      uploadDefault(item){
        this.$dialog.OpenWindow({
          width: '1050',
          height: '750',
          title: '导入快递对账单',
          url: '/expressReconciliationForm?ownerID=' + item.id+'&companyID='+item.id,
          closeCallBack: (data)=>{
            if(data){
              this.initPageData(false)
            }
          }
        })
      },
      inquiryURLClick(item){
        window.open('http://'+item.inquiryURL)
      },
      selectDefault(item){
        let aa=0
        if(item.defaults==0){
          aa=1
        }else if (item.defaults==1){
          aa=0
        }
        this.$dialog.confirm({
          width: 300,
          tipValue: '是否修改?',
          btnValueOk: '确定',
          alertImg: 'warn',
          okCallBack: (data) => {
            let params = {
              id: item.id,
              defaults:aa
            }
            this.ajaxJson({
              url: '/dailyoffice/expressCompany/updateDefault',
              data: params,
              call: (data) => {
                if (data.type == '0') {
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
      },
      listView(item){
        this.$dialog.OpenWindow({
          width: '1050',
          height: '750',
          url: '/courierCompanyView?id='+item.id,
          title: '查看快递信息',
          closeCallBack: (data) => {
            if (data) {
              this.lastData = data
              // this.initPageData(false)
              /*false->非初始化=>!import  true->初始化*/
            }
          }
        })
      },
      //添加
      add () {
        this.$dialog.OpenWindow({
          width: '1050',
          height: '750',
          url: '/courierCompanyForm',
          title: '添加快递信息',
          closeCallBack: (data) => {
            if (data) {
              this.lastData = data
              this.initPageData(false)
              /*false->非初始化=>!import  true->初始化*/
            }
          }
        })
      },
      // 筛选事件
      initChoose (op) {
        if (op === 'expressCompany') {
          this.selectValue = []
        }
        this.pager.pageIndex = 1
        this.initPageData(false)
      },
      initPageData (initValue) {
        let params = {}

        if (initValue) {
          params = {
            expressCompany:this.listExpressCompany.value,
          }
        } else {
          params = {
            expressCompany:this.listExpressCompany.value,
          }
        }
        this.init({
          initValue:initValue,
          url: '/dailyoffice/expressCompany/getManager',
          data:params,
          all:(data) =>{
            //不管是不是初始化都需要执行的代码

          },
          init:(data)=>{
            //初始化时需要执行的代码
            this.listOrderOnline = data.orderOnlinePsd
            this.listReservation = data.reservationPsd
            this.listDefaults = data.defaultsPsd
            this.listExpressCompany=data.expressCompanyPsd

          }
        })
      },
    },



  }
</script>

<style scoped>

</style>
