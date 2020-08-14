<template>
  <div class="f_main">
    <yhm-formbody>
      <template #title>基本信息</template>
      <template #control>

<!--        <yhm-form-drop-down-select title="欠款方" width="1" @select="selectUnit" :select-list="unitOrPersonList.list" :selectValue="unitOrPerson" selectid="unitOrPerson" :value="ownerName" id="ownerName" rule="R0000"></yhm-form-drop-down-select>-->
        <yhm-form-radio title="欠款方" :select-list="categoryList" :value="category" id="category"></yhm-form-radio>
        <yhm-form-select title="强制核销对象" @click="salesmanSelect" :value="ownerName" id="ownerName" rule="R0000" ref="exist"></yhm-form-select>
      </template>
    </yhm-formbody>
    <div class="f_split"></div>
    <yhm-formoperate :createName="createName" :insertDate="insertDate" :updateName="updateName" :updateDate="updateDate">
      <template #btn>
        <yhm-commonbutton value="保存" icon="btnSave" :flicker="true" @call="save()"></yhm-commonbutton>
      </template>
    </yhm-formoperate>
  </div>
</template>

<script>
  import { formmixin } from '@/assets/form.js'
  import { accMul, accAdd, guid, formatDate, formatTime } from '@/assets/common.js'
  export default {
    name: 'receivableForceWriteOffFrom',
    mixins: [formmixin],
    data(){
      return{
        categoryList:[],
        category:'0',
        ownerName:'',
        ownerID:'',
        savas:'true'
      }
    },
    created () {
      this.init({
        url: '/finance/receivableForceWriteOff/initForm',
        all: (data) => {
          this.categoryList = data.categoryList.list
          this.category=data.categoryList.value
        },
        look: (data) => {
          this.ownerID=data.ownerID
          this.ownerName=data.ownerName
        }
      })
    },
    methods:{
      save(){
        let a = this.validator()
        if(a){
          if(this.savas){
            let params = {
              id:this.id,
              ownerID:this.ownerID,
              ownerName:this.ownerName,
              category:this.category,
            }
            this.ajaxJson({
              url: '/finance/receivableForceWriteOff/save',
              data: params,
              call: (data) => {
                if (data.type === 0) {
                  this.$dialog.setReturnValue(this.id)
                  this.$dialog.alert({
                    tipValue: data.message,
                    closeCallBack: () => {
                      this.$dialog.close()
                    }
                  })
                }else{
                  this.$dialog.alert({
                    alertImg:'warn',
                    tipValue: data.message
                  })
                }
              }
            })
          }else{
            this.$refs.exist.errorEvent("名称已存在")
          }
        }
      },
      salesmanSelect(){
        if(this.category == '0'){
          this.$dialog.OpenWindow({
            width: '950',
            height: '700',
            url: '/selectUnit?category=1&categoryBefore=1',
            title: '选择单位信息',
            closeCallBack: (data) => {
              if (data) {
                this.ownerName=data.name
                this.ownerID=data.id
                this.exist()
              }
            }
          })
        }else{
          this.$dialog.OpenWindow({
            width: '950',
            height: '700',
            url: '/selectPerson?category=0',
            title: '选择联系人信息',
            closeCallBack: (data) => {
              if (data) {
                this.ownerName=data.name
                this.ownerID=data.id
                this.exist()
              }
            }
          })
        }

      },
      exist(){
        let params={
          id:this.id,
          ownerID:this.ownerID
        }
        this.ajaxJson({
          url: '/finance/receivableForceWriteOff/isExist',
          data: params,
          call: (data) => {
            if(data.type != 0){
              this.$refs.exist.errorEvent("名称已存在")
              this.savas=false
            }else{
              this.savas=true
            }
          }
        })
      }
    }
  }
</script>

<style scoped>

</style>
