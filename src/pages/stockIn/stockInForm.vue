<template>
  <div class="f_main">
    <yhm-formbody>
      <template #title>基本信息</template>
      <template #control>
        <yhm-form-radio title="商品类型" :no-edit="categoryNoEdit" :select-list="categoryList" @call="motorcycleTypeRadio" :value="category" id="category"></yhm-form-radio>
        <yhm-form-text title="入库编号" no-edit="1" :value="code" id="code"></yhm-form-text>
        <yhm-form-radio title="适用车型" width="1" :no-edit="modelsNoEdit" @call="motorcycleTypeRadio" :select-list="applicableModelsList" :value="applicableModels" id="applicableModels"></yhm-form-radio>
        <yhm-form-date title="入库日期" :max="maxWorkDate" :value="workDate" id="workDate" @call="motorcycleTypeRadio" :no-edit="categoryNoEdit" rule="R0000" ></yhm-form-date>
        <yhm-form-select title="入库人员" @click="selectWareHouser" @clear="clearWareHouser()" :value="wareHouser" id="wareHouser" :no-edit="categoryNoEdit" rule="R0000"></yhm-form-select>
      </template>
    </yhm-formbody>
    <yhm-form-list-show style="margin-top: 20px;" v-show="detailsShow">
      <template #title>入库详情</template>
      <template #operate>
        <yhm-commonbutton value="添加" v-show="state=='0'?true:false" icon="btnAdd" @call="addDetail()" category="three"></yhm-commonbutton>
      </template>
      <template #listHead>
        <yhm-managerth style="width: 38px" title="查看"></yhm-managerth>
        <yhm-managerth title="商品名称"></yhm-managerth>
        <yhm-managerth title="规格型号"></yhm-managerth>
        <yhm-managerth style="width: 120px" title="数量"></yhm-managerth>
        <yhm-managerth style="width: 120px" title="拆分数量"></yhm-managerth>
        <yhm-managerth title="单价"></yhm-managerth>
        <yhm-managerth style="width: 120px;" title="总价"></yhm-managerth>
        <yhm-managerth style="width: 80px;" title="含税单价"></yhm-managerth>
        <yhm-managerth style="width: 120px;" title="含税总价"></yhm-managerth>
        <yhm-managerth style="width: 38px;" title="删除"></yhm-managerth>
      </template>
      <template #listBody>
        <tr v-for="(item,index) in detailList" :class="[{InterlacBg:index%2!=0}]" :key="item.id">
          <yhm-manager-td-look @click="listView(item)"></yhm-manager-td-look>
          <yhm-manager-td :value="item.product"></yhm-manager-td>
          <yhm-manager-td :value="item.model"></yhm-manager-td>
          <yhm-manager-td-rgt :value="item.quantity+item.uuStr"></yhm-manager-td-rgt>
          <yhm-manager-td-rgt :value="item.mdo+item.mdoStr"></yhm-manager-td-rgt>
          <yhm-manager-td-money :value="item.price+''"></yhm-manager-td-money>
          <yhm-manager-td-money :value="item.totalPrice+''"></yhm-manager-td-money>
          <yhm-manager-td-money :value="item.priceTax+''"></yhm-manager-td-money>
          <yhm-manager-td-money :value="item.totalPriceTax+''"></yhm-manager-td-money>

          <yhm-manager-td-operate>
            <yhm-manager-td-operate-delete :no-click="state!=='0'?true:false" @click="delFromList(item.id)"></yhm-manager-td-operate-delete>
          </yhm-manager-td-operate>
        </tr>
      </template>
      <template #empty>
        <span class="m_listNoData" v-show="empty">暂时没有数据</span>
      </template>

    </yhm-form-list-show>
    <yhm-formoperate :createName="createName" :insertDate="insertDate" :updateName="updateName" :updateDate="updateDate">
      <template #btn>
        <yhm-commonbutton value="保存" icon="btnSave" :flicker="true" @call="save()"></yhm-commonbutton>
        <yhm-commonbutton value="提交申请" icon="btnSave" @call="printFund(idm,state)" v-show="!empty"></yhm-commonbutton>
      </template>
    </yhm-formoperate>
  </div>
</template>

<script>
  import { accMul, accAdd, guid, formatDate,formatTime } from '@/assets/common.js'
  import { formmixin } from '@/assets/form.js'
  export default {
    name: 'stockInForm',
    mixins: [formmixin],
    data () {
      return {
        show:'false',
        quantity:'10',//数量
        price:'123',//单价
        category: '',
        categoryList: [],
        applicableModels:'',
        applicableModelsList:[],
        maxWorkDate:'',
        workDate:'',            //入库日期
        wareHouserId:'',        //入库人ID
        wareHouser:'',          //入库人员
        code:'',                //入库编号
        state:'',
        detail: [], // 列表数据
        detailsShow:false,//入库详情显示隐藏
        detailList:[],//入库详情列表
        empty:false,
        categoryNoEdit:false,
        modelsNoEdit:false,
        idm:'',
        cid:'',
        aid:'',
      }
    },
    methods:{
      //console
      //from内保存
      printFund(idm,state){
        let tipValue = ''
        if(state=='1'){
          tipValue = '是否提交申请?'
        }else{
          tipValue = '是否入库?'
        }
        let params = {
          id:idm,
          state:1,
        }
        this.$dialog.confirm({
          width: 300,
          tipValue: tipValue,
          alertImg: 'warn',
          okCallBack: (data)=>{
            this.ajaxJson({
              url: '/stock/stockIn/updateForState',
              data: params,
              call: (data) => {
                if (data.type === 0) {
                  this.$dialog.setReturnValue(this.id)
                  this.$dialog.alert({
                    alertImg: 'ok',
                    tipValue: data.message,
                    closeCallBack: () => {
                      this.$dialog.close()
                      // this.initData()

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
        })
      },
      motorcycleTypeRadio(){
        let params = {}
        if(this.type=='1'){
          params = {
            category:this. category,
            applicableModels:this.applicableModels,
            workDate:this.workDate
          }
        }else{
          params = {
            category:this. category,
            applicableModels:this.applicableModels,
            workDate:this.workDate,
            id:this.id
          }
        }

        this.ajaxJson({
          url: '/stock/stockIn/initFormCode',
          data: params,
          call: (data) => {
            this.code = data.message

          }
        })
      },
      //删除入库详情
      delFromList(id){
        let params = {
          id:id
        }
        this.$dialog.confirm({
          width: 300,
          tipValue: '是否删除?',
          alertImg: 'warn',
          okCallBack: (data)=>{
            this.ajaxJson({
              url: '/stock/stockInDetail/delete',
              data: params,
              call: (data) => {
                if (data.type === 0) {
                  this.$dialog.setReturnValue(this.id)
                  this.$dialog.alert({
                    alertImg: 'ok',
                    tipValue: data.message,
                    closeCallBack: () => {
                      // this.$dialog.close()
                      this.initData()
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
        })
      },
      //查看商品详情
      listView(item){
        this.$dialog.OpenWindow({
          width: 1050,
          height: 610,
          url: '/stockInDetailForm?id='+item.id+'&ownerID='+this.id+'&cid='+this.cid +'&aid='+this.aid,
          title: '查看入库详情',
          closeCallBack: (data) => {
            if(data){
              this.initData()
            }
          }
        })
      },
      addDetail () {
        this.$dialog.OpenWindow({
          width: 1050,
          height: 610,
          url: '/stockInDetailForm?type=1&ownerID='+this.id+'&cid='+this.cid +'&aid='+this.aid,
          title: '添加入库详情',
          closeCallBack: (data) => {
            if(data){
              this.initData()
              this.$dialog.setReturnValue(this.id)

            }

          }
        })
      },
      //选择入库人员
      selectWareHouser(){
        this.$dialog.OpenWindow({
          width: 950,
          height: 692,
          url: "/selectPerson?category=0&categoryBefore=1",
          title: "选择入库人员",
          closeCallBack: (data) => {
            this.wareHouser = data.name
            this.wareHouserId = data.id
          }
        })
      },
      save(type){
        let a = this.validator()
        if(a){
          let params = {
            id: this.id,
            applicableModels: this.applicableModels,   //单位名称
            category: this.category,
            workDate: this.workDate,
            wareHouserId: this.wareHouserId,
            // wareHouser: this.wareHouser,
            code: this.code,
            state: this.state,
          }
          this.cid=this.category
          this.aid=this.applicableModels
          this.idm=params.id
          this.ajaxJson({
            url: '/stock/stockIn/save',
            data: params,
            call: (data) => {
              if (data.type === 0) {
                this.$dialog.setReturnValue(this.id)
                this.$dialog.alert({
                  alertImg: 'ok',
                  tipValue: data.message,
                  closeCallBack: () => {
                    this.detailsShow = true
                    this.categoryNoEdit = true
                    this.type = '2'
                    // this.$dialog.close()
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
      },
      initData(){
          let params = {}
          if(this.type=='1'){//为1时是从添加跳转进来的
            this.detailsShow = false
          }else{
            this.detailsShow = true
            this.categoryNoEdit = true
            params = {
              id:this.id
            }
            this.idm=params.id
          }
          this.init({
            url: '/stock/stockIn/initForm',
            data:params,
            all: (data)=>{
              this.detailList = data.detailList
              this.categoryList = data.categoryPsd.list
              this.category = data.categoryPsd.value
              this.applicableModelsList = data.applicableModelsPsd.list
              this.applicableModels = data.applicableModelsPsd.value
              this.code = data.code
              this.workDate = data.workDate
              this.wareHouserId = data.wareHouserId
              this.wareHouser = data.wareHouser
              this.state = data.state
              if(data.detailList!=null&&this.detailList.length!=0){
                this.empty = false
                this.modelsNoEdit = true
              }else{
                this.empty = true
                this.modelsNoEdit = false
              }
              for(let i in this.detailList){
                if(this.detailList[i].mdo == '0'){
                  this.detailList[i].mdoStr =''
                }
              }


            },
            add: (data)=>{
              this.wareHouser = sessionStorage.getItem('____currentUser')
              this.wareHouserId = sessionStorage.getItem('____currentUserID')
              this.workDate = formatDate(new Date())
              this.maxWorkDate = this.workDate
            },
            look: (data)=>{
              this.name = data.name
            }
          })
      }

    },
    clearWareHouser(){
      this.wareHouserId = ""
    },
    created () {
      this.setQuery2Value('type')
      this.setQuery2Value('id')
      this.initData()
    }
  }
</script>

<style scoped>

</style>
