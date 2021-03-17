<template>
  <div>
    <yhm-managerpage category="1">
      <!--导航条-->
      <template #navigationTab>
        <router-link class="menuTabDiv" :to="{path:'/home/bossTrack/bossTrackManager'}">管理跟踪信息</router-link>
        <router-link class="menuTabDiv " :to="{path:'/home/bossTrack/bossTrackDetailsManager'}">管理跟踪反馈</router-link>
        <router-link class="menuTabDiv " :to="{path:'/home/bossTrack/followApprovalManager'}">审批跟踪信息</router-link>
        <router-link class="menuTabDiv menuTabActive" :to="{path:'/home/bossTrack/bossPerfectedManager'}">待分配客户信息</router-link>
      </template>
      <!--操作区-->
      <template #operate>

        <!--        <yhm-commonbutton  value="添加" icon="btnAdd" :flicker="true" @call="add()"></yhm-commonbutton>-->
        <yhm-managersearch :value="searchStr" :history="shortcutSearchContent" id="searchStr" @call="initChoose()"></yhm-managersearch>
        <yhm-commonbutton style="margin-left: 30px" value="批量更换负责人" icon="replace"  @call="replace()"></yhm-commonbutton>
        <yhm-commonbutton style="margin-left: 30px" value="批量数据转正" icon="replace"  @call="clickPrincipal()"></yhm-commonbutton>
        <yhm-commonbutton style="margin-left: 30px" value="导入Excel客户信息" icon="i-edit"  @call="importEvent()"></yhm-commonbutton>

        <!--<yhm-form-upload-image @call="importEvent" style="margin-left: 500px;color: red" title="导入Excel" tag="importExcel" discription="建议上传.xls格式" :value="icon" id="icon" rule="#" ></yhm-form-upload-image>-->
      </template>
      <!--筛选区-->
      <template #choose>
        <div v-show="choose" class="buttonBody mptZero">
        </div>
      </template>
      <!--数据表头-->
      <template #listHead>
        <yhm-managerth-check style="width: 40px;" :check="allCheck"></yhm-managerth-check>
        <yhm-managerth style="width: 40px;" title="查看"></yhm-managerth>
        <yhm-managerth  title="车牌号" value="plate"></yhm-managerth>
        <yhm-managerth  title="联系人" value="name"></yhm-managerth>
        <yhm-managerth  title="联系方式" value="phone"></yhm-managerth>
        <yhm-managerth  title="客户状态" value="state"></yhm-managerth>
        <yhm-managerth  title="去年投保公司" value="lastYearUnit"></yhm-managerth>
        <yhm-managerth  title="交强险到期日" value="forceEndDate"></yhm-managerth>
        <yhm-managerth  title="商业险到期日" value="businessEndDate"></yhm-managerth>

        <yhm-managerth  title="负责人" value="principal"></yhm-managerth>
        <yhm-managerth  style="width: 250px;" title="操作"></yhm-managerth>
      </template>

      <!--数据明细-->
      <template #listBody>
        <tr :class="[{twinkleBg: item.id==lastData},{InterlacBg:index%2!=0}]" v-for="(item,index) in content" :key="index">
          <yhm-manager-td-checkbox :value="item"></yhm-manager-td-checkbox>
          <yhm-manager-td-look @click="listView(item)"></yhm-manager-td-look>
          <yhm-manager-td :value="item.plate"></yhm-manager-td>
          <yhm-manager-td :value="item.name"></yhm-manager-td>
          <yhm-manager-td-center :value="item.phone" format="phone*"></yhm-manager-td-center>
          <yhm-manager-td :value="item.stateVal" ></yhm-manager-td>
          <yhm-manager-td :value="item.lastYearUnitVal"></yhm-manager-td>
          <yhm-manager-td-date :value="item.forceEndDate"></yhm-manager-td-date>
          <yhm-manager-td-date :value="item.businessEndDate"></yhm-manager-td-date>
          <yhm-manager-td :value="item.principal" v-if="item.principalID===''"></yhm-manager-td>
          <yhm-manager-td-center :value="item.principal" v-else :menu-list="principalIDMenu" @click="vehicleBrandLeft(item)" @rightClick="rightClick(item)" @menuClick="menuClick"></yhm-manager-td-center>
          <yhm-manager-td-operate>
            <yhm-manager-td-operate-button  @click="principalEvent(item.id)" value="数据转正" icon="icon-uniE9A2"  color="#ff0000" ></yhm-manager-td-operate-button>
            <yhm-manager-td-operate-button  @click="replacePrincipal(item.id)" value="更换负责人" icon="i-replace"  color="#0033FF" ></yhm-manager-td-operate-button>
            <yhm-manager-td-operate-button  @click="del(item.id)" value="删除" icon="delete"  color="#ff0000" ></yhm-manager-td-operate-button>
          </yhm-manager-td-operate>
        </tr>
      </template>

      <!--数据空提示-->
      <template #empty>
        <span class="m_listNoData" v-show="empty">暂时没有数据</span>
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
    name: 'bossPerfectedManager',
    mixins: [managermixin],
    data(){
      return{
        id :'',
        principal:'', //负责人
        principalID:'', //负责人ID
        stateBefore:'0',// 默认选择状态为可以选择，1为不可以选择

      }
    },
    methods:{
      importEvent(){
        this.$dialog.OpenWindow({
          width: '1450',
          height: '750',
          title: '导入Excel文档(建议上传.xls格式)',
          url: '/importFrom',
          closeCallBack: (data)=>{
            if(data){
              this.initPageData(false)
            }
          }
        })
        // let params={
        //   storeName:data.storeName
        // }
        // this.ajaxJson({
        //   url: '/Insurance/importExcel',
        //   data:params,
        //   call: (data) => {
        //     if (data.type === 0) {
        //       this.$dialog.alert({
        //         tipValue: data.message,
        //         closeCallBack: () => {
        //           this.initPageData(false)
        //         }
        //       })
        //     }else if(data.type === 1){
        //       this.$dialog.alert({
        //         alertImg:'warn',
        //         tipValue: data.message
        //       })
        //     }
        //   }
        // })
      },
      del(id){
        this.$dialog.confirm({
          tipValue: '删除数据请选择？',
          btnValueOk:'仅删除此条客户信息',
          btnValueCancel:'删除车辆和客户信息',
          width: 350,
          okCallBack: () => {
            let params={
              id:id,
              ownerID:0
            }
            this.ajaxJson({
              url: '/Insurance/perfectedDel',
              data:params,
              call: (data) => {
                if (data.type === 0) {
                  this.$dialog.alert({
                    tipValue: data.message,
                    closeCallBack: () => {
                      this.initPageData(false)
                    }
                  })
                }else if(data.type === 1){
                  this.$dialog.alert({
                    alertImg:'warn',
                    tipValue: data.message
                  })
                }
              }
            })
          },
          cancelCallBack:() => {
            let params={
              id:id,
              ownerID:1
            }
            this.ajaxJson({
              url: '/Insurance/perfectedDel',
              data:params,
              call: (data) => {
                if (data.type === 0) {
                  this.$dialog.alert({
                    tipValue: data.message,
                    closeCallBack: () => {
                      this.initPageData(false)
                    }
                  })
                }else if(data.type === 1){
                  this.$dialog.alert({
                    alertImg:'warn',
                    tipValue: data.message
                  })
                }
              }
            })
          }
        })
      },
      clickPrincipal(){
        if (this.selectValue.length ===0){
          this.$dialog.alert({
            tipValue:'至少选择一条信息!!!',
            alertImg: 'warn',
            width:'300'
          })
        }else {
          let arr = []
          if (this.selectValue.length>0) {
          for (let i = 0; i < this.selectValue.length; i++) {
            arr.push(this.selectValue[i])
          }
        }
        // this.id=arr.join(',')
        let params={
          id:arr.join(','),
        }
        this.ajaxJson({
          url: '/Insurance/changePerfected',
          data:params,
          call: (data) => {
            if (data.type === 0) {
              this.$dialog.alert({
                tipValue: data.message,
                closeCallBack: () => {
                  this.initPageData(false)
                }
              })
            }else if(data.type === 1){
              this.$dialog.alert({
                alertImg:'warn',
                tipValue: data.message
              })
            }
          }
        })
        }

      },
      principalEvent(id){
        let params={
          id:id,
        }
        this.ajaxJson({
          url: '/Insurance/changePerfected',
          data:params,
          call: (data) => {
            if (data.type === 0) {
              this.$dialog.alert({
                tipValue: data.message,
                closeCallBack: () => {
                  this.initPageData(false)
                }
              })
            }else if(data.type === 1){
              this.$dialog.alert({
                alertImg:'warn',
                tipValue: data.message
              })
            }
          }
        })
      },

      replace(){
        if (this.selectValue.length ===0){
          this.$dialog.alert({
            tipValue:'至少选择一条信息!!!',
            alertImg: 'warn',
            width:'300'
          })
        }else  if(this.selectValue.length ===1){
          //操作一条
          let arr=[]
          for(let i = 0;i<this.selectValue.length; i++){
            let key = this.selectValue[i]
            arr += key + '☆'
          }
          if (arr.length > 0) {
            arr = arr.substr(0, arr.length - 1);
          }
          this.initTrackMany(arr)
        }else  if (this.selectValue.length >1) {
          //操作多条
          let arr=[]
          for(let i = 0;i<this.selectValue.length; i++){
            let key = this.selectValue[i]
            arr += key + '☆'
          }
          if (arr.length > 0) {
            arr = arr.substr(0, arr.length - 1);
          }
          this.initTrackMany(arr)
        }
      },
      //多选客户是否有人已被跟踪信息
      initTrackMany(arr){
        //-->打开更换负责人页面
        this.$dialog.OpenWindow({
          width: 950,
          height: 692,
          url: '/selectPerson?category=0&categoryBefore=1&selectType=1',
          title: '更换负责人',
          closeCallBack: (data) => {
            if (data) {

              let idd=[]
              for (let i in data){
                idd.push(data[i].id)
              }
              this.principalID=idd.join('☆')
              this.principal = data.name

              this.$dialog.refresh()
              let params = {
                id:arr,
                principalID:this.principalID, //负责人ID

              }

              //-->具体操作
              this.ajaxJson({
                url: '/Insurance/replacePrincipalMany',
                data: params,
                call: (data) => {
                  if (data.type === 0) {
                    this.$dialog.alert({
                      tipValue: data.message,
                      closeCallBack: () => {
                        this.initPageData(false)
                      }
                    })
                  }else if(data.type === 1){
                    this.$dialog.alert({
                      alertImg:'warn',
                      tipValue: data.message
                    })
                  }
                }
              })
            }
          }
        })
      },

      listView(item){
        this.$dialog.OpenWindow({
          width: '1050',
          height: '650',
          url: '/bossPerfectedView?id=' + item.id,
          title: '查看客户信息',
          closeCallBack: (data)=>{
            if(data){
              this.initPageData(false)
            }
          }
        })
      },
      //添加
      // add () {
      //   this.$dialog.OpenWindow({
      //     width: '1050',
      //     height: '750',
      //     url: '/clientForm',
      //     title: '添加客户信息',
      //     closeCallBack: (data) => {
      //       if (data) {
      //         this.lastData = data
      //         this.initPageData(false)
      //         /*false->非初始化=>!import  true->初始化*/
      //       }
      //     }
      //   })
      // },

      replacePrincipal(id){
        this.id = id
        this.$dialog.OpenWindow({
          width: 950,
          height: 692,
          url: '/selectPerson?category=0&categoryBefore=1&id=' + this.id,
          title: '更换负责人',
          closeCallBack: (data) => {
            if (data) {
              this.principalID=data.id
              this.principal = data.name
              this.$dialog.refresh()
              let params = {
                id:this.id,
                principalID:this.principalID, //负责人ID

              }
              //-->具体操作
              this.ajaxJson({
                url: '/Insurance/replacePrincipal',
                data: params,
                call: (data) => {
                  if (data.type === 0) {
                    this.$dialog.alert({
                      tipValue: data.message,
                      closeCallBack: () => {
                        this.principalID=''
                        this.initPageData(false)
                      }
                    })
                  }else if(data.type === 1){
                    this.$dialog.alert({
                      alertImg:'warn',
                      tipValue: data.message
                    })
                  }
                }
              })
            }
          }
        })
      },


      //搜索
      initPageData (initValue) {
        let params = {}

        if (initValue) {
          params = {

          }
        } else {
          params = {

          }
        }
        this.init({
          initValue:initValue,
          url: '/Insurance/getPerfectedManager',
          data:params,
          all:(data) =>{
            //不管是不是初始化都需要执行的代码
          },
          init:(data)=>{
            //初始化时需要执行的代码
            this.listState=data.statePsd
          }
        })
      },
      //选择
      selectEvent (data) {
        this.selectValue = selectItem(this.selectValue, data)
      },
    }
  }
</script>

<style scoped>

</style>
