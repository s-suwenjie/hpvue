<template>
    <div class="f_main">
      <yhm-form-textarea :text-width="true" title="留言内容"  :value="remark" id="remark" :max-height="300"></yhm-form-textarea>
      <!--<yhm-formoperate>-->
        <!--<template #btn >-->
          <yhm-commonbutton value="通过" @call="adoptEvent()" icon="i-btm-applicationSm" class="btnIcon commonbutton"></yhm-commonbutton>
        <!--</template>-->
      <!--</yhm-formoperate>-->
    </div>
</template>

<script>
  import { formmixin } from '@/assets/form.js'

  export default {
    name: 'passMessage',
    mixins: [formmixin],
    data(){
      return{
        id:'',
        remark:'',
        category:'',
        tableName:'',
        tableDetailName:'',
        kind:'',
      }
    },
    created () {
      this.setQuery2Value('id')
      this.setQuery2Value('category')
      this.setQuery2Value('tableName')
      this.setQuery2Value('tableDetailName')
      this.setQuery2Value('kind')
      console.log(this.id+'----'+this.category+'----'+this.tableName+'----'+this.tableDetailName+'----'+this.kind)
    },
    methods:{
      adoptEvent () {
        if(this.id){
          this.$dialog.confirm({
            width: 300,
            tipValue: '是否通过?',
            alertImg: 'warn',
            okCallBack: (data)=>{
              if (this.category) {
                let params = {
                  id: this.category,
                  kind: this.kind,
                  tableName: this.tableName,
                  tableDetailName: this.tableDetailName,
                  location: '0',
                  remark:this.remark
                }
                this.ajaxJson({
                  url: '/PersonOffice/approvalYesVue',
                  data: params,
                  call: (data)=>{
                    if(data.type === 0){
                      this.$dialog.setReturnValue(this.id)
                      this.$dialog.alert({
                        tipValue: data.message,
                        closeCallBack: () => {
                          this.$dialog.close()
                        }
                      })
                    }else if(data.type === 1){
                      this.$dialog.alert({
                        tipValue: data.message,
                        alertImg: 'error',
                        closeCallBack: () => {
                        }
                      })
                    } else if(data.type === 2){
                      this.$dialog.alert({
                        tipValue: data.message,
                        alertImg: 'error',
                        closeCallBack: () => {
                        }
                      })
                    }
                  }
                })
              }else{
                let params = {
                  id: this.id,
                  kind: this.kind,
                  tableName: this.tableName,
                  tableDetailName: this.tableDetailName,
                  location: '0',
                  remark:this.remark
                }
                this.ajaxJson({
                  url: '/PersonOffice/approvalYesVue',
                  data: params,
                  call: (data)=>{
                    if(data.type === 0){
                      this.$dialog.setReturnValue(this.id)
                      this.$dialog.alert({
                        tipValue: data.message,
                        closeCallBack: () => {
                          this.$dialog.close()
                        }
                      })
                    }else if(data.type === 1){
                      this.$dialog.alert({
                        tipValue: data.message,
                        alertImg: 'error',
                        closeCallBack: () => {
                        }
                      })
                    } else if(data.type === 2){
                      this.$dialog.alert({
                        tipValue: data.message,
                        alertImg: 'error',
                        closeCallBack: () => {
                        }
                      })
                    }
                  }
                })
              }
            }
          })
        }
      }
    }
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
