<template>
  <div class="f_main">
    <yhm-formbody>
      <template #title>基本信息</template>
      <template #control>
        <yhm-form-text title="开户行" @repeatverify="repeatverifyAccountEvent" ref="name" subtitle="名称" tip="value" :value="showName" id="showName" rule="R0000"></yhm-form-text>
        <div class="bankDiv">
          <div class="bankImg">
            <a href="javascript:;"
               :class="{aOnLineAct:aLineOn === index}"
               @mouseover="bankShow(item,index)"
               @mouseout="bankHide(item,index)"
               @click="switchBank(item,index)"
               v-for="(item,index) in content" :key="index">
                <img :src="'/UpLoadFile/BankLogo/'+item.value3" alt="">
                <span class="bankName" v-if="aLineOnShow === index && isOnShow">
                  <img src="../../../static/css/images/arrow.png" alt="">
                  {{showBank}}
                </span>
            </a>
            <div class="bodyTit">
              <button class="titBtn" type="button" @click="openBankDetailForm">
                <i class="icon addIcon"></i>添加银行信息
              </button>
            </div>
          </div>
        </div>
        <yhm-form-text title="所属银行" :value="value2" id="value2" rule="R0000" no-edit="1"></yhm-form-text>
        <yhm-form-text title="银行简码" :value="value3" id="value3" rule="R0000" no-edit="1"></yhm-form-text>
        <yhm-form-text title="回显规则" :value="value4" id="value4" rule="R0000" no-edit="1"></yhm-form-text>
        <yhm-form-text title="联行号" :value="value6" id="value6" rule="R0000" placeholder="查询联行号，请点帮助">
          <div class="formBoxIcon" @click="jointNum">
            <span class="i-help"></span>
          </div>
        </yhm-form-text>

      </template>
    </yhm-formbody>

    <yhm-formoperate :createName="createName" :insertDate="insertDate" :updateName="updateName" :updateDate="updateDate">
      <template #btn>
        <yhm-commonbutton value="保存" icon="btnSave" :flicker="true" @call="save()"></yhm-commonbutton>
        <yhm-commonbutton value="保存并新增" class="btnAddSave" icon="btnAddSave" @call="btnAddSave()"></yhm-commonbutton>
      </template>
    </yhm-formoperate>
  </div>
</template>

<script>
  import { accMul, accAdd, guid, formatDate, number2chinese,formatTime} from '@/assets/common.js'
  import { formmixin } from '@/assets/form.js'
  export default {
    name: 'openBankForm',
    mixins: [formmixin],
    data (){
      return {
        id: '',
        showName: '',
        value1: '',
        value2: '',
        value3: '',
        value4: '',
        value5: '',
        value6: '',
        aLineOn: -1,
        content: [],
        isBankName: false,
        aLineOnShow: 0,
        showBank: '',

        jointLineNumberUrl:'',//联行号地址

        isOnShow: false

      }
    },
    methods:{

      /* 查询联行号 */
      jointNum(){
        window.open(this.jointLineNumberUrl)
      },
      /* 验证重复项 */
      repeatverifyAccountEvent(){
        this.ajaxJson({
          url:"/Com/verifyBankName",
          data:{
            id:this.id,
            showName: this.showName,
            name: '49'
          },
          loading:"0",
          call:(data) =>{
            if(data.type !== 1){//说明存在，调用控件验证显示规则
              this.$refs.name.errorEvent("该开户行已存在")
            }
          }
        })
      },
      async isAccountVerifyEvent(){
        let result = await this.ajaxAsync({
          url:"/Com/verifyBankName",
          data:{
            id:this.id,
            showName: this.showName,
            name: '49'
          },
          loading:"0"
        })
        if(result.type !== 1){//说明存在，调用控件验证显示规则
          this.$refs.name.errorEvent("该开户行已存在")
          return false
        }
        return true
      },
      bankShow(item,index){
        this.aLineOnShow = index
        this.showBank = item.showName
        this.isOnShow = true
      },
      bankHide(){
        this.isOnShow = false
      },
      switchBank(item,index){
        this.value1 = item.id
        this.value2 = item.showName
        this.value3 = item.value1
        this.value4 = item.value2
        this.value5 = item.value3
        this.aLineOn = index
      },
      openBankDetailForm(){
        this.$dialog.OpenWindow({
          width: '1050',
          height: '400',
          title: '添加银行信息',
          url: '/openBankDetailForm',
          closeCallBack: (data)=>{
            if(data){
              this.initData()
            }
          }
        })
      },
      async save(){
        let a = await this.isAccountVerifyEvent()
        let b = this.validator()
        if(a && b){
          let params = {
            id: this.id,
            name: '49',
            showName: this.showName,
            value1:this.value1,
            value2: this.value2,
            value3: this.value3,
            value4: this.value4,
            value5: this.value5,
            value6: this.value6,
          }
          this.ajaxJson({
            url: '/Com/dicVueSave',
            data: params,
            call: (data)=>{
              if(data.type === 0){
                this.$dialog.alert({
                  tipValue: data.message,
                  closeCallBack: (data)=>{
                  }
                })
              }else{
                this.$dialog.alert({
                  alertImg: 'warn',
                  tipValue: data.message,
                  closeCallBack: (data)=>{
                  }
                })
              }
            }
          })
        }
      },
      async btnAddSave(){
        let a = await this.isAccountVerifyEvent()
        let b = this.validator()
        if( a && b){
          let params = {
            id: this.id,
            name: '49',
            showName: this.showName,
            value1:this.value1,
            value2: this.value2,
            value3: this.value3,
            value4: this.value4,
            value5: this.value5,
            value6: this.value6,
          }
          this.ajaxJson({
            url: '/Com/dicVueSave',
            data: params,
            call: (data)=>{
              if(data.type === 0){
                this.$dialog.alert({
                  tipValue: data.message,
                  closeCallBack: (data)=>{
                    this.$dialog.refresh()
                  }
                })
              }else{
                this.$dialog.alert({
                  alertImg: 'warn',
                  tipValue: data.message,
                  closeCallBack: (data)=>{
                  }
                })
              }
            }
          })
        }
      },
      initData(){
        let params = {
          name: '48',
        }
        this.init({
          url: '/Com/getBankInfornation',
          data: params,
          all: (data) => {
            this.content = data
          },
          add: (data) => {

          },
          look: (data) => {

          }
        })
      },
      getJointLineNumberUrl(){
        this.ajaxJson({
          url: '/Com/getJointLineNumberUrl',
          call: (data)=>{
            if(data.type === 0){
              this.jointLineNumberUrl=data.val
            }
          }
        })
      }
    },
    created () {
      this.initData()
      this.getJointLineNumberUrl()
    }
  }
</script>

<style scoped lang="less">
.bankImg{
  width: 100%;
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  a{
    display: inline-block;
    width: 25px;
    height: 25px;
    border: 1px solid #bfbfbf;
    position: relative;
    margin: 0 4px 4px 0;
    img{
      width: 100%;
      height: 100%;
      position: relative;
    }
  }
  .aOnLineAct:after{
    content: '';
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
    //background-color: #49a9ea;
    display: inline-block;
    border: 1px solid #49a9ea;
  }
}
.bankDiv{
  display: flex;
  flex-direction: column;
  margin: 0 20px;
}
.bodyTit .titBtn{
  line-height: 25px !important;
}

.bankName{
  position: absolute;
  z-index: 99;
  bottom: -34px;
  left: 0;
  font-size: 12px;
  white-space: nowrap;
  text-align: center;
  background-color: #49a9ea;
  color: #fff;
  padding: 3px 8px;
  border-radius: 5px;
  line-height: 22px;
  img{
    width: 11px !important;
    height: 6px !important;
    position: absolute !important;
    left: 8px !important;
    bottom: 28px !important;
    transform: rotate(180deg);
  }
}


</style>
