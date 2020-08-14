<template>
  <div>
    <yhm-managerpage style="margin: 0;" category="1" mainWidth="1050" mainHeight="658" menu-tab-width="1014"  :total-table="true" :totalWidth="true">
      <!--导航条-->
      <template #navigation>基本信息</template>
      <template #choose>
        <div style="padding-bottom: 20px;width: 1014px;margin: 0 auto;display: flex;">
        </div>
      </template>
      <!--数据表头-->
      <template #listHead>
<!--        <yhm-managerth style="width: 38px" title="选择"></yhm-managerth>-->
        <yhm-managerth style="width: 38px" title="查看"></yhm-managerth>
        <yhm-managerth style="width: 120px;" title="项目名称"></yhm-managerth>
        <yhm-managerth title="发生日期"></yhm-managerth>
        <yhm-managerth title="类型"></yhm-managerth>
        <yhm-managerth style="width: 120px" title="状态"></yhm-managerth>
        <yhm-managerth title="收支方向"></yhm-managerth>
        <yhm-managerth style="width: 120px;" title="变化金额"></yhm-managerth>
      </template>

      <!--数据明细-->
      <template #listBody>
        <tr v-for="(item,index) in content" @click="selectEvent(item)" :class="[{InterlacBg:index%2!=0}]" :key="item.id">
<!--          <yhm-manager-td-checkbox :value="item"  :no-click="false"></yhm-manager-td-checkbox>-->
          <yhm-manager-td-look @click="listView(item)"></yhm-manager-td-look>
          <yhm-manager-td :value="item.name"></yhm-manager-td>
          <yhm-manager-td :value="item.workDate"></yhm-manager-td>
          <yhm-manager-td-psd :value="item.category" :list="categoryList"></yhm-manager-td-psd>
          <yhm-manager-td-psd :value="item.state+''" :list="stateList"></yhm-manager-td-psd>
          <yhm-manager-td-psd :value="item.direction" :list="directionList"></yhm-manager-td-psd>
          <yhm-manager-td-money :value="item.money+''"></yhm-manager-td-money>
        </tr>
      </template>
      <!--数据空提示-->
      <template #empty>
        <span class="m_listNoData f_operate" v-show="content.length!='0'?false:true">暂时没有数据</span>
      </template>
      <!--分页控件-->
      <template #pager>
        <yhm-pagination :pager="pager" isPageSize="false" @initData="initData(false)"></yhm-pagination>
      </template>
    </yhm-managerpage>
    <yhm-formoperate :title-show="true">
      <template #btn>
<!--        v-show="questionedShow"-->
        <yhm-commonbutton value="下一步" icon="i-help" v-show="inTheEnd=='true'" @call="questionedClick" @mouseover="questionedShow=true" @mouseout="questionedShow=false" category="three"></yhm-commonbutton>
        <yhm-commonbutton value="交车" icon="i-complete" @call="saveEvent" v-show="state!=1&&inTheEnd=='true'" :flicker="true"></yhm-commonbutton>
      </template>
      <template #titleLeft>
        <div v-show="questionedShow&&inTheEnd=='true'" style="font-size: 15px;color: #666666;">添加下一步工序</div>
      </template>
    </yhm-formoperate>
  </div>
</template>

<script>
  import { managermixin } from '@/assets/manager.js'
  import { guid, selectClick, selectdbClick, selectConfirm, selectComputedSelected } from '@/assets/common.js'
  export default {
    name: 'workOrderCheckoutManagerView',
    mixins: [managermixin],
    data(){
      return{
        index:-1,//索引值
        content:[],
        categoryList:[],
        stateList:[],
        directionList:[],
        selectType: '0', // 单选还是多选,0单选,1多选
        selectValue:[],
        questionedShow:false,
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
    watch: {
      selectValue: {
        handler: function (val, oldval) {
          this.pager.selectCount = val.length
          //判断当前页数据是否全选
          let check = true
          for(let i in this.content){
            let id = this.content[i].id
            let sign = false
            if(this.selectValue.length > 0){
              for (var j = 0; j < this.selectValue.length; j++){
                if(Object.keys(this.selectValue[j])[0] === id){
                  sign = true
                }
              }
            }
            if(!sign){
              check = false
            }
          }
          this.allCheck = check
          if(this.totalMethod){
            this.totalMethod()
          }
        },
        deep: true
      },
      // index(val){
      //     this.questionedShow = true
      //   }
      // }
    },
    computed: {
      // 检查是否选中
      checkSelect () {
        return function (id) {
          return selectComputedSelected(this.selectValue, id)
        }
      },
    },
    methods:{
      selectConfirmEvent () {
        var that = this
        selectConfirm(this.selectType, this.selectValue, that)
      },
      // 单击选择事件
      selectEvent (data) {
        this.selectValue = selectClick(this.selectType, this.selectValue, data)
        for(let i in this.content){
          if(this.content[i].id == data.id){
            this.index =Number(i)
          }
        }
        console.log( 'index',this.index )
        if(this.pager.selectCount==0&&this.state!=1){
          this.questionedShow = true
        }else{
          this.questionedShow = false
        }
      },
      questionedClick(){//质疑 //下一步
        this.$dialog.OpenWindow({
          width: '1050',
          height: '700',
          url:'/workOrderProcessForm?ownerID='+this.ownerID+'&flowPathID='+this.flowPathID+'&index='+this.index,
          // url:'/workOrderDetailsManagerView?ownerID='+this.ownerID+'&flowPathID='+this.flowPathID+'&operationShow=1'+'&index='+this.index+'&upDateStateID='+this.upDateStateID,
          title:'添加下一步工序',
          closeCallBack:(data) =>{
            if(data){
              this.$dialog.close()
            }else {
              this.initData()
            }
          }
        })
        // this.$dialog.OpenWindow({
        //   width: '1050',
        //   height: '700',
        //   url:'/workOrderDetailsManagerView?ownerID='+this.ownerID+'&flowPathID='+this.flowPathID+'&operationShow=1'+'&index='+this.index+'&upDateStateID='+this.upDateStateID,
        //   title:'添加服务',
        //   closeCallBack:(data) =>{
        //     if(this.index!=0&&this.index!=undefined){
        //       this.ajaxJson({
        //         url: '/fix/fixProcessDetail/confirm',
        //         loading:'0',
        //         data: {
        //           id:this.upDateStateID,
        //           ownerID:this.flowPathID,
        //           state:'1'
        //         },
        //         call: (datas) => {
        //
        //         }
        //       })
        //     }
        //     this.initData()
        //   }
        // })

        // let params = {
        //   orderid:this.ownerID,
        //   indexNum:this.index
        // }
        // this.$dialog.confirm({
        //   width: 300,
        //   tipValue: '是否确认提交质疑?',
        //   alertImg: 'warn',
        //   okCallBack: (data) => {
        //     this.ajaxJson({
        //       url: '/fix/stock/overhaul',
        //       data:params,
        //       call: (data) => {
        //         if(data.type==0){
        //           this.changeState(data)
        //           this.$dialog.alert({
        //             alertImg: 'ok',
        //             tipValue: data.message,
        //             closeCallBack: () => {
        //               this.initData(false)
        //
        //             }
        //           })
        //         }
        //       }
        //     })
        //   }
        // })
      },
      // accomplish(data){
      //
      // },
      saveEvent(){//交车
        let params = {
          id:this.flowPathID,
          state:'1',
        }
        this.ajaxJson({
          url: '/fix/fixProcess/save',
          data:params,
          call: (data) => {
            this.ajaxJson({
              url: '/fix/fixOrder/save',
              data:{
                id:this.ownerID,
                state:'1',
                isComfir:'1',//交车 加上isComfir和poccessid字段后交车会自动生成 交车和待结账节点
                poccessid:this.flowPathID,
              },
              call: () => {
                if(data.type==0){
                  this.$dialog.alert({
                    tipValue: '交车成功',
                    closeCallBack: () => {
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
      changeState(){
        let params = {
          'id':this.subProcessID,
          'ownerID':this.flowPathID,
          'state':'1',
        }
        this.ajaxJson({
          url: '/fix/fixProcessDetail/save',
          loading:'0',
          data: params,
          call: (data) => {
          }
        })
      },
      initData () {
        let params = {
          ownerID:this.ownerID,
        }
        this.ajaxJson({
          url: '/fix/fixOrderDetail/initForm',
          data: params,
          call: (data) => {
            if(data.id!=''){
              this.content = data.list
              this.id = data.id
              this.categoryList = data.categoryPsd.list
              this.stateList = data.statePsd.list
              this.directionList = data.directionPsd.list
              this.applicableModels = data.applicableModels
              this.category = data.category
              // if(this.list.length>0){
              //   this.$dialog.setReturnValue('-99')
              // }
            }else{
              this.ajaxJson({
                url: '/fix/fixOrderDetail/save',
                data: {
                  id:this.id,
                  ownerID:this.ownerID,
                },
                call: (data) => {
                  console.log(  data,'----------')
                }
              })
            }
          }
        })
      },
    },
    created () {
        // this.setQuery2Value('id')
      this.id = guid()
      this.setQuery2Value('inTheEnd')//是否为最后一个节点
      this.setQuery2Value('upDateStateID')//当前节点ID
      this.setQuery2Value('index')//节点索引值
      this.setQuery2Value('flowPathID')//主流程表id
      this.setQuery2Value('ownerID')//工单ID
      this.setQuery2Value('state')//主流程表完成状态
      this.setQuery2Value('subProcessID')//需要改变的检修节点ID 流程子表ID
      let params = {
        id:this.upDateStateID,
        ownerID:this.flowPathID,
        state:'1'
      }
      this.ajaxJson({
        url: '/fix/fixProcessDetail/confirm',
        loading:'0',
        data: params,
        call: (datas) => {
        }
      })
      this.initData()


    }

  }
</script>

<style scoped>

</style>
