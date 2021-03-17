<template>
  <div class="f_flows">
    <div class="content">
      <div v-for="(item,index) in conf.list" :key="index" class="step">
        <div class="stepName">{{getItemName(item.name)}}</div>
        <div class="lineArea">
          <div class="lineUp" :class="{no:item.state === 0,stop:item.state === 3}"></div>
          <div class="icon" :class="{noIcon:item.state === 0,im_filledCircle:item.state === 0,im_filledCircleWait:item.state === 1,im_filledCircleCheck:item.state === 2,im_filledCircleCross:item.state === 3,stopIcon:item.state === 3}"></div>
          <div class="lineDown" :class="{no:item.state === 0 || item.state === 1 || item.state === 3}"></div>
        </div>
        <div class="lineRight" :class="{f_hide:item.state === 0 || index === conf.list.length - 1}">
          <div class="line" :class="{stop:item.state === 3}"></div>
        </div>
        <div class="person" :class="{f_hide:item.state === 0 || index === 0 || index === conf.list.length - 1}">
          <div class="items" :class="{noDashed:item.state === 3,itemsSolid:item.category === '0'}">
            <div v-for="(personItem,personIndex) in item.person" :key="index + '-' + personIndex" class="item">
              <div class="txt">{{personItem.name}}</div>
              <div v-if="item.category == 1" :class="{itemCheck:item.state === 2, im_check:item.state === 2,itemCross:item.state === 3, im_cross:item.state === 3,f_hide:personItem.state === 0}"></div>
              <div v-if="item.category == 0" :class="{itemCheck:personItem.state === 1, im_check:personItem.state === 1,itemCross:personItem.state === 2, im_cross:personItem.state === 2,f_hide:personItem.state === 0}"></div>
            </div>
          </div>
        </div>
        <div v-if="item.category == 1"  class="info" :class="{f_hide:item.state === 0 || item.state === 1 || index === conf.list.length - 1}">
          <div class="basic">
            <div v-if="personItem.state !== 0 && index !== 0" v-for="(personItem,personIndex) in item.person" :key="index + '-' + personIndex" class="txt">{{personItem.name}}：{{item.operateDate}}</div>
            <div v-if="index === 0" class="txt">{{item.operateDate}}</div>
            <div :class="{iconCross:item.state === 3,iconCheck:item.state === 2, im_computer:item.location === 0, im_phone:item.location === 1}"></div>
          </div>
          <div v-if="item.remark !== '' && index !== 0" class="remark"><b v-if="item.state === 3">驳回理由：</b><b v-if="item.state === 2">留言信息：</b>{{item.remark}}</div>
        </div>
        <div v-if="item.category == 0" class="info" :class="{f_hide:item.state === 0}">
          <block v-for="(personItem,personIndex) in item.person" :key="index + '--' + personIndex">
            <div v-if="personItem.state !== 0" class="basic">
              <div class="txt">{{personItem.name}}：{{personItem.operateDate}}</div>
              <div :class="{iconCross:personItem.state === 2,iconCheck:personItem.state === 1, im_computer:personItem.location === 0, im_phone:personItem.location === 1}"></div>
            </div>
            <div v-if="personItem.remark !== ''" class="remark"><b v-if="personItem.state === 2">驳回理由：</b><b v-if="personItem.state === 1">留言信息：</b>{{personItem.remark}}</div>
          </block>
          <!--<template v-for="(personItem,personIndex) in item.person" :key="index + '&#45;&#45;' + personIndex">-->

            <!--<div v-if="personItem.state !== 0" class="basic">-->
              <!--<div class="txt">{{personItem.name}}：{{personItem.operateDate}}</div>-->

              <!--<div :class="{iconCross:item.state === 3,iconCheck:item.state === 2, im_computer:item.location === 0, im_phone:item.location === 1}"></div>-->
            <!--</div>-->
          <!--</template>-->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'yhm-flows',
    data(){
      return{
        conf:this.config
      }
    },
    props: {
      config:{
        type:Object,
        default:{}
      },
      psd:{
        type:Array,
        default: function(){
          return []
        }
      }
    },
    computed:{
      getItemName(){
        return function (code) {
          if(this.psd && this.psd.length > 0){
            for (let item of this.psd) {
              if(item.num == code){
                return item.showName
              }
            }
            return code
          }
          else{
            return code
          }
        }
      }
    },
    watch:{
      config:{
        handler (newVal,oldVal) {
          this.conf = newVal
        },
        deep: true
      }
    }
  }
</script>

<style scoped>

</style>
