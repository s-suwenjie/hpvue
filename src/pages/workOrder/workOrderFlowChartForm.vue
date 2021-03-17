<template>
    <div>
<!--      @mouseout="mouseoutEvent" @mouseover="mouseoverEvent"-->
      <div class="leftMenu" :class="{'leftMenu':!leftMenuShow,'leftMenuShow':leftMenuShow}">
        <span class="i-input-right-arrow leftMenuArrows" v-if="!leftMenuShow" @click="leftMenuShow=!leftMenuShow"></span>
        <span class="i-input-left-arrow leftMenuArrows" v-else @click="leftMenuShow=!leftMenuShow"></span>
        <div class="leftMenuTitle">
          <span>总览</span>
          <span style="font-size: 12px;cursor: pointer;" @click="beginClick" :style="{'color':list2[list2.length-1].color}">当前:{{list2[list2.length-1].title=='质检确认'?'返工确认':list2[list2.length-1].title}}</span>
        </div>
        <div class="leftMenuBtn" @mouseout="menuBtnMouseout" @mouseover="menuBtnMouseover('0')" @click="leftMenuBtnClick('0')">
          <div style="display:flex;align-items: center;width: 110px;">
            <svg t="1601281508724" class="icon" viewBox="0 0 1024 1024" version="1.1" width="28" height="28"><path d="M574.1 835.6H222l-0.2-672.5h383.3v0.8l0.1 139.9c0 28.6 23.3 52 52 52h140l1-0.1v223.6c0 17.7 14.3 32 32 32s32-14.3 32-32V331.4c0-13.9-5.4-26.9-15.2-36.8L666.6 114.3c-9.8-9.8-22.9-15.2-36.8-15.2h-420c-13.9 0-26.9 5.4-36.8 15.2-9.8 9.8-15.2 22.9-15.2 36.8l0.2 696.5c0 28.7 23.3 52 52 52h364.1c17.7 0 32-14.3 32-32s-14.3-32-32-32z m179.5-543.8h-84.4l-0.1-84.4 84.5 84.4z" p-id="2182" :fill="menuBtn=='0'?'#fff':'#707070'"></path><path d="M445.2 323.8c17.7 0 32-14.4 31.9-32.1 0-17.6-14.4-31.9-32-31.9h-0.1l-128.8 0.4c-17.7 0-32 14.4-31.9 32.1 0.1 17.7 14.4 31.9 32.1 31.9l128.8-0.4zM317.1 452.2h191.3c17.7 0 32-14.3 32-32s-14.3-32-32-32H317.1c-17.7 0-32 14.3-32 32s14.3 32 32 32zM887.8 725.5c-2.5-10.8-13.2-17.5-23.9-15.1-10.8 2.5-17.5 13.2-15.1 23.9 1.6 6.9 2.4 14.1 2.4 21.3 0 52.7-42.8 95.5-95.5 95.5s-95.5-42.8-95.5-95.5 42.8-95.5 95.5-95.5c27 0 52.9 11.5 71 31.7 7.4 8.2 20 8.9 28.2 1.5s8.9-20 1.5-28.2c-25.7-28.5-62.4-44.9-100.8-44.9-74.7 0-135.5 60.8-135.5 135.5s60.8 135.5 135.5 135.5 135.5-60.8 135.5-135.5c0-10.2-1.1-20.4-3.3-30.2z" p-id="2183" :fill="menuBtn=='0'?'#fff':'#707070'"></path><path d="M787.1 717.5l-42.3 45.1c-11.7-8.7-21.8-16.3-23.8-17.9-7.9-6.7-19.7-6.3-27.1 1.1-7.8 7.8-7.8 20.5 0 28.3 1.3 1.3 1.9 1.9 41.3 31.3 3.6 2.7 7.8 4 12 4 5.4 0 10.7-2.1 14.6-6.3l54.5-58.1c7.6-8.1 7.2-20.7-0.9-28.3-8.1-7.6-20.7-7.2-28.3 0.8z" p-id="2184" :fill="menuBtn=='0'?'#fff':'#707070'"></path></svg>
            <span style="margin-left: 8px;">添加定损单</span>
          </div>
          <span>
            {{fixdetailCount}}
          </span>
        </div>
        <div class="leftMenuBtn" @mouseout="menuBtnMouseout" @mouseover="menuBtnMouseover('1')" @click="leftMenuBtnClick('1')">
          <div style="display:flex;align-items: center;width: 110px;">
            <svg t="1601281508724" class="icon" viewBox="0 0 1024 1024" version="1.1" width="28" height="28"><path d="M574.1 835.6H222l-0.2-672.5h383.3v0.8l0.1 139.9c0 28.6 23.3 52 52 52h140l1-0.1v223.6c0 17.7 14.3 32 32 32s32-14.3 32-32V331.4c0-13.9-5.4-26.9-15.2-36.8L666.6 114.3c-9.8-9.8-22.9-15.2-36.8-15.2h-420c-13.9 0-26.9 5.4-36.8 15.2-9.8 9.8-15.2 22.9-15.2 36.8l0.2 696.5c0 28.7 23.3 52 52 52h364.1c17.7 0 32-14.3 32-32s-14.3-32-32-32z m179.5-543.8h-84.4l-0.1-84.4 84.5 84.4z" p-id="2182" :fill="menuBtn=='1'?'#fff':'#707070'"></path><path d="M445.2 323.8c17.7 0 32-14.4 31.9-32.1 0-17.6-14.4-31.9-32-31.9h-0.1l-128.8 0.4c-17.7 0-32 14.4-31.9 32.1 0.1 17.7 14.4 31.9 32.1 31.9l128.8-0.4zM317.1 452.2h191.3c17.7 0 32-14.3 32-32s-14.3-32-32-32H317.1c-17.7 0-32 14.3-32 32s14.3 32 32 32zM887.8 725.5c-2.5-10.8-13.2-17.5-23.9-15.1-10.8 2.5-17.5 13.2-15.1 23.9 1.6 6.9 2.4 14.1 2.4 21.3 0 52.7-42.8 95.5-95.5 95.5s-95.5-42.8-95.5-95.5 42.8-95.5 95.5-95.5c27 0 52.9 11.5 71 31.7 7.4 8.2 20 8.9 28.2 1.5s8.9-20 1.5-28.2c-25.7-28.5-62.4-44.9-100.8-44.9-74.7 0-135.5 60.8-135.5 135.5s60.8 135.5 135.5 135.5 135.5-60.8 135.5-135.5c0-10.2-1.1-20.4-3.3-30.2z" p-id="2183" :fill="menuBtn=='1'?'#fff':'#707070'"></path><path d="M787.1 717.5l-42.3 45.1c-11.7-8.7-21.8-16.3-23.8-17.9-7.9-6.7-19.7-6.3-27.1 1.1-7.8 7.8-7.8 20.5 0 28.3 1.3 1.3 1.9 1.9 41.3 31.3 3.6 2.7 7.8 4 12 4 5.4 0 10.7-2.1 14.6-6.3l54.5-58.1c7.6-8.1 7.2-20.7-0.9-28.3-8.1-7.6-20.7-7.2-28.3 0.8z" p-id="2184" :fill="menuBtn=='1'?'#fff':'#707070'"></path></svg>
            <span style="margin-left: 8px;">添加工单</span>
          </div>
          <span>{{fixreveCount}}</span>
        </div>
<!--        <div class="leftMenuBtn" @mouseout="menuBtnMouseout" @mouseover="menuBtnMouseover('2')" @click="leftMenuBtnClick('2')">-->
<!--          <div style="display:flex;align-items: center;width: 110px;">-->
<!--            <svg t="1601281508724" class="icon" viewBox="0 0 1024 1024" version="1.1" width="28" height="28"><path d="M574.1 835.6H222l-0.2-672.5h383.3v0.8l0.1 139.9c0 28.6 23.3 52 52 52h140l1-0.1v223.6c0 17.7 14.3 32 32 32s32-14.3 32-32V331.4c0-13.9-5.4-26.9-15.2-36.8L666.6 114.3c-9.8-9.8-22.9-15.2-36.8-15.2h-420c-13.9 0-26.9 5.4-36.8 15.2-9.8 9.8-15.2 22.9-15.2 36.8l0.2 696.5c0 28.7 23.3 52 52 52h364.1c17.7 0 32-14.3 32-32s-14.3-32-32-32z m179.5-543.8h-84.4l-0.1-84.4 84.5 84.4z" p-id="2182" :fill="menuBtn=='2'?'#fff':'#707070'"></path><path d="M445.2 323.8c17.7 0 32-14.4 31.9-32.1 0-17.6-14.4-31.9-32-31.9h-0.1l-128.8 0.4c-17.7 0-32 14.4-31.9 32.1 0.1 17.7 14.4 31.9 32.1 31.9l128.8-0.4zM317.1 452.2h191.3c17.7 0 32-14.3 32-32s-14.3-32-32-32H317.1c-17.7 0-32 14.3-32 32s14.3 32 32 32zM887.8 725.5c-2.5-10.8-13.2-17.5-23.9-15.1-10.8 2.5-17.5 13.2-15.1 23.9 1.6 6.9 2.4 14.1 2.4 21.3 0 52.7-42.8 95.5-95.5 95.5s-95.5-42.8-95.5-95.5 42.8-95.5 95.5-95.5c27 0 52.9 11.5 71 31.7 7.4 8.2 20 8.9 28.2 1.5s8.9-20 1.5-28.2c-25.7-28.5-62.4-44.9-100.8-44.9-74.7 0-135.5 60.8-135.5 135.5s60.8 135.5 135.5 135.5 135.5-60.8 135.5-135.5c0-10.2-1.1-20.4-3.3-30.2z" p-id="2183" :fill="menuBtn=='2'?'#fff':'#707070'"></path><path d="M787.1 717.5l-42.3 45.1c-11.7-8.7-21.8-16.3-23.8-17.9-7.9-6.7-19.7-6.3-27.1 1.1-7.8 7.8-7.8 20.5 0 28.3 1.3 1.3 1.9 1.9 41.3 31.3 3.6 2.7 7.8 4 12 4 5.4 0 10.7-2.1 14.6-6.3l54.5-58.1c7.6-8.1 7.2-20.7-0.9-28.3-8.1-7.6-20.7-7.2-28.3 0.8z" p-id="2184" :fill="menuBtn=='2'?'#fff':'#707070'"></path></svg>-->
<!--            <span style="margin-left: 8px;">添加材料</span>-->
<!--          </div>-->
<!--          <span>{{materCount}}</span>-->
<!--        </div>-->
        <div class="leftMenuBtn" @mouseout="menuBtnMouseout" @mouseover="menuBtnMouseover('3')" @click="leftMenuBtnClick('3')">
          <div style="display:flex;align-items: center;width: 110px;">
            <svg t="1601281508724" class="icon" viewBox="0 0 1024 1024" version="1.1" width="28" height="28"><path d="M574.1 835.6H222l-0.2-672.5h383.3v0.8l0.1 139.9c0 28.6 23.3 52 52 52h140l1-0.1v223.6c0 17.7 14.3 32 32 32s32-14.3 32-32V331.4c0-13.9-5.4-26.9-15.2-36.8L666.6 114.3c-9.8-9.8-22.9-15.2-36.8-15.2h-420c-13.9 0-26.9 5.4-36.8 15.2-9.8 9.8-15.2 22.9-15.2 36.8l0.2 696.5c0 28.7 23.3 52 52 52h364.1c17.7 0 32-14.3 32-32s-14.3-32-32-32z m179.5-543.8h-84.4l-0.1-84.4 84.5 84.4z" p-id="2182" :fill="menuBtn=='3'?'#fff':'#707070'"></path><path d="M445.2 323.8c17.7 0 32-14.4 31.9-32.1 0-17.6-14.4-31.9-32-31.9h-0.1l-128.8 0.4c-17.7 0-32 14.4-31.9 32.1 0.1 17.7 14.4 31.9 32.1 31.9l128.8-0.4zM317.1 452.2h191.3c17.7 0 32-14.3 32-32s-14.3-32-32-32H317.1c-17.7 0-32 14.3-32 32s14.3 32 32 32zM887.8 725.5c-2.5-10.8-13.2-17.5-23.9-15.1-10.8 2.5-17.5 13.2-15.1 23.9 1.6 6.9 2.4 14.1 2.4 21.3 0 52.7-42.8 95.5-95.5 95.5s-95.5-42.8-95.5-95.5 42.8-95.5 95.5-95.5c27 0 52.9 11.5 71 31.7 7.4 8.2 20 8.9 28.2 1.5s8.9-20 1.5-28.2c-25.7-28.5-62.4-44.9-100.8-44.9-74.7 0-135.5 60.8-135.5 135.5s60.8 135.5 135.5 135.5 135.5-60.8 135.5-135.5c0-10.2-1.1-20.4-3.3-30.2z" p-id="2183" :fill="menuBtn=='3'?'#fff':'#707070'"></path><path d="M787.1 717.5l-42.3 45.1c-11.7-8.7-21.8-16.3-23.8-17.9-7.9-6.7-19.7-6.3-27.1 1.1-7.8 7.8-7.8 20.5 0 28.3 1.3 1.3 1.9 1.9 41.3 31.3 3.6 2.7 7.8 4 12 4 5.4 0 10.7-2.1 14.6-6.3l54.5-58.1c7.6-8.1 7.2-20.7-0.9-28.3-8.1-7.6-20.7-7.2-28.3 0.8z" p-id="2184" :fill="menuBtn=='3'?'#fff':'#707070'"></path></svg>
            <span style="margin-left: 8px;">材料出库</span>
          </div>
          <span></span>
        </div>
        <div class="leftMenuBtn" @mouseout="menuBtnMouseout" @mouseover="menuBtnMouseover('4')" @click="leftMenuBtnClick('4')">
          <div style="display:flex;align-items: center;width: 110px;">
            <svg t="1601281508724" class="icon" viewBox="0 0 1024 1024" version="1.1" width="28" height="28"><path d="M574.1 835.6H222l-0.2-672.5h383.3v0.8l0.1 139.9c0 28.6 23.3 52 52 52h140l1-0.1v223.6c0 17.7 14.3 32 32 32s32-14.3 32-32V331.4c0-13.9-5.4-26.9-15.2-36.8L666.6 114.3c-9.8-9.8-22.9-15.2-36.8-15.2h-420c-13.9 0-26.9 5.4-36.8 15.2-9.8 9.8-15.2 22.9-15.2 36.8l0.2 696.5c0 28.7 23.3 52 52 52h364.1c17.7 0 32-14.3 32-32s-14.3-32-32-32z m179.5-543.8h-84.4l-0.1-84.4 84.5 84.4z" p-id="2182" :fill="menuBtn=='4'?'#fff':'#707070'"></path><path d="M445.2 323.8c17.7 0 32-14.4 31.9-32.1 0-17.6-14.4-31.9-32-31.9h-0.1l-128.8 0.4c-17.7 0-32 14.4-31.9 32.1 0.1 17.7 14.4 31.9 32.1 31.9l128.8-0.4zM317.1 452.2h191.3c17.7 0 32-14.3 32-32s-14.3-32-32-32H317.1c-17.7 0-32 14.3-32 32s14.3 32 32 32zM887.8 725.5c-2.5-10.8-13.2-17.5-23.9-15.1-10.8 2.5-17.5 13.2-15.1 23.9 1.6 6.9 2.4 14.1 2.4 21.3 0 52.7-42.8 95.5-95.5 95.5s-95.5-42.8-95.5-95.5 42.8-95.5 95.5-95.5c27 0 52.9 11.5 71 31.7 7.4 8.2 20 8.9 28.2 1.5s8.9-20 1.5-28.2c-25.7-28.5-62.4-44.9-100.8-44.9-74.7 0-135.5 60.8-135.5 135.5s60.8 135.5 135.5 135.5 135.5-60.8 135.5-135.5c0-10.2-1.1-20.4-3.3-30.2z" p-id="2183" :fill="menuBtn=='4'?'#fff':'#707070'"></path><path d="M787.1 717.5l-42.3 45.1c-11.7-8.7-21.8-16.3-23.8-17.9-7.9-6.7-19.7-6.3-27.1 1.1-7.8 7.8-7.8 20.5 0 28.3 1.3 1.3 1.9 1.9 41.3 31.3 3.6 2.7 7.8 4 12 4 5.4 0 10.7-2.1 14.6-6.3l54.5-58.1c7.6-8.1 7.2-20.7-0.9-28.3-8.1-7.6-20.7-7.2-28.3 0.8z" p-id="2184" :fill="menuBtn=='4'?'#fff':'#707070'"></path></svg>
            <span style="margin-left: 8px;">流水账单</span>
          </div>
          <span></span>
        </div>
      </div>
      <div style="background-color: #fff;min-height: 800px;" :style="{height:list3?(list3.length/5)*320+320+'px':'800px'}">
        <div class="top_center" style="padding-top: 20px;">
          <yhm-commonbutton :value="indexs==0?'开始':'继续'" v-if="state==0" icon="i" class="workOrderBtn" @call="beginClick()" :flicker="true" ></yhm-commonbutton>
          <yhm-commonbutton value="已竣工" v-else icon="i" class="workOrderBtn"></yhm-commonbutton>

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
                  <span class="circle" ref="circleClick" @click="circleClick(item)" :class="{'atPresent':item.index==indexs}">{{item.index>indexs?'待办':item.index==indexs?'操作':'查看'}}</span>
                  <p class="circleTitle_center" :class="{'circleTitle_center_right':index==4}" :style="{'color':item.color}">{{item.title=='质检确认'?'返工确认':item.title}}</p>
                  <p style="text-align: center;" :class="{'circleTetRight':index==4}">
                    <span style="color: #7f7fd5;" v-if="item.teamName!=''&&item.teamName!=null">( {{item.teamName}} )</span>
                    <br v-if="item.teamName!=''&&item.teamName!=null">
                    <span v-if="item.state==0">未完成</span>
                    <span v-else-if="item.state=='1'" style="color: #49a9ea;">进行中</span>
                    <span v-else-if="item.state=='2'" style="color: #00B86B;">已完成</span>

                    <br v-if="item.state=='1'||item.state=='2'" v-show="item.type=='0'||item.type=='2'">
                    <span v-if="item.state=='1'||item.state=='2'" v-show="item.type=='0'||item.type=='2'">开始时间</span>
                    <br v-if="item.state=='1'||item.state=='2'" v-show="item.type=='0'||item.type=='2'">
                    <span v-if="item.state=='1'||item.state=='2'" v-show="item.type=='0'||item.type=='2'">{{item.startDateStr}}</span>
                    <br v-if="item.state=='1'||item.state=='2'" v-show="item.type=='0'||item.type=='2'">
                    <span v-if="item.state=='2'" v-show="item.type=='0'||item.type=='2'">结束时间</span><br>
                    <span v-if="item.state=='2'" v-show="item.type=='0'||item.type=='2'">{{item.endDateStr}}</span>
                  </p>
                </div>
                <span  class="i-input-left-arrow" v-show="index==4&&content[0].list.length==0"
                       style="font-size: 30px;float: left;position: relative;top: 45px;left: -119px;z-index: 1;"
                ></span>
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
                    'right':index==0?'-520px':(-520+(index*250))+ 'px',
                    'top':item.direction=='2'?'130px':'',
                 }"
              >
                <div class="circleTitle2">
                  <span class="circle" ref="circleClick" @click="circleClick(item)"  :class="{'circleTitle_circle':index==4,'atPresent':item.index==indexs}">{{item.index>indexs?'待办':item.index==indexs?'操作':'查看'}}</span>
                  <p class="circleTitle_center" :class="{'circleTitle_center_left':index==4}" :style="{'color':item.color}">{{item.title=='质检确认'?'返工确认':item.title}}</p>
                  <p style="text-align: center;" :class="{'circleTetLeft':index==4}">
                    <span style="color: #7f7fd5;" v-if="item.teamName!=''&&item.teamName!=null">( {{item.teamName}} )</span>
                    <br v-if="item.teamName!=''&&item.teamName!=null">
                    <span v-if="item.state==0">未完成</span>
                    <span v-else-if="item.state=='1'" style="color: #49a9ea;">进行中</span>
                    <span v-else-if="item.state=='2'" style="color: #00B86B;">已完成</span>
                    <br v-if="item.state=='1'||item.state=='2'" v-show="item.type=='0'||item.type=='2'">
                    <span v-if="item.state=='1'||item.state=='2'" v-show="item.type=='0'||item.type=='2'">开始时间</span>
                    <br v-if="item.state=='1'||item.state=='2'" v-show="item.type=='0'||item.type=='2'">
                    <span v-if="item.state=='1'||item.state=='2'" v-show="item.type=='0'||item.type=='2'">{{item.startDateStr}}</span>
                    <br v-if="item.state=='1'||item.state=='2'" v-show="item.type=='0'||item.type=='2'">
                    <span v-if="item.state=='2'" v-show="item.type=='0'||item.type=='2'">结束时间</span><br>
                    <span v-if="item.state=='2'" v-show="item.type=='0'||item.type=='2'">{{item.endDateStr}}</span>
                  </p>
                </div>
                <div class="bor borLeft" :class="{'borLeft':item.direction=='2'?true:false}" v-if="index==4">
                  <span class="semicircleRight"></span>
                  <span class="semicircleCentre"></span>
                </div>
                <span  class="i-input-right-arrow" v-show="index==4&&content[key+1].list.length==0"
                       style="font-size: 30px;float: right;position: relative;top: 45px;right: -100px;"
                ></span>
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
                  <span class="circle" ref="circleClick" @click="circleClick(item)" :class="{'circleRight':index==4,'atPresent':item.index==indexs}">{{item.index>indexs?'待办':item.index==indexs?'操作':'查看'}}</span>
                  <p class="circleTitle_center" :class="{'circleTitle_center_right':index==4}" :style="{'color':item.color,}">{{item.title=='质检确认'?'返工确认':item.title}}</p>
                  <p style="text-align: center;" :class="{'circleTetRight':index==4}">
                    <span style="color: #7f7fd5;" v-if="item.teamName!=''&&item.teamName!=null">( {{item.teamName}} )</span>
                    <br v-if="item.teamName!=''&&item.teamName!=null">
                    <span v-if="item.state==0">未完成</span>
                    <span v-else-if="item.state=='1'" style="color: #49a9ea;">进行中</span>
                    <span v-else-if="item.state=='2'" style="color: #00B86B;">已完成</span>
                    <br v-if="item.state=='1'||item.state=='2'" v-show="item.type=='0'||item.type=='2'">
                    <span v-if="item.state=='1'||item.state=='2'" v-show="item.type=='0'||item.type=='2'">开始时间</span>
                    <br v-if="item.state=='1'||item.state=='2'" v-show="item.type=='0'||item.type=='2'">
                    <span v-if="item.state=='1'||item.state=='2'" v-show="item.type=='0'||item.type=='2'">{{item.startDateStr}}</span>
                    <br v-if="item.state=='1'||item.state=='2'" v-show="item.type=='0'||item.type=='2'">
                    <span v-if="item.state=='2'" v-show="item.type=='0'||item.type=='2'">结束时间</span><br>
                    <span v-if="item.state=='2'" v-show="item.type=='0'||item.type=='2'">{{item.endDateStr}}</span>
                  </p>
                </div>
                <div class="bor borRight" v-if="index==4">
                  <span class="semicircleRight semicircleBorRight"></span>
                  <span class="semicircleCentre"></span>
                </div>
                <span  class="i-input-left-arrow" v-show="index==4&&content[key+1].list.length==0"
                       style="font-size: 30px;float: left;position: relative;top: 45px;left: -119px;"
                ></span>
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
      <div style="width: 100%;height: 50px;z-index: 99;position: fixed;bottom: 0;display: flex;align-items: center;justify-content: center;">
<!--        indexs==0?'开始流程':'继续流程'-->
        <yhm-commonbutton value="当前工序" icon="i" @call="beginClick()" :flicker="true" ></yhm-commonbutton>
<!--        <yhm-commonbutton value="添加工单详情" icon=" " :flicker="true" @call="affirmProcess('0')"></yhm-commonbutton>-->
<!--        <yhm-commonbutton value="添加出库" icon=" " :flicker="true" @call="affirmProcess('1')"></yhm-commonbutton>-->
      </div>
      <div class="shade" v-show="leftMenuShow" @click="leftMenuShow = false"></div>
    </div>
</template>

<script>
  import { formmixin } from '@/assets/form.js'
  import { guid } from '@/assets/common.js'
  export default {
    name: 'workOrderFlowChartForm',
    mixins: [formmixin],
    data(){
      return{
        colorList:['fd6802','2f54eb','a60cde','d618ab','2c920b'],
        // direction:'',//通过数组长度/5的结果 算出当前在左边还是在右边
        menuBtn:-1,//选中按钮的索引值
        indexs:0,//总索引值
        key:0,
        state:'',//当前主流程表是否已完成
        stage:'',//阶段
        materCount:'',//材料详情
        fixreveCount:'',//定损单条数
        fixdetailCount:'',//工单详情条数
        initiative:'',//是否自动打开当前流程
        closeInitiative:'',
        // prepareShow:false,//准备阶段是否展示出来
        list1:[],//前五个节点的数据
        list2:[],//全部的子流程节点
        list3:[],//返修节点的数据
        stateStrList:[],//工序状态
        flowPathID:'',//主流程图id
        leftMenuShow:false,//左边菜单显示隐藏
        immobilizationList:[
          {
            list:[
              // {
              //   title:'定损单',//标题
              //   stage:'1',//阶段
              //   type:'',//流程阶段
              //   state:'',//状态:已完成未完成
              //   stageColor:'#fd6802',//当前阶段的颜色
              //   circleIcon:'',//节点图标
              //   direction:'0',//border的类型 0直线 1右边曲线 2左边曲线
              //   index:'0',//全部节点的索引值
              // },
              // {
              //
              //   title:'工单详情',//标题
              //   stage:'1',//阶段
              //   type:'',//流程阶段
              //   state:'',//状态:已完成未完成
              //   stageColor:'#fd6802',//当前阶段的颜色
              //   circleIcon:'',//节点图标
              //   direction:'0',//border的类型 0直线 1右边曲线 2左边曲线
              //   index:'1',//全部节点的索引值
              // },
              // {
              //   title:'工单材料',//标题
              //   stage:'1',//阶段
              //   type:'',//流程阶段
              //   state:'',//状态:已完成未完成
              //   stageColor:'#fd6802',//当前阶段的颜色
              //   circleIcon:'',//节点图标
              //   direction:'0',//border的类型 0直线 1右边曲线 2左边曲线
              //   index:'2',//全部节点的索引值
              // },
              // {
              //   title:'钣金拆装或修复',//标题
              //   stage:'1',//阶段
              //   type:'',//流程阶段
              //   state:'',//状态:已完成未完成
              //   stageColor:'#2f54eb',//当前阶段的颜色
              //   circleIcon:'',//节点图标
              //   direction:'0',//border的类型 0直线 1右边曲线 2左边曲线
              //   index:'3',//全部节点的索引值
              // },
              // {
              //   title:'选择工序',//标题
              //   stage:'1',//阶段
              //   type:'',//流程阶段
              //   state:'',//状态:已完成未完成
              //   stageColor:'#2f54eb',//当前阶段的颜色
              //   circleIcon:'',//节点图标
              //   direction:'1',//border的类型 0直线 1右边曲线 2左边曲线
              //   index:'4',//全部节点的索引值
              // },
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
    // beforeRouteEnter (to, from, next) {
    //   next(vm => {
    //     let  a =  JSON.parse(sessionStorage.processState||0)
    //     if(a.id==vm.ownerID){
    //       vm.proState = a.proState
    //     }
    //   })
    // },
    methods:{
      mouseoutEvent(){
        this.leftMenuShow = false
      },
      mouseoverEvent(){
        this.leftMenuShow = true
      },
      affirmProcess(type){
        if(type=='0'){
          this.$dialog.OpenWindow({
            width: '1050',
            height: '700',
            url:'/workOrderDetailsManagerView?ownerID='+this.ownerID+'&flowPathID='+this.flowPathID+'&worktype='+this.worktype,
            title:'工单详情列表',
            closeCallBack:(data) =>{
              // if (data) {
              // this.$dialog.close()
              this.initData(false)
              // }
            }
          })
        }else if(type=='1'){
          this.$dialog.OpenWindow({
            width: '1050',
            height: '700',
            url:'/workOrderStockOutManagerView?flowPathID='+this.flowPathID+'&ownerID='+this.ownerID,
            title:'出库详情列表',
            closeCallBack:(data) =>{
              // if (data) {
              // this.$dialog.close()
              this.initData(false)
              // }
            }
          })
        }

      },
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
      menuBtnMouseout(){
        this.menuBtn = -1
      },
      menuBtnMouseover(index){
        this.menuBtn = index
      },
      selectionProcess(type){
        let selectionProcessObject = {//展示向的 选择工序的数据
            id:'AAAAA',
            ownerID:'',
            dependid:'',
            title:'选择工序',
            nameStr:'选择工序',
            stage:this.list2.length,
            state:'1',
            type:'1',
            index:this.list2.length,
            orderStr:this.list2.length,
            color:'#49a9ea',
            startDateStr:''
          }
        let selectionProcessObject2 = {
          id:'AAAAA',
          ownerID:'',
          dependid:'',
          title:'选择工序',
          nameStr:'选择工序',
          stage:this.list.length+1,
          state:'1',
          type:'1',
          index:this.list.length,
          orderStr:this.list.length,
          direction:this.list.length=='4'?'1':'0',
          color:'#49a9ea',
          startDateStr:''
        }
        if(type=='0'){
          // if(this.worktype=='1'&&this.list2[this.list2.length-1].state=='2'&&this.list2[this.list2.length-1].type=='2'){
          //   this.list2.push(selectionProcessObject2)
          //   this.immobilizationList[0].list.push(selectionProcessObject2)
          // }
          if(this.worktype=='1'){
            if(this.list.length<=4&&this.list2[this.list2.length-1].state=='2'&&this.list2[this.list2.length-1].type=='2'){
              this.list2.push(selectionProcessObject2)
              this.immobilizationList[0].list.push(selectionProcessObject2)
            }else if(this.list.length<=4&&this.list2[this.list2.length-1].state=='2'&&this.list2[this.list2.length-1].type=='4'){
              this.immobilizationList[0].list.push(selectionProcessObject2)
              this.list2.push(selectionProcessObject2)
            }else if(this.list.length>=5&&this.list2[this.list2.length-1].state=='2'&&this.list2[this.list2.length-1].type=='2'){
              this.list3.push(selectionProcessObject)
              this.list2.push(selectionProcessObject)
            }else if(this.list.length>=5&&this.list2[this.list2.length-1].state=='2'&&this.list2[this.list2.length-1].title=='质检确认'){
              this.list3.push(selectionProcessObject)
              this.list2.push(selectionProcessObject)
            }else if(this.list.length<=4&&this.list2[this.list2.length-1].state=='2'&&this.list2[this.list2.length-1].type=='0'){
              this.immobilizationList[0].list.push(selectionProcessObject2)
              this.list2.push(selectionProcessObject2)
            }
          }else{
            if(this.list.length<=4&&this.list2[this.list2.length-1].state=='2'&&this.list2[this.list2.length-1].type=='2'){
              this.immobilizationList[0].list.push(selectionProcessObject2)
              this.list2.push(selectionProcessObject2)
            }else if(this.list.length<=4&&this.list2[this.list2.length-1].state=='2'&&this.list2[this.list2.length-1].type=='4'){
              this.immobilizationList[0].list.push(selectionProcessObject2)
              this.list2.push(selectionProcessObject2)
            }else if(this.list.length>=5&&this.list2[this.list2.length-1].state=='2'&&this.list2[this.list2.length-1].type=='2'){
              this.list3.push(selectionProcessObject)
              this.list2.push(selectionProcessObject)
            }else if(this.list.length>=5&&this.list2[this.list2.length-1].state=='2'&&this.list2[this.list2.length-1].title=='质检确认'){
              this.list3.push(selectionProcessObject)
              this.list2.push(selectionProcessObject)
            }else if(this.list.length<=4&&this.list2[this.list2.length-1].state=='2'&&this.list2[this.list2.length-1].type=='0'){
              this.immobilizationList[0].list.push(selectionProcessObject2)
              this.list2.push(selectionProcessObject2)
            }
          }
        }else if(type=='1'){
          if(this.list.length<='4'){
            for(let i in this.immobilizationList[0].list){
              if(this.immobilizationList[0].list[i].id=='AAAAA'){
                this.immobilizationList[0].list.splice(i,1)
              }
            }
            for(let j in this.list2){
              if(this.list2[j].id=='AAAAA'){
                this.list2.splice(j,1)
              }
            }
          }else if(this.list.length=='5'){
            for(let t in this.list2){
              if(this.list2[t].id=='AAAAA'){
                this.list2.splice(t,1)
              }
            }
            for(let t in this.list3){
              if(this.list3[t].id=='AAAAA'){
                this.list3.splice(t,1)
              }
            }
          }
        }
      },
      generatingProcess(){
        this.content = [] //每次渲染时清空之前的数组
        let quantity = this.list3.length/5 //需要生成几组数据（每组五个）
        let num = 0 //添加检验节点后需要生成几组
        //先向固定准备阶段补一个服务节点 凑满一组5个

        if(Number(quantity)%1==0){//计算总数除以5是否可以整除
          num = quantity + 1
          // console.log( quantity,'整数' )
        }else{//无法整除时截取小数点前的数据 并加一
          num = parseInt(quantity.toString().substring(0,quantity.toString().indexOf('.')))+1
          if(num==0){//如果不满足5条时 改变为1 下边生成一组数据
            num==1
          }
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
        try {
          for(let j=1; j<this.list3.length; j++){
            if(j!=0&&j%5==0){//判断除以4==0时 表示是当前数组的最后一条
              this.content[a].list.push({
                'title':this.list3[j].nameStr,
                'id':this.list3[j].id,
                'dependid':this.list3[j].dependid,
                'type':this.list3[j].type,
                'stage':'2',
                'state':this.list3[j].state,
                'color':this.list3[j].color,
                'circleIcon':'',
                'ownerID':this.list3[j].ownerID,
                'direction':a%2==0?2:1,//判断方向来添加相应的样式
                'index':Number(this.list3[j].orderStr),
                'orderStr':Number(this.list3[j].orderStr),
                'endDateStr':this.list3[j].endDateStr==null?'':this.list3[j].endDateStr,
                'startDateStr':this.list3[j].startDateStr,
              })
              a++
            }else{
              this.content[a].list.push({
                'title':this.list3[j].nameStr,
                'id':this.list3[j].id,
                'dependid':this.list3[j].dependid,
                'type':this.list3[j].type,
                'stage':'2',
                'state':this.list3[j].state,
                'color':this.list3[j].color,
                'circleIcon':'',
                'direction':'',
                'ownerID':this.list3[j].ownerID,
                'index':Number(this.list3[j].orderStr),
                'orderStr':Number(this.list3[j].orderStr),
                'endDateStr':this.list3[j].endDateStr==null?'':this.list3[j].endDateStr,
                'startDateStr':this.list3[j].startDateStr,
              })
            }
          }
        }catch (e) {
        }

        setTimeout(()=>{
          if(this.initiative == '0'&&this.closeInitiative == '0'){
            this.closeInitiative = ''
            // sessionStorage.setItem('initiative',this.ownerID)
            this.beginClick()
          }
        },0)
      },
      leftMenuBtnClick(type){
        let url = ''
        let title = ''
        let height = ''
        if(type=='0'){
          url = '/lossAssessmentForm?ownerID='+this.ownerID+'&flowPathID='+this.flowPathID+'&indexs='+this.indexs//定损单录制
          title = '添加定损单'
          this.skipEvent(url,title)
        }else if(type=='1'){
          url = '/workOrderDetailsManagerView?ownerID='+this.ownerID+'&flowPathID='+this.flowPathID+'&worktype='+this.worktype//工单详情列表
          title = '添加工单详情'
          this.skipEvent(url,title)
        }else if(type=='2'){
          url = '/workOrderMaterialListManagerView?ownerID='+this.ownerID+'&flowPathID='+this.flowPathID//工单材料列表
          title = '工单材料列表'
          this.skipEvent(url,title)
        }else if(type=='3'){
          url = '/workOrderStockOutManagerView?ownerID='+this.ownerID+'&flowPathID='+this.flowPathID
          title = '出库'
          this.skipEvent(url,title)
        }else if(type=='4'){
          url = '/workOrderSettleAccountsForm?ownerID='+this.ownerID+'&flowPathID='+this.flowPathID
          title = '流水账单'
          height = '800'
          this.skipEvent(url,title,height)
        }
      },
      beginClick(){
        setTimeout(()=>{
          this.leftMenuShow = false
        },0)
        let url = ''
        let title = ''
        let height = '700'
        let inTheEnd = ''
        let index = ''
        let item = ''
        item = this.list2[this.indexs]
        inTheEnd = item.orderStr==this.list2.length-1//判断是否是最后一个服务节点
        index = this.list2.length//检修节点的索引值
        if(Number(item.orderStr)<=Number(this.indexs)){
          if(item.type=='0'){
            let flowType = 7
            if(Number(this.indexs)>3){
              flowType = 6
            }
            url = '/sheetMetalRepairForm?ownerID='+this.ownerID+'&flowPathID='+this.flowPathID+'&flowType='+flowType
              +'&index='+item.index+'&upDateStateID='+item.id
            title = '钣金拆装或修复'
            this.skipEvent(url,title)
            return
          }else if(item.type=='3'&&item.nameStr=='检修'){
            url = '/workOrderCheckoutManagerView?ownerID='+this.ownerID+'&subProcessID='+item.id
              +'&flowPathID='+this.flowPathID+'&state='+this.state+'&index='+item.orderStr
              +'&upDateStateID='+item.id+'&inTheEnd='+inTheEnd
            title = '检修'
            this.skipEvent(url,title,'700')
            return
          }else if(item.type=='4'&&item.nameStr=='质检确认'){
            url = '/workOrderCheckoutAffirmManager?ownerID='+this.ownerID+
              '&inTheEnd='+inTheEnd+'&flowPathID='+this.flowPathID+
              '&index='+item.orderStr+'&state='+item.state,
            title = '确认返修工序'
            this.skipEvent(url,title,'700')
            return
          }
          if(item.type=='2'){//查看工序
            let type = 5
            let state = 0
            for(let i in this.list3){
              if(this.list3[i].nameStr=='质检确认'){
                type = 6
              }
            }
            if(item.type=='2'){
              state = 2
            }
            url = '/workOrderProcessForm?ownerID='+this.ownerID
              +'&flowPathID='+this.flowPathID+'&index='+item.index
              +'&flowType=6'+'&dependid='+item.dependid
              +'&upDateStateID='+item.id+'&inTheEnd='+inTheEnd+'&nodeType='+type
              +'&state='+state
            title = '查看'+item.title
            this.skipEvent(url,title)
          }
          if(item.nameStr=='选择工序'){
            this.ajaxJson({
              url: '/fix/fixrepair/initForm',
              loading:'0',
              data: {
                orderid:this.ownerID,
                state:'0',
              },
              call: (data) => {
                if(data){
                  if(data.repairNamePsd.list.length>=1){
                    url = '/workOrderProcessForm?ownerID='+this.ownerID+'&flowPathID='+this.flowPathID+'&index='+item.orderStr+'&inTheEnd='+inTheEnd
                    title = '选择工序'
                    this.skipEvent(url,title)
                    return
                  }else{
                    this.$dialog.confirm({
                      width: 350,
                      tipValue: '所有工序已完成,是否进入检修阶段？',
                      btnValueOk: '确认',
                      btnValueCancel: '取消',
                      alertImg: 'warn',
                      okCallBack: (datas) => {
                        if(item.orderStr!=0&&item.orderStr!=undefined){
                          this.ajaxJson({
                            url: '/fix/fixProcessDetail/update',//整合接口
                            data: {
                              saveEntity:{
                                'nameStr':'检修',
                                'id':guid(),
                                'ownerID':this.flowPathID,
                                'dependid':'',
                                'stage':'2',
                                'state':'0',
                                'type':'3',
                                'orderStr':item.orderStr
                              },
                              confirmEntity:{
                                // id:this.subProcessID,
                                ownerID:this.flowPathID,
                                state:'1'
                              }
                            },
                            call: (data) => {
                              if(data.type==0){
                                this.initData(true)
                                // this.$dialog.alert({
                                //   tipValue: '',
                                //   closeCallBack: () => {
                                //     // this.$dialog.close()
                                //   }
                                // })
                              }else{
                                this.$dialog.alert({
                                  alertImg: 'error',
                                  tipValue: data.message,
                                  closeCallBack: () => {
                                  }
                                })
                              }
                            }
                          })

                        }
                      }
                    })
                  }
                }
              }
            })
            return


          }
          if(item.type=='6'&&item.title=='交车待确认'){//交车待确认
            url = '/workOrderToBeConfirmedView?id='+this.ownerID+'&subProcessID='+item.id
              +'&flowPathID='+this.flowPathID+'&index='+item.index+'&inTheEnd='+inTheEnd
            title = '交车待确认'
            this.skipEvent(url,title)
            // url = '/workOrderSettleAccountsForm?ownerID='+this.ownerID+'&flowPathID='+this.flowPathID+'&inTheEnd='+inTheEnd+'&index='+item.index+'&upDateStateID='+item.id
            // title = item.title
            // height = '800'
            // this.skipEvent(url,title,height)
          }
        }
      },
      circleClick(item){
        setTimeout(()=>{
          this.leftMenuShow = false
        },0)
        let url = ''
        let title = ''
        let height = '700'
        // this.nodeDiagramState()
        let inTheEnd = false
        let index = ''
        inTheEnd = item.index==this.list2.length-1//判断是否是最后一个服务节点
        index = this.list2.length//检修节点的索引值
        if(Number(item.index)<=Number(this.indexs)){
          if(item.title=='交车'){//已完成
            return
          }
          if(item.type==0&&item.title=='钣金拆装或修复'){//钣金拆装或修复
            let flowType = 7
            if(Number(this.indexs)>3){
              flowType = 6
            }
            url = '/sheetMetalRepairForm?ownerID='+this.ownerID+'&flowPathID='+this.flowPathID+'&flowType='+flowType
              +'&index='+item.index+'&upDateStateID='+item.id
            title = '钣金拆装或修复'
            this.skipEvent(url,title)
            return
          }else if(item.type=='2'){//查看工序
              let type = 5
              let state = 0
              for(let i in this.list3){
                if(this.list3[i].nameStr=='质检确认'){
                  type = 6
                }
              }
              if(item.type=='2'){
                state = 2
              }
              url = '/workOrderProcessForm?ownerID='+this.ownerID
                +'&flowPathID='+this.flowPathID+'&index='+item.index
                +'&flowType=6'+'&dependid='+item.dependid
                +'&upDateStateID='+item.id+'&inTheEnd='+inTheEnd+'&nodeType='+type
                +'&state='+state
              title = '查看'+item.title
              this.skipEvent(url,title)
              return
          }else if(item.type=='3'){
            url = '/workOrderCheckoutManagerView?ownerID='+this.ownerID+'&subProcessID='+item.id
              +'&flowPathID='+this.flowPathID+'&state='+this.state+'&index='+item.index
              +'&upDateStateID='+item.id+'&inTheEnd='+inTheEnd
            title = '检修'
            this.skipEvent(url,title,'700')
            return
          }
          if(item.title=='选择工序'&&this.indexs==item.index){
            this.ajaxJson({
              url: '/fix/fixrepair/initForm',
              loading:'0',
              data: {
                orderid:this.ownerID,
                state:'0',
              },
              call: (data) => {
                if(data){
                  if(data.repairNamePsd.list.length>=1){
                    url = '/workOrderProcessForm?ownerID='+this.ownerID+'&flowPathID='+this.flowPathID+
                      '&index='+item.index+'&inTheEnd='+inTheEnd
                    title = '选择工序'
                    this.skipEvent(url,title)
                    return
                  }else{
                    this.$dialog.confirm({
                      width: 350,
                      tipValue: '所有工序已完成,是否进入检修阶段？',
                      btnValueOk: '确认',
                      btnValueCancel: '取消',
                      alertImg: 'warn',
                      okCallBack: (datas) => {
                        if(item.index!=0&&item.index!=undefined){
                          this.ajaxJson({
                            url: '/fix/fixProcessDetail/update',//整合接口
                            data: {
                              saveEntity:{
                                'nameStr':'检修',
                                'id':guid(),
                                'ownerID':this.flowPathID,
                                'dependid':'',
                                'stage':'2',
                                'state':'0',
                                'type':'3',
                                'orderStr':item.index
                              },
                              confirmEntity:{
                                // id:this.subProcessID,
                                ownerID:this.flowPathID,
                                state:'1'
                              }
                            },
                            call: (data) => {
                              if(data.type==0){
                                this.initData(true)

                                // this.$dialog.alert({
                                //   tipValue: '',
                                //   closeCallBack: () => {
                                //     // this.$dialog.close()
                                //   }
                                // })
                              }else{
                                this.$dialog.alert({
                                  alertImg: 'error',
                                  tipValue: data.message,
                                  closeCallBack: () => {
                                  }
                                })
                              }
                            }
                          })

                        }
                      }
                    })
                  }
                }
              }
            })
            return
          }
          if(item.type=='4'&&item.title=='质检确认'){
            url = '/workOrderCheckoutAffirmManager?ownerID='+this.ownerID+'' +
              '&inTheEnd='+inTheEnd+'&flowPathID='+this.flowPathID+'&index='+index
              +'&upDateStateID='+item.id+'&state='+item.state+'&dependid='+item.dependid,
            this.skipEvent(url,'确认返修工序','700')
            return
          }
          if(item.type=='6'&&item.title=='交车待确认'){//交车待确认
            url = '/workOrderToBeConfirmedView?id='+this.ownerID+'&subProcessID='+item.id
              +'&flowPathID='+this.flowPathID+'&index='+item.index+'&inTheEnd='+inTheEnd
            title = '交车待确认'
            this.skipEvent(url,title)
          }
        }
      },
      initData (beginClickSwitch) {
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
              this.immobilizationList[0].list = []
              this.flowPathID = data.id
              this.worktype = data.order.worktype
              this.list = data.list
              this.list2 = data.list2
              this.list3 = data.list3
              this.stage = data.stage
              this.state = data.state
              this.indexs = data.stage
              this.stateStrList = data.stateStrPsd
              this.materCount = data.materCount
              this.fixreveCount = data.fixreveCount
              this.fixdetailCount = data.fixdetailCount
              let selectionProcessObject2 = {
                id:'AAAAA',
                ownerID:'',
                dependid:'',
                title:'选择工序',
                nameStr:'选择工序',
                stage:this.list.length+1,
                state:'1',
                type:'1',
                index:this.list.length,
                orderStr:this.list.length,
                direction:this.list.length=='4'?'1':'0',
                color:'#49a9ea',
                startDateStr:''
              }
              if(this.worktype=='1'&&this.list2.length==0){
                this.list2.push(selectionProcessObject2)
                this.immobilizationList[0].list.push(selectionProcessObject2)
              }


              // this.list.push(selectionProcessObject2)
              for(let m=0; m<data.list.length; m++){
                this.immobilizationList[0].list.push({
                  id:data.list[m].id,
                  ownerID:data.list[m].ownerID,
                  dependid:data.list[m].dependid,
                  teamName:data.list[m].teamName,
                  title:data.list[m].nameStr,
                  stage:data.list[m].stage,
                  state:data.list[m].state,
                  type:data.list[m].type,
                  index:data.list[m].orderStr,
                  direction:m=='4'?'1':'0',
                  color:data.list[m].color,
                  endDateStr:data.list[m]==null?'':data.list[m].endDateStr,
                  startDateStr:data.list[m].startDateStr,
                })
              }
              this.selectionProcess('0')
              this.generatingProcess()
              setTimeout(()=>{
                if(this.initiative == '0'&&this.closeInitiative == '0'){
                  this.closeInitiative = ''
                  // sessionStorage.setItem('initiative',this.ownerID)
                  this.beginClick()
                }
                if(beginClickSwitch){
                  this.beginClick()
                }
              },0)
            }
          }
        })
      }
    },
    // beforeRouteEnter (to, from, next) {
    //   next(vm => {
    //     if(vm) {
    //       vm.$nextTick(() => {
    //         if(vm.ownerID==sessionStorage.initiative){
    //           vm.closeInitiative = ''
    //         }
    //       })
    //     }
    //   })
    // },
    created () {
      this.setQuery2Value('initiative')//为0的时候自动打开当前节点页面
      this.closeInitiative = this.initiative.concat()
      this.setQuery2Value('cid')
      this.setQuery2Value('ownerID')
      this.initData()
    }

  }
</script>

<style lang="less" scoped>
.shade{
  position: fixed;
  top:0;
  left: 0;
  bottom: 0;
  width: 100%;
  flex: 1;
  z-index: 9;
  opacity: 0;
}
.leftMenu{
  width: 190px;
  height: 100%;
  background-color: #ededed;
  z-index: 100;
  position: fixed;
  top: 0;
  left: -190px;
  bottom: 0;
  transition: all .5s;
}
.leftMenuShow{
  width: 190px;
  height: 100%;
  background-color: #ededed;
  z-index: 100;
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  transition: all .5s;
}
.leftMenuTitle{
  width: 100%;
  text-align: center;
  height: 66px;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  font-weight: bold;
  font-size: 16px;
  border-bottom: 1px solid #ccc;
  background-color: #ededed;
}
.leftMenuBtn{
  width: 100%;
  font-size: 14px;
  /*padding-left: 34px;*/
  /*box-sizing: border-box;*/
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: 40px;
  cursor: pointer;
}
.leftMenuBtn:hover{
  color: #fff;
  background-color: #49a9ea;
}
.leftMenuArrows{
  width: 30px;
  height: 88px;
  line-height: 88px;
  text-align: center;
  background-color: #49a9ea;
  color: #fff;
  border-radius:0 5px 5px 0;
  position: absolute;
  right: -30px;
  top: 50%;
  cursor: pointer;
  transform: translateY(-50%);
}
/*.leftMenuArrows:hover::after{*/
/*  transform:rotate(90deg);*/
/*  -webkit-transform:rotate(90deg);*/
/*}*/
.atPresent{
  background-color: #49a9ea !important;

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
      height: 75px;
      .circle{
        width: 35px;
        height: 35px;
        cursor: pointer;
        line-height: 35px;
        text-align: center;
        color: #fff;
        font-size: 12px;
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
    left: 18px;
    top:-164px;
    transform:rotate(180deg);
  }
  .circleTitle_center_right{
    position: relative;
    top:-50px;
    left:60px;
  }
  .circleTetRight{
    position: relative;
    top: -50px;
    left: 60px;
  }
  .circleTitle_center_left{
    position: relative;
    top: -50px;
    right: 80px;
  }
  .circleTetLeft{
    position: relative;
    top: -50px;
    right: 80px;
  }
  .circleTitle_circle{
    position: absolute !important;
    left: 20px !important;
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
