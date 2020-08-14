<template>
    <div class="f_main mb0">
      <div class="f_area">
        <div class="h_image">
          <img ref="image" :src="getSrc">
        </div>
      </div>
      <yhm-formoperate :createName="createName" :insertDate="insertDate" :updateName="updateName" :updateDate="updateDate">
        <template #btn>
          <span class="icon i-rotateRight90 fs24b" @click="rotateEvent(180)"></span>
          <span class="icon i-rotateLeft90 fs24b" @click="rotateEvent(270)"></span>
          <yhm-commonbutton value="确定无误" icon="i-complete" class="mr0" :flicker="true" @call="save()"></yhm-commonbutton>
          <span class="icon i-rotateLeft180 fs24b" @click="rotateEvent(90)"></span>
          <span class="icon i-rotateRight180 fs24b" @click="rotateEvent(180)"></span>
        </template>
      </yhm-formoperate>
    </div>
</template>

<script>
  import { formmixin } from '@/assets/form.js'
  export default {
    name: 'handleImage',
    mixins: [formmixin],
    data(){
      return{
        tag:'',
        path:'',
        rotate:''
      }
    },
    methods:{
      rotateEvent(val){
        let params = {
          tag:this.tag,
          path:this.path,
          rotate:val
        }
        this.ajaxJson({
          url:'/Com/spinImage',
          data:params,
          loading:"1",
          call: (data) => {
            if(data.type === 0){
              this.rotate = new Date().getTime()
            }
            else{
              this.$dialog.alert({
                tipValue:data.message,
                alertImg:'warn'
              })
            }
          }
        })
      },
      save(){
        this.$dialog.close()
      }
    },
    computed : {
      getSrc(){
        return '/UploadFile/' + this.tag + '/' + this.path + '?id=' + this.rotate
      }
    },
    created () {
      this.setQuery2Value("tag")
      this.setQuery2Value("path")
    }
  }
</script>

<style scoped>

</style>
