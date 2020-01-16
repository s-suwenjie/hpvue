<template>
  <div class="f_main">
    <yhm-formbody>
      <template #title>基本信息</template>
      <template #control>
        <yhm-form-select title="用户" tip="value" rule="R0000" @click="selectPerson" :value="person" id="person" ></yhm-form-select>
      </template>
    </yhm-formbody>
    <yhm-formoperate :createName="createName" :insertDate="insertDate" :updateName="updateName" :updateDate="updateDate">
      <template #btn>
        <yhm-commonbutton value="保存" icon="btnSave" :flicker="true" @call="Save()"></yhm-commonbutton>
      </template>
    </yhm-formoperate>

  </div>
</template>

<script>
  import { formmixin } from '@/assets/form.js'
  export default {
    name: 'boardFeesForm',
    mixins: [formmixin],
    data () {
      return {
        id: '',
        personID: '',
        person: '',

        updateDate: '', // 修改日期
        updateName: '', // 修改名字
        createName: '', // 添加名字
        insertDate: '', // 添加日期
      }
    },
    methods: {
      selectPerson (event) {
        this.$dialog.OpenWindow({
          width: 950,
          height: 692,
          url: '/selectPerson?categoryBefore=1&category=0',
          title: '选择联系人',
          closeCallBack: (data) => {
            if (data) {
              this.person = data.name
              this.personID = data.id
            }
          }
        })
      },
      Save () {
        if (this.validator()) {
          let params = {
            id: this.id,
            personID: this.personID,
          }
          this.ajaxJson({
            url: '/Com/boardFeesSave',
            data: params,
            loading: '0',
            call: (data) => {
              if (data.type == '0') {
                this.$dialog.setReturnValue(this.id) //向父级页面id值
                this.$dialog.alert({
                  tipValue: data.message,
                  closeCallBack: (data) => {
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
    }

  }
</script>

<style scoped>

</style>
