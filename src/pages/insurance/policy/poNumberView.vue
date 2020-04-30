<template>
  <div class="f_main">
    <yhm-view-body>
      <template #title>基本信息</template>
      <template #body>
        <yhm-view-control title="保单号" :content="pNumber" ></yhm-view-control>
        <yhm-view-control category="3" title="保单凭证" type="files" :content="fileList"></yhm-view-control>

      </template>
    </yhm-view-body>
<!--    <yhm-formoperate :createName="createName" :insertDate="insertDate" :updateName="updateName" :updateDate="updateDate">-->
<!--      <template #btn>-->
<!--        <yhm-commonbutton value="编辑" :show="isState" icon="i-edit" :flicker="false" @call="editBtn()"></yhm-commonbutton>-->
<!--      </template>-->
<!--    </yhm-formoperate>-->
  </div>
</template>

<script>
  import { formmixin } from '@/assets/form.js'
  export default {
    name: 'poNumberView',
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
