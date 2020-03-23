<template>
    <div class="app_view_c_main">
      <div v-if="getTitleShow" class="title">{{title}}：</div>
      <div v-if="getContentTitleShow" class="contentTitle">{{contentTitle}}</div>
      <div class="content" :style="{color:colorValue}" v-html="getContentShow"></div>
    </div>
</template>

<script>
  import {tenThousandFormatHtml} from '@/assets/common.js'
  export default {
    name: 'yhm-app-view-control',
    data(){
      return {
        colorValue:this.color
      }
    },
    props:{
      type:{
        type:String,
        default:'text'
      },
      title:{
        type:String,
        default:''
      },
      contentTitle:{
        type:String,
        default:''
      },
      content:{
        type:[String,Array],
        required: true,
        default:function () {
          return []
        }
      },
      psd:{
        type:Array,
        default:function () {
          return []
        }
      },
      afterContent:{
        type:String,
        default:''
      },
      color:{
        type:String,
        default:'#333'
      }
    },
    methods : {
      getWeekend(val){
        let week = new Date(val).getDay();
        return week === 0 || week === 6
      },
      getWeek(val){
        let weekday=["周日","周一","周二","周三","周四","周五","周六"];
        return weekday[new Date(val).getDay()]
      }
    },
    computed : {
      getTitleShow(){
        return this.title !== ''
      },
      getContentTitleShow(){
        return this.contentTitle !== ''
      },
      getContentShow(){
        let result = this.content
        if(result === ''){
          result = '------'
        }
        else {
          if (this.type === 'text') {
            if (this.psd.length === 0) {
              result = this.content
            } else {
              if (typeof this.content === 'string') {
                for (let i = 0; i < this.psd.length; i++) {
                  if (this.psd[i].num === this.content) {
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
              if (typeof this.content === 'object') {
                for (let j = 0; j < this.psd.length; j++) {
                  for (let k = 0; k < this.content.length; k++) {
                    if (this.psd[j].num === this.content[k]) {
                      result += this.psd[j].showName + '、'
                    }
                  }
                }
                if (result.length > 0) {
                  result = result.substring(0, result.length - 1)
                }
              }
            }
          } else if (this.type === 'date') {
            if (new Date(this.content).getTime() === new Date('1900-01-01').getTime()) {
              result = '------'
            }
            else if (this.getWeekend(this.content)) {
              result = this.content + '<span class="ml5 weekend">' + this.getWeek(this.content) + '</span>'
            } else {
              result = this.content + '<span class="ml5">' + this.getWeek(this.content) + '</span>'
            }
          } else if (this.type === 'money') {
            result = '￥' + tenThousandFormatHtml(this.content)
          }
          if (this.afterContent !== '') {
            result = result + '&nbsp;' + this.afterContent
          }
        }

        return result
      },
    }
  }
</script>

<style scoped>

</style>
