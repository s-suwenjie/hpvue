<template>
  <div class="f_main">
    <yhm-formbody>
      <template #title>基本信息</template>
      <template #control>
        <yhm-form-radio title="工序" width="1" :select-list="repairNameList" @call="teamNameChange(repairT)" :no-edit="true" :value="repairT" id="repairT"></yhm-form-radio>
        <!--          <yhm-form-text title="工序名称" :value="repairName" :no-edit="lookOverShow?'1':'0'" id="repairName" rule="R0000"></yhm-form-text>-->
        <!--        <yhm-form-text title="工作类型" subtitle="编号" :no-edit="lookOverShow==0?'0':'1'" :value="type" id="type"></yhm-form-text>-->
        <yhm-form-radio title="维修类型" width="1" :select-list="repairTypeList" :no-edit="lookOverShow?true:false" :value="repairType" id="repairType"></yhm-form-radio>
        <yhm-form-radio title="维修人员" num-type="0" width="1" v-if="!accendantShow" :select-list="accendantList" @call="accendantChange(teamid)" :value="teamid" id="teamid" rule="R0000"></yhm-form-radio>
        <!--        :no-edit="lookOverShow?true:false"-->
        <yhm-form-text title="维修人员" style="flex: 1;" @click="addMaintain" v-else placeholder="请先添加维修人员" :no-edit="accendantShow?'1':'0'" value=""></yhm-form-text>
        <!--          <yhm-form-select title="维修人员" @click="selectAccendant" @clear="delSelectAccendant"  :no-click="lookOverShow?true:false" :value="teamName" id="teamName" rule="R0000"></yhm-form-select>-->
      </template>
    </yhm-formbody>
    <div class="f_split"></div>
    <yhm-form-list-edit v-if="!lookOverShow">
      <template #title>工单详情</template>
      <template #operate>
      <!--        <yhm-commonbutton value="添加维修人员" v-if="accendantShow" icon="btnAdd" :is-error="true" :flicker="true" @call="addMaintain()" category="three"></yhm-commonbutton>-->
      </template>
      <template #listHead>
        <yhm-managerth style="width: 50px" title="序号"></yhm-managerth>
        <yhm-managerth title="工序服务"></yhm-managerth>
        <yhm-managerth width="130" title="类型"></yhm-managerth>
        <yhm-managerth width="370" title="派工"></yhm-managerth>
      </template>
      <template #listBody>
        <tr v-for="(item,index) in list" :key="index" :class="{InterlacBg:index%2!==0}">
          <yhm-form-td-textbox width="45" style="text-align: center;" no-edit="1" id="num" :list="list" listid="list" :value="item"></yhm-form-td-textbox>
          <yhm-form-td-textbox width="410" style="text-align: center;" id="name" no-edit="1" :list="list" listid="list" :value="item"></yhm-form-td-textbox>
          <yhm-form-td-textbox width="130" style="text-align: center;" id="team" no-edit="1" :list="list" listid="list" :value="item"></yhm-form-td-textbox>
          <!--<yhm-form-td-textbox width="130" style="text-align: center;" id="depart" no-edit="1" :list="list" listid="list" :value="item"></yhm-form-td-textbox>-->
          <yhm-form-td-select-dialog width="370" @call="selectServe(item)" no-edit="1" :key="key" id="personName" :list="list" listid="list" :value="item" rule="#" style="text-align: center;"></yhm-form-td-select-dialog>
        </tr>
      </template>
      <template #empty>
        <span class="m_listNoData" v-show="empty">暂时没有数据</span>
      </template>
    </yhm-form-list-edit>
    <yhm-form-list-show v-if="lookOverShow">
      <template #title>工单详情</template>
      <template #operate>
        <yhm-commonbutton  value="一键开始" icon=" " v-show="!confirmShow&&btnShow=='1'&&startBtnShow" :is-error="true" @call="allAccomplish('1')"></yhm-commonbutton>
        <yhm-commonbutton  value="一键完成" icon=" " v-show="!confirmShow&&btnShow=='1'&&finishBtnShow" :is-error="true" @call="allAccomplish('2')"></yhm-commonbutton>
      </template>
      <template #listHead>
        <!--        <yhm-managerth style="width: 38px" title="查看"></yhm-managerth>-->
        <yhm-managerth title="服务名称"></yhm-managerth>
        <yhm-managerth title="全部服务工序"></yhm-managerth>
        <yhm-managerth style="width: 110px" title="创建日期"></yhm-managerth>
        <yhm-managerth style="width: 90px" title="派工"></yhm-managerth>
<!--        <yhm-managerth style="width: 65px" title="收支方向"></yhm-managerth>-->
        <yhm-managerth style="width: 60px" title="状态"></yhm-managerth>
        <yhm-managerth style="width: 70px" title="完成状态"></yhm-managerth>
<!--        <yhm-managerth style="width: 150px;" title="操作"></yhm-managerth>-->
      </template>
      <template #listBody>
        <tr v-for="(item,index) in list" :class="[{InterlacBg:index%2!=0}]" :key="item.id">
          <!--          <yhm-manager-td-look @click="listView(item)"></yhm-manager-td-look>-->
          <yhm-manager-td :value="item.name"></yhm-manager-td>
          <yhm-manager-td :tip="true" node-class-name="f_main" :value="item.teamNameList" style="text-align: center"></yhm-manager-td>
          <yhm-manager-td-date :value="item.workDateStr"></yhm-manager-td-date>
          <yhm-manager-td-center :value="item.nameList" :key="nameListKey"></yhm-manager-td-center>
<!--          <yhm-manager-td-center :value="item.vehicle"></yhm-manager-td-center>-->
<!--          <yhm-manager-td-center :value="directionList[item.direction].showName"></yhm-manager-td-center>-->
          <yhm-manager-td-center :value="stateList[item.state].showName"></yhm-manager-td-center>
          <yhm-manager-td-center v-if="item.teamStateStr=='0'" value="未开始" color="#49a9ea"></yhm-manager-td-center>
          <yhm-manager-td-center v-else-if="item.teamStateStr=='1'" value="进行中" color="#008f8d"></yhm-manager-td-center>
          <yhm-manager-td-center v-else-if="item.teamStateStr=='2'" value="已完成" color="#00b86b"></yhm-manager-td-center>

<!--          <yhm-manager-td-operate style="display: flex;justify-content:space-between;align-items: center;">-->
<!--            <div style="color:#8e08e3;" v-if="item.teamStateStr=='0'&&item.teamStateStr!='2'" @click="confirmServe(item,'1')">-->
<!--              开始任务-->
<!--            </div>-->
<!--            <div style="color:#666666;" v-else class="bannedClick">开始任务</div>-->
<!--            <div style="margin-left: 10px;color:#fd6802;" v-if="item.teamStateStr=='1'&&item.teamStateStr!='0'" @click="confirmServe(item,'2')">-->
<!--              结束任务-->
<!--            </div>-->
<!--            <div style="margin-left: 10px;color:#666666;" v-else class="bannedClick">结束任务</div>-->
<!--            &lt;!&ndash;<yhm-manager-td value="确认完成" v-if="item.teamStateStr=='0'" color="#49a9ea" @click="confirmServe(item)"></yhm-manager-td>&ndash;&gt;-->
<!--            &lt;!&ndash;<yhm-manager-td value="进行中" v-else-if="item.teamStateStr=='1'" color="#008f8d" style="cursor:not-allowed;user-select: none;"></yhm-manager-td>&ndash;&gt;-->
<!--            &lt;!&ndash;<yhm-manager-td value="已完成" v-else color="#00b86b" style="cursor:not-allowed;user-select: none;"></yhm-manager-td>&ndash;&gt;-->
<!--            &lt;!&ndash;<yhm-manager-td-operate-delete @click="delFromList(item.id)"></yhm-manager-td-operate-delete>&ndash;&gt;-->
<!--          </yhm-manager-td-operate>-->
        </tr>
      </template>
      <template #empty>
        <span class="m_listNoData" v-show="empty">暂时没有数据</span>
      </template>
    </yhm-form-list-show>
    <yhm-formoperate :title-show="true" :createName="createName" :updateName="updateName">
      <template #btn>
        <yhm-commonbutton value="确认修改维修人员" v-show="atPresentTeamName!=teamName" v-if="amendShow&&lookOverShow&&!confirmShow&&btnShow!='1'" icon="btnSave" :flicker="true" @call="amendServiceman()"></yhm-commonbutton>

        <yhm-commonbutton value="追加定损单" v-if="stateStr=='1'&&inTheEnd=='true'" icon="tree_open" :flicker="true" @call="submenuClick(0)"></yhm-commonbutton>
        <!--          <yhm-commonbutton value="追加服务" v-if="stateStr=='1'&&inTheEnd=='true'" icon="tree_open" :flicker="true" @call="submenuClick(1)"></yhm-commonbutton>-->
        <yhm-commonbutton value="添加工序" v-if="stateStr=='1'&&inTheEnd=='true'" icon="tree_open" :flicker="true" @call="submenuClick(2)"></yhm-commonbutton>
        <yhm-commonbutton value="结束服务" v-if="stateStr=='1'&&inTheEnd=='true'" color="#00b86b" icon="i-complete" @call="submenuClick(3)"></yhm-commonbutton>
        <yhm-commonbutton value="确认流转" v-show="masterWorker!='1'&&btnShow=='1'" v-if="lookOverShow&&stateStr!='1'&&confirmShow" icon="btnSave" :flicker="true" @call="affirmProcess()"></yhm-commonbutton>
        <yhm-commonbutton value="保存" v-if="!lookOverShow" icon="btnSave" :flicker="true" @call="save()"></yhm-commonbutton>

        <yhm-commonbutton value="催促" v-show="lookOverShow&&teamOrGroup!='1'&&inTheEnd=='true'" icon="i-btn-urge" :flicker="true" @call="urge()"></yhm-commonbutton>

      </template>

      <template #titleLeft>
        {{titleRight}}
      </template>
    </yhm-formoperate>
  </div>
</template>

<script>
  import { formmixin } from '@/assets/form.js'
  import { accMul, accAdd, guid, formatDate,formatTime } from '@/assets/common.js'
  export default {
    name: 'sheetMetalRepairForm',
    mixins: [formmixin],
    data(){
      return{
        id:guid(),//工序id
        ids:'',
        key:0,
        nameListKey:0,
        list:[],//工序数组
        type:'',//工作类型编号
        finishBtnShow:false,//一键完成按钮的显示隐藏
        startBtnShow:false,//一键开始按钮的显示隐藏
        btnShow:'0',//开始结束的按钮显示隐藏
        nodeType:'5',//工序节点type值
        inTheEnd:'false',//
        personid:'',//当前人工作人员id
        repairid:'',//工序id
        worktype:'',//工序名称
        teamid:'',//维修人员id
        repairT:'0',//工序类型
        teamName:'',//维修人员名字
        atPresentTeamName:'',//之前分配的维修人员名字
        state:'0',//筛选是否为检修阶段
        stateStr:'0',//当前工序是否完成
        repairName:'',//工作内容
        repairType:'',//维修类型
        masterWorker:'',
        amendShow:true,//如果只有一个维修工人则隐藏 修改工人的按钮
        lookOverShow:false,//是否查看
        confirmShow:false,//确认完成工序按钮 显示隐藏
        beginShow:true,//一键开始按钮的 显示隐藏
        processDetailid:'',//流程子表ID
        accendantShow:false,//维修人员 显示隐藏
        categoryList:[],//类型
        stateList:[],//完成状态
        directionList:[],//收支方向
        repairTypeList:[],//工序维修类型
        repairNameList:[],//工序素材
        teamNameList:[],//班组
        departmentList:[],//部门
        accendantList:[],//维修人员素材
        titleRight:'',//提示内容
        // titleRightList:['结束之后的服务流程直接进入检修交车阶段','增加工序服务','添加下一步工序和服务','追加定损单:'],//提示内容数组
        colors:['#49a9ea','#F3825F','#FFE26F','#F19584','#fd6802'],
        empty:true,
      }
    },
    methods:{
      urge(){
        this.$dialog.confirm({
            width: 250,
            tipValue: '是否催促?',
            btnValueOk: '是',
            btnValueCancel: '否',
            alertImg: 'warn',
            okCallBack: () => {
              this.ajaxJson({
                url: '/fix/fixOrder/sendWXmessageForUrge',
                data: {
                  id:this.ownerID,
                  personid:this.personid,
                  repairid:this.repairid,
                  worktype:this.worktype

                },
                call: (data) => {
                  this.$dialog.alert({
                    tipValue: data.message,
                    closeCallBack: () => {
                    }
                  })
                }
              })
            }
        })
      },
      allAccomplish(stateStr){
        let list = []
        let items = {}
        for(let i in this.list){
          items = {}
          if(stateStr=='1'&&this.list[i].teamStateStr=='0'){
            items.id = this.list[i].id
            items.personid = this.list[i].personid
            items.worktype = this.list[i].worktype
            items.stateStr = stateStr
            list.push(items)
          }else if(stateStr=='2'&&this.list[i].teamStateStr=='1'){
            items.id = this.list[i].id
            items.personid = this.list[i].personid
            items.worktype = this.list[i].worktype
            items.stateStr = stateStr
            list.push(items)
          }
        }
        if(stateStr=='1'&&list.length==''){
          this.$dialog.alert({
            tipValue:'没有可一键开始的任务',
            alertImg:'warn',
            width:'300'
          })
          return
        }else if(stateStr=='2'&&list.length==''){
          this.$dialog.alert({
            tipValue:'没有可一键完成的任务',
            alertImg:'warn',
            width:'300'
          })
          return
        }
        this.$dialog.confirm({
          width: 300,
          tipValue: stateStr=='1'?'是否确认一键开始当前任务？':'是否确认一键完成当前任务？',
          btnValueOk: '确认',
          btnValueCancel: '取消',
          alertImg: 'warn',
          okCallBack: () => {
            this.ajaxJson({
              url: '/fix/fixProcess/startOrder',
              data: {
                fixTeamRecordingList:list,
                fixProcessDetailParam:{
                  id:this.upDateStateID,
                  ownerID:this.flowPathID,
                  orderStr:this.index,
                  nameStr:this.repairNameList[this.repairT].showName,
                  state:stateStr
                }
              },
              call: (data) => {
                if(data.type==0){
                  // this.$dialog.alert({
                  //   tipValue: data.message,
                  //   closeCallBack: () => {
                  //
                  //   }
                  // })
                  if(stateStr=='1'){
                    this.beginShow = false
                  }else{
                    this.beginShow = true
                  }
                  this.initData()
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
      addMaintain(){
        this.$dialog.OpenWindow({
          width: '1050',
          height: '600',
          url:'/peopleManagementForm?type=1',
          title:'添加派工',
          closeCallBack:(data) =>{
            if (data) {
              this.initData(false)
            }
          }
        })
      },
      lookOverAccendant(value){//获取维修人员素材
        this.ajaxJson({
          url: '/fix/fixTeam/initFormList',
          data: {
            teamid:value
          },
          call: (data) => {

            // this.teamid = data.accendantPsd.value
            if(data.accendantPsd.list.length<='1'){
              this.amendShow = false
            }else{
              this.amendShow = true
            }
            if(data.accendantPsd.list.length!='0'){
              this.accendantShow = false
              this.accendantList = data.accendantPsd.list
              if(!this.lookOverShow) {
                this.teamid = this.accendantList[0].num
                this.teamName = this.accendantList[0].showName
              }
              this.accendantChange(0)
            }else{
              this.accendantList = []
              this.accendantShow = true
            }

            // teamid:this.teamid,//工序维修人员id
            // teamName:this.teamName,//工序维修人员名字
          }
        })
      },
      teamNameChange(value){//工序类型发生变化
        this.repairName = this.repairNameList[value].showName
        this.lookOverAccendant(value)
        this.list = []
        this.teamid = ''
        this.teamName = ''
        this.empty = this.list.length === 0
      },
      accendantChange(value){
        for(let i in this.accendantList){
          if(this.accendantList[i].num==value){
            this.teamName = this.accendantList[i].showName
            this.teamid = this.accendantList[i].num
          }
        }
        if(!this.lookOverShow){
          this.list = []
          this.detailList = ''
          // this.teamid = ''
          this.ajaxJson({
            url: '/fix/fixrepair/initFormSpecial',
            data: {
              orderid:this.ownerID,
              repairType:this.repairT,
              state:this.state,
              repairTp:'1',
            },
            call: (data) => {
              this.teamNameList = data.teamNamePsd.list
              this.departmentList = data.departmentPsd.list
              let insertDate = new Date(accAdd(new Date().getTime(), accMul(this.list.length, 1000)))
              let num = accAdd(this.list.length,1) + ''
              let arrId = []
              let team = ''
              let depart = ''
              let list = data.fixTeamRecordingList
              for(let i in list){
                team = this.repairName
                // depart = this.departmentList[data.list[i].departid].showName
                if((list[i].teamid).indexOf(this.repairT)!=-1){
                  this.list.push({
                    id:list[i].id,
                    insertDate: formatTime(insertDate),
                    personid:'',
                    personName:this.teamName,
                    num:this.list.length+1+'',
                    name:list[i].name,
                    teamid:list[i].teamid,
                    departid:list[i].departid,
                    team:team,
                    depart:depart
                  })
                  arrId.push(list[i].id)
                }
              }
              this.empty = this.list.length === 0
              this.detailList = arrId.join(',')
            }
          })
        }else{
          for(let i in this.list){
            this.list[i].nameList = this.teamName
          }
          this.nameListKey++
        }
      },
      amendServiceman(){
        this.$dialog.confirm({
          width: 300,
          tipValue: '是否确认修改工序的维修人员？',
          btnValueOk: '确认',
          btnValueCancel: '取消',
          alertImg: 'warn',
          okCallBack: () => {
            this.ajaxJson({
              url: '/fix/fixrepair/saveWorkRepair',
              data: {
                fixProcessDetailParam: {
                  id:this.upDateStateID,
                  dependid:this.ids,
                  state: '1',
                },
                fixrepair: {
                  id: this.ids,
                  teamid:this.teamid,//工序维修人员id
                  fixTeamRecordingList:this.list,
                  teamName:this.teamName,//工序维修人员名字
                  orderid:this.ownerID,//工单id
                  // personid:this.personid,//全部维修人员的拼接id
                  type: this.type,//工作类型编号
                  repairTp:'1',
                  stateStr:'0',
                  repairT:this.repairT,//工序类型
                  repairName: this.repairName,//工作内容
                  repairType: this.repairType,
                  detailList: this.detailList,//工作详情的id字符串
                  processDetailid: this.processDetailid,
                }

              },
              call: (data) => {
                this.$dialog.alert({
                  tipValue: data.message,
                  closeCallBack: () => {
                    this.$dialog.close()
                  }
                })
              }
            })
          }
        })
      },
      // selectAccendant(){//选择维修人员
      //   this.$dialog.OpenWindow({
      //       width: 950,
      //       height: 603,
      //       url: '/selectPeopleManagement?teamid='+this.repairName,
      //       title: '选择维修人员',
      //       closeCallBack: (datas) => {
      //         if (datas) {
      //           this.list = []
      //           let arrTeamid = []
      //           let arrTeamName = []
      //           for(let n in datas){
      //             arrTeamid.push(datas[n].id)
      //             arrTeamName.push(datas[n].userName)
      //           }
      //           this.teamid = arrTeamid.join(',')//维修人员id
      //           this.teamName = arrTeamName.join(',')
      //           this.ajaxJson({
      //             url: '/fix/fixOrderDetail/initForm',
      //             data: {
      //               ownerID:this.ownerID
      //             },
      //             call: (data) => {
      //               console.log( 'data',data )
      //               this.teamNameList = data.teamNamePsd.list
      //               this.departmentList = data.departmentPsd.list
      //               let insertDate = new Date(accAdd(new Date().getTime(), accMul(this.list.length, 1000)))
      //               let num = accAdd(this.list.length,1) + ''
      //               let arrId = []
      //               let team = ''
      //               let depart = ''
      //
      //               for(let i in data.list){
      //                 team = this.teamNameList[data.list[i].teamid].showName
      //                 depart = this.departmentList[data.list[i].departid].showName
      //                 if(this.repairName==data.list[i].teamid){
      //                   this.list.push({
      //                     id: data.list[i].id,
      //                     insertDate: formatTime(insertDate),
      //                     personid:'',
      //                     personName:this.teamName,
      //                     num:this.list.length+1+'',
      //                     name:data.list[i].name,
      //                     teamid:data.list[i].teamid,
      //                     departid:data.list[i].departid,
      //                     team:team,
      //                     depart:depart
      //                   })
      //                 }
      //
      //                 arrId.push(data.list[i].id)
      //               }
      //               console.log('data.list',data.list)
      //
      //               this.empty = this.list.length === 0
      //               this.detailList = arrId.join(',')
      //             }
      //           })
      //         }
      //       }
      //   })
      // },
      listView(item){//查看
        this.$dialog.OpenWindow({
          width: '1050',
          height: '600',
          url:'/workOrderServiceView?subProcessID='+this.upDateStateID+'&ownerID='+item.ownerID+'&id='+item.workid+'&flowPathID='+this.flowPathID,
          title:'查看'+item.name+'详情',
          closeCallBack:(data) =>{
            if (data) {
              this.initData(false)
            }
          }
        })
      },
      submenuMouseover(index){
        this.titleRight = this.titleRightList[index]
      },
      submenuClick(index){
        if(index==3){//结束服务 添加检修节点
          this.$dialog.confirm({
            width: 300,
            tipValue: '是否确认结束服务,进入检修阶段？',
            btnValueOk: '确认',
            btnValueCancel: '取消',
            alertImg: 'warn',
            okCallBack: () => {
              if(this.index!=0&&this.index!=undefined){
                this.ajaxJson({
                  url: '/fix/fixProcessDetail/save',//添加节点
                  data: {
                    'nameStr':'检修',
                    'id':guid(),
                    'ownerID':this.flowPathID,
                    'orderid':this.ownerID,
                    'dependid':'',
                    'stage':'2',
                    'state':'0',
                    'type':'3',
                    'orderStr':this.index
                  },
                  call: (data) => {
                    this.ajaxJson({
                      url: '/fix/fixProcessDetail/confirm',
                      data: {
                        id:this.subProcessID,
                        ownerID:this.flowPathID,
                        state:'1'
                      },
                      call: (datas) => {
                        if(datas.type==0){
                          this.$dialog.alert({
                            tipValue: datas.message,
                            closeCallBack: () => {
                              if(this.flowType==7) {//从固定的钣金拆装或修复进来时
                                this.lookOverShow = true
                                this.state = '2'
                                this.dependid = this.id
                                this.initData()
                              }else{
                                this.$dialog.close()
                              }
                            }
                          })
                        }else{
                          this.$dialog.alert({
                            alertImg: 'error',
                            tipValue: datas.message,
                            closeCallBack: () => {
                            }
                          })
                        }

                      }
                    })
                  }
                })

              }
            }
          })
        }else if(index==2){//添加下一步进行的工序
          this.$dialog.OpenWindow({
            width: '1050',
            height: '700',
            url:'/workOrderProcessForm?ownerID='+this.ownerID+'&nodeType='+this.nodeType+'&flowPathID='+this.flowPathID+'&index='+this.index,
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
        }else if(index==1){//跳到工单页面 添加服务节点
          this.$dialog.OpenWindow({
            width: '1050',
            height: '700',
            url:'/workOrderDetailsManagerView?ownerID='+this.ownerID+'&flowPathID='+this.flowPathID,
            title:'添加服务',
            closeCallBack:(data) =>{
              this.initData()
            }
          })
        }else if(index==0){//定损单
          let arr =  []
          for(let j=0; j<5; j++){
            arr.push(guid())
          }
          let ids = arr.join(',')
          this.ajaxJson({
            url: '/fix/fixProcessDetail/saveBath',
            loading:'0',
            data: {
              ids:ids,
              ownerID:this.flowPathID
            },
            call: (data) => {

            }
          })
          this.$dialog.OpenWindow({
            width: '1050',
            height: '700',
            url:'/lossAssessmentForm?ownerID='+this.ownerID+'&flowPathID='+this.flowPathID+'&establish='+this.affirm+'&inTheEnd='+this.inTheEnd,
            title:'添加定损单详情',
            closeCallBack:(data) =>{
              this.initData()
            }
          })
        }
        // }else{
        //   this.$dialog.alert({
        //     tipValue:'请先确认完成当前服务后,再选择生成下一流程。',
        //     alertImg:'warn',
        //     width:'300'
        //   })
        // }

        // this.$refs.state.click()
      },
      delServe(index,item){//删除工序服务
        this.$dialog.alert({
          tipValue: '删除成功！！！',
          closeCallBack: ()=>{
            this.list.splice(index, 1)
            let arrId = []
            for(let i in this.list){
              arrId.push(this.list[i].id)
            }
            this.detailList = arrId.join(',')
            this.empty = this.list.length === 0
          }
        })
      },
      delProduct(){//清空工序服务
        this.$dialog.confirm({
          alertImg: 'warn',
          tipValue: '是否清空全部工序服务?',
          okCallBack: () => {
            this.list = []
            this.detailList = ''
            this.empty = this.list.length === 0
            this.$dialog.alert({
              tipValue: '删除成功！！！',
              closeCallBack: ()=>{
              }
            })
          }
        })
      },
      affirmProcess() {
        this.$dialog.confirm({
          alertImg: 'warn',
          width: '330',
          tipValue: '是否确认流转?',
          okCallBack: () => {
            let params = {
              fixrepair: {
                id: this.ids,
                stateStr: '1',
              },
              fixProcessParam: {
                stage: '1',
                id: this.flowPathID,//主流程表ID
                ownerID: this.ownerID,//工单ID
              },
              fixProcessDetailParam:{
                id:this.upDateStateID,
                state: '2',
              }
            }
            this.ajaxJson({
              url: '/fix/fixProcess/saveForSpeacial',//更新当前工序状态
              data: params,
              call: (data) => {
                if (data.type == '0') {
                  this.$dialog.alert({
                    tipValue: data.message,
                    closeCallBack: () => {
                      this.$dialog.close()
                      // this.initData()
                    }
                  })
                } else {
                  this.$dialog.alert({
                    alertImg: 'warn',
                    tipValue: data.message
                  })
                }
                  // this.ajaxJson({
                  //   url: '/fix/fixProcessDetail/save',
                  //   data: {
                  //     id:this.upDateStateID,
                  //     state: '2',
                  //   },
                  //   call: (datas) => {
                  //     if (datas.type == '0') {
                  //       this.$dialog.alert({
                  //         tipValue: datas.message,
                  //         closeCallBack: () => {
                  //           this.$dialog.close()
                  //           // this.initData()
                  //         }
                  //       })
                  //     } else {
                  //       this.$dialog.alert({
                  //         alertImg: 'warn',
                  //         tipValue: datas.message
                  //       })
                  //     }
                  //   }
                  // })
              }
            })
          }
        })
      },
      addProduct(){//添加工序服务
        this.$dialog.OpenWindow({
          width: 950,
          height: 603,
          url: '/selectProcessServices?ownerID='+this.ownerID,
          title: '选择工序服务',
          closeCallBack: (data) => {
            if (data) {
              this.list = []
              let insertDate = new Date(accAdd(new Date().getTime(), accMul(this.list.length, 1000)))
              let num = accAdd(this.list.length,1) + ''
              let arrId = []
              for(let i in data){
                this.list.push({
                  id: data[i].id,
                  insertDate: formatTime(insertDate),
                  num:this.list.length+1+'',
                  name:data[i].name,
                })
                arrId.push(data[i].id)
              }
              this.empty = this.list.length === 0
              this.detailList = arrId.join(',')
            }
          }
        })
        // console.log( this.list )
      },
      confirmServe(item,stateStr){//确认完成当前服务
        let tipValue = ''
        if(stateStr=='1'){
          tipValue = '是否确认开始任务？'
        }else{
          tipValue = '是否确认完成任务'
        }
        this.$dialog.confirm({
          alertImg: 'warn',
          tipValue: tipValue,
          okCallBack: () => {
            let params = {
              id:item.id,
              // orderid:this.ownerID,
              // ownerID:this.ids,
              stateStr:stateStr
            }
            this.ajaxJson({
              url: '/fix/fixTeamRecording/save',
              data: params,
              call: (data) => {
                if(data.type=='0'){
                  this.$dialog.alert({
                    tipValue: data.message,
                    closeCallBack: () => {
                      this.initData()
                    }
                  })
                }else {
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
      selectServe(item){//选择工序服务
        this.$dialog.OpenWindow({
          width: 950,
          height: 603,
          url: '/selectPeopleManagement?teamid='+item.teamid+'&departid='+item.departid,
          title: '选择班组人员',
          closeCallBack: (data) => {
            if (data) {
              item.personName = ''
              item.personid = ''
              let arr = []
              let arrID = []
              for(let i in data){
                arr.push(data[i].userName)
                arrID.push(data[i].id)
              }
              item.personName = arr.join(',')
              item.personid = arrID.join(',')
              // this.personid = arrID.join(',')
              this.key++
              this.ajaxJson({
                url: '/fix/fixOrderRevenue/save',
                // loading:'0',
                data: {
                  id:item.id,
                  personid:item.personid
                },
                call: () => {
                }
              })
            }
          }
        })
      },
      save() {
        let a = this.validator()
        let b = this.list.length!=0
        if (a) {
          if(b){
            // for(let a in this.repairNameList){
            //   if(this.repairNameList[a].num==this.repairName){
            //     this.repairName = this.repairNameList[a].showName
            //   }
            // }
            this.ajaxJson({
              url: '/fix/fixrepair/saveWorkRepair',
              data: {
                fixProcessDetailParam: {
                  id:this.upDateStateID,
                  dependid:this.id,
                  state: '1',
                },
                fixrepair: {
                  id: this.id,
                  teamid:this.teamid,//工序维修人员id
                  fixTeamRecordingList:this.list,
                  teamName:this.teamName,//工序维修人员名字
                  orderid:this.ownerID,//工单id
                  // personid:this.personid,//全部维修人员的拼接id
                  type: this.type,//工作类型编号
                  repairTp:'1',
                  stateStr:'0',
                  repairT:this.repairT,//工序类型
                  repairName: this.repairName,//工作内容
                  repairType: this.repairType,
                  detailList: this.detailList,//工作详情的id字符串
                  processDetailid: this.processDetailid,
                }

              },
              call: (data) => {
                this.$dialog.alert({
                  tipValue: data.message,
                  closeCallBack: () => {
                    if(this.flowType==7) {//从固定的钣金拆装或修复进来时
                      this.lookOverShow = true
                      this.state = '2'
                      this.dependid = this.id
                      this.initData()
                    }else{
                      this.$dialog.close()
                    }
                  }
                })
              }
            })
            // let paramss = {
            //   id: this.id,
            //   teamid:this.teamid,//工序维修人员id
            //   teamName:this.teamName,//工序维修人员名字
            //   orderid:this.ownerID,//工单id
            //   // personid:this.personid,//全部维修人员的拼接id
            //   type: this.type,//工作类型编号
            //   repairTp:'1',
            //   stateStr:'0',
            //   repairT:this.repairT,//工序类型
            //   repairName: this.repairName,//工作内容
            //   repairType: this.repairType,
            //   detailList: this.detailList,//工作详情的id字符串
            //   processDetailid: this.processDetailid,
            // }
            // this.ajaxJson({
            //   url: '/fix/fixrepair/save',
            //   data: paramss,
            //   call: (data) => {
            //     this.$dialog.setReturnValue(this.id)
            //     if (data.type === 0) {
            //       this.ajaxJson({
            //         url: '/fix/fixProcessDetail/save',
            //         data: {
            //           id:this.upDateStateID,
            //           dependid:this.id,
            //           state: '1',
            //         },
            //         call: (data) => {
            //           this.$dialog.alert({
            //             tipValue: data.message,
            //             closeCallBack: () => {
            //               if(this.flowType==7) {//从固定的钣金拆装或修复进来时
            //                 this.lookOverShow = true
            //                 this.state = '2'
            //                 this.dependid = this.id
            //                 this.initData()
            //               }else{
            //                 this.$dialog.close()
            //               }
            //
            //               // this.initData()
            //             }
            //           })
            //         }
            //       })
            //
            //     } else {
            //       this.$dialog.alert({
            //         alertImg: 'warn',
            //         tipValue: data.message
            //       })
            //     }
            //       }
            //     })
          }else{
            this.$dialog.alert({
              tipValue:'工单详情不能为空',
              alertImg:'warn',
              width:'330'
            })
          }

        }
      },
      initData(){
        let params = {
          id: this.dependid,
          orderid:this.ownerID,
          state:this.state,
          repairType:'0',
          repairTp:'1',
        }
        this.ajaxJson({
          url: '/fix/fixrepair/initFormSpecial',
          data: params,
          call: (data) => {
            if(data.id==''){
              this.lookOverShow = false
            }else{
              this.lookOverShow = true
            }
            this.personid = data.teamid
            this.repairid = data.id
            this.worktype = data.repairName
            this.type = data.type
            this.ids = data.id
            this.list = data.fixTeamRecordingList
            this.teamid = data.teamid
            this.teamName = data.teamName
            this.atPresentTeamName = data.teamName
            this.stateStr = data.stateStr
            this.repairType = data.repairType
            this.categoryList = data.categoryPsd.list
            this.stateList = data.statePsd.list
            this.directionList = data.directionPsd.list
            this.repairTypeList = data.repairTypePsd.list
            // this.repairNameList = data.repairNamePsd.list
            this.repairNameList = [
              {
                code: "",
                img: "",
                num: "0",
                showName: "钣金拆装或修复"
              }
            ]
            this.teamNameList = data.teamNamePsd.list
            this.repairT = data.repairT


            for(let a in this.repairNameList){
              if(this.repairNameList[a].num==data.repairT){
                this.repairName = this.repairNameList[a].showName
              }
            }
            this.repairName = '钣金拆装或修复'
            let arr = []
            let teamNameList = []
            for(let i in this.list){
              this.list[i].nameList = data.teamName
              arr.push(this.list[i].teamStateStr)
              teamNameList = []
              if(this.list[i].teamid.indexOf('0')!=-1){
                teamNameList.push('钣金拆装或修复')
              }
              if(this.list[i].teamid.indexOf('1')!=-1){
                teamNameList.push('做底')
              }
              if(this.list[i].teamid.indexOf('2')!=-1){
                teamNameList.push('喷漆')
              }
              if(this.list[i].teamid.indexOf('3')!=-1){
                teamNameList.push('钣金装配')
              }
              if(this.list[i].teamid.indexOf('4')!=-1){
                teamNameList.push('抛光')
              }
              if(this.list[i].teamid.indexOf('6')!=-1){
                teamNameList.push('保养')
              }
              this.list[i].teamNameList = teamNameList.join(',')
            }
            this.lookOverAccendant(this.repairT)

            if(arr.indexOf('0')==-1&&arr.indexOf('1')==-1){
              this.confirmShow = true
            }else{
              this.confirmShow = false
            }
            if(arr.indexOf('1')==-1){
              this.beginShow=false
            }else{
              this.beginShow=true
            }
            if(arr.indexOf('1')==-1&&arr.indexOf('2')==-1){
              this.startBtnShow = true
            }else{
              this.startBtnShow = false
            }
            if(arr.indexOf('0')==-1&&arr.indexOf('2')==-1){
              this.finishBtnShow = true
            }else{
              this.finishBtnShow = false
            }
            this.empty = this.list.length === 0
          }
        })
      }
    },
    created () {
      this.setQuery2Value('index')
      this.setQuery2Value('btnShow')//隐藏确认完成按钮
      this.setQuery2Value('ownerID')//工单id
      this.setQuery2Value('teamOrGroup')//为1时表示从 待作业模块进入的
      this.setQuery2Value('dependid')
      this.setQuery2Value('inTheEnd')
      this.setQuery2Value('flowType')
      this.setQuery2Value('nodeType')//工序节点type值
      this.setQuery2Value('state')
      this.setQuery2Value('flowPathID')
      this.setQuery2Value('upDateStateID')//子流程id
      this.setQuery2Value('masterWorker')
      // if(this.flowType==5||this.flowType==6){//查看工序时
      //   // this.lookOverShow = true
      //   this.initData()
      // }else {//添加工序时 初始化
        // this.lookOverShow = false
      this.ajaxJson({
        url: '/fix/fixrepair/initFormSpecial',
        data: {
          orderid:this.ownerID,
          state:this.state,
          repairType:'0',
          repairTp:'1',
        },
        call: (data) => {
          if(data.id==''){
            this.lookOverShow = false
            this.ajaxJson({
              url: '/fix/fixrepair/initFormSpecial',
              data: {
                orderid:this.ownerID,
                state:this.state,
                repairType:'0',
                repairTp:'1',
              },
              call: (data) => {
                this.ids = data.id
                // this.teamid = data.teamid
                this.teamName = data.teamName
                this.repairType = data.repairType
                this.repairTypeList = data.repairTypePsd.list
                // this.repairNameList = data.repairNamePsd.list
                this.repairNameList = [
                  {
                    code: "",
                    img: "",
                    num: "0",
                    showName: "钣金拆装或修复"
                  }
                ]
                this.teamNameList = data.teamNamePsd.list

                if(data.repairT!=null){
                  for(let a in this.repairNameList){
                    if(this.repairNameList[a].num==data.repairT){
                      this.repairName = this.repairNameList[a].showName
                    }
                  }
                  this.repairT = data.repairT
                }else{
                  this.repairT = '0'
                }
                this.repairName = '钣金拆装或修复'

                for(let i in this.list){
                  this.list[i].nameList = data.teamName
                }
                this.lookOverAccendant(this.repairT)

                this.empty = this.list.length === 0
              }
            })
          }else{
            this.initData()
            this.lookOverShow = true
          }
        }
      })

      // }
    }
  }
</script>

<style scoped>
  .submenu{
    width: 100%;
    height: 100%;
    user-select: none;
    cursor: pointer;
    color: #555;
  }
</style>
