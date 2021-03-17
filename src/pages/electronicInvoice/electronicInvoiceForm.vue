<template>
    <div>
      <div class="f_main mb16">
        <yhm-formbody>
          <template #title>基本信息</template>
          <template #control>
            <yhm-form-date title="开票日期" :value="openDate" id="openDate">
              <div class="vs">
                <div v-if="openDateShow" class="invoice category0" :style="getVs(openDatePosition,0)"></div>
                <img @mouseover.self="showSource('openDateShow')" @mouseout.self="hideSource('openDateShow')" src="../../../static/css/images/contrastIcon.svg">
              </div>
            </yhm-form-date>
            <yhm-form-text title="所属人员" :value="person" id="person"></yhm-form-text>
            <yhm-form-text title="发票代码" :value="code" id="code">
              <div class="vs">
                <div v-if="codeShow" class="invoice category0" :style="getVs(codePosition,0)"></div>
                <img @mouseover.self="showSource('codeShow')" @mouseout.self="hideSource('codeShow')" src="../../../static/css/images/contrastIcon.svg">
              </div>
            </yhm-form-text>
            <yhm-form-text title="发票号码" :value="num" id="num">
              <div class="vs">
                <div v-if="numShow" class="invoice category0" :style="getVs(numPosition,0)"></div>
                <img @mouseover.self="showSource('numShow')" @mouseout.self="hideSource('numShow')" src="../../../static/css/images/contrastIcon.svg">
              </div>
            </yhm-form-text>
            <yhm-form-text title="发票抬头" :value="selfName" id="selfName">
              <div class="vs">
                <div v-if="selfNameShow" class="invoice category0" :style="getVs(selfNamePosition,1)"></div>
                <img @mouseover.self="showSource('selfNameShow')" @mouseout.self="hideSource('selfNameShow')" src="../../../static/css/images/contrastIcon.svg">
              </div>
            </yhm-form-text>
            <yhm-form-text title="纳税人" :subtitle="selfCategory == 0 ? '识别号':'身份证号'" :value="selfCode" id="selfCode">
              <div v-if="selfCategory == 0" class="vs">
                <div v-if="selfCodeShow" class="invoice category0" :style="getVs(selfCodePosition,1)"></div>
                <img @mouseover.self="showSource('selfCodeShow')" @mouseout.self="hideSource('selfCodeShow')" src="../../../static/css/images/contrastIcon.svg">
              </div>
            </yhm-form-text>
            <yhm-form-text tip="money" title="金额" before-icon="rmb" :value="money" id="money">
              <div class="vs">
                <div v-if="moneyShow" class="invoice category0" :style="getVs(moneyPosition,1)"></div>
                <img @mouseover.self="showSource('moneyShow')" @mouseout.self="hideSource('moneyShow')" src="../../../static/css/images/contrastIcon.svg">
              </div>
            </yhm-form-text>
            <yhm-form-text tip="money" title="税额" before-icon="rmb" :value="tax" id="tax">
              <div class="vs">
                <div v-if="taxShow" class="invoice category0" :style="getVs(taxPosition,1)"></div>
                <img @mouseover.self="showSource('taxShow')" @mouseout.self="hideSource('taxShow')" src="../../../static/css/images/contrastIcon.svg">
              </div>
            </yhm-form-text>
            <yhm-form-text tip="money" title="价税合计" before-icon="rmb" :value="totalMoney" id="totalMoney">
              <div class="vs">
                <div v-if="totalMoneyShow" class="invoice category1" :style="getVs(totalMoneyPosition,1)"></div>
                <img @mouseover.self="showSource('totalMoneyShow')" @mouseout.self="hideSource('totalMoneyShow')" src="../../../static/css/images/contrastIcon.svg">
              </div>
            </yhm-form-text>
            <yhm-formimage :tip="true" width="850" height="550" left="-40" top="-50" rule="#" title="发票照片" :big="1" :value="'/UploadFile/electronicInvoice/' + imgUrl" id="imgUrl" discription=" "></yhm-formimage>
            <yhm-form-text title="开票单位" :value="otherName" id="otherName">
              <div class="vs">
                <div v-if="otherNameShow" class="invoice category0" :style="getVs(otherNamePosition,1)"></div>
                <img @mouseover.self="showSource('otherNameShow')" @mouseout.self="hideSource('otherNameShow')" src="../../../static/css/images/contrastIcon.svg">
              </div>
            </yhm-form-text>
            <yhm-form-text title="纳税人" subtitle="识别号" :value="otherCode" id="otherCode">
              <div class="vs">
                <div v-if="otherCodeShow" class="invoice category0" :style="getVs(otherCodePosition,1)"></div>
                <img @mouseover.self="showSource('otherCodeShow')" @mouseout.self="hideSource('otherCodeShow')" src="../../../static/css/images/contrastIcon.svg">
              </div>
            </yhm-form-text>
            <yhm-form-textarea title="备注" :value="remark" id="remark">
              <div class="vs">
                <div v-if="remarkShow" class="invoice category2" :style="getVs(remarkPosition,2)"></div>
                <img @mouseover.self="showSource('remarkShow')" @mouseout.self="hideSource('remarkShow')" src="../../../static/css/images/contrastIcon.svg">
              </div>
            </yhm-form-textarea>
            <yhm-form-textarea title="标签" :value="tag" id="tag"></yhm-form-textarea>
          </template>
        </yhm-formbody>
      </div>
    </div>
</template>

<script>
  import { formmixin } from '@/assets/form.js'
  export default {
    name: 'electronicInvoiceForm.vue',
    mixins: [formmixin],
    data(){
      return{
        authCode:'',
        category:'0',
        personID:'',//所属人员
        person:'',//所属人员
        openDate:'',
        openDateShow:false,
        openDatePosition:[],
        code:'',
        codeShow:false,
        codePosition:[],
        num:'',
        numShow:false,
        numPosition:[],
        selfCategory:'0',
        selfNameID:'F7D1D940-EA66-4E7C-B38D-992862118311',
        selfName:'',
        selfNameShow:false,
        selfNamePosition:[],
        selfCode:'',
        selfCodeShow:false,
        selfCodePosition:[],
        money:'',
        moneyShow:false,
        moneyPosition:[],
        tax:'',
        taxShow:false,
        taxPosition:[],
        totalMoney:'',
        totalMoneyShow:false,
        totalMoneyPosition:[],
        otherName:'',
        otherNameShow:false,
        otherNamePosition:[],
        otherCode:'',
        otherCodeShow:false,
        otherCodePosition:[],
        pdfUrl:'',
        imgUrl:'',
        remark:'',
        remarkShow:false,
        remarkPosition:[],
        tag:'',

        isTrue:'0',
        checkTrue:'0',
        isMove:'0',
        state:'0',

        uploadShow:true,//是否显示上传
      }
    },
    methods:{
      showSource(id){
        let js = 'this.' + id + ' = true'
        eval(js)
      },
      hideSource(id){
        let js = 'this.' + id + ' = false'
        eval(js)
      },
    },
    computed:{
      getVs(){
        return function (arr,op) {
          if(this.imgUrl === '' || arr.length === 0){
            return ''
          }
          let width = arr[2]
          let height = arr[3]
          if(op === 1){
            width = 570
          }
          else if (op == 2){
            height = 410
          }
          return 'background: url(\'/UploadFile/electronicInvoice/' + this.imgUrl + '\');background-position:' + arr[0] + 'px ' + arr[1] + 'px; width:' + width + 'px;height:' + height + 'px;'
        }
      }
    },
    created () {
      this.init({
        url: '/Fin/initElectronicInvoiceForm',
        all: (data) => {
          //添加查看的时候都需要的代码
          this.personID = data.personID
          this.person = data.person
        },
        add: (data) => {
          //添加时独有的代码
          //初始化分组成员信息
          this.uploadShow = true
        },
        look: (data) => {
          //查看时独有的信息
          this.uploadShow = false
          this.authCode = data.authCode
          this.category = data.category
          this.openDate = data.openDate
          this.openDatePosition = data.openDatePosition.split(',')
          this.code = data.code
          this.codePosition = data.codePosition.split(',')
          this.num = data.num
          this.numPosition = data.numPosition.split(',')
          this.selfCategory = data.selfCategory
          this.selfNameID = data.selfNameID
          this.selfName = data.selfName
          this.selfNamePosition = data.selfNamePosition.split(',')
          this.selfCode = data.selfCode
          this.selfCodePosition = data.selfCodePosition.split(',')
          this.money = data.money
          this.moneyPosition = data.moneyPosition.split(',')
          this.tax = data.tax
          this.taxPosition = data.taxPosition.split(',')
          this.totalMoney = data.totalMoney
          this.totalMoneyPosition = data.totalMoneyPosition.split(',')
          this.otherName = data.otherName
          this.otherNamePosition = data.otherNamePosition.split(',')
          this.otherCode = data.otherCode
          this.otherCodePosition = data.otherCodePosition.split(',')
          this.pdfUrl = data.pdfUrl
          this.imgUrl = data.imgUrl
          this.remark = data.remark
          this.remarkPosition = data.remarkPosition.split(',')
          this.tag = data.tag
          this.isTrue = data.isTrue
          this.checkTrue = data.checkTrue
          this.isMove = data.isMove
          this.state = data.state
        }
      })
    }
  }
</script>

<style scoped>
  .vs{
    display: flex; justify-content: center; align-items: center; cursor: pointer;
    position: relative;
  }
  .vs .invoice{
    background-repeat: no-repeat;
    position: absolute;
    transform: scale(0.5);
    z-index: 999999;
    box-shadow: 0 0 20px #000000;
    border-radius: 5px;
  }

  .vs .category0{
    left: -521px;
    top:-36px;
  }
  .vs .category1{
    left: -521px;
    top:-60px;
  }
  .vs .category2{
    left: -1030px;
    bottom:-40px;
  }


  .vs img{
    width: 25px; height: 25px;
  }
</style>
