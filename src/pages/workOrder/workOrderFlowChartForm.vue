<template>
    <div>
      <div style="background-color: #fff;min-height: 800px;" :style="{height:list3?(list3.length/5)*400+'px':'800px'}">
        <div class="top_center" style="padding-top: 20px;">
          <yhm-commonbutton :value="indexs==0?'开始':'继续'" v-if="state==0" icon="i" class="workOrderBtn" @call="beginClick()" :flicker="true" ></yhm-commonbutton>
          <yhm-commonbutton value="已交车" v-else icon="i" class="workOrderBtn" ></yhm-commonbutton>

          <!--    固定的准备阶段      v-show="prepareShow"-->
          <div style="width: 86.5%;height: 263px" v-for="(items,key) in immobilizationList[0]" :key=key>
            <div class="straightLine">
              <div class="circleTitle" v-for="(item,index) in immobilizationList[0].list" :key="index"
                   :style="{
                      'left':index==0?'66px':66+(index*100)+ 'px',
                      'top':item.direction=='1'?'130px':'',
                   }"
              >
                <div class="circleTitle2">
                  <span class="circle" ref="circleClick" @click="circleClick(item)" :class="{'atPresent':item.index==indexs}"></span>
                  <p class="circleTitle_center" :class="{'circleTitle_center_right':index==4}" :style="{'color':item.stageColor,}">{{item.title}}</p>
                  <p style="text-align: center;" :class="{'circleTetRight':index==4}">{{item.state==0?'未完成':'已完成'}}</p>
                </div>
                <span  class="i-input-left-arrow" v-show="index==4&&content[0].list.length==0"
                       style="font-size: 30px;float: left;position: relative;top: 45px;left: -119px;z-index: 1;"></span>

                <div class="bor" v-if="index==4">
                  <span class="semicircleRight"></span>
                  <span class="semicircleCentre"></span>
                </div>
                <div class="straightLine"
                     v-show="index==items.length-1&&items.length<5"
                     :style="{'left':index==3?'30px':(4-index)*110+30+'px'}"
                     style="width: 150px;margin-top: 0;position: absolute;top: 0;"
                >
                  <span  class="i-input-right-arrow" style="font-size: 30px;float: left;position: absolute;top: -13px;right: -12px;"></span>

                </div>
              </div>

            </div>
          </div>
<!--          &lt;!&ndash;     主流程服务阶段未生成时的假模型节点     &ndash;&gt;-->
<!--          <div style="width: 86.5%;height: 263px" v-show="modelShow" v-for="(items,key) in modelList" :key=key>-->
<!--            <div class="straightLine semicircleLeft" v-show="key%2==0?true:false">-->
<!--              <div class="circleTitle" v-for="(item,index) in items.list" :key="index"-->
<!--                   :style="{-->
<!--                    'right':index==0?'-520px':(-520+(index*260))+ 'px',-->
<!--                    'top':item.direction=='2'?'130px':'',-->
<!--                 }"-->
<!--              >-->
<!--                <div class="circleTitle2">-->
<!--                  <span class="circle" @click="circleClick(item)"  :class="{'circleTitle_circle':index==4,'atPresent':item.index==indexs}"></span>-->
<!--                  <p class="circleTitle_center" :class="{'circleTitle_center_left':index==4}" :style="{'color':item.stageColor}">{{item.title}}</p>-->
<!--                  <p style="text-align: center;" :class="{'circleTetLeft':index==4}">{{item.state==0?'未完成':'已完成'}}</p>-->
<!--                </div>-->
<!--                <div class="bor borLeft" :class="{'borLeft':item.direction=='2'?true:false}" v-if="index==4">-->
<!--                  <span class="semicircleRight"></span>-->
<!--                  <span class="semicircleCentre"></span>-->
<!--                </div>-->
<!--                <div class="straightLine"-->
<!--                     v-show="index==items.list.length-1"-->
<!--                     style="width: 150px;margin-top: 0;position: absolute;top: 133px;left:199px;"-->
<!--                >-->
<!--                  <span  class="i-input-right-arrow" style="font-size: 30px;float: left;position: absolute;top: -13px;right: -12px;"></span>-->

<!--                </div>-->

<!--              </div>-->
<!--            </div>-->
<!--          </div>-->

          <div style="width: 86.5%;height: 263px" v-for="(items,key) in content" :key=key>
            <div class="straightLine semicircleLeft" v-show="key%2==0?true:false" v-if="items.list.length!=0">
              <div class="circleTitle" v-for="(item,index) in items.list" :key="index"
                   :style="{
                    'right':index==0?'-520px':(-520+(index*260))+ 'px',
                    'top':item.direction=='2'?'130px':'',
                 }"
              >
                <div class="circleTitle2">
                  <span class="circle" ref="circleClick" @click="circleClick(item)"  :class="{'circleTitle_circle':index==4,'atPresent':item.index==indexs}"></span>
                  <p class="circleTitle_center" :class="{'circleTitle_center_left':index==4}" :style="{'color':item.stageColor}">{{item.title}}</p>
                  <p style="text-align: center;" :class="{'circleTetLeft':index==4}">{{item.state==0?'未完成':'已完成'}}</p>
                </div>
                <div class="bor borLeft" :class="{'borLeft':item.direction=='2'?true:false}" v-if="index==4">
                  <span class="semicircleRight"></span>
                  <span class="semicircleCentre"></span>

                </div>
                <span  class="i-input-right-arrow" v-show="index==4&&content[key+1].list.length==0"
                       style="font-size: 30px;float: right;position: relative;top: 45px;right: -137px;"></span>

                <div class="straightLine"
                     v-show="index==items.list.length-1&&items.list.length<5"
                     :style="{'right':index==3?'30px':(4-index)*105+30+'px'}"
                     style="width: 150px;margin-top: 0;position: absolute;top: 0;"
                >
                  <span  class="i-input-left-arrow" style="font-size: 30px;float: left;position: absolute;top: -12px;left: -12px;"></span>

                </div>

              </div>
              <span  class="i-input-left-arrow" v-show="items.list.length==0" style="font-size: 30px;float: left;position: absolute;top: -12px;left: -12px;"></span>

            </div>

            <div class="straightLine towardsTheRight" v-show="key%2==0?false:true"  v-if="items.list.length!=0">
              <div class="circleTitle" v-for="(item,index) in items.list" :key="index"
                   :style="{
                      'left':index==0?'-40px':-40+(index*100)+ 'px',
                      'top':item.direction=='1'?'130px':'',
                   }"
              >
                <div class="circleTitle2">
                  <span class="circle" ref="circleClick" @click="circleClick(item)" :class="{'circleRight':index==4,'atPresent':item.index==indexs}"></span>
                  <p class="circleTitle_center" :class="{'circleTitle_center_right':index==4}" :style="{'color':item.stageColor,}">{{item.title}}</p>
                  <p style="text-align: center;" :class="{'circleTetRight':index==4}">{{item.state==0?'未完成':'已完成'}}</p>
                </div>
                <div class="bor borRight" v-if="index==4">
                  <span class="semicircleRight semicircleBorRight"></span>
                  <span class="semicircleCentre"></span>
                </div>
                <span  class="i-input-left-arrow" v-show="index==4&&content[key+1].list.length==0"
                       style="font-size: 30px;float: left;position: relative;top: 45px;left: -119px;"></span>

                <div class="straightLine"
                     v-show="index==items.list.length-1&&items.list.length<5"
                     :style="{'left':index==3?'30px':(4-index)*110+30+'px'}"
                     style="width: 150px;margin-top: 0;position: absolute;top: 0;"
                >
                  <span  class="i-input-right-arrow" style="font-size: 30px;float: left;position: absolute;top: -13px;right: -12px;"></span>

                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
  import { formmixin } from '@/assets/form.js'
  export default {
    name: 'workOrderFlowChartForm',
    mixins: [formmixin],
    data(){
      return{
        colorList:['fd6802','2f54eb','a60cde','d618ab','2c920b'],
        // direction:'',//通过数组长度/5的结果 算出当前在左边还是在右边
        indexs:0,//总索引值
        key:0,
        state:'',//当前主流程表是否已完成
        stage:'',//阶段
        modelShow:true,//假阶段
        // prepareShow:false,//准备阶段是否展示出来
        list3:[],//返修节点的数据
        flowPathID:'',//主流程图id
        immobilizationList:[
          {
            list:[
              {
                title:'定损单',//标题
                stage:'1',//阶段
                type:'',//流程阶段
                state:'',//状态:已完成未完成
                stageColor:'#fd6802',//当前阶段的颜色
                circleIcon:'',//节点图标
                direction:'0',//border的类型 0直线 1右边曲线 2左边曲线
                index:'0',//全部节点的索引值
              },
              {

                title:'工单详情',//标题
                stage:'1',//阶段
                type:'',//流程阶段
                state:'',//状态:已完成未完成
                stageColor:'#fd6802',//当前阶段的颜色
                circleIcon:'',//节点图标
                direction:'0',//border的类型 0直线 1右边曲线 2左边曲线
                index:'1',//全部节点的索引值
              },
              {
                title:'工单材料',//标题
                stage:'1',//阶段
                type:'',//流程阶段
                state:'',//状态:已完成未完成
                stageColor:'#fd6802',//当前阶段的颜色
                circleIcon:'',//节点图标
                direction:'0',//border的类型 0直线 1右边曲线 2左边曲线
                index:'2',//全部节点的索引值
              },
              {
                title:'出库',//标题
                stage:'1',//阶段
                type:'',//流程阶段
                state:'',//状态:已完成未完成
                stageColor:'#2f54eb',//当前阶段的颜色
                circleIcon:'',//节点图标
                direction:'0',//border的类型 0直线 1右边曲线 2左边曲线
                index:'3',//全部节点的索引值
              },
              {
                title:'选择工序',//标题
                stage:'1',//阶段
                type:'',//流程阶段
                state:'',//状态:已完成未完成
                stageColor:'#2f54eb',//当前阶段的颜色
                circleIcon:'',//节点图标
                direction:'1',//border的类型 0直线 1右边曲线 2左边曲线
                index:'4',//全部节点的索引值
              },
            ]
          },
        ],
        modelList:[
          {
            direction:'1',
            list:[
              {
                title:'',//标题
                type:'',//流程阶段
                stage:'1',//阶段
                state:'',//状态:已完成未完成
                stageColor:'#a60cde',//当前阶段的颜色
                circleIcon:'',//节点图标
                direction:'0',//border的类型 0直线 1右边曲线 2左边曲线
                index:'5',//全部节点的索引值
              },
              {
                title:'',//标题
                type:'',//流程阶段
                stage:'1',//阶段
                state:'',//状态:已完成未完成
                stageColor:'#a60cde',//当前阶段的颜色
                circleIcon:'',//节点图标
                direction:'0',//border的类型 0直线 1右边曲线 2左边曲线
                index:'6',//全部节点的索引值
              },
              {
                title:'检验',//标题
                type:'',//流程阶段
                stage:'1',//阶段
                state:'',//状态:已完成未完成
                stageColor:'#a60cde',//当前阶段的颜色
                circleIcon:'',//节点图标
                direction:'0',//border的类型 0直线 1右边曲线 2左边曲线
                index:'7',//全部节点的索引值
              },
              {
                title:'',//标题
                type:'',//流程阶段
                stage:'1',//阶段
                state:'',//状态:已完成未完成
                stageColor:'#d618ab',//当前阶段的颜色
                circleIcon:'',//节点图标
                direction:'0',//border的类型 0直线 1右边曲线 2左边曲线
                index:'8',//全部节点的索引值
              },
              {
                title:'交车',//标题
                type:'',//流程阶段
                stage:'2',//阶段
                state:'',//状态:已完成未完成
                stageColor:'#2c920b',//当前阶段的颜色
                circleIcon:'',//节点图标
                direction:'2',//border的类型 0直线 1右边曲线 2左边曲线
                index:'9',//全部节点的索引值
              },
            ]
          },
        ],
        content:[
          {
            direction:'2',
            list:[]
          }
          // {
          //   direction:'3',
          //   list:[
          //     {
          //       title:'服务1',//标题
          //       stage:'1',//阶段
          //       stageColor:'#a60cde',//当前阶段的颜色
          //       circleIcon:'',//节点图标
          //       direction:'0',//border的类型 0直线 1右边曲线 2左边曲线
          //       index:'10',//全部节点的索引值
          //     },
          //     {
          //       title:'服务2',//标题
          //       stage:'1',//阶段
          //       stageColor:'#a60cde',//当前阶段的颜色
          //       circleIcon:'',//节点图标
          //       direction:'0',//border的类型 0直线 1右边曲线 2左边曲线
          //       index:'11',//全部节点的索引值
          //     },
          //     {
          //       title:'服务3',//标题
          //       stage:'1',//阶段
          //       stageColor:'#a60cde',//当前阶段的颜色
          //       circleIcon:'',//节点图标
          //       direction:'0',//border的类型 0直线 1右边曲线 2左边曲线
          //       index:'12',//全部节点的索引值
          //     },
          //     {
          //       title:'检验',//标题
          //       stage:'1',//阶段
          //       stageColor:'#d618ab',//当前阶段的颜色
          //       circleIcon:'',//节点图标
          //       direction:'0',//border的类型 0直线 1右边曲线 2左边曲线
          //       index:'13',//全部节点的索引值
          //     },
          //     {
          //       title:'交车',//标题
          //       stage:'2',//阶段
          //       stageColor:'#2c920b',//当前阶段的颜色
          //       circleIcon:'',//节点图标
          //       direction:'1',//border的类型 0直线 1右边曲线 2左边曲线
          //       index:'14',//全部节点的索引值
          //     },
          //   ]
          // }
        ],
        backupsList:[
          {
            list:[
              {

                title:'工单详情',//标题
                type:'',//流程阶段
                stage:'1',//阶段
                state:'1',//状态:已完成未完成
                stageColor:'#fd6802',//当前阶段的颜色
                circleIcon:'',//节点图标
                direction:'0',//border的类型 0直线 1右边曲线 2左边曲线
                index:'1',//全部节点的索引值
              },
              {
                title:'工单材料表',//标题
                type:'',//流程阶段
                stage:'1',//阶段
                state:'1',//状态:已完成未完成
                stageColor:'#fd6802',//当前阶段的颜色
                circleIcon:'',//节点图标
                direction:'0',//border的类型 0直线 1右边曲线 2左边曲线
                index:'2',//全部节点的索引值
              },
              {
                title:'出库',//标题
                type:'',//流程阶段
                stage:'1',//阶段
                state:'1',//状态:已完成未完成
                stageColor:'#2f54eb',//当前阶段的颜色
                circleIcon:'',//节点图标
                direction:'0',//border的类型 0直线 1右边曲线 2左边曲线
                index:'3',//全部节点的索引值
              },
              {
                title:'',//标题
                type:'',//流程阶段
                stage:'2',//阶段
                state:'',//状态:已完成未完成
                stageColor:'#a60cde',//当前阶段的颜色
                circleIcon:'',//节点图标
                direction:'1',//border的类型 0直线 1右边曲线 2左边曲线
                index:'4',//全部节点的索引值
              },
            ]
          },
        ],

      }
    },
    //进入该页面时
    beforeRouteEnter (to, from, next) {
      next(vm => {
        let  a =  JSON.parse(sessionStorage.processState||0)
        if(a.id==vm.ownerID){
          vm.proState = a.proState
        }
      })
    },
    methods:{
      skipEvent(url,title,height){
        if(!height||height==undefined){
          height='700'
        }
        this.$dialog.OpenWindow({
          width: '1050',
          height: height,
          url:url,
          title:title,
          closeCallBack:(data) =>{
            this.initData()
          }
        })
      },
      // nodeDiagram(){
      //   for(let j in this.backupsList[0].list){
      //     if(this.indexs<=3&&j<=this.indexs){
      //       this.immobilizationList[0].list.push(this.backupsList[0].list[j])
      //       alert(j)
      //     }
      //
      //   }
      // },
      nodeDiagramState(){//改变准备节点的完成状态
        for(let j in this.immobilizationList[0].list){
          if(j<this.indexs){
            this.immobilizationList[0].list[j].state = 1
          }
        }
      },
      beginClick(){

        let url = ''
        let title = ''
        let height = '700'
        this.nodeDiagramState()
        let inTheEnd = ''
        let index = ''
        let item = ''
        console.log( item,this.indexs,'item' )
        if(this.list3){
          item = this.list3[this.indexs-4]
          inTheEnd = item.orderStr==this.list3.length+3//判断是否是最后一个服务节点
          console.log(inTheEnd,item.orderStr,this.list3.length+3,'是不是最后一个节点'  )
          index = this.list3.length+4//检修节点的索引值
        }else{
          let items = this.immobilizationList[0].list[this.indexs]
          // console.log( this.immobilizationList[this.indexs],this.indexs,items,'items' )
          inTheEnd = false
          this.nodeDiagramState()
          if(this.indexs=='0'){
            url = '/lossAssessmentForm?ownerID='+this.ownerID+'&flowPathID='+this.flowPathID//定损单录制
            title = '添加定损单'
            this.skipEvent(url,title)
          }else if(this.indexs=='1'){
            url = '/workOrderDetailsManagerView?ownerID='+this.ownerID+'&flowPathID='+this.flowPathID//工单详情列表
            title = '工单详情列表'
            this.skipEvent(url,title)
          }else if(this.indexs=='2'){
            url = '/workOrderMaterialListManagerView?ownerID='+this.ownerID+'&flowPathID='+this.flowPathID//工单材料列表
            title = '工单材料列表'
            this.skipEvent(url,title)
          }else if(this.indexs=='3'){//准备阶段的出库
            url = '/workOrderStockOutManagerView?ownerID='+this.ownerID+'&flowPathID='+this.flowPathID
            title = '出库'
            this.skipEvent(url,title)
          }
          if(items.title=='选择工序'&&this.indexs==items.index){
            // url = '/workOrderDetailsManagerView?ownerID='+this.ownerID+'&flowPathID='+this.flowPathID+'&operationShow=1'+'&index='+item.index+'&upDateStateID='+item.id
            // title = '选择服务流程'
            url = '/workOrderProcessForm?ownerID='+this.ownerID+'&flowPathID='+this.flowPathID+'&index='+items.index
            title = '选择工序'
            this.skipEvent(url,title)
            return
          }else if(items.title=='选择工序'&&this.indexs!=items.index){
            this.$dialog.alert({
              tipValue:'当前选择工序节点无法操作,请重新创建节点。',
              alertImg:'warn',
              width:'330'
            })
          }
          return
        }
        console.log( Number(item.orderStr), Number(this.indexs))
        if(Number(item.orderStr)<=Number(this.indexs)){
          if(item.nameStr=='交车'){//已完成
            return
          }
          console.log( '1' ,this.indexs,item.orderStr,item.nameStr)
          if(item.orderStr=='0'||item.nameStr=='定损单'){//定损单
            url = '/lossAssessmentForm?ownerID='+this.ownerID+'&flowPathID='+this.flowPathID+'&inTheEnd='+inTheEnd+'&index='+item.orderStr+'&upDateStateID='+item.id//定损单录制
            title = '定损单'
            console.log( '2' )
            this.skipEvent(url,title)
            return
          }else if(item.orderStr=='1'||item.nameStr=='工单详情'){//工单详情
            url = '/workOrderDetailsManagerView?ownerID='+this.ownerID+'&flowPathID='+this.flowPathID+'&inTheEnd='+inTheEnd+'&index='+item.orderStr+'&upDateStateID='+item.id//工单详情列表
            title = '工单详情'
            console.log( '3' )
            this.skipEvent(url,title)
            return
          }else if(item.orderStr=='2'||item.nameStr=='工单材料'){//工单材料
            url = '/workOrderMaterialListManagerView?ownerID='+this.ownerID+'&flowPathID='+this.flowPathID+'&inTheEnd='+inTheEnd+'&index='+item.orderStr+'&upDateStateID='+item.id//工单材料列表
            title = '工单材料'
            console.log( '4' )
            this.skipEvent(url,title)
            return
          }else if(item.nameStr=='检修'){//检修
            url = '/workOrderCheckoutManagerView?ownerID='+this.ownerID+'&subProcessID='+item.id
              +'&flowPathID='+this.flowPathID+'&state='+this.state+'&index='+item.orderStr
              +'&upDateStateID='+item.id+'&inTheEnd='+inTheEnd
            title = '检修'
            console.log( '5' )
            this.skipEvent(url,title,'700')
            return
          }
          if(item.nameStr=='出库'&&item.orderStr!='3'){//不是准备阶段的出库时
            url = '/workOrderStockOutManagerView?ownerID='+this.ownerID+'&stateID='+item.id+'&flowPathID='+this.flowPathID+'&index='+item.orderStr+'&upDateStateID='+item.id
            title = '出库'
            console.log( '6' )
            this.skipEvent(url,title,'700')
            return
          }else if(item.orderStr==3){//准备阶段的出库
            url = '/workOrderStockOutManagerView?ownerID='+this.ownerID+'&flowPathID='+this.flowPathID+'&upDateStateID='+item.id
            title = '出库'
            console.log( '7' )
            this.skipEvent(url,title)
            return
          }
          if(item.nameStr=='选择工序'&&this.indexs==item.orderStr){
            // url = '/workOrderDetailsManagerView?ownerID='+this.ownerID+'&flowPathID='+this.flowPathID+'&operationShow=1'+'&index='+item.index+'&upDateStateID='+item.id
            // title = '选择服务流程'
            url = '/workOrderProcessForm?ownerID='+this.ownerID+'&flowPathID='+this.flowPathID+'&index='+item.orderStr
            title = '选择工序'
            console.log( '8' )
            this.skipEvent(url,title)
            return
          }else if(item.nameStr=='选择工序'&&this.indexs!=item.orderStr){
            this.$dialog.alert({
              tipValue:'当前选择工序节点无法操作,请重新创建节点。',
              alertImg:'warn',
              width:'330'
            })
          }
          if(item.type=='5'&&this.indexs>=item.orderStr){//查看工序
            console.log( '1' )
            url = '/workOrderProcessForm?ownerID='+this.ownerID
              +'&flowPathID='+this.flowPathID+'&index='+item.orderStr
              +'&flowType='+item.type+'&dependid='+item.dependid
              +'&upDateStateID='+item.id+'&inTheEnd='+inTheEnd
            title = '查看'+item.nameStr
            this.skipEvent(url,title)
            return
          }

          if(item.stage==2&&item.nameStr!='检修'&&item.type<'5'){//服务节点
            // alert(item.ownerID)
            console.log( item,item.ownerID )
            console.log( '2' )
            url = '/workOrderServiceView?id='+item.dependid+'&ownerID='+this.ownerID+'&flowPathID='+this.flowPathID+'&subProcessID='+item.id+'&inTheEnd='+inTheEnd+'&index='+index
            title = item.title
            height = '450'
            this.skipEvent(url,title,height)
          }
          if(item.type=='7'){
            url = '/workOrderServiceView?ownerID='+this.ownerID
            title = item.title
            height = '800'
            this.skipEvent(url,title,height)
          }
        }


        // let url = ''
        // let title = ''
        // this.prepareShow = true
        // // if(this.indexs){
        //
        // // }
        // this.nodeDiagramState()
        // if(this.indexs=='0'){
        //   url = '/lossAssessmentForm?ownerID='+this.ownerID+'&flowPathID='+this.flowPathID//定损单录制
        //   title = '添加定损单'
        //   this.skipEvent(url,title)
        // }else if(this.indexs=='1'){
        //   url = '/workOrderDetailsManagerView?ownerID='+this.ownerID+'&flowPathID='+this.flowPathID//工单详情列表
        //   title = '工单详情列表'
        //   this.skipEvent(url,title)
        // }else if(this.indexs=='2'){
        //   url = '/workOrderMaterialListManagerView?ownerID='+this.ownerID+'&flowPathID='+this.flowPathID//工单材料列表
        //   title = '工单材料列表'
        //   this.skipEvent(url,title)
        // }
        // // console.log( item,'---' )
        //
        // if(this.indexs == '3'){
        //   this.$dialog.confirm({
        //     width: 300,
        //     tipValue: '请在工单材料表中选择出库',
        //     btnValueOk:'去出库',
        //     btnValueCancel:'取消',
        //     alertImg: 'warn',
        //     okCallBack: (data) => {
        //       url = '/workOrderMaterialListManagerView?ownerID='+this.ownerID+'&flowPathID='+this.flowPathID//工单材料列表
        //       title = '工单材料列表'
        //       this.skipEvent(url,title)
        //     },
        //     closeCallBack:(data) =>{
        //     }
        //   })
        // }
      },
      circleClick(item){
        let url = ''
        let title = ''
        let height = '700'
        this.nodeDiagramState()
        let inTheEnd = ''
        let index = ''
        if(this.list3){
          inTheEnd = item.index==this.list3.length+3//判断是否是最后一个服务节点
          console.log(inTheEnd,item.index,this.list3.length+3,'是不是最后一个节点'  )
          index = this.list3.length+4//检修节点的索引值
        }else{
          inTheEnd = false
        }
        if(Number(item.index)<=Number(this.indexs)){
          if(item.title=='交车'){//已完成
            return
          }
          if(item.index=='0'||item.title=='定损单'){//定损单
            url = '/lossAssessmentForm?ownerID='+this.ownerID+'&flowPathID='+this.flowPathID+'&inTheEnd='+inTheEnd+'&index='+item.index+'&upDateStateID='+item.id//定损单录制
            title = '定损单'
            this.skipEvent(url,title)
            return
          }else if(item.index=='1'||item.title=='工单详情'){//工单详情
            url = '/workOrderDetailsManagerView?ownerID='+this.ownerID+'&flowPathID='+this.flowPathID+'&inTheEnd='+inTheEnd+'&index='+item.index+'&upDateStateID='+item.id//工单详情列表
            title = '工单详情'
            this.skipEvent(url,title)
            return
          }else if(item.index=='2'||item.title=='工单材料'){//工单材料
            url = '/workOrderMaterialListManagerView?ownerID='+this.ownerID+'&flowPathID='+this.flowPathID+'&inTheEnd='+inTheEnd+'&index='+item.index+'&upDateStateID='+item.id//工单材料列表
            title = '工单材料'
            this.skipEvent(url,title)
            return
          }else if(item.title=='检修'){//检修
            url = '/workOrderCheckoutManagerView?ownerID='+this.ownerID+'&subProcessID='+item.id
              +'&flowPathID='+this.flowPathID+'&state='+this.state+'&index='+item.index
              +'&upDateStateID='+item.id+'&inTheEnd='+inTheEnd
            title = '检修'
            this.skipEvent(url,title,'700')
            return
          }
          if(item.title=='出库'&&item.index!='3'){//不是准备阶段的出库时
            url = '/workOrderStockOutManagerView?ownerID='+this.ownerID+'&stateID='+item.id+'&flowPathID='+this.flowPathID+'&index='+item.index+'&upDateStateID='+item.id
            title = '出库'
            this.skipEvent(url,title,'700')
            return
          }else if(item.index==3){//准备阶段的出库
            url = '/workOrderStockOutManagerView?ownerID='+this.ownerID+'&flowPathID='+this.flowPathID+'&upDateStateID='+item.id
            title = '出库'
            this.skipEvent(url,title)
            return
          }
          if(item.title=='选择工序'&&this.indexs==item.index){
            // url = '/workOrderDetailsManagerView?ownerID='+this.ownerID+'&flowPathID='+this.flowPathID+'&operationShow=1'+'&index='+item.index+'&upDateStateID='+item.id
            // title = '选择服务流程'
            url = '/workOrderProcessForm?ownerID='+this.ownerID+'&flowPathID='+this.flowPathID+'&index='+item.index
            title = '选择工序'
            this.skipEvent(url,title)
            return
          }else if(item.title=='选择工序'&&this.indexs!=item.index){
            this.$dialog.alert({
              tipValue:'当前选择工序节点无法操作,请重新创建节点。',
              alertImg:'warn',
              width:'330'
            })
          }
          if(item.type=='5'&&this.indexs>=item.index){//查看工序
            url = '/workOrderProcessForm?ownerID='+this.ownerID
              +'&flowPathID='+this.flowPathID+'&index='+item.index
              +'&flowType='+item.type+'&dependid='+item.dependid
              +'&upDateStateID='+item.id+'&inTheEnd='+inTheEnd
            title = '查看'+item.title
            this.skipEvent(url,title)
            return
          }

          if(item.stage==2&&item.title!='检修'&&item.type<'5'){//服务节点
            // alert(item.ownerID)
            console.log( item,item.ownerID )
            url = '/workOrderServiceView?id='+item.dependid+'&ownerID='+this.ownerID+'&flowPathID='+this.flowPathID+'&subProcessID='+item.id+'&inTheEnd='+inTheEnd+'&index='+index
            title = item.title
            height = '450'
            this.skipEvent(url,title,height)
          }
          if(item.type=='7'){//待结账节点
            url = '/workOrderSettleAccountsForm?ownerID='+this.ownerID+'&flowPathID='+this.flowPathID+'&inTheEnd='+inTheEnd+'&index='+item.index+'&upDateStateID='+item.id
            title = item.title
            height = '800'
            this.skipEvent(url,title,height)
          }
        }
      },
      initData () {
        let params = {
          ownerID:this.ownerID,
        }
        this.ajaxJson({
          url: '/fix/fixProcess/initForm',
          data:params,
          call: (data) => {
            if(data){
              this.$dialog.setReturnValue(this.id) //向父级页面id值

              let stageArr = []//保存所有stage等于0的状态的索引值
              let stageArr2 = []//保存所有stage状态的索引值
              this.flowPathID = data.id
              this.list3 = data.list3
              this.stage = data.stage
              this.state = data.state



              // if(!this.list2){//当list2等于空
              //   this.indexs = this.stage
              //   this.nodeDiagramState()
              //   return
              // }

              if(!this.list3){//当list3等于空时不执行节点的判断
                console.log( 'list3',this.list3 )
                this.indexs = this.stage
                this.nodeDiagramState()
                return
                // for(let k in this.list3){
                //   this.list2.push(this.list3[k])
                // }
              }


              if(data.stage>=4){//进入服务节点
                for(let q in this.list3){
                  stageArr2.push(this.list3[q].state)
                  if(this.list3[q].state==0){//将所有未完成服务的索引值添加到数组汇总
                    stageArr.push(this.list3[q].orderStr)
                    console.log( 'stageArr',stageArr )
                  }
                  if(q==this.list3.length-1){//拿取第一个未完成节点的索引值
                    this.indexs = stageArr[0]
                    console.log( this.indexs,'------------' )
                  }
                  if(stageArr2.indexOf('0')==-1){//如果找不到0 表示服务节点已全部走完
                    this.indexs = this.list3.length+4
                    console.log( this.indexs,'服务节点全部走完' )
                  }
                }
              }else{
                for(let y = 0; y<=data.stage; y++){//循环为了选中的蓝色圆形产生过渡效果
                  this.indexs = y
                }
              }

              // if(this.state=='1'){
              //   this.indexs=99999
              // }
              this.nodeDiagramState()

              this.modelShow = false //隐藏假节点
              this.content = [] //每次渲染时清空之前的数组
              let quantity = this.list3.length/5 //需要生成几组数据（每组五个）
              let num = 0 //添加检验节点后需要生成几组
              //先向固定准备阶段补一个服务节点 凑满一组5个
              // let list2 = this.list2.splice(0,1)[0]
              // this.immobilizationList[0].list[4].title = list2.nameStr
              // this.immobilizationList[0].list[4].dependid = list2.dependid
              // this.immobilizationList[0].list[4].id = list2.id
              // this.immobilizationList[0].list[4].state = list2.state

              if(Number(quantity)%1==0){//计算总数除以5是否可以整除
                num = quantity + 1
                // console.log( quantity,'整数' )
              }else{//无法整除时截取小数点前的数据 并加一
                num = parseInt(quantity.toString().substring(0,quantity.toString().indexOf('.')))+1
                if(num==0){//如果不满足5条时 改变为1 下边生成一组数据
                  num==1
                }
                // console.log( num,"不是整数" )
              }
              for(let i=0; i<num; i++){//先根据数据条数生成每个组
                // console.log( 'i',i )
                this.content.push({
                  direction:i%2==0?2:1,
                  list:[]
                })
              }

              let a = 0
              this.list3.unshift('11')
              console.log( 'this.list3',this.list3 )
              for(let j=1; j<this.list3.length; j++){
                if(j!=0&&j%5==0){//判断除以4==0时 表示是当前数组的最后一条
                  this.content[a].list.push({
                    'title':this.list3[j].nameStr,
                    'id':this.list3[j].id,
                    'dependid':this.list3[j].dependid,
                    'type':this.list3[j].type,
                    'stage':'2',
                    'state':this.list3[j].state,
                    'stageColor':this.list3[j].stage==4?'#d618ab':'#a60cde',
                    'circleIcon':'',
                    'ownerID':this.list3[j].ownerID,
                    'direction':a%2==0?2:1,//判断方向来添加相应的样式
                    'index':Number(this.list3[j].orderStr)
                  })
                  a++
                  console.log( '整除',j )
                }else{
                    this.content[a].list.push({
                      'title':this.list3[j].nameStr,
                      'id':this.list3[j].id,
                      'dependid':this.list3[j].dependid,
                      'type':this.list3[j].type,
                      'stage':'2',
                      'state':this.list3[j].state,
                      'stageColor':this.list3[j].stage==4?'#d618ab':'#a60cde',
                      'circleIcon':'',
                      'direction':'',
                      'ownerID':this.list3[j].ownerID,
                      'index':Number(this.list3[j].orderStr)
                    })
                    console.log( '1111',j )
                }
              }
              console.log(this.content )

            }
          }
        })
      }
    },
    computed:{

    },
    created () {
      this.setQuery2Value('cid')
      let  state =  JSON.parse(sessionStorage.processState||0)
      this.setQuery2Value('ownerID')

      if(state.id==this.ownerID){
        this.proState = state.proState
      }else{
        this.setQuery2Value('proState')
      }
      setTimeout(()=>{
        if(this.proState==1){
          this.initData()
        }else{
          this.init({
            url: '/fix/fixProcess/save',
            data: {
              ownerID:this.ownerID,
              id: this.id,
              nameStr:'定损单录制',
              state:0,
              stage:0,
            },
            all: (data) => {
              if(data.type==0){
                this.proState = 1
                let list = {'proState':this.proState,'id':this.ownerID}
                try {
                  sessionStorage.processState = JSON.stringify(list)
                }catch (e) {}
                this.initData()
              }

            }
          })
        }
      },0)
    }

  }
</script>

<style lang="less" scoped>
.atPresent{
  background-color: #49a9ea !important;
}
.circleTetRight{
  position: relative;
  top: -50px;
  left: 50px;
}
.circleTetLeft{
  position: relative;
  top: -50px;
  right: 50px;
}
/*.circleRight{*/
/*  margin-top: 136px;*/

/*  top: 136px;*/
/*}*/
  .semicircle:before{
    font-weight: 200;
    font-size: 160px;
  }
  .bor{
    position: absolute;
    top: -130px;
    right: 36px;
    width: 150px;
    height: 300px;
    overflow: hidden;
    .semicircleRight{
      position: absolute;
      left: -150px;
      width: 300px;
      height: 266px;
      border-radius: 50%;
      background-color: #333333;
    }
    .semicircleCentre{
      border-radius: 50%;
      position: absolute;
      top: 3px;
      left: -143px;
      width: 290px;
      height: 260px;
      background-color: #fff;
    }
  }
.top_center{
  /*display: flex;*/
  /*justify-content: center;*/
  /*align-items: center;*/
  height: 283px;
  width: 88%;
  margin: auto;
}
/*.borRight{*/
/*  top: 0;*/
/*}*/
.workOrderBtn{
  border-radius: 15px;
  margin: 20px 0 0 20px;
  padding: 0 26px;
  border: 1px solid #333;
  float: left;
}
.straightLine{
  display: flex;
  width: 79.5%;
  height: 3px;
  margin-top: 35px;
  background-color: #333333;
  float: left;
  .circleTitle{
    width: 80px;
    height: 140px;
    z-index: 99;
    position: relative;
    .circleTitle2{
      .circle{
        width: 30px;
        height: 30px;
        cursor: pointer;
        z-index: 99;
        border-radius: 50%;
        margin-top: -15px;
        position: absolute;
        left: 50%;
        transform: translate(-50%);
        background-color: #666;
        transition: all 0.5s;
      }
      /*.circle:hover{*/
      /*  width: 35px;*/
      /*  height: 35px;*/
      /*  margin-top: -17.5px;*/
      /*  transition: all 0.5s;*/
      /*  background-color: #49a9ea;*/
      /*}*/
      .circleTitle_center{
        font-weight: 600;
        font-size: 14px;
        padding-top: 40px;
        text-align: center;
      }
    }

  }

}
  .semicircleLeft{
    /*margin-top: 260px;*/
    position: relative;
    width:63%;
    float:right;
    right:78px;
  }
  .semicircleRight{
    position: relative;
    width: 80%;
    float: left;
    left: 78px;
  }
  .towardsTheRight{
    position: relative;
    width: 67%;
    float: left;
    left: 208px;
  }
  .borLeft{
    left: 50px;
    top:-164px;
    transform:rotate(180deg);
  }
  .circleTitle_center_right{
    position: relative;
    top:-50px;
    left:50px;
  }
  .circleTitle_center_left{
    position: relative;
    top: -50px;
    right: 50px;
  }
  .circleTitle_circle{
    position: absolute !important;
    left: 50px !important;
  }


  .circle {
    box-shadow: inset -1px 1px 4px 2px #666, inset 1px -1px 4px 2px #666;
    -webkit-transition: all 1s;
    -moz-transition: all 1s;
    transition: all 1s;
  }
  .circle:nth-child(n):hover {
    -webkit-animation: bs2 linear 1s 1s infinite, bs2-in 1s;
    -moz-animation: bs2 linear 1s 1s infinite, bs2-in 1s;
    animation: bs2 linear 1s 1s infinite, bs2-in 1s;
  }

  .circle:nth-child(1) {
    width: 20px;
    height: 20px;
    margin-top: -10px;
    /*-webkit-animation: bs linear 2s 0.5s infinite;*/
    /*-moz-animation: bs linear 2s 0.5s infinite;*/
    animation: bs linear 2s 0.8s infinite;
  }

  /*.circle:nth-child(2) {*/
  /*  width: 30px;*/
  /*  height: 30px;*/
  /*  margin-top: -15px;*/
  /*  -webkit-animation: bs linear 2s 0.7s infinite;*/
  /*  -moz-animation: bs linear 2s 0.7s infinite;*/
  /*  animation: bs linear 2s 0.7s infinite;*/
  /*}*/

  /*.circle:nth-child(3) {*/
  /*  width: 40px;*/
  /*  height: 40px;*/
  /*  margin-top: -20px;*/
  /*  -webkit-animation: bs linear 2s 0.9s infinite;*/
  /*  -moz-animation: bs linear 2s 0.9s infinite;*/
  /*  animation: bs linear 2s 0.9s infinite;*/
  /*}*/

  /*.circle:nth-child(4) {*/
  /*  width: 50px;*/
  /*  height: 50px;*/
  /*  margin-top: -25px;*/
  /*  -webkit-animation: bs linear 2s 1.1s infinite;*/
  /*  -moz-animation: bs linear 2s 1.1s infinite;*/
  /*  animation: bs linear 2s 1.1s infinite;*/
  /*}*/

  /*.circle:nth-child(5) {*/
  /*  width: 60px;*/
  /*  height: 60px;*/
  /*  margin-top: -30px;*/
  /*  -webkit-animation: bs linear 2s 1.3s infinite;*/
  /*  -moz-animation: bs linear 2s 1.3s infinite;*/
  /*  animation: bs linear 2s 1.3s infinite;*/
  /*}*/

  /*.circle:nth-child(6) {*/
  /*  width: 70px;*/
  /*  height: 70px;*/
  /*  margin-top: -35px;*/
  /*  -webkit-animation: bs linear 2s 1.5s infinite;*/
  /*  -moz-animation: bs linear 2s 1.5s infinite;*/
  /*  animation: bs linear 2s 1.5s infinite;*/
  /*}*/

  /*.circle:nth-child(7) {*/
  /*  width: 60px;*/
  /*  height: 60px;*/
  /*  margin-top: -30px;*/
  /*  -webkit-animation: bs linear 2s 1.7s infinite;*/
  /*  -moz-animation: bs linear 2s 1.7s infinite;*/
  /*  animation: bs linear 2s 1.7s infinite;*/
  /*}*/

  /*.circle:nth-child(8) {*/
  /*  width: 50px;*/
  /*  height: 50px;*/
  /*  margin-top: -25px;*/
  /*  -webkit-animation: bs linear 2s 1.9s infinite;*/
  /*  -moz-animation: bs linear 2s 1.9s infinite;*/
  /*  animation: bs linear 2s 1.9s infinite;*/
  /*}*/

  /*.circle:nth-child(9) {*/
  /*  width: 40px;*/
  /*  height: 40px;*/
  /*  margin-top: -20px;*/
  /*  -webkit-animation: bs linear 2s 2.1s infinite;*/
  /*  -moz-animation: bs linear 2s 2.1s infinite;*/
  /*  animation: bs linear 2s 2.1s infinite;*/
  /*}*/

  /*.circle:nth-child(10) {*/
  /*  width: 30px;*/
  /*  height: 30px;*/
  /*  margin-top: -15px;*/
  /*  -webkit-animation: bs linear 2s 2.3s infinite;*/
  /*  -moz-animation: bs linear 2s 2.3s infinite;*/
  /*  animation: bs linear 2s 2.3s infinite;*/
  /*}*/

  /*.circle:nth-child(11) {*/
  /*  width: 20px;*/
  /*  height: 20px;*/
  /*  margin-top: -10px;*/
  /*  -webkit-animation: bs linear 2s 2.5s infinite;*/
  /*  -moz-animation: bs linear 2s 2.5s infinite;*/
  /*  animation: bs linear 2s 2.5s infinite;*/
  /*}*/

  @-webkit-keyframes bs {
    0% {
      box-shadow: inset -1px 1px 3px 2px #666, inset 1px -1px 3px 2px #666, 0 0 0px 0 #b2ff1a;
    }

    50% {
      box-shadow: inset -1px 1px 3px 2px #666, inset 1px -1px 3px 2px #666, 0 0 20px 0 #1affff;
    }

    100% {
      box-shadow: inset -1px 1px 3px 2px #666, inset 1px -1px 3px 2px #666, 0 0 0px 0 #b2ff1a;
    }
  }
  @-moz-keyframes bs {
    0% {
      box-shadow: inset -1px 1px 3px 2px #666, inset 1px -1px 3px 2px #666, 0 0 0px 0 #b2ff1a;
    }

    50% {
      box-shadow: inset -1px 1px 3px 2px #666, inset 1px -1px 3px 2px #666, 0 0 20px 0 #1affff;
    }

    100% {
      box-shadow: inset -1px 1px 3px 2px #666, inset 1px -1px 3px 2px #666, 0 0 0px 0 #b2ff1a;
    }
  }
  @-o-keyframes bs {
    0% {
      box-shadow: inset -1px 1px 3px 2px #666, inset 1px -1px 3px 2px #666, 0 0 0px 0 #b2ff1a;
    }

    50% {
      box-shadow: inset -1px 1px 3px 2px #666, inset 1px -1px 3px 2px #666, 0 0 20px 0 #1affff;
    }

    100% {
      box-shadow: inset -1px 1px 3px 2px #666, inset 1px -1px 3px 2px #666, 0 0 0px 0 #b2ff1a;
    }
  }
  @keyframes bs {
    0% {
      box-shadow: inset -1px 1px 3px 2px #666, inset 1px -1px 3px 2px #666, 0 0 0px 0 #b2ff1a;
    }

    50% {
      box-shadow: inset -1px 1px 3px 2px #666, inset 1px -1px 3px 2px #666, 0 0 20px 0 #1affff;
    }

    100% {
      box-shadow: inset -1px 1px 3px 2px #666, inset 1px -1px 3px 2px #666, 0 0 0px 0 #b2ff1a;
    }
  }
  @-webkit-keyframes bs2-in {
    0% {
      box-shadow: inset -1px 1px 3px 2px #666, inset 1px -1px 3px 2px #666, 0 0 10px 0 #bbff33;
    }

    100% {
      box-shadow: inset -1px 1px 5px 2px #666, inset 1px -1px 5px 2px #666, 0 0 0px 0 #ff3333;
    }
  }
  @-moz-keyframes bs2-in {
    0% {
      box-shadow: inset -1px 1px 3px 2px #666, inset 1px -1px 3px 2px #666, 0 0 10px 0 #bbff33;
    }

    100% {
      box-shadow: inset -1px 1px 5px 2px #666, inset 1px -1px 5px 2px #666, 0 0 0px 0 #ff3333;
    }
  }
  @-o-keyframes bs2-in {
    0% {
      box-shadow: inset -1px 1px 3px 2px #666, inset 1px -1px 3px 2px #666, 0 0 10px 0 #bbff33;
    }

    100% {
      box-shadow: inset -1px 1px 5px 2px #666, inset 1px -1px 5px 2px #666, 0 0 0px 0 #ff3333;
    }
  }
  @keyframes bs2-in {
    0% {
      box-shadow: inset -1px 1px 3px 2px #666, inset 1px -1px 3px 2px #666, 0 0 10px 0 #bbff33;
    }

    100% {
      box-shadow: inset -1px 1px 5px 2px #666, inset 1px -1px 5px 2px #666, 0 0 0px 0 #ff3333;
    }
  }
  @-webkit-keyframes bs2 {
    0% {
      box-shadow: inset -1px 1px 5px 2px #666, inset 1px -1px 5px 2px #666, 0 0 0px 0 #ff3333;
    }

    50% {
      box-shadow: inset -1px 1px 5px 2px #666, inset 1px -1px 5px 2px #666, 0 0 10px 0 #ffbb33;
    }

    100% {
      box-shadow: inset -1px 1px 5px 2px #666, inset 1px -1px 5px 2px #666, 0 0 0px 0 #ff3333;
    }
  }
  @-moz-keyframes bs2 {
    0% {
      box-shadow: inset -1px 1px 5px 2px #666, inset 1px -1px 5px 2px #666, 0 0 0px 0 #ff3333;
    }

    50% {
      box-shadow: inset -1px 1px 5px 2px #666, inset 1px -1px 5px 2px #666, 0 0 10px 0 #ffbb33;
    }

    100% {
      box-shadow: inset -1px 1px 5px 2px #666, inset 1px -1px 5px 2px #666, 0 0 0px 0 #ff3333;
    }
  }
  @-o-keyframes bs2 {
    0% {
      box-shadow: inset -1px 1px 5px 2px #666, inset 1px -1px 5px 2px #666, 0 0 0px 0 #ff3333;
    }

    50% {
      box-shadow: inset -1px 1px 5px 2px #666, inset 1px -1px 5px 2px #666, 0 0 10px 0 #ffbb33;
    }

    100% {
      box-shadow: inset -1px 1px 5px 2px #666, inset 1px -1px 5px 2px #666, 0 0 0px 0 #ff3333;
    }
  }
  @keyframes bs2 {
    0% {
      box-shadow: inset -1px 1px 5px 2px #666, inset 1px -1px 5px 2px #666, 0 0 0px 0 #ff3333;
    }

    50% {
      box-shadow: inset -1px 1px 5px 2px #666, inset 1px -1px 5px 2px #666, 0 0 10px 0 #ffbb33;
    }

    100% {
      box-shadow: inset -1px 1px 5px 2px #666, inset 1px -1px 5px 2px #666, 0 0 0px 0 #ff3333;
    }
  }

</style>
