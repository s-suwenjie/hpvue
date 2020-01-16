<template>
  <div class="app_main">
<!--    <div class="navigation">-->
<!--      <div class="navigation_center">-->
<!--        <a :href="item.href" v-for="(item) in navigationList" :key="item" @click="navClick()" class="navTitle">{{item.navTitle}}</a>-->
<!--      </div>-->
<!--    </div>-->
<!--    <yhm-app-scroll :close-roll-switch="true" :init-load-finish="loadFinish" :empty="false" @touchStart="onScroll()">-->

    <!-- 内容区域 -->
    <div class="content">
      <div>
        我的审批
      </div>
      <div>
        我的操作
      </div>
      <div>
        我的报销
      </div>
      <div>
        采购申请
      </div>
    </div>
    <!-- 导航区域 -->
    <ul class="navs">
      <li :class="{active: active===0}" @click="scrollTo(0)">
        我的审批
      </li>
      <li :class="{active: active===1}" @click="scrollTo(1)">
        我的操作
      </li>
      <li :class="{active: active===2}" @click="scrollTo(2)">
        我的报销
      </li>
      <li :class="{active: active===3}" @click="scrollTo(3)">
        采购申请
      </li>

    </ul>


<!--    <van-tabbar v-model="bottomNavActive" @change="tabChange" style="z-index: 111;border-radius: 0.213333rem 0.213333rem 0 0;border-top: 0.026666rem solid #bfbfbf;" >-->
<!--      <van-tabbar-item icon="home-o">分类</van-tabbar-item>-->
<!--      <van-tabbar-item icon="search">消息</van-tabbar-item>-->
<!--      <van-tabbar-item icon="friends-o">我的</van-tabbar-item>-->
<!--    </van-tabbar>-->
  </div>

</template>

<script>
  // import { appviewmixin } from '@/assetsApp/app_view.js'
  export default {
    name: 'm_menuBar',
    props: {},
    data(){
      return{
        active: 0 ,// 当前激活的导航索引
        bottomNavActive:0,
        paymentPlan:'',      //付款计划条数
        paymentApply:'',     //付款条数
        reimbursement:'',    //报销条数
        purchase:'',          //采购条数
        icon: {
          active: '../../static/appStatic/images/navigation/classify_select.png',
          inactive: '../../static/appStatic/images/navigation/classify.png'
        },
        navigationList:[
          {
            'href': '#menuGroup1',
            'navTitle':'我的审批'
          },
          {
            'href': '#menuGroup2',
            'navTitle':'我的操作'
          },
          {
            'href': '#menuGroup3',
            'navTitle':'我的报销'
          },
          {
            'href': '#menuGroup4',
            'navTitle':'采购申请'
          },
          {
            'href': '#menuGroup5',
            'navTitle':'我的操作'
          },
          {
            'href': '#menuGroup6',
            'navTitle':'我的报销'
          },
          {
            'href': '#menuGroup7',
            'navTitle':'采购申请'
          }
        ],
        bottomNavigationList:[
          {
            'img':'../../static/appStatic/images/navigation/classify.png',
            'imgSelect':'../../static/appStatic/images/navigation/classify_select.png',
            'title':'分类'
          },
          {
            'img':'../../static/appStatic/images/navigation/message.png',
            'imgSelect':'../../static/appStatic/images/navigation/message_select.png',
            'title':'消息'
          },
          {
            'img':'../../static/appStatic/images/navigation/my.png',
            'imgSelect':'../../static/appStatic/images/navigation/my_select.png',
            'title':'我的'
          }
        ]
      }
    },
    mounted() {
      // 监听滚动事件
      window.addEventListener('scroll', this.onScroll, false)
    },
    destroy() {
      // 必须移除监听器，不然当该vue组件被销毁了，监听器还在就会出错
      window.removeEventListener('scroll', this.onScroll)
    },
    methods:{
      // 滚动监听器
      onScroll() {
        // 获取所有锚点元素
        const navContents = document.querySelectorAll('.content div')
        // 所有锚点元素的 offsetTop
        const offsetTopArr = []
        navContents.forEach(item => {
          offsetTopArr.push(item.offsetTop)
        })
        // 获取当前文档流的 scrollTop
        const scrollTop = document.documentElement.scrollTop || document.body.scrollTop
        // 定义当前点亮的导航下标
        let navIndex = 0
        for (let n = 0; n < offsetTopArr.length; n++) {
          // 如果 scrollTop 大于等于第n个元素的 offsetTop 则说明 n-1 的内容已经完全不可见
          // 那么此时导航索引就应该是n了
          if (scrollTop >= offsetTopArr[n]) {
            navIndex = n
          }
        }
        this.active = navIndex
      },
      // 跳转到指定索引的元素
      scrollTo(index) {
        // 获取目标的 offsetTop
        // css选择器是从 1 开始计数，我们是从 0 开始，所以要 +1
        const targetOffsetTop = document.querySelector(`.content div:nth-child(${index + 1})`).offsetTop
        // 获取当前 offsetTop
        let scrollTop = document.documentElement.scrollTop || document.body.scrollTop
        // 定义一次跳 50 个像素，数字越大跳得越快，但是会有掉帧得感觉
        const STEP = 50
        // 判断是往下滑还是往上滑
        if (scrollTop > targetOffsetTop) {
          // 往上滑
          smoothUp()
        } else {
          // 往下滑
          smoothDown()
        }
        // 定义往下滑函数
        function smoothDown() {
          // 如果当前 scrollTop 小于 targetOffsetTop 说明视口还没滑到指定位置
          if (scrollTop < targetOffsetTop) {
            // 如果和目标相差距离大于等于 STEP 就跳 STEP
            // 否则直接跳到目标点，目标是为了防止跳过了。
            if (targetOffsetTop - scrollTop >= STEP) {
              scrollTop += STEP
            } else {
              scrollTop = targetOffsetTop
            }
            document.body.scrollTop = scrollTop
            document.documentElement.scrollTop = scrollTop
            // 关于 requestAnimationFrame 可以自己查一下，在这种场景下，相比 setInterval 性价比更高
            requestAnimationFrame(smoothDown)
          }
        }
        // 定义往上滑函数
        function smoothUp() {
          if (scrollTop > targetOffsetTop) {
            if (scrollTop - targetOffsetTop >= STEP) {
              scrollTop -= STEP
            } else {
              scrollTop = targetOffsetTop
            }
            document.body.scrollTop = scrollTop
            document.documentElement.scrollTop = scrollTop
            requestAnimationFrame(smoothUp)
          }
        }
      },
    },
    created () {
      this.ajaxJson({
        url: '/PersonOffice/m_approvalManagerAllNumber',
        loading:'0',
        call: (data) => {
          this.paymentPlan = data.payPlan
          this.paymentApply = data.payment
          this.reimbursement = data.reimbursements
          this.purchase = data.purchase
        }
      })
    }
  }
</script>
<style lang="less">/*适配vant下tabbar组件(不能使用自动适配,pc端会乱)*/
@rem:375/10rem;
.van-tabbar{
  height: 50/@rem !important;
  border-top: 1/@rem solid #bfbfbf;
}
.van-tabbar-item{
  height: 50/@rem;
  font-size: 12/@rem;
  .van-tabbar-item__text{
    font-size: 12/@rem;
  }
  .van-tabbar-item__icon{
   margin-bottom: 2/@rem;
  }
}
.van-tabbar-item__icon i{
  font-size: 19/@rem;
}
</style>
<style scoped lang="less">
@rem:375/10rem;
.navigation{
  padding:0 30/@rem;
  box-sizing: border-box;
  width: 100%;
  height: 45/@rem;

  .navigation_center{
    height: 100%;
    display: flex;
    overflow: hidden;
    overflow-x: auto;
    align-items: center;
    justify-content: space-between;
    /*position: relative;*/
  }
  .navTitle{
    /*position: absolute;*/
    white-space: nowrap;
    float: left;
    font-size: 14/@rem;
    margin-right: 20/@rem;
    color: #666666;
  }
}
.bottomNavigation{
  width: 100%;
  height: 54/@rem;
  border-radius: 8/@rem 8/@rem 0 0;
  position: fixed;
  bottom: 0;
  z-index: 100;
  background-color: #fff;
  shadowColor: #bfbfbf;
  display: flex;
  align-items: center;
  justify-content: space-around;
  border-top: 1/@rem solid #bfbfbf;
  .bottomNavTitle{
    flex: 1;
    padding: 10/@rem 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    img{
      display: block;
      margin: auto;
    }
    span{
      color: #666666;
      font-size: 12/@rem;
      text-align: center;
    }
  }
}
.content {
  background-color: white;
  width: auto;

}
.content div {
  width: 100%;
  height: 1600/@rem;
  line-height: 800/@rem;
  font-size: 36/@rem;
  background-color: #7ec384;
}
.content div:nth-child(2n) {
  background-color: #847ec3;
}
/* 导航栏的样式 */
.navs {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 45/@rem;
  line-height: 45/@rem;
  overflow-x: auto;
  padding: 0 30/@rem;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #fff;
}
.navs li {
  white-space: nowrap;
  float: left;
  display: flex;
  align-items: center;
  height: 25/@rem;
  font-size: 14/@rem;

  list-style-type:none;
}
/* 当导航被点亮后改变颜色 */
.navs .active{
  color: #49a9ea;
  background-color: #fff;
  border-bottom: 2/@rem solid #49a9ea;
  box-sizing: border-box;
}
</style>
