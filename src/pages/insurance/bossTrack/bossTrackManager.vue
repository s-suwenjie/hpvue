<template>
  <div>
    <yhm-managerpage category="1">
      <!--导航条-->
      <template #navigationTab>
        <router-link class="menuTabDiv menuTabActive" :to="{path:'/home/bossTrack/bossTrackManager'}">管理跟踪信息</router-link>
        <router-link class="menuTabDiv " :to="{path:'/home/bossTrack/bossTrackDetailsManager'}">管理跟踪反馈</router-link>
        <router-link class="menuTabDiv " :to="{path:'/home/bossTrack/followApprovalManager'}">审批跟踪信息</router-link>
        <router-link class="menuTabDiv " :to="{path:'/home/bossTrack/bossPerfectedManager'}">待分配客户信息</router-link>
      </template>
      <!--操作区-->
      <template #operate>
        <yhm-managersearch :value="searchStr" :history="shortcutSearchContent" id="searchStr" @call="initPageData(false)"></yhm-managersearch>
        <yhm-commonbutton style="margin-left: 30px" value="批量更换负责人" icon="replace"  @call="replace()"></yhm-commonbutton>
        <yhm-radiofilter :before="stateBefore" @initData="initChoose('state')" title="客户状态" :content="listState"></yhm-radiofilter>
        <yhm-radiofilter :before="stateBefore" @initData="initChoose('insuredType')" title="客户投保状态" :content="ListInsuredType"></yhm-radiofilter>
        <yhm-radiofilter :before="stateBefore" @initData="initChoose('unassigned')" title="未分配负责人" :content="listUnassigned"></yhm-radiofilter>
        <yhm-radiofilter :before="stateBefore" @initData="initChoose('timeSlot')" title="选择时间段" :content="listTimeSlot"></yhm-radiofilter>
      </template>
      <!--数据表头-->
      <template #listHead>
<!--        <yhm-managerth style="width: 40px;" title="选择"></yhm-managerth>-->
        <yhm-managerth-check style="width: 40px;" :check="allCheck"></yhm-managerth-check>
        <yhm-managerth style="width: 40px;" title="查看"></yhm-managerth>
        <yhm-managerth style="width: 70px" title="负责人" value="principal"></yhm-managerth>
        <yhm-managerth style="width: 90px" title="车牌号" value="plate"></yhm-managerth>
        <yhm-managerth  title="品牌（车型）" value="brandVal"></yhm-managerth>
        <yhm-managerth  title="联系人" value="name"></yhm-managerth>
        <yhm-managerth  title="联系方式" value="phone"></yhm-managerth>
        <yhm-managerth  title="去年投保公司" value="lastYearUnitVal"></yhm-managerth>
        <yhm-managerth style="width: 80px" title="客户状态" ></yhm-managerth>
        <yhm-managerth  title="交强险到期日" value="forceEndDate"></yhm-managerth>
        <yhm-managerth  title="剩余天数" value="forceDay"></yhm-managerth>
        <yhm-managerth  title="商业险到期日" value="businessEndDate"></yhm-managerth>
        <yhm-managerth  title="剩余天数" value="businessDay"></yhm-managerth>
        <yhm-managerth  title="最后跟踪时间" value="currentDate"></yhm-managerth>
        <yhm-managerth  title="最后跟踪内容" value="remark"></yhm-managerth>
        <yhm-managerth style="width: 210px;" title="操作"></yhm-managerth>
      </template>

      <!--数据明细-->
      <template #listBody>
        <tr :class="[{twinkleBg: item.id==lastData},{InterlacBg:index%2!=0}]" v-for="(item,index) in content" :key="index">
          <yhm-manager-td-checkbox :value="item"></yhm-manager-td-checkbox>
          <yhm-manager-td-look @click="listView(item)"></yhm-manager-td-look>
<!--          <yhm-manager-td :value="item.principal"></yhm-manager-td>-->
          <yhm-manager-td :value="item.principal" v-if="item.principalID===''"></yhm-manager-td>
          <yhm-manager-td-center :value="item.principal" v-else :menu-list="principalIDMenu" @click="vehicleBrandLeft(item)" @rightClick="rightClick(item)" @menuClick="menuClick"></yhm-manager-td-center>
          <yhm-manager-td :value="item.plate"></yhm-manager-td>
          <yhm-manager-td  v-if="item.modelVal!=''" :value="item.brandVal+'('+item.modelVal+')'"></yhm-manager-td>
          <yhm-manager-td v-else :value="item.brandVal"></yhm-manager-td>
          <yhm-manager-td :value="item.name"></yhm-manager-td>
          <yhm-manager-td :value="item.phone"></yhm-manager-td>
          <yhm-manager-td :value="item.lastYearUnitVal"></yhm-manager-td>
          <yhm-manager-td :value="item.insuredTypeVal"></yhm-manager-td>
          <yhm-manager-td-date :value="item.forceEndDate"></yhm-manager-td-date>
          <yhm-manager-td-center :value="item.forceDay+'  天'"></yhm-manager-td-center>
          <yhm-manager-td-date :value="item.businessEndDate"></yhm-manager-td-date>
          <yhm-manager-td-center  :value="item.businessEndDate==='1900-01-01'?'-----':item.businessDay+'  天'"></yhm-manager-td-center>
          <yhm-manager-td-date :value="item.currentDate"></yhm-manager-td-date>
          <yhm-manager-td   :value="item.remark"></yhm-manager-td>
          <yhm-manager-td-operate >
            <yhm-manager-td-operate-button  @click="category(item,1)" value="睡眠" icon="i-btn-applicationSm" color="#0909F7"></yhm-manager-td-operate-button>
            <yhm-manager-td-operate-button  @click="category(item,2)" value="失销" icon="i-btn-applicationSm" color="#FF00FF"></yhm-manager-td-operate-button>
            <yhm-manager-td-operate-button  @click="replacePrincipal(item.id)" value="更换负责人" icon="i-replace"  color="#8B2500" ></yhm-manager-td-operate-button>
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
    name: 'bossTrackManager',
    mixins: [managermixin],
    data(){
      return{
        id:'',
        orderColumn:'forceDay,businessDay',
        order:'asc',
        principalIDMenu:['筛选当前业务员'],
        stateBefore:'0',// 默认选择状态为可以选择，1为不可以选择
        listState:{
          value: '0', //默认为空
          list: []
        },
        listTimeSlot:{
          value: '', //默认为空
          list: []
        },
        unassigned:'',
        listUnassigned:{  //未分配负责人
          list:[
            {
              num: '0', //默认为空
              showName: '未分配'
            },
          ],
          value:'',
        },
        ListInsuredType:{
          list:[
            {
              num: '0', //默认为空
              showName: '首次'
            },
            {
              num: '1', //默认为空
              showName: '续转续'
            },
          ],
          value:'',
        },
      }
    },
    methods:{
      replacePrincipal(id){
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
                        this.principalID='',
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
      category(item,value){
        let params = {
          id:item.id,
          state:value
        }
        this.ajaxJson({
          url: '/Insurance/revise',
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
      rightClick(item){//点击右键菜单时获取当前点击的数据
        this.unitItme = item
      },
      menuClick(item,index) {//返回用户选中的菜单选项及索引值
        if(item==='筛选当前业务员'){
          this.principalIDMenu=['取消业务员筛选']
          this.principalID = this.unitItme.principalID
        }else if(item==='取消业务员筛选'){
          this.principalIDMenu=['筛选当前业务员']
          this.principalID = ''
        }
        this.initPageData(false)
      },
      replace(){
        if (this.selectValue.length ===0){
          this.$dialog.alert({
            tipValue:'至少选择一条信息!!!',
            alertImg: 'warn',
            width:'300'
          })
        }else  if(this.selectValue.length ===1){
          //操作一条
          let arr=[]
          for(let i = 0;i<this.selectValue.length; i++){
            let key = this.selectValue[i]
            arr += key + '☆'
          }
          if (arr.length > 0) {
            arr = arr.substr(0, arr.length - 1);
          }
          this.initTrackMany(arr)
        }else  if (this.selectValue.length >1) {
          //操作多条
          let arr=[]
          for(let i = 0;i<this.selectValue.length; i++){
            let key = this.selectValue[i]
            arr += key + '☆'
          }
          if (arr.length > 0) {
            arr = arr.substr(0, arr.length - 1);
          }
          this.initTrackMany(arr)
        }
      },
      //多选客户是否有人已被跟踪信息
      initTrackMany(arr){
        //-->打开更换负责人页面
        this.$dialog.OpenWindow({
          width: 950,
          height: 692,
          url: '/selectPerson?category=0&categoryBefore=1&selectType=1',
          title: '更换负责人',
          closeCallBack: (data) => {

            if (data) {
              let idd=[]
              for (let i in data){
                idd.push(data[i].id)
              }
              this.principalID=idd.join('☆')
              this.principal = data.name

              this.$dialog.refresh()
              let params = {
                id:arr,
                principalID:this.principalID, //负责人ID
              }
              //-->具体操作
              this.ajaxJson({
                url: '/Insurance/replacePrincipalMany',
                data: params,
                call: (data) => {
                  if (data.type === 0) {
                    this.$dialog.alert({
                      tipValue: data.message,
                      closeCallBack: () => {
                        this.principalID=''
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
      listView(item){
        this.$dialog.OpenWindow({
          width: '1050',
          height: '570',
          url: '/clientView?id=' + item.id,
          title: '查看客户信息',
          closeCallBack: (data)=>{
            if(data){
              this.initPageData(false)
            }
          }
        })
      },
      track(item){
        this.$dialog.OpenWindow({
          width: '1050',
          height: '700',
          title: '跟踪信息',
          url: '/trackForm?ownerID='+item.id,
          closeCallBack:(data)=>{
            if(data){
              this.initPageData(false)
            }
          }
        })
      },
      // 筛选事件
      initChoose (op) {
        if (op === 'state') {
          this.selectValue = []
        }
        if (op === 'timeSlot') {
          this.selectValue = []
        }
        if (op === 'insuredType') {
          this.selectValue = []
        }
        this.pager.pageIndex = 1
        this.initPageData(false)
      },
      //搜索
      initPageData (initValue) {
        let params = {}

        if (initValue) {
          params = {
            orderColumn:this.orderColumn,
            order:this.order,
            principalID:this.principalID,
            state:this.listState.value,
            unassigned:this.listUnassigned.value,
            timeSlot:this.listTimeSlot.value,
            insuredType:this.ListInsuredType.value,
          }
        } else {
          params = {
            orderColumn:this.orderColumn,
            order:this.order,
            principalID:this.principalID,
            state:this.listState.value,
            unassigned:this.listUnassigned.value,
            timeSlot:this.listTimeSlot.value,
            insuredType:this.ListInsuredType.value,
          }
        }
        this.init({
          initValue:initValue,
          url: '/Insurance/getBoosTrackManager',
          data:params,
          all:(data) =>{
            //不管是不是初始化都需要执行的代码
          },
          init:(data)=>{
            //初始化时需要执行的代码
            this.listState=data.statePsd
            this.listTimeSlot=data.timeSlotPsd
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


