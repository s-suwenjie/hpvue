<template>
  <div class="f_main" >
    <yhm-formbody style="width: 1400px" >
      <template #title>基本信息</template>
      <template #control>
        <!--<yhm-formupload :ownerID="id" :value="fileList"  id="fileList" title="回款对应单(支持单据)" tag="statement" multiple="multiple" category="3" ></yhm-formupload>-->
        <yhm-form-upload-image @call="importEvent" title="导入Excel" tag="inputTax" discription="建议上传.xlsx格式" :value="icon" id="icon" rule="#" ></yhm-form-upload-image>
      </template>
    </yhm-formbody>
    <div class="f_split"></div>
    <div class="f_split"></div>
    <yhm-form-list-edit  class="f_area1400">
      <template #title>未添加数据</template>
      <template #listHead>
        <yhm-managerth style="width:38px" title="序号"></yhm-managerth>
        <yhm-managerth style="width: 300px;" title="公司名称"></yhm-managerth>
        <yhm-managerth style="width: 150px;" title="税号"></yhm-managerth>
        <yhm-managerth style="width: 100px;" title="发票代码"></yhm-managerth>
        <yhm-managerth style="width: 100px;" title="发票号码"></yhm-managerth>
        <yhm-managerth style="width: 100px;" title="开票日期"></yhm-managerth>
        <yhm-managerth style="width: 100px;" title="发票金额"></yhm-managerth>
        <yhm-managerth style="width: 100px;" title="税额"></yhm-managerth>
        <yhm-managerth style="width: 100px;" title="有效税额"></yhm-managerth>
        <yhm-managerth style="width: 100px;" title="认证时间"></yhm-managerth>
        <yhm-managerth title="操作" ></yhm-managerth>
      </template>
      <template #listBody >
        <tr v-for="(item,index) in toBeVerified" :key="index" :class="{InterlacBg:index%2!==0}" >
          <yhm-manager-td-center :value="index+1+''"></yhm-manager-td-center>
          <yhm-manager-td-center :value="item.unit"></yhm-manager-td-center>
          <yhm-manager-td-center :value="item.taxNumber"></yhm-manager-td-center>
          <yhm-manager-td-center :value="item.code"></yhm-manager-td-center>
          <yhm-manager-td-center :value="item.invoiceCode"></yhm-manager-td-center>
          <yhm-manager-td-center :value="item.invoiceDate"></yhm-manager-td-center>
          <yhm-manager-td-center :value="item.money"></yhm-manager-td-center>
          <yhm-manager-td-center :value="item.taxMoney"></yhm-manager-td-center>
          <yhm-manager-td-center :value="item.deductionMoney"></yhm-manager-td-center>
          <yhm-manager-td-center :value="item.attestationDate"></yhm-manager-td-center>
          <yhm-manager-td-operate>
            <yhm-manager-td-operate-button v-show="item.state =='0'&&item.unitID!=null" @click="add(item)" icon="btnAdd" value="添加" color="#7112da"></yhm-manager-td-operate-button>
            <yhm-manager-td-operate-button v-show="item.state =='0'&&item.unitID==null" @click="addUnit(item)" icon="btnAdd" value="添加单位信息" color="#7112da"></yhm-manager-td-operate-button>
          </yhm-manager-td-operate>
        </tr>
      </template>
      <template #empty>
        <span class="m_listNoData" v-show="toBeVerified.length==0">暂时没有数据</span>
      </template>
    </yhm-form-list-edit>
    <yhm-form-list-edit  class="f_area1400">
      <template #title>已验证数据</template>
      <template #listHead>
        <yhm-managerth style="width:38px" title="序号"></yhm-managerth>
        <yhm-managerth style="width: 300px;" title="公司名称"></yhm-managerth>
        <yhm-managerth style="width: 150px;" title="税号"></yhm-managerth>
        <yhm-managerth style="width: 100px;" title="发票代码"></yhm-managerth>
        <yhm-managerth style="width: 100px;" title="发票号码"></yhm-managerth>
        <yhm-managerth style="width: 100px;" title="开票日期"></yhm-managerth>
        <yhm-managerth style="width: 100px;" title="发票金额"></yhm-managerth>
        <yhm-managerth style="width: 100px;" title="税额"></yhm-managerth>
        <yhm-managerth style="width: 100px;" title="有效税额"></yhm-managerth>
        <yhm-managerth style="width: 100px;" title="认证时间"></yhm-managerth>
      </template>
      <template #listBody >
        <tr v-for="(item,index) in verified" :key="index" :class="{InterlacBg:index%2!==0}" >
          <yhm-manager-td-center :value="index+1+''"></yhm-manager-td-center>
          <yhm-manager-td-center :value="item.unit"></yhm-manager-td-center>
          <yhm-manager-td-center :value="item.taxNumber"></yhm-manager-td-center>
          <yhm-manager-td-center :value="item.code"></yhm-manager-td-center>
          <yhm-manager-td-center :value="item.invoiceCode"></yhm-manager-td-center>
          <yhm-manager-td-center :value="item.invoiceDate"></yhm-manager-td-center>
          <yhm-manager-td-center :value="item.money"></yhm-manager-td-center>
          <yhm-manager-td-center :value="item.taxMoney"></yhm-manager-td-center>
          <yhm-manager-td-center :value="item.deductionMoney"></yhm-manager-td-center>
          <yhm-manager-td-center :value="item.attestationDate"></yhm-manager-td-center>
        </tr>
      </template>
      <template #empty>
        <span class="m_listNoData" v-show="verified.length==0">暂时没有数据</span>
      </template>
    </yhm-form-list-edit>
    <yhm-formoperate :title-show="true" title-left="120" :createName="createName" :insertDate="insertDate" :updateName="updateName" :updateDate="updateDate">

    </yhm-formoperate>
  </div>
</template>

<script>
  import { formmixin } from '@/assets/form.js'
  import {number2chinese,accMul, accAdd, guid, formatTime, formatDate} from '@/assets/common.js'
  export default {
    name: 'deduction',
    mixins: [formmixin],
    data(){
      return{
        toBeVerified:[],
        verified:[],
        icon:'',
        ownerID:guid(),
        storeName:'',
      }
    },
    methods:{
      addUnit(item){
        this.$dialog.OpenWindow({
          width: 1050,
          height: 620,
          url:'/addUnitForm?skip=0&name='+item.unit,
          title:'添加单位信息',
          closeCallBack:(data) =>{
            if(data){
              this.uploadFile()
            }
          }
        })
      },
      add(item){
        this.$dialog.OpenWindow({
          width: 1050,
          height: 620,
          url:'/inputTaxForm?ownerType=1&ownerID='+item.id,
          title:'添加进项税信息',
          closeCallBack:(data) =>{
            if(data){
              this.uploadFile()
            }
          }
        })
      },
      getInformation(){
        this.ajaxJson({
          url: '/finance/inputTax/getToBeVerifiedInformation',
          data: {
            ownerID:this.ownerID
          },
          call: (data) => {
            if (data) {
              this.toBeVerified=data.toBeVerified
              this.verified=data.verified
            }
          }
        })
      },
      uploadFile(){
        let params={
          storeName:this.storeName,
          ownerID:this.ownerID,
        }
        this.ajaxJson({
          url: '/finance/inputTax/uploadFile',
          data: params,
          call: (data) => {
            if (data) {
              this.toBeVerified=data.toBeVerified
              this.verified=data.verified
            }
          }
        })
      },
      importEvent(data){
        this.storeName=data.storeName
        let params={
          storeName:data.storeName,
          ownerID:this.ownerID,
        }
        this.ajaxJson({
          url: '/finance/inputTax/uploadFile',
          data: params,
          call: (data) => {
            if (data) {
              this.toBeVerified=data.toBeVerified
              this.verified=data.verified
            }
          }
        })
      },
    }
  }
</script>

<style scoped>

</style>
