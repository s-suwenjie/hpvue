<template>
  <div class="f_main mb16">
    <yhm-formbody>
      <template #title>报销明细</template>
      <template #control>
        <yhm-form-text title="申请人" :value="name" id="name" rule="R0000" no-edit=1></yhm-form-text>
        <!--        <yhm-form-text title="交易日期" :value="workDate" id="workDate" rule="R0000" no-edit="1"></yhm-form-text>-->
        <yhm-form-date title="申请日期" :value="workDate" id="workDate" :no-edit=true rule="R0000"></yhm-form-date>
        <yhm-form-text title="报销编号" :value="code" id="code" rule="R0000" no-edit=1></yhm-form-text>
        <!--<yhm-form-radio :show="isPrettyCash" title="备用金" subtitle="是否核销" @call="isPrettyCashEvent" :select-list="isPrettyCashOffList" :value="isPrettyCashOff" id="isPrettyCashOff"></yhm-form-radio>-->
        <yhm-form-radio v-if="isGetPrettyCash" title="备用金" subtitle="是否核销" @call="selectIsPrettyCashOff" :no-edit="getIsPrettyCashOff" :select-list="isPrettyCashOffList" :value="isPrettyCashOff" id="isPrettyCashOff"></yhm-form-radio>
        <yhm-form-text v-if="isPrettyMoneyCash"  no-edit=1 title="备用金" subtitle="核销金额" :value="prettyCashMoney" id="prettyCashMoney" tip="prettyCashMoney" before-icon="rmb" rule="R0000"></yhm-form-text>
      </template>
    </yhm-formbody>
    <yhm-form-list-edit :show="isPrettyMoneyCash">
      <template #title>备用金明细</template>
      <template #operate>
        <yhm-commonbutton :show="selectPrettyCashsShow" value="选择备用金" icon="btnAdd" @call="selectPrettyCashs"></yhm-commonbutton>
      </template>
      <template #listHead>
        <yhm-managerth style="width: 40px" title="查看"></yhm-managerth>
        <yhm-managerth style="width: 150px" title="申请日期"></yhm-managerth>
        <yhm-managerth style="width: 100px" title="金额"></yhm-managerth>
        <yhm-managerth title="事由"></yhm-managerth>
        <yhm-managerth style="width: 150px" title="预计核销日期"></yhm-managerth>
        <yhm-managerth style="width: 200px" title="备注"></yhm-managerth>
        <yhm-managerth style="width: 40px" title="操作"></yhm-managerth>
      </template>
      <template #listBody>
        <tr v-for="(item,index) in prettyCashsList" :key="index" :class="{InterlacBg:index%2!==0}">
          <yhm-manager-td-look @click="prettyCashsView(item)"></yhm-manager-td-look>
          <yhm-form-td-date width="150" :no-edit="getPrettyCashs" :list="prettyCashsList" listid="prettyCashsList" :value="item" id="workDate" rule="R0000"></yhm-form-td-date>
          <yhm-form-td-textbox width="100" :no-edit="getPrettyCashs" position="u" :list="prettyCashsList" listid="prettyCashsList" :value="item" id="money" rule="R0000"></yhm-form-td-textbox>
          <yhm-form-td-textbox width="280" :no-edit="getPrettyCashs" position="u" :list="prettyCashsList" listid="prettyCashsList" :value="item" id="subject" rule="R0000"></yhm-form-td-textbox>
          <yhm-form-td-date width="150" :no-edit="getPrettyCashs" :list="prettyCashsList" listid="prettyCashsList" :value="item" id="estimateDate" rule="R0000"></yhm-form-td-date>
          <yhm-form-td-textbox width="200" :no-edit="getPrettyCashs" position="u" :list="prettyCashsList" listid="prettyCashsList" :value="item" id="remark" rule="R0000"></yhm-form-td-textbox>
          <yhm-form-td-delete :no-click="getPrettyCashsShow" width="40" :list="prettyCashsList" :value="item" :del-click="true" @click="delPrettyCashs(index,item)"></yhm-form-td-delete>
        </tr>
      </template>
      <template #empty>
        <span class="m_listNoData" v-show="isPrettyCashsEmpty">暂时没有数据</span>
      </template>
    </yhm-form-list-edit>
    <div class="f_split"></div>
    <yhm-form-list-show>
      <template #title>事件信息</template>
      <template #operate>
        <yhm-commonbutton value="添加" icon="btnAdd" @call="addDetail()" category="three"></yhm-commonbutton>
      </template>
      <template #listHead>
        <yhm-managerth style="width: 38px" title="查看"></yhm-managerth>
        <yhm-managerth title="事由"></yhm-managerth>
        <yhm-managerth style="width: 120px" title="金额"></yhm-managerth>
        <yhm-managerth style="width: 120px" title="发票金额"></yhm-managerth>
        <yhm-managerth style="width: 90px" title="发票类型"></yhm-managerth>
        <yhm-managerth style="width: 180px;" title="备注"></yhm-managerth>
        <yhm-managerth style="width: 80px;" title="审批状态"></yhm-managerth>
        <yhm-managerth style="width: 38px;" title="删除"></yhm-managerth>
      </template>
      <template #listBody>
        <tr v-for="(item,index) in detail" :class="[{InterlacBg:index%2!=0}]" :key="item.id">
          <yhm-manager-td-look @click="listView(item.id)"></yhm-manager-td-look>
          <yhm-manager-td :value="item.subject"></yhm-manager-td>
          <yhm-manager-td-money :value="item.actualMoney"></yhm-manager-td-money>
          <yhm-manager-td-money :value="item.invoiceMoney"></yhm-manager-td-money>
          <yhm-manager-td-center @click="listView(item.id)" color="#49a9ea" :value="item.invoiceCategoryName"></yhm-manager-td-center>
          <yhm-manager-td :value="item.remark"></yhm-manager-td>
          <yhm-manager-td :value="item.stateVal"></yhm-manager-td>
          <yhm-manager-td-operate>
            <yhm-manager-td-operate-delete @click="delFromList(item.id)"></yhm-manager-td-operate-delete>
          </yhm-manager-td-operate>
        </tr>
      </template>
      <template #empty>
        <span class="m_listNoData" v-show="detail.length === 0">暂时没有数据</span>
      </template>
      <template #customize>
        <div class="tbBtmInfo reimBtm">
          <p>
            <span>申请金额：</span>
            <span v-html="tenThousandFormatShow(money)"></span>
          </p>
          <p>
            <span>实际金额：</span>
            <span v-html="tenThousandFormatShow(actualMoney)"></span>
          </p>
          <p>
          </p>
        </div>
      </template>
    </yhm-form-list-show>

    <yhm-formoperate :createName="createName" v-show="btmShow" :insertDate="insertDate" :updateName="updateName" :updateDate="updateDate">
      <template #btn>
        <yhm-commonbutton value="提交申请" icon="btnSave" :flicker="true" @call="add()"></yhm-commonbutton>
        <yhm-commonbutton value="暂不提交" icon="i-noSub" @call="noSub()"></yhm-commonbutton>
      </template>
    </yhm-formoperate>
  </div>

</template>

<script>
  import { accMul, accAdd, guid, formatDate,formatTime } from '@/assets/common.js'
  import { formmixin } from '@/assets/form.js'
  export default {
    name: 'paymentForm',
    mixins: [formmixin],
    data () {
      return {
        content: {},
        bcc: 0,
        detail: [], // 列表数据
        detailID: '',
        empty: true,
        btmShow: true,
        list: {},
        category: '',
        name: '',
        workDate: '',
        code: '',
        isPrettyCashOffList: [],    //备用金是否核销
        isPrettyCashOff: '',
        getIsPrettyCashOff:false,
        relevanceID:'',
        relevanceType:'',
        unitID:'',
        personID:'',

        money: '0',
        actualMoney: '0',
        approvalMoney: '0',

        prettyCashMoney: '',   //备用金当前余额
        isPrettyMoneyCash: false,
        selectPrettyCashsShow:true,
        prettyCashsList:[],
        isPrettyCashsEmpty:true,
        getPrettyCashsShow:false,
        getPrettyCashs:'1',
        isGetPrettyCash: false
      }
    },
    methods: {
      /* 暂不提交 */
      noSub(){
        this.$dialog.close()
      },

      /* 备用金是否核销验证 */
      initPrettyCash(){
        this.ajaxJson({
          url: '/PersonOffice/getPrettyCashMoney',
          call: (data)=>{
            if(data.type === 0){
              this.isGetPrettyCash = true
            }else{
              this.isGetPrettyCash = false
            }
          }
        })
      },
      Save(p){
        let a=true
        if(this.isPrettyCashOff==='1'){
          if(this.prettyCashsList.length===0){
            a=false
          }
        }
        if(!a){
          this.$dialog.alert({
            tipValue:'请选择备用金信息',
            alertImg: 'error'
          })
        }
        if(a){
          let params = {
            id:this.id,
            personID:this.personID,
            name:this.name,
            workDate:this.workDate,
            code:this.code,
            isPrettyCashOff:this.isPrettyCashOff,
            prettyCashsList:this.prettyCashsList,
            prettyCashMoney:this.prettyCashMoney,
          }
          this.ajaxJson({
            url: '/PersonOffice/reimbursementsSave',
            data: params,
            call: (data) => {
              this.ajaxJson({
                url: '/PersonOffice/reimbursementsForm',
                data: p,
                call: (data) => {
                  this.detail = data.list
                  this.money = data.money
                  this.actualMoney = data.actualMoney
                  this.approvalMoney = data.approvalMoney
                  this.btmShow = this.detail.length !== 0
                  this.empty = this.detail.length === 0
                }
              })
            }
          })
        }
      },
      //删除备用金信息
      delPrettyCashs(index,item){
        this.$dialog.alert({
          tipValue: '删除成功！！！',
          closeCallBack: ()=>{
            this.prettyCashsList.splice(index, 1)
            if(this.prettyCashsList.length === 0){
              this.selectPrettyCashsShow=true
              this.isPrettyCashsEmpty=true

            }
          }
        })
      },
      selectIsPrettyCashOff(){
        if(this.isPrettyCashOff==='0'){
          this.isPrettyMoneyCash=false
          this.prettyCashsList=[]
        }else{
          this.isPrettyMoneyCash=true
          if(this.prettyCashsList.length===0){
            this.selectPrettyCashs()
          }
        }
      },
      prettyCashsView(item){
        let url='/prettyCashsView?id='+item.prettyCashsID
        this.$dialog.OpenWindow({
          width: '1050',
          height: '590',
          title: '查看备用金信息',
          url:url,
          closeCallBack: (data)=>{
            if(data){
              this.initPageData(false)
            }
          }
        })
      },
      selectPrettyCashs(){
        this.$dialog.OpenWindow({
          width: 950,
          height: 603,
          url: '/selectPrettyCashs',
          title: '选择备用金',
          closeCallBack: (data) => {
            if (data) {
              let insertDate = new Date(accAdd(new Date().getTime(), accMul(this.prettyCashsList.length, 1000)))
              this.prettyCashsList.push({
                id: guid(),
                insertDate: formatTime(insertDate),
                ownerID:this.id,
                prettyCashsID:data.id,
                workDate: data.workDate,
                money:data.money,
                subject:data.subject,
                estimateDate:data.estimateDate,
                remark:data.remark,
              })
              this.prettyCashMoney=data.money
              this.isPrettyCashsEmpty=false
              this.selectPrettyCashsShow=false
            }
          }
        })
      },
      addDetail () {
        this.$dialog.OpenWindow({
          width: 1050,
          height: 840,
          url: '/reimbursementDetailForm?ownerID='+this.id + '&relevanceID=' +this.relevanceID +'&relevanceType=' +this.relevanceType +'&parentCode=' +this.code + '&parentWorkDate=' +this.workDate+'&isPrettyCashOff='+this.isPrettyCashOff ,
          title: '添加报销明细',
          closeCallBack: (data) => {
            this.$dialog.setReturnValue(this.id)
            let params = {
              id: data
            }
            if (data) {
              this.Save(params)

            }
          }
        })
      },
      delFromList (id) { // 删除id
        this.$dialog.confirm({
          width: 300,
          tipValue: '确定删除本条数据?',
          btnValueOk: '确定',
          alertImg: 'warn',
          okCallBack: (data) => {

            this.ajaxJson({
              url: '/PersonOffice/reimbursementsDetailDel ',
              data: {
                id: id
              },
              call: (data) => {
                if (data.type === 0) {
                  let val = data.val
                  this.$dialog.alert({
                    tipValue: data.message,
                    closeCallBack:(data) =>{
                      this.$dialog.setReturnValue("删除成功")
                      if (val === '0'){
                        this.$dialog.close();
                      }else{
                        this.initData()
                      }
                    }
                  })
                } else if (data.type === 1) {
                  this.$dialog.alert({
                    alertImg: 'warn',
                    tipValue: data.message
                  })
                }
              }
            })
          }
        })
      },
      listView (id) {
        if (id) {
          this.$dialog.OpenWindow({
            width: 1050,
            height: 840,
            url: '/reimbursementDetailForm?id=' + id+'&ID='+this.id + '&edit='+this.btmShow,
            title: '查看报销明细',
            closeCallBack: (data) => {
              this.$dialog.setReturnValue(this.id)
              let params = {
                id: data
              }
              if (data) {
                this.ajaxJson({
                  url: '/PersonOffice/reimbursementsForm',
                  data: params,
                  call: (data) => {
                    this.detail = data.list
                    this.actualMoney = data.actualMoney
                  }
                })
              }
            }
          })
        }
      },

      add () {
        let params = {
          id: this.id,
          tableName:40
        }
        // this.$dialog.confirm({
        //   width: 300,
        //   tipValue: '确定提交申请?',
        //   btnValueOk: '确定',
        //   alert: 'warn',
        //   okCallBack: (data) => {
            this.ajaxJson({
              url: '/PersonOffice/getSubmitCatrgoryVue',
              data: params,
              call: (data) => {
                this.category = data.message
                if (this.category) {
                  let params = {
                    id: this.id,
                    category: this.category,
                    tableName: 40,
                    isDetail: 1,
                    tableDetailName: 41
                  }
                  this.ajaxJson({
                    url: '/PersonOffice/approvalSubmitVue',
                    data: params,
                    call: (data) => {
                      if (data.type === 0) {
                        this.$dialog.alert({
                          tipValue: data.message,
                          closeCallBack: () => {
                            this.$dialog.setReturnValue(this.id)
                            this.$dialog.close()
                            this.initData()
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
                }else{
                  this.$dialog.alert({
                    tipValue: '没有获取到提交数据!',
                    alertImg: 'error'
                  })
                }
              }
            })
          // }
        // })
      },

      reimbursementsDetailIsAutoAdd(){
        let params = {
          relevanceID: this.relevanceID,
          relevanceType: this.relevanceType
        }
        let relevanceType=this.relevanceType
        let workDate = this.workDate
        let code = this.code
        let id = this.id
        let personID = this.personID
        let unitID = this.unitID

        this.ajaxJson({
          url: '/PersonOffice/reimbursementsDetailIsAutoAdd',
          data: params,
          call: (data)=>{
            if(data.type === 0){
              this.$dialog.OpenWindow({
                width: 1050,
                height: 690,
                url: '/reimbursementDetailForm?ownerID=' + id + '&relevanceID=' + data.id + '&relevanceType=' + relevanceType+'&parentWorkDate='+workDate+'&parentCode='+code+'&personID='+personID+'&unitID='+unitID,
                title: '查看报销明细',
                closeCallBack : (data)=>{
                  this.$dialog.setReturnValue(this.id)
                  if(data!='__Close'){
                    this.reimbursementsDetailIsAutoAdd()
                  }else{

                    let params = {
                      id:id,
                    }

                    this.ajaxJson({
                      url:'/PersonOffice/reimbursementsDetailNumber',
                      data:params,
                      call: (data)=>{
                        if(data.type === 0){
                          let param={
                            id:id,
                          }
                          this.init({
                            url: '/PersonOffice/reimbursementsForm',
                            data:param,
                            all: (data) => {
                              /* 公共 无论查看和添加返回数据 */
                              this.content = data
                              this.name = this.content.name
                              this.workDate = this.content.workDate
                              this.code = this.content.code
                              this.relevanceID = this.content.relevanceID
                              this.relevanceType = this.content.relevanceType
                              this.unitID = this.content.unitID
                              this.personID = this.content.personID

                              this.money = this.content.money
                              this.actualMoney = this.content.actualMoney
                              this.approvalMoney = this.content.approvalMoney

                              this.detail = data.list

                              if(this.content.state != '0'){
                                this.btmShow = false
                              }

                              if(this.detail.length > 0){
                                this.btmShow = true
                              }
                            },
                            add: (data) => {
                              /* 需要添加的数据 */
                            },
                            look: (data) => {
                              /* 需要查看的数据 */
                              this.detail = data.list
                              this.empty = this.detail.length === 0
                            }
                          })
                          this.$dialog.setReturnValue(this.id)
                        }else if (data.type === 1){
                          this.$dialog.close()
                        }
                      }
                    })
                  }
                }
              })
            } else{
              // this.$dialog.alert({
              //   alertImg: 'error',
              //   tipValue: data.message
              // })
              this.setQuery2Value('relevanceType')
              let param = {}
              if(this.relevanceType==3){
                param={
                }
              }else{
                param={
                  id:id,
                }
              }

              this.init({
                url: '/PersonOffice/reimbursementsForm',
                data:param,
                all: (data) => {
                  /* 公共 无论查看和添加返回数据 */
                  this.content = data
                  this.name = this.content.name
                  this.workDate = this.content.workDate
                  this.code = this.content.code
                  this.relevanceID = this.content.relevanceID
                  this.relevanceType = this.content.relevanceType
                  this.unitID = this.content.unitID
                  this.personID = this.content.personID

                  this.money = this.content.money
                  this.actualMoney = this.content.actualMoney
                  this.approvalMoney = this.content.approvalMoney

                  this.detail = data.list

                  if(this.content.state != '0'){
                    this.btmShow = false
                  }

                  this.btmShow = this.detail.length === 0
                  this.empty = this.detail.length === 0

                  if(data.list && data.list.length > 0 ){
                    this.empty = false
                  }
                },
                add: (data) => {
                  /* 需要添加的数据 */
                },
                look: (data) => {
                  /* 需要查看的数据 */
                  this.detail = data.list
                  this.empty = this.detail.length === 0
                }
              })
            }
          }
        })
      },
      initData(){
        this.init({
          url: '/PersonOffice/reimbursementsForm',
          all: (data) => {
            /* 公共 无论查看和添加返回数据 */
            this.content = data
            this.name = this.content.name
            this.workDate = this.content.workDate
            this.code = this.content.code
            this.relevanceID = this.content.relevanceID
            this.relevanceType = this.content.relevanceType
            this.unitID = this.content.unitID
            this.personID = this.content.personID
            this.prettyCashMoney =data.prettyCashMoney
            this.money = this.content.money
            this.actualMoney = this.content.actualMoney
            this.approvalMoney = this.content.approvalMoney
            this.isPrettyCashOffList = data.isPrettyCashOffPsd.list
            this.isPrettyCashOff = data.isPrettyCashOffPsd.value

            if(this.content.state != '0'){
              this.btmShow = false
            }
            this.detail = data.list
            this.empty = data.list.length === 0

            this.setQuery2Value('relevanceID')
            this.setQuery2Value('relevanceType')
            if(this.relevanceID){
              this.reimbursementsDetailIsAutoAdd()
            }
            if(data.isPrettyCashOff==='1'){
              this.prettyCashsList=data.prettyCashsList
              this.isPrettyMoneyCash=true
              if(this.prettyCashsList.length>0){
                this.isPrettyCashsEmpty=false
              }
              this.btmShow = true
              this.getIsPrettyCashOff = true
              this.selectPrettyCashsShow = false
              this.getPrettyCashsShow = true
            }


          },
          add: (data) => {
          },
          look: (data) => {

          }
        })
      }
    },
    created () {
      this.initPrettyCash()
      this.initData()

    },
    watch:{
      detail(){
        if(this.detail.length === 0){
          this.btmShow = false
          this.getIsPrettyCashOff = false
          this.selectPrettyCashsShow = true
          this.getPrettyCashsShow = false
        }else{
          this.btmShow = true
          this.getIsPrettyCashOff = true
          this.selectPrettyCashsShow = false
          this.getPrettyCashsShow = true
        }
      }
    }
  }
</script>

<style scoped>
  .icon-search:before{
    color: #49a9ea;
  }
</style>
