<template>
  <div>
    <yhm-managerpage :total-table="true">
      <!--导航条-->
      <template #navigation>财务管理&nbsp;&gt;&nbsp;票据&nbsp;&gt;&nbsp;支票管理</template>

      <template #navigationLft>
        <div @mouseover="tipChange(index)" @mouseout="tipOut" style="margin: 0;position: relative;"  v-for="(item,index) in routerList" :key="index">
          <router-link tag="div" :class="item.class" style="margin: 0;" class="tip" :to="item.path">
            <div  class="cbl_main_prompt2 tipShow">
              <div class="cbl_main_prompt_content" style="font-size:13px;padding: 0 12px;">
                {{tipValue}}
                <img src="/UploadFile/m_image/arrow.png">
              </div>
            </div>
          </router-link>
        </div>
      </template>
      <!--操作区-->
      <template #operate>
        <yhm-commonbutton :value="choose?'收起筛选':'展开筛选'"  :icon="choose?'btnUp':'btnDown'" @call="switchChoose()"></yhm-commonbutton>
        <yhm-managersearch :value="searchStr" :history="shortcutSearchContent" id="searchStr" @call="initData"></yhm-managersearch>
      </template>
      <!--筛选区-->
      <template #choose>
        <div v-show="choose" class="buttonBody mptZero">
          <yhm-radiofilter :before="bankBefore" @initData="initChoose('bank')" title="银行类型" :content="listBank"></yhm-radiofilter>
          <yhm-radiofilter :before="stateBefore" @initData="initChoose('state')" title="支票状态" :content="listState"></yhm-radiofilter>
          <yhm-radiofilter :before="categoryBefore" @initData="initChoose('category')" title="支票类型" :content="listCategory"></yhm-radiofilter>
        </div>
      </template>
      <!--数据表头-->
      <template #listHead>
        <yhm-managerth style="width: 38px;" title="选择"></yhm-managerth>
        <yhm-managerth style="width: 38px;" title="查看"></yhm-managerth>

        <yhm-managerth style="width: 100px" title="使用人"></yhm-managerth>
        <yhm-managerth style="width: 140px" title="开票时间"></yhm-managerth>
        <yhm-managerth style="width: 120px" title="开票金额"></yhm-managerth>
        <yhm-managerth title="收款单位"></yhm-managerth>

        <yhm-managerth style="width: 140px;" title="所属银行" value="unitName"></yhm-managerth>
        <yhm-managerth style="width: 140px;" title="支票号码" value="code"></yhm-managerth>
        <yhm-managerth style="width: 90px;" title="支票类型" value="category"></yhm-managerth>
        <yhm-managerth style="width: 130px;" title="入库日期" value="workDate"></yhm-managerth>
        <yhm-managerth style="width: 100px;" title="支票状态" value="state"></yhm-managerth>


        <yhm-managerth style="width: 130px;" title="状态变更日期" value="workDate"></yhm-managerth>
        <yhm-managerth style="width: 70px;" title="操作"></yhm-managerth>
      </template>

      <!--数据明细-->
      <template #listBody>
        <tr v-for="(item,index) in content" :key="index" :class="[{twinkleBg: item.id==lastData},{InterlacBg:index%2!=0},{grayColor: item.state === '1'}]">
          <yhm-manager-td-checkbox :value="item"></yhm-manager-td-checkbox>
          <yhm-manager-td-look @click="add(item)"></yhm-manager-td-look>

          <yhm-manager-td-center :value="item.usePerson"></yhm-manager-td-center>
          <yhm-manager-td-date :value="item.openDate"></yhm-manager-td-date>
          <yhm-manager-td-money :value="item.money"></yhm-manager-td-money>
          <yhm-manager-td :value="item.other"></yhm-manager-td>

          <yhm-manager-td-logo :value="item.bankName" :logo="item.bankLogo" tag="BankLogo" :center="true"></yhm-manager-td-logo>
          <yhm-manager-td-center :value="item.code"></yhm-manager-td-center>
          <yhm-manager-td-psd :value="item.category" :list="categoryList"></yhm-manager-td-psd>
          <yhm-manager-td-date :value="item.workDate"></yhm-manager-td-date>
          <yhm-manager-td-psd :value="item.state"  :list="stateList"></yhm-manager-td-psd>

          <yhm-manager-td-date :value="item.scrapDate === '1900-01-01'?'-----':item.scrapDate"></yhm-manager-td-date>
          <yhm-manager-td-operate class="hover_operate" style="overflow: visible;"  @mouseout="operaOut(item,index)" @mouseover="operaOver(item,index)">
          <yhm-manager-td-operate-button style="position: absolute;" :no-click="item.state === '1'" value="操作" color="#49a9ea"></yhm-manager-td-operate-button>
            <div class="hover_operation"  ref="operaHover" >
              <span class="kailong" ref="kailong"></span>
              <p v-show="used" @click="accEntry(item)">
                <b class="icon i-accEntry"></b>
                <b >入账</b>
              </p>
              <p v-show="used" @click="toVoidCheck(item)">
                <b class="icon i-toVoidCheck"></b>
                <b>作废</b>
              </p>
              <p v-show="hasBeenBooked" @click="viewCheck(item)" >
                <b class="icon i-viewCheck"></b>
                <b >查看票样</b>
              </p>
              <p v-show="inStock" @click="checkFillOut(item)" class="aaaaa">
                <b class="icon i-checkFillOut"></b>
                <b>支票填开</b>
              </p>
<!--              <p v-show="inStock" @click="blackCheckOut(item)">-->
<!--                <b class="icon i-blackCheckOut"></b>-->
<!--                <b>空白支票外带</b>-->
<!--              </p>-->
              <p v-show="inStock" @click="blackCheckVoid(item)">
                <b class="icon i-blackCheckVoid"></b>
                <b>空白支票作废</b>
              </p>
              <p v-show="haveToGo" @click="checkFillOut(item)">
                <b class="icon i-checkFillOut"></b>
                <b>支票填开</b>
              </p>
              <p v-show="haveToGo" @click="checkBack(item)">
                <b class="icon i-blackCheckVoid"></b>
                <b>支票退回</b>
              </p>
              <p v-show="haveToGo" @click="toVoidCheck(item)">
                <b class="icon i-toVoidCheck"></b>
                <b>作废</b>
              </p>
            </div>
          </yhm-manager-td-operate>
        </tr>
      </template>
      <!--数据空提示-->
      <template #empty>
        <span class="m_listNoData" v-show="empty">暂时没有数据</span>
      </template>
      <template #listTotalHead>
        <yhm-managerth style="width: 100px;" before-title="总 " before-color="#a40b81" title="张数"></yhm-managerth>
        <yhm-managerth style="width: 100px;" before-title="可用 " before-color="#009788" title="张数"></yhm-managerth>
        <yhm-managerth style="width: 100px;" before-title="作废 " before-color="#999" title="张数"></yhm-managerth>
        <yhm-managerth style="width: 100px;" before-title="已外带 " before-color="#2f54eb" title="张数"></yhm-managerth>
        <yhm-managerth style="width: 100px;" before-title="已使用 " before-color="#28979c" title="张数"></yhm-managerth>
        <yhm-managerth style="width: 100px;" before-title="已入账 " before-color="#0686c3" title="张数"></yhm-managerth>
      </template>
      <template #listTotalBody>
        <tr v-for="(item,index) in contentTotal" :key="index">
          <yhm-manager-td-rgt :value="item.count"></yhm-manager-td-rgt>
          <yhm-manager-td-rgt :value="item.useCount"></yhm-manager-td-rgt>
          <yhm-manager-td-rgt :value="item.countState0"></yhm-manager-td-rgt>
          <yhm-manager-td-rgt :value="item.countState1"></yhm-manager-td-rgt>
          <yhm-manager-td-rgt :value="item.countState2"></yhm-manager-td-rgt>
          <yhm-manager-td-rgt :value="item.countState3"></yhm-manager-td-rgt>
        </tr>
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
    name: 'checkExpenseManager',
    mixins: [managermixin],
    data(){
      return{
        used:false,//已使用的
        hasBeenBooked:false,//已入账
        inStock:false,//在库
        operaShow:false,
        haveToGo:false,
        content:[],
        stateBefore: '0', // 默认选择状态为可以选择，1为不可以选择
        listState: {
          value: '',
          list: []
        },
        tipValue:'',
        routerList:[
          {
            class:'i-homeCheck',
            path:'/home/checkManager'
          },
          {
            class:'i-tiling',
            path:'/home/checkTilingManager'
          },

          {
            class:'i-expendCheck active',
            path:'/home/checkExpendManager'
          },
          // {
          //   class:'i-incomeCheck',
          //   path:''
          // }
        ],
        tipList:[
          ['入库操作'],
          ['平铺视图'],
          ['列表操作']
        ],
        categoryBefore:'0',
        listCategory:{
          value: '',
          list: []
        },
        bankBefore:'0',
        listBank:{
          value: '',
          list: []
        },
        categoryList: [],
        stateList:[],
        contentTotal: []
      }
    },
    methods:{
      tipChange(index){
        this.tipValue=this.tipList[index][0]
        $('.tipShow').eq(index).css({'display':'block'})
      },
      tipOut(){
        $('.tipShow').css('display','none')
      },
      /* 支票退回  */
      checkBack(item){
        this.$dialog.confirm({
          width: 300,
          tipValue: '是否确定返回???',
          alertImg: 'warn',
          okCallBack: ()=>{
            let params={
              id:item.id
            }
            this.ajaxJson({
              url: '/Bill/checksOutToFormBack',
              data: params,
              call: (data)=>{
                if(data.type === 0){
                  this.$dialog.setReturnValue(this.id)
                  this.$dialog.alert({
                    tipValue: data.message,
                    closeCallBack: () => {
                      location.reload()
                    }
                  })
                }else{
                  this.$dialog.alert({
                    tipValue: data.message,
                    alertImg: 'error',
                    closeCallBack: () => {
                    }
                  })
                }
              }
            })
          }
        })
      },
      /* 查看票样 */
      viewCheck(item){
        this.$dialog.OpenWindow({
          width: '850',
          height: '340',
          title: '查看票样',
          url: '/viewCheck?ownerID=' + item.id,
          closeCallBack: ()=>{

          }
        })
      },
      /* 支票填开 */
      checkFillOut(item){
        this.$dialog.OpenWindow({
          width: '1050',
          height: '690',
          title: '支票填开',
          url: '/checkFillOut?ownerID=' + item.id,
          closeCallBack: (data)=>{
            if(data){
              this.initPageData(false)
            }
          }
        })
      },
      /* 空白支票外带 */
      blackCheckOut(item){
        this.$dialog.OpenWindow({
          width: '1050',
          height: '690',
          title: '空白支票外带',
          url: '/blackCheckOut?ownerID=' + item.id,
          closeCallBack: (data)=>{
            if(data){
              this.initPageData(false)
            }
          }
        })
      },
      /* 空白支票作废 */
      blackCheckVoid(item){
        this.$dialog.OpenWindow({
          width: '1050',
          height: '690',
          title: '支票作废',
          url: '/toVoidCheck?ownerID=' + item.id,
          closeCallBack: (data)=>{
            if(data){
              this.initPageData(false)
            }
          }
        })
      },
      /* 入账*/
      accEntry(item){
        this.$dialog.OpenWindow({
          width: '1050',
          height: '690',
          title: '支票入账操作',
          url: '/accEntry?bankDetailType=4&ownerID=' + item.id,
          closeCallBack: (data)=>{
            if(data){
              this.initPageData(false)
            }
          }
        })
      },
      /* 作废 */
      toVoidCheck(item){
        this.$dialog.OpenWindow({
          width: '1050',
          height: '690',
          title: '支票作废',
          url: '/toVoidCheck?ownerID=' + item.id,
          closeCallBack: (data)=>{
            if(data){
              this.initPageData(false)
            }
          }
        })
      },
      add(item){
        this.$dialog.OpenWindow({
          width: '1050',
          height: '500',
          title: '查看支票信息',
          url: '/checkExpendView?id=' + item.id,
          closeCallBack: () => {
          }
        })
      },
      right(index,distance){//隐藏框的距离
        this.$refs.operaHover[index].style.right =  distance+'px'
      },
      top(index,distance){//三角形距顶部距离
        this.$refs.kailong[index].style.top = distance+'px'
      },
      operaOut(item,index){
        $('.hover_operation').css("display","none")
        $(".hover_operation").mouseover(function(){
          $(".hover_operation").eq(index).css("display","block");
        });
        $(".hover_operation").mouseout(function(){
          $(".hover_operation").css("display","none");
        });
      },
      operaOver(item,index){
        this.used = false
        this.hasBeenBooked=false
        this.inStock = false
        this.haveToGo = false
        if(item.state ==='3'){//已使用
          this.used=true
          this.hasBeenBooked=true
          this.top(index,28)
          this.right(index,87)
        }
        if(item.state ==='2'){//已外带
          this.haveToGo = true
          this.right(index,87)
        }
        if(item.state === '1'){//已作废
          return
        }
        if(item.state === '0'){//在库
          this.inStock = true
          this.top(index,28)
          this.right(index,100)
        }
        if(item.state === '4'){//已入账
          this.hasBeenBooked = true
          this.top(index,8)
          this.right(index,87)
        }
        this.$nextTick(() => {
          $('.hover_operation').css("display","none")
          this.$refs.operaHover[index].style.display = 'block'

        })
      },
      initPageData(initValue){
        let params = {}

        if (initValue) {
          params = {}
        } else {
          params = {
            state: this.listState.value,
            category:this.listCategory.value,
            bankID:this.listBank.value
          }
        }
        this.init({
          initValue:initValue,
          url: '/Bill/checksDetailManagerData',
          data:params,
          all:(data) =>{
            //不管是不是初始化都需要执行的代码
            this.contentTotal = data.total
          },
          init:(data)=>{
            //初始化时需要执行的代码
            this.listState = data.statePsd
            this.listCategory = data.categoryPsd
            this.stateList = data.statePsd.list
            this.categoryList = data.categoryPsd.list
            this.listBank = data.bankPsd
          }
        })
      },
    },
    created(){
    }
  }
</script>

<style scoped>
  .tipShow{display: none;width: 100px;}
  .hover_operation p>b{font-weight: normal;}
  .hover_operation p:hover{background-color: #49A8EA;color: #FFFFFF;}
  .hover_operation p:hover b{color: #FFFFFF;}
  .hover_operation{
    position: relative;
    z-index: 3;
    width: 160px;
    right: -88px;
    top: 11px;
    padding: 15px 0;
    display: none;
    box-shadow: 0 0 5px black;
    background-color: #FFFFFF;
    border-radius: 8px;
  }
  .kailong{
    width:0;
    height:0;
    position: absolute;
    top: 26px;
    right: -10px;
    border-top:10px solid transparent;
    border-bottom:10px solid transparent;
    border-left:10px solid #fff;
  }

  .hover_operate:hover .kailong{display: block;}
  .icon{margin:2.5px 3px 0 0;}
  .hover_operate p{padding:5px 15px;}

  .hover_operate p:nth-child(2){color: #49a9ea !important;}/*入账*/
  .hover_operate p:nth-child(3){color: #f00 !important;}/*作废*/
  .hover_operate p:nth-child(4){color: #c700df !important;}/*查看票样*/
  .hover_operate p:nth-child(5){color: #31a831 !important;}/*支票填开*/
  .hover_operate p:nth-child(6){color: #d38702 !important;}/*空白支票外带*/
  .hover_operate p:nth-child(7){color: #fd6802 !important;}/*空白支票作废*/
  .hover_operate p:nth-child(8){color: #31a831 !important;}/*支票填开*/
  .hover_operate p:nth-child(10){color: #f00 !important;}/*作废*/



</style>
