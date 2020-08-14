<template>
  <div>
    <yhm-managerpage>
      <!--导航条-->

      <template #navigation>财务管理&nbsp;&gt;&nbsp;账号&nbsp;&gt;&nbsp;对私账号</template>

      <!--操作区-->
      <template #operate>
        <yhm-commonbutton value="添加" icon="btnAdd" :flicker="true" @call="add()"></yhm-commonbutton>
        <yhm-commonbutton :value="choose?'收起筛选':'展开筛选'" :icon="choose?'btnUp':'btnDown'" @call="switchChoose()"></yhm-commonbutton>
        <yhm-managersearch :value="searchStr" :history="shortcutSearchContent" id="searchStr" @call="initData" :blank-show="true"></yhm-managersearch>
      </template>

      <template #choose>
        <div v-show="choose" class="buttonBody mptZero">
          <yhm-radiofilter @initData="initChoose('categoryUnit')" title="单位" :content="listCategoryUnit"></yhm-radiofilter>
          <yhm-radiofilter @initData="initChoose('category')" title="账号类型" :content="listCategory"></yhm-radiofilter>
          <yhm-radiofilter @initData="initChoose('state')" title="账户状态" :content="listState"></yhm-radiofilter>
        </div>
      </template>

      <!--数据表头-->
      <template #listHead>
        <yhm-managerth style="width: 38px;" title="选择"></yhm-managerth>
        <yhm-managerth style="width: 38px;" title="查看"></yhm-managerth>
        <yhm-managerth style="width: 150px" title="别名" value="alias" ></yhm-managerth>
        <yhm-managerth style="width: 250px" title="户名" value="person"></yhm-managerth>
        <yhm-managerth style="width: 250px" title="账号" value="account"></yhm-managerth>
        <yhm-managerth style="width: 250px" title="开户行" value="bank"></yhm-managerth>
        <yhm-managerth style="width: 110px" title="单位分类" value="categoryUnitVal"></yhm-managerth>
        <yhm-managerth style="width: 110px" title="状态" value="stateVal"></yhm-managerth>

        <yhm-managerth title="操作"></yhm-managerth>
      </template>

      <!--数据明细-->
      <template #listBody>
        <tr :class="[{twinkleBg: item.id==lastData},{InterlacBg:index%2!=0}]" v-for="(item,index) in content" :key="index">
          <yhm-manager-td-checkbox :value="item"></yhm-manager-td-checkbox>
          <yhm-manager-td-look @click="listView(item)"></yhm-manager-td-look>
          <yhm-manager-td-input v-show="aliasIndex === index" :isFocus="aliasIndex === index" @blur="blurAliasEvent" :id="item.id" :value="item.alias"></yhm-manager-td-input>
          <yhm-manager-td  v-show="aliasIndex !== index" @dblclick="dbAliasEvent(item,index)" :value="item.alias"></yhm-manager-td>
          <yhm-manager-td-tip-img :unitUrl="item.personUrl" icon="icon-uniE999" :tip="true" color="#333" node-class-name="m_main" :value="item.person"></yhm-manager-td-tip-img>
          <yhm-manager-td-tip-img :custom="true" v-if="item.category!=='0'&&item.accountUrl !== ''"  :unitUrl="item.accountUrl" :tip="true" color="#333" icon="icon-3" node-class-name="m_main" :value="item.account"></yhm-manager-td-tip-img>
          <yhm-manager-td :value="item.account" v-else></yhm-manager-td>
          <yhm-manager-td :value="item.bank"></yhm-manager-td>
          <yhm-manager-td-center :value="item.categoryUnitVal"></yhm-manager-td-center>
          <yhm-manager-td-center :value="item.stateVal"></yhm-manager-td-center>
          <yhm-manager-td-operate>
            <yhm-manager-td-operate-button  @click="sendWxmessageEvent(item)" value="发送微信" icon="i-sendwx" color="#fd6802"></yhm-manager-td-operate-button>
            <yhm-manager-td-operate-button  @click="clickCopy(item)" value="一键复制" icon="i-copy" color="#49a9ea"></yhm-manager-td-operate-button>
            <yhm-manager-td-operate-button  @click="sendSelf(item)" value="发给本人" icon="i-sendwx" color="#2f54eb"></yhm-manager-td-operate-button>
            <yhm-manager-td-operate-button :no-click="item.state===1 || item.state===2" @click="del(item)" value="作废" icon="i-btn-applicationSm" color="#49a9ea"></yhm-manager-td-operate-button>
          </yhm-manager-td-operate>
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
    <div class="copyTip" v-if="isCopyTip">复制成功 : {{text}}</div>
  </div>

</template>

<script>
  import { selectItem,managermixin } from '@/assets/manager.js'
  export default {
    name: 'publicAccManager',
    mixins: [managermixin],
    data() {
      return {
        id: '',
        listCategoryUnit: {
          value: '',
          list: []
        },
        listCategory: {
          value: '',
          list: []
        },
        listNature: {
          value: '',
          list: []
        },
        listState: {
          value: '',
          list: []
        },
        empty: true,

        isCopyTip:false,
        aliasIndex: '0',
      }
    },
    methods:{
      dbAliasEvent(item,index){
        this.oldAlias = item.alias
        this.aliasIndex = index
        // $("#"+item.id).focus();
        // alert($("#"+item.id).val())
      },
      blurAliasEvent(id, value){
        this.aliasIndex = -1
        if(this.oldAlias !== value) {
          let params = {
            id: id,
            alias: value
          }
          this.ajaxJson({
            url: '/Fin/privateAccountAliasSave',
            data: params,
            call: (data) => {
              if (data.type === 0) {
                this.initPageData()
              }else{
                this.$dialog.alert({
                  alertImg: 'warn',
                  tipValue: data.message
                })
              }
            }
          })
        }
      },
      sendSelf(item){
        let personID = sessionStorage.getItem('____currentUserID')
        let params = {
          personID: personID,
          accountID: item.id
        }
        this.ajaxJson({
          url: "/Fin/privateAccountWX",
          data: params,
          call: (data)=>{
            if(data.type === 0){
              this.$dialog.alert({
                tipValue: data.message,
                closeCallBack: (data)=>{

                }
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
      sendWxmessageEvent(item){
        this.$dialog.OpenWindow({
          width: "950",
          height: "700",
          title: "选择联系人",
          url: '/selectPerson?category=0&categoryBefore=1',
          closeCallBack: (data)=>{
            if(data){
              let params = {
                personID: data.id,
                accountID: item.id
              }
              this.ajaxJson({
                url: "/Fin/privateAccountWX",
                data: params,
                call: (data)=>{
                  if(data.type === 0){
                    this.$dialog.alert({
                      tipValue: data.message,
                      closeCallBack: (data)=>{

                      }
                    })
                  }else{
                    this.$dialog.alert({
                      alertImg: 'warn',
                      tipValue: data.message
                    })
                  }
                }
              })
            }
          }
        })
      },
      clickCopy(item){
        clearTimeout(this.time)//再次点击时关闭上次触发的定时器 防止多次执行
        let text =
           '户名: '+item.person + '  '
          + '开户行: ' + item.bank + '  '
          + '账号: ' + item.account + '  '
        this.$copyText(text).then(res=>{
          this.text = text
          this.isCopyTip =  true
          let that = this
          this.time = window.setTimeout(()=>{//将定时器的id存入变量
            that.isCopyTip =  false
          },4500)
        },err=>{

        })
      },
      del(item){
        if(item.id){
          this.$dialog.confirm({
            width: '250',
            alertImg: 'warn',
            tipValue: '是否作废？',
            okCallBack: (data)=>{
              let params = {
                id: item.id
              }
              this.ajaxJson({
               url: '/Fin/privateAccountDelJson',
               data: params,
               call: (data)=>{
                 if (data.type === 0) {
                   this.$dialog.alert({
                     tipValue: data.message,
                     closeCallBack: () => {
                       this.initPageData(false);
                     }
                   })
                 }else if(data.type === 1){
                   this.$dialog.alert({
                     alertImg:'warn',
                     tipValue: data.message
                   })
                 }
               }
              })
            }
          })
        }
      },
      // 查看对私账号
      listView(item){
        this.$dialog.OpenWindow({
          width: '1050',
          height: '400',
          title: '查看对私账号信息',
          url:'/privateAccountView?id=' + item.id,
          closeCallBack: (data)=>{
            if(data){
              this.initPageData(false)
            }
          }
        })
      },
      // 添加对私账号
      add () {
        this.$dialog.OpenWindow({
          width: '1050',
          height: '700',
          url:'/privateAccountForm?&url=0',
          title:'添加对私账号',
          closeCallBack:(data) =>{
            if (data) {
              this.lastData = data
              this.initPageData(false)
            }
          }
        })
      },

      initPageData (initValue) {
        let params = {}

        if (initValue) {
          params = {}
        } else {
          params = {
            categoryUnit: this.listCategoryUnit.value,
            category: this.listCategory.value,
            state: this.listState.value,
          }
        }
        this.init({
          initValue: initValue,
          url: '/Fin/getPrivateAccountVue',
          data: params,
          all: (data) => {
            //不管是不是初始化都需要执行的代码
          },
          init: (data) => {
            //初始化时需要执行的代码
            // 这边初始化筛选信息
            this.listCategoryUnit = data.categoryUnitPsd
            this.listCategory = data.categoryPsd
            this.listNature = data.naturePsd
            this.listState = data.statePsd

          }
        })
      },
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
    },
    created () {
    }
  }
</script>

<style scoped>
    /* 复制提示内容 */
  .copyTip {
    position: fixed;
    top: 82px;
    z-index: 9999;
    background-color: #fff;
    color: black;
    padding: 16px;
    left: 0;
    right: 0;
    margin: auto;
    width: max-content;
    border-radius: 4px;
    font-size: 14px;
  }
</style>
