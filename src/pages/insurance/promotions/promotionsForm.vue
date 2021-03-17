<template>
  <div class="f_main f_main_customize">
    <yhm-formbody>
      <template #title>基本信息</template>
      <template #control>
        <yhm-form-text title="别名" :value="name" id="name"></yhm-form-text>
        <yhm-form-radio title="品牌" subtitle=""  :select-list="brandList" :value="brand" id="brand"></yhm-form-radio>
        <yhm-form-check title="保险公司"  submit-value="insuredUnit" :select-list="insuredUnitList" :value="insuredUnit"  id="insuredUnit" rule="#" ></yhm-form-check>
        <yhm-form-text title="优惠额度%" :value="amount" id="amount"></yhm-form-text>
        <yhm-form-date title="启用日期" subtitle=""   :value="startDate" id="startDate " position="t"  rule="R0000"></yhm-form-date>
        <yhm-form-date title="结束日期" subtitle=""   :value="endDate" id="endDate " position="t"  rule="R0000"></yhm-form-date>
        <yhm-form-radio title="启用状态" subtitle="" width="1" no-edit="1" :select-list="enableList" :value="enable" id="enable" ></yhm-form-radio>
      </template>
    </yhm-formbody>
    <!-- 空行 -->
    <div class="f_split"></div>
    <yhm-form-list-edit>
      <template #title>优惠活动详情信息</template>
      <template #operate>
        <yhm-commonbutton value="添加优惠卷" icon="btnAdd" @call="addPromotions"></yhm-commonbutton>
<!--        <yhm-commonbutton value="添加优惠活动" icon="btnAdd" @call="addDetail"></yhm-commonbutton>-->
      </template>
      <template #listHead>
        <yhm-managerth style="width: 40px" title="序号"></yhm-managerth>
        <yhm-managerth  title="活动"></yhm-managerth>
        <yhm-managerth style="width: 80px" title="类型"></yhm-managerth>
        <yhm-managerth style="width: 60px" title="面值"></yhm-managerth>
        <yhm-managerth style="width: 60px" title="有效期"></yhm-managerth>
        <yhm-managerth  title="logo"></yhm-managerth>
        <yhm-managerth style="width: 100px"  title="数量"></yhm-managerth>
        <yhm-managerth  style="width: 40px" title="删除"></yhm-managerth>
      </template>
      <template #listBody>
        <tr v-for="(item,index) in discountList" :key="index" :class="{InterlacBg:index%2!==0}">
<!--          <yhm-form-td-textbox  width="40" :list="discountList" listid="discountList" :value="item" id="code"></yhm-form-td-textbox>-->
          <yhm-manager-td-center   :value="index+1+''"></yhm-manager-td-center>
          <yhm-manager-td-center  :value="item.name"></yhm-manager-td-center>
          <yhm-manager-td-psd :value="item.category" :list="categoryList"></yhm-manager-td-psd>
          <yhm-manager-td-center  :value="item.money+'元'"></yhm-manager-td-center>
          <yhm-manager-td-psd :befotr-value="item.expiration" :value="item.expirationCategory" :list="expirationCategoryList"></yhm-manager-td-psd>
          <yhm-manager-td-image :tip="true" width="850" height="600" left="50" type="files" :value="item.url" :tag="'wxCoupon'" ></yhm-manager-td-image>
          <yhm-form-td-textbox   width="100" :list="discountList" listid="discountList" :value="item" id="quantity"></yhm-form-td-textbox>
          <yhm-form-td-delete  :must="1" width="40" :list="discountList"  listid="discountList" :value="item" :del-click="true" @click="delDiscount(index,item)"></yhm-form-td-delete>
        </tr>
      </template>
        <template #empty>
          <span class="m_listNoData" v-show="discountList.length>0?false:true">暂时没有数据</span>
        </template>
    </yhm-form-list-edit>

    <yhm-formoperate :createName="createName" :insertDate="insertDate" :updateName="updateName" :updateDate="updateDate">
      <template #btn>
        <yhm-commonbutton  value="保存" icon="btnSave" :flicker="true" @call="save()"></yhm-commonbutton>
        <yhm-commonbutton  value="保存并提交" icon="btnSave" :flicker="true" @call="btnSave()"></yhm-commonbutton>
      </template>
    </yhm-formoperate>
  </div>
</template>

<script>
  import { guid,accAdd,accMul,formatTime } from '@/assets/common.js'
  import { formmixin } from '@/assets/form.js'
  export default {
    name: 'promotionsForm',
    mixins: [formmixin],
    data(){
      return{
        discountList:[],
        brandList:[],
        brand:'',
        insuredUnitList:[],
        insuredUnit:'',
        enableList:[],
        enable:'',
        remark:'',
        name:'',

        startDate:'',
        endDate:'',
        promotionsList:[],
        categoryList:[],
        category:'',
        expirationCategoryList:[],
        expirationCategory:'',
        id:'',
      }
    },
    methods: {
      addPromotions(){
        this.$dialog.OpenWindow({
          width: 1050,
          height: 650,
          url:'/selectWxCoupon?showCategory=1,2',
          title:"选择优惠券",
          closeCallBack:(data) =>{

            let insertDate = new Date(accAdd(new Date().getTime(), accMul(this.discountList.length, 1000)))

            let index = this.discountList.length + 1
            let arrId = []

            for(let i in this.discountList){
              arrId.push(this.discountList[i].coupon)
              if(this.discountList[i].coupon==data.id){
                this.discountList[i].quantity = Number(this.discountList[i].quantity)+1
              }
            }
            if(arrId.indexOf(data.id)==-1){
              this.discountList.push({
                id: guid(),
                insertDate: formatTime(insertDate),
                ownerID: this.id,
                code: index + '',
                name: data.name ,
                coupon: data.id ,
                url:data.url,
                money:data.money,
                category:data.category,
                expiration:data.expiration,
                expirationCategory:data.expirationCategory,
                quantity:'1'

              })
            }



          }
        })
      },
      // addDetail () {
      //   let index = this.discountList.length + 1
      //   let insertDate = new Date(accAdd(new Date().getTime(), accMul(this.discountList.length, 1000)))
      //   this.discountList.push({
      //     id: guid(),
      //     insertDate: formatTime(insertDate),
      //     ownerID: this.id,
      //     code: index + '',
      //     remark: this.remark,
      //   })
      // },
      delDiscount(index,item){
        this.$dialog.alert({
          tipValue: '删除成功！！！',
          closeCallBack: ()=>{
            this.discountList.splice(index, 1)
            for(let i in this.promotionsList){
              if(this.promotionsList[i].coupon==item.coupon){
                this.promotionsList.splice(i, 1)
              }
            }
            if(this.discountList.length === 0){
              this.addDetail()
            }
          }
        })
      },
      save(){
        let insertDate = new Date(accAdd(new Date().getTime(), accMul(this.discountList.length, 1000)))
        for (let i in this.discountList){
          this.promotionsList.push({
            id: guid(),
            insertDate: formatTime(insertDate),
            ownerID: this.id,
            coupon: this.discountList[i].coupon ,
            quantity:this.discountList[i].quantity,
          })
        }

        for (let i in  this.discountList){
          for (let j in this.promotionsList){
              if (this.discountList[i].coupon==this.promotionsList[j].coupon){
                this.promotionsList[j].quantity=this.discountList[i].quantity

              }
          }
        }
        if (this.validator()){
          let params = {
            id:this.id,
            name:this.name,
            brand:this.brand,
            insuredUnit:this.insuredUnit,
            amount:this.amount,
            enable:this.enable,
            discountList:this.discountList,
            promotionsList:this.promotionsList,
            startDate:this.startDate+' 00:00:00',
            endDate:this.endDate+' 23:59:59',
          }
          this.ajaxJson({
            url: '/Insurance/promotionSave',
            data: params,
            call: (data) => {
              if (data.type === 0) {
                this.$dialog.setReturnValue(this.id)
                this.$dialog.alert({
                  tipValue: data.message,
                  closeCallBack: () => {
                    this.$dialog.setReturnValue(this.id)
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

      },
      btnSave(){
        let insertDate = new Date(accAdd(new Date().getTime(), accMul(this.discountList.length, 1000)))
        for (let i in this.discountList){
          this.promotionsList.push({
            id: guid(),
            insertDate: formatTime(insertDate),
            ownerID: this.id,
            coupon: this.discountList[i].coupon ,
            quantity:this.discountList[i].quantity,
          })
        }
        for (let i in  this.discountList){
          for (let j in this.promotionsList){
            if (this.discountList[i].coupon==this.promotionsList[j].coupon){
              this.promotionsList[j].quantity=this.discountList[i].quantity

            }
          }
        }
        if (this.validator()){
          let params = {
            id:this.id,
            name:this.name,
            brand:this.brand,
            insuredUnit:this.insuredUnit,
            amount:this.amount,
            enable:this.enable,
            discountList:this.discountList,
            promotionsList:this.promotionsList,
            startDate:this.startDate+' 00:00:00',
            endDate:this.endDate+' 23:59:59',
          }
          this.ajaxJson({
            url: '/Insurance/submitSave',
            data: params,
            call: (data) => {
              if (data.type === 0) {
                this.$dialog.setReturnValue(this.id)
                this.$dialog.alert({
                  tipValue: data.message,
                  closeCallBack: () => {
                    this.$dialog.setReturnValue(this.id)
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
      },
    },

    created () {


      this.init({
        url: '/Insurance/promotionInit',
        all: (data) => {
          //添加查看的时候都需要的代码
          this.brandList=data.brandPsd.list
          this.brand=data.brandPsd.value
          this.insuredUnitList=data.insuredUnitPsd.list
          this.insuredUnit=data.insuredUnitPsd.value
          this.enableList=data.enablePsd.list
          this.enable=data.enablePsd.value

          this.categoryList=data.categoryPsd.list
          this.category=data.categoryPsd.value
          this.expirationCategoryList=data.expirationCategoryPsd.list
          this.expirationCategory=data.expirationCategoryPsd.value

        },
        add: (data) => {
          //添加时独有的代码
          //初始化分组成员信息

        },
        look: (data) => {
          //查看时独有的信息
          this.discountList=data.promotionsList
          this.amount=data.amount
          this.name=data.name
          this.startDate=data.startDate
          this.endDate=data.endDate
          data.promotionsList = []
          // this.promotionsList=data.promotionsList
        }
      })
    }
  }
</script>

<style scoped>

</style>
