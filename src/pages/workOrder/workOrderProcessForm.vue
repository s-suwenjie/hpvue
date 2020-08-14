<template>
    <div class="f_main">
      <yhm-formbody>
        <template #title>基本信息</template>
        <template #control>
          <yhm-form-text title="工序名称" :value="repairName" :no-edit="lookOverShow?'1':'0'" id="repairName" rule="R0000"></yhm-form-text>
          <yhm-form-text title="工作类型" subtitle="编号" :no-edit="lookOverShow?'1':'0'" :value="type" id="type" rule="R0000"></yhm-form-text>
          <yhm-form-radio title="维修类型" :select-list="repairTypeList" :no-edit="lookOverShow?true:false" :value="repairType" id="repairType"></yhm-form-radio>

        </template>
      </yhm-formbody>
      <div class="f_split"></div>
      <yhm-form-list-edit v-if="!lookOverShow">
        <template #title>工序流程</template>
        <template #operate>
          <yhm-commonbutton  value="清空工序服务" icon=" " :is-error="true" @call="delProduct"></yhm-commonbutton>
          <yhm-commonbutton  value="添加工序服务" :flicker="true" icon="btnAdd" @call="addProduct"></yhm-commonbutton>
        </template>
        <template #listHead>
          <yhm-managerth style="width: 50px" title="序号"></yhm-managerth>
          <yhm-managerth  title="工序服务"></yhm-managerth>
          <yhm-managerth style="width: 40px" title="删除"></yhm-managerth>
        </template>
        <template #listBody>
          <tr v-for="(item,index) in list" :key="index" :class="{InterlacBg:index%2!==0}">
            <yhm-form-td-textbox width="45" style="text-align: center;" no-edit="1" id="num" :list="list" listid="list" :value="item"></yhm-form-td-textbox>
            <yhm-form-td-textbox width="870" style="text-align: center;" id="name" no-edit="1" :list="list" listid="list" :value="item"></yhm-form-td-textbox>
<!--            <yhm-form-td-select-dialog width="870" @call="selectServe(item)" id="name" :list="list" listid="list" :value="item" rule="#"></yhm-form-td-select-dialog>-->
            <yhm-form-td-delete width="40" :list="list" :value="item" :del-click="true" @click="delServe(index,item)"></yhm-form-td-delete>
          </tr>
        </template>
        <template #empty>
          <span class="m_listNoData" v-show="empty">暂时没有数据</span>
        </template>
      </yhm-form-list-edit>
      <yhm-form-list-show v-if="lookOverShow">
        <template #title>工序信息</template>
        <template #listHead>
          <yhm-managerth style="width: 38px" title="查看"></yhm-managerth>
          <yhm-managerth title="服务名称"></yhm-managerth>
          <yhm-managerth style="width: 160px" title="发生日期"></yhm-managerth>
          <yhm-managerth style="width: 160px" title="类型"></yhm-managerth>
          <yhm-managerth style="width: 100px" title="收支方向"></yhm-managerth>
          <yhm-managerth style="width: 100px" title="状态"></yhm-managerth>
          <yhm-managerth style="width: 100px;" title="操作"></yhm-managerth>
        </template>
        <template #listBody>
          <tr v-for="(item,index) in list" :class="[{InterlacBg:index%2!=0}]" :key="item.id">
            <yhm-manager-td-look @click="listView(item)"></yhm-manager-td-look>
            <yhm-manager-td :value="item.name"></yhm-manager-td>
            <yhm-manager-td :value="item.workDate"></yhm-manager-td>
            <yhm-manager-td-psd :value="item.category" :list="categoryList"></yhm-manager-td-psd>
            <yhm-manager-td-psd :value="item.direction" :list="directionList"></yhm-manager-td-psd>
            <yhm-manager-td-psd :value="item.state+''" :list="stateList"></yhm-manager-td-psd>
            <yhm-manager-td-operate>
              <yhm-manager-td value="确认完成" v-if="item.stateStr=='0'" color="#49a9ea" @click="confirmServe(item)"></yhm-manager-td>
              <yhm-manager-td value="已完成" v-else color="#666666" style="cursor:not-allowed;user-select: none;"></yhm-manager-td>
              <!--              <yhm-manager-td-operate-delete @click="delFromList(item.id)"></yhm-manager-td-operate-delete>-->
            </yhm-manager-td-operate>
          </tr>
        </template>
        <template #empty>
          <span class="m_listNoData" v-show="empty">暂时没有数据</span>
        </template>
      </yhm-form-list-show>
      <yhm-formoperate :title-show="true" :createName="createName" :updateName="updateName">
        <template #btn>
          <!--top,bottom,left,right,middle,middle-around-->
<!--          <circle-menu type="middle-around" v-show="stateStr=='1'&&inTheEnd=='true'" :colors="colors" :number="4" animate="animated jello" btn circle>-->
<!--            <button type="button" ></button>-->
<!--            &lt;!&ndash; 添加服务  追加定损   选择服务 结束服务 &ndash;&gt;-->
<!--            <div slot="item_1" class="submenu"  @click="submenuClick(3)" @mouseout="titleRight=''" @mouseover="submenuMouseover(3)">定损</div>-->
<!--            <div slot="item_4" class="submenu" @click="submenuClick(0)" @mouseout="titleRight=''" @mouseover="submenuMouseover(0)">结束</div>-->
<!--            <div slot="item_3" class="submenu" @click="submenuClick(1)" @mouseout="titleRight=''" @mouseover="submenuMouseover(1)">服务</div>-->
<!--            <div slot="item_2" class="submenu" @click="submenuClick(2)" @mouseout="titleRight=''" @mouseover="submenuMouseover(2)">工序</div>-->
<!--          </circle-menu>-->
          <yhm-commonbutton value="追加定损单" v-if="stateStr=='1'&&inTheEnd=='true'" icon="tree_open" :flicker="true" @call="submenuClick(0)"></yhm-commonbutton>
          <yhm-commonbutton value="追加服务" v-if="stateStr=='1'&&inTheEnd=='true'" icon="tree_open" :flicker="true" @call="submenuClick(1)"></yhm-commonbutton>
          <yhm-commonbutton value="添加工序" v-if="stateStr=='1'&&inTheEnd=='true'" icon="tree_open" :flicker="true" @call="submenuClick(2)"></yhm-commonbutton>
          <yhm-commonbutton value="结束服务" v-if="stateStr=='1'&&inTheEnd=='true'" color="#00b86b" icon="i-complete" @call="submenuClick(3)"></yhm-commonbutton>

          <yhm-commonbutton value="确认完成工序" v-if="lookOverShow&&stateStr!='1'&&confirmShow" icon="btnSave" :flicker="true" @call="affirmProcess()"></yhm-commonbutton>
          <yhm-commonbutton value="保存" v-if="!lookOverShow" icon="btnSave" :flicker="true" @call="save()"></yhm-commonbutton>
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
    name: 'workOrderProcessForm',
    mixins: [formmixin],
    data(){
      return{
        id:guid(),//工序id
        ids:'',
        list:[],//工序数组
        type:'',//工作类型编号
        stateStr:'0',//当前工序是否完成
        repairName:'',//工作内容
        repairType:'0',//维修类型
        lookOverShow:false,//是否查看
        confirmShow:false,//确认完成工序按钮 显示隐藏
        processDetailid:'',//流程子表ID
        categoryList:[],//类型
        stateList:[],//完成状态
        directionList:[],//收支方向
        repairTypeList:[],//工序维修类型
        titleRight:'',//提示内容
        // titleRightList:['结束之后的服务流程直接进入检修交车阶段','增加工序服务','添加下一步工序和服务','追加定损单:'],//提示内容数组
        colors:['#49a9ea','#F3825F','#FFE26F','#F19584','#fd6802'],
        empty:true,
      }
    },
    methods:{
      listView(item){//查看
        this.$dialog.OpenWindow({
          width: '1050',
          height: '600',
          url:'/workOrderServiceView?subProcessID='+this.upDateStateID+'&id='+item.id+'&flowPathID='+this.flowPathID,
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
            okCallBack: (datas) => {
              if(this.index!=0&&this.index!=undefined){
                this.ajaxJson({
                  url: '/fix/fixProcessDetail/save',//添加商品节点
                  data: {
                    'nameStr':'检修',
                    'id':guid(),
                    'ownerID':this.flowPathID,
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
                              this.$dialog.close()
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
          console.log( ids )
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
            console.log( this.detailList )
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
      affirmProcess(){
        // let arr = []
        // for(let i in this.list){
        //   arr.push(this.list[i].stateStr)
        // }
        // if(arr.indexOf('0')==-1){
          this.$dialog.confirm({
            alertImg: 'warn',
            width:'330',
            tipValue: '是否确认已完成当前工序?',
            okCallBack: () => {
              let params = {
                id: this.ids,
                stateStr:'1',
              }
              this.ajaxJson({
                url: '/fix/fixrepair/save',//更新当前工序状态
                data: params,
                call: (data) => {
                  if(data.type=='0'){
                    this.initData()
                    let params = {
                      id:this.upDateStateID,
                      ownerID:this.flowPathID,
                      state:'1'
                    }
                    this.ajaxJson({
                      url: '/fix/fixProcessDetail/save',//更新子流程表状态
                      loading:'0',
                      data: params,
                      call: () => {

                      }
                    })
                    this.$dialog.alert({
                      tipValue: data.message,
                      closeCallBack: () => {
                        if(!this.inTheEnd){
                          this.$dialog.close()
                        }
                        // this.initData()
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
        // }else{
        //   this.$dialog.alert({
        //     tipValue:',请重新创建节点。',
        //     alertImg:'warn',
        //     width:'330'
        //   })
        // }


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
              console.log( 'data',data )
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
              console.log( this.detailList )
            }
          }
        })
        // console.log( this.list )
      },
      confirmServe(item){//确认完成当前服务
        this.$dialog.confirm({
          alertImg: 'warn',
          tipValue: '是否确认完成服务?',
          okCallBack: () => {
            let params = {
              id:item.id,
              orderid:this.ownerID,
              ownerID:this.ids,
              stateStr:'1'
            }
            this.ajaxJson({
              url: '/fix/fixOrderRevenue/save',
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
          url: '/selectProcessServices?ownerID='+this.ownerID,
          title: '选择工序服务',
          closeCallBack: (data) => {
            if (data) {
              console.log( 'data',data )
            }
          }
        })
      },
      save() {
        let a = this.validator()
        let b = this.list.length!=0
        if (a) {
          if(b){
            let params = {
              id: this.id,
              type: this.type,//工作类型编号
              stateStr:'0',
              repairName: this.repairName,//工作内容
              repairType: this.repairType,
              detailList: this.detailList,//工作详情的id字符串
              processDetailid: this.processDetailid
            }
            this.ajaxJson({
              url: '/fix/fixrepair/save',
              data: params,
              call: (data) => {
                this.$dialog.setReturnValue(this.id)
                let params = {
                  'nameStr':this.repairName,
                  'id':guid(),
                  'ownerID':this.flowPathID,
                  'dependid':this.id,
                  'stage':'2',
                  'state':'0',
                  'type':'5',
                  'orderStr':this.index+1
                }
                this.ajaxJson({
                  url: '/fix/fixProcessDetail/save',
                  // loading:'0',
                  data: params,
                  call: () => {
                    if (data.type === 0) {
                      this.$dialog.alert({
                        tipValue: data.message,
                        closeCallBack: () => {
                          this.$dialog.close()
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
          }else{
            this.$dialog.alert({
              tipValue:'工序服务不能为空',
              alertImg:'warn',
              width:'330'
            })
          }

        }
      },
      initData(){
        let params = {
          id: this.dependid,
        }
        this.ajaxJson({
          url: '/fix/fixrepair/initForm',
          data: params,
          call: (data) => {
            this.type = data.type
            this.ids = data.id
            this.list = data.relist
            this.stateStr = data.stateStr
            this.repairName = data.repairName
            this.repairType = data.repairType
            this.categoryList = data.categoryPsd.list
            this.stateList = data.statePsd.list
            this.directionList = data.directionPsd.list
            this.repairTypeList = data.repairTypePsd.list

            let arr = []
            for(let i in this.list){
              arr.push(this.list[i].stateStr)
            }
            if(arr.indexOf('0')==-1){
              this.confirmShow = true
            }else{
              this.confirmShow = false
            }
            this.empty = this.list.length === 0
          }
        })
      }
    },
    created () {
      this.setQuery2Value('index')
      this.setQuery2Value('ownerID')
      this.setQuery2Value('dependid')
      this.setQuery2Value('inTheEnd')
      this.setQuery2Value('flowType')
      this.setQuery2Value('flowPathID')
      this.setQuery2Value('upDateStateID')//子流程id
      if(this.flowType==5){
        this.lookOverShow = true
        this.initData()
      }else {
        this.lookOverShow = false
        this.ajaxJson({
          url: '/fix/fixrepair/initForm',
          data: {},
          call: (data) => {
            this.ids = data.id
            this.repairType = data.repairType
            this.repairTypeList = data.repairTypePsd.list
            this.empty = this.list.length === 0
          }
        })
      }
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
