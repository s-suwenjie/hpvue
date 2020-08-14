<template>
  <div class="f_main">
    <yhm-formbody>
      <template #title>基本信息</template>
      <template #control>
        <yhm-form-radio title="商品类型" :no-edit="true" :select-list="categoryList" @call="motorcycleTypeRadio" :value="category" id="category"></yhm-form-radio>
        <yhm-form-text title="出库编号" no-edit="1" :value="code" id="code"></yhm-form-text>
        <yhm-form-radio title="适用车型" width="1" @call="motorcycleTypeRadio" :select-list="applicableModelsList" :value="applicableModels" id="applicableModels" :no-edit="true"></yhm-form-radio>
        <yhm-form-date title="出库日期" :min="minWorkDate" :value="workDate" id="workDate" rule="R0000"></yhm-form-date>
<!--        <yhm-form-select title="出库人员" @click="selectWareHouser" @clear="clearWareHouser()" :value="wareHouser" id="wareHouser" rule="R0000"></yhm-form-select>-->
        <yhm-form-text title="出库人员" no-edit="1" :value="wareHouser" id="wareHouser"></yhm-form-text>
      </template>
    </yhm-formbody>
    <yhm-form-list-show style="margin-top: 20px;">
      <template #title>出库详情</template>
      <template #operate>
        <yhm-commonbutton value="添加" icon="btnAdd" @call="addDetail()" category="three"></yhm-commonbutton>
      </template>
      <template #listHead>
        <yhm-managerth style="width: 38px" title="查看"></yhm-managerth>
        <yhm-managerth title="商品名称"></yhm-managerth>
        <yhm-managerth style="width: 120px" title="规格型号"></yhm-managerth>
        <yhm-managerth style="width: 120px" title="数量"></yhm-managerth>
        <yhm-managerth style="width: 180px;" title="单价"></yhm-managerth>
        <yhm-managerth style="width: 120px;" title="总价"></yhm-managerth>
      </template>
      <template #listBody>
        <tr v-for="(item,index) in list" :class="[{InterlacBg:index%2!=0}]" :key="item.id">
          <yhm-manager-td-look @click="listView(item,index)"></yhm-manager-td-look>
          <yhm-manager-td :value="item.product"></yhm-manager-td>
          <yhm-manager-td :value="item.model"></yhm-manager-td>
          <yhm-manager-td-center :value="item.quantity+''"></yhm-manager-td-center>
          <yhm-manager-td-money :value="item.price+''"></yhm-manager-td-money>
          <yhm-manager-td-money :value="item.totalPrice+''"></yhm-manager-td-money>
        </tr>
      </template>
      <template #empty>
        <span class="m_listNoData" v-show="empty">暂时没有数据</span>
      </template>

    </yhm-form-list-show>
    <yhm-formoperate :createName="createName" :insertDate="insertDate" :updateName="updateName" :updateDate="updateDate">
      <template #btn>
        <yhm-commonbutton value="保存" icon="btnSave" :flicker="true" @call="save()"></yhm-commonbutton>
<!--        <yhm-commonbutton value="提交申请" icon="btnSave" @call="printFund(idm,state)" v-show="!empty"></yhm-commonbutton>-->
      </template>
    </yhm-formoperate>
  </div>
</template>

<script>
  import { accMul, accAdd, guid, formatDate,formatTime } from '@/assets/common.js'
  import { formmixin } from '@/assets/form.js'
  export default {
    name: "stockOutForm",
    mixins: [formmixin],
    data() {
      return {
        quantity: '10',//数量
        price: '123',//单价
        category: '',
        categoryList:[],
        applicableModels: '',
        applicableModelsList: [],
        minWorkDate: '',
        workDate: '',            //出库日期
        wareHouserId: '',        //出库人ID
        wareHouser: '',          //出库人员
        code: 'RK200529JP003A',  //出库编号
        state: '',
        detail: [], // 列表数据
        detailsShow: false,//出库详情显示隐藏
        detailList:'',//出库详情列表
        empty: true,
        categoryNoEdit: false,
        id:'',
        ownerID:'',
        personID:'',
        list:'',
        idm:'',
        createName:'',
        insertDate:'',
        updateName:'',
        updateDate:'',
      }
    },
    created() {
      this.setQuery2Value('type')
      this.setQuery2Value('id')
      let data = new Date()
      this.workDate = formatDate(new Date((new Date()).getTime()))
      this.minWorkDate = this.workDate
      this.init()
      this.number()
    },
    methods: {
      //---提交出库申请---
      printFund(idm,state){
        let tipValue = ''
        if(state=='1'){
          tipValue = '是否提交申请?'
        }else{
          tipValue = '是否出库?'
        }
        let params = {
          id:idm,
          state:2,
        }
        this.$dialog.confirm({
          width: 300,
          tipValue: tipValue,
          alertImg: 'warn',
          okCallBack: (data)=>{
            this.ajaxJson({
              url: '/stock/stockout/updateToStockout',
              data: params,
              call: (data) => {
                if (data.type === 0) {
                  this.$dialog.setReturnValue(this.id)
                  this.$dialog.alert({
                    alertImg: 'ok',
                    tipValue: data.message,
                    closeCallBack: () => {
                      this.$dialog.close()
                    }
                  })
                } else {
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
      //查看--------------
      listView(item,index){
        this.$dialog.OpenWindow({
          width: 1050,
          height: 610,
          url: '/stockOutDetailsForm?id=' + item.id+'&category='+this.category+'&applicableModels='+this.applicableModels+'&ownerid='+'&productID='+item.productid+'&modelID='+item.modelid,//+'$more='+this.id
          title: '修改出库详情',
          closeCallBack: (data)=>{
            if(data){
              this.searchStr = data

              if(this.list==null||this.list==''){
                this.list = []
              }
              let list = this.list[index]
              list.id = data.params.id,
              list.ownerid = data.params.ownerid,//入库单ID
              list.product = data.params.product,//商品名称
              list.productid = data.params.productid,//商品ID
              list.model = data.params.model,//型号
              list.modelid = data.params.modelid,//型号ID
              list.quantity = data.params.quantity,
              list.price = data.params.price,
              list.totalPrice = data.params.totalPrice

              if( this.list.length != 0 ){
                this.empty=false
              }else{
                this.empty=true
              }
              // let fromid=this.id
              // this.initPage(fromid)
            }
          }
        })

      },
      //-------初始化部分
      init(){
        this.idm=this.id
        this.ajaxJson({
          url: '/stock/stockout/initForm',
          data:{
            id:this.id,
          },
          call: (data) => {
            this.categoryList=data.categoryPsd.list
            this.category=data.categoryPsd.value
            this.applicableModelsList=data.applicableModelsPsd.list
            this.applicableModels=data.applicableModelsPsd.value
            this.wareHouser = data.wareHouser//出库人员在这里----------------------------------
            this.wareHouserId =data.wareHouserId
            if(data.list){
              this.empty=false
              this.list=data.list
            }else{
              this.empty=true
            }
            this.updateName=data.updateName
            this.createName=data.createNameStr
            if(data.insertDate){
              this.insertDate=data.insertDate
              this.updateDate=data.updateDate
            }else{
              this.insertDate='当前时间'
              this.updateDate='当前时间'
            }
          }
        })
      },
      clearWareHouser(){},
      motorcycleTypeRadio(){
        this.number()
      },
      //-------选择出库人员---------
      selectWareHouser() {
        this.$dialog.OpenWindow({
          width: 950,
          height: 692,
          url: "/selectPerson?category="+this.category+"&categoryBefore=1",
          title: "选择出库人员",
          closeCallBack: (data) => {
            this.wareHouser = data.name
            this.wareHouserId = data.id
          }
        })
      },
      //添加出库详情--------------------
      addDetail() {
        this.$dialog.OpenWindow({
          width: 1050,
          height: 610,
          url: '/stockOutDetailsForm?id=' + this.id+'&category='+this.category+'&applicableModels='+this.applicableModels+'&ownerid='+this.id,
          title: '添加出库详情',
          closeCallBack: (data)=>{
            if(data){
              this.searchStr = data
              // let fromid=this.id
              // this.initPage(fromid)
              if(this.list==null||this.list==''){
                this.list = []
              }
              this.list.push({
                id:data.params.id,
                ownerid:data.params.ownerid,//入库单ID
                product:data.params.product,//商品名称
                productid:data.params.productid,//商品ID
                model:data.params.model,//型号
                modelid:data.params.modelid,//型号ID
                quantity:data.params.quantity,
                price:data.params.price,
                totalPrice:data.params.totalPrice,
              })

              if( this.list.length != 0 ){
                this.empty=false
              }else{
                this.empty=true
              }
            }
          }
        })
      },
      //----保存----------------
      save() {
        let a = this.validator()
        if (a) {
          let params = {
            id:this.id,//id
            wareHouserId: this.wareHouserId,
            category: this.category,
            workDate: this.workDate,
            code: this.code,
            applicableModels: this.applicableModels,
            list:this.list,
          }
          this.idm=params.id
          this.id = params.id
          this.ajaxJson({
            url: '/stock/stockout/saveStockout',
            data: params,
            call: (data) => {
              if (data.type === 0) {
                this.detailsShow = true
                this.state = 0
                this.$dialog.setReturnValue(this.id)
                this.$dialog.alert({
                  tipValue: data.message,
                  closeCallBack: () => {
                    this.$dialog.close()
                  }
                })
              } else {
                this.$dialog.alert({
                  alertImg: 'warn',
                  tipValue: data.message
                })
              }
            }
          })
        }
      },
      //console
      //  ---------初始化部分-----------
      initPage (fromid) {
        let parmas={
          id:fromid,
        }
        this.empty=true
        this.ajaxJson({
          url:'/stock/stockout/initForm',
          data:parmas,
          call: (data) => {
            this.list = data.list
            if(data.list != ''){
              this.empty=false
            }
          }
        })
      },
      //---code编号部分---
      number(){
        let  params = {
          category:this.category,
          applicableModels:this.applicableModels,
          workDate:this.workDate
        }
        this.ajaxJson({
          url:'/stock/stockout/initFormCode',
          data:params,
          call: (data) => {
            this.code=data.message
          }
        })
      }
    },
  }
</script>

<style scoped>

</style>
