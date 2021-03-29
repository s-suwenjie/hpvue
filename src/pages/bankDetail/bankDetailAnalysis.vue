<template>
  <div>
    <yhm-managerpage>
      <template #navigation>财务管理&nbsp;&gt;&nbsp;资金&nbsp;&gt;&nbsp;财务分析</template>
      <template #operate>
        <!-- 操作区-->
        <yhm-commonbutton style="margin-left: 10px" value="导出年报表" icon="i-edit"  @call="importEvent()"></yhm-commonbutton>
        <yhm-radiofilterdate title="时间" @initData="selectMonthEvent"></yhm-radiofilterdate>
<!--        <yhm-radiofilter @initData="initChoose('direction')" title="收支方向" :content="directionPsd" all="0"></yhm-radiofilter>-->
        <yhm-commonbutton style="margin-left: 10px" value="上一级" icon="icon-income" @call="getout"></yhm-commonbutton>
      </template>
      <template #listBody >
        <div class="out_line" >
          <div class="length_zero" v-if="content.length==0">没有更多数据了</div>
          <div class="enter_line" :class="clasName" v-if="content.length!=0">
            <div class="length_zero" v-if="content.length==0">没有更多数据了</div>
            <div v-for="(item,index) in content" :key="index" class="block_div" v-show="content.length!=0" :style="{width:WtopDiv,height:HtopDiv,backgroundColor:BcColor(index)}" @click="gomore(item,index)">
              <div class="top_litter">{{item.showName}}</div>
              <div class="btom_num" v-html="getTxt(item.money)"></div>
            </div>
            <div :style="{width:WbtomDiv,height:HtopDiv}" v-if="content.length!=0" style="background-color: #71C6CB" class="block_div">
<!--              backgroundColor:BcColor(-1)}-->
              <div class="top_litter" style="font-size: 36px">合计</div>
              <div v-html="getTxt(total.money)" class="btom_num"></div>
            </div>
          </div>
        </div>
      </template>
    </yhm-managerpage>
  </div>
</template>

<script>
  import { managermixin } from '@/assets/manager.js'
  import {tenThousandFormatHtml} from '@/assets/common.js'
  export default {
    name: 'bankDetailAnalysis',
    mixins: [managermixin],
    data(){
      return {
        directionPsd:{
          list:[],
          value:''
        },
        // page
        showName:'',
        value1:'',
        startDate: '',
        endDate: '',
        content:[],
        clasName:'',
        total:'',
        topDiv:'',
        btomDiv:'',
        colorList:['#E3A2A2','#B2B286','#98CB86','#E0B97C','#95C1E0','#C6A7D1','#B4AD4B','#74C9B9','#A57C62','#8E7EB2','#A56467'],
      }
    },
    computed:{
      getTxt(){
        return function (val) {
          return tenThousandFormatHtml(val)
        }
      },
      BcColor(){
        return function (val) {
          if(val==-1){
            val=this.content.length
          }
          if(val<this.colorList.length){
            return this.colorList[val]
          }else{
            let n=val%this.colorList.length
            return this.colorList[n]
          }
        }
      },
      WtopDiv(){
        if(this.content.length<=4){
          return '594px'
        }else if(this.content.length<=9){
          return '394px'
        }else{
          return '294px'
        }
      },
      HtopDiv(){
        if(this.content.length<=2){
          return '300px'
        }else{
          return '150px'
        }
      },
      WbtomDiv(){
        // if(this.content.length<=4){
        //   let width=(2-(this.content.length%2))*600-6
        //   return width+'px'
        // }else if(this.content.length<=9){
        //   let width=(3-(this.content.length%3))*400-6
        //   return width+'px'
        // }else{
        //   let width=(4-(this.content.length%4))*300-6
        //   return width+'px'
        // }
        return '1194px'
      }
    },
    methods:{
      animation(e,vlue){
        if(e==0){
          this.clasName='out_border'
          setTimeout(()=>{
            this.initData(vlue)
          },200)
        }else{
          this.clasName='enter_border'
        }
      },
      importEvent(){
        var date=new Date(this.endDate)
        this.$dialog.OpenWindow({
          width: '1430',
          height: '690',
          url:'/bankDetailAnalysisExecl?startDate='+date.getFullYear()+'-01-01 00:00:00'+'&endDate='+date.getFullYear()+'-12-31 23:59:59'+'&direction='+this.directionPsd.value,
          title:'导出年报表',
          closeCallBack:(data) =>{
            if(data){
              this.animation(0,false)
            }
          }
        })
      },

      selectMonthEvent(data,item){
        this.value1=''
        this.showName=''
        this.yearMonth = data;
        this.radioTime = item;
        this.startDate = this.radioTime.startDate ? this.radioTime.startDate : newRadioTime.startDate;
        this.endDate = this.radioTime.endDate ? this.radioTime.endDate : newRadioTime.endDate;
        if(this.radioTime){
          this.pager.pageIndex = 1
          this.animation(0,false)
        }
      },
      initChoose(obj){
        this.animation(0,false)
      },
      getout(){
        if(this.value1 && this.showName){
          this.value1=''
          this.animation(0,false)
        }else if(!this.value1 && this.showName){
          this.showName=''
          this.animation(0,false)
        }
      },
      gomore(item,index){
        if(Number(item.money)!=0){
          if(item.isSubordinate==0){
            if(this.showName){
              if(this.value1){
                this.$dialog.OpenWindow({
                  width: '1050',
                  height: '600',
                  url: '/bankDetailAnalyView?subjectID='+item.subjectID+'&startDate='+this.startDate+'&endDate='+this.endDate+'&direction='+this.directionPsd.value+'&id=12345678',
                  title: '查看详情',
                  closeCallBack: (data) => {

                  }
                })
              }else{
                this.value1=item.showName
              }
            }else{
              this.showName=item.showName
            }
            this.animation(0,false)
          }else{
            this.$dialog.OpenWindow({
              width: '1050',
              height: '600',
              url: '/bankDetailAnalyView?subjectID='+item.subjectID+'&startDate='+this.startDate+'&endDate='+this.endDate+'&direction='+this.directionPsd.value+'&id=12345678',
              title: '查看详情',
              closeCallBack: (data) => {

              }
            })
          }
        }
      },
      initData (initValue) {
        let params = {}
        if (initValue) {
          // 页面初始化是需要的参数
          let nowDate = new Date();
          let newYear = nowDate.getFullYear();
          let newMonth = nowDate.getMonth() + 1;
          let newDate = nowDate.getDate();
          let newHours = nowDate.getHours();
          let newMin = nowDate.getMinutes();
          let newSec = nowDate.getSeconds();
          let lastDate = newDate - 1;

          this.startDate = newYear + '-' + newMonth + '-01 ' + '00:00:00';
          this.endDate = newYear + '-' + newMonth + '-' + newDate + ' ' + newHours + ':' + newMin + ':' + newSec;

          params = {
            startDate: this.startDate,
            endDate: this.endDate,
          }
        } else {
          // 页面非初始化时需要的参数
          params = {
            direction:this.directionPsd.value,
            startDate: this.startDate,
            endDate: this.endDate,
            showName:this.showName,
            value1:this.value1,
          }
        }
        this.ajaxJson({
          url:'/Fin/getBankDetailAnalysisManager',
          data: params,
          call: (data) => {
            this.animation(1)

              let res = JSON.parse(JSON.stringify(data));
              this.content=res.content
              this.total=res.total[0]

            this.directionPsd.list=data.directionPsd.list
          }
        })
      },
    },
    created () {
      this.animation(0,true)
    }
  }
</script>

<style scoped>
  .out_line{
    width: 1200px;
    height: 680px;
    margin: 0 auto;
    position: relative;

  }
  .enter_line{
    /*margin: 30px auto;*/
    position: absolute;
    width: 1200px;
  }
  .block_div{
    vertical-align: top;
    border: 1px solid #37A103;
    border-radius: 15px;
    display: inline-block;
    box-sizing: border-box;
    margin: 3px;
  }
  .block_div:hover{
    background-color: #E3DEF5 !important;
  }
  .top_litter{
    width: 100%;
    height: 50%;
    text-align: center;
    color: #ffffff;
    font-size: 26px;
    font-weight: 700;
    box-sizing: border-box;
    /*line-height: 110%;*/
    /*padding-top: 50%;*/
  }
  .btom_num{
    width: 100%;
    height: 50%;
    text-align: center;
    font-size: 30px;
    box-sizing: border-box;
  }
  .length_zero{
    width: 100%;
    line-height: 100px;
    font-size: 32px;
    font-weight: 700;
    text-align: center;
  }
.out_border{
  overflow: hidden;
  box-sizing: border-box;
  animation: out 0.3s linear;
  animation-fill-mode:forwards;
}
  @keyframes out{
    from{opacity: 1;
      left: 0;}
    to{opacity: 0;
      left: -100%;}
  }
.enter_border{
  overflow: hidden;
  box-sizing: border-box;
  animation: enter 0.3s linear;
  animation-fill-mode:forwards;
}
@keyframes enter{
  from{opacity: 0;
    left: -100%;}
  to{opacity: 1;
    left: 0;}

}
</style>
