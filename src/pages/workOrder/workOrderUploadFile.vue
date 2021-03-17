<template>
    <div class="f_main">
      <yhm-formbody>
        <template #title>基本信息</template>
        <template #control>
<!--          <yhm-form-radio title="导入类型" :select-list="typeList" :value="type" id="type"></yhm-form-radio>-->
          <yhm-formupload ref="uploadFile" astrict="1" :ownerID="ownerID" :value="fileList" id="fileList" :title="'上传'+typeList[type-1].showName" tag="workOrderUploadFile" subtitle=""></yhm-formupload>
        </template>
      </yhm-formbody>
      <yhm-formoperate :createName="createName" :insertDate="insertDate" :updateName="updateName" :updateDate="updateDate">
        <template #btn>
          <yhm-commonbutton value="保存" icon="btnSave" :flicker="true" @call="uploadFile()"></yhm-commonbutton>
        </template>
      </yhm-formoperate>
      <div class="f_split"></div>
      <yhm-view-tab>
        <template #tab>
<!--          <yhm-view-tab-button :list="tabState" :index="0">工单详情</yhm-view-tab-button>-->
<!--          <yhm-view-tab-button :list="tabState" :index="1">定损单详情</yhm-view-tab-button>-->
<!--          <yhm-view-tab-button :list="tabState" :index="2">维修配件</yhm-view-tab-button>-->
        </template>
        <template #content>
          <yhm-view-tab-list :customize="true" v-show="tabState[0].select">
            <template #listHead>
              <!--<yhm-managerth style="width: 38px" title="查看"></yhm-managerth>-->
              <yhm-managerth width="120" title="接待日期"></yhm-managerth>
              <yhm-managerth width="85" title="接待人"></yhm-managerth>
              <yhm-managerth width="120" title="其它系统编号"></yhm-managerth>
              <yhm-managerth width="80" title="工单分类"></yhm-managerth>
              <yhm-managerth  width="90" title="作业分类"></yhm-managerth>
              <yhm-managerth width="85" title="车牌号"></yhm-managerth>
              <yhm-managerth title="客户名称"></yhm-managerth>
              <yhm-managerth width="85" title="联系人"></yhm-managerth>
<!--              <yhm-managerth width="100" title="联系人手机号"></yhm-managerth>-->
              <yhm-managerth width="85" title="工单状态"></yhm-managerth>
              <yhm-managerth width="85" title="状态"></yhm-managerth>
            </template>
            <template #listBody>
              <tr v-for="(item,index) in list" :key="index" :class="{InterlacBg:index%2!==0}">
                <!--<yhm-manager-td-look @click="listView(item)"></yhm-manager-td-look>-->
                <yhm-manager-td-date :value="item.workDate"></yhm-manager-td-date>
                <yhm-manager-td-center :value="item.principal"></yhm-manager-td-center>
                <yhm-manager-td-center :value="item.otherCode"></yhm-manager-td-center>
                <yhm-manager-td-psd :value="item.category" :list="categoryList"></yhm-manager-td-psd>
                <yhm-manager-td-psd :value="item.jobtype" :list="jobtypeList"></yhm-manager-td-psd>
                <yhm-manager-td-center :value="item.vehicle"></yhm-manager-td-center>
                <yhm-manager-td-center :value="item.carOwner"></yhm-manager-td-center>
                <yhm-manager-td-center :value="item.contactPerson"></yhm-manager-td-center>
<!--                <yhm-manager-td-center :value="item.phone" format="phone*"></yhm-manager-td-center>-->
                <yhm-manager-td-psd :value="item.state" :list="stateList"></yhm-manager-td-psd>
                <yhm-manager-td-center :value="item.isToo=='1'?'重复数据':'已录入'" :color="item.isToo=='1'?'#f00':'#49a9ea'"></yhm-manager-td-center>
              </tr>
            </template>
<!--            -->
            <template #empty>
              <span class="m_listNoData" v-show="list.length=='0'?true:false">导入的数据</span>
            </template>
            <template #pager>
              <yhm-pagination :pager="pager" is-page-size="false" @initData="listPage(false)"></yhm-pagination>
            </template>
          </yhm-view-tab-list>
          <yhm-view-tab-list :customize="true" v-show="tabState[1].select">
<!--            <template #listHead>-->
<!--              <yhm-managerth title="项目名称"></yhm-managerth>-->
<!--              <yhm-managerth title="类型"></yhm-managerth>-->
<!--              <yhm-managerth style="width: 120px" title="数量"></yhm-managerth>-->
<!--              <yhm-managerth title="单价"></yhm-managerth>-->
<!--              <yhm-managerth style="width: 120px;" title="工时费"></yhm-managerth>-->
<!--            </template>-->
<!--            <template #listBody>-->
<!--              <tr v-for="(item,index) in list" :key="index" :class="{InterlacBg:index%2!==0}">-->
<!--                <yhm-manager-td-center :value="item.nameStr+''"></yhm-manager-td-center>-->
<!--                <yhm-manager-td-center :value="formTypeList[item.category].showName+''"></yhm-manager-td-center>-->
<!--                <yhm-manager-td-center :value="item.quantity+''"></yhm-manager-td-center>-->
<!--                <yhm-manager-td-money :value="item.price+''"></yhm-manager-td-money>-->
<!--                <yhm-manager-td-money :value="item.money+''"></yhm-manager-td-money>-->
<!--              </tr>-->
<!--            </template>-->
            <template #empty>
              <span class="m_listNoData" v-show="list2.length=='0'?true:false">暂时没有数据</span>
            </template>
            <template #pager>
              <yhm-pagination :pager="pager" is-page-size="false" @initData="listPage(false)"></yhm-pagination>
            </template>
          </yhm-view-tab-list>

          <yhm-view-tab-list :customize="true" v-show="tabState[2].select">
<!--            <template #listHead>-->
<!--              <yhm-managerth title="商品名称"></yhm-managerth>-->
<!--              <yhm-managerth title="规格型号"></yhm-managerth>-->
<!--              <yhm-managerth style="width: 120px" title="拆分数量"></yhm-managerth>-->
<!--              <yhm-managerth style="width: 120px" title="整件数量"></yhm-managerth>-->
<!--              <yhm-managerth title="单价"></yhm-managerth>-->
<!--              <yhm-managerth title="总价"></yhm-managerth>-->
<!--            </template>-->
<!--            <template #listBody>-->
<!--              <tr v-for="(item,index) in list3" :key="index" :class="{InterlacBg:index%2!==0}">-->
<!--                <yhm-manager-td-center :value="item.product"></yhm-manager-td-center>-->
<!--                <yhm-manager-td-center :value="item.model"></yhm-manager-td-center>-->
<!--                <yhm-manager-td-center :value="item.mdo"></yhm-manager-td-center>-->
<!--                <yhm-manager-td-center :value="item.quantity+''"></yhm-manager-td-center>-->
<!--                <yhm-manager-td-money :value="item.price"></yhm-manager-td-money>-->
<!--                <yhm-manager-td-money :value="item.money"></yhm-manager-td-money>-->
<!--              </tr>-->
<!--            </template>-->
            <template #empty>
              <span class="m_listNoData" v-show="list3.length=='0'?true:false">暂时没有数据</span>
            </template>
            <template #pager>
              <yhm-pagination :pager="pager" is-page-size="false" @initData="listPage(false)"></yhm-pagination>
            </template>
          </yhm-view-tab-list>
        </template>
      </yhm-view-tab>
    </div>
</template>
<script>
  import { viewmixin } from '@/assets/view.js'
  import { guid } from '@/assets/common.js'
  export default {
    name: 'workOrderUploadFile',
    mixins: [viewmixin],
    data(){
      return{
        type:'1',
        ownerID:guid(),
        tabState:[{select:true},{select:false},{select:false}],
        details:[],//备份全部数据
        list:[],//定损单详情
        list2:[],//工单详情
        list3:[],//维修配件
        fileList:[],
        stateList:[],//工单完成状态
        jobtypeList:[],//作业分类
        categoryList:[],//工单分类
        pager: { // 分页数据
          total: '', // 数据总条数
          pageSize: 10, // 单页数据条数
          pageIndex: 1, // 当前页码
          selectCount: 0 // 选中数据的条数
        },
        typeList:[
          {
            num:'1',
            img:'',
            code:'',
            showName:'工单数据'
          },
          {
            num:'2',
            img:'',
            code:'',
            showName:'维修项目'
          },
          {
            num:'3',
            img:'',
            code:'',
            showName:'维修配件'
          },
        ],

      }
    },
    // watch:{
    //   type(val,newValue){
    //     this.fileList = []
    //   }
    // },
    methods:{
      // fileChange(){
        // if(Number(this.fileList.length)==1){
        //   this.$dialog.alert({
        //     tipValue:'只能上传单个文件',
        //     alertImg:'warn',
        //     width:'330'
        //   })
        //   setTimeout(()=>{
        //     this.$nextTick(()=>{
        //       this.fileList.pop()
        //       console.log(this.fileList)
        //     })
        //   },0)
        // }
      // },
      listPage(){
        let list = this.details.concat()
        this.pager.total=this.details.length
        // this.pager.pageSize=5
        let a=(this.pager.pageIndex-1)*this.pager.pageSize
        let arr=[]
        arr=list.splice(a,this.pager.pageSize)
        this.list=arr

        // pager:{total:0,pageSize:15,pageIndex:1,selectCount:0}
      },
      uploadFile(){
        let url = '/fix/Offer/Excelsave'
        if(this.type=='2'){
          url = '/fix/Offer/Excelsave2'
        }else if(this.type=='3'){
          url = '/fix/Offer/Excelsave3'
        }
        this.ajaxJson({
          url: url,
          data:{
            commonUploadFile:this.fileList
          },
          call: (data) => {
            if(this.type=='1'){
              this.details = data.content
              this.list = data.content
              this.pager.total = data.count
            }
            this.listPage()
            this.stateList = data.statePsd.list
            this.categoryList = data.categoryPsd.list
            this.jobtypeList = data.jobtypePsd.list
            if(data.type=='0'){
              let message = '导入成功'
              let width = ''
              if(data.isToo=='1'){
                message = '发现重复数据,已将不重复的数据导入'
                width = '350'
              }
              this.$dialog.alert({
                width:width,
                tipValue: message,
                closeCallBack: () => {
                  console.log(data.content)

                }
              })
            }else {
              this.$dialog.alert({
                alertImg: 'warn',
                tipValue: data.message
              })
            }
          }
        })
      },
    }
  }
</script>

<style scoped>

</style>
