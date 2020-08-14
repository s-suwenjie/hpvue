<template>
  <div class="f_main">
    <yhm-formbody>
      <template #title>基本信息</template>
      <template #control>
        <yhm-form-radio title="单位类型" :select-list="categoryList" @call="categoryEvent" :value="category" id="category" :no-edit="isNoEditOwnerID"></yhm-form-radio>
        <yhm-form-select title="收款方" tip="value" rule="R0000" @click="selectOwner" :value="name" id="name" :no-click="isNoEditOwnerID"></yhm-form-select>
        <yhm-form-text title="辅助信息1" :value="value1" id="value1"></yhm-form-text>
        <yhm-form-text title="辅助信息2" :value="value2" id="value2"></yhm-form-text>
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
  import { guid } from '@/assets/common.js'
  export default {
    name: 'approvalPriorityForm',
    mixins: [formmixin],
    data () {
      return {
        id: '',
        categoryList: [],
        category: '',
        ownerID: '',
        name: '',
        value1: '',
        value2: '',
        isNoEditOwnerID: false,
        updateDate: '', // 修改日期
        updateName: '', // 修改名字
        createName: '', // 添加名字
        insertDate: '', // 添加日期
      }
    },
    methods: {
      categoryEvent(){
        this.selectOwner()
      },
      selectOwner () {
        let title = '选择单位信息';
        let url = '/selectUnit?ownerSys=1&ownerSysBefore=1&category=1&categoryBefore=1';
        if (this.category === '1'){
          title = '选择联系人信息'
          url = '/selectPerson?category=1&categoryBefore=1'
        }
        this.$dialog.OpenWindow({
          width: 950,
          height: 692,
          url: url,
          title: title,
          closeCallBack: (data) => {
            if (data) {
              this.name = data.name
              this.ownerID = data.id
            }
          }
        })
      },
      Save () {
        if (this.validator()) {
          let params = {
            id: this.id,
            category:this.category,
            ownerID: this.ownerID,
            value1: this.value1,
            value2: this.value2,
          }
          this.ajaxJson({
            url: '/Com/approvalPrioritySave',
            data: params,
            loading: '0',
            call: (data) => {
              if (data.type === 0) {
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
      },
      initData () {
        this.init({
          url: '/Com/initPriorityFrom',
          all: (data) => {
            this.category = data.category
            this.categoryList = data.categoryPsd.list  //类型
          },
          add: (data) => {
            this.id = guid();
          },
          look: (data) => {
            this.isNoEditOwnerID = true
            this.category = data.category
            this.ownerID = data.ownerID
            this.name = data.name
            this.value1 = data.value1
            this.value2 = data.value2
          }
        })
      },
    },
    created () {
      this.initData()
    }
  }
</script>

<style scoped>

</style>
