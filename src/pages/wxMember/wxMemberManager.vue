<template>
  <div>
    <yhm-managerpage>
      <!--导航条-->
      <template #navigation>系统&nbsp;&gt;&nbsp;优惠券管理&nbsp;&gt;&nbsp;会员管理</template>
      <template #operate>
        <yhm-table-tip ref="smallTable" :show="tableTip" :content="tableTipInfo" :column="tableTipColumnInfo" :mouse-control="tableTipControl"></yhm-table-tip>

        <!--<yhm-commonbutton value="测试" icon="btnAdd" :flicker="true" @call="test"></yhm-commonbutton>-->
        <yhm-commonbutton :value="choose?'收起筛选':'展开筛选'" :icon="choose?'btnUp':'btnDown'" @call="switchChoose()"></yhm-commonbutton>
        <yhm-managersearch :value="searchStr" :history="shortcutSearchContent" id="searchStr" @call="initData"></yhm-managersearch>
      </template>

      <!--数据表头-->
      <template #listHead>
        <yhm-managerth style="width: 40px;" title="选择"></yhm-managerth>
        <yhm-managerth style="width: 40px;" title="查看"></yhm-managerth>
        <yhm-managerth style="width: 150px;" title="联系人"></yhm-managerth>
        <yhm-managerth style="" title="联系电话"></yhm-managerth>
        <yhm-managerth style="" title="微信名称"></yhm-managerth>
        <yhm-managerth style="width: 150px;" title="微信头像"></yhm-managerth>
        <yhm-managerth style="" title="注册时间" value="workDate"></yhm-managerth>
        <yhm-managerth style="" title="车牌号码"></yhm-managerth>
        <yhm-managerth style="width: 100px;" title="发出总数量"></yhm-managerth>
        <yhm-managerth style="width: 100px;" title="未使用数量"></yhm-managerth>
        <yhm-managerth style="width: 100px;" title="已使用数量"></yhm-managerth>
        <yhm-managerth style="width: 100px;" title="已过期数量"></yhm-managerth>
        <yhm-managerth title="操作"></yhm-managerth>
      </template>

      <!--数据明细-->
      <template #listBody>
        <tr v-for="(item,index) in content" :key="index" :class="[{twinkleBg: item.id==lastData},{InterlacBg:index%2!=0}]">
          <yhm-manager-td-checkbox :value="item"></yhm-manager-td-checkbox>
          <yhm-manager-td-look @click="look(item.id)"></yhm-manager-td-look>

          <yhm-manager-td :color="item.personID==''?'#FF0000':'#0909F7'" :value="item.person" @click="personClike(item)">
            <span style="color: #FF0000;font-size: 18px;" class="i-longtap managerIcon"></span>
          </yhm-manager-td>
          <yhm-manager-td-center :value="item.phone" format="phone*"></yhm-manager-td-center>
          <yhm-manager-td :value="item.wxName"></yhm-manager-td>
          <yhm-manager-td-img-self :tip="true" left="-540" width="200" height="200" :value="item.avatarUrl" tag="wxCoupon"></yhm-manager-td-img-self>
          <yhm-manager-td-date :value="item.workDate"></yhm-manager-td-date>
          <yhm-manager-td :value="item.vehicleNumber" @mouseover="tableTipShowEvent" @mouseout="tableTipHideEvent" :value-object="item" :after-icon="item.vehicleQuantity > 1 ? 'i-btn-prompt' : ''"></yhm-manager-td>
          <yhm-manager-td-rgt :value="item.couponQuantity"></yhm-manager-td-rgt>
          <yhm-manager-td-rgt :value="item.couponUsed"></yhm-manager-td-rgt>
          <yhm-manager-td-rgt :value="item.couponUnused"></yhm-manager-td-rgt>
          <yhm-manager-td-rgt :value="item.couponExpired"></yhm-manager-td-rgt>
          <yhm-manager-td-operate>

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
    name: 'wxMemberManager',
    mixins: [managermixin],
    data(){
      return{
        tableTip: false,
        tableTipControl: {},
        tableTipColumnInfo:[
          {width:'100',title:'车牌号码',category:'',key:'code'},
          {width:'100',title:'优惠券总数量',category:'right',key:'quantity'},
          {width:'100',title:'已用数量',category:'right',key:'used'},
          {width:'100',title:'未用数量',category:'right',key:'unused'},
          {width:'100',title:'过期数量',category:'right',key:'expired'}
        ],
        tableTipInfo:[],
        currentControl:null,
        personID:'',
      }
    },
    methods:{
      personClike(item){
        this.$dialog.OpenWindow({
          width: 950,
          height: 692,
          url: '/selectPerson?category=1&commonClientUse=1',
          title: '选择联系人',
          closeCallBack: (data) => {
            if (data) {
              // this.personID=data.id
              let params = {
                id: item.id,
                personID:data.id
              }
              this.ajaxJson({
                url: '/wx/wxMember/relationID',
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
          }
        })
      },

      //查看
      look(id){
        this.$dialog.OpenWindow({
          width: 1050,
          height: 780,
          url:'/wxMemberview?id=' + id,
          title:'查看联系人信息',
          closeCallBack:(data) =>{


          }
        })
      },
      /* 小标格显示 */
      tableTipShowEvent(item,control){
        console.log(this.tableTipColumnInfo+'11111111')
        if(item.vehicleList.length > 1) {
          this.currentControl = control
          this.tableTipInfo = item.vehicleList
          this.tableTipControl = control
          this.tableTip = true
          this.currentControl = control
        }
        else{
          this.currentControl = null
          this.tableTip = false
        }
      },
      moveToSmallTable(e){

        if(this.currentControl) {
          if(!(this.currentControl.contains(e.target) || this.$refs.smallTable.$el.contains(e.target))){
            this.tableTip = false
          }
        }
        else{
          document.removeEventListener('mouseover', this.moveToSmallTable)
        }
      },
      tableTipHideEvent(item,control){
        console.log(this.tableTipColumnInfo+'11111111')
        if(item.vehicleList.length > 1){
          document.addEventListener('mouseover', this.moveToSmallTable)
        }
      },

      add(id){
        // 默认设置页面标记是查看
        var isAdd = false
        // 默认设置页面标题为查看信息
        var title = '查看会员信息'
        if (!id) { // 当id不存在的时候
          // 设置id为空
          id = ''
          // 设置页面标题为添加信息
          title = '添加会员信息'
          // 设置页面标记为添加
          isAdd = true
        }
        this.$dialog.OpenWindow({
          width: 1050,
          height: 600,
          url:'/wxMemberForm?id=' + id,
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
      //选项卡
      select(item){
        this.$dialog.OpenWindow({
          width: 1050,
          height: 650,
          url:'/wxMemberSelect?id=' + item.id,
          title:'优惠券选项卡',
          closeCallBack:(data) =>{
          }
        })
      },
      //搜索
      initPageData (initValue) {
        let params = {}

        if (initValue) {
          params = {
            // category:this.listCategory.value
          }
        } else {
          params = {
            // category:this.listCategory.value
          }
        }
        this.init({
          initValue:initValue,
          url: '/wx/wxMember/getManager',
          data:params,
          all:(data) =>{
            //不管是不是初始化都需要执行的代码
          },
          init:(data)=>{
            //初始化时需要执行的代码
            // this.categoryList = data.categoryPsd.list
            // this.listCategory = data.categoryPsd
            // this.expirationCategoryList = data.expirationCategoryPsd.list
          }
        })
      }
    }
  }
</script>

<style lang="less" scoped>
  .managerIcon{
    position: absolute;
    right: 4px;
  }

</style>
