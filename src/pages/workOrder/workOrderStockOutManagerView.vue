<template>
    <div>
      <yhm-managerpage style="margin: 0;" category="1" mainWidth="1050" mainHeight="658" menu-tab-width="1014"  :total-table="true" :totalWidth="true">
        <!--导航条-->
        <template #navigation>基本信息</template>
        <template #choose>
          <div style="padding-bottom: 20px;width: 1014px;margin: 0 auto;display: flex;">
            <yhm-commonbutton value="选中信息出库" icon=" " @call="stockOutEvent()" category="three" :flicker="true"></yhm-commonbutton>
          </div>
        </template>
        <!--数据表头-->
        <template #listHead>
          <yhm-managerth style="width: 40px;" title="选择" ></yhm-managerth>
<!--          <yhm-managerth style="width: 38px" title="查看"></yhm-managerth>-->
          <yhm-managerth title="商品名称"></yhm-managerth>
          <yhm-managerth title="规格型号"></yhm-managerth>
          <yhm-managerth style="width: 120px" title="拆分数量"></yhm-managerth>
          <yhm-managerth style="width: 120px" title="整件数量"></yhm-managerth>
          <yhm-managerth style="width: 120px" title="能否出库"></yhm-managerth>
          <yhm-managerth style="width: 120px" title="出库状态"></yhm-managerth>

        </template>

        <!--数据明细-->
        <template #listBody>
          <tr v-for="(item,index) in content" :class="[{InterlacBg:index%2!=0}]" :key="item.id">
            <yhm-manager-td-checkbox :value="item" @call="checkCall" v-if="item.state=='可以出库'&&item.stateStr=='未出库'"></yhm-manager-td-checkbox>
            <yhm-manager-td value=" " class="select" v-else></yhm-manager-td>
<!--            <svg t="1595488452290" class="icon" v-else viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="548" width="18" height="18"><path d="M873.094737 873.094737c91.621053-91.621053 150.905263-220.968421 150.905263-361.094737C1024 231.747368 792.252632 0 512 0c-140.126316 0-269.473684 59.284211-361.094737 150.905263C59.284211 242.526316 0 371.873684 0 512 0 792.252632 231.747368 1024 512 1024c140.126316 0 269.473684-59.284211 361.094737-150.905263zM970.105263 512c0 118.568421-43.115789 220.968421-118.568421 301.810526l-646.736842-646.736842C291.031579 97.010526 393.431579 53.894737 512 53.894737 765.305263 53.894737 970.105263 258.694737 970.105263 512z m-916.210526 0c0-118.568421 43.115789-220.968421 118.568421-301.810526l646.736842 646.736842c-80.842105 70.063158-188.631579 118.568421-301.810526 118.568421C258.694737 970.105263 53.894737 765.305263 53.894737 512z" fill="#d81e06" p-id="549"></path></svg>-->
<!--            <yhm-manager-td-look @click="listView(item)"></yhm-manager-td-look>-->
            <yhm-manager-td :value="item.product"></yhm-manager-td>
            <yhm-manager-td-center :value="item.model"></yhm-manager-td-center>
            <yhm-manager-td-center :value="item.mdo"></yhm-manager-td-center>
            <yhm-manager-td-center :value="item.quantity+''"></yhm-manager-td-center>
            <yhm-manager-td-center :value="item.state" :color="item.state=='不可出库'?'#999':'#49a9ea'"></yhm-manager-td-center>
            <yhm-manager-td-center :value="item.stateStr"></yhm-manager-td-center>

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
  export default {
    name: 'workOrderStockOutManagerView',
    mixins: [managermixin],
    data(){
      return{
        content:[],
        params:[]
      }
    },
    methods:{
      stockOutEvent(){
        if(this.selectValue.length!=0){
          this.$dialog.confirm({
            width: 300,
            tipValue: '是否提交出库?',
            alertImg: 'warn',
            okCallBack: (data)=>{
              this.ajaxJson({
                url: '/fix/stock/stockOut',
                // loading:'0',
                data:{
                  id:this.flowPathID,
                  list:this.params
                },
                call: (data) => {
                  this.$dialog.setReturnValue(this.id)
                  this.$dialog.alert({
                    alertImg: 'ok',
                    tipValue: '出库成功',
                    closeCallBack: () => {
                      // this.$dialog.close()
                      this.ajaxJson({
                        url: '/stock/stockout/updateToStockout',
                        data: {
                          id:data.id,
                          state:2
                        },
                        call: (datas) => {
                          if(datas){

                          }
                        }
                      })

                      this.initData()
                    }
                  })
                }
              })
            }
          })
        }else{
          this.$dialog.alert({
            tipValue:'最少要选择一条进行出库',
            alertImg:'warn',
            width:'300'
          })
        }

      },
      checkCall(){
        this.params = []
        let arr = []
        for(let i=0; i<this.selectValue.length; i++){
          arr.push(this.selectValue[i])
        }
        for (let j=0; j<this.content.length; j++) {
          for(let k=0; k<arr.length; k++){
            if(this.content[j].id==arr[k]){
              this.params.push(this.content[j])
            }
          }
        }
      },
      listView(item){

      },
      initData () {
        let ownerID = []
        let id = ''
        this.ajaxJson({
          url: '/fix/fixOrderMaterial/initForm',
          data: {
            ownerID:this.ownerID,
          },
          call: (datas) => {
            for(let i in datas.list){
              ownerID.push(datas.list[i].id)
            }
            id = ownerID.join(',')
            let params = {
              ids:id,
            }
            this.ajaxJson({
              url: '/fix/stock/getList',
              data: params,
              call: (data) => {
                if(data){
                  this.content = data
                  // if(data.content.length!=0){
                  //   this.$dialog.setReturnValue('111111111111111111') //向父级页面id值
                  // }

                }
              }
            })
          }
        })

      }
    },
    created () {
      this.setQuery2Value('ownerID')//工单ID
      this.setQuery2Value('flowPathID')//主流程表ID
      this.setQuery2Value('index')//节点索引值
      this.setQuery2Value('upDateStateID')//节点ID更新当前节点状态
      console.log( this.ownerID,'------' )
      if(this.index!=0&&this.index!=undefined){
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
.select{
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: url("../../../static/css/images/workOrderImg/jinxuan.png");
  background-repeat:no-repeat;
  background-position:center;
}
</style>
