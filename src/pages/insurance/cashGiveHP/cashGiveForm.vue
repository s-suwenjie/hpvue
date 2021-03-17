<template>
  <div class="f_main">
    <yhm-formbody>
      <template #title>基本信息</template>
      <template #control>
        <yhm-form-select title="保险公司" @repeatverify="unitVerifyEvent" ref="unit" @click="selectUnit" :value="unit"  id="unit" rule="R0000"></yhm-form-select>
      </template>
    </yhm-formbody>
    <div class="f_split"></div>
    <yhm-form-list-edit>
      <template #title>
        <span>保险公司给HP返利</span>
        <span style="font-size: 18px;color: red;margin-left: 40px;">☠</span>
        <span style="font-size: 12px;color: red;">(如有新的返利政策请点击右边添加按钮,请勿删除之前记录)</span>
      </template>
      <template #operate>
        <yhm-commonbutton value="添加" icon="btnAdd" @call="add()"></yhm-commonbutton>
      </template>
      <template #listHead>
<!--        <yhm-managerth style="width: 38px" title="查看"></yhm-managerth>-->
        <yhm-managerth style="width: 130px" title="启用时间"></yhm-managerth>
        <yhm-managerth style="width: 80px" title="保险公司返利"></yhm-managerth>
        <yhm-managerth style="width: 100px" title="三方服务费返利"></yhm-managerth>
        <yhm-managerth style="width: 100px" title="交强险返利"></yhm-managerth>
        <yhm-managerth style="width: 38px" title="删除"></yhm-managerth>
      </template>
      <template #listBody >
        <tr v-for="(item,index) in saveList" :key="index" :class="{InterlacBg:index%2!==0}" >
<!--          <yhm-manager-td-look class="solidYhm"   @click="listView(item)"></yhm-manager-td-look>-->
          <yhm-manager-td-date class="solidYhm" :value="item.time" typeof="data"></yhm-manager-td-date>
          <yhm-manager-td-center class="solidYhm"  :value="item.commercialOne"></yhm-manager-td-center>
          <yhm-manager-td-center  class="solidYhm" :value="item.commercialTwo" ></yhm-manager-td-center>
          <yhm-manager-td-center  class="solidYhm" :value="item.toPayHigh" ></yhm-manager-td-center>
          <yhm-manager-td-operate class="solidYhm">
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
<!--        <yhm-commonbutton value="保存" icon="btnSave" :flicker="true" @call="save()"></yhm-commonbutton>-->
      </template>
    </yhm-formoperate>
  </div>
</template>

<script>
  import { formmixin } from '@/assets/form.js'
  export default {
    name: 'cashGiveForm',
    mixins: [formmixin],
    data(){
      return {
        empty:true,
        id:'',
        unitID:'',            //保险公司ID
        unit:'',              //保险公司
        time:'',
        commercialOne:'',
        commercialTwo:'',
        toPayHigh:'',
        ownerID:'',
        saveList:[],
      }
    },
    methods : {
      //重复验证,基于控件操作的验证
      unitVerifyEvent(){
        this.ajaxJson({
          url:"/Insurance/isExistCashGiveByUnit",
          data:{
            id:this.id,
            unitID:this.unitID,

          },
          loading:"0",
          call:(data) =>{
            if(data.type === 0){//说明存在，调用控件验证显示规则
              this.$refs.unit.errorEvent("所选保险公司重复")
            }
          }
        })
      },
      async isNameVerifyEvent(){
        let result = await this.ajaxAsync({
          url:"/Insurance/isExistCashGiveByUnit",
          data:{
            id:this.id,
            unitID:this.unitID,

          },
          loading:"0"
        })
        if(result.type === 0){//说明存在，调用控件验证显示规则
          console.log( this.$refs.unit )

          this.$refs.unit.errorEvent("所选保险公司重复")
          return false
        }
        return true
      },
      del(item){
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
              url: '/Insurance/CashGiveDel',
              data: params,
              call: (data) => {
                if (data.type == '0') {
                  this.$dialog.alert({
                    tipValue: data.message,
                    closeCallBack: (data) => {
                      let param = {
                        id:this.id
                      }
                      this.ajaxJson({
                        url: '/Insurance/initCashGiveHPForm',
                        data:param,
                        call:(data) => {
                          this.id=data.id
                          this.unit=data.unit
                          this.unitID=data.unitID
                          this.saveList=data.details
                          if (data.details.length>0){
                            this.empty=false
                          }else {
                            this.empty=true
                          }
                        }
                      })
                      this.$dialog.setReturnValue(data)
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
          }
        })
      },
      listView(item){
          this.$dialog.OpenWindow({
            width: '1050',
            height: '620',
            title: '添加保险公司返利公式',
            url: '/cashGiveHPForm?id=' + item.id,
            closeCallBack: (dataTwo) => {
              if (dataTwo) {
                this.id = dataTwo.ownerID
                this.empty = false
                let param = {
                  id: dataTwo.ownerID
                }
                this.ajaxJson({
                  url: '/Insurance/initCashGiveHPForm',
                  data: param,
                  call: (data) => {
                    this.id = data.id
                    this.unit = data.unit
                    this.unitID = data.unitID
                    this.saveList = data.details
                    if (data.details.length > 0) {
                      this.empty = false
                    } else {
                      this.empty = true
                    }
                  }
                })
                this.$dialog.setReturnValue(dataTwo)

              }
            }
          })

      },
      async add(){
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
          let a = await this.isNameVerifyEvent()
          let b = this.validator()
          if(a && b) {
            this.$dialog.OpenWindow({
              width: '1100',
              height: '650',
              title: '添加保险信息',
              url: '/cashGiveHPForm?ownerID=' + this.id + '&unitID=' + this.unitID,
              closeCallBack: (data) => {
                if (data) {
                  this.id = data.ownerID
                  this.empty = false
                  let param = {
                    id: data.ownerID
                  }
                  this.ajaxJson({
                    url: '/Insurance/initCashGiveHPForm',
                    data: param,
                    call: (data) => {
                      this.id = data.id
                      this.unit = data.unit
                      this.unitID = data.unitID
                      this.saveList = data.details
                      if (data.details.length > 0) {
                        this.empty = false
                      } else {
                        this.empty = true
                      }
                    }
                  })
                  this.$dialog.setReturnValue(data)

                }
              }
            })
          }
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
      initPage(){
        let params = {
          id: this.id,
        }
        this.init({
          url: '/Insurance/initCashGiveHPForm',
          date:params,
          all: (data) => {

          },
          add: (data) => {
            /* 需要添加的数据 */
          },
          look: (data) => {
            /* 需要查看的数据 */
            this.id=data.id
            this.unit=data.unit
            this.unitID=data.unitID
            this.saveList=data.details
            if (data.details.length>0){
              this.empty=false
            }else {
              this.empty=true
            }
          }
        })

      },
    },
    created () {
      this.init({
        url: '/Insurance/initCashGiveHPForm',
        all: (data) => {

        },
        add: (data) => {
          /* 需要添加的数据 */
        },
        look: (data) => {
          /* 需要查看的数据 */
          this.id=data.id
          this.unit=data.unit
          this.unitID=data.unitID
          this.saveList=data.details
          if (data.details.length>0){
            this.empty=false
          }else {
            this.empty=true
          }
        }
      })
    }
  }
</script>

<style scoped>
  .solidYhm{
    border: 1px solid #ccc;
  }
</style>
