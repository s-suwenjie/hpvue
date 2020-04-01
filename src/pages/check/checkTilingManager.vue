<template>
  <div>
    <yhm-managerpage :total-table="true" :total-rgt="true">
      <!--导航条-->
      <template #navigation>财务管理&nbsp;&gt;&nbsp;票据&nbsp;&gt;&nbsp;支票管理</template>

      <template #navigationLft>
        <div @mouseover="tipChange(index)" @mouseout="tipOut" style="margin: 0;position: relative"  v-for="(item,index) in routerList" :key="index">
          <router-link tag="div" :class="item.class" style="margin: 0;" class="tip" :to="item.path">
            <div  class="cbl_main_prompt2 tipShow">
              <div class="cbl_main_prompt_content" style="font-size:13px;padding: 0 12px;">
                {{tipValue}}
                <img src="/UploadFile/m_image/arrow.png">
              </div>
            </div>
          </router-link>
        </div>
      </template>
      <!--操作区-->
      <template #operate>
        <yhm-commonbutton :value="choose?'收起筛选':'展开筛选'"  :icon="choose?'btnUp':'btnDown'" @call="switchChoose()"></yhm-commonbutton>
        <yhm-managersearch :value="searchStr" :history="shortcutSearchContent" id="searchStr" @call="initData"></yhm-managersearch>
      </template>
      <!--筛选区-->
      <template #choose>
        <div v-show="choose" class="buttonBody mptZero">
          <yhm-radiofilter :before="bankBefore" @initData="initChoose('bank')" title="银行类型" :content="listBank"></yhm-radiofilter>
          <yhm-radiofilter :before="stateBefore" @initData="initChoose('state')" title="支票状态" :content="listState"></yhm-radiofilter>
          <yhm-radiofilter :before="categoryBefore" @initData="initChoose('category')" title="支票类型" :content="listCategory"></yhm-radiofilter>
        </div>
      </template>
      <template #tiled>
        <div style="margin: 10px;display: flex;flex-direction: row; flex-wrap: wrap;">
          <yhm-view-list-block @VIewEvent="viewClickEvent" v-for="(item,index) in content" :key="index"
                               @call="rightMenuEvent" :item="item" :menu="menu" :menu-category="item.state" :psd="categoryList"
                               :category-value="item.category" :category="item.category" :code="item.code"
                               :color="getPsdSelectItemColor(stateList,item.state)">
            <div style="margin: 0 5px 2px 0;">
            <img :src="'/UploadFile/BankLogo/'+item.bankLogo" width="19">
            </div>
            <yhm-view-psd :psd="stateList" :value="item.state"></yhm-view-psd>
          </yhm-view-list-block>
        </div>

      </template>
      <!--数据空提示-->
      <template #tillingEmpty v-if="!isTilingEmpty">
        <div class="tilingEmpty">
          <p class="tilingIcon i-warn"></p>
          <p>暂时没有数据</p >
        </div>
      </template>
      <!-- 分页控件 -->
      <template #pager v-if="isTilingEmpty">
        <yhm-pagination :pager="pager" @initData="initPageData(false)"></yhm-pagination>
      </template>

      <template #colorTip v-if="isTilingEmpty">
        <yhm-manager-color-tip :psd="stateList" before-tip="代表" before-color="#888"></yhm-manager-color-tip>
      </template>

      <template #listTotalHead v-if="isTilingEmpty">
        <yhm-managerth style="width: 100px;" before-color="#a40b81" before-title="总 " title="张数"></yhm-managerth>
        <yhm-managerth style="width: 100px;" before-color="#009788" before-title="可用 " title="张数"></yhm-managerth>
        <yhm-managerth style="width: 100px;" before-color="#999" before-title="作废 " title="张数"></yhm-managerth>
        <yhm-managerth style="width: 100px;" before-color="#2f54eb" before-title="外带 " title="张数"></yhm-managerth>
        <yhm-managerth style="width: 100px;" before-color="#28979c" before-title="已使用 " title="张数"></yhm-managerth>
        <yhm-managerth style="width: 100px;" before-color="#0686c3" before-title="已入账 " title="张数"></yhm-managerth>
      </template>
      <template #listTotalBody v-if="isTilingEmpty">
        <tr v-for="(item,index) in total" :key="index">
          <yhm-manager-td-rgt :value="item.count"></yhm-manager-td-rgt>
          <yhm-manager-td-rgt :value="item.useCount"></yhm-manager-td-rgt>
          <yhm-manager-td-rgt :value="item.countState0"></yhm-manager-td-rgt>
          <yhm-manager-td-rgt :value="item.countState1"></yhm-manager-td-rgt>
          <yhm-manager-td-rgt :value="item.countState2"></yhm-manager-td-rgt>
          <yhm-manager-td-rgt :value="item.countState3"></yhm-manager-td-rgt>
        </tr>
      </template>
    </yhm-managerpage>
  </div>
</template>

<script>
  import { managermixin } from '@/assets/manager.js'
  export default {
    name: 'checkTilingManager',
    mixins: [managermixin],
    data(){
      return{
        state:'',
        bankLogo:'',
        category:'',
        total:'',
        isTilingEmpty:true,
        list:[],
        checkTheType:'现金',
        stateBefore: '0', // 默认选择状态为可以选择，1为不可以选择
        listState: {
          value: '',
          list: []
        },
        tipValue:'',
        routerList:[
          {
            class:'i-homeCheck',
            path:'/home/checkManager'
          },
          {
            class:'i-tiling active',
            path:'/home/checkTilingManager'
          },

          {
            class:'i-expendCheck',
            path:'/home/checkExpendManager'
          },
          // {
          //   class:'i-incomeCheck',
          //   path:''
          // }
        ],
        tipList:[
          ['入库操作'],
          ['平铺视图'],
          ['列表操作']
        ],
        categoryBefore:'0',
        listCategory:{
          value: '',
          list: []
        },
        bankBefore:'0',
        listBank:{
          value: '',
          list: []
        },
        categoryList: [],
        stateList:[],
        menu:[
          ['查看支票','支票填开','空白支票作废'],
          ['查看支票','补打记录'],
          ['查看支票','支票填开','作废支票','补打记录'],
          ['查看支票','入账操作','作废支票','补打记录'],
          ['查看支票','补打记录']
        ],
        pager: {
          total: 0, // 总条数
          pageSize: 18, // 每页条数
          pageIndex: 1, // 当前页码
          selectCount: 0 // 选中条数
        }
      }
    },
    methods:{
      viewClickEvent(item){
        if(item.state==='3'||item.state==='4'){
          this.$dialog.OpenWindow({
            width: '850',
            height: '340',
            title: '查看票样',
            url: '/viewCheck?ownerID=' + item.id,
            closeCallBack: ()=>{
            }
          })
        }
      },
      tipChange(index){
        this.tipValue=this.tipList[index][0]
        $('.tipShow').eq(index).css({'display':'block'})
      },
      tipOut(){
        $('.tipShow').css('display','none')
      },
      rightMenuEvent(category,item){
        if(category === '查看支票') {
          this.$dialog.OpenWindow({
            width: '850',
            height: '340',
            title: '查看票样',
            url: '/viewCheck?ownerID=' + item.id,
            closeCallBack: () => {
            }
          })
        }
        if(category === '支票填开'){
          this.$dialog.OpenWindow({
            width: '1050',
            height: '690',
            title: '支票填开',
            url: '/checkFillOut?ownerID=' + item.id,
            closeCallBack: (data)=>{
              if(data){
                this.initPageData(false)
              }
            }
          })
        }
        if(category === '空白支票外带'){
          this.$dialog.OpenWindow({
            width: '1050',
            height: '690',
            title: '空白支票外带',
            url: '/blackCheckOut?ownerID=' + item.id,
            closeCallBack: (data)=>{
              if(data){
                this.initPageData(false)
              }
            }
          })
        }
        if(category === '空白支票作废'){
          this.$dialog.OpenWindow({
            width: '1050',
            height: '690',
            title: '支票作废',
            url: '/toVoidCheck?ownerID=' + item.id,
            closeCallBack: (data)=>{
              if(data){
                this.initPageData(false)
              }
            }
          })
        }
        if(category === '入账操作'){
          this.$dialog.OpenWindow({
            width: '1050',
            height: '690',
            title: '支票入账操作',
            url: '/accEntry?bankDetailType=4&ownerID=' + item.id,
            closeCallBack: (data)=>{
              if(data){
                this.initPageData(false)
              }
            }
          })
        }
        if(category === '作废支票'){
          this.$dialog.OpenWindow({
            width: '1050',
            height: '690',
            title: '支票作废',
            url: '/toVoidCheck?ownerID=' + item.id,
            closeCallBack: (data)=>{
              if(data){
                this.initPageData(false)
              }
            }
          })
        }
        if(category === '补打记录'){
          this.$dialog.OpenWindow({
            width: '465',
            height: '365',
            title: '选择打印行号',
            url: '/selectPrint?id=' + item.id + '&count=15',
            closeCallBack: (data)=>{
              if(data){
                // this.$dialog.setReturnValue(this.id)
                // this.$dialog.close()
              }
            }
          })
        }
      },

      initPageData (initValue) {
        let params = {}

        if (initValue) {
          params = {

          }
        } else {
          params = {
            state: this.listState.value,
            category:this.listCategory.value,
            bankID:this.listBank.value
          }
        }
        this.init({
          initValue: initValue,
          url: '/Bill/checksDetailManagerData',
          data:params,
          all: (data) => {
            //不管是不是初始化都需要执行的代码
            this.content = data.content
            this.total = data.total
          },
          init: (data) => {
            //初始化时需要执行的代码
            // 这边初始化筛选信息

            this.listState = data.statePsd
            this.listCategory = data.categoryPsd
            this.stateList = data.statePsd.list
            this.categoryList = data.categoryPsd.list
            this.listBank = data.bankPsd
          }
        })
      }
    },
    created () {
      // this.initPageData(true)

    },
    watch:{
      content(){
        this.isTilingEmpty = this.content.length !== 0;
      }
    }
  }
</script>

<style scoped lang="less">
.tipShow{display: none;width: 100px;}
.firShape{
  background-color: #027C02;
}
.firColor{
  color: #027C02;
}
.secShape{
  background-color: #B0B0B0;
}
.secColor{
  color: #B0B0B0;
}
.thiShape{
  background-color: #2C298D;
}
.thiColor{
  color: #2C298D;
}
.forShape{
  background-color: #DD7E46;
}
.forColor{
  color: #DD7E46;
}
.fifShape{
  background-color: #1F809C;
}
.fifColor{
  color: #1F809C;
}
</style>
