<template>
    <div class="aaa">
      moneyCheck:{{moneyCheck}}
      <!--name:{{name}}<br>
      phone:{{phone}}-->

      <yhm-form-zh-text-more-checkbox @clickCheckBox="clickCheckBoxEvent" title="金额" :value="money" id="money" :check-value="moneyCheck" check-value-id="moneyCheck" :check-list="moneyCheckList"></yhm-form-zh-text-more-checkbox>
<!--

      <div style="margin-top: 20px;" @click="payApplyReconDetailForm">批量拨付 - 付款申请</div>
      <div style="margin-top: 20px;" @click="reimbursementReconDetailForm">批量拨付 - 报销</div>
      <div style="margin-top: 20px;" @click="unitEvent">查看单位-明细</div>

      <div style="margin-top: 20px;" @click="noTicket">无票</div>
      <div style="margin-top: 20px;" @click="boardDire">董事费</div>
      <div style="margin-top: 20px;" @click="ticket">有票</div>
-->
      <div  @click="selectssss">1111111111111322222222222222222222</div>

      <br>
      <br>
      <br>
      <!--<div style="width: 1205px;  background: #FFFFFF; ">
        <div style="margin: 10px;display: flex;flex-direction: row; flex-wrap: wrap;">
          <yhm-view-list-block @call="rightMenuEvent" :item="item" :menu="menu" :psd="psd" category-value="0" category="0" code="123456789123456789" color="#FF0000">
            <yhm-view-psd :psd="psd" value="0"></yhm-view-psd>
          </yhm-view-list-block>
          <yhm-view-list-block @call="rightMenuEvent" :item="item" :menu="menu" :psd="psd" category-value="1" category="1" code="123456789123456790" color="#00FF00">22</yhm-view-list-block>
          <yhm-view-list-block @call="rightMenuEvent" :item="item" :menu="menu" :psd="psd" category-value="0" category="2" code="1234567891234567" color="#0000FF">33</yhm-view-list-block>
          <yhm-view-list-block @call="rightMenuEvent" :item="item" :menu="menu" :psd="psd" category-value="1" category="3" code="1234567891234568" color="#FF0000">44</yhm-view-list-block>
        </div>
      </div>-->
     <!-- <br>
      <yhm-app-view-control title="申请日期" content="1900-01-01" type="date"></yhm-app-view-control>
      <yhm-searchfilter :value="search" id="search" :searchList=searchList @keyup="initData"></yhm-searchfilter>
      <br>
      {{details}}<br>
      carDamage:{{carDamage}}<br>
      threeResponsibilities:{{threeResponsibilities}}<br>
      driver:{{driver}}<br>
      scratch:{{scratch}}<br>
      specify:{{specify}}<br>
      passenger:{{passenger}}<br>
      selfGlass:{{selfGlass}}<br>
      glass:{{glass}}<br>
      actualMoney:{{actualMoney}}
      <br>
      <br>
      <br>
      <br>
      <br>
      <br>
      <br>
      <br>
      <br>
      <br>-->

      <!--//车上人员乘客
      passenger:'',
      //自店承保玻璃险
      selfGlass:'',-->
      <!--<yhm-form-zh-select-text tip-before="value" tip-after="phone" @call="selectName" :before="name" before-id="name" :after="phone" after-id="phone" before-rule="#" after-rule="R4000" title="联系人" after-title="手机号码" after-width="100"></yhm-form-zh-select-text>
      <yhm-form-date title="日期" :value="workDate" id="workDate"></yhm-form-date>-->
      <!--<yhm-form-text title="金额" type="number" :decimal-places="2" tip="money" :value="actualMoney" id="actualMoney"></yhm-form-text>
      <yhm-form-select-insurance :is-content="true"
                                 title="商业险种"
                                 :psd="psd"
                                 :car-damage-value="carDamage" car-damage-id="carDamage"
                                 :three-responsibilities-list="threeResponsibilitiesList" :three-responsibilities-value="threeResponsibilities" three-responsibilities-id="threeResponsibilities"
                                 :driver-value="driver" driver-id="driver"
                                 :scratch-list="scratchList" :scratch-value="scratch" scratch-id="scratch"
                                 :glass-list="glassList" :glass-value="glass" glass-id="glass"
                                 :specify-value="specify" specify-id="specify"
                                 :passenger-value="passenger" passenger-id="passenger"
                                 :self-glass-value="selfGlass" self-glass-id="selfGlass"
                                 :value="details" id="details" rule="#"></yhm-form-select-insurance>
      <yhm-form-zh-select-more @click="selectPlan" :min="min" category="date" title="部门分配" :total="actualMoney" :value="details" text-width="82" id="details" rule="#" rule-item="R3000"></yhm-form-zh-select-more>
      &lt;!&ndash;<yhm-date-panel :show="show" id="workDate" :value="workDate" min="2019-11-12" max="2020-01-21"></yhm-date-panel>&ndash;&gt;
      <br>-->
      <br>
    </div>

</template>

<script>
  import { accMul, accAdd, guid, formatDate,formatTime } from '@/assets/common.js'
  import { selectItem,managermixin } from '@/assets/manager.js'
  export default {
    name: 'demo',
    mixins: [managermixin],
    provide(){
      return{
        p____page:this
      }
    },
    data(){
      return{
        money:'',
        moneyCheck:"",
        moneyCheckList:[{showName:"向上取整",num:"0"},{showName:"向下取整",num:"1"}],
        min:'2019-12-30',
        show:true,
        item:{id:'1'},
        //workDate:'2019-09-10',
        workDate:'',
        actualMoney:'3000',


        //选择的商业险项目
        details:[],
        //商业险种
        psd:[{showName: "车损", num: "0", code: "CarDamage", img: "1"},
          {showName: "三责", num: "1", code: "ThreeResponsibilities", img: "2"},
          {showName: "盗抢", num: "2", code: "", img: "0"},
          {showName: "车上人员司机", num: "3", code: "Driver", img: "1"},
          {showName: "不计免赔", num: "4", code: "", img: "0"},
          {showName: "划痕", num: "5", code: "Scratch", img: "2"},
          {showName: "玻璃", num: "6", code: "Glass", img: "2"},
          {showName: "自然", num: "7", code: "", img: "0"},
          {showName: "无法找到第三方", num: "8", code: "", img: "0"},
          {showName: "涉水", num: "9", code: "", img: "0"},
          {showName: "指定特约店维修险", num: "10", code: "Specify", img: "1"},
          {showName: "新增设备", num: "11", code: "", img: "0"},
          {showName: "车上人员乘客", num: "12", code: "Passenger", img: "1"},
          {showName: "三责假日限额翻倍险", num: "13", code: "", img: "0"},
          {showName: "自店承保玻璃险", num: "14", code: "SelfGlass", img: "1"},
          {showName: "发动机特别损失险", num: "15", code: "", img: "0"},
          {showName: "驾意险", num: "16", code: "", img: "0"}],

        //车损
        carDamage:'',
        //三责险选择内容
        threeResponsibilitiesList:[
          {showName: "5万", num: "0", code: "", img: ""},
          {showName: "10万", num: "1", code: "", img: ""},
          {showName: "15万", num: "2", code: "", img: ""},
          {showName: "20万", num: "3", code: "", img: ""},
          {showName: "30万", num: "4", code: "", img: ""},
          {showName: "40万", num: "5", code: "", img: ""},
          {showName: "50万", num: "6", code: "", img: ""},
          {showName: "100万", num: "7", code: "", img: ""},
          {showName: "200万", num: "8", code: "", img: ""}
        ],
        //三责险
        threeResponsibilities:'',
        //司机
        driver:'',
        //划痕选择内容
        scratchList:[
          {showName: "2000", num: "0", code: "", img: ""},
          {showName: "5000", num: "1", code: "", img: ""},
          {showName: "10000", num: "2", code: "", img: ""},
          {showName: "20000", num: "3", code: "", img: ""}
        ],
        //划痕
        scratch:'',
        //玻璃险选择内容
        glassList:[
          {showName: "国产", num: "0", code: "", img: ""},
          {showName: "进口", num: "1", code: "", img: ""}
        ],
        //玻璃险
        glass:'',
        //指定特约店维修险
        specify:'',
        //车上人员乘客
        passenger:'',
        //自店承保玻璃险
        selfGlass:'',


        name:'',
        // psd:[{
        //   num:'0',showName:'万元版',img:'aaa',code:'#FF0000'
        // },{
        //   num:'1',showName:'千元版',img:'aaa',code:'#00FF00'
        // }],
        phone:'',
        menu:['添加','删除删除删除删除删除'],
        p____rule:[],
        search: '',
        searchList: [
          {
            number: 36,
            searchStr: "111111111111"
          },
          {
            number: 36,
            searchStr: "2222222222"
          },
          {
            number: 36,
            searchStr: "333333333"
          },
          {
            number: 36,
            searchStr: "444444444"
          },
          {
            number: 36,
            searchStr: "55555555"
          },
          {
            number: 36,
            searchStr: "666666666"
          }
        ]
      }
    },
    methods : {
      selectssss(){
        // this.$dialog.OpenWindow({
        //   width: '1100',
        //   height: '700',
        //   url:'/selectReceivableForceWriteOff?id=123231',
        //   title:'开票信息',
        //   closeCallBack:(data) =>{
        //
        //   }
        // })
        this.$dialog.OpenWindow({
          width: '1050',
          height: '650',
          url:'/wxMemberSelect?id=1321',  //item.id,
          title:'优惠券选项卡',
          closeCallBack:(data) =>{
          }
        })

      },
      selects(item){
        console.log(item)
        this.$dialog.OpenWindow({
          width: '700',
          height: '200',
          title: '开票信息',
          url: '/claimsListView?item='+item,
          closeCallBack: (data)=>{

          }
        })
      },

      clickCheckBoxEvent(value){
        console.log(this.moneyCheck)
        console.log(value)
      },
      initData(data){
        console.log(data);
      },
      selectPlan(val){
        this.min = val
        let insertDate = new Date(accAdd(new Date().getTime(), accMul(this.details.length, 1000)))

        let item = {
          id: guid(),
          insertDate: formatTime(insertDate),
          ownerID: this.id,
          selectID: val,
          selectValue: val,
          value: ''
        }
        if (this.details.length > 0) {
          this.details[this.details.length - 1].value = ''
        }
        this.details.push(item)
      },
      payApplyReconDetailForm(){
        this.$dialog.OpenWindow({
          width: '1050',
          height: '750',
          title: '申请-批量拨付',
          url: '/payApplyReconDetailForm',
          closeCallBack: (data)=>{
            if(data){
              console.log(data)
            }
          }
        })
      },
      reimbursementReconDetailForm(){
        this.$dialog.OpenWindow({
          width: '1050',
          height: '750',
          title: '报销-批量拨付',
          url: '/reimbursementReconDetailForm',
          closeCallBack: (data)=>{
            if(data){
              console.log(data)
            }
          }
        })
      },

      unitEvent(){
        this.$dialog.OpenWindow({
          width: '1050',
          height: '750',
          title: '单位',
          url: '/unitBankDetailForm',
          closeCallBack: (data)=>{
            if(data){
              console.log(data)
            }
          }
        })
      },
      noTicket(){
        this.$dialog.OpenWindow({
          title: '打印报销单信息',
          url: '/approvalPrintReimbursementTicket?fundID=' + 'D86840BB-830F-4171-BEFC-DD13E4A7256D' + '&ownerID=' + '0',
          width: '846',
          height: '614',
          closeCallBack: (data)=> {

          }
        })
      },
      boardDire(){

      },
      ticket(){

      },
    }
  }
</script>

<style scoped>

</style>
