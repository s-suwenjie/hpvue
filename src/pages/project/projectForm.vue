<template>
  <div class="f_main">
    <yhm-formbody>
      <template #title>基本信息</template>
      <template #control>
        <yhm-form-text ref="name" :no-edit="keyChange" title="key" :value="name" id="name" rule="R0000"></yhm-form-text>
        <yhm-form-textarea title="value" :value="value" id="value" rule="R0000"></yhm-form-textarea>
      </template>
    </yhm-formbody>

    <yhm-formoperate :createName="createName" :insertDate="insertDate" :updateName="updateName" :updateDate="updateDate">
      <template #btn>
        <yhm-commonbutton value="保存" icon="btnSave" :flicker="true" @call="save()"></yhm-commonbutton>
      </template>
    </yhm-formoperate>
  </div>
</template>

<script>
  import { formmixin } from '@/assets/form.js'
  export default {
    name: 'projectForm',
    mixins: [formmixin],
  }
</script>

<style scoped>

</style>
