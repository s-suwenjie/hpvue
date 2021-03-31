<template>
  <div class="f_main">
    <yhm-formbody>
      <template #title>基本信息</template>
      <template #control>
        <yhm-form-radio title="商品类型" :no-edit="productDetails.length>0?true:false" ref="stockOutFormRadio" rule="#" :select-list="categoryList" @call="motorcycleTypeRadio" :value="category" id="category"></yhm-form-radio>
        <yhm-form-text title="入库编号" no-edit="1" :value="code" id="code"></yhm-form-text>
        <yhm-form-radio :title="category=='3'?'固定资产':'适用车型'" width="1" ref="stockOutFormRadio2" rule="#" :no-edit="productDetails.length>0?true:false" @call="motorcycleTypeRadio" :select-list="category=='3'?templeList:applicableModelsList" :value="applicableModels" id="applicableModels"></yhm-form-radio>
        <yhm-form-date title="入库日期" :max="maxWorkDate" :value="workDate" id="workDate" @call="motorcycleTypeRadio" :no-edit="categoryNoEdit" rule="R0000" ></yhm-form-date>
        <yhm-form-select title="入库人员" @click="selectWareHouser" @clear="clearWareHouser()" :value="wareHouser" id="wareHouser" :no-click="true" rule="R0000"></yhm-form-select>
      </template>
    </yhm-formbody>
<!--    v-show="detailsShow"-->
<!--    <yhm-form-list-show style="margin-top: 20px;">-->
<!--      <template #title>入库详情</template>-->
<!--      <template #operate>-->
<!--&lt;!&ndash;        v-show="state=='0'?true:false"&ndash;&gt;-->
<!--        <yhm-commonbutton value="添加" icon="btnAdd" @call="addDetail()" category="three"></yhm-commonbutton>-->
<!--      </template>-->
<!--      <template #listHead>-->
<!--        <yhm-managerth style="width: 38px" title="查看" v-if="type!=1"></yhm-managerth>-->
<!--        <yhm-managerth title="商品名称"></yhm-managerth>-->
<!--        <yhm-managerth title="规格型号"></yhm-managerth>-->
<!--        <yhm-managerth style="width: 120px" title="数量"></yhm-managerth>-->
<!--        <yhm-managerth style="width: 120px" title="拆分数量"></yhm-managerth>-->
<!--        <yhm-managerth title="不含税单价"></yhm-managerth>-->
<!--        <yhm-managerth style="width: 120px;" title="不含税总价"></yhm-managerth>-->
<!--        <yhm-managerth style="width: 80px;" title="含税单价"></yhm-managerth>-->
<!--        <yhm-managerth style="width: 120px;" title="含税总价"></yhm-managerth>-->
<!--        <yhm-managerth style="width: 38px;" title="删除"></yhm-managerth>-->
<!--      </template>-->
<!--      <template #listBody>-->
<!--        <tr v-for="(item,index) in detailList" :class="[{InterlacBg:index%2!=0}]" :key="item.id">-->
<!--          <yhm-manager-td-look @click="listView(item,index)" v-if="type!=1"></yhm-manager-td-look>-->
<!--          <yhm-manager-td :value="item.product"></yhm-manager-td>-->
<!--          <yhm-manager-td :value="item.model"></yhm-manager-td>-->
<!--          <yhm-manager-td-rgt :value="item.quantity+item.uuStr"></yhm-manager-td-rgt>-->
<!--          <yhm-manager-td-rgt v-if="item.mdoStr!=''" :value="item.mdoStr"></yhm-manager-td-rgt>-->
<!--          <yhm-manager-td-rgt v-else :value="item.mdo==''?'0':item.mdo"></yhm-manager-td-rgt>-->
<!--          <yhm-manager-td-money :value="item.price+''"></yhm-manager-td-money>-->
<!--          <yhm-manager-td-money :value="item.totalPrice+''"></yhm-manager-td-money>-->
<!--          <yhm-manager-td-money :value="item.priceTax+''"></yhm-manager-td-money>-->
<!--          <yhm-manager-td-money :value="item.totalPriceTax+''"></yhm-manager-td-money>-->

<!--          <yhm-manager-td-operate>-->
<!--            <yhm-manager-td-operate-delete :no-click="state!=='0'?true:false" @click="delFromList(item.id,index)"></yhm-manager-td-operate-delete>-->
<!--          </yhm-manager-td-operate>-->
<!--        </tr>-->
<!--      </template>-->
<!--      <template #empty>-->
<!--        <span class="m_listNoData" v-show="empty">暂时没有数据</span>-->
<!--      </template>-->

<!--    </yhm-form-list-show>-->
    <div class="f_split"></div>
<!--    <div style="position: absolute;left: 50%;top: 340px;z-index: 99;transform: translateX(-50%);">提示提示提示提示提示提示提示提示提示提示</div>-->
    <yhm-form-list-edit>
      <template #title>入库详情</template>
      <template #operate>
        <yhm-commonbutton  value="添加" icon="btnAdd" @call="addProduct"></yhm-commonbutton>
      </template>
      <template #listHead>
        <yhm-managerth style="width: 36px" title="序号"></yhm-managerth>
        <yhm-managerth title="商品名称"></yhm-managerth>
        <yhm-managerth title="规格型号"></yhm-managerth>
        <yhm-managerth style="width: 60px" title="数量"></yhm-managerth>
        <yhm-managerth style="width: 50px" title="单位"></yhm-managerth>
        <yhm-managerth style="width: 65px" title="拆分数量"></yhm-managerth>
        <yhm-managerth style="width: 65px" title="拆分单位"></yhm-managerth>

<!--        <yhm-managerth style="width: 90px" title="不含税单价"></yhm-managerth>-->
<!--        <yhm-managerth style="width: 90px" title="不含税总价"></yhm-managerth>-->
        <yhm-managerth style="width: 110px" title="采购单价"></yhm-managerth>
        <yhm-managerth style="width: 110px" title="采购总价"></yhm-managerth>
        <yhm-managerth style="width: 40px" title="删除"></yhm-managerth>
      </template>
      <template #listBody>
        <tr v-for="(item,index) in productDetails" :key="index" :class="{InterlacBg:index%2!==0}">
          <div style="display: flex;justify-content: center;text-align: center">{{Number(index)+1}}</div>
<!--          <yhm-form-td-textbox width="36"  no-edit="1" id="num" :list="productDetails" listid="productDetails" :value="item"></yhm-form-td-textbox>-->
          <yhm-form-td-select-dialog width="210" tip="value" @call="selectProduct(item,index)" id="product" :list="productDetails" listid="productDetails" :value="item" rule="#"></yhm-form-td-select-dialog>
          <yhm-form-td-select-dialog width="210" tip="value" @call="selectModel(item,index)" id="model" :list="productDetails" listid="productDetails" :value="item" rule="#"></yhm-form-td-select-dialog>
          <yhm-form-td-textbox width="60" min-number="1" @input="toprice(item)" @blur="toprice(item)" :list="productDetails" listid="productDetails" :value="item" id="quantity"></yhm-form-td-textbox>
          <yhm-form-td-textbox width="50" tip="value" id="uuStr" :list="productDetails" listid="productDetails" :value="item"></yhm-form-td-textbox>
          <yhm-form-td-textbox width="65" min-number="1" tip="value" @input="toprice(item)" @blur="toprice(item)" :no-edit="item.noEdit" id="mdo" :list="productDetails" listid="productDetails" :value="item"></yhm-form-td-textbox>
          <yhm-form-td-textbox width="65" tip="value" :no-edit="item.noEdit" id="mdoStr" :list="productDetails" listid="productDetails" :value="item"></yhm-form-td-textbox>

<!--          <yhm-form-td-textbox width="90" no-edit="1" tip="money" before-icon="rmb" :list="productDetails" listid="productDetails" :value="item" id="price"></yhm-form-td-textbox>-->
<!--          <yhm-form-td-textbox width="90" no-edit="1" tip="money" tip-left="-53" tip-arrow-left="70" before-icon="rmb" id="totalPrice"  :list="productDetails" listid="productDetails" :value="item"></yhm-form-td-textbox>-->
          <yhm-form-td-textbox width="110" @input="toprice(item)" tip="money" tip-arrow-left="170" tip-left="-153"  id="priceTax" before-icon="rmb" :list="productDetails" listid="productDetails" :value="item"  rule="R0000" ></yhm-form-td-textbox>
          <yhm-form-td-textbox width="110" no-edit="1" tip="money" tip-arrow-left="245" tip-left="-230"  id="totalPriceTax" before-icon="rmb" :list="productDetails" listid="productDetails" :value="item"  rule="R0000" ></yhm-form-td-textbox>
          <yhm-form-td-delete width="40" :list="productDetails" :value="item" :del-click="false" @click="delFromList(item.id,index)"></yhm-form-td-delete>
        </tr>
      </template>
      <template #empty>
        <span class="m_listNoData" v-show="productDetails.length=='0'?true:false">暂无数据</span>
      </template>
    </yhm-form-list-edit>
    <yhm-formoperate :createName="createName" :insertDate="insertDate" :updateName="updateName" :updateDate="updateDate">
      <template #btn>
        <yhm-commonbutton value="保存" icon="btnSave" :flicker="true" @call="save()"></yhm-commonbutton>
<!--        <yhm-commonbutton value="提交申请" icon="btnSave" @call="printFund(idm,state)" v-show="type!=1"></yhm-commonbutton>-->
      </template>
    </yhm-formoperate>
  </div>
</template>

<script>
  import { accMul, accAdd, guid, formatDate,formatTime } from '@/assets/common.js'
  import { formmixin } from '@/assets/form.js'
  export default {
    name: 'stockInForm',
    mixins: [formmixin],
    data () {
      return {
        productDetails:[],
        show:'false',
        quantity:'10',//数量
        price:'123',//单价
        category: '',
        categoryList: [],
        applicableModels:'',
        applicableModelsList:[],
        templeList:[],//行政
        maxWorkDate:'',
        workDate:'',            //入库日期
        wareHouserId:'',        //入库人ID
        wareHouser:'',          //入库人员
        code:'',                //入库编号
        state:'',
        detail: [], // 列表数据
        detailsShow:false,//入库详情显示隐藏
        detailList:[],//入库详情列表
        empty:false,
        categoryNoEdit:false,
        modelsNoEdit:false,
        idm:'',
        cid:'',
        aid:'',
        taxPrice:'13'
      }
    },
    watch:{
      category(newVal,value){
        if(value!=''){
          this.productDetails = []
        }
      },
      applicableModels(newVal,value){
        if(value!=''){
          this.productDetails = []
        }
      }
    },
    methods:{
      //from内保存
      printFund(idm,state){
        let tipValue = ''
        if(state=='1'){
          tipValue = '是否提交申请?'
        }else{
          tipValue = '是否入库?'
        }
        let params = {
          id:idm,
          state:1,
        }
        this.$dialog.confirm({
          width: 300,
          tipValue: tipValue,
          alertImg: 'warn',
          okCallBack: (data)=>{
            this.ajaxJson({
              url: '/stock/stockIn/updateForState',
              data: params,
              call: (data) => {
                if (data.type === 0) {
                  this.$dialog.setReturnValue(this.id)
                  this.$dialog.alert({
                    alertImg: 'ok',
                    tipValue: data.message,
                    closeCallBack: () => {
                      this.$dialog.close()
                      // this.initData()

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
      motorcycleTypeRadio(){
        let params = {}
        if(this.type=='1'){
          params = {
            category:this. category,
            applicableModels:this.applicableModels,
            workDate:this.workDate
          }
        }else{
          params = {
            category:this. category,
            applicableModels:this.applicableModels,
            workDate:this.workDate,
            id:this.id
          }
        }

        this.ajaxJson({
          url: '/stock/stockIn/initFormCode',
          data: params,
          loading:'0',
          call: (data) => {
            this.code = data.message

          }
        })
      },
      //删除入库详情
      delFromList(id,index){
        if(this.type=='1'){
          this.$dialog.confirm({
            width: 300,
            tipValue: '是否确认删除当前入库详情？',
            alertImg: 'warn',
            okCallBack: ()=>{
              this.productDetails.splice(index,1)
              // if(this.detailList.length!=0){
              //   this.empty = false
              //   this.modelsNoEdit = true
              // }else{
              //   this.empty = true
              //   this.modelsNoEdit = false
              // }
            }
          })
        }else{
          let params = {
            id:id
          }
          this.$dialog.confirm({
            width: 300,
            tipValue: '是否删除?',
            alertImg: 'warn',
            okCallBack: (data)=>{
              this.ajaxJson({
                url: '/stock/stockInDetail/delete',
                data: params,
                call: (data) => {
                  if (data.type === 0) {
                    this.$dialog.setReturnValue(this.id)
                    this.$dialog.alert({
                      alertImg: 'ok',
                      tipValue: data.message,
                      closeCallBack: () => {
                        // this.$dialog.close()
                        this.initData()
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
            width: 950,
            height: 603,
            url: '/selectWorkOrderMaterials?selectType=1'+'&category='+this.category+'&applicableModels='+this.applicableModels,
            // url: '/selectProduct?cid='+this.cid+'&aid='+this.aid+'&selectType=1'+'&storageType='+this.category,
            title: '选择商品信息',
            closeCallBack: (data) => {
              if (data) {
                let item,insertDate
                // console.log(data,'执行了')
                for(let i in data){
                  item = {}
                  insertDate = new Date(accAdd(new Date().getTime(), accMul(this.productDetails.length, 1000)))
                  item = {}
                  item.id = guid()
                  item.ownerID = this.id//入库单id
                  item.insertDate = formatTime(insertDate)
                  item.num = (this.productDetails.length+1)+''//序号

                  item.product = data[i].product//商品名称
                  item.productID = data[i].productID//商品id
                  item.splitVal = data[i].split//是否拆分 0拆分 1不拆分
                  item.model = data[i].model//规格型号
                  item.modelID = data[i].modelID// 规格型号id
                  item.supplier = data[i].supplier//供货商名称
                  item.supplierId = data[i].supplierId//供货商ID
                  item.mdoStr = item.splitVal=='0'?data[i].a_splitDeliveryUnit:''//散件拆分单位
                  item.noEdit = item.splitVal=='0'?'':'1'//散件拆分单位是否可以编辑
                  item.supplierId = ''//供货商id
                  item.quantity = '1'//整件数量
                  item.mdo = item.splitVal=='1'?'0':'1'//拆分数量
                  item.price = data[i].price+''//单价
                  item.uuStr = data[i].unit//整件单位
                  item.show = '0'// 0拆分  1不拆分
                  // item.priceTax = data[i].price//含税单价
                  // item.price = (Number(data[i].price)-Number(data[i].price*(this.taxPrice/100))).toFixed(2)//不含税单价 taxPrice
                  if(item.splitVal=='0'){
                    item.totalPrice = Number(item.price)*(Number(item.quantity)*Number(item.mdo))//不含税总价
                    // item.totalPriceTax = Number(item.priceTax)*(Number(item.quantity)*Number(item.mdo))//含税总价
                  }else{
                    item.totalPrice = Number(item.price)*Number(item.quantity)//不含税总价
                    // item.totalPriceTax = Number(item.priceTax)*Number(item.quantity)//含税总价
                  }

                  this.productDetails.push(item)
                }
              }
            }
          })
        }
      },
      selectProduct(item,index){
        this.$dialog.OpenWindow({
          width: 950,
          height: 603,
          url: '/selectWorkOrderMaterials?'+'&category='+this.category+'&applicableModels='+this.applicableModels,
          title: '选择商品信息',
          closeCallBack: (data) => {
            if (data) {
              // console.log(data,'选择商品')
              item.product = data.product//商品名称
              item.productID = data.productID//商品id
              item.splitVal = data.split//是否拆分 0拆分 1不拆分

              item.model = data.model//规格型号
              item.modelID = data.modelID// 规格型号id
              item.mdoStr = item.splitVal=='0'?data.a_splitDeliveryUnit:''//散件拆分单位
              item.noEdit = item.splitVal=='0'?'':'1'//散件拆分单位是否可以编辑
              item.supplier = data.supplier//供货商名称
              item.supplierId = data.supplierId//供货商ID

              item.mdo = item.splitVal=='1'?'0':'1'//拆分数量
              item.price = data.price+''//单价
              item.uuStr = data.unit//整件单位
              // item.priceTax = data.price//含税单价
              item.price = data.price//不含税单价
              // item.price = (Number(data.price)-Number(data.price*(this.taxPrice/100))).toFixed(2)//不含税单价 taxPrice
              if(item.splitVal=='0'){
                item.totalPrice = Number(item.price)*(Number(item.quantity)*Number(item.mdo))//不含税总价
                // item.totalPriceTax = Number(item.priceTax)*(Number(item.quantity)*Number(item.mdo))//含税总价
              }else{
                item.totalPrice = Number(item.price)*Number(item.quantity)//不含税总价
                // item.totalPriceTax = Number(item.priceTax)*Number(item.quantity)//含税总价
              }
            }
          }
        })
      },
      //选择商品型号
      selectModel(item,index){
        if(item.product!=''){
          this.$dialog.OpenWindow({
            width: 950,
            height: 603,
            url: '/selectWorkOrderMaterials?'+'&category='+this.category+'&applicableModels='+this.applicableModels+'&productid='+item.productID,
            // url: '/selectProductModel?ownerID='+item.productID,
            title: '选择商品规格型号信息',
            closeCallBack: (data) => {
              if (data) {
                item.model = data.model//规格型号
                item.modelID = data.modelID// 规格型号id
                item.supplier = data.supplier//供货商名称
                item.supplierId = data.supplierId//供货商ID
                // this.price = (Number(data.price)).toFixed(2)
                // this.price = (Number(this.priceTax)-Number(this.priceTax*(this.taxPrice/100))).toFixed(2)
                // item.priceTax = data.price+''
                item.price = data.price//不含税单价
                // console.log(item,'----------------')
                if(item.splitVal=='0'){
                  item.totalPrice = Number(item.price)*(Number(item.quantity)*Number(item.mdo))//不含税总价
                  // item.totalPriceTax = Number(item.priceTax)*(Number(item.quantity)*Number(item.mdo))//含税总价
                }else{
                  item.totalPrice = Number(item.price)*Number(item.quantity)//不含税总价
                  // item.totalPriceTax = Number(item.priceTax)*Number(item.quantity)//含税总价
                }
                item = this.toprice(item)
                // this.toprice()
              }
            }
          })
        }else{
          this.$refs.pros.errorEvent("商品名称为空")
        }

      },
      //确定单价明细
      toprice(item){
        let price
        // console.log(item)
        // price = (Number(item.priceTax)-Number(item.priceTax*(this.taxPrice/100)))
        // item.price = price.toFixed(2)

        // totalPrice = Number(item.price) * Number(item.quantity)
        // item.totalPrice = totalPrice.toFixed(2)
        if(item.splitVal=='0'){
          item.totalPrice = Number(item.price)*(Number(item.quantity)*Number(item.mdo))//不含税总价
          item.totalPriceTax = Number(item.priceTax)*(Number(item.quantity)*Number(item.mdo))//含税总价
        }else{
          item.totalPrice = Number(item.price)*Number(item.quantity)//不含税总价
          item.totalPriceTax = Number(item.priceTax)*Number(item.quantity)//含税总价
        }
        return item
      },
      //查看商品详情
      listView(item,index){
        this.$dialog.OpenWindow({
          width: 1050,
          height: 610,
          url: '/stockInDetailForm?id='+item.id+'&ownerID='+this.id+'&cid='+this.cid +'&aid='+this.aid,
          title: '查看入库详情',
          closeCallBack: (data) => {
            if(data){
              // this.initData()
              if(this.detailList==null){
                this.detailList = []
              }
              let list = this.detailList[index]//查看时 获取查看的索引值 将修改的值重新赋值
              list.id = data.params.id
              list.ownerID = data.params.ownerID//入库单ID
              list.product = data.params.product//商品名称
              list.productID = data.params.productID//商品ID
              list.model = data.params.model//型号
              list.modelID = data.params.modelID//型号ID
              list.quantity = data.params.quantity//商品总数量
              list.uuStr = data.params.unit
              list.price = data.params.price//不含税单价
              list.totalPrice = data.params.totalPrice//不含税总价
              list.priceTax = data.params.priceTax//含税单价
              list.totalPriceTax = data.params.totalPriceTax//含税总价
              list.supplierId = data.params.supplierId//供货商id
              list.show = data.params.show//是否拆分
              list.mdo = data.params.mdo
              list.mdoStr = data.params.mdoStr

              // this.initData()
              if(this.detailList.length!=0){
                this.empty = false
                this.modelsNoEdit = true
              }else{
                this.empty = true
                this.modelsNoEdit = false
              }
            }
          }
        })
      },
      addDetail () {
        this.$dialog.OpenWindow({
          width: 1050,
          height: 610,
          url: '/stockInDetailForm?type=1&ownerID='+this.id+'&cid='+this.cid +'&aid='+this.aid,
          title: '添加入库详情',
          closeCallBack: (data) => {
            if(data){
              if(this.detailList==null){
                this.detailList = []
              }
              this.detailList.push({
                id:data.params.id,
                ownerID:data.params.ownerID,//入库单ID
                product:data.params.product,//商品名称
                productID:data.params.productID,//商品ID
                model:data.params.model,//型号
                modelID:data.params.modelID,//型号ID
                quantity:data.params.quantity,//商品总数量
                uuStr:data.params.unit,
                price:data.params.price,//不含税单价
                totalPrice:data.params.totalPrice,//不含税总价
                priceTax:data.params.priceTax,//含税单价
                totalPriceTax:data.params.totalPriceTax,//含税总价
                supplierId:data.params.supplierId,//供货商id
                show:data.params.show,//是否拆分
                mdo:data.params.mdo,
                mdoStr:data.params.mdoStr,
              })
              // this.initData()
              if(this.detailList.length!=0){
                this.empty = false
                this.modelsNoEdit = true
              }else{
                this.empty = true
                this.modelsNoEdit = false
              }
              this.$dialog.setReturnValue(this.id)

            }

          }
        })
      },
      //选择入库人员
      selectWareHouser(){
        this.$dialog.OpenWindow({
          width: 950,
          height: 692,
          url: "/selectPerson?category=0&categoryBefore=1",
          title: "选择入库人员",
          closeCallBack: (data) => {
            this.wareHouser = data.name
            this.wareHouserId = data.id
          }
        })
      },
      save(type){
        let a = this.validator()
        if(a){
          if(this.productDetails!=null){
            let params = {
              id: this.id,
              applicableModels: this.applicableModels,   //单位名称
              category: this.category,
              workDate: this.workDate,
              wareHouserId: this.wareHouserId,
              // wareHouser: this.wareHouser,
              code: this.code,
              state: this.state,
              detailList:this.productDetails,
            }
            this.cid=this.category
            this.aid=this.applicableModels
            this.idm=params.id
            this.ajaxJson({
              url: '/stock/stockIn/save',
              data: params,
              call: (data) => {
                if (data.type === 0) {
                  this.$dialog.setReturnValue(this.id)
                  this.$dialog.alert({
                    alertImg: 'ok',
                    tipValue: data.message,
                    closeCallBack: () => {
                      // this.detailsShow = true
                      this.categoryNoEdit = true
                      this.type = '2'
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
            this.$dialog.alert({
              tipValue:'至少添加一条入库详情',
              alertImg:'warn',
              width:'330'
            })
          }
        }

      },
      initData(){
          let params = {}
          if(this.type=='1'){//为1时是从添加跳转进来的
            // this.detailsShow = false
          }else{
            // this.detailsShow = true
            this.categoryNoEdit = true
            params = {
              id:this.id
            }
            this.idm=params.id
          }
          this.init({
            url: '/stock/stockIn/initForm',
            data:params,
            all: (data)=>{
              this.detailList = data.detailList
              this.categoryList = data.categoryPsd.list
              this.category = data.categoryPsd.value
              this.applicableModelsList = data.applicableModelsPsd.list
              this.applicableModels = data.applicableModelsPsd.value
              this.templeList = data.templePsd.list
              this.code = data.code
              this.workDate = data.workDate
              this.wareHouserId = data.wareHouserId
              this.wareHouser = data.wareHouser
              this.state = data.state
              if(data.detailList!=null&&this.detailList.length!=0){
                this.empty = false
                this.modelsNoEdit = true
              }else{
                this.empty = true
                this.modelsNoEdit = false
              }
              for(let j in this.detailList){
                let detailList = this.detailList[j]
                let item = {}
                item.id = detailList.id
                item.ownerID = detailList.ownerID//入库单id
                item.num = j//序号
                item.product = detailList.product//商品名称
                item.productID = detailList.productID//商品id
                item.quantity = detailList.quantity//整件数量
                item.mdo = detailList.mdo//拆分数量
                item.mdoStr = detailList.mdoStr//散件拆分单位
                item.model = detailList.model//规格型号
                item.modelID = detailList.modelID//规格型号
                item.isDel = '0'//特殊字段
                item.splitVal = detailList.splitVal//是否拆分 0拆分 1不拆分
                item.noEdit = detailList.splitVal=='0'?'':'1'//散件拆分单位是否可以编辑
                item.uuStr = detailList.uuStr//单位
                item.supplierId = detailList.supplierId//供货商id
                // item.show = '0'// 0拆分  1不拆分
                item.price = detailList.price//不含税单价
                item.totalPrice = detailList.totalPrice//不含税总价
                item.priceTax = detailList.priceTax//含税单价
                item.totalPriceTax = detailList.totalPriceTax//含税总价
                this.productDetails.push(item)
              }


            },
            add: (data)=>{
              this.wareHouser = sessionStorage.getItem('____currentUser')
              this.wareHouserId = sessionStorage.getItem('____currentUserID')
              this.workDate = formatDate(new Date())
              this.maxWorkDate = this.workDate
            },
            look: (data)=>{
              this.name = data.name
            }
          })
      }

    },
    clearWareHouser(){
      this.wareHouserId = ""
    },
    created () {
      this.setQuery2Value('type')
      this.setQuery2Value('id')
      this.initData()
    }
  }
</script>

<style scoped>

</style>
