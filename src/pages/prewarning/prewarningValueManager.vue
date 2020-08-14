<template>
    <div>
      <yhm-manager-empty-page>
        <!--导航条-->
        <template #navigation>财务管理&nbsp;&gt;&nbsp;设置预警&nbsp;&gt;&nbsp;预警管理</template>
        <template #customize>
          <div class="fd_center mt50">
<!--            <div @click="aaa">跳转</div>-->
            <div style="width: 500px">
              <yhm-form-text title="设置支票" subtitle="预警值" type="text" widtn="100px" :value="value1" id="value1"></yhm-form-text>
<!--              <yhm-form-text title="" type="text" :value="value2" id="value2"></yhm-form-text>-->
<!--              <yhm-form-text title="" type="text" :value="value3" id="value3"></yhm-form-text>-->
<!--              <yhm-form-text title="" type="text" :value="value4" id="value4"></yhm-form-text>-->
<!--              <yhm-form-text title="" type="text" :value="value5" id="value5"></yhm-form-text>-->
<!--              <yhm-form-text title="" type="text" :value="value6" id="value6"></yhm-form-text>-->
<!--              <yhm-form-text title="" type="text" :value="value7" id="value7"></yhm-form-text>-->
<!--              <yhm-form-text title="" type="text" :value="value8" id="value8"></yhm-form-text>-->
<!--              <yhm-form-text title="" type="text" :value="value9" id="value9"></yhm-form-text>-->
<!--              <yhm-form-text title="" type="text" :value="value10" id="value10"></yhm-form-text>-->
            </div>
          </div>
          <div class="fd_center" style="margin-bottom: 50px;">
            <yhm-commonbutton value="保存" icon="btnSave" :flicker="true" @call="save()"></yhm-commonbutton>
          </div>
        </template>
      </yhm-manager-empty-page>
    </div>
</template>

<script>
  import { managermixin } from '@/assets/manager.js'
  export default {
    name: 'prewarningValueManager',
    mixins: [managermixin],
    data(){
      return{
        value1:'',
        // value2:'',
        // value3:'',
        // value4:'',
        // value5:'',
        // value6:'',
        // value7:'',
        // value8:'',
        // value9:'',
        // value10:''
      }
    },
    methods:{
      save(){
        let params = {
          value1:this.value1,
          // value2:this.value2,
          // value3:this.value3,
          // value4:this.value4,
          // value5:this.value5,
          // value6:this.value6,
          // value7:this.value7,
          // value8:this.value8,
          // value9:this.value9,
          // value10:this.value10,
        }
        this.ajaxJson({
          url:"/Com/commonWarningSave",
          data:params,
          call:(data) =>{
            if(data.type === 0){
              this.$dialog.alert({
                tipValue:data.message
              })
            }
            else{
              this.$dialog.alert({
                tipValue:data.message,
                alertImg:'warn'
              })
            }
          }
        })
      }
    },
    created () {
      this.ajaxJson({
        url:"/Com/commonWarningByID",
        data:{},
        call:(data) =>{
          this.value1 = data.value1
          // this.value2 = data.value2
          // this.value3 = data.value3
          // this.value4 = data.value4
          // this.value5 = data.value5
          // this.value6 = data.value6
          // this.value7 = data.value7
          // this.value8 = data.value8
          // this.value9 = data.value9
          // this.value10 = data.value10


        }
      })
    }

  }
</script>

<style scoped>
.c_main{
  width: 100px;
}
</style>
