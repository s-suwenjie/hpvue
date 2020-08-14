<template>
  <div class="f_main">
    <yhm-formbody>
      <template #title>基本信息</template>
      <template #control>
        <yhm-form-text title="项目金额" :value="price" id="price" no-edit="1"></yhm-form-text>
        <yhm-form-text title="配件金额" :value="amount" id="amount" no-edit="1"></yhm-form-text>
        <yhm-form-text title="合计金额" :value="totalMoney" id="totalMoney" no-edit="1"></yhm-form-text>
        <yhm-form-text title="待结金额" :value="pendingMoney" id="pendingMoney" no-edit="1"></yhm-form-text>
        <yhm-form-text title="成本" :value="cost" id="cost" no-edit="1"></yhm-form-text>
        <yhm-form-text title="盈利" :value="profit" id="profit" no-edit="1"></yhm-form-text>
        <yhm-form-text title="总收入" :value="revenue" id="revenue" no-edit="1"></yhm-form-text>
      </template>
    </yhm-formbody>

    <div class="f_split"></div>
    <yhm-form-list-show >
      <template #title>收入详情</template>
      <template #operate>
        <yhm-commonbutton value="添加流水明细" icon="btnAdd" :is-error="true" :flicker="true" @call="addIncome()" category="three"></yhm-commonbutton>
      </template>
      <template #listHead>
        <yhm-managerth title="我方账户"></yhm-managerth>
        <yhm-managerth width="110" title="交易日期"></yhm-managerth>
        <yhm-managerth title="对方账户"></yhm-managerth>
        <yhm-managerth width="40" title="收支"></yhm-managerth>
        <yhm-managerth width="110" title="事由"></yhm-managerth>
        <yhm-managerth width="105" title="交易金额"></yhm-managerth>
<!--        <yhm-managerth width="105" title="可核销金额"></yhm-managerth>-->
        <yhm-managerth width="245" title="备注"></yhm-managerth>
        <yhm-managerth width="40" title="删除"></yhm-managerth>
      </template>
      <template #listBody>
        <tr v-for="(item,index) in bankDetailList" :class="[{InterlacBg:index%2!=0}]" :key="item.id">
          <!--          <yhm-manager-td-look @click="listView(item)"></yhm-manager-td-look>-->
          <yhm-manager-td-html :tip="true" node-class-name="f_main" :value="item.selfAccount"></yhm-manager-td-html>
          <yhm-manager-td-date :value="item.cccurDate"></yhm-manager-td-date>
          <yhm-manager-td-html :value="item.otherName"></yhm-manager-td-html>
          <yhm-manager-td-center value="收入" color="#49a9ea" class="dfJcc"></yhm-manager-td-center>
          <yhm-manager-td-center :tip="true" node-class-name="f_main" :value="item.subject"></yhm-manager-td-center>
          <yhm-manager-td-money :value="item.money"></yhm-manager-td-money>
<!--          <yhm-manager-td-money :value="item.useMoney"></yhm-manager-td-money>-->
          <yhm-manager-td :tip="true" tip-type="r" node-class-name="f_main" :value="item.remark"></yhm-manager-td>
          <yhm-form-td-delete width="40" :list="bankDetailList" :value="item" :del-click="true" @click="delServe(index,item,'收入')"></yhm-form-td-delete>
        </tr>
      </template>
      <template #empty>
        <span class="m_listNoData" v-show="bankDetailList.length == 0">暂时没有数据</span>
      </template>
    </yhm-form-list-show>
<!--    <yhm-form-list-edit>-->
<!--      <template #title>工单流水详情</template>-->
<!--      <template #operate>-->
<!--        <yhm-commonbutton  value="添加工单流水详情" :flicker="true" icon="btnAdd" @call="addIncome"></yhm-commonbutton>-->
<!--      </template>-->
<!--      <template #listHead>-->
<!--        <yhm-managerth style="width: 50px" title="序号"></yhm-managerth>-->
<!--        <yhm-managerth  title="类型"></yhm-managerth>-->
<!--        <yhm-managerth style="width: 600px" title="项目名称"></yhm-managerth>-->
<!--        <yhm-managerth style="width: 40px" title="删除"></yhm-managerth>-->
<!--      </template>-->
<!--      <template #listBody>-->
<!--        <tr v-for="(item,index) in list" :key="index" :class="{InterlacBg:index%2!==0}">-->
<!--          <yhm-form-td-textbox width="45" style="text-align: center;" no-edit="1" id="num" :list="list" listid="list" :value="item"></yhm-form-td-textbox>-->
<!--          <yhm-form-td-radio width="265" id="type" @call="selectServe(item)" :list="list" listid="list" :value="item" :select-list="typeList"></yhm-form-td-radio>-->
<!--          <yhm-form-td-select-dialog width="600" @call="selectServe(item)" id="name" :list="list" listid="list" :value="item" rule="#"></yhm-form-td-select-dialog>-->
<!--          <yhm-form-td-delete width="40" :list="list" :value="item" :del-click="true" @click="delServe(index,item)"></yhm-form-td-delete>-->
<!--        </tr>-->
<!--      </template>-->
<!--      <template #empty>-->
<!--        <span class="m_listNoData" v-show="list.length === 0">暂时没有数据</span>-->
<!--      </template>-->
<!--    </yhm-form-list-edit>-->
    <div class="f_split"></div>
    <yhm-form-list-show>
      <template #title>项目支出详情</template>
      <template #operate>
        <yhm-commonbutton value="添加项目支出详情" icon="btnAdd" :is-error="true" :flicker="true" @call="addService()" category="three"></yhm-commonbutton>
      </template>
      <template #listHead>
        <yhm-managerth style="width: 38px" title="查看"></yhm-managerth>
        <yhm-managerth style="width: 120px;" title="项目名称"></yhm-managerth>
        <yhm-managerth title="发生日期"></yhm-managerth>
        <yhm-managerth style="width: 120px;" title="变化金额"></yhm-managerth>
        <yhm-managerth  title="备注"></yhm-managerth>
        <yhm-managerth width="40" title="删除"></yhm-managerth>
      </template>
      <template #listBody>
        <tr v-for="(item,index) in fixOrderDetail" :class="[{InterlacBg:index%2!=0}]" :key="item.id">
          <yhm-manager-td-look @click="listView(item,'项目支出')"></yhm-manager-td-look>
          <yhm-manager-td-center :value="item.name"></yhm-manager-td-center>
          <yhm-manager-td-center :value="item.workDate"></yhm-manager-td-center>
          <yhm-manager-td-money :value="item.money+''"></yhm-manager-td-money>
          <yhm-manager-td-center :value="item.remark"></yhm-manager-td-center>
          <yhm-form-td-delete width="40" :list="fixOrderDetail" :value="item" :del-click="true" @click="delServe(index,item,'项目支出')"></yhm-form-td-delete>
        </tr>
      </template>
      <template #empty>
        <span class="m_listNoData" v-show="fixOrderDetail.length == 0">暂时没有数据</span>
      </template>
    </yhm-form-list-show>
    <div class="f_split"></div>
    <yhm-form-list-show>
      <template #title>材料详情信息</template>
      <template #operate>
        <yhm-commonbutton value="添加材料支出详情" icon="btnAdd" :is-error="true" :flicker="true" @call="addMaterials()" category="three"></yhm-commonbutton>
      </template>
      <template #listHead>
        <yhm-managerth style="width: 38px" title="查看"></yhm-managerth>
        <yhm-managerth title="商品名称"></yhm-managerth>
        <yhm-managerth title="规格型号"></yhm-managerth>
        <yhm-managerth style="width: 120px" title="拆分数量"></yhm-managerth>
        <yhm-managerth style="width: 120px" title="整件数量"></yhm-managerth>
        <yhm-managerth style="width: 120px" title="单价"></yhm-managerth>
        <yhm-managerth width="40" title="删除"></yhm-managerth>
      </template>
      <template #listBody>
        <tr v-for="(item,index) in fixOrderMaterial" :class="[{InterlacBg:index%2!=0}]" :key="item.id">
          <yhm-manager-td-look @click="listView(item,'材料支出')"></yhm-manager-td-look>
          <yhm-manager-td-center :value="item.product"></yhm-manager-td-center>
          <yhm-manager-td-center :value="item.model"></yhm-manager-td-center>
          <yhm-manager-td-center :value="item.mdo"></yhm-manager-td-center>
          <yhm-manager-td-center :value="item.quantity+''"></yhm-manager-td-center>
          <yhm-manager-td-money :value="item.price"></yhm-manager-td-money>
          <yhm-form-td-delete width="40" :list="fixOrderMaterial" :value="item" :del-click="true" @click="delServe(index,item,'材料支出')"></yhm-form-td-delete>
        </tr>
      </template>
      <template #empty>
        <span class="m_listNoData" v-show="fixOrderMaterial.length == 0">暂时没有数据</span>
      </template>
    </yhm-form-list-show>
    <yhm-formoperate :createName="createName" :insertDate="insertDate" :updateName="updateName" :updateDate="updateDate">
      <template #btn>
<!--        <yhm-commonbutton value="保存" icon="btnSave" :flicker="true" @call="save()"></yhm-commonbutton>-->
      </template>
    </yhm-formoperate>
  </div>
</template>

<script>
  import { accMul, accAdd, guid, formatDate, formatTime } from '@/assets/common.js'
  import { formmixin } from '@/assets/form.js'
  export default {
    name: 'workOrderSummarizingForm',
    mixins: [formmixin],
    data(){
      return{
        id:'',//工单流水主表id
        deleteList:[],//要删除的数据
        bankDetailList:[],//收入详情
        fixOrderDetail:[],//工单详情信息
        fixOrderMaterial:[],//材料详情信息
        cost:'0',//成本
        profit:'0',//盈利
        revenue:'0',//总收入
        price:'',//项目金额
        amount:'',//配件金额
        totalMoney:'',//合计金额
        pendingMoney:'',//代结金额
        // type:'0',//类型
        typeList:[//类型
          {
            img:'',
            num:'0',
            code:'',
            showName:'收入',
          },
          {
            img:'',
            num:'1',
            code:'',
            showName:'项目支出',
          },
          {
            img:'',
            num:'2',
            code:'',
            showName:'材料支出',
          },
        ],
      }
    },
    methods:{
      calculationAmount(){//计算金额
        this.ajaxJson({
          url: '/fix/summary/check',
          loading:'0',
          data: {
            id:this.id
          },
          call: (data) => {
            if(data){
              for(let i in data.list){
                if(data.list[i].type=='0'){
                  this.bankDetailList = []
                  this.bankDetailList.push({
                    id: data.list[i].id,
                    type:'0',
                    insertDate: data.list[i].cccurDate,
                    num:this.bankDetailList.length+1+'',
                    selfAccount:data.list[i].bankName + data.list[i].account,
                    cccurDate:data.list[i].cccurDate,//交易日期
                    otherName:data.list[i].otherName,//对方账户
                    subject:data.list[i].subject,
                    money:data.list[i].actualMoney,
                    // useMoney:datas.useMoney,
                    remark:data.list[i].remark,
                    dependid:data.list[i].dependid,
                  })
                }
              }
              this.id = data.id
              this.fixOrderDetail = data.reslist1//工单详情信息
              this.fixOrderMaterial = data.reslist2//材料详情信息
            }

          }
        })
      },
      delServe(index,item,type){
        if(type=='收入'){//收入详情表的删除
          this.bankDetailList.splice(index,1)
        }else if(type=='项目支出'){//工单详情表的删除
          this.fixOrderDetail.splice(index,1)
        }else if(type=='材料支出'){//材料表的删除
          this.fixOrderMaterial.splice(index,1)
          console.log('删除成功',this.fixOrderMaterial)
        }
        item.isDel = '1'
        this.deleteList.push(item)
        this.ajaxJson({
          url: '/fix/summarydetail/save',
          data: item,
          call: (data) => {
            if(data.type=='0'){
              this.calculationAmount()
            }
          }
        })
        console.log(this.deleteList)

      },
      // selectServe(item){//跳到选择页面
      //   console.log(item)
      //   if(item.type=='0'){
      //     this.$dialog.OpenWindow({
      //         width: '1050',
      //         height: '700',
      //         url:'/selectBankDetail?direction=0&categoryBefore=1&selectType=0&type=1&otherID='+this.contactPersonID,
      //         title:'绑定流水',
      //         closeCallBack:(data) =>{
      //           item.name = data.name
      //
      //           console.log( 'data' , data )
      //         }
      //     })
      //   }else if(item.type=='1'){
      //     this.$dialog.OpenWindow({
      //       width: '1050',
      //       height: '700',
      //       url:'/selectProcessServices?ownerID='+this.ownerID+'&selectType=0',
      //       title:'工单详情',
      //       closeCallBack:(data) =>{
      //         console.log( 'data' , data )
      //
      //       }
      //     })
      //   }else if(item.type=='2'){
      //     this.$dialog.OpenWindow({
      //       width: '1050',
      //       height: '700',
      //       url:'/selectMaterials?ownerID='+this.ownerID,
      //       title:'工单材料',
      //       closeCallBack:(data) =>{
      //         console.log( 'data' , data )
      //       }
      //     })
      //   }
      //
      // },
      // addDetails(){//添加工单流水详情
      //   let insertDate = new Date(accAdd(new Date().getTime(), accMul(this.list.length, 1000)))
      //   let num = accAdd(this.list.length,1) + ''
      //   this.list.push({
      //     id: this.id,
      //     insertDate: formatTime(insertDate),
      //     num:this.list.length+1+'',
      //     name:'',
      //     type:'0',
      //     dependid:'',
      //   })
      // },
      listView(item,type){//查看
        if(type=='项目支出'){
          this.$dialog.OpenWindow({
            width: '1050',
            height: '700',
            url:'/workOrderAddDetailsForm?id='+item.dependid,
            title:'编辑工单详情',
            closeCallBack:(data) =>{
              if(data){
                this.calculationAmount()
              }
            }
          })
        }else if(type=='材料支出'){
          this.$dialog.OpenWindow({
            width: '1050',
            height: '700',
            url:'/workOrderMateriaListForm?ownerID='+this.materialsID+'&id='+item.dependid,
            title:'编辑材料详情',
            closeCallBack:(data) =>{
              if(data){
                this.calculationAmount()
              }
            }
          })
        }
        this.initData()
      },
      addIncome(){//添加收入详情
        this.$dialog.OpenWindow({
          width: '1050',
          height: '700',
          url:'/selectBankDetail?direction=0&categoryBefore=1&selectType=1&type=1&otherID='+this.contactPersonID,
          title:'绑定流水',
          closeCallBack:(data) =>{
            if(data){
              let datas = data[0]
              let insertDate = new Date(accAdd(new Date().getTime(), accMul(this.bankDetailList.length, 1000)))
              let num = accAdd(this.bankDetailList.length,1) + ''
              this.bankDetailList.push({
                id: this.id,
                type:'0',
                insertDate: formatTime(insertDate),
                num:this.bankDetailList.length+1+'',
                selfAccount:datas.selfAccount,
                cccurDate:datas.cccurDate,
                otherName:datas.otherName,
                subject:datas.subject,
                money:datas.money,
                useMoney:datas.useMoney,
                remark:datas.remark,
                dependid:datas.id,
              })
              let params = {
                id:guid(),
                ownerID:this.id,//流水主表id
                type:'0',//收入
                dependid:datas.id,//选中数据的id
                account:datas.account,//银行卡尾号
                actualMoney: datas.useMoney,//交易金额
                bankName:datas.bankName,//银行卡名称
                cccurDate:datas.cccurDate,//交易日期
                remark:datas.remark,//备注
                subject:datas.subject,//交易事由
                otherID:datas.otherID,//对方账户
                otherName:datas.otherName,//对方姓名
              }
              console.log( 'params' , params )
              this.ajaxJson({
                url: '/fix/summarydetail/save',
                data: params,
                call: (data) => {
                  if(data.type=='0'){
                    this.calculationAmount()
                  }
                }
              })
              console.log( 'data' , data )
            }
          }
        })
      },
      addService(){//添加项目支出
        this.$dialog.OpenWindow({
          width: '1050',
          height: '700',
          url:'/selectProcessServices?selectType=0&ownerID='+this.ownerID+ '&id='+'&orderid='+this.orderid +'&flowPathID='+this.flowPathID,
          title:'服务列表',
          closeCallBack:(data) =>{
            if(data){
              console.log(data)
              let insertDate = new Date(accAdd(new Date().getTime(), accMul(this.fixOrderDetail.length, 1000)))
              let num = accAdd(this.fixOrderDetail.length,1) + ''
              this.fixOrderDetail.push({
                id: this.id,
                insertDate: formatTime(insertDate),
                num:this.fixOrderDetail.length+1+'',
                name:data.name,
                type:data.type,
                money:data.money,
                remark:data.remark,
                workDate:data.workDate,
                dependid:data.id,
              })
              let params = {
                id:guid(),
                ownerID:this.id,//流水主表id
                type:'1',//项目支出
                dependid:data.id,//选中数据的id
                account:'',//银行卡尾号
                actualMoney: data.money,//交易金额
                bankName:'',//银行卡名称
                cccurDate:'',//交易日期
                remark:'',//备注
                subject:'',//交易事由
                otherID:'',//对方账户
                otherName:'',//对方姓名
              }
              console.log( 'params' , params )
              this.ajaxJson({
                url: '/fix/summarydetail/save',
                data: params,
                call: (data) => {
                  if(data.type=='0'){
                    this.calculationAmount()
                  }
                }
              })
            }
            // this.initData()
          }
        })
      },
      addMaterials(){//添加材料详情信息
        this.$dialog.OpenWindow({
          width: '1050',
          height: '700',
          url:'/selectMaterials?selectType=0&ownerID='+this.ownerID,
          title:'工单材料',
          closeCallBack:(data) =>{
            if(data){
              console.log( data )
              let insertDate = new Date(accAdd(new Date().getTime(), accMul(this.fixOrderMaterial.length, 1000)))
              let num = accAdd(this.fixOrderMaterial.length,1) + ''
              // for(let i in data){
                this.fixOrderMaterial.push({
                  id: this.id,
                  type:'2',
                  insertDate: formatTime(insertDate),
                  num:this.fixOrderMaterial.length+1+'',
                  mdo:data.mdo,
                  quantity:data.quantity,
                  product:data.product,
                  price:data.price,
                  model:data.model,
                  dependid:data.id,
                })
              // }
              let actualMoney = 0
              // mdo//拆分数量
              // quantity//证件数量
              // price//单价
              if(data.mdo==''||data.mdo==0){
                actualMoney = (Number(data.quantity)*Number(data.price)).toFixed(2)
              }else{
                actualMoney = (Number(data.mdo)*Number(data.price)).toFixed(2)
              }
              let params = {
                id:guid(),
                ownerID:this.id,//流水主表id
                type:'2',//材料支出
                dependid:data.id,//选中数据的id
                account:'',//银行卡尾号
                actualMoney: actualMoney,//交易金额
                bankName:'',//银行卡名称
                cccurDate:'',//交易日期
                remark:'',//备注
                subject:'',//交易事由
                otherID:'',//对方账户
                otherName:'',//对方姓名
              }
              console.log( 'params' , params )
              this.ajaxJson({
                url: '/fix/summarydetail/save',
                data: params,
                call: (data) => {
                  if(data.type=='0'){
                    this.calculationAmount()
                  }
                }
              })
            }
          }
        })
      },
      save(){
        // this.ajaxJson({
        //   url: '',
        //   data: {
        //
        //   },
        //   call: (data) => {
        //     if (data.type === 0) {
        //       this.$dialog.alert({
        //         tipValue: data.message,
        //         closeCallBack: () => {
        //           // this.$dialog.close()
        //         }
        //       })
        //     } else {
        //       this.$dialog.alert({
        //         alertImg: 'error',
        //         tipValue: data.message,
        //         closeCallBack: () => {
        //         }
        //       })
        //     }
        //   }
        // })

      },
      initData () {
        let params = {
          orderid:this.ownerID,//工单id
        }
        this.ajaxJson({
          url: '/fix/summary/initForm',
          data: params,
          call: (data) => {
            if(data){
              for(let i in data.list){
                if(data.list[i].type=='0'){
                  this.bankDetailList.push({
                    id: data.list[i].id,
                    type:'0',
                    insertDate: data.list[i].cccurDate,
                    num:this.bankDetailList.length+1+'',
                    selfAccount:data.list[i].bankName + data.list[i].account,
                    cccurDate:data.list[i].cccurDate,//交易日期
                    otherName:data.list[i].otherName,//对方账户
                    subject:data.list[i].subject,
                    money:data.list[i].actualMoney,
                    // useMoney:datas.useMoney,
                    remark:data.list[i].remark,
                    dependid:data.list[i].dependid,
                  })
                }
              }
              this.id = data.id
              this.fixOrderDetail = data.reslist1//工单详情信息
              this.fixOrderMaterial = data.reslist2//材料详情信息
            }
          }
        })
      }
    },
    created () {
      this.setQuery2Value('ownerID')//工单ID
      this.setQuery2Value('price')//项目金额
      this.setQuery2Value('amount')//配件金额
      this.setQuery2Value('totalMoney')//合计金额
      this.setQuery2Value('pendingMoney')//待结金额
      this.setQuery2Value('contactPersonID')//联系人ID
      this.setQuery2Value('materialsID')//工单材料表ID
      this.initData()
    }
  }
</script>

<style scoped>

</style>
