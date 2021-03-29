<template>
    <div class="f_main">
      <yhm-formbody>
        <template #title >
           <span>基本信息</span>
        </template>
        <template #control>
        </template>
      </yhm-formbody>
    </div>
</template>

<script>
  import { formmixin } from '@/assets/form.js'
  import {guid} from '@/assets/common.js'
  export default {
    name: 'pushRepairAddForm',
    mixins: [formmixin],
    data(){
      return{

      }
    }
  }
</script>

<style scoped>

</style>
