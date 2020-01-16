<template>
  <div class="f_main">
    <yhm-formbody>
      <template #title>基本信息</template>
      <template #control>
        <yhm-form-text title="部门名称" subtitle="" :value="name" id="name" rule="R0000"></yhm-form-text>
        <yhm-form-radio title="是否" subtitle="顶层部门" :select-list="isTopPsd" :value="isTop" id="isTop"></yhm-form-radio>
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
    name: 'departmentForm',
    mixins: [formmixin],
    data(){
      return {
        ownerID:'',
        parentID: '',//父级菜单
        name: '',//菜单名称
        isTop: '',
        isTopPsd:[],
      }
    },
    methods: {
      save() {
        if (this.validator()) {
          var params = {
            id: this.id,
            ownerID:this.ownerID,
            parentID:this.parentID,
            name: this.name,
            isTop: this.isTop,
          }
          this.ajaxJson({
            url: '/Basic/saveDepartment',
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
              }else if(data.type == '1'){
                this.$dialog.alert({
                  alertImg:'warn',
                  tipValue: data.message
                })
              }
            }
          })
        }
      }
    },
    created(){
      this.setQuery2Value("parentID")
      this.init({
        url: '/Basic/initDepartmentForm',
        all: (data) => {
          this.isTopPsd=data.isTopPsd.list
          this.isTop=data.isTopPsd.value
          this.ownerID = data.ownerID
        },
        add: (data) => {
          /* 需要添加的数据 */
        },
        look: (data) => {
          /* 需要查看的数据 */
          this.ownerID=data.ownerID//父级菜单
          this.parentID=data.parentID//父级菜单
          this.name=data.name//菜单名称
        }
      })
    }
  }
</script>

<style scoped lang="less">

</style>
