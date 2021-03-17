<template>
    <div class="f_main">
      <yhm-view-body>
        <template #title>基本信息</template>
        <template #body>
          <yhm-view-control title="服务名称" :content="name"></yhm-view-control>
<!--          <yhm-view-control title="商品规格" :content="model"></yhm-view-control>-->
          <yhm-view-control title="变化金额" :content="money" type="money"></yhm-view-control>
          <yhm-view-control title="发生日期" :content="workDate" type="date"></yhm-view-control>
          <yhm-view-control title="类型" :content="category" :psd="categoryList"></yhm-view-control>
          <yhm-view-control title="状态" :content="state" :psd="stateList"></yhm-view-control>
          <yhm-view-control title="备注" :content="remark"></yhm-view-control>

        </template>
      </yhm-view-body>

      <yhm-formoperate :title-show="true" :createName="createName" :insertDate="insertDate" :updateName="updateName" :updateDate="updateDate">
        <template #btn>
          <circle-menu type="middle" :key="key" v-show="affirm!=0&&inTheEnd=='true'" :colors="colors" :number="4" animate="animated jello" btn circle>
            <button type="button" ></button>
            <!-- 添加服务  追加定损   选择服务 结束服务 -->
            <div slot="item_1" class="submenu"  @click="submenuClick(3)" @mouseout="titleRight=''" @mouseover="submenuMouseover(3)">定损</div>
            <div slot="item_2" class="submenu" @click="submenuClick(2)" @mouseout="titleRight=''" @mouseover="submenuMouseover(2)">下一步</div>
            <div slot="item_3" class="submenu" @click="submenuClick(1)" @mouseout="titleRight=''" @mouseover="submenuMouseover(1)">服务</div>
            <div slot="item_4" class="submenu" @click="submenuClick(0)" @mouseout="titleRight=''" @mouseover="submenuMouseover(0)">结束</div>
          </circle-menu>
<!--          <yhm-commonbutton value="查看" icon=" " :flicker="true" @call="lookOverSth()"></yhm-commonbutton>-->
<!--          <yhm-commonbutton value="确认完成" icon="btnSave" v-show="affirm==0" :flicker="true" @call="confirmCompleted()"></yhm-commonbutton>-->
        </template>
        <template #titleLeft>
           {{titleRight}}
        </template>
      </yhm-formoperate>
    </div>
</template>

<script>
  import { viewmixin } from '@/assets/view.js'
  import {guid} from '@/assets/common.js'
  export default {
    name: 'workOrderServiceView',
    mixins: [viewmixin],
    data(){
      return{
        key:0,
        name:'',//项目名称
        model:'',//规格型号
        money:'',//变化金额
        remark:'',//备注
        btnShow:'0',//
        affirm:'',//当前服务的状态
        workDate:'',//发生日期
        titleRight:'',//提示内容
        titleRightList:['结束服务:将会结束后边的服务并进行检修交车阶段.','增加服务:将会跳到服务列表.','选择服务:选择下一步将进行的服务','追加定损单:将会跳到定损到列表.'],//提示内容数组
        inTheEnd:false,//是否是最后一条服务
        // ['#49a9ea','#2f54eb','#a60cde','#d618ab','#fd6802']
        // [ '#563761', 'rgb(255, 255, 102)', '#FFE26F', '#F3825F', '#F19584']
        colors:['#49a9ea','#F3825F','#FFE26F','#F19584','#fd6802'],
        category:'',//类型
        categoryList:[
          {
            code: "",
            img: "",
            num: "0",
            showName: "预计金额"
          },
          {
            code: "",
            img: "",
            num: "1",
            showName: "实际金额"
          },
        ],
        state:'',//状态
        stateList:[
          {
            code: "",
            img: "",
            num: "0",
            showName: "工作"
          },
          {
            code: "",
            img: "",
            num: "1",
            showName: "检修"
          },
        ]
      }
    },
    methods:{
      submenuMouseover(index){
        this.titleRight = this.titleRightList[index]
      },
      submenuClick(index){
        // this.key++
        // this.titleRight = ''
        // if(this.btnShow=='1'){
          if(index==0){//结束服务 添加检修节点
            this.$dialog.confirm({
              width: 300,
              tipValue: '是否确认结束服务,进入检修阶段？',
              btnValueOk: '确认',
              btnValueCancel: '取消',
              alertImg: 'warn',
              okCallBack: (datas) => {
                if(this.index!=0&&this.index!=undefined){
                  this.ajaxJson({
                    url: '/fix/fixProcessDetail/confirm',
                    data: {
                      id:this.subProcessID,
                      ownerID:this.flowPathID,
                      state:'1'
                    },
                    call: (datas) => {
                      if(datas.type==0){
                        this.judge(datas)
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
          }else if(index==2){//选择下一步进行的服务
            this.$dialog.OpenWindow({
              width: '1050',
              height: '700',
              url:'/workOrderDetailsManagerView?ownerID='+this.ownerID+'&flowPathID='+this.flowPathID+'&operationShow=1'+'&index='+this.index+'&upDateStateID='+this.upDateStateID,
              title:'添加服务',
              closeCallBack:(data) =>{
                this.initData()
              }
            })
          }else if(index==3){//定损单
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
      judge(data){//添加检修节点
        let params = {
          'nameStr':'检修',
          'id':guid(),
          'ownerID':this.flowPathID,
          'dependid':'',
          'stage':'2',
          'state':'0',
          'type':'3',
          'orderStr':this.index
        }
        // if(data.message=='确认成功'){
        //   if(this.inTheEnd=='true'){
            this.ajaxJson({
              url: '/fix/fixProcessDetail/save',
              loading:'0',
              data: params,
              call: (data) => {

              }
            })
          // }
        // }
      },
      confirmCompleted(){
        this.$dialog.confirm({
          width: 300,
          tipValue: '是否确认已完成当前服务？',
          btnValueOk:'确认',
          btnValueCancel:'取消',
          alertImg: 'warn',
          okCallBack: (datas) => {
            let params = {
              id:this.subProcessID,
              ownerID:this.flowPathID,
              state:'1'
            }
            this.ajaxJson({
              url: '/fix/fixProcessDetail/confirm',
              data: params,
              call: (data) => {
                if(data.type==0){
                  // this.judge(data)
                  this.$dialog.alert({
                    tipValue: data.message,
                    closeCallBack: () => {
                      this.affirm = '1'
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
                      // this.$dialog.close()
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
          },
          closeCallBack:(data) =>{
          }
        })
      },
      lookOverSth(){//查看编辑工单详情
        this.$dialog.OpenWindow({
          width: '1050',
          height: '700',
          url:'/workOrderAddDetailsForm?id='+this.id,
          title:this.name,
          closeCallBack:(data) =>{
            this.initData()
          }
        })
      },
      initData () {
        let params = {
          id:this.id,//流程子表dependid
          // ownerID:this.subProcessID,//流程子表id
        }
        this.ajaxJson({
          url: '/fix/fixOrderRevenue/initForm',
          data: params,
          call: (data) => {
            if(data){
              this.workDate = data.workDate//发生日期
              this.model = data.model//规格型号
              this.name = data.name//项目名称
              this.remark = data.remark//备注
              this.money = data.money//变化金额
              this.category = data.category//商品类型
              this.state = data.state//工作类型
              this.affirm = data.stateStr//完成状态
              // alert(this.affirm)
              // alert(this.inTheEnd)
            }
          }
        })
      }
    },
    created () {
      this.setQuery2Value('index')//节点索引值
      this.setQuery2Value('inTheEnd')//是否为当前所有节点的最后一个
      this.setQuery2Value('subProcessID')//流程子表ID
      this.setQuery2Value('upDateStateID')//流程子表dependid
      this.setQuery2Value('ownerID')//工单ID
      this.setQuery2Value('flowPathID')//主流程表ID
      this.initData()
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
.btnSave::before{
  margin: 0;
}
</style>
