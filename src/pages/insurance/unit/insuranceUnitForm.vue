<template>
  <div class="f_main">
    <yhm-formbody>
      <template #title>基本信息</template>
      <template #control>
        <yhm-form-text title="别名" :value="shortName" id="shortName" rule="R0000"></yhm-form-text>
        <yhm-form-text title="代表颜色" :value="deputyColor" id="deputyColor"></yhm-form-text>
        <yhm-form-select title="汇款公司" @clear="clearUnit" @click="selectUnit" :value="unit"  id="unit" rule="R0000"></yhm-form-select>
        <yhm-form-select title="回款公司" subtitle=""  @click="selectIncomeUnit" :value="incomeUnit"  id="incomeUnit" rule="R0000"></yhm-form-select>
        <yhm-form-select title="第三方" subtitle="回款公司"  @click="selectTripartiteUnit" :value="tripartiteUnit"  id="tripartiteUnit" rule="R0000"></yhm-form-select>
        <yhm-form-radio  title="公司用途"   :select-list="categoryList" :value="category" id="category"></yhm-form-radio>
        <yhm-form-radio  title="开票状态"  width="1" :select-list="billingTypeList" :value="billingType" id="billingType"></yhm-form-radio>
        <yhm-form-select-insurance title="商业险种" :psd="commercialList" :value="commercial"  id="commercial" rule="#"></yhm-form-select-insurance>
      </template>
    </yhm-formbody>
    <div class="f_split"></div>

    <yhm-form-list-edit v-if="false">
      <template #title>保险信息</template>
      <template #operate>
        <yhm-commonbutton value="添加保险信息" icon="btnAdd" @call="addSafe()"></yhm-commonbutton>
      </template>
      <template #listHead>
        <yhm-managerth style="width: 38px" title="查看"></yhm-managerth>
        <yhm-managerth style="width: 130px" title="启用时间"></yhm-managerth>
        <yhm-managerth style="width: 80px" title="客户新车费率"></yhm-managerth>
<!--        <yhm-managerth style="width: 100px" title="旧车税率"></yhm-managerth>-->
        <yhm-managerth style="width: 100px" title="客户费率"></yhm-managerth>
        <yhm-managerth style="width: 100px" title="特殊车型税率"></yhm-managerth>


        <yhm-managerth style="width: 38px" title="删除"></yhm-managerth>
      </template>
      <template #listBody >
        <tr v-for="(item,index) in saveList" :key="index" :class="{InterlacBg:index%2!==0}" >
          <yhm-manager-td-look class="aa"   @click="opSafe(item)"></yhm-manager-td-look>
          <yhm-manager-td-date class="aa" :value="item.startDate" typeof="data"></yhm-manager-td-date>
          <yhm-manager-td-rgt class="aa"  :value="item.newRate+'  %'"></yhm-manager-td-rgt>
<!--          <yhm-manager-td-rgt class="aa" :value="item.oldRate+'  %'" ></yhm-manager-td-rgt>-->
          <yhm-manager-td-rgt  class="aa" :value="item.clientRate+'  %'" ></yhm-manager-td-rgt>
          <yhm-manager-td-rgt  class="aa" :value="item.vipRate+'  %'" ></yhm-manager-td-rgt>
       <yhm-manager-td-operate class="aa">
            <yhm-manager-td-operate-button @click="del(item)" value="删除" icon="delete" color="#FF0000"></yhm-manager-td-operate-button>
          </yhm-manager-td-operate>
        </tr>
      </template>
      <template #empty>
        <span class="m_listNoData" v-show="empty">暂时没有数据</span>
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
  import { formmixin } from '@/assets/form.js'
  export default {
    name: 'insuranceUnitForm',
    mixins: [formmixin],
    data(){
      return {
        empty:true,
        isNum:'1',
        shortName:'',         //别名
        deputyColor:'',       //代表颜色
        unitID:'',            //保险公司ID
        unit:'',              //保险公司
        safeID:'',
        startDate:'',
        newRate:'',
        oldRate:'',
        clientRate:'',
        saveList: [],  //商业险种
        commercial:[],
        commercialList:[],
        commercialVal:'',
        billingTypeList:[], //开票类型
        billingType:'',
        categoryList:[],
        category:'',
        vipRate:'',
        incomeUnit:'',
        incomeUnitID:'',
        tripartiteUnit:'',
        tripartiteUnitID:'',
      }
    },
    methods : {

     opSafe(item){
        this.$dialog.OpenWindow({
          width: '1100',
          height: '650',
          title: '查看保险信息',
          url: '/insuranceUnitDetailsForm?ownerID=' + this.id +'&id='+item.id,
          closeCallBack: (data)=> {
            if (data) {
              this.$dialog.setReturnValue(this.id)
              let params = {
                id: item.id,
              }
              this.ajaxJson({
                url: '/Basic/getByUnitInsuranceAll',
                data: params,
                call: (data) => {
                  item.id=data.id
                  item.startDate=data.startDate
                  item.newRate=data.newRate
                  item.oldRate=data.oldRate
                  item.clientRate=data.clientRate
                  item.vipRate=data.vipRate
                }
              })
            }
          }
        })
      },
      selectTripartiteUnit(){
        this.$dialog.OpenWindow({
          width: '950',
          height: '700',
          url: '/selectUnit?category=1&categoryBefore=1',
          title: '选择第三方回款公司',
          closeCallBack: (data) => {
            if (data) {
              this.tripartiteUnitID = data.id
              this.tripartiteUnit = data.name
            }
          }
        })
      },
      selectIncomeUnit(){
        this.$dialog.OpenWindow({
          width: '950',
          height: '700',
          url: '/selectUnit?category=1&categoryBefore=1',
          title: '选择保险公司',
          closeCallBack: (data) => {
            if (data) {
              this.incomeUnitID = data.id
              this.incomeUnit = data.name
            }
          }
        })
      },
      addSafe(){
        if (this.unitID ===''){
          this.$dialog.confirm({
            width: 300,
            tipValue: '请先选择保险公司',
            btnValueOk: '确定',
            alertImg: 'warn',
            okCallBack: (data) => {
              this.selectUnit()
            }
          })
        }else{
          this.$dialog.OpenWindow({
            width: '1100',
            height: '650',
            title: '添加保险信息',
            url: '/insuranceUnitDetailsForm?ownerID=' + this.id +'&unitID='+this.unitID+ '&shortName='+this.shortName,
            closeCallBack: (data)=> {
              if (data) {
                this.empty = false
                this.saveList.push({
                  id:data.id,
                  startDate: data.startDate,
                  newRate:data.newRate,
                  oldRate:data.oldRate,
                  clientRate:data.clientRate,
                  vipRate:data.vipRate
                })
                this.$dialog.setReturnValue(data)

              }
            }
          })
        }
      },
      //添加
      save () {
        if (this.validator()) {
          // if (this.empty){
          if (false){
            this.$dialog.confirm({
              width: 300,
              tipValue: '请添加保险信息?',
              btnValueOk: '确定',
              alertImg: 'warn',

            })
          }else {
            let params = {
              id: this.id,
              unitID:this.unitID,
              incomeUnitID:this.incomeUnitID,
              tripartiteUnitID:this.tripartiteUnitID,
              shortName:this.shortName,
              deputyColor:this.deputyColor,
              commercial:this.commercial,
              billingType:this.billingType,
              category:this.category,
            }
            this.ajaxJson({
              url: '/Basic/saveUnitInsurance',
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
        }
      },

      del(item) {
        if (item.startDate === '') {
          this.$dialog.confirm({
            width: 300,
            tipValue: '此条数据不能删除?',
            btnValueOk: '确定',
            alertImg: 'warn',
          })
        } else {
        this.$dialog.confirm({
          width: 300,
          tipValue: '是否删除?',
          btnValueOk: '确定',
          alertImg: 'warn',
          okCallBack: (data) => {
            let params = {
              id: item.id,
            }
            this.ajaxJson({
              url: '/Basic/delUnitInsuranceDetails',
              data: params,
              call: (data) => {
                if (data.type === 0) {
                  this.$dialog.alert({
                    tipValue: data.message,
                    closeCallBack: (data) => {
                      this.$dialog.setReturnValue("删除成功")
                      this.saveList.splice(this.saveList.indexOf(item), 1)
                    }
                  })
                } else if (data.type === 1) {
                  this.$dialog.alert({
                    alertImg: 'warn',
                    tipValue: data.message
                  })
                }
              }
            })
          }
        })
      }
      },
      //选择保险公司
      selectUnit(){
        this.$dialog.OpenWindow({
          width: '950',
          height: '700',
          url: '/selectUnit?category=1&categoryBefore=1',
          title: '选择保险公司',
          closeCallBack: (data) => {
            if (data) {
              this.unitID = data.id
              this.unit = data.name
            }
          }
        })
      },
      //清空保险公司信息
      clearUnit(){
        this.unitID = ''
        this.unit = ''
      }
    },
    created () {
      this.setQuery2Value('workOrder')//从工单模块的管理保险公司跳转进来的

      this.init({
        url: '/Basic/getUnitInsurance',
        all: (data) => {
          this.commercialList = data.commercialPsd.list
          this.commercial = data.commercialPsd.value
          this.billingTypeList=data.billingTypePsd.list
          this.billingType=data.billingTypePsd.value
          this.categoryList=data.categoryPsd.list
          this.category=data.categoryPsd.value
          if(this.workOrder=='1'){//从工单模块的管理保险公司跳转进来的,将公司用途改为其它模块
            this.category = '1'
          }
        },
        add: (data) => {
          /* 需要添加的数据 */
        },
        look: (data) => {
          /* 需要查看的数据 */
          this.shortName=data.shortName
          this.deputyColor=data.deputyColor
          this.unitID=data.unitID
          this.unit=data.unit
          this.incomeUnitID=data.incomeUnitID
          this.incomeUnit=data.incomeUnit
          this.tripartiteUnitID=data.tripartiteUnitID
          this.tripartiteUnit=data.tripartiteUnit
          this.saveList=data.details
          if (this.saveList.length === '0'){
            this.empty=true
            //true显示
          }else {
            this.empty=false
            //false不显示
          }
        }
      })
    }
  }
</script>

<style scoped>
.aa{
  border: 1px solid #ccc;
}
</style>
