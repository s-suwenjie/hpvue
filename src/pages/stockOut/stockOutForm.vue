<template>
  <div class="f_main">
    <yhm-formbody>
      <template #title>基本信息</template>
      <template #control>
        <yhm-form-radio title="商品类型" :no-edit="categoryNoEdit" :select-list="categoryList" @call="motorcycleTypeRadio" :value="category" id="category"></yhm-form-radio>
        <yhm-form-text title="出库编号" no-edit="1" :value="code" id="code"></yhm-form-text>
        <yhm-form-radio title="适用车型" width="1" @call="motorcycleTypeRadio" :select-list="applicableModelsList" :value="applicableModels" id="applicableModels"></yhm-form-radio>
        <yhm-form-date title="出库日期" :min="minWorkDate" :value="workDate" id="workDate" rule="R0000"></yhm-form-date>
        <yhm-form-select title="出库人员" @click="selectWareHouser" @clear="clearWareHouser()" :value="wareHouser" id="wareHouser" rule="R0000"></yhm-form-select>
      </template>
    </yhm-formbody>
    <yhm-form-list-show style="margin-top: 20px;" v-show="detailsShow">
      <template #title>出库详情</template>
      <template #operate>
        <yhm-commonbutton value="添加" v-show="state=='0'?true:false" icon="btnAdd" @call="addDetail()" category="three"></yhm-commonbutton>
      </template>
      <template #listHead>
        <yhm-managerth style="width: 38px" title="查看"></yhm-managerth>
        <yhm-managerth title="商品名称"></yhm-managerth>
        <yhm-managerth style="width: 120px" title="规格型号"></yhm-managerth>
        <yhm-managerth style="width: 120px" title="数量"></yhm-managerth>
        <yhm-managerth style="width: 180px;" title="单价"></yhm-managerth>
        <yhm-managerth style="width: 120px;" title="总价"></yhm-managerth>
        <yhm-managerth style="width: 80px;" title="含税单价"></yhm-managerth>
        <yhm-managerth style="width: 120px;" title="含税总价"></yhm-managerth>
        <yhm-managerth style="width: 38px;" title="删除"></yhm-managerth>
      </template>
      <template #listBody>
        <tr v-for="(item,index) in detailList" :class="[{InterlacBg:index%2!=0}]" :key="item.id">
          <yhm-manager-td-look @click="listView(item)"></yhm-manager-td-look>
          <yhm-manager-td :value="item.product"></yhm-manager-td>
          <yhm-manager-td :value="item.model"></yhm-manager-td>
          <yhm-manager-td-center :value="item.quantity+''"></yhm-manager-td-center>
          <yhm-manager-td-money :value="item.price+''"></yhm-manager-td-money>
          <yhm-manager-td-money :value="item.totalPrice+''"></yhm-manager-td-money>
          <yhm-manager-td-money :value="item.priceTax+''"></yhm-manager-td-money>
          <yhm-manager-td-money :value="item.totalPriceTax+''"></yhm-manager-td-money>

          <yhm-manager-td-operate>
            <yhm-manager-td-operate-delete :no-click="state!=='0'?true:false" @click="delFromList(item.id)"></yhm-manager-td-operate-delete>
          </yhm-manager-td-operate>
        </tr>
      </template>
      <template #empty>
        <span class="m_listNoData" v-show="empty">暂时没有数据</span>
      </template>

    </yhm-form-list-show>
    <yhm-formoperate>
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
    name: "stockOutForm",
    mixins: [formmixin],
    data(){
      return{
        quantity:'10',//数量
        price:'123',//单价
        category: '0',
        categoryList: [
          {
            code: "",
            img: "",
            num: "0",
            showName:'精品'
          },
          {
            code: "",
            img: "",
            num: "1",
            showName:'零部件'
          },
          {
            code: "",
            img: "",
            num: "2",
            showName:'整车'
          },
          {
            code: "",
            img: "",
            num: "3",
            showName:'行政'
          },
        ],
        applicableModels:'0',
        applicableModelsList:[
          {
            code: "",
            img: "",
            num: "0",
            showName:'阿尔法罗密欧'
          },
          {
            code: "",
            img: "",
            num: "1",
            showName:'特斯拉'
          },
          {
            code: "",
            img: "",
            num: "2",
            showName:'韩国现代'
          },
          {
            code: "",
            img: "",
            num: "3",
            showName:'异系'
          },
          {
            code: "",
            img: "",
            num: "4",
            showName:'所有'
          },
        ],
        minWorkDate:'',
        workDate:'',            //出库日期
        wareHouserId:'',        //出库人ID
        wareHouser:'',          //出库人员
        code:'RK200529JP003A',  //出库编号
        state:'',
        detail: [], // 列表数据
        detailsShow:false,//出库详情显示隐藏
        detailList:[
          {
            id:'1',
            product:'sad',
            model:'000',
            quantity:'123',
            price:'1123',
            totalPrice:'23232',
            priceTax:'2343',
            totalPriceTax:'344',
          },
          {
            id:'2',
            product:'sad',
            model:'000',
            quantity:'123',
            price:'1123',
            totalPrice:'23232',
            priceTax:'2343',
            totalPriceTax:'344',
          },
          {
            id:'3',
            product:'sad',
            model:'000',
            quantity:'123',
            price:'1123',
            totalPrice:'23232',
            priceTax:'2343',
            totalPriceTax:'344',
          },
        ],//出库详情列表
        empty:false,
        categoryNoEdit:false,
      }
    },
    created() {
      this.setQuery2Value('type')
      this.setQuery2Value('id')
      let data=new Date()
      this.workDate=formatDate(new Date((new Date()).getTime()))
      this.minWorkDate=this.workDate

    },
    methods:{
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
          call: (data) => {
            this.code = data.message

          }
        })
      },
      //----------------------
      selectWareHouser(){
        this.$dialog.OpenWindow({
          width: 950,
          height: 692,
          url: "/selectPerson?category=0&categoryBefore=1",
          title: "选择出库人员",
          closeCallBack: (data) => {
            this.wareHouser = data.name
            this.wareHouserId = data.id
          }
        })
      },
      //添加--------------------
      addDetail(){
        this.$dialog.OpenWindow({
          width: 1050,
          height: 610,
          url: '/stockOutDetailsForm?type=1&ownerID='+this.id,
          title: '添加出库详情'
        })
      },

      //----------------------
      save(){
        console.log(this.wareHouserId)
        this.detailsShow=true
        this.state=0
        let a=this.validator()
        if(a) {
          let params = {
            category: this.category,
            workDate: this.workDate,
            id: guid(),
            code:this.code,
            applicableModels:this.applicableModels,
            wareHouserId:this.wareHouserId,
          }
          this.ajaxJson({
            url: '/stock/stockout/saveStockout',
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
    //  --------------------删除

    },
    clearWareHouser(){
      console.log('111');
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
  }
</script>

<style scoped>

</style>
