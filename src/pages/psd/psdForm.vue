<template>
  <div class="f_main f_main_customize">
    <yhm-formbody>
      <template #title>基本信息</template>
      <template #control>
        <yhm-form-text ref="name" @repeatverify="nameVerifyEvent" title="素材组名" :value="name" id="name" rule="R0000"></yhm-form-text>
        <yhm-form-text title="分组标签" :value="tag" id="tag"></yhm-form-text>
        <yhm-form-textarea title="备注" subtitle="备注备注" :value="remark" id="remark" rule="R0000"></yhm-form-textarea>
      </template>
    </yhm-formbody>
    <!-- 空行 -->
    <div class="f_split"></div>

    <yhm-form-list-edit>
      <template #title>分组成员信息</template>
      <template #operate>
        <yhm-commonbutton value="添加分组成员" icon="btnAdd" @call="addDetail"></yhm-commonbutton>
      </template>
      <template #listHead>
        <yhm-managerth style="width: 300px" title="名称"></yhm-managerth>
        <yhm-managerth style="width: 250px" title="辅助信息"></yhm-managerth>
        <yhm-managerth style="width: 240px" title="字体颜色"></yhm-managerth>
        <yhm-managerth style="width: 120px" title="序号"></yhm-managerth>
        <yhm-managerth style="width: 40px" title="删除"></yhm-managerth>
      </template>
      <template #listBody>
        <tr v-for="(item,index) in details" :key="index" :class="{InterlacBg:index%2!==0}">
          <yhm-form-td-textbox width="300" :list="details" listid="details" :value="item" id="showName" rule="R0000"></yhm-form-td-textbox>
          <yhm-form-td-textbox width="250" :list="details" listid="details" :value="item" id="img"></yhm-form-td-textbox>
          <yhm-form-td-textbox width="240" :list="details" listid="details" :value="item" id="color"></yhm-form-td-textbox>
          <yhm-form-td-textbox width="120" :list="details" listid="details" :value="item" id="num" rule="R0000"></yhm-form-td-textbox>
          <yhm-form-td-delete :must="1" width="40" :list="details" :value="item"></yhm-form-td-delete>
        </tr>
      </template>
    </yhm-form-list-edit>

    <yhm-formoperate :createName="createName" :insertDate="insertDate" :updateName="updateName" :updateDate="updateDate">
      <template #btn>
        <yhm-commonbutton value="保存" icon="btnSave" :flicker="true" @call="save()"></yhm-commonbutton>
      </template>
    </yhm-formoperate>
  </div>

</template>

<script>
  import { guid,accAdd,accMul,formatTime } from '@/assets/common.js'
  import { formmixin } from '@/assets/form.js'
  export default {
    name: 'psdForm',
    mixins: [formmixin],
    data(){
      return{
        name:'',
        tag:'',
        remark:'',
        details:[],
      }
    },
    methods:{
      //重复验证,基于控件操作的验证
      nameVerifyEvent(){
        this.ajaxJson({
          url:"/SysManager/isPsdExistByName",
          data:{
            id:this.id,
            name:this.name
          },
          loading:"0",
          call:(data) =>{
            if(data.type === 0){//说明存在，调用控件验证显示规则
              this.$refs.name.errorEvent("素材组名重复")
            }
          }
        })
      },
      async isNameVerifyEvent(){
        let result = await this.ajaxAsync({
          url:"/SysManager/isPsdExistByName",
          data:{
            id:this.id,
            name:this.name
          },
          loading:"0"
        })
        if(result.type === 0){//说明存在，调用控件验证显示规则
          this.$refs.name.errorEvent("素材组名重复")
          return false
        }
        return true
      },
      addDetail(){
        let insertDate = new Date(accAdd(new Date().getTime(), accMul(this.details.length, 1000)))
        let item = {
          id:guid(),
          insertDate: formatTime(insertDate),
          ownerID:this.id,
          showName: "",
          num:this.details.length + '',
          img:"",
          color:""
        }
        this.details.push(item)
      },
      async save(){
        let a = await this.isNameVerifyEvent()
        let b = this.validator()
        if (a && b) {
          var params = {
            id: this.id,
            name:this.name,
            tag:this.tag,
            remark:this.remark,
            details:this.details,
          }
          this.ajaxJson({
            url: '/SysManager/savePsd',
            data: params,
            call: (data) => {
              if (data.type == 0) {
                this.$dialog.setReturnValue(this.id)
                this.$dialog.alert({
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
    created () {
      this.init({
        url: '/SysManager/initPsdForm',
        all: (data) => {
          //添加查看的时候都需要的代码
        },
        add: (data) => {
          //添加时独有的代码
          //初始化分组成员信息
          this.addDetail()
        },
        look: (data) => {
          //查看时独有的信息
          this.name = data.name
          this.tag = data.tag
          this.remark = data.remark
          this.details = data.details
        }
      })
    }
  }
</script>

<style scoped>
  .f_operate{
    margin: 0 -20px;
  }
</style>
