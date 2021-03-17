<template>
  <div class="f_main mb35">
    <yhm-view-tab style="width:820px">
      <template #content>
        <yhm-view-tab-list>
          <template #listHead>
            <yhm-managerth style="width: 40px" title="查看"></yhm-managerth>
            <yhm-managerth style="width: 100px" title="本金"></yhm-managerth>
            <yhm-managerth style="width: 120px" title="本金入账"></yhm-managerth>
            <yhm-managerth style="width: 100px" title="利息"></yhm-managerth>
            <yhm-managerth style="width: 120px" title="利息入账"></yhm-managerth>
            <yhm-managerth style="width: 100px" title="本息和"></yhm-managerth>
            <yhm-managerth style="width: 120px" title="本息和入账"></yhm-managerth>
          </template>
          <template #listBody>
            <tr v-for="(item,index) in redeemList" :key="index" :class="{InterlacBg:index%2!==0}">
              <yhm-manager-td-look @click="look(item)"></yhm-manager-td-look>
              <yhm-manager-td-money :value="item.principal"></yhm-manager-td-money>
              <yhm-manager-td-operate>
                <yhm-manager-td-operate-button :no-click="item.principalState=='1'||item.principal=='0'" @click="principalEntry(item)" value="本金入账" icon="i-interest" color="#c700df"></yhm-manager-td-operate-button>
              </yhm-manager-td-operate>
              <yhm-manager-td-money :value="item.interest"></yhm-manager-td-money>
              <yhm-manager-td-operate>
                <yhm-manager-td-operate-button :no-click="item.interestState=='1'||item.interest=='0'" @click="interestEntry(item)" value="利息入账" icon="i-interest" color="#c700df"></yhm-manager-td-operate-button>
              </yhm-manager-td-operate>
              <yhm-manager-td-money :value="item.principalInterest"></yhm-manager-td-money>
              <yhm-manager-td-operate>
                <yhm-manager-td-operate-button :no-click="item.principalInterestState=='1'||item.principalInterest=='0'" @click="principalInterestEntry(item)" value="利息入账" icon="i-interest" color="#c700df"></yhm-manager-td-operate-button>
              </yhm-manager-td-operate>
            </tr>
          </template>
          <template #empty>
            <span class="m_listNoData" v-show="redeemList.length===0">暂时没有数据</span>
          </template>
        </yhm-view-tab-list>
      </template>
    </yhm-view-tab>
  </div>
</template>

<script>
  import { accMul, accAdd, guid, formatDate, number2chinese,formatTime} from '@/assets/common.js'
  import { formmixin } from '@/assets/form.js'
  export default {
    name: 'conductFinEntry',
    mixins: [formmixin],
    data(){
      return{
        ownerID:'',
        redeemList:[],
      }
    },
    created(){

      this.setQuery2Value('ownerID')
      this.init()
    },
    methods:{
      //本金入账
      principalEntry(item){
        this.$dialog.OpenWindow({
          width: '1050',
          height: '690',
          title: '本金入账',
          url: '/bankDetailForm?ownerID=' + item.id +'&bankDetailType=9&directionBefore=1',
          closeCallBack: (data)=>{
            if(data){
              this.$dialog.setReturnValue('1')
              this.init()
            }
          }
        })
      },
      //利息入账
      interestEntry(item){
        this.$dialog.OpenWindow({
          width: '1050',
          height: '690',
          title: '利息入账',
          url: '/bankDetailForm?ownerID=' + item.id +'&bankDetailType=10&directionBefore=1',
          closeCallBack: (data)=>{
            if(data){
              this.$dialog.setReturnValue('1')
              this.init()
            }
          }
        })
      },
      //本息和入账
      principalInterestEntry(item){
        this.$dialog.OpenWindow({
          width: '1050',
          height: '690',
          title: '本息和入账',
          url: '/bankDetailForm?ownerID=' + item.id +'&bankDetailType=14&directionBefore=1',
          closeCallBack: (data)=>{
            if(data){
              this.$dialog.setReturnValue('1')
              this.init()
            }
          }
        })
      },
      look(item){
        this.$dialog.OpenWindow({
          width: 1050,
          height: 640,
          url: '/conductFinRedeemForm?id='+item.id,
          title: '查看赎回信息',
          closeCallBack: (data) => {
            if(data){
              this.init()
            }
          }
        })
      },
      init(){
        let params={
          ownerID:this.ownerID
        }
        this.ajaxJson({
          url: '/Fin/bankProductRedeemList',
          data: params,
          call: (data) => {
            this.redeemList=data
          }
        })
      }
    }
  }
</script>

<style scoped>

</style>
