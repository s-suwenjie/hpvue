<template>
  <div class="f_main mb35">
    <yhm-view-tab style="width:620px">
      <template #content>
        <yhm-view-tab-list>
          <template #listHead>
            <yhm-managerth style="width: 100px" title="业务相关"></yhm-managerth>
            <yhm-managerth style="width: 100px" title="待开票条数"></yhm-managerth>
            <yhm-managerth style="width: 120px" title="开票"></yhm-managerth>
          </template>
          <template #listBody>
            <tr v-for="(item,index) in list" :key="index" :class="{InterlacBg:index%2!==0}">
              <yhm-manager-td :value="item.name"></yhm-manager-td>
              <yhm-manager-td-rgt :value="item.num"></yhm-manager-td-rgt>
              <yhm-manager-td-operate>
                <yhm-manager-td-operate-button value="去开票" @click="openInvoice(item)" icon="i-interest" color="#c700df"></yhm-manager-td-operate-button>
              </yhm-manager-td-operate>
            </tr>
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
    name: 'openInvoiceNum',
    mixins: [formmixin],
    data(){
      return {
        unitID:'',
        bankDetailInsuranceNum: '',//售后回款待开发票数据
        insuranceNum: '',//保险回款待开发票数据
        workOrderNum:'',//工单数据待开发票数据
        list:[],
      }
    },
    methods: {
      openInvoice(item){
        if(item.modular == '0'){
          sessionStorage.setItem('______detailID', 'CA9221FA-ACF6-4E62-9CF7-803BE9D82B7E')
          sessionStorage.setItem('______topID', '8CAB5986-B56A-4A37-9D15-2308F99356F0')
          window.open('/home/openInvoiceManager')
        }else if(item.modular == '1'){
          sessionStorage.setItem('______detailID', '187D0134-743F-4006-B258-DBE1DB979E97')
          sessionStorage.setItem('______topID', 'C221A3BA-F9CB-45B4-91BD-FC2BC81DAC05')
          window.open('/home/BankDetailInsuranceAll')
        }else if(item.modular == '2'){
          sessionStorage.setItem('______detailID', '13A9E71B-0158-486E-89B5-EFBE6A8AA687')
          sessionStorage.setItem('______topID', '930B19B4-0C47-43E7-B20F-862531F4990C')
          window.open('/home/insuranceInvoiceManager')
        }else if(item.modular == '3'){
          sessionStorage.setItem('______detailID', 'A6E31B28-3BA0-4949-AF27-D639321BE034')
          sessionStorage.setItem('______topID', '930B19B4-0C47-43E7-B20F-862531F4990C')
          window.open('/home/workOrderInvoiceManager')
        }
        sessionStorage.setItem('______detailID', '3624B78B-74A9-4FEE-95D2-B635DFA22F61')
        sessionStorage.setItem('______topID', 'E18549B1-6425-4E8F-9523-6ABA293F51F2')
      },
      init(){
        this.list.push({
          name:'非业务开票',
          num:'---',
          modular:'0'//0非业务开票  1售后回款  2保险手续费  3工单
        })
        let params={
          id:this.unitID
        }
        this.ajaxJson({
          url: '/Fin/getUnitOpenInvoiceCount',
          data:params,
          call:(data) =>{
            if(data>0){
              this.list.push({
                name:'售后回款',
                num:data.toString(),
                modular:'1'
              })
            }
          }
        })
        this.ajaxJson({
          url: '/Insurance/getInvoiceCount',
          data:params,
          call:(data) =>{
            if(data.val>0){
              this.list.push({
                name:'保险手续费',
                num:data.val,
                modular:'2'
              })
            }
          }
        })
        this.ajaxJson({
          url: '/fix/fixOrder/queryFororderCountBycarOwnerID',
          data:{
            carOwnerID:this.unitID
          },
          call:(data) =>{
            if(data>0){
              this.list.push({
                name:'工单',
                num:data.toString(),
                modular:'3'
              })
            }
          }
        })

      },
    },
    created () {
      this.setQuery2Value('unitID');
      this.init()
    },
  }
</script>

<style scoped>

</style>
