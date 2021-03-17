<template>
  <div class="f_main">
    <yhm-view-body>
      <template #title>基本信息</template>
      <template #body>

        <yhm-view-control category="3" title="凭证" type="files" :content="fileList"></yhm-view-control>

      </template>
    </yhm-view-body>

  </div>
</template>

<script>
  import { formmixin } from '@/assets/form.js'

  export default {
    name: 'receiveInsuranceFiles',
    mixins: [formmixin],
    data(){
      return{
        id:'',
        ownerID:'',
        fileList: [],

      }
    },
    methods:{
      initData() {
        let params = {
          id: this.id,
          ownerID: this.ownerID
        }
        this.ajaxJson({
          url: '/Insurance/getReceiveInsuranceFiles',
          data: params,
          call: (data) => {
            this.fileList = data.files
          },
        })
      }
    },
    created () {
      this.setQuery2Value('id')
      this.setQuery2Value('ownerID')
      this.initData()


    },
  }
</script>

<style scoped>

</style>
