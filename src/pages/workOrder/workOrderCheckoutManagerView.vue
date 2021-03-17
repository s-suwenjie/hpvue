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
        <yhm-managerth style="width: 38px" title="选择"></yhm-managerth>
        <!--<yhm-managerth style="width: 38px" title="查看"></yhm-managerth>-->
        <yhm-managerth title="项目名称"></yhm-managerth>
        <yhm-managerth width="120" title="发生日期"></yhm-managerth>
        <yhm-managerth width="80" title="类型"></yhm-managerth>
        <!--<yhm-managerth style="width: 120px" title="状态"></yhm-managerth>-->
        <yhm-managerth width="80" title="收支方向"></yhm-managerth>
        <yhm-managerth style="width: 120px;" title="变化金额"></yhm-managerth>
        <yhm-managerth title="备注"></yhm-managerth>

      </template>

      <!--数据明细-->
      <template #listBody>
        <tr v-for="(item,index) in content" @click="selectEvent(item)" :class="[{InterlacBg:index%2!=0}]" :key="item.id">
          <yhm-manager-td-checkbox :value="item"  :no-click="false"></yhm-manager-td-checkbox>
          <!--<yhm-manager-td-look @click="listView(item)"></yhm-manager-td-look>-->
          <yhm-manager-td :value="item.name"></yhm-manager-td>
          <yhm-manager-td-date :value="item.workDate"></yhm-manager-td-date>
          <yhm-manager-td-psd :value="item.category" :list="categoryList"></yhm-manager-td-psd>
          <!--<yhm-manager-td-psd :value="item.state+''" :list="stateList"></yhm-manager-td-psd>-->
          <yhm-manager-td-psd :value="item.direction" :list="directionList"></yhm-manager-td-psd>
          <yhm-manager-td-money :value="item.money+''"></yhm-manager-td-money>
          <yhm-manager-td-center :value="item.remark"></yhm-manager-td-center>
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
<!--        v-show="inTheEnd=='true'&&questionedShow"-->
        <yhm-commonbutton value="返工"  v-show="inTheEnd=='true'" icon="i-help" @call="queryClick"  category="three" :style="{cursor:!questionedShow?'no-drop':''}" :color="!questionedShow?'#ccc':'#49a9ea'" :border-style="!questionedShow?'1px solid #ccc':'1px solid #49a9ea'"></yhm-commonbutton>
        <!--<yhm-commonbutton value="下一步" icon="i-help" v-show="inTheEnd=='true'" @call="questionedClick" category="three"></yhm-commonbutton>-->
        <!--<yhm-commonbutton value="下一步" icon="i-help" v-show="inTheEnd=='true'" @call="questionedClick" @mouseover="questionedShow=true" @mouseout="questionedShow=false" category="three"></yhm-commonbutton>-->
<!--       -->
        <yhm-commonbutton  icon="i-complete" @call="saveEvent" value="竣工" :style="{cursor:questionedShow?'no-drop':''}" v-show="state!=1&&inTheEnd=='true'" :color="questionedShow?'#ccc':'#49a9ea'" :border-style="questionedShow?'1px solid #ccc':'1px solid #49a9ea'"></yhm-commonbutton>
      </template>
      <template #titleLeft>
        <!--<div v-show="questionedShow&&inTheEnd=='true'" style="font-size: 15px;color: #666666;">质疑选中的服务,进行返修</div>-->
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
        key:-1,
        index:0,//索引值
        content:[],
        paramList:[],
        paramIdList:[],
        categoryList:[],
        stateList:[],
        directionList:[],
        selectType: '1', // 单选还是多选,0单选,1多选
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
      queryClick() {//返工
        if(!this.questionedShow){
          return
        }
        // console.log(this.paramList)
        // let list = this.paramList.concat()
        let list = []
        let arr = this.paramList
        for (let i in this.paramList) {
          list.push({
            category: arr[i].category,
            departid: arr[i].departid,
            direction: arr[i].direction,
            id: guid(),
            reveworkid: arr[i].id,
            model: arr[i].model,
            modelid: arr[i].modelid,
            money: arr[i].money,
            name: arr[i].name,
            nameList: arr[i].nameList,
            ownerID: arr[i].ownerID,
            orderid: this.ownerID,
            personid: arr[i].personid,
            productid: arr[i].productid,
            remark: arr[i].remark,
            repair: arr[i].repair,
            state: '2',
            stateStr: arr[i].stateStr,
            teamList: arr[i].teamList,
            teamid: arr[i].teamid,
            workDate: arr[i].workDate
          })
        }
        this.$dialog.confirm({
            width: 350,
            tipValue: '是否确认返工？',
            btnValueOk: '确认',
            btnValueCancel: '取消',
            alertImg: 'warn',
            okCallBack: () => {
              this.ajaxJson({
                url: '/fix/fixProcessDetail/question',
                data:{
                  revenueList:list,
                  processDetail:{
                    'nameStr':'质检确认',
                    'id':guid(),
                    'ownerID':this.flowPathID,
                    'dependid':'',
                    'stage':'2',
                    'state':'0',
                    'type':'4',
                    'orderStr':''
                  }
                },
                call: (datas) => {
                  if(datas.type=='0'){
                    this.ajaxJson({
                      url: '/fix/fixProcess/update',
                      data: {
                        stage:Number(this.index)+1,
                        id:this.flowPathID,//主流程表ID
                        ownerID:this.ownerID,//工单ID
                      },
                      call: (data)=>{
                        if(data.type==0){
                          this.$dialog.alert({
                            tipValue: data.message,
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
                }
              })
            }
        })
        // this.ajaxJson({
        //     url: '/fix/fixOrderRevenue/saveBath',
        //     data:list,
        //     call: (data) => {
        //       if(data.type=='0'){
        //         this.ajaxJson({
        //           url: '/fix/fixProcessDetail/save',//添加商品节点
        //           data: {
        //             'nameStr':'质检确认',
        //             'id':guid(),
        //             'ownerID':this.flowPathID,
        //             'dependid':'',
        //             'stage':'2',
        //             'state':'0',
        //             'type':'6',
        //             'orderStr':''
        //           },
        //           call: (datas) => {
        //             this.$dialog.alert({
        //               tipValue: datas.message,
        //               closeCallBack: () => {
        //                 this.$dialog.close()
        //
        //               }
        //             })
        //           }
        //         })
        //
        //       }
        //     }
        // })
      },
      selectConfirmEvent () {
        var that = this
        selectConfirm(this.selectType, this.selectValue, that)
      },
      // 单击选择事件
      selectEvent (data) {
        if(this.paramIdList.indexOf(data.id)==-1||this.paramList.length=='0'){
          this.paramIdList.push(data.id)
          this.paramList.push(data)
        }else{
          for(let c in this.paramList){
            if(this.paramList[c].id==data.id){
              this.paramList.splice(c,1)
            }
          }
          for(let j in this.paramIdList){
            if(this.paramIdList[j].id==data.id){
              this.paramIdList.splice(j,1)
            }
          }
        }
        // console.log(this.paramIdList,this.paramList)
        this.selectValue = selectClick(this.selectType, this.selectValue, data)
        for(let i in this.content){
          if(this.content[i].id == data.id){
            this.key =Number(i)
          }
        }
        if(this.selectValue.length>=1){
          this.questionedShow = true
        }else{
          this.questionedShow = false
        }
        // if(this.pager.selectCount==0&&this.state!=1){
        //   this.questionedShow = true
        // }else{
        //   this.questionedShow = false
        // }
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
        if(this.questionedShow){
          return
        }
        this.$dialog.confirm({
            width: 350,
            tipValue: '是否确认将车辆移交给前台接待？',
            btnValueOk: '确认',
            btnValueCancel: '取消',
            alertImg: 'warn',
            okCallBack: () => {
              // this.ajaxJson({
              //   url: '/fix/fixProcessDetail/save',//添加节点
              //   data: {
              //     'nameStr':'交车待确认',
              //     'id':guid(),
              //     'ownerID':this.flowPathID,
              //     'orderid':this.ownerID,
              //     'dependid':'',
              //     'stage':'',
              //     'state':'0',
              //     'type':'6',
              //     'orderStr':this.index
              //   },
              //   call: (datas) =>{
              //     this.ajaxJson({
              //       url: '/fix/fixProcess/update',
              //       data: {
              //         stage: Number(this.index)+1,
              //         id: this.flowPathID,//主流程表ID
              //         ownerID: this.ownerID,//工单ID
              //       },
              //       call: (param) => {
                      this.ajaxJson({
                        url: '/fix/fixProcess/delivery',
                        data:{
                          fixProcessParam:{
                            stage: Number(this.index)+1,
                            id: this.flowPathID,//主流程表ID
                            ownerID:this.ownerID,
                            state:'1',
                          },
                          fixOrderFormParam:{
                            id:this.ownerID,
                            state:'17',
                            isComfir:'1',//交车 加上isComfir和poccessid字段后交车会自动生成 交车和待结账节点
                            poccessid:this.flowPathID,
                          },
                          fixProcessDetailParam:{
                            'nameStr':'交车待确认',
                            'id':guid(),
                            'ownerID':this.flowPathID,
                            'orderid':this.ownerID,
                            'dependid':'',
                            'stage':'',
                            'state':'0',
                            'type':'6',
                            'orderStr':this.index
                          }
                        },
                        call: (data) => {
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
        //
        //         }
        //       })
        //     }
        // })
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
          state:'0'
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
      this.initData()


    }

  }
</script>

<style scoped>

</style>
