<template>
  <div>
    <yhm-managerpage :customize="true">
      <!--导航条-->
      <template #navigation>系统&nbsp;&gt;&nbsp;系统管理&nbsp;&gt;&nbsp;菜单管理</template>
      <template v-if="!getShowOperate" #operate>
        <yhm-commonbutton value="添加菜单" icon="btnAdd" :flicker="true" @call="addTopEvent()"></yhm-commonbutton>
      </template>
      <template v-if="getShowOperate" #customize>
        <div class="t_main disable_menu">
          <yhm-tree @call="treeEvent" :menu="treeMenuinfo" v-for="(item,i) in content" :content="content" :index="i" :last="i === content.length - 1" :key="item.id" :value="item">
          </yhm-tree>
        </div>
      </template>
    </yhm-managerpage>
  </div>
</template>

<script>
  import { managermixin } from '@/assets/manager.js'
  export default {
    name: 'appManager',
    mixins: [managermixin],
    data(){
      return{
        treeMenuinfo:[
          {name:"添加同级菜单",category:["0","1","2"]},
          {name:"添加下级菜单",category:["0","1"]},
          {name:"查看",category:["0","1","2"]},
          {name:"删除",category:["0","1","2"]}
        ],
        content:[]
      }
    },
    methods:{
      //添加查看顶部菜单
      addTopEvent(id){
        // 默认设置页面标记是查看
        var isAdd = false
        // 默认设置页面标题为查看信息
        var title = '查看顶部菜单信息'
        if (!id) { // 当id不存在的时候
          // 设置id为空
          id = ''
          // 设置页面标题为添加信息
          title = '添加顶部菜单信息'
          // 设置页面标记为添加
          isAdd = true
        }
        this.$dialog.OpenWindow({
          width: 1050,
          height: 410,
          url:'/appTopForm?id=' + id,
          title:title,
          closeCallBack:(data) =>{
            if (data) {
              this.initPageData(false,data)
              /*false->非初始化=>!import  true->初始化*/
            }
          }
        })
      },
      //添加查看左边菜单
      addLeftEvent(id,parentID){
        // 默认设置页面标记是查看
        var isAdd = false
        // 默认设置页面标题为查看信息
        var title = '查看左边菜单信息'
        if (!id) { // 当id不存在的时候
          // 设置id为空
          id = ''
          // 设置页面标题为添加信息
          title = '添加左边菜单信息'
          // 设置页面标记为添加
          isAdd = true
        }
        this.$dialog.OpenWindow({
          width: 1050,
          height: 280,
          url:'/appLeftForm?id=' + id + "&parentID="+parentID,
          title:title,
          closeCallBack:(data) =>{
            if (data) {
              this.initPageData(false,data)
              /*false->非初始化=>!import  true->初始化*/
            }
          }
        })
      },
      //添加查看左边菜单
      addEvent(id,parentID){
        // 默认设置页面标记是查看
        var isAdd = false
        // 默认设置页面标题为查看信息
        var title = '查看菜单信息'
        if (!id) { // 当id不存在的时候
          // 设置id为空
          id = ''
          // 设置页面标题为添加信息
          title = '添加菜单信息'
          // 设置页面标记为添加
          isAdd = true
        }
        this.$dialog.OpenWindow({
          width: 1050,
          height: 580,
          url:'/appForm?id=' + id + "&parentID="+parentID,
          title:title,
          closeCallBack:(data) =>{
            if (data) {
              this.initPageData(false,data)
              /*false->非初始化=>!import  true->初始化*/
            }
          }
        })
      },
      treeEvent(category,item){
        if(category === '添加同级菜单') {
          if (item.menuCategory === '0') {
            this.addTopEvent()
          }
          else if(item.menuCategory === '1') {
            this.addLeftEvent(undefined,item.parentID)
          }
          else if(item.menuCategory === '2') {
            this.addEvent(undefined,item.parentID)
          }
        }
        else if(category === '添加下级菜单'){
          if (item.menuCategory === '0') {
            this.addLeftEvent(undefined,item.id)
          }
          else if (item.menuCategory === '1') {
            this.addEvent(undefined,item.id)
          }
        }
        else if(category === '查看'){
          if (item.menuCategory === '0') {
            this.addTopEvent(item.id)
          }
          else if(item.menuCategory === '1') {
            this.addLeftEvent(item.id,item.parentID)
          }
          else if(item.menuCategory === '2') {
            this.addEvent(item.id,item.parentID)
          }
        }
        else if(category === '删除'){
          let params = {
            id:item.id,
          }
          this.ajaxJson({
            url: '/SysManager/isDelApp',
            data: params,
            call: (data) => {
              if (data.type === 0) {
                //无子菜单
                this.$dialog.confirm({
                  tipValue:'确定要删除菜单<b class="red">（ '+ item.name +' ）</b>吗？',
                  btnValueOk:'确定删除',
                  width:'430',
                  okCallBack:() =>{
                    this.ajaxJson({
                      url: '/SysManager/appDel',
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
              }
              else if (data.type === 1) {
                //有子菜单
                this.$dialog.confirm({
                  tipValue:'菜单<b class="red">（ '+ item.name +' ）</b>下有子菜单，确定删除吗？删除会将子菜单一并删除！',
                  btnValueOk:'确定删除',
                  width:'650',
                  okCallBack:() =>{
                    this.ajaxJson({
                      url: '/SysManager/appDel',
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
              }
            }
          })
        }
      },
      test(){
        this.$dialog.OpenWindow({
          url:"/selectDepartment",
          width:"850",
          height:"600",
          closeCallBack:function (data) {
          }
        })
      },
      initPageData (initValue,appID) {
        let params = {}

        if (initValue) {
          params = {

          }
        } else {
          if(!appID){
            appID = ''
          }
          params = {
            appID:appID
          }
        }
        this.init({
          initValue:initValue,
          url: '/SysManager/getAppManager',
          data:params,
          all:(data) =>{
            //不管是不是初始化都需要执行的代码
            this.content = data
          },
          init:(data)=>{
            //初始化时需要执行的代码
            // 这边初始化筛选信息
            this.content=data
          }
        })
      },
    },
    computed: {
      getShowOperate () {
        return this.content.length > 0
      }
    }
  }
</script>

<style scoped>

</style>
