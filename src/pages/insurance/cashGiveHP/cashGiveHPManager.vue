<template>
    <div>
      <yhm-managerpage category="1">
        <!--导航条-->
        <template #navigationTab>
          <router-link class="menuTabDiv " :to="{path:'/home/unit/insuranceUnitManager'}">管理保险公司</router-link>
          <router-link class="menuTabDiv menuTabActive" :to="{path:'/home/cashGiveHP/cashGiveHPManager'}">保险给HP返利</router-link>
          <router-link class="menuTabDiv " :to="{path:'/home/vipRate/vipRateManager'}">特殊车型制定</router-link>
        </template>
        <!--操作区-->
        <template #operate>
          <yhm-commonbutton  value="添加" icon="btnAdd" :flicker="true" @call="add()"></yhm-commonbutton>
          <yhm-managersearch :value="searchStr" :history="shortcutSearchContent" id="searchStr" @call="initPageData(false)"></yhm-managersearch>
        </template>
        <!--筛选区-->

        <template #choose>
          <div v-show="choose" class="buttonBody mptZero">
<!--            <yhm-radiofilter :before="insuredUnitBefore" @initData="initChoose('insuredUnit')" title=" 保险公司" :content="listInsuredUnit"></yhm-radiofilter>-->
          </div>
        </template>
        <!--数据表头-->
        <template #listHead>
          <yhm-managerth   title="启用时间"></yhm-managerth>
          <yhm-managerth   title="商业险返利①"></yhm-managerth>
          <yhm-managerth   title="商业险返利②"></yhm-managerth>
          <yhm-managerth   title="交强险返利"></yhm-managerth>
          <yhm-managerth style="width: 100px;" title="删除"></yhm-managerth>
        </template>
        <!--数据明细-->
        <template #listBody>
          <tr :class="[{twinkleBg: item.id==lastData},{InterlacBg:index%2!=0}]" v-for="(item,index) in content" :key="index">
            <yhm-manager-td-date  :value="item.time"></yhm-manager-td-date>
            <yhm-manager-td  :value="item.commercialOne"></yhm-manager-td>
            <yhm-manager-td  :value="item.commercialTwo"></yhm-manager-td>
            <yhm-manager-td  :value="item.toPayHigh"></yhm-manager-td>
            <yhm-manager-td-operate>
              <yhm-manager-td-operate-button  @click="del(item)" value="删除" icon="delete" color="#FF0000"></yhm-manager-td-operate-button>
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
    name: 'cashGiveHPManager',
    mixins: [managermixin],
    data(){
      return{
      }
    },
    methods:{
      add(){
        this.$dialog.OpenWindow({
          width: '1050',
          height: '620',
          title: '添加保险公司返利公式',
          url: '/cashGiveHPForm',
          closeCallBack: (dataTwo)=>{
            if(dataTwo){
              this.initPageData()
            }
          }
        })
      },
      del(item){
        this.$dialog.confirm({
          width: 300,
          tipValue: '是否删除?',
          btnValueOk: '确定',
          alertImg: 'warn',
          okCallBack: (data) => {
            let params = {
              id: item.id,
            }
            this.ajaxJson({
              url: '/Insurance/CashGiveDel',
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
      initPageData (initValue) {
        let params = {}

        if (initValue) {
          params = {
          }
        } else {
          params = {
          }
        }
        this.init({
          initValue:initValue,
          url: '/Insurance/getCashGiveHPManager',
          data:params,
          all:(data) =>{
            //不管是不是初始化都需要执行的代码
            this.content=data.details
          },
          init:(data)=>{
            //初始化时需要执行的代码
            // 这边初始化筛选信息

          }
        })
      }
    }
  }
</script>

<style scoped>

</style>
