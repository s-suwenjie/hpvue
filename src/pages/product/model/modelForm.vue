<template>
  <div class="f_main f_main_customize">
    <yhm-formbody>
      <template #title>基本信息</template>
      <template #control>
        <yhm-form-text title="料号"  @repeatverify="nameVerifyEvent" ref="name"  :value="name" id="name" rule="R0000"></yhm-form-text>
        <yhm-form-text title="料号"  subtitle="(英文)" :value="englishName" id="englishName" ></yhm-form-text>
        <yhm-form-text title="销售价" :value="price" id="price" before-icon="rmb" rule="R3000"></yhm-form-text>
        <yhm-form-text title="物品编号" :value="productNumber" id="productNumber"  ></yhm-form-text>

        <yhm-form-radio v-if="state==3?false:true" ref="stockTypeRadio" rule="#" title="适用品牌" @call="stockTypeCall()" :select-list="stockTypeList" :value="stockType" id="stockType" ></yhm-form-radio>
        <yhm-form-radio v-else title="固定资产"  :select-list="fixedAssetsList" :value="stockType" id="stockType" ></yhm-form-radio>
        <yhm-form-select v-if="isModel" title="适用车型" @click="stockModelClick()"  :value="stockModel" id="stockModel"></yhm-form-select>
      </template>
    </yhm-formbody>
    <div class="f_split"></div>
    <yhm-form-list-show>
      <template #title>供应商</template>
      <template #operate>
        <yhm-commonbutton value="添加供应商" category="three" icon="btnAdd" @call="addSupplier()"></yhm-commonbutton>
      </template>
      <template #listHead>
        <yhm-managerth style="width: 38px" title="查看"></yhm-managerth>
        <yhm-managerth title="供应商名称"></yhm-managerth>
        <yhm-managerth style="width: 38px" title="删除"></yhm-managerth>
      </template>
      <template #listBody>
        <tr v-for="(item,index) in supplierDetails" :key="index" :class="{InterlacBg:index%2!==0}">
          <yhm-manager-td-look @click="lookUnit(item.id)"></yhm-manager-td-look>
          <yhm-manager-td :value="item.unit"></yhm-manager-td>
          <yhm-manager-td-operate>
            <yhm-manager-td-operate-delete  @click="delSupplier(item)"></yhm-manager-td-operate-delete>
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
  import { accMul, accAdd, guid, formatDate,formatTime } from '@/assets/common.js'
  import { formmixin } from '@/assets/form.js'
  export default {
    name: 'modelForm',
    mixins: [formmixin],
    data(){
      return{
        ownerID:'',
        name:'',
        price:'',
        productNumber:'',  //物品编号
        englishName:'',    //英文名称
        supplierDetails:[],        //供应商明细
        stockTypeList:[],
        stockType:'',
        empty: true,       //规格型号为空
        stockModel:'',
        stockModelID:'',
        isModel:false,
        code:'',
        state:'',
        fixedAssetsList:[],
      }
    },
    methods:{
      stockTypeCall(){
        if (this.stockType==4){
          this.isModel=false
        } else {
          this.isModel=true
        }
        for(let i in this.stockTypeList){
          if(this.stockTypeList[i].num==this.stockType){
            this.code = this.stockTypeList[i].id
          }
        }
      },
      stockModelClick(){
        this.$dialog.OpenWindow({
          width: 950,
          height: 603,
          url: '/selectDic?name=91&value12=' + this.code,
          title: '选择适用车型',
          closeCallBack: (data) => {
            if (data) {
              this.stockModel = data.showName
              this.stockModelID=data.id

            }
          }
        })
      },
      //添加供应商
      addSupplier(){
        this.$dialog.OpenWindow({
          width: '950',
          height: '700',
          url: '/selectUnit?category=1&categoryBefore=1',
          title: '选择供应商信息',
          closeCallBack: (data) => {
            if (data) {
              let insertDate = new Date(accAdd(new Date().getTime(), accMul(this.supplierDetails.length, 1000)))
              this.supplierDetails.push({
                id: guid(),
                insertDate: formatTime(insertDate),
                ownerID: this.id,
                unitID:data.id,
                unit:data.name
              })
              this.empty = this.supplierDetails.length === 0
            }
          }
        })
      },
      //删除供应商
      delSupplier(item){
        let width = accAdd(520, accMul(item.unit.length,15));
        this.$dialog.confirm({
          tipValue: '确定删除供应商<b class="red">（' + item.unit + '）</b>吗？删除后需要保存才能生效！！！',
          btnValueOk: '确定删除',
          width: width,
          okCallBack: () => {
            let index = this.supplierDetails.indexOf(item)
            this.supplierDetails.splice(index,1)
            this.empty = this.supplierDetails.length === 0
          }
        })
      },
      //查看单位信息
      lookUnit(id){
        this.$dialog.OpenWindow({
            width: '1050',
            height: '700',
            title: '查看供应商信息',
            url: '/unitView?id=' + id,
        })
      },
      //重复验证,基于控件操作的验证
      nameVerifyEvent(){
        this.ajaxJson({
          url:"/Basic/isExistModelByName",
          data:{
            id:this.id,
            ownerID:this.ownerID,
            name:this.name,

          },
          loading:"0",
          call:(data) =>{
            if(data.type === 0){//说明存在，调用控件验证显示规则
              this.$refs.name.errorEvent("规格型号重复")
            }
          }
        })
      },
      async isNameVerifyEvent(){
        let result = await this.ajaxAsync({
          url:"/Basic/isExistModelByName",
          data:{
            id:this.id,
            ownerID:this.ownerID,
            name:this.name,

          },
          loading:"0"
        })
        if(result.type === 0){//说明存在，调用控件验证显示规则
          this.$refs.name.errorEvent("规格型号重复")
          return false
        }
        return true
      },
      //保存数据
      async save(){
        let a = await this.isNameVerifyEvent()
        let b = this.validator()
        // this.$refs.stockTypeRadio.$emit('verify')
        if(a && b ){
          var params = {
            id: this.id,
            ownerID:this.ownerID,
            name:this.name,
            price:this.price,
            supplierDetails:this.supplierDetails,
            productNumber:this.productNumber,
            englishName:this.englishName,
            stockModelID:this.stockModelID,
            stockType:this.stockType,

          }
          this.ajaxJson({
            url: '/Basic/saveModel',
            data: params,
            call: (data) => {
              if (data.type === 0) {
                this.$dialog.setReturnValue(this.id)
                this.$dialog.alert({
                  tipValue: data.message,
                  closeCallBack: () => {
                    this.$dialog.close()
                  }
                })
              }
            }
          })
        }
      }
    },
    created(){
      this.setQuery2Value('ownerID')
      this.setQuery2Value('state')
      this.init({
        url: '/Basic/initModelFrom',
        all: (data) => {
          //添加查看的时候都需要的代码

            this.fixedAssetsList = data.fixedAssetsPsd.list

            this.stockTypeList = data.stockTypePsd.list


          // this.stockType = data.stockTypePsd.value
        },
        add: (data) => {
          //添加时独有的代码
          //初始化分组成员信息
        },
        look: (data) => {
          //查看时独有的信息
          this.ownerID = data.ownerID
          this.name = data.name
          this.price = data.price
          this.supplierDetails = data.supplierDetails
          this.productNumber=data.productNumber
          this.englishName=data.englishName
          this.stockModel=data.stockModel
          this.stockModelID=data.stockModelID
          this.stockType=data.stockType
          this.state=data.state
          this.empty = this.supplierDetails.length === 0
        }
      })
    }
  }
</script>

<style scoped>

</style>
