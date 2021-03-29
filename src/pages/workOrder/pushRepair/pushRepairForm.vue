<template>
  <div class="f_main">
    <yhm-formbody>
      <template #title >
        <span>基本信息</span>
      </template>
      <template #control>
        <yhm-form-select placeholder="" title="推修公司" :value="unit" id="unit" rule="R0000" @click="unitSelect"></yhm-form-select>
        <yhm-form-text title="简称" :value="unitshort" id="unitshort"></yhm-form-text>

        <!--        <yhm-form-select placeholder="" title="联系人" subtitle="" :value="person" id="person" rule="R0000" @click="personSelect"></yhm-form-select>-->
        <!--        <yhm-form-text title="推修费率" :value="rate" id="rate" rule="R0000" after-icon="icon-percentage"></yhm-form-text>-->
        <!--        <yhm-form-radio title="结算类型" ref="typeRadio" :select-list="typeList" :value="type" id="type" rule="#"></yhm-form-radio>-->
        <!--        <yhm-form-date title="开始时间" :value="startDate" id="startDate" rule="R0000"></yhm-form-date>-->
        <!--        <yhm-form-date title="结束时间" :value="endDate" id="endDate" :min="startDate" rule="R0000"></yhm-form-date>-->
        <!--        &lt;!&ndash;<yhm-form-text title="合同" width="1" :value="companyID" id="companyID" ></yhm-form-text>&ndash;&gt;-->
        <!--        <yhm-formupload :ownerID="id" :value="fileList" id="fileList" title="上传合同" tag="fixCompany" rule="#"></yhm-formupload>-->
      </template>
    </yhm-formbody>
    <div class="f_split"></div>
    <yhm-form-list-edit>
      <template #title>
        <span>推修协议内容</span>
      </template>
      <template #operate>
        <yhm-commonbutton value="添加" icon="btnAdd" @call="add()"></yhm-commonbutton>
      </template>
      <template #listHead>
        <yhm-managerth style="width: 38px" title="查看"></yhm-managerth>
        <yhm-managerth title="开始时间"></yhm-managerth>
        <yhm-managerth title="结束时间"></yhm-managerth>
        <yhm-managerth width="110" title="自保费率" prompt="自保(当年在乙方承保的车辆)" after-title="?" after-size="18px" tooltip-left="-34px" after-color="#f00"></yhm-managerth>
        <yhm-managerth width="110" title="非自保费率" prompt="非自保(一年没有进场记录或当年不在乙方承保的车辆)" after-title="?" after-size="18px" tooltip-left="-112px" after-color="#f00"></yhm-managerth>
        <yhm-managerth title="结算类型"></yhm-managerth>
        <yhm-managerth title="状态"></yhm-managerth>
        <!--        <yhm-managerth style="width: 38px" title="删除"></yhm-managerth>-->
      </template>
      <template #listBody >
        <tr v-for="(item,index) in content" :key="index" :class="{InterlacBg:index%2!==0}" >
          <yhm-manager-td-look class="solidYhm" @click="listView(item)"></yhm-manager-td-look>
          <yhm-manager-td-date class="solidYhm" :value="item.startDate"></yhm-manager-td-date>
          <yhm-manager-td-date class="solidYhm" :value="item.endDate"></yhm-manager-td-date>
          <yhm-manager-td-center class="solidYhm" :value="item.rate+' %'"></yhm-manager-td-center>
          <yhm-manager-td-center class="solidYhm" :value="item.norate+' %'"></yhm-manager-td-center>
          <yhm-manager-td-psd class="solidYhm" :value="item.type" :list="typeList"></yhm-manager-td-psd>
          <yhm-manager-td-center class="solidYhm" :value="item.stateStr" :color="item.stateStr=='启用'?'#00bb6b':'#f00'"></yhm-manager-td-center>
          <!--          <yhm-manager-td-operate>-->
          <!--            <yhm-manager-td-operate-button @click="del(item)" value="删除" icon="delete" color="#FF0000"></yhm-manager-td-operate-button>-->
          <!--          </yhm-manager-td-operate>-->
        </tr>
      </template>
      <template #empty>
        <span class="m_listNoData" v-show="content.length=='0'?true:false">暂时没有数据</span>
      </template>
      <!--分页控件-->
      <template #pager>
        <yhm-pagination :pager="pager" :is-page-size="false" @initData="initData()"></yhm-pagination>
      </template>
    </yhm-form-list-edit>
    <div class="f_split"></div>
    <yhm-form-list-edit>
      <template #title>
        <span>联系人</span>
      </template>
      <template #operate>
        <yhm-commonbutton v-show="content.length!='0'" value="添加" icon="btnAdd" @call="addPerson()"></yhm-commonbutton>
      </template>
      <template #listHead>
        <yhm-managerth style="width: 38px" title="查看"></yhm-managerth>
        <yhm-managerth title="姓名"></yhm-managerth>
        <yhm-managerth title="电话"></yhm-managerth>
        <yhm-managerth title="备注"></yhm-managerth>
        <!--        <yhm-managerth title="结算类型"></yhm-managerth>-->
        <!--        <yhm-managerth title="状态"></yhm-managerth>-->
        <!--        <yhm-managerth style="width: 38px" title="删除"></yhm-managerth>-->
      </template>
      <template #listBody >
        <tr v-for="(item,index) in personList" :key="index" :class="{InterlacBg:index%2!==0}" >
          <yhm-manager-td-look class="solidYhm" @click="listViewPerson(item)"></yhm-manager-td-look>
          <yhm-manager-td-center class="solidYhm" :value="item.person" @click="personView(item)"></yhm-manager-td-center>
          <yhm-manager-td-center class="solidYhm" :value="item.phone"></yhm-manager-td-center>
          <yhm-manager-td-center class="solidYhm" :value="item.remark"></yhm-manager-td-center>
          <!--          <yhm-manager-td-psd class="solidYhm" :value="item.type" :list="typeList"></yhm-manager-td-psd>-->
          <!--          <yhm-manager-td-center class="solidYhm" :value="item.stateStr" :color="item.stateStr=='启用'?'#00bb6b':'#f00'"></yhm-manager-td-center>-->
          <!--          <yhm-manager-td-operate>-->
          <!--            <yhm-manager-td-operate-button @click="del(item)" value="删除" icon="delete" color="#FF0000"></yhm-manager-td-operate-button>-->
          <!--          </yhm-manager-td-operate>-->
        </tr>
      </template>
      <template #empty>
        <span class="m_listNoData" v-show="manager2.length=='0'?true:false">暂时没有数据</span>
      </template>
      <!--分页控件-->
      <template #pager>
        <yhm-pagination :pager="pager2" :is-page-size="false" @initData="listPage()"></yhm-pagination>
      </template>
    </yhm-form-list-edit>
    <yhm-formoperate :createName="createName" :insertDate="insertDate" :updateName="updateName" :updateDate="updateDate">
      <template #btn>
        <yhm-commonbutton value="保存" icon="btnSave" :flicker="true" @call="save()"></yhm-commonbutton>
      </template>
    </yhm-formoperate>
  </div>
</template>

<script>
  import { accMul, accAdd, guid, formatTime } from '@/assets/common.js'
  import { formmixin } from '@/assets/form.js'
  export default {
    name: 'pushRepairForm',
    mixins: [formmixin],
    data(){
      return{
        rate:'',//推修费率
        unit:'',//推修公司名称
        unitID:'',//推修公司id
        person:'',//联系人名称
        personID:'',//联系人id
        unitshort:'',//单位缩写
        startDate:'',//有效开始时间
        endDate:'',//有效结束时间
        fileID:'',//合同id
        type:'',//结算日期
        typeList:[],//结算日期
        fileList:[],//合同文件
        content:[],
        manager2:[],
        personList:[],
        pager: {
          total: 0, // 总条数
          pageSize: 5, // 每页条数
          pageIndex: 1, // 当前页码
          selectCount: 0 // 选中条数
        },
        pager2: {
          total: 0, // 总条数
          pageSize: 5, // 每页条数
          pageIndex: 1, // 当前页码
          selectCount: 0 // 选中条数
        }
      }
    },
    methods:{
      listPage(){
        let list = this.manager2.concat()
        this.pager2.total=this.manager2.length
        // this.pager2.pageSize=5
        let a=(this.pager2.pageIndex-1)*this.pager2.pageSize
        let arr=[]
        arr=list.splice(a,this.pager2.pageSize)
        this.personList = arr
      },
      personView(item){
        this.$dialog.OpenWindow({
          width: '1050',
          height: '750',
          url:  '/personView?id='+item.personID,
          title: '查看联系人信息',
          closeCallBack:(data) =>{
            if(data){
              this.initUpdate(data)
            }
          }
        })
      },
      listViewPerson(item){
        this.$dialog.OpenWindow({
          width: '1050',
          height: '650',
          url:  '/pushRepairAddPersonForm?companyID='+this.id+'&compileID='+item.id,
          title: '编辑联系人信息',
          closeCallBack:(data) =>{
            if(data){
              this.initUpdate(data)
            }
          }
        })
      },
      addPerson(){
        this.$dialog.OpenWindow({
            width: '1050',
            height: '650',
            url:  '/pushRepairAddPersonForm?companyID='+this.id,
            title: '添加联系人信息',
            closeCallBack:(data) =>{
              if(data){
                this.initUpdate(data)
              }
            }
        })
      },
      add(){
        let a = this.validator()
        if(a){
          this.$dialog.OpenWindow({
            width: '1050',
            height: '750',
            url:  '/pushRepairDetailForm?companyID='+this.id
              +'&unit='+this.unit+'&unitID='+this.unitID+'&unitshort='+this.unitshort,
            // +'&person='+this.person+'&personID='+this.personID
            title: '添加推修合作',
            closeCallBack:(data) =>{
              if (data) {
                this.id = data
                this.initUpdate(data)
              }
            }
          })
        }else{
          this.$dialog.alert({
            tipValue:'请先选择推修单位',
            alertImg:'warn',
            width:'350',
            closeCallBack:(data) =>{
              this.unitSelect()
            }
          })
        }
      },
      initUpdate(id){
        this.ajaxJson({
          url: '/fix/fixCompany/initForm',
          data: {
            id:id
          },
          call: (data) => {
            this.id = data.id
            this.rate = data.rate//推修费率
            this.unit = data.unit//推修公司名称
            this.unitID = data.unitID//推修公司id
            this.person = data.person//联系人名称
            this.personID = data.personID//联系人id
            this.startDate = data.startDate//有效期开始时间
            this.endDate = data.endDate//有效期结束时间
            this.fileID = data.fileID//合同id
            this.type = data.type//结算类型
            this.fileList = data.photoList//合同文件

            this.content = data.list2
            this.manager2 = data.manager2

            this.pager.total = data.count
            this.listPage()
          }
        })
      },
      listView(item){
        let a = this.validator()
        if(a){
          this.$dialog.OpenWindow({
            width: '1050',
            height: '750',
            url:  '/pushRepairDetailForm?companyID='+item.id+'&id='+this.id+'&redact=1'
              +'&unit='+this.unit+'&unitID='+this.unitID+'&unitshort='+this.unitshort,
            title: '编辑推修合作',
            closeCallBack:(data) =>{
              if (data) {
                // this.id = data
                this.initData()
              }
            }
          })
        }else{
          this.$dialog.alert({
            tipValue:'请先选择推修单位',
            alertImg:'warn',
            width:'350',
            closeCallBack:(data) =>{
              this.unitSelect()
            }
          })
        }
      },
      save(){
        let a = this.validator()
        // this.$refs.typeRadio.$emit('verify')//结算类型
        let params = {
          id:this.id,
          rate:this.rate,//推修费率
          type:this.type,//结算日期
          unit:this.unit,//推修公司名称
          unitID:this.unitID,//推修公司id
          person:this.person,//联系人名称
          personID:this.personID,//联系人id
          unitshort:this.unitshort,//单位缩写
          startDate:this.startDate,//有效开始时间
          endDate:this.endDate,//有效结束时间
          fileID:this.id,//合同id
          param:{
            id:this.id,//定损单主表id
            list:this.fileList,//文件
          }
          // fileList:[],//合同文件
        }
        if(a){
          if(this.content.length=='0'){
            this.$dialog.alert({
              tipValue:'至少需要添加一条合作记录',
              alertImg:'warn',
              width:'330',
              closeCallBack: () => {
                this.add()
              }
            })
          }else{
            this.ajaxJson({
              url: '/fix/fixCompany/save',
              data:params,
              call: (data) => {
                if(data.type=='0'){
                  this.$dialog.alert({
                    tipValue:data.message,
                    closeCallBack: () => {
                      // if(this.personList.length=='0'&&this.content.length=='0'){
                      // }else{
                        this.$dialog.close();
                      // }
                    }
                  })
                }else{
                  this.$dialog.alert({
                    width:'350',
                    alertImg: 'error',
                    tipValue:data.message,
                    closeCallBack: () => {
                    }
                  })
                }
              }
            })
          }
        }
      },
      unitSelect(){
        this.$dialog.OpenWindow({
          width: '950',
          height: '700',
          url: '/selectUnit?category=1&categoryBefore=1',
          title: '选择单位信息',
          closeCallBack: (data) => {
            if (data) {
              console.log(data)
              this.unit = data.name
              this.unitID = data.id
              this.unitshort = data.abbreviation
            }
          }
        })
      },
      personSelect(){
        this.$dialog.OpenWindow({
          width: '950',
          height: '700',
          url: '/selectPerson?category=1&categoryBefore=1',
          title: '选择联系人信息',
          closeCallBack: (data) => {
            if (data) {
              this.person = data.name
              this.personID = data.id
            }
          }
        })
      },
      initData () {
        this.init({
          url: '/fix/fixCompany/initForm',
          data:{
            // id:this.id,
            pageSize:this.pager.pageSize,
            pageIndex:this.pager.pageIndex
          },
          all: (data) => {
            this.typeList = data.typePsd.list
          },
          add: (data) => {
            /* 需要添加的数据 */
          },
          look: (data) => {
            this.id = data.id
            this.rate = data.rate//推修费率
            this.unit = data.unit//推修公司名称
            this.unitID = data.unitID//推修公司id
            this.person = data.person//联系人名称
            this.personID = data.personID//联系人id
            this.unitshort = data.unitshort//单位缩写
            this.startDate = data.startDate//有效期开始时间
            this.endDate = data.endDate//有效期结束时间
            this.fileID = data.fileID//合同id
            this.type = data.type//结算类型
            this.fileList = data.photoList//合同文件

            this.content = data.list2
            this.manager2 = data.manager2
            this.pager.total = data.count
            this.listPage()
          }
        })
      },
    },
    created(){
      this.initData()
    }
  }
</script>

<style scoped>
  .solidYhm{
    border: 1px solid #ccc;
  }
</style>
