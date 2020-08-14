<template>
    <div class="f_main">
      <yhm-formbody>
        <template #title>基本信息</template>
        <template #control>
          <yhm-form-select title="工序服务" @click="selectProduct" :value="name" id="name" rule="R0000" ref="pros"></yhm-form-select>
          <yhm-form-text title="变化金额" before-icon="rmb" tip="money" :value="money" id="money"></yhm-form-text>
          <yhm-form-date title="发生日期" :max="currentDate" :max-year="Number(currentDate.slice(0,4))" :value="workDate" id="workDate" rule="R0000"></yhm-form-date>
          <yhm-form-radio title="状态" :select-list="stateList" :value="state" id="state"></yhm-form-radio>

          <yhm-form-textarea title="备注" :value="remark" id="remark"></yhm-form-textarea>
        </template>
      </yhm-formbody>

      <yhm-formoperate :createName="createName" :insertDate="insertDate" :updateName="updateName" :updateDate="updateDate">
        <template #btn>
          <yhm-commonbutton value="保存" icon="btnSave" :flicker="true" @call="save()"></yhm-commonbutton>
        </template>
      </yhm-formoperate>
    </div>
</template>

<script>
  import { formmixin } from '@/assets/form.js'
  import { accMul, accAdd, guid, formatDate, formatTime } from '@/assets/common.js'
  export default {
    name: 'workOrderAddDetailsForm',
    mixins: [formmixin],
    data(){
      return{
        currentDate: formatDate(new Date()),//当前日期
        workDate:formatDate(new Date()),//发生日期
        model:'',//规格型号
        modelid:'',//规格型号ID
        // product:'',//商品类型
        productid:'',//商品类型ID
        name:'',//商品名称
        money:'',//变化金额
        remark:'',//备注
        category:'0',//商品类型
        state:'0',//工作类型
        direction:'0',//收支方向
        directionList:[
          {
            code: "",
            img: "",
            num: "0",
            showName: "收入"
          },
          {
            code: "",
            img: "",
            num: "1",
            showName: "支出"
          },
        ],
        stateList:[
          // {
          //   code: "",
          //   img: "",
          //   num: "0",
          //   showName: "工作"
          // },
          // {
          //   code: "",
          //   img: "",
          //   num: "1",
          //   showName: "检修"
          // },
        ],
        categoryList:[
          {
            code: "",
            img: "",
            num: "0",
            showName: "预计金额"
          },
          {
            code: "",
            img: "",
            num: "1",
            showName: "实际金额"
          },
        ]
        // categoryList:{
        //   list:[
        //     {
        //       code: "#2F54EB",
        //       img: "JP",
        //       num: "0",
        //       showName: "精品"
        //     },
        //     {
        //       code: "#FD6802",
        //       img: "LJ",
        //       num: "1",
        //       showName: "零部件"
        //     },
        //     {
        //       code: "#2C920B",
        //       img: "ZC",
        //       num: "2",
        //       showName: "整车"
        //     },
        //     {
        //       code: "#FF0000",
        //       img: "XZ",
        //       num: "3",
        //       showName: "行政"
        //     }
        //   ],
        //   value:''
        // }
      }
    },
    methods:{
      save(){
        let params = {
          ownerID:this.orderid,
          id: this.id,
          orderid:this.ownerID,
          workDate:this.workDate,//发生日期
          model:this.model,//规格型号
          modelid:this.modelid,//规格型号ID
          // product:this.product,//商品类型
          productid:this.productid,//商品类型ID
          processid:this.flowPathID,//主流程ID
          name:this.name,//商品名称
          money:this.money,//变化金额
          remark:this.remark,//备注
          category:this.category,//商品类型
          state:this.state,//工作类型
          stateStr:0,//完成状态
          direction:this.direction,//收支方向
        }
        this.ajaxJson({
          url: '/fix/fixOrderRevenue/save',
          data: params,
          call: (data)=>{
            if (data.type === 0) {
              let paramss = {
                id:guid(),
                ownerID:this.ownerID,
                stage:0,
                orderStr:'2',
                dependid:this.id,
              }
              this.ajaxJson({
                url: '/fix/fixProcessDetail/save',
                data: paramss,
                loading:'0',
                call: (parameters) => {
                }
              })
              this.$dialog.setReturnValue(this.id) //向父级页面id值
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
      //选择商品型号
      selectModel(){
        if(this.name!=''){
          this.$dialog.OpenWindow({
            width: 950,
            height: 603,
            url: '/selectProductModel?ownerID='+this.productid,
            title: '选择商品规格型号信息',
            closeCallBack: (data) => {
              console.log( data )
              if (data) {
                this.modelid = data.id
                this.model = data.name
                this.money = data.price
              }
            }
          })
        }else{
          this.$refs.pros.errorEvent("请先选择商品")
        }
      },
      //选择商品类型
      selectProduct() {
        this.$dialog.OpenWindow({
          width: 950,
          height: 603,
          url: '/selectService',
          title: '选择工序服务',
          closeCallBack: (data) => {
            if (data) {
              this.productid = data.id
              this.name = data.proName
            }
          }
        })
      },
      initData () {
        let params = {
          id:this.id,
        }
        this.ajaxJson({
          url: '/fix/fixOrderRevenue/initForm',
          data: params,
          call: (data) => {
            if(data){
               this.workDate = data.workDate//发生日期
               this.model = data.model//规格型号
               this.modelid = data.modelid//规格型号ID
               // this.product = data.product//商品类型
               this.productid = data.productid//商品类型ID
               this.name = data.name//项目名称
               this.money = data.money//变化金额
               this.remark = data.remark//备注
               this.category = data.category//商品类型
               this.state = String(data.state)//工作类型
               this.stateList = data.statePsd.list//工作类型
               this.direction = data.direction//收支方向
            }
          }
        })
      }
    },
    created () {
      this.setQuery2Value('id')
      this.setQuery2Value('ownerID')//工单id
      this.setQuery2Value('orderid')
      this.setQuery2Value('cid')
      this.setQuery2Value('aid')
      this.setQuery2Value('flowPathID')
      console.log( this.applicableModels,this.category )

      this.initData()

    }
  }
</script>

<style scoped>

</style>
