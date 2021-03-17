<template>
  <div class="f_main">
    <yhm-schedule ref="schedule"  :config="scheduleConfig">
    </yhm-schedule>
    <yhm-formbody v-show="showSchedule(scheduleConfig,0)">
      <template #title >基本信息</template>
      <template #control>
        <yhm-form-date placeholder=""  title="签收日期" v-if="isSendTime" subtitle="" :value="sendTime" id="sendTime" rule="R0000"></yhm-form-date>
        <yhm-form-date placeholder=""  title="寄出日期" v-else  subtitle="" :value="sendTime" id="sendTime" rule="R0000"></yhm-form-date>
        <yhm-form-radio title="信函分类"  @call="letterClassificationEvent()" :select-list="letterClassificationList" :value="letterClassification" id="letterClassification" ></yhm-form-radio>
        <yhm-form-radio title="信函类别	" v-if="false" @call="letterTypeEvent()" :select-list="letterTypeList" :value="letterType" id="letterType" ></yhm-form-radio>
        <yhm-form-radio title="信函类型" @call="courierEvent()" width="1" :select-list="courierCompanyList" :value="courierCompany" id="courierCompany" rule="R0000"></yhm-form-radio>
        <yhm-form-radio title="是否支持"  v-show="isLetter" @call="orderOnlineEvent()" subtitle="在线下单" :select-list="orderOnlineList" :value="orderOnline" id="orderOnline" ></yhm-form-radio>
        <yhm-form-text placeholder=""  :no-edit="isLetterEdit" title="信函单号" subtitle="" :value="letterNumber" id="letterNumber"></yhm-form-text>
        <yhm-form-text placeholder=""  v-show="isLetter" title="查单网址" subtitle="" no-edit="1"  :value="inquiryURL" id="inquiryURL"></yhm-form-text>
        <yhm-form-text placeholder=""  v-show="isLetter" title="查单电话" subtitle="" no-edit="1" :value="inquiryPhone" id="inquiryPhone" ></yhm-form-text>
      </template>
    </yhm-formbody>

    <yhm-formbody v-show="showSchedule(scheduleConfig,1)">
      <template #title>寄件人信息</template>
      <template #control>
        <yhm-form-text placeholder="直接录入或者点击后面图标选择公司"  title="公司名称" subtitle="" :value="senderUnitID" id="senderUnitID"  rule="R0000">
          <div class="formBoxIcon" @click="senderUnitClick">
            <svg t="1602226869435"  class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2092" width="30" height="30" style="margin: auto;"><path d="M502.2 393.6m-163 0a163 163 0 1 0 326 0 163 163 0 1 0-326 0Z" fill="#AED7FF" p-id="2093"></path><path d="M197.5 363.4c0.1-1.4 0.2-2.7 0.3-4.1 12-147.5 137.4-263.1 285.6-263.1 151.5 0 275.8 118.2 285.9 267.2h20c-10-160-143.3-287.2-305.9-287.2-158.5 0-292.7 123.6-305.5 281.4-0.2 1.9-0.3 3.8-0.4 5.7h20zM768.1 414.9c-16 142.9-137.6 254.4-284.7 254.4s-268.6-109-284.7-254.4h-20.1c16.3 156.6 146.7 274.4 304.8 274.4 158.2 0 288.7-120.4 304.8-274.4h-20.1z" fill="#108EE9" p-id="2094"></path><path d="M483.4 160.3c-122.7 0-222.5 99.8-222.5 222.5s99.8 222.5 222.5 222.5 222.5-99.8 222.5-222.5c-0.1-122.7-99.9-222.5-222.5-222.5z m0 407.4c-102.1 0-184.9-82.8-184.9-184.9 0-102.1 82.8-184.9 184.9-184.9s184.9 82.8 184.9 184.9c0 102.1-82.8 184.9-184.9 184.9z" fill="#108EE9" p-id="2095"></path><path d="M483.4 510.7c-70.5 0-127.9-57.4-127.9-127.9s57.4-127.9 127.9-127.9 127.9 57.4 127.9 127.9-57.4 127.9-127.9 127.9z m0-209.3c-44.9 0-81.4 36.5-81.4 81.4s36.5 81.4 81.4 81.4c44.9 0 81.4-36.5 81.4-81.4s-36.6-81.4-81.4-81.4z" fill="#108EE9" p-id="2096"></path><path d="M433.2 563.8c0-51.5-0.2-103.1 0.1-154.6 0.2-36.1 18-57 48.2-57.2 32.1-0.2 54 22.6 54.2 57.8 0.4 57.4 0 114.8 0.2 172.2 0.1 30.5 7 38 39.5 40.9 65.3 5.7 130.6 11.1 195.9 16 41.3 3.1 57.7 20.5 49.6 58.2-16.4 76.4-34.4 152.6-51.1 228.9-4.5 20.8-18.2 30.5-39.7 31.4-29.5 1.3-59.1 2-88.7 2.1-83.2 0.3-166.4 0.2-249.6 0-32.3 0-42.7-6.7-52.8-34.7-27.9-77.3-55.5-154.7-83.2-232-8.1-22.5 4-47.3 27.4-56 22.2-8.2 52.7 2.8 62.4 24.2 11 24.4 21 49.3 30.1 74.3 5.4 14.8 13.6 26.7 31.6 24 19.2-3 26.3-16.8 26.2-34.4-0.5-53.7-0.4-107.4-0.3-161.1z" fill="#1195FE" p-id="2097"></path></svg>
          </div>
        </yhm-form-text>
        <yhm-form-select placeholder="直接录入或者点击后面图标选择"  @click="agentIDClick" v-show="isLetter" title="经办人" subtitle="" :value="agentName" id="agentName" rule="R0000">
          <!--<div class="formBoxIcon" @click="agentIDClick">-->
            <!--<svg t="1602226869435"  class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2092" width="30" height="30" style="margin: auto;"><path d="M502.2 393.6m-163 0a163 163 0 1 0 326 0 163 163 0 1 0-326 0Z" fill="#AED7FF" p-id="2093"></path><path d="M197.5 363.4c0.1-1.4 0.2-2.7 0.3-4.1 12-147.5 137.4-263.1 285.6-263.1 151.5 0 275.8 118.2 285.9 267.2h20c-10-160-143.3-287.2-305.9-287.2-158.5 0-292.7 123.6-305.5 281.4-0.2 1.9-0.3 3.8-0.4 5.7h20zM768.1 414.9c-16 142.9-137.6 254.4-284.7 254.4s-268.6-109-284.7-254.4h-20.1c16.3 156.6 146.7 274.4 304.8 274.4 158.2 0 288.7-120.4 304.8-274.4h-20.1z" fill="#108EE9" p-id="2094"></path><path d="M483.4 160.3c-122.7 0-222.5 99.8-222.5 222.5s99.8 222.5 222.5 222.5 222.5-99.8 222.5-222.5c-0.1-122.7-99.9-222.5-222.5-222.5z m0 407.4c-102.1 0-184.9-82.8-184.9-184.9 0-102.1 82.8-184.9 184.9-184.9s184.9 82.8 184.9 184.9c0 102.1-82.8 184.9-184.9 184.9z" fill="#108EE9" p-id="2095"></path><path d="M483.4 510.7c-70.5 0-127.9-57.4-127.9-127.9s57.4-127.9 127.9-127.9 127.9 57.4 127.9 127.9-57.4 127.9-127.9 127.9z m0-209.3c-44.9 0-81.4 36.5-81.4 81.4s36.5 81.4 81.4 81.4c44.9 0 81.4-36.5 81.4-81.4s-36.6-81.4-81.4-81.4z" fill="#108EE9" p-id="2096"></path><path d="M433.2 563.8c0-51.5-0.2-103.1 0.1-154.6 0.2-36.1 18-57 48.2-57.2 32.1-0.2 54 22.6 54.2 57.8 0.4 57.4 0 114.8 0.2 172.2 0.1 30.5 7 38 39.5 40.9 65.3 5.7 130.6 11.1 195.9 16 41.3 3.1 57.7 20.5 49.6 58.2-16.4 76.4-34.4 152.6-51.1 228.9-4.5 20.8-18.2 30.5-39.7 31.4-29.5 1.3-59.1 2-88.7 2.1-83.2 0.3-166.4 0.2-249.6 0-32.3 0-42.7-6.7-52.8-34.7-27.9-77.3-55.5-154.7-83.2-232-8.1-22.5 4-47.3 27.4-56 22.2-8.2 52.7 2.8 62.4 24.2 11 24.4 21 49.3 30.1 74.3 5.4 14.8 13.6 26.7 31.6 24 19.2-3 26.3-16.8 26.2-34.4-0.5-53.7-0.4-107.4-0.3-161.1z" fill="#1195FE" p-id="2097"></path></svg>-->
          <!--</div>-->
        </yhm-form-select>
        <yhm-form-select default-txt="+请选择相关国家、省份、城市、区县"  @click="senderAddressClick" title="地址区域" subtitle="" :value="senderAddressName" id="senderAddressName"  rule="R0000"></yhm-form-select>
        <yhm-form-textarea placeholder="请输入详情地址，包含省、市、区、街道等"  title="地址详情" subtitle="" :value="senderAddress" id="senderAddress"  rule="R0000"></yhm-form-textarea>
        <yhm-form-text placeholder="直接录入或者双击选择"  title="寄件人" subtitle="" :value="senderPersonName" id="senderPersonName"  rule="R0000">
          <div class="formBoxIcon" @click="senderPersonClick">
            <svg t="1602226869435"  class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2092" width="30" height="30" style="margin: auto;"><path d="M502.2 393.6m-163 0a163 163 0 1 0 326 0 163 163 0 1 0-326 0Z" fill="#AED7FF" p-id="2093"></path><path d="M197.5 363.4c0.1-1.4 0.2-2.7 0.3-4.1 12-147.5 137.4-263.1 285.6-263.1 151.5 0 275.8 118.2 285.9 267.2h20c-10-160-143.3-287.2-305.9-287.2-158.5 0-292.7 123.6-305.5 281.4-0.2 1.9-0.3 3.8-0.4 5.7h20zM768.1 414.9c-16 142.9-137.6 254.4-284.7 254.4s-268.6-109-284.7-254.4h-20.1c16.3 156.6 146.7 274.4 304.8 274.4 158.2 0 288.7-120.4 304.8-274.4h-20.1z" fill="#108EE9" p-id="2094"></path><path d="M483.4 160.3c-122.7 0-222.5 99.8-222.5 222.5s99.8 222.5 222.5 222.5 222.5-99.8 222.5-222.5c-0.1-122.7-99.9-222.5-222.5-222.5z m0 407.4c-102.1 0-184.9-82.8-184.9-184.9 0-102.1 82.8-184.9 184.9-184.9s184.9 82.8 184.9 184.9c0 102.1-82.8 184.9-184.9 184.9z" fill="#108EE9" p-id="2095"></path><path d="M483.4 510.7c-70.5 0-127.9-57.4-127.9-127.9s57.4-127.9 127.9-127.9 127.9 57.4 127.9 127.9-57.4 127.9-127.9 127.9z m0-209.3c-44.9 0-81.4 36.5-81.4 81.4s36.5 81.4 81.4 81.4c44.9 0 81.4-36.5 81.4-81.4s-36.6-81.4-81.4-81.4z" fill="#108EE9" p-id="2096"></path><path d="M433.2 563.8c0-51.5-0.2-103.1 0.1-154.6 0.2-36.1 18-57 48.2-57.2 32.1-0.2 54 22.6 54.2 57.8 0.4 57.4 0 114.8 0.2 172.2 0.1 30.5 7 38 39.5 40.9 65.3 5.7 130.6 11.1 195.9 16 41.3 3.1 57.7 20.5 49.6 58.2-16.4 76.4-34.4 152.6-51.1 228.9-4.5 20.8-18.2 30.5-39.7 31.4-29.5 1.3-59.1 2-88.7 2.1-83.2 0.3-166.4 0.2-249.6 0-32.3 0-42.7-6.7-52.8-34.7-27.9-77.3-55.5-154.7-83.2-232-8.1-22.5 4-47.3 27.4-56 22.2-8.2 52.7 2.8 62.4 24.2 11 24.4 21 49.3 30.1 74.3 5.4 14.8 13.6 26.7 31.6 24 19.2-3 26.3-16.8 26.2-34.4-0.5-53.7-0.4-107.4-0.3-161.1z" fill="#1195FE" p-id="2097"></path></svg>
          </div>
        </yhm-form-text>
        <yhm-form-text placeholder="请输入电话号码"  title="电话" subtitle="" :value="senderPhone" id="senderPhone"></yhm-form-text>
        <yhm-form-text placeholder="邮政编码"  title="编码" no-edit="1" subtitle="" :value="senderPostcode" id="senderPostcode"></yhm-form-text>
        <yhm-form-text placeholder="11位手机号码"  title="手机号" subtitle="" :value="senderCellPhone" id="senderCellPhone" rule="R4000"></yhm-form-text>
        <yhm-form-select default-txt="原寄地" title="原寄地"  v-show="isLetter"  @click="senderOriginClick" :value="senderOrigin" id="senderOrigin" rule="R0000"></yhm-form-select>
        <yhm-form-text placeholder=""  v-show="isLetter"  no-edit="1" title="原寄地代码" subtitle="" :value="senderOriginCode" id="senderOriginCode"></yhm-form-text>
      </template>
    </yhm-formbody>

    <yhm-formbody  v-show="showSchedule(scheduleConfig,2)">
      <template #title>收件人信息</template>
      <template #control>
        <yhm-form-text placeholder="直接录入或者点击后面图标选择公司"  title="公司名称" subtitle="" :value="recipientUnitID" id="recipientUnitID">
          <div class="formBoxIcon" @click="recipientUnitClick">
            <svg t="1602226869435"  class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2092" width="30" height="30" style="margin: auto;"><path d="M502.2 393.6m-163 0a163 163 0 1 0 326 0 163 163 0 1 0-326 0Z" fill="#AED7FF" p-id="2093"></path><path d="M197.5 363.4c0.1-1.4 0.2-2.7 0.3-4.1 12-147.5 137.4-263.1 285.6-263.1 151.5 0 275.8 118.2 285.9 267.2h20c-10-160-143.3-287.2-305.9-287.2-158.5 0-292.7 123.6-305.5 281.4-0.2 1.9-0.3 3.8-0.4 5.7h20zM768.1 414.9c-16 142.9-137.6 254.4-284.7 254.4s-268.6-109-284.7-254.4h-20.1c16.3 156.6 146.7 274.4 304.8 274.4 158.2 0 288.7-120.4 304.8-274.4h-20.1z" fill="#108EE9" p-id="2094"></path><path d="M483.4 160.3c-122.7 0-222.5 99.8-222.5 222.5s99.8 222.5 222.5 222.5 222.5-99.8 222.5-222.5c-0.1-122.7-99.9-222.5-222.5-222.5z m0 407.4c-102.1 0-184.9-82.8-184.9-184.9 0-102.1 82.8-184.9 184.9-184.9s184.9 82.8 184.9 184.9c0 102.1-82.8 184.9-184.9 184.9z" fill="#108EE9" p-id="2095"></path><path d="M483.4 510.7c-70.5 0-127.9-57.4-127.9-127.9s57.4-127.9 127.9-127.9 127.9 57.4 127.9 127.9-57.4 127.9-127.9 127.9z m0-209.3c-44.9 0-81.4 36.5-81.4 81.4s36.5 81.4 81.4 81.4c44.9 0 81.4-36.5 81.4-81.4s-36.6-81.4-81.4-81.4z" fill="#108EE9" p-id="2096"></path><path d="M433.2 563.8c0-51.5-0.2-103.1 0.1-154.6 0.2-36.1 18-57 48.2-57.2 32.1-0.2 54 22.6 54.2 57.8 0.4 57.4 0 114.8 0.2 172.2 0.1 30.5 7 38 39.5 40.9 65.3 5.7 130.6 11.1 195.9 16 41.3 3.1 57.7 20.5 49.6 58.2-16.4 76.4-34.4 152.6-51.1 228.9-4.5 20.8-18.2 30.5-39.7 31.4-29.5 1.3-59.1 2-88.7 2.1-83.2 0.3-166.4 0.2-249.6 0-32.3 0-42.7-6.7-52.8-34.7-27.9-77.3-55.5-154.7-83.2-232-8.1-22.5 4-47.3 27.4-56 22.2-8.2 52.7 2.8 62.4 24.2 11 24.4 21 49.3 30.1 74.3 5.4 14.8 13.6 26.7 31.6 24 19.2-3 26.3-16.8 26.2-34.4-0.5-53.7-0.4-107.4-0.3-161.1z" fill="#1195FE" p-id="2097"></path></svg>
          </div>
        </yhm-form-text>
        <yhm-form-select default-txt="+请选择相关国家、省份、城市、区县" title="地址区域" tip="value"   @click="recipientAddressClick" :value="recipientAddressName" id="recipientAddressName" rule="R0000"></yhm-form-select>
        <yhm-form-textarea  placeholder="请输入详情地址，包含省、市、区、街道等"  title="地址" subtitle="" :value="recipientAddress" id="recipientAddress"  rule="R0000"></yhm-form-textarea>
        <!--<yhm-form-text placeholder="直接录入或者点击后面图标选择"  title="收件人" subtitle="" @blur="personBlur()" @repeatverify="doesClick"  :value="recipientPersonName" id="recipientPersonName"  rule="R0000">-->
        <yhm-form-text placeholder="直接录入或者点击后面图标选择"  title="收件人" subtitle="" @blur="personBlur()"   :value="recipientPersonName" id="recipientPersonName"  rule="R0000">
          <div class="formBoxIcon" @click="recipientClick">
            <svg t="1602226869435"  class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2092" width="30" height="30" style="margin: auto;"><path d="M502.2 393.6m-163 0a163 163 0 1 0 326 0 163 163 0 1 0-326 0Z" fill="#AED7FF" p-id="2093"></path><path d="M197.5 363.4c0.1-1.4 0.2-2.7 0.3-4.1 12-147.5 137.4-263.1 285.6-263.1 151.5 0 275.8 118.2 285.9 267.2h20c-10-160-143.3-287.2-305.9-287.2-158.5 0-292.7 123.6-305.5 281.4-0.2 1.9-0.3 3.8-0.4 5.7h20zM768.1 414.9c-16 142.9-137.6 254.4-284.7 254.4s-268.6-109-284.7-254.4h-20.1c16.3 156.6 146.7 274.4 304.8 274.4 158.2 0 288.7-120.4 304.8-274.4h-20.1z" fill="#108EE9" p-id="2094"></path><path d="M483.4 160.3c-122.7 0-222.5 99.8-222.5 222.5s99.8 222.5 222.5 222.5 222.5-99.8 222.5-222.5c-0.1-122.7-99.9-222.5-222.5-222.5z m0 407.4c-102.1 0-184.9-82.8-184.9-184.9 0-102.1 82.8-184.9 184.9-184.9s184.9 82.8 184.9 184.9c0 102.1-82.8 184.9-184.9 184.9z" fill="#108EE9" p-id="2095"></path><path d="M483.4 510.7c-70.5 0-127.9-57.4-127.9-127.9s57.4-127.9 127.9-127.9 127.9 57.4 127.9 127.9-57.4 127.9-127.9 127.9z m0-209.3c-44.9 0-81.4 36.5-81.4 81.4s36.5 81.4 81.4 81.4c44.9 0 81.4-36.5 81.4-81.4s-36.6-81.4-81.4-81.4z" fill="#108EE9" p-id="2096"></path><path d="M433.2 563.8c0-51.5-0.2-103.1 0.1-154.6 0.2-36.1 18-57 48.2-57.2 32.1-0.2 54 22.6 54.2 57.8 0.4 57.4 0 114.8 0.2 172.2 0.1 30.5 7 38 39.5 40.9 65.3 5.7 130.6 11.1 195.9 16 41.3 3.1 57.7 20.5 49.6 58.2-16.4 76.4-34.4 152.6-51.1 228.9-4.5 20.8-18.2 30.5-39.7 31.4-29.5 1.3-59.1 2-88.7 2.1-83.2 0.3-166.4 0.2-249.6 0-32.3 0-42.7-6.7-52.8-34.7-27.9-77.3-55.5-154.7-83.2-232-8.1-22.5 4-47.3 27.4-56 22.2-8.2 52.7 2.8 62.4 24.2 11 24.4 21 49.3 30.1 74.3 5.4 14.8 13.6 26.7 31.6 24 19.2-3 26.3-16.8 26.2-34.4-0.5-53.7-0.4-107.4-0.3-161.1z" fill="#1195FE" p-id="2097"></path></svg>
          </div>
        </yhm-form-text>
        <yhm-form-text placeholder="请输入电话号码"  title="电话" subtitle="" :value="recipientPhone" id="recipientPhone"></yhm-form-text>
        <yhm-form-text placeholder="邮政编码" no-edit="1" title="编码" subtitle="" :value="recipientPostcode" id="recipientPostcode"></yhm-form-text>
        <yhm-form-text placeholder="11位手机号码"  title="手机号" subtitle="" :value="recipientCellPhone" id="recipientCellPhone"></yhm-form-text>
        <yhm-form-select default-txt="目的地" title="目的地"  v-show="isLetter"   @click="recipientDestinationClick" :value="recipientDestination" id="recipientDestination" rule="R0000"></yhm-form-select>
        <yhm-form-text placeholder=""  v-show="isLetter"  no-edit="1" title="目的地代码" subtitle="" :value="recipientCode" id="recipientCode"></yhm-form-text>
      </template>
    </yhm-formbody>

    <yhm-formbody v-show="showSchedule(scheduleConfig,3)">
      <template #title>收寄物信息</template>
      <template #control>
        <yhm-form-radio title="收寄物类型" width="1" :select-list="receiptTypeList" @call="receiptTypeCall()" :value="receiptType" id="receiptType" ></yhm-form-radio>
        <yhm-form-text placeholder=""  v-if="isReceiptType" title="收寄物内容" subtitle="" :value="receiptContent" id="receiptContent"></yhm-form-text>
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
        <yhm-form-text placeholder="" :no-edit="isQuantity"  title="数量" subtitle="" :value="quantity" id="quantity" rule="R3000"></yhm-form-text>
      </template>
    </yhm-formbody>

    <yhm-formbody v-show="showSchedule(scheduleConfig,4)">
      <template #title>费用及支付信息</template>
      <template #control>
        <yhm-form-radio title="结算状态	" v-if="isJieSuan" :select-list="settlementStatusList" @call="settlementCall()" :value="settlementStatus" id="settlementStatus" ></yhm-form-radio>
        <yhm-form-zh-text-two tip-before="value" v-if="isSettlement"   :before="billingNumber" before-id="billingNumber" :after="billingWeight" after-id="billingWeight"  title="计费件数" subtitle=""  after-title="重量(KG)" after-width="140"></yhm-form-zh-text-two>
        <yhm-form-text placeholder=""  title="费用"  v-if="isSettlement"  subtitle="" :value="cost" id="cost" ></yhm-form-text>
        <yhm-form-radio title="结算方式	" @call="methodCall()" v-if="isFangShi"  :select-list="settlementMethodList" :value="settlementMethod" id="settlementMethod" ></yhm-form-radio>
        <yhm-form-radio title="结算方式	" @call="methodCall()" v-if="isFangShi2"  :select-list="settlementMethod2List" :value="settlementMethod" id="settlementMethod" ></yhm-form-radio>
        <yhm-form-radio title="是否报销	" @call="reimbursementCall()" v-if="isMethodCall" :select-list="reimbursementList" :value="reimbursement" id="reimbursement" ></yhm-form-radio>
        <yhm-form-radio title="报销状态	" no-edit="1" v-if="isMethodCall" :select-list="reimbursementStatusList" :value="reimbursementStatus" id="reimbursementStatus" ></yhm-form-radio>
        <yhm-form-select placeholder=""  @click="storedCall()" v-if="istored"   title="储值卡号" subtitle="" :value="storedNumberName" id="storedNumberName" rule="R0000"></yhm-form-select>
        <yhm-form-select placeholder=""  @click="monthlyAccountCall()" v-if="ismonthly"  title="月结账户" subtitle="" :value="monthlyAccountName" id="monthlyAccountName" rule="R0000"></yhm-form-select>
        <yhm-form-text placeholder=""  v-if="istored"  title="本次扣除后 " subtitle="剩余金额" :value="useMoney" id="useMoney"></yhm-form-text>
        <yhm-form-text placeholder=""  v-if="ismonthly" title="连同本次 " subtitle="累计金额	" :value="accumulationMoney" id="accumulationMoney"></yhm-form-text>
        <yhm-form-radio title="付款状态	" :no-edit="true" :select-list="paymentStatusList" :value="paymentStatus" id="paymentStatus" ></yhm-form-radio>
      </template>
    </yhm-formbody>

    <yhm-formbody v-show="showSchedule(scheduleConfig,5)">
      <template #title>收寄确认信息</template>
      <template #control>
        <yhm-form-radio title="签收状态	" @call="signClick()" v-if="isSign" :select-list="signStatusList" :value="signStatus" id="signStatus" ></yhm-form-radio>
        <yhm-form-select placeholder=""  v-if="isSignPerson" @click="signPersonClick()" title="签收人员 " subtitle="" :value="signPerson	" id="signPerson" rule="R0000"></yhm-form-select>
        <yhm-form-date placeholder=""  v-if="isSigimg" title="签收日期 " subtitle="" :value="signTime	" id="signTime"  position="t"></yhm-form-date>
        <yhm-form-select placeholder=""  v-if="isSigimg" @click="confirmPersonClick()" title="确认人" subtitle="" :value="confirmPerson" id="confirmPerson" rule="R0000"></yhm-form-select>
        <yhm-form-date placeholder=""  v-if="isSigimg" title="确认日期 " subtitle="	" :value="confirmTime" id="confirmTime"  position="t"></yhm-form-date>

      </template>
    </yhm-formbody>
    <!--{{scheduleConfig}}-->
    <yhm-formoperate :createName="createName" :insertDate="insertDate" :updateName="updateName" :updateDate="updateDate">
      <template #btn>
        <!--<yhm-commonbutton value="保存" icon="btnSave" :flicker="true" @call="save()"></yhm-commonbutton>-->
        <yhm-commonbutton v-if="isPrev" style="margin-right: 50px" value="上一步" icon="icon-last-year"  @call="prev()"></yhm-commonbutton>
        <yhm-commonbutton  v-if="isNext" value="下一步" icon="icon-next-year" :flicker="true" @call="next()"></yhm-commonbutton>
        <yhm-commonbutton v-if="step==7" value="终止" icon="icon-disable" :flicker="true" @call="stop()"></yhm-commonbutton>
      </template>
    </yhm-formoperate>
  </div>
</template>

<script>
  import { formmixin } from '@/assets/form.js'
  import { accMul, accAdd, guid, formatDate, number2chinese,formatTime ,formatPhone, formatIdNo,} from '@/assets/common.js'
  export default {
    name: 'expressDeliveryForm',
    mixins: [formmixin],
    data(){
      return{
        /*步骤条配置信息*/
        scheduleConfig:{
          list:[
            {name:'基本信息',show:true},
            {name:'寄件人信息',show:true},
            {name:'收件人信息',show:true},
            {name:'收寄物内容信息',show:true},
            {name:'费用及支付信息',show:true},
            {name:'收寄确认信息',show:true},
            {name:'已完成',show:true},
          ],
          current:0,          //当前步骤
          reject:false,       //是否驳回状态
          event:true,          //步骤条能不能点击
          isFinish:false,     //当前步骤是否完成（不能修改）
          select:-1,           //当流程结束后选择的节点（不能修改），
          autoAddFinish:false  //自动添加完成步骤
        },
        id:'',
        letterClassificationList:[], // 信函分类
        letterClassification:'',
        letterTypeList:[], //信函类别
        letterType:'',
        orderOnlineList:[], //
        orderOnline:'',
        courierCompanyList:[], //信函类型
        courierCompany:'',
        receiptTypeList:[],//收寄物类型
        receiptType:'',
        settlementStatusList:[],//结算状态
        settlementStatus:'',
        settlementMethodList:[],//结算方式
        settlementMethod:'',
        settlementMethod2List:[],
        settlementMethod2:'',
        reimbursementList:[], //是否报销
        reimbursement:'',
        paymentStatusList:[],//付款状态
        paymentStatus:'',
        signStatusList:[],//签收状态
        signStatus:'',
        reimbursementStatusList:[],//报销状态
        reimbursementStatus:'',
        sendTime:formatDate( new Date((new Date()).getTime())),//签收日期
        letterNumber:'',//信函单号
        inquiryURL:'',//查单网址
        inquiryPhone:'',//查单电话
        senderUnitID:'',//寄件人信息公司名称
        agentID:'',//寄件人信息经办人
        agentName:'',
        senderAddress:'',//寄件人信息地址
        senderPersonID:'',//寄件人信息寄件人
        senderPersonName:'',
        senderPhone:'',//寄件人信息电话
        senderPostcode:'',//寄件人信息编码
        senderCellPhone:'',//寄件人信息手机号
        senderOrigin:'',//寄件人信息原寄地
        senderOriginCode:'',//寄件人信息原寄地代码
        recipientUnitID:'',//收件人信息公司名称
        recipientAddress:'',//收件人信息地址
        recipientPersonID:'',//收件人信息收件人
        recipientPersonName:'',
        recipientPhone:'',//收件人信息电话
        recipientPostcode:'',//收件人信息编码
        recipientCellPhone:'',//收件人信息手机号
        recipientDestination:'',//收件人信息目的地
        recipientCode:'',//收件人信息目的地代码
        receiptContent:'',//收寄物内容
        settlementStatus:'',//收寄物信息数量
        quantity:'',
        billingNumber:'',//费用及支付信息数量
        billingWeight:'0.00',//费用及支付信息重量
        cost:'0',//费用及支付信息费用
        storedNumber:'',//储值卡号
        useMoney:'',//本次扣除后剩余金额
        monthlyAccount:'',//月结账户
        accumulationMoney:'',//连同本次累计金额
        signTime:formatDate( new Date((new Date()).getTime())),//签收日期
        confirmPersonID:'',//确认人
        confirmPerson:'',
        confirmTime:formatDate( new Date((new Date()).getTime())),//确认日期
        signPersonID:'',//签收人
        signPerson:'',
        senderAddressID:'',
        senderAddressName:'',
        defaultAddressCN:'',
        defaultTrl:'',
        defaultUnitName:'',
        type:'0',//0是添加 1是修改
        isBasic:true,//基本信息默认显示
        isSend:false,//寄件人信息模块
        isRecipient:false,//收件人信息模块
        isReceipt:false,//收寄物内容信息模块
        isSettle:false,//费用及支付信息
        isSign:false, //收寄确认信息
        isSendTime:true,
        isLetter:false,
        isLetterEdit:'',

        isSettlement:false,
        isFangShi:false,
        isFangShi2:false,
        isMethodCall:false,
        istored:false,
        ismonthly:false,
        isJieSuan:true,


        recipientAddressName:'',
        detailsList:[],
        isReceiptType:true,
        name:'',
        number:'',
        detailNumber:'',
        remark:'',

        isQuantity:'',//收寄物内容数量默认可以输入

        isPrev:false,   //默认上一步不显示
        isNext:true ,//默认下一步显示 完成不显示
        copy:'',
        isSign:false,
        isSignPerson:true,
        isSigimg:true,
        GlobalState:'0',
        step:'',
      }
    },
    methods:{
      personBlur(){
        // let params={
        //   id:this.recipientPersonName
        // }
        // this.ajaxJson({
        //   url: '/dailyoffice/expressDelivery/isPersonNameExist',
        //   data: params,
        //   call: (data) => {
        //
        //
        //   }
        // })
        if (this.recipientPersonName!=''){
          this.$dialog.OpenWindow({
            width: 950,
            height: 692,
            url: '/selectPerson?category=1&commonClientUse=1&personName='+this.recipientPersonName+'&parameter=1',
            title: '选择收件人',
            closeCallBack: (data) => {
              // console.log(data)
              if (data) {
                this.recipientPersonID=data.id
                this.recipientPersonName=data.name
                this.recipientCellPhone=data.phone
                this.doesClick()
              }else {
                this.recipientPersonName=''
              }
            }
          })
        }
      },
      doesClick(){
        if (this.GlobalState==0 && this.recipientPersonID !=''){
          let params={
            // sendTime:this.sendTime,
            // recipientUnitID:this.recipientUnitID,
            recipientPersonID:this.recipientPersonID   //未取件的快递 收件人重复 进行合并
          }
          this.ajaxJson({
            url: '/dailyoffice/expressDelivery/doesItExist',
            data: params,
            call: (data) => {
              if (data==0){
              } else {
                this.$dialog.confirm({
                  width: 300,
                  tipValue: '已存在给'+this.recipientPersonName+'未取件的信息,是否合并发送',
                  btnValueOk: '确定',
                  alertImg: 'warn',
                  okCallBack: (data) => {
                    this.$dialog.OpenWindow({
                      width: 1050,
                      height: 692,
                      url: '/selectDoes?sendTime='+this.sendTime+'&recipientUnitID='+this.recipientUnitID+'&recipientPersonID='+this.recipientPersonID,
                      title: '选择和哪条数据合并',
                      closeCallBack: (data) => {
                        if(data){
                          this.$dialog.OpenWindow({
                            width: 1050,
                            height: 492,
                            url: '/expressDeliveryItems?ownerID='+data.id+'&senderPersonID='+this.senderPersonID,
                            title: '添加数据',
                            closeCallBack: (data) => {
                              if (data) {
                                let paramTime = {
                                  id: this.id
                                }
                                this.ajaxJson({
                                  url: '/dailyoffice/expressDelivery/del',
                                  data: paramTime,
                                  call: (data) => {
                                    if (data.type === 0) {
                                      this.$dialog.close()
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
                          })
                        }
                      }
                    })
                  },
                  cancelCallBack: ()=>{
                    this.GlobalState=1
                  },
                })
              }
            }
          })
        }
        // else {
        //   return
        // }

      },
      signClick(){

        if (this.signStatus==1){
          this.isSignPerson=false
          this.isSigimg=false
        } else {
          this.isSigimg=true
        }
      },
      confirmPersonClick(){
        this.$dialog.OpenWindow({
          width: 950,
          height: 692,
          url: '/selectPerson?category=1',
          title: '选择确认人',
          closeCallBack: (data) => {
            if (data) {
              this.confirmPerson = data.name
              this.confirmPersonID = data.id
              if (this.confirmPersonID==''){
                this.updatainsuredSelectPerson(data.id)
              }
            }
          }
        })
      },
      signPersonClick(){
        this.$dialog.OpenWindow({
          width: 950,
          height: 692,
          url: '/selectPerson?category=1',
          title: '选择签收人',
          closeCallBack: (data) => {
            if (data) {
              this.signPerson = data.name
              this.signPersonID = data.id
              if (this.signPersonID==''){
                this.updatainsuredSelectPerson(data.id)
              }
            }
          }
        })
      },
      monthlyAccountCall(){
        this.$dialog.OpenWindow({
          width: '1050',
          height: '750',
          url: '/selectMonthlyAccount?id='+this.courierCompany,
          title: '查看快递信息',
          closeCallBack: (data) => {
            this.monthlyAccountName=data.monthlyNumbering
            this.monthlyAccount=data.id
            this.accumulationMoney=accAdd(data.monthlypendingSettlementMoney,this.cost)
          }
        })
      },
      storedCall(){
        this.$dialog.OpenWindow({
          width: '1050',
          height: '750',
          url: '/selectStoredCard?id='+this.courierCompany,
          title: '添加储值卡信息',
          closeCallBack: (data) => {
            this.storedNumberName=data.numbering
            this.storedNumber=data.id
            this.useMoney=accAdd(data.currentMoney,this.cost*-1)
          }
        })
      },
      //上一步
      prev(){
        this.$refs.schedule.prev()
        if(this.scheduleConfig.current==0){
          this.isPrev=false
        }
        if (this.scheduleConfig.current!=6){
          this.isNext=true
        }
      },
      //下一步
      next(){

        if (this.validator()) {
          this.$refs.schedule.next()
          if(this.scheduleConfig.current!=0){
            this.isPrev=true

          }
          if (this.scheduleConfig.isFinish){
            this.isNext=false
            this.isPrev=false
          }else  if(!this.scheduleConfig.isFinish){
            this.isNext=true
            this.isPrev=true
          }

          if (this.scheduleConfig.current==1){ //当第一步添加信息 为全部添加
            if (this.letterClassification==0){
              this.signStatus=0
            } else {
              this.signStatus=1
            }

            let params = {
              id: this.id,
              sendTime:this.sendTime,
              letterClassification:this.letterClassification,
              letterType:this.letterType,
              courierCompanyID:this.courierCompany,
              orderOnline:this.orderOnline,
              letterNumber:this.letterNumber,

              senderUnitID:this.senderUnitID,
              agentID:this.agentID,
              senderAddressID:this.senderAddressID,
              senderAddress:this.senderAddress,
              senderPersonID:this.senderPersonID,
              senderPhone:this.senderPhone,
              senderPostcode:this.senderPostcode,
              senderCellPhone:this.senderCellPhone,
              senderOrigin:this.senderOrigin,
              senderOriginCode:this.senderOriginCode,
              recipientUnitID:this.recipientUnitID,
              recipientAddressID:this.recipientAddressID,
              recipientAddress:this.recipientAddress,
              recipientPersonID:this.recipientPersonID,
              recipientPhone:this.recipientPhone,
              recipientPostcode:this.recipientPostcode,
              recipientCellPhone:this.recipientCellPhone,
              recipientDestination:this.recipientDestination,
              recipientCode:this.recipientCode,
              receiptType:this.receiptType,
              receiptContent:this.receiptContent,
              settlementStatus:this.settlementStatus,
              billingNumber:this.billingNumber,
              billingWeight:this.billingWeight,
              cost:this.cost,
              settlementMethod:this.settlementMethod, //结算状态  第一次保存的时候默认为1
              reimbursement:this.reimbursement,
              reimbursementStatus:this.reimbursementStatus,
              storedNumber:this.storedNumber,
              useMoney:this.useMoney,
              monthlyAccount:this.monthlyAccount,
              accumulationMoney:this.accumulationMoney,
              paymentStatus:this.paymentStatus,
              signStatus:this.signStatus,
              signTime:this.signTime,
              confirmPersonID:this.confirmPersonID,
              signPersonID:this.signPersonID,
              confirmTime:this.confirmTime,
              step:this.scheduleConfig.current

            }
            this.ajaxJson({
              url: '/dailyoffice/expressDelivery/save',
              data: params,
              call: (data) => {
                if (data.type === 0) {
                  this.$dialog.setReturnValue(this.id)
                }else{
                  this.$dialog.alert({
                    alertImg:'warn',
                    tipValue: data.message
                  })
                }
              }
            })
          } else if (this.scheduleConfig.current==2){
            //当前在第二步 更新第二步的信息
            let params={
              id:this.id,
              senderUnitID:this.senderUnitID,
              agentID:this.agentID,
              senderAddressID:this.senderAddressID,
              senderAddress:this.senderAddress,
              senderPersonID:this.senderPersonID,
              senderPhone:this.senderPhone,
              senderPostcode:this.senderPostcode,
              senderCellPhone:this.senderCellPhone,
              senderOrigin:this.senderOrigin,
              senderOriginCode:this.senderOriginCode,
              step:this.scheduleConfig.current
            }
            this.ajaxJson({
              url: '/dailyoffice/expressDelivery/updateSend',
              data: params,
              call: (data) => {
                if (data.type === 0) {
                  this.$dialog.setReturnValue(this.id)
                }else{
                  this.$dialog.alert({
                    alertImg:'warn',
                    tipValue: data.message
                  })
                }
              }
            })
          } else if (this.scheduleConfig.current==3){
            //当前在第三步 更新第三步的信息
            let params={
              id:this.id,
              recipientUnitID:this.recipientUnitID,
              recipientAddress:this.recipientAddress,
              recipientAddressID:this.recipientAddressID,
              recipientPersonID:this.recipientPersonID,
              recipientPhone:this.recipientPhone,
              recipientPostcode:this.recipientPostcode,
              recipientCellPhone:this.recipientCellPhone,
              recipientDestination:this.recipientDestination,
              recipientCode:this.recipientCode,
              step:this.scheduleConfig.current
            }
            this.ajaxJson({
              url: '/dailyoffice/expressDelivery/updateRecipient',
              data: params,
              call: (data) => {
                if (data.type === 0) {
                  this.$dialog.setReturnValue(this.id)
                }else{
                  this.$dialog.alert({
                    alertImg:'warn',
                    tipValue: data.message
                  })
                }
              }
            })
          }  else if (this.scheduleConfig.current==4){
            //当前在第四步 更新第四步的信息
            if (this.receiptType!=1){
              this.detailsList=[]
            }
            let params={
              id:this.id,
              receiptType:this.receiptType,
              receiptContent:this.receiptContent,
              detailsList:this.detailsList,
              quantity:this.quantity,
              step:this.scheduleConfig.current
            }

            this.ajaxJson({
              url: '/dailyoffice/expressDelivery/updateItems',
              data: params,
              call: (data) => {
                if (data.type === 0) {
                  this.$dialog.setReturnValue(this.id)
                }else{
                  this.$dialog.alert({
                    alertImg:'warn',
                    tipValue: data.message
                  })
                }
              }
            })
          }  else if (this.scheduleConfig.current==5){
            //当前在第五步 更新第五步的信息
            let params={
              id:this.id,
              settlementStatus:this.settlementStatus,
              billingNumber:this.billingNumber,
              billingWeight:this.billingWeight,
              cost:this.cost,
              settlementMethod:this.settlementMethod,
              reimbursement:this.reimbursement,
              reimbursementStatus:this.reimbursementStatus,
              storedNumber:this.storedNumber,
              monthlyAccount:this.monthlyAccount,
              useMoney:this.useMoney,
              accumulationMoney:this.accumulationMoney,
              paymentStatus:this.paymentStatus,
              step:this.scheduleConfig.current
            }

            this.ajaxJson({
              url: '/dailyoffice/expressDelivery/updateCost',
              data: params,
              call: (data) => {
                if (data.type === 0) {
                  this.$dialog.setReturnValue(this.id)
                }else{
                  this.$dialog.alert({
                    alertImg:'warn',
                    tipValue: data.message
                  })
                }
              }
            })
          }  else if (this.scheduleConfig.current==7){
            //当前在第六步 更新第六步的信息
            let params={
              id:this.id,
              signStatus:this.signStatus,
              signPersonID:this.signPersonID,
              signTime:this.signTime,
              confirmPersonID:this.confirmPersonID,
              confirmTime:this.confirmTime,
              step:this.scheduleConfig.current
            }

            this.ajaxJson({
              url: '/dailyoffice/expressDelivery/updateConfirm',
              data: params,
              call: (data) => {
                if (data.type === 0) {
                  this.$dialog.setReturnValue(this.id)
                }else{
                  this.$dialog.alert({
                    alertImg:'warn',
                    tipValue: data.message
                  })
                }
              }
            })
          }

        }

      },
     //终止
      stop(){
        this.$refs.schedule.stop()
        this.$dialog.close()
      },
      reimbursementCall(){
        if (this.reimbursement==1){
          this.reimbursementStatus=1
        }else {
          this.reimbursementStatus=0
        }
      },
      settlementCall(){
      
        if (this.settlementStatus==1 ){
          this.isSettlement=true

          if(this.letterClassification==1){

            this.isFangShi=false
            this.isFangShi2=true
          }else{

            this.isFangShi=true
            this.isFangShi2=false
          }

        } else (
          this.isSettlement=false,
          this.isFangShi=false,
          this.isFangShi2=false,
          this.isMethodCall=false

        )

        if (this.settlementMethod==1 &&this.settlementStatus==1){
          this.istored=true
        }else {
          this.istored=false
          this.ismonthly=false
        }
        this.methodCall()
      },
      methodCall(){
        if (this.settlementStatus==0&&this.letterClassification==0){
          this.isSettlement=false
          this.isFangShi=false
          this.isFangShi2=false
          this.isMethodCall=false
          this.istored=false
          this.ismonthly=false
        }else {
        if (this.settlementMethod==0){
          this.isMethodCall=true
          this.ismonthly=false
          this.istored=false
          this.paymentStatus='0'
          this.isSettlement=true
        }else {
          this.isMethodCall=false
        }
        if (this.settlementMethod==2){
          this.ismonthly=true
          this.istored=false
          this.paymentStatus='1'
        }else if (this.settlementMethod!=0){
          this.ismonthly=false
          this.istored=true
          this.paymentStatus='0'
        }

        if (this.settlementMethod==3){
          this.isSettlement=false,
          this.istored=false,
          this.ismonthly=false,
          this.isMethodCall=false

        }
        }
      },
      letterClassificationEvent(){
          if (this.letterClassification==0 ){
            this.isLetter=false
            this.isLetterEdit=''
            this.isJieSuan=true

            this.recipientUnitID=this.defaultUnitName
            this.recipientAddress=this.defaultAddressCN
            this.recipientPhone=this.defaultTrl
            this.signStatus=0

            this.isSign=false
            this.isSignPerson=true
            this.isSigimg=true
            this.isSendTime=true
          } else {
            this.isSendTime=false
            this.senderUnitID=this.defaultUnitName
            this.senderAddress=this.defaultAddressCN
            this.senderPhone=this.defaultTrl
            this.recipientUnitID=''
            this.recipientAddress=''
            this.recipientPhone=''

            this.isJieSuan=false
            this.isLetter = true
            this.isLetterEdit='1',

            this.isSettlement=true,
            this.isFangShi=false,
            this.isFangShi2=true,
            this.isMethodCall=true,
            this.methodCall()
            this.signStatus=1
            this.isSign=true
            this.signClick()

          }
          // this.orderOnlineEvent()
      },
      letterTypeEvent(){
        if (this.letterType==1){
          this.orderOnline='1'
        }
      },
      orderOnlineEvent(){
        if (this.orderOnline==1){
          this.isLetterEdit=''
        }else {
          this.isLetterEdit='1'
        }
      },
      courierEvent(){

        let param = {
          id: this.courierCompany
        }
        this.ajaxJson({
          url: '/dailyoffice/expressCompany/initForm',
          data: param,
          call: (data) => {
            this.inquiryURL=data.inquiryURL
            this.inquiryPhone=data.inquiryPhone
            if (this.letterType==1){
              this.orderOnline='1'
            }else {
              this.orderOnline=data.orderOnline
            }
          }
        })
      },
      senderUnitClick(){
        this.$dialog.OpenWindow({
          width: 950,
          height: 692,
          url: '/selectUnit?category=1',
          title: '选择公司',
          closeCallBack: (data) => {
            if (data) {
              // this.senderUnitID=data.id
              this.senderUnitID = data.name

              if (this.senderUnitID==''){
                this.updataselectUnit(data.id)
              }
            }
          }
        })
      },
      agentIDClick(){
        this.$dialog.OpenWindow({
          width: 950,
          height: 692,
          url: '/selectPerson?category=1',
          title: '选择经办人',
          closeCallBack: (data) => {
            if (data) {
              this.agentName=data.name
              this.agentID = data.id
              if (this.agentID==''){
                this.updatainsuredSelectPerson(data.id)
              }
            }
          }
        })
      },
      senderPersonClick(){
        this.$dialog.OpenWindow({
          width: 950,
          height: 692,
          url: '/selectPerson?category=1',
          title: '选择寄件人',
          closeCallBack: (data) => {
            if (data) {
              this.senderPersonID = data.id
              this.senderPersonName = data.name
              this.senderCellPhone=data.phone
              if (this.senderCellPhone==''){
                this.updatainsuredSelectPerson(data.id)
              }
            }
          }
        })
      },
      senderOriginClick(){
        this.$dialog.OpenWindow({
          width: 950,
          height: 603,
          url: '/selectDic?name=20' ,
          title: '选择原寄地代码',
          closeCallBack: (data) => {
            if (data) {
              this.senderOrigin = data.showName
              this.senderOriginCode=data.value1
            }
          }
        })
      },
      senderAddressClick(){
        this.$dialog.OpenWindow({
          width: 950,
          height: 603,
          url: '/selectDic?name=25' ,
          title: '选择省份地市区县',
          closeCallBack: (data) => {
            if (data) {
              this.senderAddressID=data.id
              this.senderAddressName = data.showName
              this.senderPostcode=data.value4
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
              this.recipientDestination = data.showName
              this.recipientCode=data.value1
            }
          }
        })
      },
      recipientAddressClick(){
        this.$dialog.OpenWindow({
          width: 950,
          height: 603,
          url: '/selectDic?name=25' ,
          title: '选择省份地市区县',
          closeCallBack: (data) => {
            if (data) {
              this.recipientAddressID=data.id
              this.recipientAddressName = data.showName
              this.recipientPostcode=data.value4
            }
          }
        })
      },
      recipientUnitClick(){
        this.$dialog.OpenWindow({
          width: 950,
          height: 692,
          url: '/selectUnit?category=1',
          title: '选择公司',
          closeCallBack: (data) => {
            if (data) {
              // this.senderUnitID=data.id
              this.recipientUnitID = data.name

              if (this.recipientUnitID==''){
                this.updataselectUnit(data.id)
              }
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
              this.recipientPersonID = data.id
              this.recipientPersonName = data.name
              this.recipientCellPhone=data.phone
              if (this.recipientPersonID==''){
                this.updatainsuredSelectPerson(data.id)
              }
              this.doesClick()
            }
          }
        })
      },
      receiptTypeCall(){   //点击收寄物类型
        if (this.receiptType==1){
          this.detailsList=[]
          this.addDiscount()
          this.isQuantity='1'
          this.isReceiptType=false
        } else {
          this.isQuantity=''
          this.isReceiptType=true
          this.quantity=''
        }

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
        this.quantity=index
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
      lookEvent(){
        if (this.letterClassification==0 ){
          this.isSendTime=true
          this.isLetter=false
          this.isLetterEdit=''
          this.isJieSuan=true
          this.settlementCall()
        } else {
          this.isSendTime=false
          this.isJieSuan=false
          this.isLetter = true
          this.isLetterEdit='1',

          this.isSettlement=true,
          this.isFangShi=false,
          this.isFangShi2=true,
          this.isMethodCall=true
          this.methodCall()

        }


      },
      lookAddressEvent(){
        this.ajaxJson({
          url: '/Com/selectDicJson',
          data: {
            name:'25',
            searchStr:this.senderAddressID
          },
          loading:'0',
          call: (datas)=>{
            this.senderAddressName = datas.content[0].showName
            this.senderAddressId = datas.content[0].id
          }
        })
        this.ajaxJson({
          url: '/Com/selectDicJson',
          data: {
            name:'25',
            searchStr:this.recipientAddressID
          },
          loading:'0',
          call: (param)=>{
            this.recipientAddressName = param.content[0].showName
            this.recipientAddressID = param.content[0].id
          }
        })
      },
      signCall(){
        if (this.letterClassification==0){
          this.isSign=false
          this.isSignPerson=true
          this.isSigimg=true
        }else {
          this.isSign=true
          this.isSignPerson=false
          this.isSigimg=false
          this.signClick()

        }
      },
    },
    created(){
      this.setQuery2Value('id')
      this.setQuery2Value('copy')
      this.setQuery2Value('type')
      this.setQuery2Value('category')
      let params = {}
      if (this.copy!=''){
        params={
          copy:this.copy,
          category:this.category
        }
      }
      this.init({
        url: '/dailyoffice/expressDelivery/initForm',
        data:params,
        all: (data) => {

          this.letterClassificationList = data.letterClassificationPsd.list
          this.letterClassification = data.letterClassificationPsd.value
          this.letterTypeList = data.letterTypePsd.list
          this.letterType  = data.letterTypePsd.value
          this.orderOnlineList = data.orderOnlinePsd.list
          this.orderOnline  = data.orderOnlinePsd.value
          this.courierCompanyList = data.courierCompanyPsd.list
          this.courierCompany  = data.courierCompanyPsd.value
          this.receiptTypeList = data.receiptTypePsd.list
          this.receiptType  = data.receiptTypePsd.value
          this.settlementStatusList = data.settlementStatusPsd.list
          this.settlementStatus  = data.settlementStatusPsd.value
          this.settlementMethodList = data.settlementMethodPsd.list
          this.settlementMethod2List = data.settlementMethod2Psd.list
          this.reimbursementList = data.reimbursementPsd.list
          this.reimbursement  = data.reimbursementPsd.value
          this.paymentStatusList = data.paymentStatusPsd.list
          this.paymentStatus  = data.paymentStatusPsd.value
          this.signStatusList = data.signStatusPsd.list
          this.signStatus  = data.signStatusPsd.value
          this.reimbursementStatusList = data.reimbursementStatusPsd.list
          this.reimbursementStatus  = data.reimbursementStatusPsd.value



        },
        add: (data) => {
          /* 需要添加的数据 */
          if (this.copy!==''){
          this.senderUnitID=data.senderUnitID   ,//寄件人信息公司名称
          this.agentID=data.agentID,//寄件人信息经办人
          this.agentName=data.agentName,//寄件人信息经办人
          this.senderAddressID=data.senderAddressID
          this.senderAddress=data.senderAddress,//寄件人信息地址
          this.senderPersonID=data.senderPersonID,//寄件人信息寄件人
          this.senderPersonName=data.senderPersonName,//寄件人信息寄件人
          this.senderPhone=data.senderPhone,//寄件人信息电话
          this.senderPostcode=data.senderPostcode,//寄件人信息编码
          this.senderCellPhone=data.senderCellPhone,//寄件人信息手机号
          this.senderOrigin=data.senderOrigin,//寄件人信息原寄地
          this.senderOriginCode=data.senderOriginCode,//寄件人信息原寄地代码
          this.recipientUnitID=data.recipientUnitID,//收件人信息公司名称
          this.recipientAddressID=data.recipientAddressID,
          this.recipientAddress=data.recipientAddress,//收件人信息地址
          this.recipientPersonID=data.recipientPersonID,//收件人信息收件人
          this.recipientPersonName=data.recipientPersonName,//收件人信息收件人
          this.recipientPhone=data.recipientPhone,//收件人信息电话
          this.recipientPostcode=data.recipientPostcode,//收件人信息编码
          this.recipientCellPhone=data.recipientCellPhone,//收件人信息手机号
          this.recipientDestination=data.recipientDestination//收件人信息目的地
          }

          this.settlementMethod=data.settlementMethod
          this.defaultUnitName=data.defaultUnitName,
          this.defaultAddressCN=data.defaultAddressCN,
          this.defaultTrl=data.defaultTrl
          this.letterClassificationEvent()
          this.courierEvent()

        },
        look: (data) => {
          /* 需要查看的数据 */
            this.sendTime=data.sendTime,//签收日期
            this.letterNumber=data.letterNumber,//信函单号
            this.inquiryURL=data.inquiryURL,//查单网址
            this.inquiryPhone=data.inquiryPhone,//查单电话
            this.senderUnitID=data.senderUnitID   ,//寄件人信息公司名称
            this.agentID=data.agentID,//寄件人信息经办人
            this.agentName=data.agentName,//寄件人信息经办人
            this.agentName=data.agentName,//寄件人信息经办人

            this.senderAddressID=data.senderAddressID
            this.senderAddressName=data.senderAddressName
            this.senderAddress=data.senderAddress,//寄件人信息地址
            this.senderPersonID=data.senderPersonID,//寄件人信息寄件人
            this.senderPersonName=data.senderPersonName,//寄件人信息寄件人
            this.senderPhone=data.senderPhone,//寄件人信息电话
            this.senderPostcode=data.senderPostcode,//寄件人信息编码
            this.senderCellPhone=data.senderCellPhone,//寄件人信息手机号
            this.senderOrigin=data.senderOrigin,//寄件人信息原寄地
            this.senderOriginCode=data.senderOriginCode,//寄件人信息原寄地代码
            this.recipientUnitID=data.recipientUnitID,//收件人信息公司名称
            this.recipientAddressID=data.recipientAddressID,
            this.recipientAddressName=data.recipientAddressName,
            this.recipientAddress=data.recipientAddress,//收件人信息地址
            this.recipientPersonID=data.recipientPersonID,//收件人信息收件人
            this.recipientPersonName=data.recipientPersonName,//收件人信息收件人
            this.recipientPhone=data.recipientPhone,//收件人信息电话
            this.recipientPostcode=data.recipientPostcode,//收件人信息编码
            this.recipientCellPhone=data.recipientCellPhone,//收件人信息手机号
            this.recipientDestination=data.recipientDestination,//收件人信息目的地
            this.recipientCode=data.recipientCode,//收件人信息目的地代码
            this.receiptContent=data.receiptContent,//收寄物内容
            this.quantity=data.quantity,//收寄物数量
            this.settlementStatus=data.settlementStatus,//收寄物信息数量
            this.billingNumber=data.billingNumber,//费用及支付信息数量
            this.billingWeight=data.billingWeight,//费用及支付信息重量
            this.cost=data.cost,//费用及支付信息费用
            this.storedNumber=data.storedNumber,//储值卡号
            this.storedNumberName=data.storedNumberName,//储值卡号
            this.useMoney=data.useMoney,//本次扣除后剩余金额
            this.monthlyAccount=data.monthlyAccount,//月结账户
            this.monthlyAccountName=data.monthlyAccountName,//月结账户
            this.accumulationMoney=data.accumulationMoney,//连同本次累计金额
            this.signStatus=data.signStatus,
            this.confirmPerson=data.confirmPerson,//确认人
            this.confirmPersonID=data.confirmPersonID,//确认人
            this.confirmTime=data.confirmTime,//确认日期
            this.signPerson=data.signPerson
            this.signPersonID=data.signPersonID//签收人
            this.settlementMethod=data.settlementMethod
            this.receiptTypeCall()
            this.detailsList=data.detailsList

            // this.scheduleConfig.current=data.step
            if (data.step==7){
              this.scheduleConfig.select=0
              this.scheduleConfig.isFinish=true
              if (this.type==1){
                this.scheduleConfig.current=data.step+1
              }

            }else {
              this.scheduleConfig.current=data.step
            }
            this.lookEvent()
             this.signCall()

            // this.lookAddressEvent()
        }
      })
    }
  }
</script>

<style scoped>

</style>
