<template>
   <div>
     <yhm-managerpage category="1" :total-table="true">
       <!--导航条-->

       <template #navigationTab>
         <router-link class="menuTabDiv" :to="{path:'/home/taxManager'}">税号（发票抬头）</router-link>
         <router-link class="menuTabDiv menuTabActive" :to="{path:'/home/invoiceRiseManager'}">关联审批中</router-link>
       </template>
       <template #operate>
         <!-- 操作区-->
         <yhm-commonbutton value="添加" icon="btnAdd" :flicker="true" @call="add" category="one"></yhm-commonbutton>
         <yhm-commonbutton :value="choose?'收起筛选':'展开筛选'" :icon="choose?'btnUp':'btnDown'" @call="switchChoose()"></yhm-commonbutton>
         <yhm-managersearch :value="searchStr" :history="shortcutSearchContent" id="searchStr" @call="initChoose"></yhm-managersearch>
         <yhm-radiofilter @initData="initChoose('state')" title="审批状态" all="0" :content="statePsd"></yhm-radiofilter>
       </template>
       <template #choose>
         <div v-show="choose" class="buttonBody mptZero">
           <yhm-radiofilter @initData="initChoose('invoiceType')" title="发票类型" :content="invoiceTypePsd"></yhm-radiofilter>
           <yhm-radiofilter @initData="initChoose('isReceivables')" title="是否收款" :content="isReceivablesPsd"></yhm-radiofilter>
         </div>
       </template>


       <template #listHead>
         <yhm-managerth style="width: 40px;" title="选择" ></yhm-managerth>
         <yhm-managerth style="width: 40px;" title="查看" ></yhm-managerth>
         <yhm-managerth style="width: 180px;" title="主公司"></yhm-managerth>
         <yhm-managerth style="width: 180px;" title="关联公司 " ></yhm-managerth>
         <yhm-managerth style="width: 120px;" title="关联公司税号" ></yhm-managerth>
         <yhm-managerth style="width: 200px;" title="关联公司地址" ></yhm-managerth>
         <yhm-managerth style="width: 130px;" title="关联公司手机号" ></yhm-managerth>
         <yhm-managerth style="width: 200px;" title="关联公司开户行" ></yhm-managerth>
         <yhm-managerth style="width: 130px;" title="关联公司账号" ></yhm-managerth>
         <yhm-managerth style="width: 130px;" title="状态" ></yhm-managerth>
         <yhm-managerth title="操作" ></yhm-managerth>
       </template>
       <!--      数据表单       -->
       <template #listBody >
         <tr :class="[{twinkleBg: item.id==lastData},{InterlacBg:index%2!=0}]" v-for="(item,index) in content" :key="index">
           <yhm-manager-td-checkbox :value="item" @call="check(selectValue,index)"></yhm-manager-td-checkbox>
           <yhm-manager-td-look @click="listView(item)"></yhm-manager-td-look>
           <yhm-manager-td :tip="true" :value="item.unit" @click="test(item)"></yhm-manager-td>
           <yhm-manager-td :tip="true" :value="item.otherUnit"></yhm-manager-td>
           <yhm-manager-td :tip="true" :value="item.otherTaxNumber"></yhm-manager-td>
           <yhm-manager-td :tip="true" :value="item.otherAddress"></yhm-manager-td>
           <yhm-manager-td :tip="true" :value="item.otherTel"></yhm-manager-td>
           <yhm-manager-td :tip="true" :value="item.otherBank"></yhm-manager-td>
           <yhm-manager-td :tip="true" :value="item.otherAccount"></yhm-manager-td>
           <yhm-manager-td-psd :value="item.state" :list="approvalStatePsd.list"></yhm-manager-td-psd>
           <yhm-manager-td-operate>
             <yhm-manager-td-operate-button v-show="item.state === '0'" @click="submit(item)" value="提交申请" icon="i-btn-applicationSm" color="#49a9ea"></yhm-manager-td-operate-button>
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
  import {managermixin} from '@/assets/manager.js'
  export default {
    name: 'invoiceRiseManager',
    mixins: [managermixin],
    data(){
      return{
        invoiceTypePsd:[],
        isReceivablesPsd:[],
        approvalStatePsd:[],
        state:'',
        statePsd:{
          value:'',
          list:[],
        }
      }
    },
    methods:{
      test(item){
        this.$dialog.OpenWindow({
          width: 1050,
          height: 800,
          url:'/SelectInvoiceRise?id='+item.id,
          title:'选择',
          closeCallBack:(data) =>{

          }
        })
      },
      submit(item){
        if(item.unit.indexOf(item.otherUnit)!=-1 || item.otherUnit.indexOf(item.unit)!=-1){
          this.ajaxJson({
            url: '/finance/invoiceRise/updateFinish',
            data: {
              id: item.id,
              unitID:item.unitID,
              isFinish:'3',
              state:'99',
            },
            call: (data) => {
              if (data.type == 0) {
                this.$dialog.alert({
                  tipValue: "无需审批，",
                  closeCallBack: () => {
                    this.initPageData(false)
                  }
                })
              }else{
                this.$dialog.alert({
                  alertImg: 'error',
                  tipValue: data.message,
                  closeCallBack: () => {
                  }
                })
              }
            }
          })
        }else{
          this.ajaxJson({
            url: '/finance/invoicUnitWhitelist/isByUnitID',
            data: {
              id: item.unitID,
            },
            call: (data) => {
              if(data==0){
                this.ajaxJson({
                  url: '/sys/approve/submit',
                  data: {
                    id:item.id,      //快递单ID
                    category:5,   //审批类型
                    personID:item.personID,//王佳佳
                    unitID:item.company, //申请人所属单位ID
                    location:0
                  },
                  call: (data) => {
                    if(data.type==0){
                      this.$dialog.alert({
                        tipValue: data.message,
                        closeCallBack: () => {
                          this.initPageData(false)
                        }
                      })
                    }else{
                      this.$dialog.alert({
                        alertImg: 'error',
                        tipValue: data.message,
                        closeCallBack: () => {
                        }
                      })
                    }
                  }
                })
              }else{
                this.ajaxJson({
                  url: '/finance/invoiceRise/updateFinish',
                  data: {
                    id: item.id,
                    isFinish:'3',
                    state:'99',
                  },
                  call: (data) => {
                    if (data.type == 0) {
                      this.$dialog.alert({
                        tipValue: "提交成功",
                        closeCallBack: () => {
                          this.initPageData(false)
                        }
                      })
                    }else{
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
            }
          })
        }
      },
      listView(item){
        this.$dialog.OpenWindow({
          width: 1050,
          height: 800,
          url:'/invoiceRiseView?id='+item.id,
          title:'查看详情',
          closeCallBack:(data) =>{

          }
        })
      },
      add(){
        this.$dialog.OpenWindow({
          width: 1050,
          height: 820,
          url:'/invoiceRiseForm',
          title:'添加税号信息',
          closeCallBack:(data) =>{
            if(data){
              this.initPageData(false)
            }
          }
        })
      },

      initPageData (initValue) {
        let params = {}
        if (initValue) {
          // 页面初始化是需要的参数
          params = {
            init:true,
          }
        } else {
          // 页面非初始化时需要的参数
          params = {
            invoiceType:this.invoiceTypePsd.value,
            isReceivables:this.isReceivablesPsd.value,
            state:this.statePsd.value
          }
        }
        this.init({
          initValue: initValue,
          url:'/finance/invoiceRise/getManager',
          data: params,
          all: (data) => {
            // 不管是不是初始化都需要执行的代码

          },
          init: (data) => {
            this.invoiceTypePsd=data.invoiceTypePsd
            this.isReceivablesPsd=data.isReceivablesPsd
            this.approvalStatePsd=data.approvalStatePsd
            this.statePsd=data.statePsd
          }
        })
      },
    }
  }
</script>

<style scoped>

</style>
