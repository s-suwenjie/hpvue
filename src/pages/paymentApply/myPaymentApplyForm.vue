<template>
  <div class="f_main">
    <yhm-formbody>
      <template #title>基本信息</template>
      <template #control>
        <yhm-form-radio title="付款性质" @call="showPayment" :select-list="natureList" :value="nature" id="nature" :no-edit="natureNoEdit" width="1"></yhm-form-radio>
        <yhm-form-radio title="支付方式" v-show="isChecksHidden" :select-list="isChecksList" :value="isChecks" id="isChecks" @call="checkEvent"></yhm-form-radio>
        <yhm-form-text title="收款方" v-if="nature=='10'&&workOrderSkip=='true'" :value="otherUnit" id="otherUnit" no-edit="1"></yhm-form-text>
        <yhm-form-drop-down-select v-else :no-before-click="isNoBeforeClick" title="收款方" width="1" @select="selectUnit" :select-list="personOrUnitList"  :selectValue="personOrUnit" selectid="personOrUnit" :value="otherUnit" id="otherUnit" rule="R0000" :no-edit="disable"></yhm-form-drop-down-select>
        <!--        <yhm-form-drop-down-select title="付款事由" width="1" @select="selectCause" :select-list="ownerSysPsd" :selectValue="ownerSys" selectid="ownerSys" :value="subject" id="subject" rule="R0000" :no-edit="disable"></yhm-form-drop-down-select>-->
        <!--        <yhm-form-select title="收款单位" tip="value" rule="R0000" @click="selectUnit" :value="otherUnit" id="otherUnit"></yhm-form-select>-->
        <yhm-form-radio title="是否关联" :select-list="isRelevanceList" @call="SelectIsRelevance" :no-edit="nature=='10'?true:false" :value="isRelevance" id="isRelevance" rule="R0000"></yhm-form-radio>
        <yhm-form-select title="计划事件" :show="eventShowA" @click="selectPage" :value="name" id="name" tip="value" rule="R0000"></yhm-form-select>
        <yhm-form-textarea :show="eventShowB" title="款项用途" :value="useName" id="useName" rule="R0000"></yhm-form-textarea>
        <yhm-form-select title="收款账号" :tips="accountString" :value="otherAccount" id="otherAccount" rule="R0000" @click="selectaccount" :no-click="isOtherAccount"></yhm-form-select>
        <yhm-form-text title="申请人" :value="person" id="person" rule="R0000" no-edit="1"></yhm-form-text>
        <yhm-form-radio width="1" title="发票类型" v-show="PrepaidHidden" @call="invoiceClick" :select-list="invoiceList" :value="invoice" id="invoice"></yhm-form-radio>
        <yhm-form-radio title="发票" v-show="PrepaidHidden" subtitle="二级类型" :select-list="secondLevelInvoiceList" :value="secondLevelInvoice" id="secondLevelInvoice"></yhm-form-radio>

        <yhm-form-list-edit :show="PrepaidHidden" style="border: none;width: 998px">
          <template #title>发票明细</template>
          <template #operate>
            <yhm-commonbutton :show="electronicInvoiceBtn && !isElectronicInvoice" value="选择电子发票" icon="btnAdd" @call="selectapplyElInvoice"></yhm-commonbutton>
            <yhm-commonbutton :show="addInvoiceShow && !isElectronicInvoice" value="添加发票" icon="btnAdd" @call="addApplyInvoice"></yhm-commonbutton>
          </template>
          <template #listHead>
            <yhm-managerth style="width: 130px" title="发票号码"></yhm-managerth>
            <yhm-managerth style="width: 140px" title="开票日期"></yhm-managerth>
            <yhm-managerth style="width: 160px" title="类型"></yhm-managerth>
            <yhm-managerth style="width: 90px" title="发票张数"></yhm-managerth>
            <yhm-managerth style="width: 90px" title="票面金额"></yhm-managerth>
            <yhm-managerth style="width: 220px" title="备注"></yhm-managerth>
            <yhm-managerth style="width: 90px" title="发票照片"></yhm-managerth>
            <yhm-managerth style="width: 40px" title="操作"></yhm-managerth>
          </template>
          <template #listBody>
            <tr v-for="(item,index) in invoiceDetails" :key="index" :class="{InterlacBg:index%2!==0}">
              <yhm-form-td-textbox width="130" @change="verificationRepeatInvoice(item)" :no-edit="getIsElectronicInvoice" :list="invoiceDetails" listid="invoiceDetails" :value="item" id="code" rule="R0000"></yhm-form-td-textbox>
              <yhm-form-td-date width="140" :no-edit="getIsElectronicInvoice"  position="u" :max="maxWorkDate" :list="invoiceDetails" listid="invoiceDetails" :value="item" id="workDate" rule="R0000"></yhm-form-td-date>
              <yhm-form-td-radio width="160" :no-edit="isElectronicInvoice" @call="switchInvoiceCategory" :list="invoiceDetails" listid="invoiceDetails" :value="item" :select-list="listCategoryList" id="category"></yhm-form-td-radio>
              <yhm-form-td-textbox width="90" @change="verificationRepeatInvoice(item)" @input="invoicesQuantityInputEvent" :no-edit="getIsElectronicInvoice || item.category === '0' ? '1':''" :list="invoiceDetails" listid="invoiceDetails" :value="item" id="quantity" rule="R1000"></yhm-form-td-textbox>
              <yhm-form-td-textbox width="90" :no-edit="getIsElectronicInvoice" @input="invoicesMoneyInputEvent" before-icon="rmb" :list="invoiceDetails" listid="invoiceDetails" :value="item" id="money" rule="R1200"></yhm-form-td-textbox>
              <yhm-form-td-textbox width="220" :no-edit="getIsElectronicInvoice" :list="invoiceDetails" listid="invoiceDetails" :value="item" id="remark"></yhm-form-td-textbox>
              <yhm-form-td-upload-image  width="90" :no-upload="isElectronicInvoice" tag="Invoice" @mouseover="invoiceImg(item)" @mouseout="invoiceImgHide(item)" :list="invoiceDetails" listid="invoiceDetails" :value="item" id="url" rule="#"></yhm-form-td-upload-image>
              <yhm-form-td-delete width="40" :list="invoiceDetails" :value="item" :del-click="true" @click="delApplyInvoice(index,item)"></yhm-form-td-delete>
            </tr>
          </template>
          <template #empty>
            <span class="m_listNoData" v-show="invoiceDetails.length === 0">暂时没有数据</span>
          </template>
        </yhm-form-list-edit>
        <yhm-form-list-edit v-if="nature === '9'" style="border: none;width: 998px">
          <template #title>快递对账单信息</template>
          <template #operate>
            <yhm-commonbutton value="添加账单" v-if="expressList.length===0" icon="btnAdd" @call="addExpress"></yhm-commonbutton>
          </template>
          <template #listHead>
            <yhm-managerth style="width: 130px" title="开始日期"></yhm-managerth>
            <yhm-managerth style="width: 140px" title="结束日期"></yhm-managerth>
            <yhm-managerth style="width: 160px" title="金额"></yhm-managerth>
            <yhm-managerth style="width: 40px" title="操作"></yhm-managerth>
          </template>
          <template #listBody>
            <tr v-for="(item,index) in expressList" :key="index" :class="{InterlacBg:index%2!==0}">
              <yhm-form-td-date width="260" :no-edit="'1'"  position="u" :max="maxWorkDate" :list="expressList" listid="expressList" :value="item" id="startDate" rule="R0000"></yhm-form-td-date>
              <yhm-form-td-date width="280" :no-edit="'1'"  position="u" :max="maxWorkDate" :list="expressList" listid="expressList" :value="item" id="endDate" rule="R0000"></yhm-form-td-date>
              <yhm-form-td-textbox width="320" :no-edit="'1'" before-icon="rmb" :list="expressList" listid="expressList" :value="item" id="money" rule="R1200"></yhm-form-td-textbox>
              <yhm-form-td-delete width="40" :list="expressList" :value="item" :del-click="true" @click="delExpressList(index,item)"></yhm-form-td-delete>
            </tr>
          </template>
          <template #empty>
            <span class="m_listNoData" v-show="expressList.length === 0">暂时没有数据</span>
          </template>
        </yhm-form-list-edit>
        <yhm-form-list-edit :show="nature === '4'||nature === '5'" style="border: none;width: 998px">
          <template #title>收支明细</template>
          <template #operate>
            <yhm-commonbutton :show="isAddBankDetail" value="选择收支明细" icon="btnAdd" @call="selectBankDetail"></yhm-commonbutton>
          </template>
          <template #listHead>
            <yhm-managerth style="width: 230px" title="收款方"></yhm-managerth>
            <yhm-managerth style="width: 140px" title="交易日期"></yhm-managerth>
            <yhm-managerth style="width: 130px" title="收支方向"></yhm-managerth>
            <yhm-managerth style="width: 90px" title="事由"></yhm-managerth>
            <yhm-managerth style="width: 110px" title="交易金额"></yhm-managerth>
            <yhm-managerth style="width: 220px" title="备注"></yhm-managerth>
            <yhm-managerth style="width: 40px" title="操作"></yhm-managerth>
          </template>
          <template #listBody>
            <tr v-for="(item,index) in bankDetailList" :key="index" :class="{InterlacBg:index%2!==0}">
              <yhm-form-td-textbox width="230" :no-edit="isBankDetail" :list="bankDetailList" listid="bankDetailList" :value="item" id="otherAccount" rule="R0000"></yhm-form-td-textbox>
              <yhm-form-td-date width="140" :no-edit="isBankDetail"  position="u" :list="bankDetailList" listid="bankDetailList" :value="item" id="cccurDate" rule="R0000"></yhm-form-td-date>
              <yhm-form-td-radio width="130" :no-edit="isBankDetail?true:false" :list="bankDetailList" listid="bankDetailList" :select-list="directionList" :value="item" id="direction"></yhm-form-td-radio>
              <yhm-form-td-textbox width="90" :no-edit="isBankDetail" :list="bankDetailList" listid="bankDetailList" :value="item" id="subject" rule="R0000"></yhm-form-td-textbox>
              <yhm-form-td-textbox width="110" :no-edit="nature==='4'?'1':''" before-icon="rmb" :list="bankDetailList" @change="bankDetailListMoney" listid="bankDetailList" :value="item" id="money" rule="R0000"></yhm-form-td-textbox>
              <yhm-form-td-textbox width="220" :no-edit="isBankDetail" :list="bankDetailList" listid="bankDetailList" :value="item" id="remark"></yhm-form-td-textbox>
              <yhm-form-td-delete width="40" :list="bankDetailList" :value="item" :del-click="true" @click="delbankDetailList(index,item)"></yhm-form-td-delete>
            </tr>
          </template>
        <template #empty>
        <span class="m_listNoData" v-show="bankDetailList.length === 0">暂时没有数据</span>
        </template>
      </yhm-form-list-edit>
        <yhm-form-list-edit :show="nature === '7'" style="border: none;width: 998px">
          <template #title>退押金信息</template>
          <template #operate>
            <yhm-commonbutton value="选择收押金" icon="btnAdd" @call="selectDepositList"></yhm-commonbutton>
          </template>
          <template #listHead>
            <yhm-managerth style="width: 200px" title="付款方"></yhm-managerth>
            <yhm-managerth style="width: 160px" title="付款账号"></yhm-managerth>
            <yhm-managerth style="width: 120px" title="交易日期"></yhm-managerth>
            <yhm-managerth style="width: 90px" title="事由"></yhm-managerth>
            <yhm-managerth style="width: 110px" title="交易金额"></yhm-managerth>
            <yhm-managerth style="width: 220px" title="备注"></yhm-managerth>
            <yhm-managerth style="width: 40px" title="操作"></yhm-managerth>
          </template>
          <template #listBody>
            <tr v-for="(item,index) in depositList" :key="index" :class="{InterlacBg:index%2!==0}">
              <yhm-form-td-textbox width="200" no-edit="1" :list="depositList" listid="depositList" :value="item" id="other" rule="R0000"></yhm-form-td-textbox>
              <yhm-form-td-textbox width="160" tip="value" no-edit="1" :list="depositList" listid="depositList" :value="item" id="otherAccount"></yhm-form-td-textbox>
              <yhm-form-td-date width="120" no-edit="1"  position="u" :list="depositList" listid="depositList" :value="item" id="cccurDate" rule="R0000"></yhm-form-td-date>
              <yhm-form-td-textbox width="90" no-edit="1" :list="depositList" listid="depositList" :value="item" id="subject" rule="R0000"></yhm-form-td-textbox>
              <yhm-form-td-textbox width="110" :maxNumber="item.maxMoney" before-icon="rmb" :list="depositList" listid="depositList" @change="depositListMoney" :value="item" id="money" rule="R0000"></yhm-form-td-textbox>
              <yhm-form-td-textbox width="220" no-edit="1" :list="depositList" listid="depositList" :value="item" id="remark"></yhm-form-td-textbox>
              <yhm-form-td-delete width="40" :list="depositList" :value="item" :del-click="true" @click="delDepositList(index,item)"></yhm-form-td-delete>
            </tr>
          </template>
          <template #empty>
            <span class="m_listNoData" v-show="depositList.length ===0">暂时没有数据</span>
          </template>
        </yhm-form-list-edit>
        <yhm-form-list-edit :show="nature === '8'" style="border: none;width: 998px">
          <template #title>付押金信息</template>
          <template #operate>
            <yhm-commonbutton value="添加付押金" v-if="payDepositList.length===0" icon="btnAdd" @call="addPayDeposit"></yhm-commonbutton>
            <yhm-commonbutton value="选择付押金" v-if="payDepositList.length===0" icon="btnAdd" @call="selectPayDepositList"></yhm-commonbutton>
          </template>
          <template #listHead>
            <yhm-managerth style="width: 120px" title="收款方"></yhm-managerth>
            <yhm-managerth style="width: 180px" title="收款账号"></yhm-managerth>
            <yhm-managerth style="width: 120px" title="添加日期"></yhm-managerth>
            <yhm-managerth style="width: 90px" title="事由"></yhm-managerth>
            <yhm-managerth style="width: 110px" title="交易金额"></yhm-managerth>
            <yhm-managerth style="width: 120px" title="预计退回日期"></yhm-managerth>
            <yhm-managerth style="width: 180px" title="备注"></yhm-managerth>
            <yhm-managerth style="width: 40px" title="操作"></yhm-managerth>
          </template>
          <template #listBody>
            <tr v-for="(item,index) in payDepositList" :key="index" :class="{InterlacBg:index%2!==0}">
              <yhm-form-td-textbox width="120" no-edit="1" :list="payDepositList" listid="payDepositList" :value="item" id="other" rule="R0000"></yhm-form-td-textbox>
              <yhm-form-td-textbox width="180" tip="value" no-edit="1" :list="payDepositList" listid="payDepositList" :value="item" id="otherAccount"></yhm-form-td-textbox>
              <yhm-form-td-date width="120" no-edit="1"  position="u" :list="payDepositList" listid="payDepositList" :value="item" id="cccurDate" rule="R0000"></yhm-form-td-date>
              <yhm-form-td-textbox width="90" no-edit="1" :list="payDepositList" listid="payDepositList" :value="item" id="subject" rule="R0000"></yhm-form-td-textbox>
              <yhm-form-td-textbox width="110" no-edit="1" :maxNumber="item.maxMoney" before-icon="rmb" :list="payDepositList" listid="payDepositList" @change="depositListMoney" :value="item" id="money" rule="R0000"></yhm-form-td-textbox>
              <yhm-form-td-date width="120" no-edit="1"  position="u" :list="payDepositList" listid="payDepositList" :value="item" id="refundDate" rule="R0000"></yhm-form-td-date>
              <yhm-form-td-textbox width="180" no-edit="1" :list="payDepositList" listid="payDepositList" :value="item" id="remark"></yhm-form-td-textbox>
              <yhm-form-td-delete width="40" :list="payDepositList" :value="item" :del-click="true" @click="delPayDepositList(index,item)"></yhm-form-td-delete>
            </tr>
          </template>
          <template #empty>
            <span class="m_listNoData" v-show="payDepositList.length ===0">暂时没有数据</span>
          </template>
        </yhm-form-list-edit>
        <yhm-form-list-edit :show="nature === '10'" style="border: none;width: 998px">
          <template #title>工单信息</template>
          <template #operate>
            <yhm-commonbutton value="添加推修工单" icon="btnAdd" @call="addWorkOrder"></yhm-commonbutton>
          </template>
          <template #listHead>
            <yhm-managerth width="120" title="接待日期"></yhm-managerth>
            <yhm-managerth width="240" title="工单号"></yhm-managerth>
            <yhm-managerth width="110" title="车牌号"></yhm-managerth>
            <!--            <yhm-managerth title="送修人"></yhm-managerth>-->
            <yhm-managerth width="80" title="费率类型"></yhm-managerth>
            <yhm-managerth width="80" title="待结状态"></yhm-managerth>
            <yhm-managerth title="预计推送费"></yhm-managerth>
            <yhm-managerth title="已产生营业额"></yhm-managerth>
            <yhm-managerth style="width: 40px" title="操作"></yhm-managerth>
          </template>
          <template #listBody>
            <tr v-for="(item,index) in workOrderList2" :key="index" :class="{InterlacBg:index%2!==0}">
              <yhm-form-td-textbox width="120" no-edit="1" :list="workOrderList2" listid="workOrderList2" :value="item" id="insertDate" rule="R0000"></yhm-form-td-textbox>
              <yhm-form-td-textbox width="240" tip="value" no-edit="1" :list="workOrderList2" listid="workOrderList2" :value="item" id="code"></yhm-form-td-textbox>
              <yhm-form-td-textbox width="110" no-edit="1" :list="workOrderList2" listid="workOrderList2" :value="item" id="vehicle" rule="R0000"></yhm-form-td-textbox>
              <yhm-form-td-textbox width="80" no-edit="1" :list="workOrderList2" listid="workOrderList2" :value="item" id="typeValue" rule="R0000"></yhm-form-td-textbox>
              <yhm-form-td-textbox width="80" no-edit="1" :list="workOrderList2" listid="workOrderList2" :value="item" id="pendingstateValue"></yhm-form-td-textbox>
              <yhm-form-td-textbox width="145" no-edit="1" :list="workOrderList2" listid="workOrderList2" :value="item" id="pending"></yhm-form-td-textbox>
              <yhm-form-td-textbox width="145" no-edit="1" :list="workOrderList2" listid="workOrderList2" :value="item" id="pendingmoney"></yhm-form-td-textbox>
              <yhm-form-td-delete width="40" :list="workOrderList2" :value="item" :del-click="true" @click="delWorkOrder(index,item)"></yhm-form-td-delete>
            </tr>
          </template>
          <template #empty>
            <span class="m_listNoData" v-show="workOrderList2.length ===0">暂时没有数据</span>
          </template>
        </yhm-form-list-edit>
        <div class="invoiceImgView" v-show="viewImgShow">
          <img :src="viewImg" alt="">
        </div>
        <yhm-formupload :ownerID="id" :show="isUpFile" :value="fileList" id="fileList" title="支持单据" tag="payment" subtitle="" multiple="multiple" :rule="isRule"></yhm-formupload>
      </template>
    </yhm-formbody>
    <div class="f_split"></div>
    <yhm-formbody>
      <template #title >更多信息</template>
      <template #control  >
        <yhm-form-text title="支付金额" tip="money" before-icon="rmb" :value="money" id="money" rule="R3000" :no-edit="isInvoice" placeholder="请输入数字" error-message="纯数字输入"></yhm-form-text>
        <yhm-form-text title="金额大写" tip="capitalMoney" :value="capitalMoney" id="capitalMoney" rule="R0000" no-edit="1"></yhm-form-text>
        <yhm-form-drop-down-select :show="isCause" title="付款事由" width="1" @select="selectCause" :select-list="ownerSysPsd" :selectValue="ownerSys" selectid="ownerSys" :value="subject" id="subject" rule="R0000" :no-edit="disable"></yhm-form-drop-down-select>
<!--        <yhm-form-radio :show="PrepaidHiddenA" title="用途代码" @call="initCode" width="1" :select-list="useNumList" :value="useNum" id="useNum" :no-edit="disable"></yhm-form-radio>-->
        <yhm-form-date title="最迟" @call="initCode" subtitle="付款日期" :min="nowDate" :value="lastDate" id="lastDate" position="r" rule="R0000"></yhm-form-date>
        <yhm-form-text title="编号" :value="message" id="code" rule="R0000" no-edit="1"></yhm-form-text>
        <yhm-form-radio title="是否" subtitle="分批拨付" :select-list="isAllocationList" :value="isAllocation" id="isAllocation" @call="allocationEvent"></yhm-form-radio>
        <yhm-form-text title="首次" subtitle="拨付金额" @blur="isAllocationBlur" :show="isAllocationShow" tip="money" before-icon="rmb" :value="allocationMoney" id="allocationMoney" rule="R3000" placeholder="请输入数字" error-message="纯数字输入"></yhm-form-text>
<!--        <yhm-form-zh-select-more @input="isAllocationBlur" :show="isAllocationShow" :before-edit="true" @click="moneyAllocation" :min="min" category="date" title="首次" subtitle="拨付金额" :total="actualMoney" :value="allocationList" text-width="82" id="allocationList"></yhm-form-zh-select-more>-->
        <yhm-form-zh-select-more :show="isBrand" @click="selectDeparment" title="部门分配" :total="money" :value="branchList" id="branchList" rule="#" rule-item="R3000" ></yhm-form-zh-select-more>
        <yhm-form-textarea title="备注" :value="remark" id="remark"></yhm-form-textarea>
      </template>
    </yhm-formbody>
    <div v-html="approvalHtml"></div>
    <yhm-formoperate :createName="createName" :insertDate="insertDate" :updateName="updateName" :updateDate="updateDate">
    <template #btn v-if="isBtn">
      <yhm-commonbutton value="保存" icon="btnSave" :flicker="true" @call="save()" category="one"></yhm-commonbutton>
      <yhm-commonbutton value="保存并提交" class="btnAddSave" icon="btnSubSave" @call="btnSubSave()" category="one"></yhm-commonbutton>
    </template>
    </yhm-formoperate>
  </div>
</template>

<script>
import { accMul, accAdd, guid, formatDate, number2chinese,formatTime} from '@/assets/common.js'
import { formmixin } from '@/assets/form.js'
export default {
  name: 'paymentApplyForm',
  mixins: [formmixin],
  data () {
    return {
      id: '',
      disable: '1',
      natureNoEdit:false,
      eventShowA: true,
      eventShowB: false,
      remark: '',
      Association: '',
      ownerID: '', // 计划事件ID
      name: '', // 计划事件
      otherUnit: '', // 收款方
      otherUnitID: '',
      otherAccountID: '',
      personID: '',
      person: '',
      personOrUnit:'',//付款方
      personOrUnitOld:'',//记录收款方
      personOrUnitList:[],//付款方
      otherAccount: '', // 收款账号
      subjectID: '', // 事由ID(事件)
      subject: '', // 付款事由(事件)
      ownerSysPsd: [],
      ownerSys: '', // 事件类型,
      rule: [],
      fileList: [], // 单据
      message: '', // 编号
      remarks: '', // 备注
      capitalMoney: '', // 大写
      money: '', // 金额
      natureList: [], // 付款性质
      nature: '', // 付款性质value
      invoiceList: [], // 发票类型
      invoice: '',
      useName: '',   //款项用途
      useNumList: [],
      useNum: '',
      secondLevelInvoiceList: [], // 发票二级类型
      secondLevelInvoice: '',
      isChecksList:[],//是否支票支付
      isChecks:'',
      isChecksHidden:true,
      isRelevanceList: [],
      isRelevance: '', // 是否关联
      PrepaidHidden: false,
      ListHiding: true,
      fileListShow: true,
      empty: true,
      elInvoice: false,
      nowDate: formatDate(new Date()),
      lastDate: '',
      category: '',
      updateDate: '', // 修改日期
      updateName: '', // 修改名字
      createName: '', // 添加名字
      insertDate: '', //
      approvalHtml: '',
      subjectCode: '',
      paymentInvoice: [],
      paymentInvoiceList: [],
      isRule: '#',
      invoiceID: '',
      isLook: true,
      isBtn: true,
      categoryBefore:'',
      categoryUnit:'',
      isNoBeforeClick: false,
      isCause: true,
      actualMoney: '',
      branchList:[],
      accountString:[],
      /////////////////////
      invoiceDetails: [],
      listCategoryList: [],
      invoiceCategory:'', //发票类型
      invoiceMoney:'',    //发票金额
      invoiceCount:'',    //发票数量

      isElectronicInvoice:false,  //发票是否电子发票
      viewImg:'',         //需要显示的发票路径
      viewImgShow:false,  //显示发票图片
      electronicInvoiceBtn:true,  //选择电子发票按钮是否显示
      addInvoiceShow:true,//添加发票按钮是否显示
      isInvoice: '',
      isUpFile: true,
      bankDetailList: [],
      isBankDetail: '1',
      isBankDetailEmpty: true,
      isAddBankDetail: true,
      direction: '',
      directionList: [],
      isBankDetailShow: false,
      beforeMoney: '',
      isBrand: true,
      maxWorkDate:formatDate(new Date()),
      allocationList: [],
      min: formatDate(new Date()),
      sumBankDetailMoney:'',//选择收支明细总金额,

      isLastDate: true,
      isCode: true,
      isAllocationShow: true,
      isOtherAccount: false,
      isAllocationList: [],
      isAllocation: '',
      moneyAllocationList: [],
      allocationMoney: '',
      depositList:[],
      payDepositList:[],
      expressList:[],//快递信息对账单信息
      workOrderList:[],//工单数据 上传数据
      workOrderList2:[],//工单数据 页面展示字段
    }
  },
  created () {
    this.setQuery2Value('ownerID')
    this.setQuery2Value('nature')
    this.setQuery2Value('workOrderSkip')
    if(this.nature!=''){
      this.showPayment()
    }

    this.init({
      url: '/PersonOffice/initPaymentForm',
      all: (data) => {
        /* 公共 无论查看和添加返回数据 */
        this.ownerSysPsd = data.ownerSysPsd.list
        this.ownerSys = data.ownerSysPsd.value
        this.invoiceList = data.invoicePsd.list
        this.invoice = data.invoicePsd.value
        this.useNumList = data.useNumPsd.list
        this.useNum = data.useNumPsd.value
        this.secondLevelInvoiceList = data.secondLevelInvoicePsd.list
        this.secondLevelInvoice = data.secondLevelInvoicePsd.value
        this.isRelevanceList = data.isRelevancePsd.list
        this.isRelevance = data.isRelevancePsd.value
        this.personOrUnitList = data.personOrUnitPsd.list
        this.personOrUnit = data.personOrUnitPsd.value
        this.id = guid()
        this.personID = data.personID
        this.person = data.person
        this.unitID = data.unitID
        this.isBtn = data.state === '0'
        this.direction = data.directionPsd.value
        this.directionList = data.directionPsd.list
        this.isChecks = data.isChecksPsd.value
        this.isChecksList = data.isChecksPsd.list

        if(this.nature === ''){
          this.nature = data.naturePsd.value
        }
        this.natureList = data.naturePsd.list
        this.listCategoryList = data.listCategoryPsd.list
        this.isAllocationList = data.isAllocationPsd.list
        this.isAllocation = data.isAllocationPsd.value

        if(this.nature === '4'){
          //this.isInvoice='1'
          let sumMoney = 0;
          for(let i in this.bankDetailList){
            let money = this.bankDetailList[i].money;
            sumMoney = accAdd( money,sumMoney)
          }
          this.money = sumMoney + ''
        }else if(this.nature == '10'){
          this.setQuery2Value('otherUnit')
          this.setQuery2Value('otherUnitID')
          let list = []
          for(let i in data.bankDetailList){
            list.push(data.bankDetailList[i].bankDetailID)
          }
          this.selectPage()
          this.allocationEvent()
          this.PrepaidHidden = true
          this.natureNoEdit = true
          if(list.length=='0'){
            return
          }
          this.ajaxJson({
            url: '/fix/fixCompanyOrder/queryByCompanyIDForFixreception',
            data:{
              list:list,
              stateStr:'123'//是否过滤接待单 不为空时过滤
            },
            call: (da) => {
              if(da){
                let item,item2 = {}
                let money = 0
                for(let i in da.content){
                  item = {}
                  item2 = {}
                  item.id = da.content[i].id
                  item.insertDate = da.content[i].visitDate
                  item.ownerID = this.id
                  item.bankDetailID = da.content[i].orderid
                  item.money = da.content[i].pending
                  this.workOrderList.push(item)


                  item2.id = da.content[i].id
                  item2.insertDate = da.content[i].visitDate
                  item2.ownerID = this.id
                  item2.bankDetailID = da.content[i].orderid
                  item2.code = da.content[i].code
                  item2.vehicle = da.content[i].carName
                  item2.typeValue = da.content[i].type=='0'?'自保':'非自保'
                  item2.pendingstateValue = da.content[i].pendingstate=='0'?'待结账':'已结账'
                  item2.pending = da.content[i].pending
                  item2.pendingmoney = da.content[i].pendingmoney
                  this.workOrderList2.push(item2)
                  money += Number(item.money)
                }
                this.money = money
              }
            }
          })
        }

        if(this.isAllocation === '0'){
          this.isAllocationShow = false
        }else{
          this.isAllocationShow = true
        }

        if(this.isRelevance === '1'){
          this.eventShowA = false
          this.eventShowB = true
        }else{
          this.eventShowA = true
          this.eventShowB = false
        }
        if(this.nature === '2'){
          this.isNoBeforeClick = true
        }
      },
      add: (data) => {
        /* 需要添加的数据 */
        if(this.ownerID){
          if(this.nature === '7'){
            let params={
              id:this.ownerID
            }
            this.ajaxJson({
              url: '/dailyoffice/deposit/initForm',
              data: params,
              call: (data) => {
                this.disable=true
                this.isNoBeforeClick=true
                this.personOrUnit=data.category
                this.ownerID=''
                this.otherUnitID=data.otherID
                this.otherUnit=data.other
                this.otherUnitID=data.otherID
                this.otherUnit=data.other
                this.otherAccount=data.otherAccount
                this.otherAccountID=data.otherAccountID
                this.money=data.useMoney
                this.isInvoice='1'
                if(data.subjectID){
                  this.ajaxJson({
                    url: '/dailyoffice/deposit/getRetreatDepositSubjectID',
                    data: {
                      subjectID:data.subjectID
                    },
                    call: (data) => {
                      if(data){
                        this.subjectID=data.id
                        this.subject=data.value2 + ' ---- ' + data.value1 + ' ---- ' + data.showName
                        this.useName=data.value2
                      }
                    }
                  })
                }
                let insertDate = new Date(accAdd(new Date().getTime(), accMul(this.depositList.length, 1000)))
                this.depositList.push({
                  id: guid(),
                  bankDetailID: data.id,
                  insertDate: formatTime(insertDate),
                  ownerID: this.id,
                  remark: data.remark,
                  subject: data.subject,
                  subjectID: data.subjectID,
                  cccurDate: data.workDate,
                  other: data.other,
                  otherAccount: data.otherAccount,
                  money: data.useMoney,
                  useMoney: '0',
                  maxMoney:data.useMoney,
                })
              }
            })
          }else if(this.nature === '8'){
            let params={
              id:this.ownerID
            }
            this.ajaxJson({
              url: '/dailyoffice/payDeposit/initForm',
              data: params,
              call: (data) => {
                this.disable = true
                this.isNoBeforeClick = true
                this.isOtherAccount = true
                this.personOrUnit = data.category
                this.ownerID = ''
                this.otherUnitID = data.otherID
                this.otherUnit = data.other
                this.otherUnitID = data.otherID
                this.otherUnit = data.other
                this.otherAccount = data.otherAccount
                this.otherAccountID = data.otherAccountID
                this.money = data.money
                this.fileList = data.fileList
                for (let i = 0; i < this.fileList.length; i++) {
                  this.fileList[i].id=guid()
                }
                this.isInvoice = '1'
                if (data.subjectID) {
                  this.ajaxJson({
                    url: '/dailyoffice/payDeposit/getSubjectID',
                    data: {
                      id: data.subjectID
                    },
                    call: (data) => {
                      if (data) {
                        this.subjectID = data.id
                        this.subject = data.value2 + ' ---- ' + data.value1 + ' ---- ' + data.showName
                        this.useName = data.value2
                        if(data.name === 63){
                          this.ownerSys='1'
                        }else if(data.name === 65){
                          this.ownerSys='0'
                        }
                      }
                    }
                  })
                }
                let insertDate = new Date(accAdd(new Date().getTime(), accMul(this.payDepositList.length, 1000)))
                this.payDepositList.push({
                  id: guid(),
                  bankDetailID: data.id,
                  insertDate: formatTime(insertDate),
                  ownerID: this.id,
                  remark: data.remark,
                  subject: data.subject,
                  subjectID: data.subjectID,
                  cccurDate: data.workDate,
                  other: data.other,
                  otherAccount: data.otherAccount,
                  refundDate:data.refundDate,
                  money: data.money,
                  useMoney: '0',
                  maxMoney: data.money,
                })
              }
            })
          }
        }
      },
      look: (data) => {
        this.bankDetailList = data.bankDetailList
        this.allocationList = data.allocationList
        this.invoiceList = data.invoicePsd.list
        this.invoice = data.invoicePsd.value
        this.id = data.id
        this.unitID=data.unitID
        this.otherUnit = data.otherUnit
        this.name = data.name
        this.useName = data.name
        this.otherAccount = data.otherAccount
        this.subject = data.subject
        this.lastDate = data.lastDate
        this.message = data.code
        this.money = data.money
        this.remark = data.remark
        this.otherAccountID = data.otherAccountID
        this.otherUnitID = data.otherUnitID
        this.ownerID = data.ownerID
        this.subjectID = data.subjectID
        this.fileList = data.files
        this.updateDate = data.updateDate// 修改日期
        this.updateName = data.updateName// 修改人
        this.createName = data.createName// 添加人
        this.approvalHtml = data.approvalHtml
        this.invoiceDetails = data.paymentInvoice
        this.branchList = data.branchList
        this.accountString = data.accountString.split('☆')

        for(let i in this.allocationList){
          this.allocationMoney = this.allocationList[i].value
        }

        this.isCause = this.nature !== '2';
        this.isBrand = !(this.nature === '2' || this.nature === '4' || this.nature === '5');

        this.isLook = false
        if(this.bankDetailList.length>0){
          this.isBankDetailEmpty=false
        }
        if(this.isRelevance === '1'){
          this.eventShowA = false
          this.eventShowB = true
        }else {
          this.eventShowA = true
          this.eventShowB = false
        }
        if(data.paymentInvoice.length !== 0){
          this.elInvoice = true
          //this.invoice = '0'
          this.isRule = ''
        }else{
          this.elInvoice = false
          //this.invoice = '1'
        }
        this.empty = this.paymentInvoice.length === 0
        if (this.nature === '1') {
          this.PrepaidHidden = true // 判断发票类型是否隐藏
        }
        if(this.nature === '2'||this.nature === '4'||this.nature === '5'){
          this.isChecksHidden=false
        }

        if(this.nature === '2'){
          this.isCause = false
          this.isLastDate = false
          this.isCode = false
          // this.isAllocationShow = false
          this.isBrand = false
          this.isUpFile = false
        }else{
          this.isCause = true
          this.isLastDate = true
          this.isCode = true
          // this.isAllocationShow = true
          this.isBrand = true
          this.isUpFile = true
        }
        if(this.nature === '7'){
          let id=''
          for (let i = 0; i < this.bankDetailList.length; i++) {
            if(this.bankDetailList.length===1){
              id='\"'+this.bankDetailList[i].bankDetailID+'\"'
            }else{
              if(i === this.bankDetailList.length-1){
                id=id+'\"'+this.bankDetailList[i].bankDetailID+'\"'
              }else if(i === 0){
                id='\"'+this.bankDetailList[i].bankDetailID+'\",'
              }else{
                id=id+'\"'+this.bankDetailList[i].bankDetailID+'\",'
              }
            }
          }
          let params={
            id:id
          }
          this.ajaxJson({
            url: '/dailyoffice/deposit/getDepositList',
            data: params,
            call: (data) => {
              let insertDate = new Date(accAdd(new Date().getTime(), accMul(this.bankDetailList.length, 1000)))
              for (let j = 0; j < this.bankDetailList.length; j++) {
                for (let i = 0; i < data.length; i++) {
                  if(this.bankDetailList[j].bankDetailID===data[i].id){
                    this.bankDetailList[j].remark= data[i].remark
                    this.bankDetailList[j].subjectID= data[i].subjectID
                    this.bankDetailList[j].subject= data[i].subject
                    this.bankDetailList[j].cccurDate=data[i].workDate
                    this.bankDetailList[j].other=data[i].other
                    this.bankDetailList[j].otherAccount=data[i].otherAccount
                    this.bankDetailList[j].useMoney=this.bankDetailList[j].money
                    this.bankDetailList[j].maxMoney=accAdd(this.bankDetailList[j].money,data[i].useMoney)+''
                  }
                }
              }
              this.depositList=this.bankDetailList
              this.bankDetailList=[]
              this.isInvoice='1'
            }
          })
        }else if(this.nature === '8'){
          let params={
            id:this.bankDetailList[0].bankDetailID
          }
          this.ajaxJson({
            url: '/dailyoffice/payDeposit/initForm',
            data: params,
            call: (data) => {
              let insertDate = new Date(accAdd(new Date().getTime(), accMul(this.payDepositList.length, 1000)))
              this.payDepositList.push({
                id: guid(),
                bankDetailID: data.id,
                insertDate: formatTime(insertDate),
                ownerID: this.id,
                remark: data.remark,
                subject: data.subject,
                subjectID: data.subjectID,
                cccurDate: data.workDate,
                other: data.other,
                otherAccount: data.otherAccount,
                refundDate:data.refundDate,
                money: data.money,
                useMoney: '0',
                maxMoney: data.money,
              })
              this.bankDetailList=[]
            }
          })
        }else if(this.nature === '9'){
          this.PrepaidHidden = true
          let params={
            id:this.bankDetailList[0].bankDetailID
          }
          this.ajaxJson({
            url: '/dailyoffice/expressCompany/getExpressForm',
            data: params,
            call: (data) => {
              let insertDate = new Date(accAdd(new Date().getTime(), accMul(this.payDepositList.length, 1000)))
              this.expressList.push({
                id: guid(),
                bankDetailID: data.id,
                insertDate: formatTime(insertDate),
                ownerID: this.id,
                startDate:data.startDate,
                endDate:data.endDate,
                money:data.countMoney,
                storeName:data.storeName,
              })
              this.bankDetailList=[]
            }
          })
        }
      }
    })
  },
  methods: {
    addWorkOrder(){
      this.$dialog.OpenWindow({
        width: '1050',
        height: '750',
        title: '选择工单',
        url: '/selectPushRepair?companyID='+this.otherUnitID,
        closeCallBack: (data) => {
          if (data) {
            let arrId = []
            for(let i in this.workOrderList){
              arrId.push(this.workOrderList[i].bankDetailID)
            }
            let item = {}
            let item2 = {}
            let money = 0
            setTimeout(()=>{
              for(let i in data){
                if(arrId.indexOf(data[i].orderid)==-1){
                  item = {}
                  item2 = {}
                  item.id = guid()
                  item.insertDate = data[i].visitDate
                  item.ownerID = this.id
                  item.bankDetailID = data[i].orderid
                  item.money = data[i].pending
                  this.workOrderList.push(item)

                  item2.id = guid()
                  item2.insertDate = data[i].visitDate
                  item2.ownerID = this.id
                  item2.bankDetailID = data[i].orderid
                  item2.code = data[i].code
                  item2.vehicle = data[i].carName
                  item2.typeValue = data[i].type=='0'?'自保':'非自保'
                  item2.pendingstateValue = data[i].pendingstate=='0'?'待结账':'已结账'
                  item2.pending = data[i].pending
                  item2.pendingmoney = data[i].pendingmoney
                  this.workOrderList2.push(item2)
                }
              }
              for(let i in this.workOrderList){
                money += Number(this.workOrderList[i].money)
              }
              if(money!=0){
                this.money = money
              }
            },0)

          }
        }
      })
    },
    addExpress(){
      if(this.otherUnitID!=''){
        this.$dialog.OpenWindow({
          width: '1050',
          height: '750',
          title: '选择快递对账单',
          url: '/selectExpressNot?paymentUnitID='+this.otherUnitID,
          closeCallBack: (data)=>{
            if(data){
              this.ownerID=data.id
              let num =0
              for (let i = 0; i <this.expressList.length ; i++) {
                if(data.id === this.expressList[i].bankDetailID){
                  num=1
                }
              }
              if(num===0){
                let subject=''
                let insertDate = new Date(accAdd(new Date().getTime(), accMul(this.depositList.length, 1000)))
                this.expressList.push({
                  id: guid(),
                  bankDetailID: data.id,
                  insertDate: formatTime(insertDate),
                  ownerID: this.id,
                  startDate:data.startDate,
                  endDate:data.endDate,
                  money:data.countMoney,
                  storeName:data.storeName,
                })
                let sumMoney = 0;
                for(let i in this.expressList){
                  let money = this.expressList[i].money;
                  sumMoney = accAdd( money,sumMoney)
                }
                this.money = sumMoney + ''
              }
            }
          }
        })
      }else{
        this.selectUnit()
      }
    },
    delWorkOrder(index,item){
      // this.$dialog.alert({
      //   tipValue: '删除成功！！！',
      //   closeCallBack: ()=>{

          this.ajaxJson({
              url: '/fix/fixOrder/doBill',
              data: {
                list:[
                  item.bankDetailID
                ],
                state:'0'//推修结账状态 0，未结账，1，结账审批中，2，已结账
              },
              loading:'0',
              call: (data) => {
                if(data.type=='0'){
                  if(this.money!=0){
                    this.money = Number(this.money)-Number(item.pending)
                  }
                  this.workOrderList.splice(index,1)
                  this.workOrderList2.splice(index,1)
                  this.ajaxJson({
                    url: '/PersonOffice/delPaymentBankDetail',
                    data: {
                      id:this.id,
                      ownerID:item.bankDetailID
                    },
                    loading:'0',
                    call: (data) => {
                    }
                  })
                }
              }
          })
      //   }
      // })
    },
    delExpressList(index,item){
      this.$dialog.alert({
        tipValue: '删除成功！！！',
        closeCallBack: ()=>{
          this.expressList.splice(index,1)
          if(this.expressList.length === 0){

          }
          this.money = parseFloat(this.money) - parseFloat(item.money)
        }
      })
    },
    addPayDeposit(){
      if(this.otherUnitID!=''){
        this.$dialog.OpenWindow({
          width: 1050,
          height: 820,
          url:'/payDepositForm?otherID='+this.otherUnitID+"&otherAccountID="+this.otherAccountID+"&category="+this.personOrUnit,
          title:'添加收押金',
          closeCallBack:(data) =>{
            if(data){
              if(this.nature === '8'){
                let params={
                  id:data
                }
                this.ajaxJson({
                  url: '/dailyoffice/payDeposit/initForm',
                  data: params,
                  call: (data) => {
                    this.disable = true
                    this.isNoBeforeClick = true
                    this.isOtherAccount = true
                    this.personOrUnit = data.category
                    this.ownerID = ''
                    this.otherUnitID = data.otherID
                    this.otherUnit = data.other
                    this.otherUnitID = data.otherID
                    this.otherUnit = data.other
                    this.otherAccount = data.otherAccount
                    this.otherAccountID = data.otherAccountID
                    this.money = data.money
                    this.fileList = data.fileList
                    this.isInvoice = '1'
                    if (data.subjectID) {
                      this.ajaxJson({
                        url: '/dailyoffice/payDeposit/getSubjectID',
                        data: {
                          id: data.subjectID
                        },
                        call: (data) => {
                          if (data) {
                            this.subjectID = data.id
                            this.subject = data.value2 + ' ---- ' + data.value1 + ' ---- ' + data.showName
                            this.useName = data.value2
                            if(data.name === 63){
                              this.ownerSys='1'
                            }else if(data.name === 65){
                              this.ownerSys='0'
                            }
                          }
                        }
                      })
                    }
                    let insertDate = new Date(accAdd(new Date().getTime(), accMul(this.payDepositList.length, 1000)))
                    this.payDepositList.push({
                      id: guid(),
                      bankDetailID: data.id,
                      insertDate: formatTime(insertDate),
                      ownerID: this.id,
                      remark: data.remark,
                      subject: data.subject,
                      subjectID: data.subjectID,
                      cccurDate: data.workDate,
                      other: data.other,
                      otherAccount: data.otherAccount,
                      refundDate:data.refundDate,
                      money: data.money,
                      useMoney: '0',
                      maxMoney: data.money,
                    })
                  }
                })
              }
            }
          }
        })
      }else{
        this.selectUnit()
      }
    },
    delPayDepositList(index,item){
      this.$dialog.alert({
        tipValue: '删除成功！！！',
        closeCallBack: ()=>{
          this.payDepositList.splice(index,1)
          if(this.payDepositList.length === 0){
          }
          this.money = parseFloat(this.money) - parseFloat(item.money)
        }
      })
    },
    selectPayDepositList(){
      if(this.payDepositList.length === 0){
        this.$dialog.OpenWindow({
          width: '1050',
          height: '692',
          title: '选择付押金信息',
          url: '/selectPayDeposit?state=0&otherID=' + this.otherUnitID,
          closeCallBack: (data) => {
            if(data){
              let subject=''
              let insertDate = new Date(accAdd(new Date().getTime(), accMul(this.payDepositList.length, 1000)))
              this.payDepositList.push({
                id: guid(),
                bankDetailID: data.id,
                insertDate: formatTime(insertDate),
                ownerID: this.id,
                remark: data.remark,
                subject: data.subject,
                subjectID: data.subjectID,
                cccurDate: data.workDate,
                other: data.other,
                otherAccount: data.otherAccount,
                refundDate:data.refundDate,
                money: data.money,
                useMoney: '0',
                maxMoney: data.money,
              })
              let sumMoney = 0;
              for(let i in this.payDepositList){
                let money = this.payDepositList[i].money;
                sumMoney = accAdd( money,sumMoney)
              }
              this.money = sumMoney + ''
              if(data.subjectID){
                this.ajaxJson({
                  url: '/dailyoffice/payDeposit/getSubjectID',
                  data: {
                    id: data.subjectID
                  },
                  loading: '0',
                  call: (data) => {
                    if (data) {
                      this.subjectID = data.id
                      this.subject = data.value2 + ' ---- ' + data.value1 + ' ---- ' + data.showName
                      this.useName = data.value2
                      if(data.name === '63'){
                        this.ownerSys='1'
                      }else if(data.name === '65'){
                        this.ownerSys='0'
                      }
                    }
                  }
                })
              }
            }
          }
        })
      }else{
        alert('付押金')
      }
    },
    delDepositList(index,item){
      this.$dialog.alert({
        tipValue: '删除成功！！！',
        closeCallBack: ()=>{
          this.depositList.splice(index,1)
          this.money = parseFloat(this.money) - parseFloat(item.money)
        }
      })
    },
    bankDetailListMoney(){
      let sumMoney = 0;
      for(let i in this.bankDetailList){
        let money = this.bankDetailList[i].money;
        sumMoney = accAdd( money,sumMoney)
      }
      this.money = sumMoney + ''
    },
    depositListMoney(){
      let sumMoney = 0;
      for(let i in this.depositList){
        let money = this.depositList[i].money;
        sumMoney = accAdd( money,sumMoney)
      }
      this.money = sumMoney + ''
    },
    selectDepositList() {
      if(this.otherUnitID){
        this.$dialog.OpenWindow({
          width: '1050',
          height: '692',
          title: '选择押金信息',
          url: '/selectDeposit?otherID='+this.otherUnitID,
          closeCallBack: (data) => {
            if(data){
              let num =0
              for (let i = 0; i <this.depositList.length ; i++) {
                if(data.id === this.depositList[i].bankDetailID){
                  num=1
                }
              }
              if(num===0){
                let subject=''
                let insertDate = new Date(accAdd(new Date().getTime(), accMul(this.depositList.length, 1000)))
                this.depositList.push({
                  id: guid(),
                  bankDetailID: data.id,
                  insertDate: formatTime(insertDate),
                  ownerID: this.id,
                  remark: data.remark,
                  subject: data.subject,
                  cccurDate: data.workDate,
                  other: data.other,
                  otherAccount: data.otherAccount,
                  money: data.useMoney,
                  useMoney: '0',
                  maxMoney: data.useMoney,
                })
                let sumMoney = 0;
                for(let i in this.depositList){
                  let money = this.depositList[i].money;
                  sumMoney = accAdd( money,sumMoney)
                }
                this.money = sumMoney + ''
              }
            }
          }
        })
      }else{
        this.selectUnit()
      }
    },
    isAllocationBlur(){
      if(this.money && this.isAllocation === '1'){
        let money = parseFloat(this.money)
        let allocationMoney = parseFloat(this.allocationMoney)
        if(allocationMoney > money){
          this.$dialog.alert({
            width: '400',
            alertImg: 'error',
            tipValue: '首次拨付金额必须小于等于支付金额！！！',
            closeCallBack: ()=>{
              this.allocationMoney = ''
            }
          })
        }else{
          let insertDate = new Date(accAdd(new Date().getTime(), accMul(this.allocationList.length, 1000)))
          this.allocationList = []     // 添加新数据前清空原有数据
          let item = {
            id: guid(),
            insertDate: formatTime(insertDate),
            ownerID: this.id,
            workDate: this.lastDate,
            value: this.allocationMoney,
            isFinish: '0'
          }
          this.allocationList.push(item)
        }
      }
    },
    /* 是否分批拨付 */
    allocationEvent(){
      if(this.isAllocation === '0'){
        this.isAllocationShow = false
      }else{
        this.isAllocationShow = true
      }
    },
    /* 支票支付 */
    checkEvent(){
      this.otherUnit = ''
      this.otherAccount = ''
      if(this.isChecks === '0'){
        this.isOtherAccount = false
      }
    },
    /* 金额分配 */
    // moneyAllocation(val){
    //   if(this.actualMoney){
    //     this.min = val
    //     let insertDate = new Date(accAdd(new Date().getTime(), accMul(this.allocationList.length, 1000)))
    //
    //     let item = {
    //       id: guid(),
    //       insertDate: formatTime(insertDate),
    //       ownerID: this.id,
    //       workDate: val,
    //       value: '',
    //       selectValue: val,
    //       isFinish: '0'
    //     }
    //     if (this.allocationList.length > 0) {
    //       this.allocationList[this.allocationList.length - 1].value = ''
    //     }
    //     this.allocationList.push(item)
    //   }else {
    //     this.$dialog.alert({
    //       alertImg: 'warn',
    //       tipValue: '请输入付款金额'
    //     })
    //   }
    // },
    //查看发票是否使用过
    verificationRepeatInvoice(item){
      if(this.isRepeatInvoice()) {
        if (item.code !== '' && item.quantity !== '') {
          let params = {
            id: this.id,
            code: item.code,
            category: item.category,
            quantity: item.quantity
          }
          this.ajaxJson({
            url: '/PersonOffice/verifyReimbursementDetailInvoiceCode',
            data: params,
            loading: '0',
            call: (data) => {
              if (data.type === 0) {
                let width = 250
                width = accAdd(width, accMul(data.val.length, 15))
                this.$dialog.alert({
                  tipValue: data.message + '：<b class="red">（' + data.val + '）</b>' + data.message,
                  alertImg: 'error',
                  width: width
                })
              }
            }
          })
        }
      }
    },
    //票面金额input事件
    invoicesMoneyInputEvent(){
      this.calculationInvoiceMoney()
    },
    //发票数量input事件
    invoicesQuantityInputEvent(){
      this.calculationInvoiceMoney()
    },
    //计算发票金额
    calculationInvoiceMoney(){
      let money = 0
      let quantity = 0
      for(let i in this.invoiceDetails){
        let item = this.invoiceDetails[i]
        let temp = item.money
        if(isNaN(temp) || temp === ''){
          temp = 0
        }
        let count = item.quantity
        if(isNaN(count) || count === ''){
          count = 1
        }
        quantity = accAdd(quantity,count)
        temp = accMul(temp,count)
        money = accAdd(money,temp)
      }
      //this.invoiceCount = quantity + ''
      this.money = money + ''
    },
    //发票明细中的发票类型（单张还是连号首张）
    switchInvoiceCategory(item){
      if(item.category === '0') {
        //单张情况
        item.quantity = "1"
      }
      else{
        //连号首张
        item.quantity = ""
      }
      this.calculationInvoiceMoney()
      this.verificationRepeatInvoice(item)
    },
    //删除发票
    delApplyInvoice(index,item){
      this.$dialog.alert({
        tipValue: '删除成功！！！',
        closeCallBack: ()=>{
          this.invoiceDetails.splice(index, 1)
          if(this.invoiceDetails.length === 0){
            this.isElectronicInvoice = false
            // this.maxWorkDate = formatDate(new Date())
            this.invoiceMoney = ''
            this.invoiceCount = '1'
            this.addApplyInvoice()
            this.calculationInvoiceMoney()
          }
        }
      })
    },
    // 选择电子发票
    selectapplyElInvoice(){
      let len = this.invoiceDetails.length
      let sign = false
      if(len === 1){
        let invoice = this.invoiceDetails[0]
        if(invoice.code !== ''){
          sign = true
        }
        else if(invoice.workDate !== ''){
          sign = true
        }
        else if(invoice.remark !== ''){
          sign = true
        }
        else if(invoice.url !== ''){
          sign = true
        }
        else if(invoice.pdfUrl !== ''){
          sign = true
        }
        else if(invoice.invoiceID !== ''){
          sign = true
        }
      }
      else{
        sign = true
      }

      if(sign){
        this.$dialog.confirm({
          tipValue:'选择电子发票将清空你填写的纸质发票，确定选择纸质发票吗？',
          width:'600',
          btnValueOk:'选择电子发票',
          okCallBack:() => {
            this.selectInvoiceOperate()
          },
          cancelCallBack: ()=>{
            this.invoice = '1'
          }
        })
      }
      else{
        this.selectInvoiceOperate()
      }
    },
    selectInvoiceOperate(){
      this.$dialog.OpenWindow({
        url:'/selectElectronicInvoice?state=0&relevanceID=' + this.id + "&relevanceType=1",
        width: "1000",
        height: "650",
        title: '选择电子发票',
        closeCallBack: (data)=>{
          if(data){
            this.invoice = '0'

            this.invoiceDetails = []
            this.isElectronicInvoice = true
            let insertDate = new Date(accAdd(new Date().getTime(), accMul(this.invoiceDetails.length, 1000)))
            this.invoiceDetails.push({
              id: guid(),
              insertDate: formatTime(insertDate),
              ownerID: this.id,
              code: data.num,
              workDate: data.openDate,
              category: '0',
              quantity: '1',
              money:data.totalMoney,
              remark: data.remark,
              url: data.imgUrl,
              pdfUrl: data.pdfUrl,
              isPdf: '1',
              invoiceID: data.id
            })
            // this.maxWorkDate = data.openDate
            this.invoiceMoney = data.totalMoney
            this.money=data.totalMoney
            this.invoiceCount = '1'
          }else{
            this.invoice = '1'
          }
        }
      })
    },
    //添加发票
    addApplyInvoice(){
      let insertDate = new Date(accAdd(new Date().getTime(), accMul(this.invoiceDetails.length, 1000)))
      this.invoiceDetails.push({
        id: guid(),
        insertDate: formatTime(insertDate),
        ownerID: this.id,
        code: '',
        workDate: '',
        category: '0',
        quantity: '1',
        money:'',
        remark: '',
        url: '',
        pdfUrl: '',
        isPdf: '0',
        invoiceID: ''
      })
    },

    //显示发票图片
    invoiceImg(item){
      if(item.url !== '') {
        if(item.isPdf === '0'){
          this.viewImg = '/UploadFile/Invoice/' + item.url
        }
        else{
          this.viewImg = '/UploadFile/electronicInvoice/' + item.url
        }
        this.viewImgShow = true
      }
    },
    //隐藏发票图片
    invoiceImgHide(item){
      if(item.url !== '') {
        this.viewImgShow = false
      }
    },

    /* 部门选择 */
    selectDeparment(){
      this.$dialog.OpenWindow({
        url:"/selectDepartment?level=2&open=1",
        width:"850",
        height:"600",
        title: "选择部门",
        closeCallBack: (data) => {
          if(data){
            var sign = true

            for(var i = 0; i< this.branchList.length; i++){
              if(this.branchList[i].selectID === data.id){
                sign = false
                break
              }
            }

            if(sign) {
              let insertDate = new Date(accAdd(new Date().getTime(), accMul(this.branchList.length, 1000)))

              let item = {
                id: guid(),
                insertDate: formatTime(insertDate),
                ownerID: this.id,
                selectID: data.id,
                selectValue: data.name,
                value: ''
              }
              if (this.branchList.length > 0) {
                this.branchList[this.branchList.length - 1].value = ''
              }
              this.branchList.push(item)
            } else{
              var width = 300
              width = accAdd(width, accMul(15,data.name.length))
              this.$dialog.alert({
                tipValue:'部门<b class="red">（' + data.name + '）</b>已存在！！！',
                alertImg:'warn',
                width:width
              })
            }
          }
        }
      })
    },
    addInvoice(){
      this.$dialog.OpenWindow({
        width: "1000",
        height: "750",
        title: "选择发票",
        url: '/selectElectronicInvoice',
        closeCallBack: (data)=>{
          if(data){
            this.elInvoice = true

            this.invoiceID = data.id

            this.empty = this.paymentInvoice.length  === 0
            let isTrue = false;
            if(this.paymentInvoice.length > 0){
              for(let i in this.paymentInvoice){
                if(this.paymentInvoice[i].id === data.id){
                  isTrue = false
                  return
                }else{
                  isTrue = true
                }
              }
            }
            if(isTrue){
              this.paymentInvoice.push(data)
            }
            this.invoiceUpList()
          }
        }
      })
    },
    delInvoice(item){
      this.paymentInvoice.splice(item.id,1)
      this.empty = this.paymentInvoice.length  === 0
      if(this.paymentInvoice.length === 0){
        this.invoice = '1'
        this.elInvoice = false
      }
      this.invoiceUpList()
    },

    invoiceUpList(){
      let insertInvoiceDate = new Date(accAdd(new Date().getTime(), accMul(this.paymentInvoice.length, 1000)))
      let item = {
        id: guid(),
        insertDate: formatTime(insertInvoiceDate),   //当前时间
        ownerID: this.id,   // ownerID
        invoiceID: this.invoiceID   //当条发票的ID
      }
      this.paymentInvoiceList.push(item)
    },

    invoiceClick () {
      if (this.invoice === '0') {
        this.selectapplyElInvoice()
      } else if (this.invoice === '1') {
        this.$dialog.confirm({
          tipValue: '选择纸质发票将清空你填写的电子发票，确定添加纸质发票吗？',
          width: '600',
          btnValueOk: '添加纸质发票',
          okCallBack: () => {
            this.isElectronicInvoice = false
            this.invoiceDetails.splice(-1)
            this.addApplyInvoice()
          },
          cancelCallBack: ()=>{
            this.invoice = '0'
          }
        })
      }
    },
    listView(item){
      this.$dialog.OpenWindow({
        width: 1050,
        height: 740,
        url:'/myElectronicInvoiceForm?id=' + item.id,
        title: '查看电子发票',
        closeCallBack: (data)=>{

        }
      })
    },
    /* 删除收支明细 */
    delbankDetailList(index,item){
      this.$dialog.alert({
        tipValue: '删除成功！！！',
        closeCallBack: ()=>{
          this.bankDetailList.splice(index,1)
          if(this.bankDetailList.length === 0){
            this.isBankDetailEmpty = true
            this.isAddBankDetail = true
          }

          this.money = parseFloat(this.money) - parseFloat(item.money)

        }
      })
    },
    /* 添加选择收支明细 */
    selectBankDetail(){
      if(this.nature === '4'){
        if(this.otherAccountID){
          this.$dialog.OpenWindow({
            width: '1050',
            height: '692',
            title: '选择收支明细',
            url: '/selectBankDetail?direction=0&categoryBefore=1&selectType=1&type=1',
            closeCallBack: (data)=>{
              if(data){
                this.isInvoice='1'
                for(let i=0;i<data.length;i++){
                  let a=0
                  for (let j = 0; j <this.bankDetailList.length ; j++) {
                    if(data[i].id===this.bankDetailList[j].bankDetailID){
                      a=1
                    }
                  }
                  if(a===0){
                    this.money=(Number(this.money) + Number(data[i].money)).toFixed(2)
                    let insertDate = new Date(accAdd(new Date().getTime(), accMul(this.bankDetailList.length, 1000)))
                    this.bankDetailList.push({
                      id: guid(),
                      bankDetailID: data[i].id,
                      insertDate: formatTime(insertDate),
                      ownerID: this.id,
                      remark: data[i].remark,
                      subject: data[i].subject,
                      cccurDate: data[i].cccurDate,
                      direction: data[i].direction,
                      otherAccount: data[i].bankName + data[i].account + data[i].nature,
                      money: data[i].useMoney,
                      useMoney:'0',
                    })
                  }
                }
                if(this.bankDetailList.length>0){
                  this.isBankDetailEmpty=false
                }
              }
            }
          })
        }else{
          this.$dialog.alert({
            alertImg: 'warn',
            tipValue: '请选择收款账号'
          })
        }
      }else if(this.nature === '5') {
        if (this.otherAccountID) {
          this.$dialog.OpenWindow({
            width: '1050',
            height: '692',
            title: '选择收支明细',
            url: '/selectBankDetail?direction=0&categoryBefore=1' + '&otherID=' + this.otherUnitID + '&selectType=1&type=1',
            closeCallBack: (data) => {
              if (data) {
                for (let i = 0; i < data.length; i++) {
                  let a=0
                  for (let j = 0; j <this.bankDetailList.length ; j++) {
                    if(data[i].id===this.bankDetailList[j].bankDetailID){
                      a=1
                    }
                  }
                  if(a===0){
                    this.isInvoice = ''
                    this.money = (Number(this.money) + Number(data[i].money)).toFixed(2)
                    this.beforeMoney = data[i].money
                    let insertDate = new Date(accAdd(new Date().getTime(), accMul(this.bankDetailList.length, 1000)))
                    this.bankDetailList.push({
                      id: guid(),
                      bankDetailID: data[i].id,
                      insertDate: formatTime(insertDate),
                      ownerID: this.id,
                      remark: data[i].remark,
                      subject: data[i].subject,
                      cccurDate: data[i].cccurDate,
                      direction: data[i].direction,
                      otherAccount: data[i].bankName + data[i].account + data[i].nature,
                      money: data[i].useMoney,
                      useMoney:'0'
                    })
                  }
                }
                if (this.bankDetailList.length > 0) {
                  this.isBankDetailEmpty = false
                }
              }
            }
          })
        } else {
          this.$dialog.alert({
            alertImg: 'warn',
            tipValue: '请选择收款账号'
          })
        }
      }
    },
    showPayment (oldVal) {
      if(this.nature==='2'){
        this.PrepaidHidden = false
        this.invoiceDetails.length = 1    //清空发票列表并保留一行
        this.invoiceDetails = []
        this.isAddBankDetail = false
        this.isNoBeforeClick = true
        this.personOrUnit = '0'
        this.isUpFile = false
        this.isRule = ''
        this.otherUnit = ''
        this.otherUnitID = ''
        this.otherAccountID = ''
        this.otherAccount = ''
        this.isChecksHidden = false

        /* 内部互转时 */
        this.isCause = false
        this.isLastDate = false
        this.isCode = false
        // this.isAllocationShow = false
        this.isBrand = false
        this.depositList = []
        this.payDepositList = []
      }else{
        this.isCause = true
        this.isLastDate = true
        this.isCode = true
        // this.isAllocationShow = true
        this.isBrand = true
        this.invoiceDetails = []
        this.isNoBeforeClick = false
        this.isUpFile = true
        if(oldVal==='2'){
          this.otherUnit = ''
          this.otherUnitID = ''
          this.otherAccountID = ''
          this.otherAccount = ''
        }
        if(this.nature==='1'){
          this.isChecksHidden = true
          this.isAddBankDetail = false
          this.bankDetailList = []

          this.invoiceDetails.length = 1    //清空发票列表并保留一行
          this.invoiceDetails = []
          this.addApplyInvoice()

          this.PrepaidHidden = true
          this.secondLevelInvoice = '0'
          this.invoice = '1'
          this.name=''  //清空款项事途||计划事件
          this.subject=''
          this.lastDate=''
          this.message=''
          this.money=''
          this.isInvoice = '1'   //选择电子发票的时候,支付金额禁止输入
          this.depositList = []
          this.payDepositList = []
        }else if(this.nature==='0'||this.nature==='6'){
          this.isChecksHidden = true
          this.isAddBankDetail = false
          this.bankDetailList = []

          this.PrepaidHidden = false
          this.ListHiding = true
          this.fileListShow = false
          this.elInvoice = false
          this.paymentInvoice.splice(0)
          this.empty = this.paymentInvoice.length  === 0
          this.invoice = '1'
          this.otherAccount='' //清空收款账号
          this.name=''  //清空款项事途||计划事件
          this.subject=''
          this.lastDate=''
          this.message=''
          this.money=''
          this.isInvoice = ''  //选择电子发票的时候,支付金额禁止输入
          this.depositList = []
          this.payDepositList = []
        }else if(this.nature==='4'||this.nature==='5'){
          this.isChecksHidden = false
          this.PrepaidHidden = false //清空发票明细列表
          this.isAddBankDetail = true
          // this.invoiceDetails = []
          this.depositList = []
          this.isInvoice = '1'
          this.payDepositList = []
        }else if(this.nature === '7'){
          this.isChecksHidden = false
          this.isAddBankDetail = true
          this.PrepaidHidden = false    //清空发票明细列表
          this.bankDetailList = []
          this.payDepositList = []
        }else if(this.nature === '8'){
          this.isChecksHidden = false
          this.isAddBankDetail = true
          this.PrepaidHidden = false    //清空发票明细列表
          this.depositList = []
          this.bankDetailList = []
          this.isInvoice='1'
        }else if(this.nature == '9'){
          this.isChecksHidden = false
          this.isAddBankDetail = true
          this.depositList = []
          this.bankDetailList = []
          this.isInvoice='1'
          this.payDepositList = []
          this.PrepaidHidden = true
          this.invoiceDetails.length = 1    //清空发票列表并保留一行
          this.invoiceDetails = []
          this.addApplyInvoice()
        }else if(this.nature == '10'){
          this.PrepaidHidden = true
        }
      }
    },
    selectCause () {
      let name = '65'
      if (this.ownerSys === '1') {
        name = '63'
      } else if(this.ownerSys === '3'){
        name = '93'
      }
      if(this.nature=='7'){
        name=name+'&value9=1'
      }else if(this.nature=='8'){
        name=name+'&value9=2'
      }
      this.$dialog.OpenWindow({
        width: 950,
        height: 603,
        url: '/selectDic?name=' + name,
        title: '选择事由',
        closeCallBack: (data) => {
          let dicName
          if (data) {
            this.subjectID = data.id
            if (data.showName) {
              dicName = data.value2 + ' ---- ' + data.value1 + ' ---- ' + data.showName
            }
            if (!data.value1) {
              dicName = data.value2 + ' ---- ' + data.showName
            }
            if (!data.value2) {
              dicName = data.value1 + ' ---- ' + data.showName
            }
            this.subjectCode = data.value11
            this.subject = dicName
            this.initCode()
          }
        }
      })
    },
    selectaccount () {
      if(this.nature==='2'){
        this.categoryUnit = 0
      }else {
        this.categoryUnit = 1
      }
      if (this.otherUnitID === '') {
        this.$dialog.alert({
          tipValue: '请选择收款方',
          alertImg: 'warn'
        })
      } else {
        if(this.personOrUnit === '0'){
          this.$dialog.OpenWindow({
            width: 950,
            height: 692,
            url: '/selectPublicAccount?categoryUnit='+this.categoryUnit+'&ownerSys=1&ownerSysUnit=1&ownerSysUnitBefore=1&unitID=' + this.otherUnitID+'&category=1',
            title: '选择账户信息',
            closeCallBack: (data) => {
              if (data) {
                if(data.category==='1'&&data.bankID === "" && data.bank === ""){
                  this.updataPublicAccount(data.id)
                }else{
                  this.otherAccount = data.publicAccountExplain
                  this.otherAccountID = data.id
                  this.accountString=[]
                  this.accountString.push(data.name)
                  this.accountString.push(data.bank)
                  this.accountString.push(data.accountStr)
                  this.selectBankDetail()
                }
              }
            }
          })
        }else{
          this.$dialog.OpenWindow({
            width: 950,
            height: 692,
            url: '/selectPrivateAccount?categoryUnit='+this.categoryUnit+'&ownerSys=1&ownerSysUnit=1&ownerSysUnitBefore=1&categoryBefore=1&personID=' + this.otherUnitID+'&category=1',
            title: '选择账户信息',
            closeCallBack: (data) => {
              if (data) {
                if(data.bankID === "" && data.bank === ""){
                  this.updataPrivateAccount(data.id)
                }else{
                  this.otherAccount = data.publicAccountExplain
                  this.otherAccountID = data.id
                  this.accountString.push(data.person)
                  this.accountString.push(data.bank)
                  this.accountString.push(data.accountStr)
                  this.selectBankDetail()
                }
              }
            }
          })
        }
      }
    },
    updataPrivateAccount(id){
      this.$dialog.OpenWindow({
          width: 1050,
          height: 750,
          url:'/privateAccountForm?id=' + id,
          title:'维护账户信息',
          closeCallBack:(information) =>{
            if (information) {
              let params = {
                id: id
              }
              this.ajaxJson({
                url: '/Fin/getPublicAccountBank',
                data: params,
                call: (data)=>{
                  if(data){
                    this.otherAccount = data.html
                  }
                }
              })
            }else{
              this.otherAccount = ''
              this.otherAccountID = ''
              // this.updataPublicAccount(id)
            }
          }
      })
    },
    updataPublicAccount(id){
      this.$dialog.OpenWindow({
        width: 1050,
        height: 750,
        url:'/publicAccountForm?id=' + id,
        title:'维护账户信息',
        closeCallBack:(information) =>{
          if (information) {
            let params = {
              id: id
            }
            this.ajaxJson({
              url: '/Fin/getPublicAccountBank',
              data: params,
              call: (data)=>{
                if(data){
                  this.otherAccount = data.html
                }
              }
            })
          }else{
            this.otherAccount = ''
            this.otherAccountID = ''
            // this.updataPublicAccount(id)
          }
        }
      })
    },
    resetPersonOrUnit(op,personOrUnit){
      if(op === 'i'){
        this.personOrUnit = '0'
      }else{
        this.personOrUnit = '1'
      }
    },
    selectUnit (op) {
      var url = '/selectUnit?ownerSys=1&ownerSysBefore=1&category=1&categoryBefore=1'
      var title = '选择单位信息'
      if(this.nature === '2'){
      //只能在本单位
        url = '/selectUnit?ownerSys=1&ownerSysBefore=1&category=0&categoryBefore=1'
      }

      if(this.nature !== '2'){
        if(this.personOrUnit === '0'){
          url = '/selectUnit?category=1&categoryBefore=1'
          title  = '选择单位信息'
        }else{
          url = '/selectPerson?category=1&categoryBefore=1'
          title = '选择联系人信息'
        }
      }else{
        if(this.personOrUnit === '0'){
          url = '/selectUnit?category=0&categoryBefore=1'
          title  = '选择单位信息'
        }
      }
      if(this.nature == '10'){
        url = '/selectPushRepairUnit'
        title  = '选择推修公司'
      }
      this.name = ''
      this.otherAccount = ''
      this.subject = ''
      this.useNum =  '0'
      this.lastDate = ''
      this.message = ''
      this.$dialog.OpenWindow({
        width: 950,
        height: 692,
        url: url,
        title: title,
        closeCallBack: (data) => {
          if (data) {
            if(this.personOrUnit === '0'){
              if(data.registrationNumber === ""){
                this.updataUnit(data.id)
                this.otherUnitID = data.id
              }else{
                this.otherUnit = data.name
                this.otherUnitID = data.id

                if(this.isChecks === '1'){
                  this.isOtherAccount = true
                }else{
                  this.isOtherAccount = false
                }
              }
            }else{
              if(data.idNo === "" && data.phone=== ""){
                this.updataPerson(data.id)
                this.otherUnitID = data.id
              }else{
                this.otherUnit = data.name
                this.otherUnitID = data.id
              }
            }
            if(this.nature == '10'){
              this.otherUnit = data.unit
              this.otherUnitID = data.unitID
            }
            if(this.isChecks==='1'){
              let params = {
                unitID: data.id,
                category:'0'
              }
              let url=''
              if(this.personOrUnit==='0'){
                url='/Fin/getUnitPublicAccount'
              }else{
                url='/Fin/getPersonPrivateAccount'
              }
              this.ajaxJson({
                url: url,
                data: params,
                loading: '0',
                call: (data) => {
                  if (data.type === 0) {
                    this.otherAccount = data.html
                    this.otherAccountID = data.id
                  }
                }
              })
            }
            if(data.id){
              let otherUnitID = data.id
              let params = {
                otherUnitID: data.id
              }
              this.ajaxJson({
                url: '/PersonOffice/getPayOweInvoice',
                data: params,
                loading: '0',
                call: (data)=>{
                  if(data.type === 1){
                    this.$dialog.confirm({
                      width: '320',
                      tipValue: data.message,
                      btnValueOk: '上传发票',
                      btnValueCancel: '继续操作',
                      okCallBack: ()=>{
                        this.$dialog.OpenWindow({
                          width: '1050',
                          height: '550',
                          url: '/paymentWindowManager?otherUnitID=' + otherUnitID,
                          title: '待上传发票',
                          closeCallBack: (data) => {

                          }
                        })
                      }
                    })
                  }
                }
              })
            }
          }else{
            if(this.personOrUnit === '0' && this.otherUnitID !== ''){
              //说明没有选中需要重置类型
              this.personOrUnit='1'
            }else{
              this.personOrUnit='0'
            }
          }
        }
      })
    },
    updataUnit(id){
      this.$dialog.OpenWindow({
        width: '1050',
        height: '750',
        url: '/addUnitForm?id=' + id,
        title: '维护单位信息',
        closeCallBack: (info)=>{
          if(info) {
            let params = {
              id: id
            }
            this.ajaxJson({
              url: '/Basic/getUnitName',
              data: params,
              call: (data) => {
                if (data) {
                  this.otherUnit = data.html
                }
              }
            })
          }else{
            this.otherUnit = ''
            this.otherUnitID = ''
          }
        }
      })
    },
    updataPerson(id){
      this.$dialog.OpenWindow({
        width: '1050',
        height: '750',
        url: '/addPersonForm?id=' + id,
        title: '维护联系人信息',
        closeCallBack: (info)=>{
          if(info){
            let params = {
              id: id
            }
            this.ajaxJson({
              url: '/Basic/getPersonName',
              data: params,
              call: (data)=>{
                if(data){
                  this.otherUnit = data.html
                }
              }
            })
          }else{
            this.name = ''
            this.otherUnitID = ''
          }
        }
      })
    },
    selectPage (event) {
      if (this.isRelevance === '0') {
        this.eventShowB = false
        this.eventShowA = true
        if (this.otherUnitID) {
          this.$dialog.OpenWindow({// 计划事件
            width: 950,
            height: 691,
            url: '/selectPaymentApplyDetail?stateBefore=1&otherUnitID=' + this.otherUnitID + '&isHide=' + 1,
            title: '选择计划事件信息',
            closeCallBack: (data) => {
              if (data) {
                this.name = data.name
                this.ownerID = data.id
                this.ownerSys = data.category
                this.subjectID = data.causeID
                this.subject = data.cause
                this.useNum = data.useNum
                this.lastDate = data.lastDate
                this.money = data.money
                this.initCode()
              }
            }
          })
        } else {
          this.$dialog.alert({
            tipValue: '请选择收款方',
            alertImg: 'warn',
            width: '320',
            closeCallBack () {
              this.invoice = '1'
            }
          })
        }
      } else {
        this.eventShowB = true
        this.eventShowA = false
        this.name = ''
        this.ownerID = ''
        // this.ownerSys = data.ownerSys
        this.subjectID = ''
        this.subject = ''
        this.useNum = '0'
        this.lastDate = ''
        this.money = ''
        this.message = ''
        this.capitalMoney = ''
      }
    },
    SelectIsRelevance () { // 是否关联 计划外
      if (this.isRelevance === '0') {
        this.eventShowA = true
        this.eventShowB = false
        this.name = ''
        this.selectPage()
      } else if(this.isRelevance === '1'){
        this.eventShowB = true
        this.eventShowA = false
        this.name = ''
      }
    },
    initCode () {
      if (this.isRelevance === '0') {
        if (this.lastDate != '') {
          let params = {
            otherUnitID: this.otherUnitID,
            subjectCode: this.subjectID,
            lastDate: this.lastDate,
            isRelevance: this.isRelevance,
            ownerSys: this.ownerSys,
            nature: this.nature,
            id: this.id
          }
          this.ajaxJson({
            url: '/PersonOffice/getPaymentCode',
            data: params,
            loading: '0',
            call: (data) => {
              if (data.type === 0) {
                this.message = data.message
                this.unitID = data.html
              }
            }
          })
        }
      } else {
        if (this.lastDate != '') {
          let params = {
            otherUnitID: this.otherUnitID,
            subjectCode: this.subjectID,
            lastDate: this.lastDate,
            isRelevance: this.isRelevance,
            ownerSys: this.ownerSys,
            nature: this.nature,
            id: this.id
          }
          this.ajaxJson({
            url: '/PersonOffice/getPaymentCode',
            data: params,
            loading: '0',
            call: (data) => {
              if (data.type === 0) {
                this.message = data.message
                this.unitID = data.html
              }
            }
          })
        }
      }
    },
    //核对金额
    bankDetailMoney(){
      let sumMoney=0
      if(this.nature==='7'){
        for(let i=0;i<this.depositList.length;i++){
          let money=this.depositList[i].money
          sumMoney=parseFloat(sumMoney)+parseFloat(money)
        }
      }else{
        for(let i=0;i<this.bankDetailList.length;i++){
          let money=this.bankDetailList[i].money
          sumMoney=parseFloat(sumMoney)+parseFloat(money)
        }
      }
      this.sumBankDetailMoney=sumMoney+''
    },
    btnSubSave(){

      let money = parseFloat(this.money)
      let bankList = true
      let aa = true
      let depositList = true
      let workOrderVerify = true

      if(parseFloat(this.beforeMoney) < parseFloat(this.money)){
        aa = false
      }
      if(!aa){
        this.$dialog.alert({
          width: '300',
          alertImg: 'error',
          tipValue: '退款金额必须小于收款金额！！！'
        })
      }
      if(this.bankDetailList.length===0&&this.nature==='4'){
        bankList = false
      }else if(this.bankDetailList.length===0&&this.nature==='5'){
        bankList = false
      }else if(this.depositList.length===0&&this.nature==='7'){
        depositList = false
      }else if(this.payDepositList.length===0&&this.nature==='7'){
        depositList = false
      }else if(this.workOrderList.length===0&&this.nature==='10'){
        workOrderVerify = false
      }
      if(!depositList){
        this.$dialog.alert({
          width: '300',
          alertImg: 'error',
          tipValue: '请选择押金信息！！！！'
        })
      }
      if(!bankList){
        this.$dialog.alert({
          width: '300',
          alertImg: 'error',
          tipValue: '请选择收支明细信息！！！！'
        })
      }
      if(!workOrderVerify){
        this.$dialog.alert({
          width: '300',
          alertImg: 'error',
          tipValue: '工单推修信息不能为空！！！'
        })
      }
      let bb=true
      if(this.bankDetailList.length>0){
        this.bankDetailMoney()
        if (this.nature === '4'){
          if(parseInt(this.sumBankDetailMoney)<parseInt(this.money)){
            bb=false
          }
        }else{
          if(parseInt(this.sumBankDetailMoney)!==parseInt(this.money)){
            bb=false
          }
        }
      }
      if(!bb){
        this.$dialog.alert({
          width: '300',
          alertImg: 'error',
          tipValue: '收支明细总金额有误！！！'
        })
      }
      if (this.validator() && aa&&bankList&&bb&&depositList&&workOrderVerify) {
        let params = {
          id: this.id,
          unitID: this.unitID,
          otherUnitID: this.otherUnitID,
          otherUnit: this.otherUnit,
          isRelevance: this.isRelevance, // 是否关联
          ownerID: this.ownerID,
          name: this.useName, // 计划事件
          otherAccount: this.otherAccount, // 收款账号
          otherAccountID: this.otherAccountID, // 收款账号
          personID: this.personID, // 申请人姓名
          person: this.person, // 申请人姓名
          nature: this.nature, // 付款性质
          invoice: this.invoice, // 发票类型
          secondLevelInvoice: this.secondLevelInvoice, // 发票二级类型
          files: this.fileList, // 单据
          category: '3',
          ownerSys: this.ownerSys,
          subjectID: this.subjectID, // 事由ID
          subject: this.subject, // 事由
          useNum: this.useNum,
          lastDate: this.lastDate, // 最晚付款日期
          code: this.code, // 编号
          money: this.money, // 金额
          capitalMoney: this.capitalMoney, // 大写金额
          remark: this.remark,// 备注
          paymentInvoice: this.invoiceDetails,
          personOrUnit: this.personOrUnit,
          branchList: this.branchList,
          bankDetailList: this.bankDetailList,
          allocationList: this.allocationList,
          isChecks:this.isChecks,
          isAllocation: this.isAllocation,
          depositList:this.depositList,
          payDepositList:this.payDepositList
        }
        this.ajaxJson({
          url: '/PersonOffice/paymentSave',
          data: params,
          loading: '0',
          call: (data) => {
            if (data.type === 0) {
              if (this.id) {
                if(this.nature === '7'&&this.depositList.length>0){
                  for (let i = 0; i < this.depositList.length; i++) {
                    this.ajaxJson({
                      url: '/dailyoffice/deposit/updateUseMoney',
                      data: {
                        id:this.depositList[i].bankDetailID,
                        money:accAdd(this.depositList[i].money,-this.depositList[i].useMoney)+''
                      },
                      call: (data) => {

                      }
                    })
                  }
                }else if(this.nature === '8'&&this.payDepositList.length>0){
                  this.ajaxJson({
                    url: '/dailyoffice/payDeposit/updateState',
                    data: {
                      id:this.payDepositList[0].bankDetailID,
                      state:'1'
                    },
                    call: (data) => {

                    }
                  })
                }else if(this.nature === '9'&&this.expressList.length>0){
                  this.ajaxJson({
                    url: '/dailyoffice/expressCompany/updateBillState',
                    data: {
                      id:this.expressList[0].bankDetailID,
                      state:'1'
                    },
                    call: (data) => {

                    }
                  })
                }
                let params = {
                  id: this.id,
                  tableName: 45
                }
                this.$dialog.confirm({
                  width: 300,
                  tipValue: '确定提交申请?',
                  btnValueOk: '确定',
                  alertImg: 'warn',
                  okCallBack: (data) => {
                    this.ajaxJson({
                      url: '/PersonOffice/getSubmitCatrgoryVue',
                      data: params,
                      call: (data) => {
                        this.category = data.message
                        if (this.category) {
                          /* 判断是否拿到category */
                          let params = {
                            id: this.id,
                            category: this.category,
                            tableName: 45,
                            isDetail: 0,
                            tableDetailName: -1
                          }
                          this.ajaxJson({
                            url: '/PersonOffice/approvalSubmitVue',
                            data: params,
                            call: (data) => {
                              if (data.type === 0) {
                                let params = {
                                  id: this.id,
                                  category: this.category,
                                }
                                this.ajaxJson({
                                  url: '/PersonOffice/planSubmitAfterOperat',
                                  data: params,
                                  call: (data) => {
                                    this.$dialog.setReturnValue(this.id) //向父级页面传递参数
                                    if (data.type === 2) {
                                      this.$dialog.alert({
                                        error: data.message,
                                        closeCallBack: () => {
                                          this.initPageData(true)
                                        }
                                      })
                                    } else {
                                      this.$dialog.alert({
                                        width: 320,
                                        tipValue: data.message,
                                        closeCallBack: () => {
                                          this.$dialog.setReturnValue(1)
                                          this.$dialog.close()
                                          this.initPageData(true)
                                        }
                                      })
                                    }
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
                        } else {
                          this.$dialog.alert({
                            tipValue: '没有获取到提交数据!',
                            alertImg: 'error'
                          })
                        }
                      }
                    })
                  }
                })
              }
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
    },
    save () {
      let money = parseFloat(this.money)
      let aa = true
      let bankList = true
      let depositList= true
      let workOrderVerify = true
      if(parseFloat(this.beforeMoney) < parseFloat(this.money)){
        aa = false
      }
      if(this.bankDetailList.length===0&&this.nature==='4'){
        bankList = false
      }else if(this.bankDetailList.length===0&&this.nature==='5'){
        bankList = false
      }else if(this.depositList.length===0&&this.nature==='7'){
        depositList = false
      }else if(this.payDepositList.length===0&&this.nature==='8'){
        depositList = false
      }else if(this.workOrderList.length===0&&this.nature==='10'){
        workOrderVerify = false
      }
      if(!depositList){
        this.$dialog.alert({
          width: '300',
          alertImg: 'error',
          tipValue: '请选择押金信息！！！！'
        })
      }
      if(!bankList){
        this.$dialog.alert({
          width: '300',
          alertImg: 'error',
          tipValue: '请选择收支明细信息！！！！'
        })
      }
      if(!aa){
        this.$dialog.alert({
          width: '300',
          alertImg: 'error',
          tipValue: '退款金额必须小于收款金额！！！'
        })
      }
      if(!workOrderVerify){
        this.$dialog.alert({
          width: '300',
          alertImg: 'error',
          tipValue: '工单推修信息不能为空！！！'
        })
      }
      let bb=true
      if(this.bankDetailList.length>0){
        this.bankDetailMoney()
        if (this.nature === '4'){
          if(parseInt(this.sumBankDetailMoney)<parseInt(this.money)){
            bb=false
          }
        }else{
          if(parseInt(this.sumBankDetailMoney)!==parseInt(this.money)){
            bb=false
          }
        }
      }
      if(!bb){
        this.$dialog.alert({
          width: '300',
          alertImg: 'error',
          tipValue: '收支明细总金额有误！！！'
        })
      }
      if (this.validator() && aa&&bankList&&bb&&depositList&&workOrderVerify) {
        let params = {
          id: this.id,
          unitID: this.unitID,
          otherUnitID: this.otherUnitID,
          otherUnit: this.otherUnit,
          isRelevance: this.isRelevance, // 是否关联
          ownerID: this.ownerID,
          name: this.useName, // 计划事件
          otherAccount: this.otherAccount, // 收款账号
          otherAccountID: this.otherAccountID, // 收款账号
          personID: this.personID, // 申请人姓名
          person: this.person, // 申请人姓名
          nature: this.nature, // 付款性质
          invoice: this.invoice, // 发票类型
          secondLevelInvoice: this.secondLevelInvoice, // 发票二级类型
          files: this.fileList, // 单据
          category: '3',
          ownerSys: this.ownerSys,
          subjectID: this.subjectID, // 事由ID
          subject: this.subject, // 事由
          useNum: this.useNum,
          lastDate: this.lastDate, // 最晚付款日期
          code: this.code, // 编号
          money: this.money, // 金额
          capitalMoney: this.capitalMoney, // 大写金额
          remark: this.remark,// 备注
          paymentInvoice: this.invoiceDetails,

          personOrUnit: this.personOrUnit,
          branchList: this.branchList,
          bankDetailList: this.bankDetailList,
          allocationList: this.allocationList,
          isChecks:this.isChecks,
          isAllocation: this.isAllocation,
          depositList:this.depositList,
          payDepositList:this.payDepositList,
          expressList:this.expressList,
          workOrderList:this.workOrderList,//工单推修信息
          // state:0,
        }
        this.ajaxJson({
          url: '/PersonOffice/paymentSave',
          data: params,
          loading: '0',
          call: (data) => {
            if (data.type === 0) {
              if(this.nature === '7'&&this.depositList.length>0){
                for (let i = 0; i < this.depositList.length; i++) {
                  this.ajaxJson({
                    url: '/dailyoffice/deposit/updateUseMoney',
                    data: {
                      id:this.depositList[i].bankDetailID,
                      money:accAdd(this.depositList[i].money,-this.depositList[i].useMoney)+''
                    },
                    call: (data) => {
                    }
                  })
                }
              }else if(this.nature === '8'&&this.payDepositList.length>0){
                this.ajaxJson({
                  url: '/dailyoffice/payDeposit/updateState',
                  data: {
                    id:this.payDepositList[0].bankDetailID,
                    state:'1'
                  },
                  call: (data) => {
                  }
                })
              }else if(this.nature === '9'&&this.expressList.length>0){
                this.ajaxJson({
                  url: '/dailyoffice/expressCompany/updateBillState',
                  data: {
                    id:this.expressList[0].bankDetailID,
                    state:'1'
                  },
                  call: (data) => {

                  }
                })
              }
              this.$dialog.setReturnValue(this.id) //向父级页面id值
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
    }
  },
  watch: {
    money () {
      this.capitalMoney = number2chinese(this.money)
      this.actualMoney = this.money
    },
    // bankDetailList(){
    //   if(this.nature === '4' || this.nature === '5'){
    //     let sumMoney = 0;
    //     for(let i in this.bankDetailList){
    //       let money = this.bankDetailList[i].money;
    //       sumMoney = accAdd( money,sumMoney)
    //     }
    //     this.money = sumMoney + ''
    //   }
    // },
  },
  computed:{
    getIsElectronicInvoice(){
      return this.isElectronicInvoice ? '1':''
    }
  },
}
</script>

<style scoped lang="less">
.tbTitSty,.fcTable{
  margin: 0 20px 0;
}
.contentBody{
  width: 985px;
  margin: 0;
 }
</style>
