<template>
  <div class="f_main">
    <yhm-formbody>
      <template #title>基本信息</template>
      <template #control>

        <yhm-view-control title="商品类型" :content="showname"></yhm-view-control>
        <yhm-view-control title="入库编号" :content="code"></yhm-view-control>
        <yhm-view-control title="适用车型" :content="carname"></yhm-view-control>
        <yhm-view-control title="入库日期" :content="workDate.slice(0,10)"></yhm-view-control>
        <yhm-view-control title="入库人员" :content="wareHouser"></yhm-view-control>
      </template>
    </yhm-formbody>
    <yhm-form-list-show style="margin-top: 20px;" v-show="detailsShow">
      <template #title>入库详情</template>
      <template #operate>
        <yhm-commonbutton value="添加" v-show="state=='0'?true:false" icon="btnAdd" @call="addDetail()" category="three"></yhm-commonbutton>
      </template>
      <template #listHead>
        <yhm-managerth style="width: 38px" title="查看"></yhm-managerth>
        <yhm-managerth title="商品名称"></yhm-managerth>
        <yhm-managerth title="规格型号"></yhm-managerth>
        <yhm-managerth style="width: 80px" title="数量"></yhm-managerth>
        <yhm-managerth style="width: 80px" title="拆分数量"></yhm-managerth>
        <yhm-managerth style="width: 120px;" title="单价"></yhm-managerth>
        <yhm-managerth style="width: 120px;" title="总价"></yhm-managerth>
        <yhm-managerth style="width: 120px;" title="含税单价"></yhm-managerth>
        <yhm-managerth style="width: 120px;" title="含税总价"></yhm-managerth>
      </template>
      <template #listBody>
        <tr v-for="(item,index) in detailList" :class="[{InterlacBg:index%2!=0}]" :key="item.id">
          <yhm-manager-td-look @click="listView(item)"></yhm-manager-td-look>
          <yhm-manager-td :value="item.product"></yhm-manager-td>
          <yhm-manager-td-center :value="item.model"></yhm-manager-td-center>
          <yhm-manager-td-rgt :value="item.quantity+item.uuStr+''"></yhm-manager-td-rgt>
          <yhm-manager-td-rgt :value="item.mdo+item.mdoStr+''"></yhm-manager-td-rgt>
          <yhm-manager-td-money :value="item.price+''"></yhm-manager-td-money>
          <yhm-manager-td-money :value="item.totalPrice+''"></yhm-manager-td-money>
          <yhm-manager-td-money :value="item.priceTax+''"></yhm-manager-td-money>
          <yhm-manager-td-money :value="item.totalPriceTax+''"></yhm-manager-td-money>
        </tr>
      </template>
      <template #pager>
        <yhm-pagination :pager="pager" is-page-size="false" @initData="listPage"></yhm-pagination>
      </template>
      <template #empty :createName="createName" :insertDate="insertDate" :updateName="updateName" :updateDate="updateDate">
        <span class="m_listNoData" v-show="empty">暂时没有数据</span>
      </template>
    </yhm-form-list-show>

  </div>
</template>

<script>
  import { accMul, accAdd, guid, formatDate,formatTime } from '@/assets/common.js'
  import { formmixin } from '@/assets/form.js'
  export default {
    name: "stockOperateView",
    mixins: [formmixin],
    data () {
      return {
        show:'false',
        category: '',
        content:[],
        categoryList: [],
        applicableModels:'',
        applicableModelsList:[],
        maxWorkDate:'',
        workDate:'',            //入库日期
        wareHouserId:'',        //入库人ID
        wareHouser:'',          //入库人员
        code:'',                //入库编号
        state:'',
        detail: [], // 列表数据
        detailsShow:false,//入库详情显示隐藏
        detailList:[],//入库详情列表
        empty:false,
        categoryNoEdit:false,
        modelsNoEdit:false,
        idm:'',
        showname:'',
        carname:'',
        pager: { // 分页数据
          total: '', // 数据总条数
          pageSize: 5, // 单页数据条数
          pageIndex: 1, // 当前页码
          selectCount: 0 // 选中数据的条数
        },
      }
    },
    methods:{
      printFund(idm,state){
        let tipValue = ''
        if(state=='1'){
          tipValue = '是否提交申请?'
        }else{
          tipValue = '是否入库?'
        }
        let params = {
          id:idm,
          state:state
        }
        this.$dialog.confirm({
          width: 300,
          tipValue: tipValue,
          alertImg: 'warn',
          okCallBack: (data)=>{
            this.ajaxJson({
              url: '/stock/stockIn/updateForState',
              data: params,
              call: (data) => {
                if (data.type === 0) {
                  this.$dialog.setReturnValue(this.id)
                  this.$dialog.alert({
                    alertImg: 'ok',
                    tipValue: data.message,
                    closeCallBack: () => {
                      // this.$dialog.close()
                      this.initData()
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

      //删除入库详情
      delFromList(id){
        let params = {
          id:id
        }
        this.$dialog.confirm({
          width: 300,
          tipValue: '是否删除?',
          alertImg: 'warn',
          okCallBack: (data)=>{
            this.ajaxJson({
              url: '/stock/stockInDetail/delete',
              data: params,
              call: (data) => {
                if (data.type === 0) {
                  this.$dialog.setReturnValue(this.id)
                  this.$dialog.alert({
                    alertImg: 'ok',
                    tipValue: data.message,
                    closeCallBack: () => {
                      this.initData()
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
      listView(item){
        this.$dialog.OpenWindow({
          width: 1050,
          height: 610,
          url: '/stockOperateviewView?id='+item.id,
          title: '查看入库商品详情',
          closeCallBack: (data) => {

          }
        })
      },
      addDetail () {
        this.$dialog.OpenWindow({
          width: 1050,
          height: 610,
          url: '/stockInDetailForm?type=1&ownerID='+this.id,
          title: '添加入库详情',
          closeCallBack: (data) => {
            if(data){
              this.initData()
              this.$dialog.setReturnValue(this.id)

            }

          }
        })
      },
      listPage(){
        let list = this.content.concat()
        this.pager.total=this.content.length
        this.pager.pageSize=5
        let a=(this.pager.pageIndex-1)*this.pager.pageSize
        let arr=[]
        arr=list.splice(a,this.pager.pageSize)
        this.detailList = arr
      },
      initData(){
        let params = {}
        if(this.type=='1'){//为1时是从添加跳转进来的
          this.detailsShow = false
        }else{
          this.detailsShow = true
          this.categoryNoEdit = true
          params = {
            id:this.id
          }
          this.idm=params.id
        }
        this.init({
          url: '/stock/stockIn/initForm',
          data:params,
          all: (data)=>{
            if(data){
              this.content = data.detailList
              this.detailList = data.detailList
              this.categoryList = data.categoryPsd.list
              this.category = data.categoryPsd.value
              this.applicableModelsList = data.applicableModelsPsd.list
              this.applicableModels = data.applicableModelsPsd.value
              this.code = data.code
              this.workDate = data.workDate
              this.wareHouserId = data.wareHouserId
              this.wareHouser = data.wareHouser
              this.state = data.state

              this.listPage()
              if(data.detailList!=null&&this.detailList.length!=0){
                this.empty = false
                this.modelsNoEdit = true
              }else{
                this.empty = true
                this.modelsNoEdit = false
              }
              this.showname=this.categoryList[this.category].showName
              this.carname=this.applicableModelsList[this.applicableModels].showName
            }
          },
          add: (data)=>{
            this.wareHouser = sessionStorage.getItem('____currentUser')
            this.wareHouserId = sessionStorage.getItem('____currentUserID')
            this.workDate = formatDate(new Date())
            this.maxWorkDate = this.workDate
          },
          look: (data)=>{
            this.name = data.name
          }
        })
      }

    },
    clearWareHouser(){
      this.wareHouserId = ""
    },
    created () {
      this.setQuery2Value('type')
      this.setQuery2Value('id')
      this.initData()

    }
  }

</script>

<style scoped>

</style>
