<template>
  <div>
    <yhm-managerpage>
      <!--导航条-->
      <template #navigation>业务管理&nbsp;&gt;&nbsp;基础数据&nbsp;&gt;&nbsp;单位管理</template>

      <!--操作区-->
      <template #operate>
        <yhm-commonbutton value="添加" icon="btnAdd" :flicker="true" @call="add()"></yhm-commonbutton>
        <yhm-commonbutton :value="choose?'收起筛选':'展开筛选'" :icon="choose?'btnUp':'btnDown'" @call="switchChoose()"></yhm-commonbutton>
        <yhm-managersearch :value="searchStr" :history="shortcutSearchContent" id="searchStr" @call="initData"></yhm-managersearch>
      </template>
      <template #choose>
        <div v-show="choose" class="buttonBody mptZero">
          <yhm-radiofilter @initData="initChoose('state')" title="状态" :content="listCategory"></yhm-radiofilter>
          <yhm-radiofilter @initData="initChoose('blacklist')" title="是否黑名单" all="0" :content="listBlacklist"></yhm-radiofilter>
          <yhm-radiofilterletter @initData="initChoose('prefixLetter')" :selectValue="prefixLetterList"></yhm-radiofilterletter>
        </div>
      </template>

      <!--数据表头-->
      <template #listHead>
        <yhm-managerth style="width: 38px;" title="选择"></yhm-managerth>
        <yhm-managerth style="width: 38px;" title="查看"></yhm-managerth>
        <yhm-managerth title="单位名称" value="name" ></yhm-managerth>
        <yhm-managerth style="width:300px" title="单位简称" value="abbreviation" ></yhm-managerth>
        <yhm-managerth style="width:300px" title="单位代码" value="code" ></yhm-managerth>
        <yhm-managerth style="width:200px" title="统一社会信用代码" value="registrationNumber"></yhm-managerth>
        <yhm-managerth style="width: 170px;" title="公司电话" value="tel"></yhm-managerth>
        <!--<yhm-managerth style="width: 170px;" title="操作" ></yhm-managerth>-->
      </template>

      <!--数据明细-->
      <template #listBody>
        <tr :class="[{twinkleBg: item.id==lastData},{InterlacBg:index%2!=0}]" v-for="(item,index) in content" :key="index">
          <yhm-manager-td-checkbox :value="item"></yhm-manager-td-checkbox>
          <yhm-manager-td-look @click="listView(item)"></yhm-manager-td-look>
          <yhm-manager-td-thisexter :category="item.category" :value="item.name"></yhm-manager-td-thisexter>
          <yhm-manager-td-center :value="item.abbreviation"></yhm-manager-td-center>
          <yhm-manager-td-center :value="item.code"></yhm-manager-td-center>
          <yhm-manager-td-center :value="item.registrationNumber"></yhm-manager-td-center>
          <yhm-manager-td-center :value="item.tel" format="phone*"></yhm-manager-td-center>
          <!--<yhm-manager-td-operate>-->
            <!--&lt;!&ndash;<yhm-manager-td-operate-button @click="addInvoice(item)" icon="i-export" value="添加发票抬头"></yhm-manager-td-operate-button>&ndash;&gt;-->
            <!--<yhm-manager-td-operate-button @click="setUpBlacklist(item)" color="#be08e3" icon="i-export" value="设置黑名单"></yhm-manager-td-operate-button>-->
          <!--</yhm-manager-td-operate>-->
        </tr>
      </template>

      <!--数据空提示-->
      <template #empty>
        <span class="m_listNoData" v-show="empty">暂时没有数据</span>
      </template>
      <!--分页控件-->
      <template #pager>
        <yhm-pagination :pager="pager" @initData="initPageData(false)"></yhm-pagination>
      </template>
    </yhm-managerpage>
  </div>
</template>

<script>
  import { selectItem,managermixin } from '@/assets/manager.js'
  export default {
    name: 'unitManager',
    mixins: [managermixin],
    data () {
      return{
        prefixLetterList:{
          value: '',
          list: []
        },
        listCategory: {
          value: '',
          list: []
        },
        listBlacklist:{
          value:'1',
          list:[]
        },
      }
    },
    methods:{
      // addInvoice(item){
      //   this.$dialog.OpenWindow({
      //     width: '1050',
      //     height: '690',
      //     url:'/unitInvoiceFrom?ownerID='+item.id,
      //     title:'添加发票抬头',
      //     closeCallBack:(data) =>{
      //       if (data) {
      //         this.getUnitInformation(data)
      //       }
      //     }
      //   })
      // },
      // setUpBlacklist(item){
      //   this.$dialog.confirm({
      //     width: 300,
      //     tipValue:'确定设置黑名单',
      //     btnValueOk: '确定',
      //     btnValueCancel:'取消',
      //     alertImg: 'warn',
      //     okCallBack: () => {
      //       this.ajaxJson({
      //         url: '/Basic/setUpBlacklist',
      //         data: {id:item.id},
      //         call: (data) => {
      //           if (data) {
      //             this.$dialog.alert({
      //               tipValue: data.message,
      //               closeCallBack: ()=>{
      //                 if(data.type==0){
      //                   this.initPageData(false)
      //                 }
      //               }
      //             })
      //           }
      //         }
      //       })
      //     },
      //   })
      // },
      listView(item){
        this.$dialog.OpenWindow({
          width: '1050',
          height: '690',
          url:'/unitView?id=' + item.id,
          title:'查看单位信息',
          closeCallBack:(data) =>{
            if(data){
              this.initPageData(false)
            }
          }
        })
      },
      //添加
      add () {
        this.$dialog.OpenWindow({
          width: '1050',
          height: '690',
          url:'/addUnitForm',
          title:'添加单位信息',
          closeCallBack:(data) =>{
            if (data) {
              this.lastData = data   //最后添加一条数据给与动态闪烁
              this.initPageData(false)
              // /!*false->非初始化=>!import  true->初始化*!/
            }
          }
        })
      },

      //搜索
      initPageData (initValue) {
        let params = {}
        if (initValue) {
          // 页面初始化是需要的参数
          params = {
            init: true
          }
        } else {
          // 页面非初始化时需要的参数
          params = {
            prefixLetter: this.prefixLetterList.value,
            category: this.listCategory.value,
            blacklist:this.listBlacklist.value,
            init: false
          }
        }
        this.init({
          initValue: initValue,
          url: '/Basic/getUnitVueManagerData',
          data: params,
          all: (data) => {
            // 不管是不是初始化都需要执行的代码
          },
          init: (data) => {
            // 初始化时需要执行的代码
            // 这边初始化筛选信息
            this.listCategory=data.categoryPsd
            this.listBlacklist=data.blacklistPsd
          }
        })
      },
    },
    created () {
    }
  }
</script>

<style scoped>

</style>
