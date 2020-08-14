<template>
    <div>
      <yhm-managerpage style="margin: 0;" category="1" mainWidth="1050" mainHeight="658" menu-tab-width="1014"  :total-table="true" :totalWidth="true">
        <!--导航条-->
        <template #navigation>基本信息</template>
        <template #choose>
          <div style="padding-bottom: 20px;width: 1014px;margin: 0 auto;display: flex;">
            <yhm-commonbutton value="添加" icon="btnAdd" :flicker="true" @call="addDetail()" category="three"></yhm-commonbutton>
            <yhm-commonbutton value="准备出库" icon=" " @call="prepare()" category="three"></yhm-commonbutton>
          </div>
        </template>

        <!--数据表头-->
        <template #listHead>
          <yhm-managerth style="width: 38px" title="查看"></yhm-managerth>
          <yhm-managerth title="商品名称"></yhm-managerth>
          <yhm-managerth title="规格型号"></yhm-managerth>
          <yhm-managerth style="width: 120px" title="拆分数量"></yhm-managerth>
          <yhm-managerth style="width: 120px" title="整件数量"></yhm-managerth>
        </template>

        <!--数据明细-->
        <template #listBody>
          <tr v-for="(item,index) in content" :class="[{InterlacBg:index%2!=0}]" :key="item.id">
            <yhm-manager-td-look @click="listView(item)"></yhm-manager-td-look>
            <yhm-manager-td :value="item.product"></yhm-manager-td>
            <yhm-manager-td-center :value="item.model"></yhm-manager-td-center>
            <yhm-manager-td-center :value="item.mdo"></yhm-manager-td-center>
            <yhm-manager-td-center :value="item.quantity+''"></yhm-manager-td-center>
          </tr>
        </template>
        <!--数据空提示-->
        <template #empty>
          <span class="m_listNoData" v-show="content.length!='0'?false:true">暂时没有数据</span>
        </template>
<!--        &lt;!&ndash;分页控件&ndash;&gt;-->
<!--        <template #pager>-->
<!--          <yhm-pagination :pager="pager" isPageSize="false" @initData="initData(false)"></yhm-pagination>-->
<!--        </template>-->
      </yhm-managerpage>

    </div>
</template>

<script>
  import { managermixin } from '@/assets/manager.js'
  import { guid } from '@/assets/common'
  export default {
    name: 'workOrderMaterialListManagerView',
    mixins: [managermixin],
    data(){
      return{
        content:[],
        confirm:'',
        // pager: {
        //   total: 0, // 总条数
        //   pageSize: 10, // 每页条数
        //   pageIndex: 1, // 当前页码
        //   selectCount: 0 // 选中条数
        // }
      }
    },
    methods:{
      //准备出库
      prepare(){
        this.$dialog.OpenWindow({
          width: '1050',
          height: '700',
          url:'/workOrderStockOutManagerView?flowPathID='+this.flowPathID+'&ownerID='+this.ownerID,
          title:'出库详情列表',
          closeCallBack:(data) =>{
            if (data) {
              this.initData(false)
            }
          }
        })
        if(this.confirm==-1){
          this.ajaxJson({//出库后确认定损录制单及其详情金额
            url: '/fix/fixOrder/fixedConfirm',
            loading:'0',
            data: {
              ownerID:this.ownerID
            },
            call: (datas) => {
              this.ajaxJson({//确认工单材料表及其详情
                url: '/fix/fixOrder/fixMaterialConfirm',
                loading:'0',
                data: {
                  ownerID:this.ownerID
                },
                call: (datas) => {
                }
              })
            }
          })
        }
      },
      listView(item){
        this.$dialog.OpenWindow({
          width: '1050',
          height: '600',
          url:'/workOrderMateriaListForm?ownerID='+this.ownerID+'&id='+item.id+'&cid='+this.cid+'&flowPathID='+this.flowPathID,
          title:'出库详情列表',
          closeCallBack:(data) =>{
            if (data) {
              this.initData(false)
            }
          }
        })
      },
      addDetail(){
        this.$dialog.OpenWindow({
          width: '1050',
          height: '600',
          url:'/workOrderMateriaListForm?ownerID='+this.ownerID +'&orderid='+ this.id +'&cid='+this.cid+'&flowPathID='+this.flowPathID,
          title:'添加工单材料详情',
          closeCallBack:(data) =>{
            if (data) {
              this.initData(false)
              // this.flowPath(data)
            }
          }
        })
      },
      // flowPath(data){
      //   if(data.message=='添加成功'&&this.content.length==1){
      //     let params = {
      //       id:guid(),
      //       ownerID:this.flowPathID,
      //       state:0,
      //       order:0,
      //       name:'工单材料表',
      //       dependid:guid(),
      //     }
      //     this.ajaxJson({
      //       url: '/fix/fixProcessDetail/save',
      //       data:params,
      //       call: (parameters) => {
      //         if(parameters.type==0){
      //           this.ajaxJson({
      //             url: '/fix/fixProcess/save',
      //             data:{
      //               id:guid(),
      //               ownerID:this.ownerID,
      //               state:1,
      //               name:'出库',
      //               stage:3,
      //             },
      //             call: (datas) => {
      //               if(datas){
      //                 this.$dialog.setReturnValue('1') //向父级页面id值
      //                 this.initData(false)
      //               }
      //             }
      //           })
      //         }
      //
      //       }
      //     })
      //   }
      // },
      initData () {
        let params = {
          ownerID:this.ownerID,
        }
        this.ajaxJson({
          url: '/fix/fixOrderMaterial/initForm',
          data: params,
          call: (data) => {
            if(data.id!=''){
              this.id = data.id
              this.content = data.list
              this.confirm = data.confirm
            }else{
              this.ajaxJson({
                url: '/fix/fixOrderMaterial/save',
                data: {
                  id:this.id,
                  ownerID:this.ownerID,
                },
                call: (data) => {
                }
              })
            }

          }
        })
      }
    },
    created () {
      this.id = guid()
      this.setQuery2Value('index')
      this.setQuery2Value('upDateStateID')
      this.setQuery2Value('flowPathID')
      this.setQuery2Value('ownerID')
      if(this.index!=0&&this.index!=2&&this.index!=undefined){
        let params = {
          id:this.upDateStateID,
          ownerID:this.flowPathID,
          state:'1'
        }
        this.ajaxJson({
          url: '/fix/fixProcessDetail/confirm',
          data: params,
          call: (datas) => {

          }
        })
      }
      this.initData()
    }
  }
</script>

<style scoped>

</style>
