<template>
  <td v-if="show" ref="td_control" class="fd_in_txt" :style="getWidth">
    <div :style="getWidth" class="c_main c_main_m" v-validator="validatorEvent">
      <div v-if="getShowTip" class="c_tip c_tip_m">
        <div>
          {{getShowValue}}
          <img src="../../../../../static/css/images/arrow.png">
        </div>
      </div>
      <div @mouseout="mouseoutEvent" @mouseover="mouseoverEvent" @click.stop="clickEvent" v-click-control-outside="loseFocusEvent" class="c_box" :class="{c_error:error,c_hover:mouseStyle,c_focus:focusStyle,c_disable:noEdit === '1'}">
        <div class="c_content_div c_content_div_m c_left ti10" :style="getTxtWidth">
          <p v-for="(item,index) in showNameList" :key="index" style="display: flex;justify-content: space-around;align-items: center">
            <span>{{item}}</span>
            <span class="delete2" v-show="deleteShow" style="text-indent: 4px;" @click="deleteCheckbox(index,item)"></span>
          </p>
        </div>
        <span class="c_icon c_icon_m i-input-down-arrow" :class="{rotate180:focusStyle}"></span>
        <div v-show="focusStyle" class="c_select_items c_select_items_m">
          <span><img class="rotate180" src="../../../../../static/css/images/arrowwhite.png"></span>
          <div v-if="requiredTitle!=''&&atLeasLocation=='top'">
            <p :style="{color:atLeastColor}" style="display: flex;justify-content: center;width: 100%">
              <span >{{requiredTitle}}</span>
            </p>
          </div>
          <div v-for="(item,index) in selectList" :key="index" @click.stop="selectItemEvent(item.num,item)" :class="{c_select_items_selected:txt === item.num}">
            <p style="display: flex;justify-content: space-between;width: 100%">
              <span :style="{color:showNameList.indexOf(item.showName)!=-1?'#1989fa':'#333'}">{{item.showName}}</span>
              <span style="display: flex;align-items: center;" v-if="showNameList.indexOf(item.showName)!=-1">
                <svg t="1598865802027" style="margin-right: 5px;" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1799" width="16" height="16"><path d="M129.26379393 496.75646972L171.69848631 436.77111815l199.64904787 153.09448244L857.41015625 193.9458008l40.95153809 39.22119139L374.72583008 747.65673827 129.26379393 496.75646972z m0 1e-8" fill="#1989fa" p-id="1800"></path></svg>
              </span>
            </p>
          </div>
          <div v-if="requiredTitle!=''&&atLeasLocation=='bottom'">
            <p :style="{color:atLeastColor}" style="display: flex;justify-content: center;width: 100%">
              <span >{{requiredTitle}}</span>
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
    name: "yhm-form-td-checkbox",
    inject: ["p____page"],
    data(){
      return{
        selectValue:[],
        showNameList:[],
        requiredTitle:'',//必选项的显示提示
        atLeastColor:'#333',
        deleteShow:true,
        focusStyle:false,
        mouseStyle:false,
        mouseOver:false,
        error:false,
        txt:this.value[this.id],
        txtKey:this.listid + '[' + this.list.indexOf(this.value) + '].' + this.id
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
      requiredList:{
        type:Array,
        default:function () {
          return []
        }
      },
      width:{
        type: String,
        required: true
      },
      list: {
        type: Array,
        required: true
      },
      listid: {
        type: String,
        required: true
      },
      id: {
        type: String,
        required: true
      },
      value: {
        type: Object,
        required: true
      },
      rule: {
        type: String,
        default: ''
      },
      tip: {
        type: String,
        default: ""
      },
      noEdit: {
        type: String,
        default: ""
      },
      show: {
        type: Boolean,
        default: true
      },
      atLeasLocation: {
        type: String,
        default: "bottom"
      }
    },
    methods: {
      //初始化验证事件
      validatorEvent(category) {
        // if (this.rule !== "") {
        //   var id = this.txtKey;
        //   id = id.replace(".", "_")
        //   if (category === "bind") {
        //     if (this.p____page.p____rule.indexOf(id) === -1) {
        //       this.p____page.p____rule.push(id)
        //       this.p____page.p____rule[id] = this
        //     }
        //   } else if (category === "unbind") {
        //     let index = this.p____page.p____rule.indexOf(id)
        //     if (index !== -1) {
        //       this.p____page.p____rule.splice(index, 1)
        //       this.p____page.p____rule[id] = null
        //     }
        //   }
        // }
      },
      deleteCheckbox(index,item){//删除事件
        console.log(index,item,this.selectList)
        for(let j in this.selectList){
          if(this.selectList[j].showName==item){
            if(this.requiredList.indexOf(j)!=-1){
              this.requiredTitle = item + '为必选项'
              this.atLeastColor = '#f00'
              return
            }else{
              this.atLeastColor = '#333'
              this.requiredTitle = ''
            }
          }
        }

        if(this.showNameList.indexOf(item)!=-1){
          if(this.showNameList.length=='1'&&index=='0'){
            this.showNameList = []
            this.selectValue = []
            this.validatorEvent('unbind')
          }else {
            this.showNameList.splice(this.showNameList.indexOf(item),1)
            for(let i in this.selectList){
              if(this.selectList[i].showName == item){
                this.selectValue.splice(this.selectValue.indexOf(this.selectList[i].num),1)
              }
            }
          }
          var js = "this.p____page." + this.listid + "[" + this.list.indexOf(this.value) + '].' + this.id + " = \"" + this.selectValue +"\""
          eval(js);
        }
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
      selectItemEvent(num,item){
        this.txt = item.showName
        // this.$nextTick(() =>{
        //   this.getShowValue()
          // this.focusStyle = false
          if(this.selectList && this.selectList.length > 0){
            for(var i = 0; i < this.selectList.length; i++){
              if(this.selectList[i].showName === this.txt){
                if(this.showNameList.indexOf(this.selectList[i].showName)==-1){
                  this.showNameList.push(item.showName)
                  this.selectValue.push(item.num)
                  this.$nextTick(()=>{
                    this.$emit('selectItemEvent',num,item)
                  })
                  this.atLeastColor = '#333'
                  this.requiredTitle = ''
                }else{
                  if(this.showNameList.length=='1'){
                    return
                  }
                  console.log('必选项',this.requiredList)
                  if(this.requiredList.indexOf(num)==-1){
                    this.selectValue.splice(this.selectValue.indexOf(num),1)
                    this.showNameList.splice(this.showNameList.indexOf(item.showName),1)
                    this.atLeastColor = '#333'
                    this.requiredTitle = ''
                  }else{
                    this.requiredTitle = item.showName + '为必选项'
                    this.atLeastColor = '#f00'
                  }

                  this.$nextTick(()=>{
                    console.log('deleteEvent',this.showNameList,this.selectValue)
                    this.$emit('deleteEvent',item,num,this.value)
                  })
                }
                var js = "this.p____page." + this.listid + "[" + this.list.indexOf(this.value) + '].' + this.id + " = \"" + this.selectValue +"\""
                eval(js);
                return this.showNameList
              }
            }

          }

        // })
      },
      verification() {
        var result = true;
        if(this.getShowValue === ''){
          result = false
        }
        this.error = !result
        return result
      }
    },
    computed:{
      getShowTip(){
        return this.tip != "" && this.txt != "" && (this.focusStyle || this.mouseOver)
      },
      getWidth(){
        if(this.width !== '') {
          return 'width:' + accAdd(this.width,-6) + 'px !important;'
        }
        else{
          return ''
        }
      },
      getTxtWidth(){
        let width = accAdd(this.width,-6)
        if(this.category === 'm'){
          width = accAdd(width,-22)
        }
        else{
          width = accAdd(width,-38)
        }
        return width
      },
      getShowValue(){
        if(this.selectList && this.selectList.length > 0){
          for(var i = 0; i < this.selectList.length; i++){
            if(this.selectList[i].num === this.txt){
              console.log(this.selectList[i].showName)
              if(this.showNameList.indexOf(this.selectList[i].showName)==-1){
                this.showNameList.push(this.selectList[i].showName)
              }else{
                this.showNameList.splice(this.selectList[i].showName,1)
              }
              console.log(this.showNameList)
              return this.showNameList
            }
          }
        }
        return ""
      }
    },
    created(){
      for(let i=0; i<this.value.teamid.length; i++){
        for(let j=0; j<this.selectList.length; j++){
          if(this.value.teamid[i]==this.selectList[j].num){
            this.showNameList.push(this.selectList[j].showName)
            this.selectValue.push(this.selectList[j].num)
          }
        }
      }
      if(this.noEdit=='1'){
        this.deleteShow = false
      }
    },
    watch:{
      value:{
        handler(newValue, oldValue) {
          this.txt = newValue[this.id]
        },
        deep: true
      }
    }
  }
</script>

<style scoped>

</style>
