<template>
    <div class="f_main">
      <yhm-form-list-show>
        <template #title>基本信息</template>
        <template #operate>
<!--          <yhm-commonbutton  value="一键开始" icon=" " v-show="allBtnShow&&list.length!='0'" :is-error="true" @call="allAccomplish('1')"></yhm-commonbutton>-->
<!--          <yhm-commonbutton  value="一键完成" icon=" " v-show="allBtnShow&&list.length!='0'" :is-error="true" @call="allAccomplish('2')"></yhm-commonbutton>-->
        </template>
        <template #listHead>
          <yhm-managerth title="服务名称"></yhm-managerth>
          <!--          <yhm-managerth title="服务工序"></yhm-managerth>-->
          <yhm-managerth style="width: 190px" title="工序"></yhm-managerth>
          <yhm-managerth style="width: 120px" title="车辆"></yhm-managerth>
<!--          <yhm-managerth style="width: 120px" title="派工"></yhm-managerth>-->
<!--          <yhm-managerth style="width: 85px" title="收支方向"></yhm-managerth>-->
          <yhm-managerth style="width: 80px" title="状态"></yhm-managerth>
          <yhm-managerth style="width: 90px" title="完成状态"></yhm-managerth>
<!--          <yhm-managerth style="width: 160px;" title="操作"></yhm-managerth>-->
        </template>
        <template #listBody>
          <tr v-for="(item,index) in list" :class="[{InterlacBg:index%2!=0}]" :key="item.id">
            <yhm-manager-td :value="item.name"></yhm-manager-td>
            <!--<yhm-manager-td :value="item.teamNameList" style="text-align: center"></yhm-manager-td>-->
            <yhm-manager-td-psd :value="item.worktype" :list="teamNameList"></yhm-manager-td-psd>
            <yhm-manager-td-center :value="item.vehicle"></yhm-manager-td-center>
<!--            <yhm-manager-td-center :value="item.teamName"></yhm-manager-td-center>-->
<!--            <yhm-manager-td-center :value="directionList[item.direction].showName"></yhm-manager-td-center>-->
            <yhm-manager-td-center :value="stateList[item.state].showName"></yhm-manager-td-center>
            <yhm-manager-td-center v-if="item.teamStateStr=='0'" value="未开始" color="#49a9ea"></yhm-manager-td-center>
            <yhm-manager-td-center v-else-if="item.teamStateStr=='1'" value="进行中" color="#008f8d"></yhm-manager-td-center>
            <yhm-manager-td-center v-else-if="item.teamStateStr=='2'" value="已完成" color="#00b86b"></yhm-manager-td-center>
<!--            <yhm-manager-td-operate style="display: flex;justify-content:space-between;align-items: center;">-->
<!--              <div style="color:#8e08e3;" v-if="item.teamStateStr=='0'&&item.teamStateStr!='2'" @click="confirmServe(item,'1')">-->
<!--                开始任务-->
<!--              </div>-->
<!--              <div style="color:#666666;" v-else class="bannedClick">开始任务</div>-->
<!--              <div style="margin-left: 10px;color:#fd6802;" v-if="item.teamStateStr=='1'&&item.teamStateStr!='0'" @click="confirmServe(item,'2')">-->
<!--                结束任务-->
<!--              </div>-->
<!--              <div style="margin-left: 10px;color:#666666;" v-else class="bannedClick">结束任务</div>-->
<!--            </yhm-manager-td-operate>-->
          </tr>
        </template>
        <template #empty>
          <span class="m_listNoData" v-show="list.length=='0'?true:false">暂时没有数据</span>
        </template>
      </yhm-form-list-show>
    </div>
</template>

<script>
  import { formmixin } from '@/assets/form.js'
  export default {
    name: 'teamOrGroupForm',
    mixins: [formmixin],
    data(){
      return{
        list:[],
        title:'',
        allBtnShow:true,
        stateList:[],
        directionList:[],
        teamNameList:[],
        pager: {
          total: 0, // 总条数
          pageSize: 15, // 每页条数
          pageIndex: 1, // 当前页码
          selectCount: 0 // 选中条数
        }
      }
    },
    methods:{
      allAccomplish(stateStr){
        let list = []
        let items = {}
        console.log(this.list)
        for(let i in this.list){
          items = {}
          if(stateStr=='1'&&this.list[i].teamStateStr=='0'){
            items.id = this.list[i].id
            items.stateStr = stateStr
            list.push(items)
          }else if(stateStr=='2'&&this.list[i].teamStateStr=='1'){
            items.id = this.list[i].id
            items.stateStr = stateStr
            list.push(items)
          }
        }
        if(stateStr=='1'&&list.length==''){
          this.$dialog.alert({
            tipValue:'没有可一键开始的任务',
            alertImg:'warn',
            width:'300'
          })
          return
        }else if(stateStr=='2'&&list.length==''){
          this.$dialog.alert({
            tipValue:'没有可一键完成的任务',
            alertImg:'warn',
            width:'300'
          })
          return
        }
        this.$dialog.confirm({
          width: 300,
          tipValue: '是否确认一键完成当前任务？',
          btnValueOk: '确认',
          btnValueCancel: '取消',
          alertImg: 'warn',
          okCallBack: () => {
            this.ajaxJson({
              url: '/fix/fixTeamRecording/saveBath',
              data: list,
              call: (data) => {
                if(data.type==0){
                  this.$dialog.alert({
                    tipValue: data.message,
                    closeCallBack: () => {
                      this.initData()
                    }
                  })
                }else{
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
      initData() {
        let params = {
          // id: this.dependid,
          teamStateStr:'2',
          orderid:this.orderid,
          // worktype:this.type,
          isRepairid:'156',
          // isPage:'156',
          // pageSize:this.pager.pageSize,
          // pageIndex:this.pager.pageIndex
        }
        this.ajaxJson({
          url: '/fix/fixTeamRecording/getManager',
          data: params,
          call: (data) => {
            this.stateList = data.statePsd.list
            this.directionList = data.directionPsd.list
            this.teamNameList = data.teamNamePsd.list
            this.list = data.content
            let arr = []
            for(let i in this.list){
              arr.push(this.list[i].teamStateStr)
            }
            if(arr.indexOf('0')==-1&&arr.indexOf('1')==-1){
              this.allBtnShow = false
            }else{
              this.allBtnShow = true
            }
            try {
              this.type = this.list[0].worktype
            }catch (e) {

            }

            if(this.type=='0'){
              this.title = '钣金拆装或修复'
            }else if(this.type=='1'){
              this.title = '做底'
            }else if(this.type=='2'){
              this.title = '喷漆'
            }else if(this.type=='5'){
              this.title = '钣金'
            }else if(this.type=='4'){
              this.title = '抛光'
            }else if(this.type=='6'){
              this.title = '保养'
            }


          }
        })
      }
    },
    created () {
      this.setQuery2Value('orderid')
      this.setQuery2Value('type')

      this.initData()
    }
  }
</script>

<style scoped>

</style>
