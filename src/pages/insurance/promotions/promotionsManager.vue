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
      </template>

      <!--数据表头-->
      <template #listHead>
        <yhm-managerth style="width: 40px;" title="选择"></yhm-managerth>
        <yhm-managerth style="width: 40px;" title="查看"></yhm-managerth>
        <yhm-managerth   title="别名" value="name"></yhm-managerth>
        <yhm-managerth   title="品牌"></yhm-managerth>
        <yhm-managerth   title="保险公司" value="project"></yhm-managerth>
        <yhm-managerth   title="活动时候正在进行"></yhm-managerth>
        <yhm-managerth   title="优惠额度" value="amount"></yhm-managerth>
        <yhm-managerth   title="赠送信息" value="discount"></yhm-managerth>

        <yhm-managerth style="width: 80px;" title="操作"></yhm-managerth>
      </template>

      <!--数据明细-->
      <template #listBody>
        <tr :class="[{twinkleBg: item.id==lastData},{InterlacBg:index%2!=0}]" v-for="(item,index) in content" :key="index">
          <yhm-manager-td-checkbox :value="item"></yhm-manager-td-checkbox>
          <yhm-manager-td-look @click="listView(item)"></yhm-manager-td-look>
          <yhm-manager-td :value="item.name"></yhm-manager-td>
          <yhm-manager-td :value="item.brandVal"></yhm-manager-td>
          <yhm-manager-td :value="item.project"></yhm-manager-td>
          <yhm-manager-td :value="item.enableVal"></yhm-manager-td>
          <yhm-manager-td :value="item.amount"></yhm-manager-td>
          <yhm-manager-td :value="item.discount"></yhm-manager-td>

          <yhm-manager-td-operate>
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

      }
    },
    methods:{
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
          url: '/Insurance/promotionMagager',
          data:params,
          all:(data) =>{
            //不管是不是初始化都需要执行的代码

          },
          init:(data)=>{
            //初始化时需要执行的代码
            // 这边初始化筛选信息
          }
        })
      }
    },
  }
</script>

<style scoped>

</style>
