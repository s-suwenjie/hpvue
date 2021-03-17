<template>
  <div class="f_main">
    <!--头部信息-->
    <yhm-view-body>
      <template #title>基本信息</template>
      <template #body>
        <yhm-view-control title="主公司" :content="data.ownerName"></yhm-view-control>
        <yhm-view-control title="关联公司" :content="data.unit"></yhm-view-control>
        <yhm-view-control title="关联公司税号" :content="data.taxNumber"></yhm-view-control>
        <yhm-view-control title="关联公司地址" :content="data.addressCN"></yhm-view-control>
        <yhm-view-control title="关联公司手机号" :content="data.tel"></yhm-view-control>
        <yhm-view-control title="关联公司开户行" :content="data.bank"></yhm-view-control>
        <yhm-view-control title="关联公司账号" :content="data.account"></yhm-view-control>

      </template>
    </yhm-view-body>

  </div>

</template>

<script>
  import { viewmixin } from '@/assets/view.js'

  export default {
    name: 'unitInvoiceinitView',
    mixins: [viewmixin],
    data(){
      return{
        id:'',
        data:'',
      }
    },
    created () {
      this.setQuery2Value("id")
      this.init()
    },
    methods:{
      init(){

        let parmas={id:this.id,}
        this.ajaxJson({
          url:'/Basic/unitInvoiceinitForm',
          data:parmas,
          call: (data) => {

            // console.log( data )
            this.data=data

          }
        })
      }
    },

  }
</script>

<style scoped>

</style>
