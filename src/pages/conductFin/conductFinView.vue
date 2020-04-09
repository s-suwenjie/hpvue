<template>
  <div class="f_main mb35">
    <yhm-view-body>
      <template #title>基本信息</template>
      <template #body>
        <yhm-view-control title="产品名称" :content="name"></yhm-view-control>
        <yhm-view-control title="账户" :content="account" category="3"></yhm-view-control>
        <yhm-view-control title="金额" :content="money" type="money"></yhm-view-control>
        <yhm-view-control title="开始日期" :content="startDate" type="date"></yhm-view-control>
        <yhm-view-control title="结束日期" :content="endDate" type="date"></yhm-view-control>
        <yhm-view-control title="文件" :content="files" type="files" category="3" v-if="files.length !== 0"></yhm-view-control>
      </template>

    </yhm-view-body>
    <div class="f_split"></div>
    <yhm-view-tab v-if="isTabShow">
      <template #tab>
        <yhm-view-tab-button :list="tabState" :index="0">往来明细</yhm-view-tab-button>
      </template>
      <template #content>

      <yhm-view-tab-list :customize="true"  v-show="tabState[0].select">
        <template #listHead>
<!--          <yhm-managerth style="width:28px" title="查看" ></yhm-managerth>-->
          <yhm-managerth style="width:88px" title="账户" ></yhm-managerth>
          <yhm-managerth style="width: 100px" title="交易对象"></yhm-managerth>
          <yhm-managerth style="width: 100px" title="交易日期"></yhm-managerth>
          <yhm-managerth style="width: 30px" title="方向"></yhm-managerth>
          <yhm-managerth style="width: 70px" title="事由"></yhm-managerth>
          <yhm-managerth style="width: 70px" title="备注"></yhm-managerth>
          <yhm-managerth style="width: 70px" title="收入金额"></yhm-managerth>
          <yhm-managerth style="width: 70px" title="支出金额"></yhm-managerth>
          <yhm-managerth style="width: 70px" title="凭证"></yhm-managerth>


        </template>
        <template #listBody>
          <tr v-for="(item,index) in content" :key="index" :class="{InterlacBg:index%2!==0}">
<!--            <yhm-manager-td-look @click="listView(item.id)"></yhm-manager-td-look>-->
            <yhm-manager-td :value="item.selfAccount"></yhm-manager-td>
            <yhm-manager-td-center :value="item.otherAccount"></yhm-manager-td-center>
            <yhm-manager-td-date :value="item.insertDate"></yhm-manager-td-date>
            <yhm-manager-td-direction :direction="item.direction" :value="item.direction" class="dfJcc" :dir-val="false"></yhm-manager-td-direction>
            <yhm-manager-td :value="item.subject" ></yhm-manager-td>
            <yhm-manager-td :value="item.remark"></yhm-manager-td>

            <yhm-manager-td-money :value="item.direction === '0' ? money : '0' " style="color:#001CCE;"></yhm-manager-td-money>
            <yhm-manager-td-money :value="item.direction === '1' ? money : '0' " style="color:#f00;"></yhm-manager-td-money>

            <yhm-manager-td-image :tip="true" width="850" height="500" left="50" type="files" :value="item.storeName" :tag="'bankDetail'" ></yhm-manager-td-image>

          </tr>
        </template>
        <!--数据空提示-->
        <template #empty>
          <span class="m_listNoData" v-show="isEmpty">暂时没有数据</span>
        </template>
      </yhm-view-tab-list>
      </template>
    </yhm-view-tab>

    <yhm-formoperate v-if="isShowEdit" :createName="createName" :insertDate="insertDate" :updateName="updateName" :updateDate="updateDate">
      <template #btn>
        <yhm-commonbutton value="编辑" icon="i-edit" :flicker="true" @call="editBtn()"></yhm-commonbutton>
      </template>
    </yhm-formoperate>
  </div>
</template>

<script>
  import { viewmixin } from '@/assets/view.js'
  export default {
    name: 'conductFinView',
    mixins: [viewmixin],
    data (){
      return {
        content:[],
        isEmpty:false,
        tabState:[{select:true},{select:false}],
        list: [],
        id: '',
        name: '',
        account: '',
        money: '',
        startDate: '',
        endDate: '',
        files: [],
        state: '',
        isShowEdit: true,
        isTabShow:false
      }
    },
    methods: {
      editBtn(){
        this.$dialog.OpenWindow({
          width: 1100,
          height: 690,
          title: '编辑理财产品',
          url: '/conductFinForm?id='+this.list.id+'&state=1',
          closeCallBack: (data) => {
            if(data){
              this.initData()
              this.$dialog.setReturnValue('1')
            }
          }
        })
      },
      initData(){
        let params = {
          id: this.id,
        }
        this.ajaxJson({
          url: '/Fin/initBankProductForm',
          data: params,
          call: (data)=>{
            this.list = data
            this.name = data.name
            this.account = data.account
            this.money = data.money
            this.startDate = data.startDate
            this.endDate = data.endDate
            this.files = data.files
            this.content = data.list

            this.createName = data.createName
            this.insertDate = data.insertDate
            this.updateDate = data.updateDate
            this.updateName = data.updateName
          }
        })
      },
    },
    created () {
      this.setQuery2Value('id')
      this.setQuery2Value('state')
      this.initData()
      if(this.state !== '0'){
        this.isShowEdit = false
      }
    },
    watch:{
      content(){
        if(this.content.length === 0){
          this.isEmpty = true
          this.isTabShow = false
        }else{
          this.isEmpty = false
          this.isTabShow = true

        }

      }

    }
  }
</script>

<style scoped>

</style>
