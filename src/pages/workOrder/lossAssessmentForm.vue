<template>
    <div class="f_main">
      <yhm-formbody>
        <template #title>基本信息</template>
        <template #control>
          <yhm-form-radio title="维修类型" :select-list="categoryList.list" :value="category+''" @call="callCategory" id="category"></yhm-form-radio>
          <yhm-form-date title="勘察日期"  :max="currentDate" :max-year="Number(currentDate.slice(0,4))" :value="workDate" id="workDate" rule="R0000"></yhm-form-date>
          <yhm-form-text title="定损金额" tip="money" before-icon="rmb" no-edit="1" @input="moneyChange" :value="money" id="money"></yhm-form-text>
          <yhm-formupload :ownerID="id" :value="fileList" id="fileList" title="支持单据" tag="fixPhoto" subtitle=""></yhm-formupload>
        </template>
      </yhm-formbody>

      <div class="f_split"  v-show="noInvoice"></div>
      <yhm-form-list-edit v-show="noInvoice">
        <template #title>责任明细</template>
        <template #listHead>
<!--          <yhm-managerth style="width: 130px" title="工单"></yhm-managerth>-->
          <yhm-managerth style="width: 160px" title="日期"></yhm-managerth>
          <yhm-managerth style="width: 80px" title="维修类型"></yhm-managerth>
          <yhm-managerth style="width: 140px" title="定损价格"></yhm-managerth>
          <yhm-managerth style="width: 130px" title="理赔比例"></yhm-managerth>
          <yhm-managerth style="width: 130px" title="理赔钱数"></yhm-managerth>
        </template>
        <template #listBody>
          <tr v-for="(item,index) in invoiceDetails" :key="index" :class="{InterlacBg:index%2!==0}">
<!--            <yhm-form-td-textbox width="160" style="text-align: center;" :value="item" id="code"  rule="R0000" no-edit="1" :list="invoiceDetails" listid="invoiceDetails"></yhm-form-td-textbox>-->
            <yhm-form-td-date width="220" style="text-align: center;" no-edit="1" :list="invoiceDetails" listid="invoiceDetails" :value="item" id="insertDate" rule="R0000"></yhm-form-td-date>
            <yhm-form-td-textbox width="120" style="text-align: center;" :value="item" no-edit="1" id="categoryStr" rule="R1000" :list="invoiceDetails" listid="invoiceDetails"></yhm-form-td-textbox>
            <yhm-form-td-textbox width="200" @input="moneyEvent(index)" no-edit="1"  after-icon="rmb" :value="item" id="money" rule="R3000" :list="invoiceDetails" listid="invoiceDetails"></yhm-form-td-textbox>
            <yhm-form-td-textbox width="190" @input="actualMoneyEvent(index)" after-icon="icon-percentage" :value="item" id="rate" rule="R3000"  :list="invoiceDetails" listid="invoiceDetails"></yhm-form-td-textbox>
            <yhm-form-td-textbox width="190" @input="rateMoneyEvent(index)" no-edit="1" after-icon="rmb" :value="item" id="rateMoney" :list="invoiceDetails" listid="invoiceDetails"></yhm-form-td-textbox>

          </tr>
        </template>
      </yhm-form-list-edit>
      <!--       v-show="detailsShow"-->
      <yhm-form-list-show style="margin-top: 20px;">
        <template #title>定损单详情</template>
        <template #operate>
          <yhm-commonbutton value="添加" icon="btnAdd" :is-error="true" :flicker="true" @call="addDetail()" category="three"></yhm-commonbutton>
        </template>
        <template #listHead>
          <yhm-managerth style="width: 38px" title="查看"></yhm-managerth>
          <yhm-managerth title="项目名称"></yhm-managerth>
          <yhm-managerth title="类型"></yhm-managerth>
          <yhm-managerth style="width: 120px" title="数量"></yhm-managerth>
          <yhm-managerth title="单价"></yhm-managerth>
          <yhm-managerth style="width: 120px;" title="工时费"></yhm-managerth>
<!--          <yhm-managerth style="width: 80px;" title="文件"></yhm-managerth>-->
          <!--          <yhm-managerth style="width: 38px;" title="删除"></yhm-managerth>-->
        </template>
        <template #listBody>
          <tr v-for="(item,index) in list" :class="[{InterlacBg:index%2!=0}]" :key="item.id">
            <yhm-manager-td-look @click="listView(index,item)"></yhm-manager-td-look>
            <yhm-manager-td :value="item.nameStr+''"></yhm-manager-td>
            <yhm-manager-td-center :value="formTypeList[item.category].showName+''"></yhm-manager-td-center>
            <yhm-manager-td-center :value="item.quantity+''"></yhm-manager-td-center>
            <yhm-manager-td-money :value="item.price+''"></yhm-manager-td-money>
            <yhm-manager-td-money :value="item.money+''"></yhm-manager-td-money>
<!--            <yhm-manager-td-image :tip="true" v-else left="-340" width="900" height="550" :value="item.publicUrl===''?'&#45;&#45;&#45;&#45;&#45;&#45;':item.publicUrl" tag="ElectronicInvoice"></yhm-manager-td-image>-->

<!--            <yhm-manager-td-operate>-->
<!--              <yhm-manager-td-operate-delete  @click="delFromList(item.id)"></yhm-manager-td-operate-delete>-->
<!--            </yhm-manager-td-operate>-->
          </tr>
        </template>
        <template #empty>
          <span class="m_listNoData" v-show="list.length==0?true:false">暂时没有数据</span>
        </template>
      </yhm-form-list-show>
      <yhm-formoperate :createName="createName" :insertDate="insertDate" :updateName="updateName" :updateDate="updateDate">
        <template #btn>
          <yhm-commonbutton value="保存" icon="btnSave" :flicker="true" @call="save()"></yhm-commonbutton>
<!--          <yhm-commonbutton value="跳过" v-if="indexs==0||inTheEnd=='true'" icon="btnSave" :flicker="true" @call="skip()"></yhm-commonbutton>-->

        </template>
      </yhm-formoperate>
    </div>
</template>

<script>
  import { selectmixin } from '@/assets/select.js'
  import { accMul, accAdd, guid, formatDate, formatTime } from '@/assets/common.js'
  export default {
    name: 'lossAssessmentForm',
    mixins: [selectmixin],
    data(){
      return{
        currentDate: formatDate(new Date()),//当前日期
        workDate:formatDate(new Date()),
        noInvoice:false,
        detailsShow:false,
        money:'',
        list:[],
        id:'',
        invoiceDetailsID:'',
        invoiceDetailsID2:'',
        state:'0',
        category:'0',
        formTypeList:[],
        fileList:[],
        invoiceDetails:[
          {
            id:'',
            ownerID:this.ownerID,
            insertDate:formatDate(new Date()),
            categoryStr:'保险理赔',
            money:'',
            rate:'50',
            rateMoney:''
          },
          {
            id:'',
            ownerID:this.ownerID,
            insertDate:formatDate(new Date()),
            categoryStr:'自费维修',
            money:'',
            rate:'50',
            rateMoney:''
          }
        ],
        categoryList:{
          list:[
            {
              showName:'保险理赔',
              code:'',
              img:'',
              num:'0',
            },
            {
              showName:'自费维修',
              code:'',
              img:'',
              num:'1',
            }
          ],
          value:''
        }
      }
    },
    watch:{
      money(newVal,val){
        this.moneyChange()
      }
    },
    methods:{
      skip(){
        this.ajaxJson({
            url: '/fix/fixProcess/update',
            data: {
              stage:'1',
              id:this.flowPathID,//主流程表ID
              ownerID:this.ownerID,//工单ID
            },
            call: (data)=>{
              if (data.type === 0) {
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
                  }
                })
              }
            }
        })
      },
      moneyChange(){
        this.invoiceDetails[0].money = this.money
        this.invoiceDetails[1].money = this.money
        this.moneyEvent(0)
        this.moneyEvent(1)
      },
      save(){
        let a = this.validator()
        if(a){
          this.invoiceDetails[0].ownerID = this.ownerID
          this.invoiceDetails[1].ownerID = this.ownerID
          let fileList = []
          if(this.fileList!=null){
            fileList = this.fileList
          }
          let params = {
            ownerID:this.ownerID,
            id: this.id,
            money:this.money,
            category:this.category,
            workDate:this.workDate,
            param:{
              id: this.id,
              list:fileList
            },
            list:this.list

          }
          this.ajaxJson({
            url: '/fix/fixed/saveAndConfirm',
            data: params,
            call: (data)=>{
              if (data.type == 0||data.type == 1) {
                if(this.category=='2'){
                  this.ajaxJson({
                    url: '/fix/fixOrderMoney/save',
                    loading:'0',
                    data:{ list:this.invoiceDetails },
                    call: (parameters) => {

                    }
                  })
                }
                this.$dialog.setReturnValue(this.id) //向父级页面id值
                this.$dialog.alert({
                  tipValue: data.message,
                  closeCallBack: () => {
                    this.detailsShow = true
                    this.state = '1'
                    this.$dialog.close()
                  }
                })
              }else{
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

      },
      listView(index,item){
        item.formTypeList = this.formTypeList
        sessionStorage.lossAssessmentDetailsData = JSON.stringify(item)
        this.$dialog.OpenWindow({
          width: '1050',
          height: '650',
          url:'/lossAssessmentDetailsForm?ownerID='+this.id +'&id=' + item.id+'&flowPathID=' + this.flowPathID+'&lookOverShow=true',
          title:'编辑定损单详情',
          closeCallBack:(data) =>{
            if (data) {
              let list = this.list[index]
              list.id = data.params.id
              list.ownerID = data.params.ownerID
              list.processid = data.params.processid
              list.productid = data.params.productid
              list.insertDate = data.params.insertDate
              list.nameStr = data.params.nameStr
              list.category = data.params.category
              list.quantity = data.params.quantity
              list.price = data.params.price
              list.money = data.params.money
              // this.initData()
              let money = 0
              for(let i in this.list){
                money += (Number(this.list[i].quantity)*Number(this.list[i].price))
              }
              this.money = money
            }
          }
        })
      },
      percentage(num, total) {
        num = parseFloat(num);
        total = parseFloat(total);
        if (isNaN(num) || isNaN(total)) {
          return "-";
        }
        return total <= 0 ? "0%" : (Math.round(num / total * 10000) / 100.00)+"%";
      },
      rateMoneyEvent(index){
        let list = this.invoiceDetails
        // if(index==0){
        //   list[0].rate = this.percentage(Number(list[index].rateMoney),Number(list[0].money))
        // }else if(index == 1 ){
        //   list[1].rate = this.percentage(Number(list[index].rateMoney),Number(list[1].money))
        // }
        list[0].rateMoney = Number(list[0].rateMoney).toFixed(2)
        list[1].rateMoney = Number(list[1].rateMoney).toFixed(2)
      },
      //理赔比例
      actualMoneyEvent(index){
        let list = this.invoiceDetails

        if(list[0].rate!==''&&index==0&&list[0].rate<100&&list[0].rate.indexOf('-')==-1){
          list[1].rate = (100 - Number(list[0].rate))+''
        }else if(list[1].rate!==''&&index==1&&list[1].rate<100&&list[1].rate.indexOf('-')==-1){
          list[0].rate = (100 - Number(list[1].rate))+''
        }
        if(Number(list[0].rate)+Number(list[1].rate)>100){
          if(index==0){
            list[0].rate = (100 - Number(list[1].rate))+''
          }else{
            list[1].rate = (100 - Number(list[0].rate))+''
          }
        }
        list[0].rateMoney = Number(list[0].money) * Number(list[0].rate/100) + ''
        list[1].rateMoney = Number(list[1].money) * Number(list[1].rate/100) + ''
        this.rateMoneyEvent(index)
      },
      //定损价格
      moneyEvent(index){
        let list = this.invoiceDetails

        if(index==0){
          list[1].money = list[0].money
        }else{
          list[0].money = list[1].money
        }
        list[0].rateMoney = Number(list[0].money) * Number(list[0].rate/100) + ''
        list[1].rateMoney = Number(list[1].money) * Number(list[1].rate/100) + ''
        this.rateMoneyEvent(index)
      },
      callCategory(){
        if(this.category == '2'){
          this.noInvoice = true
        }else{
          this.noInvoice = false
        }
      },
      addDetail(){
        this.$dialog.OpenWindow({
          width: '1050',
          height: '650',
          url:'/lossAssessmentDetailsForm?ownerID='+this.id+'&flowPathID=' + this.flowPathID+'&lookOverShow=false',
          title:'添加定损单详情',
          closeCallBack:(data) =>{
             if (data) {
               this.list.push({
                 id:data.params.id,
                 ownerID:data.params.ownerID,
                 processid:data.params.processid,
                 productid:data.params.productid,
                 insertDate:data.params.insertDate,
                 nameStr:data.params.nameStr,
                 category:data.params.category,
                 quantity:data.params.quantity,
                 price:data.params.price,
                 money:data.params.money,
               })
              // this.initData(false)
               let money = 0
               for(let i in this.list){
                 money += (Number(this.list[i].quantity)*Number(this.list[i].price))
               }
               this.money = money
            }
          }
        })
      },
      calculateMoney(data){//定损总价
        this.ajaxJson({
          url: '/fix/fixed/check',
          data: {
            id:data.id
          },
          call:(datas)=>{
            this.money = datas.money
          }
        })
      },
      initData (type) {
        let params = {
          ownerID:this.ownerID,
        }
        this.ajaxJson({
          url: '/fix/fixed/initForm',
          data: params,
          call: (data) => {
            if(data){
              if(data.id!=null){
                this.id = data.id
                this.calculateMoney(data)
              }
              this.list = data.list
              this.money = data.money
              this.fileList = data.photoList
              this.workDate = data.workDate
              if(type!=false){
                this.category = data.category
              }
              this.formTypeList = data.formTypePsd.list
              sessionStorage.lossAssessmentDetailsData = JSON.stringify({formTypeList:data.formTypePsd.list})
              this.$nextTick(()=>{
                if(data.category==2&&!data.list2){//当维修类型是共责并且list3不等于空时 赋值id
                  this.invoiceDetails[0].id = data.list2[0].id
                  this.invoiceDetails[1].id = data.list2[1].id
                }else{//否则表示还没有添加共责表 使用生成的guid
                  this.invoiceDetails[0].id = this.invoiceDetailsID
                  this.invoiceDetails[1].id = this.invoiceDetailsID2
                }
                if(data.list2){
                  // this.invoiceDetails = []
                  this.invoiceDetails[1].rate = data.list2[1].rate
                  this.invoiceDetails[0].rate = data.list2[0].rate
                  this.invoiceDetails[0].rateMoney = data.list2[0].rateMoney
                  this.invoiceDetails[1].rateMoney = data.list2[1].rateMoney

                  // console.log( this.invoiceDetails[0],this.invoiceDetails[1] )
                }
              })
              if(data.id!=null){
                this.detailsShow = true
              }
              if(data.category=='2'){
                this.noInvoice = true
              }
              this.moneyChange()

            }
          }
        })
      }
    },
    created () {
      this.setQuery2Value('ownerID')//工单id
      this.setQuery2Value('flowPathID')//主流程表id
      this.setQuery2Value('inTheEnd')//当前节点是否为所有节点的最后一个
      this.setQuery2Value('index')//当前节点的索引值
      this.setQuery2Value('indexs')//当前节点的索引值
      this.setQuery2Value('upDateStateID')//更改子表状态的id
      if(this.index!=0&&this.index!=undefined){
        let params = {
          id:this.upDateStateID,
          ownerID:this.flowPathID,
          state:'1'
        }
        this.ajaxJson({
          url: '/fix/fixProcessDetail/confirm',
          data: params,
          call: (datas) => {

          }
        })
      }
      this.id = guid()
      this.invoiceDetailsID = guid()
      this.invoiceDetailsID2 = guid()

      this.initData()
    }

  }
</script>

<style scoped>

</style>
