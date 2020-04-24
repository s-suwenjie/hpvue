<template>
  <div class="f_main">
    <yhm-formbody>
      <template #control>
        <yhm-form-text title="保单号" tip="value" :value="pNumber" id="pNumber" ></yhm-form-text>
        <yhm-formupload :ownerID="id" :value="fileList"  id="fileList" title="保单号(支持单据)" tag="track" multiple="multiple"></yhm-formupload>
      </template>
    </yhm-formbody>
    <div class="f_split"></div>
    <yhm-formoperate :createName="createName" :insertDate="insertDate" :updateName="updateName" :updateDate="updateDate">
      <template #btn >
        <yhm-commonbutton value="保存" icon="btnSave" :flicker="true" @call="save()"></yhm-commonbutton>
      </template>
    </yhm-formoperate>
  </div>
</template>

<script>
  import { formmixin } from '@/assets/form.js'
  import { accMul, accAdd, guid, formatDate, number2chinese,formatTime} from '@/assets/common.js'
  export default {
    name: 'poNumbering',
    mixins: [formmixin],
    data(){
      return{
        id:'',
        ownerID:'',
        pNumber:'',
        fileList: [],
      }
    },
    methods:{
      save () {
          let params = {
            id: this.id,
            ownerID: this.ownerID,
            pNumber:this.pNumber,
            files:this.fileList
          }
          this.ajaxJson({
            url: '/Insurance/policySaveNumbering',
            data: params,
            loading: '0',
            call: (data) => {
              if (data.type == '0') {
                this.$dialog.setReturnValue(this.id) //向父级页面id值
                this.$dialog.alert({
                  tipValue: data.message,
                  closeCallBack: (data) => {
                    this.$dialog.close()
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
            }
          })

      }

    },
    created () {
      this.setQuery2Value('ownerID')

      this.init({
        url: '/Insurance/initformPoNumbering',
        all: (data) => {

        },
        add: (data) => {
          /* 需要添加的数据 */
        },
        look: (data) => {
          /* 需要查看的数据 */

          this.ownerID=data.ownerID
          this.pNumber=data.pNumber
          this.fileList = data.files
        }
      })
    },
  }
</script>

<style scoped>

</style>
