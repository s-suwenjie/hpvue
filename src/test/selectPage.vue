<template>
  <div class="f_main f_main_customize mb16">
    {{data}}
  </div>
</template>

<script>
  import { accMul, accAdd, guid, formatDate, number2chinese,formatTime} from '@/assets/common.js'
  import { selectmixin } from '@/assets/select.js'
  export default {
    name: 'rejectReason',
    mixins: [selectmixin],
    data(){
      return {
        tableName: '',
        tableDetailName: '',
        kind: '',
        category: '3',
        data: ''
      }
    },
    methods:{

    },
    created () {
      this.data = new Date().getTime()
    }
  }
</script>
<style scoped>

</style>
