<template>
  <div class="f_main">
    <yhm-formbody>
      <template #title>基本信息</template>
      <template #control>
        <yhm-form-select title="品牌" tip="value" :value="brand" id="brand"  @click="selectBrand"></yhm-form-select>
        <!--        <yhm-form-radio title="收支方向" :select-list="directionList" :value="direction" id="direction" ></yhm-form-radio>-->
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
    name: 'vipRateForm',
    mixins: [formmixin],
    data(){
      return{
        id: '',
        brandID: '',
        brand: '',
      }
    },
    methods:{
      selectBrand(){
        let name = '90'
        this.$dialog.OpenWindow({
          width: 950,
          height: 603,
          url: '/selectDic?name=' + name,
          title: '选择车辆品牌',
          closeCallBack: (data) => {
            if (data) {
              this.brandID = data.id
              this.brand = data.showName
              console.log( this.brandID  )
              console.log( this.brand  )
            }
          }
        })
      },
      Save () {
        if (this.validator()) {
          let params = {
            id: this.id,
            ownerID: this.brandID,
            showName:this.brand
          }
          this.ajaxJson({
            url: '/Insurance/vipRateSave',
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
    },
  }
</script>

<style scoped>

</style>
