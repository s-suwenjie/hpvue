<template>
  <div class="f_main">

    <yhm-view-body>
      <template #title>基本信息</template>
      <template #body>
        <yhm-view-control title="签收日期" v-if="isWorkDate" :content="workDate"></yhm-view-control>
        <yhm-view-control title="寄出日期" v-else :content="workDate"></yhm-view-control>
        <yhm-view-control title="信函分类" :content="letterClassification" :psd="letterClassificationList"></yhm-view-control>
        <yhm-view-control title="快递公司" :content="companyID" :psd="companyIDList"></yhm-view-control>
        <yhm-view-control title="签收状态" :content="signFor" :psd="signForList"></yhm-view-control>
        <yhm-view-control title="寄件人" :content="wePersonName" ></yhm-view-control>
      </template>
    </yhm-view-body>
    <div class="f_split"></div>
    <yhm-view-body>
      <template #title v-if="isWorkDate">寄件人信息</template>
      <template #title v-else>收件人信息</template>

      <template #body>
        <yhm-view-control title="公司名称" :content="unit"></yhm-view-control>
        <yhm-view-control title="地址区域" :content="regionName"></yhm-view-control>
        <yhm-view-control category="3" title="地址详情" :content="address"></yhm-view-control>
        <yhm-view-control title="寄件人"  v-if="isWorkDate" :content="otherPartyPersonName"></yhm-view-control>
        <yhm-view-control title="收件人" v-else :content="otherPartyPersonName"></yhm-view-control>
        <yhm-view-control title="电话"  :content="otherPartyTelePhone"></yhm-view-control>
        <yhm-view-control title="手机号"  :content="otherPartyPhone" ></yhm-view-control>

      </template>
    </yhm-view-body>
    <div class="i-left fs48b colorFFF lftSwitchArrow" title="上一条" v-show="index==0?false:true"  @click="leftStrip">
    </div>
    <div class="i-right fs48b colorFFF rgtSwitchArrow" title="下一条" v-show="(arrId.length-1)==index?false:true" @click="rightStrip">
    </div>
    <div class="f_split"></div>
    <yhm-view-body>
      <template #title>收寄物内容信息</template>
      <template #body>
        <yhm-view-control title="收寄物类型" :content="itemType" :psd="itemTypeList"></yhm-view-control>
        <yhm-view-control title="收寄物内容" v-if="(itemType=='1'||itemType=='4')?false:true"  :content="itemContent"></yhm-view-control>
        <yhm-view-control title="数量" :content="itemCount"></yhm-view-control>
      </template>
    </yhm-view-body>
    <yhm-form-list-edit v-if="this.itemType==1?true:false">
      <template #title>收寄物内容</template>
      <template #listHead>
        <yhm-managerth style="width: 200px" title="文件名称"></yhm-managerth>
        <yhm-managerth style="width: 200px" title="文件编号"></yhm-managerth>
        <yhm-managerth style="width: 200px" title="文件数量"></yhm-managerth>
        <yhm-managerth title="文件备注"></yhm-managerth>

      </template>
      <template #listBody>
        <tr v-for="(item,index) in detailsList" :key="index" :class="{InterlacBg:index%2!==0}">
          <yhm-manager-td  :value="item.name"></yhm-manager-td>
          <yhm-manager-td  :value="item.number"></yhm-manager-td>
          <yhm-manager-td  :value="item.detailNumber"></yhm-manager-td>
          <yhm-manager-td  :value="item.remark"></yhm-manager-td>

        </tr>
      </template>
    </yhm-form-list-edit>
    <yhm-form-list-edit v-if="itemType=='4'?true:false">
      <template #title>发票内容</template>
      <template #listHead>
        <yhm-managerth style="width: 200px" title="发票"></yhm-managerth>
        <yhm-managerth style="width: 200px" title="发票金额"></yhm-managerth>
        <yhm-managerth style="width: 200px" title="发票数量"></yhm-managerth>
        <yhm-managerth title="发票备注"></yhm-managerth>
        <yhm-managerth style="width: 100px" title="发票照片"></yhm-managerth>


      </template>
      <template #listBody>
        <tr v-for="(item,index) in detailsList" :key="index" :class="{InterlacBg:index%2!==0}">
          <yhm-manager-td  :value="item.name"></yhm-manager-td>
          <yhm-manager-td  :value="item.number"></yhm-manager-td>
          <yhm-manager-td  :value="item.detailNumber"></yhm-manager-td>
          <yhm-manager-td  :value="item.remark"></yhm-manager-td>
          <yhm-manager-td-image  :tip="true" width="850" height="600" left="50" type="files" :value="item.url" tag="Invoice" :pdf-url="item.url"></yhm-manager-td-image>
        </tr>
      </template>
    </yhm-form-list-edit>
    <div class="f_split"></div>
    <yhm-view-body>
      <template #title>费用及支付信息</template>
      <template #body>
        <yhm-view-control  title="结算状态" v-if="isReceivePayWay" :content="receivePayWay" :psd="receivePayWayList"></yhm-view-control>
        <yhm-view-control title="计费件数/重量" v-if="isNum" :content="num+'/'+weight+'KG'"></yhm-view-control>
        <yhm-view-control title="费用"  v-if="ifAmount" :content="amount"></yhm-view-control>
        <yhm-view-control title="结算方式" v-if="isSendPayWay"  :content="sendPayWay" :psd="sendPayWayList"></yhm-view-control>
      </template>
    </yhm-view-body>
    <yhm-formoperate :createName="createName" :insertDate="insertDate" :updateName="updateName" :updateDate="updateDate">
      <template #btn>
      </template>
    </yhm-formoperate>
  </div>
</template>

<script>
  import { viewmixin } from '@/assets/view.js'
  export default {
    name: 'myAdminExpressView',
    mixins: [viewmixin],
    data(){
      return{
        // scheduleConfig:{
        //
        // },
        // configFlows:{
        //   list:[]
        // },
        // approveFlowsItemList:[],
        id:'',
        companyIDList:[],
        companyID:'',
        companyName:'',//快递公司
        itemTypeList:[],
        itemType:'',  //收寄物类型
        letterClassificationList:[],  //信函类型
        letterClassification:'',
        receivePayWayList:[],
        receivePayWay:'',
        sendPayWayList:[],
        sendPayWay:'',
        signForList:[],
        signFor:'',
        weight:'',
        num:'',
        amount:'',
        address:'',//地址
        destinationCode:'',//目的地代码
        destinationName:'',//目的地名称
        destinationID:'',
        itemContent:'',//收寄物内容
        itemCount:'',//收寄物数量
        otherPartyPersonID:'',//收件人名称
        otherPartyPersonName:'',
        otherPartyPhone:'',//电话
        otherPartyTelePhone:'',//手机号
        regionID:'',//地址区域ID
        regionName:'',
        regionCode:'',
        unit:'',//公司名称
        wePersonID:'',//收件人
        wePersonName:'',
        workDate:'',//收寄时间
        detailsList:[],
        isWorkDate:true,
        isReceivePayWay:false,

        isNum:true,
        ifAmount:true,
        isSendPayWay:true,

        //左右切换
        arrId:[],
        index:0,
        isLeftID:false,//延长按钮
        leftID:'',//上一条ID
        isRightID:false,//延长按钮
        rightID:'',//下一条ID
      }
    },
    methods:{
      leftStrip(){
        this.index--
        this.initDate()
      },
      rightStrip(){
        this.index++
        this.initDate()
      },
      editBtn(){
        this.$dialog.OpenWindow({
          width: '1050',
          height: '750',
          url: '/myExpressForm?id='+this.id,
          title: '查看快递信息',
          closeCallBack: (data) => {
            if (data) {
              this.lastData = data
              this.initDate(false)
              /*false->非初始化=>!import  true->初始化*/
            }
          }
        })
      },
      initDate(){
        this.setQuery2Value('id')
        this.arrId = this.id.split(',')

        let params={
          id:this.arrId[this.index]
        }

        this.init({
          url: '/dailyoffice/myExpress/initForm',
          data: params,
          // loading: '0',
          call: (data) => {
            this.companyIDList = data.companyIDPsd.list
            this.itemTypeList = data.itemTypePsd.list
            this.letterClassificationList = data.letterClassificationPsd.list
            this.receivePayWayList=data.receivePayWayPsd.list
            this.sendPayWayList=data.sendPayWayPsd.list
            this.signForList=data.signForPsd.list
            // this.approveFlowsItemList=data.approveFlowsItemPsd.list

            this.companyID=data.companyID
            this.companyName=data.companyName
            this.itemType=data.itemType
            this.letterClassification=data.letterClassification
            this.address=data.address
            this.destinationCode=data.destinationCode
            this.destinationName=data.destinationName
            this.destinationID=data.destinationID
            this.itemContent=data.itemContent
            this.itemCount=data.itemCount
            this.otherPartyPersonID=data.otherPartyPersonID
            this.otherPartyPersonName=data.otherPartyPersonName
            this.otherPartyPhone=data.otherPartyPhone
            this.otherPartyTelePhone=data.otherPartyTelePhone
            this.regionID=data.regionID
            this.regionName=data.regionName
            this.regionCode=data.regionCode
            this.unit=data.unit
            this.wePersonID=data.wePersonID
            this.wePersonName=data.wePersonName
            this.workDate=data.workDate
            this.detailsList=data.detailsList
            this.receivePayWay=data.receivePayWay
            this.sendPayWay=data.sendPayWay
            this.weight=data.weight
            this.num=data.num
            this.amount=data.amount
            this.signFor=data.signFor
            // this.scheduleConfig=data.app.schedule
            // this.configFlows.list=data.app.listFlow
            if (this.letterClassification==0){
              this.isWorkDate=true
              this.isReceivePayWay=true
              this.isNum=false
              this.ifAmount=false
              this.isSendPayWay=false

              if (this.receivePayWay==0){
                this.isNum=false
                this.ifAmount=false

              }else {
                this.isNum=true
                this.ifAmount=true

              }
            }else{
              this.isWorkDate=false
              this.isReceivePayWay=false
              this.isNum=true
              this.ifAmount=true
              this.isSendPayWay=true
              if(this.sendPayWay==0){
                this.isNum=true
                this.ifAmount=true
              }else {
                this.isNum=false
                this.ifAmount=false
                this.isReceivePayWay=false
              }
            }



          }
        })
      }
    },
    created(){
      this.initDate()
    },
  }
</script>

<style scoped>

</style>
