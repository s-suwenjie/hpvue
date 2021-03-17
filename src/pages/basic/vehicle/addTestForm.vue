<template>
  <div class="f_main">
    <yhm-formbody>
      <template #title>添加信息</template>
      <template #control>

        <yhm-form-text placeholder=""  title="姓名" subtitle="" :value="name" id="name"></yhm-form-text>
        <yhm-form-text placeholder="" title="年龄" subtitle="" :value="age" id="age" ></yhm-form-text>

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
    name: 'addTestForm',
    mixins: [formmixin],
    data(){
      return{
        id:'E595606E-DEE1-455B-B88B-1E801E677BEF',
        name:'',
        age:'',
      }
    },
    methods:{
      save(){
        let params = {
          id:this.id,
          name:this.name,
          age:this.age,
        }
        this.ajaxJson({
          url: '/test/user/save',
          data: params,
          call: (data) => {
            if (data.type === 0) {
              this.$dialog.alert({
                tipValue: data.message,
                closeCallBack: () => {
                  this.$dialog.close()
                }
              })
            }else if(data.type === 1){
              this.$dialog.alert({
                alertImg:'warn',
                tipValue: data.message
              })
            }
          }
        })
      },
    },
    created () {
      this.setQuery2Value('id')


      this.init({
        url: '/test/user/getByID',
        all: (data) => {

        },
        add: (data) => {
          /* 需要添加的数据 */

        },
        look: (data) => {
          /* 需要查看的数据 */
          this.name=data.name
          this.age=data.age

        }
      })
    }
  }
</script>

<style scoped>

</style>
