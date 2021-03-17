<template>
  <div class="f_main">
    <yhm-schedule ref="schedule" :config="scheduleConfig"></yhm-schedule>
    <yhm-formbody>
      <template #title>基本信息</template>
      <template #control>
        <yhm-form-text ref="name" :no-edit="keyChange" title="key" :value="name" id="name" rule="R0000"></yhm-form-text>
        <yhm-form-textarea title="value" :value="value" id="value" rule="R0000"></yhm-form-textarea>
      </template>
    </yhm-formbody>

    <yhm-formoperate :createName="createName" :insertDate="insertDate" :updateName="updateName" :updateDate="updateDate">
      <template #btn>
        <yhm-commonbutton value="保存" icon="btnSave" :flicker="true" @call="save()"></yhm-commonbutton>
      </template>
    </yhm-formoperate>
  </div>
</template>

<script>
  import { formmixin } from '@/assets/form.js'
  export default {
    name: 'configForm',
    mixins: [formmixin],
    data () {
      return {
        scheduleConfig:{
          autoAddFinish: false,
          current: 1,
          event: false,
          finish: false,
          list: [{name: "0", show: true}, {name: "1", show: true}, {name: "18", show: true}],
          reject: false,
          select: -1,


          // list:[
          //   {name:'第一步',show:true},
          //   {name:'第二步',show:true}
          // ],
          // current:1,          //当前步骤
          // reject:false,       //是否驳回状态
          // event:true,         //步骤条能不能点击
          // isFinish:false,     //当前步骤是否完成
          // select:-1,          //当流程结束后选择的节点（流程走完了，查看使用，isFinish = true）
          // autoAddFinish:true  //自动添加完成步骤
        },
        name:'',
        value:'',
        keyChange:'0'
      }
    },
    methods:{
      save(){
        if (this.validator()) {
          if(this.isAdd){
            this.$dialog.confirm({
              width:400,
              tipValue:'保存后Key的值将不能修改，确定保存吗？',
              okCallBack:() => {
                this.saveOperate()
              }
            })
          }
          else{
            this.saveOperate()
          }
        }
      },
      saveOperate(){
        var params = {
          id: this.id,
          name: this.name,
          value: this.value
        }
        this.ajaxJson({
          url: '/sys/config/save',
          data: params,
          call: (data) => {
            if (data.type == 0) {
              this.$dialog.setReturnValue(this.id)
              this.$dialog.alert({
                tipValue: data.message,
                closeCallBack: () => {
                  this.$dialog.close()
                }
              })
            }
          }
        })
      }
    },
    created () {
      this.init({
        url: '/sys/config/initForm',
        all: (data) => {
          //添加查看的时候都需要的代码

        },
        add: (data) => {
          //添加时独有的代码
        },
        look: (data) => {
          //查看时独有的信息
          this.keyChange = "1"
          this.name = data.name
          this.value = data.value
        }
      })
    }
  }
</script>

<style scoped>

</style>
