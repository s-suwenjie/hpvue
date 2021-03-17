<template>
  <div class="f_main">
    <yhm-formbody>
      <template #title>基本信息</template>
      <template #control>
        <yhm-form-radio title="类型" subtitle=""  :select-list="categoryList" :value="category" id="category"></yhm-form-radio>
        <yhm-form-select title="财务人员" width="1" tip="value" rule="R0000" @click="selectfinPerson" :value="finPerson" id="finPerson" ></yhm-form-select>
        <yhm-form-select title="保险人员" width="1" tip="value" rule="R0000" @click="selectinsPerson" :value="insPerson" id="insPerson" ></yhm-form-select>
        <yhm-form-select title="高层人员" width="1" tip="value" rule="R0000" @click="selecthighPerson" :value="highPerson" id="highPerson" ></yhm-form-select>
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
    name: "promotionsApproveForm",
    mixins: [formmixin],
    data(){
      return{
        id: '',
        finPerson: '',
        finPersonID: '',
        insPerson: '',
        insPersonID:'',
        highPerson:'',
        highPersonID:'',
        category:'',
        categoryList:[],
        updateDate: '', // 修改日期
        updateName: '', // 修改名字
        createName: '', // 添加名字
        insertDate: '', // 添加日期
      }
    },
    methods: {
      selectfinPerson(){
        this.$dialog.OpenWindow({
          width: 950,
          height: 692,
          url: '/selectPerson?categoryBefore=1&category=0',
          title: '选择联系人',
          closeCallBack: (data) => {
            if (data) {
              this.finPerson = data.name;
              this.finPersonID = data.id
            }
          }
        })
      },
      selectinsPerson(){
        this.$dialog.OpenWindow({
          width: 950,
          height: 692,
          url: '/selectPerson?categoryBefore=1&category=0',
          title: '选择联系人',
          closeCallBack: (data) => {
            if (data) {
              this.insPerson = data.name;
              this.insPersonID = data.id
            }
          }
        })
      },
      selecthighPerson(){
        this.$dialog.OpenWindow({
          width: 950,
          height: 692,
          url: '/selectPerson?categoryBefore=1&category=0',
          title: '选择联系人',
          closeCallBack: (data) => {
            if (data) {
              this.highPerson = data.name;
              this.highPersonID = data.id
            }
          }
        })
      },
      save () {
        if (this.validator()) {
          let params = {
            id: this.id,
            finPersonID: this.finPersonID,
            insPersonID: this.insPersonID,
            highPersonID: this.highPersonID,
            category:this.category
          }
          this.ajaxJson({
            url: '/Com/promotionsApproveSave',
            data: params,
            loading: '0',
            call: (data) => {
              if (data.type === 0) {
                this.$dialog.setReturnValue(this.id);
                this.$dialog.alert({
                  tipValue: data.message,
                  closeCallBack: () => {
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
    },
    created () {
      let params={}
      this.init({
        url: '/Com/initPromotionForm',
        data: params,
        all: (data) => {
          // 不管是不是初始化都需要执行的代码
          this.categoryList=data.categoryPsd.list
          this.category=data.categoryPsd.value

        },
        init: (data) => {
          // 初始化时需要执行的代码

        }
      })
    }
  }
</script>

<style scoped>

</style>
