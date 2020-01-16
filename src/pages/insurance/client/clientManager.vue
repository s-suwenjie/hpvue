<template>
  <div>
    <yhm-managerpage category="1">
      <!--导航条-->
      <template #navigationTab>
        <router-link class="menuTabDiv menuTabActive" :to="{path:'/home/insurance/clientManager'}">客户管理</router-link>
       </template>
      <!--操作区-->
      <template #operate>
        <yhm-commonbutton  value="添加" icon="btnAdd" :flicker="true" @call="add()"></yhm-commonbutton>
        <yhm-managersearch :value="searchStr" :history="shortcutSearchContent" id="searchStr" @call="initPageData(false)"></yhm-managersearch>
      </template>
      <!--数据表头-->
      <template #listHead>
        <yhm-managerth style="width: 40px;" title="选择"></yhm-managerth>
        <yhm-managerth style="width: 40px;" title="查看"></yhm-managerth>
        <yhm-managerth  title="车牌号" value="plate"></yhm-managerth>
        <yhm-managerth  title="联系人" value="name"></yhm-managerth>
        <yhm-managerth  title="联系方式" value="phone"></yhm-managerth>
        <yhm-managerth  title="客户状态" value="state"></yhm-managerth>
        <yhm-managerth  title="去年投保公司" value="lastYearUnit"></yhm-managerth>
        <yhm-managerth  title="交强险到期日" value="forceEndDate"></yhm-managerth>
        <yhm-managerth  title="商业险到期日" value="businessEndDate"></yhm-managerth>
        <yhm-managerth  title="行车证" value="drivingLicense"></yhm-managerth>
        <yhm-managerth  title="负责人" value="principal"></yhm-managerth>
        <yhm-managerth  title="更换操作人"></yhm-managerth>
      </template>

      <!--数据明细-->
      <template #listBody>
        <tr :class="[{twinkleBg: item.id==lastData},{InterlacBg:index%2!=0}]" v-for="(item,index) in content" :key="index">
          <yhm-manager-td-checkbox :value="item"></yhm-manager-td-checkbox>
          <yhm-manager-td-look @click="add(item.id)"></yhm-manager-td-look>
          <yhm-manager-td :value="item.plate"></yhm-manager-td>
          <yhm-manager-td :value="item.name"></yhm-manager-td>
          <yhm-manager-td :value="item.phone"></yhm-manager-td>
          <yhm-manager-td :value="item.stateVal"></yhm-manager-td>
          <yhm-manager-td :value="item.lastYearUnitVal"></yhm-manager-td>
          <yhm-manager-td-date :value="item.forceEndDate"></yhm-manager-td-date>
          <yhm-manager-td-date :value="item.businessEndDate"></yhm-manager-td-date>
          <yhm-manager-td :value="item.drivingLicense"></yhm-manager-td>
          <yhm-manager-td :value="item.principal"></yhm-manager-td>
          <yhm-manager-td-operate>
            <yhm-manager-td-operate-button  @click="replacePrincipal(item.id)" value="更换负责人" icon="replace" ></yhm-manager-td-operate-button>
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
    name: 'clientManager',
    mixins: [managermixin],
    data(){
      return{
        id :'',
        principal:'', //负责人
        principalID:'', //负责人ID

      }
    },
    methods:{
      //添加
      add (id) {
        // 默认设置页面标记是查看
        var isAdd = false
        // 默认设置页面标题为查看信息
        var title = '查看客户信息信息'
        if (!id) { // 当id不存在的时候
          // 设置id为空
          id = ''
          // 设置页面标题为添加信息
          title = '添加客户信息信息'
          // 设置页面标记为添加
          isAdd = true
        }
        this.$dialog.OpenWindow({
          width: '1050',
          height: '800',
          url:'/clientForm?id=' + id,
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
      replacePrincipal(id){
        this.id = id
        this.$dialog.confirm({
          width: 300,
          tipValue: '是否更换负责人?',
          btnValueOk: '确定',
          alertImg: 'warn',
          okCallBack: (data) => {
            let params = {
              id: id,
            }
            this.$dialog.OpenWindow({
              width: 950,
              height: 692,
              url: '/selectPerson?category=0&categoryBefore=1',
              title: '更换负责人',
              closeCallBack: (data) => {
                if (data) {
                  this.principalID=data.id
                  this.principal = data.name
                  this.$dialog.refresh()
                  let params = {
                    id:this.id,
                    principalID:this.principalID, //负责人ID

                  }
                  this.ajaxJson({
                    url: '/Insurance/replacePrincipal',
                    data: params,
                    call: (data) => {
                      if (data.type === 0) {
                        this.$dialog.alert({
                          tipValue: data.message,
                          closeCallBack: () => {
                            this.initPageData(false)
                          }
                        })
                      }else if(data.type === 1){
                        this.$dialog.alert({
                          alertImg:'warn',
                          tipValue: data.message
                        })
                      }
                    }
                  })
                }
              }
            })
          }
        })

      },
      //搜索
      initPageData (initValue) {
        let params = {}

        if (initValue) {
          params = {}
        } else {
          params = {}
        }
        this.init({
          initValue:initValue,
          url: '/Insurance/getClientManager',
          data:params,
          all:(data) =>{
            //不管是不是初始化都需要执行的代码
          },
          init:(data)=>{
            //初始化时需要执行的代码
          }
        })
      },
      //选择
      selectEvent (data) {
        this.selectValue = selectItem(this.selectValue, data)
      },
    }
  }
</script>

<style scoped>

</style>
