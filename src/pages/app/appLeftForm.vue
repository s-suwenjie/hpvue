<template>
  <div class="f_main">
    <yhm-formbody>
      <template #title>基本信息</template>
      <template #control>
       <yhm-form-text title="菜单名称" subtitle="" :value="name" id="name" rule="R0000"></yhm-form-text>
        <yhm-form-text title="排列序号" subtitle="" :value="orderNum" id="orderNum" rule="R0000"></yhm-form-text>
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
    name: 'appLeftForm',
    mixins: [formmixin],
    data(){
      return{
        parentID:'',//父级菜单
        name:'',//菜单名称
        menuType:'1',//菜单类型（0表示顶级菜单，1表示左边的大菜单，2表示详细菜单，3表示权限）
        category:'2',//语言类型
        tableName:'',//关联表明
        orderNum:'',//排列序号
        icon:'',//上传图片
        url:'',//请求路径
      }
    },
    methods: {
      save() {
        if (this.validator()) {
          var params = {
            id: this.id,
            parentID: this.parentID,
            name: this.name,
            menuCategory: this.menuType,
            url: this.url,
            category: this.category,
            imgIcon: this.icon,
            orderNum: this.orderNum,
            tableName: this.tableName,
          }
        }
        this.ajaxJson({
          url: '/SysManager/saveApp',
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
            else if(data.type === 1){
              this.$dialog.alert({
                alertImg:'warn',
                tipValue: data.message
              })
            }
          }
        })
      }
    },
    created () {
      this.setQuery2Value('parentID')
      this.init({
        url: '/SysManager/initAppLeftForm',
        all: (data) => {
        },
        add: (data) => {
          /* 需要添加的数据 */
        },
        look: (data) => {
          /* 需要查看的数据 */
          this.parentID=data.parentID//父级菜单
          this.name=data.name//菜单名称
          this.menuType=data.menuCategory//菜单类型（0表示顶级菜单，1表示左边的大菜单，2表示详细菜单，3表示权限）
          this.tableName=data.tableName//关联表明
          this.orderNum=data.orderNum//排列序号
          this.icon=data.imgIcon//上传图片
          this.url=data.url//请求路径
          this.category='2'
        }
      })
    }
  }

</script>

<style scoped>

</style>
