<template>
  <div>
    <div class="f_main">
      <yhm-formbody>
        <template #title>基本信息</template>
        <template #control>
          <yhm-form-text title="模板ID" :value="templateID" id="templateID" rule="R0000"></yhm-form-text>
          <yhm-form-radio title="模板类型" :select-list="categoryList" :value="category" id="category"></yhm-form-radio>
          <yhm-form-text title="模板名称" :value="name" id="name" rule="R0000"></yhm-form-text>
          <yhm-form-text title="申请时间" :value="workDate" id="workDate" rule="R0000"></yhm-form-text>
          <yhm-form-textarea title="模板内容" :value="content" id="content" rule="R0000"></yhm-form-textarea>
          <yhm-form-textarea title="备注" :value="remark" id="remark"></yhm-form-textarea>
        </template>
      </yhm-formbody>
      <!-- 空行 -->
      <div class="f_split"></div>
      <yhm-form-list-edit>
        <template #title>动态内容</template>
        <template #operate>
          <yhm-commonbutton value="添加动态内容" icon="btnAdd" @call="addDetail"></yhm-commonbutton>
        </template>
        <template #listHead>
          <yhm-managerth width="60" title="序号"></yhm-managerth>
          <yhm-managerth width="860" title="内容说明"></yhm-managerth>
          <yhm-managerth width="40" title="删除"></yhm-managerth>
        </template>
        <template #listBody>
          <tr v-for="(item,index) in details" :key="index" :class="{InterlacBg:index%2!==0}">
            <yhm-manager-td-center width="60" :value="index+1"></yhm-manager-td-center>
            <yhm-form-td-textbox width="860" :list="details" listid="details" :value="item" id="value"></yhm-form-td-textbox>
            <yhm-form-td-delete width="40" :list="details" :value="item"></yhm-form-td-delete>
          </tr>
        </template>
        <!--数据空提示-->
        <template #empty>
          <span class="m_listNoData" v-show="details.length === 0">暂时没有数据</span>
        </template>
      </yhm-form-list-edit>
    </div>
    <yhm-formoperate :createName="createName" :insertDate="insertDate" :updateName="updateName" :updateDate="updateDate">
      <template #btn>
        <yhm-commonbutton value="保存" icon="btnSave" :flicker="true" @call="save(0)"></yhm-commonbutton>
      </template>
    </yhm-formoperate>
  </div>
</template>

<script>
  import { guid,accAdd,accMul,formatTime } from '@/assets/common.js'
  import { formmixin } from '@/assets/form.js'
  export default {
    name: 'smsTemplateForm',
    mixins: [formmixin],
    data() {
      return {
        templateID:'',      //模板ID
        category:0,         //模板类型（0普通短信，1营销短信）
        name:'',            //模板名称
        workDate:'',        //申请时间
        content:'',         //模板内容
        dynamicQuantity:0,  //动态内容数量
        state:1,            //状态（0停用，1启用）
        remark:'',          //备注

        details:[],         //动态内容

        categoryList:[],              //优惠券类型集合
      }
    },
    methods:{
      //添加动态内容明细
      addDetail(){
        let insertDate = new Date(accAdd(new Date().getTime(), accMul(this.details.length, 1000)))
        let item = {
          id:guid(),
          insertDate: formatTime(insertDate),
          ownerID:this.id,
          value:''
        }
        this.details.push(item)
      },
      save(op) {
        if (this.validator()) {
          let params = {
            id: this.id,
            templateID:this.templateID,
            category:this.category,
            name:this.name,
            workDate:this.workDate,
            content:this.content,
            dynamicQuantity:this.details.length,
            state:this.state,
            remark:this.remark,
            details:this.details
          }
          this.ajaxJson({
            url: '/sys/smsTemplate/save',
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
              }
              else{
                this.$dialog.alert({
                  width: '300',
                  alertImg: 'error',
                  tipValue: data.message
                })
              }
            }
          })
        }
      }
    },
    created () {
      this.init({
        url: '/sys/smsTemplate/initForm',
        all: (data) => {
          this.category = data.categoryPsd.value
          this.categoryList = data.categoryPsd.list
        },
        add: (data) => {

        },
        look: (data) => {
          this.templateID = data.templateID
          this.name = data.name
          this.workDate = data.workDate
          this.content = data.content
          this.remark = data.remark
          this.details = data.details
        }
      })
    }
  }
</script>

<style scoped>

</style>
