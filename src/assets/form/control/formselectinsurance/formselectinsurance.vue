<template>
  <div v-if="show" class="fc_main fc_main_w" v-validator="validatorEvent">
    <div class="fc_box">
      <div class="fc_title">
        <div>{{title}}</div>
        <div v-if="subtitle !== ''">{{subtitle}}</div>
      </div>
      <div class="c_main c_textarea">
        <div class="c_box c_box_wrap" @mouseout="mouseoutEvent" @mouseover="mouseoverEvent" :class="{c_hover:mouseStyle,c_error:error}">
          <div @contextmenu.prevent @click="selectItem(item)" :class="{c_b_item_select:getSelect(item.num),c_insurance_item:width=='1',c_insurance_item_auto:width=='0'}" v-for="(item,index) in psd" :key="index">
            <div class="icon check_button_icon fs16b" :class="{check_button_icon_select:getSelect(item.num)}"></div>
            <div class="txt">{{item.showName}}</div>
            <div class="box" v-show="getSelected(item)">
              <yhm-text v-if="getShowContent('1',item,'CarDamage')" :show="getSelected(item)" :value="carDamageValue" :id="carDamageId" rule="R0000" width="120" before-icon="rmb"  tip="money" tip-width="287" tip-left="-163" tip-arrow-left="205" category="m"></yhm-text>
              <yhm-select v-if="getShowContent('2',item,'ThreeResponsibilities')" :show="getSelected(item)" :value="threeResponsibilitiesValue" :id="threeResponsibilitiesId" rule="#" width="120" :tip="true" tip-width="287" tip-left="-163" tip-arrow-left="205" :select-list="threeResponsibilitiesList"></yhm-select>
              <yhm-text v-if="getShowContent('1',item,'Driver')" :show="getSelected(item)" :value="driverValue" :id="driverId" rule="R0000" width="120" before-icon="rmb"  tip="money" tip-width="287" tip-left="-163" tip-arrow-left="205" category="m"></yhm-text>
              <yhm-select v-if="getShowContent('2',item,'Scratch')" :show="getSelected(item)" :value="scratchValue" :id="scratchId" rule="#" width="120" :tip="true" tip-width="287" tip-left="-163" tip-arrow-left="205" :select-list="scratchList"></yhm-select>
              <yhm-select v-if="getShowContent('2',item,'Glass')" :show="getSelected(item)" :value="glassValue" :id="glassId" rule="#" width="120" :tip="true" tip-width="287" tip-left="-163" tip-arrow-left="205" :select-list="glassList"></yhm-select>
              <yhm-text v-if="getShowContent('1',item,'Specify')" :show="getSelected(item)" :value="specifyValue" :id="specifyId" rule="R0000" width="120" before-icon="rmb"  tip="money" tip-width="287" tip-left="-163" tip-arrow-left="205" category="m"></yhm-text>
              <yhm-text v-if="getShowContent('1',item,'Passenger')" :show="getSelected(item)" :value="passengerValue" :id="passengerId" rule="R0000" width="120" before-icon="rmb"  tip="money" tip-width="287" tip-left="-163" tip-arrow-left="205" category="m"></yhm-text>
              <yhm-text v-if="getShowContent('1',item,'SelfGlass')" :show="getSelected(item)" :value="selfGlassValue" :id="selfGlassId" rule="R0000" width="120" before-icon="rmb"  tip="money" tip-width="287" tip-left="-163" tip-arrow-left="205" category="m"></yhm-text>
            </div>
          </div>

        </div>
      </div>
      <slot>
      </slot>
    </div>
    <div class="fc_error"><span v-if="error">{{errorTipMessage}}</span></div>
  </div>
</template>

<script>
  export default {
    name: 'yhm-form-select-insurance',
    inject: ['p____page'],
    data(){
      return{
        mouseStyle:false,
        error:false,
        errorTipMessage: this.title + this.subtitle + this.emptyMessage
      }
    },
    props: {
      requiredList:{
        type:Array,
        default : function() {
          return []
        }
      },
      width:{
        type:String,
        default:'1'
      },
      isContent:{
        type:Boolean,
        default:false
      },
      psd:{
        type:Array,
        default : function() {
          return []
        }
      },
      //三责选择内容
      threeResponsibilitiesList:{
        type:Array,
        default : function() {
          return []
        }
      },
      //玻璃选择内容
      glassList:{
        type:Array,
        default : function() {
          return []
        }
      },
      //划痕选择内容
      scratchList:{
        type:Array,
        default : function() {
          return []
        }
      },
      //车损
      carDamageValue:{
        type:String,
        default:""
      },
      carDamageId:{
        type:String,
        default:""
      },
      //三责
      threeResponsibilitiesValue:{
        type:String,
        default:""
      },
      threeResponsibilitiesId:{
        type:String,
        default:""
      },
      //司机
      driverValue:{
        type:String,
        default:""
      },
      driverId:{
        type:String,
        default:""
      },
      //划痕
      scratchValue:{
        type:String,
        default:""
      },
      scratchId:{
        type:String,
        default:""
      },
      //玻璃
      glassValue:{
        type:String,
        default:""
      },
      glassId:{
        type:String,
        default:""
      },
      //指定特约店维修险
      specifyValue:{
        type:String,
        default:""
      },
      specifyId:{
        type:String,
        default:""
      },
      //车上人员乘客
      passengerValue:{
        type:String,
        default:""
      },
      passengerId:{
        type:String,
        default:""
      },
      //自店承保玻璃险
      selfGlassValue:{
        type:String,
        default:""
      },
      selfGlassId:{
        type:String,
        default:""
      },
      id:{
        type:String,
        default:""
      },
      value:{
        type:Array,
        default:function () {
          return []
        }
      },
      title: {
        type: String,
        default: '标题'
      },
      subtitle: {
        type: String,
        default: ''
      },
      rule:{
        type:String,
        default:""
      },
      emptyMessage:{
        type:String,
        default:"必须选择"
      },
      show: {
        type: Boolean,
        default: true
      }
    },
    methods:{
      //初始化验证事件
      validatorEvent(category){
        if(this.rule !== "") {
          var id = this.id

          if (category === "bind") {
            if(this.p____page.p____rule.indexOf(id) === -1){
              this.p____page.p____rule.push(id)
              this.p____page.p____rule[id] = this
            }
          } else if (category === "unbind") {
            let index = this.p____page.p____rule.indexOf(id)
            if(index !== -1){
              this.p____page.p____rule.splice(index,1)
              this.p____page.p____rule[id] = null
            }
          }
        }
      },
      //鼠标放上事件
      mouseoverEvent(){
        this.mouseStyle = true
      },
      //鼠标移出事件
      mouseoutEvent(){
        this.mouseStyle = false
      },
      getSelected(item){
        if(this.isContent) {
          let index = this.value.indexOf(item.num)
          return index !== -1
        }
        return false
      },
      selectItem(item){
        let index = this.value.indexOf(item.num)
        if(index === -1){
          this.value.push(item.num)
          this.error = false
        }
        else{
          if(this.requiredList.indexOf(item.num)==-1){//验证是否是必选项
            this.value.splice(index,1)
            this.error = false
            this.verification()
          }else{
            this.error = true
            this.errorTipMessage = item.showName+'为必选项'
          }
        }
        this.$emit("click",item.num)
      },
      //验证
      verification(){
        var result = true
        if(this.show && this.rule === "#") {
          result = this.value.length !== 0
          this.error = !result
        }
        return result
      }
    },
    watch:{
      psd: {
        deep: true,//深度监听
        handler: function() {
          for(let i in this.psd){
            for(let j in this.requiredList){
              if(this.psd[i].num==this.requiredList[j]){
                if(this.value.indexOf(this.requiredList[j])==-1){
                  this.value.push(this.requiredList[j])
                }
              }
            }
          }
        }
      }
    },
    computed : {
      getSelect(){
        return function(val) {
          return this.value.indexOf(val) !== -1
        }
      },
      getShowContent(){
        return function(category,item,val) {
            return category ===  item.img && item.code === val
        }
      }
    }
  }
</script>

<style scoped>
  *{
    box-sizing: border-box;
  }
</style>
