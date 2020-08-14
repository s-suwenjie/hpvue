<template>
  <div class="f_main">
    <yhm-formbody>
      <template #title>添加信息</template>
      <template #control>
        <yhm-formdropdownselect title="车主"  width="1" @select="selectHost" :select-listhostList" :selectValue="host" selectid="host" :value="hostName" id="hostName" rule="R0000"></yhm-formdropdownselect>
        <yhm-form-text placeholder="" title="被保险人" subtitle="" :value="insured" id="insured" rule="R0000"></yhm-form-text>
        <yhm-form-text placeholder=""  title="被保险人" subtitle="证件号"  :value="number" id="number" rule="R0000"></yhm-form-text>
        <yhm-form-text placeholder="" title="联系人" subtitle="" :value="contactPerson" id="contactPerson" rule="R0000"></yhm-form-text>
        <yhm-form-text placeholder=""  title="联系方式" subtitle=""  :value="contact" id="contact" rule="R0000"></yhm-form-text>
        <yhm-form-text placeholder="" title="客户来源" subtitle="" :value="source" id="source" ></yhm-form-text>
        <yhm-form-text placeholder=""  title="客户性质" subtitle=""  :value="nature" id="nature" ></yhm-form-text>
        <yhm-form-text placeholder="" title="现住址" subtitle="" :value="address" id="address" ></yhm-form-text>
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
    name: 'clientForm',
    mixins: [formmixin],
    data(){
      return{
        id:'',
        hostList:[],
        insured:'', //被保险人
        number:'',//被保险人证件号
        contactPerson:'',//联系人
        contact:'',//联系方式
        source:'',//客户来源
        nature:'',//客户性质
        address:'',//现住址
        hostName: '',//车主
        host:'',
      }
    },
    methods:{
      selectHost () {
        if(this.host=== '0'){
          this.$dialog.OpenWindow({
            width: 950,
            height: 604,
            url: '/selectPerson?category=1',
            title: '选择车辆所有人',
            closeCallBack: (data) => {
              this.hostName = data.name
            },
          })
        }else{
          this.$dialog.OpenWindow({
            width: 950,
            height: 604,
            url: '/selectUnit?category=1',
            title: '选择车辆所有人',
            closeCallBack: (data) => {
              this.hostName = data.name
            },
          })
        }
      },
      save() {
        if (this.validator()) {
          let params = {
            id: this.id,
            host:this.host,
            hostName:this.hostName,
            insured: this.insured,
            number:this.number,
            contactPerson: this.contactPerson,
            contact: this.contact,
            source: this.source,
            nature: this.nature,
            address: this.address,
          }
          this.ajaxJson({
            url: '/Basic/saveClient',
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
              }else if(data.type === 1){
                this.$dialog.alert({
                  alertImg:'warn',
                  tipValue: data.message
                })
              }
            }
          })
        }
      }
    },
    created () {
      this.setQuery2Value('id')
      this.init({
        url: '/Basic/initClientForm',
        all: (data) => {
          this.hostList = data.hostPsd.list
          this.host = data.hostPsd.value
        },
        add: (data) => {
          /* 需要添加的数据 */
        },
        look: (data) => {

          /* 需要查看的数据 */
          this.insured=data.insured //被保险人
          this.number=data.number   //被保险人证件号
          this.contactPerson=data.contactPerson  //联系人
          this.contact=data.contact   //联系方式
          this.source=data.source     //客户来源
          this.nature=data.nature     //客户性质
          this.address=data.address //现住址
          this.hostName = data.host
          this.host = data.host
          this.hostName = data.hostName
        }
      })
    }

  }
</script>

<style scoped>

</style>
