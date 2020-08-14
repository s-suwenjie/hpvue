<template>
  <div>
    <yhm-managerpage category="1">
      <!--导航条-->
      <template #navigationTab>
        <router-link class="menuTabDiv menuTabActive" :to="{path:'/home/promotions/promotionsManager'}">优惠活动</router-link>
     </template>

      <!--操作区-->
      <template #operate>
        <yhm-commonbutton value="添加" icon="btnAdd" :flicker="true" @call="add()"></yhm-commonbutton>
        <!--<yhm-commonbutton :value="choose?'收起筛选':'展开筛选'" :icon="choose?'btnUp':'btnDown'" @call="switchChoose()"></yhm-commonbutton>-->
        <yhm-managersearch :value="searchStr" :history="shortcutSearchContent" id="searchStr" @call="initData"></yhm-managersearch>
        <yhm-radiofilter :before="insuredUnitBefore" @initData="initChoose('brand')" title="优惠车型" :content="listBrand"></yhm-radiofilter>
        <yhm-radiofilter :before="insuredUnitBefore" @initData="initChoose('enable')" title="状态" :content="listEnable"></yhm-radiofilter>
      </template>

      <!--数据表头-->
      <template #listHead>
        <yhm-managerth style="width: 40px;" title="选择"></yhm-managerth>
        <yhm-managerth style="width: 40px;" title="查看"></yhm-managerth>
        <yhm-managerth   title="别名" value="name"></yhm-managerth>
        <yhm-managerth   title="品牌"></yhm-managerth>
        <yhm-managerth   title="保险公司" value="project"></yhm-managerth>
        <yhm-managerth style="width: 200px"   title="活动时候正在进行"  value="enableVal"></yhm-managerth>
        <yhm-managerth   title="启用日期" value="startDate"></yhm-managerth>
        <yhm-managerth   title="结束日期" value="endDate"></yhm-managerth>
        <yhm-managerth   title="优惠额度" value="amount"></yhm-managerth>
        <yhm-managerth   title="赠送信息" value="discount"></yhm-managerth>

        <yhm-managerth style="width:160px;" title="操作"></yhm-managerth>
      </template>

      <!--数据明细-->
      <template #listBody>
        <tr :class="[{twinkleBg: item.id==lastData},{InterlacBg:index%2!=0}]" v-for="(item,index) in content" :key="index">
          <yhm-manager-td-checkbox :value="item"></yhm-manager-td-checkbox>
          <yhm-manager-td-look @click="listView(item)"></yhm-manager-td-look>
          <yhm-manager-td :value="item.name"></yhm-manager-td>
          <yhm-manager-td :value="item.brandVal"></yhm-manager-td>
          <yhm-manager-td :value="item.project"></yhm-manager-td>
          <yhm-manager-td-center :value="item.enableVal"></yhm-manager-td-center>
          <yhm-manager-td-date :value="item.startDate"></yhm-manager-td-date>
          <yhm-manager-td-date :value="item.endDate"></yhm-manager-td-date>
          <yhm-manager-td :value="item.amount+'%'"></yhm-manager-td>
          <yhm-manager-td tip="value" :value="item.discount"></yhm-manager-td>

          <yhm-manager-td-operate>
               <yhm-manager-td-operate-button v-if="item.enable=='1'?true:false" @click="put(item)"  value="发布" icon="i-export" color="#2c920b"></yhm-manager-td-operate-button>
               <yhm-manager-td-operate-button @click="del(item)"  value="删除" icon="delete" color="#FF0000"></yhm-manager-td-operate-button>
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
    name: 'promotionsManager',
    mixins: [managermixin],
    data(){
      return{
        insuredUnitBefore:'0',// 默认选择状态为可以选择，1为不可以选择
        listBrand:{
          value: '', //默认为空
          list: []
        },
        listEnable:{
          value: '0', //默认为空
          list: []
        },
        orderColumn:'enable',
        order:'asc'
      }
    },
    methods:{
      put(item){
        let params = {
          id: item.id,
        }
        this.ajaxJson({
          url: '/Insurance/promotionPut',
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
                url: '/Insurance/promotionDel',
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
          width: 1050,
          height: 700,
          url: '/promotionsForm?id=' + item.id,
          title: '添加优惠活动',
          closeCallBack: (data) => {
            if (data) {
              this.lastData = data//接收子页面传的值
              this.initPageData(false)
            }
          }
        })
      },
      add() {
        this.$dialog.OpenWindow({
          width: 1050,
          height: 700,
          url:'/promotionsForm',
          title:'添加优惠活动',
          closeCallBack:(data) =>{
            if (data) {
              this.lastData = data//接收子页面传的值
              this.initPageData(false)
            }
          }
        })
      },
      initChoose (op) {
        if (op === 'brand') {
          this.selectValue = []
        }
        if (op === 'enable') {
          this.selectValue = []
        }
        this.initPageData(false)
      },
      initPageData (initValue) {
        let params = {}

        if (initValue) {
          params = {
            orderColumn:this.orderColumn,
            order:this.order,
            brand:this.listBrand.value,
            enable:this.listEnable.value
          }
        } else {
          params = {
            orderColumn:this.orderColumn,
            order:this.order,
            brand:this.listBrand.value,
            enable:this.listEnable.value
          }
        }
        this.init({
          initValue:initValue,
          url: '/Insurance/promotionMagager',
          data:params,
          all:(data) =>{
            //不管是不是初始化都需要执行的代码

          },
          init:(data)=>{
            //初始化时需要执行的代码
            // 这边初始化筛选信息
            this.listBrand=data.brandPsd
            this.listEnable=data.enablePsd
          }
        })
      }
    },
  }
</script>

<style scoped>

</style>
