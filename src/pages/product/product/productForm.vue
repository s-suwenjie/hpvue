<template>
  <div class="f_main">
    <yhm-formbody>
      <template #title>基本信息</template>
      <template #control>
        <yhm-form-radio title="类型" width="1" ref="storageTypeRadio" rule="#" @call="storageTypeClick" :select-list="storageTypeList" :value="storageType" id="storageType" ></yhm-form-radio>
        <yhm-form-text title="品名" @repeatverify="nameVerifyEvent" ref="name" :value="name" id="name"></yhm-form-text>
        <yhm-form-text title="品名" subtitle="(英文)" :value="englishName" id="englishName"></yhm-form-text>
        <yhm-form-select title="计量单位" :value="unit" id="unit" @clear="clearUnit" @click="selectUnit" rule="R0000"></yhm-form-select>

        <!--<yhm-form-radio v-if="isSorck" title="适用车型" :select-list="stockTypeList" :value="stockType" id="stockType" ></yhm-form-radio>-->
        <yhm-form-radio title="是否" subtitle="拆分出库" @call="splitClick" :select-list="splitList" :value="split" id="split"></yhm-form-radio>
        <yhm-form-select title="拆分" v-if="isSplit" subtitle="出库单位" :value="splitDeliveryUnit" id="splitDeliveryUnit" @clear="clearUnit" @click="splitUnit" rule="R0000"></yhm-form-select>
      </template>
    </yhm-formbody>

    <div class="f_split"></div>

    <yhm-form-list-show v-show="showModel">
      <template #title>规格型号</template>
      <template #operate>
        <yhm-commonbutton value="添加规格型号" category="three" icon="btnAdd" @call="add()"></yhm-commonbutton>
      </template>
      <template #listHead>
        <yhm-managerth style="width: 38px" title="查看"></yhm-managerth>
        <yhm-managerth title="料号"></yhm-managerth>
        <yhm-managerth title="料号(英文)"></yhm-managerth>
        <yhm-managerth title="物品编号"></yhm-managerth>
        <yhm-managerth title="适用品牌"></yhm-managerth>
        <yhm-managerth title="适用车型"></yhm-managerth>
        <yhm-managerth style="width: 130px" title="参考单价"></yhm-managerth>
        <yhm-managerth style="width: 38px" title="删除"></yhm-managerth>
      </template>
      <template #listBody>
        <tr v-for="(item,index) in modelDetails" :key="index" :class="{InterlacBg:index%2!==0}">
          <yhm-manager-td-look @click="add(item.id)"></yhm-manager-td-look>
          <yhm-manager-td :value="item.name"></yhm-manager-td>
          <yhm-manager-td :value="item.englishName"></yhm-manager-td>
          <yhm-manager-td :value="item.productNumber"></yhm-manager-td>

          <yhm-manager-td-psd v-if="storageType==3" :value="item.stockType" :list="fixedAssetsList"></yhm-manager-td-psd>
          <yhm-manager-td-psd v-else :value="item.stockType" :list="stockTypeList"></yhm-manager-td-psd>
          <yhm-manager-td :value="item.stockModel"></yhm-manager-td>
          <yhm-manager-td-money :value="item.price"></yhm-manager-td-money>
          <yhm-manager-td-operate>
            <yhm-manager-td-operate-delete  @click="delModel(item)"></yhm-manager-td-operate-delete>
          </yhm-manager-td-operate>
        </tr>
      </template>
      <template #empty>
        <span class="m_listNoData" v-show="empty">暂时没有数据</span>
      </template>
    </yhm-form-list-show>

    <yhm-formoperate :createName="createName" :insertDate="insertDate" :updateName="updateName" :updateDate="updateDate">
      <template #btn>
        <yhm-commonbutton value="保存" icon="btnSave" :flicker="true" @call="save()"></yhm-commonbutton>
      </template>
    </yhm-formoperate>
  </div>
</template>

<script>
  import { formmixin } from '@/assets/form.js'
  export default {
    name: 'productForm',
    mixins: [formmixin],
    data(){
      return{
        name:'',          //商品名称(品名)
        unitID:'',        //计量单位ID
        unit:'',          //计量单位
        englishName:'',   //商品名称英文

        storageType:'',   //入库类型
        storageTypeList:[],
        // stockType:'',    //库存类型
        stockTypeList:[],

        split:'',    //是否拆分出库
        splitList:[],
        splitDeliveryUnitID:'',
        splitDeliveryUnit:'',  //拆分出库单位


        modelDetails:[],  //规格型号数据
        fixedAssetsList:[],

        showModel:false,  //是否显示规格型号信息
        empty: true,       //规格型号为空
        // isSorck:false,     //库存类型默认不显示
        isSplit:false      //拆分出库单位 默认不显示


      }
    },
    methods:{
      splitClick(){
        if (this.split==0){
          this.isSplit=true
        }else{
          this.isSplit=false
        }

      },
      storageTypeClick(){
        // if (this.storageType==='0' ||this.storageType==='1'){
        //   this.isSorck=true
        // }else {
        //   this.isSorck=false
        // }
      },
      //重复验证,基于控件操作的验证
      nameVerifyEvent(){
        this.ajaxJson({
          url:"/Basic/isExistProductByName",
          data:{
            id:this.id,
            name:this.name,
            storageType:this.storageType,
          },
          loading:"0",
          call:(data) =>{
            if(data.type === 0){//说明存在，调用控件验证显示规则
              this.$refs.name.errorEvent("商品名称重复")
              let p = {
                id:this.name
              }
              this.ajaxJson({
                url: '/Basic/initNameFrom',
                data: p,
                call: (data) => {
                  this.id=data.id
                  this.name = data.name
                  this.unitID = data.unitID
                  this.unit = data.unit
                  this.storageType=data.storageType
                  this.englishName=data.englishName
                  this.splitDeliveryUnitID=data.splitDeliveryUnitID
                  this.splitDeliveryUnit=data.splitDeliveryUnit
                  this.modelDetails = data.modelDetails
                  this.empty = this.modelDetails.length === 0
                  this.showModel = true
                  if (this.storageType==='0' ||this.storageType==='1'){
                    this.isSorck=true
                  }else {
                    this.isSorck=false
                  }
                  if (this.split==0){
                    this.isSplit=true
                  }else {
                    this.isSplit=false
                  }
                }
              })
            }
          }
        })
      },
      async isNameVerifyEvent(){
        let result = await this.ajaxAsync({
          url:"/Basic/isExistProductByName",
          data:{
            id:this.id,
            name:this.name,
            storageType:this.storageType,
          },
          loading:"0"
        })
        if(result.type === 0){//说明存在，调用控件验证显示规则
          this.$refs.name.errorEvent("商品名称重复")
          return false
        }
        return true
      },
      splitUnit(){
        let name = '3'
        this.$dialog.OpenWindow({
          width: 950,
          height: 603,
          url: '/selectDic?name=' + name,
          title: '选择计量单位',
          closeCallBack: (data) => {
            if (data) {
              this.splitDeliveryUnitID = data.id
              this.splitDeliveryUnit = data.showName
            }
          }
        })
      },
      //选择计量单位
      selectUnit(){
        let name = '3'
        this.$dialog.OpenWindow({
          width: 950,
          height: 603,
          url: '/selectDic?name=' + name,
          title: '选择计量单位',
          closeCallBack: (data) => {
            if (data) {
              this.unitID = data.id
              this.unit = data.showName
            }
          }
        })
      },
      //清空计量单位
      clearUnit(){
        this.unitID = ''
        this.unit = ''
      },
      //添加或者查看规格型号
      add (id) {
        // 默认设置页面标记是查看
        var isAdd = false
        // 默认设置页面标题为查看信息
        var title = '查看商品信息'
        if (!id) { // 当id不存在的时候
          // 设置id为空
          id = ''
          // 设置页面标题为添加信息
          title = '添加规格型号信息'
          // 设置页面标记为添加
          isAdd = true
        }
        this.$dialog.OpenWindow({
          width: 1050,
          height: 600,
          url:'/modelForm?id=' + id + "&ownerID=" + this.id+'&state='+this.storageType,
          title:title,
          closeCallBack:(data) =>{
            if (data) {
              let p = {
                id:this.id
              }
              this.ajaxJson({
                url: '/Basic/getProductModelByID',
                data: p,
                call: (data) => {
                  if (data.type == 0) {
                    this.modelDetails = data.list
                    this.empty = this.modelDetails.length === 0
                  }
                }
              })
            }
          }
        })
      },
      //删除规格明细
      delModel(item){
        this.$dialog.alert({
          tipValue: '此功能暂未开放',
          alertImg:'warn'
        })
      },
      //保存
      async save(){
        let a = await this.isNameVerifyEvent()
        let b = this.validator()
        this.$refs.storageTypeRadio.$emit('verify')
        if(a && b && this.storageType!=''){
          var params = {
            id: this.id,
            name:this.name,
            unitID:this.unitID,
            unit:this.unit,
            storageType:this.storageType,
            stockType:this.stockType,
            englishName:this.englishName,
            split:this.split,
            splitDeliveryUnitID:this.splitDeliveryUnitID
          }
          this.ajaxJson({
            url: '/Basic/saveProduct',
            data: params,
            call: (data) => {
              if (data.type === 0) {
                this.$dialog.setReturnValue(this.id)
                this.$dialog.alert({
                  tipValue: data.message,
                  closeCallBack: () => {
                    if(this.showModel){
                      this.$dialog.close()
                    }
                    this.showModel = true
                  }
                })
              }
            }
          })
        }
      }
    },
    created () {
      this.init({
        url: '/Basic/initProductFrom',
        all: (data) => {
          //添加查看的时候都需要的代码

          this.storageTypeList = data.storageTypePsd.list
          // this.storageType = data.storageTypePsd.value
          this.fixedAssetsList = data.fixedAssetsPsd.list
          this.stockTypeList = data.stockTypePsd.list


          this.splitList=data.splitPsd.list
          this.split=data.splitPsd.value
        },
        add: (data) => {
          //添加时独有的代码
          //初始化分组成员信息
        },
        look: (data) => {
          //查看时独有的信息
          this.name = data.name
          this.unitID = data.unitID
          this.unit = data.unit
          this.storageType=data.storageType
          this.englishName=data.englishName
          this.splitDeliveryUnitID=data.splitDeliveryUnitID
          this.splitDeliveryUnit=data.splitDeliveryUnit
          this.modelDetails = data.modelDetails
          this.empty = this.modelDetails.length === 0
          this.showModel = true
          if (this.storageType==='0' ||this.storageType==='1'){
            this.isSorck=true
          }else {
            this.isSorck=false
          }
          if (this.split==0){
            this.isSplit=true
          }else {
            this.isSplit=false
          }
        }
      })
    }
  }
</script>

<style scoped>

</style>
