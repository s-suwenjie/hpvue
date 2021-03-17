<template>
    <div>
      <yhm-managerpage style="margin: 0;" category="1" mainWidth="1050" mainHeight="658" menu-tab-width="1014"  :total-table="true" :totalWidth="true">
        <!--导航条-->
        <template #navigation>基本信息</template>
        <template #choose>
          <div style="padding-bottom: 20px;width: 1014px;margin: 0 auto;display: flex;">
            <yhm-commonbutton value="全选" icon=" " @call="checkCall" category="three"></yhm-commonbutton>
            <yhm-commonbutton value="选中信息出库" icon=" " @call="stockOutEvent()" category="three" :flicker="true"></yhm-commonbutton>
            <!--            <yhm-commonbutton value="添加材料详情" icon=" " @call="addMaterials()" category="three" :flicker="true"></yhm-commonbutton>-->
            <!--            <yhm-commonbutton value="跳过本次出库环节" icon=" " v-show="inTheEnd=='true'"  @call="skip()" category="three"></yhm-commonbutton>-->
            <!--            <yhm-commonbutton value="创建工序服务" v-show="inTheEnd=='true'" icon=" " color="#00b86b" @call="createAprocess()" category="three" :flicker="true"></yhm-commonbutton>-->
          </div>
        </template>
        <!--数据表头-->
        <template #listHead>
          <yhm-managerth style="width: 40px;" title="选择" @call="checkCall"></yhm-managerth>
          <!--          <yhm-managerth-check style="width: 40px;" :check="allCheck" @click="allCheckClick"></yhm-managerth-check>-->
          <!--          <yhm-managerth style="width: 38px" title="查看"></yhm-managerth>-->
          <yhm-managerth title="商品名称"></yhm-managerth>
          <yhm-managerth title="规格型号"></yhm-managerth>
          <yhm-managerth width="90" title="出库数量"></yhm-managerth>
          <yhm-managerth style="width: 110px" title="商品类型"></yhm-managerth>
          <yhm-managerth style="width: 70px" title="适用车型"></yhm-managerth>

          <yhm-managerth style="width: 80px" title="拆分数量"></yhm-managerth>
          <yhm-managerth style="width: 80px" title="整件数量"></yhm-managerth>
          <yhm-managerth style="width: 70px" title="拆分状态"></yhm-managerth>
          <!--          <yhm-managerth style="width: 120px" title="能否出库"></yhm-managerth>-->
          <yhm-managerth style="width: 143px" title="出库状态"></yhm-managerth>
        </template>
        <!--数据明细-->
        <template #listBody>
          <tr v-for="(item,index) in listPages" :class="[{InterlacBg:index%2!=0}]" :key="item.id">
            <!--            v-if="item.state=='可以出库'&&item.stateStr=='未出库'"-->
            <td class="checkbox" style="margin: 0;border-left: 1px solid #bfbfbf;" @click="checkboxOnclick(item,index)"  v-if="item.splitVal=='0'?(Number(item.mdo)<=0?false:true):(Number(item.quantity<=0)?false:true)"><input type="checkbox" name="checkbox" :checked="checkedList.indexOf(item.id)!=-1?true:false" :value="item.id" ></td>
            <!--            <yhm-manager-td-checkbox :value="item" v-if="item.splitVal=='0'?(Number(item.mdo)<=0?false:true):(Number(item.quantity<=0)?false:true)" @call="checkCall"></yhm-manager-td-checkbox>-->
            <yhm-manager-td value=" " class="select" v-else></yhm-manager-td>
            <!--            <yhm-manager-td-look @click="listView(item)"></yhm-manager-td-look>-->
            <yhm-manager-td :value="item.product" :tip="true"></yhm-manager-td>
            <yhm-manager-td :value="item.model" :tip="true"></yhm-manager-td>
            <yhm-manager-td v-if="item.splitVal=='0'?(Number(item.mdo)==0?false:true):(Number(item.quantity==0)?false:true)">
              <div class="inputClass">
                <input class="input" ref="input" v-model="item.num" :key="key" type="text" style="width: 85%" @blur="inputChange(item,index)" :style="{background:index%2==0?'#fff':'#dcdbdb'}">
              </div>
            </yhm-manager-td>
            <yhm-manager-td-center v-else value="-----"></yhm-manager-td-center>
            <yhm-manager-td-psd :value="item.applicableModels" :list="applicableModelsList"></yhm-manager-td-psd>
            <yhm-manager-td-psd :value="item.category" :list="categoryList"></yhm-manager-td-psd>
            <yhm-manager-td-center :value="item.mdo"></yhm-manager-td-center>
            <yhm-manager-td-center :value="item.quantity+''"></yhm-manager-td-center>
            <yhm-manager-td-center :value="item.splitVal=='0'?'可拆分':'不可拆分'"></yhm-manager-td-center>
            <!--            <yhm-manager-td-center :value="item.state" :color="item.state=='不可出库'?'#999':'#49a9ea'"></yhm-manager-td-center>-->
            <yhm-manager-td-center :value="item.stateStr" :color="item.stateStr=='可出库'?'#00bb6b':'#f00'"></yhm-manager-td-center>

          </tr>
        </template>
        <!--数据空提示-->
        <template #empty>
          <span class="m_listNoData" v-show="content.length!='0'?false:true">暂时没有数据</span>
        </template>
                <!--分页控件-->
        <template #pager>
           <yhm-pagination :pager="pager" isPageSize="false" @initData="listPage"></yhm-pagination>
        </template>
      </yhm-managerpage>

    </div>
</template>

<script>
  import { managermixin } from '@/assets/manager.js'
  export default {
    name: 'workOrderStockOutManagerView',
    mixins: [managermixin],
    data(){
      return{
        key:0,
        theDelivery:'',
        listPages:[],
        checkedList:[],//选中数据的id
        content:[],
        params:[],
        applicableModelsList:[],
        categoryList:[],
        allCheck:false,
        allChecked:false,//是否选中
      }
    },
    methods:{
      checkboxOnclick(item,index){
        if(this.checkedList.indexOf(item.id)==-1){
          this.checkedList.push(item.id)
        }else {
          this.checkedList.splice(this.checkedList.indexOf(item.id),1)
        }
      },
      allCheckClick(show){
        if(show){
          for (let j=0; j<this.content.length; j++) {
            this.params.push(this.content[j])
          }
        }else{
          this.params = []
        }
      },
      inputChange(item,index){
        if(item.splitVal=='0'&&Number(item.num)>Number(item.mdo)){
          item.num = item.mdo.concat()
        }
        if(item.splitVal=='1'&&Number(item.num)>Number(item.quantity)){
          item.num = item.quantity.concat()
        }
        this.key++
      },
      addMaterials(){
        this.$dialog.OpenWindow({
          width: '1050',
          height: '700',
          url:'/workOrderMaterialListManagerView?ownerID='+this.ownerID+'&flowPathID='+this.flowPathID,
          title:'添加材料列表',
          closeCallBack:(data) =>{
            // this.$dialog.close()
            this.initData()
          }
        })
      },
      createAprocess(){
        this.$dialog.OpenWindow({
          width: '1050',
          height: '700',
          url:'/workOrderProcessForm?goOutType=1'+'&ownerID='+this.ownerID+'&flowPathID='+this.flowPathID+'&index='+(this.index+1),
          title:'创建工序流程',
          closeCallBack:(data) =>{
            this.$dialog.close()
            // this.initData()
          }
        })
      },
      skip(){
        this.ajaxJson({
          url: '/fix/fixProcess/update',
          data: {
            stage:'4',
            id:this.flowPathID,//主流程表ID
            ownerID:this.ownerID,//工单ID
          },
          call: (data)=>{
            if (data.type === 0) {
              this.$dialog.alert({
                tipValue: data.message,
                closeCallBack: () => {
                  this.$dialog.close()
                }
              })
            } else {
              this.$dialog.alert({
                alertImg: 'error',
                tipValue: data.message,
                closeCallBack: () => {
                }
              })
            }
          }
        })
      },
      stockOutEvent(){
        this.params = []
        let item = {}
        for (let j=0; j<this.content.length; j++) {
          for(let k=0; k<this.checkedList.length; k++){
            item = this.content[j]
            if(this.content[j].id==this.checkedList[k]){
              if(item.splitVal=='0'?(Number(item.mdo)<=0?false:true):(Number(item.quantity<=0)?false:true)){
                this.params.push(this.content[j])
              }
            }
          }
        }
        if(this.params.length!=0){
          this.$dialog.confirm({
            width: 300,
            tipValue: '是否提交出库?',
            alertImg: 'warn',
            okCallBack: (data)=>{
              this.ajaxJson({
                url: '/fix/stock/stockOut',
                // loading:'0',
                data:{
                  id:this.flowPathID,
                  list:this.params
                },
                call: (data) => {
                  this.$dialog.setReturnValue(this.id)
                  if(data.type=='0'){
                    this.$dialog.alert({
                      width:'350',
                      alertImg: 'ok',
                      tipValue: '出库成功,请联系库存管理员出库',
                      closeCallBack: () => {
                        // this.$dialog.close()
                        this.initData()
                      }
                    })
                  }
                  // this.ajaxJson({
                  //   url: '/stock/stockout/updateToStockout',
                  //   data: {
                  //     id:data.id,
                  //     state:2
                  //   },
                  //   call: (datas) => {
                  //     if(datas.type=='0'){
                  //       this.$dialog.alert({
                  //         width:'350',
                  //         alertImg: 'ok',
                  //         tipValue: '出库成功,请联系库存管理员出库',
                  //         closeCallBack: () => {
                  //           // this.$dialog.close()
                  //           this.initData()
                  //         }
                  //       })
                  //     }
                  //   }
                  // })

                }
              })
            }
          })
        }else{
          this.$dialog.alert({
            tipValue:'最少要选择一条进行出库',
            alertImg:'warn',
            width:'300'
          })
        }
      },
      checkCall(){
        if(!this.allChecked){
          let item = {}
          for (let j=0; j<this.content.length; j++) {
            item = this.content[j]
            if(item.splitVal=='0'?(Number(item.mdo)<=0?false:true):(Number(item.quantity<=0)?false:true)){
              this.checkedList.push(this.content[j].id)
            }
          }
        }else{
          this.checkedList = []
        }
        this.allChecked=!this.allChecked
        this.params = []
        // let arr = []
        // for(let i=0; i<this.selectValue.length; i++){
        //   arr.push(this.selectValue[i])
        // }
        // for (let j=0; j<this.content.length; j++) {
        //   for(let k=0; k<this.checkedList.length; k++){
        //     if(this.content[j].id==this.checkedList[k]){
        //       this.params.push(this.content[j])
        //     }
        //   }
        // }
      },
      listPage(){
        let list = this.content.concat()
        this.pager.total=this.content.length
        this.pager.pageSize=10
        let a=(this.pager.pageIndex-1)*this.pager.pageSize
        let arr=[]
        arr=list.splice(a,this.pager.pageSize)
        this.listPages=arr
      },
      initData () {
        let ownerID = []
        let id = ''
        this.ajaxJson({
          url: '/fix/fixOrderMaterial/initForm',
          data: {
            ownerID:this.ownerID,
          },
          call: (datas) => {
            this.applicableModelsList = datas.applicableModelsPsd.list
            this.categoryList = datas.categoryPsd.list
            this.ajaxJson({
              url: '/fix/stock/stockQueryForNum',
              data: {
                ownerID:this.ownerID,
              },
              call: (da) => {
                for(let i in da){
                  ownerID.push(da[i].id)
                }
                this.content = da

                for(let j in this.content){
                  if(this.content[j].splitVal=='0'){
                    this.content[j].num = this.content[j].mdo
                  }else{
                    this.content[j].num = this.content[j].quantity
                  }
                }
                id = ownerID.join(',')
                this.listPage()
                let params = {
                  ids:id,
                }
                this.ajaxJson({
                  url: '/fix/stock/getList',
                  data: params,
                  call: (data) => {
                    if(data){

                      // if(data.content.length!=0){
                      //   this.$dialog.setReturnValue('111111111111111111') //向父级页面id值
                      // }

                    }
                  }
                })
              }
            })

          }
        })

      }
    },
    created () {
      this.setQuery2Value('ownerID')//工单ID
      this.setQuery2Value('flowPathID')//主流程表ID
      this.setQuery2Value('index')//节点索引值
      this.setQuery2Value('inTheEnd')//是否为最后一个节点
      this.setQuery2Value('upDateStateID')//节点ID更新当前节点状态
      if(this.index!=0&&this.index!=undefined){
        let params = {
          id:this.upDateStateID,
          ownerID:this.flowPathID,
          state:'1'
        }
        this.ajaxJson({
          url: '/fix/fixProcessDetail/confirm',
          data: params,
          call: (datas) => {

          }
        })
      }
      this.initData()
    }
  }
</script>

<style scoped>
.select{
  display: flex;
  justify-content: center;
  align-items: center;
  cursor:no-drop;
  background-image: url("../../../static/css/images/workOrderImg/jinxuan.png");
  background-repeat:no-repeat;
  background-position:center;
}

.inputClass:nth-child(odd){
  background-color: #bfbfbf;
  color: #ff3333;
}
.inputClass:nth-child(even){

}
.checkbox{
  width: 38px;
  height: 34px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.checkbox input[type=checkbox] {
  width: 20px;
  height: 20px;
  cursor: pointer;
}
</style>
