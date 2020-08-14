<template>
  <div class="f_main">
    <yhm-formbody>
      <template #title>基本信息</template>
      <template #control>
        <yhm-form-text ref="name" :no-edit="keyChange" title="项目名称" :value="name" id="name" rule="R0000"></yhm-form-text>
        <yhm-form-text ref="databaseName" :no-edit="keyChange" title="数据库名称" :value="databaseName" id="databaseName" rule="R0000"></yhm-form-text>
        <yhm-form-text ref="packageName" :no-edit="keyChange" title="项目包名" :value="packageName" id="packageName" rule="R0000"></yhm-form-text>
        <yhm-form-text ref="serverPort" title="Server" subtitle="端口号" :value="serverPort" id="serverPort" rule="R0000"></yhm-form-text>
        <yhm-form-text ref="webPort" title="Web" subtitle="端口号" :value="webPort" id="webPort" rule="R0000"></yhm-form-text>
      </template>
    </yhm-formbody>
    <div class="f_split"></div>
    <yhm-form-list-show>
      <template #title>项目科目信息</template>
      <template #operate>
        <yhm-commonbutton value="添加项目科目信息" icon="btnAdd" @call="addDetailEvent" category="three"></yhm-commonbutton>
      </template>
      <template #listHead>
        <yhm-managerth style="width: 40px" title="查看"></yhm-managerth>
        <yhm-managerth style="width: 500px" title="数据库表名"></yhm-managerth>
        <yhm-managerth style="width: 320px" title="类名"></yhm-managerth>
        <yhm-managerth style="width: 40px" title="操作"></yhm-managerth>
      </template>
      <template #listBody>
        <tr v-for="(item,index) in details" :key="index" :class="{InterlacBg:index%2!==0}">
          <yhm-manager-td-look @click="lookDetails(item)"></yhm-manager-td-look>
          <yhm-manager-td :value="item.tableName"></yhm-manager-td>
          <yhm-manager-td :value="item.className"></yhm-manager-td>
          <yhm-form-td-delete width="40" :list="details" :value="item"></yhm-form-td-delete>
        </tr>
      </template>
      <template #empty>
        <span class="m_listNoData" v-show="details.length === 0">暂时没有数据</span>
      </template>
    </yhm-form-list-show>

    <yhm-formoperate :createName="createName" :insertDate="insertDate" :updateName="updateName" :updateDate="updateDate">
      <template #btn>
        <yhm-commonbutton value="保存" icon="btnSave" :flicker="true" @call="save"></yhm-commonbutton>
        <yhm-commonbutton :show="keyChange === '1'"  value="创建项目" icon="i-auditApprovalOK" @call="createEvent"></yhm-commonbutton>
      </template>
    </yhm-formoperate>
  </div>
</template>

<script>
  import { formmixin } from '@/assets/form.js'
  export default {
    name: 'projectForm',
    mixins: [formmixin],
    data () {
      return {
        name:'',
        databaseName:'',
        packageName:'',
        serverPort:'',
        webPort:'',
        keyChange:'0',
        details:[]              //项目明细
      }
    },
    methods:{
      save(){
        if (this.validator()) {
          if(this.isAdd){
            this.$dialog.confirm({
              width:450,
              tipValue:'保存后所有数据将不能修改，确定保存吗？',
              okCallBack:() => {
                this.saveOperate()
              }
            })
          }
          else{
            this.saveOperate()
          }
        }
      },
      saveOperate(){
        var params = {
          id: this.id,
          name: this.name,
          databaseName: this.databaseName,
          packageName: this.packageName,
          serverPort: this.serverPort,
          webPort: this.webPort
        }
        this.ajaxJson({
          url: '/sys/project/save',
          data: params,
          call: (data) => {
            if (data.type == 0) {
              this.$dialog.setReturnValue(this.id)
              this.$dialog.alert({
                tipValue: data.message,
                closeCallBack: () => {
                  this.keyChange = "1"
                  //this.$dialog.close()
                }
              })
            }
          }
        })
      },
      /*生成项目*/
      createEvent(){
        var params = {
          id: this.id
        }
        this.ajaxJson({
          url: '/sys/project/createProject',
          data: params,
          call: (data) => {
            if (data.type == 0) {
              this.$dialog.setReturnValue(this.id)
              this.$dialog.alert({
                tipValue: data.message,
                closeCallBack: () => {
                  window.open("/UploadFile/" + data.val)
                }
              })
            }
          }
        })
      },
      //初始化项目科目信息
      initItemManagerEvent(){
        var params = {
          id: this.id
        }
        this.ajaxJson({
          url: '/sys/project/getItemByID',
          data: params,
          call: (data) => {
            if (data.type == 0) {
              this.details = data.list
            }
          }
        })
      },
      //添加项目科目信息
      addDetailEvent(){
        this.$dialog.OpenWindow({
          width: 1050,
          height: 700,
          url: '/projectDetailForm?ownerID='+this.id + "&databaseName="+this.databaseName,
          title: '添加项目科目信息',
          closeCallBack: (data) => {
            if(data){
              this.initItemManagerEvent()
            }
          }
        })
      },
      //查看项目科目信息
      lookDetails(item){
        this.$dialog.OpenWindow({
          width: 1050,
          height: 700,
          url: '/projectDetailForm?id=' + item.id + "&databaseName="+this.databaseName,
          title: "查看项目科目信息",
          closeCallBack: (data) => {
            if (data) {
              this.initItemManagerEvent()
            }
          }
        })
      },

    },
    created () {
      this.init({
        url: '/sys/project/initForm',
        all: (data) => {
          //添加查看的时候都需要的代码

        },
        add: (data) => {
          //添加时独有的代码
        },
        look: (data) => {
          //查看时独有的信息
          this.keyChange = "1"
          this.name = data.name
          this.databaseName = data.databaseName
          this.packageName = data.packageName
          this.serverPort = data.serverPort
          this.webPort = data.webPort
          this.details = data.details
        }
      })
    }
  }
</script>

<style scoped>

</style>
