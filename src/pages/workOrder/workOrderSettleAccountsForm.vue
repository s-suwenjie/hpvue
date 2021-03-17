<template>
  <div class="f_main">
    <yhm-formbody>
      <template #title>基本信息</template>
      <template #control>
        <yhm-form-text title="负责人" :value="client" id="client" no-edit="1"></yhm-form-text>
<!--        <yhm-form-text title="客服" :value="client" id="client" no-edit="1"></yhm-form-text>-->
        <yhm-form-text title="车辆" :value="vehicle" id="vehicle" no-edit="1"></yhm-form-text>
        <yhm-form-text title="开始日期" :value="workDate" id="workDate" no-edit="1"></yhm-form-text>
        <yhm-form-text title="交车日期" :value="updateDate" id="updateDate" no-edit="1"></yhm-form-text>
        <yhm-form-text title="项目金额" :value="price" id="price" before-icon="rmb" tip="money" no-edit="1"></yhm-form-text>
        <yhm-form-text title="配件金额" :value="amount" id="amount" before-icon="rmb" tip="money" no-edit="1"></yhm-form-text>
<!--        <yhm-form-text title="其它金额" :value="otherPrice" id="otherPrice" @input="otherPriceChange" before-icon="rmb" tip="money" rule="R1800"></yhm-form-text>-->
        <yhm-form-text title="合计金额" :value="totalMoney" id="totalMoney" before-icon="rmb" tip="money" no-edit="1"></yhm-form-text>
<!--        <yhm-form-text title="代结金额" :value="pendingMoney" id="pendingMoney" before-icon="rmb" tip="money" no-edit="1"></yhm-form-text>-->
        <yhm-form-text title="成本" :value="cost" id="cost" no-edit="1"></yhm-form-text>
        <yhm-form-text title="盈利" :value="profit" id="profit" no-edit="1"></yhm-form-text>
        <yhm-form-text title="总收入" :value="revenue" id="revenue" no-edit="1"></yhm-form-text>
        <yhm-form-zh-text-more-checkbox :no-edit="true" v-show="category=='0'?false:true" title="优惠金额" :value="balance" id="balance" :check-value="moneyCheck" check-value-id="moneyCheck" :check-list="moneyCheckList"></yhm-form-zh-text-more-checkbox>

      </template>
    </yhm-formbody>
<!--    <div class="f_split" v-show="bankDetailShow"></div>-->
<!--    <yhm-form-list-show v-show="bankDetailShow">-->
<!--      <template #title>已绑定的流水信息</template>-->
<!--      <template #listHead>-->
<!--        <yhm-managerth title="我方账户"></yhm-managerth>-->
<!--        <yhm-managerth width="110" title="交易日期"></yhm-managerth>-->
<!--        <yhm-managerth title="对方账户"></yhm-managerth>-->
<!--        <yhm-managerth width="40" title="收支"></yhm-managerth>-->
<!--        <yhm-managerth width="110" title="事由"></yhm-managerth>-->
<!--        <yhm-managerth width="105" title="交易金额"></yhm-managerth>-->
<!--        <yhm-managerth width="105" title="可核销金额"></yhm-managerth>-->
<!--        <yhm-managerth width="245" title="备注"></yhm-managerth>-->
<!--      </template>-->
<!--      <template #listBody>-->
<!--        <tr v-for="(item,index) in bankDetailList" :class="[{InterlacBg:index%2!=0}]" :key="item.id">-->
<!--          &lt;!&ndash;          <yhm-manager-td-look @click="listView(item)"></yhm-manager-td-look>&ndash;&gt;-->
<!--          <yhm-manager-td-html :tip="true" node-class-name="f_main" :value="item.selfAccount"></yhm-manager-td-html>-->
<!--          <yhm-manager-td-date :value="item.cccurDate"></yhm-manager-td-date>-->
<!--          <yhm-manager-td-html :tip="true" node-class-name="f_main" :value="item.otherName"></yhm-manager-td-html>-->
<!--          <yhm-manager-td-direction :direction="item.direction" value=" " class="dfJcc"></yhm-manager-td-direction>-->
<!--          <yhm-manager-td-center :tip="true" node-class-name="f_main" :value="item.subject"></yhm-manager-td-center>-->
<!--          <yhm-manager-td-money :value="item.money"></yhm-manager-td-money>-->
<!--          <yhm-manager-td-money :value="item.useMoney"></yhm-manager-td-money>-->
<!--          <yhm-manager-td :tip="true" tip-type="r" node-class-name="f_main" :value="item.remark"></yhm-manager-td>-->
<!--        </tr>-->
<!--      </template>-->
<!--      <template #empty>-->
<!--        <span class="m_listNoData" v-show="bankDetailList.length == 0">暂时没有数据</span>-->
<!--      </template>-->
<!--    </yhm-form-list-show>-->
    <div class="f_split"></div>
    <yhm-form-list-show>
      <template #title>收入详情</template>
      <template #operate>
        <yhm-commonbutton value="绑定流水明细" icon="btnAdd" :is-error="true" :flicker="true" @call="addIncome()" category="three"></yhm-commonbutton>
      </template>
      <template #listHead>
        <yhm-managerth title="我方账户"></yhm-managerth>
        <yhm-managerth width="110" title="交易日期"></yhm-managerth>
        <yhm-managerth title="对方账户"></yhm-managerth>
        <yhm-managerth width="40" title="收支"></yhm-managerth>
        <yhm-managerth width="110" title="事由"></yhm-managerth>
        <yhm-managerth width="105" title="交易金额"></yhm-managerth>
        <!--        <yhm-managerth width="105" title="可核销金额"></yhm-managerth>-->
        <yhm-managerth width="150" title="备注"></yhm-managerth>
<!--        <yhm-managerth width="40" title="删除"></yhm-managerth>-->
      </template>
      <template #listBody>
        <tr v-for="(item,index) in bankDetailList" :class="[{InterlacBg:index%2!=0}]" :key="item.id">
          <!--          <yhm-manager-td-look @click="listView(item)"></yhm-manager-td-look>-->
          <yhm-manager-td-html :tip="true" node-class-name="f_main" :value="item.selfAccount"></yhm-manager-td-html>
          <yhm-manager-td-date :value="item.cccurDate"></yhm-manager-td-date>
          <yhm-manager-td-html :tip="true" node-class-name="f_main" :value="item.otherName"></yhm-manager-td-html>
          <yhm-manager-td-center value="收入" color="#49a9ea" class="dfJcc"></yhm-manager-td-center>
          <yhm-manager-td :tip="true" node-class-name="f_main" :value="item.subject"></yhm-manager-td>
          <yhm-manager-td-money :value="item.money"></yhm-manager-td-money>
          <!--          <yhm-manager-td-money :value="item.useMoney"></yhm-manager-td-money>-->
          <yhm-manager-td :tip="true" tip-type-left="130" tip-type="r" node-class-name="f_main" :value="item.remark"></yhm-manager-td>
<!--          <yhm-form-td-delete width="40" :list="bankDetailList" :value="item" :del-click="true" @click="delServe(index,item,'收入')"></yhm-form-td-delete>-->
        </tr>
      </template>
      <template #empty>
        <span class="m_listNoData" v-show="bankDetailList.length == 0">暂时没有数据</span>
      </template>
    </yhm-form-list-show>
    <div class="f_split"></div>
    <yhm-form-list-show>
      <template #title>定损单信息</template>
      <template #listHead>
<!--        <yhm-managerth style="width: 38px" title="查看"></yhm-managerth>-->
        <yhm-managerth title="项目名称"></yhm-managerth>
        <yhm-managerth title="类型"></yhm-managerth>
        <yhm-managerth style="width: 120px" title="数量"></yhm-managerth>
        <yhm-managerth title="单价"></yhm-managerth>
        <yhm-managerth style="width: 120px;" title="工时费"></yhm-managerth>
      </template>
      <template #listBody>
        <tr v-for="(item,index) in fix" :class="[{InterlacBg:index%2!=0}]" :key="item.id">
<!--          <yhm-manager-td-look @click="listView(item)"></yhm-manager-td-look>-->
          <yhm-manager-td-center :value="item.nameStr+''"></yhm-manager-td-center>
          <yhm-manager-td-center :value="formTypeList[item.category].showName+''"></yhm-manager-td-center>
          <yhm-manager-td-center :value="item.quantity+''"></yhm-manager-td-center>
          <yhm-manager-td-money :value="item.price+''"></yhm-manager-td-money>
          <yhm-manager-td-money :value="item.money+''"></yhm-manager-td-money>
        </tr>
      </template>
      <template #empty>
        <span class="m_listNoData" v-show="fix.length == 0">暂时没有数据</span>
      </template>
    </yhm-form-list-show>
    <div class="f_split"></div>
    <yhm-form-list-show>
      <template #title>工单详情信息</template>
      <template #operate>
<!--        v-show="!bankDetailShow"-->
        <yhm-commonbutton value="追加其它服务" icon="btnAdd" :is-error="true" :flicker="true" @call="addService()" category="three"></yhm-commonbutton>
      </template>
      <template #listHead>
<!--        <yhm-managerth style="width: 38px" title="查看"></yhm-managerth>-->
        <yhm-managerth title="项目名称"></yhm-managerth>
        <yhm-managerth style="width: 90px;" title="创建日期"></yhm-managerth>
        <yhm-managerth style="width: 100px;" title="变化金额"></yhm-managerth>
        <yhm-managerth style="width: 100px;" title="折扣价"></yhm-managerth>
        <yhm-managerth style="width: 70px;" title="收支方向"></yhm-managerth>
        <yhm-managerth style="width: 70px;" title="收支类型"></yhm-managerth>
        <yhm-managerth  title="备注"></yhm-managerth>
        <yhm-managerth style="width: 60px" title="状态"></yhm-managerth>
      </template>
      <template #listBody>
        <tr v-for="(item,index) in fixOrderDetail" :class="[{InterlacBg:index%2!=0}]" :key="item.id">
<!--          <yhm-manager-td-look @click="listView(item)"></yhm-manager-td-look>-->
          <yhm-manager-td :tip="true" node-class-name="f_main" :value="item.name"></yhm-manager-td>
          <yhm-manager-td-center :value="item.workDate"></yhm-manager-td-center>
          <yhm-manager-td-money :value="item.money+''"></yhm-manager-td-money>
          <yhm-manager-td-money :value="item.discount+''"></yhm-manager-td-money>
          <yhm-manager-td-psd :value="item.direction" :list="directionList"></yhm-manager-td-psd>
          <yhm-manager-td-psd :value="item.category" :list="categoryList"></yhm-manager-td-psd>
          <yhm-manager-td-center :value="item.remark"></yhm-manager-td-center>
          <yhm-manager-td-psd :value="item.state+''" :list="stateList"></yhm-manager-td-psd>
        </tr>
      </template>
      <template #empty>
        <span class="m_listNoData" v-show="fixOrderDetail.length == 0">暂时没有数据</span>
      </template>
    </yhm-form-list-show>
    <div class="f_split"></div>
    <yhm-form-list-show>
      <template #title>配件信息</template>
      <template #listHead>
<!--        <yhm-managerth style="width: 38px" title="查看"></yhm-managerth>-->
        <yhm-managerth title="商品名称"></yhm-managerth>
        <yhm-managerth title="规格型号"></yhm-managerth>
        <yhm-managerth style="width: 120px" title="拆分数量"></yhm-managerth>
        <yhm-managerth style="width: 120px" title="整件数量"></yhm-managerth>
        <yhm-managerth style="width: 120px" title="单价"></yhm-managerth>
<!--        <yhm-managerth style="width: 120px" title="折扣价"></yhm-managerth>-->
      </template>
      <template #listBody>
        <tr v-for="(item,index) in fixOrderMaterial" :class="[{InterlacBg:index%2!=0}]" :key="item.id">
<!--          <yhm-manager-td-look @click="listView(item)"></yhm-manager-td-look>-->
          <yhm-manager-td :tip="true" node-class-name="f_main" :value="item.product"></yhm-manager-td>
          <yhm-manager-td :tip="true" node-class-name="f_main" :value="item.model"></yhm-manager-td>
          <yhm-manager-td-center :value="item.mdo"></yhm-manager-td-center>
          <yhm-manager-td-center :value="item.quantity+''"></yhm-manager-td-center>
          <yhm-manager-td-money :value="item.price"></yhm-manager-td-money>
<!--          <yhm-manager-td-money :value="item.discount"></yhm-manager-td-money>-->
        </tr>
      </template>
      <template #empty>
        <span class="m_listNoData" v-show="fixOrderMaterial.length == 0">暂时没有数据</span>
      </template>
    </yhm-form-list-show>
    <yhm-formoperate :createName="createName" :insertDate="insertDate" :updateName="updateName" :updateDate="updateDate">
      <template #btn>
        <yhm-commonbutton value="生成结账单"  icon="btnSave" :flicker="true" @call="statement()"></yhm-commonbutton>

<!--        v-show="!bankDetailShow"-->
<!--        <yhm-commonbutton value="绑定流水" icon="btnSave" :flicker="true" @call="binding()"></yhm-commonbutton>-->
<!--        v-if="!flag"-->
<!--        <yhm-commonbutton :value="flag?'查看流水总表':'创建流水总表'"  icon="btnSave" :flicker="true" @call="saveSummarizingForm()"></yhm-commonbutton>-->
      </template>
    </yhm-formoperate>
  </div>
</template>

<script>
  import { accMul, accAdd, guid, formatDate, formatTime } from '@/assets/common.js'
  import { formmixin } from '@/assets/form.js'
  export default {
    name: 'workOrderSettleAccountsForm',
    mixins: [formmixin],
    data(){
      return{
        vehicleID:'',//车辆ID
        moneyCheck:"0",
        moneyCheckList:[{showName:"使用",num:"0"},{showName:"不使用",num:"1"}],
        balance:'0',//优惠金额
        flag:false,//判断是否已存在流水总表
        price:'',//项目金额
        amount:'',//配件金额
        cost:'0',//成本
        profit:'0',//盈利
        revenue:'0',//总收入
        otherPrice:'0',//其它金额
        totalMoney:'',//合计金额
        pendingMoney:'',//待结金额
        backupsTotalMoney:'',//备份的合计金额
        materialsID:'',//工单材料表ID
        client:'',//客服
        vehicle:'',//车辆
        principal:'',//负责人
        otherCode:'',//其它系统编号
        workDate:'',//开始日期
        updateDate:'',//交车日期
        contactPerson:'',//联系人
        contactPersonID:'',//联系人ID
        bankDetailShow:false,//银行流水显示隐藏
        formTypeList:[],//定损单详情类型
        directionList:[],//收支方向类型
        categoryList:[],//收支类型
        stateList:[],//工作状态类型
        fix:[],//定损单列表
        fixOrderDetail:[],//工单服务列表
        fixOrderMaterial:[],//配件信息列表
        bankDetailList:[],//银行流水列表
        category:'',//维修类型
      }
    },
    watch:{
      otherPrice(val,newval){
        this.validator()
      }
    },
    methods:{
      statement(){
        window.open(window.location.origin+'/workOrderStatementForm?orderid='+this.ownerID+'&moneyCheck='+this.moneyCheck)
        // this.$dialog.OpenWindow({
        //   width: '1050',
        //   height: '700',
        //   url:'/workOrderStatementForm',
        //   title: '结账单',
        //   closeCallBack: (datas) => {
        //     this.initData()
        //   }
        // })
      },
      saveSummarizingForm(){//创建工单流水总表
        if(this.flag){//是否已经创建流水总表
          this.$dialog.OpenWindow({
            width: '1050',
            height: '700',
            url: '/workOrderSummarizingForm?ownerID='+this.ownerID+
              '&price='+this.price+'&amount='+this.amount+'&totalMoney='+
              this.totalMoney+'&pendingMoney='+this.pendingMoney+'&contactPersonID='+
              this.contactPersonID+'&materialsID='+this.materialsID,
            title: '工单流水总表',
            closeCallBack: (datas) => {
              this.initData()
            }
          })
        }else{
          let params = {
            id:guid(),
            orderid:this.ownerID,//工单id
            cost: '0',//成本
            profit: '0',//盈利
            revenue: '0',//总收入
            price:this.price,//项目金额
            vehicle:this.vehicle,//车辆
            principal:this.principal,//负责人
            workDate:this.workDate,//开始日期
            commitDate:this.updateDate,//交车日期
            amount:this.amount,//配件金额
            totalMoney:this.totalMoney,//合计金额
            pendingMoney:this.pendingMoney,//待结金额
          }
          this.ajaxJson({
            url: '/fix/summary/save',
            data: params,
            call: (data) => {
              if (data.type == '0') {
                this.$dialog.OpenWindow({
                  width: '1050',
                  height: '700',
                  url: '/workOrderSummarizingForm?ownerID='+this.ownerID+'&price='
                    +this.price+'&amount='+this.amount+'&totalMoney='+this.totalMoney
                    +'&pendingMoney='+this.pendingMoney+'&contactPersonID='
                    +this.contactPersonID+'&materialsID='+this.materialsID,
                  title: '工单流水总表',
                  closeCallBack: (datas) => {
                    // this.initData()
                  }
                })
              }
            }
          })
        }
      },
      addIncome(){//添加收入详情
        sessionStorage.______detailID = '6917EAEE-D7D6-4339-B4AB-D00F3BDEE1D5'
        window.open('http://'+window.location.host+ '/home/BankDetailInsuranceAll')
        sessionStorage.______detailID = '8D73FFFF-21FA-4A69-A67F-86BB57025608'
        // this.$dialog.OpenWindow({
        //   width: '1050',
        //   height: '700',
        //   url:'/selectBankDetail?direction=0&categoryBefore=1&selectType=1&type=1&otherID='+this.contactPersonID
        //     +'&annotation=注:该交易明细与工单里车主联系人有关,如果联系人与车主交易记录为空,则当前为空。',
        //   title:'绑定流水',
        //   closeCallBack:(data) =>{
        //     if(data){
        //       console.log(data)
        //       let datas = data[0]
        //       let insertDate = new Date(accAdd(new Date().getTime(), accMul(this.bankDetailList.length, 1000)))
        //       let num = accAdd(this.bankDetailList.length,1) + ''
        //
        //
        //       let params = {
        //         id:guid(),
        //         orderid:this.ownerID,//工单id
        //         ownerID:this.id,//流水主表id
        //         type:'0',//收入
        //         dependid:datas.id,//选中数据的id
        //         account:datas.account,//银行卡尾号
        //         actualMoney: datas.useMoney,//交易金额
        //         bankName:datas.bankName,//银行卡名称
        //         cccurDate:datas.cccurDate,//交易日期
        //         remark:datas.remark,//备注
        //         subject:datas.subject,//交易事由
        //         otherID:datas.otherID,//对方账户
        //         otherName:datas.otherName,//对方姓名
        //         personid:sessionStorage.getItem('____currentUserID'),//
        //       }
        //       this.ajaxJson({
        //         url: '/fix/fixOrder/updateOrderForre2',
        //         data: params,
        //         call: (da) => {
        //           if(da.type=='0'){
        //             this.bankDetailList.push({
        //               id: this.id,
        //               type:'0',
        //               insertDate: formatTime(insertDate),
        //               num:this.bankDetailList.length+1+'',
        //               selfAccount:datas.selfAccount,
        //               cccurDate:datas.cccurDate,
        //               otherName:datas.otherName,
        //               subject:datas.subject,
        //               money:datas.money,
        //               useMoney:datas.useMoney,
        //               remark:datas.remark,
        //               dependid:datas.id,
        //             })
        //           }
        //         }
        //       })
        //     }
        //   }
        // })
      },
      addService(){//添加其它服务
        this.$dialog.OpenWindow({
            width: '1050',
            height: '700',
            url:'/workOrderDetailsManagerView?ownerID='+this.ownerID+ '&id='+'&orderid='+this.orderid +'&flowPathID='+this.flowPathID,
            title:'服务列表',
            closeCallBack:(datas) =>{
              this.initData()
            }
        })
      },
      binding(){
        this.$dialog.OpenWindow({
          width: '1050',
          height: '700',
          url:'/selectBankDetail?direction=0&categoryBefore=1&selectType=1&type=1&otherID='+this.contactPersonID,
          title:'流水绑定',
          closeCallBack:(datas) =>{
            if (datas) {
              // this.initData(false)
              this.bankDetailList = datas
              this.bankDetailShow = true
              this.ajaxJson({
                url: '/fix/fixOrder/save',
                data: {
                  id:this.ownerID,
                  finID:datas[0].id
                },
                call: (data) => {
                  if (data.type === 0) {
                    this.$dialog.alert({
                      tipValue: data.message,
                      closeCallBack: () => {
                        // this.$dialog.close()
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
        })
      },
      otherPriceChange(){//合计金额发生变化时
        let otherPrice = this.otherPrice.concat()//其它金额
        let totalMoney = this.totalMoney.concat()//合计金额
        if(otherPrice==0||otherPrice==''||(otherPrice+'').indexOf('-')!=-1){
          // this.otherPrice = 0
          this.pendingMoney = this.backupsTotalMoney
          this.totalMoney = this.backupsTotalMoney
        }else{
          this.pendingMoney = Number((Number(otherPrice).toFixed(2)))+Number((Number(totalMoney).toFixed(2)))+''
          this.totalMoney = this.pendingMoney
        }
      },
      timestampToTime(timestamp) {//时间戳转化为时间
        var date = new Date();//时间戳为10位需*1000，时间戳为13位的话不需乘1000
        var Y = date.getFullYear() + '-';
        var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
        var D = (date.getDate() < 10 ? '0'+date.getDate() : date.getDate()) + ' ';
        var h = (date.getHours() < 10 ? '0'+date.getHours() : date.getHours()) + ':';
        var m = (date.getMinutes() < 10 ? '0'+date.getMinutes() : date.getMinutes()) + ':';
        var s = (date.getSeconds() < 10 ? '0'+date.getSeconds() : date.getSeconds());
        let strDate = Y+M+D;
        return strDate;
      },
      initData () {
        let params = {
          orderid:this.ownerID,
        }
        this.ajaxJson({
          url: '/fix/fixOrder/queryForOrderCheck',
          data: params,
          call: (data) => {
            if(data){
              for(let i in data.summary.list){
                if(data.summary.list[i].type=='0'){
                  this.bankDetailList.push({
                    id: data.summary.list[i].id,
                    type:'0',
                    insertDate: data.summary.list[i].cccurDate,
                    num:this.bankDetailList.length+1+'',
                    selfAccount:data.summary.list[i].bankName + data.summary.list[i].account,
                    cccurDate:data.summary.list[i].cccurDate,//交易日期
                    otherName:data.summary.list[i].otherName+data.summary.list[i].otherAount,//对方账户
                    subject:data.summary.list[i].subject,
                    money:data.summary.list[i].actualMoney,
                    // useMoney:datas.useMoney,
                    remark:data.summary.list[i].remark,
                    dependid:data.summary.list[i].dependid,
                  })
                }
              }
              this.ajaxJson({
                url: '/fix/summary/initForm',
                data: params,
                call: (data) => {
                  this.cost = data.cost//成本
                  this.profit = data.profit//盈利
                  this.revenue = data.revenue//总收入

                }
              })
              this.flag = data.flag//判断是否已存在流水总表
              this.client = data.order.client//客服
              this.vehicleID = data.order.vehicleID//车辆ID
              this.vehicle = data.order.vehicle//车辆
              this.principal = data.order.principal//负责人
              this.otherCode = data.order.otherCode//其它系统编号
              this.workDate = data.order.workDate//开始日期
              this.contactPerson = data.order.contactPerson//联系人
              this.contactPersonID = data.order.contactPersonID//联系人ID
              this.updateDate = this.timestampToTime(data.order.updateDate)
              this.materialsID = data.fixOrderDetail.ownerID//工单材料表ID
              this.price = data.price//项目金额
              this.amount = data.amount//配件金额
              this.otherPrice = data.otherPrice//其它金额
              this.totalMoney = data.totalMoney//合计金额
              this.pendingMoney = data.pendingMoney//待结金额
              this.backupsTotalMoney = data.totalMoney//备份的合计金额、
              this.fix = data.fix.list//定损单列表
              this.fixOrderDetail = data.fixOrderDetail.list//工单服务列表
              this.fixOrderMaterial = data.fixOrderMaterial.list//配件信息列表

              this.formTypeList = data.formTypePsd.list//定损单详情类型
              this.directionList = data.fixOrderDetail.directionPsd.list//收支方向类型
              this.categoryList = data.fixOrderDetail.categoryPsd.list//收支类型
              this.stateList = data.fixOrderDetail.statePsd.list//工作状态类型

              this.category = data.order.category//维修类型
              if(this.category=='0'){
                this.moneyCheck = '1'
              }
              this.ajaxJson({
                url: '/fix/IWxBalance/getBalanceByvehicleID',
                data: {
                  id:data.order.vehicleID
                },
                call: (data) => {
                  this.balance = data.balance

                }
              })

              // this.summary = data.summary.list//流水详情表
              // if(data.summary.list.length==0){
              //   this.bankDetailShow = false
              // }else{
              //   this.bankDetailShow = true
              // }
              // if(this.contactPersonID){
              //   this.ajaxJson({
              //     url: '/Fin/bankDetailSelectVue',
              //     data: {
              //       direction: "0",
              //       init: true,
              //       otherAccountID: "",
              //       otherID: this.contactPersonID,
              //       selfAccountID: "",
              //       subjectID: "",
              //       type: "1"
              //     },
              //     // loading:'0',
              //     call: (datas) => {
              //       this.bankDetailList = datas.content
              //       this.bankDetailShow = true
              //     }
              //   })
              // }
            }
          }
        })
      }
    },
    created () {
      this.setQuery2Value('ownerID')//工单ID
      this.setQuery2Value('flowPathID')
      this.setQuery2Value('index')
      this.setQuery2Value('operationShow')
      this.setQuery2Value('upDateStateID')//更改子表状态的id
      this.initData()
    }
  }
</script>

<style scoped>

</style>
