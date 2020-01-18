<template>
  <div class="app_main">
    <yhm-app-structure-top-tap :list="topMenu" :select-item="selectMenu" :is-scroll="true">
      <yhm-app-structure-top-tap-menu :list="topMenu" :select-item="selectMenu" v-for="(item,index) in topMenu" :key="index" @call="backEvent(item.title)" :title="item.title" :is-scroll="true"></yhm-app-structure-top-tap-menu>
    </yhm-app-structure-top-tap>

    <yhm-app-scroll :is-navigation="true" :select-navigation="selectMenu" :select-navigation-list="topMenu" :empty="false" :init-load-finish="loadFinish" @call="selectEvent">
      <yhm-app-structure-menu-group :title="item.title" v-for="(item,index) in topMenu" :key="index">
        <yhm-app-menu v-for="(menu,i) in item.menu" :key="i + '_' + index" :name="menu.name" :url="menu.imgUrl" @call="gotoEvent(menu.url)"></yhm-app-menu>
      </yhm-app-structure-menu-group>
    </yhm-app-scroll>
  </div>
</template>

<script>
  export default {
    provide(){
      return{
        p____page:this
      }
    },
    name: 'm_tab',
    data(){
      return{
        loadFinish:true,
        selectMenu:'第一',
        topMenu:[{
          title: '第一',
          menu:[
            {
              name:'付款计划',
              imgUrl:'/UploadFile/m_image/menu/paymentPlan.svg',
              url:'/homeApp/m_myPaymentPlanManager?isFinish=1'
            },
            {
              name:'报销申请',
              imgUrl:'/UploadFile/m_image/menu/paymentPlan.svg',
              url:'/homeApp/m_reimbursementManager?isFinish=1'
            }
          ]
        },{
          title: '第二',
          menu:[
            {
              name:'付款计划',
              imgUrl:'/UploadFile/m_image/menu/paymentPlan.svg',
              url:'/homeApp/m_myPaymentPlanManager?isFinish=1'
            },
            {
              name:'报销申请',
              imgUrl:'/UploadFile/m_image/menu/paymentPlan.svg',
              url:'/homeApp/m_reimbursementManager?isFinish=1'
            }
          ]
        },{
          title: '第三',
          menu:[
            {
              name:'付款计划',
              imgUrl:'/UploadFile/m_image/menu/paymentPlan.svg',
              url:'/homeApp/m_myPaymentPlanManager?isFinish=1'
            },
            {
              name:'报销申请',
              imgUrl:'/UploadFile/m_image/menu/paymentPlan.svg',
              url:'/homeApp/m_reimbursementManager?isFinish=1'
            }
          ]
        },{
          title: '第四',
          menu:[
            {
              name:'付款计划',
              imgUrl:'/UploadFile/m_image/menu/paymentPlan.svg',
              url:'/homeApp/m_myPaymentPlanManager?isFinish=1'
            },
            {
              name:'报销申请',
              imgUrl:'/UploadFile/m_image/menu/paymentPlan.svg',
              url:'/homeApp/m_reimbursementManager?isFinish=1'
            }
          ]
        },{
          title: '第五',
          menu:[
            {
              name:'付款计划',
              imgUrl:'/UploadFile/m_image/menu/paymentPlan.svg',
              url:'/homeApp/m_myPaymentPlanManager?isFinish=1'
            },
            {
              name:'报销申请',
              imgUrl:'/UploadFile/m_image/menu/paymentPlan.svg',
              url:'/homeApp/m_reimbursementManager?isFinish=1'
            }
          ]
        },{
          title: '第六',
          menu:[
            {
              name:'付款计划',
              imgUrl:'/UploadFile/m_image/menu/paymentPlan.svg',
              url:'/homeApp/m_myPaymentPlanManager?isFinish=1'
            },
            {
              name:'报销申请',
              imgUrl:'/UploadFile/m_image/menu/paymentPlan.svg',
              url:'/homeApp/m_reimbursementManager?isFinish=1'
            }
          ]
        },{
          title: '第七',
          menu:[
            {
              name:'付款计划',
              imgUrl:'/UploadFile/m_image/menu/paymentPlan.svg',
              url:'/homeApp/m_myPaymentPlanManager?isFinish=1'
            },
            {
              name:'报销申请',
              imgUrl:'/UploadFile/m_image/menu/paymentPlan.svg',
              url:'/homeApp/m_reimbursementManager?isFinish=1'
            }
          ]
        },{
          title: '第八',
          menu:[
            {
              name:'付款计划',
              imgUrl:'/UploadFile/m_image/menu/paymentPlan.svg',
              url:'/homeApp/m_myPaymentPlanManager?isFinish=1'
            },
            {
              name:'报销申请',
              imgUrl:'/UploadFile/m_image/menu/paymentPlan.svg',
              url:'/homeApp/m_reimbursementManager?isFinish=1'
            }
          ]
        },{
          title: '第九',
          menu:[
            {
              name:'付款计划',
              imgUrl:'/UploadFile/m_image/menu/paymentPlan.svg',
              url:'/homeApp/m_myPaymentPlanManager?isFinish=1'
            },
            {
              name:'报销申请',
              imgUrl:'/UploadFile/m_image/menu/paymentPlan.svg',
              url:'/homeApp/m_reimbursementManager?isFinish=1'
            }
          ]
        },{
          title: '第十',
          menu:[
            {
              name:'付款计划',
              imgUrl:'/UploadFile/m_image/menu/paymentPlan.svg',
              url:'/homeApp/m_myPaymentPlanManager?isFinish=1'
            },
            {
              name:'报销申请',
              imgUrl:'/UploadFile/m_image/menu/paymentPlan.svg',
              url:'/homeApp/m_reimbursementManager?isFinish=1'
            }
          ]
        },{
          title: '第十一',
          menu:[
            {
              name:'付款计划',
              imgUrl:'/UploadFile/m_image/menu/paymentPlan.svg',
              url:'/homeApp/m_myPaymentPlanManager?isFinish=1'
            },
            {
              name:'报销申请',
              imgUrl:'/UploadFile/m_image/menu/paymentPlan.svg',
              url:'/homeApp/m_reimbursementManager?isFinish=1'
            }
          ]
        },{
          title: '第十二',
          menu:[
            {
              name:'付款计划',
              imgUrl:'/UploadFile/m_image/menu/paymentPlan.svg',
              url:'/homeApp/m_myPaymentPlanManager?isFinish=1'
            },
            {
              name:'报销申请',
              imgUrl:'/UploadFile/m_image/menu/paymentPlan.svg',
              url:'/homeApp/m_reimbursementManager?isFinish=1'
            }
          ]
        },{
          title: '第十三',
          menu:[
            {
              name:'付款计划',
              imgUrl:'/UploadFile/m_image/menu/paymentPlan.svg',
              url:'/homeApp/m_myPaymentPlanManager?isFinish=1'
            },
            {
              name:'报销申请',
              imgUrl:'/UploadFile/m_image/menu/paymentPlan.svg',
              url:'/homeApp/m_reimbursementManager?isFinish=1'
            }
          ]
        },{
          title: '第十四',
          menu:[
            {
              name:'付款计划',
              imgUrl:'/UploadFile/m_image/menu/paymentPlan.svg',
              url:'/homeApp/m_myPaymentPlanManager?isFinish=1'
            },
            {
              name:'报销申请',
              imgUrl:'/UploadFile/m_image/menu/paymentPlan.svg',
              url:'/homeApp/m_reimbursementManager?isFinish=1'
            }
          ]
        }]
      }
    },
    methods:{
      backEvent(item){
        this.selectMenu = item
      },
      gotoEvent(url){
        this.$router.push(url)
      },
      selectEvent(val){
        this.selectMenu = this.topMenu[val].title
      }
    },
    mounted() {
        setTimeout(() => {
          this.loadFinish = !this.loadFinish
        },200)
    }
  }
</script>

<style scoped>

</style>
