<template>
  <div id="selectUnit" class="container">
    <div class='container'>
      <div class="t_main t_main_select disable_menu">
        <div class="selectTb fcSeltTable formCont bdtNone">
          <yhm-tree @call="treeEvent" :menu="treeMenuinfo" v-for="(item,i) in content" :content="content" :index="i" :last="i === content.length - 1" :key="item.id" :value="item">
          </yhm-tree>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
    import Qs from 'qs'
    export default {
      name: "selectDepartment",
      data(){
          return{
            level:'-1',
            open:'0',
            treeMenuinfo:[
              {name:"选择",category:[]}
            ],
            content:[]
          }
      },
      methods:{
        treeEvent(category,item){
          if(category === '选择'){
            this.$dialog.setReturnValue(item)
            this.$dialog.close()
          }
        }
      },
      created(){
        let query = Qs.parse(location.search.substring(1))
        let level = query.level
        if(level){
          this.level = level
        }
        let open = query.open
        if(open){
          this.open = open
        }
        this.ajaxJson({
          url:"/Basic/getListData",
          data:{
            level:this.level,
            open:this.open
          },
          call:(data) =>{
            this.content = []
            this.content.push(data)
          }
        })
      }
    }
</script>

<style scoped>
.fcSeltTable{
  padding: 5px;
}
</style>
