<template>
  <div>
    <yhm-managerpage category="1">
      <!--导航条-->
      <template #navigationTab>
        <router-link class="menuTabDiv " :to="{path:'/home/bossTrack/bossTrackManager'}">管理跟踪信息</router-link>
        <router-link class="menuTabDiv " :to="{path:'/home/bossTrack/bossTrackDetailsManager'}">管理跟踪反馈</router-link>
        <router-link class="menuTabDiv menuTabActive" :to="{path:'/home/bossTrack/followApprovalManager'}">审批跟踪信息</router-link>
        <router-link class="menuTabDiv " :to="{path:'/home/bossTrack/bossPerfectedManager'}">待分配客户信息</router-link>
      </template>
      <!--操作区-->
      <template #operate>
<!--        <yhm-commonbutton :value="choose?'收起筛选':'展开筛选'" :icon="choose?'btnUp':'btnDown'" @call="switchChoose()"></yhm-commonbutton>-->
        <yhm-managersearch :value="searchStr" :history="shortcutSearchContent" id="searchStr" @call="initPageData(false)"></yhm-managersearch>
        <yhm-radiofilter :before="feedbackBefore" @initData="initChoose('category')" title="跟踪状态" :content="listCategory"></yhm-radiofilter>
      </template>
      <!--筛选区-->
<!--      <template #choose>-->
<!--        <div v-show="choose" class="buttonBody mptZero">-->

<!--          <yhm-radiofilter :before="feedbackBefore" @initData="initChoose('category')" title="跟踪状态" :content="listCategory"></yhm-radiofilter>-->
<!--        </div>-->
<!--      </template>-->
      <!--数据表头-->
      <template #listHead>
        <yhm-managerth style="width: 40px;" title="选择"></yhm-managerth>
        <yhm-managerth style="width: 40px;" title="查看"></yhm-managerth>
        <yhm-managerth style="width: 100px;" title="负责人" value="principal"></yhm-managerth>
        <yhm-managerth style="width: 130px;" title="车牌号" value="plate"></yhm-managerth>
        <yhm-managerth style="width: 150px;" title="联系人" value="name"></yhm-managerth>
        <yhm-managerth style="width: 130px;" title="联系方式" value="phone"></yhm-managerth>
        <yhm-managerth style="width: 130px;" title="购买意向" value="intentionVal"></yhm-managerth>
        <yhm-managerth style="width: 200px;" title="申请更改的状态" value="categoryVal"></yhm-managerth>
        <yhm-managerth style="width: 150px;" title="跟踪时间" value="currentDate"></yhm-managerth>
        <yhm-managerth  title="备注" value="remark"></yhm-managerth>
        <yhm-managerth style="width:150px;" title="操作"></yhm-managerth>
      </template>

      <!--数据明细-->
      <template #listBody>
        <tr :class="[{twinkleBg: item.id==lastData},{InterlacBg:index%2!=0}]" v-for="(item,index) in content" :key="index">
          <yhm-manager-td-checkbox :value="item"></yhm-manager-td-checkbox>
          <yhm-manager-td-look @click="listView(item)"></yhm-manager-td-look>
          <yhm-manager-td :value="item.principal"></yhm-manager-td>
          <yhm-manager-td :value="item.plate"></yhm-manager-td>
          <yhm-manager-td :value="item.name"></yhm-manager-td>
          <yhm-manager-td :value="item.phone"></yhm-manager-td>
          <yhm-manager-td-center :value="item.intentionVal"></yhm-manager-td-center>
          <yhm-manager-td-center :value="item.categoryVal"></yhm-manager-td-center>
          <yhm-manager-td-center :value="item.currentDate"></yhm-manager-td-center>
          <yhm-manager-td :value="item.remark" tip="value"></yhm-manager-td>

          <yhm-manager-td-operate>
            <yhm-manager-td-operate-button @click="editBtn(item)" value="通过" icon="i-btn-applicationSm" color="#49a9ea"></yhm-manager-td-operate-button>
            <yhm-manager-td-operate-button @click="downBtn(item)" value="驳回" icon="i-btn-turnDown" color="#FF0000"></yhm-manager-td-operate-button>
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
    name: 'followApprovalManager',
    mixins: [managermixin],
    data(){
      return{
        id:'',
        feedbackBefore:'0',// 默认选择状态为可以选择，1为不可以选择
        category:'',
        listCategory:{
          value: '', //默认为空
          list: []
        },
      }
    },
    methods:{
      editBtn(item){
        if (item.category==2){
          this.$dialog.confirm({
            tipValue: '此条数据确定回退吗',
            btnValueOk:'确定回退',
            btnValueCancel:'更换联系人',
            width: 350,
            okCallBack: () => {
              let params={}
              if (item.category==4){
                params={
                  id:item.id,
                  state:'1'
                }
              }
              if (item.category==2){
                params={
                  id:item.id,
                  state:'3'
                }
              }
              this.ajaxJson({
                url: '/Insurance/editBtn',
                data: params,
                call: (data) => {
                  if (data.type === 0) {
                    this.$dialog.setReturnValue(this.id)
                    this.$dialog.alert({
                      tipValue: data.message,
                      closeCallBack: () => {
                        this.initPageData(false)
                      }
                    })
                  }else{
                    this.$dialog.alert({
                      alertImg:'warn',
                      tipValue: data.message
                    })
                  }
                }
              })
            },
            cancelCallBack:() => {
              this.replacePrincipal(item.id)
            }
          })
        }else {
          let params={}
          if (item.category==4){
            params={
              id:item.id,
              state:'1'
            }
          }
          if (item.category==2){
            params={
              id:item.id,
              state:'3'
            }
          }
          this.ajaxJson({
            url: '/Insurance/editBtn',
            data: params,
            call: (data) => {
              if (data.type === 0) {
                this.$dialog.setReturnValue(this.id)
                this.$dialog.alert({
                  tipValue: data.message,
                  closeCallBack: () => {
                    this.initPageData(false)
                  }
                })
              }else{
                this.$dialog.alert({
                  alertImg:'warn',
                  tipValue: data.message
                })
              }
            }
          })
        }

      },
      replacePrincipal(id){  //更换联系人
        this.id = id
        this.$dialog.OpenWindow({
          width: 950,
          height: 692,
          url: '/selectPerson?category=0&categoryBefore=1&id=' + this.id,
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
              //-->具体操作
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
      },
      downBtn(item){
        this.$dialog.OpenWindow({
          width: 650,
          height: 230,
          title: '驳回留言',
          url: '/approvalPassMessage?id=' + item.id+'&page=3',
          closeCallBack: (data)=>{
            if (data){
              this.initPageData(false)
            }
          }
        })
      },
      listView(item){
        this.$dialog.OpenWindow({
          width: '1050',
          height: '695',
          url: '/trackDetailsView?id=' + item.id,
          title: '查看客户信息',
          closeCallBack: (data)=>{
            if(data){
              this.initPageData(false)
            }
          }
        })
      },
      // 筛选事件
      initChoose (op) {

        if (op === 'category') {
          this.selectValue = []
        }
        this.initPageData(false)
      },

      //搜索
      initPageData (initValue) {
        let params = {}

        if (initValue) {
          params = {

            category:this.listCategory.value
          }
        } else {
          params = {

            category:this.listCategory.value
          }
        }
        this.init({
          initValue:initValue,
          url: '/Insurance/getFollowApp',
          data:params,
          all:(data) =>{
            //不管是不是初始化都需要执行的代码
          },
          init:(data)=>{
            //初始化时需要执行的代码
            // 这边初始化筛选信息

            this.listCategory = data.categoryPsd

          }
        })
      }
    }
  }
</script>

<style scoped>

</style>




