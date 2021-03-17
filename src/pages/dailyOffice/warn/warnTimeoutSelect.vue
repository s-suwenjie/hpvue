<template>
  <div class="f_main">
    <yhm-formbody style="padding-left: 20px;">
      <template #title>
        <yhm-commonbutton value="确定"  icon="icon-saveSb" @call="addDetail()" category="three"></yhm-commonbutton>
      </template>

      <template #control>
        <yhm-form-date title="选择延迟日期" :min="minWorkDate" :value="workDate" id="workDate" @call="motorcycleTypeRadio" :no-edit="categoryNoEdit"></yhm-form-date>
      </template>

    </yhm-formbody>
  </div>
</template>

<script>
  import {guid, formatDate} from '@/assets/common.js'
  import { formmixin } from '@/assets/form.js'
  export default {
    name: 'warnTimeoutSelect',
    mixins: [formmixin],
    data(){
      return{
        categoryNoEdit:false,
        minWorkDate:'',
        workDate:'',

        year:'',
        month:'',
        day:''
      }
    },
    created(){
      this.workDate = formatDate(new Date())
      console.log(this.workDate)

      console.log(this.workDate)
      this.setQuery2Value('year')
      this.setQuery2Value('month')
      this.setQuery2Value('day')
      this.minWorkDate = this.year+'-'+this.month+'-'+(Number(this.day)+1)
    },
    methods:{
      motorcycleTypeRadio(){},
      addDetail(){
        console.log(this.workDate)
        if(this.workDate){
          this.$dialog.setReturnValue(this.workDate)
          this.$dialog.close()
        }else{
          this.$dialog.confirm({
            width: 300,
            tipValue: '选择的日期为空!',
            btnValueOk: '确定',
            alertImg: 'warn',
            okCallBack: (data) => {

            }
          })
        }
      },

    }
  }
</script>

<style scoped>

</style>
