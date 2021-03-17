<template>
  <td v-if="show" ref="td_control" class="fd_in_txt" :style="{width:width}">
    <div class="c_main c_main_m" style="width: auto;">
      <div :style="{width:width}" @mouseout="mouseoutEvent" @mouseover="mouseoverEvent" @click.stop="clickEvent" v-click-control-outside="loseFocusEvent" class="c_box" :class="{c_error:error,c_hover:mouseStyle,c_focus:focusStyle,c_disable:noEdit === '1'}">
        <div class="c_content_div c_content_div_m c_left ti10">
          {{value}}
        </div>
        <span class="c_icon c_icon_m i-input-down-arrow" :class="{rotate180:focusStyle}"></span>
        <div v-show="focusStyle" style="overflow: auto;display: unset;" :style="{width:width,height:height,fontSize:fontSize}" class="c_select_items c_select_items_m c_select_options">
          <span><img class="rotate180" src="../../../../../static/css/images/arrowwhite.png"></span>
          <div v-for="(item,index) in optionsList" :key="index" @click.stop="selectItemEvent(index,item)" class="options">
            <p style="display: flex;justify-content: space-between;width: 100%">
              <span :style="{color:selectList[index]?'#1989fa':'#333'}">{{item}}</span>
              <span style="display: flex;align-items: center;" v-if="selectList[index]">
                <svg t="1598865802027" :style="{marginRight:height=='auto'?'5px':'20px'}" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1799" width="16" height="16"><path d="M129.26379393 496.75646972L171.69848631 436.77111815l199.64904787 153.09448244L857.41015625 193.9458008l40.95153809 39.22119139L374.72583008 747.65673827 129.26379393 496.75646972z m0 1e-8" fill="#1989fa" p-id="1800"></path></svg>
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  </td>
</template>

<script>
  import {accAdd} from '@/assets/common.js'
  export default {
    name: "yhm-td-checkbox-show",
    inject: ["p____page"],
    data(){
      return{
        selectValue:[],
        showNameList:[],
        deleteShow:true,
        focusStyle:false,
        mouseStyle:false,
        mouseOver:false,
        error:false,
      }
    },
    props: {
      /*下拉框中绑定的值*/
      selectList:{
        type:Array,
        default:function () {
          return []
        }
      },
      optionsList:{
        type:Array,
        default:function () {
          return []
        }
      },
      width:{
        type: String,
        required: true
      },
      height:{
        type: String,
        default:'500px'
      },
      fontSize:{
        type: String,
        default:'12px'
      },
      value: {
        type: String,
        required: true
      },
      noEdit: {
        type: String,
        default: ""
      },
      show: {
        type: Boolean,
        default: true
      }
    },
    methods: {
      deleteCheckbox(index,item){//删除事件
        //
        // if(this.showNameList.indexOf(item)!=-1){
        //   console.log(index,this.showNameList.length)
        //   if(this.showNameList.length=='1'&&index=='0'){
        //     this.showNameList = []
        //     this.selectValue = []
        //     this.validatorEvent('unbind')
        //   }else {
        //     this.showNameList.splice(this.showNameList.indexOf(item),1)
        //     for(let i in this.selectList){
        //       if(this.selectList[i].showName == item){
        //         this.selectValue.splice(this.selectValue.indexOf(this.selectList[i].num),1)
        //       }
        //     }
        //   }
        //   var js = "this.p____page." + this.listid + "[" + this.list.indexOf(this.value) + '].' + this.id + " = \"" + this.selectValue +"\""
        //   eval(js);
        // }

      },
      //鼠标放上事件
      mouseoverEvent(){
        if (!this.error){
          this.mouseStyle = true
        }
        this.mouseOver = true
      },
      //鼠标移出事件
      mouseoutEvent(){
        if (!this.error) {
          this.mouseStyle = false
        }
        this.mouseOver = false
      },
      //点击事件
      clickEvent(){
        if(this.noEdit !== '1') {
          this.focusStyle = true
          this.error = false
        }
      },
      //失去焦点事件
      loseFocusEvent(){
        this.focusStyle = false
      },
      selectItemEvent(index,item){
        if(this.selectList[index]){
          this.selectList.splice(index, 1, false)
        }else{
          this.selectList.splice(index, 1, true)
        }

        var js = "this.p____page." + this.selectList
        eval(js);
        // this.$emit('change',this.selectList,index,item)
      },
    },
    created(){
      if(this.noEdit=='1'){
        this.deleteShow = false
      }
    },
  }
</script>

<style scoped>

</style>
