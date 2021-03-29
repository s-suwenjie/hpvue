<template>
  <div>
    <yhm-managerpage category="1">
      <!--导航条-->
      <template #navigationTab>

        <router-link class="menuTabDiv menuTabActive" :to="{path:'/home/unit/insuranceUnitManager'}">管理保险公司</router-link>
        <router-link class="menuTabDiv " :to="{path:'/home/cashGiveHP/cashGiveHPManager'}">保险公司给海派返利</router-link>
<!--        <router-link class="menuTabDiv " :to="{path:'/home/vipRate/vipRateManager'}">特殊车型制定</router-link>-->
      </template>

      <!--操作区-->
      <template #operate>
        <yhm-commonbutton value="添加" icon="btnAdd" :flicker="true" @call="add()"></yhm-commonbutton>
        <!--<yhm-commonbutton :value="choose?'收起筛选':'展开筛选'" :icon="choose?'btnUp':'btnDown'" @call="switchChoose()"></yhm-commonbutton>-->
        <yhm-managersearch :value="searchStr" :history="shortcutSearchContent" id="searchStr" @call="initData"></yhm-managersearch>
      </template>

      <!--数据表头-->
      <template #listHead>
        <yhm-managerth style="width: 40px;" title="选择"></yhm-managerth>
        <yhm-managerth style="width: 40px;" title="查看"></yhm-managerth>
        <yhm-managerth  style="width: 100px;"  title="别名" value="shortName"></yhm-managerth>
        <yhm-managerth  title="汇款公司名称" value="unit"></yhm-managerth>
        <yhm-managerth  title="回款公司名称" value="incomeUnit"></yhm-managerth>
        <yhm-managerth  title="第三方回款公司名称" value="tripartiteUnit"></yhm-managerth>
        <yhm-managerth style="width: 220px;" title="发票类型" value="billingTypeVal"></yhm-managerth>
        <!--<yhm-managerth style="width: 100px;" title="公司用途" value="categoryVal"></yhm-managerth>-->
<!--        <yhm-managerth style="width: 130px;" title="新车费率" value="newRate"></yhm-managerth>-->
<!--&lt;!&ndash;        <yhm-managerth style="width: 130px;" title="旧车费率" value="oldRate"></yhm-managerth>&ndash;&gt;-->
<!--        <yhm-managerth style="width: 130px;" title="客户新车费率" value="clientRate"></yhm-managerth>-->
<!--        <yhm-managerth style="width: 130px;" title="特殊车型费率" value="vipRate"></yhm-managerth>-->
        <yhm-managerth style="width: 100px;" title="合同" value="contract"></yhm-managerth>
        <yhm-managerth  title="操作"></yhm-managerth>
      </template>

      <!--数据明细-->
      <template #listBody>
        <tr :class="[{twinkleBg: item.id==lastData},{InterlacBg:index%2!=0}]" v-for="(item,index) in content" :key="index">
          <yhm-manager-td-checkbox :value="item"></yhm-manager-td-checkbox>
          <yhm-manager-td-look @click="listView(item)"></yhm-manager-td-look>
          <yhm-manager-td :value="item.shortName" :color="item.deputyColor" ></yhm-manager-td>
          <yhm-manager-td :value="item.unit"></yhm-manager-td>
          <yhm-manager-td :value="item.incomeUnit"></yhm-manager-td>
          <yhm-manager-td :value="item.tripartiteUnit"></yhm-manager-td>
          <yhm-manager-td :value="item.billingTypeVal"></yhm-manager-td>
          <!--<yhm-manager-td :value="item.categoryVal"></yhm-manager-td>-->
<!--          <yhm-manager-td-rgt  :value="item.newRate===''?'&#45;&#45;&#45;&#45;&#45;&#45;':item.newRate +'  %'"></yhm-manager-td-rgt>-->
<!--&lt;!&ndash;          <yhm-manager-td-rgt :value="item.oldRate===''?'&#45;&#45;&#45;&#45;&#45;&#45;':item.oldRate+'  %'" ></yhm-manager-td-rgt>&ndash;&gt;-->
<!--          <yhm-manager-td-rgt :value="item.clientRate===''?'&#45;&#45;&#45;&#45;&#45;&#45;':item.clientRate+'  %'" ></yhm-manager-td-rgt>-->
<!--          <yhm-manager-td-rgt :value="item.vipRate===''?'&#45;&#45;&#45;&#45;&#45;&#45;':item.vipRate+'  %'" ></yhm-manager-td-rgt>-->
          <yhm-manager-td-operate>
            <yhm-manager-td-operate-button   @click="addContract(item)" icon="i-export" value="上传合同"></yhm-manager-td-operate-button>
          </yhm-manager-td-operate>
         <yhm-manager-td-operate>
<!--            <yhm-manager-td-operate-button  @click="selectBtn(item)" value="查看对账单" icon="i-export"  color="#22AA3E"></yhm-manager-td-operate-button>-->

            <yhm-manager-td-operate-button :no-click="item.category!=0" @click="uploadBtn(item)" value="导入回款对账单" icon="i-export"  color="#22AA3E"></yhm-manager-td-operate-button>


            <yhm-manager-td-operate-button  @click="editBtn(item)" value="编辑" icon="i-edit"  color="#0033FF"></yhm-manager-td-operate-button>
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
  </div>
</template>

<script>
  import { managermixin } from '@/assets/manager.js'
  export default {
    name: 'insuranceUnitManager',
    mixins: [managermixin],
    data(){
      return{
      }
    },
    methods:{
      // selectBtn(item){
      //   this.$dialog.OpenWindow({
      //     width: '1050',
      //     height: '750',
      //     title: '查看'+item.unit+'回款对应单',
      //     url: '/insuranceUnitUploadView?id=' + item.id+'&unitID='+item.unitID,
      //     closeCallBack: (data)=>{
      //       if(data){
      //         this.initPageData(false)
      //       }
      //     }
      //   })
      // },
      addContract(item){
        this.$dialog.OpenWindow({
          width: '1050',
          height: '750',
          title: '上传合同',
          url: '/contractForm?type=0&ownerID=' + item.id+'&unitID='+item.unitID+'&unit='+item.unit,
          closeCallBack: (data)=>{
            if(data){
              this.initPageData(false)
            }
          }
        })
      },
      uploadBtn(item){
        this.$dialog.OpenWindow({
          width: '1050',
          height: '750',
          title: '导入保险回款对账单',
          url: '/insuranceUnitUpload?ownerID=' + item.id+'&unitID='+item.unitID,
          closeCallBack: (data)=>{
            if(data){
              this.initPageData(false)
            }
          }
        })
      },
      editBtn(item){
        this.$dialog.OpenWindow({
          width: '1050',
          height: '750',
          title: '编辑保险信息',
          url: '/insuranceUnitForm?id=' + item.id,
          closeCallBack: (data)=>{
            if(data){
              this.initPageData(false)
            }
          }
        })
      },
      listView(item){
        this.$dialog.OpenWindow({
          width: '1050',
          height: '750',
          url: '/insuranceUnitView?id=' + item.id,
          title: '查看保险信息',
          closeCallBack: (data)=>{
            if(data){
              this.initPageData(false)
            }
          }
        })
      },
      //添加保险公司
      add() {
        this.$dialog.OpenWindow({
          width: 1050,
          height: 700,
          url:'/insuranceUnitForm',
          title:'添加保险公司',
          closeCallBack:(data) =>{
            if (data) {
              this.lastData = data//接收子页面传的值
              this.initPageData(false)
            }
          }
        })
      },
      //搜索
      initPageData (initValue) {
        let params = {}

        if (initValue) {
          params = {}
        } else {
          params = {}
        }
        this.init({
          initValue:initValue,
          url: '/Basic/getUnitInsuranceManager',
          data:params,
          all:(data) =>{
            //不管是不是初始化都需要执行的代码
          },
          init:(data)=>{
            //初始化时需要执行的代码
          }
        })
      },
    }
  }
</script>

<style scoped>

</style>
