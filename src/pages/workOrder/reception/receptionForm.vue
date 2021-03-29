<template>
  <div class="f_main" >
    <yhm-formbody>
      <template #title>基本信息</template>
      <template #control>
<!--        :no-click="true"-->
        <yhm-form-select title="接待人" @click="selectClient" :value="personName" id="personName" tip="value" rule="R0000"></yhm-form-select>
        <yhm-form-select title="车辆" @click="plateEvent" :value="carName" id="carName" tip="value" rule="R0000"></yhm-form-select>

        <yhm-form-select title="送修人" @click="contactPersonIconClick" :value="contactPerson" id="contactPerson" tip="value" rule="R0000">
          <div style="display: flex;justify-content: center;align-items: center;" title="添加备用联系人">
            <svg v-if="!addPresonShow" t="1600673661423" style="cursor:pointer;" @click="addIconClick" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1594" width="32" height="32"><path d="M800 192c19.2 0 32 12.8 32 32v256c0 19.2-12.8 32-32 32s-32-12.8-32-32V256H256v512h224c19.2 0 32 12.8 32 32s-12.8 32-32 32H224c-19.2 0-32-12.8-32-32V224c0-19.2 12.8-32 32-32h576z" fill="#221814" p-id="1595"></path><path d="M704 560c16 0 28.8 12.8 32 28.8V672h80c19.2 0 32 12.8 32 32 0 16-12.8 28.8-28.8 32H736v80c0 19.2-12.8 32-32 32-16 0-28.8-12.8-32-28.8V736h-80c-19.2 0-32-12.8-32-32 0-16 12.8-28.8 28.8-32H672v-80c0-19.2 12.8-32 32-32zM640 352c19.2 0 32 12.8 32 32 0 16-12.8 28.8-28.8 32H384c-19.2 0-32-12.8-32-32 0-16 12.8-28.8 28.8-32H640z" fill="#C70019" p-id="1596"></path></svg>
            <svg v-if="addPresonShow" @click="addIconClick" t="1600674201116" style="cursor:pointer;" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="6314" width="32" height="32"><path d="M511.918647 163.154917c-193.438641 0-351.697037 158.254304-351.697037 351.699084 0 193.439664 158.257374 351.697037 351.697037 351.697037 193.394638 0 351.653035-158.25635 351.653035-351.697037C863.570659 321.409221 705.313286 163.154917 511.918647 163.154917M687.736978 641.452327l-49.198515 49.224098-126.619816-126.600373-126.573767 126.600373-49.304939-49.224098 126.636189-126.598326-126.636189-126.600373 49.304939-49.224098 126.573767 126.600373 126.619816-126.600373 49.198515 49.224098-126.573767 126.600373L687.736978 641.452327z" p-id="6315" fill="#8a8a8a"></path></svg>
          </div>
        </yhm-form-select>

<!--        <yhm-form-text title="送修人" @iconClick="contactPersonIconClick" after-icon="i-input-right-arrow" :value="contactPerson" id="contactPerson" placeholder="请先选择车辆" rule="R0000">-->
<!--          <div style="display: flex;justify-content: center;align-items: center;">-->
<!--            <svg v-if="!addPresonShow" t="1600673661423" style="cursor:pointer;" @click="addIconClick" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1594" width="32" height="32"><path d="M800 192c19.2 0 32 12.8 32 32v256c0 19.2-12.8 32-32 32s-32-12.8-32-32V256H256v512h224c19.2 0 32 12.8 32 32s-12.8 32-32 32H224c-19.2 0-32-12.8-32-32V224c0-19.2 12.8-32 32-32h576z" fill="#221814" p-id="1595"></path><path d="M704 560c16 0 28.8 12.8 32 28.8V672h80c19.2 0 32 12.8 32 32 0 16-12.8 28.8-28.8 32H736v80c0 19.2-12.8 32-32 32-16 0-28.8-12.8-32-28.8V736h-80c-19.2 0-32-12.8-32-32 0-16 12.8-28.8 28.8-32H672v-80c0-19.2 12.8-32 32-32zM640 352c19.2 0 32 12.8 32 32 0 16-12.8 28.8-28.8 32H384c-19.2 0-32-12.8-32-32 0-16 12.8-28.8 28.8-32H640z" fill="#C70019" p-id="1596"></path></svg>-->
<!--            <svg v-if="addPresonShow" @click="addIconClick" t="1600674201116" style="cursor:pointer;" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="6314" width="32" height="32"><path d="M511.918647 163.154917c-193.438641 0-351.697037 158.254304-351.697037 351.699084 0 193.439664 158.257374 351.697037 351.697037 351.697037 193.394638 0 351.653035-158.25635 351.653035-351.697037C863.570659 321.409221 705.313286 163.154917 511.918647 163.154917M687.736978 641.452327l-49.198515 49.224098-126.619816-126.600373-126.573767 126.600373-49.304939-49.224098 126.636189-126.598326-126.636189-126.600373 49.304939-49.224098 126.573767 126.600373 126.619816-126.600373 49.198515 49.224098-126.573767 126.600373L687.736978 641.452327z" p-id="6315" fill="#8a8a8a"></path></svg>-->
<!--          </div>-->
<!--        </yhm-form-text>-->
        <yhm-form-text title="送修人" subtitle="电话" :placeholder="addPresonShow?'':'请先选择车辆'" :value="contactPersonPhone" id="contactPersonPhone" rule="R0000"></yhm-form-text>
<!--        <yhm-form-text title="送修人2" v-if="addPresonShow" :value="contactPerson2" id="contactPerson2"></yhm-form-text>-->
        <yhm-form-select title="送修人2" v-if="addPresonShow" @click="contactPersonIconClick2" :value="contactPerson2" id="contactPerson2"></yhm-form-select>
        <yhm-form-text title="送修人" v-if="addPresonShow" subtitle="电话2" :value="contactPersonPhone2" id="contactPersonPhone2"></yhm-form-text>
        <yhm-form-text title="车主" :value="carOwner" id="carOwner" no-edit="1" placeholder="请先选择车辆"></yhm-form-text>
        <!--<yhm-form-text title="编号" :value="node" id="code" no-edit="1"></yhm-form-text>-->
        <yhm-form-text title="传奇及" subtitle="DMS工单号" :value="otherNode" id="otherNode" placeholder="传奇DMS系统工单号" :rule="business=='2'?'':'R0000'"></yhm-form-text>
        <yhm-form-date title="接待日期" :value="visitDate" id="visitDate" :max="currentDate"></yhm-form-date>
        <yhm-form-text title="邮箱" :value="emailaddress" id="emailaddress" placeholder="请输入邮箱" rule="R0000"></yhm-form-text>
        <yhm-form-text title="地址" :value="address" id="address" placeholder="请输入地址" rule="R0000"></yhm-form-text>
        <yhm-form-text title="车辆型号" no-edit="1" @noEditClick="vindicate" :value="modelVal" id="modelVal" :placeholder="modelPlaceholder" rule="R0000">
          <div v-show="modelVal==''&&carName!=''" style="display: flex;justify-content: center;align-items: center;" title="维护车辆型号">
            <svg t="1609905338813" title="维护车辆型号" style="cursor:pointer;" @click="vindicate" class="icon" viewBox="0 0 1129 1024" version="1.1" p-id="4251" width="32" height="32"><path d="M764.468966 903.944828H266.593103c-10.593103 0-17.655172-8.827586-17.655172-17.655173V132.413793c0-10.593103 8.827586-17.655172 17.655172-17.655172h344.275863c5.296552 0 8.827586 1.765517 12.35862 5.296551l229.517242 227.751725c3.531034 3.531034 5.296552 8.827586 5.296551 12.35862v208.331035c0 10.593103-8.827586 17.655172-17.655172 17.655172s-17.655172-8.827586-17.655173-17.655172V367.227586L602.041379 150.068966h-317.793103v716.8h480.22069c10.593103 0 17.655172 8.827586 17.655172 17.655172s-7.062069 19.42069-17.655172 19.42069z" fill="#515151" p-id="4252"></path><path d="M840.386207 377.82069h-229.517241c-10.593103 0-17.655172-8.827586-17.655173-17.655173V132.413793c0-10.593103 8.827586-17.655172 17.655173-17.655172s17.655172 8.827586 17.655172 17.655172v210.096552h211.862069c10.593103 0 17.655172 8.827586 17.655172 17.655172s-8.827586 17.655172-17.655172 17.655173zM529.655172 287.77931h-171.255172c-10.593103 0-17.655172-8.827586-17.655172-17.655172s8.827586-17.655172 17.655172-17.655172H529.655172c10.593103 0 17.655172 8.827586 17.655173 17.655172s-7.062069 17.655172-17.655173 17.655172zM529.655172 399.006897h-171.255172c-10.593103 0-17.655172-8.827586-17.655172-17.655173s8.827586-17.655172 17.655172-17.655172H529.655172c10.593103 0 17.655172 8.827586 17.655173 17.655172s-7.062069 17.655172-17.655173 17.655173zM720.331034 503.172414H358.4c-10.593103 0-17.655172-8.827586-17.655172-17.655173s8.827586-17.655172 17.655172-17.655172h361.931034c10.593103 0 17.655172 8.827586 17.655173 17.655172s-7.062069 17.655172-17.655173 17.655173zM720.331034 602.041379H358.4c-10.593103 0-17.655172-8.827586-17.655172-17.655172s8.827586-17.655172 17.655172-17.655173h361.931034c10.593103 0 17.655172 8.827586 17.655173 17.655173s-7.062069 17.655172-17.655173 17.655172zM623.227586 709.737931h-264.827586c-10.593103 0-17.655172-8.827586-17.655172-17.655172s8.827586-17.655172 17.655172-17.655173h264.827586c10.593103 0 17.655172 8.827586 17.655173 17.655173s-7.062069 17.655172-17.655173 17.655172zM623.227586 812.137931h-264.827586c-10.593103 0-17.655172-8.827586-17.655172-17.655172s8.827586-17.655172 17.655172-17.655173h264.827586c10.593103 0 17.655172 8.827586 17.655173 17.655173s-7.062069 17.655172-17.655173 17.655172zM685.02069 859.806897c-5.296552 0-10.593103-1.765517-14.124138-5.296552-3.531034-5.296552-5.296552-12.358621-3.531035-17.655173l21.186207-68.855172c1.765517-7.062069 7.062069-10.593103 14.124138-12.358621 7.062069-1.765517 12.358621 0 17.655172 5.296552l51.2 54.731035c5.296552 5.296552 5.296552 12.358621 3.531035 17.655172-1.765517 7.062069-7.062069 10.593103-14.124138 12.358621l-72.386207 14.124138h-3.531034z m30.013793-51.2l-3.531035 8.827586 10.593104-1.765517-7.062069-7.062069z" fill="#515151" p-id="4253"></path><path d="M757.406897 845.682759c-5.296552 0-10.593103-1.765517-14.124138-5.296552-7.062069-7.062069-7.062069-19.42069 1.765517-26.482759l134.17931-125.351724-24.717241-26.482758-135.944828 123.586206c-7.062069 7.062069-19.42069 7.062069-26.482758-1.765517-7.062069-7.062069-7.062069-19.42069 1.765517-26.482758l150.068965-135.944828c7.062069-7.062069 19.42069-7.062069 26.482759 1.765517l49.434483 52.965517c7.062069 7.062069 7.062069 19.42069-1.765517 26.482759l-148.303449 137.710345c-3.531034 3.531034-7.062069 5.296552-12.35862 5.296552z" fill="#515151" p-id="4254"></path><path d="M905.710345 707.972414c-5.296552 0-10.593103-1.765517-14.124138-5.296552-7.062069-7.062069-7.062069-19.42069 1.765517-26.482759l19.42069-17.655172-24.717242-26.482759-19.420689 17.655173c-7.062069 7.062069-19.42069 7.062069-26.482759-1.765517-7.062069-7.062069-7.062069-19.42069 1.765517-26.482759l33.544828-30.013793c7.062069-7.062069 19.42069-7.062069 26.482759 1.765517l49.434482 52.965517c7.062069 7.062069 7.062069 19.42069-1.765517 26.482759L918.068966 704.441379c-3.531034 1.765517-8.827586 3.531034-12.358621 3.531035z" fill="#515151" p-id="4255"></path></svg>
          </div>
        </yhm-form-text>

        <yhm-form-radio title="工单来源" :select-list="businessList" :value="business" id="business"></yhm-form-radio>
        <yhm-form-radio title="状态" :select-list="stateList" @call="stateChange(state)" :value="state" id="state"></yhm-form-radio>
        <yhm-form-radio title="业务来源" width="1" :select-list="worksourceList" :value="worksource" id="worksource"></yhm-form-radio>
        <yhm-form-radio title="保险公司" v-show="worksource=='4'?true:false" width="1" ref="collectionRadio" :select-list="insuranceCompanyList" :value="insuranceCompany" id="insuranceCompany" rule="#"></yhm-form-radio>

        <yhm-form-select title="推修公司" width="1" v-if="worksource=='3'&&carName!=''" @click="pushRepairClick" :value="companyName" id="companyName" rule="R0000"></yhm-form-select>
<!--        &&workOrderlist.length=='0'&&guaranteeSlipList.length=='0'-->
        <yhm-form-radio title="适用车型" width="1" ref="applicableModelsRadio" rule="#" :no-edit="applicableModelsShow" :select-list="applicableModelsList" @call="accessNumber" :value="applicableModels" id="applicableModels"></yhm-form-radio>
      </template>
    </yhm-formbody>
    <yhm-formoperate :createName="createName" :insertDate="insertDate" :updateName="updateName" :updateDate="updateDate">
      <template #btn>
        <yhm-commonbutton value="保存" icon="btnSave" :flicker="true" @call="save()"></yhm-commonbutton>
      </template>
    </yhm-formoperate>
    <div class="f_split" v-show="listShow"></div>
    <yhm-form-list-edit v-show="listShow">
      <template #title>详情列表</template>
      <template #operate>
        <yhm-commonbutton value="添加理由" icon="btnAdd" :is-error="true" :flicker="true" @call="addReason()" category="three"></yhm-commonbutton>
      </template>
      <template #listHead>
        <yhm-managerth style="width: 50px" title="序号"></yhm-managerth>
        <yhm-managerth title="理由"></yhm-managerth>
        <yhm-managerth width="40" title="删除"></yhm-managerth>
      </template>
      <template #listBody>
        <tr v-for="(item,index) in list" :key="index" :class="{InterlacBg:index%2!==0}">
          <yhm-form-td-textbox width="45" style="text-align: center;" no-edit="1" id="num" :list="list" listid="list" :value="item"></yhm-form-td-textbox>
          <yhm-form-td-textbox width="870" style="text-align: center;" id="remark" :list="list" listid="list" :value="item"></yhm-form-td-textbox>
          <yhm-form-td-delete width="40" :list="list" :value="item" :del-click="false" ></yhm-form-td-delete>
        </tr>
      </template>
      <template #empty>
        <span class="m_listNoData" v-show="list.length == 0">暂时没有数据</span>
      </template>
    </yhm-form-list-edit>

    <div class="f_split" v-show="workOrderlist.length != 0||guaranteeSlipList.length != 0"></div>
<!--    <yhm-form-list-edit v-show="workOrderlist.length != 0">-->
<!--      <template #title>维修单记录</template>-->

<!--      <template #listHead>-->
<!--        <yhm-managerth width="34" title="查看"></yhm-managerth>-->
<!--        <yhm-managerth width="170" title="工单号"></yhm-managerth>-->
<!--        <yhm-managerth width="100" title="接待人"></yhm-managerth>-->
<!--        <yhm-managerth width="110" title="车牌号"></yhm-managerth>-->
<!--        <yhm-managerth width="110" title="车辆品牌"></yhm-managerth>-->
<!--        <yhm-managerth title="车主"></yhm-managerth>-->
<!--        <yhm-managerth width="90" title="送修人"></yhm-managerth>-->

<!--      </template>-->
<!--      <template #listBody>-->
<!--        <tr v-for="(item,index) in workOrderlist" :key="index" :class="{InterlacBg:index%2!==0}">-->
<!--          <yhm-manager-td-look @click="listView(item)"></yhm-manager-td-look>-->
<!--          <yhm-manager-td class="solidYhm" :value="item.code" ></yhm-manager-td>-->
<!--          <yhm-manager-td class="solidYhm" :value="item.client"></yhm-manager-td>-->
<!--          <yhm-manager-td class="solidYhm" :value="item.vehicle" type="vehicle"></yhm-manager-td>-->
<!--          <yhm-manager-td class="solidYhm" :value="item.brandVal"></yhm-manager-td>-->
<!--          <yhm-manager-td class="solidYhm" :value="item.carOwner"></yhm-manager-td>-->
<!--          <yhm-manager-td class="solidYhm" :value="item.contactPerson"></yhm-manager-td>-->

<!--        </tr>-->
<!--      </template>-->
<!--      <template #empty>-->
<!--        <span class="m_listNoData" v-show="workOrderlist.length == 0">暂时没有数据</span>-->
<!--      </template>-->
<!--    </yhm-form-list-edit>-->
    <yhm-view-tab v-show="workOrderlist.length != 0||guaranteeSlipList.length != 0">
      <template #tab>
        <yhm-view-tab-button :list="tabState" :index="0">维修单记录</yhm-view-tab-button>
        <yhm-view-tab-button :list="tabState" :index="1">保单记录</yhm-view-tab-button>
<!--        <span style="margin-left: 30px;font-size: 14px;color:#f00;">当前车辆已有维修记录或保单记录,无法选择中介推修</span>-->

      </template>
      <template #content>
        <yhm-view-tab-list :customize="true"  v-show="tabState[0].select">
          <template #listHead>
            <yhm-managerth width="34" title="查看"></yhm-managerth>
            <yhm-managerth width="170" title="工单号"></yhm-managerth>
            <yhm-managerth width="100" title="接待人"></yhm-managerth>
            <yhm-managerth width="110" title="车牌号"></yhm-managerth>
            <yhm-managerth width="110" title="车辆品牌"></yhm-managerth>
            <yhm-managerth title="车主"></yhm-managerth>
            <yhm-managerth width="180" title="送修人"></yhm-managerth>
          </template>
          <template #listBody>
            <tr v-for="(item,index) in workOrderlist" :key="index" :class="{InterlacBg:index%2!==0}">
              <yhm-manager-td-look @click="listView(item)"></yhm-manager-td-look>
              <yhm-manager-td :value="item.code" ></yhm-manager-td>
              <yhm-manager-td :value="item.client"></yhm-manager-td>
              <yhm-manager-td :value="item.vehicle" type="vehicle"></yhm-manager-td>
              <yhm-manager-td :value="item.brandVal"></yhm-manager-td>
              <yhm-manager-td :value="item.carOwner"></yhm-manager-td>
              <yhm-manager-td :value="item.contactPerson"></yhm-manager-td>
            </tr>
          </template>
          <template #empty>
            <span class="m_listNoData" v-show="workOrderlist.length=='0'">暂时没有数据</span>
          </template>
        </yhm-view-tab-list>

        <yhm-view-tab-list :customize="true"  v-show="tabState[1].select">
          <template #listHead>
            <yhm-managerth width="38" title="查看"></yhm-managerth>
            <yhm-managerth title="业务员"></yhm-managerth>
            <yhm-managerth width="220" title="投保日期"></yhm-managerth>
            <yhm-managerth width="220" title="保险公司"></yhm-managerth>
            <yhm-managerth width="200" title="保费合计"></yhm-managerth>
          </template>
          <template #listBody>
            <tr v-for="(item,index) in guaranteeSlipList" :key="index" :class="{InterlacBg:index%2!==0}">
              <yhm-manager-td-look @click="guaranteeSlipLookOverView(item)"></yhm-manager-td-look>
              <yhm-manager-td :value="item.salsesman" ></yhm-manager-td>
              <yhm-manager-td-date :value="item.insertDate"></yhm-manager-td-date>
              <yhm-manager-td-center :value="item.insuredUnitVal"></yhm-manager-td-center>
              <yhm-manager-td-money :value="item.premiumsTotal"></yhm-manager-td-money>
            </tr>
          </template>
          <template #empty>
            <span class="m_listNoData" v-show="guaranteeSlipList.length=='0'">暂时没有数据</span>
          </template>
        </yhm-view-tab-list>
      </template>
    </yhm-view-tab>
    <div class="f_split" v-if="returnVisitToRecordList.length>0?true:false"></div>
    <yhm-formbody v-if="returnVisitToRecordList.length>0?true:false">
      <template #title>回访信息</template>
      <template #control>
        <yhm-form-textarea :title="'第'+(index+1)+'次'" subtitle="回访记录" v-for="(item,index) in returnVisitToRecordList" :key="index" :value="item.remark" id="remark" no-edit="1" placeholder="请输入回访信息"> </yhm-form-textarea>
      </template>
    </yhm-formbody>
  </div>
</template>

<script>
  import { formmixin } from '@/assets/form.js'
  import { accMul, accAdd, guid, formatDate, formatTime } from '@/assets/common.js'
  export default {
    name: 'receptionForm',
    mixins: [formmixin],
    data(){
      return{
        tabState:[{select:true},{select:false}],
        insuranceCompanyList:[],//保险公司
        insuranceCompany:'',//选中的保险公司
        workOrderlist:[],//推修关联的工单
        guaranteeSlipList:[],//保单数据
        pushRepairID:'',//关联推修公司的id
        companyName:'',//推修公司名称
        companyID:'',//推修公司id
        idNo:'',//车主身份证号
        contactIDNO:'',//联系人身份证号
        applicableModelsShow:true,
        returnVisitToRecordList:[],
        // worksourceNoShowItemList:[],//业务来源单选隐藏
        currentDate: formatDate(new Date()),//当前日期
        unitType:'',//送修人是公司还是个人   0是单位 1是个人
        principalID:'',//负责人ID
        principal:'',//负责人
        address:'',//地址
        emailaddress:'',//邮箱
        brandVal:'',//品牌名称
        brand:'',//品牌名称id
        modelID:'',//车辆型号id
        modelVal:'',//车辆型号
        modelPlaceholder:'请先选择车辆',//车辆型号提示

        personid:'',//接待人ID
        personName:'',//接待人姓名
        carid:'',//车辆ID
        carName:'',//车辆
        visitDate: formatDate(new Date()),//到访日期
        business:'',//业务来源
        businessList:[],//业务来源
        worksource:'',//工单来源
        worksourceList:[],//工单来源list
        node:'',//接待编号
        otherNode:'',//其它系统编号
        state:'0',//状态(有意无意)
        remark:'',//无意备注
        list:[],//无意的理由列表
        listShow:false,//无意的理由列表的显示隐藏


        addPresonShow:false,//添加第二个联系人
        contactPerson:'',//联系人
        contactPersonPhone:'',//联系人手机号
        contactPerson2:'',//备用联系人
        contactPersonPhone2:'',//备用联系人手机号
        carOwner:'',//车主
        code:'',//编号
        otherCode:'',//其它系统编号
        workDate: formatDate(new Date()),//发生日期
        category:'0',//维修类型
        applicableModels:'0',//适用车型
        sub:'0',//保险公司
        subName:'',//保险公司名称
        subid:'',//保险公司ID
        subCode:'',//保险公司编号
        source:'0',//业务来源
        insurance:'',//备份保险公司选中的值
        subShow:true,//保险公司显示隐藏
        orderSource:'0',//工单来源
        contactPersonID:'',//联系人ID
        carOwnerID:'',//车主ID
        endDate: formatDate(new Date()),//预计交车时间
        // remark:'',//备注

        noInvoice:false,
        subList:[],
        sourceList:[],
        orderSourceList:[],
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
        categoryList:[],
        applicableModelsList:[],
        invoiceDetails:[
          {
            code:'958751326',
            currentDate:formatDate(new Date()),
            category:'保险理赔',
            money:'',
            rate:'50',
            rateMoney:''
          },
          {
            code:'568798651',
            currentDate:formatDate(new Date()),
            category:'自费理赔',
            money:'',
            rate:'50',
            rateMoney:''
          }
        ],

      }
    },
    methods:{
      guaranteeSlipLookOverView(item){
        this.$dialog.OpenWindow({
          width: '1050',
          height: '700',
          url: '/policyView?id=' + item.id,
          title: '查看保单信息',
          closeCallBack: (data)=>{
          }
        })
      },
      listView(item){
        this.$dialog.OpenWindow({
          width: '1070',
          height: '750',
          url:'/collectionOfDataView?id='+item.receptionid,
          title:'查看工单信息',
          closeCallBack:(data) =>{
          }
        })
      },
      pushRepairClick(){
        sessionStorage.receptionFormList = JSON.stringify(this.$data)//当前页面数据
        this.$dialog.OpenWindow({
          width: '1050',
          height: '750',
          url: '/pushRepairSelect?id='+this.carid,
          title: '选择推修公司',
          closeCallBack: (data) => {
            if (data) {
              this.pushRepairID = data.id
              this.companyName = data.companyName
              this.companyID = data.companyID
            }
          }
        })
      },
      vindicate(){
        if(this.carName!=''&&this.modelVal==''){
          this.$dialog.OpenWindow({
            width: '1050',
            height: '750',
            url: '/vehicleForm?id='+this.carid,
            title: '维护车型',
            closeCallBack: (dt) => {
              if (dt) {
                console.log(dt)
                this.ajaxJson({
                  url: '/Basic/initVehicleForm',
                  data: {
                    id:dt
                  },
                  call: (da) => {
                    console.log(da)
                    if(da){
                      this.modelVal = da.model
                      // this.detailedInformation(da)
                    }
                  }
                })
              }
            }
          })
        }
      },
      addIconClick(){
        this.addPresonShow = !this.addPresonShow
      },
      delServe(index){
        this.list.splice(index,1)
      },
      contactPersonIconClick(){//选择送修人1
        this.$dialog.OpenWindow({
          width: '950',
          height: '700',
          url: '/selectPerson?category=1&categoryBefore=1',
          title: '选择联系人信息',
          closeCallBack: (data) => {
            if (data) {
              this.contactPersonID = data.id//联系人ID
              this.contactPerson = data.name//联系人姓名
              this.contactPersonPhone = data.phone//联系人电话
            }
          }
        })
      },
      contactPersonIconClick2(){//选择送修人2
        this.$dialog.OpenWindow({
          width: '950',
          height: '700',
          url: '/selectPerson?category=1&categoryBefore=1',
          title: '选择联系人信息',
          closeCallBack: (data) => {
            if (data) {
              // this.contactPersonID = data.id//联系人ID
              this.contactPerson2 = data.name//联系人姓名
              this.contactPersonPhone2 = data.phone//备用联系人手机号
            }
          }
        })
      },
      addReason(){//添加理由
        let num = accAdd(this.list.length,1) + ''
        this.list.push({
          id: guid(),
          ownerid:this.id,
          num:num,
          remark:''
        })
      },
      stateChange(value){//状态
        if(value=='0'){
          this.listShow = false
        }else{
          this.listShow = true
          setTimeout(()=>{
            let num = accAdd(this.list.length,1) + ''
            if(this.list.length==0){
              this.list.push({
                id: guid(),
                ownerid:this.id,
                num:num,
                remark:''
              })
            }
          })
        }
      },
      callCategory(category){//定损单类型
        if(category=='1'||category=='2'){
          this.subShow = false
          if(this.sub!=''){
            this.insurance = this.sub.concat()
          }
          this.sub = ''//保险公司
          this.subName = ''//保险公司名称
          this.subid = ''//保险公司ID
          this.subCode = ''//保险公司编号
        }else if(category=='0'){
          this.subShow = true
          this.sub = this.insurance.concat()
          this.subid = this.subList[this.sub].id//保险公司id
          this.subCode = this.subList[this.sub].code//保险公司缩写
          this.subName = this.subList[this.sub].showName//保险公司名称
        }
      },
      subCall(){
        this.subid = this.subList[this.sub].id
        this.subCode = this.subList[this.sub].code
        this.subName = this.subList[this.sub].showName
      },
      save(){
        let b = this.idNo!=''
        if(!b&&this.carOwnerID!=''){
          this.$dialog.alert({
            tipValue:'需要维护车主的身份证号',
            alertImg:'warn',
            width:'330',
            closeCallBack: () => {
              this.maintainUserInformation()
            }
          })
          return
        }
        if(this.worksource == '4'){
          this.$refs.collectionRadio.$emit('verify')//维修类型
          if(this.insuranceCompany == ''){
            return
          }
        }
        this.$refs.applicableModelsRadio.$emit('verify')//车辆品牌
        let a = this.validator()
        if(a&&this.applicableModels!=''){
          let params = {
            id:this.id,
            address:this.address,//地址
            unitType:this.unitType,//送修人  0单位 1个人
            emailaddress:this.emailaddress,//邮箱
            personID:this.personid,//接待人ID
            personName:this.personName,//接待人姓名
            contactPersonID:this.contactPersonID,//联系人ID
            contactPerson:this.contactPerson,//联系人
            contactPersonPhone:this.contactPersonPhone,//联系人手机号
            contactPerson2:this.contactPerson2,//备用联系人
            contactPersonPhone2:this.contactPersonPhone2,//备用联系人手机号
            applicableModels:this.applicableModels,//适用车型

            carid:this.carid,//车辆ID
            carName:this.carName,//车辆
            carOwner:this.carOwner,//车主
            carOwnerID:this.carOwnerID,//车主ID

            brand:this.brand,//品牌名称id
            brandVal:this.brandVal,//品牌名称
            modelID:this.modelID,//车辆型号id
            modelVal:this.modelVal,//车辆型号

            ordertype:'0',//工单类型（保险理赔专用）
            ordernum:this.insuranceCompany,//工单类型下保险公司序号
            ordernumid:this.insuranceCompany,//工单类型下保险公司id

            visitDate:this.visitDate,//到访日期
            business:this.business,//业务来源
            worksource:this.worksource,//工单来源
            node:this.node,//接待编号
            otherNode:this.otherNode,//其它系统编号
            state:this.state,//状态(有意无意)
            remark:this.remark,//无意备注
            list:this.list,//无意的理由
            fixCompanyOrder:{
              id:this.pushRepairID,//推修公司id
              orderID:this.id,//接待单id
              type:this.workOrderlist.length=='0'&&this.guaranteeSlipList.length=='0'?'1':'0',//费率类型
              orderDate:this.workOrderlist.length!='0'?this.workOrderlist[0].workDate:'',
              policyDate:this.guaranteeSlipList.length!='0'?this.guaranteeSlipList[0].insertDate:''
            }
          }
          this.ajaxJson({
            url: '/fix/fixreception/save',
            data: params,
            call: (data)=>{
              if (data.type === 0) {
                this.$dialog.setReturnValue(this.id) //向父级页面id值
                this.$dialog.alert({
                  tipValue: data.message,
                  closeCallBack: () => {
                    this.$dialog.close()
                  }
                })
                // this.ajaxJson({
                //   url: '/fix/fixCompanyOrder/save',
                //   data: {
                //     id:this.pushRepairID,//推修公司id
                //     orderID:this.id,//接待单id
                //   },
                //   call: (da) => {
                //     if (da.type === 0) {
                //       this.$dialog.alert({
                //         tipValue: da.message,
                //         closeCallBack: () => {
                //           this.$dialog.close()
                //         }
                //       })
                //     }else{
                //       this.$dialog.alert({
                //         alertImg: 'error',
                //         tipValue: da.message,
                //         closeCallBack: () => {
                //         }
                //       })
                //     }
                //   }
                // })
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
        }else{
          // this.$dialog.alert({
          //   tipValue:'需要维护车辆型号',
          //   alertImg:'warn',
          //   width:'350',
          //   closeCallBack: (dt) => {
          //     if(this.modelVal==''){
          //       this.$dialog.OpenWindow({
          //         width: '1050',
          //         height: '750',
          //         url: '/vehicleForm?id='+this.carid,
          //         title: '维护车辆型号',
          //         closeCallBack: (dt) => {
          //           if (dt) {
          //             this.ajaxJson({
          //               url: '/Basic/initVehicleForm',
          //               data: {
          //                 id:dt
          //               },
          //               call: (da) => {
          //                 if(da){
          //                   this.modelVal = da.model
          //                 }
          //               }
          //             })
          //           }
          //         }
          //       })
          //     }
          //   }
          // })

        }
      },
      percentage(num, total) {
        num = parseFloat(num);
        total = parseFloat(total);
        if (isNaN(num) || isNaN(total)) {
          return "-";
        }
        return total <= 0 ? "0%" : (Math.round(num / total * 10000) / 100.00)+"%";
      },
      accessNumber(){
        let params ={
          subid:this.subid,
          code:this.subCode,
          category:this.category,
          applicableModels:this.applicableModels
        }
        this.ajaxJson({
          url: '/fix/fixOrder/initWorkOrder',
          loading:'0',
          data: params,
          call: (data) => {
            if(data.type==0){
              this.code = data.message
            }
          }
        })
      },
      //选择接待人
      selectClient(){
        this.$dialog.OpenWindow({
          width: '950',
          height: '700',
          url: '/selectPerson?category=0&categoryBefore=1',
          title: '选择接待人信息',
          closeCallBack: (data) => {
            if (data) {
              // this.client = data.name
              // this.clientID = data.id
              this.personName = data.name
              this.personid = data.id
            }
          }
        })
      },
      detailedInformation(data){
        /*if(data.name!=''){
          this.ajaxJson({
            url: '/Basic/personVueForm',
            loading:'0',
            data: {
              id:data.contactPersonID
            },
            call: (param) => {
              this.address = param.nativePlace//地址
              this.emailaddress = param.email//邮箱
            }
          })
        }*/
        console.log(data)
        this.unitType = data.assort //0是单位 1是个人

        this.brandVal = data.brand//品牌名称
        this.brand = data.brandID//品牌id
        this.modelID = data.modelID//车辆型号id
        this.modelVal = data.model//车辆型号
        if(data.model==''){
          this.modelPlaceholder = '需要维护车辆型号 (点击维护车辆型号)'
        }
        this.idNo = data.carIDNO//车主身份证号
        this.contactIDNO = data.contactPersonIDNO//联系人身份证号

        this.address = data.contactPersonNativePlace//地址
        this.emailaddress = data.contactPersonEmail//邮箱

        this.carName = data.plate
        this.carid = data.vehicleID
        this.contactPersonID = data.contactPersonID//联系人ID
        this.carOwnerID = data.carOwnerID//车主ID
        this.contactPerson = data.contactPersonName//联系人姓名
        this.carOwner = data.carOwner//车主姓名
        this.contactPersonPhone = data.contactPersonPhone//联系人手机号
        let list = this.applicableModelsList
        for(let i in list){
          if(data.brand!=''){
            if(list[i].showName==data.brand){
              this.applicableModels = list[i].num
            }
          }else{
            this.applicableModels = ''
          }
        }
        if(data.brand==null||data.brand==''){//车型为空时
          this.applicableModels = ''
          this.applicableModelsShow = false
        }else{
          this.applicableModelsShow = true
        }
        this.maintainUserInformation()
      },
      maintainUserInformation(){//车主和送修人身份证号为空
        if(this.idNo==''||this.idNo==null){
          this.$dialog.OpenWindow({
            width: '1050',
            height: '700',
            url: '/addPersonForm?id='+this.carOwnerID,
            title: '维护车主身份证',
            closeCallBack: (da) => {
              if (da) {
                this.ajaxJson({
                  url: '/Basic/personVueForm',
                  loading:'0',
                  data: {
                    id:da
                  },
                  call: (param) => {
                    this.idNo = param.idNo
                  }
                })
              }
            }
          })
        }
        // else if(this.contactIDNO==''||this.contactIDNO==null){
        //   this.$dialog.OpenWindow({
        //     width: '1050',
        //     height: '700',
        //     url: '/addPersonForm?id='+this.contactPersonID,
        //     title: '维护联系人身份证',
        //     closeCallBack: (da) => {
        //       if (da) {
        //         this.ajaxJson({
        //           url: '/Basic/personVueForm',
        //           loading:'0',
        //           data: {
        //             id:da
        //           },
        //           call: (param) => {
        //             this.contactIDNO = param.idNo
        //           }
        //         })
        //       }
        //     }
        //   })
        // }else if(this.contactIDNO!=''&&this.idNo!=''){
        //   return
        // }
      },
      //选择车辆
      plateEvent(){
        this.$dialog.OpenWindow({
          width: 1090,
          height: 720,
          url: '/selectWorkOrderPlate?addType=1',
          title: '选择车辆号',
          closeCallBack: (data) => {
            if (data) {
              if(data.brand==null||data.brand==''){//车型为空时
                this.applicableModels = ''
                this.applicableModelsShow = false
                this.$refs.applicableModelsRadio.$emit('verify')//车辆品牌

                this.$dialog.OpenWindow({
                  width: '1050',
                  height: '750',
                  url: '/vehicleForm?id='+data.vehicleID,
                  title: '维护车型',
                  closeCallBack: (dt) => {
                    if (dt) {
                      this.ajaxJson({
                        url: '/Insurance/getWorkOrderClient',
                        data: {
                          state:'',
                          carOwnerID:"",
                          init: false,
                          searchStr: dt,
                          pageIndex: 1
                        },
                        call: (da) => {
                          if(da.content.length=='1'){
                            this.detailedInformation(da.content[0])
                          }
                        }
                      })
                    }
                  }
                })
              }else{
                this.detailedInformation(data)
                this.applicableModelsShow = true
              }
              this.ajaxJson({
                url: '/fix/returnVisit/getManager',//查询回访记录
                loading:'0',
                data: {
                  personid:data.contactPersonID
                },
                call: (data) => {
                  this.returnVisitToRecordList = data.content
                }
              })
              console.log(data)
              if(data.vehicleID!=''){
                this.ajaxJson({
                  url: '/fix/fixOrder/queryForOrderByCarID',
                  // loading:'0',
                  data: {
                    vehicleID:data.vehicleID
                  },
                  call: (data) => {
                    this.workOrderlist = data.manager
                    this.guaranteeSlipList = data.billingVehicle
                    if(data.manager.length!='0'||data.billingVehicle.length!='0'){
                      let scrollHeight = $('.f_main').prop("scrollHeight");
                      $('html,body').animate({scrollTop:scrollHeight}, 1000);
                      // this.worksourceNoShowItemList = ['3']
                      // if(this.worksource=='3'){
                      //   this.worksource = '0'
                      // }
                    }
                    if(data.manager.length=='0'&&data.billingVehicle.length!='0'){
                      this.tabState=[{select:false},{select:true}]
                    }else if(data.manager.length!='0'&&data.billingVehicle.length=='0'){
                      this.tabState=[{select:true},{select:false}]
                    }else if(data.manager.length!='0'&&data.billingVehicle.length!='0'){
                      this.tabState=[{select:true},{select:false}]
                    }
                    // if(data.manager.length=='0'&&data.billingVehicle.length=='0'){
                    //   this.worksourceNoShowItemList = []
                    // }
                  }
                })
              }

              // if(data.phone==''){
              //   this.$dialog.OpenWindow({
              //     width: '950',
              //     height: '700',
              //     url: '/clientForm',
              //     title: '维护联系人信息',
              //     closeCallBack: (data) => {
              //       if (data) {
              //         this.principal = data.name
              //         this.principalID = data.id
              //       }
              //     }
              //   })
              // }
              // this.accessNumber()
            }
          }
        })
      },
      //选择负责人
      selectUnit (op) {
        this.$dialog.OpenWindow({
          width: '950',
          height: '700',
          url: '/selectPerson?category=0&categoryBefore=1',
          title: '选择负责人信息',
          closeCallBack: (data) => {
            if (data) {
              this.principal = data.name
              this.principalID = data.id
            }
          }
        })
      },
      initData () {
        let params = {
          id:this.id,
        }
        this.init({
          data:{},
          url: '/fix/fixreception/initForm',
          all: (data) => {
            // /* 公共 无论查看和添加返回数据 */
            if(data.id!=''){
              this.id = data.id
            }
            this.companyName = data.companyName//推修公司名称
            this.companyID = data.companyID//推修公司ID
            this.address = data.address//地址
            this.emailaddress = data.emailaddress//邮箱
            this.applicableModelsList = data.applicableModelsPsd.list
            this.worksourceList = data.workSourcePsd.list
            this.businessList = data.businessPsd.list
            if(this.listViewType!=1){
              this.personName = sessionStorage.getItem('____currentUser')
              this.personid = sessionStorage.getItem('____currentUserID')
            }else{
              this.personName = data.personName
              this.personid = data.personid
            }
            this.insuranceCompanyList = data.mapList
            this.applicableModels = data.applicableModels
            this.worksource = data.worksource//工单来源
            this.business = data.business//业务来源

            this.contactPersonID = data.contactPersonID//联系人ID
            this.contactPerson = data.contactPerson//联系人姓名
            this.contactPersonPhone = data.contactPersonPhone//联系人手机号
            this.applicableModels = data.applicableModels//适用车型
            this.carid = data.carid//车辆id
            this.carName = data.carName//车辆
            this.carOwner = data.carOwner//车主
            this.carOwnerID = data.carOwnerID//车主ID

            if(data.visitDate!=null){
              this.visitDate = data.visitDate//到访日期
            }
            this.otherNode = data.otherNode//其它系统编号
            if(data.state!=''){
              this.state = data.state//状态(有意无意)
            }
            this.remark = data.remark//备注
            this.list = data.list//无意的理由
            this.modelVal = data.modelVal//车辆型号

            this.workOrderlist = data.queryForOrderByCarID.manager
            this.guaranteeSlipList = data.queryForOrderByCarID.billingVehicle

            if(this.state=='1'){
              this.listShow = true
            }
            if(data.carName!=''){
              this.ajaxJson({
                url: '/Insurance/getWorkOrderClient',
                data: {
                  state:'',
                  carOwnerID:'',
                  init: false,
                  searchStr: data.carOwnerID,
                  pageIndex: 1
                },
                call: (da) => {
                  if(da.content.length>='1'){
                    this.idNo = da.content[0].carIDNO//车主身份证号
                    this.contactIDNO = da.content[0].contactPersonIDNO//联系人身份证号
                  }
                }
              })
            }

            if(this.workOrderlist.length=='0'&&this.guaranteeSlipList.length!='0'){
              this.tabState=[{select:false},{select:true}]
            }else if(this.workOrderlist.length!='0'&&this.guaranteeSlipList.length=='0'){
              this.tabState=[{select:true},{select:false}]
            }else if(this.workOrderlist.length!='0'&&this.guaranteeSlipList.length!='0'){
              this.tabState=[{select:true},{select:false}]
            }
            // if(this.workOrderlist.length!='0'||this.guaranteeSlipList.length!='0'){
            //   let scrollHeight = $('.f_main').prop("scrollHeight");
            //   $('html,body').animate({scrollTop:scrollHeight}, 1000);
            // }

            if(data.contactPerson2!=''&&data.contactPersonPhone2==''){
            }else if(data.contactPerson2==''&&data.contactPersonPhone2!=''){
            }else if(data.contactPerson2!=''&&data.contactPersonPhone2!=''){
            }else{
              this.addPresonShow = false
              return
            }
            this.addPresonShow = true
            this.contactPerson2 = data.contactPerson2
            this.contactPersonPhone2 = data.contactPersonPhone2


          },
          add: (data) => {
            /* 需要添加的数据 */
          },
          look: (data) => {
          }
        })
      },
    },
    watch:{
      invoiceDetails(val){
      }
    },
    created () {
      this.setQuery2Value('id')
      this.setQuery2Value('listViewType')
      // this.otherCode = 'O' + Math.floor(Math.random()*1000) + 'C' + Math.floor(Math.random()*1000000)
      // this.accessNumber()
      this.initData()

    }
  }
</script>

<style scoped>
  .solidYhm{
    border: 1px solid #ccc;
  }
</style>
