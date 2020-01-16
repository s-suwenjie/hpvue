<template>
  <div>
    <yhm-manager-empty-page>
      <!--导航条-->
      <template #navigation>人力资源&nbsp;&gt;&nbsp;人事管理&nbsp;&gt;&nbsp;部门管理</template>
      <template #customize>
        <div v-if="!getShowOperate" class="m_operate">
          <yhm-commonbutton value="添加部门" icon="btnAdd" :flicker="true" @call="add()"></yhm-commonbutton>
        </div>
        <div v-if="getShowOperate" class="t_main disable_menu">
          <yhm-tree @call="treeEvent" :menu="treeMenuinfo" v-for="(item,i) in content" :content="content" :index="i" :last="i === content.length - 1" :key="item.id" :value="item">
          </yhm-tree>
        </div>
      </template>
    </yhm-manager-empty-page>
  </div>
</template>

<script>
  import { accAdd,accMul } from '@/assets/common.js'
  import { managermixin } from '@/assets/manager.js'
  export default {
    name: 'departmentManager',
    mixins: [managermixin],
    data(){
      return{
        treeMenuinfo:[
          {name:"添加子部门",category:[]},
          {name:"查看部门",category:[]},
          {name:"删除部门",category:[]},
          {name:"管理人员",category:[]}
        ],
        content:[]
      }
    },
    methods:{
      add(id){
        var parentID = ''
        if(id){
          parentID = id
        }
        this.$dialog.OpenWindow({
          width: 1050,
          height: 280,
          url:'/departmentForm?parentID='+ parentID,
          title:'添加部门信息',
          closeCallBack:(data) =>{
            if (data) {
              this.initPageData(false,data)
            }
          }
        })
      },
      look(id){
        this.$dialog.OpenWindow({
          width: 1050,
          height: 280,
          url:'/departmentForm?id='+id,
          title:'查看部门信息',
          closeCallBack:(data) =>{
            if (data) {
              this.initPageData(false,data)
            }
          }
        })
      },
      del(item){
        //
        var width = 300
        width = accAdd(accMul(15,item.name.length),width)
        this.$dialog.confirm({
          tipValue:'确定要删除部门<b class="red">（' + item.name +  '）</b>吗？',
          btnValueOk:'确定删除',
          width:width,
          okCallBack:() =>{
            var params = {
              id: item.id,
            }
            this.ajaxJson({
              url: '/Basic/delDepartment',
              data: params,
              call: (data) => {
                if (data.type == 0) {
                  this.$dialog.alert({
                    tipValue: data.message,
                    closeCallBack: () => {
                      this.initPageData(false,item.parentID)
                    }
                  })
                }else if(data.type == '1'){
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
      personManager(item){
        this.$dialog.OpenWindow({
          title:'管理人员（' + item.name + '）',
          url:'/departmentPersonForm?id='+item.id,
          width:'800',
          height:'600'
        })
      },
      treeEvent(category,item){
        if(category === '添加子部门'){
          this.add(item.id)
        }
        else if(category === '查看部门'){
          this.look(item.id)
        }
        else if(category === '删除部门'){
          this.del(item)
        }
        else if(category === '管理人员'){
          this.personManager(item)
        }
      },
      initPageData (initValue,id) {
        let params = {}

        if (initValue) {
          params = {}
        } else {
          if(!id){
            id = ''
          }
          params = {
            id:id
          }
        }
        this.init({
          initValue:initValue,
          url: '/Basic/getDepartmentManager',
          data:params,
          all:(data) =>{
            //不管是不是初始化都需要执行的代码
            this.content = []
            this.content.push(data)
          },
          init:(data)=>{
            //初始化时需要执行的代码
            // 这边初始化筛选信息
          }
        })
      }
    },
    computed: {
      getShowOperate () {
        return this.content.length > 0
      }
    }
  }
</script>

<style scoped lang="less">

</style>
