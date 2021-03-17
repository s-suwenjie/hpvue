<template>
  <div class="f_main">
    <yhm-formbody>
      <template #title>基本信息</template>
      <template #control>
        <yhm-form-radio title="商品类型" ref="stockOutFormRadio" :no-edit="list.length>0?true:false" rule="#" :select-list="categoryList" @call="motorcycleTypeRadio" :value="category" id="category"></yhm-form-radio>
        <yhm-form-text title="出库编号" no-edit="1" :value="code" id="code"></yhm-form-text>
        <yhm-form-radio title="适用车型" ref="stockOutFormRadio2" width="1" @call="motorcycleTypeRadio"  rule="#" :select-list="applicableModelsList" :value="applicableModels" id="applicableModels" :no-edit="list.length>0?true:false"></yhm-form-radio>
        <yhm-form-date title="出库日期" :min="minWorkDate" :value="workDate" id="workDate" rule="R0000"></yhm-form-date>
        <!--<yhm-form-select title="出库人员" @click="selectWareHouser" @clear="clearWareHouser()" :value="wareHouser" id="wareHouser" rule="R0000"></yhm-form-select>-->
        <yhm-form-text title="出库人员" no-edit="1" :value="wareHouser" id="wareHouser"></yhm-form-text>
      </template>
    </yhm-formbody>
<!--    v-show="state=='0'?true:false"-->
    <yhm-form-list-edit :key="keyIndex" style="margin-top: 20px;" >
      <template #title>出库详情</template>
      <template #operate>
        <yhm-commonbutton  value="添加" icon="btnAdd" @call="addProduct"></yhm-commonbutton>
      </template>
      <template #listHead>
        <yhm-managerth style="width: 36px" title="序号"></yhm-managerth>
        <yhm-managerth style="width: 190px" title="商品名称"></yhm-managerth>
        <yhm-managerth style="width: 190px" title="规格型号"></yhm-managerth>
        <yhm-managerth style="width: 60px" title="数量"></yhm-managerth>
        <yhm-managerth style="width: 50px" title="单位"></yhm-managerth>
        <yhm-managerth style="width: 65px" title="拆分数量"></yhm-managerth>
        <yhm-managerth style="width: 65px" title="拆分单位"></yhm-managerth>

<!--        <yhm-managerth style="width: 90px" title="不含税单价"></yhm-managerth>-->
<!--        <yhm-managerth style="width: 90px" title="不含税总价"></yhm-managerth>-->
        <yhm-managerth style="width: 130px" title="单价"></yhm-managerth>
        <yhm-managerth style="width: 130px" title="总价"></yhm-managerth>
        <yhm-managerth style="width: 40px" title="删除"></yhm-managerth>
      </template>
      <template #listBody>
        <tr v-for="(item,index) in list" :key="index" :class="{InterlacBg:index%2!==0}">
          <div style="display: flex;justify-content: center;text-align: center">{{Number(index)+1}}</div>
          <!--          <yhm-form-td-textbox width="36"  no-edit="1" id="num" :list="list" listid="list" :value="item"></yhm-form-td-textbox>-->
          <yhm-form-td-select-dialog width="190" tip="value" @call="selectProduct(item,index)" id="product" :list="list" listid="list" :value="item" rule="#"></yhm-form-td-select-dialog>
          <yhm-form-td-select-dialog width="190" tip="value" @call="selectModel(item,index)" id="model" :list="list" listid="list" :value="item" rule="#"></yhm-form-td-select-dialog>
          <yhm-form-td-textbox width="60" @blur="quantityBlur(item)" :no-edit="item.splitVal=='0'?'1':''" @input="toprice(item)" :list="list" listid="list" :value="item" id="quantity"></yhm-form-td-textbox>
          <yhm-form-td-textbox width="50" :no-edit="item.splitVal=='0'?'1':''" tip="value" id="uuStr" :list="list" listid="list" :value="item"></yhm-form-td-textbox>
          <yhm-form-td-textbox width="65" @blur="quantityBlur(item)" tip="value" :no-edit="item.noEdit" id="mdo" :list="list" listid="list" @input="toprice(item)" :value="item" rule="#"></yhm-form-td-textbox>
          <yhm-form-td-textbox width="65" tip="value" :no-edit="item.noEdit" id="mdoStr" :list="list" listid="list" :value="item"></yhm-form-td-textbox>
          <!--          <yhm-form-td-textbox width="90" no-edit="1" tip="money" before-icon="rmb" :list="list" listid="list" :value="item" id="price"></yhm-form-td-textbox>-->
          <!--          <yhm-form-td-textbox width="90" no-edit="1" tip="money" tip-left="-53" tip-arrow-left="70" before-icon="rmb" id="totalPrice"  :list="list" listid="list" :value="item"></yhm-form-td-textbox>-->
          <yhm-form-td-textbox width="130" @input="toprice(item)" tip="money" tip-arrow-left="170" tip-left="-153"  id="price" before-icon="rmb" :list="list" listid="list" :value="item"  ></yhm-form-td-textbox>
          <yhm-form-td-textbox width="130" no-edit="1" tip="money" tip-arrow-left="245" tip-left="-230"  id="totalPrice" before-icon="rmb" :list="list" listid="list" :value="item"  ></yhm-form-td-textbox>
          <yhm-form-td-delete width="40" :list="list" :value="item" :del-click="false" @click="delFromList(item.id,index)"></yhm-form-td-delete>
        </tr>
      </template>
      <template #empty>
        <span class="m_listNoData" v-show="list.length=='0'?true:false">暂无数据</span>
      </template>
    </yhm-form-list-edit>
<!--    <yhm-form-list-show style="margin-top: 20px;" >-->
<!--      <template #title>出库详情</template>-->
<!--      <template #operate>-->
<!--        <yhm-commonbutton value="添加"  icon="btnAdd" @call="addDetail()" category="three"></yhm-commonbutton>-->
<!--      </template>-->
<!--      <template #listHead>-->
<!--        <yhm-managerth style="width: 40px" title="查看" v-if="type!=0"></yhm-managerth>-->
<!--        <yhm-managerth title="商品名称"></yhm-managerth>-->
<!--        <yhm-managerth title="规格型号"></yhm-managerth>-->
<!--        <yhm-managerth style="width: 80px" title="数量"></yhm-managerth>-->
<!--        <yhm-managerth style="width: 120px;" title="单价"></yhm-managerth>-->
<!--        <yhm-managerth style="width: 120px;" title="总价"></yhm-managerth>-->
<!--      </template>-->
<!--      <template #listBody>-->
<!--        <tr v-for="(item,index) in list" :class="[{InterlacBg:index%2!=0}]" :key="item.id">-->
<!--          <yhm-manager-td-look @click="listView(item)" v-if="type!=0"></yhm-manager-td-look>-->
<!--          <yhm-manager-td :value="item.product"></yhm-manager-td>-->
<!--          <yhm-manager-td :value="item.model"></yhm-manager-td>-->
<!--          <yhm-manager-td-rgt :value="item.quantity+''"></yhm-manager-td-rgt>-->
<!--          <yhm-manager-td-money :value="item.price+''"></yhm-manager-td-money>-->
<!--          <yhm-manager-td-money :value="item.totalPrice+''"></yhm-manager-td-money>-->
<!--        </tr>-->
<!--      </template>-->
<!--      <template #empty>-->
<!--        <span class="m_listNoData" v-show="list.length=='0'?true:false">暂时没有数据</span>-->
<!--      </template>-->

<!--    </yhm-form-list-show>-->
    <yhm-formoperate :createName="createName" :insertDate="insertDate" :updateName="updateName" :updateDate="updateDate" >
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
        quantity: '',//数量
        price: '',//单价
        taxPrice:'13',//税率
        category: '',
        categoryList:[],
        applicableModels: '',
        applicableModelsList: [],
        minWorkDate: '',
        workDate: '',            //出库日期
        wareHouserId: '',        //出库人ID
        wareHouser: '',          //出库人员
        code: '',  //出库编号
        state: '',
        detail: [], // 列表数据
        detailsShow: false,//出库详情显示隐藏
        detailList:'',//出库详情列表
        categoryNoEdit: false,
        id: guid(),
        ownerID:'',
        personID:'',
        list:[],
        idm:'',
        keyIndex:0,
        createName:'',
        insertDate:'',
        updateName:'',
        updateDate:'',
      }
    },
    created() {
      this.setQuery2Value('type')
      this.setQuery2Value('idm')
      if(this.idm){
        this.id=this.idm
      }
      let data = new Date()
      this.workDate = formatDate(new Date((new Date()).getTime()))
      this.minWorkDate = this.workDate
      this.init()
    },
    methods: {
      //选择商品型号
      selectModel(item,index){
        if(item.product!=''){
          this.$dialog.OpenWindow({
            width: 950,
            height: 603,
            url: '/stockOutSelectProductView?productid='+item.productid+'&applicableModels='+this.applicableModels+'&category='+this.category,
            title: '选择商品规格型号信息',
            closeCallBack: (data) => {
              if (data) {
                item.splitVal = data.splitVal//是否拆分 0拆分 1不拆分
                item.model = data.model//规格型号
                item.modelid = data.modelID//规格型号id
                item.supplier = data.modelSupplier//供货商名称
                item.supplierId = data.modelSupplierID//供货商ID
                item.quantity = item.splitVal=='0'?'0':data.quantity//整件数量
                item.sumStr = data.sumStr//库存数量
                item.mdo = item.splitVal=='0'?data.quantity:'0'//拆分数量
                item.model = data.model//规格型号
                item.modelid = data.modelID//规格型号id
                item.numStr = data.numStr//最大数量
                item.mdoStr = item.splitVal=='0'?data.mdoStr:''//散件拆分单位
                item.noEdit = item.splitVal=='0'?'':'1'//散件拆分单位是否可以编辑
                item.uuStr = data.uuStr//单位
                item.price = data.price
                if(item.splitVal=='0'){
                  item.totalPrice = (Number(item.price)*Number(item.mdo)+'')//总价
                }else{
                  item.totalPrice = (Number(item.price)*Number(item.quantity)+'')//总价
                }

              }
            }
          })
        }else{
          this.$refs.pros.errorEvent("商品名称为空")
        }

      },
      addProduct(){//添加商品
        if(this.category==''||this.applicableModels==''){
          this.$dialog.alert({
            tipValue:'请先选择出库的商品类型和适用车型.',
            alertImg:'warn',
            width:'450',
            closeCallBack: ()=>{
              this.$refs.stockOutFormRadio.$emit('verify')//商品类型
              this.$refs.stockOutFormRadio2.$emit('verify')//适用车型
            }
          })
        }else{
          this.$dialog.OpenWindow({
            width: 1050,
            height: 603,
            url: '/stockOutSelectProductView?selectType=1'+'&applicableModels='+this.applicableModels+'&category='+this.category,
            title: '选择商品信息',
            closeCallBack: (data) => {
              if (data) {
                let item
                for(let i in data){
                  item = {}
                  if(Number(data[i].numStr)!=0){
                    item.id = guid()
                    item.ownerid = this.id//入库单id
                    item.num = this.list.length+1//序号
                    item.product = data[i].product//商品名称
                    item.productid = data[i].productID//商品id
                    item.splitVal = data[i].splitVal//是否拆分 0拆分 1不拆分
                    item.quantity = item.splitVal=='0'?'0':data[i].quantity//整件数量
                    item.sumStr = data[i].sumStr//库存数量
                    item.mdo = item.splitVal=='0'?data[i].quantity:'0'//拆分数量
                    item.model = data[i].model//规格型号
                    item.modelid = data[i].modelID//规格型号id
                    item.isDel = '0'//特殊字段
                    item.numStr = data[i].numStr//最大数量
                    item.mdoStr = item.splitVal=='0'?data[i].mdoStr:''//散件拆分单位
                    item.noEdit = item.splitVal=='0'?'':'1'//散件拆分单位是否可以编辑
                    item.uuStr = data[i].uuStr//单位
                    item.supplierId = ''//供货商id
                    item.show = '0'// 0拆分  1不拆分
                    item.price = data[i].price//单价

                    if(item.splitVal=='0'){
                      item.totalPrice = (Number(item.price)*Number(item.mdo)+'')//总价
                    }else{
                      item.totalPrice = (Number(item.price)*Number(item.quantity)+'')//总价
                    }
                    this.list.push(item)
                  }
                }
              }
            }
          })
        }
      },
      selectProduct(item,index){
        this.$dialog.OpenWindow({
          width: 1050,
          height: 603,
          url: '/stockOutSelectProductView?'+'&applicableModels='+this.applicableModels+'&category='+this.category,
          title: '选择商品信息',
          closeCallBack: (data) => {
            if (data) {
              let item = {}
              if(Number(data.numStr)!=0){
                item.id = guid()
                item.ownerid = this.id//入库单id
                item.num = this.list.length+1//序号
                item.product = data.product//商品名称
                item.productid = data.productID//商品id
                item.splitVal = data.splitVal//是否拆分 0拆分 1不拆分
                item.quantity = item.splitVal=='0'?'0':data.quantity//整件数量
                item.sumStr = data.sumStr//库存数量
                item.mdo = item.splitVal=='0'?data.quantity:'0'//拆分数量
                item.model = data.model//规格型号
                item.modelid = data.modelID//规格型号id
                item.isDel = '0'//特殊字段
                item.numStr = data.numStr//最大数量
                item.mdoStr = item.splitVal=='0'?data.mdoStr:''//散件拆分单位
                item.noEdit = item.splitVal=='0'?'':'1'//散件拆分单位是否可以编辑
                item.uuStr = data.uuStr//单位
                item.supplierId = ''//供货商id
                item.show = '0'// 0拆分  1不拆分
                item.price = data.price//单价
                // item.price = (Number(data.salesprice)-Number(data.salesprice*(this.taxPrice/100))).toFixed(2)//不含税单价
                // item.totalPrice = (Number(data.salesprice)-Number(data.salesprice*(this.taxPrice/100))).toFixed(2)//不含税总价

                if(item.splitVal=='0'){
                  item.totalPrice = (Number(item.price)*Number(item.mdo)+'')//总价
                }else{
                  item.totalPrice = (Number(item.price)*Number(item.quantity)+'')//总价
                }

                this.$set(this.list,index,item)
              }
              // item.ownerid = this.id//入库单id
              // item.num = this.list.length+1//序号
              // item.product = data.name//商品名称
              // item.productid = data.id//商品id
              // item.splitVal = data.split//是否拆分 0拆分 1不拆分
              // item.quantity = '1'//整件数量
              // item.isDel = '0'//特殊字段
              // item.model = ''//规格型号
              // item.modelid = data[i].modelID//规格型号id
              // item.mdoStr = item.splitVal=='0'?data.splitDeliveryUnit:''//散件拆分单位
              // item.noEdit = item.splitVal=='0'?'':'1'//散件拆分单位是否可以编辑
              // // item.uuStr = data.unit//单位
              // item.supplierId = ''//供货商id
              // item.show = '0'// 0拆分  1不拆分
              // item.price = ''//不含税单价
              // item.totalPrice = ''//不含税总价
              // item.priceTax = ''//含税单价
              // item.totalPriceTax = ''//含税总价

            }
          }
        })
      },
      quantityBlur(item){
        if(item.splitVal=='0'){
          if(Number(item.mdo)>Number(item.numStr)){
            console.log('不拆分')
            item.mdo = item.numStr
          }

        }else{
          if(Number(item.quantity)>Number(item.numStr)){
            console.log('拆分')
            item.quantity = item.numStr
          }
        }

      },
      //确定单价明细
      toprice(item){
        if(item.splitVal=='0'){
          item.totalPrice = (Number(item.price)*Number(item.mdo)).toFixed(2)//总价
        }else{
          item.totalPrice = (Number(item.price)*Number(item.quantity)).toFixed(2)//总价
        }
        return item
      },
      // printFund(idm,state){
      //   let tipValue = ''
      //   if(state=='1'){
      //     tipValue = '是否提交申请?'
      //   }else{
      //     tipValue = '是否出库?'
      //   }
      //   let params = {
      //     id:idm,
      //     state:2,
      //   }
      //   this.$dialog.confirm({
      //     width: 300,
      //     tipValue: tipValue,
      //     alertImg: 'warn',
      //     okCallBack: (data)=>{
      //       this.ajaxJson({
      //         url: '/stock/stockout/updateToStockout',
      //         data: params,
      //         call: (data) => {
      //           if (data.type === 0) {
      //             this.$dialog.setReturnValue(this.id)
      //             this.$dialog.alert({
      //               alertImg: 'ok',
      //               tipValue: data.message,
      //               closeCallBack: () => {
      //                 this.$dialog.close()
      //                 // this.initData()
      //
      //               }
      //             })
      //           } else {
      //             this.$dialog.alert({
      //               alertImg: 'warn',
      //               tipValue: data.message
      //             })
      //           }
      //         }
      //       })
      //     }
      //   })
      // },
      //查看--------------
      listView(item){
        this.$dialog.OpenWindow({
          width: 1050,
          height: 610,
          url: '/stockOutDetailsForm?id=' + item.id+'&category='+this.category+'&applicableModels='+this.applicableModels+'&ownerid='+'&productID='+item.productid+'&modelID='+item.modelid,
          title: '修改出库详情',
          closeCallBack: (data)=>{
            if(data){
              this.searchStr = data
              let fromid=this.id
              this.initPage(fromid)
            }
          }
        })

      },
      init(){
        let params={}

        if(this.idm){
          params={
            id:this.idm
          }
        }
        this.ajaxJson({
          url: '/stock/stockout/initForm',
          data:params,
          call: (data) => {
            this.categoryList=data.categoryPsd.list
            this.category=data.categoryPsd.value
            this.applicableModelsList=data.applicableModelsPsd.list
            this.applicableModels=data.applicableModelsPsd.value
            this.wareHouser = sessionStorage.getItem('____currentUser')
            this.wareHouserId = sessionStorage.getItem('____currentUserID')
            if(data.updateName){
              this.updateName=data.updateName
              this.createName=data.createName
            }else{
              this.updateName=sessionStorage.getItem('____currentUser')
              this.createName=sessionStorage.getItem('____currentUser')
            }
            if(data.insertDate){
              this.insertDate=data.insertDate
              this.updateDate=data.updateDate
            }else{
              this.insertDate='当前时间'
              this.updateDate='当前时间'
            }
            if(this.idm){
              this.list=data.list
              this.code=data.code
              let item,list
              list = data.list.concat()
              for(let i in list){
                item = list[i]
                item.splitVal = item.split//是否拆分 0拆分 1不拆分
                item.mdo = item.splitVal=='0'?item.quantity:'0'//拆分数量
                item.quantity = item.splitVal=='0'?'0':item.quantity//整件数量
                item.numStr = item.numStr//库存数量
                item.isDel = '0'//特殊字段
                item.uuStr = item.uuStr//单位
                item.mdoStr = item.splitStr//散件拆分单位
                item.noEdit = item.splitVal=='0'?'':'1'//散件拆分单位是否可以编辑
                item.show = '0'// 0拆分  1不拆分
              }
            }else{
              this.number()
            }
          }
        })
      },
      clearWareHouser(){},
      motorcycleTypeRadio(){
        this.number()
      },
      //----------------------
      selectWareHouser(){
        this.$dialog.OpenWindow({
          width: 950,
          height: 692,
          url: "/selectPerson?category="+this.category+"&categoryBefore=1",
          title: "选择出库人员",
          closeCallBack: (data) => {
            if(data){
              this.wareHouser = data.name
              this.wareHouserId = data.id
            }
          }
        })
      },
      //添加--------------------
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

              // this.initPage(fromid)
            }
          }
        })
      },
      //----保存----------------
      save() {
        let a = this.validator()
        if (a) {
          console.log( this.list )
          if(this.list!='') {
            if(this.idm){
              let params = {
                id:this.idm,//id
                wareHouserId: this.wareHouserId,
                category: this.category,
                workDate: this.workDate,
                code: this.code,
                applicableModels: this.applicableModels,
                list:this.list,
              }
              // this.idm=params.id
              // this.id = params.id
              this.ajaxJson({
                url: '/stock/stockout/saveStockout',
                data: params,
                call: (data) => {
                  if (data.type === 0) {
                    // this.detailsShow = true
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
            }else{
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
              // this.id = params.id
              this.ajaxJson({
                url: '/stock/stockout/saveStockout',
                data: params,
                call: (data) => {
                  if (data.type === 0) {
                    // this.detailsShow = true
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

          }else{
            this.$dialog.alert({
              tipValue:'至少添加一条出库详情',
              alertImg:'warn',
              width:'330'
            })
          }

        }
      },
      //  --------------------
      initPage (fromid) {
        let parmas={
          id:fromid,
        }

        this.ajaxJson({
          url:'/stock/stockout/initForm',
          data:parmas,
          call: (data) => {
            this.list = data.list

          }
        })
      },
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
