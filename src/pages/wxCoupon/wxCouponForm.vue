<template>
  <div>
    <div class="f_main mb16">
      <yhm-formbody>
        <template #title>基本信息</template>
        <template #control>
          <yhm-form-text title="名称" :value="name" id="name" rule="R0000"></yhm-form-text>
          <yhm-form-radio width="1" :no-edit="!isAdd" title="类型" :select-list="categoryList" :value="category" id="category"></yhm-form-radio>
          <div class="form_format">
            <div>
              <yhm-form-text title="面值" before-icon="rmb" :value="money" id="money" rule="R1000"></yhm-form-text>
              <yhm-form-zh-text-more-checkbox title="有效期" :value="expiration" id="expiration" :check-value="expirationCategory" check-value-id="expirationCategory" :check-list="expirationCategoryList"></yhm-form-zh-text-more-checkbox>
            </div>
            <div>
              <yhm-form-upload-image :big="2" title="优惠券Logo" tag="wxCoupon" discription="建议上传.jpg格式" :value="url" id="url" rule="#"></yhm-form-upload-image>
            </div>
          </div>
          <yhm-form-textarea title="备注" :value="remark" id="remark"></yhm-form-textarea>
        </template>
      </yhm-formbody>
    </div>
    <yhm-formoperate :createName="createName" :insertDate="insertDate" :updateName="updateName" :updateDate="updateDate">
      <template #btn>
        <yhm-commonbutton value="保存" icon="btnSave" :flicker="true" @call="save(0)"></yhm-commonbutton>
      </template>
    </yhm-formoperate>
  </div>
</template>

<script>
  import { formmixin } from '@/assets/form.js'
  export default {
    name: 'wxCouponForm',
    mixins: [formmixin],
    data(){
      return{
        name:'',                      //优惠券名称
        category:'',                  //优惠券类型
        categoryList:[],              //优惠券类型集合
        money:'',                     //面值
        expiration:'',                //有效期
        expirationCategory:'',        //有效期类型
        expirationCategoryList:[],    //有效期类型集合
        url:'',                       //优惠券图片
        remark:'',                    //备注
      }
    },
    methods:{
      save(op){
        if(this.validator()) {
          let params = {
            id: this.id,
            name:this.name,
            category:this.category,
            money:this.money,
            expiration:this.expiration,
            expirationCategory:this.expirationCategory,
            url:this.url,
            remark:this.remark
          }
          this.ajaxJson({
            url: '/wx/wxCoupon/save',
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
        url: '/wx/wxCoupon/initForm',
        all: (data) => {
          this.category = data.categoryPsd.value
          this.categoryList = data.categoryPsd.list
          this.expirationCategory = data.expirationCategoryPsd.value
          this.expirationCategoryList = data.expirationCategoryPsd.list
        },
        add: (data) => {

        },
        look: (data) => {
          this.name = data.name
          this.category = data.category
          this.money = data.money
          this.expiration = data.expiration
          this.expirationCategory = data.expirationCategory
          this.url = data.url
          this.remark = data.remark
        }
      })
    }
  }
</script>

<style scoped>

</style>
