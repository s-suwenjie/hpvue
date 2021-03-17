<template>
  <div>
    <yhm-managerpage opera-lft-top="60px">
      <template #navigation>售后业务&nbsp;&gt;&nbsp;工单&nbsp;&gt;&nbsp;待作业</template>
      <!--操作区-->
      <template #operate>
<!--        <yhm-commonbutton  value="显示全部人员任务" v-show="reverlAllShow" icon=" " :flicker="true" @call="reverlAll()"></yhm-commonbutton>-->
<!--        <yhm-commonbutton  value="关闭全部人员任务" v-show="!reverlAllShow" icon=" " :flicker="true" @call="initPageData()"></yhm-commonbutton>-->

        <yhm-commonbutton :value="choose?'收起筛选':'展开筛选'" :icon="choose?'btnUp':'btnDown'" @call="switchChoose()"></yhm-commonbutton>
        <yhm-managersearch :value="searchStr" :history="shortcutSearchContent" id="searchStr" @call="initData"></yhm-managersearch>
        <yhm-radiofilter  @initData="initChoose('category')" title="维修类型" :content="categoryPsd"></yhm-radiofilter>
        <yhm-radiofilter  @initData="initChoose('applicableModels')" title="品牌" :content="applicableModelsPsd"></yhm-radiofilter>
        <yhm-radiofilter  @initData="initChoose('stateFlag')" title="工作状态" :content="stateFlagPsd"></yhm-radiofilter>
        <yhm-radiofilter style="margin-top: 5px;"  @initData="initChoose('sub')" title="保险公司" :content="subPsd"></yhm-radiofilter>

      </template>
      <!--筛选区-->
      <template #choose>
        <div v-show="choose" class="buttonBody mptZero">
          <yhm-radiofilter  @initData="initChoose('state')" title="状态" :content="statePsd"></yhm-radiofilter>

        </div>
      </template>
      <template #video>
<!--        <yhm-td-checkbox-show width="180px" height="auto" value="-&#45;&#45;&#45;&#45; 自定义查看列表 -&#45;&#45;&#45;&#45;" :options-list="optionsList" :select-list="columnShow"></yhm-td-checkbox-show>-->
      </template>

      <!--数据表头-->
      <template #listHead>
        <yhm-managerth :show="columnShow[0]" style="width: 38px;" title="选择"></yhm-managerth>
        <!--        <yhm-managerth :show="columnShow[1]" style="width: 38px;" title="查看"></yhm-managerth>-->
        <yhm-managerth :show="columnShow[1]" width="135" title="接待日期"></yhm-managerth>
        <yhm-managerth :show="columnShow[2]" width="110" title="接待人"></yhm-managerth>
        <yhm-managerth :show="columnShow[3]" width="190" title="工单号"></yhm-managerth>
        <yhm-managerth :show="columnShow[4]" width="110" title="维修类型"></yhm-managerth>
        <yhm-managerth :show="columnShow[5]" width="110" title="车牌号"></yhm-managerth>
        <yhm-managerth :show="columnShow[6]" width="110" title="品牌"></yhm-managerth>
        <yhm-managerth :show="columnShow[7]" title="车主"></yhm-managerth>
        <yhm-managerth :show="columnShow[8]" width="110" title="联系人"></yhm-managerth>
        <yhm-managerth :show="columnShow[9]" width="90" title="保险公司"></yhm-managerth>
        <yhm-managerth :show="columnShow[10]" width="103" title="计划收入金额"></yhm-managerth>
        <yhm-managerth :show="columnShow[11]" width="103" title="项目金额"></yhm-managerth>
        <yhm-managerth :show="columnShow[12]" width="103" title="材料金额"></yhm-managerth>
        <yhm-managerth :show="columnShow[13]" width="103" title="合计金额"></yhm-managerth>
        <yhm-managerth :show="columnShow[14]" width="130" title="状态"></yhm-managerth>
        <yhm-managerth :show="columnShow[15]" width="330" title="操作"></yhm-managerth>

      </template>

      <!--数据明细-->
      <template #listBody>
        <tr :class="[{InterlacBg:index%2!=0}]" v-for="(item,index) in content" :key="index">
          <yhm-manager-td-checkbox :show="columnShow[0]" :value="item"></yhm-manager-td-checkbox>
          <!--          <yhm-manager-td-look   :show="columnShow[1]" @click="listView(item)"></yhm-manager-td-look>-->
          <yhm-manager-td-date   :show="columnShow[1]" :value="item.workDate"></yhm-manager-td-date>
          <yhm-manager-td-center :show="columnShow[2]" :value="item.client"></yhm-manager-td-center>
          <yhm-manager-td :show="columnShow[3]" :value="item.code"></yhm-manager-td>

          <yhm-manager-td-center :show="columnShow[4]" v-if="item.category==''||item.category==null" value="-----"></yhm-manager-td-center>
          <yhm-manager-td-psd    :show="columnShow[4]" v-else :value="item.category" :list="categoryList"></yhm-manager-td-psd>
          <yhm-manager-td  type="vehicle" :show="columnShow[5]" :value="item.vehicle"></yhm-manager-td>

          <yhm-manager-td-center :show="columnShow[6]" v-if="item.applicableModels==''" value="-----"></yhm-manager-td-center>
          <yhm-manager-td-psd    :show="columnShow[6]" v-else :value="item.applicableModels" :list="applicableModelsList"></yhm-manager-td-psd>

          <yhm-manager-td :tip="true" :show="columnShow[7]" @click="lookOverCarOwner(item)" :value="item.carOwner"></yhm-manager-td>
          <yhm-manager-td :tip="true" :show="columnShow[8]" :value="item.contactPerson"></yhm-manager-td>

          <yhm-manager-td-center :show="columnShow[9]" v-if="item.subid==''||item.subid==null" value="-----" color="#9a8478"></yhm-manager-td-center>
          <yhm-manager-td-psd  :show="columnShow[9]" v-else :value="item.subid" :list="subList"></yhm-manager-td-psd>

          <yhm-manager-td-money  :show="columnShow[10]" style="color:#0012FB" :value="item.incomePlan==-1?'0':item.incomePlan"></yhm-manager-td-money>
          <yhm-manager-td-money  :show="columnShow[11]" style="color:#008f8d" :value="item.productMoney==-1?'0':item.productMoney"></yhm-manager-td-money>
          <yhm-manager-td-money  :show="columnShow[12]" style="color:#2193b0" :value="item.mailMoney==-1?'0':item.mailMoney"></yhm-manager-td-money>
          <yhm-manager-td-money  :show="columnShow[13]" style="color:#fd6802" :value="item.expend==-1?'0':item.expend"></yhm-manager-td-money>

          <yhm-manager-td-psd :show="columnShow[14]" :value="item.state" :list="stateList"></yhm-manager-td-psd>
          <yhm-manager-td-operate :show="columnShow[15]" style="display: flex;">
<!--            :no-click="item.state=='25'||item.state=='26'?false:true" :color="item.state=='25'||item.state=='26'?'#8e08e3':'#333'"-->
            <yhm-manager-td-operate-button icon="i-btn-applicationSm" @click="lookOver(item)" :no-click="item.isFlag=='0'?false:true" :color="item.isFlag==0?'#8e08e3':'#333'" value="查看当前任务" color="#8e08e3"></yhm-manager-td-operate-button>
            <yhm-manager-td-operate-button icon="i-btn-applicationSm" v-show="Number(item.fixTeamRecordingNum)>1" @click="lookOverAllTask(item)" value="查看历史任务" color="#fd6802"></yhm-manager-td-operate-button>
            <yhm-manager-td-operate-button icon="i-btn-applicationSm" @click="materialsClick(item)" value="材料出库" color="#49a9ea"></yhm-manager-td-operate-button>

          </yhm-manager-td-operate>
        </tr>
      </template>
      <!--数据空提示-->
      <template #empty>
        <span class="m_listNoData" v-show="content.length=='0'?true:false">暂时没有数据</span>
      </template>
      <!--分页控件-->
      <template #pager>
        <yhm-pagination :pager="pager" @initData="initPageData(false)"></yhm-pagination>
      </template>
    </yhm-managerpage>
  </div>
</template>

<script>
  import { managermixin } from '@/assets/manager.js'
  export default {
    name: 'teamOrGroupManager1',
    mixins: [managermixin],
    data(){
      return{
        reverlAllShow:true,//关闭全部显示
        stateList:[],//状态
        statePsd:[],//筛选 状态
        categoryList:[],//维修类型
        categoryPsd:[],//筛选 维修类型
        applicableModelsList:[],//品牌
        applicableModelsPsd:[],//筛选 品牌
        subList:[],//保险公司
        subPsd:{},//筛选 保险公司
        stateFlagPsd:{
          list:[],
          value:''
        },//工作状态
        optionsList:['选择','接待日期','接待人','工单号','维修类型','车牌号','品牌','车主','联系人','保险公司','计划收入金额','项目金额','材料金额','合计金额','状态','操作'],
        columnShow:[true,true,true,true,true,true,true,true,true,true,false,false,false,false,true,true],

        indexs:0,//总索引值
        key:0,
        state:'',//当前主流程表是否已完成
        stage:'',//阶段
        ownerID:'',
        // prepareShow:false,//准备阶段是否展示出来
        mainList:[],
        list:[],
        list2:[],
        list3:[],//返修节点的数据
        stateStrList:[],//工序状态
        flowPathID:'',//主流程图id
        immobilizationList:[
          {
            list:[
            ]
          },
        ],
      }
    },
    methods:{
      materialsClick(item){
        this.ajaxJson({
          url: '/fix/fixProcess/initForm',
          data: {
            ownerID: item.id
          },
          call: (data) => {
            if (data) {
              console.log(data)
              this.$dialog.OpenWindow({
                width: '1050',
                height: '700',
                url:'/workOrderStockOutManagerView?ownerID='+data.ownerID+'&flowPathID='+data.id,
                title:'材料出库',
                closeCallBack:(data) =>{
                  this.initPageData(false)
                }
              })
            }
          }
        })

      },
      lookOverCarOwner(item){//查看车主
        if(item.carOwnerID!=''&&item.unitType=='1'){
          this.$dialog.OpenWindow({
            width: '1070',
            height: '750',
            url:'/personView?id='+item.carOwnerID,
            title:'查看车主信息',
            closeCallBack:(data) =>{
              this.initPageData(false)
            }
          })
        }else{
          this.$dialog.OpenWindow({
            width: '1070',
            height: '750',
            url:'/unitView?id='+item.carOwnerID,
            title:'查看车主信息',
            closeCallBack:(data) =>{
              this.initPageData(false)
            }
          })
        }
      },
      reverlAll(){
        this.reverlAllShow = false
        let params = {}
        params = {
          subid:this.subPsd.value,
          state:this.statePsd.value,
          worktype:'1',
          category:this.categoryPsd.value,
          applicableModels:this.applicableModelsPsd.value
        }
        this.ajaxJson({
          url: '/fix/fixOrder/getManagerGroupByTeam2',
          data:params,
          call: (data) => {
            this.content = data.content
            this.pager.total = data.count
            let mapList = data.mapList.concat()
            this.subPsd = {
              list:this.subPsd,
              value:''
            }
            // this.subList = mapList
            // this.categoryList = data.categoryPsd.list
            // this.categoryPsd = data.categoryPsd
            // this.stateList = data.statePsd.list
            // this.statePsd = data.statePsd
            // this.applicableModelsList = data.applicableModelsPsd.list
            // this.applicableModelsPsd = data.applicableModelsPsd

          }
        })
      },
      lookOverAllTask(item){
        this.$dialog.OpenWindow({
          width: '1050',
          height: '800',
          url:  '/teamOrGroupForm?type=6&orderid='+item.id,
          title: '查看历史任务',
          closeCallBack:(data) =>{
            this.initPageData(false)
          }
        })
      },
      skipEvent(url,title,height){
        if(!height||height==undefined){
          height='700'
        }
        this.$dialog.OpenWindow({
          width: '1050',
          height: height,
          url:url,
          title:title,
          closeCallBack:(data) =>{
            this.initPageData(false)
          }
        })
      },
      generatingProcess(){
        this.mainList = [] //每次渲染时清空之前的数组
        let quantity = this.list3.length/5 //需要生成几组数据（每组五个）
        let num = 0 //添加检验节点后需要生成几组
        //先向固定准备阶段补一个服务节点 凑满一组5个

        if(Number(quantity)%1==0){//计算总数除以5是否可以整除
          num = quantity + 1
        }else{//无法整除时截取小数点前的数据 并加一
          num = parseInt(quantity.toString().substring(0,quantity.toString().indexOf('.')))+1
          if(num==0){//如果不满足5条时 改变为1 下边生成一组数据
            num==1
          }
        }
        for(let i=0; i<num; i++){//先根据数据条数生成每个组
          this.mainList.push({
            direction:i%2==0?2:1,
            list:[]
          })
        }
        let a = 0
        this.list3.unshift('11')
        for(let j=1; j<this.list3.length; j++){
          if(j!=0&&j%5==0){//判断除以4==0时 表示是当前数组的最后一条
            this.mainList[a].list.push({
              'title':this.list3[j].nameStr,
              'id':this.list3[j].id,
              'dependid':this.list3[j].dependid,
              'type':this.list3[j].type,
              'stage':'2',
              'state':this.list3[j].state,
              'color':this.list3[j].color,
              'circleIcon':'',
              'ownerID':this.list3[j].ownerID,
              'direction':a%2==0?2:1,//判断方向来添加相应的样式
              'index':Number(this.list3[j].orderStr),
              'orderStr':Number(this.list3[j].orderStr),
            })
            a++
          }else{
            this.mainList[a].list.push({
              'title':this.list3[j].nameStr,
              'id':this.list3[j].id,
              'dependid':this.list3[j].dependid,
              'type':this.list3[j].type,
              'stage':'2',
              'state':this.list3[j].state,
              'color':this.list3[j].color,
              'circleIcon':'',
              'direction':'',
              'ownerID':this.list3[j].ownerID,
              'index':Number(this.list3[j].orderStr),
              'orderStr':Number(this.list3[j].orderStr),
            })
          }
        }
        setTimeout(()=>{
          this.beginClick()
        },0)
      },
      beginClick(){
        let url = ''
        let title = ''
        let height = '700'
        let inTheEnd = ''
        let index = ''
        let item = ''
        item = this.list2[this.indexs]
        inTheEnd = item.orderStr==this.list2.length-1//判断是否是最后一个服务节点
        index = this.list2.length//检修节点的索引值
        if(Number(item.orderStr)<=Number(this.indexs)){
          if(item.type=='0'){
            let flowType = 7
            if(Number(this.indexs)>3){
              flowType = 6
            }
            url = '/sheetMetalRepairForm?btnShow=1&ownerID='+this.ownerID+'&flowPathID='+this.flowPathID+'&flowType='+flowType
              +'&index='+item.index+'&upDateStateID='+item.id + '&teamOrGroup=1'
            title = '钣金拆装或修复'
            this.skipEvent(url,title)
            return
          }else if(item.type=='3'&&item.nameStr=='检修'){
            url = '/workOrderCheckoutManagerView?ownerID='+this.ownerID+'&subProcessID='+item.id
              +'&flowPathID='+this.flowPathID+'&state='+this.state+'&index='+item.orderStr
              +'&upDateStateID='+item.id+'&inTheEnd='+inTheEnd+ '&teamOrGroup=1'
            title = '检修'
            this.skipEvent(url,title,'700')
            return
          }else if(item.type=='4'&&item.nameStr=='质检确认'){
            url = '/workOrderCheckoutAffirmManager?ownerID='+this.ownerID+
              '&inTheEnd='+inTheEnd+'&flowPathID='+this.flowPathID+
              '&index='+item.orderStr+'&state='+item.state+ '&teamOrGroup=1',
              title = '质检确认'
            this.skipEvent(url,title,'700')
            return
          }
          if(item.type=='2'){//查看工序
            let type = 5
            let state = 0
            for(let i in this.list3){
              if(this.list3[i].nameStr=='质检确认'){
                type = 6
              }
            }
            if(item.type=='2'){
              state = 2
            }
            url = '/workOrderProcessForm?btnShow=1&ownerID='+this.ownerID
              +'&flowPathID='+this.flowPathID+'&index='+item.index
              +'&flowType=6'+'&dependid='+item.dependid
              +'&upDateStateID='+item.id+'&inTheEnd='+inTheEnd+'&nodeType='+type
              +'&state='+state+ '&teamOrGroup=1'
            title = '查看'+item.title
            this.skipEvent(url,title)
          }
          if(item.nameStr=='选择工序'){
            url = '/workOrderProcessForm?btnShow=1&ownerID='+this.ownerID+'&flowPathID='+this.flowPathID+'&index='+item.orderStr+ '&teamOrGroup=1'
            title = '选择工序'
            this.skipEvent(url,title)
            return
          }
          if(item.type=='6'&&item.title=='待结账'){//待结账节点
            url = '/workOrderSettleAccountsForm?ownerID='+this.ownerID+'&flowPathID='+this.flowPathID+'&inTheEnd='+inTheEnd+'&index='+item.index+'&upDateStateID='+item.id+ '&teamOrGroup=1'
            title = item.title
            height = '800'
            this.skipEvent(url,title,height)
          }
        }
      },
      selectionProcess(type){
        let selectionProcessObject = {//展示向的 选择工序的数据
          id:'AAAAA',
          ownerID:'',
          dependid:'',
          title:'选择工序',
          nameStr:'选择工序',
          stage:this.list2.length,
          state:'1',
          type:'1',
          index:this.list2.length,
          orderStr:this.list2.length,
          color:'#49a9ea',
        }
        let selectionProcessObject2 = {
          id:'AAAAA',
          ownerID:'',
          dependid:'',
          title:'选择工序',
          nameStr:'选择工序',
          stage:this.list.length+1,
          state:'1',
          type:'1',
          index:this.list.length,
          orderStr:this.list.length,
          direction:this.list.length=='4'?'1':'0',
          color:'#49a9ea',
        }
        if(type=='0'){
          if(this.list.length<='4'&&this.list2[this.list2.length-1].state=='2'&&this.list2[this.list2.length-1].type=='2'){
            this.immobilizationList[0].list.push(selectionProcessObject2)
            this.list2.push(selectionProcessObject2)
          }else if(this.list.length<='4'&&this.list2[this.list2.length-1].state=='2'&&this.list2[this.list2.length-1].type=='4'){
            this.immobilizationList[0].list.push(selectionProcessObject2)
            this.list2.push(selectionProcessObject2)
          }else if(this.list.length>='5'&&this.list2[this.list2.length-1].state=='2'&&this.list2[this.list2.length-1].type=='2'){
            this.list3.push(selectionProcessObject)
            this.list2.push(selectionProcessObject)
          }else if(this.list.length>='5'&&this.list2[this.list2.length-1].state=='2'&&this.list2[this.list2.length-1].title=='质检确认'){
            this.list3.push(selectionProcessObject)
            this.list2.push(selectionProcessObject)
          }else if(this.list.length<='4'&&this.list2[this.list2.length-1].state=='2'&&this.list2[this.list2.length-1].type=='0'){
            this.immobilizationList[0].list.push(selectionProcessObject2)
            this.list2.push(selectionProcessObject2)
          }
        }else if(type=='1'){
          if(this.list.length<='4'){
            for(let i in this.immobilizationList[0].list){
              if(this.immobilizationList[0].list[i].id=='AAAAA'){
                this.immobilizationList[0].list.splice(i,1)
              }
            }
            for(let j in this.list2){
              if(this.list2[j].id=='AAAAA'){
                this.list2.splice(j,1)
              }
            }
          }else if(this.list.length=='5'){
            for(let t in this.list2){
              if(this.list2[t].id=='AAAAA'){
                this.list2.splice(t,1)
              }
            }
            for(let t in this.list3){
              if(this.list3[t].id=='AAAAA'){
                this.list3.splice(t,1)
              }
            }
          }
        }
      },
      lookOver(item){
        this.ownerID = item.id
        this.ajaxJson({
          url: '/fix/fixProcess/initForm',
          data:{
            ownerID:item.id
          },
          call: (data) => {
            if(data){
              this.$dialog.setReturnValue(this.id) //向父级页面id值


              let stageArr = []//保存所有stage等于0的状态的索引值
              let stageArr2 = []//保存所有stage状态的索引值
              this.immobilizationList[0].list = []
              this.flowPathID = data.id
              this.list = data.list
              this.list2 = data.list2
              this.list3 = data.list3
              this.stage = data.stage
              this.state = data.state
              this.indexs = data.stage
              this.stateStrList = data.stateStrPsd

              for(let m=0; m<data.list.length; m++){
                this.immobilizationList[0].list.push({
                  id:data.list[m].id,
                  ownerID:data.list[m].ownerID,
                  dependid:data.list[m].dependid,
                  title:data.list[m].nameStr,
                  stage:data.list[m].stage,
                  state:data.list[m].state,
                  type:data.list[m].type,
                  index:data.list[m].orderStr,
                  direction:m=='4'?'1':'0',
                  color:data.list[m].color,
                })
              }
              this.selectionProcess('0')
              this.generatingProcess()

            }
          }
        })
      },
      //搜索
      initPageData (initValue) {
        this.reverlAllShow = true
        let params = {}
        params = {
          subid:this.subPsd.value,
          state:this.statePsd.value,
          // worktype:'6',
          stateFlag:this.stateFlagPsd.value,
          category:this.categoryPsd.value,
          applicableModels:this.applicableModelsPsd.value
        }
        this.init({
          initValue:initValue,
          url: '/fix/fixOrder/getManagerGroupByTeam3',
          data:params,
          all:(data) =>{
            //不管是不是初始化都需要执行的代码

          },
          init:(data)=>{
            let mapList = data.mapList.concat()
            this.subList = mapList

            this.subPsd = {
              list:this.subList,
              value:''
            }
            this.stateFlagPsd = data.stateFlagPsd
            this.categoryList = data.categoryPsd.list
            this.categoryPsd = data.categoryPsd
            this.stateList = data.statePsd.list
            this.statePsd = data.statePsd
            this.applicableModelsList = data.applicableModelsPsd.list
            this.applicableModelsPsd = data.applicableModelsPsd

            //初始化时需要执行的代码
            // 这边初始化筛选信息

          }
        })

      }
    },
    created () {

    }
  }
</script>

<style scoped>

</style>
