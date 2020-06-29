<template>
    <div>
      <div id="exerciseCartogram" class="exerciseCartogram"></div>

      <yhm-view-tab class="exerciseTab" :style="{'top': tabShow?'10px':'-130%'}">
        <template #tab>
          <yhm-view-tab-button :list="tabState" :index="0">明星类</yhm-view-tab-button>
          <yhm-view-tab-button :list="tabState" :index="1">问题类</yhm-view-tab-button>
          <yhm-view-tab-button :list="tabState" :index="2">瘦狗类</yhm-view-tab-button>
          <yhm-view-tab-button :list="tabState" :index="3">金牛类</yhm-view-tab-button>
          <img class="exerciseImg" v-show="tabShow" @click="tabShow=!tabShow"
               src="https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=2720424025,571977794&fm=26&gp=0.jpg" width="30" height="30" alt="">

        </template>
        <template #content>
            <yhm-view-tab-list :customize="true" :pager="true" customize-bg-color="#e2f1f0" v-show="tabState[0].select">

            <template #listHead>
              <yhm-managerth  style="width: 160px;" title="列表"></yhm-managerth>
              <yhm-managerth  title="列表"></yhm-managerth>
              <yhm-managerth  title="列表"></yhm-managerth>
            </template>
            <template #listBody>
              <tr v-for="(item,index) in 5" :key="index" :class="{InterlacBg:index%2!==0}">
                <yhm-manager-td-center style="text-align: center;" value="000"></yhm-manager-td-center>
                <yhm-manager-td-center style="text-align: center;" value="000"></yhm-manager-td-center>
                <yhm-manager-td-center style="text-align: center;" value="000"></yhm-manager-td-center>
              </tr>
            </template>
            <template #empty>
<!--              <span class="m_listNoData" v-show="content.length=='0'?true:false">暂时没有数据</span>-->
            </template>
            <template #pager>
              <yhm-pagination :pager="pager" is-page-size="false" @initData="initPageData(false)"></yhm-pagination>
            </template>
          </yhm-view-tab-list>
          <yhm-view-tab-list :customize="true" :pager="true" customize-bg-color="#e2f1f0" v-show="tabState[1].select">
            <template #listHead>
              <yhm-managerth  style="width: 160px;" title="列表"></yhm-managerth>
              <yhm-managerth  title="列表"></yhm-managerth>
              <yhm-managerth  title="列表"></yhm-managerth>
            </template>
            <template #listBody>
              <tr v-for="(item,index) in 5" :key="index" :class="{InterlacBg:index%2!==0}">
                <yhm-manager-td-center style="text-align: center;" value="111"></yhm-manager-td-center>
                <yhm-manager-td-center style="text-align: center;" value="111"></yhm-manager-td-center>
                <yhm-manager-td-center style="text-align: center;" value="111"></yhm-manager-td-center>
              </tr>
            </template>
            <template #empty>
              <!--              <span class="m_listNoData" v-show="content.length=='0'?true:false">暂时没有数据</span>-->
            </template>
            <template #pager>
              <yhm-pagination :pager="pager" is-page-size="false" @initData="initPageData(false)"></yhm-pagination>
            </template>
          </yhm-view-tab-list>
          <yhm-view-tab-list :customize="true" :pager="true" customize-bg-color="#e2f1f0" v-show="tabState[2].select">
            <template #listHead>
              <yhm-managerth  style="width: 160px;" title="列表"></yhm-managerth>
              <yhm-managerth  title="列表"></yhm-managerth>
              <yhm-managerth  title="列表"></yhm-managerth>
            </template>
            <template #listBody>
              <tr v-for="(item,index) in 5" :key="index" :class="{InterlacBg:index%2!==0}">
                <yhm-manager-td-center style="text-align: center;" value="222"></yhm-manager-td-center>
                <yhm-manager-td-center style="text-align: center;" value="222"></yhm-manager-td-center>
                <yhm-manager-td-center style="text-align: center;" value="222"></yhm-manager-td-center>
              </tr>
            </template>
            <template #empty>
              <!--              <span class="m_listNoData" v-show="content.length=='0'?true:false">暂时没有数据</span>-->
            </template>
            <template #pager>
              <yhm-pagination :pager="pager" is-page-size="false" @initData="initPageData(false)"></yhm-pagination>
            </template>
          </yhm-view-tab-list>
          <yhm-view-tab-list :customize="true" :pager="true" customize-bg-color="#e2f1f0" v-show="tabState[3].select">
            <template #listHead>
              <yhm-managerth  style="width: 160px;" title="列表"></yhm-managerth>
              <yhm-managerth  title="列表"></yhm-managerth>
              <yhm-managerth  title="列表"></yhm-managerth>
            </template>
            <template #listBody>
              <tr v-for="(item,index) in 5" :key="index" :class="{InterlacBg:index%2!==0}">
                <yhm-manager-td-center style="text-align: center;" value="333"></yhm-manager-td-center>
                <yhm-manager-td-center style="text-align: center;" value="333"></yhm-manager-td-center>
                <yhm-manager-td-center style="text-align: center;" value="333"></yhm-manager-td-center>
              </tr>
            </template>
            <template #empty>
              <!--              <span class="m_listNoData" v-show="content.length=='0'?true:false">暂时没有数据</span>-->
            </template>
            <template #pager>
              <yhm-pagination :pager="pager" is-page-size="false" @initData="initPageData(false)"></yhm-pagination>
            </template>
          </yhm-view-tab-list>
        </template>
      </yhm-view-tab>
    </div>
</template>

<script>
  import { viewmixin } from '@/assets/view.js'
  export default {
    name: 'exercise',
    mixins: [viewmixin],
    data(){
      return{
        tabState:[{select:true},{select:false},{select:false},{select:false}],
        content:[],
        tabShow:false
      }
    },
    methods:{
      statisticalGraph(){
        let myChart = this.$echarts.init(document.getElementById('exerciseCartogram'));
        myChart.on('click',params => {
          this.tabShow = false
          console.log( params )
          alert(params.data.name+ ' ' +params.data.value)
        });

        myChart.getZr().on('click',params => {
          let index = 0
          if(params.offsetY<296&&params.offsetX>646){
            console.log('明星类')
          }else if(params.offsetY<296&&params.offsetX>70){
            index = 1
            console.log('问题类')
          }else if(params.offsetY>296&&params.offsetX<646){
            index = 2
            console.log('瘦狗类')
          }else if(params.offsetY>296&&params.offsetX>646){
            index = 3
            console.log('金牛类')
          }
          for(let i in this.tabState){//用户点击哪个区域就默选点击区域的列表
            if(i==index){
              this.tabState[index].select = true
            }else{
              this.tabState[i].select = false
            }
          }
          this.tabShow = true
          console.log( params,'222222' )
        })
        // 散点数据
        let marksData = [
          {
            name: '点1',
            value: [10, 20],
          },
          {
            name: '点2',
            value: [15, 22],
          },
          {
            name: '点3',
            value: [34, 51],
          },
          {
            name: '点4',
            value: [25, 64],
          },
          {
            name: '点5',
            value: [42, 20],
          },
          {
            name: '点6',
            value: [32, 15],
          },
          {
            name: '点7',
            value: [68, 34],
          },
          {
            name: '点8',
            value: [25, 65],
          },
          {
            name: '点9',
            value: [45, 56],
          },
          {
            name: '点10',
            value: [35, 47],
          }
        ]
        // 中心线
      let  centerLine = [
          {
            name: 'x', xAxis: 40
          },
          {
            name: 'y', yAxis: 40
          }
        ]
        // 中心点
      let  centerMark = [
          {
            value: '中心点', coord: [40, 40]
          }
        ]

      let  option = {
          tooltip: {
            axisPointer: {
              show: true,
              type: 'cross',
              lineStyle: {
                type: 'dashed',
                width: 1
              },
              label: {
                backgroundColor: '#555'
              }
            },
          },
        legend: {
            right:0,
          top:10,
          data: ['瘦狗类', '问题类', '金牛', '明星类']
        },
          grid: {
            left: 50,
            right: 50,
            bottom: '4%',
            top: '6%',
            containLabel: true
          },
          xAxis: {
            scale: true,
            axisLine: {
              lineStyle: {
                color: '#ddd'
              }
            },
            axisLabel: {
              color: '#666'
            },
            splitLine: {
              lineStyle: {
                color: '#eee'
              }
            }
          },
          yAxis: {
            scale: true,
            axisLine: {
              lineStyle: {
                color: '#ddd'
              }
            },
            axisLabel: {
              color: '#666'
            },
            splitLine: {
              lineStyle: {
                color: '#eee'
              }
            }
          },
        // visualMap: {
        //   top: 10,
        //   right: 10,
        //   pieces: [{
        //     gt: 0,
        //     lte: 50,
        //     color: '#096'
        //   }, {
        //     gt: 50,
        //     lte: 100,
        //     color: '#ffde33'
        //   }, {
        //     gt: 100,
        //     lte: 150,
        //     color: '#ff9933'
        //   }, {
        //     gt: 150,
        //     lte: 200,
        //     color: '#cc0033'
        //   }],
        //   outOfRange: {
        //     color: '#999'
        //   }
        // },
          series: [{
            type: 'scatter',
            data: marksData,
            label: {
              show: true,
              position: 'bottom',
              formatter: '{b}'
            },
            itemStyle: {
              shadowBlur: 2,
              shadowColor: 'rgba(120, 36, 50, 0.5)',
              shadowOffsetY: 1,
              color: function (e) {
                let randomColor = 'rgba(' + Math.floor(Math.random() * 240) + ',' + Math.floor(Math.random() * 240) + ',' + Math.floor(Math.random() * 240) + ',' + '.8' + ')'
                return randomColor.substring()
              }
            },
            // 各象限区域
            markArea: {
              silent: true,
              data: [
                // 第一象限
                [{
                  name: '明星类',
                  xAxis: 40, // x 轴开始位置
                  yAxis: 70, // y 轴结束位置(直接取最大值)
                  itemStyle: {
                    color: 'rgba(56, 180, 139, .1)'
                  },
                  label: {
                    position: 'inside',
                    color: 'rgba(0, 0, 0, .1)',
                    fontSize: 22
                  }
                }, {
                  yAxis: 40 // y轴开始位置
                }],
                // 第二象限
                [{
                  name: '问题类',
                  yAxis: 70, // y 轴结束位置(直接取最大值)
                  itemStyle: {
                    color: 'rgba(68, 97, 123, .1)'
                  },
                  label: {
                    position: 'inside',
                    color: 'rgba(0, 0, 0, .1)',
                    fontSize: 22
                  }
                }, {
                  xAxis: 40, // x 轴结束位置
                  yAxis: 40 // y轴开始位置
                }],
                // 第三象限
                [{
                  name: '瘦狗类',
                  yAxis: 40, // y 轴结束位置
                  itemStyle: {
                    color: 'rgba(191, 120, 58, .1)'
                  },
                  label: {
                    position: 'inside',
                    color: 'rgba(0, 0, 0, .1)',
                    fontSize: 22
                  }
                }, {
                  xAxis: 40, // x 轴结束位置
                  yAxis: 10 // y轴开始位置
                }],
                // 第四象限
                [{
                  name: '金牛类',
                  xAxis: 40, // x 轴开始位置
                  yAxis: 40, // y 轴结束位置
                  itemStyle: {
                    color: 'rgba(116, 83, 153, .1)'
                  },
                  label: {
                    position: 'inside',
                    color: 'rgba(0, 0, 0, .1)',
                    fontSize: 22
                  }
                }, {
                  yAxis: 10 // y轴开始位置
                }]
              ]
            },
            // 中心点交集象限轴
            markLine: {
              silent: true, // 是否不响应鼠标事件
              precision: 2, // 精度
              lineStyle: {
                type: 'solid',
                color: '#00aca6'
              },
              label: {
                color: '#00aca6',
                position: 'end',
                formatter: '{b}'
              },
              data: centerLine
            },
            // 中心点
            markPoint: {
              symbol: 'roundRect',
              symbolSize: 15,
              itemStyle: {
                color: 'rgba(234, 85, 6, .8)'
              },
              label: {
                position: 'top'
              },
              data: centerMark
            }
          }]
        }
        myChart.setOption(option);
      }
    },
    created () {
      this.$nextTick(()=>{
        this.statisticalGraph()
      })
    }
  }
</script>

<style lang="less" scoped>
  .exerciseCartogram{
    width: 95%;
    display: flex;
    border-radius:0 0 10px 10px;
    margin-top: 12px;
    margin: auto;
    justify-content: center;
    height: 600px;
    background-color: #FFFFFF;
  }
  .exerciseTab{
    position: absolute;
    width: 90%;
    height: 62%;
    top: -130%;
    left: 62px;
    transition: all 0.7s;
  }
  .exerciseImg{
    position: absolute;
    right: 0;
  }
</style>
