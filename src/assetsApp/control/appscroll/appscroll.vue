<template>
  <div class="app_scroll" @touchstart="touchStart" @touchmove="touchMove" @touchend="touchEnd">
    <!-- 滚动容器 -->
    <div class="app_scroll_wrapper" :style="{transform: 'translate3d(0px, '+ distance +'px, 0px)'}">
      <slot></slot>
      <div v-show="empty" class="app_empty">
        <img src="/UploadFile/m_image/empty.svg">
        <span>暂时没有数据</span>
      </div>
      <div v-show="bottomTipShow" class="app_bottomTip">
        <img src="/UploadFile/m_image/loading.gif">
        <span>{{bottomTipValue}}</span>
      </div>
      <div v-show="isEnd" class="app_bottomTip">
        <span>------- {{isEndTipValue}} -------</span>
      </div>
    </div>
    <!-- 下拉刷新提示区域 -->
    <div v-show="topTipShow" class="app_topTip">
      <img v-show="getImgShow" src="/UploadFile/m_image/loading.gif">
      <dd v-show="getIconShow" :class="{app_topIcon_change:getIconChange}" class="i-expenditure"></dd>
      <span>{{topTipValue}}</span>
    </div>
    <!-- 滚动条 -->
    <div :class="{app_scroll_scrollbar_hide:!scrollbar}" class="app_scroll_scrollbar" :style="{'height':scrollHeight * 0.98 + 'px', 'top': scrollHeight * 0.01 + 'px'}">
      <div class="app_scroll_scrollbar_drag"  :style="{'height':scrollHeight * scrollRatio + 'px', transform: 'translate3d(0px, '+ -distance * scrollRatio +'px, 0px)'}"></div>
    </div>
  </div>
</template>

<script>
  import { guid,accAdd } from '@/assets/common.js'
  export default {
    name: 'yhm-app-scroll',
    inject: ["p____page"],
    data () {
      return {
        isEnd:false,
        pageIndexValue:this.pageIndex,
        param:this.params,
        loadFinish:true,            //是否加载完成
        token:'',                   //请求的标识
        requestToken:[],            //是否需要请求数据
        isSourcePosition:true,      //是否在原点
        flows:0,                    //下拉刷新状态1表示下拉刷新，2表示释放刷新，3表示数据请求中
        refreshFinish:true,         //是否请求完成
        topTipValue:'',             //下拉刷新提示文字
        topTipShow:false,           //下拉刷新提示区域是否显示
        bottomTipValue:'',          //上划加载提示文字
        bottomTipShow:false,        //上划加载提示区域是否显示
        timeoutEvent:null,
        scrollbar:false,
        speed: 4,         // 速度
        translate: 0,     // 滑动距离
        isTop: true,      // 是否滑动到了顶部
        isBottom: false,  // 是否滑动到了底部
        distance: 0,      // 滑动距离
        hisdistance: 0,   // 上一次滑动距离
        maxDistance: '',  // 最大滑动距离
        start: {
          X: 0,
          Y: 0
        },
        move: {
          X: 0,
          Y: 0
        },
        scrollHeight: '', // 滚动条背景高度
        scrollWidth: '', // 滚动条背景宽度
        scrollRatio: '', // 滚动比例
        startTime: '', // 触摸开始时间
        endTime: '', // 触摸结束时间
        maxHeight:0,
        distanceArray:[],    //间隔
        max:0,
        min:0,
        selectIndex:0,
        isMove:false,
      };
    },
    props:{
      isNavigation:{
        type:Boolean,
        default:false
      },
      selectNavigation:{
        type:String,
        default:''
      },
      selectNavigationList:{
        type:Array,
        default:function() {
            return []
        }
      },
      isAllowRefresh:{
        type:Boolean,
        default:true
      },
      isEndTipValue:{
        type:String,
        default:'已加载全部'
      },
      pageIndex:{
        type:Number,
        default:1
      },
      initLoadFinish:{
        type:Boolean,
        default:false
      },
      empty:{
        type:Boolean,
        default:true
      },
      pullDownRefreshUrl:{
        type:String,
        default:''
      },
      pullUpLoadUrl:{
        type:String,
        default:''
      },
      params:{
        type:Object,
        default:function () {
          return {}
        }
      },
      pullDownTitle:{
        type:String,
        default:'下拉刷新'
      },
      pullDownFreedTitle:{
        type:String,
        default:'释放刷新'
      },
      pullDownLoadingTitle:{
        type:String,
        default:'数据请求中'
      },
      pullDownFinish:{
        type:String,
        default:'刷新成功'
      },
      pullUpTitle:{
        type:String,
        default:'正在加载'
      },
    },
    mounted () {
      this.initStyle()
    },
    methods: {
      initStyle(){
        let el = this.$el
        let wrapper = el.firstChild
        let screenHeight = document.documentElement.clientHeight || document.body.clientHeight
        let elHeight = el.clientHeight < screenHeight ? el.clientHeight : screenHeight
        this.min = elHeight - wrapper.clientHeight
        // console.log("screenHeight：" + screenHeight)
        // console.log("elHeight：" + elHeight)
        // console.log("elHeight：" + wrapper.clientHeight)
        // console.log("wrapper.offsetHeight：" + wrapper.offsetHeight)
        this.scrollHeight = elHeight * 0.98
        this.maxDistance = wrapper.offsetHeight - elHeight
        if(this.maxDistance < 0){
          this.maxDistance = 0
        }
        this.scrollRatio = this.scrollHeight / wrapper.offsetHeight
      },
      initDistanceArray(){
        if(this.distanceArray.length === 0){
          let el = this.$el.firstChild
          let start = el.childNodes[0].getBoundingClientRect().y
          for(let i = 0; i < el.childNodes.length; i++){
            let node = el.childNodes[i]
            let val = (node.getBoundingClientRect().y - start) * -1
            if(val < 0) {
              this.distanceArray.push(val)
            }
          }
        }
      },
      initNavigation(){
        console.log(this.distance)
        if(this.distance > this.max){
          this.distance = this.max
        }
        if(this.distance < this.min){
          this.distance = this.min
        }
        this.initDistanceArray()
        // let el = this.$el.firstChild
        // // console.log("this.distance:" + this.distance)
        //
        // if(this.distanceArray.length === 0){
        //   let start = el.childNodes[0].getBoundingClientRect().y
        //   for(let i = 0; i < el.childNodes.length; i++){
        //     let node = el.childNodes[i]
        //     let val = (node.getBoundingClientRect().y - start) * -1
        //     if(val < 0) {
        //       this.distanceArray.push(val)
        //     }
        //   }
        // }

        for(let i = 0; i < this.distanceArray.length; i++){
          let distance = this.distanceArray[i]
          if(distance < this.distance){
            this.selectIndex = i
            break
          }
        }
        // console.log(this.distanceArray)
        // for(let i = 0; i < el.childNodes.length; i++){
        //   let node = el.childNodes[i]
        //
        //   console.log(node.getBoundingClientRect())

          // height = accAdd(height,node.clientHeight)
          // //console.log('height:'+(height * -1))
          // if(height * -1 < this.distance){
          //   selectIndex = i
          //   break
          // }
        // }

        // el.childNodes.forEach(function (node,i) {
        //
        //   console.log('height:'+(height * -1))
        // })
        // console.log('selectIndex:'+this.selectIndex)
        // console.log("==========================")
      },
      initNavigationSelect(selectVal){
        if(this.isNavigation && !this.isMove){
          let selectIndex = 0
          for (let i = 0; i < this.selectNavigationList.length; i++){
            if(this.selectNavigationList[i].title === selectVal){
              selectIndex = i
              break
            }
          }
          this.$el.firstChild.style.transitionDuration = '1000ms'
          if(selectIndex === 0){
            this.distance = 0
            this.hisdistance = 0
          }
          else{
            this.initDistanceArray()
            let val = this.distanceArray[selectIndex-1]
            if(val < this.min){
              val = this.min
            }
            this.distance = val
            this.hisdistance = val
            console.log(11111111111)
          }
        }
      },
      touchStart () {
        this.isMove = false
        // 触摸坐标
        this.start.Y = event.touches[0].clientY;
        this.startTime = new Date().getTime();
        if(this.timeoutEvent){
          clearTimeout(this.timeoutEvent)
        }
        this.token = guid()
        this.scrollbar = true       //按下的时候显示滚动条
        this.isSourcePosition = this.hisdistance === 0  //判断按下的时候是否在原位

      },
      touchMove () {
        this.isMove = true
        this.scrollbar = true
        let self = this;
        event.preventDefault()
        self.$el.firstChild.style.transitionDuration = '0ms'
        self.$el.lastChild.children[0].style.transitionDuration = '0ms'
        // 滑动时候的坐标
        this.move.Y = event.touches[0].clientY
        // 滑动距离
        let tance = this.move.Y - this.start.Y // 本次滑动距离;

        console.log('tance:'+tance)
        console.log('this.hisdistance:'+this.hisdistance)
        console.log('this.distance:'+this.distance)

        this.distance = this.hisdistance + tance // 页面滑动距离(上一次滑动距离 + 本次滑动距离)
        if(this.isNavigation){
          this.initNavigation()
        }

        if(this.pullDownRefreshUrl) {
          //下拉刷新效果
          if (this.isSourcePosition && this.distance > 0 && tance > 0) {
            //说明拉到了顶部，会触发下拉刷新
            if (this.requestToken.length === 0 && this.isSourcePosition && tance > 100) {
              this.refreshFinish = false
              this.topTipShow = true
              this.topTipValue = this.pullDownFreedTitle
              this.flows = 2
              this.requestToken.push(this.token)
            } else if (this.requestToken.length === 0 && this.refreshFinish && tance > 20) {
              this.refreshFinish = false
              this.topTipShow = true
              this.topTipValue = this.pullDownTitle
              this.flows = 1
            }
          } else {
            this.refreshFinish = true
            this.topTipShow = false
            this.topTipValue = ''
            this.requestToken = []
          }
        }

        if(this.pullUpLoadUrl && !this.isEnd) {
          if (this.maxDistance > 0 && this.maxDistance < Math.abs(this.distance) && this.distance < 0) {
            let tempDistance = Math.abs(this.distance) - this.maxDistance
            if (this.loadFinish && tempDistance > 30) {
              this.bottomTipValue = this.pullUpTitle
              this.bottomTipShow = true
              this.loadFinish = false
              this.$nextTick(() => {
                this.initStyle()
              })
              this.pageIndexValue++
              this.param.pageIndex = this.pageIndexValue
              setTimeout(() => {
                this.ajaxJson({
                  url: this.pullUpLoadUrl,
                  data: this.param,
                  loading: '0',
                  call: (data) => {
                    this.$emit("loadCall", data)
                    this.isEnd = data.content.length === 0
                    this.bottomTipShow = false
                    this.loadFinish = true
                    this.flows = 0
                    this.$nextTick(() => {
                      this.initStyle()
                    })
                  }
                })
              }, 1000)
            }
          }
        }
      },
      touchEnd () {
        var self = this;
        self.endTime = new Date().getTime()
        if (this.move.Y === 0) {
          this.scrollbar = false
          return;
        }
        // 如果触摸时间超过500ms，则不加速滑动
        if (self.endTime - self.startTime > 500) {
          self.speed = 1;
        } else {
          self.speed = 4;
        }
        let timeout = 1000
        self.$el.firstChild.style.transitionDuration = '1000ms';
        self.$el.lastChild.children[0].style.transitionDuration = '1000ms';
        if (this.hisdistance + (this.move.Y - this.start.Y) * self.speed >= 0 || Math.abs(this.hisdistance + (this.move.Y - this.start.Y) * self.speed) >= this.maxDistance) {
          self.$el.firstChild.style.transitionDuration = '300ms';
          self.$el.lastChild.children[0].style.transitionDuration = '300ms';
          timeout = 300
        }

        this.distance = this.hisdistance + (this.move.Y - this.start.Y) * self.speed;
        if(this.isNavigation){
          this.initNavigation()
        }

        if (self.distance >= 0) {
          self.hisdistance = 0; // 清除上一次滑动距离
          self.isTop = true; // 滑动到了顶部
          if(this.requestToken.length > 0) {
            if (this.requestToken.indexOf(this.token) !== -1) {
              self.distance = 26;
              //此处可以添加下来刷新代码
              this.topTipShow = true
              this.topTipValue = this.pullDownLoadingTitle
              this.flows = 3
              //下拉刷新设置请求页码为第一页
              this.pageIndexValue = 1
              this.param.pageIndex = this.pageIndexValue
              this.ajaxJson({
                url: this.pullDownRefreshUrl,
                data:this.param,
                loading:'0',
                call: (data) => {
                  this.$emit("refreshCall",data)
                  this.refreshFinish = false
                  this.topTipShow = true
                  this.topTipValue = this.pullDownFinish
                  this.flows = 0
                  this.isEnd = false
                  this.$nextTick(() => {
                    this.initStyle()
                  })
                  setTimeout(() => {
                    this.topTipShow = false
                    this.refreshFinish = true
                    this.requestToken = []
                    self.distance = 0
                  }, 300)
                }
              })

              // setTimeout(() => {
              //   this.refreshFinish = false
              //   this.topTipShow = true
              //   this.topTipValue = '刷新成功'
              //   this.flows = 0
              //   setTimeout(() => {
              //     this.topTipShow = false
              //     this.refreshFinish = true
              //     this.requestToken = []
              //     self.distance = 0
              //   }, 500)
              // }, 2000)
            }
            else{
              self.distance = 26;
            }
          }
          else{
            self.distance = 0
            this.refreshFinish = true
            this.topTipShow = false
            this.topTipValue = ''
            this.requestToken = []
          }
        } else if (Math.abs(self.distance) >= this.maxDistance) {
          self.isBottom = true;

          self.distance = -this.maxDistance;
          self.hisdistance = self.distance; //记录上次滑动的位置
        } else {
          self.isTop = false;
          self.isBottom = false;
          self.hisdistance = self.distance; // 记录上次滑动的位置
        }
        self.move.Y = 0;
        this.timeoutEvent = setTimeout(() => {
          this.scrollbar = false
          this.isMove = false
        },timeout)
      }
    },
    computed:{
      getIconChange(){
        return this.flows === 2
      },
      getIconShow(){
        return this.flows === 1 || this.flows === 2
      },
      getImgShow(){
        return this.flows === 3
      }
    },
    watch:{
      initLoadFinish(newVal){
        if(this.isAllowRefresh) {
          this.isEnd = false,
          this.distance = 0     // 拉动距离回零
          this.isTop = true     // 是否滑动到了顶部
          this.hisdistance = 0  // 上一次滑动距离
        }
        this.initStyle()
      },
      pageIndex(value){
        this.pageIndexValue = value
      },
      pageIndexValue(value){
        let js = "this.p____page.pageIndex = " + value
        eval(js);
      },
      selectIndex(value){
        this.$emit("call",value)
      },
      selectNavigation(value){
        this.initNavigationSelect(value)
      }
    }
  }
</script>


