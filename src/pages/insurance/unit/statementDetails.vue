<template>
  <div class="f_main">

    <yhm-view-tab>
      <template #tab>
        <yhm-view-tab-button :list="tabState" :index="0" >对账单</yhm-view-tab-button>
      </template>
      <template #content>
        <yhm-view-tab-list :customize="true" :pager="true" v-show="tabState[0].select">
          <template #listHead>
            <yhm-managerth style="width: 60px" title="文件" ></yhm-managerth>
            <yhm-managerth  title="对账单开始日期"></yhm-managerth>
            <yhm-managerth  title="对账单结束日期"></yhm-managerth>
            <yhm-managerth  title="账单总金额"></yhm-managerth>
            <yhm-managerth  title="账单剩余对账金额"></yhm-managerth>
            <yhm-managerth  title="是否已经完成对账"></yhm-managerth>

          </template>
          <template #listBody>
            <tr v-for="(item,index) in excelList" :key="index" :class="{InterlacBg:index%2!==0}">
              <yhm-manager-td  value=" " @click="downloadEvent(item)">
                <img  style="margin: auto;" width="30" height="30" src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1594275457602&di=5ebf487929ced264a201d33766b21f42&imgtype=0&src=http%3A%2F%2F5b0988e595225.cdn.sohucs.com%2Fimages%2F20180920%2F2397b5b7b5024319bf98035b72c2ca47.png" alt="">
              </yhm-manager-td>
              <yhm-manager-td-date  :value="item.monthsDate"></yhm-manager-td-date>
              <yhm-manager-td-date  :value="item.endDate"></yhm-manager-td-date>
              <yhm-manager-td-money  :value="item.money"></yhm-manager-td-money>
              <yhm-manager-td-money  :value="item.useMoney"></yhm-manager-td-money>
              <yhm-manager-td-center v-if="item.state==0" :value="'未完成'" color="red" style="font-weight: bold"></yhm-manager-td-center>
              <yhm-manager-td-center v-else :value="'已完成'" color="#55AA66"></yhm-manager-td-center>

            </tr>
          </template>

          <template #empty>
            <span class="m_listNoData" v-show="excelList.length!=0?false:true">暂时没有数据</span>
          </template>
          <template #pager>
            <yhm-pagination :pager="pager"  :is-select-info="false" @initData="filesView(false)"></yhm-pagination>
          </template>
        </yhm-view-tab-list>

      </template>
    </yhm-view-tab>
    <yhm-formoperate :createName="createName" :insertDate="insertDate" :updateName="updateName" :updateDate="updateDate">
      <template #btn>
        <yhm-commonbutton value="编辑" v-if="isInsuredUnit" style="margin-right: 20px" icon="i-edit" :flicker="false" @call="editBtn()"></yhm-commonbutton> </template>
    </yhm-formoperate>

  </div>
</template>

<script>

  import { viewmixin } from '@/assets/view.js'
  export default {
    name: 'statementDetails',
    mixins: [viewmixin],
    data(){
      return {
        id:'',
        empty:true,
        tabState: [{ select: true }],
        excelList:[],
      }
    },
    methods:{
      downloadEvent(item){
        window.open('/UploadFile/' + item.tag + '/' + item.storeName)
      },
      filesView(){
        let params={
          id:this.id
        }
        this.ajaxJson({
          url: '/Basic/getStatementDetails',
          data: params,
          call: (data) => {
            this.excelList=data.content
            this.pager.total = data.count
          }
        })
      },

    },
    created () {
      this.setQuery2Value("id")
      this.filesView()
    }
  }
</script>

<style scoped>

</style>
