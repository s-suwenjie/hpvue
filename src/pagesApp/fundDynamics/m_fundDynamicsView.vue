<template>
  <div>
    <div class="app_main">
      <yhm-app-structure-top-tap>
        <yhm-app-structure-top-tap-menu :select="true" title="资金动态"></yhm-app-structure-top-tap-menu>
      </yhm-app-structure-top-tap>
      <yhm-app-structure-menu-group title="我的审批" :content-show="false">
        <template #rgtStructure>
          <div style="display: flex;justify-content: space-between;">
            <yhm-app-button @call="alertShow=true,shadeShow=true,hideShow=false" value="展开筛选" icon="" category="two"></yhm-app-button>
            <yhm-app-button  value="资金日报" icon="" category="five"></yhm-app-button>
          </div>
        </template>
        <div class="app_table">
          <p class="app_table_th">
            <span style="width: 60%;">银行名称</span>
            <i style="font-style: normal;color: #bfbfbf;">|</i>
            <span style="width: 30%;">金额</span>
          </p>
          <p  class="app_table_tr" v-for="(item,index) in list" :key="index">
            <img class="app_table_tr_img" :src="'/UploadFile/BankLogo/'+item.bankLogo" width="19">
            <span style="width: 60%;">{{item.bank}} </span>
            <span class="app_table_tr_money" v-html="tenThousandFormatShow(item.money)"></span>
          </p>
        </div>
        <yhm-app-structure-group-operate>
          <yhm-app-view-control title="今日资金总额" :content="amountMoney" type="money" style="padding:0 0.25rem;text-align: left"></yhm-app-view-control>
        </yhm-app-structure-group-operate>
      </yhm-app-structure-menu-group>
      <div class="a_mask a_mask_show" v-if="shadeShow" style="z-index: 1;"></div>
      <div class="app_alert" v-show="alertShow" :class="{'hidden':hideShow}" style="transition: all 0.5s">
        <div class="alert_top">
          <span class="i-btn-del app_aller_del" @click="shadeShow=false,hideShow=true" ></span>
        </div>
        <div class="app_alert_main">
          <p class="app_alert_title">活跃度</p>
          <div class="app_main_btn">
            <span v-for="(item,index) in livenessList" :key="index" @click="livenessClick(index,item)" class="app_alert_btn liveness">{{item}}</span>
          </div>
          <p class="app_alert_title">账户分类</p>
          <div style="margin-bottom: 0.3rem;" class="app_main_btn">
            <span v-for="(item,index) in accountList" :key="index" @click="accountClick(index,item)" class="app_alert_btn account">{{item}}</span>
          </div>
        </div>
        <div class="alert_bottom" style="display: flex;justify-content: center;">
          <yhm-app-button  value="重置" @call="reset()" icon="" category="five" style="border: 1px solid #666;margin-right:0.75rem;"></yhm-app-button>
          <yhm-app-button  value="确定" @call="confirm(liveness,livenessList[liveness],account,accountList[account])" icon="" category="two"></yhm-app-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { appviewmixin } from '@/assetsApp/app_view.js'
  export default {
    name: 'm_fundDynamicsView',
    mixins:[appviewmixin],
    data(){
      return{
        money:'1233123123',
        hideShow:false,//弹窗收回的动画
        alertShow:false,//弹窗
        shadeShow:false,//遮罩层
        amountMoney:'32131',
        'list':[
          {
            'bank':'北京银行（ 0233）',
            'money':'6236236236',
            'bankLogo': '360C8A55-80AD-46D8-B4E6-F3A474D2D616.png',

          },
          {
            'bank':'中信银行（ 1232）',
            'money':'12532362121',
            'bankLogo': '360C8A55-80AD-46D8-B4E6-F3A474D2D616.png',

          },
          {
            'bank':'建设银行（ 6868）',
            'money':'123212512',
            'bankLogo': '360C8A55-80AD-46D8-B4E6-F3A474D2D616.png',
          },
        ],
        liveness:'',
        livenessList:['活跃','不活跃','全部'],
        account:'',
        accountList:['现金账户','网银账户','网络账户','Pos账号','全部'],
        style:{'background-color':'#49a9ea','color':'#ffffff'},//未选中的按钮样式
        checkedStyle:{'background-color':'#fff','color':'#666'},//选中的按钮样式
      }
    },
    methods:{
      confirm(livenessIndex,livenessItem,accountIndex,accountItem){//点击确定后 返回选中索引与值
        this.shadeShow=false
        this.hideShow=true
        // this.list = []
      },
      reset(){//重置选择
        this.tacitlyApprove()//选中数组中 全部
        $('.liveness').css(this.checkedStyle)//清除其它选中样式
        $('.account').css(this.checkedStyle)
        this.liveness = this.livenessList.length-1//重置索引值
        this.account = this.accountList.length-1
      },
      clickAddCss(className,index){//点击添加选中样式
        $('.'+className).css(this.checkedStyle)
        $('.'+className).eq(index).css(this.style)
      },
      livenessClick(index,item){//获取选中索引以及值
        this.liveness=index
        this.clickAddCss('liveness',index)
      },
      accountClick(index,item){//获取选中索引以及值
        this.account=index
        this.clickAddCss('account',index)
      },
      tacitlyApprove(){//默认选中全部
        this.$nextTick(()=>{
          $('.liveness').eq(this.livenessList.length-1).css(this.style)
          $('.account').eq(this.accountList.length-1).css(this.style)
        })
      }
    },
    created(){
      document.querySelector('body').setAttribute('style', 'margin: 0 auto; width: 100%; background:#f3f3f3; overflow-x: hidden;height: 100%;');
      this.tacitlyApprove()
    }
  }
</script>

<style scoped lang="less">
  @import "../../../static/appStatic/fundDynamisc.css";
</style>
