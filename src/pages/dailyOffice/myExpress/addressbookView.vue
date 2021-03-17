<template>
  <div class="f_main f_main_customize mb16">
    <yhm-select-body :choose="false">
      <template #operate>
        <div v-show="showTipDbSelect" class="s_db_select" :style="{left:getLeft,top:getTop}">双击选择</div>
        <yhm-managersearch :value="searchStr" id="searchStr" @call="initPageData"></yhm-managersearch>
        <yhm-radiofilter @initData="initChoose('category')" title="常用" all="0" :content="commonUsePsd"></yhm-radiofilter>
      </template>

      <template #listHead>
        <yhm-managerth width="40" title="选择"></yhm-managerth>
        <yhm-managerth title="地址区域"></yhm-managerth>
        <yhm-managerth title="公司名称"></yhm-managerth>
        <yhm-managerth title="详情地址"></yhm-managerth>
        <yhm-managerth title="联系人名称"></yhm-managerth>
        <yhm-managerth title="联系人手机"></yhm-managerth>
        <yhm-managerth title="联系人电话"></yhm-managerth>

        <yhm-managerth width="120" title="设置常用联系人"></yhm-managerth>
      </template>
      <template #listBody>
        <tr v-for="(item,index) in content"
            :class="{InterlacBg:index%2!=0}"
            :key="index"
            @click="selectEvent(item)"
            @dblclick="dblclickEvent(item)"
            @mousemove="mousemoveEvent"
            @mouseover="mouseoverEvent"
            @mouseout="mouseoutEvent">
          <yhm-manager-td-checkbox :no-click="false" :value="item"></yhm-manager-td-checkbox>
          <yhm-manager-td  :value="item.regionName"></yhm-manager-td>
          <yhm-manager-td  :value="item.unit"></yhm-manager-td>
          <yhm-manager-td  :value="item.address"></yhm-manager-td>
          <yhm-manager-td  :value="item.otherPartyPersonName"></yhm-manager-td>
          <yhm-manager-td  :value="item.otherPartyPhone"></yhm-manager-td>
          <yhm-manager-td  :value="item.otherPartyTelePhone"></yhm-manager-td>

          <yhm-manager-td-center-html>
            <span @mouseover.stop="mouseoutEvent" @mouseout.stop="mouseoverEvent" :class="[item.commonUse==='0'?'i-pentagram':'i-pentagramed']" @dblclick.stop @click.stop="setCommonUse(item)" style="color: #fb5f24; font-size: 20px;"></span>
          </yhm-manager-td-center-html>
        </tr>
      </template>
      <template #empty>
        <span class="m_listNoData" v-show="content.length>0?false:true">暂时没有数据</span>
      </template>

      <template #pager>
        <yhm-pagination :pager="pager" isPageSize="false" @initData="initPageData(false)"></yhm-pagination>
        <yhm-commonbutton class="mr0" icon="i-complete" value="确定" category="two" @call="selectConfirmEvent()"></yhm-commonbutton>
      </template>
    </yhm-select-body>
  </div>
</template>

<script>
  import { selectmixin } from '@/assets/select.js'
  export default {
    name: 'addressbookView',
    mixins: [selectmixin],
    data() {
      return {
        value:'',
        content:[],
        commonUsePsd:{ // 常用筛选数据
          value:'0',
          list:[
            {
              code:'',
              img:'',
              num:'0',
              showName:'常用'
            },
            {
              code:'',
              img:'',
              num:'1',
              showName:'全部'
            },
          ]
        },
        pager: {
          total: 0, // 总条数
          pageSize: 10, // 每页条数
          pageIndex: 1, // 当前页码
          selectCount: 0 // 选中条数
        },
      }
    },
    methods:{
      setCommonUse(item){
        let params = {
          id: item.id
        }
        this.ajaxJson({
          url: '/dailyoffice/addressBook/getCommonlyUsed',
          data: params,
          call: (data) => {
            if (data.type === 0) {
              this.$dialog.setReturnValue(this.id)
              this.$dialog.alert({
                tipValue: data.message,
                closeCallBack: () => {
                  this.initPageData()
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
      },
      initChoose (op) {
        this.pager.pageIndex = 1
        if (op === 'category') {
          this.selectValue = []
        }
        this.initPageData()
      },
      //搜索
      initPageData (initValue) {

        let params = {}
        if (initValue) {
          params = {
            orderColumn:this.orderColumn,
            commonUse:this.commonUsePsd.value,
            pageSize:10,
          }
        } else {
          params = {
            orderColumn:this.orderColumn,
            commonUse:this.commonUsePsd.value,
            pageSize:10,
          }
        }
        this.init({
          initValue:initValue,
          url: '/dailyoffice/addressBook/getAddressBookView',
          data:params,
          all:(data) =>{
            this.content = data.content
            this.pager.total=data.count
            this.value=data.type
          },
          init:(data)=>{
            //初始化时需要执行的代码
            // 这边初始化筛选信息
          }
        })
      },
      created () {
      }
    }
  }
</script>

<style scoped>

</style>
