<template>
  <div class="f_main">
    <yhm-formbody>
      <template #title>基本信息</template>
      <template #control>
        <yhm-form-radio title="单位分类" @call="selectCategoryEvent" :select-list="categoryList" :value="category" id="category"></yhm-form-radio>
        <yhm-form-zh-text-two ref="name" @repeatverify="repeatVerifyEvent" before-placeholder="单位名称" after-placeholder="" :before="name" before-id="name" :after="prefixLetter" after-width="20" after-id="prefixLetter" title="单位名称" after-title="首字母" before-rule="R0000" :after-rule="prefixLetterRule"></yhm-form-zh-text-two>
        <yhm-form-text title="单位代码" :value="code" id="code" rule="R0000"></yhm-form-text>
        <yhm-form-text title="单位简称" :value="abbreviation" id="abbreviation" rule="R0000"></yhm-form-text>
        <yhm-form-text title="公司电话" :value="tel" id="tel" rule="R0000"></yhm-form-text>
        <yhm-form-check :show="isTag" title="标签" :select-list="tagList" :value="tag" submit-value="tagSubmit" :ownerID="id" :tableName="'1030'" :tag="tag" id="tag" rule="#" width="1"></yhm-form-check>
      </template>
    </yhm-formbody>
    <div class="f_split"></div>

    <yhm-formoperate :createName="createName" :insertDate="insertDate" :updateName="updateName" :updateDate="updateDate">
      <template #btn>
        <yhm-commonbutton value="保存" icon="btnSave" :flicker="true" @call="save()"></yhm-commonbutton>

      </template>
    </yhm-formoperate>

  </div>
</template>

<script>
  import { accMul, accAdd, guid , formatTime } from '@/assets/common.js'
  import { formmixin } from '@/assets/form.js'
  export default {
    name: 'addUnitSimplifyForm',
    mixins: [formmixin],
    data() {
      return {
        id: '',
        categoryList: [] ,
        category: '',
        name: '',
        code: '',
        abbreviation: '',
        tagList: [],
        tagListCon: [],
        tag: [],
        tagSubmit:[],
        prefixLetter: '',
        ownerID: guid(),
        tableName: '',
        prefixLetterRule:'',
        tel:'',
        isTag:false,

      }
    },
    methods: {

      selectCategoryEvent(){
        if(this.category === "0"){
          this.isTag=false
        }else{
          this.isTag=true
        }
      },
      repeatVerifyEvent(){
        let params = {
          id: this.id,
          name: this.name
        }
        this.ajaxJson({
          url: '/Basic/verifyUnitName',
          data: params,
          loading:"0",
          call: (data)=>{
            if(data.type === 1) {
              // if(this.code === '')
              this.code = data.html
              // if(this.prefixLetter === '')
              this.prefixLetter = data.val
            }else{
              this.$refs.name.errorEvent(data.message)
            }
          }
        })
      },
      async isRepeatVerifyEvent(){
        let params = {
          id: this.id,
          name: this.name
        }
        let result = await this.ajaxAsync({
          url:"/Basic/verifyUnitName",
          data: params,
          loading:"0"
        })
        if(result.type === 0){//说明存在，调用控件验证显示规则
          this.$refs.name.errorEvent("单位名称已存在")
          return false
        }
        return true
      },
      async save(){
        this.prefixLetterRule = 'R0000'
        let a = await this.isRepeatVerifyEvent()
        let b = this.validator()
        this.prefixLetterRule = ''
        if (a && b) {
          let params = {
            id: this.id,  //id
            name: this.name,   //单位名称
            code: this.code,   //单位代码
            abbreviation: this.abbreviation,   //单位简称
            category: this.category,   //单位分类
            tagList: this.tagSubmit,
            prefixLetter: this.prefixLetter,//首字母
            tel: this.tel,
          }
          this.ajaxJson({
            url: '/Basic/unitVueSelectFormSave',
            data: params,
            call: (data) => {
              if (data.type === 0) {
                this.$dialog.setReturnValue(this.id)
                this.$dialog.alert({
                  alertImg: 'ok',
                  tipValue: data.message,
                  closeCallBack: () => {
                    this.$dialog.close()
                  }
                })
              } else {
                this.$dialog.alert({
                  alertImg: 'warn',
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
        url: '/Basic/unitVueSelectForm',
        all: (data)=>{
          this.categoryList = data.categoryPsd.list
          this.category = data.categoryPsd.value
          this.tagList = data.tagPsd.list
          this.tag = data.tagPsd.value
          this.capitalCompany = '1'
          if(this.category === '1'){
            this.isTag = true
          }
        },
        add: (data)=>{

        },
        look: (data)=>{
          this.id = data.id
          this.name = data.name
          this.prefixLetter = data.prefixLetter
          this.abbreviation = data.abbreviation
          this.code = data.code
          this.tel = data.tel

          this.selectCategoryEvent()
        }
      })
    }
  }
</script>

<style scoped>

</style>
