<template>
  <div v-if="show" class="fc_main fc_main_w" v-validator="validatorEvent">
    <div ref="aaa" class="fc_box">
      <div class="fc_title">
        <div>{{title}}</div>
        <div v-if="subtitle !== ''">{{subtitle}}</div>
      </div>
      <div class="c_main c_textarea" v-click-control-outside="closeDatePanelEvent">
        <yhm-date-panel @call="selectDateEvent" :position="datePanelPosition" :value="date" :show="showDatePanel" :min="min" :max="max" :is-clear="false"></yhm-date-panel>
        <div class="c_box c_textarea" @click="clickEvent" @mouseout="mouseoutEvent" @mouseover="mouseoverEvent" :class="{c_error:error,c_hover:mouseStyle,c_disable:noEdit}">
          <div class="c_content c_m_content">
            <div class="c_m_item" v-for="(item,index) in value" :key="index" @click.stop>
              <span class="c_m_item_title" >{{item.selectValue}}</span>
              <yhm-text ref="txtControl" @input="inputEvent" :no-edit="getLastNoEdit(index)" :before-icon="inputBeforeIcon" :value="getLastValue(index,item.value)" :id="getID(index)" category="m" :width="textWidth" :rule="ruleItem" :class="{mr10:noEdit}"></yhm-text>
              <span v-if="!noEdit" class="c_icon c_icon_delete ml10 mr10 fs15 delete" @click.self="deleteItem(item)"></span>
            </div>

          </div>
          <span class="c_icon" :class="afterIcon"></span>
        </div>
      </div>
    </div>
    <div class="fc_error"><span v-if="error">{{errorTipMessage}}</span></div>
  </div>
</template>

<script>
  import {accAdd,accMul} from '@/assets/common.js'
  export default {
    name: "yhm-form-zh-select-more",
    inject: ['p____page'],
    data () {
      return {
        datePanelPosition:{
          x:this.datePanelHorizontal,
          y:this.datePanelVertical,
          z:this.isWhole
        },
        date:'',
        showDatePanel:false,
        focusStyle:false,
        mouseStyle:false,
        mouseOver:false,
        afterIcon: 'i-input-right-add',
        error: false,
        errorTipMessage: this.emptyMessage
      }
    },
    props: {
      datePanelHorizontal:{
        type:String,
        default:"left"
      },
      datePanelVertical:{
        type:String,
        default:"bottom"
      },
      isWhole:{
        type:Boolean,
        default:true
      },
      max:{
        type:String,
        default:""
      },
      min:{
        type:String,
        default:""
      },
      category:{
        type:String,
        default:'select'
      },
      textWidth:{
        type:String,
        default:'90'
      },
      inputBeforeIcon:{
        type:String,
        default:'rmb'
      },
      title: {
        type: String,
        default: '标题'
      },
      subtitle: {
        type: String,
        default: ''
      },
      total:{
        type:String,
        default:'0'
      },
      id: {
        type: String,
        required: true
      },
      value: {
        type: Array,
        required: true
      },
      rule: {
        type: String,
        default: ''
      },
      emptyMessage:{
        type:String,
        default:"不能为空"
      },
      ruleItem: {
        type: String,
        default: ''
      },
      noEdit:{
        type:Boolean,
        default:false
      },
      show: {
        type: Boolean,
        default: true
      },
      beforeEdit: {
        type: Boolean,
        default: false,
      }
    },

    methods:{
      inputEvent(){
        this.$nextTick(()=>{
          this.$emit("input")
        })
      },
      //初始化验证事件
      validatorEvent(category){
        if(this.rule !== "") {
          let id = this.id;
          id = id.replace(".","_")
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
      //关闭日历
      closeDatePanelEvent(){
        this.showDatePanel = false
      },
      //选择日期事件
      selectDateEvent(val){
        this.$nextTick(() => {
          this.showDatePanel = false
          this.date = val
          this.$emit('click',val)
        })
      },
      //选择事件
      clickEvent(){
        if(!this.noEdit) {
          if(this.category === 'select') {
            this.$nextTick(() => {
              this.$emit('click')
            })
          }
          else if(this.category === 'date'){
            this.showDatePanel = true
          }
        }
      },
      // 鼠标放上事件
      mouseoverEvent () {
        if (!this.error) {
          this.mouseStyle = true
        }
        this.mouseOver = true
      },
      // 鼠标移出事件
      mouseoutEvent () {
        if (!this.error) {
          this.mouseStyle = false
        }
        this.mouseOver = false
      },
      deleteItem(item){
        console.log( item,'783' )
        let index = this.value.indexOf(item)
        let js = "this.p____page." + this.id + ".splice(" + index + ", 1)"
        eval(js)
      },
      //验证
      verification(){
        let result = true;
        if(this.show && this.rule === "#") {
          result = this.value.length !== 0
        }
        this.error = !result
        if(this.error){
          this.errorTipMessage = this.title + this.subtitle + this.emptyMessage
        }
        return result;
      }
    },
    computed:{
      getID(){
        return function (index) {
          return this.id + '[' + index + '].value'
        }
      },
      getLastNoEdit(){
        return function (index) {

          if(!this.beforeEdit){
            if(this.noEdit){
              return '1'
            }
            return (this.total !== '' && index === this.value.length - 1)?'1':''
          }else{
            return ''
          }


        }
      },
      getLastValue(){
        return function (index,val) {
          if(this.total === ''){
            return val
          }
          else{
            if(index === this.value.length - 1) {
              let result = this.total

              for(var i = 0; i < this.value.length - 1; i++){
                let money = this.value[i].value
                if(isNaN(money) || money === ''){
                  money = 0
                }
                result = accAdd(result,accMul(-1,money))
              }

              this.$nextTick(() => {
                this.value[this.value.length - 1].value = result + ''
                this.$refs.txtControl[this.value.length - 1].verification()
              })
              return result + ''
            }
            else{
              return val
            }
          }
        }
      }
    },
    watch:{
      value:{
        handler(newValue, oldValue) {
          this.verification()
        },
        deep: true
      },
      total(newValue, oldValue){
      }
    }
  }
</script>

<style scoped>
  *{
    box-sizing: border-box;
  }
</style>
