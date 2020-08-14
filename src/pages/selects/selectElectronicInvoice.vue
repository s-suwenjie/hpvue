<template>
  <div class="f_main f_main_customize mb16">
    <yhm-select-body :choose="false">
      <template #operate>
        <div v-show="showTipDbSelect" class="s_db_select" :style="{left:getLeft,top:getTop}">双击选择</div>
        <yhm-commonbutton value="添加" icon="btnAdd" @call="selectAddEvent()"></yhm-commonbutton>
        <yhm-managersearch :value="searchStr" id="searchStr" @call="initData"></yhm-managersearch>
      </template>

      <template #operatergt>
        <yhm-selectrgtbox :select-count="pager.selectCount" :all-money="selectMoney"></yhm-selectrgtbox>
      </template>

      <template #listHead>
        <yhm-managerth-check v-if="selectType === '1'" is-select :check="allCheck" style="width: 40px;"></yhm-managerth-check>
        <yhm-managerth v-if="selectType === '0'" width="40" title="选择"></yhm-managerth>
        <yhm-managerth width="40" title="查看"></yhm-managerth>
        <yhm-managerth title="发票所属单位"></yhm-managerth>
        <yhm-managerth width="100" title="发票代码"></yhm-managerth>
        <yhm-managerth width="70" title="发票号码"></yhm-managerth>
        <yhm-managerth width="110" title="开票日期"></yhm-managerth>
        <yhm-managerth width="80" title="发票金额"></yhm-managerth>
        <yhm-managerth title="开票单位"></yhm-managerth>
        <yhm-managerth width="80" title="标签"></yhm-managerth>
      </template>

      <template #listBody>
        <tr v-for="(item,index) in content"
            :class="{InterlacBg:index%2!=0}"
            :key="item.id"
            @click="selectEvent(item)"
        >
          <yhm-manager-td-checkbox :value="item" :no-click="false"></yhm-manager-td-checkbox>
          <yhm-manager-td-look @click="listView(item)"></yhm-manager-td-look>
          <yhm-manager-td :value="item.selfName"></yhm-manager-td>
          <yhm-manager-td-center :value="item.code"></yhm-manager-td-center>
          <yhm-manager-td-center :value="item.num"></yhm-manager-td-center>
          <yhm-manager-td-date :value="item.openDate"></yhm-manager-td-date>
          <yhm-manager-td-money :value="item.totalMoney"></yhm-manager-td-money>
          <yhm-manager-td :value="item.otherName"></yhm-manager-td>
          <yhm-manager-td :value="item.tag"></yhm-manager-td>
        </tr>
      </template>

      <template #empty>
        <span class="m_listNoData" v-show="content.length === 0">暂时没有数据</span>
      </template>
      <template #pager>
        <yhm-pagination is-not-right :pager="pager" isPageSize="false" @initData="initPageData(false)"></yhm-pagination>
        <yhm-commonbutton class="mr0" icon="i-complete" value="确定" category="two" @call="selectConfirmEvent()"></yhm-commonbutton>
      </template>
    </yhm-select-body>

  </div>
</template>
<script>
  import { accAdd } from '@/assets/common.js'
  import { selectmixin } from '@/assets/select.js'
  export default {
    name: 'selectElectronicInvoice',
    mixins: [selectmixin],
    data() {
      return {
        relevanceID:'',
        relevanceType:'',
        state: '',
        clickIndex: 0,
        list: [],
        selectMoney: 0,
      }
    },
    methods: {
      //当选择的项发生改变的时候触发的函数
      totalMethod(){
        this.selectMoney = 0
        if(this.selectValue.length > 0){
          for (var j = 0; j < this.selectValue.length; j++){
            let id = Object.keys(this.selectValue[j])[0]
            let money = this.selectValue[j][id].totalMoney
            this.selectMoney = accAdd(this.selectMoney,money)
            // console.log(this.selectValue[j][id].totalMoney)
            // console.log(id)
            // console.log(this.selectValue[id])
            // console.log(this.selectValue)
          }
        }
      },
      listView(item){
        this.$dialog.OpenWindow({
          width: 1050,
          height: 740,
          url:'/myElectronicInvoiceForm?id=' + item.id,
          title: '查看电子发票',
          closeCallBack: (data)=>{

          }
        })
      },
      initChoose (op) {
        this.pager.pageIndex = 1
        if (op === 'category') {
          this.selectValue = []
        }
        this.initPageData(false)
      },
      selectAddEvent () {
        this.$dialog.OpenWindow({
          width: '1050',
          height: '740',
          url: '/myElectronicInvoiceForm',
          title: '添加电子发票信息',
          closeCallBack: (data)=>{
            this.searchStr = data
            this.initPageData(false)
          }
        })
      },
      initPageData(initValue){
        let params = {}
        if (initValue) {
          // 页面初始化是需要的参数
          params = {
            // category: this.listCategory.value,
            state: this.state,
            relevanceID: this.relevanceID,
            relevanceType: this.relevanceType
          }
        } else {
          // 页面非初始化时需要的参数
          params = {
            state: this.state,
            relevanceID: this.relevanceID,
            relevanceType: this.relevanceType
          }
        }
        this.init({
          initValue: initValue,
          url: '/Fin/getElectronicInvoiceSelect',
          data: params,
          all: (data) => {
            // 不管是不是初始化都需要执行的代码
            if(this.allCheck){
              for(let i in this.content){
                let id = this.content[i].id
                let sign = true
                if(this.selectValue.length > 0){
                  for (var j = 0; j < this.selectValue.length; j++){
                    if(Object.keys(this.selectValue[j])[0] === id) {
                      sign = false
                      break;
                    }
                  }
                }
                if(sign) {
                  let val = {}
                  val[id] = this.content[i]
                  this.selectValue.push(val)
                }
              }
            }
            else{
              let check = true
              for(let i in this.content){
                let id = this.content[i].id
                let sign = false
                if(this.selectValue.length > 0){
                  for (var j = 0; j < this.selectValue.length; j++){
                    if(Object.keys(this.selectValue[j])[0] === id){
                      sign = true
                    }
                  }
                }
                if(!sign){
                  check = false
                }
              }
              this.allCheck = check
            }
          },
          init: (data) => {
            // 初始化时需要执行的代码
            // this.listCategory = data.listCategory

            // for(let i in this.content){
            //   this.allMoney += parseFloat(this.content[i].totalMoney)
            // }


          }
        })
      },

    },
    created () {
      this.setQuery2Value('relevanceID')
      this.setQuery2Value('relevanceType')
      this.setQuery2Value('state')
      if(this.selectType === '1'){
        this.allCheck = true
      }
    },
    watch: {
      content(){
        if(this.content.length === 0){
          this.$dialog.OpenWindow({
            width: '1050',
            height: '740',
            url: '/myElectronicInvoiceForm',
            title: '添加电子发票信息',
            closeCallBack: (data)=>{
              // this.searchStr = data
              // this.initPageData(false)
            }
          })
        }else{

        }
      }
    }
  }
</script>

<style scoped>

</style>

