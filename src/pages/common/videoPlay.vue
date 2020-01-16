<template>
  <div>
    <video :src="videoUrl" autoplay controls></video>
  </div>
</template>

<script>
  import { formmixin } from '@/assets/form.js'
  export default {
    name: 'videoPlay',
    mixins: [formmixin],
    data() {
      return{
        videoUrl: ''
      }
    },
    created () {
      this.setQuery2Value('videoUrl')
    }
  }
</script>

<style scoped>
  video{
    width: 100%;
    height: 100%;
  }
</style>
