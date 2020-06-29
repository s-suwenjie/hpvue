<template>
  <div class="f_main">
    <yhm-formbody>
      <template #title>基本信息</template>
      <template #control>
        <yhm-form-text ref="tableName" placeholder="数据库表名" :no-edit="keyChange" title="数据库" subtitle="表名" :value="tableName" id="tableName" rule="R0000"></yhm-form-text>
        <yhm-form-text ref="className" placeholder="类名遵循大驼峰" :no-edit="keyChange" title="类名" :value="className" id="className" rule="R0000"></yhm-form-text>
        <yhm-form-text placeholder="可以和菜单名称保持一致" :no-edit="keyChange" title="标题" :value="title" id="title" rule="R0000"></yhm-form-text>
      </template>
    </yhm-formbody>
    <!-- 空行 -->
    <div class="f_split"></div>
    <yhm-form-list-edit>
      <template #title>数据库字段信息</template>
      <template #operate>
        <yhm-commonbutton value="获取数据库字段信息" icon="btnAdd" @call="getSqlInfoEvent"></yhm-commonbutton>
      </template>
      <template #listHead>
        <yhm-managerth style="width: 100px" title="字段名称"></yhm-managerth>
        <yhm-managerth style="width: 80px" title="字段类型"></yhm-managerth>
        <yhm-managerth style="width: 100px" title="列表数据"></yhm-managerth>
        <yhm-managerth style="width: 240px" title="是否环境变量"></yhm-managerth>
        <yhm-managerth style="width: 100px" title="环境变量名称"></yhm-managerth>
        <yhm-managerth style="width: 110px" title="标题"></yhm-managerth>
        <yhm-managerth style="width: 100px" title="允许重复"></yhm-managerth>
        <yhm-managerth style="width: 110px" title="备注"></yhm-managerth>
      </template>
      <template #listBody>
        <tr v-for="(item,index) in details" :key="index" :class="{InterlacBg:index%2!==0}">
          <yhm-form-td-textbox width="100" no-edit="1" :list="details" listid="details" :value="item" id="name" rule="R0000"></yhm-form-td-textbox>
          <yhm-form-td-textbox width="80" no-edit="1" :list="details" listid="details" :value="item" id="category"></yhm-form-td-textbox>
          <yhm-form-td-radio width="100" :list="details" listid="details" :value="item" :select-list="isManagerList" id="isManager"></yhm-form-td-radio>
          <yhm-form-td-radio width="240" :no-edit="getEnvironmentEdit(item)" :list="details" listid="details" :value="item" :select-list="environmentList" id="environment"></yhm-form-td-radio>
          <yhm-form-td-textbox width="100" :show="getEnvironmentIsEdit(item)" no-edit="1" :list="details" listid="details" :value="item" id="environmentName"></yhm-form-td-textbox>
          <yhm-form-td-textbox width="100" :show="!getEnvironmentIsEdit(item)" :list="details" listid="details" :value="item" id="environmentName" rule="R0000"></yhm-form-td-textbox>
          <yhm-form-td-textbox width="110" :show="getGeneral(item)" no-edit="1" :list="details" listid="details" :value="item" id="title"></yhm-form-td-textbox>
          <yhm-form-td-textbox width="110" :show="!getGeneral(item)" :list="details" listid="details" :value="item" id="title" rule="R0000"></yhm-form-td-textbox>
          <yhm-form-td-radio width="100" :no-edit="getIsRepeat(item)" :list="details" listid="details" :value="item" :select-list="isRepeatList" id="isRepeat"></yhm-form-td-radio>
          <yhm-form-td-textbox width="110" :no-edit="getGeneral(item)?'1':''" :list="details" listid="details" :value="item" id="remark"></yhm-form-td-textbox>
        </tr>
      </template>
      <template #empty>
        <span class="m_listNoData" v-show="details.length === 0">暂时没有数据</span>
      </template>
    </yhm-form-list-edit>
    <yhm-formoperate :is-not-show-operate="details.length !== 0" :createName="createName" :insertDate="insertDate" :updateName="updateName" :updateDate="updateDate">
      <template #btn>
        <yhm-commonbutton value="保存" icon="btnSave" :flicker="true" @call="save"></yhm-commonbutton>
      </template>
    </yhm-formoperate>
  </div>
</template>

<script>
  import { formmixin } from '@/assets/form.js'
  export default {
    name: 'projectDetailForm',
    mixins: [formmixin],
    data () {
      return {
        ownerID:'',           //项目ID
        databaseName:'',      //数据库名称
        tableName:'',         //数据库名称
        className:'',         //类名
        title:'',             //标题
        isRepeatList:[],      //是否允许重复
        isManagerList:[],     //是否列表数据类型集合
        environmentList:[],   //环境数据类型集合
        details:[],           //数据库字段信息
        keyChange:'0'
      }
    },
    methods:{
      //获取数据库字段信息
      getSqlInfoEvent(){
        if(this.tableName === ""){
          this.$dialog.alert({
            tipValue:"数据库表名名称不能为空！！！",
            width:"350"
          })
        }
        else if(this.className === ""){
          this.$dialog.alert({
            tipValue:"类名不能为空！！！",
            width:"300"
          })
        }
        else if(this.title === ""){
          this.$dialog.alert({
            tipValue:"标题不能为空！！！",
            width:"300"
          })
        }
        else{
          if(this.details.length === 0){
            this.getSqlInfoOperateEvent()
          }
          else{
            this.$dialog.confirm({
              tipValue:"获取数据库字段会覆盖现有信息，确定获取吗？",
              width:"450",
              btnOk:"确定获取",
              okCallBack:() => {
                this.getSqlInfoOperateEvent()
              }
            })
          }
        }
      },
      getSqlInfoOperateEvent(){
        var params = {
          id:this.id,
          tableName:this.tableName,
          databaseName:this.databaseName
        }
        this.ajaxJson({
          url: '/sys/projectItemDetail/init',
          data: params,
          call: (data) => {
            if (data.type == 0) {
              this.details = data.list
            }
          }
        })
      },
      save(){
        let a = this.validator();
        if(a){
          var params = {
            id: this.id,
            ownerID:this.ownerID,
            tableName:this.tableName,
            className:this.className,
            title:this.title,
            databaseName:this.databaseName,
            details:this.details,
          }
          this.ajaxJson({
            url: '/sys/projectItem/save',
            data: params,
            call: (data) => {
              if (data.type == 0) {
                this.$dialog.setReturnValue(this.id)
                this.$dialog.alert({
                  tipValue: data.message,
                  closeCallBack: () => {

                  }
                })
              }
            }
          })
        }
      },

    },
    computed:{
      getGeneral(){
        return function (item) {
          if(item.name === "id" || item.name === "insertDate" || item.name === "__OwnerID" || item.name === "searchField" || item.name === "isHead" || item.name === "completeness" || item.name === "isDel" || item.name === "createName" || item.name === "updateName" || item.name === "updateDate"){
            return true
          }
          return false
        }
      },
      //判断是否允许重复
      getIsRepeat(){
        return function (item) {
          if(item.name === "id" || item.name === "insertDate" || item.name === "__OwnerID" || item.name === "searchField" || item.name === "isHead" || item.name === "completeness" || item.name === "isDel" || item.name === "createName" || item.name === "updateName" || item.name === "updateDate"){
            return true
          }
          return false
        }
      },
      //判断环境变量是否可以编辑
      getEnvironmentEdit(){
        return function (item) {
          if(item.name === "id" || item.name === "insertDate" || item.name === "__OwnerID" || item.name === "searchField" || item.name === "isHead" || item.name === "completeness" || item.name === "isDel" || item.name === "createName" || item.name === "updateName" || item.name === "updateDate"){
            return true
          }
          else if(item.category !== "int"){
            return true
          }
          return false
        }
      },
      //判断是否可以录入环境变量
      getEnvironmentIsEdit(){
        return function (item){
          if(item.name === "id" || item.name === "insertDate" || item.name === "__OwnerID" || item.name === "searchField" || item.name === "isHead" || item.name === "completeness" || item.name === "isDel" || item.name === "createName" || item.name === "updateName" || item.name === "updateDate"){
            return true
          }
          else if(item.category !== "int"){
            return true
          }
          else{
            if(item.environment === "0"){
              return true
            }
            else{
              return false
            }
          }
        }
      }
    },
    created(){
      this.setQuery2Value("ownerID")
      this.setQuery2Value("databaseName")
      this.init({
        url: '/sys/projectItem/initForm',
        all: (data) => {
          //添加查看的时候都需要的代码
          this.environmentList = data.environmentPsd.list
          this.isManagerList = data.isManagerPsd.list
          this.isRepeatList = data.isRepeatPsd.list
        },
        add: (data) => {
          //添加时独有的代码
        },
        look: (data) => {
          //查看时独有的信息
          this.keyChange = "1"
          this.ownerID = data.ownerID
          this.tableName = data.tableName
          this.className = data.className
          this.title = data.title
          this.details = data.details
        }
      })
    }
  }
</script>

<style scoped>

</style>
