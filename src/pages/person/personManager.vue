<template>

  <div>
    <yhm-managerpage>
      <!--导航条-->

      <template #navigation>业务管理&nbsp;&gt;&nbsp;基础数据&nbsp;&gt;&nbsp;联系人管理</template>

      <!--操作区-->
      <template #operate>
        <yhm-commonbutton value="添加" icon="btnAdd" :flicker="true" @call="add()"></yhm-commonbutton>
        <yhm-commonbutton :value="choose?'收起筛选':'展开筛选'" :icon="choose?'btnUp':'btnDown'" @call="switchChoose()"></yhm-commonbutton>
        <yhm-managersearch :value="searchStr" :history="shortcutSearchContent" id="searchStr" @call="initData"></yhm-managersearch>
        <!--      <div @click="selectPerson" style="display: inline-block; width: 120px; height: 30px; border: 1px solid #49A8EA;">选择联系人</div>-->
      </template>

      <!--筛选区-->
      <template #choose>
        <div v-show="choose" class="buttonBody mptZero">
          <yhm-radiofilter @initData="initChoose('category')" title="单位类型" :content="listCategory"></yhm-radiofilter>
          <yhm-radiofilter @initData="initChoose('sex')" title="性别" :content="listSex"></yhm-radiofilter>
          <yhm-radiofilter @initData="initChoose('important')" title="是否重要联系人" :content="listImportant"></yhm-radiofilter>
          <yhm-radiofilterletter @initData="initChoose('prefixLetter')" :selectValue="prefixLetter"></yhm-radiofilterletter>

        </div>
      </template>

      <!--数据表头-->
      <template #listHead>
        <yhm-managerth style="width: 40px;" title="选择"></yhm-managerth>
        <yhm-managerth style="width: 40px;" title="查看"></yhm-managerth>
        <yhm-managerth title="姓名" value="name"></yhm-managerth>
        <yhm-managerth style="width: 120px" title="性别" value="sex"></yhm-managerth>
        <yhm-managerth style="width: 200px" title="部门" value="departmentID"></yhm-managerth>
        <yhm-managerth style="width: 150px" title="身份证号" value="idNo"></yhm-managerth>
        <yhm-managerth style="width: 150px" title="手机号码" value="phone"></yhm-managerth>
        <yhm-managerth style="width: 220px;" title="重要级别" value="important"></yhm-managerth>
      </template>
      <!--数据明细-->
      <template #listBody>
        <tr :class="[{twinkleBg: item.id==lastData},{InterlacBg:index%2!=0}]" v-for="(item,index) in content"
            :key="index">
          <yhm-manager-td-checkbox :value="item"></yhm-manager-td-checkbox>
          <yhm-manager-td-look @click="listView(item)"></yhm-manager-td-look>
          <yhm-manager-td-thisexter :value="item.name" :category="item.category"></yhm-manager-td-thisexter>
          <yhm-manager-td-psd :value="item.sex" :list="sexItems"></yhm-manager-td-psd>
          <yhm-manager-td-center :value="item.department" ></yhm-manager-td-center>
          <yhm-manager-td-center :value="item.idNo"></yhm-manager-td-center>
          <yhm-manager-td-center :value="item.phone" format="phone*"></yhm-manager-td-center>
          <yhm-manager-td-psd :value="item.important" :list="importantItems"></yhm-manager-td-psd>
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
  import Qs from 'qs'
  import { selectClick, selectComputedSelected, selectConfirm, selectdbClick, number2chinese } from '@/assets/common.js'
  import { selectItem, managermixin } from '@/assets/manager.js'

  export default {
    name: 'personManager',
    mixins: [managermixin],
    data () {
      return {
        id: "",
        insertDate: "",
        isHead: "",
        completeness: "",
        createName: "",
        updateName: "",
        updateDate: "",
        isLeader: "",
        unitID: "",
        unit: "",
        departmentID: "",
        department: "",
        name: "",
        nameEN: "",
        important: "",
        importantVal: "",
        importantClass: "",
        category: "",
        categoryVal: "",
        categoryClass: "",
        sex: "",
        sexVal: "",
        sexClass: "",
        politicsStatus: "",
        idType: "",
        idNo: "",
        nativePlace: "",
        calendar: "",
        birthday: "",
        birthdayLunar: "",
        zodiacID: "",
        zodiac: "",
        constellationID: "",
        constellation: "",
        bloodTypeID: "",
        bloodType: "",
        nationID: "",
        nation: "",
        countryID: "",
        useLanguageID: "",
        phone: "",
        phoneReserve: "",
        telCode: "",
        tel: "",
        telCodeReserve: "",
        telReserve: "",
        qq: "",
        msm: "",
        email: "",
        weChatNum: "",
        smoking: "",
        smoke: "",
        drinking: "",
        drink: "",
        teaing: "",
        tea: "",
        isDietTaboos: "",
        dietTaboos: "",
        remark: "",
        prefixLetter: { // 定义字母默认选择值
          value: ''
        },


        listCategory: {
          value: '',
          list: []
        },
        listSex: {
          value: '',
          list: []
        },
        listImportant: {
          value: '',
          list: []
        },
        menuTabOn: 1,
        sexItems:[],
        categoryItems:[],
        importantItems:[],
      }
    },
    methods: {

      menuTab (index) {
        this.menuTabOn = index
      },
      listView(item){
        this.$dialog.OpenWindow({
          width: '1050',
          height: '750',
          url: '/personView?id=' + item.id,
          title: '查看联系人信息',
          closeCallBack: (data)=>{
            if(data){
              this.initPageData(false)
            }
          }
        })
      },
      add () {
        this.$dialog.OpenWindow({
          width: '1050',
          height: '750',
          url: '/addPersonForm',
          title: '添加联系人信息',
          closeCallBack: (data) => {
            if (data) {
              this.lastData = data
              this.initPageData(false)
              /*false->非初始化=>!import  true->初始化*/
            }
          }
        })
      },

      initPageData (initValue) {
        let params = {}
        if (initValue) {
          //初始化
          params = {}
        } else {
          //非初始化
          params = {
            category: this.listCategory.value,
            sex: this.listSex.value,
            important: this.listImportant.value,
            prefixLetter: this.prefixLetter.value,
          }
        }
        this.init({
          initValue: initValue,
          url: '/Basic/personManagerJson',
          data: params,
          all: (data) => {
            //不管是不是初始化都需要执行的代码
          },
          init: (data) => {
            //初始化时需要执行的代码
            // 这边初始化筛选信息
            this.listCategory = data.categoryPsd
            this.listSex = data.sexPsd
            this.listImportant = data.importantPsd
            this.sexItems = data.sexItems
            this.categoryItems = data.categoryItems
            this.importantItems = data.importantItems
          }
        })
      }
    },
    created(){
    },
    computed: {
      // 检查是否选中
      checkSelect () {
        return function (id) {
          return this.selectValue.indexOf(id) !== -1
        }
      }
    },
    watch: {
      selectValue: {
        handler: function (val, oldval) {
          this.pager.selectCount = val.length
        },
        deep: true
      }
    }
  }
</script>
<style scoped lang="less">
  .causeMore {
    margin-left: 5px;
    display: inline-block;
    cursor: pointer;
    vertical-align: text-top;
  }
</style>
