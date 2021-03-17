<template>
  <div>
    <yhm-managerpage>
      <!--      导航条      -->
      <template #navigation>&nbsp;字典</template>
      <template #operate>
        <!-- 操作区-->
        <yhm-commonbutton value="添加省市区县" v-if="name=='25'" icon="btnAdd" :flicker="true" @call="add" category="one"></yhm-commonbutton>
        <yhm-commonbutton value="返回上个页面" icon=" " :flicker="true" @call="$router.go(-1)" category="one"></yhm-commonbutton>

        <yhm-commonbutton :value="choose?'收起筛选':'展开筛选'" :icon="choose?'btnUp':'btnDown'" @call="switchChoose()"></yhm-commonbutton>
        <yhm-managersearch :value="searchStr" :history="shortcutSearchContent" id="searchStr" @call="initChoose"></yhm-managersearch>
      </template>
      <template #listHead>
        <yhm-managerth style="width: 40px;" title="选择"></yhm-managerth>
        <yhm-managerth style="width: 40px;" title="查看"></yhm-managerth>
        <yhm-managerth style="width: 100px" title="showName" value="showName"></yhm-managerth>
        <yhm-managerth style="width: 100px" title="value1" value="value1"></yhm-managerth>
        <yhm-managerth style="width: 100px" title="value2" value="value2"></yhm-managerth>
        <yhm-managerth style="width: 100px" title="value3" value="value3"></yhm-managerth>
        <yhm-managerth style="width: 100px" title="value4" value="value4"></yhm-managerth>
        <yhm-managerth style="width: 100px" title="value5" value="value5"></yhm-managerth>
        <yhm-managerth style="width: 100px;" title="value6" value="value6"></yhm-managerth>
        <yhm-managerth style="width: 100px;" title="value7" value="value7"></yhm-managerth>
        <yhm-managerth style="width: 100px;" title="value8" value="value8"></yhm-managerth>
        <yhm-managerth style="width: 100px;" title="value9" value="value9"></yhm-managerth>
        <yhm-managerth style="width: 100px;" title="value10" value="value10"></yhm-managerth>
        <yhm-managerth style="width: 100px;" title="value11" value="value11"></yhm-managerth>
        <yhm-managerth style="width: 100px;" title="value12" value="value12"></yhm-managerth>
      </template>
      <!--数据明细-->
      <template #listBody>
        <tr :class="[{twinkleBg: item.id==lastData},{InterlacBg:index%2!=0}]" v-for="(item,index) in content"
            :key="index">
          <yhm-manager-td-checkbox :value="item"></yhm-manager-td-checkbox>
          <yhm-manager-td-look @click="listView(item)"></yhm-manager-td-look>
          <yhm-manager-td :tip="true" :value="item.showName" ></yhm-manager-td>
          <yhm-manager-td :tip="true" :value="item.value1" ></yhm-manager-td>
          <yhm-manager-td :tip="true" :value="item.value2" ></yhm-manager-td>
          <yhm-manager-td :tip="true" :value="item.value3" ></yhm-manager-td>
          <yhm-manager-td :tip="true" :value="item.value4" ></yhm-manager-td>
          <yhm-manager-td :tip="true" :value="item.value5" ></yhm-manager-td>
          <yhm-manager-td :tip="true" :value="item.value6" ></yhm-manager-td>
          <yhm-manager-td :tip="true" :value="item.value7" ></yhm-manager-td>
          <yhm-manager-td :tip="true" :value="item.value8" ></yhm-manager-td>
          <yhm-manager-td :tip="true" :value="item.value9" ></yhm-manager-td>
          <yhm-manager-td :tip="true" :value="item.value10" ></yhm-manager-td>
          <yhm-manager-td :tip="true" :value="item.value11" ></yhm-manager-td>
          <yhm-manager-td :tip="true" :value="item.value12" ></yhm-manager-td>
        </tr>
      </template>

      <!--数据空提示-->
      <template #empty>
        <span class="m_listNoData" v-show="empty">暂时没有数据</span>
      </template>
      <!--分页控件-->
      <template #pager>
        <yhm-pagination :pager="pager" @initData="initData(false)"></yhm-pagination>
      </template>
    </yhm-managerpage>
  </div>
</template>

<script>
  import {managermixin} from '@/assets/manager.js'
  export default {
    name: 'dicManager',
    mixins: [managermixin],
    data() {
      return {
        name:'',
      }
    },
    methods:{
      add(){
        this.$dialog.OpenWindow({
          width: 1050,
          height: 620,
          url:'/dic25',
          title:'添加省市县',
          closeCallBack:(data) =>{
            if(data){
              this.initPageData(false)
            }
          }
        })
      },
      listView(item){
        this.$dialog.OpenWindow({
          width: 1050,
          height: 620,
          url:'/dicView?id='+item.id,
          title:'查看字典',
          closeCallBack:(data) =>{
            if(data){
              this.initPageData(false)
            }
          }
        })
      },
      initData (initValue) {
        let params = {}
        if (initValue) {
          //初始化
          params = {
            name: this.name,
          }
        } else {
          //非初始化
          params = {
            name: this.name,
          }
        }
        this.init({
          initValue: initValue,
          url: '/Com/dicManagerDataVue',
          data: params,
          all: (data) => {
            //不管是不是初始化都需要执行的代码

            this.ajaxJson({
              url: '/Com/sourceMaterial',
              data: params,
              call: (da) => {
              }
            })
          },
          init: (data) => {
            //初始化时需要执行的代码
            // 这边初始化筛选信息
          }
        })
      }
    },
    created () {
      this.setQuery2Value('name')
      this.initData()
    },
  }
</script>

<style scoped>

</style>
