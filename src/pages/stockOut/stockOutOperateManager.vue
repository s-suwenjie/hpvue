<template>
  <div>
    <yhm-managerpage>
      <!--      导航条      -->
      <template #navigation>业务管理&nbsp;&gt;&nbsp;库存管理&nbsp;&gt;&nbsp;出库管理</template>
      <!--      操作区      -->
      <template #operate>
        <yhm-commonbutton :value="choose?'收起筛选':'展开筛选'" :icon="choose?'btnUp':'btnDown'" @call="switchChoose()"></yhm-commonbutton>
        <yhm-managersearch :value="searchStr" :history="shortcutSearchContent" id="searchStr" @call="initPageData"></yhm-managersearch>
      </template>
      <!--   筛选区   -->
      <template #choose>
        <div v-show="choose" class="buttonBody mptZero">
          <yhm-radiofilter @initData="initChoose('categoryUnit')" title="商品类型"  :content="listCategory"></yhm-radiofilter>
          <yhm-radiofilter @initData="initChoose('applicableModels')" title="规格型号" :content="applicableModelsPsd"></yhm-radiofilter>
          <yhm-radiofilter all="0" @initData="initChoose('state')" title="状态" :content="state"></yhm-radiofilter>
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
        <yhm-managerth style="width: 170px;" title="出库编号"></yhm-managerth>
        <yhm-managerth style="width: 110px" title="总金额"></yhm-managerth>
        <yhm-managerth title="操作"></yhm-managerth>
      </template>
      <!--      数据表单       -->
      <template #listBody >
        <tr :class="[{twinkleBg: item.id==lastData},{InterlacBg:index%2!=0}]" v-for="(item,index) in content" :key="index">
          <yhm-manager-td-checkbox :value="item" :persons="cont"></yhm-manager-td-checkbox>
          <yhm-manager-td-look @click="listView(item)"></yhm-manager-td-look>
          <yhm-manager-td :value="item.createNameStr"></yhm-manager-td>
          <yhm-manager-td-date :value="item.insertDate.slice(0,10)  "></yhm-manager-td-date>
          <yhm-manager-td :value="item.category"></yhm-manager-td>
          <yhm-manager-td :value="item.applicableModels"></yhm-manager-td>
          <yhm-manager-td :value="item.code"></yhm-manager-td>
          <yhm-manager-td-money :value="item.totalStr+''"></yhm-manager-td-money>
<!--          <yhm-manager-td :value="'出库'" @click="ku(item)" :color="item.state == 2 ? 'rgba(0,0,0,0.4)' : '#333333'"></yhm-manager-td>-->
          <yhm-manager-td-operate>
            <yhm-manager-td-operate-button @click="printFund(item,'1')" :no-click="item.state == '2'?false:true"  value="出库" icon="i-btn-applicationSm" :color="item.state == '2'?'#49a9ea':'#333'"></yhm-manager-td-operate-button>
            <yhm-manager-td-operate-button @click="delFromList(item)" :no-click="item.state == '2'?false:true"  value="撤销"  :color="item.state == '1'?'red':'red'"></yhm-manager-td-operate-button>
           </yhm-manager-td-operate>
<!--          <yhm-manager-td-operate>-->
<!--            <yhm-manager-td-operate-delete :no-click="state!=='2'?true:false" @click="delFromList(item)"></yhm-manager-td-operate-delete>-->
<!--          </yhm-manager-td-operate>-->
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
    name: "stockOutOperateManager",
    mixins: [managermixin],
    data(){
      return{
        lastData:'1',
        people:'',
        one:'',
        cont:'',
        content:'',
        applicableModelsPsd:{
          value:'',
          list:[]
        },
        listCategory: {
          value: '',
          list: [],

        },
        state:{
          value:'3',
          list:[
            {
              code:'',
              img:'',
              num:'2',
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
              num:'3',
              showName:'全部'
            },
          ]
        },
      }
    },
    created() {

    },
    methods:{
      delFromList(item){
        let params = {
          id:item.id
        }
        this.$dialog.confirm({
          width: 300,
          tipValue: ' 确认取消?',
          btnValueOk: '确定',
          alertImg: 'warn',
          okCallBack: (data) => {
            let params = {
              id: item.id,
              state: '2'
            }
            this.ajaxJson({
              url: '/stock/stockoutroll/undo',
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
      },
      ku(item){
          if(item.state != 2){
            this.$dialog.confirm({
              width: 300,
              tipValue: ' 确认此操作?',
              btnValueOk: '确定',
              alertImg: 'warn',
              okCallBack: (data) => {
                let params = {
                  id: item.id,
                  state: '2'
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
      //-----------------初始化信息
      initPageData (initValue) {
        let params = {}
        if (initValue) {
          // 页面初始化是需要的参数
          params = {
            stateStr:'2'
          }
        } else {
          // 页面非初始化时需要的参数
          params = {
            stateStr:'2',
            category: this.listCategory.value,
            applicableModels:this.applicableModelsPsd.value,
            init: false,
            searchStr:this.searchStr,
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

            for(let i in data.content){
              this.content[i].category=data.categoryPsd.list[this.content[i].category].showName
              this.content[i].applicableModels=data.applicableModels.list[this.content[i].applicableModels].showName
            }
          },
          init: (data) => {
            // 初始化时需要执行的代码
            // 这边初始化筛选信息
            // this.inntfrom()
            this.applicableModelsPsd.list = data.applicableModels.list
            this.applicableModelsPsd.value = data.applicableModels.value
            this.listCategory.list=data.categoryPsd.list
            this.listCategory.value=data.categoryPsd.value
          }
        })
      },
    //  ---------------
      inntfrom(){
        this.ajaxJson({
          url: '/stock/stockout/initForm',
          call: (data) => {
            this.applicableModelsPsd.list = data.applicableModels.list
            this.applicableModelsPsd.value = data.applicableModels.value
            this.listCategory.list=data.categoryPsd.list
            this.listCategory.value=data.categoryPsd.value

          }
        })

      },
    //  ------------点击查看---------
      listView(item){
          this.$dialog.OpenWindow({
            width: 1050,
            height: 520,
            url:'/stockOutView?id=' + item.id ,
            title:'查看出库信息'
          })
      },
      printFund(item,state){
        this.$dialog.OpenWindow({
          width: '1050',
          height: '750',
          url:'/stockOutOperateForm?id='+item.id,
          title:'出库信息',
          closeCallBack:(data) =>{
            if (data) {
              this.initPageData(false)
            }
          }
        })
      },
    }
  }
</script>

<style scoped>

</style>
