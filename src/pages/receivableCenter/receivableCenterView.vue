<template>
    <div class="f_main">
      <div class="i-left fs48b colorFFF lftSwitchArrow" title="上一条" v-show="isLeftID"  @click="strip('left')"></div>
      <div class="i-right fs48b colorFFF rgtSwitchArrow" title="下一条" v-show="isRightID" @click="strip('right')"></div>

      <yhm-view-body>
        <template #title>基本信息</template>
        <template #body>
          <yhm-view-control title="欠款方" :content="belong" color="#49a9ea" @click="skiPdetails" style="cursor: pointer;"></yhm-view-control>
          <yhm-view-control title="欠款总金额" :content="money" type="money" color="#f00"></yhm-view-control>
        </template>
      </yhm-view-body>

      <div class="f_split"></div>

      <yhm-view-tab :customize="true" :pager="false">
        <template #tab>
          <yhm-view-tab-button :list="tabState" :index="0">来源信息</yhm-view-tab-button>
        </template>

        <template #content>
          <yhm-view-tab-list :customize="true" :pager="false" v-show="tabState[0].select">
            <template #listHead>
              <yhm-managerth style="width: 18px" title="查看"></yhm-managerth>
              <yhm-managerth style="width: 120px" title="来源"></yhm-managerth>
              <yhm-managerth style="width: 200px" title="欠款金额"></yhm-managerth>
            </template>
            <template #listBody>
              <tr :class="[{InterlacBg:index%2!=0}]" v-for="(item,index) in details" :key="index">
                <yhm-manager-td-look  @click="listView(item)"></yhm-manager-td-look>
                 <yhm-manager-td-psd :value="item.category" :list="categoryPsd.list"></yhm-manager-td-psd>
                <yhm-manager-td-money :value="item.money"></yhm-manager-td-money>
              </tr>
            </template>
          </yhm-view-tab-list>
        </template>
      </yhm-view-tab>
      <yhm-formoperate :createName="createName" :insertDate="insertDate" :updateName="updateName" :updateDate="updateDate">
        <template #btn>
        </template>
      </yhm-formoperate>
    </div>
</template>

<script>
  import { viewmixin } from '@/assets/view.js'
  export default {
    name: 'receivableCenterView',
    mixins: [viewmixin],
    data(){
      return{
        tabState:[{select:true}],
        belong:'',//欠款方姓名
        belongID:'',//欠款方ID
        money:'',//欠款总金额
        details:[],
        index:0,
        isLeftID:false,
        isRightID:false,
        unitOrPerson:'',
        unitOrPersonPsd:{

        },
        categoryPsd:{

        }
      }
    },
    methods:{
      skiPdetails(item){
        if(this.unitOrPerson=='0'){
          this.$dialog.OpenWindow({
            width: '1050',
            height: '750',
            url: '/unitView?id='+this.id,
            title: '查看公司信息',
            closeCallBack: (data) => {
              if (data) {
                this.initPageData(false)
              }
            }
          })
        }else if(this.unitOrPerson=='1'){
          this.$dialog.OpenWindow({
            width: '1050',
            height: '750',
            url: '/personView?id='+this.id,
            title: '查看联系人信息',
            closeCallBack: (data) => {
              if (data) {
                this.initPageData(false)
              }
            }
          })
        }

      },
      //打开选中信息
      selectedList(){
        this.$dialog.OpenWindow({
          width: '1050',
          height: '550',
          url: '/receivableManagerView?type=1',
          title: '查看应收账款',
          closeCallBack: (data) => {
            if (data) {
              this.initData(false)
            }
          }
        })
      },
      checkboxEvent(selectValue){//用户点击选中信息
        let arr = []
        let s = 0;
        if(selectValue.length!='0'){
          this.isSelected = true
          for(let i in selectValue){
            for(let j in this.details){
              if(this.details[j].id==selectValue[i]){
                arr.push(parseInt(this.details[j].money))
              }
            }
          }
          for (let q=arr.length-1; q>=0; q--) {
            s += arr[q];
          }
          this.contentTotal = [{count:selectValue.length+'', money:s+'',}]
        }else{
          this.contentTotal = this.backupsTotal
          this.isSelected = false
        }
        sessionStorage.receivablesSelectValue = JSON.stringify(selectValue)
      },
      initChooses(){
        this.initData()
      },
      listView(item){
        if(item.category==0){
          this.$dialog.OpenWindow({
            width: '1050',
            height: '550',
            url: '/receivableManagerView?ownerID='+this.belongID,
            title: '查看应收账款',
            closeCallBack: (data) => {
              if(data){
                this.initData(false)
              }
            }
          })
        }else if(item.category==2){
          window.open('/home/accountsReceivable/accountsReceivableManager')
        }
      },
      strip(val){//点击左右按钮时
        if(this.type!='1'){
          this.switchover()
          return
        }
        let selectList = JSON.parse(sessionStorage.receivableSourceManagerView)//选中的数据的id
        if(selectList.length>0){
          this.isRightID = true
        }else{
          this.isRightID = false
        }
        if(selectList.length==1){
          this.isRightID = false
          this.isLeftID = false
        }
        let a =selectList.indexOf(this.id)
        if(a!=-1){//如果当前数据id不在全部id中的最前或者最后时 显示左右按钮
          if(a!=0||a!=selectList.length-1){
            this.isLeftID = true
            this.isRightID = true
          }
        }
        if(val=='right'){
          this.index++
          if(this.index==selectList.length-1){
            this.isRightID = false
          }else{
            this.isRightID = true
          }
        }else if(val=='left'){
          this.index--
          if(this.index==0){
            this.isLeftID = false
          }else{
            this.isLeftID = true
          }
        }
        this.switchover()
      },
      switchover (){
        if(this.type=='1'){//等于1的时候代表是从选中信息进来的
          let selectList = JSON.parse(sessionStorage.receivableSourceManagerView)//选中的数据的id
          this.id=selectList[this.index]
        }else{
          this.setQuery2Value('id')
        }
        this.initData(false)
      },
      initData () {

        this.init({
          url: '/finance/receivableCenter/initView',
          call:(data) =>{
            this.belong = data.belong
            this.belongID = data.belongID
            this.unitOrPerson = data.unitOrPerson
            this.money = data.money
            this.details = data.details
            this.categoryPsd = data.categoryPsd
          },

      })
      }

    },
    created () {
      this.setQuery2Value('type')
      this.$nextTick(()=>{
        this.strip()
      })
    }
  }
</script>

<style scoped>

</style>
