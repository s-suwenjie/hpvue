<template>
  <div class="f_main">
    <!--头部信息-->
<!--    <yhm-view-body>-->
<!--      <template #title>基本信息</template>-->
<!--      <template #body>-->

<!--        <yhm-view-control title="公司名称" :content="unit"></yhm-view-control>-->
<!--        <yhm-view-image :url="url" title="公司名称二维码" tag="tax" bigwidth="200" top="-20" left="0"></yhm-view-image>-->
<!--        <yhm-view-control :content="companyCategory" title="纳税类型" :psd="companyCategoryPsd"></yhm-view-control>-->
<!--        <yhm-view-control title="税号" :content="taxNumber"></yhm-view-control>-->
<!--        <yhm-view-image :url="taxNumberUrl" title="税号一维码" tag="tax" bigwidth="200" top="-20" right="0"></yhm-view-image>-->
<!--        <yhm-view-control :content="category" title="开票类型" :psd="categoryPsd"></yhm-view-control>-->
<!--        <yhm-view-control title="开户行及账号" v-if="companyCategory==='0'" :content="account"></yhm-view-control>-->
<!--        <yhm-view-control title="注册地址" v-if="companyCategory==='0'" :content="registerAddress"></yhm-view-control>-->
<!--        <yhm-view-control title="是否固话" v-if="companyCategory==='0'" :content="registerNumberType" :psd="registerNumberTypePsd"></yhm-view-control>-->
<!--        <yhm-view-control title="注册电话" v-if="companyCategory==='0'" :content="registerNumber"></yhm-view-control>-->

<!--        <yhm-view-control title="邮寄地址" :content="mailAddress"></yhm-view-control>-->
<!--        <yhm-view-control title="是否固话" :content="mailNumberType" :psd="mailNumberTypePsd"></yhm-view-control>-->
<!--        <yhm-view-control title="邮寄电话" :content="mailNumber"></yhm-view-control>-->
<!--        <yhm-view-control title="开票码" :content="billingCode"></yhm-view-control>-->
<!--      </template>-->
<!--    </yhm-view-body>-->

    <div class="out_border">
        <div class="top_title">
            <div class="ji_left">基本信息</div>
            <div class="border_two" style="display: inline-block;width: 50%;padding: 16px;vertical-align: top;margin-left: 100px">
                <div class="left">开票码</div>
                <div class="Text">:</div>
                <div class="right">{{billingCode}}</div>
            </div>
        </div>

        <div>

          <div class="border_div">
            <div class="border_two">
              <div class="left">开票类型</div>
              <div class="Text">:</div>
              <div class="right" :style="{'color':categoryColor}">{{categoryFont}}</div>
            </div>
            <div class="border_two">
              <div class="left">纳税类型</div>
              <div class="Text">:</div>
              <div class="right" :style="{'color':companyCategoryColor}">{{companyCategoryFont}}</div>
            </div>
            <div class="border_two">
              <div class="left">公司名称</div>
              <div class="Text">:</div>
              <div class="right">{{unit}}</div>
            </div>
            <div class="border_two">
              <div class="left">税号</div>
              <div class="Text">:</div>
              <div class="right">{{taxNumber}}</div>
            </div>
            <div class="border_two" v-if="companyCategory==='0'">
              <div class="left">地址.电话</div>
              <div class="Text">:</div>
              <div class="right">{{registerAddress}} {{registerNumber}}</div>
            </div>
            <div class="border_two" v-if="companyCategory==='0'">
              <div class="left">开户行及账号</div>
              <div class="Text">:</div>
              <div class="right">{{account}}</div>
            </div>

          </div>

          <div class="border_div">
            <div class="border_two">
                <div class="left">公司名称二维码</div>
                <div class="Text">:</div>
              <div style="position: relative;display: inline-block" class="floats">
                 <img :src="'/UploadFile/tax/'+url" alt="" class="img_right">
                 <img :src="'/UploadFile/tax/'+url" alt="" class="img_float">
              </div>

            </div>

            <div class="border_two">
               <div class="left">税号一维码</div>
               <div class="Text">:</div>
              <div style="position: relative;display: inline-block" class="floats">
                     <img :src="'/UploadFile/tax/'+taxNumberUrl" alt="" class="img_right">
                     <img :src="'/UploadFile/tax/'+taxNumberUrl" alt="" class="img_float">
              </div>
            </div>


            <div class="border_two">
               <div class="left" style="color: #333333">邮寄地址.电话</div>
               <div class="Text">:</div>
               <div class="right">{{mailAddress}} {{mailNumber}}</div>
            </div>

          </div>
        </div>
    </div>


    <yhm-view-tab>
      <template #tab>
        <yhm-view-tab-button :list="tabState" :index="0">开票记录</yhm-view-tab-button>
      </template>
      <template #content>
        <yhm-view-tab-list :customize="true"  v-show="tabState[0].select">
          <template #listHead>
            <yhm-managerth style="width: 38px;" title="查看"></yhm-managerth>
            <yhm-managerth title="申请日期"></yhm-managerth>
            <yhm-managerth title="申请人"></yhm-managerth>
            <yhm-managerth title="发票抬头"></yhm-managerth>
            <yhm-managerth title="发票类型"></yhm-managerth>
            <yhm-managerth title="开票事由"></yhm-managerth>
          </template>
          <template #listBody>
            <tr v-for="(item,index) in openInvoiceList" :key="index" :class="{InterlacBg:index%2!==0}">
              <yhm-manager-td-look @click="lookOpenInvoice(item)"></yhm-manager-td-look>
              <yhm-manager-td-date :value="item.applyDate" ></yhm-manager-td-date>
              <yhm-manager-td :value="item.person" ></yhm-manager-td>
              <yhm-manager-td :value="item.purchaser" ></yhm-manager-td>
              <yhm-manager-td-psd :value="item.invoiceCategory" :list="invoiceCategoryPsd.list"></yhm-manager-td-psd>
              <yhm-manager-td-psd :value="item.category" :list="categoryInvoicePsd.list"></yhm-manager-td-psd>
            </tr>
          </template>
          <template #empty>
            <span class="m_listNoData" v-show="openInvoiceList.length=='0'?true:false">暂时没有数据</span>
          </template>
          <template #pager>
            <yhm-pagination :pager="pager" is-page-size="false" @initData="openInvoicePageData()"></yhm-pagination>
          </template>
        </yhm-view-tab-list>
      </template>
    </yhm-view-tab>
    <div class="f_split"></div>
    <yhm-formoperate :createName="createName" :insertDate="insertDate" :updateName="updateName" :updateDate="updateDate">
      <template #btn>
        <yhm-commonbutton value="编辑" icon="i-edit" :flicker="true" @call="editBtn()"></yhm-commonbutton>
      </template>
    </yhm-formoperate>

  </div>
</template>

<script>
  import { viewmixin } from '@/assets/view.js'
  export default {
    name: 'taxView',
    mixins: [viewmixin],
    data(){
      return{
        unitID:'',
        unit:'',
        taxNumber:'',
        companyCategory:'',
        category:'',
        accountID:'',
        account:'',
        registerAddressID:'',
        registerAddress:'',
        registerAddressDetailed:'',
        registerNumberType:'',
        registerNumber:'',
        registerNumberTitle:'',
        mailAddressID:'',
        mailAddress:'',
        mailAddressDetailed:'',
        mailNumberTitle:'',
        mailNumberType:'',
        mailNumber:'',
        taxNumberUrl:'',
        url:'',
        billingCode:'',
        companyCategoryPsd:[],
        categoryPsd:[],
        mailNumberTypePsd:[],
        registerNumberTypePsd:[],
        tabState:[{select:true}],
        openInvoiceList:[],
        categoryInvoicePsd:[],
        invoiceCategoryPsd:[],
        pager:{ // 分页数据
          total: '', // 数据总条数
          pageSize: 5, // 单页数据条数
          pageIndex: 1, // 当前页码
          selectCount: 0 // 选中数据的条数
        },
        insertDate:'',
        createName:'',
        updateName:'',
        updateDate:'',
        categoryFont:'',
        categoryColor:'',
        companyCategoryFont:'',
        companyCategoryColor:'',
      }
    },
    created () {
      this.init()
    },
    methods:{
      lookOpenInvoice(item){
        this.$dialog.OpenWindow({
          width: '1050',
          height: '790',
          title: '查看开票信息',
          url:'/openInvoiceView?id='+item.id +'&type=0',
          closeCallBack: (data)=>{
            if(data){
              this.initPageData(false)
            }
          }
        })
      },
      openInvoicePageData(){
        let params = {
            unitID:'\''+this.unitID+'\'',
            pageIndex:this.pager.pageIndex
          }
        this.ajaxJson({
          url: '/Bill/getUnitIDList',
          data: params,
          call: (data) => {
            this.openInvoiceList=data.content
            this.pager.total = data.count
          },
        })
      },
      editBtn(){
        this.$dialog.OpenWindow({
          width: '1050',
          height: '750',
          title: '编辑税号信息',
          url: '/taxFrom?id=' + this.id,
          closeCallBack: (data)=>{
            if(data){
              this.$dialog.setReturnValue(this.id)
              this.init()
            }
          }
        })
      },
      init(){
        let params={
          id:this.id
        }
        this.ajaxJson({
          url: '/finance/tax/initForm',
          data: params,
          call: (data) => {
            this.unitID=data.unitID
            this.unit=data.unit
            this.taxNumber=data.taxNumber
            this.companyCategory=data.companyCategory
            this.category=data.category
            this.accountID=data.accountID
            this.account=data.account
            this.registerAddressID=data.registerAddressID
            if(data.registerAddress!=''&&data.registerAddress!=null){
              this.registerAddress=data.registerAddress.replaceAll('-','')+data.registerAddressDetailed
            }
            this.registerAddressDetailed=data.registerAddressDetailed
            this.registerNumberType=data.registerNumberType
            this.registerNumber=data.registerNumber
            this.registerNumberTitle=data.registerNumberTitle
            this.mailAddressID=data.mailAddressID
            if(data.mailAddress!=''&&data.mailAddress!=null){
              this.mailAddress=data.mailAddress.replaceAll('-','')+data.mailAddressDetailed
            }
            this.mailAddressDetailed=data.mailAddressDetailed
            this.mailNumberTitle=data.mailNumberTitle
            this.mailNumberType=data.mailNumberType
            this.mailNumber=data.mailNumber
            this.taxNumberUrl=data.taxNumberUrl
            this.url=data.url
            this.billingCode=data.billingCode
            this.companyCategoryPsd=data.companyCategoryPsd.list
            this.categoryPsd=data.categoryPsd.list
            this.registerNumberTypePsd=data.registerNumberTypePsd.list
            for(let i in this.categoryPsd){
              if(this.categoryPsd[i].num == this.categoryPsd[this.category].num){
                this.categoryFont=this.categoryPsd[i].showName
                this.categoryColor=this.categoryPsd[i].code
              }
            }
            for(let i in this.companyCategoryPsd){
              if(this.companyCategoryPsd[i].num == this.companyCategoryPsd[this.companyCategory].num){
                this.companyCategoryFont=this.companyCategoryPsd[i].showName
                this.companyCategoryColor=this.companyCategoryPsd[i].code
              }
            }
            this.mailNumberTypePsd=data.mailNumberTypePsd.list

            this.updateName = data.updateName
            this.updateDate = data.updateDate
            this.insertDate = data.insertDate
            this.createName = data.createName
            if(this.unit){
              let params={
                unitID:'\''+this.unitID+'\''
              }
              this.ajaxJson({
                url: '/Bill/getUnitIDList',
                data: params,
                call: (openInvoiceList) => {
                  if(openInvoiceList){
                    this.openInvoiceList=openInvoiceList.content
                    this.categoryInvoicePsd=openInvoiceList.categoryPsd
                    this.invoiceCategoryPsd=openInvoiceList.invoiceCategoryPsd
                    this.pager.total = openInvoiceList.count
                  }
                }
              })
            }
          }
        })
      }
    }
  }
</script>

<style scoped>
.out_border{width: 1000px;border-radius: 8px;background-color: #ffffff;margin: 16px auto;}
.top_title{width: 100%;border-bottom: 1px solid #d9d9d9}
.ji_left{padding: 16px;font-size: 16px;color: #333333;display: inline-block}
.border_div{width: 50%;display: inline-block;vertical-align: top}
.border_two{box-sizing: border-box;padding: 12px 16px}
.left{box-sizing: border-box;font-size: 14px;color:#A7833B;font-weight: bold;display: inline-block;width: 25%;vertical-align: top;text-align: justify;height: 16px}
.left::after {display: inline-block;width: 100%;content: "";}
.Text{font-size: 14px;color:#A7833B;font-weight: bold;display: inline-block;width: 5%;text-align: center;vertical-align: top}
.right{box-sizing: border-box;display: inline-block;font-size: 14px;padding-left: 10px;max-width: 70%;vertical-align: top;line-height: 16px}
.img_right{width: 60px;padding-left: 10px;}
.img_float{position: absolute;width: 200px;left: 0;top: 0;display: none;border: 2px solid #BFBFBF;z-index: 3;border-radius: 6px;}
.floats:hover .img_float{display: inline-block;}
</style>
