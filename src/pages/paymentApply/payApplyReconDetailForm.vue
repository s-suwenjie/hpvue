<template>
  <div class="f_main">
    <yhm-form-list-show width="1200">
      <template #title>拨付信息</template>
      <template #listHead>
        <yhm-managerth title="收款单位"></yhm-managerth>
        <yhm-managerth style="width: 80px" title="申请人"></yhm-managerth>
        <!-- totalCount 1-> 正常显示    2 -> 可以显示其他内容         -->
        <yhm-managerth style="width: 120px" title="金额"></yhm-managerth>
        <yhm-managerth style="width: 120px" title="事由"></yhm-managerth>
        <yhm-managerth style="width: 80px" title="支付方式"></yhm-managerth>
        <yhm-managerth style="width: 140px" title="最迟付款日期"></yhm-managerth>
        <yhm-managerth style="width: 80px" title="倒计时"></yhm-managerth>
        <yhm-managerth style="width: 280px" title="操作"></yhm-managerth>
      </template>

      <!--数据明细-->
      <template #listBody>
        <tr v-for="(item,index) in content" v-if="item.show" :key="index">
          <yhm-manager-td :value="item.unit" v-if="item.category === '0'" :rowspan="getRowspan(item)"></yhm-manager-td>
          <yhm-manager-td :value="item.person" :after-icon="item.listDetails?'i-btn-prompt':''" @click="clickIconEvent(item,index)"></yhm-manager-td>
          <yhm-manager-td-money :value="item.money"></yhm-manager-td-money>
          <yhm-manager-td :value="item.subject ? item.subject: '' " :after-icon="item.listDetails?'i-btn-prompt':''" @click="clickIconEvent(item,index)"></yhm-manager-td>
          <yhm-manager-td-psd :value="item.isChecks" :list="isChecksItems"></yhm-manager-td-psd>
          <yhm-manager-td-date empty="多日期" :value="item.lastDate" :before-icon="item.listDetails?'i-btn-prompt':''" @click="clickIconEvent(item,index)"></yhm-manager-td-date>
          <yhm-manager-td :value="item.days"></yhm-manager-td>
          <yhm-manager-td-operate>
            <yhm-manager-td-operate-button v-if="item.category !== '1'&&item.finish==false" @click="approvalBatch(item,index)" style="color:#2f54eb" icon="i-batchAllca" value="设置批量拨付"></yhm-manager-td-operate-button>
            <yhm-manager-td-operate-button v-if="item.category !== '1'&&item.finish" @click="revocation(item,index)"  style="color:#f00" icon="i-uniE99F" value="撤销批量拨付"></yhm-manager-td-operate-button>
            <yhm-manager-td-operate-button :no-click="item.finish==false?true:false" v-if="item.category !== '1'" @click="bulkPrint(item)" style="color:#333" icon="i-btn-print" value="批量打印"></yhm-manager-td-operate-button>
            <yhm-manager-td-operate-button :no-click="item.finish==false?true:false" v-show="item.isChecks==='0'" v-if="item.category !== '1'" @click="batchPayment(item)" style="color:#A60CDE" icon="i-batchAllca" value="批量拨付"></yhm-manager-td-operate-button>
            <yhm-manager-td-operate-button :no-click="item.finish==false?true:false" v-show="item.isChecks==='1'" v-if="item.category !== '1'" @click="checksFillIn(item)" style="color:#A60CDE" icon="i-batchAllca" value="支票填开"></yhm-manager-td-operate-button>
            <yhm-manager-td-operate-button v-if="item.category === '1'" @click="removeApproval(item,index)" style="color:#ec6603" icon="btnDel" value="移除"></yhm-manager-td-operate-button>
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
  import { accMul, accAdd, guid, formatDate,formatTime} from '@/assets/common.js'
  import { formmixin } from '@/assets/form.js'

  export default {
    name: 'payApplyReconDetailForm',
    mixins: [ formmixin ],
    data(){
      return{
        content: [
          {
            unit:'123',
            person:'54654',
            money:'645',
            subject:'645',
            isChecks:'645',
            lastDate:'645',
            days:'645',
            moncategoryey:'2',
          },
          {
            unit:'123',
            person:'54654',
            money:'645',
            subject:'645',
            isChecks:'645',
            lastDate:'645',
            days:'645',
            moncategoryey:'2',
          },
          {
            unit:'123',
            person:'54654',
            money:'645',
            subject:'645',
            isChecks:'645',
            lastDate:'645',
            days:'645',
            moncategoryey:'2',
          },
        ],
        isChecksItems:[],
        len: '',
        isEmpty: false,
        insertDate:'',
      }
    },
    methods: {
      //批量拨付  支票填开
      checksFillIn(item){
        this.$dialog.OpenWindow({
          url: '/selectChecksDetail?stateBefore=1&state=0&category=',
          width: "1000",
          height: "650",
          title: '选择支票',
          closeCallBack: (data) => {
            if (data) {
              if(data.category==='0'){
                this.$dialog.OpenWindow({
                  width: '1050',
                  height: '690',
                  title: '支票填开',
                  url: '/checkFillOut?ownerID=' + data.id+"&otherOwnerID="+item.id+'&otherCategory=2',
                  closeCallBack: (information) => {
                    if (information) {
                      this.initPageData(false)
                    }
                  }
                })
              }else{
                if(item.personOrUnit==='0'){
                  this.$dialog.OpenWindow({
                    width: '1050',
                    height: '690',
                    title: '支票填开',
                    url: '/checkFillOut?ownerID=' + data.id+"&otherOwnerID="+item.id+'&otherCategory=2',
                    closeCallBack: (information) => {
                      if (information) {
                        this.initPageData(false)
                      }
                    }
                  })
                }
              }
            }
          }
        })
      },
      //批量拨付  转账
      batchPayment(item){
        this.$dialog.OpenWindow({
          width: '1050',
          height: '690',
          title: '拨付资金',
          url: '/bankDetailForm?ownerID=' + item.id +'&bankDetailType=12&directionBefore=1',
          closeCallBack: (data)=>{
            this.initPageData(false)
          }
        })
      },
      //批量打印
      bulkPrint(item){
        let params = {
          id:item.id
        }
        this.ajaxJson({
          data:params,
          url: '',
          call: (data)=>{
            if(data.type===0){
              window.open("/UploadFile/" + data.html)
            }
          }
        })
      },
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
              url: '/PersonOffice/delBatchAppropriationPayment',
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
      approvalBatch(item,index){
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
              category:'0',
              state:'0',
              id:item.id,
              listDetails:listDetails,
            }
            this.ajaxJson({
              url: '/PersonOffice/saveBatchAppropriationPayment',
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
      /* 移除 */
      removeApproval(item,index){

        this.$dialog.confirm({
          width: '300',
          height: '200',
          tipValue: '是否删除当条数据?',
          okCallBack: ()=>{
            let currentParentIndex = 0;
            for(let i = index;i > 0;i--){
              if(this.content[i].category === '0'){
                currentParentIndex = i;
                break
              }
            }

            let id = '';
            if(this.content[currentParentIndex].totalCount > 2){
              id = item.id;
              this.content[currentParentIndex].totalCount = (parseInt(this.content[currentParentIndex].totalCount) - 1) + '';
              this.content.splice(index,1);
              for(let i = 0; i < this.content[currentParentIndex].listDetails.length;i++){
                if(this.content[currentParentIndex].listDetails[i].id === id){
                  this.content[currentParentIndex].listDetails.splice(i,1);

                  /* 计算金额 */
                  let money = this.content[currentParentIndex].money;
                  let childMoney = item.money;
                  let newMoney = accAdd(money, accMul(childMoney,-1));
                  this.content[currentParentIndex].money = newMoney + '';

                  break;
                }
              }
            }else{
              this.content.splice(currentParentIndex,3);
            }
          },
          cancelCallBack: ()=>{

          }

        })


      },

      clickIconEvent(item,index){
        if(item.category === '0'){
          for (let i = 0; i < this.content.length;i++){
            if(this.content[i] !== item){
              if(this.content[i].category === '0') {
                this.content[i].childShow = false
              }
              if(this.content[i].category === '1') {
                this.content[i].show = false
                // this.content[i].unit = ''
              }
            }
          }
          item.childShow = !item.childShow
          let start = this.content.indexOf(item)
          let count = item.totalCount
          for (let i = 1; i <= count;i++){
            this.content[start + i].show = item.childShow
          }
        }
      },

      initData(){
        this.init({
          url: '/PersonOffice/batchAppropriationPayment',
          all: (data) => {
            // this.content = data.content;
            this.isChecksItems = data.isChecksItems
          },
          add: (data)=>{

          },
          look: (data)=>{

          }
        })
      }
    },
    computed:{
      getRowspan(){
        return function (item) {
          if (item.childShow && item.category === '0'){
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
    created () {
      setTimeout(()=>{
        this.initData()
      },0)
    }
  }
</script>

<style scoped lang="less">
.f_main{
  position: relative;
}
tbody>tr:nth-child(odd){
  background-color: #dcdbdb !important;
}
tbody>tr:nth-child(evn){
  background-color: #fff;
}
</style>
