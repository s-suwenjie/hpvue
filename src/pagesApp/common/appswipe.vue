<template>
  <div>
    <div class="public">
      <div class="carousel" :style="{width:mainWidth+'rem'}">
          <ul class="swiper_center" ref="swiperCenter">
            <li v-for="(item, index) in list" :key="index"
               @touchstart="touchStart($event)"
               @touchmove="touchMove($event)"
                @change="touChange"
               class="swiper_main"
                :style="{width:mainWidth+'rem'}"
               >
              <div class="swiper_main_test">
                <div class="swiper_main_center">
                  <span>
                    {{item.company}}{{index}}
                  </span>
                  <p v-html="tenThousandFormatShow(item.money)"></p>
                </div>
                <div class="icon i-expenditure swiper_main_icon" style="color: #fff;"></div>
              </div>
            </li>
          </ul>
      </div>
    </div>
    <div class="atPresent">
      <ul class="atPresent_center" ref="atPresentCenter">
        <li v-for="(item, index) in list" @click="clickActive(index,'0')" :class="{active:index==ins}" ref="actives" :key="index"></li>
      </ul>
    </div>

  </div>
</template>

<script>
  import { managermixin } from '@/assets/manager.js'
  export default {
    name: 'appswipe',
    mixins:[managermixin],
    data(){
      return{
        startX: '',
        moveX: '',
        active: 0,//图片滚动索引值
        ins:0,//指示器索引值
        flag:true,//判断只执行一次变量
        timer:'',

      }
    },
    props: {
      animationTime: {//图片滚动动画过渡时间(秒)
        type: Number,
        default: 0.5
      },
      activeAnimationTime:{//指示器滚动动画过渡时间(秒)
        type: Number,
        default: 0.6
      },
      mainWidth: {//要滚动的子元素宽度的rem 注:按照一倍图计算rem值
        type: Number,
        default: 9
      },
      indicatorWidth:{//单个指示器的宽度
        type: Number,
        default: 0.7
      },
      autoScroll:{//是否开启图片自动滚动
        type:Boolean,
        default:false
      },
      chillTime:{//图片自动滚动的时间 单位毫秒
        type:Number,
        default:3000
      },
      list: {
        type: Array,
        default: function () {
          return {}
        }
      },
    },
    mounted() {//监听页面刷新 注册事件
      clearInterval(this.timer);
      window.addEventListener('beforeunload', e => this.beforeunloadFn(e))
    },
    destroyed() {//监听用户离开当前页面 卸载事件
      clearInterval(this.timer);//离开时关闭自动轮播定时器 防止定时器叠加,无限循环
      window.removeEventListener('beforeunload', e => this.beforeunloadFn(e))
    },
    methods: {
        beforeunloadFn (e) {},//在生命周期中定义事件
        touChange(active){//当图片发生移动时 返回当前索引值
          this.$nextTick(()=>{
            this.$emit('change',active)
          })
        },
        clickActive(index,num) {//用户点击指示器时添加动画
          this.ins=index
          this.backlate('active',index)//通过用户点击的索引值 绑定图片位置
          if(num=='0'){
            clearInterval(this.timer);//用户点击指示器关闭轮播 便于查看
          }
          // console.log(index)
        },
        //图片移动
        backlate (direction,index) {//direction为用户触摸的方向
          this.$nextTick(() => {
            if (direction == 'fromLeftToRight') {//用户从左往右滑动
              if (this.flag) {
                this.active--
                this.flag = false
                this.clickActive(this.active)//同步图片与指示器位置
                setTimeout(() => {
                  this.flag = true
                }, 500)
              } else {
                // console.log('用户从左往右滑动')
                return;
              }
            } else if(direction == 'fromRightToLeft'){//用户从右往左滑动
              if (this.flag) {
                this.active++
                this.flag = false
                this.clickActive(this.active)//同步图片与指示器位置
                setTimeout(() => {
                  this.flag = true
                }, 500)
              } else {
                // console.log('用户从右往左滑动')
                return;
              }
            } else if(direction == 'active'){//用户通过指示器点击
              a = index * this.mainWidth
              this.active = index
            }
            let a = this.active * this.mainWidth
            // console.log(a, this.active)
            if (this.active == 0) {
              a = 0
            } else if (this.active == this.list.length) {//当前索引为数组最后一个时 循环滚动
              this.active = 0
              a = 0
              this.clickActive(this.active)
            } else if (this.active == -1) {
              a = (this.list.length - 1) * this.mainWidth
              this.active = this.list.length-1
              this.clickActive(this.active)
            }
            setTimeout(() => {
              this.$refs.swiperCenter.style.left = '-' + a + 'rem'
              this.touChange(this.active)//当图片发生移动时 返回当前索引值
            }, 0)

          })
        },
        touchStart (e) {//用户起始触摸屏幕的位置
          this.startX = e.touches[0].pageX;
          // console.log('起始坐标', this.startX)
        },
        touchMove (e) {//用户结束触摸屏幕的位置
          this.moveX = e.touches[0].pageX - this.startX;
          setTimeout(() => {
            if (this.flag) {//触摸事件会执行多次 这里判断只执行一次
              this.flag = false
              setTimeout(() => {
                this.flag = true
                if ((this.moveX - this.startX) > 0) {//结果为正数，则是从左往右划动；
                  this.backlate('fromLeftToRight')//图片移动
                  // console.log(e, '从左往右')
                } else {
                  this.backlate('fromRightToLeft')//图片移动
                  // console.log(e, '从右往左')
                }
              }, 0)
            } else {
              return;
            }
          }, 200)
          // console.log('起始坐标',this.startX,'结束坐标',this.moveX,'最终',this.moveX-this.startX)
        },
      },
    created () {
      this.$nextTick(()=>{
        let distance = this.list.length * this.mainWidth

        this.$refs.swiperCenter.style.width = distance +'rem'//根据当前条数来生成ul的宽度
        this.$refs.swiperCenter.style.transition = this.animationTime+'s'//设置动画过渡时间
        this.$refs.atPresentCenter.style.width = (this.list.length * this.indicatorWidth) +'rem'//整体指示器的宽度
        console.log(this.autoScroll)
        if(this.autoScroll){//自动轮播
         this.timer = setInterval(()=>{
            this.active++
            this.ins++
            this.clickActive(this.active)//同步图片与指示器位置
            console.log(this.active)
          },this.chillTime)
        }
      })
    }
  }
</script>
<style lang="less" scoped>
  @rem: 375/10rem;
  .active{
    padding-right: 48/@rem !important;
    background: #49a9ea !important;
    transition: all 0.6s;
  }
  .atPresent{
    width: 100%;

    .atPresent_center{
      margin: 0 auto;
      width: 300/@rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    li{
      width: 14/@rem;
      height: 4/@rem;
      border: solid 1/@rem #bfbfbf;
      background: #fff;
      border-radius: 2/@rem;
    }
  }
  .swiper_main_test{
    display: flex;
    justify-content: space-between;

    .swiper_main_icon{
      margin-top: 17/@rem;
    }
    .swiper_main_center{
      /*display: block;*/
      width: 167/@rem;

      span{
        display: flex;
        align-items: center;
        text-align: left;
        color: #fff;
        width: 167/@rem;
        height: 32/@rem;
        font-size: 14/@rem;
      }
      p{
        font-size: 14/@rem;
        margin-top: 18/@rem;
        text-align: right;
        color: #fff;
      }
    }
  }
  .swiper_center{
    width: 16rem;
    position: relative;
    left: 0;
    top: 0;
    height: 90/@rem;
  }
  .public{
    display: flex;
    justify-content: center;
    align-items: center;
    margin:12/@rem 0;
  }
  .carousel {
    overflow: hidden;
    height: 90/@rem;
    position: relative;
  }
    .swiper_main{
      float: left;
      height:100%;
      box-sizing: border-box;
      background: #49a9ea;
      border-radius: 8/@rem;
      border: 1/@rem solid #49a9ea;
      text-align: center;
      padding: 12/@rem;

    }

</style>
