<template>
  <div class="f_main">
    <!--<yhm-schedule ref="schedule"  :config="scheduleConfig">-->
    <!--</yhm-schedule>-->
    <yhm-formbody>
      <template #title >基本信息</template>
      <template #control>
        <yhm-form-date placeholder=""  :no-edit="true" title="签收日期" v-if="isWorkDate" subtitle="" :value="workDate" id="workDate" rule="R0000"></yhm-form-date>
        <yhm-form-date placeholder="" :no-edit="true" title="寄出日期" v-else  subtitle="" :value="workDate" id="workDate" rule="R0000"></yhm-form-date>
        <yhm-form-radio title="信函分类"  @call="letterClassificationClick()"  :select-list="letterClassificationList" :value="letterClassification" id="letterClassification" ></yhm-form-radio>
        <yhm-form-radio title="快递公司"  width="1"  :select-list="companyIDList" :value="companyID" id="companyID" ></yhm-form-radio>
        <yhm-form-text placeholder=""  v-if="isWorkDate" title="快递单号" subtitle="" :value="code" id="code"></yhm-form-text>
        <yhm-form-radio title="签收状态" :no-edit="true"  :select-list="signForList" :value="signFor" id="signFor" ></yhm-form-radio>
      </template>
    </yhm-formbody>
    <div class="f_split"></div>
    <yhm-formbody >
      <template #title  v-if="isWorkDate">寄件人信息</template>
      <template #title v-else>收件人信息</template>
      <template #control>
        <yhm-form-text placeholder="直接录入或者点击后面图标选择公司"  title="公司名称" subtitle="" :value="unit" id="unit">
          <div class="formBoxIcon" @click="unitClick">
            <svg t="1602226869435"  class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2092" width="30" height="30" style="margin: auto;"><path d="M502.2 393.6m-163 0a163 163 0 1 0 326 0 163 163 0 1 0-326 0Z" fill="#AED7FF" p-id="2093"></path><path d="M197.5 363.4c0.1-1.4 0.2-2.7 0.3-4.1 12-147.5 137.4-263.1 285.6-263.1 151.5 0 275.8 118.2 285.9 267.2h20c-10-160-143.3-287.2-305.9-287.2-158.5 0-292.7 123.6-305.5 281.4-0.2 1.9-0.3 3.8-0.4 5.7h20zM768.1 414.9c-16 142.9-137.6 254.4-284.7 254.4s-268.6-109-284.7-254.4h-20.1c16.3 156.6 146.7 274.4 304.8 274.4 158.2 0 288.7-120.4 304.8-274.4h-20.1z" fill="#108EE9" p-id="2094"></path><path d="M483.4 160.3c-122.7 0-222.5 99.8-222.5 222.5s99.8 222.5 222.5 222.5 222.5-99.8 222.5-222.5c-0.1-122.7-99.9-222.5-222.5-222.5z m0 407.4c-102.1 0-184.9-82.8-184.9-184.9 0-102.1 82.8-184.9 184.9-184.9s184.9 82.8 184.9 184.9c0 102.1-82.8 184.9-184.9 184.9z" fill="#108EE9" p-id="2095"></path><path d="M483.4 510.7c-70.5 0-127.9-57.4-127.9-127.9s57.4-127.9 127.9-127.9 127.9 57.4 127.9 127.9-57.4 127.9-127.9 127.9z m0-209.3c-44.9 0-81.4 36.5-81.4 81.4s36.5 81.4 81.4 81.4c44.9 0 81.4-36.5 81.4-81.4s-36.6-81.4-81.4-81.4z" fill="#108EE9" p-id="2096"></path><path d="M433.2 563.8c0-51.5-0.2-103.1 0.1-154.6 0.2-36.1 18-57 48.2-57.2 32.1-0.2 54 22.6 54.2 57.8 0.4 57.4 0 114.8 0.2 172.2 0.1 30.5 7 38 39.5 40.9 65.3 5.7 130.6 11.1 195.9 16 41.3 3.1 57.7 20.5 49.6 58.2-16.4 76.4-34.4 152.6-51.1 228.9-4.5 20.8-18.2 30.5-39.7 31.4-29.5 1.3-59.1 2-88.7 2.1-83.2 0.3-166.4 0.2-249.6 0-32.3 0-42.7-6.7-52.8-34.7-27.9-77.3-55.5-154.7-83.2-232-8.1-22.5 4-47.3 27.4-56 22.2-8.2 52.7 2.8 62.4 24.2 11 24.4 21 49.3 30.1 74.3 5.4 14.8 13.6 26.7 31.6 24 19.2-3 26.3-16.8 26.2-34.4-0.5-53.7-0.4-107.4-0.3-161.1z" fill="#1195FE" p-id="2097"></path></svg>
          </div>
        </yhm-form-text>
        <yhm-form-select default-txt="+请选择相关国家、省份、城市、区县" title="地址区域" tip="value"   @click="recipientAddressClick" :value="regionName" id="regionName" rule="R0000"></yhm-form-select>
        <yhm-form-textarea  placeholder="请输入详情地址，包含省、市、区、街道等"  title="地址" subtitle="" :value="address" id="address"  rule="R0000"></yhm-form-textarea>
        <!--<yhm-form-text placeholder="直接录入或者点击后面图标选择"  title="收件人" subtitle="" @blur="personBlur()" @repeatverify="doesClick"  :value="recipientPersonName" id="recipientPersonName"  rule="R0000">-->
        <yhm-form-text placeholder="直接录入或者点击后面图标选择"  v-if="isWorkDate"  title="寄件人" subtitle="" @blur="personBlur()"   :value="otherPartyPersonName" id="otherPartyPersonName"  rule="R0000">
          <div class="formBoxIcon" @click="recipientClick">
            <svg t="1602226869435"  class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2092" width="30" height="30" style="margin: auto;"><path d="M502.2 393.6m-163 0a163 163 0 1 0 326 0 163 163 0 1 0-326 0Z" fill="#AED7FF" p-id="2093"></path><path d="M197.5 363.4c0.1-1.4 0.2-2.7 0.3-4.1 12-147.5 137.4-263.1 285.6-263.1 151.5 0 275.8 118.2 285.9 267.2h20c-10-160-143.3-287.2-305.9-287.2-158.5 0-292.7 123.6-305.5 281.4-0.2 1.9-0.3 3.8-0.4 5.7h20zM768.1 414.9c-16 142.9-137.6 254.4-284.7 254.4s-268.6-109-284.7-254.4h-20.1c16.3 156.6 146.7 274.4 304.8 274.4 158.2 0 288.7-120.4 304.8-274.4h-20.1z" fill="#108EE9" p-id="2094"></path><path d="M483.4 160.3c-122.7 0-222.5 99.8-222.5 222.5s99.8 222.5 222.5 222.5 222.5-99.8 222.5-222.5c-0.1-122.7-99.9-222.5-222.5-222.5z m0 407.4c-102.1 0-184.9-82.8-184.9-184.9 0-102.1 82.8-184.9 184.9-184.9s184.9 82.8 184.9 184.9c0 102.1-82.8 184.9-184.9 184.9z" fill="#108EE9" p-id="2095"></path><path d="M483.4 510.7c-70.5 0-127.9-57.4-127.9-127.9s57.4-127.9 127.9-127.9 127.9 57.4 127.9 127.9-57.4 127.9-127.9 127.9z m0-209.3c-44.9 0-81.4 36.5-81.4 81.4s36.5 81.4 81.4 81.4c44.9 0 81.4-36.5 81.4-81.4s-36.6-81.4-81.4-81.4z" fill="#108EE9" p-id="2096"></path><path d="M433.2 563.8c0-51.5-0.2-103.1 0.1-154.6 0.2-36.1 18-57 48.2-57.2 32.1-0.2 54 22.6 54.2 57.8 0.4 57.4 0 114.8 0.2 172.2 0.1 30.5 7 38 39.5 40.9 65.3 5.7 130.6 11.1 195.9 16 41.3 3.1 57.7 20.5 49.6 58.2-16.4 76.4-34.4 152.6-51.1 228.9-4.5 20.8-18.2 30.5-39.7 31.4-29.5 1.3-59.1 2-88.7 2.1-83.2 0.3-166.4 0.2-249.6 0-32.3 0-42.7-6.7-52.8-34.7-27.9-77.3-55.5-154.7-83.2-232-8.1-22.5 4-47.3 27.4-56 22.2-8.2 52.7 2.8 62.4 24.2 11 24.4 21 49.3 30.1 74.3 5.4 14.8 13.6 26.7 31.6 24 19.2-3 26.3-16.8 26.2-34.4-0.5-53.7-0.4-107.4-0.3-161.1z" fill="#1195FE" p-id="2097"></path></svg>
          </div>
        </yhm-form-text>
        <yhm-form-text placeholder="直接录入或者点击后面图标选择"  v-else title="收件人" subtitle="" @blur="personBlur()"   :value="otherPartyPersonName" id="otherPartyPersonName"  rule="R0000">
          <div class="formBoxIcon" @click="recipientClick">
            <svg t="1602226869435"  class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2092" width="30" height="30" style="margin: auto;"><path d="M502.2 393.6m-163 0a163 163 0 1 0 326 0 163 163 0 1 0-326 0Z" fill="#AED7FF" p-id="2093"></path><path d="M197.5 363.4c0.1-1.4 0.2-2.7 0.3-4.1 12-147.5 137.4-263.1 285.6-263.1 151.5 0 275.8 118.2 285.9 267.2h20c-10-160-143.3-287.2-305.9-287.2-158.5 0-292.7 123.6-305.5 281.4-0.2 1.9-0.3 3.8-0.4 5.7h20zM768.1 414.9c-16 142.9-137.6 254.4-284.7 254.4s-268.6-109-284.7-254.4h-20.1c16.3 156.6 146.7 274.4 304.8 274.4 158.2 0 288.7-120.4 304.8-274.4h-20.1z" fill="#108EE9" p-id="2094"></path><path d="M483.4 160.3c-122.7 0-222.5 99.8-222.5 222.5s99.8 222.5 222.5 222.5 222.5-99.8 222.5-222.5c-0.1-122.7-99.9-222.5-222.5-222.5z m0 407.4c-102.1 0-184.9-82.8-184.9-184.9 0-102.1 82.8-184.9 184.9-184.9s184.9 82.8 184.9 184.9c0 102.1-82.8 184.9-184.9 184.9z" fill="#108EE9" p-id="2095"></path><path d="M483.4 510.7c-70.5 0-127.9-57.4-127.9-127.9s57.4-127.9 127.9-127.9 127.9 57.4 127.9 127.9-57.4 127.9-127.9 127.9z m0-209.3c-44.9 0-81.4 36.5-81.4 81.4s36.5 81.4 81.4 81.4c44.9 0 81.4-36.5 81.4-81.4s-36.6-81.4-81.4-81.4z" fill="#108EE9" p-id="2096"></path><path d="M433.2 563.8c0-51.5-0.2-103.1 0.1-154.6 0.2-36.1 18-57 48.2-57.2 32.1-0.2 54 22.6 54.2 57.8 0.4 57.4 0 114.8 0.2 172.2 0.1 30.5 7 38 39.5 40.9 65.3 5.7 130.6 11.1 195.9 16 41.3 3.1 57.7 20.5 49.6 58.2-16.4 76.4-34.4 152.6-51.1 228.9-4.5 20.8-18.2 30.5-39.7 31.4-29.5 1.3-59.1 2-88.7 2.1-83.2 0.3-166.4 0.2-249.6 0-32.3 0-42.7-6.7-52.8-34.7-27.9-77.3-55.5-154.7-83.2-232-8.1-22.5 4-47.3 27.4-56 22.2-8.2 52.7 2.8 62.4 24.2 11 24.4 21 49.3 30.1 74.3 5.4 14.8 13.6 26.7 31.6 24 19.2-3 26.3-16.8 26.2-34.4-0.5-53.7-0.4-107.4-0.3-161.1z" fill="#1195FE" p-id="2097"></path></svg>
          </div>
        </yhm-form-text>
        <yhm-form-text placeholder="请输入电话号码"  title="电话" subtitle="" :value="otherPartyTelePhone" id="otherPartyTelePhone"></yhm-form-text>
        <yhm-form-text placeholder="11位手机号码"  title="手机号" subtitle="" :value="otherPartyPhone" id="otherPartyPhone"></yhm-form-text>
        <yhm-form-text placeholder="邮政编码"  title="编码" no-edit="1" subtitle="" :value="regionCode" id="regionCode"></yhm-form-text>
        <yhm-form-select default-txt="" title="寄件地" v-if="isWorkDate"   @click="recipientDestinationClick" :value="destinationName" id="destinationName" rule="R0000"></yhm-form-select>
        <yhm-form-select default-txt="" title="目的地"  v-else  @click="recipientDestinationClick" :value="destinationName" id="destinationName" rule="R0000"></yhm-form-select>
        <yhm-form-text placeholder=""  no-edit="1" title="寄件地代码" v-if="isWorkDate" subtitle="" :value="destinationCode" id="destinationCode"></yhm-form-text>
        <yhm-form-text placeholder=""  no-edit="1" title="目的地代码" v-else subtitle="" :value="destinationCode" id="destinationCode"></yhm-form-text>

      </template>
    </yhm-formbody>
    <div class="f_split"></div>
    <yhm-formbody >
      <template #title>收寄物信息</template>
      <template #control>
        <yhm-form-radio title="收寄物类型" width="1" :select-list="itemTypeList" @call="itemTypeCall()" :value="itemType" id="itemType" ></yhm-form-radio>
        <yhm-form-text placeholder=""  v-if="isReceiptType" title="收寄物内容" subtitle="" :value="itemContent" id="itemContent"></yhm-form-text>
        <yhm-form-list-edit v-else>
          <template #title>收寄物内容</template>
          <template #operate>
            <yhm-commonbutton  value="添加文件" icon="btnAdd" @call="addDiscount"></yhm-commonbutton>
          </template>
          <template #listHead>
            <yhm-managerth style="width: 200px" title="文件名称"></yhm-managerth>
            <yhm-managerth style="width: 200px" title="文件编号"></yhm-managerth>
            <yhm-managerth style="width: 200px" title="文件数量"></yhm-managerth>
            <yhm-managerth title="文件备注"></yhm-managerth>
            <yhm-managerth style="width: 40px" title="删除"></yhm-managerth>
          </template>
          <template #listBody>
            <tr v-for="(item,index) in detailsList" :key="index" :class="{InterlacBg:index%2!==0}">
              <yhm-form-td-textbox width="200" :list="detailsList" listid="detailsList" :value="item" id="name" rule="R0000"></yhm-form-td-textbox>
              <yhm-form-td-textbox width="200" :list="detailsList" listid="detailsList" :value="item" id="number" rule="R0000"></yhm-form-td-textbox>
              <yhm-form-td-textbox width="200" :list="detailsList" listid="detailsList" :value="item" id="detailNumber" rule="R3000"></yhm-form-td-textbox>
              <yhm-form-td-textbox width="310" :list="detailsList"  listid="detailsList" :value="item" id="remark"></yhm-form-td-textbox>
              <yhm-form-td-delete :must="1" width="40" :list="detailsList"  listid="detailsList" :value="item" :del-click="true" @click="delDiscount(index,item)"></yhm-form-td-delete>
            </tr>
          </template>
        </yhm-form-list-edit>
        <yhm-form-text placeholder=""  :no-edit="isItemCount" title="数量" subtitle="" :value="itemCount" id="itemCount" rule="R3000"></yhm-form-text>
      </template>
    </yhm-formbody>
    <div class="f_split"></div>
    <yhm-formbody >
      <template #title>费用及支付信息</template>
      <template #control>
        <yhm-form-radio title="结算状态	" v-if="isReceivePayWay" @call="receivePayWayCall()" :select-list="receivePayWayList"  :value="receivePayWay" id="receivePayWay" ></yhm-form-radio>
        <yhm-form-zh-text-two tip-before="value" v-if="isNum"  :before="num" before-id="num" :after="weight" after-id="weight"  title="计费件数" subtitle=""  after-title="重量(KG)" after-width="140"></yhm-form-zh-text-two>
        <yhm-form-text placeholder="" :no-edit="isAmount" v-if="ifAmount" title="费用"  subtitle="" :value="amount" id="amount" ></yhm-form-text>
        <yhm-form-radio title="结算方式	" @call="senPayWay()" v-if="isSendPayWay" :select-list="sendPayWayList" :value="sendPayWay" id="sendPayWay" ></yhm-form-radio>

      </template>
    </yhm-formbody>

    <yhm-formoperate :createName="createName" :insertDate="insertDate" :updateName="updateName" :updateDate="updateDate">
      <template #btn>
        <yhm-commonbutton value="保存" icon="btnSave" @call="save()"></yhm-commonbutton>
        <yhm-commonbutton value="保存并提交" icon="btnSave" :flicker="true" @call="submit()"></yhm-commonbutton>

      </template>
    </yhm-formoperate>
  </div>
</template>

<script>
  import { formmixin } from '@/assets/form.js'
  import { accMul, accAdd, guid, formatDate, number2chinese,formatTime ,formatPhone, formatIdNo,} from '@/assets/common.js'
  export default {
    name: 'myExpressForm',
    mixins: [formmixin],
    data(){
      return{
        letterClassificationList:[],
        letterClassification:'',
        itemTypeList:[],
        itemType:'',
        companyIDList:[],
        companyID:'',
        receivePayWayList:[],
        receivePayWay:'',
        sendPayWayList:[],
        sendPayWay:'',
        signForList:[],
        signFor:'',
        weight:'',
        num:'',
        amount:'',
        workDate:'', //收寄时间
        unit:'',
        regionName:'',
        regionID:'',
        address:'',
        otherPartyPersonName:'',
        otherPartyPersonID:'',
        otherPartyTelePhone:'',
        otherPartyPhone:'',
        destinationName:'',
        destinationID:'',
        destinationCode:'',
        regionCode:'',
        detailsList:[],
        itemContent:'',
        itemCount:'',
        isWorkDate:false,
        isReceiptType:true,
        isItemCount:'',
        isReceivePayWay:false,
        isAmount:'1',
        isNum:true,
        ifAmount:true,
        isSendPayWay:true,
        weUnit:'',
      }
    },
    methods:{

      personBlur(){

        if (this.otherPartyPersonName!=''){
          this.$dialog.OpenWindow({
            width: 950,
            height: 692,
            url: '/selectPerson?category=1&commonClientUse=1&personName='+this.otherPartyPersonName+'&parameter=1',
            title: '选择收件人',
            closeCallBack: (data) => {
              // console.log(data)
              if (data) {
                this.otherPartyPersonID=data.id
                this.otherPartyPersonName=data.name
                this.otherPartyPhone=data.phone
              }else {
                this.otherPartyPersonName=''
              }
            }
          })
        }
      },
      senPayWay(){
        if(this.sendPayWay==0){
          this.isNum=true
          this.ifAmount=true
        }else {
          this.isNum=false
          this.ifAmount=false
          this.isReceivePayWay=false
        }
      },

      receivePayWayCall(){
        if (this.receivePayWay==0){
          this.isNum=false
          this.ifAmount=false
          this.isAmount='1'
        }else {
          this.isNum=true
          this.ifAmount=true
          this.isAmount=''
        }
      },
      itemTypeCall(){
        if (this.itemType==1){
          this.isItemCount='1'
          this.isReceiptType=false
          this.detailsList=[]
          this.addDiscount()
        } else {
          this.isItemCount=''
          this.isReceiptType=true
        }
      },
      letterClassificationClick(){
        // alert(this.letterClassification)
        if (this.letterClassification==0){
          this.isWorkDate=true
          this.isReceivePayWay=true
          this.isNum=false
          this.ifAmount=false
          this.isSendPayWay=false
          this.signFor='0'
        }else{
          this.isWorkDate=false
          this.isReceivePayWay=false
          this.isNum=true
          this.ifAmount=true
          this.isSendPayWay=true
          this.signFor='1'
        }
      },
      save(){
        if (this.validator()) {
          if (this.otherPartyTelePhone==''&& this.otherPartyPhone==''){
            alert("手机号和电话不能同时为空")
          } else{
            let params={
              id:this.id,
              code:this.code,
              workDate:this.workDate,
              letterClassification:this.letterClassification,
              itemType:this.itemType,
              companyID:this.companyID,
              unit:this.unit,
              regionID:this.regionID,
              address:this.address,
              otherPartyPersonID:this.otherPartyPersonID,
              otherPartyTelePhone:this.otherPartyTelePhone,
              otherPartyPhone:this.otherPartyPhone,
              destinationID:this.destinationID,
              detailsList:this.detailsList,
              itemContent:this.itemContent,
              itemCount:this.itemCount,
              receivePayWay:this.receivePayWay,
              weight:this.weight,
              num:this.num,
              amount:this.amount,
              sendPayWay:this.sendPayWay,
              signFor:this.signFor
            }
            this.ajaxJson({
              url: '/dailyoffice/myExpress/save',
              data: params,
              call: (data) => {
                if (data.type === 0) {
                  this.$dialog.setReturnValue(this.id)
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
        }
      },
      submit(){
        if (this.validator()) {
          if (this.otherPartyTelePhone==''&& this.otherPartyPhone==''){
            alert("手机号和电话不能同时为空")
          } else{
            let aa='1'
            // if (this.letterClassification==0){
            //   aa='2'
            // } else {
            //   aa='1'
            // }
            let params={
              id:this.id,
              // state:aa,
              code:this.code,
              workDate:this.workDate,
              letterClassification:this.letterClassification,
              itemType:this.itemType,
              companyID:this.companyID,
              unit:this.unit,
              regionID:this.regionID,
              address:this.address,
              otherPartyPersonID:this.otherPartyPersonID,
              otherPartyTelePhone:this.otherPartyTelePhone,
              otherPartyPhone:this.otherPartyPhone,
              destinationID:this.destinationID,
              detailsList:this.detailsList,
              itemContent:this.itemContent,
              itemCount:this.itemCount,
              receivePayWay:this.receivePayWay,
              weight:this.weight,
              num:this.num,
              amount:this.amount,
              sendPayWay:this.sendPayWay,
              signFor:this.signFor
            }
            this.ajaxJson({
              url: '/dailyoffice/myExpress/save',
              data: params,
              call: (data) => {
                if (data.type === 0) {
                  this.$dialog.setReturnValue(this.id)
                  this.$dialog.alert({
                    tipValue: data.message,
                    closeCallBack: () => {
                      //提交
                      this.ajaxJson({
                        url: '/sys/approve/submit',
                        data: {
                          id:this.id,      //快递单ID
                          category:4,   //审批类型
                          personID:sessionStorage.getItem('____currentUserID'),//王强
                          unitID:this.weUnit, //申请人所属单位ID
                          location:0
                        },
                        call: (data) => {
                          this.$dialog.close()
                        }
                      })


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
        }
      },
      recipientAddressClick(){
        this.$dialog.OpenWindow({
          width: 950,
          height: 603,
          url: '/selectDic?name=25' ,
          title: '选择省份地市区县',
          closeCallBack: (data) => {
            if (data) {
              this.regionID=data.id
              this.regionName = data.showName
              this.regionCode =data.value4
            }
          }
        })
      },
      /* 优惠信息 */
      addDiscount(){
        let index = this.detailsList.length+1
        let insertDate = new Date(accAdd(new Date().getTime(), accMul(this.detailsList.length, 1000)))
        this.detailsList.push({
          id: guid(),
          insertDate: formatTime(insertDate),
          ownerID: this.id,
          name:this.name,
          number:this.number,
          detailNumber:this.detailNumber,
          remark: this.remark,
        })
        this.itemCount=index
      },
      delDiscount(index,item){
        this.$dialog.alert({
          tipValue: '删除成功！！！',
          closeCallBack: ()=>{
            this.detailsList.splice(index, 1)
            if(this.detailsList.length === 0){
              this.addDiscount()
            }
          }
        })
      },
      unitClick(){
        this.$dialog.OpenWindow({
          width: 950,
          height: 692,
          url: '/selectUnit?category=1',
          title: '选择公司',
          closeCallBack: (data) => {
            if (data) {
              // this.senderUnitID=data.id
              this.unit = data.name
            }
          }
        })
      },
      recipientClick(){
        this.$dialog.OpenWindow({
          width: 950,
          height: 692,
          url: '/selectPerson?category=1',
          title: '选择收件人',
          closeCallBack: (data) => {
            if (data) {
              this.otherPartyPersonID = data.id
              this.otherPartyPersonName = data.name
              this.otherPartyPhone=data.phone
              if (this.otherPartyPersonID==''){
                this.updatainsuredSelectPerson(data.id)
              }
            }
          }
        })
      },
      recipientDestinationClick(){
        this.$dialog.OpenWindow({
          width: 950,
          height: 603,
          url: '/selectDic?name=20' ,
          title: '选择目的地代码',
          closeCallBack: (data) => {
            if (data) {
              this.destinationID=data.id
              this.destinationName = data.showName
              this.destinationCode=data.value1
            }
          }
        })
      },

    },
    created () {

      this.init({
        url: '/dailyoffice/myExpress/initForm',
        all: (data) => {
          this.companyIDList = data.companyIDPsd.list
          this.companyID = data.companyIDPsd.value
          this.letterClassificationList = data.letterClassificationPsd.list
          this.letterClassification = data.letterClassificationPsd.value
          this.itemTypeList=data.itemTypePsd.list
          this.itemType=data.itemTypePsd.value
          this.receivePayWayList=data.receivePayWayPsd.list
          this.receivePayWay=data.receivePayWayPsd.value
          this.sendPayWayList=data.sendPayWayPsd.list
          this.sendPayWay=data.sendPayWayPsd.value
          this.signForList=data.signForPsd.list
          this.signFor=data.signForPsd.value

        },
        add: (data) => {
          /* 需要添加的数据 */
          this.workDate=formatDate( new Date((new Date()).getTime()))
          this.weUnit=data.weUnit
        },
        look: (data) => {
          /* 需要查看的数据 */
          this.workDate=data.workDate
          this.unit=data.unit
          this.regionName=data.regionName
          this.regionID=data.regionID
          this.address=data.address
          this.otherPartyPersonName=data.otherPartyPersonName
          this.otherPartyPersonID=data.otherPartyPersonID
          this.otherPartyTelePhone=data.otherPartyTelePhone
          this.otherPartyPhone=data.otherPartyPhone
          this.destinationName=data.destinationName
          this.destinationID=data.destinationID
          this.destinationCode=data.destinationCode
          this.regionCode =data.regionCode
          this.detailsList=data.detailsList
          this.itemContent=data.itemContent
          this.itemCount=data.itemCount
          this.receivePayWay=data.receivePayWay
          this.sendPayWay=data.sendPayWay
          this.weight=data.weight
          this.num=data.num
          this.amount=data.amount


          if (this.itemType==1){
            this.isItemCount='1'
            this.isReceiptType=false

          } else {
            this.isItemCount=''
            this.isReceiptType=true
          }


          this.letterClassificationClick()
          if (this.letterClassification==0){
            this.receivePayWayCall()
          } else {
            this.senPayWay()
          }
        }
      })
    },

  }
</script>

<style scoped>

</style>
