<template>
  <div>
    <yhm-managerpage>
      <!--      导航条      -->
      <template #navigation>业务管理&nbsp;&gt;&nbsp;库存管理&nbsp;&gt;&nbsp;出库管理</template>
      <!--      操作区      -->
      <template #operate>
        <yhm-commonbutton value="添加出库信息"  icon="btnAdd" :flicker="true" @call="add" category="one"></yhm-commonbutton>
        <yhm-commonbutton value="出库单打印"  icon="btnAdd" :flicker="true" @call="shuibianss" category="one"></yhm-commonbutton>
        <yhm-commonbutton :value="choose?'收起筛选':'展开筛选'" :icon="choose?'btnUp':'btnDown'" @call="switchChoose()"></yhm-commonbutton>
        <yhm-managersearch :value="searchStr" :history="shortcutSearchContent" id="searchStr" @call="initPageData"></yhm-managersearch>
      </template>
      <!--筛选区-->
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
        <yhm-managerth style="width: 270px;" title="出库编号"></yhm-managerth>
        <yhm-managerth style="width: 170px" title="总金额"></yhm-managerth>
        <yhm-managerth style="width: 170px" title="提交" ></yhm-managerth>
      </template>
      <!--      数据表单       -->
      <template #listBody >
        <tr :class="[{twinkleBg: item.id==lastData},{InterlacBg:index%2!=0}]" v-for="(item,index) in content" :key="index">
          <yhm-manager-td-checkbox :value="item" @call="check(selectValue,index)"></yhm-manager-td-checkbox>
          <yhm-manager-td-look @click="listView(item)"></yhm-manager-td-look>
          <yhm-manager-td :value="item.createNameStr"></yhm-manager-td>
          <yhm-manager-td-date :value="item.insertDate.slice(0,10)"></yhm-manager-td-date>
          <yhm-manager-td :value="item.category"></yhm-manager-td>
          <yhm-manager-td :value="item.applicableModels"></yhm-manager-td>
          <yhm-manager-td :value="item.code"></yhm-manager-td>
          <yhm-manager-td-money :value="item.totalStr+''" ></yhm-manager-td-money>
<!--          <yhm-manager-td :value="pos+''" @click="post(item)" :color="item.state == 1 ? 'rgba(0,0,0,0.4)' : '#333333'"></yhm-manager-td>-->
          <yhm-manager-td-operate>
            <yhm-manager-td-operate-button @click="printFund(item,'1')" :no-click="item.state == '0'?false:true"  value="提交申请" icon="i-btn-applicationSm" :color="item.state == '0'?'#49a9ea':'#333'"></yhm-manager-td-operate-button>

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
  //console
  import { managermixin } from '@/assets/manager.js'
  export default {
    name: "stockOutManager",
    mixins: [managermixin],
    data(){
      return{
        color:'#333333',
        pos:'提交',
        lastData:'1',
        people:'',
        one:'',
        cont:'',
        content:'',
        applicableModelsPsd:{
          value:'',
          list:[]
        },
        listCategory:{
          value:'',
          list:[]
        },
        state:{
          value:'',
          list:[
            {
              code:'',
              img:'',
              num:'0',
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
              num:'',
              showName:'全部'
            },
          ]
        },
        select:'',
        lid:[],
      }
    },

    methods:{
      check(selectValue){
        this.select=selectValue
        console.log(selectValue);
        for (let i in selectValue ) {
          this.lid=selectValue[i]
        }
      },
      //出库单打印
      shuibianss(){

        if(this.select.length==1 ){
          this.ajaxJson({
            url:'/stock/stockout/print',
            data:{
              id:this.lid.id,
            },
            call:(data)=>{
              console.log(data);
              window.open('/UploadFile/'+data.message)
            }
          })
        }else if(this.select.length==0){
          this.$dialog.confirm({
            width: 300,
            tipValue: ' 必须选择一条数据',
            btnValueOk: '确定',
            alertImg: 'warn',
            okCallBack: (data) => {
            }
          })
        }else{
          this.$dialog.confirm({
            width: 300,
            tipValue: ' 只能选择一条',
            btnValueOk: '确定',
            alertImg: 'warn',
            okCallBack: (data) => {
            }
          })
        }
      },
      post(item){
        if(item.state==0){
          this.$dialog.confirm({
            width: 300,
            tipValue: ' 确认此操作?',
            btnValueOk: '确定',
            alertImg: 'warn',
            okCallBack: (data) => {
              let params = {
                id: item.id,
                state: '1'
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
      add() {
        this.$dialog.OpenWindow({
          width: 1050,
          height: 720,
          url:'/stockOutForm?type=0',
          title:'添加出库信息',
          closeCallBack:(data) =>{
            if (data) {
              this.lastData = data//接收子页面传的值
              this.initPageData(false)
            }
          }
        })
      },
      listView(item){
        if(item.state=='0'){
          this.$dialog.OpenWindow({
            width: 1050,
            height: 650,
            url:'/stockOutOperateView?id=' + item.id ,
            title:'查看出库信息',
            closeCallBack:(data) =>{
              this.initPageData(false)
              if (data) {
                this.lastData = data//接收子页面传的值

              }
            }
          })
        }else {
          this.$dialog.OpenWindow({
            width: 1050,
            height: 650,
            url:'/stockOutView?id=' + item.id ,
            title:'查看出库信息'
          })
        }
        this.cont=item.person

      },


      initPageData (initValue) {
        let params = {}
        if (initValue) {
          // 页面初始化是需要的参数
          params = {

          }
        } else {
          // 页面非初始化时需要的参数
          params = {
            init: false,
            searchStr:this.searchStr,
            category: this.listCategory.value,
            applicableModels:this.applicableModelsPsd.value,
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
            this.applicableModelsPsd.list = data.applicableModels.list
            this.applicableModelsPsd.value = data.applicableModels.value
            this.listCategory.list=data.categoryPsd.list
            this.listCategory.value=data.categoryPsd.value
          }
        })
      },
      printFund(item,state){

        let tipValue = ''
        if(state=='1'){
          tipValue = '是否提交申请?'
        }else{
          tipValue = '是否入库?'
        }
        let params = {
          id:item.id,
          state:'2',
        }
        this.$dialog.confirm({
          width: 300,
          tipValue: tipValue,
          alertImg: 'warn',
          okCallBack: (data)=>{
            this.ajaxJson({
              url: '/stock/stockout/updateToStockout',
              data: params,
              call: (data) => {
                if (data.type === 0) {
                  this.$dialog.setReturnValue(this.id)
                  this.$dialog.alert({
                    alertImg: 'ok',
                    tipValue: data.message,
                    closeCallBack: () => {
                      // this.$dialog.close()
                      this.initPageData(false)
                    }
                  })
                } else {
                  this.$dialog.alert({
                    alertImg: 'warn',
                    tipValue: data.message
                  })
                }
              }
            })
          }
        })
      },
      },

  }
</script>

<style scoped>

</style>
