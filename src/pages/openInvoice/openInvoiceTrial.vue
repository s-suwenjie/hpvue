<template>
  <div class="checkBody" id="checkBody" @dblclick="print">
    <div v-for="(item,index) in data" :key="index" style="border-bottom: 3px solid #9f9f9f">
      <div style="position: relative;width: 100%;height: 600px;background-image: url('http://hp.yhm.hk/UploadFile/OpenInvoice/emptyInvoice.png');">
        <div class="topname">{{item.purchaser}}</div>
        <div class="registrationNumber">{{item.registrationNumber}}</div>
        <div class="addressTel">{{item.purchaserAddress}}  {{item.purchaserTel}}</div>
        <div class="bankAccount">{{item.purchaserBank}}  {{item.purchaserAccount}}</div>
        <div class="number" v-if="item.number > 1">×{{item.number}}</div>
        <div class="mores" v-if="item.openInvoiceTrialDetail.length>8">详情见清单</div>
        <div class="moneymores" v-if="item.openInvoiceTrialDetail.length>8">¥{{item.totalmoney}}</div>
        <div class="taxmores" v-if="item.openInvoiceTrialDetail.length>8">{{item.openInvoiceTrialDetail[0].taxRate}}%</div>
        <div class="littlemores" v-if="item.openInvoiceTrialDetail.length>8">¥{{item.totaltax}}</div>
        <div class="centername">
          <div v-for="(itm,idx) in item.openInvoiceTrialDetail" class="centerlight">
            <div style="width: 285px;" v-if="item.openInvoiceTrialDetail.length<8">{{itm.product}}</div>
            <div style="width: 75px;" v-if="item.openInvoiceTrialDetail.length<8">{{itm.model}}</div>
            <div style="width: 30px;" v-if="item.openInvoiceTrialDetail.length<8">{{itm.unit}}</div>
            <div style="width: 45px;" v-if="item.openInvoiceTrialDetail.length<8">{{itm.quantity}}</div>
            <div style="width: 85px;text-align: right;" v-if="item.openInvoiceTrialDetail.length<8">{{itm.price}}</div>
            <div style="width: 100px;margin-right: 20px;: 25px;text-align: right;" v-if="item.openInvoiceTrialDetail.length<8">{{itm.totalMoney}}</div>
            <div style="width: 30px;  margin-right: 30px;" v-if="item.openInvoiceTrialDetail.length<8">{{itm.taxRate}}%</div>
            <div style="width: 60px; margin-right: 0px;text-align: right;" v-if="item.openInvoiceTrialDetail.length<8">{{itm.taxAmount}}</div>
          </div>
        </div>
        <div class="allmoney">¥{{item.totalmoney}}</div>
        <div class="alltaxmoney">¥{{item.totaltax}}</div>
        <div class="bigmoney icon-delete2">{{item.chinainvoiceMoney}}</div>
        <div class="littlemoney">¥{{item.invoiceMoney}}</div>
        <div class="remark">{{item.remark}}</div>
      </div>
      <div class="f_split"></div>
      <div v-if="item.openInvoiceTrialDetail.length>8">
        <div style="width: 80%;border-bottom: 3px solid #9f9f9f;margin: 0 auto;">
          <div style="text-align: center;font-size: 18px;font-weight: bold;background-color: #fff;">货物详单</div>
          <table cellspacing="5" style="width: 100%; background-color: #fff;">
            <tr>
              <th>序号</th>
              <th>货物名称</th>
              <th>规格型号</th>
              <th>单位</th>
              <th>数量</th>
              <th>单价</th>
              <th>金额</th>
              <th>税率</th>
              <th>税额</th>
            </tr>
            <tr v-for="(itm,idx) in item.openInvoiceTrialDetail">
              <td style="text-align: center;">{{idx+1}}</td>
              <td>{{itm.product}}</td>
              <td style="text-align: center;">{{itm.model}}</td>
              <td style="text-align: center;">{{itm.unit}}</td>
              <td style="text-align: center;">{{itm.quantity}}</td>
              <td style="text-align: right;">¥{{itm.price}}</td>
              <td style="text-align: right;">¥{{itm.totalMoney}}</td>
              <td style="text-align: center;">{{itm.taxRate}}%</td>
              <td style="text-align: right;">¥{{itm.taxAmount}}</td>
            </tr>
          </table>
        </div>
      </div>
      <div>
        <yhm-formbody>
          <template #title>发票号信息   (<span style="color:red">此发票号仅为演示用途，以实际开票号码为准</span>)</template>

          <!--<template #opera>-->
            <!--<yhm-commonbutton value="添加发票" icon="btnAdd" @call="addCheckNumEvent(item,index)"></yhm-commonbutton>-->
          <!--</template>-->

<!--          <template #control>-->
<!--            <div class="check" :key="key">-->
<!--              <div class="check_main" v-for="(it,i) in item.list" :key="i">{{it.code}}<span @click="delCheck(item,i)" :class="{'red':deleteTheSwitch}" class="icon delete"></span></div>-->
<!--              <div class="noTableData" v-if="item.list.length==0">暂时没有数据</div>-->
<!--            </div>-->
<!--          </template>-->

          <template #control>
            <div :key="key">
              <yhm-form-list-edit style="border: none;width: 998px">
                <template #listHead>
                  <yhm-managerth style="width: 230px" title="发票号码"></yhm-managerth>
                  <yhm-managerth style="width: 160px" title="税额合计"></yhm-managerth>
                  <yhm-managerth style="width: 160px" title="金额"></yhm-managerth>
                  <yhm-managerth style="width: 160px" title="税率(%)"></yhm-managerth>
                  <yhm-managerth style="width: 160px" title="税额"></yhm-managerth>
                  <yhm-managerth style="width: 90px" title="发票照片"></yhm-managerth>
                  <!--<yhm-managerth style="" title="操作"></yhm-managerth>-->
                </template>
                <template #listBody>
                  <tr v-for="(it,i) in item.list" :key="i" :class="{InterlacBg:index%2!==0}">
                    <yhm-form-td-textbox width="220" no-edit="1" :list="item.list" listid="item.list" :value="it" id="code"></yhm-form-td-textbox>
                    <yhm-form-td-textbox width="150" no-edit="1" :list="item.list" listid="item.list" :value="it" id="invoiceMoney"></yhm-form-td-textbox>
                    <yhm-form-td-textbox width="150" no-edit="1" :list="item.list" listid="item.list" :value="it" id="totalmoney"></yhm-form-td-textbox>
                    <yhm-form-td-textbox width="150" no-edit="1" :list="item.list" listid="item.list" :value="it" id="taxRate"></yhm-form-td-textbox>
                    <yhm-form-td-textbox width="150" no-edit="1" :list="item.list" listid="item.list" :value="it" id="totaltax"></yhm-form-td-textbox>
                    <yhm-form-td-upload-image  width="90" :no-upload="imageblooen" tag="Invoice" @mouseover="invoiceImg(it)" @mouseout="invoiceImgHide(it)"  :list="item.list" :listid="'data['+index+'].list'" :value="it" id="url" rule="#"></yhm-form-td-upload-image>
                    <!--<yhm-form-td-delete width="" v-show="" :list="item.list" :value="item" :del-click="true" @click="delCheck(item,i)"></yhm-form-td-delete>-->
                  </tr>
                  <!--                <div class="noTableData" v-if="item.list.length==0">暂时没有数据</div>-->
                </template>
                <template #empty>
                  <div class="m_listNoData" v-if="item.list.length == 0">暂时没有数据</div>

                  <div class="invoiceImgView" v-show="viewImgShow">
                    <img :src="viewImg" alt="" style="width: 100%;">
                  </div>
                </template>
              </yhm-form-list-edit>
            </div>

          </template>

        </yhm-formbody>

        <div class="f_split"></div>
      </div>
    </div>
    <div style="width: 80%; height: 100px"></div>
    <yhm-formoperate :createName="createName" :insertDate="insertDate" :updateName="updateName" :updateDate="updateDate">
      <template #btn>
        <!--<yhm-commonbutton v-show="isShow" value="保存" icon="btnSave" :flicker="true" @call="save()"></yhm-commonbutton>-->
        <yhm-commonbutton v-show="isShow" value="确认开票" icon="btnSave" :flicker="false" bgColor="yellow" @call="post()"></yhm-commonbutton>
      </template>
    </yhm-formoperate>
  </div>
</template>

<script>
  import { formmixin } from '@/assets/form.js'
  import {number2chinese,guid,accMul} from '@/assets/common.js'
  export default {
    name: 'openInvoiceTrial',
    mixins: [formmixin],
    data(){
      return{
        imageblooen:false,
        key:1,
        ownerID: '',
        purchaser:'',
        purchaserID:'',//如果是单位的话，当前是税号
        product:'',//商品名称
        model:'',//型号
        unit:'',//单位
        quantity:'',//数量
        price:'',//单价
        totalMoney:'',//总价
        taxRate:'',//税率
        taxAmount:'',//税额
        commodity:'',
        data:'',
        list:[],
        savelist: {
          list: [],
          ownerID:'',
        },
        deleteTheSwitch: true,
        ownerID:'',

        type:'',//0发票试算   1查看发票
        isShow:true,
        invoiceList:[],
        viewImg:'',
        viewImgShow:false,

        code:'',
        codeID:'',
      }
    },
    methods: {
      invoiceImg(it){
        if(it.url !== '') {
          this.viewImg = '/UploadFile/Invoice/' + it.url
          this.viewImgShow = true
        }
      },
      //隐藏发票图片
      invoiceImgHide(it){
        // if(it.url !== '') {
          this.viewImgShow = false
        // }
      },
      print(){
        window.open(this.printUrl)
      },
      initData(){
        let params = {
          ownerID: this.ownerID
        }
        this.init({
          url: '/Bill/invoiceTrial',
          data: params,
          all: (data)=>{
            this.data=data
            if(data.state=='2'){
              this.deleteTheSwitch=false
            }

            for( let i in data){
              let totalmoney=0
              let totaltax=0
              this.data[i].list=data[i].invoiceList

              for( let n in data[i].openInvoiceTrialDetail){
                totalmoney=Number(data[i].openInvoiceTrialDetail[n].totalMoney)+Number(totalmoney)
                totaltax=Number(data[i].openInvoiceTrialDetail[n].taxAmount)+Number(totaltax)
              }
              this.data[i].totalmoney=Math.round(totalmoney * 100) / 100;
              this.data[i].totaltax=Math.round(totaltax * 100) / 100;
              this.data[i].chinainvoiceMoney=number2chinese(parseFloat(data[i].invoiceMoney))
              // this.data[i].list=[]
              for(let n in data[i].invoiceList){
                this.data[i].list[n].id=data[i].invoiceList[n].invoiceID
                this.data[i].list[n].totalmoney=this.data[i].totalmoney.toString()
                this.data[i].list[n].totaltax=this.data[i].totaltax.toString()
                this.data[i].list[n].taxRate=this.data[i].openInvoiceTrialDetail[0].taxRate.toString()
              }
              if(this.code!==''&&this.codeID!==''&&data[i].invoiceList.length===0){
                let list={}
                let date = new Date();
                let strHours = date.getHours() < 10 ? "0" + date.getHours() : date.getHours(); //获取小时,如果小于10,前面补个0
                let strMinutes = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes(); //获取分,如果小于10,前面补个0
                let strSeconds = date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds(); //获取秒,如果小于10,前面补个0
                list.insertDate=(new Date()).toLocaleDateString().replace(/\//g,'-')+' '+strHours+':'+strMinutes+':'+strSeconds
                list.id=guid()
                list.ownerID=this.id
                list.invoiceID=this.codeID
                list.code=this.code
                list.totalmoney=data[i].invoiceMoney
                list.taxRate=data[i].taxRate.toString()
                list.totaltax=totaltax.toString()
                list.url=''
                this.data[i].list.push(list)
              }
            }
            for (let i = 0; i < this.data.length; i++) {
              if(this.data[i].purchaserType=='0'){
                let params={
                  unitID:this.data[i].purchaserID
                }
                this.ajaxJson({
                  url: '/finance/tax/getUnitTax',
                  data: params,
                  call: (tax) => {
                    if(tax){
                      this.data[i].registrationNumber=tax.taxNumber
                      if(tax.category=='0'){
                        this.data[i].purchaserAddress=tax.registerAddress.replace('-','')+''+tax.registerAddressDetailed
                        this.data[i].purchaserTel=tax.registerNumberTitle+'-'+tax.registerNumber
                        this.data[i].purchaserBank=tax.bank
                        this.data[i].purchaserAccount=tax.bankID
                      }
                    }
                  }
                })
              }
            }
          },
          add: (data)=>{
          },
          look: (data)=>{
          }
        })
      },
    //  添加支票
      addCheckNumEvent(item,index){
        let title = '添加发票'
        if(item.list.length<item.number){
          this.$dialog.OpenWindow({
            width: '1050',
            height: '800',
            title: title,
            url: '/selectInvoiceDetail?invoiceCategoryBefore=1&invoiceCategory='+item.invoiceCategory+'&state=0&selectType=1',
            closeCallBack: (data) => {

              if(data){
                let nums=0
                for(let i in data){
                  let add=true
                  for(let n in item.list){
                    if(data[i].code == item.list[n].code){
                      add=false
                      nums++
                      break
                    }
                  }
                  if(add){
                    if(item.list.length<item.number){
                      item.list.push(data[i])

                      this.key++
                      // console.log(this.data)
                      // for(let )
                    }else{
                      this.$dialog.alert({
                        tipValue: '发票号已满,多余发票号已自动去除',
                        closeCallBack: ()=>{
                          // this.$dialog.close()
                        }
                      })
                      break
                    }

                  }

                  // item.list.push(data[i])
                }
                for(let i in item.list){
                  item.list[i].totalmoney=this.data[index].totalmoney.toString()
                  item.list[i].totaltax=this.data[index].totaltax.toString()
                  item.list[i].taxRate=this.data[index].openInvoiceTrialDetail[0].taxRate.toString()
                }

                if(nums > 0){
                  this.$dialog.alert({
                    tipValue: '部分发票号已重复,已自动去除',
                    closeCallBack: ()=>{
                      // this.$dialog.close()
                    }
                  })
                }
              }

              // this.key++
              console.log(this.key)
              console.log(item.list)
            }
          })
        }else{
          this.$dialog.alert({
            tipValue: '发票号已满,无法选择',
            closeCallBack: ()=>{
              // this.$dialog.close()
            }
          })

        }
        this.key++
      },
    //  保存按钮
      save(){
        let a = this.validator()
        if(a) {
          this.savelist.list = []
          for (let i in this.data) {
            if (this.data[i].list) {

              for (let m in this.data[i].list) {
                let n = {}
                let date = new Date();
                let strHours = date.getHours() < 10 ? "0" + date.getHours() : date.getHours(); //获取小时,如果小于10,前面补个0
                let strMinutes = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes(); //获取分,如果小于10,前面补个0
                let strSeconds = date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds(); //获取秒,如果小于10,前面补个0
                n.id = guid()
                n.insertDate = (new Date()).toLocaleDateString().replace(/\//g, '-') + ' ' + strHours + ':' + strMinutes + ':' + strSeconds
                n.ownerID = this.data[i].id
                n.invoiceID = this.data[i].list[m].id
                n.url = this.data[i].list[m].url
                this.savelist.list.push(n)
              }
            }
          }
          this.savelist.ownerID = this.ownerID
          if (this.savelist.list) {
            this.ajaxJson({
              url: '/Bill/invoiceTrialSave',
              data: {
                ownerID: this.ownerID,
                invoiceList: this.savelist.list,

              },
              call: (data) => {
                if (data.type == 0) {
                  this.$dialog.setReturnValue(this.id)
                  this.$dialog.alert({
                    tipValue: data.message,
                    closeCallBack: () => {
                      this.$dialog.close()
                    }
                  })
                } else {
                  this.$dialog.alert({
                    alertImg: 'error',
                    tipValue: data.message,
                    closeCallBack: () => {
                      this.$dialog.close()
                    }
                  })
                }
              }
            })
          }
        }
      },

      //保存并提交
      post(){
        let a = this.validator()
        if(a){
          this.savelist.list=[]
          for(let i in this.data){
            if(this.data[i].list){

              for(let m in this.data[i].list){
                let n={}
                let date = new Date();
                let strHours = date.getHours() < 10 ? "0" + date.getHours() : date.getHours(); //获取小时,如果小于10,前面补个0
                let strMinutes = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes(); //获取分,如果小于10,前面补个0
                let strSeconds = date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds(); //获取秒,如果小于10,前面补个0
                n.id=guid()
                n.insertDate=(new Date()).toLocaleDateString().replace(/\//g,'-')+' '+strHours+':'+strMinutes+':'+strSeconds
                n.ownerID=this.data[i].id
                n.invoiceID=this.data[i].list[m].id
                n.url=this.data[i].list[m].url
                this.savelist.list.push(n)
              }
            }
          }
          if(this.savelist.list.length==0){
            this.$dialog.alert({
              alertImg: 'warn',
              tipValue: '请选择发票号'
            })
            return
          }
          this.savelist.ownerID=this.ownerID
          if(this.savelist.list){
            this.$dialog.confirm({
              width: 300,
              tipValue: '确认开票?',
              btnValueOk: '确认',
              alertImg: 'warn',
              okCallBack: () => {
                this.ajaxJson({
                  url: '/Bill/invoiceTrialSubmit',
                  data: {
                    ownerID:this.ownerID,
                    invoiceList:this.savelist.list,
                  },
                  call: (data) => {
                    if (data.type == 0) {
                      this.$dialog.setReturnValue(this.id)
                      this.$dialog.alert({
                        tipValue: data.message,
                        closeCallBack: ()=>{
                          this.$dialog.close()
                        }
                      })
                    }else{
                      this.$dialog.alert({
                        alertImg: 'error',
                        tipValue: data.message,
                        closeCallBack: ()=>{

                        }
                      })
                    }
                  }
                })
              }
            })
          }
        }
      },
      //-------------------------------------
      delCheck(item,i){
        if(this.deleteTheSwitch){
          item.list.splice(i,1)
          this.key++
        }
      }
    },
    created () {
      this.setQuery2Value('ownerID')
      this.setQuery2Value('type')
      this.setQuery2Value('code')
      this.setQuery2Value('codeID')
      if(this.type === '1' ){
        this.isShow=false
      }
      this.initData()

    },
    // watch:{
    //   data:{
    //     list(newValue, oldValue) {
    //       // this.txt = newValue[this.id]
    //       alert(11111)
    //     },
    //     deep: true
    //   }
    // }
  }
</script>

<style scoped lang="less">
  .remark{
    position: absolute;
    left: 700px;
    top: 465px;
    width: 280px;
    height: 90px;
    text-align:left;
  }
  .invoiceImgView{
    /*position: absolute;*/
    /*width: 500px;*/
    /*height: 300px;*/
    /*border-radius: 24px;*/
    /*left: 0;*/
    bottom: 165px;
  }
  .topname{
    width: 450px;
    height: 16px;
    line-height: 16px;
    font-size: 16px;
    position: absolute;
    top: 158px;
    left: 180px;
  }
  .registrationNumber{
    width: 392px;
    height: 16px;
    line-height: 16px;
    font-size: 16px;
    position: absolute;
    top: 185px;
    left: 180px;
  }
  .addressTel{
    width: 392px;
    height: 16px;
    line-height: 16px;
    font-size: 16px;
    position: absolute;
    top: 202px;
    left: 180px;
  }
  .bankAccount{
    width: 392px;
    height: 16px;
    line-height: 16px;
    font-size: 16px;
    position: absolute;
    top: 230px;
    left: 180px;
  }
  .mores{
    position: absolute;
    font-size: 12px;
    font-family: Adobe 宋体 Std L;
    font-weight: bold;
    left: 48px;
    top: 282px;
  }
  .number{
    position: absolute;
    top: 30px;
    left: 30px;
    font-size: 70px;
    font-weight: bold;
  }
  .centername{
    width: 930px;
    height: 130px;
    overflow: hidden;
    position: absolute;
    left: 48px;
    top: 282px;
  }
  .centerlight{
    width: 100%;
  }
  .centerlight>div{
    display: inline-block;
    font-size: 12px;
    font-family: Adobe 宋体 Std L;
    font-weight: bold;
    line-height: 16px;
    margin-right: 30px;
    vertical-align: top;
  }
  .allmoney{
    width: 100px;
    height: 16px;
    position: absolute;
    left: 750px;
    top: 415px;
  }
  .alltaxmoney{
    width: 100px;
    height: 16px;
    position: absolute;
    left: 925px;
    top: 415px;
  }
  .bigmoney{
    width: 300px;
    height: 16px;
    position: absolute;
    left: 370px;
    top: 440px;
  }
  .littlemoney{
    width: 134px;
    height: 16px;
    position: absolute;
    left: 830px;
    top: 440px;
  }
  .moneymores{
    position: absolute;
    font-size: 12px;
    font-family: Adobe 宋体 Std L;
    font-weight: bold;
    left: 710px;
    top: 282px;
  }
  .taxmores{
    position: absolute;
    font-size: 12px;
    font-family: Adobe 宋体 Std L;
    font-weight: bold;
    left: 840px;
    top: 282px;
  }
  .littlemores{
    position: absolute;
    font-size: 12px;
    font-family: Adobe 宋体 Std L;
    font-weight: bold;
    left: 890px;
    top: 282px;
  }
</style>
