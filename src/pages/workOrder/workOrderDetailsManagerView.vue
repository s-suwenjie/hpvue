<template>
    <div>
      <yhm-managerpage style="margin: 0;" category="1" mainWidth="1050" mainHeight="658" menu-tab-width="1014"  :total-table="true" :totalWidth="true">
        <!--导航条-->
        <template #navigation>基本信息</template>
        <template #choose>
          <div style="padding-bottom: 20px;width: 1014px;margin: 0 auto;display: flex;">
            <yhm-commonbutton value="添加" icon="btnAdd" @call="addDetail()" category="three"></yhm-commonbutton>

          </div>
        </template>

        <!--数据表头-->
        <template #listHead>
          <yhm-managerth style="width: 38px" title="查看"></yhm-managerth>
          <yhm-managerth  title="项目名称"></yhm-managerth>
          <yhm-managerth style="width: 120px;" title="创建日期"></yhm-managerth>
          <yhm-managerth style="width: 120px;" title="变化金额"></yhm-managerth>
          <yhm-managerth style="width: 120px;" title="折扣价"></yhm-managerth>
          <yhm-managerth style="width: 80px;" title="收支方向"></yhm-managerth>
<!--          <yhm-managerth style="width: 80px;" title="收支类型"></yhm-managerth>-->
          <yhm-managerth  title="备注"></yhm-managerth>
          <yhm-managerth style="width: 80px" title="状态"></yhm-managerth>
          <yhm-managerth v-show="operationShow==1" style="width: 160px;" title="操作"></yhm-managerth>
        </template>

        <!--数据明细-->
        <template #listBody>
          <tr v-for="(item,index) in content" :class="[{InterlacBg:index%2!=0}]" :key="item.id">
            <yhm-manager-td-look @click="listView(item)"></yhm-manager-td-look>
            <yhm-manager-td :value="item.name"></yhm-manager-td>
            <yhm-manager-td-date :value="item.workDate"></yhm-manager-td-date>
            <yhm-manager-td-money :value="item.money+''"></yhm-manager-td-money>
            <yhm-manager-td-money :value="item.discount+''"></yhm-manager-td-money>

            <yhm-manager-td-psd :value="item.direction" :list="directionList"></yhm-manager-td-psd>
<!--            <yhm-manager-td-psd :value="item.category" :list="categoryList"></yhm-manager-td-psd>-->
            <yhm-manager-td-center :value="item.remark"></yhm-manager-td-center>
            <yhm-manager-td-psd :value="item.state+''" :list="stateList"></yhm-manager-td-psd>
            <yhm-manager-td-operate  v-show="operationShow==1">
              <yhm-manager-td-operate-button @click="nextStep(item)" value="添加到下一步流程" icon="i-btn-applicationSm" color="#49a9ea"></yhm-manager-td-operate-button>
            </yhm-manager-td-operate>
          </tr>
        </template>
        <!--数据空提示-->
        <template #empty>
          <span class="m_listNoData" v-show="content.length!='0'?false:true">暂时没有数据</span>
        </template>
        <!--分页控件-->
        <template #pager>
          <yhm-pagination :pager="pager" isPageSize="false" @initData="initData(false)"></yhm-pagination>
        </template>
      </yhm-managerpage>
    </div>
</template>

<script>
  import { managermixin } from '@/assets/manager.js'
  import { guid } from '@/assets/common'
  export default {
    name: 'workOrderDetailsManagerView',
    mixins: [managermixin],

    data(){
      return{
        orderid:'',
        content:[],
        categoryList:[],
        stateList:[],
        directionList:[],
        teamNameList:[],//班组
        departmentList:[],//部门
        operationShow:'',
        category:'',//cID
        applicableModels:'',//aID
        pager: {
          total: 0, // 总条数
          pageSize: 10, // 每页条数
          pageIndex: 1, // 当前页码
          selectCount: 0 // 选中条数
        }
      }
    },
    methods:{
      nextStep(item){//选择当前服务生成下一步节点
        this.$dialog.confirm({
          width: 320,
          tipValue: '是否选择当前服务,并生成下一流程？',
          btnValueOk: '确认',
          btnValueCancel: '取消',
          alertImg: 'warn',
          okCallBack: (datas) => {
            let params = {
              'nameStr':item.name,
              'id':guid(),
              'ownerID':this.flowPathID,
              'dependid':item.id,
              'stage':'2',
              'state':'0',
              'type':'3',
              'orderStr':this.index
            }
            this.ajaxJson({
              url: '/fix/fixProcessDetail/save',
              data: params,
              call: (data) => {
                if (data.type === 0) {
                  this.$dialog.alert({
                    tipValue: data.message,
                    closeCallBack: () => {
                      this.$dialog.close()
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
          width: '1050',
          height: '600',
          url:'/workOrderAddDetailsForm?ownerID='+this.ownerID+'&orderid='+this.orderid+'&id='
            +item.id+'&aid='+this.applicableModels+'&cid='+this.category+'&flowPathID='+this.flowPathID
            +'&worktype='+this.worktype,
          title:'编辑工单详情',
          closeCallBack:(data) =>{
            if (data) {
              // stockType: "0"
              // storageType: "1"
              this.initData(false)
            }
          }
        })
      },
      addDetail(){
        this.$dialog.OpenWindow({
          width: '1050',
          height: '600',
          url:'/workOrderAddDetailsForm?ownerID='+this.ownerID+ '&id='+'&orderid='+this.orderid +'&flowPathID='
            +this.flowPathID+'&worktype='+this.worktype,
          title:'添加工单详情',
          closeCallBack:(data) =>{
            if (data) {
              this.initData(false)
              this.ajaxJson({//出库后确认定损录制单及其详情金额
                url: '/fix/fixOrder/saveConfirm',
                data: {
                  ownerID:this.ownerID
                },
                call: (datas) => {
                  if(datas.type='0'){
                    this.flowPath(data)

                  }
                }
              })
            }
          }
        })
      },
      flowPath(data){
        if(data.type==0){
          let params = {
            id:this.flowPathID,
            ownerID:this.ownerID,
            state:0,
            order:0,
            name:'定损单详情',
            dependid:this.flowPathID,
          }
          this.ajaxJson({
            url: '/fix/fixProcessDetail/save',
            data:params,
            call: (parameters) => {
              if(parameters.type==0){
                this.initData(false)
              }

            }
          })
        }
      },
      // skip(){
      //   this.ajaxJson({
      //     url: '/fix/fixProcess/update',
      //     // loading:'0',
      //     data: {
      //       stage:'2',
      //       id:this.flowPathID,//主流程表ID
      //       ownerID:this.ownerID,//工单ID
      //     },
      //     call: (data)=>{
      //     }
      //   })
      // },
      initData () {
        let params = {
          id:this.id,
          ownerID:this.ownerID,
          state:'0',
          pageSize:this.pager.pageSize,
          pageIndex:this.pager.pageIndex
        }
        this.ajaxJson({
          url: '/fix/fixOrderDetail/saveInitForm',
          data: params,
          call: (data) => {
            this.applicableModels = data.applicableModelsStr
            this.category = data.categoryStr
            // if(data.id!=''){
              this.content = data.returnList.content
              this.pager.total = data.returnList.count
              this.id = data.id
              this.orderid = data.id
              this.categoryList = data.categoryPsd.list
              this.stateList = data.statePsd.list
              this.directionList = data.directionPsd.list
              this.teamNameList = data.teamNamePsd.list
              this.departmentList = data.departmentPsd.list
            // }else{
            //   this.ajaxJson({
            //     url: '/fix/fixOrderDetail/save',
            //     data: {
            //       id:this.id,
            //       ownerID:this.ownerID,
            //     },
            //     call: (data) => {
            //       this.ajaxJson({//如果是新建主表则再次查询赋值
            //         url: '/fix/fixOrderDetail/initForm',
            //         data: params,
            //         call: (data) => {
            //           this.applicableModels = data.applicableModelsStr
            //           this.category = data.categoryStr
            //           this.content = data.list
            //           // this.id = data.id
            //           this.orderid = data.id
            //           this.categoryList = data.categoryPsd.list
            //           this.stateList = data.statePsd.list
            //           this.directionList = data.directionPsd.list
            //           this.teamNameList = data.teamNamePsd.list
            //           this.departmentList = data.departmentPsd.list
            //         }
            //       })
            //       console.log(  data,'----------')
            //     }
            //   })
            // }
          }
        })
      }
    },
    created () {
      // this.setQuery2Value('id')
      this.id = guid()
      this.setQuery2Value('flowPathID')
      this.setQuery2Value('index')
      this.setQuery2Value('ownerID')
      this.setQuery2Value('worktype')
      this.setQuery2Value('operationShow')
      this.setQuery2Value('upDateStateID')//更改子表状态的id
      // if(this.index!=0&&this.index!=undefined){
      //   let params = {
      //     id:this.upDateStateID,
      //     ownerID:this.flowPathID,
      //     state:'1'
      //   }
      //   this.ajaxJson({
      //     url: '/fix/fixProcessDetail/confirm',
      //     data: params,
      //     call: (datas) => {
      //
      //     }
      //   })
      // }
      this.initData()
      // this.skip()
    }

  }
</script>

<style scoped>

</style>
