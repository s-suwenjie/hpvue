<template>
  <div class="f_main">
    <yhm-formbody>
      <template #title>添加信息</template>
      <template #control>
        <yhm-form-date title="入库日期"   :value="deliveryTime" id="deliveryTime " position="t"  ></yhm-form-date>
        <yhm-form-text placeholder="" no-edit="1" title="操作人" subtitle=""  :value="deliveryPerson" id="deliveryPerson" rule="R00000"></yhm-form-text>
        <yhm-form-textarea  placeholder=""  title="理由" subtitle=""  :value="remark" id="remark" ></yhm-form-textarea>

      </template>
    </yhm-formbody>
    <div class="f_split"></div>
    <yhm-form-list-edit >
      <template #title>配件明细</template>
      <template #operate>
        <yhm-commonbutton  value="添加配件信息" icon="btnAdd" @call="addDiscount"></yhm-commonbutton>
      </template>
      <template #listHead>
        <yhm-managerth  title="配件名称"></yhm-managerth>
        <yhm-managerth  title="规格型号"></yhm-managerth>
        <yhm-managerth title="客户带走的数量"></yhm-managerth>
        <yhm-managerth title="备注"></yhm-managerth>
        <!--<yhm-managerth style="width: 90px" title="入场照片"></yhm-managerth>-->
        <yhm-managerth style="width: 40px" title="删除"></yhm-managerth>

      </template>
      <template #listBody>
        <tr v-for="(item,index) in detailsList" :key="index" :class="{InterlacBg:index%2!==0}">
          <yhm-form-td-textbox width="220" no-edit="1" :list="detailsList" listid="detailsList" :value="item" id="parts" rule="R0000"></yhm-form-td-textbox>
          <yhm-form-td-textbox width="220" no-edit="1" :list="detailsList" listid="detailsList" :value="item" id="specifications" rule="R0000"></yhm-form-td-textbox>

          <yhm-form-td-textbox width="220" :list="detailsList"  listid="detailsList" :value="item" id="deliveryQuantity" rule="R0000"></yhm-form-td-textbox>
          <yhm-form-td-textbox width="220" :list="detailsList"  listid="detailsList" :value="item" id="reason"></yhm-form-td-textbox>
          <yhm-form-td-delete :must="1" width="40" :list="detailsList"  listid="detailsList" :value="item" :del-click="true" @click="delDiscount(index,item)"></yhm-form-td-delete>
        </tr>
      </template>
      <template #empty>
        <span class="m_listNoData" v-show="detailsList.length>0?false:true">暂时没有数据</span>
      </template>
    </yhm-form-list-edit>

    <yhm-formoperate :createName="createName" :insertDate="insertDate" :updateName="updateName" :updateDate="updateDate">
      <template #btn>
        <yhm-commonbutton value="保存" icon="btnSave" :flicker="true" @call="save()"></yhm-commonbutton>
      </template>
    </yhm-formoperate>
  </div>
</template>

<script>
  import { accMul, accAdd, guid, formatDate,formatTime } from '@/assets/common.js'
  import { formmixin } from '@/assets/form.js'
  export default {
    name: 'takeAwayFrom',
    mixins: [formmixin],
    data(){
      return{
        deliveryTime:formatDate(new Date()),//入库时间
        deliveryPerson:'',
        deliveryPersonID:'',//操作人
        deliveryQuantity:'',//出库数量
        recoveryQuantity:'',//回收数量
        parts:'',//配件
        partsID:'',
        specificationsID:'',
        specifications:'',
        remark:'',
        reason:'',
        detailsList:[],
        otherID:'',
        modelID:'',

      }
    },
    methods:{
      save(){

          let params = {
            id:this.id,
            modelID:this.modelID,
            ownerID:this.otherID,
            dateTime:this.deliveryTime,
            operatorID:this.deliveryPersonID,
            state:'1',
            remark:this.remark,
            detailsList:this.detailsList,
          }
          // console.log(params)
          // return
          this.ajaxJson({
            url: '/dailyoffice/corcRegistration/save',
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

      },
      addDiscount(){
        this.$dialog.OpenWindow({
          width: 1050,
          height: 720,
          url:'/selectTakeAway?ownerID='+this.otherID,
          title:'选择配件',
          closeCallBack:(data)=>{
            if(data){
              let insertDate = new Date(accAdd(new Date().getTime(), accMul(this.detailsList.length, 1000)))
              this.detailsList.push({
                id: guid(),
                insertDate: formatTime(insertDate),
                ownerID: this.id,
                parts:data.product,
                partsID:data.productid,
                specifications:data.model,
                specificationsID:data.modelID,
                deliveryQuantity:'0',
                recoveryQuantity:'0',
                reason: '',
                modelID:this.modelID
              })
            }
          }
        })
      },
      delDiscount(index,item){
        this.$dialog.alert({
          tipValue: '删除成功！！！',
          closeCallBack: ()=>{
            this.detailsList.splice(index, 1)
          }
        })
      },
    },
    created(){
      this.setQuery2Value('otherID')
      this.setQuery2Value('modelID')
      this.deliveryPerson=sessionStorage.getItem('____currentUser')
      this.deliveryPersonID = sessionStorage.getItem('____currentUserID')

    },
  }
</script>

<style scoped>

</style>
