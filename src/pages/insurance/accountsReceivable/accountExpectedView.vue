<template>
  <div class="f_main">
    <yhm-view-tab>
      <template #tab>
        <div style="font-size: 16px;" @click="listUnitView"> 保险公司:{{unit}}</div>
        <yhm-form-text :icon-shou="true"  color="#666666" @call="unitDetails" title="来往明细" subtitle="" value="" id="person"  no-edit="1"></yhm-form-text>
      </template>
      <template #content>
        <yhm-view-tab-list :customize="true" :pager="true" customize-bg-color="#e2f1f0" v-show="tabState[0].select">
          <template #listHead>
            <yhm-managerth  style="width: 160px;" title="活动启用时间"></yhm-managerth>
            <yhm-managerth  title="保险公司返利"></yhm-managerth>
            <yhm-managerth  title="三方服务费返利"></yhm-managerth>
            <yhm-managerth  title="交强险返利"></yhm-managerth>
            <yhm-managerth  title="总计应返利金额"></yhm-managerth>
          </template>
          <template #listBody>
            <tr v-for="(item,index) in listProfit" :key="index" :class="{InterlacBg:index%2!==0}">
              <yhm-manager-td-date :value="item.time"></yhm-manager-td-date>

              <yhm-manager-td-center style="text-align: center;"  v-html="item.commercialOne"></yhm-manager-td-center>
              <yhm-manager-td-center style="text-align: center;"  v-html="item.commercialTwo"></yhm-manager-td-center>
              <yhm-manager-td-center style="text-align: center;"  v-html="item.toPayHigh"></yhm-manager-td-center>
              <yhm-manager-td-money :style="{color:'#2C9208'}" :value="item.quotaMoney"></yhm-manager-td-money>
            </tr>
          </template>
          <template #customize>
            <span class="customizeSpan" >计算金额：</span>
            <yhm-view-control color="#972CB1" class="moneyBorder" type="money" category="1" title="商业险金额①" :content="commercialOne" ></yhm-view-control>
            <yhm-view-control color="#0c8484" class="moneyBorder" type="money" category="1" title="商业险金额②" :content="commercialTwo"></yhm-view-control>
            <yhm-view-control color="#0808D6" class="moneyBorder" type="money" category="1" title="交强险返利金额" :content="toPayHigh"></yhm-view-control>
            <yhm-view-control color="#2C9208" class="moneyBorder" type="money" category="1" title="总计金额" :content="quotaMoney"></yhm-view-control>
          </template>
        </yhm-view-tab-list>
      </template>
    </yhm-view-tab>
  </div>
</template>

<script>
  import { viewmixin } from '@/assets/view.js'
  export default {
    name: 'accountExpectedView',
    mixins: [viewmixin],
    data(){
      return{
        id:'',
        tabState:[{select:true}],

        listPolicy:[],
        deatails:[],
        listProfit:[],
        quotaMoney:'',
        unit:"",
        unitID:'',
        commercialOne:'',
        commercialTwo:'',
        toPayHigh:'',

      }
    },
    computed:{
    },
    methods:{
      unitDetails(){
        this.$dialog.OpenWindow({
          width: '1050',
          height: '550',
          url:'/unitDatailsView?id=' + this.unitID,
          title:'查看单位来往明细',
          closeCallBack:(data) =>{
            if(data){
              this.initPageData(false)
            }
          }
        })
      },
     listUnitView(){
        this.$dialog.OpenWindow({
          width: '1050',
          height: '690',
          url:'/unitView?id=' + this.unitID,
          title:'查看单位信息',
          closeCallBack:(data) =>{
            if(data){
              this.initPageData(false)
            }
          }
        })
      },
      initData(){
        let params = {
          id: this.id,
        }
        let sum=0
        this.init({
          url: '/Insurance/initAccountDetailsForm',
          data: params,
          call: (data) => {

            this.listProfit=data.listProfit
            this.deatails=data.deatails

            for(let i in this.listProfit){
              this.unit=this.listProfit[i].unit
              this.unitID=this.listProfit[i].unitID
              this.quotaMoney=this.listProfit[i].quotaMoney
            }

            for (let i in  this.deatails){
              this.commercialOne=(data.businessMoney/this.deatails[i].one*(this.deatails[i].two/100)).toFixed(2)+''
              this.commercialTwo=(data.businessMoney/this.deatails[i].one*(this.deatails[i].three/100)*(this.deatails[i].four/100)).toFixed(2)+''
              this.toPayHigh=(data.forceMoney/this.deatails[i].one*(this.deatails[i].fives/100)).toFixed(2)+''
            }

            for(let i in this.listPolicy){
              sum +=  parseFloat(this.listPolicy[i].money)
            }

          },
        })
      },
    },

    created () {
      this.setQuery2Value('id')
      this.initData()
    },
  }
</script>

<style lang="less" scoped>

.customizeSpan{
  padding-left: 24px;
  width: 204px;
  display: flex;
  text-align: center;
  align-items: center;
  font-weight: bold;
  font-size: 14px;
  color: #666666;
  border: 1px solid #bfbfbf;
  border-left: 0;
}
  .moneyBorder{
    border: 1px solid #bfbfbf;
    padding: 0 16px;
    margin: 0;
    height: 35px;
    box-sizing: border-box;
    border-left: 0;
    line-height: 0;
  }
</style>
