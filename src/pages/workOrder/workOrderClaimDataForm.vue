<template>
  <div class="f_main">
    <yhm-formbody v-if="type=='2'">
      <template #title >
        <span>基本信息</span>
      </template>
      <template #control>
        <yhm-form-select placeholder="" title="保险公司" subtitle="名称" :value="unitname" id="unitname" rule="R0000" @click="unitSelect"></yhm-form-select>
      </template>
    </yhm-formbody>
    <div class="f_split"></div>
    <yhm-form-list-edit>
      <template #title>
        <span>保险公司条约</span>
      </template>
      <template #operate>
        <yhm-commonbutton value="添加" v-if="type=='2'" icon="btnAdd" @call="add()"></yhm-commonbutton>
      </template>
      <template #listHead>
        <!--          <yhm-managerth style="width: 38px" title="查看"></yhm-managerth>-->
        <yhm-managerth style="width: 40px" title="序号"></yhm-managerth>
        <yhm-managerth title="详情名称"></yhm-managerth>
        <yhm-managerth width="70" title="状态"></yhm-managerth>
        <yhm-managerth width="130" title="上传文件"></yhm-managerth>
        <yhm-managerth style="width: 40px" title="删除"></yhm-managerth>

      </template>
      <template #listBody >
        <tr v-for="(item,index) in content" :key="index" :class="{InterlacBg:index%2!==0}" >
          <td style="width: 40px; display: flex;justify-content: center;text-align: center;">{{Number(index)+1}}</td>
          <!--            <yhm-manager-td-look class="solidYhm" @click="listView(item)"></yhm-manager-td-look>-->
          <!--            <yhm-manager-td-date class="solidYhm" :value="item.detailname"></yhm-manager-td-date>-->
          <!--          <yhm-manager-td :value="item.filepath!=''?'已上传':'未上传'" :color="item.filepath!=''?'#49a9ea':'#f00'"></yhm-manager-td>-->
<!--          <yhm-form-td-textbox :value="item.filepath!=''?'已上传':'未上传'" :list="content" listid="content" :value="item" :color="item.filepath!=''?'#49a9ea':'#f00'"></yhm-form-td-textbox>-->
          <yhm-form-td-textbox :no-edit="item.noEdit" width="675" id="detailname" :list="content" listid="content" :value="item" rule="R0000"></yhm-form-td-textbox>
          <td style="text-align: center;" :style="{color:item.filepath!=''?'#49a9ea':'#f00'}">{{item.filepath!=''?'已上传':'未上传'}}</td>

          <yhm-form-td-upload-image  width="130" tag="fixOrderUnitConcat" accept=" " @mouseover="invoiceImg(item)" @mouseout="invoiceImgHide(item)" :list="content" listid="content" :value="item" id="filepath" rule="#"></yhm-form-td-upload-image>

          <yhm-form-td-delete :no-click="item.noEdit=='1'?true:false" width="40" :list="content" :value="item" :del-click="false" @click="delFromList(index)"></yhm-form-td-delete>

        </tr>
      </template>
      <template #empty>
        <span class="m_listNoData" v-show="content.length=='0'?true:false">暂时没有数据</span>
      </template>
    </yhm-form-list-edit>
    <div class="invoiceImgView" v-show="viewImgShow">
      <img :src="viewImg" alt="">
    </div>
    <yhm-formoperate :createName="createName" :insertDate="insertDate" :updateName="updateName" :updateDate="updateDate">
      <template #btn>
        <yhm-commonbutton value="保存" icon="btnSave" :flicker="true" @call="save()"></yhm-commonbutton>
      </template>
    </yhm-formoperate>
  </div>
</template>

<script>
  import { formmixin } from '@/assets/form.js'
  import {guid} from '@/assets/common.js'
  export default {
    name: 'workOrderClaimDataForm',
    mixins: [formmixin],
    data(){
      return{
        unitEntity:guid(),
        unitname:'',//保险公司名称
        unitID:'',//保险公司id
        isFlag:'',
        content:[],
        viewImg:'',
        viewImgShow:false,  //显示发票图片

      }
    },
    methods:{
      add(){
        this.content.push({
          id: guid(),
          ownerID:this.id,
          filepath:'',//文件路径
          detailname:''
        })
      },
      save(){
        let a = this.validator()
        let manager = []
        let manager2 = []
        let item = {}//处理创建保险公司的数据
        let item2 = {}//处理上传保险公司资料的数据
        for(let i in this.content){
          item = {}
          item2 = {}

          item.id = guid()
          item.ownerID = this.unitEntity
          item.detailname = this.content[i].detailname
          manager.push(item)

          item2.id = guid()
          item2.treaty = item.id//条约id
          item2.orderID = this.orderID//工单id
          item2.filepath = this.content[i].filepath//文件路径
          manager2.push(item2)
        }
        let params = {//创建保险公司的数据
          id:this.unitEntity,
          unitname:this.unitname,//保险公司名称
          unitID:this.unitID,//保险公司id
          manager:manager
        }
        let params2 = {//上传保险公司资料的数据
          isFlag:this.isFlag,
          orderID:this.orderID,
          param:manager2
        }
        // console.log(params,params2)
        // return
        if(a){
          if(this.content.length=='0'){
            this.$dialog.alert({
              tipValue:'至少需要添加一条保险公司条约',
              alertImg:'warn',
              width:'330',
              closeCallBack: () => {
                this.add()
              }
            })
          }else{
            this.ajaxJson({
              url: '/fix/fixOrderUnit/saveFixOrderUnitEntity',
              data:params,
              call: (data) => {
                if(data.type=='0'){
                  this.ajaxJson({
                    url: '/fix/fixOrderUnitConcat/saveUnitConcatEntity',
                    data:params2,
                    call: (da) => {
                      if(da.type=='0'){
                        this.$dialog.setReturnValue('1')
                        this.$dialog.alert({
                          tipValue:da.message,
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
                          tipValue:da.message,
                          closeCallBack: () => {
                          }
                        })
                      }
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
          url: '/selectWorkOrderInsurance',
          title: '选择单位信息',
          closeCallBack: (data) => {
            if (data) {
              this.unitname = data.showName
              this.unitID = data.id
            }
          }
        })
      },
      //显示发票图片
      invoiceImg(item){
        if(item.filepath !== '') {
          console.log(!/\.(gif|jpg|jpeg|png|GIF|JPG|PNG|svg)$/.test(item.filepath))
          if(/\.(gif|jpg|jpeg|png|GIF|JPG|PNG|svg)$/.test(item.filepath)){
            this.viewImgShow = true
            this.viewImg =  '/UploadFile/fixOrderUnitConcat/' + item.filepath
          }
          // else{
          //   this.viewImg = '/UploadFile/fixOrderUnitConcat/' + item.filepath
          // }
        }
      },
      //隐藏发票图片
      invoiceImgHide(item){
        if(item.url !== '') {
          this.viewImgShow = false
        }
      },

      initData () {
        this.ajaxJson({
          url: '/fix/fixOrderUnitConcat/verification',
          data: {
            orderID:this.orderID,
          },
          call: (data) => {
            if(data.id!=null){
              this.unitEntity = data.id
            }
            if(data.unitname!=null){
              this.unitname = data.unitname
            }
            if(data.unitID!=null){
              this.unitID = data.unitID
            }
            if(data.manager!=null){
              if(data.fixOrderUnitConcatList.length!=0){
                this.content = data.fixOrderUnitConcatList
              }else{
                this.content = data.manager
              }
              for(let i in this.content){
                this.content[i].noEdit = '1'
              }
              console.log(this.content)
            }

          }
        })
        // this.init({
        //   url: '/fix/fixOrderUnitConcat/verification',
        //   data:{
        //     orderID:this.id,
        //     // claimDateType:'1'//特殊字段 传当前值时表示需要把id转为unitID
        //     // pageSize:this.pager.pageSize,
        //     // pageIndex:this.pager.pageIndex
        //   },
        //   all: (data) => {
        //
        //   },
        //   add: (data) => {
        //     /* 需要添加的数据 */
        //   },
        //   look: (data) => {
        //     if(data.id!=null){
        //       this.unitEntity = data.id
        //     }
        //     if(data.unitname!=null){
        //       this.unitname = data.unitname
        //     }
        //     if(data.unitID!=null){
        //       this.unitID = data.unitID
        //     }
        //     if(data.manager!=null){
        //       this.content = data.manager
        //       for(let i in this.content){
        //         this.content[i].noEdit = '1'
        //       }
        //       console.log(this.content)
        //     }
        //
        //   }
        // })
      }
    },
    created () {
      this.setQuery2Value('type')
      this.setQuery2Value('isFlag')
      this.setQuery2Value('orderID')
      this.initData()
    }
  }
</script>

<style scoped>

</style>
