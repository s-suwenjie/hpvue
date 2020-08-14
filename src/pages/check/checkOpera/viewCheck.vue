<template>
  <div class="checkBody" @dblclick="print">
    <div class="checkBg">
      <p class="bankName">{{bankName}}</p>
      <p class="state">{{categoryStr}}</p>
      <p class="firCode">{{firCode}}</p>
      <p class="lastCode">{{lastCode}}</p>
      <p class="year">{{year}}</p>
      <p class="month">{{month}}</p>
      <p class="day">{{day}}</p>
      <p class="otherAccount">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{other}}</p>
      <p class="money">¥{{moneyFormat}}</p>
      <p class="useRemark">{{useRemark}}</p>
      <p class="yearUp">{{yearUp}}</p>
      <p class="monthUp">{{monthUp}}</p>
      <p class="dayUp">{{dayUp}}</p>
      <p class="otherAccountSec">{{other}}</p>
      <p class="moneyUp">{{moneyUp}}</p>
      <p class="useRemarkSec">{{useRemark}}</p>
      <p class="firCodeSec">{{firCode}}</p>
      <p class="lastCodeSec">{{lastCode}}</p>
      <p class="moneySec">¥{{money1}}</p>
      <div class="bankLogo">
        <img :src="'/UploadFile/BankLogo/' + url" alt="">
      </div>
      <p class="bankNameSec">{{bankName}}</p>
      <p class="categoryStrSec">{{categoryStr}}</p>
    </div>
  </div>
</template>

<script>
  import { formmixin } from '@/assets/form.js'
  export default {
    name: 'viewCheck',
    mixins: [formmixin],
    data(){
      return{
        ownerID: '',
        bankName: '',
        categoryStr: '',
        code: '',
        firCode: '',
        lastCode: '',
        openDate: '',
        year: '',
        month: '',
        day: '',
        other: '',
        money: '',
        useRemark: '',
        openDateUp: '',
        yearUp: '',
        monthUp: '',
        dayUp: '',
        moneyUp: '',
        url: '',
        money1: '',
        printUrl: '',
        moneyFormat: '',
      }
    },
    methods: {
      print(){
        window.open(this.printUrl)
      },
      initData(){
        let params = {
          ownerID: this.ownerID
        }
        this.init({
          url: '/Bill/printingChecksDetail',
          data: params,
          all: (data)=>{
            this.bankName = data.bankName
            this.code = data.code
            this.categoryStr = data.categoryStr
            this.firCode = this.code.split('☆')[0]
            this.lastCode = this.code.split('☆')[1]
            this.openDate = data.openDate
            this.year = this.openDate.split('-')[0]
            this.month = this.openDate.split('-')[1]
            this.day = this.openDate.split('-')[2]
            this.other = data.other
            this.money = data.money
            this.useRemark = data.useRemark
            this.openDateUp = data.openDateUp
            this.yearUp = this.openDateUp.split('☆')[0]
            this.monthUp = this.openDateUp.split('☆')[1]
            this.dayUp = this.openDateUp.split('☆')[2]
            this.moneyUp = data.moneyUp
            this.url = data.bankLogo
            this.money1 = data.money1
            this.printUrl = data.printUrl
            this.moneyFormat = data.moneyFormat
          },
          add: (data)=>{
          },
          look: (data)=>{
          }
        })
      }
    },
    created () {
      this.setQuery2Value('ownerID')
      this.initData()
    }
  }
</script>

<style scoped lang="less">
.checkBg{
  width: 100%;
  height: 300px;
  background: url("http://hp.yhm.hk/UploadFile/checkBg/checkBg.png") center center no-repeat;
  position: relative;
}

.bankName {
  position: absolute;
  left: 95px;
  top: 15px;
  font-size: 13px;
  font-family: Adobe 宋体 Std L;
  font-weight: bold;
  color: #C0BEC9;
}

.state {
  position: absolute;
  left: 78px;
  top: 35px;
  font-size: 13px;
  font-family: Adobe 宋体 Std L;
  font-weight: bold;
  color: #C0BEC9;
}

.firCode {
  position: absolute;
  left: 57px;
  top: 50px;
  font-size: 24px;
  letter-spacing: 2px;
  color: #000000;
}
.lastCode{
  position: absolute;
  left: 66px;
  top: 75px;
  font-size: 20px;
  letter-spacing: 2px;
  color: #000000;
}

.year {
  position: absolute;
  left: 93px;
  top: 157px;
  font-size: 12px;
  color: #000000;
  font-weight: bold;
  width: 45px;
  line-height: 18px;
}
.month{
  position: absolute;
  left: 106px;
  top: 157px;
  font-size: 12px;
  color: #000000;
  font-weight: bold;
  width: 45px;
  line-height: 18px;
  text-align: right;
}
.day{
  position: absolute;
  left: 138px;
  top: 157px;
  font-size: 12px;
  color: #000000;
  font-weight: bold;
  width: 45px;
  line-height: 18px;
  text-align: right;
}

.otherAccount {
  position: absolute;
  left: 50px;
  top: 182px;
  font-size: 12px;
  color: #000000;
  font-weight: bold;
  width: 145px;
  line-height: 18px;
  height: 54px;
}
.money{
  position: absolute;
  left: 93px;
  top: 218px;
  font-size: 12px;
  color: #000000;
  font-weight: bold;
  line-height: 18px;
}
.useRemark{
  position: absolute;
  left: 93px;
  top: 238px;
  font-size: 12px;
  color: #000000;
  font-weight: bold;
  line-height: 18px;
}
.yearUp{
  position: absolute;
  left: 355px;
  top: 51px;
  font-size: 13px;
  color: #000000;
  font-weight: bold;
}
.monthUp{
  position: absolute;
  left: 430px;
  top: 51px;
  font-size: 13px;
  color: #000000;
  font-weight: bold;
  width: 40px;
  text-align: right;
}
.dayUp{
  position: absolute;
  left: 483px;
  top: 51px;
  font-size: 13px;
  color: #000000;
  font-weight: bold;
  width: 45px;
  text-align: right;
}
.otherAccountSec{
  position: absolute;
  left: 300px;
  top: 71px;
  font-size: 13px;
  color: #000000;
  font-weight: bold;
}
.moneyUp{
  position: absolute;
  left: 300px;
  top: 101px;
  font-size: 13px;
  color: #000000;
  font-weight: bold;
}
.useRemarkSec{
  position: absolute;
  left: 275px;
  top: 135px;
  font-size: 13px;
  color: #000000;
  font-weight: bold;
}
.firCodeSec{
  position: absolute;
  left: 657px;
  top: 5px;
  font-size: 24px;
  letter-spacing: 2px;
  color: #000000;
}
.lastCodeSec{
  position: absolute;
  left: 666px;
  top: 30px;
  font-size: 20px;
  letter-spacing: 2px;
  color: #000000;
}
.moneySec{
  position: absolute;
  left: 638px;
  top: 108px;
  height: 18px;
  line-height: 18px;
  width: 164px;
  font-size: 13px;
  color: #000000;
  font-weight: bold;
  letter-spacing: 7.5px;
  text-align: right;
}
.bankLogo{
  position: absolute;
  left: 290px;
  top: 15px;
  img{
    height: 35px;
    width: 35px;
  }
}
.bankNameSec{
  position: absolute;
  left: 395px;
  top: 15px;
  font-size: 22px;
  color: #837982;
}
.categoryStrSec{
  position: absolute;
  left: 502px;
  top: 15px;
  font-size: 22px;
  color: #837982;
}
</style>
