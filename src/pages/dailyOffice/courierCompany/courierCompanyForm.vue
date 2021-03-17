<template>
  <div class="f_main">
    <yhm-formbody>
      <template #title>添加信息</template>
      <template #control>
        <yhm-form-text placeholder=""  title="公司名称" subtitle="" :value="unitID" id="unitID"></yhm-form-text>
        <yhm-form-radio title="是否默认项" :select-list="defaultsList" :value="defaults" id="defaults" ></yhm-form-radio>
        <yhm-form-text placeholder="" @subClick="subClick" subtitle-color="#49a9ea"  title="公司编码" subtitle="编码查询表" :value="unitCoding" id="unitCoding"></yhm-form-text>
        <yhm-form-radio title="是否支持" subtitle="轨迹查询" :select-list="trackList" :value="track" id="track" ></yhm-form-radio>
        <yhm-form-radio title="是否支持" subtitle="在线下单" :select-list="orderOnlineList" :value="orderOnline" id="orderOnline" ></yhm-form-radio>
        <yhm-form-radio title="是否支持" subtitle="预约取件" :select-list="reservationList" :value="reservation" id="reservation" ></yhm-form-radio>
        <yhm-form-text placeholder=""  title="查单网址" subtitle="" :value="inquiryURL" id="inquiryURL"></yhm-form-text>
        <yhm-form-text placeholder=""  title="查单电话	" subtitle="" :value="inquiryPhone" id="inquiryPhone"></yhm-form-text>
        <yhm-form-select  title="付款公司" tip="value" @click="paymentUnitIDClick()"   :value="paymentUnit" id="paymentUnit" rule="R0000"></yhm-form-select>
      </template>

    </yhm-formbody>
    <div class="f_split"></div>
    <yhm-form-list-edit>
      <template #title>储值卡信息</template>
      <template #operate>
        <yhm-commonbutton  value="添加储值卡信息" icon="btnAdd" @call="addDiscount"></yhm-commonbutton>
      </template>
      <template #listHead>
        <yhm-managerth style="width: 150px" title="编号"></yhm-managerth>
        <yhm-managerth style="width: 150px" title="别名"></yhm-managerth>
        <yhm-managerth style="width: 100px" title="密码"></yhm-managerth>
        <yhm-managerth style="width: 250px" title="备注"></yhm-managerth>
        <yhm-managerth style="width: 100px" title="当前金额"></yhm-managerth>
        <yhm-managerth style="width: 75px" title="充值"></yhm-managerth>
        <yhm-managerth style="width: 100px" title="充值记录"></yhm-managerth>
        <yhm-managerth style="width: 40px" title="删除"></yhm-managerth>
      </template>
      <template #listBody>
        <tr v-for="(item,index) in listStoredCard" :key="index" :class="{InterlacBg:index%2!==0}">
          <yhm-form-td-textbox width="150" :list="listStoredCard" listid="listStoredCard" :value="item" id="numbering" rule="R0000"></yhm-form-td-textbox>
          <yhm-form-td-textbox width="150" :list="listStoredCard" listid="listStoredCard" :value="item" id="alias" rule="R0000"></yhm-form-td-textbox>
          <yhm-form-td-textbox width="100" :list="listStoredCard" listid="listStoredCard" :value="item" id="password" rule="R0000"></yhm-form-td-textbox>
          <yhm-form-td-textbox width="250" :list="listStoredCard"  listid="listStoredCard" :value="item" id="remark"></yhm-form-td-textbox>
          <yhm-form-td-textbox width="100" :list="listStoredCard"  listid="listStoredCard" :value="item" id="currentMoney"></yhm-form-td-textbox>
          <yhm-form-td-textbox width="75" :list="listStoredCard"  listid="listStoredCard" ></yhm-form-td-textbox>
          <yhm-form-td-textbox width="100" :list="listStoredCard"  listid="listStoredCard" ></yhm-form-td-textbox>
          <yhm-form-td-delete :must="1" width="40" :list="listStoredCard"  listid="listStoredCard" :value="item" :del-click="true" @click="delDiscount(index,item)"></yhm-form-td-delete>
        </tr>
      </template>
      <template #empty>
        <span class="m_listNoData" v-if="listStoredCard.length>0?false:true">暂时没有数据</span>
      </template>
    </yhm-form-list-edit>
    <div class="f_split"></div>
    <yhm-form-list-edit>
      <template #title>月结账号信息</template>
      <template #operate>
        <yhm-commonbutton  value="添加月结账号信息" icon="btnAdd" @call="addMonthlyDiscount"></yhm-commonbutton>
      </template>
      <template #listHead>
        <yhm-managerth style="width: 150px" title="编号"></yhm-managerth>
        <yhm-managerth style="width: 150px" title="别名"></yhm-managerth>
        <yhm-managerth style="width: 450px" title="备注"></yhm-managerth>
        <yhm-managerth style="width: 175px" title="待结账金额"></yhm-managerth>
        <yhm-managerth style="width: 40px" title="删除"></yhm-managerth>
      </template>
      <template #listBody>
        <tr v-for="(item,index) in listMonthlyAccount" :key="index" :class="{InterlacBg:index%2!==0}">
          <yhm-form-td-textbox width="150" :list="listMonthlyAccount" listid="listMonthlyAccount" :value="item" id="monthlyNumbering" rule="R0000"></yhm-form-td-textbox>
          <yhm-form-td-textbox width="150" :list="listMonthlyAccount" listid="listMonthlyAccount" :value="item" id="monthlYalias" rule="R0000"></yhm-form-td-textbox>
          <yhm-form-td-textbox width="450" :list="listMonthlyAccount" listid="listMonthlyAccount" :value="item" id="monthlyRemark" rule="R0000"></yhm-form-td-textbox>
          <yhm-form-td-textbox width="175" :list="listMonthlyAccount"  listid="listMonthlyAccount" :value="item" id="monthlypendingSettlementMoney"></yhm-form-td-textbox>
          <yhm-form-td-delete :must="1" width="40" :list="listMonthlyAccount"  listid="listMonthlyAccount" :value="item" :del-click="true" @click="delMonthlyDiscount(index,item)"></yhm-form-td-delete>
        </tr>
      </template>
      <template #empty>
        <span class="m_listNoData" v-if="listMonthlyAccount.length>0?false:true">暂时没有数据</span>
      </template>
    </yhm-form-list-edit>
    <yhm-formoperate :createName="createName" :insertDate="insertDate" :updateName="updateName" :updateDate="updateDate">
      <template #btn>
        <yhm-commonbutton value="保存" icon="btnSave" :flicker="true" @call="save()"></yhm-commonbutton>
      </template>
    </yhm-formoperate>
  </div>
</template>

<script>
  import { formmixin } from '@/assets/form.js'
  import { accMul, accAdd, guid, formatDate, number2chinese,formatTime ,formatPhone, formatIdNo,} from '@/assets/common.js'
  export default {
    name: 'courierCompanyForm',
    mixins: [formmixin],
    data(){
      return{
        id:'',
        unitID:'',          //公司名称
        defaultsList:[],
        defaults:'',        //是否默认项
        unitCoding:'',      //公司编码
        trackList:[],       //轨迹查询
        track:'',
        orderOnlineList:[],   //在线下单
        orderOnline:'',
        reservationList:[],   //预约取件
        reservation:'',
        inquiryURL:'',    //查单网址
        inquiryPhone:'',    //查单电话
        listStoredCard:[],
        numbering:'',
        alias:'',
        password:'',
        remark:'',
        listMonthlyAccount:[],
        monthlyNumbering:'',
        monthlYalias:'',
        monthlyRemark:'',
        monthlypendingSettlementMoney:'',
        paymentUnit:'',
        paymentUnitID:'',
      }
    },
    methods:{
      paymentUnitIDClick(){
        this.$dialog.OpenWindow({
          width: 950,
          height: 692,
          url: '/selectUnit?category=1',
          title: '选择付款公司',
          closeCallBack: (data) => {
            if(data) {
              this.paymentUnitID = data.id
              this.paymentUnit = data.name
            }
          },
        })
      },
      addMonthlyDiscount(){
        let insertDate = new Date(accAdd(new Date().getTime(), accMul(this.listMonthlyAccount.length, 1000)))
        this.listMonthlyAccount.push({
          id: guid(),
          insertDate: formatTime(insertDate),
          ownerID: this.id,
          monthlyNumbering:this.monthlyNumbering,
          monthlYalias:this.monthlYalias,
          monthlyRemark: this.monthlyRemark,
          monthlypendingSettlementMoney:this.monthlypendingSettlementMoney,
          searchField:''
        })
      },
      delMonthlyDiscount(index,item){
        this.$dialog.alert({
          tipValue: '删除成功！！！',
          closeCallBack: ()=>{
            this.listMonthlyAccount.splice(index, 1)
            if(this.listMonthlyAccount.length === 0){
              this.addMonthlyDiscount()
            }
          }
        })
      },
      /* 优惠信息 */
      addDiscount(){

        let insertDate = new Date(accAdd(new Date().getTime(), accMul(this.listStoredCard.length, 1000)))
        this.listStoredCard.push({
          id: guid(),
          insertDate: formatTime(insertDate),
          ownerID: this.id,
          numbering:this.numbering,
          alias:this.alias,
          password:this.password,
          remark: this.remark,
          currentMoney:this.currentMoney,
          searchField:''
        })

      },
      delDiscount(index,item){
        this.$dialog.alert({
          tipValue: '删除成功！！！',
          closeCallBack: ()=>{
            this.listStoredCard.splice(index, 1)
            if(this.listStoredCard.length === 0){
              this.addDiscount()
            }
          }
        })
      },

      subClick(){
        window.open('/UploadFile/' + 'unitCoding' + '/快递公司编码.xlsx'  )
      },
      save(){
        for (let i in this.listStoredCard){
          this.listStoredCard[i].searchField=this.listStoredCard[i].id+'█'+this.listStoredCard[i].insertDate+'█'+this.listStoredCard[i].ownerID+'█'+this.listStoredCard[i].numbering+'█'+this.listStoredCard[i].remark+'█'+this.listStoredCard[i].alias
        }
        for (let i in this.listMonthlyAccount){
          this.listMonthlyAccount[i].searchField=this.listMonthlyAccount[i].id+'█'+this.listMonthlyAccount[i].insertDate+'█'+this.listMonthlyAccount[i].ownerID+'█'
            +this.listMonthlyAccount[i].monthlyNumbering+'█'+this.listMonthlyAccount[i].monthlYalias+'█'+this.listMonthlyAccount[i].monthlyRemark
        }
        let params={
          id:this.id,
          unitID:this.unitID,
          defaults:this.defaults,
          unitCoding:this.unitCoding,
          track:this.track,
          orderOnline:this.orderOnline,
          reservation:this.reservation,
          inquiryURL:this.inquiryURL,
          inquiryPhone:this.inquiryPhone,
          listStoredCard:this.listStoredCard,
          listMonthlyAccount:this.listMonthlyAccount,
          paymentUnitID:this.paymentUnitID
        }

        this.ajaxJson({
          url: '/dailyoffice/expressCompany/save',
          data: params,
          call: (data) => {
            if (data.type === 0) {
              this.$dialog.setReturnValue('1')
              this.$dialog.alert({
                tipValue: data.message,
                closeCallBack: () => {
                  this.$dialog.close()
                }
              })
            }else if(data.type === 1){
              this.$dialog.alert({
                alertImg:'warn',
                tipValue: data.message
              })
            }
          }
        })
      },
    },
    created(){
      this.setQuery2Value('id')
      this.init({
        url: '/dailyoffice/expressCompany/initForm',
        all: (data) => {
          this.defaultsList = data.defaultsPsd.list
          this.defaults = data.defaultsPsd.value

          this.trackList = data.trackPsd.list
          this.track = data.trackPsd.value

          this.orderOnlineList = data.orderOnlinePsd.list
          this.orderOnline = data.orderOnlinePsd.value

          this.reservationList = data.reservationPsd.list
          this.reservation = data.reservationPsd.value

        },
        add: (data) => {
          /* 需要添加的数据 */
        },
        look: (data) => {
          /* 需要查看的数据 */
          this.unitCoding=data.unitCoding
          this.unitID=data.unitID
          this.inquiryURL=data.inquiryURL
          this.inquiryPhone=data.inquiryPhone
          this.listStoredCard=data.listStoredCard
          this.listMonthlyAccount=data.listMonthlyAccount
          this.paymentUnit=data.paymentUnit
          this.paymentUnitID=data.paymentUnitID
        }
      })
    }
  }
</script>

<style scoped>

</style>
