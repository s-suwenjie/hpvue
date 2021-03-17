<template>
  <div class="f_main">

    <yhm-formbody>
<!--      v-if="shows"-->
      <template #title>筛选</template>
      <template #control>
        <yhm-form-radio title="状态" width="1" :no-edit="false" :select-list="statePsd" @call="motorcycleTypeRadio" :value="state" id="state"></yhm-form-radio>
        <yhm-form-radio title="适用车型" width="1" :no-edit="false" @call="motorcycleTypeRadio" :select-list="categoryPsd" :value="category" id="category"></yhm-form-radio>
      </template>
    </yhm-formbody>

    <yhm-form-list-show style="margin-top: 20px;" >

      <template #title>查看相关提醒事项</template>

<!--      <template #operate>-->
<!--        <yhm-commonbutton value="行政提醒"  icon="icon-urge" @call="addDetail()" category="three"></yhm-commonbutton>-->
<!--      </template>-->
      <template #listHead>
        <yhm-managerth style="width: 40px" title="查看"></yhm-managerth>
        <yhm-managerth style="width: 90px;" title="状态"></yhm-managerth>
        <yhm-managerth title="提醒事项"></yhm-managerth>
        <yhm-managerth style="width: 90px;" title="事项类型"></yhm-managerth>
        <yhm-managerth style="width: 130px;" title="初次提醒日期"></yhm-managerth>
        <yhm-managerth style="width: 130px;" title="提醒日期"></yhm-managerth>
        <yhm-managerth style="width: 150px;" title="操作"></yhm-managerth>
      </template>
      <template #listBody>
        <tr v-for="(item,index) in content" :class="[{InterlacBg:index%2!=0}]" :key="index">
          <yhm-manager-td-look @click="listView(item)"></yhm-manager-td-look>
          <yhm-manager-td-psd :value="item.state" :list="statePsd"></yhm-manager-td-psd>
          <yhm-manager-td-center :value="item.content"></yhm-manager-td-center>
          <yhm-manager-td-psd :value="item.category" :list="categoryPsd"></yhm-manager-td-psd>
          <yhm-manager-td-date :value="item.workDate"></yhm-manager-td-date>
          <yhm-manager-td-date :value="item.nextDate" v-if="item.nextDate != '1900-01-01'"></yhm-manager-td-date>
          <yhm-manager-td-date :value="item.workDate" v-if="item.nextDate == '1900-01-01'"></yhm-manager-td-date>
          <yhm-manager-td-operate>
            <yhm-manager-td-operate-button @click="printFund(item)" :no-click="item.state == '0'?false:true"  value="完成" icon="icon-Yes" :color="item.state == '2'?'#49a9ea':'#333'"></yhm-manager-td-operate-button>
            <yhm-manager-td-operate-button @click="delFromList(item)" :no-click="item.state == '0'?false:true"  value="延期提醒" icon="icon-urge" :color="item.state == '1'?'red':'red'"></yhm-manager-td-operate-button>
          </yhm-manager-td-operate>
        </tr>
      </template>
      <template #empty>
        <span class="m_listNoData" v-show="content.length==0">暂时没有数据</span>
      </template>

    </yhm-form-list-show>
  </div>
</template>

<script>
  // import { accMul, accAdd, guid, formatDate,formatTime } from '@/assets/common.js'
  import { formmixin } from '@/assets/form.js'
  export default {
    name: 'warnDetailform',
    mixins: [formmixin],
    data(){
      return {
        content:[],
        year:'',
        month:'',
        day:'',

        categoryPsd:[],
        statePsd:[],
        state:'',
        category:'',

        shows:false,
      }
    },
    created(){

      this.setQuery2Value('year')
      this.setQuery2Value('month')
      this.setQuery2Value('day')
      console.log(this.setQuery2Value('year'))

      this.initPage()
    },
    methods:{

      initPage(){
        let params={
          year:this.year,
          month:this.month,
          day:this.day
        }
        console.log(params)
        this.ajaxJson({
          url: '/dailyoffice/warn/getManagerList',
          data: params,
          // loading: '0',
          call: (data) => {
            this.categoryPsd=data.categoryPsd.list
            this.statePsd=data.statePsd.list
            // console.log(this.categoryPsd)
            // console.log(this.statePsd)
            this.content=data.content
          }
        })
      },
      addDetail(){
        this.shows=!this.shows
      },
      printFund(item){//确认完成按钮
        let params={
          id:item.id,
        }
        this.ajaxJson({
          url: '/dailyoffice/warn/warnIsFinish',
          data: params,
          // loading: '0',
          call: (data) => {
            this.$dialog.confirm({
              width: 300,
              tipValue: data.message,
              btnValueOk: '确定',
              alertImg: 'warn',
              okCallBack: (data) => {
                this.initPage()
              }
            })
          }
        })

      },
      delFromList(item){//延迟提醒

        this.$dialog.OpenWindow({
          width: 1050,
          height: 720,
          url:'/warnTimeoutSelect?year='+this.year+'&month='+this.month+"&day="+this.day,
          title:'延迟提醒',
          closeCallBack:(data) =>{

            if(data){
              console.log(data)
              let params={
                id:item.id,
                nextDate:data
              }
              this.ajaxJson({
                url: '/dailyoffice/warn/warnNextDate',
                data: params,
                call: (data) => {
                  this.$dialog.confirm({
                    width: 300,
                    tipValue: data.message,
                    btnValueOk: '确定',
                    alertImg: 'warn',
                    okCallBack: (data) => {

                    }
                  })
                }
              })
            }
          }
        })
      },
      motorcycleTypeRadio(){
        console.log(this.state)
        console.log(this.category)

        let params={
          year:this.year,
          month:this.month,
          day:this.day,
          state:this.state,
          category:this.category,
        }

        this.ajaxJson({
          url: '/dailyoffice/warn/getManagerList',
          data: params,
          // loading: '0',
          call: (data) => {
            // this.categoryPsd=data.categoryPsd.list
            // this.statePsd=data.statePsd.list
            this.content=data.content
          }
        })
      },
      listView(item){
        this.$dialog.OpenWindow({
          width: 1050,
          height: 720,
          url:'/warnFormView?id='+item.id,
          title:'查看事项',
          closeCallBack:(data) =>{

          }
        })
      }
    }

  }
</script>

<style scoped>

</style>
