<template>
    <div class="f_main">
      <yhm-formbody>
        <template #title >
          <span>基本信息</span>
        </template>
        <template #control>
          <yhm-form-select placeholder="" title="保险公司" subtitle="名称" :value="unitname" id="unitname" rule="R0000" @click="unitSelect"></yhm-form-select>
          <!--          <yhm-form-text title="单位简称" :value="unitshort" id="unitshort"></yhm-form-text>-->

          <!--        <yhm-form-select placeholder="" title="联系人" subtitle="" :value="person" id="person" rule="R0000" @click="personSelect"></yhm-form-select>-->
          <!--        <yhm-form-text title="推修费率" :value="rate" id="rate" rule="R0000" after-icon="icon-percentage"></yhm-form-text>-->
          <!--        <yhm-form-radio title="结算类型" ref="typeRadio" :select-list="typeList" :value="type" id="type" rule="#"></yhm-form-radio>-->
          <!--        <yhm-form-date title="开始时间" :value="startDate" id="startDate" rule="R0000"></yhm-form-date>-->
          <!--        <yhm-form-date title="结束时间" :value="endDate" id="endDate" :min="startDate" rule="R0000"></yhm-form-date>-->
          <!--        &lt;!&ndash;<yhm-form-text title="合同" width="1" :value="companyID" id="companyID" ></yhm-form-text>&ndash;&gt;-->
          <!--        <yhm-formupload :ownerID="id" :value="fileList" id="fileList" title="上传合同" tag="fixCompany" rule="#"></yhm-formupload>-->
        </template>
      </yhm-formbody>
      <div class="f_split"></div>
      <yhm-form-list-edit>
        <template #title>
          <span>保险公司条约</span>
        </template>
        <template #operate>
          <yhm-commonbutton value="添加" icon="btnAdd" @call="add()"></yhm-commonbutton>
        </template>
        <template #listHead>
          <!--          <yhm-managerth style="width: 38px" title="查看"></yhm-managerth>-->
          <yhm-managerth style="width: 40px" title="序号"></yhm-managerth>
          <yhm-managerth title="条约名称"></yhm-managerth>
          <yhm-managerth style="width: 40px" title="删除"></yhm-managerth>

        </template>
        <template #listBody >
          <tr v-for="(item,index) in content" :key="index" :class="{InterlacBg:index%2!==0}" >
            <div style="display: flex;justify-content: center;text-align: center">{{Number(index)+1}}</div>
            <!--            <yhm-manager-td-look class="solidYhm" @click="listView(item)"></yhm-manager-td-look>-->
            <!--            <yhm-manager-td-date class="solidYhm" :value="item.detailname"></yhm-manager-td-date>-->
            <yhm-form-td-textbox width="880" id="detailname" :list="content" listid="content" :value="item" rule="R0000"></yhm-form-td-textbox>
            <yhm-form-td-delete width="40" :list="content" :value="item" :del-click="false" @click="delFromList(index)"></yhm-form-td-delete>

          </tr>
        </template>
        <template #empty>
          <span class="m_listNoData" v-show="content.length=='0'?true:false">暂时没有数据</span>
        </template>
        <!--分页控件-->
<!--        <template #pager>-->
<!--          <yhm-pagination :pager="pager" :is-page-size="false" @initData="initData()"></yhm-pagination>-->
<!--        </template>-->
      </yhm-form-list-edit>
      <yhm-formoperate :createName="createName" :insertDate="insertDate" :updateName="updateName" :updateDate="updateDate">
        <template #btn>
          <yhm-commonbutton value="保存" icon="btnSave" :flicker="true" @call="save()"></yhm-commonbutton>
        </template>
      </yhm-formoperate>
    </div>
</template>

<script>
  import { formmixin } from '@/assets/form.js'
  import {guid} from '@/assets/common.js'
  export default {
    name: 'workOrderInsuranceUnitForm',
    mixins: [formmixin],
    data(){
      return{
        unitname:'',//保险公司名称
        unitID:'',//保险公司id
        content:[],
        pager: {
          total: 0, // 总条数
          pageSize: 5, // 每页条数
          pageIndex: 1, // 当前页码
          selectCount: 0 // 选中条数
        },
      }
    },
    methods:{
      delFromList(){
        this.$dialog.confirm({
          width: 300,
          tipValue: '是否确认删除当前条约记录？',
          alertImg: 'warn',
          okCallBack: ()=>{
            this.content.splice(index,1)
          }
        })
      },
      add(){
        this.content.push({
          id: guid(),
          ownerID:this.id,
          detailname:''
        })
      },
      save(){
        let a = this.validator()
        let params = {
          id:this.id,
          unitname:this.unitname,//保险公司名称
          unitID:this.unitID,//保险公司id
          manager:this.content
        }
        if(a){
          if(this.content.length=='0'){
            this.$dialog.alert({
              tipValue:'至少需要添加一条保险公司条约',
              alertImg:'warn',
              width:'330',
              closeCallBack: () => {
                this.add()
              }
            })
          }else{
            this.ajaxJson({
              url: '/fix/fixOrderUnit/saveFixOrderUnitEntity',
              data:params,
              call: (data) => {
                if(data.type=='0'){
                  this.$dialog.alert({
                    tipValue:data.message,
                    closeCallBack: () => {
                      // if(this.personList.length=='0'&&this.content.length=='0'){
                      // }else{
                      this.$dialog.close();
                      // }
                    }
                  })
                }else{
                  this.$dialog.alert({
                    width:'350',
                    alertImg: 'error',
                    tipValue:data.message,
                    closeCallBack: () => {
                    }
                  })
                }
              }
            })
          }
        }
      },
      unitSelect(){
        this.$dialog.OpenWindow({
          width: '950',
          height: '700',
          url: '/selectWorkOrderInsurance',
          title: '选择保险公司',
          closeCallBack: (data) => {
            if (data) {
              this.unitname = data.showName
              this.unitID = data.id
            }
          }
        })
      },
      initData () {
        this.init({
          url: '/fix/fixOrderUnit/initForm',
          data:{
            // id:this.id,
            // pageSize:this.pager.pageSize,
            // pageIndex:this.pager.pageIndex
          },
          all: (data) => {

          },
          add: (data) => {
            /* 需要添加的数据 */
          },
          look: (data) => {
            this.unitname = data.unitname
            this.unitID = data.unitID
            this.content = data.manager
          }
        })
      }
    },
    created () {
      this.initData()

    }
  }
</script>

<style scoped>

</style>
