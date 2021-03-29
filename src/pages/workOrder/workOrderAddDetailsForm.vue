<template>
    <div class="f_main">
      <yhm-formbody>
        <template #title>基本信息</template>
        <template #control>
          <yhm-form-select title="工序服务" :no-click="type=='1'?true:false" @click="selectProduct" :value="name" id="name" rule="R0000" ref="pros"></yhm-form-select>
          <yhm-form-text title="标准价格" before-icon="rmb" tip="money" :value="money" id="money" rule="R2400"></yhm-form-text>
          <yhm-form-date title="创建日期" :no-edit="type=='1'?true:false" :max="currentDate" :max-year="Number(currentDate.slice(0,4))" :value="workDate" id="workDate" rule="R0000"></yhm-form-date>
          <yhm-form-text title="客户报价" before-icon="rmb" tip="money" :value="discount" id="discount" rule="R2400"></yhm-form-text>

          <!--<yhm-form-radio title="状态" :select-list="stateList" :value="state" id="state"></yhm-form-radio>-->
          <yhm-form-select-insurance title="维修流程" width="0" @click="teamidClick" :psd="teamNameList" :required-list="requiredList" :value="teamid"  id="teamid" rule="#"></yhm-form-select-insurance>
<!--          <yhm-form-text title="维修流程" v-else no-edit="1" :value="teamName" id="teamName"></yhm-form-text>-->

          <!--<yhm-form-radio title="类型" width="1" :select-list="teamNameList" :value="teamid" id="teamid"></yhm-form-radio>-->
          <!--<yhm-form-radio title="部门类型" width="1" :select-list="departmentList" :value="departid" id="departid"></yhm-form-radio>-->

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
        discount:'0',//折扣价
        model:'',//规格型号
        modelid:'',//规格型号ID
        // product:'',//商品类型
        productid:'',//商品类型ID
        baseprice:'0',//成本价
        departid:'',//维修部门
        teamid:[],//维修班组
        requiredList:['0','3'],//多选框的必选项
        teamName:[],//全部维修类型
          teamNameList:[],//班组
        departmentList:[],//部门
        type:'',
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
      teamidClick(index){
        if(index=='3'&&this.worktype=='1'){
          setTimeout(()=>{
            if(this.teamid.indexOf('0')!=-1&&this.teamid.indexOf('3')!=-1){
              let teamid = this.teamid.concat()
              this.teamid = []
              for(let i in teamid){
                if(teamid[i]=='0'||teamid[i]=='3'){

                }else{
                  this.teamid.push(teamid[i])
                }
              }
            }else if(this.teamid.indexOf('0')!=-1&&this.teamid.indexOf('3')==-1){
              let teamid = this.teamid.concat()
              this.teamid = []
              for(let i in teamid){
                if(teamid[i]=='0'||teamid[i]=='3'){

                }else{
                  this.teamid.push(teamid[i])
                }
              }
            }else if(this.teamid.indexOf('0')==-1&&this.teamid.indexOf('3')!=-1){
              if(this.teamid.indexOf('3')==-1){
                this.teamid.push('3')
              }
              if(this.teamid.indexOf('0')==-1){
                this.teamid.push('0')
              }
            }
          },0)
        }else if(index=='0'&&this.worktype=='1'){
          setTimeout(()=>{
            if(this.teamid.indexOf('0')!=-1&&this.teamid.indexOf('3')!=-1){
              let teamid = this.teamid.concat()
              this.teamid = []
              for(let i in teamid){
                if(teamid[i]=='0'||teamid[i]=='3'){

                }else{
                  this.teamid.push(teamid[i])
                }
              }
            }else if(this.teamid.indexOf('3')!=-1&&this.teamid.indexOf('0')==-1){
              let teamid = this.teamid.concat()
              this.teamid = []
              for(let i in teamid){
                if(teamid[i]=='0'||teamid[i]=='3'){

                }else{
                  this.teamid.push(teamid[i])
                }
              }
            }else if(this.teamid.indexOf('3')==-1&&this.teamid.indexOf('0')!=-1){
              if(this.teamid.indexOf('3')==-1){
                this.teamid.push('3')
              }
              if(this.teamid.indexOf('0')==-1){
                this.teamid.push('0')
              }
            }
          },0)
        }
        let teamid = this.teamid.concat()
        let key0 = this.teamid.indexOf('0')
        let key3 = this.teamid.indexOf('3')
        if(index=='3'&&this.teamid.length!=0){
          if(key3!=-1){
            teamid.push('0')
          }else if(key3==-1){
            if(key0==-1&&key3!=-1){
              teamid.splice(key3,1)
            }else if(key0!=-1&&key3==-1){
              teamid.splice(key0,1)
            }else if(key0!=-1&&key3!=-1){
              teamid.splice(key0,1)
              teamid.splice(key3,1)
            }
          }
        }else if(index=='0'&&this.teamid.length!=0){
          if(key0!=-1){
            teamid.push('3')
          }else if(key0==-1){
            if(key3==-1&&key0!=-1){
              teamid.splice(key0,1)
            }else if(key3!=-1&&key0==-1){
              teamid.splice(key3,1)
            }else if(key3!=-1&&key0!=-1){
              teamid.splice(key0,1)
              teamid.splice(key3,1)
            }
          }
        }
        this.teamid = teamid
      },
      save(){
        let a = this.validator()
        let arrTeamid = []
        if(this.teamid.indexOf('0')==-1&&this.teamid.indexOf('3')==-1&&this.teamid.indexOf('6')==-1){
          this.$dialog.alert({
            tipValue: '维修流程必须选择钣金或保养',
            alertImg: 'warn',
            width: '350',
            closeCallBack () {
            }
          })
          return
        }
        if(a){
          arrTeamid = this.teamid.sort(function(a, b){return a - b});
          let params = {
            fixOrderRevenueFormParam:{
              ownerID:this.orderid,
              id: this.id,
              orderid:this.ownerID,
              workDate:this.workDate,//发生日期
              discount:this.discount==''?'0':this.discount,//客户报价
              model:this.model,//规格型号
              modelid:this.modelid,//规格型号ID
              // product:this.product,//商品类型
              productid:this.productid,//商品类型ID
              processid:this.flowPathID,//主流程ID
              departid:this.departid,//维修部门
              teamid:arrTeamid.join(','),//维修班组
              name:this.name,//商品名称
              money:this.money,//变化金额
              remark:this.remark,//备注
              category:this.category,//商品类型
              state:this.state,//工作类型
              stateStr:0,//完成状态
              direction:this.direction,//收支方向
            },
            fixProcessDetailParam:{
              id:guid(),
              ownerID:this.ownerID,
              stage:0,
              type:'2',
              orderStr:'2',
              dependid:this.id,
            }
          }
          let param = {
            ownerID:this.orderid,
            id: this.id,
            orderid:this.ownerID,
            workDate:this.workDate,//发生日期
            discount:this.discount==''?'0':this.discount,//客户报价
            model:this.model,//规格型号
            modelid:this.modelid,//规格型号ID
            // product:this.product,//商品类型
            productid:this.productid,//商品类型ID
            processid:this.flowPathID,//主流程ID
            baseprice:this.baseprice,//成本价
            departid:this.departid,//维修部门
            teamid:arrTeamid.join(','),//维修班组
            name:this.name,//商品名称
            money:this.money,//变化金额
            // money:Number(this.discount)>0?this.discount:this.money,//变化金额
            remark:this.remark,//备注
            category:this.category,//商品类型
            state:this.state,//工作类型
            stateStr:0,//完成状态
            direction:this.direction,//收支方向
          }
          if(this.offLine=='1'){
            this.$dialog.setReturnValue(param)
            this.$dialog.close()
          }else if(this.type=='1'){
            this.$dialog.setReturnValue(param)
            this.$dialog.close()
          }else{
            if(this.lookOverType!='1'){
              this.ajaxJson({
                url: '/fix/fixOrderRevenue/saveFixOrderRevenue',
                data: params,
                call: (data)=>{
                  if(data.type==0){
                    this.$dialog.setReturnValue(this.id) //向父级页面id值
                    this.$dialog.alert({
                      tipValue: data.message,
                      closeCallBack: () => {
                        this.$dialog.close()
                      }
                    })
                    // this.ajaxJson({
                    //   url: '/fix/fixProcessDetail/save',
                    //   data: {
                    //     id:guid(),
                    //     ownerID:this.ownerID,
                    //     stage:0,
                    //     orderStr:'2',
                    //     dependid:this.id,
                    //   },
                    //   call: (parameters) => {
                    //     this.$dialog.alert({
                    //       tipValue: data.message,
                    //       closeCallBack: () => {
                    //         this.$dialog.close()
                    //       }
                    //     })
                    //   }
                    // })
                  }else {
                    this.$dialog.alert({
                      alertImg: 'error',
                      tipValue: data.message,
                      closeCallBack: () => {
                      }
                    })
                  }

                }
              })
            }else{
              this.$dialog.setReturnValue(params)
              sessionStorage.removeItem('workOrderAddDetailsFormData');

            }
          }
        }
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
          width: 1050,
          height: 630,
          url: '/selectService',
          title: '选择工序服务',
          closeCallBack: (data) => {
            if (data) {
              console.log(data)
              this.productid = data.id
              this.name = data.proName
              this.money = data.hours
              this.discount = data.hours
              this.baseprice = data.baseprice
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
              this.departid = data.departid//维修部门
              if(data.id!=''){
                this.discount = data.discount
              }
              let arr =[]
              if(typeof data.teamid=='string'){
                arr = data.teamid.split(',')
                this.teamid = arr//维修班组
              }else{
                this.teamid = data.teamid//维修班组
              }

              if(data.teamid=='0'){
                this.teamid = ['0']
              }
              let teamNameList = []
              for(let i=0; i<5; i++){
                teamNameList = []
                if(data.teamid.indexOf('0')!=-1){
                  teamNameList.push('钣金拆装或修复')
                }
                if(data.teamid.indexOf('1')!=-1){
                  teamNameList.push('做底')
                }
                if(data.teamid.indexOf('2')!=-1){
                  teamNameList.push('喷漆')
                }
                if(data.teamid.indexOf('3')!=-1){
                  teamNameList.push('钣金装配')
                }
                if(data.teamid.indexOf('4')!=-1){
                  teamNameList.push('抛光')
                }
                if(data.teamid.indexOf('6')!=-1){
                  teamNameList.push('保养')
                }
                this.teamName = teamNameList.join(',')
              }
              this.teamNameList = data.teamNamePsd.list
              this.departmentList = data.departmentPsd.list
              if(this.worktype=='0'){
                this.requiredList = ['0','3']
                // this.requiredList = []
                this.teamNameList.splice(this.teamNameList.length-1,1)
                this.teamid = []
              }else if(this.worktype=='1'){
                this.teamid = ['6']
                this.requiredList = ['6']
                this.teamNameList.splice(0,5)
              }else{
                // this.teamid = ['0','3','6']
                this.requiredList = ['0','3','6']
                this.teamid = []
                // this.requiredList = []
              }
              if(this.lookOverType=='1'){
                let data = JSON.parse(sessionStorage.workOrderAddDetailsFormData)
                this.name = data.name
                this.money = data.money
                this.teamid = data.teamid.split(',')
                this.remark = data.remark
                this.workDate = data.workDate
                this.discount = data.discount//折扣价
              }
            }
          }
        })
      }
    },
    created () {
      this.setQuery2Value('id')
      this.setQuery2Value('type')//等于1时 从补录单页面跳入的 只允许编辑备注
      this.setQuery2Value('ownerID')//工单id
      this.setQuery2Value('orderid')
      this.setQuery2Value('cid')
      this.setQuery2Value('aid')
      this.setQuery2Value('worktype')//工单类型 0维修 1保养 2维修保养
      this.setQuery2Value('offLine')//等于1时是离线数据跳转进来的
      this.setQuery2Value('flowPathID')
      this.setQuery2Value('lookOverType')//从接待单的编辑中进来的

      this.initData()

    }
  }
</script>

<style scoped>

</style>
