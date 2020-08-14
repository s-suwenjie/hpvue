<template>
  <div class="f_main f_main_customize">
    <yhm-formbody>
      <template #title>基本信息</template>
      <template #control>
        <yhm-form-text title="别名" :value="name" id="name"></yhm-form-text>
        <yhm-form-radio title="品牌" subtitle=""  :select-list="brandList" :value="brand" id="brand"></yhm-form-radio>
        <yhm-form-check  title="保险公司"  submit-value="insuredUnit" :select-list="insuredUnitList" :value="insuredUnit"  id="insuredUnit" rule="#" ></yhm-form-check>
        <yhm-form-text title="优惠额度%" :value="amount" id="amount"></yhm-form-text>
        <yhm-form-date title="启用日期" subtitle=""   :value="startDate" id="startDate " position="t"  rule="R0000"></yhm-form-date>
        <yhm-form-date title="结束日期" subtitle=""   :value="endDate" id="endDate " position="t"  rule="R0000"></yhm-form-date>
        <yhm-form-radio title="启用状态" subtitle="" width="1" no-edit="1" :select-list="enableList" :value="enable" id="enable" ></yhm-form-radio>
      </template>
    </yhm-formbody>
    <!-- 空行 -->
    <div class="f_split"></div>
    <yhm-form-list-edit>
      <template #title>优惠活动详情信息</template>
      <template #operate>
        <yhm-commonbutton value="添加优惠活动" icon="btnAdd" @call="addDetail"></yhm-commonbutton>
      </template>
      <template #listHead>
        <yhm-managerth style="width: 40px" title="序号"></yhm-managerth>
        <yhm-managerth  style="width: 870px" title="活动"></yhm-managerth>
        <yhm-managerth v-if="isDell" style="width: 40px" title="删除"></yhm-managerth>
      </template>
      <template #listBody>
        <tr v-for="(item,index) in discountList" :key="index" :class="{InterlacBg:index%2!==0}">
          <yhm-form-td-textbox   width="40" :list="discountList" listid="discountList" :value="item" id="code" rule="R0000"></yhm-form-td-textbox>
          <yhm-form-td-textbox  width="870" :list="discountList" listid="discountList" :value="item" id="remark" rule="R0000"></yhm-form-td-textbox>
          <yhm-form-td-delete v-if="isDell" :must="1" width="40" :list="discountList"  listid="discountList" :value="item" :del-click="true" @click="delDiscount(index,item)"></yhm-form-td-delete>
        </tr>
      </template>
    </yhm-form-list-edit>

    <yhm-formoperate :createName="createName" :insertDate="insertDate" :updateName="updateName" :updateDate="updateDate">
      <template #btn>
        <yhm-commonbutton v-if="isDell" value="保存" icon="btnSave" :flicker="true" @call="save()"></yhm-commonbutton>
        <yhm-commonbutton v-if="isDell" value="保存并发布" icon="btnSave" :flicker="true" @call="btnSave()"></yhm-commonbutton>
      </template>
    </yhm-formoperate>
  </div>
</template>

<script>
  import { guid,accAdd,accMul,formatTime } from '@/assets/common.js'
  import { formmixin } from '@/assets/form.js'
  export default {
    name: 'promotionsForm',
    mixins: [formmixin],
    data(){
      return{
        discountList:[],
        brandList:[],
        brand:'',
        insuredUnitList:[],
        insuredUnit:'',
        enableList:[],
        enable:'',
        remark:'',
        name:'',
        isDell:true,
        startDate:'',
        endDate:'',

      }
    },
    methods: {
      addDetail () {
        let index = this.discountList.length + 1
        let insertDate = new Date(accAdd(new Date().getTime(), accMul(this.discountList.length, 1000)))
        this.discountList.push({
          id: guid(),
          insertDate: formatTime(insertDate),
          ownerID: this.id,
          code: index + '',
          remark: this.remark,
        })
      },
      delDiscount(index,item){
        this.$dialog.alert({
          tipValue: '删除成功！！！',
          closeCallBack: ()=>{
            this.discountList.splice(index, 1)
            if(this.discountList.length === 0){
              this.addDetail()
            }
          }
        })
      },
      save(){
        if (this.validator()){
          let params = {
            id:this.id,
            name:this.name,
            brand:this.brand,
            insuredUnit:this.insuredUnit,
            amount:this.amount,
            enable:this.enable,
            discountList:this.discountList,
            startDate:this.startDate+' 00:00:00',
            endDate:this.endDate+' 23:59:59',
          }
          this.ajaxJson({
            url: '/Insurance/promotionSave',
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
        }

      },
      btnSave(){
        if (this.validator()){
          let params = {
            id:this.id,
            name:this.name,
            brand:this.brand,
            insuredUnit:this.insuredUnit,
            amount:this.amount,
            enable:'2',
            discountList:this.discountList,
            startDate:this.startDate+' 00:00:00',
            endDate:this.endDate+' 23:59:59',
          }
          this.ajaxJson({
            url: '/Insurance/promotionBtnSave',
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
        }

      },
    },

    created () {
      this.setQuery2Value("isDel")
      if (this.isDel==0){
        this.isDell=false
      }

      this.init({
        url: '/Insurance/promotionInit',
        all: (data) => {
          //添加查看的时候都需要的代码
          this.brandList=data.brandPsd.list
          this.brand=data.brandPsd.value
          this.insuredUnitList=data.insuredUnitPsd.list
          this.insuredUnit=data.insuredUnitPsd.value
          this.enableList=data.enablePsd.list
          this.enable=data.enablePsd.value

        },
        add: (data) => {
          //添加时独有的代码
          //初始化分组成员信息
          this.addDetail()
        },
        look: (data) => {
          //查看时独有的信息
          this.discountList=data.discountList
          this.amount=data.amount
          this.name=data.name
          this.startDate=data.startDate
          this.endDate=data.endDate
          if (this.enable=='0' || this.enable=='2'){
            this.isDell=false
          }

        }
      })
    }
  }
</script>

<style scoped>

</style>
