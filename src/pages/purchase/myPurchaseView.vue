<template>
  <div class="f_main">
    <yhm-view-body>
      <template #title>基本信息</template>
      <template #body>
        <yhm-view-control title="申请人员" :content="person"></yhm-view-control>
        <yhm-view-control type="date" title="申请日期" :content="workDate"></yhm-view-control>
        <yhm-view-control title="采购分类" :psd="categoryPurchaseList" :content="categoryPurchase"></yhm-view-control>
        <yhm-view-control title="申请编号" :content="code"></yhm-view-control>
        <yhm-view-control type="date" title="预计使用日期" :content="lastDate"></yhm-view-control>
        <yhm-view-control title="采购类型" :psd="modelList" :content="model"></yhm-view-control>
      </template>
    </yhm-view-body>

    <div class="f_split"></div>

    <yhm-view-tab>
      <template #tab>
        <yhm-view-tab-button :list="tabState" :index="0">商品信息</yhm-view-tab-button>
      </template>
      <template #content>
        <yhm-view-tab-list :customize="true" :pager="false" v-show="tabState[0].select">
          <template #listHead>
            <yhm-managerth style="width: 50px" title="序号"></yhm-managerth>
            <yhm-managerth style="width: 180px" title="商品名称"></yhm-managerth>
            <yhm-managerth style="width: 200px" title="型号"></yhm-managerth>
            <yhm-managerth style="width: 90px" title="数量"></yhm-managerth>
            <yhm-managerth style="width: 60px" title="单位"></yhm-managerth>
            <yhm-managerth style="width: 90px" title="参考单价"></yhm-managerth>
            <yhm-managerth style="width: 90px" title="参考总额"></yhm-managerth>
            <yhm-managerth style="width: 200px" title="建议品牌"></yhm-managerth>
          </template>
          <template #listBody>
            <tr v-for="(item,index) in productDetails" :key="index" :class="{InterlacBg:index%2!==0}">
              <yhm-manager-td-center :value="item.num"></yhm-manager-td-center>
              <yhm-manager-td :value="item.product"></yhm-manager-td>
              <yhm-manager-td :value="item.model"></yhm-manager-td>
              <yhm-manager-td-money :value="item.quantity"></yhm-manager-td-money>
              <yhm-manager-td :value="item.unit"></yhm-manager-td>
              <yhm-manager-td-money :value="item.price"></yhm-manager-td-money>
              <yhm-manager-td-money :value="item.totalMoney"></yhm-manager-td-money>
              <yhm-manager-td :value="item.remark"></yhm-manager-td>
            </tr>
          </template>
          <template #customize>
            <yhm-view-control title="预估价值" type="money" :content="money" color="#FF0000"></yhm-view-control>
          </template>
        </yhm-view-tab-list>
      </template>
    </yhm-view-tab>
    <div v-html="approvalHtml"></div>
    <yhm-formoperate :createName="createName" :insertDate="insertDate" :updateName="updateName" :updateDate="updateDate">
      <template #btn>
        <yhm-commonbutton  v-show="btnShow" value="催促" icon="i-btn-urge" :flicker="true" @call="urge"></yhm-commonbutton>
      </template>
    </yhm-formoperate>
  </div>
</template>

<script>
  import { viewmixin } from '@/assets/view.js'
  export default {
    name: 'myPurchaseView',
    mixins: [viewmixin],
    data(){
      return {
        tabState:[{select:true}],
        person:'',
        code:'',
        workDate:'',    //申请日期
        lastDate:'',    //最后到货日期
        categoryPurchase:'',        //采购分类
        categoryPurchaseList:[],    //采购分类明细
        model:'',           //采购类型
        modelList:[],       //采购类型明细
        productDetails:[],  //商品明细
        money:'',           //预估价值
        state: '',
        isFinish : '',
        approvalHtml:'',
        btnShow:false,
      }
    },
    methods:{
      //催促
      urge(){
        if (this.isFinish === '0' && this.state !== '0') {
          if (this.id) {
            this.$dialog.confirm({
              width: 250,
              tipValue: '是否催促?',
              btnValueOk: '催促',
              btnValueCancel: '取消',
              alertImg: 'warn',
              okCallBack: () => {
                let params = {
                  id: this.id,
                  tableName: 46
                }
                this.ajaxJson({
                  url: '/PersonOffice/approvalPressVue',
                  data: params,
                  call: (data) => {
                    if (data.type === 0) {
                      this.$dialog.alert({
                        tipValue: '催促成功！'
                      })
                    }else{
                      this.$dialog.alert({
                        alertImg: 'error',
                        tipValue: '催促失败！'
                      })
                    }
                  }
                })
              }
            })
          } else {
            this.$dialog.alert({
              alertImg: 'error',
              tipValue: '请先提交申请'
            })
          }
        }
      }
    },
    created () {
        if(this.$route.query.btnType== '1'){
          this.btnShow = false
        }else{
          this.btnShow = true
        }

      this.init({
        url: '/PersonOffice/initPurchaseForm',
        call:(data)=>{
          this.person = data.person
          this.code = data.code
          this.workDate = data.workDate
          this.lastDate = data.lastDate
          this.categoryPurchase = data.categoryPurchasePsd.value
          this.categoryPurchaseList = data.categoryPurchasePsd.list
          this.model = data.modelPsd.value
          this.modelList = data.modelPsd.list
          this.productDetails = data.productDetails
          this.money = data.money
          this.state = data.state
          this.isFinish = data.isFinish
          this.approvalHtml = data.approvalHtml
        }
      })
    }
  }
</script>

<style scoped>

</style>
