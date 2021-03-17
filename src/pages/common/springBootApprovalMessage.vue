<template>
  <div class="f_main">
    <yhm-form-textarea :text-width="true" title="留言内容"  :value="remark" id="remark" :max-height="300"></yhm-form-textarea>
    <!--<yhm-formoperate>-->
    <!--<template #btn >-->
    <yhm-commonbutton value="确定" @call="adoptEvent()" icon="i-btm-applicationSm" class="btnIcon commonbutton"></yhm-commonbutton>
    <!--</template>-->
    <!--</yhm-formoperate>-->
  </div>
</template>

<script>

  import { managermixin } from '@/assets/manager.js'
  export default {
    name: "springBootApprovalMessage",
    mixins: [managermixin],
    data(){
      return {
        id:'',
        remark:'',
        category:'',
        page:'',//1代表快递审批  category 为4
      }
    },
    methods:{
      adoptEvent() {
        if (this.page==1){
          this.category=4
        }
        let params = {
          id: this.id,
          category:this.category,
          remark:this.remark
        }
        this.ajaxJson({
          url: '/sys/approve/yes',
          data: params,
          call: (data)=>{
            if (data.type === 0) {
              this.$dialog.setReturnValue(1111)
              this.$dialog.alert({
                tipValue: data.message,
                closeCallBack: (data) => {
                  this.$dialog.close()
                  this.initPageData(false)
                }
              })
            } else {
              this.$dialog.alert({
                alertImg: 'error',
                tipValue: data.message,
                closeCallBack: () => {
                }
              })
            }
          },
        })
      },
    },
    created(){
      this.setQuery2Value('id')
      this.setQuery2Value('page')
      this.setQuery2Value('category')
    },
  }
</script>

<style lang="less" scoped>
  .commonbutton{
    position: fixed;
    bottom: 16px;
    left: 50%;
    transform: translate(-50%, -50%);
  }
</style>
