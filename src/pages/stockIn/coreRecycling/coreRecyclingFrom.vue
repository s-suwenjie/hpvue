<template>
  <div class="f_main">
    <yhm-formbody>
      <template #title>添加信息</template>
      <template #control>
        <yhm-form-date title="入库日期"   :value="dateTime" id="dateTime " position="t"  ></yhm-form-date>
        <yhm-form-text placeholder="" no-edit="1" title="操作人" subtitle=""  :value="operator" id="operator" rule="R00000"></yhm-form-text>
        <yhm-form-textarea  placeholder=""  title="理由" subtitle=""  :value="remark" id="remark" ></yhm-form-textarea>

      </template>
    </yhm-formbody>
    <div class="f_split"></div>
    <yhm-form-list-edit >
      <template #title>配件明细</template>
      <template #operate></template>
      <template #listHead>
        <yhm-managerth  title="配件名称"></yhm-managerth>
        <yhm-managerth  title="规格型号"></yhm-managerth>
        <yhm-managerth style="width: 90px" title="出库数量"></yhm-managerth>
        <yhm-managerth style="width: 90px" title="客户" subtitle="(带走)数量"></yhm-managerth>
        <yhm-managerth style="width: 90px" title="配件" subtitle="(遗失)数量"></yhm-managerth>
        <yhm-managerth style="width: 90px" title="旧件(已)" subtitle="回收数量"></yhm-managerth>
        <yhm-managerth style="width: 90px" title="旧件(未)" subtitle="回收数量"></yhm-managerth>
        <yhm-managerth title="备注"></yhm-managerth>
        <!--<yhm-managerth style="width: 90px" title="入场照片"></yhm-managerth>-->
        <yhm-managerth style="width: 40px" title="删除"></yhm-managerth>

      </template>
      <template #listBody>
        <tr v-for="(item,index) in detailsList" :key="index" :class="{InterlacBg:index%2!==0}">
          <yhm-form-td-textbox width="150" no-edit="1" :list="detailsList" listid="detailsList" :value="item" id="parts" rule="R0000"></yhm-form-td-textbox>
          <yhm-form-td-textbox width="150" no-edit="1" :list="detailsList" listid="detailsList" :value="item" id="specifications" rule="R0000"></yhm-form-td-textbox>
          <yhm-form-td-textbox width="90" no-edit="1" :list="detailsList"  listid="detailsList" :value="item" id="deliveryQuantity"></yhm-form-td-textbox>
          <yhm-form-td-textbox width="90" no-edit="1" :list="detailsList"  listid="detailsList" :value="item" id="takeAway"></yhm-form-td-textbox>
          <yhm-form-td-textbox width="90" no-edit="1" :list="detailsList"  listid="detailsList" :value="item" id="lostNumber"></yhm-form-td-textbox>
          <yhm-form-td-textbox width="90" no-edit="1" :list="detailsList"  listid="detailsList" :value="item" id="numb"></yhm-form-td-textbox>
          <yhm-form-td-textbox width="90" :list="detailsList"  listid="detailsList" :value="item" id="recoveryQuantity"></yhm-form-td-textbox>
          <yhm-form-td-textbox width="150" :list="detailsList"  listid="detailsList" :value="item" id="reason"></yhm-form-td-textbox>
          <!--<yhm-form-td-upload-image  width="90"  tag="Invoice" @mouseover="invoiceImg(item)" @mouseout="invoiceImgHide(item)" :list="detailsList" listid="detailsList" :value="item" id="url" rule="#"></yhm-form-td-upload-image>-->
          <yhm-form-td-delete :must="1" width="40" :list="detailsList"  listid="detailsList" :value="item" :del-click="true" @click="delDiscount(index,item)"></yhm-form-td-delete>
        </tr>
      </template>
    </yhm-form-list-edit>
    <div class="invoiceImgView" v-show="viewImgShow">
      <img :src="viewImg" alt="">
    </div>
    <yhm-formoperate :createName="createName" :insertDate="insertDate" :updateName="updateName" :updateDate="updateDate">
      <template #btn>
        <!--<yhm-commonbutton value="剩余配件不存在" style="color: #FF0000;margin-right: 100px" icon="btnSave"  ></yhm-commonbutton>-->
        <yhm-commonbutton value="保存" icon="btnSave" :flicker="true" @call="save()"></yhm-commonbutton>
      </template>
    </yhm-formoperate>
  </div>
</template>

<script>

  import { accMul, accAdd, guid, formatDate,formatTime } from '@/assets/common.js'
  import { formmixin } from '@/assets/form.js'

  export default {
    name: 'coreRecyclingFrom',
    mixins: [formmixin],
    data(){
      return{
        dateTime:formatDate(new Date()),//入库时间
        operator:'',
        operatorID:'',//操作人
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
        takeAway:'',
        lostNumber:'',
        // viewImg:'',         //需要显示的发票路径
        // viewImgShow:false,  //显示发票图片
      }
    },
    methods:{
      //显示发票图片
      // invoiceImg(item){
      //   if(item.url !== '') {
      //     this.viewImg = '/UploadFile/Invoice/' + item.url
      //     this.viewImgShow = true
      //   }
      // },
      // //隐藏发票图片
      // invoiceImgHide(item){
      //   if(item.url !== '') {
      //     this.viewImgShow = false
      //   }
      // },
      delDiscount(index,item){
        this.$dialog.alert({
          tipValue: '删除成功！！！',
          closeCallBack: ()=>{
            this.detailsList.splice(index, 1)
          }
        })
      },
      save(){

        if(this.detailsList.length==0){
          this.$dialog.alert({
            tipValue: '配件不能为空！！！',
            closeCallBack: ()=>{

            }
          })
        }else{
          let arr=[]
          for (let i in this.detailsList) {
            if(this.detailsList[i].recoveryQuantity==0){

            }else{
              arr.push({
                id:this.detailsList[i].id,
                fixID:this.detailsList[i].fixID,
                ownerID:this.detailsList[i].ownerID,
                modelID:this.detailsList[i].modelID,
                parts:this.detailsList[i].parts,
                partsID:this.detailsList[i].partsID,
                specificationsID:this.detailsList[i].specificationsID,
                specifications:this.detailsList[i].specifications,
                numb:this.detailsList[i].numb,
                deliveryQuantity:this.detailsList[i].deliveryQuantity,
                recoveryQuantity:this.detailsList[i].recoveryQuantity,
                stockoutdetailid:this.detailsList[i].stockoutdetailid,
                otherID:this.detailsList[i].otherID,
                reason:this.detailsList[i].reason,
              })
            }

          }
          let params={
            id:this.id,
            modelID:this.modelID,
            ownerID:this.otherID,
            dateTime:this.dateTime,
            operatorID:this.operatorID,
            remark:this.remark,
            detailsList:arr
          }
//           console.log(params)
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
              } else {
                this.$dialog.alert({
                  alertImg: 'warn',
                  tipValue: data.message
                })
              }
            }
          })
        }
      }
    },
    created(){
      this.setQuery2Value('otherID')
      this.setQuery2Value('modelID')
      this.operator=sessionStorage.getItem('____currentUser')
      this.operatorID = sessionStorage.getItem('____currentUserID')
      let params={
        orderid: this.otherID,
        category:'1',
        state:'123',
        price:'-1',
        totalPrice:'-1',
      }
      this.ajaxJson({
        url: '/fix/fixOrder/getListForStockOut2',
        data: params,
        call: (data) => {
          for (let i in data){
            this.detailsList.push({
              id:guid(),
              fixID:data[i].id,
              ownerID:this.id,
              modelID:this.modelID,
              parts:data[i].product,
              partsID:data[i].productID,
              specificationsID:data[i].modelID,
              specifications:data[i].model,
              numb:data[i].numb,
              deliveryQuantity:data[i].quantity,
              recoveryQuantity:Number(data[i].quantity)-Number(data[i].numb)-Number(data[i].deliveryQuantity)-Number(data[i].deliveryQuantity2)+'',
              stockoutdetailid:data[i].stockoutdetailid,
              otherID:this.otherID,
              takeAway:data[i].deliveryQuantity,
              lostNumber:data[i].deliveryQuantity2,
              reason:'',
              url:'',
            })
          }
        }
      })
    },
  }
</script>

<style scoped>

</style>
