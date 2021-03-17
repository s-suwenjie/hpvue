<template>
  <div class="f_main f_main_customize mb16">
    <yhm-select-body :choose="false">
      <template #operate>
        <yhm-commonbutton value="添加" icon="btnAdd" @call="selectAddEvent()"></yhm-commonbutton>
        <yhm-managersearch :value="searchStr" id="searchStr" @call="initPageData"></yhm-managersearch>
      </template>
      <template #listHead>
        <yhm-managerth-check v-if="selectType === '1'" is-select :check="allCheck" style="width: 40px;"></yhm-managerth-check>
        <yhm-managerth v-if="selectType === '0'" width="40" title="选择"></yhm-managerth>
        <yhm-managerth  title="用户名称"></yhm-managerth>
        <yhm-managerth  title="用户编号"></yhm-managerth>
<!--        <yhm-managerth  title="部门名称"></yhm-managerth>-->
        <yhm-managerth  title="班组名称"></yhm-managerth>

      </template>
      <template #listBody>
        <tr v-for="(item,index) in content"
            :class="{InterlacBg:index%2!=0}"
            :key="item.id"
            @click="selectEvent(item)"
        >
          <!--            @dblclick="dblclickEvent(item)"-->
          <yhm-manager-td-checkbox :value="item" :no-click="false"></yhm-manager-td-checkbox>
          <yhm-manager-td-center :value="item.userName"></yhm-manager-td-center>
          <yhm-manager-td-center :value="item.userNum"></yhm-manager-td-center>
<!--          <yhm-manager-td-center :value="item.department"></yhm-manager-td-center>-->
          <yhm-manager-td-center :value="item.teamName"></yhm-manager-td-center>

        </tr>
      </template>

      <template #empty>
        <span class="m_listNoData" v-show="content.length === 0">暂时没有数据</span>
      </template>
      <template #pager>
        <!--        <yhm-pagination is-not-right :pager="pager" isPageSize="false" @initData="initPageData(false)"></yhm-pagination>-->
        <div style="width: 100%;display: flex;justify-content: center;align-items: center;margin-top: 10px;">
          <yhm-commonbutton class="mr0" icon="i-complete" value="确定" category="two" @call="selectConfirmEvent()"></yhm-commonbutton>

        </div>
      </template>
    </yhm-select-body>

  </div>
</template>

<script>
  import { accAdd } from '@/assets/common.js'
  import { selectmixin } from '@/assets/select.js'
  export default {
    name: 'selectPeopleManagement',
    mixins: [selectmixin],
    data(){
      return{
        selectType:'1',
        categoryList:[],
        stateList:[],
        applicableModelsList:[],
      }
    },
    methods:{
      selectAddEvent () {
        this.$dialog.OpenWindow({
          width: 1072,
          height: 650,
          url:'/peopleManagementForm?type=1',
          title:'添加班组人员',
          closeCallBack: (data)=>{
            this.initPageData(false)
          }
        })
      },
      initPageData(initValue){
        let params = {}
        if (initValue) {
          // 页面初始化是需要的参数
          params = {
            teamid:this.teamid,
            departid:this.departid
          }
        } else {
          // 页面非初始化时需要的参数
          params = {
            teamid:this.teamid,
            departid:this.departid
          }
        }
        this.init({
          initValue: initValue,
          url: '/fix/fixTeam/getManager',
          data: params,
          all: (data) => {
            // 不管是不是初始化都需要执行的代码
            // this.content = data.content
            if(this.allCheck){
              for(let i in this.content){
                let id = this.content[i].id
                let sign = true
                if(this.selectValue.length > 0){
                  for (var j = 0; j < this.selectValue.length; j++){
                    if(Object.keys(this.selectValue[j])[0] === id) {
                      sign = false
                      break;
                    }
                  }
                }
                if(sign) {
                  let val = {}
                  val[id] = this.content[i]
                  this.selectValue.push(val)
                }
              }
            }
            else{
              let check = true
              for(let i in this.content){
                let id = this.content[i].id
                let sign = false
                if(this.selectValue.length > 0){
                  for (var j = 0; j < this.selectValue.length; j++){
                    if(Object.keys(this.selectValue[j])[0] === id){
                      sign = true
                    }
                  }
                }
                if(!sign){
                  check = false
                }
              }
              this.allCheck = check
            }
          },
          init: (data) => {
            // 初始化时需要执行的代码
            // this.listCategory = data.listCategory

            // for(let i in this.content){
            //   this.allMoney += parseFloat(this.content[i].totalMoney)
            // }


          }
        })
      },

    },
    created () {
      this.setQuery2Value('teamid')
      this.setQuery2Value('departid')
      this.setQuery2Value('selectType')
      if(this.selectType === '1'){
        this.allCheck = true
      }
    },
  }
</script>

<style scoped>

</style>

