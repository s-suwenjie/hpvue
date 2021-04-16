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
        <yhm-managerth title="遗失的数量"></yhm-managerth>
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
        <yhm-commonbutton value="保存并提交" style="margin-right: 10px;color: #FF0000" icon="btnSave"  @call="sumCall()"></yhm-commonbutton>
      </template>
    </yhm-formoperate>
  </div>
</template>

<script>
  import { accMul, accAdd, guid, formatDate,formatTime } from '@/assets/common.js'
  import { formmixin } from '@/assets/form.js'
  export default {
    name: 'lostRegistrationForm',
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
      sumCall(){
        let params = {
          id:this.id,
          modelID:this.modelID,
          ownerID:this.otherID,
          dateTime:this.deliveryTime,
          operatorID:this.deliveryPersonID,
          state:'0',
          remark:this.remark,
          detailsList:this.detailsList,
        }
        // console.log(params)
        // return
        this.ajaxJson({
          url: '/dailyoffice/corcRegistration/saveLost',
          data: params,
          call: (data) => {
            if (data.type === 0) {
              let par={
                id:this.id,
                state:'1'
              }
              this.ajaxJson({
                url: '/dailyoffice/corcRegistration/updateSubmit',
                data: par,
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
            }else if(data.type === 1){
              this.$dialog.alert({
                alertImg:'warn',
                tipValue: data.message
              })
            }
          }
        })
      },
      save(){
        let params = {
          id:this.id,
          modelID:this.modelID,
          ownerID:this.otherID,
          dateTime:this.deliveryTime,
          operatorID:this.deliveryPersonID,
          state:'0',
          remark:this.remark,
          detailsList:this.detailsList,
        }
        // console.log(params)
        // return
        this.ajaxJson({
          url: '/dailyoffice/corcRegistration/saveLost',
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
      initData(){
        let params = {
          id: this.id,
          pageSize: this.pager.pageSize, // 单页数据条数
          pageIndex: this.pager.pageIndex, // 当前页码
        }

        this.init({
          url: '/dailyoffice/corcRegistration/getCorcRegistrationByID',
          data: params,
          call: (data) => {

            this.id=data.id
            this.state=data.state
            this.model=data.model
            this.person=data.operator
            this.dateTime=data.dateTime
            this.plate=data.list[0].vehicle
            this.code=data.list[0].code
            this.discountList=data.list
            if (this.state==0){
              this.isEdit=true
            } else {
              this.isEdit=false
            }

          }
        })
      }
    },
    created(){
      this.setQuery2Value('otherID')
      this.setQuery2Value('modelID')

      this.init({
        url: '/dailyoffice/corcRegistration/getCorcRegistrationByID',
        all: (data) => {

        },
        add: (data) => {
          /* 需要添加的数据 */
          this.deliveryPerson=sessionStorage.getItem('____currentUser')
          this.deliveryPersonID = sessionStorage.getItem('____currentUserID')
        },
        look: (data) => {
          /* 需要查看的数据 */
          this.id=data.id
          this.deliveryTime=data.dateTime
          this.deliveryPerson=data.operator
          this.deliveryPersonID=data.operatorID
          this.otherID=data.ownerID
          this.remark=data.remark
          this.state=data.state
          this.modelID=data.modelID
          this.detailsList=data.list
        }
      })

    },
  }
</script>

<style scoped>

</style>
