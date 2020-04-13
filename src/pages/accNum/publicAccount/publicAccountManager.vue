<template>
  <div>
    <yhm-managerpage>
      <!--导航条-->

      <template #navigation>财务管理&nbsp;&gt;&nbsp;账号&nbsp;&gt;&nbsp;对公账号</template>
      <!--操作区-->
      <template #operate>
        <yhm-commonbutton value="添加" icon="btnAdd" :flicker="true" @call="add()"></yhm-commonbutton>
        <yhm-commonbutton :value="choose?'收起筛选':'展开筛选'" :icon="choose?'btnUp':'btnDown'" @call="switchChoose()"></yhm-commonbutton>
        <yhm-managersearch :value="searchStr" :history="shortcutSearchContent" id="searchStr" @call="initData"></yhm-managersearch>
      </template>

      <template #choose>
        <div v-show="choose" class="buttonBody mptZero">
          <yhm-radiofilter @initData="initChoose('categoryUnit')" title="单位" :content="listCategoryUnit"></yhm-radiofilter>
          <yhm-radiofilter @initData="initChoose('category')" title="账号类型" :content="listCategory"></yhm-radiofilter>
          <yhm-radiofilter @initData="initChoose('nature')" title="账户性质" :content="listNature"></yhm-radiofilter>
          <yhm-radiofilter @initData="initChoose('state')" title="账户状态" :content="listState"></yhm-radiofilter>
        </div>
      </template>

      <!--数据表头-->
      <template #listHead>
        <yhm-managerth style="width: 38px;" title="选择"></yhm-managerth>
        <yhm-managerth style="width: 38px;" title="查看"></yhm-managerth>
        <yhm-managerth style="width: 150px" title="别名" value="alias" ></yhm-managerth>
        <yhm-managerth style="width: 300px" title="户名" value="name" ></yhm-managerth>
        <yhm-managerth style="width: 300px" title="开户行" value="bank" ></yhm-managerth>
        <yhm-managerth style="width: 250px" title="账号" value="account" ></yhm-managerth>
        <yhm-managerth style="width: 150px" title="联行号"></yhm-managerth>
        <yhm-managerth title="操作"></yhm-managerth>
      </template>

      <!--数据明细-->
      <template #listBody>
        <tr :class="[{twinkleBg: item.id==lastData},{InterlacBg:index%2!=0}]" v-for="(item,index) in content" :key="index">
          <yhm-manager-td-checkbox :value="item"></yhm-manager-td-checkbox>
          <yhm-manager-td-look @click="add(item.id)"></yhm-manager-td-look>
          <yhm-manager-td-input v-show="aliasIndex === index" @blur="blurAliasEvent" :id="item.id" :value="item.alias"></yhm-manager-td-input>
          <yhm-manager-td  v-show="aliasIndex !== index" @dblclick="dbAliasEvent(item.alias,index)" :value="item.alias"></yhm-manager-td>

          <yhm-manager-td-tip-img :value="item.name" :unitUrl="item.unitUrl" icon="icon-uniE999" :tip="true" color="#333" node-class-name="m_main"></yhm-manager-td-tip-img>
          <yhm-manager-td :value="item.bank"></yhm-manager-td>
          <yhm-manager-td-tip-img :value="item.accountStr" :custom="true" :unitUrl="item.accountUrl" v-if="item.category!=='0'&&item.accountUrl !== ''" :tip="true" color="#333" icon="icon-3" node-class-name="m_main" ></yhm-manager-td-tip-img>
          <yhm-manager-td :value="item.accountStr" v-else></yhm-manager-td>

          <yhm-manager-td :value="item.interbank"></yhm-manager-td>
          <yhm-manager-td-operate>
            <yhm-manager-td-operate-button  @click="sendWxmessageEvent(item)" value="发送微信" icon="i-sendwx" color="#fd6802"></yhm-manager-td-operate-button>
            <yhm-manager-td-operate-button  @click="clickCopy(item)" value="一键复制" icon="i-copy" color="#49a9ea"></yhm-manager-td-operate-button>
            <yhm-manager-td-operate-button  @click="sendSelf(item)" value="发给本人" icon="i-sendwx" color="#2f54eb"></yhm-manager-td-operate-button>

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
    <div class="copyTip" v-if="isCopyTip">复制成功： {{text}}</div>
  </div>
</template>

<script>
  import { managermixin } from '@/assets/manager.js'
  export default {
    name: 'publicAccManager',
    mixins: [managermixin],
    data() {
      return {
        id: '',
        text:'',
        time:'',
        alias:'',
        oldAlias:'',
        isCopyTip:false,

        aliasIndex: '0',
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
      }
    },
    methods:{
      sendSelf(item){
        let personID = sessionStorage.getItem('____currentUserID')
        let params = {
          personID: personID,
          accountID: item.id
        }
        this.ajaxJson({
          url: "/Fin/publicAccountWX",
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
                url: "/Fin/publicAccountWX",
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
      dbAliasEvent(alias,index){
        this.oldAlias = alias
        this.aliasIndex = index
      },

      blurAliasEvent(id, value){

        this.aliasIndex = -1
        if(this.oldAlias !== value) {

          let params = {
            id: id,
            alias: value
          }

          this.ajaxJson({
            url: '/Fin/publicAccountAliasSave',
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
      clickCopy(item){
        clearTimeout(this.time)//再次点击时关闭上次触发的定时器 防止多次执行
        let text =
                    '户名：'+item.name + '  '
                    + '开户行：' + item.bank + '  '
                    + '账号：' + item.account + '  '
                    + '联行号：' + item.interbank
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
      add (id) {
        // 默认设置页面标记是查看
        var isAdd = false
        // 默认设置页面标题为查看信息
        var title = '查看对公账号信息'
        var url='/publicAccountView?id=' + id
        if (!id) { // 当id不存在的时候
          // 设置id为空
          id = ''
          // 设置页面标题为添加信息
          title = '添加对公账号'
          // 设置页面标记为添加
          isAdd = true
          //0是在对公账账户模块进入   ''是选择页面进入
          url='/publicAccountForm?id=&url=0'
        }
        this.$dialog.OpenWindow({
          width: 1050,
          height: 750,
          url:url,
          title:title,
          closeCallBack:(data) =>{
            if (data) {
              if (isAdd) {
                this.lastData = data//接收子页面传的值
              }
              this.initPageData(false)
              // /!*false->非初始化=>!import  true->初始化*!/
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
            nature: this.listNature.value,
            state: this.listState.value,
          }
        }
        this.init({
          initValue: initValue,
          url: '/Fin/getPublicAccountVue',
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
