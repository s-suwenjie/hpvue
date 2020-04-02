<template>
    <div id="app" @drop='drop($event)' @dragover='allowDrop($event)'>
        <router-view></router-view>
    </div>
</template>

<script>
export default {
  name: 'app',
  mounted() {

    let onOff = true
    setInterval(function () {
      if(onOff){
        $(".twinkleBg").addClass('twinkleBgColor');
        onOff = false
      }else{
        onOff = true;
        $(".twinkleBg").removeClass('twinkleBgColor');
      }
    },600)


    let onOffTime = true
    setInterval(function () {
      if(onOffTime){
        $(".slowTwinkleBg").addClass('slowTwinkleBgColor');
        onOffTime = false
      }else{
        onOffTime = true;
        $(".slowTwinkleBg").removeClass('slowTwinkleBgColor');
      }
    },900)


  },
  methods: {
    allowDrop(event){
      event.preventDefault()
    },
    drop(event){
      event.preventDefault()
    }
  }
}

</script>

<style lang="less">
    body {
        margin: 0;
        padding: 0;
    }
</style>
