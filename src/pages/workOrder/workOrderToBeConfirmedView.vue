<template>
  <div class="f_main">
    <yhm-view-body>
      <template #title>
        <div  v-if="fixrejectiondetail.id!=null&&fixrejectiondetail.id!=''">
          交车待状态:
          <span style="color: #f00;">拒绝</span>
        </div>
        <div  v-else-if="fixorder.state=='17'">
          交车待状态:
          <span style="color: #f5af19;">等待确认</span>
        </div>
        <div  v-else>
          交车待状态:
          <span style="color: #00bb68;">接受</span>
        </div>
      </template>
      <template #body>
        <yhm-view-control title="接待人" :content="personName"></yhm-view-control>
        <yhm-view-control title="车牌号" :content="carName"></yhm-view-control>
        <yhm-view-control title="车主" :content="carOwner"></yhm-view-control>
        <yhm-view-control title="联系人" :content="contactPerson"></yhm-view-control>
        <yhm-view-control title="联系人手机号" :content="contactPersonPhone"></yhm-view-control>
        <yhm-view-control title="到访日期" :content="visitDate" type="date"></yhm-view-control>
        <yhm-view-control title="联系人2" v-if="contactPerson2!=''" :content="contactPerson2"></yhm-view-control>
        <yhm-view-control title="联系人手机号2" v-if="contactPersonPhone2!=''" :content="contactPersonPhone2"></yhm-view-control>
        <yhm-view-control title="其它系统编号" :content="otherNode"></yhm-view-control>
        <yhm-view-control title="工单来源" :content="worksource" :psd="worksourceList"></yhm-view-control>
        <yhm-view-control title="业务来源" :content="business" :psd="businessList"></yhm-view-control>
        <yhm-view-control title="适用车型" :content="applicableModels" :psd="applicableModelsList"></yhm-view-control>
        <yhm-view-control title="状态" :content="state" :psd="stateList"></yhm-view-control>

        <yhm-view-control title="备注" :content="remark"></yhm-view-control>
        <!-- 14质检  拒绝  17竣工 待定    18终检 接受       -->
        <!--        <yhm-view-control v-if="fixorder.state=='14'" title="交车待确认状态" color="#f00" content="拒绝"></yhm-view-control>-->
        <!--        <yhm-view-control v-if="fixorder.state=='17'" title="交车待确认状态" color="#f5af19" content="等待确认"></yhm-view-control>-->
        <!--        <yhm-view-control v-if="fixorder.state=='18'" title="交车待确认状态" color="#00bb68" content="接受"></yhm-view-control>-->
      </template>
    </yhm-view-body>
    <div class="f_split" v-if="fixrejectiondetail.id!=null&&fixrejectiondetail.id!=''?true:false"></div>
    <yhm-view-body v-if="fixrejectiondetail.id!=null&&fixrejectiondetail.id!=''?true:false">
      <template #title>
        留言
      </template>
      <template #body>
        <yhm-view-control title="留言" category="3" :content="fixrejectiondetail.reason"></yhm-view-control>
      </template>
    </yhm-view-body>

    <div class="f_split" v-if="listShow"></div>
    <yhm-view-tab v-if="listShow">
      <template #tab>
        <yhm-view-tab-button :list="tabState" :index="0">无意理由</yhm-view-tab-button>
      </template>
      <template #content>
        <yhm-view-tab-list :customize="true"  v-show="tabState[0].select">
          <template #listHead>
            <yhm-managerth style="width:28px" title="理由" ></yhm-managerth>
          </template>
          <template #listBody>
            <tr v-for="(item,index) in list" :key="index" :class="{InterlacBg:index%2!==0}">
              <yhm-manager-td-center width="130"  value="item.otherName"></yhm-manager-td-center>
            </tr>
          </template>
          <template #empty>
            <span class="m_listNoData" v-show="empty">暂时没有数据</span>
          </template>
          <template #pager>
            <yhm-pagination :pager="pager" is-page-size="false" @initData="initPage(false)"></yhm-pagination>
          </template>
        </yhm-view-tab-list>
      </template>
    </yhm-view-tab>
    <yhm-formoperate>
      <template #btn>
        <yhm-commonbutton value="开始质检" v-if="fixorder.state=='14'&&inTheEnd=='true'" color="#00b86b" icon="i-complete" @call="submenuClick"></yhm-commonbutton>
      </template>
    </yhm-formoperate>
  </div>
</template>

<script>
  import { viewmixin } from '@/assets/view.js'
  import { guid } from '@/assets/common.js'
  export default {
    name: 'workOrderToBeConfirmedView',
    mixins: [viewmixin],
    data(){
      return{
        list:[],//拒绝理由
        listShow:false,//
        tabState:[{select:true}],
        personName:'',//接待人员姓名
        carName:'',//车牌号
        contactPerson:'',//联系人姓名
        contactPerson2:'',//备用联系人2
        fixrejectiondetail:{},//是否为拒绝
        contactPersonPhone:'',//联系人手机号
        contactPersonPhone2:'',//备用联系人手机号
        carOwner:'',//车主
        visitDate:'',//到访日期
        otherNode:'',//其它系统编号
        fixorder:{},//工单
        remark:'',//备注
        state:'',//状态
        stateList:[
          {
            num:'0',
            img:'',
            code:'',
            showName:'有意'
          },
          {
            num:'1',
            img:'',
            code:'',
            showName:'无意'
          },
        ],
        worksource:'',//工单来源
        worksourceList:[],//工单来源
        business:'',//业务来源
        businessList:'',//业务来源
        applicableModels:'',//适用车型
        applicableModelsList:'',//适用车型
      }
    },
    methods:{
      submenuClick(index){
        this.$dialog.confirm({
          width: 350,
          tipValue: '是否确认开始检修,进入检修阶段？',
          btnValueOk: '确认',
          btnValueCancel: '取消',
          alertImg: 'warn',
          okCallBack: (datas) => {
            this.ajaxJson({
              url: '/fix/fixProcessDetail/update',//整合接口
              data: {
                saveEntity: {
                  'nameStr': '检修',
                  'id': guid(),
                  'ownerID': this.flowPathID,
                  'dependid': '',
                  'stage': '2',
                  'state': '0',
                  'type': '3',
                  'orderStr': Number(this.index)+1
                },
                confirmEntity: {
                  id: this.subProcessID,
                  ownerID: this.flowPathID,
                  state: '2'
                }
              },
              call: (param) => {
                this.ajaxJson({
                  url: '/fix/fixProcess/update',//更新主流程节点索引
                  data: {
                    id:this.flowPathID,
                    stage:Number(this.index)+1
                  },
                  call: (data) => {
                    if (data.type == 0) {
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
          }
        })
        // }else{
        //   this.$dialog.alert({
        //     tipValue:'请先确认完成当前服务后,再选择生成下一流程。',
        //     alertImg:'warn',
        //     width:'300'
        //   })
        // }
        // this.$refs.state.click()
      },
      initData () {
        let params = {
          orderid:this.id,
        }
        this.ajaxJson({
          data:params,
          url: '/fix/fixreception/initForm',
          call: (data) => {

            this.fixorder = data.fixorder//工单
            this.personName = data.personName
            this.carName = data.carName//车辆
            this.contactPerson = data.contactPerson//联系人姓名
            this.contactPersonPhone = data.contactPersonPhone//联系人手机号
            this.contactPerson2 = data.contactPerson2//备用联系人姓名
            this.contactPersonPhone2 = data.contactPersonPhone2//备用联系人手机号
            this.carOwner = data.carOwner//车主
            this.otherNode = data.otherNode//其它系统编号
            this.remark = data.remark//备注
            this.state = data.state//状态
            this.worksource = data.worksource//工单来源
            this.worksourceList = data.workSourcePsd.list
            this.business = data.business//业务来源
            this.businessList = data.businessPsd.list
            this.applicableModels = data.applicableModels//适用车型
            this.applicableModelsList = data.applicableModelsPsd.list
            if(data.visitDate!=null){
              this.visitDate = data.visitDate//到访日期
            }
            if(data.state!=''){
              this.state = data.state//状态(有意无意)
            }
            this.list = data.list//无意的理由
            if(this.state=='1'){
              this.listShow = true
            }

            let personName = sessionStorage.getItem('____currentUser')
            let personid = sessionStorage.getItem('____currentUserID')
            let params = {
              id: guid(),
              orderid: data.fixorder.id,//工单id
              orderNum: data.fixorder.code,//工单号
              personid: personid,//登录人id
              personName: personName,//登录人名字
            }
            this.ajaxJson({
              url: '/fix/fixrejection/initFormFixrejection',
              loading:'0',
              data: params,
              call: (data) => {
                if (data) {
                  this.list = data.list
                }
              }
            })
            this.ajaxJson({
              url: '/fix/fixProcessDetail/initForm',
              loading:'0',
              data: {
                id:this.subProcessID
              },
              call: (param) => {
                this.fixrejectiondetail = param.fixrejectiondetail
              }
            })


          }
        })
      },
    },
    created () {
      this.setQuery2Value('id')
      this.setQuery2Value('index')//当前节点索引值
      this.setQuery2Value('inTheEnd')//是否为最后一个节点
      this.setQuery2Value('subProcessID')//当前节点id
      this.setQuery2Value('flowPathID')//主流程表id

      this.initData()
    }
  }
</script>

<style scoped>

</style>
