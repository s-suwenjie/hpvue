<template>
  <div class="f_main">
    <yhm-formbody>
      <template #title>基本信息</template>
      <template #control>
        <yhm-form-text title="别名" :value="shortName" id="shortName" rule="R0000"></yhm-form-text>
        <yhm-form-select title="保险公司" @clear="clearUnit" @click="selectUnit" :value="unit"  id="unit" rule="R0000"></yhm-form-select>
      </template>
    </yhm-formbody>
  </div>
</template>

<script>
  import { formmixin } from '@/assets/form.js'
  export default {
    name: 'insuranceUnitForm',
    mixins: [formmixin],
    data(){
      return {
        shortName:'',         //别名
        unitID:'',            //保险公司ID
        unit:'',              //保险公司

      }
    },
    methods : {
      //选择保险公司
      selectUnit(){
        this.$dialog.OpenWindow({
          width: '950',
          height: '700',
          url: '/selectUnit?category=1&categoryBefore=1',
          title: '选择保险公司',
          closeCallBack: (data) => {
            if (data) {
              this.unitID = data.id
              this.unit = data.name
            }
          }
        })
      },
      //清空保险公司信息
      clearUnit(){
        this.unitID = ''
        this.unit = ''
      }
    }
  }
</script>

<style scoped>

</style>
