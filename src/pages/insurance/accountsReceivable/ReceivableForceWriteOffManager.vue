<template>
    <div>
      <yhm-managerpage category="1" :total-table="true" :totalWidth="true">

        <template #navigationTab>
          <router-link class="menuTabDiv " :to="{path:'/home/accountsReceivable/receivableManager'}">应收账款</router-link>
          <router-link class="menuTabDiv menuTabActive" :to="{path:'/home/accountsReceivable/ReceivableForceWriteOffManager'}">添加强制核销对象</router-link>
        </template>

        <!--操作区-->
        <template #operate>
          <yhm-commonbutton value="添加" icon="btnAdd" :flicker="true" @call="add()" category="one"></yhm-commonbutton>
          <yhm-commonbutton :value="choose?'收起筛选':'展开筛选'" :icon="choose?'btnUp':'btnDown'" @call="switchChoose()"></yhm-commonbutton>
          <yhm-managersearch :value="searchStr" :history="shortcutSearchContent" id="searchStr" @call="initData"></yhm-managersearch>
<!--          <yhm-commonbutton value="打开选中来源信息" icon="i-selectAll" @call="selectedList" :show="isSelected" category="three"></yhm-commonbutton>-->
        </template>

        <template #choose>
          <div v-show="choose" class="buttonBody mptZero">
            <yhm-radiofilter @initData="initChoose('category')" title="对方类型" :content="categoryList"></yhm-radiofilter>
          </div>
        </template>

        <template #listHead>
          <yhm-managerth style="width: 40px;" title="选择"></yhm-managerth>
          <yhm-managerth style="width: 40px;" title="查看"></yhm-managerth>
          <yhm-managerth title="强制核销对象"></yhm-managerth>
          <yhm-managerth style="width:80px" title="删除"></yhm-managerth>
        </template>

        <!--数据明细-->
        <template #listBody>
          <tr :class="[{twinkleBg: item.id==lastData},{InterlacBg:index%2!=0}]" v-for="(item,index) in content" :key="index">
            <yhm-manager-td-checkbox :value="item"></yhm-manager-td-checkbox>
            <yhm-manager-td-look @click="listView(item)"></yhm-manager-td-look>
            <yhm-manager-td :value="item.ownerName" @click="skiPdetails(item)"></yhm-manager-td>
            <yhm-manager-td-operate>
              <yhm-manager-td-operate-button @click="deletes(item)" value="删除"  color="red"></yhm-manager-td-operate-button>
            </yhm-manager-td-operate>
          </tr>
        </template>


        <template #empty>
          <span class="m_listNoData" v-show="content.length!='0'?false:true">暂时没有数据</span>
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
    name: 'ReceivableForceWriteOffManager',
    mixins: [managermixin],
    data(){
      return{
        categoryList:'',
      }
    },
    created () {

    },
    methods:{
      listView(item){
        this.$dialog.OpenWindow({
          width: '1050',
          height: '700',
          url: '/receivableForceWriteOffFrom?id='+item.id,
          title: '查看强制核销对象',
          closeCallBack: (data) => {
            this.initPageData(false)
          }
        })
      },
      add(){
        this.$dialog.OpenWindow({
          width: '1050',
          height: '700',
          url: '/receivableForceWriteOffFrom',
          title: '添加强制核销对象',
          closeCallBack: (data) => {
            this.initPageData(false)
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
            init: false,
            searchStr:this.searchStr,
            category: this.categoryList.value,
            pageDetail: this.pager.pageIndex,
          }
        }
        this.init({
          initValue:initValue,
          url: '/finance/receivableForceWriteOff/getManager',
          data:params,
          all:(data) =>{
            console.log(data)
          },
          init:(data)=>{
            this.categoryList=data.categoryList
          }
        })
      },
      deletes(item){
        console.log(item)
        this.$dialog.confirm({
          width: 300,
          tipValue: ' 确认删除?',
          btnValueOk: '确定',
          alertImg: 'warn',
          okCallBack: (data) => {
            let params = {
              id: item.id,
            }
            this.ajaxJson({
              url: '/finance/receivableForceWriteOff/delete',
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
  }
</script>

<style scoped>

</style>
