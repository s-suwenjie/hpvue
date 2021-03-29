<template>
  <div class="periphery">
<!--    <yhm-formbody v-if="type=='2'">-->
<!--      <template #title >-->
<!--        <span>基本信息</span>-->
<!--      </template>-->
<!--      <template #control>-->
<!--        <yhm-form-select placeholder="" title="保险公司" subtitle="名称" :value="unitname" id="unitname" rule="R0000" @click="unitSelect"></yhm-form-select>-->
<!--      </template>-->
<!--    </yhm-formbody>-->
<!--    <div class="f_split"></div>-->
<!--    <yhm-form-list-edit>-->
<!--      <template #title>-->
<!--        <span>保险公司条约</span>-->
<!--      </template>-->
<!--      <template #operate>-->
<!--        <yhm-commonbutton value="添加" v-if="type=='2'" icon="btnAdd" @call="add()"></yhm-commonbutton>-->
<!--      </template>-->
<!--      <template #listHead>-->
<!--        &lt;!&ndash;          <yhm-managerth style="width: 38px" title="查看"></yhm-managerth>&ndash;&gt;-->
<!--        <yhm-managerth style="width: 40px" title="序号"></yhm-managerth>-->
<!--        <yhm-managerth title="详情名称"></yhm-managerth>-->
<!--        <yhm-managerth width="70" title="状态"></yhm-managerth>-->
<!--        <yhm-managerth width="130" title="上传文件"></yhm-managerth>-->
<!--        <yhm-managerth style="width: 40px" title="删除"></yhm-managerth>-->

<!--      </template>-->
<!--      <template #listBody >-->
<!--        <tr v-for="(item,index) in content" :key="index" :class="{InterlacBg:index%2!==0}" >-->
<!--          <td style="width: 40px; display: flex;justify-content: center;text-align: center;">{{Number(index)+1}}</td>-->
<!--          &lt;!&ndash;            <yhm-manager-td-look class="solidYhm" @click="listView(item)"></yhm-manager-td-look>&ndash;&gt;-->
<!--          &lt;!&ndash;            <yhm-manager-td-date class="solidYhm" :value="item.detailname"></yhm-manager-td-date>&ndash;&gt;-->
<!--          &lt;!&ndash;          <yhm-manager-td :value="item.filepath!=''?'已上传':'未上传'" :color="item.filepath!=''?'#49a9ea':'#f00'"></yhm-manager-td>&ndash;&gt;-->
<!--&lt;!&ndash;          <yhm-form-td-textbox :value="item.filepath!=''?'已上传':'未上传'" :list="content" listid="content" :value="item" :color="item.filepath!=''?'#49a9ea':'#f00'"></yhm-form-td-textbox>&ndash;&gt;-->
<!--          <yhm-form-td-textbox :no-edit="item.noEdit" width="675" id="detailname" :list="content" listid="content" :value="item" rule="R0000"></yhm-form-td-textbox>-->
<!--          <td style="text-align: center;" :style="{color:item.filepath!=''?'#49a9ea':'#f00'}">{{item.filepath!=''?'已上传':'未上传'}}</td>-->

<!--          <yhm-form-td-upload-image  width="130" tag="fixOrderUnitConcat" accept=" " @mouseover="invoiceImg(item)" @mouseout="invoiceImgHide(item)" :list="content" listid="content" :value="item" id="filepath" rule="#"></yhm-form-td-upload-image>-->

<!--          <yhm-form-td-delete :no-click="item.noEdit=='1'?true:false" width="40" :list="content" :value="item" :del-click="false" @click="delFromList(index)"></yhm-form-td-delete>-->

<!--        </tr>-->
<!--      </template>-->
<!--      <template #empty>-->
<!--        <span class="m_listNoData" v-show="content.length=='0'?true:false">暂时没有数据</span>-->
<!--      </template>-->
<!--    </yhm-form-list-edit>-->

    <div class="title">保 险 公 司 条 约</div>
    <div class="main">
      <div class="titleFullLine">
        <span class="titleName borderRight">保险公司</span>
        <span class="titleNameRight" @click="unitSelect" :style="{cursor:type=='2'?'pointer':'',color:unitname==''?'#757575':'#333'}">{{unitname==''?'点击选择保险公司':unitname}}</span>
        <span class="btnAdd iconAdd" v-if="type=='2'" @click="add()" title="添加保险公司条约"></span>
        <span v-if="type!='2'" class="titleName borderRight" style="border-left: 0;">工单号</span>
        <span v-if="type!='2'" class="titleNameRight">{{code}}</span>
        <div v-if="unitname==''&&type=='2'" style="margin-left: -37px;padding-right: 14px;font-size: 32px;color: #f00;user-select:none;">⨯</div>
        <div v-else-if="unitname!=''&&type=='2'" style="margin-left: -32px;padding-right: 16px;font-size: 20px;color: #00bb6b;user-select:none;">✔</div>
      </div>
      <div class="titleFullLine" v-if="type==1">
        <span class="titleName borderRight">车牌号</span>
        <span class="titleNameRight">{{vehicle}}</span>
        <span class="titleName borderRight" style="border-left: 0;">接待人</span>
        <span class="titleNameRight">{{client}}</span>
      </div>
      <div class="titleFullLine" v-if="type==1">
        <span class="titleName borderRight">送修人</span>
        <span class="titleNameRight">{{contactPerson}}</span>
        <span class="titleName borderRight" style="border-left: 0;">送修人手机号</span>
        <span class="titleNameRight">{{contactPersonPhone}}</span>
      </div>
      <div class="titleFullLine" v-for="(item,index) in content" :key="index">
        <span class="titleName borderRight" v-if="type=='1'">{{item.detailname}}</span>
        <input class="titleName borderRight" v-else ref="input" @blur="inputBlur(item,index)" :placeholder="placeholder" v-model="item.detailname">
        <!--          <span style="cursor: pointer;"></span>-->
        <!--          <yhm-form-td-textbox width="880" id="detailname" :list="content" listid="content" :value="item" rule="R0000"></yhm-form-td-textbox>-->
        <yhm-form-td-upload-image v-if="item.filepath==''" width="130" class="titleNameRight" style="justify-content: left;" tag="fixOrderUnitConcat" accept=" " @mouseover="invoiceImg(item)" @mouseout="invoiceImgHide(item)" :list="content" listid="content" :value="item" id="filepath" rule="#"></yhm-form-td-upload-image>
        <span v-else-if="!/\.(gif|jpg|jpeg|png|GIF|JPG|PNG|svg)$/.test(item.filepath)" class="titleNameRight" @click="skip(item)" style="color: #49a9ea;padding-left: 6px;cursor: pointer;font-size: 16px;">点击查看文件</span>
        <yhm-form-td-upload-image v-else-if="/\.(gif|jpg|jpeg|png|GIF|JPG|PNG|svg)$/.test(item.filepath)" width="130" class="titleNameRight" style="justify-content: left;" tag="fixOrderUnitConcat" accept=" " @mouseover="invoiceImg(item)" @mouseout="invoiceImgHide(item)" :list="content" listid="content" :value="item" id="filepath" rule="#"></yhm-form-td-upload-image>
        <div v-if="item.detailname!=''&&item.filepath!=''" style="margin-left: -32px;padding-right: 16px;font-size: 20px;color: #00bb6b;user-select:none;">✔</div>
        <div v-else style="margin-left: -37px;padding-right: 14px;font-size: 32px;color: #f00;user-select:none;">⨯</div>
        <!--          <span class="btnAdd iconAdd" @click="add()" v-if="content.length==index+1"></span>-->
        <span class="icon-delete2 iconDelete" v-if="type=='2'" @click="delFromList(index)" title="删除保险公司条约"></span>
      </div>
      <div class="titleFullLine borderRight" style="display:flex;box-sizing: border-box;align-items: center;justify-content: center;border-left: 2px solid #333;">
        <span class="btnAdd iconAdd" @click="add()" title="添加保险公司条约"></span>

      </div>

      </div>
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
        code:'',//工单号
        vehicle:'',//车牌号
        client:'',//接待人
        contactPerson:'',//送修人
        contactPersonPhone:'',//送修人手机
        unitEntity:guid(),
        unitname:'',//保险公司名称
        unitID:'',//保险公司id
        placeholder:'请输入内容',
        isFlag:'',
        content:[],
        viewImg:'',
        viewImgShow:false,  //显示发票图片

      }
    },
    methods:{
      delFromList(index){
        this.$dialog.confirm({
          width: 300,
          tipValue: '是否确认删除当前条约记录？',
          alertImg: 'warn',
          okCallBack: ()=>{
            this.content.splice(index,1)
          }
        })
      },
      inputBlur(item,index){
        if(this.$refs.input[index].value==''){
          this.$refs.input[index].style.border = '2px solid rgba(255,0,0,0.6)'
        }else{
          this.$refs.input[index].style.border = '2px solid #333'
        }
      },
      add(){
        this.content.push({
          id: guid(),
          ownerID:this.id,
          filepath:'',//文件路径
          detailname:''
        })
      },
      skip(item){
        window.open('/UploadFile/fixOrderUnitConcat/' + item.filepath)
      },
      save(){
        let a = this.validator()
        let manager = []
        let manager2 = []
        let item = {}//处理创建保险公司的数据
        let item2 = {}//处理上传保险公司资料的数据
        let arr = []
        for(let i=0; i<this.$refs.input.length; i++){
          if(this.$refs.input[i].value==''){
            this.$refs.input[i].style.border = '2px solid rgba(255,0,0,0.6)'
            this.placeholder = '不能为空'
            arr.push('1')
          }else{
            arr.push('0')
          }
        }
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
        // console.log(params,'params')
        // console.log(params2,'params2')
        // return
        if(a&&arr.indexOf('1')==-1){
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
        if(this.type=='2'){
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
        }
      },
      //显示发票图片
      invoiceImg(item){
        if(item.filepath !== '') {
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
        if(item.filepath !== '') {
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
            if(data.id!=null && data.id !=''){
              this.unitEntity = data.id
            }
            if(data.unitname!=null){
              this.unitname = data.unitname
            }
            if(data.unitID!=null){
              this.unitID = data.unitID
            }
            if(this.type!='2'){
              this.code = data.code//编号
              this.vehicle = data.vehicle//车牌号
              this.client = data.client//接待人
              this.contactPerson = data.contactPerson//送修人
              this.contactPersonPhone = data.contactPersonPhone//送修人手机
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
      // this.initData()
    }
  }
</script>

<style lang="less" scoped>

  .iconAdd::before{
    color: #49a9ea;
    font-size: 22px;
  }
  .iconAdd{
    /*position: absolute;*/
    /*right: -36px;*/
    /*margin-top: 5px;*/
    font-size: 18px;
    cursor: pointer;
  }
  .iconDelete::before{
    color: rgba(255,0,0,0.6);
  }
  .iconDelete{
    position: absolute;
    right: -31px;
    margin-top: 2px;
    font-size: 22px;
    cursor: pointer;
  }
  .invoiceImgView{
    width: 522px;
    height: 300px;
    top: -369px;
    right: -562px;
  }
  .periphery{
    background-color: #fff;
    height: 100%;
    min-height: 680px;
    width: 100%;
    /*position: absolute;*/
    /*top: 0;*/
    /*bottom: 0;*/
    /*left: 0;*/
    /*right: 0;*/
    padding: 20px 0px 102px 0px;
    /*padding-right: calc(100vw - 100%);*/
    box-sizing: border-box;
  .title{
    font-size: 20px;
    font-weight: bold;
    text-align: center;
    margin-bottom: 20px;
  }
  }
  .main{
    width: 810px;
    margin: 0 auto;
    height: 100%;
    border-top:2px solid #333;
  .titleFullLine{
    position: relative;
    width: 100%;
    height: 30px;
    border-bottom:2px solid #333;
    display: flex;
    align-items: center;

  span{
    display: inline-block;
  }
  .titleName{
    width: 160px;
    height: 100%;
    line-height: 100%;
    background-color: #cdccd4;
    display: flex;
    align-items: center;
    padding-left: 6px;
    font-size: 15px;
    border-left: 2px solid #333;
    /*justify-content: center;*/
  }
  .titleName:focus{
    border:2px solid #49a9ea !important;
  }
  .titleNameRight{
    /*width: 100%;*/
    flex: 1;
    height: 100%;
    display: flex;
    align-items: center;
    border-right: 2px solid #333;
    padding-left: 6px;
    font-size: 15px;
  }
  }
  }
  .borderRight{
    border-right: 2px solid #333;
  }
</style>
