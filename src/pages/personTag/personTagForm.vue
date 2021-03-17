<template>
  <div class="f_main">
    <yhm-formbody>
      <template #title>基本信息</template>
      <template #control>
        <yhm-form-text title="标签名称" :value="name" id="name" rule="R0000"></yhm-form-text>
        <yhm-form-textarea title="备注" no-edit="1" :value="remark" id="remark"></yhm-form-textarea>
        <yhm-form-select-more title="包含人员" :value="details" id="details" @click="selectPerson()"></yhm-form-select-more>
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
  import { guid, accAdd, accMul,formatTime } from '@/assets/common.js'
  import { formmixin } from '@/assets/form.js'
  export default {
    name: 'personTagForm',
    mixins: [formmixin],
    data () {
      return {
        name:'',
        remark:'',
        details:[]
      }
    },
    methods: {
      selectPerson(){
        this.$dialog.OpenWindow({
          width: 950,
          height: 690,
          url: '/selectPerson?category=0&categoryBefore=1&selectType=1',
          title: '选择包含人员',
          closeCallBack: (data) => {
            if (data) {
              for (var j = 0; j < data.length; j++) {
                var temp = data[j]
                var index = -1

                for (var i = 0; i < this.details.length; i++) {
                  if (this.details[i].id === temp.id) {
                    index = 0
                    break
                  }
                }
                if (index === -1) {
                  this.details.push({
                    id: guid(),
                    insertDate: formatTime(new Date(accAdd(new Date().getTime(), accMul(1, this.details.length)))),
                    ownerID: this.id,
                    category: '',
                    otherID: temp.id,
                    otherName: temp.name
                  })
                }
                let remark = ''
                for (var i = 0; i < this.details.length; i++) {
                  if(remark !== ''){
                    remark += '、'
                  }
                  remark += this.details[i].otherName
                }
                this.remark = remark
              }
            }
          }
        })
      },
      save () {
        if (this.validator()) {
          var params = {
            id: this.id,
            name:this.name,
            remark:this.remark,
            details:this.details
          }
          this.ajaxJson({
            url: '/sys/personTag/save',
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
        url: '/sys/personTag/initForm',
        all: (data) => {

        },
        add: (data) => {

        },
        look: (data) => {
          this.name = data.name
          this.remark = data.remark
          this.details = data.details
        }
      })
    }
  }
</script>

<style scoped>

</style>
