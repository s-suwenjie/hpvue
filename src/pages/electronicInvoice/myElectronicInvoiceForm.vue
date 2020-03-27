<template>
  <div style="position: relative;">
    <div v-if="uploadShow" style="height: 715px; width: 1050px; background-color: #FFFFFF; position: absolute; top: -16px;left: 0;z-index: 99999;">
      <yhm-upload @call="callEvent" @progressCall="progressCallEvent" tag="ElectronicInvoice" width="1050" height="630" accept="application/pdf">
        <div style="display: flex;justify-content: center;align-items: center;flex: 1; font-size: 60px; color: #CCC;">
          {{showTxt}}
        </div>
      </yhm-upload>
    </div>
    <div v-if="!uploadShow" class="f_main">
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
          <yhm-form-text title="所属单位" :value="selfName" id="selfName">
            <div class="vs">
              <div v-if="selfNameShow" class="invoice category0" :style="getVs(selfNamePosition,1)"></div>
              <img @mouseover.self="showSource('selfNameShow')" @mouseout.self="hideSource('selfNameShow')" src="../../../static/css/images/contrastIcon.svg">
            </div>
          </yhm-form-text>
          <yhm-form-text title="纳税人" subtitle="识别号" :value="selfCode" id="selfCode">
            <div class="vs">
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
          <yhm-formimage :tip="true" width="1000" height="650" rule="#" title="发票照片" :big="1" :value="'/UploadFile/electronicInvoice/' + imgUrl" id="url"></yhm-formimage>
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

      <yhm-formoperate :createName="createName" :insertDate="insertDate" :updateName="updateName" :updateDate="updateDate">
        <template #btn>
          <yhm-commonbutton value="保存" icon="btnSave" :flicker="true" @call="save(0)"></yhm-commonbutton>
          <yhm-commonbutton value="保存并新增" icon="btnAddSave" @call="save(1)"></yhm-commonbutton>
        </template>
      </yhm-formoperate>
    </div>
  </div>
</template>

<script>
  import { formmixin } from '@/assets/form.js'
  export default {
    name: 'myElectronicInvoiceForm',
    mixins: [formmixin],
    data(){
      return{
        thisUnit:[],

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
        selfNameID:'',//'9EC315DA-FD76-416A-B22A-3B7C754B62D6',
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
        showTxt:'点击或者拖拽上传PDF格式发票',

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
      progressCallEvent(data,key){
        this.showTxt = '已上传' +  data + '%'
      },
      callEvent(data){
        let sourceFilePath =  data.storeName
        var targetFilePath = sourceFilePath.substring(0,sourceFilePath.lastIndexOf('.')) + '.png'
        let params = {
          sourceFilePath:sourceFilePath,
          targetFilePath:targetFilePath
        }
        this.ajaxJson({
          url:'/Fin/handleElectronicInvoiceForPdf',
          data:params,
          call:(result) =>{
            if(result.type === 0){

              let p = {
                num:result.num,
                code:result.code
              }
              this.ajaxJson({
                url:'/Fin/judgeRepetitionElectronicInvoice',
                data:p,
                call:(dataResult) =>{
                  if(dataResult.type === 0){
                    this.uploadShow = false
                  }
                  else{
                    this.uploadShow = true
                    this.showTxt = '点击或者拖拽上传PDF格式发票'
                    if(dataResult.type === 4){
                      //本人已上传
                      this.$dialog.alert({
                        tipValue:dataResult.message,
                        width:'350',
                        alertImg:'warn'
                      })
                    }
                    else if(dataResult.type === 5){
                      //发微信索要
                      this.$dialog.confirm({
                        tipValue:'此发票已被<b class="Red">（工程师）</b>上传，可以向对方索要！！！',
                        width:'500',
                        btnValueOk:'向对方索要',
                        okCallBack:() => {
                          alert("发微信索要")
                        }
                      })
                    }
                  }

                }
              })

              this.personID = result.personID
              this.person = result.person
              this.authCode = result.authCode
              this.openDate = result.openDate
              this.openDatePosition = result.openDatePosition.split(',')
              this.code = result.code
              this.codePosition = result.codePosition.split(',')
              this.num = result.num
              this.numPosition = result.numPosition.split(',')
              this.selfName = result.selfName

              let sign = true
              for(var i = 0; i < this.thisUnit.length; i++){
                if(this.thisUnit[i].name === result.selfName){
                  this.selfNameID = this.thisUnit[i].id
                  sign = false
                  break;
                }
              }
              if(sign){
                this.$dialog.alert({
                  tipValue:'请确认发票抬头准确无误，系统检测到抬头可能异常，如确认无误，请忽略。',
                  width:'650',
                  alertImg:'warn'
                })
              }

              this.selfNamePosition = result.selfNamePosition.split(',')
              this.selfCode = result.selfCode
              this.selfCodePosition = result.selfCodePosition.split(',')
              this.money = result.money
              this.moneyPosition = result.moneyPosition.split(',')
              this.tax = result.tax
              this.taxPosition = result.taxPosition.split(',')
              this.totalMoney = result.totalMoney
              this.totalMoneyPosition = result.totalMoneyPosition.split(',')
              this.otherName = result.otherName
              this.otherNamePosition = result.otherNamePosition.split(',')
              this.otherCode = result.otherCode
              this.otherCodePosition = result.otherCodePosition.split(',')
              this.remark = result.remark
              this.remarkPosition = result.remarkPosition.split(',')
              this.pdfUrl = sourceFilePath
              this.imgUrl = targetFilePath
            }
            else{
              this.$dialog.confirm({
                tipValue:'电子发票解析失败，您可以选择手动添加电子发票',
                btnValueOk:'手动添加电子发票',
                width:'500',
                okCallBack:() => {

                  this.manualInvoice()

                  this.uploadShow = false
                  this.pdfUrl = sourceFilePath
                  this.imgUrl = targetFilePath

                },
                cancelCallBack:() => {
                  window.location.reload()
                }
              })
            }
          },
          errorCall:() => {
            this.$dialog.confirm({
              tipValue:'电子发票解析失败，您可以选择手动添加电子发票',
              btnValueOk:'手动添加电子发票',
              width:'500',
              okCallBack:() => {

                this.manualInvoice()

                this.uploadShow = false
                this.pdfUrl = sourceFilePath
                this.imgUrl = targetFilePath

                this.uploadShow = false
                this.pdfUrl = sourceFilePath
                this.imgUrl = targetFilePath
              },
              cancelCallBack:() => {
                window.location.reload()
              }
            })
          }
        })
      },
      manualInvoice(){

        this.openDateShow = false

        let openDatePosition = '-2140,-120,700,365,-50,-555'
        this.openDatePosition = openDatePosition.split(',')

        let codePosition = '-2140,-120,700,365,-50,-555'
        this.codePosition = codePosition.split(',')

        let numPosition = '-2140,-120,700,365,-50,-555'
        this.numPosition = numPosition.split(',')

        let selfNamePosition = '-190,-450,1150,335,-40,-665'
        this.selfNamePosition = selfNamePosition.split(',')

        let selfCodePosition = '-190,-450,1150,335,-40,-830'
        this.selfCodePosition = selfCodePosition.split(',')

        let moneyPosition = '-2270,-1190,750,225,-15,-565'
        this.moneyPosition = moneyPosition.split(',')

        let taxPosition = '-2270,-1190,750,225,-15,-565'
        this.taxPosition = taxPosition.split(',')

        let totalMoneyPosition = '-2270,-1190,750,225,-15,-565'
        this.totalMoneyPosition = totalMoneyPosition.split(',')

        let otherNamePosition = '-190,-1380,1150,335,-40,-670'
        this.otherNamePosition = otherNamePosition.split(',')

        let otherCodePosition = '-190,-1380,1150,335,-40,-828'
        this.otherCodePosition = otherCodePosition.split(',')

        let remarkPosition = '-90,-750,990,465,-350,-1125'
        this.remarkPosition = remarkPosition.split(',')

      },
      save(op){
        if(this.validator()){
          // this.$dialog.confirm({
          //   tipValue:'请确认发票信息无误后再保存！！！',
          //   width:'400',
          //   btnValueOk:'确认信息无误，保存',
          //   okCallBack:() => {
              let params = {
                id: this.id,
                category:this.category,
                authCode:this.authCode,
                personID:this.personID,
                person:this.person,
                openDate:this.openDate,
                openDatePositionArray:this.openDatePosition,
                code:this.code,
                codePositionArray:this.codePosition,
                num:this.num,
                numPositionArray:this.numPosition,
                selfNameID:this.selfNameID,
                selfName:this.selfName,
                selfNamePositionArray:this.selfNamePosition,
                selfCode:this.selfCode,
                selfCodePositionArray:this.selfCodePosition,
                money:this.money,
                moneyPositionArray:this.moneyPosition,
                tax:this.tax,
                taxPositionArray:this.taxPosition,
                totalMoney:this.totalMoney,
                totalMoneyPositionArray:this.totalMoneyPosition,
                otherName:this.otherName,
                otherNamePositionArray:this.otherNamePosition,
                otherCode:this.otherCode,
                otherCodePositionArray:this.otherCodePosition,
                pdfUrl:this.pdfUrl,
                imgUrl:this.imgUrl,
                remark:this.remark,
                remarkPositionArray:this.remarkPosition,
                tag:this.tag,
                isTrue:this.isTrue,
                checkTrue:this.checkTrue,
                isMove:this.isMove,
                state:this.state,
              }
              this.ajaxJson({
                url: '/Fin/saveElectronicInvoice',
                data: params,
                call: (data) => {
                  if (data.type === 0) {
                    this.$dialog.setReturnValue(this.id)
                    this.$dialog.alert({
                      tipValue: data.message,
                      closeCallBack: () => {
                        if(op === 1){
                          this.$dialog.OpenWindow({
                            width: '1050',
                            height: '740',
                            title: '添加电子发票',
                            url: '/myElectronicInvoiceForm',
                            closeCallBack: (data)=>{

                            }
                          })
                        }else{
                          this.$dialog.close()
                        }
                      }
                    })
                  }else{
                    this.$dialog.alert({
                      width: '300',
                      alertImg: 'error',
                      tipValue: data.message
                    })
                  }
                }
              })
          //   }
          // })
        }
      }
    },
    computed:{
      getVs(){
        return function (arr,op) {
          if(this.imgUrl === '' || arr.length === 0){
            return ''
          }
          let width = arr[2]
          let height = arr[3]
          let top = arr[4]
          let left = arr[5]

          if(arr.length === 4){
            if(op === 1){
              width = 570
            }
            else if (op == 2){
              height = 410
            }
            return 'background: url(\'/UploadFile/electronicInvoice/' + this.imgUrl + '\');background-position:' + arr[0] + 'px ' + arr[1] + 'px; width:' + width + 'px;height:' + height + 'px;'
          }else{
            return 'background: url(\'/UploadFile/electronicInvoice/' + this.imgUrl + '\');background-position:' + arr[0] + 'px ' + arr[1] + 'px; width:' + width + 'px;height:' + height + 'px; top:' + top + 'px;left:' + left + 'px;'

          }
        }
      },
    },
    created () {
      this.init({
        url: '/Fin/initElectronicInvoiceForm',
        all: (data) => {
          //添加查看的时候都需要的代码
          this.personID = data.personID
          this.person = data.person
          this.thisUnit = data.thisUnit
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
  margin-left: 3px;
}
</style>
