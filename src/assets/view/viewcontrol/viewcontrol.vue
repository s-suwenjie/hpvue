<template>
    <div class="v_control" :class="[getWidthClass]">
      <div class="v_title" @click="clickEvent" :style="{color:titleColor}">{{title}}：</div>

      <div v-if="getDefault" @click="clickEvent" class="v_content" :class="{rmb:getMoney,fs12b:getMoney}" :style="{color:colorValue,fontSize: fontSize + 'px',margin:margin}" v-html="ShowValue(content) ? ShowValue(content):'-----'"></div>
      <span :class="fontIcon" @click="iconClick" v-if="fontIcon!==''" :style="{fontSize:iconFontSize+'px',color:iconColor,margin:iconMargin}" style="display: flex;align-items: center;"></span>

      <div v-if="getFiles" class="v_content">
        <yhm-view-show-files v-for="(item,index) in content" :key="index" :content="content" :item="item"></yhm-view-show-files>

      </div>

      <div v-if="getsmFiles" class="v_content">
        <div class="v_f_show" @click="imgClickEvent"><span class="mr3b" :class="getType"></span> <span v-html="getSmShow"></span> </div>
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
      },
      titleColor:{
        type:String,
        default:''
      },
      tag: {
        type: String,
        default: ''
      },
      iconFontSize:{
        type: String,
        default: '16'
      },
      iconColor:{
        type: String,
        default: ''
      },
      fontSize: {
        type: String,
        default: '14'
      },
      fontIcon: {
        type: String,
        default: ''
      },
      iconMargin:{
        type: String,
        default: ''
      },
      margin:{
        type: String,
        default: ''
      }
    },
    created(){
      this.$nextTick(()=>{
        this.colorValue = this.color
      })
    },
    methods : {
      iconClick(){
        this.$emit("iconClick")
      },
      imgClickEvent(){
        let index = this.getImages.indexOf('/UploadFile/' + this.tag + '/' + this.content)

        this.$dialog.preview(this.getImages,index + 1)
      },
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

      getImages(){
        let imgArr = []
        imgArr.push("/UploadFile/" + this.tag + '/' + this.content)
        return imgArr
      },
      getType(){
        return 'i-btn-image'
      },

      getSmShow(){
        let fir = this.content.indexOf('_') + 1;
        let last = this.content.indexOf('.');
        return this.content.substring(fir, last)
      },
      getMoney(){
        return this.type === 'money'
      },
      getDefault(){
        return this.type === 'text' || this.type === 'date' || this.type === 'money'
      },
      getFiles(){
        return this.type === 'files'
      },
      getsmFiles(){
        return this.type === 'smfiles'
      },
      getTextMoney(){
        return this.type === 'text-money'
      },
      getDateMoney(){
        return this.type === 'date-money'
      },
      ShowValue(){
        return function (content) {


          if (this.type === 'text') {
            if (this.psd.length === 0) {
              return content
            } else {
              let result = ''
              if (typeof content === 'string') {
                for (let i = 0; i < this.psd.length; i++) {
                  if (this.psd[i].num === content) {
                    result = this.psd[i].showName
                    if (this.color === '#333') {
                      if (this.psd[i].img.indexOf('#') === 0) {
                        this.colorValue = this.psd[i].img
                      }
                      if (this.psd[i].code.indexOf('#') === 0) {
                        this.colorValue = this.psd[i].code
                      }
                    }
                    break
                  }
                }
              }
              if (typeof content === 'object') {
                for (let j = 0; j < this.psd.length; j++) {
                  for (let k = 0; k < content.length; k++) {
                    if (this.psd[j].num === content[k]) {
                      result += this.psd[j].showName + '、'
                    }
                  }
                }
                if (result.length > 0) {
                  result = result.substring(0, result.length - 1)
                }
                return result
              }
              return result
            }
          } else if (this.type === 'date') {
            if (new Date(content).getTime() === new Date('1900-01-01').getTime()) {
              return ''
            }

            if (this.getWeekend(content)) {
              return content + '<span class="ml5 weekend">' + this.getWeek(content) + '</span>'
            } else {
              return content + '<span class="ml5">' + this.getWeek(content) + '</span>'
            }
          } else if (this.type === 'money') {
            return tenThousandFormatHtml(content)
          }
          return content
        }
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
