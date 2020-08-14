<template>
  <div class="f_main">
    <yhm-form-list-show>
      <template #title>来源信息</template>
      <template #operate>
<!--        <yhm-commonbutton value="添加" :flicker="true" icon="btnAdd" @call="addDetail()" category="three"></yhm-commonbutton>-->
      </template>
      <template #listHead>
        <yhm-managerth style="width: 38px;" title="选择"></yhm-managerth>
        <yhm-managerth style="width: 38px;" title="查看"></yhm-managerth>
        <yhm-managerth title="欠款方" ></yhm-managerth>
        <yhm-managerth style="width: 150px;" title="来源" ></yhm-managerth>
        <yhm-managerth style="width: 150px;" title="证件号" ></yhm-managerth>
        <yhm-managerth style="width:100px" title="欠款金额"></yhm-managerth>
        <yhm-managerth style="width: 80px;" title="状态" ></yhm-managerth>
      </template>
      <template #listBody>
        <tr :class="[{twinkleBg: item.id==lastData},{InterlacBg:index%2!=0}]" v-for="(item,index) in content" :key="index">
          <yhm-form-td-checkbox :value="item" @call="checkboxEvent"></yhm-form-td-checkbox>
          <yhm-manager-td-look @click="listView(item)"></yhm-manager-td-look>
          <yhm-manager-td :value="item.ownerName"></yhm-manager-td>
          <yhm-manager-td-psd :value="item.receivableSource" :list="receivableSourceList.list"></yhm-manager-td-psd>
          <yhm-manager-td :value="item.certificateNo"></yhm-manager-td>
          <yhm-manager-td-money :value="item.money"></yhm-manager-td-money>
          <yhm-manager-td-center :value="item.isFinish=='0'?'待收款':''" ></yhm-manager-td-center>
        </tr>
      </template>
    </yhm-form-list-show>
  </div>
</template>

<script>
  import { formmixin } from '@/assets/form.js'
  export default {
    name: 'receivableSourceForm',
    mixins: [formmixin],
    data(){
      return{
        receivableSourceList:{},//收入来源
        writeOffTypeList:{},//核销类型
        contentTotal:[
          {
            count:'',
            money:''
          }
        ],
        backupsTotal:[],//备份的汇总数据
        name:'',
        content:[],
        index:0,
        isLeftID:false,
        isRightID:false,
        isSelected:false,
        pager: {
          total: 0, // 总条数
          pageSize: 5, // 每页条数
          pageIndex: 1, // 当前页码
          selectCount: 0 // 选中条数
        }
      }
    },
    methods:{
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
            for(let j in this.content){
              if(this.content[j].id==selectValue[i]){
                arr.push(parseInt(this.content[j].money))
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
        this.$dialog.OpenWindow({
          width: '1050',
          height: '550',
          url: '/receivableManagerView?ownerID='+item.id,
          title: '查看应收账款',
          closeCallBack: (data) => {
            if(data){
              this.initData(false)
            }
          }
        })
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
        let a =selectList.indexOf(this.ownerID)
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
          this.ownerID=selectList[this.index]
        }else{
          this.setQuery2Value('ownerID')
        }
        this.initData(false)
      },
      initData (initValue) {
        let params = {}
        if (initValue) {
          params = {
            ownerID:this.ownerID
          }
        } else {
          params = {
            init:true,
            ownerID:this.ownerID,
            receivableSource:this.receivableSourceList.value,
          }
        }

        this.init({
          initValue:initValue,
          url: '/finance/receivable/getManagerSource',
          data:params,
          all:(data) =>{
            this.content = data.content
            this.receivableSourceList = data.receivableSourceList
            this.writeOffTypeList = data.writeOffTypeList
            this.contentTotal = data.total
            this.backupsTotal = data.total
          },
          init:(data)=>{

            //初始化时需要执行的代码
            // 这边初始化筛选信息
          }
        })
      }
    },
    created () {
      this.setQuery2Value('type')
      this.strip()
    }
  }
</script>

<style scoped>

</style>
