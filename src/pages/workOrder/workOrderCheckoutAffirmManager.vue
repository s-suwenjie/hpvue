<template>
    <div class="f_main">
      <div class="f_split"></div>
      <yhm-form-list-edit>
        <template #title>工单详情</template>
        <template #operate>
          <!--<yhm-commonbutton  value="清空工序服务" icon=" " :is-error="true" @call="delProduct"></yhm-commonbutton>-->
          <!--<yhm-commonbutton  value="添加工序服务" :flicker="true" icon="btnAdd" @call="addProduct"></yhm-commonbutton>-->
        </template>
        <template #listHead>
          <!--<yhm-managerth style="width: 50px" title="序号"></yhm-managerth>-->
          <yhm-managerth width="150" title="项目名称"></yhm-managerth>
          <yhm-managerth width="140" title="发生日期"></yhm-managerth>
          <yhm-managerth width="100" title="变化金额"></yhm-managerth>
          <yhm-managerth width="100" title="收支方向"></yhm-managerth>
          <yhm-managerth title="修改返修流程"></yhm-managerth>
          <!--<yhm-managerth style="width: 40px" title="删除"></yhm-managerth>-->
        </template>
        <template #listBody>
          <tr v-for="(item,index) in list" :key="index" :class="{InterlacBg:index%2!==0}">
            <!--<yhm-form-td-textbox width="45" style="text-align: center;" no-edit="1" id="num" :list="list" listid="list" :value="item"></yhm-form-td-textbox>-->
            <yhm-form-td-textbox width="150" style="text-align: center;" id="name" no-edit="1" :list="list" listid="list" :value="item"></yhm-form-td-textbox>
            <yhm-form-td-date width="140" style="text-align: center;" no-edit="1" id="workDate" :list="list" listid="list" :value="item"></yhm-form-td-date>
            <yhm-form-td-textbox width="100" style="text-align: center;" no-edit="1" id="money" :list="list" listid="list" :value="item"></yhm-form-td-textbox>
            <yhm-form-td-textbox width="100" style="text-align: center;" no-edit="1" id="directionName" :list="list" listid="list" :value="item"></yhm-form-td-textbox>
            <yhm-form-td-checkbox width="470" :key="key" :required-list="requiredList" @deleteEvent="deleteChange" :no-edit="state=='1'?'1':'0'" style="text-align: center;" :select-list="teamNameList" id="teamid" :list="list" listid="list" :value="item" rule="#"></yhm-form-td-checkbox>
            <!--<yhm-form-td-select-dialog width="100" @call="selectServe(item)" no-edit="1" :key="key" id="personName" :list="list" listid="list" :value="item" rule="#" style="text-align: center;"></yhm-form-td-select-dialog>-->
          </tr>
        </template>
        <template #empty>
          <span class="m_listNoData" v-show="list.length=='0'?true:false">暂时没有数据</span>
        </template>
      </yhm-form-list-edit>
      <yhm-formoperate>
        <template #btn>
          <yhm-commonbutton value="确认完成修改" color="#00b86b" icon="i-complete" v-show="inTheEnd=='true'&&state=='0'" @call="affirmClick" category="three"></yhm-commonbutton>
          <yhm-commonbutton value="添加下一步返修工序" :flicker="true" v-show="inTheEnd=='true'&&state=='1'"  @call="questionedClick" category="three"></yhm-commonbutton>
        </template>
      </yhm-formoperate>
    </div>
</template>

<script>
  import { formmixin } from '@/assets/form.js'
  import { guid, selectClick, selectdbClick, selectConfirm, selectComputedSelected } from '@/assets/common.js'
  export default {
    name: 'workOrderCheckoutAffirmManager',
    mixins: [formmixin],
    data(){
      return{
        list:[],
        state:'0',
        key:0,
        affirmShow:true,//是否已完成
        requiredList:['0','3'],//维修工序必选的流程
        teamNameList:[],//维修流程素材
        directionList:[],//收支方向素材
        pager: {
          total: 0, // 总条数
          pageSize: 10, // 每页条数
          pageIndex: 1, // 当前页码
          selectCount: 0 // 选中条数
        }
      }
    },
    methods:{
      deleteChange(item,index,value){
        if(index=='3'){

          if(value.teamid.indexOf('3')=='-1'){
            alert()
            value.teamid.push('3')
          }

        }
      },
      listView(item){
        this.$dialog.OpenWindow({
          width: '1050',
          height: '600',
          url:'/workOrderServiceView?ownerID='+this.ownerID+'&id='+item.id+'&flowPathID='+this.flowPathID+'&subProcessID='+this.subProcessID,
          title:'编辑工单详情',
          closeCallBack:(data) =>{
            if (data) {
              this.initData(false)
            }
          }
        })
      },
      updateStatus(){//更新工序状态
        let params = {
          id:this.upDateStateID,
          ownerID:this.flowPathID,
          state:'1'
        }
        this.ajaxJson({
          url: '/fix/fixProcessDetail/save',//更新子流程表状态
          data: params,
          call: (datas) => {

          }
        })
      },
      affirmClick(){//确认完成修改
        this.$dialog.confirm({
            width: 350,
            tipValue: '是否确认完成,进入返修流程阶段？',
            btnValueOk: '确认',
            btnValueCancel: '取消',
            alertImg: 'warn',
            okCallBack: () => {
              this.ajaxJson({
                url: '/fix/fixProcessDetail/change',
                data: {
                  revenueList:this.list,
                  processDetail:{
                    id:this.upDateStateID,
                    ownerID:this.flowPathID,
                    state:'2'
                  }
                },
                call: (datas) => {
                  this.ajaxJson({
                    url: '/fix/fixProcess/update',
                    data: {
                      stage:Number(this.index),
                      id:this.flowPathID,//主流程表ID
                      ownerID:this.ownerID,//工单ID
                    },
                    call: (data)=>{
                      if(data.type==0){
                        this.$dialog.alert({
                          tipValue: data.message,
                          closeCallBack: () => {
                            // this.state='1'
                            // this.affirmShow = false
                            // this.key++
                            this.$dialog.close()
                          }
                        })
                      }else{
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
              // this.ajaxJson({
              //   url: '/fix/fixOrderRevenue/saveAgein',
              //   data: this.list,
              //   call: (data) => {
              //     if(data.type==0){
              //       this.$dialog.alert({
              //         tipValue: data.message,
              //         closeCallBack: () => {
              //           this.state='1'
              //           this.affirmShow = false
              //           this.updateStatus()
              //         }
              //       })
              //     }else{
              //       this.$dialog.alert({
              //         alertImg: 'error',
              //         tipValue: data.message,
              //         closeCallBack: () => {
              //         }
              //       })
              //     }
              //   }
              // })
            }
        })
      },
      questionedClick() {//下一步
        this.$dialog.OpenWindow({
          width: '1050',
          height: '700',
          url: '/workOrderProcessForm?nodeType=6&state=2&ownerID=' + this.ownerID + '&flowPathID=' + this.flowPathID + '&index=' + this.index,
          // url:'/workOrderDetailsManagerView?ownerID='+this.ownerID+'&flowPathID='+this.flowPathID+'&operationShow=1'+'&index='+this.index+'&upDateStateID='+this.upDateStateID,
          title: '添加检修工序',
          closeCallBack: (data) => {
            if (data) {
              this.$dialog.close()
            }
          }
        })
      },
      initDate(){
        let params = {
          ownerID:this.ownerID,
          reveworkids:this.dependid,
          state:'2',
          stateStr:'0'
        }
        this.ajaxJson({
          url: '/fix/fixOrderDetail/initForm',
          data: params,
          call: (data) => {
            if(data){
              // this.list = data.list
              this.id = data.id
              this.teamNameList = data.teamNamePsd.list
              this.categoryList = data.categoryPsd.list
              this.directionList = data.directionPsd.list
              this.applicableModels = data.applicableModels
              this.category = data.category
              for(let i in data.list){
                this.list.push({
                  id:data.list[i].id,
                  processid:data.list[i].processid,
                  name:data.list[i].name,
                  ownerID:data.list[i].ownerID,

                  modelid:data.list[i].modelid,
                  model:data.list[i].model,
                  workDate:data.list[i].workDate,
                  category:data.list[i].category,
                  direction:data.list[i].direction,
                  directionName:this.directionList[data.list[i].direction].showName,
                  money:data.list[i].money,
                  remark:data.list[i].remark,
                  state:data.list[i].state,
                  repair:data.list[i].repair,
                  productid:data.list[i].productid,
                  orderid:this.ownerID,
                  stateStr:data.list[i].stateStr,
                  personid:data.list[i].personid,
                  departid:data.list[i].departid,
                  teamid:data.list[i].teamid,
                })
              }
            }
          }
        })
      }
    },
    created () {
      this.setQuery2Value('dependid')//质检确认dependid
      this.setQuery2Value('ownerID')//工单id
      this.setQuery2Value('index')//节点索引值
      this.setQuery2Value('state')//当前质疑是否已完成
      this.setQuery2Value('inTheEnd')//是否为最后一个节点
      this.setQuery2Value('flowPathID')//主流程表ID
      this.setQuery2Value('upDateStateID')//更新工序状态
      if(this.dependid==null){
        this.dependid = ''
      }
      this.initDate()

    }
  }
</script>

<style scoped>

</style>
