<template>
  <div class="f_main">
    <yhm-view-tab>
      <template #tab>
        <yhm-view-tab-button :list="tabState" :index="0" v-if="isExpect">预计盈亏</yhm-view-tab-button>
        <yhm-view-tab-button :list="tabState" :index="0" v-if="isRate">实时盈亏</yhm-view-tab-button>
      </template>
      <template #content>
        <yhm-view-tab-list :customize="true" :pager="true" v-show="tabState[0].select">
          <template #listHead>
            <yhm-managerth style="width: 80px;" title="状态"></yhm-managerth>
            <yhm-managerth style="width: 80px;" title="收支方向"></yhm-managerth>
            <yhm-managerth title="公司名称"></yhm-managerth>
            <yhm-managerth title="公司账户"></yhm-managerth>
            <yhm-managerth title="对方账户名称"></yhm-managerth>
            <yhm-managerth title="对方账户"></yhm-managerth>
            <yhm-managerth style="width: 100px;" title="交易金额(+/-)"></yhm-managerth>
          </template>
          <template #listBody>
            <tr v-for="(item,index) in listPolicy" :key="index" :class="{InterlacBg:index%2!==0}">
              <yhm-manager-td :class="{'abackground':item.stateClue==='2','bbackground':item.stateClue==='3'}"  :value="item.stateName "></yhm-manager-td>
              <yhm-manager-td-direction :class="{'abackground':item.stateClue==='2','bbackground':item.stateClue==='3'}" class="dfJcc" :direction="item.direction" :value="item.direction" :dir-val="false"></yhm-manager-td-direction>
              <yhm-manager-td :class="{'abackground':item.stateClue==='2','bbackground':item.stateClue==='3'}" :tip="true" node-class-name="f_main" :value="item.ownAccountName"></yhm-manager-td>
              <yhm-manager-td :class="{'abackground':item.stateClue==='2','bbackground':item.stateClue==='3'}" :tip="true" node-class-name="f_main" :value="item.ownAccount"></yhm-manager-td>
              <yhm-manager-td :class="{'abackground':item.stateClue==='2','bbackground':item.stateClue==='3'}" :tip="true" node-class-name="f_main" :value="item.otherAccountName"></yhm-manager-td>
              <yhm-manager-td :class="{'abackground':item.stateClue==='2','bbackground':item.stateClue==='3'}" :tip="true" node-class-name="f_main" :value="item.otherAccount"></yhm-manager-td>
              <yhm-manager-td-money :class="{'abackground':item.stateClue==='2','bbackground':item.stateClue==='3'}" :value="item.bankMoney "  :style="{color: item.bankMoney>=0?'#0EBE0E':'#FF0000'}"></yhm-manager-td-money>
            </tr>
          </template>
          <template #customize >
            <div class="flex" v-if="isExpect">
                <div class="money" >
                  <span @click="listRealView" style="font-weight: bold; color: #2F54EB">实时盈亏 / 比例 : </span>
                  <span @click="listRealView" :class="{'colorF00':parseFloat(sumMoney)>=0,'policyColor':parseFloat(sumMoney)<0}"> {{sumMoneyProportion}}/ ￥</span>
                  <span @click="listRealView" v-html="getCOntent" :class="{'colorF00':parseFloat(sumMoney)>=0,'policyColor':parseFloat(sumMoney)<0}"></span>

                </div>
                <div class="money">
                  <span @click="listExpectedView" style="font-weight: bold;  color: #d618ab">预计盈亏 / 比例 : </span>
                  <span @click="listExpectedView" :class="{'colorF00':parseFloat(profitAndLossMoney)>=0,'policyColor':parseFloat(profitAndLossMoney)<0}"> {{profitAndLossProportion}}/￥  </span>
                  <span @click="listExpectedView" v-html="getCOntent3" :class="{'colorF00':parseFloat(profitAndLossMoney)>=0,'policyColor':parseFloat(profitAndLossMoney)<0}"></span>

                </div>
            </div>

            <div class="flex" v-if="isRate">

              <div class="money">
                <span @click="listExpectedView" style="font-weight: bold; color: #d618ab">预计盈亏 / 比例 : </span>
                <span @click="listExpectedView" :class="{'colorF00':parseFloat(profitAndLossMoney)>=0,'policyColor':parseFloat(profitAndLossMoney)<0}">{{profitAndLossProportion}} / ￥</span>
                <span @click="listExpectedView" v-html="getCOntent3" :class="{'colorF00':parseFloat(profitAndLossMoney)>=0,'policyColor':parseFloat(profitAndLossMoney)<0}"></span>

              </div>

              <div class="money" >
                <span  @click="listRealView" style="font-weight: bold;  color: #2F54EB">实时盈亏 / 比例 : </span>
                <span @click="listRealView" :class="{'colorF00':parseFloat(sumMoney)>=0,'policyColor':parseFloat(sumMoney)<0}">{{sumMoneyProportion}} / ￥</span>
                <span @click="listRealView" v-html="getCOntent" :class="{'colorF00':parseFloat(sumMoney)>=0,'policyColor':parseFloat(sumMoney)<0}"></span>

              </div>
            </div>
          </template>
        </yhm-view-tab-list>
      </template>
    </yhm-view-tab>
  </div>
</template>

<script>
  import { viewmixin } from '@/assets/view.js'
  import {tenThousandFormatHtml}  from '@/assets/common.js'
  import { accAdd } from '../../../assets/common'
  export default {
    name: 'policyExpectedView',
    mixins: [viewmixin],
    data(){
      return{
        id:'',
        tabState:[{select:true}],
        arrIndex:[],
        arr:[],
        listReal:false,
        listExpected:false,
        listPolicy:[],
        listClue:[],
        listProfit:[],
        // quotaMoney:'',
        profitAndLossMoney:'',
        profitAndLossProportion:'',

        sumMoney:'',  //实时盈亏
        sumMoneyProportion:'', //实时盈亏比例
        cashObjectVal:'',
        isExpect: true,
        isRate:false,


      }
    },
    computed:{
      getCOntent(){
        return tenThousandFormatHtml(this.sumMoney)
      },
      getCOntent3(){
        return tenThousandFormatHtml(this.profitAndLossMoney)
      }
    },
    methods:{
      listExpectedView(){

        if(!this.listReal){
          for(let i in this.arr){
            this.listPolicy.push(this.arr[i])
          }
          this.arr = []
          this.listReal = true
          this.isExpect=true
          this.isRate=false
        }
      },
      listRealView(){
        for(let i in this.listPolicy){
          if(this.listPolicy[i].stateClue==2||this.listPolicy[i].stateClue==3){
            this.arrIndex.push({'index':i})
            this.arr.push(this.listPolicy[i])
            this.listReal = true
          }
        }
        if(this.arrIndex.length == 0){
          this.listReal = false
          for(let i in this.arr){
            this.listPolicy.push(this.arr[i])
            this.isExpect=true
            this.isRate=false
          }
          this.arr = []
          this.listReal = true
        }else{
          this.listReal = true
        }
        if(this.listReal){
          if(this.arrIndex.length==2){
            // for(let j in this.arrIndex){
              // alert(this.arrIndex[j])
              this.listPolicy.splice(this.arrIndex[0].index,this.arrIndex.length)
            // }
            // this.listPolicy.splice(this.listPolicy.length-2,2)
            this.arrIndex = []
            this.listReal = false
            this.isExpect=false
            this.isRate=true
          }else if(this.arrIndex.length==1){
            // for(let j in this.arrIndex){
            //   this.listPolicy.splice(this.arrIndex[j].index,1)
            // }
            this.listPolicy.splice(this.arrIndex[0].index,this.arrIndex.length)

            // this.listPolicy.splice(this.listPolicy.length-1,1)
            this.arrIndex = []
            this.listReal = false
            this.isExpect=false
            this.isRate=true
          }
        }
      },
      initData(){
        let params = {
          id: this.id,
        }
        let sum=0
        this.init({
          url: '/Insurance/initPolicyDetailsForm',
          data: params,
          call: (data) => {
            this.cashObjectVal=data.cashObjectVal
            this.listPolicy=data.deatails
            this.listProfit=data.listProfit

            for(let i in this.listPolicy){
              if (this.listPolicy[i].stateClue==='0' ||this.listPolicy[i].stateClue==='1' ){
                sum = accAdd(parseFloat(this.listPolicy[i].bankMoney),sum)
              }
            }
            this.sumMoney = sum  + '' //计算实际金额
            if (data.cash==='0'){
                this.sumMoneyProportion=((this.sumMoney/data.invoicingMoney)*100).toFixed(2) + '%'
            } else {
              this.sumMoneyProportion=((this.sumMoney/data.receivedMoney)*100).toFixed(2) + '%'
            }
            let a=0.00
            for(let i in this.listPolicy){
              if(this.listPolicy[i].direction=='1'){
                a=accAdd(this.listPolicy[i].bankMoney,a)
              }
            }

            for (let i=0; i<this.listProfit.length; i++){
              //计算保险公司优惠定额(应收账款)
              // this.quotaMoney= (this.listProfit[i].totalMoney * (this.
              // listProfit[i].clientRate/100)).toFixed(2) + ''
              //计算实际金额 (预计盈亏)
               this.profitAndLossMoney=(this.listProfit[i].quotaMoney-this.listProfit[i].discountMoney).toFixed(2) +''


              this.profitAndLossProportion =((parseFloat(this.profitAndLossMoney) /  Math.abs(accAdd(Math.abs (a),this.listPolicy[this.listPolicy.length-1].bankMoney*-1) )) *100 ) .toFixed(2) +'%'

              //计算实际金额盈亏比例
              //his.profitAndLossProportion = (((this.listProfit[i].totalMoney * (this.listProfit[i].clientRate/100))-this.listProfit[i].discountMoney) / this.listProfit[i].totalMoney *100 ).toFixed(2) + '%'
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
  .flex{
    width: 100%;
    height: 40px;
    align-items: center;
    display: flex;
    justify-content: space-between;
    padding: 5px;
    /*color: #666;*/
    font-size: 14px;
    .money{
      margin-right: 10px;
    }
  }
  .colorF00{
    color:#4BB414;
  }
  .policyColor{
    color: #f00;
  }
.abackground{
  background: #ffa5a030 ;
}
.bbackground{
    background: #37de5330;
  }
</style>
