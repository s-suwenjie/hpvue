<template>
    <div  class="f_main">
      <yhm-schedule v-if="isFinish!=3&&state!=0" :config="scheduleConfig" :psd="approveFlowsItemList"></yhm-schedule>
<!--      <yhm-view-body :customize="true" :pager="false">-->
<!--        <template #title>基本信息</template>-->
<!--        <template #body>-->
<!--          <yhm-view-control title="公司名称" :content="unit"></yhm-view-control>-->
<!--          <yhm-view-control title="税号" :content="unitTaxNumber" type="date"></yhm-view-control>-->
<!--          <yhm-view-control title="地址" :content="unitAddress"></yhm-view-control>-->
<!--          <yhm-view-control title="电话" :content="unitTel"></yhm-view-control>-->
<!--          <yhm-view-control title="开户行" :content="unitBank"></yhm-view-control>-->
<!--          <yhm-view-control title="账号" :content="unitAccount" color="#49a9ea" style="cursor: pointer;"></yhm-view-control>-->
<!--        </template>-->
<!--      </yhm-view-body>-->

      <div class="out_border">
        <div class="top_title">
          <div class="border_div">
            <div class="ji_left">基本信息</div>
          </div>
          <div class="border_div">
            <div class="ji_left">发票抬头信息</div>
          </div>
        </div>

        <div class="border_div">
          <div class="border_two">
            <div class="left" style="color: #49A9EA">公司名称</div>
            <div class="Text" style="color: #49A9EA">:</div>
            <div class="right">{{unit}}</div>
          </div>
          <div class="border_two">
            <div class="left" style="color: #49A9EA">税号</div>
            <div class="Text" style="color: #49A9EA">:</div>
            <div class="right">{{unitTaxNumber}}</div>
          </div>
          <div class="border_two">
            <div class="left" style="color: #49A9EA">地址.电话</div>
            <div class="Text" style="color: #49A9EA">:</div>
            <div class="right">{{unitAddress}} {{unitTel}}</div>
          </div>
          <div class="border_two">
            <div class="left" style="color: #49A9EA">开户行及账号</div>
            <div class="Text" style="color: #49A9EA">:</div>
            <div class="right">{{unitBank}} {{unitAccount}}</div>
          </div>
        </div>

        <div class="border_div">
          <div class="border_two">
            <div class="left">开发票类型</div>
            <div class="Text">:</div>
            <div class="right" :style="{'color':invoiceTypeColor}">{{invoiceTypeFont}}</div>
          </div>
          <div class="border_two">
            <div class="left">款项状态</div>
            <div class="Text">:</div>
            <div class="right" :style="{'color':isReceivablesColor}">{{isReceivablesFont}}</div>
          </div>
          <div class="border_two">
            <div class="left">公司名称</div>
            <div class="Text">:</div>
            <div class="right">{{otherUnit}}</div>
          </div>
          <div class="border_two">
            <div class="left">税号</div>
            <div class="Text">:</div>
            <div class="right">{{otherTaxNumber}}</div>
          </div>
          <div class="border_two">
            <div class="left">地址.电话</div>
            <div class="Text">:</div>
            <div class="right">{{otherAddress}} {{otherTel}}</div>
          </div>
          <div class="border_two">
            <div class="left">开户行及账号</div>
            <div class="Text">:</div>
            <div class="right">{{otherBank}} {{otherAccount}}</div>
          </div>
          <div>
            <yhm-view-control category="3" title="文件" type="files" :content="fileList" tag="Deposit"></yhm-view-control>
          </div>
        </div>

      </div>

      <div class="f_split"></div>

<!--      <yhm-view-body :customize="true" :pager="false">-->
<!--        <template #title>发票抬头信息</template>-->
<!--        <template #body>-->
<!--          <yhm-view-control title="公司名称" :content="otherUnit"></yhm-view-control>-->
<!--          <yhm-view-control title="税号" :content="otherTaxNumber"></yhm-view-control>-->
<!--          <yhm-view-control title="地址" :content="otherAddress"></yhm-view-control>-->
<!--          <yhm-view-control title="电话" :content="otherTel"></yhm-view-control>-->
<!--          <yhm-view-control title="开户行" :content="otherBank"></yhm-view-control>-->
<!--          <yhm-view-control title="账号" :content="otherAccount"></yhm-view-control>-->
<!--          <yhm-view-control title="开发票类型" :content="invoiceType" :psd="invoiceTypePsd.list"></yhm-view-control>-->
<!--          <yhm-view-control title="款项状态" :content="isReceivables" :psd="isReceivablesPsd.list"></yhm-view-control>-->
<!--          <yhm-view-control category="3" title="文件" type="files" :content="fileList" tag="Deposit"></yhm-view-control>-->
<!--        </template>-->
<!--      </yhm-view-body>-->
      <div class="f_split"></div>
      <yhm-view-tab v-if="isReceivables==='0'">
        <template #tab>
          <yhm-view-tab-button :list="tabState" :index="0">收支明细</yhm-view-tab-button>
        </template>
        <template #content>
          <yhm-view-tab-list :customize="true" v-show="tabState[0].select">
            <template #listHead>
              <yhm-managerth style="width: 150px" title="账号"></yhm-managerth>
              <yhm-managerth style="width: 150px" title="对方账号"></yhm-managerth>
              <yhm-managerth style="width: 140px" title="交易日期"></yhm-managerth>
              <yhm-managerth style="width: 80px" title="收支方向"></yhm-managerth>
              <yhm-managerth style="width: 110px" title="事由"></yhm-managerth>
              <yhm-managerth style="width: 120px" title="交易金额"></yhm-managerth>
              <yhm-managerth style="width: 110px" title="备注"></yhm-managerth>
              <yhm-managerth style="width: 100px" title="凭证"></yhm-managerth>
            </template>
            <template #listBody>
              <tr v-for="(item,index) in bankDetailList" :class="{InterlacBg:index%2!=0}" :key="index">
                <yhm-manager-td :value="item.selfAccount"></yhm-manager-td>
                <yhm-manager-td :value="item.otherAccount"></yhm-manager-td>
                <yhm-manager-td-date :value="item.cccurDate"></yhm-manager-td-date>
                <yhm-manager-td-direction :direction="item.direction" class="dfJcc" :value="item.direction" :dir-val="false"></yhm-manager-td-direction>
                <yhm-manager-td :value="item.subject.split(' ')[0]"></yhm-manager-td>
                <yhm-manager-td-money :value="item.money"></yhm-manager-td-money>
                <yhm-manager-td :value="item.remark"></yhm-manager-td>
                <yhm-manager-td-image :tip="true" width="850" height="600" left="50" type="files" :value="item.storeName" :tag="'bankDetail'" ></yhm-manager-td-image>
              </tr>
            </template>
            <template #empty>
              <span class="m_listNoData"  v-show="bankDetailList.length>=1?false:true">暂时没有数据</span>
            </template>
          </yhm-view-tab-list>
        </template>
      </yhm-view-tab>
      <div class="f_split"></div>
      <yhm-view-body v-if="isFinish!=3&&state!=3" >
        <template #title>审批流程信息</template>
        <template #body>
          <yhm-flows :config="configFlows" :psd="approveFlowsItemList"></yhm-flows>
        </template>
      </yhm-view-body>
      <yhm-formoperate :createName="createName" :insertDate="insertDate" :updateName="updateName" :updateDate="updateDate">
        <template #btn>
          <yhm-commonbutton value="编辑" v-if="state=='0'&&isApproval=='0'" icon="i-edit" :flicker="true" @call="editBtn()"></yhm-commonbutton>
          <yhm-commonbutton v-if="isApproval=='0'&&isFinish=='0'&&state!='0'" @call="adoptEvent()" value="通过" icon="i-btn-applicationSm" color="#49a9ea"></yhm-commonbutton>
          <yhm-commonbutton v-if="isApproval=='0'&&isFinish=='0'&&state!='0'" @call="rejectEvent()" value="驳回" icon="i-btn-turnDown" color="#FF0000"></yhm-commonbutton>
        </template>
      </yhm-formoperate>

    </div>
</template>

<script>
  import { viewmixin } from '@/assets/view.js'
  export default {
    name: 'invoiceRiseView',
    mixins: [viewmixin],
    data(){
      return{
        scheduleConfig:{},
        approveFlowsItemList:[],
        configFlows:{
          list:[]
        },
        invoiceTypePsd:[],
        invoiceType:'',
        isReceivablesPsd:[],
        isReceivables:'',
        insertDate:"",
        otherUnit:'',
        otherAccount:"",
        otherAddress:"",
        otherBank:"",
        otherTaxNumber:"",
        otherTel:"",
        unit:"",
        unitAccount:"",
        unitAddress:"",
        unitBank:"",
        unitTaxNumber:"",
        unitTel:"",
        state:'',
        fileList:[],
        tabState:[{select:true}],
        bankDetailList:[],
        isApproval:'0',//0不显示审批按钮  1显示审批按钮
        isFinish:'',
        insertDate:'',
        createName:'',
        updateName:'',
        updateDate:'',
        invoiceTypeFont:'',
        invoiceTypeColor:'',
        isReceivablesFont:'',
        isReceivablesColor:'',

      }
    },
    created(){
      this.setQuery2Value('isApproval')
      this.init()
    },
    methods:{
      adoptEvent(){
        this.$dialog.OpenWindow({
          width: 650,
          height: 230,
          title: '通过留言',
          url: '/springBootApprovalMessage?id=' + this.id+'&category=5',
          closeCallBack: (data)=>{
            if (data){
              this.$dialog.setReturnValue(this.id) //向父级页面id值
              this.$dialog.close()
            }
          }
        })
      },
      rejectEvent(){
        this.$dialog.OpenWindow({
          width: 1050,
          height: 720,
          title: '驳回留言',
          url: '/springBootRejectReason?id=' + this.id+'&category=5&state=18',
          closeCallBack: (data)=>{
            if (data){
              this.$dialog.setReturnValue(this.id) //向父级页面id值
              this.$dialog.close()
            }
          }
        })
      },
      editBtn(){
        this.$dialog.OpenWindow({
          width: 1050,
          height: 820,
          url:'/invoiceRiseForm?id='+this.id,
          title:'添加税号信息',
          closeCallBack:(data) =>{
            if(data){
              this.$dialog.setReturnValue(this.id) //向父级页面id值
              this.init()
            }
          }
        })
      },
      init(){
        let params = {
          id:this.id
        }
        this.ajaxJson({
          url: '/finance/invoiceRise/initForm',
          data: params,
          call: (data) => {
            this.unit=data.unit
            this.unitTaxNumber=data.unitTaxNumber
            this.unitAddress=data.unitAddress
            this.unitTel=data.unitTel
            this.unitBank=data.unitBank
            this.unitAccount=data.unitAccount
            this.otherUnit=data.otherUnit
            this.otherTaxNumber=data.otherTaxNumber
            this.otherAddress=data.otherAddress
            this.otherTel=data.otherTel
            this.otherBank=data.otherBank
            this.otherAccount=data.otherAccount
            this.invoiceType=data.invoiceType
            this.isReceivables=data.isReceivables
            this.state=data.state
            this.invoiceTypePsd=data.invoiceTypePsd
            this.isReceivablesPsd=data.isReceivablesPsd
            this.fileList=data.fileList
            this.bankDetailList=data.bankDetailList
            this.isFinish=data.isFinish
            if (this.isFinish!=3&&this.state!=0) {
              this.approveFlowsItemList=data.approvalStatePsd.list
              this.scheduleConfig=data.app.schedule
              this.configFlows.list=data.app.listFlow
            }
            this.isApproval=data.isApproval
            this.updateName = data.updateName
            this.updateDate = data.updateDate
            this.insertDate = data.insertDate
            this.createName = data.createName

            for(let i in this.invoiceTypePsd.list){
              if(this.invoiceTypePsd.list[i].num == this.invoiceTypePsd.list[this.invoiceType].num){
                this.invoiceTypeFont=this.invoiceTypePsd.list[i].showName
                this.invoiceTypeColor=this.invoiceTypePsd.list[i].code
              }
            }
            for(let i in this.isReceivablesPsd.list){
              if(this.isReceivablesPsd.list[i].num == this.isReceivablesPsd.list[this.isReceivables].num){
                this.isReceivablesFont=this.isReceivablesPsd.list[i].showName
                this.isReceivablesColor=this.isReceivablesPsd.list[i].code
              }
            }
          }
        })
      }

    }
  }
</script>

<style scoped>
  .out_border{width: 1000px;border-radius: 8px;background-color: #ffffff;margin: 16px auto;}
  .top_title{width: 100%;border-bottom: 1px solid #d9d9d9}
  .ji_left{padding: 16px;font-size: 16px;color: #333333;display: inline-block}
  .border_div{width: 50%;display: inline-block;vertical-align: top}
  .border_two{box-sizing: border-box;padding: 12px 16px}
  .left{box-sizing: border-box;font-size: 14px;color:#A7833B;font-weight: bold;display: inline-block;width: 25%;vertical-align: top;text-align: justify;height: 16px}
  .left::after {display: inline-block;width: 100%;content: "";}
  .Text{font-size: 14px;color:#A7833B;font-weight: bold;display: inline-block;width: 5%;text-align: center;vertical-align: top}
  .right{box-sizing: border-box;display: inline-block;font-size: 14px;padding-left: 10px;max-width: 70%;vertical-align: top;line-height: 16px}
  .img_right{width: 60px;padding-left: 10px;}
  .img_float{position: absolute;width: 200px;left: 0;top: 0;display: none;border: 2px solid #BFBFBF;z-index: 3;border-radius: 6px;}
  .floats:hover .img_float{display: inline-block;}
</style>
