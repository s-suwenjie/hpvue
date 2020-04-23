<template>
    <div>
      <yhm-managerpage >
        <!--导航条-->
        <template #navigation>个人办公&nbsp;&gt;&nbsp;个人办公&nbsp;&gt;&nbsp;电子发票</template>
        <template #operate>
          <!--操作区-->
          <yhm-commonbutton value="添加" icon="btnAdd" :flicker="true" @call="add()"></yhm-commonbutton>
          <yhm-managersearch :value="searchStr" :history="shortcutSearchContent" id="searchStr" @call="initData"></yhm-managersearch>
          <yhm-commonbutton value="去报销" icon="i-btn-go" @call="gotoReimburseTotal()"></yhm-commonbutton>
<!--          <yhm-commonbutton value="view" icon="btnAdd" @call="view()"></yhm-commonbutton>-->
<!--          <yhm-commonbutton value="viewImage" icon="btnAdd" @call="viewImage()"></yhm-commonbutton>-->
        </template>
        <!--数据表头-->
        <template #listHead>
          <yhm-managerth style="width: 38px;" title="选择"></yhm-managerth>
          <yhm-managerth style="width: 38px;" title="查看"></yhm-managerth>
          <yhm-managerth style="width: 200px;" title="所属单位" value="selfNameID"></yhm-managerth>
          <yhm-managerth style="width: 120px;" title="发票代码" value="code"></yhm-managerth>
          <yhm-managerth style="width: 120px;" title="发票号码" value="num"></yhm-managerth>
          <yhm-managerth style="width: 120px;" title="开票日期" value="openDate"></yhm-managerth>
          <yhm-managerth style="width: 100px;" title="发票金额" value="totalMoney"></yhm-managerth>
          <yhm-managerth style="width: 200px;" title="开票单位" value="otherName"></yhm-managerth>
          <yhm-managerth style="width: 120px;" title="标签" value="tag"></yhm-managerth>
          <yhm-managerth style="width: 80px;" title="发票照片"></yhm-managerth>
          <yhm-managerth style="width: 90px;" title="发票状态"></yhm-managerth>
          <yhm-managerth title="操作"></yhm-managerth>
        </template>
        <!--数据明细-->
        <template #listBody>
          <tr v-for="(item,index) in content" :key="index" :class="[{twinkleBg: item.id==lastData},{InterlacBg:index%2!=0}]">
            <yhm-manager-td-checkbox :value="item"></yhm-manager-td-checkbox>
            <yhm-manager-td-look @click="add(item.id)"></yhm-manager-td-look>
            <yhm-manager-td :value="item.selfName === null? '' : item.selfName"></yhm-manager-td>
            <yhm-manager-td-center :value="item.code"></yhm-manager-td-center>
            <yhm-manager-td-center :value="item.num"></yhm-manager-td-center>
            <yhm-manager-td-date :value="item.openDate"></yhm-manager-td-date>
            <yhm-manager-td-money :value="item.totalMoney"></yhm-manager-td-money>
            <yhm-manager-td :value="item.otherName"></yhm-manager-td>
            <yhm-manager-td :value="item.tag"></yhm-manager-td>
            <yhm-manager-td-image :tip="true" left="-750" width="900" height="550" :value="item.imgUrl" tag="ElectronicInvoice"></yhm-manager-td-image>
            <yhm-manager-td-psd @click="relationID(item)" :value="item.state" :list="stateItems"></yhm-manager-td-psd>
            <yhm-manager-td-operate>
              <yhm-manager-td-operate-button :no-click="item.state !== '0'" @click="transferInvoice(item)" value="转让" icon="i-btn-refresh" color="#49a9ea"></yhm-manager-td-operate-button>
              <yhm-manager-td-operate-button :no-click="item.state !== '0'" @click="gotoReimburse(item.id)" value="我要报销" icon="i-btn-go" color="#AA12CA" fs="10"></yhm-manager-td-operate-button>
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
  import {accAdd,accMul} from '@/assets/common.js'
  import { managermixin } from '@/assets/manager.js'
  export default {
    name: 'myElectronicInvoiceManager',
    mixins: [managermixin],
    data(){
      return{
        previewShow:false,
        previewImageUrl:'',
        stateItems:[],
        menuTabOn:'3',
        details:[
          {id:'1', name: '付款计划',path:'/home/myManager/paymentPlanManager'},
          {id:'2', name: '付款',path:'/home/myManager/paymentApplyManager'},
          {id:'3', name: '报销',path:'/home/myManager/reimbursementManager'},
          {id:'4', name: '电子发票',path:'/home/myManager/myElectronicInvoiceManager'},
        ],
      }
    },
    methods:{
      relationID(item){
        if(item.otherID!==''){
          if(item.otherCategory==='1'){
            this.$dialog.OpenWindow({
              width: '1050',
              height: '750',
              // url: '/paymentApplyFormView?id=' + item.id + '&state=-1&isFinish=1',
              url: '/paymentApplyFormView?id=' + item.otherID ,
              title: "查看付款申请信息",
              closeCallBack: () => {
              }
            })
          }else if(item.otherCategory==='2'){
            this.$dialog.OpenWindow({
              width: 1050,
              height: 690,
              url: '/reimbursementDetailFormView?id=' + item.otherID,
              title: '查看报销明细',
              closeCallBack: (data) => {

              }
            })
          }
        }
      },
      view(){
        this.$dialog.OpenWindow({
          width: 1050,
          height: 740,
          url:'/electronicInvoiceView?id=1',
          title:'查看'
        })
      },
      viewImage(){
        this.$dialog.OpenWindow({
          width: 1050,
          height: 640,
          url:'/handleImageForm?tag=payment&path=22.png',
          title:'查看'
        })
      },
      menuTab (index) {
        this.menuTabOn = index
      },

      //添加
      add (id) {
        // 默认设置页面标记是查看
        var isAdd = false
        // 默认设置页面标题为查看信息
        var title = '查看电子发票信息'
        if (!id) { // 当id不存在的时候
          // 设置id为空
          id = ''
          // 设置页面标题为添加信息
          title = '添加电子发票信息'
          // 设置页面标记为添加
          isAdd = true
        }
        this.$dialog.OpenWindow({
          width: 1050,
          height: 740,
          url:'/myElectronicInvoiceForm?id=' + id,
          title:title,
          closeCallBack:(data) =>{
            if (data) {
              if (isAdd) {
                this.lastData = data//接收子页面传的值
              }
              this.initPageData(false)
              /*false->非初始化=>!import  true->初始化*/
            }
          }
        })
      },
      //初始化
      initPageData (initValue) {
        let params = {}

        if (initValue) {
          params = {}
        } else {
          params = {}
        }
        this.init({
          initValue:initValue,
          url: '/Fin/getElectronicInvoiceMyManager',
          data:params,
          all:(data) =>{
            //不管是不是初始化都需要执行的代码
          },
          init:(data)=>{
            //初始化时需要执行的代码
            this.stateItems = data.stateItems
          }
        })
      },
      //单个去报销
      gotoReimburse(id){
        var arr = []
        arr.push(id)
        this.initReimburse(arr)
      },
      //顶部去报销
      gotoReimburseTotal(){
        if(this.selectValue.length === 0){
          this.$dialog.OpenWindow({
            title:'确认要报销的电子发票',
            url:'/myElectronicInvoiceReimburseManager',
            width:'1000',
            height:'600',
            closeCallBack:(result)=>{
              if(result){
                this.initReimburseOperate(result)
              }
            }
          })
        }
        else{
          var arr = []
          for(var i = 0; i < this.selectValue.length; i++){
            let key = this.selectValue[i]
            if(this.selectValue[key].state === '0'){
              arr.push(key)
            }
          }
          if(arr.length > 0) {
            if (arr.length === this.selectValue.length) {
              this.initReimburse(arr)
            } else {
              let count = accAdd(accMul(-1, arr.length), this.selectValue.length)
              this.$dialog.confirm({
                tipValue: '您选择的数据中有（' + count + '）条数据状态不在可报销，是否智能排除后去报销？',
                btnValueOk: '智能排除后去报销',
                width: '640',
                okCallBack: () => {
                  this.initReimburseOperate(arr)
                }
              })
            }
          }
          else{
            this.$dialog.alert({
              tipValue:'没有可报销的电子发票！！！',
              alertImg: 'warn',
              width:'350'
            })
          }
        }
      },
      //去报销
      initReimburse(arr){
        this.$dialog.confirm({
          tipValue:'确定要去报销吗？',
          btnValueOk:'确定报销',
          width:'300',
          okCallBack:() =>{
            this.initReimburseOperate(arr)
          }
        })
      },
      //具体操作
      initReimburseOperate(arr){
        this.ajaxJson({
          url:'/Com/saveSelectReduceArray',
          data:{
            array:arr
          },
          call:(data) =>{
            this.$dialog.OpenWindow({
              title:'添加报销信息',
              width:'1050',
              height:'620',
              url:'/reimbursementForm?relevanceID=' + data.message + '&relevanceType=3',
              closeCallBack:(result)=>{
                if(result){
                  this.initPageData(false)
                }
              }
            })
          }
        })
      },
      //转让
      transferInvoice(item){
        this.$dialog.OpenWindow({
          url:'/selectPerson?category=0&categoryBefore=1',
          width:'1050',
          height:'700',
          closeCallBack:(data) =>{
            this.$dialog.confirm({
              tipValue:'确定要将发票号码为（' + item.num + '）的发票转让给（' + data.name + '）吗？',
              width:'600',
              btnValueOk:'确定转让',
              okCallBack:() => {
                let params = {
                  personID:data.id,
                  id:item.id
                }
                this.ajaxJson({
                  url:'/Fin/transferElectronicInvoice',
                  data:params,
                  call:(result) => {
                    if (result.type === 0) {
                      this.$dialog.alert({
                        tipValue:result.message,
                        closeCallBack:() =>{
                          this.initPageData(false)
                        }
                      })
                    } else if (result.type === 2) {
                      this.$dialog.alert({
                        tipValue:result.message,
                        width:'550',
                        alertImg:'warn',
                        closeCallBack:() =>{
                          this.initPageData(false)
                        }
                      })
                    }
                  }
                })
              }
            })
          }
        })
      }
    }
  }
</script>

<style scoped lang="less">
.i-btn-go:before{
  font-size: 12px;
  padding-right: 4px;
}
</style>
