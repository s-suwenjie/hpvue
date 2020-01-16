<template>
  <div v-if="show" class="formcontrol formcontrolWidth" v-validator="validatorEvent">
    <div class="context">
      <div class="title">
        <div>{{title}}</div>
        <div v-if="subtitle !== ''">{{subtitle}}</div>
      </div>
      <div class="content">
        <div @click="clickEvent" @mouseout="mouseoutEvent" @mouseover="mouseoverEvent" class="box boxWidth HorizontallyCentered" :class="{error:error,hover:mouseStyle}">
          <div class="showMore">
            <div v-for="(item,index) in value" class="item" :key="index" @click.stop="showEvent(item)">
              <span>{{item.otherName}}</span>
              <p class="icon" :class="deleteIcon" @click.stop="deleteItemEvent(item)"></p>
            </div>
          </div>
          <span class="icon" :class="afterIcon"></span>
        </div>
      </div>
    </div>
    <div class="error"><span v-if="error">{{errorTipMessage}}</span></div>
  </div>
</template>

<script>
  export default {
    name: 'yhm-form-select-more',
    inject: ["p____page"],
    data(){
      return{
        deleteIcon:'delete',
        afterIcon: 'selectBox',
        mouseStyle: false,
        mouseOver: false,
        error: false,
        errorTipMessage: this.emptyMessage
      }
    },
    props: {
      title: {
        type: String,
        default: '标题'
      },
      subtitle: {
        type: String,
        default: ''
      },
      id: {
        type: String,
        default: ''
      },
      value:{
        type: Array,
        default:function () {
          return []
        }
      },
      rule: {
        type: String,
        default: ''
      },
      emptyMessage:{
        type:String,
        default:"不能为空"
      },
      show: {
        type: Boolean,
        default: true
      }
    },
    methods: {
      // 初始化验证事件
      validatorEvent (category) {
        if (this.rule !== '') {
          var id = this.id
          id = id.replace('.', '_')
          if (category === 'bind') {
            if (this.p____page.p____rule.indexOf(id) === -1) {
              this.p____page.p____rule.push(id)
              this.p____page.p____rule[id] = this
            }
          } else if (category === 'unbind') {
            let index = this.p____page.p____rule.indexOf(id)
            if (index !== -1) {
              this.p____page.p____rule.splice(index, 1)
              this.p____page.p____rule[id] = null
            }
          }
        }
      },
      // 单击事件
      clickEvent () {
        this.error = false
        this.mouseStyle = false
        this.mouseOver = false
        this.$emit('click')
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
      //点击单个项
      showEvent(item){
        this.$nextTick(() => {
          this.$emit('show');
        });
      },
      //删除项
      deleteItemEvent(item){
        let index = this.value.indexOf(item)
        var js = "this.p____page." + this.id + ".splice(" + index + ", 1)"
        eval(js)
      },
      //验证
      verification(){
        var result = true;
        if(this.show && this.rule === "#") {
          result = this.value.length !== 0
        }
        this.error = !result
        return result;
      }
    },
    watch:{
      show(newVal,oldVal) {
        if (!newVal) {
          this.error = false
          var js = "this.p____page." + this.id + "= []"
          eval(js)
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
