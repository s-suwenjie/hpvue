<template>
    <div class="v_control" :class="[getWidthClass]">
      <div class="v_title">{{title}}：</div>
      <div v-if="getDefault" @click="clickEvent" class="v_content" :class="{rmb:getMoney,fs12b:getMoney}" :style="{color:colorValue}" v-html="getContentShow ? getContentShow:'-----'"></div>
      <div v-if="getFiles" class="v_content">
        <yhm-view-show-files v-for="(item,index) in content" :key="index" :content="content" :item="item"></yhm-view-show-files>
      </div>
      <div v-if="getTextMoney" class="v_content">
        <yhm-view-text-money v-for="(item,index) in content" :key="index" :item="item"></yhm-view-text-money>
      </div>
      <div v-if="getDateMoney" class="v_content">
        <yhm-view-date-money v-for="(item,index) in content" :key="index" :item="item"></yhm-view-date-money>
      </div>
    </div>
</template>

<script>
  import {tenThousandFormatHtml} from '@/assets/common.js'
  export default {
    name: 'yhm-view-control',
    data(){
      return{
        colorValue:this.color
      }
    },
    props:{
      type:{
        type:String,
        default:'text'
      },
      category:{
        type:String,
        default:'1'
      },
      title:{
        type:String,
        default:''
      },
      content:{
        type:[String,Array],
        required: true,
      },
      psd:{
        type:Array,
        default:function () {
          return []
        }
      },
      color:{
        type:String,
        default:'#333'
      }
    },
    methods : {
      clickEvent(){
        this.$emit("click")
      },
      getWeekend(val){
        let week = new Date(val).getDay();
        return week === 0 || week === 6
      },
      getWeek(val){
        let weekday=["周日","周一","周二","周三","周四","周五","周六"];
        return weekday[new Date(val).getDay()]
      }
    },
    computed:{
      getMoney(){
        return this.type === 'money'
      },
      getDefault(){
        return this.type === 'text' || this.type === 'date' || this.type === 'money'
      },
      getFiles(){
        return this.type === 'files'
      },
      getTextMoney(){
        return this.type === 'text-money'
      },
      getDateMoney(){
        return this.type === 'date-money'
      },
      getContentShow(){
        if(this.type === 'text'){
          if(this.psd.length === 0){
            return this.content
          }
          else{
            let result = ''
            if(typeof this.content === 'string') {
              for (let i = 0; i < this.psd.length; i++) {
                if (this.psd[i].num === this.content) {
                  result = this.psd[i].showName
                  if(this.color === '#333'){
                    if(this.psd[i].img.indexOf('#') === 0){
                      this.colorValue = this.psd[i].img
                    }
                    if(this.psd[i].code.indexOf('#') === 0){
                      this.colorValue = this.psd[i].code
                    }
                  }
                  break
                }
              }
            }
            if(typeof this.content === 'object'){
              for(let j = 0; j < this.psd.length; j++){
                for(let k = 0; k < this.content.length; k++){
                  if(this.psd[j].num === this.content[k]){
                    result += this.psd[j].showName + '、'
                  }
                }
              }
              if(result.length > 0){
                result = result.substring(0, result.length-1)
              }
              return result
            }
            return result
          }
        } else if(this.type === 'date'){
          if(new Date(this.content).getTime() === new Date('1900-01-01').getTime()){
            return ''
          }

          if(this.getWeekend(this.content)) {
            return this.content + '<span class="ml5 weekend">' + this.getWeek(this.content)  + '</span>'
          }
          else{
            return this.content + '<span class="ml5">' + this.getWeek(this.content)  + '</span>'
          }
        }
        else if(this.type === 'money'){
          return tenThousandFormatHtml(this.content)
        }
        return this.content
      },
      getWidthClass(){
        if(this.category === '2'){
          return 'v_control_w2'
        }
        else if(this.category === '3'){
          return 'v_control_w3'
        }
        else{
          return ''
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
