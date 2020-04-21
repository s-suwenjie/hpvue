<template>
  <div class="f_main">
    <yhm-form-list-show width="1200">
      <template #title>拨付信息</template>
      <template #listHead>
        <yhm-managerth style="width: 120px" title="申请人"></yhm-managerth>
        <yhm-managerth style="width: 140px" title="批次号"></yhm-managerth>
        <yhm-managerth style="width: 140px" title="申请日期"></yhm-managerth>
        <yhm-managerth style="width: 80px" title="类型"></yhm-managerth>
        <yhm-managerth title="事由"></yhm-managerth>
        <yhm-managerth style="width: 120px" title="金额"></yhm-managerth>
        <yhm-managerth style="width: 280px" title="操作"></yhm-managerth>
      </template>
      <!--数据明细-->
      <template #listBody>
        <tr v-for="(item,index) in content" v-if="item.show" :key="index">
          <yhm-manager-td :value="item.person" v-if="item.category" :rowspan="getRowspan(item)"></yhm-manager-td>
          <yhm-manager-td-center :value="item.code" :after-icon="parseInt(item.codeCount) > 1 ? 'i-btn-prompt':''" @click="clickIconEvent(item,index)"></yhm-manager-td-center>
          <yhm-manager-td-date empty="多日期" :value="item.workDate"></yhm-manager-td-date>
          <yhm-manager-td-psd :value="item.invoiceCategory" :list="invoiceCategoryItems"></yhm-manager-td-psd>
          <yhm-manager-td :value="item.subject ? item.subject: '' " :after-icon="parseInt(item.subjectCount) > 1 ?'i-btn-prompt':''" @click="clickIconEvent(item,index)"></yhm-manager-td>
          <yhm-manager-td-money  :value="item.money"></yhm-manager-td-money>
          <yhm-manager-td-operate>
            <yhm-manager-td-operate-button v-if="item.category&&!item.finish" @click="approvalBatch(item,index)" style="color:#2f54eb" icon="i-batchAllca" value="批量审批"></yhm-manager-td-operate-button>
            <yhm-manager-td-operate-button v-if="item.category !== '1'&&item.finish" @click="revocation(item,index)"  style="color:#f00" icon="i-uniE99F" value="撤销批量拨付"></yhm-manager-td-operate-button>
            <yhm-manager-td-operate-button :no-click="item.finish==false?true:false" v-if="item.category" style="color:#A60CDE" icon="i-batchAllca" value="批量拨付"></yhm-manager-td-operate-button>
            <yhm-manager-td-operate-button :no-click="item.finish==false?true:false" v-if="item.category" @click="bulkPrint(item)" style="color:#333" icon="i-btn-print" value="批量打印"></yhm-manager-td-operate-button>
            <yhm-manager-td-operate-button v-if="!item.category" @click="removeApproval(item,index)" style="color:#ec6603" icon="btnDel" value="移除"></yhm-manager-td-operate-button>
          </yhm-manager-td-operate>
        </tr>
      </template>
      <template #empty>
        <span class="m_listNoData" v-show="isEmpty">暂时没有数据</span>
      </template>
    </yhm-form-list-show>
  </div>
</template>

<script>
  import { accMul, accAdd, guid,formatTime} from '@/assets/common.js'
  import {formmixin} from '@/assets/form.js'
  export default {
    name: "reimbursementReconDetailForm",
    mixins: [formmixin],
    data() {
      return {
        content: [],
        invoiceCategoryItems:[],
        arrI: [],
        arrILen: '',
        isEmpty: false,
      }
    },
    methods: {
      //撤销批量拨付
      revocation(item,index){
        this.$dialog.confirm({
          width: '300',
          height: '200',
          tipValue: '是否撤销批量拨付?',
          okCallBack: () => {
            let params = {
              id: item.id,
            }
            this.ajaxJson({
              url: '/PersonOffice/delBatchAppropriationReimbursements',
              data:params,
              call:(data) =>{
                if(data.type === 0){
                  item.finish = !item.finish
                  this.$dialog.alert({
                    tipValue: data.message,
                    closeCallBack: (data)=>{
                      this.initData()
                    }
                  })
                }else{
                  this.$dialog.alert({
                    alertImg: 'warn',
                    tipValue: data.message
                  })
                }

              }
            })
          }
        })
      },
      /* 批量拨付 */
      approvalBatch(item,index) {
        this.$dialog.confirm({
          width: '300',
          height: '200',
          tipValue: '是否批量拨付?',
          okCallBack: () => {
            let arr = []
            for(let i = 0; i<this.content[index].listDetails.length; i++){
              arr.push(this.content[index].listDetails[i].id)
            }
            let listDetails = []
            for(let a = 0; a<arr.length; a++){
              this.insertDate = new Date(accAdd(new Date().getTime(), accMul(a, 1000)))
              listDetails.push({
                id:guid(),
                ownerID:item.id,
                insertDate:formatTime(this.insertDate),
                otherID:arr[a],
              })
            }
            let params = {
              category:'1',
              state:'0',
              id:item.id,
              listDetails:listDetails,
            }
            this.ajaxJson({
              url: '/PersonOffice/saveBatchAppropriationReimbursements',
              data:params,
              call:(data) =>{
                if(data.type === 0){
                  item.finish = !item.finish
                  this.$dialog.alert({
                    tipValue: data.message,
                    closeCallBack: (data)=>{
                      this.initData()
                    }
                  })
                }else{
                  this.$dialog.alert({
                    alertImg: 'warn',
                    tipValue: data.message
                  })
                }

              }
            })
          }
        })
      },
      clickIconEvent(item, index) {
        if (item.category) {
          for (let i = 0; i < this.content.length; i++) {
            if (this.content[i] !== item) {
              if (this.content[i].category) {
                this.content[i].childShow = false
              }
              if (!this.content[i].category) {
                this.content[i].show = false
                // this.content[i].unit = ''
              }
            }
          }
          item.childShow = !item.childShow
          let start = this.content.indexOf(item)
          let count = item.totalCount
          for (let i = 1; i <= count; i++) {
            this.content[start + i].show = item.childShow
          }
        }
      },
      /* 移除 */
      removeApproval(item, index) {
        let code = item.code
        let removeArr = []
        for(let i = 0; i < this.content.length; i++){
          if(!this.content[i].category && this.content[i].code === code){
            removeArr.push(this.content[i])
            //this.content.splice(i,1)
          }
        }

        let removeParentArr = []
        for(let i = 0; i < removeArr.length; i++){
          let id = removeArr[i].id
          for(let j = 0; j < this.content.length; j++){
            if(this.content[j].category){
              let removeDetailsArr = []
              for(let k = 0; k < this.content[j].listDetails.length; k++){
                if(this.content[j].listDetails[k].id === id){
                  if(removeParentArr.indexOf(this.content[j]) === -1) {
                    removeParentArr.push(this.content[j])
                  }
                  removeDetailsArr.push(this.content[j].listDetails[k])
                }
              }
              for(let k = 0; k < removeDetailsArr.length; k++){
                let removeDetailIndex = this.content[j].listDetails.indexOf(removeDetailsArr[k])
                this.content[j].listDetails.splice(removeDetailIndex,1)
                this.content[j].totalCount = accAdd(this.content[j].totalCount,-1) + ''
              }

            }

          }

          let removeIndex = this.content.indexOf(removeArr[i])
          this.content.splice(removeIndex,1)
        }

        for(let i = 0; i < removeParentArr.length; i++){
          let k = this.content.indexOf(removeParentArr[i])
          this.content[k].codeCount = accAdd(this.content[k].codeCount,-1) + ''
        }

        let arr = [];

        for(let i in this.content){
          if(this.content[i].category && this.content[i].codeCount === '1'){
            arr.push(this.content[i])
            for(let j = 0; j < this.content[i].listDetails.length; j++){
              let id = this.content[i].listDetails[j].id
              for(let k = 0; k < this.content.length; k++){
                if(!this.content[k].category && this.content[k].id === id){
                  arr.push(this.content[k])
                }
              }
            }
          }
        }

        for(let i = 0; i < arr.length; i++){
          let removeIndex = this.content.indexOf(arr[i])
          this.content.splice(removeIndex,1)
        }

        for(let i = 0; i < this.content.length; i++){
          if(this.content[i].category){
            let money = 0
            for(let j = 0; j < this.content[i].listDetails.length; j++){
              money = accAdd(this.content[i].listDetails[j].money,money)
            }
            this.content[i].money = money + ''
          }
        }
        //console.log(this.content)
      },

      initData(){
        this.init({
          url: '/PersonOffice/batchAppropriationReimbursements',
          all: (data) => {
            this.content = data.content
            this.invoiceCategoryItems = data.invoiceCategoryItems
          },
          add: (data)=>{

          },
          look: (data)=>{

          }
        })
      }
    },
    computed: {
      getRowspan(){
        return function (item) {
          if (item.childShow && item.category){
            return accAdd(item.totalCount,1)
          }
          else {
            return 1
          }
        }
      },
    },
    watch: {
      content(){
        this.isEmpty = this.content.length === 0;
      }
    },
    created() {
      this.initData()
    }
  }
</script>

<style scoped lang="less">
  tbody>tr:nth-child(evn){
    background-color: #fff !important;
  }
  tbody>tr:nth-child(odd){
    background-color: #dcdbdb;
  }
</style>
