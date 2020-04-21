<template>
  <div class="f_main f_main_customize mb16">
    <yhm-select-body>
      <template #operate>
        <div v-show="showTipDbSelect" class="s_db_select" :style="{left:getLeft,top:getTop}">双击选择</div>
        <yhm-commonbutton value="添加" icon="btnAdd" @call="selectAddEvent()"></yhm-commonbutton>
        <yhm-managersearch :value="searchStr" id="searchStr" @call="initData"></yhm-managersearch>
      </template>

      <template #choose>
        <yhm-radiofilter :before="categoryBefore" @initData="initChoose('category')" title="单位" all="0" :content="listCategory"></yhm-radiofilter>
        <yhm-radiofilter @initData="initChoose('category')" title="常用" all="0" :content="commonUsePsd"></yhm-radiofilter>
        <yhm-radiofilterletter @initData="initChoose('prefixLetter')" :selectValue="prefixLetter"></yhm-radiofilterletter>
      </template>


      <template #listHead>
        <yhm-managerth width="40" title="选择"></yhm-managerth>
        <yhm-managerth title="姓名"></yhm-managerth>
        <yhm-managerth title="身份证号"></yhm-managerth>
        <yhm-managerth title="电话号码"></yhm-managerth>
        <yhm-managerth title="邮箱"></yhm-managerth>
        <yhm-managerth width="120" title="设置常用联系人"></yhm-managerth>
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
          <yhm-manager-td-thisexter :category="item.category" :value="item.name"></yhm-manager-td-thisexter>
          <yhm-manager-td-center :value="item.idNo" format="idno*"></yhm-manager-td-center>
          <yhm-manager-td-center :value="item.phone" format="phone*"></yhm-manager-td-center>
          <yhm-manager-td :value="item.email"></yhm-manager-td>
          <yhm-manager-td-center-html>
            <span @mouseover.stop="mouseoutEvent" @mouseout.stop="mouseoverEvent" :class="[item.commonUse==='0'?'i-pentagram':'i-pentagramed']" @dblclick.stop @click.stop="setCommonUse(item)" style="color: #fb5f24; font-size: 20px;"></span>
          </yhm-manager-td-center-html>
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
        listCategory: { // 接受单位筛选数据
          value: '',
          list: []
        },
        prefixLetter: { // 定义字母默认选择值
          value: ''
        },
        commonUsePsd: { // 常用筛选数据
          value: '',
          list: []
        },
        simplify: '0',   // 0 代表添加完整联系人页面,1 代表添加简版联系人界面
        commonClientUse: '0'
      }
    },
    methods: {
      setCommonUse(item){
        let params = {
          ownerID: item.id,
          tableName: '1029'
        }
        this.ajaxJson({
          url: '/Basic/setCommonUse',
          data: params,
          call: (data)=>{
            if(data.type === 0) {
              item.commonUse=data.val
              this.$dialog.alert({
                tipValue: data.message
              })
            }else{
              this.$dialog.alert({
                alertImg: 'warn',
                tipValue: data.message
              })
            }
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
      selectAddEvent () {
        let url = '/addPersonForm?isUrl=0'
        let height = '692'
        if(this.simplify === '1'){
           url = '/addPersonSimplifyForm'
           height = '500'
        }
        this.$dialog.OpenWindow({
          width: '1050',
          height: height,
          url: url,
          title: '添加联系人信息',
          closeCallBack: (data)=>{
            if(data){
              this.commonUsePsd.value = '1'
              this.searchStr = data
              this.initPageData(false)
            }
          }
        })
      },
      initPageData(initValue){
        let params = {}
        if (initValue) {
          // 页面初始化是需要的参数

          /* 默认选中全部联系人 */
          if(this.commonClientUse === '1'){
            params = {
              category: this.listCategory.value,
              prefixLetter: this.prefixLetter.value,
              commonUse: '1',
            }
          }
          else{
            params = {
              category: this.listCategory.value,
              prefixLetter: this.prefixLetter.value,
              commonUse:0
            }

          }
        } else {
          // 页面非初始化时需要的参数

          params = {
            category: this.listCategory.value,
            prefixLetter: this.prefixLetter.value,
            commonUse:this.commonUsePsd.value,
          }
        }
        this.init({
          initValue: initValue,
          url: '/Basic/selectPersonJson',
          data: params,
          all: (data) => {
            // 不管是不是初始化都需要执行的代码
          },
          init: (data) => {
            // 初始化时需要执行的代码
            this.listCategory = data.listCategory
            this.commonUsePsd = data.commonUsePsd
          }
        })
      }
    },
    created () {
      this.listCategory.value = this.getQueryParam('category')
      this.setQuery2Value('categoryBefore')
      this.setQuery2Value('simplify')
      this.setQuery2Value('commonClientUse')

      setTimeout(()=>{
        this.commonUsePsd.value = this.commonClientUse

      },0)

      // console.log(this.commonClientUse)
      // this.commonUsePsd.push({
      //   value: this.commonClientUse
      // })
    }

  }
</script>

<style scoped>

</style>
