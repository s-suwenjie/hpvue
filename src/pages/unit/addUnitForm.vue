<template>
  <div class="f_main">
    <yhm-formbody>
      <template #title>基本信息</template>
      <template #opera>
        <div class="operaLft posRt" @click="videoPlay">
          <p class="videoIcon i-videoPlay"></p>
          <p class="videoHelp">视频帮助</p>
        </div>
      </template>
      <template #control>
        <yhm-form-radio title="单位分类" @call="selectCategoryEvent" :select-list="categoryList" :value="category" id="category"></yhm-form-radio>
        <yhm-form-zh-text-two ref="name" @repeatverify="repeatVerifyEvent" before-placeholder="单位名称" after-placeholder="" :before="name" before-id="name" :after="prefixLetter" after-width="20" after-id="prefixLetter" title="单位名称" after-title="首字母" before-rule="R0000" :after-rule="prefixLetterRule">
          <div class="formBoxIcon" @click="copyEvent">
            <span class="i-copy"></span>
          </div>
        </yhm-form-zh-text-two>
        <yhm-form-text title="单位代码" :value="code" id="code" rule="R0000"></yhm-form-text>
        <yhm-form-text title="单位简称" :value="abbreviation" id="abbreviation" rule="R0000"></yhm-form-text>
        <yhm-form-text title="公司电话" :value="tel" id="tel" rule="R0000"></yhm-form-text>
        <yhm-form-textarea title="地址" :value="addressCN" id="addressCN" rule="R0000" width="1"></yhm-form-textarea>

        <yhm-form-text title="统一社会" subtitle="信用代码" :value="registrationNumber" id="registrationNumber" rule="R0000">
          <div class="formBoxIcon" @click="unitRegNum">
            <span class="i-help"></span>
          </div>
        </yhm-form-text>

        <yhm-form-text title="邮箱" :value="email" id="email"></yhm-form-text>

        <yhm-form-check :show="isTag" title="标签" :select-list="tagList" :value="tag" submit-value="tagSubmit" :ownerID="id" :tableName="'1030'" :tag="tag" id="tag" rule="#" width="1"></yhm-form-check>
      </template>
    </yhm-formbody>
    <div class="f_split"></div>
    <yhm-formbody>
      <template #title>更多信息（可选/可填）</template>
      <template #control>
        <yhm-form-text title="类型" :value="categoryUnit" id="categoryUnit"></yhm-form-text>
        <yhm-form-text title="法定代表人" :value="legalPersonID" id="legalPersonID"></yhm-form-text>
        <yhm-form-text title="注册资本" :value="capital" id="capital">
          <div class="formBoxIcon" @click="capitalClick">
            <span id="capitalType" class="iconYuan i-yuan"></span>
          </div>
        </yhm-form-text>
        <yhm-form-select title="币种类型" @click="selectCurrency" tip="currency" :value="currency" id="currency"></yhm-form-select>
        <yhm-form-date title="成立日期" :value="establishDate" id="establishDate"></yhm-form-date>
        <yhm-form-date title="营业期限自" :value="doBusinessDate" id="doBusinessDate"></yhm-form-date>
        <yhm-form-date title="核准日期" :value="approvalDate" id="approvalDate"></yhm-form-date>
        <yhm-form-date title="营业期限至" :value="noDoBusinessDate" id="noDoBusinessDate"></yhm-form-date>

        <yhm-form-text title="登记机关" :value="registerOffice" id="registerOffice"></yhm-form-text>
        <yhm-form-radio title="登记状态" :select-list="registerStateList" :value="registerState" id="registerState"></yhm-form-radio>
        <yhm-form-textarea title="经营范围" :value="management" id="management"></yhm-form-textarea>
      </template>
    </yhm-formbody>
    <yhm-formoperate :createName="createName" :insertDate="insertDate" :updateName="updateName" :updateDate="updateDate">
      <template #btn>
        <yhm-commonbutton value="保存" icon="btnSave" :flicker="true" @call="save()"></yhm-commonbutton>
      </template>
    </yhm-formoperate>
    <div class="copyTip" v-if="isCopyTip">复制成功：{{name}}</div>

  </div>
</template>

<script>
  import { accMul, accAdd, guid , formatTime } from '@/assets/common.js'
  import { formmixin } from '@/assets/form.js'
  export default {
    name: 'addUnitForm',
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
        addressCN:'',
        tel:'',
        email:'',
        registrationNumber:'',
        isTag:false,
        RegistrationNumber: '',   //商业注册号
        categoryUnit: '',              //公司类型
        legalPerson: '',
        legalPersonID: '',              //法人ID
        capital: '',              //注册资本
        capitalNew: '',
        currencyID: '',
        currency: '',
        establishDate: '',              //成立日期
        doBusinessDate: '',              //营业日期
        noDoBusinessDate: '',              //营业日期至
        registerOffice: '',              //登记机关
        approvalDate: '',              //核准日期
        registerState: '',              //登记状态
        registerStateList: [],
        capitalCompany: '',              //金额单位
        management: '',              //经营范围
        isCopyTip: false,
        videoUrl: ''
      }
    },
    methods: {
      /* 视频播放 */
      videoPlay(){
        this.$dialog.OpenWindow({
          width: '1100',
          height: '680',
          title: '视频帮助',
          url: '/videoPlay?videoUrl=http://hp.yhm.hk/UploadFile/videoHelp/unit.mp4',
          closeCallBack: ()=>{

          }
        })
      },
      /* 点击复制 */
      copyEvent(){
        if(this.name){
          this.$copyText(this.name).then(res=>{
            this.isCopyTip =  true
            let that = this
            setInterval(function () {
              that.isCopyTip =  false
            },5000)
          },err=>{

          })
        }
      },
      capitalClick(){
        if (this.capitalCompany === '1'){
          this.capitalCompany = '10000'
          $("#capitalType").attr('class','iconYuan i-wYuan');
        }else if (this.capitalCompany === '10000'){
          this.capitalCompany = '100000000'
          $("#capitalType").attr('class','iconYuan i-yYuan');
        }else if (this.capitalCompany === '100000000'){
          this.capitalCompany = '1'
          $("#capitalType").attr('class','iconYuan i-yuan');
        }
      },
      selectCurrency(){
        let name = '9'
        this.$dialog.OpenWindow({
          width: 950,
          height: 603,
          url: '/selectDic?name=' + name,
          title: '选择币种',
          closeCallBack: (data) => {
            if(data){
              this.currencyID = data.id
              this.currency = data.showName
            }
          }
        })
      },
      /* 单位注册号查询 */
      unitRegNum(){
        window.open('http://www.gsxt.gov.cn/index.html')
      },
      selectCategoryEvent(){
        if(this.category === "0"){
          this.isTag=false
        }else{
          this.isTag=true
        }
        if (this.capitalCompany === '1'){
          $("#capitalType").attr('class','iconYuan i-yuan');
        }else if (this.capitalCompany === '10000'){
          $("#capitalType").attr('class','iconYuan i-wYuan');
        }else if (this.capitalCompany === '100000000'){
          $("#capitalType").attr('class','iconYuan i-yYuan');
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
            tel: this.tel,
            addressCN: this.addressCN,
            email: this.email,
            registrationNumber: this.registrationNumber,

            nameEn: '',
            fontColor: '',
            logo: '',
            remark: '',
            stockCode: '',
            stockMarket: '',
            location: '0',
            addressEN: '',
            fax: '',
            website: '',
            prefixLetter: this.prefixLetter,
            isExistStorage: '',
            isSupervisionFee: '',
            unitPersonIDStr: '',
            unitPersonStr: '',
            personPhoneStr: '',
            departmentStr: '',
            departmentIDStr: '',
            remarkStr: '',

            categoryUnit: this.categoryUnit,
            legalPersonID: this.legalPersonID,
            legalPerson: this.legalPerson,
            capital: this.capital,
            currencyID: this.currencyID,
            establishDate: this.establishDate,
            doBusinessDate: this.doBusinessDate,
            noDoBusinessDate: this.noDoBusinessDate,
            registerOffice: this.registerOffice,
            approvalDate: this.approvalDate,
            registerState: this.registerState,
            capitalCompany: this.capitalCompany,
            management: this.management,
          }
          this.ajaxJson({
            url: '/Basic/unitVueSave',
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
        url: '/Basic/unitVueForm',
        all: (data)=>{
          this.categoryList = data.categoryPsd.list
          this.category = data.categoryPsd.value
          this.tagList = data.tagPsd.list
          this.tag = data.tagPsd.value

          this.registerStateList = data.registerStatePsd.list
          this.registerState = data.registerStatePsd.value

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
          this.addressCN = data.addressCN
          this.tel = data.tel

          this.registrationNumber = data.registrationNumber
          this.email = data.email
          this.categoryUnit = data.categoryUnit
          this.legalPersonID = data.legalPersonID
          this.legalPerson = data.legalPerson
          this.capital = data.capital
          this.capitalNew = data.capital
          this.currencyID = data.currencyID
          this.currency = data.currency
          this.establishDate = data.establishDate
          this.doBusinessDate = data.doBusinessDate
          this.noDoBusinessDate = data.noDoBusinessDate
          this.registerOffice = data.registerOffice
          this.approvalDate = data.approvalDate
          this.registerState = data.registerState
          this.capitalCompany = data.capitalCompany
          this.management = data.management

          this.selectCategoryEvent()
        }
      })
    }
  }
</script>

<style scoped>

</style>
