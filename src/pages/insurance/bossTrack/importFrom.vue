<template>
  <div class="f_main" >
    <yhm-formbody style="width: 1400px" >
      <template #title>基本信息</template>
      <template #control>
        <!--<yhm-formupload :ownerID="id" :value="fileList"  id="fileList" title="回款对应单(支持单据)" tag="statement" multiple="multiple" category="3" ></yhm-formupload>-->
        <yhm-form-upload-image @call="importEvent" title="导入Excel" tag="importExcel" discription="建议上传.xls格式" :value="icon" id="icon" rule="#" ></yhm-form-upload-image>
      </template>
    </yhm-formbody>
    <div class="f_split"></div>
    <div class="f_split"></div>
    <yhm-form-list-edit  class="f_area1400">
      <template #title>账单信息</template>
      <template #listHead>
        <yhm-managerth style="width:38px" title="序号"></yhm-managerth>
        <yhm-managerth title="牌照号"></yhm-managerth>
        <yhm-managerth title="车架号"></yhm-managerth>
        <yhm-managerth title="发动机号"></yhm-managerth>
        <yhm-managerth title="品牌"></yhm-managerth>
        <yhm-managerth title="车型"></yhm-managerth>
        <yhm-managerth title="车辆班本"></yhm-managerth>
        <yhm-managerth title="车辆颜色"></yhm-managerth>

        <yhm-managerth title="登记日期"></yhm-managerth>
        <yhm-managerth title="车主姓名"></yhm-managerth>
        <yhm-managerth title="车主电话"></yhm-managerth>
        <yhm-managerth title="车主性别"></yhm-managerth>
        <yhm-managerth title="车主邮箱"></yhm-managerth>
        <yhm-managerth title="联系人姓名"></yhm-managerth>
        <yhm-managerth title="联系人电话"></yhm-managerth>

        <yhm-managerth title="联系人证件号"></yhm-managerth>
        <yhm-managerth title="联系人性别"></yhm-managerth>
        <yhm-managerth title="联系人生日"></yhm-managerth>
        <yhm-managerth title="联系人地址"></yhm-managerth>
      </template>
      <template #listBody >
        <tr v-for="(item,index) in content" :key="index" :class="{InterlacBg:index%2!==0}" >
          <yhm-manager-td-center  :value="index+1+''"></yhm-manager-td-center>
          <yhm-manager-td-center  :value="item.plate"></yhm-manager-td-center>
          <yhm-manager-td-center  :value="item.frameNumber"></yhm-manager-td-center>
          <yhm-manager-td-center  :value="item.engineNumber"></yhm-manager-td-center>
          <yhm-manager-td-center  :value="item.brand"></yhm-manager-td-center>
          <yhm-manager-td-center  :value="item.model"></yhm-manager-td-center>
          <yhm-manager-td-center  :value="item.version"></yhm-manager-td-center>
          <yhm-manager-td-center  :value="item.color"></yhm-manager-td-center>
          <yhm-manager-td-center  :value="item.registerDate"></yhm-manager-td-center>
          <yhm-manager-td-center  :value="item.clientName"></yhm-manager-td-center>
          <yhm-manager-td-center  :value="item.clientPhone"></yhm-manager-td-center>
          <yhm-manager-td-center  :value="item.clientSex"></yhm-manager-td-center>
          <yhm-manager-td-center  :value="item.clientEmail"></yhm-manager-td-center>
          <yhm-manager-td-center  :value="item.contactName"></yhm-manager-td-center>
          <yhm-manager-td-center  :value="item.contactPhone"></yhm-manager-td-center>
          <yhm-manager-td-center  :value="item.contactIDNo"></yhm-manager-td-center>
          <yhm-manager-td-center  :value="item.contactSex"></yhm-manager-td-center>
          <yhm-manager-td-center  :value="item.contactBirthday"></yhm-manager-td-center>
          <yhm-manager-td-center  :value="item.contactNativePlace"></yhm-manager-td-center>



        </tr>
      </template>

      <template #empty>
        <span class="m_listNoData" v-show="content.length!=0?false:true">暂时没有数据</span>
      </template>
    </yhm-form-list-edit>
    <yhm-formoperate :title-show="true" title-left="120" :createName="createName" :insertDate="insertDate" :updateName="updateName" :updateDate="updateDate">
      <template #btn>

        <yhm-commonbutton value="保存" icon="btnSave" :flicker="true" @call="checkSave()"></yhm-commonbutton>
      </template>

    </yhm-formoperate>
  </div>
</template>

<script>
  import { formmixin } from '@/assets/form.js'
  export default {
    name: 'importFrom',
    mixins: [formmixin],
    data(){
      return{
        content:[],
        icon:'',
      }
    },
    methods:{
      checkSave(){
        this.ajaxJson({
          url: '/Insurance/transfer',
          call: (data) => {
            if (data.type === 0) {
              this.$dialog.alert({
                tipValue: '添加成功',
                closeCallBack: () => {
                  this.$dialog.setReturnValue(1111)
                  this.$dialog.close()
                }
              })
            }else if(data.type === 1){
              this.$dialog.alert({
                alertImg:'warn',
                tipValue: data.message
              })
            }
          }
        })
      },

      importEvent(data){
        let params={
          storeName:data.storeName
        }
        this.ajaxJson({
          url: '/Insurance/importExcel',
          data:params,
          call: (data) => {
            if (data.type === 0) {
              this.$dialog.alert({
                tipValue: data.message,
                closeCallBack: () => {
                  this.ajaxJson({
                    url: '/Insurance/selectTemporary',
                    call: (dataTemp) => {
                      this.content=dataTemp.content
                    }
                  })
                }
              })
            }else if(data.type === 1){
              this.$dialog.alert({
                alertImg:'warn',
                tipValue: data.message
              })
            }
          }
        })

      },
    },
  }
</script>

<style scoped>
</style>
