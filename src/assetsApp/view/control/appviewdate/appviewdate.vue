<template>
  <span v-html="getContentShow"></span>
</template>

<script>
  export default {
    name: 'yhm-app-view-date',
    props: {
      content: {
        type: String,
        required: true
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
      getContentShow(){
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
    }
  }
</script>

<style scoped>

</style>
