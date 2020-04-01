<template>
  <div class="f_main f_main_customize mb16">
    <yhm-select-body :choose="false">
      <template #operate>
        <div v-show="showTipDbSelect" class="s_db_select" :style="{left:getLeft,top:getTop}">双击选择</div>
        <yhm-commonbutton v-if="getName(['49'])" value="添加" icon="btnAdd" @call="selectAddOpenBank"></yhm-commonbutton>
        <yhm-commonbutton v-if="getName(['89'])" value="添加" icon="btnAdd" @call="selectAddOpenColour"></yhm-commonbutton>
        <yhm-commonbutton v-if="getName(['90'])" value="添加" icon="btnAdd" @call="selectAddOpenBrand"></yhm-commonbutton>
        <yhm-commonbutton v-if="getName(['91'])" value="添加" icon="btnAdd" @call="selectAddOpenModel"></yhm-commonbutton>
        <yhm-commonbutton v-if="getName(['92'])" value="添加" icon="btnAdd" @call="selectAddOpenVersion"></yhm-commonbutton>
        <yhm-managersearch :value="searchStr" id="searchStr" @call="initData"></yhm-managersearch>
      </template>


      <template #listHead>
        <yhm-managerth width="40" title="选择"></yhm-managerth>

        <template v-if="getName(['1'])">
          <yhm-managerth title="权限名称"></yhm-managerth>
        </template>
        <template v-if="getName(['3'])">
          <yhm-managerth title="计量单位"></yhm-managerth>
        </template>
        <template v-if="getName(['9'])">
          <yhm-managerth title="货币类型"></yhm-managerth>
          <yhm-managerth title="货币代码"></yhm-managerth>
        </template>
        <template v-if="getName(['49'])">
          <yhm-managerth width="520" title="银行名称"></yhm-managerth>
          <yhm-managerth title="所属银行"></yhm-managerth>
          <yhm-managerth title="银行代码"></yhm-managerth>
        </template>
        <template v-if="getName(['11','63','65','64','62'])">
          <yhm-managerth title="一级分类"></yhm-managerth>
          <yhm-managerth title="二级分类"></yhm-managerth>
          <yhm-managerth title="三级分类"></yhm-managerth>
        </template>
        <template v-if="getName(['66'])">
          <yhm-managerth title="账户名称"></yhm-managerth>
        </template>
        <template v-if="getName(['69'])">
          <yhm-managerth title="民族"></yhm-managerth>
        </template>
        <template v-if="getName(['71'])">
          <yhm-managerth title="血型"></yhm-managerth>
        </template>
        <template v-if="getName(['89'])">
          <yhm-managerth title="车辆颜色"></yhm-managerth>
        </template>
        <template v-if="getName(['90'])">
          <yhm-managerth title="车辆品牌"></yhm-managerth>
        </template>
        <template v-if="getName(['91'])">
          <yhm-managerth title="车型"></yhm-managerth>
        </template>
        <template v-if="getName(['92'])">
          <yhm-managerth title="型号"></yhm-managerth>
        </template>
        <template v-if="getName(['93'])">
          <yhm-managerth title="一级分类"></yhm-managerth>
          <yhm-managerth title="二级分类"></yhm-managerth>
        </template>

      </template>

      <template #listBody>
        <tr v-for="(item,index) in content"
            :class="{InterlacBg:index%2!=0}"
            :key="item.id"
            @click="selectEvent(item)"
            @dblclick="dblclickEvent(item)"
            @mousemove="mousemoveEvent"
            @mouseover="mouseoverEvent"
            @mouseout="mouseoutEvent">
          <yhm-manager-td-checkbox :no-click="false" :value="item"></yhm-manager-td-checkbox>

          <template v-if="!getName(['49'])">
            <yhm-manager-td :value="item.showName"></yhm-manager-td>
          </template>

          <template v-if="getName(['1','69','71'])">
          </template>

          <template v-if="getName(['49'])">
<!--            <td class="tdDicImg">-->
<!--              <span><img :src="'/UpLoadFile/BankLogo/'+item.value5" alt=""></span>-->
<!--              <span>{{item.showName}}</span>-->
<!--            </td>-->
            <yhm-manager-td-logo :value="item.showName" tag="BankLogo" :logo="item.value5"></yhm-manager-td-logo>
            <yhm-manager-td :value="item.value2"></yhm-manager-td>
            <yhm-manager-td :value="item.value3"></yhm-manager-td>
          </template>

          <template v-if="getName(['11','63','65','64','62'])">
            <yhm-manager-td :value="item.value1"></yhm-manager-td>
            <yhm-manager-td :value="item.value2"></yhm-manager-td>
          </template>
          <template v-if="getName(['9'])">
            <yhm-manager-td :value="item.value1"></yhm-manager-td>
          </template>
          <template v-if="getName(['93'])">
            <yhm-manager-td :value="item.value1"></yhm-manager-td>
          </template>

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

  import { selectmixin } from '@/assets/select.js'
  export default {
    name: 'selectPerson',
    mixins: [selectmixin],
    data() {
      return {
        categoryBefore: '0', // 单位按钮是否可以切换(0表示能切换,1表示不能切换)
        name: '',
        value12: '',
        brandOwnerID:'',
      }
    },
    methods: {
      selectAddOpenBank(){
        this.$dialog.OpenWindow({
          width: '1050',
          height: '480',
          title: '添加开户行',
          url: '/openBankForm',
          closeCallBack: (data)=>{
            this.initPageData(false)
          }
        })
      },
      selectAddOpenColour(){
        this.$dialog.OpenWindow({
          width: '1050',
          height: '400',
          title: '添加车辆颜色',
          url: '/dicForm089',
          closeCallBack: (data)=>{
            this.initPageData(false)
          }
        })
      },
      selectAddOpenBrand(){
        this.$dialog.OpenWindow({
          width: '1050',
          height: '400',
          title: '添加车辆品牌',
          url: '/dicForm090',
          closeCallBack: (data)=>{
            this.initPageData(false)
          }
        })
      },
      selectAddOpenModel(){
        this.$dialog.OpenWindow({
          width: '1050',
          height: '400',
          title: '添加车型',
          url: '/saveModelForm',
          closeCallBack: (data)=>{
            this.initPageData(false)
          }
        })
      },
      selectAddOpenVersion(){
        this.$dialog.OpenWindow({
          width: '1050',
          height: '400',
          title: '添加车型',
          url: '/saveVersionForm?brandOwnerID='+this.brandOwnerID,
          closeCallBack: (data)=>{
            this.initPageData(false)
          }
        })
      },

      initChoose (op) {
        this.pager.pageIndex = 1
        if (op === 'category') {
          this.selectValue = []
        }
        this.initPageData()
      },

      initPageData(initValue){
        let params = {}
        if (initValue) {
          // 页面初始化是需要的参数
          params = {
            name: this.name,
            value12: this.value12
          }
        } else {
          // 页面非初始化时需要的参数
          params = {
            name: this.name,
            value12: this.value12
          }
        }
        this.init({
          initValue: initValue,
          url: '/Com/selectDicJson',
          data: params,
          all: (data) => {
            // 不管是不是初始化都需要执行的代码
          },
          init: (data) => {

            // 初始化时需要执行的代码
            this.listCategory = data.listCategory

          }
        })
      },
    },
    created () {
      this.setQuery2Value('categoryBefore')
      this.setQuery2Value('name')
      this.setQuery2Value('value12')
      this.setQuery2Value('brandOwnerID')

    },
    computed: {
      getName(){
        return function (arr) {
          return arr.indexOf(this.name) !== -1
        }
      }
    }
  }
</script>

<style scoped lang="less">
  .tdDicImg {
    padding-left: 5px;
    span:first-child {
      display: inline-block;
      width: 25px;
      height: 25px;
      vertical-align: middle;
      margin-right: 3px;
      img {
        width: 100%;
        height: 100%;
      }
    }
  }
</style>

