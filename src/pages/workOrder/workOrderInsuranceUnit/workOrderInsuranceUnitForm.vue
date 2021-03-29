<template>
    <div class="periphery">
<!--      <yhm-formbody>-->
<!--        <template #title >-->
<!--          <span>基本信息</span>-->
<!--        </template>-->
<!--        <template #control>-->
<!--          <yhm-form-select placeholder="" title="保险公司" subtitle="名称" :value="unitname" id="unitname" rule="R0000" @click="unitSelect"></yhm-form-select>-->
<!--          &lt;!&ndash;          <yhm-form-text title="单位简称" :value="unitshort" id="unitshort"></yhm-form-text>&ndash;&gt;-->

<!--          &lt;!&ndash;        <yhm-form-select placeholder="" title="联系人" subtitle="" :value="person" id="person" rule="R0000" @click="personSelect"></yhm-form-select>&ndash;&gt;-->
<!--          &lt;!&ndash;        <yhm-form-text title="推修费率" :value="rate" id="rate" rule="R0000" after-icon="icon-percentage"></yhm-form-text>&ndash;&gt;-->
<!--          &lt;!&ndash;        <yhm-form-radio title="结算类型" ref="typeRadio" :select-list="typeList" :value="type" id="type" rule="#"></yhm-form-radio>&ndash;&gt;-->
<!--          &lt;!&ndash;        <yhm-form-date title="开始时间" :value="startDate" id="startDate" rule="R0000"></yhm-form-date>&ndash;&gt;-->
<!--          &lt;!&ndash;        <yhm-form-date title="结束时间" :value="endDate" id="endDate" :min="startDate" rule="R0000"></yhm-form-date>&ndash;&gt;-->
<!--          &lt;!&ndash;        &lt;!&ndash;<yhm-form-text title="合同" width="1" :value="companyID" id="companyID" ></yhm-form-text>&ndash;&gt;&ndash;&gt;-->
<!--          &lt;!&ndash;        <yhm-formupload :ownerID="id" :value="fileList" id="fileList" title="上传合同" tag="fixCompany" rule="#"></yhm-formupload>&ndash;&gt;-->
<!--        </template>-->
<!--      </yhm-formbody>-->
<!--      <div class="f_split"></div>-->
<!--      <yhm-form-list-edit>-->
<!--        <template #title>-->
<!--          <span>保险公司条约</span>-->
<!--        </template>-->
<!--        <template #operate>-->
<!--          <yhm-commonbutton value="添加" icon="btnAdd" @call="add()"></yhm-commonbutton>-->
<!--        </template>-->
<!--        <template #listHead>-->
<!--          &lt;!&ndash;          <yhm-managerth style="width: 38px" title="查看"></yhm-managerth>&ndash;&gt;-->
<!--          <yhm-managerth style="width: 40px" title="序号"></yhm-managerth>-->
<!--          <yhm-managerth title="条约名称"></yhm-managerth>-->
<!--          <yhm-managerth style="width: 40px" title="删除"></yhm-managerth>-->

<!--        </template>-->
<!--        <template #listBody >-->
<!--          <tr v-for="(item,index) in content" :key="index" :class="{InterlacBg:index%2!==0}" >-->
<!--            <div style="display: flex;justify-content: center;text-align: center">{{Number(index)+1}}</div>-->
<!--            &lt;!&ndash;            <yhm-manager-td-look class="solidYhm" @click="listView(item)"></yhm-manager-td-look>&ndash;&gt;-->
<!--            &lt;!&ndash;            <yhm-manager-td-date class="solidYhm" :value="item.detailname"></yhm-manager-td-date>&ndash;&gt;-->
<!--            <yhm-form-td-textbox width="880" id="detailname" :list="content" listid="content" :value="item" rule="R0000"></yhm-form-td-textbox>-->
<!--            <yhm-form-td-delete width="40" :list="content" :value="item" :del-click="false" @click="delFromList(index)"></yhm-form-td-delete>-->

<!--          </tr>-->
<!--        </template>-->
<!--        <template #empty>-->
<!--          <span class="m_listNoData" v-show="content.length=='0'?true:false">暂时没有数据</span>-->
<!--        </template>-->
<!--        &lt;!&ndash;分页控件&ndash;&gt;-->
<!--&lt;!&ndash;        <template #pager>&ndash;&gt;-->
<!--&lt;!&ndash;          <yhm-pagination :pager="pager" :is-page-size="false" @initData="initData()"></yhm-pagination>&ndash;&gt;-->
<!--&lt;!&ndash;        </template>&ndash;&gt;-->
<!--      </yhm-form-list-edit>-->

      <div class="title">保 险 公 司 条 约</div>
      <div class="main">
        <div class="titleFullLine">
          <span class="titleName borderRight">保险公司</span>
          <span style="cursor: pointer;" class="titleNameRight" @click="unitSelect" :style="{color:unitname==''?'#757575':'#333'}">{{unitname==''?'点击选择保险公司':unitname}}</span>
          <span class="btnAdd iconAdd" @click="add()" title="添加保险公司条约"></span>
          <div v-if="unitname==''" style="margin-left: -37px;padding-right: 14px;font-size: 32px;color: #f00;user-select:none;">⨯</div>
          <div v-else style="margin-left: -32px;padding-right: 16px;font-size: 20px;color: #00bb6b;user-select:none;">✔</div>
        </div>
        <div class="titleFullLine" v-for="(item,index) in content" :key="index">
          <input class="titleName borderRight" ref="input" @blur="inputBlur(item,index)" :placeholder="placeholder" v-model="item.detailname">
<!--          <span style="cursor: pointer;"></span>-->
<!--          <yhm-form-td-textbox width="880" id="detailname" :list="content" listid="content" :value="item" rule="R0000"></yhm-form-td-textbox>-->
          <yhm-form-td-upload-image v-if="item.filepath==''" width="130" class="titleNameRight" style="justify-content: left;" tag="fixOrderUnitConcat" accept=" " @mouseover="invoiceImg(item)" @mouseout="invoiceImgHide(item)" :list="content" listid="content" :value="item" id="filepath" rule="#"></yhm-form-td-upload-image>
          <span v-else-if="!/\.(gif|jpg|jpeg|png|GIF|JPG|PNG|svg)$/.test(item.filepath)" class="titleNameRight" @click="skip(item)" style="color: #49a9ea;padding-left: 6px;cursor: pointer;font-size: 16px;">点击查看文件</span>
          <yhm-form-td-upload-image v-else-if="/\.(gif|jpg|jpeg|png|GIF|JPG|PNG|svg)$/.test(item.filepath)" width="130" class="titleNameRight" style="justify-content: left;" tag="fixOrderUnitConcat" accept=" " @mouseover="invoiceImg(item)" @mouseout="invoiceImgHide(item)" :list="content" listid="content" :value="item" id="filepath" rule="#"></yhm-form-td-upload-image>
          <div v-if="item.detailname!=''&&item.filepath!=''" style="margin-left: -32px;padding-right: 16px;font-size: 20px;color: #00bb6b;user-select:none;">✔</div>
          <div v-else style="margin-left: -37px;padding-right: 14px;font-size: 32px;color: #f00;user-select:none;">⨯</div>
          <!--          <span class="btnAdd iconAdd" @click="add()" v-if="content.length==index+1"></span>-->
          <span class="icon-delete2 iconDelete" @click="delFromList(index)" title="删除保险公司条约"></span>

        </div>

      </div>
      <div class="invoiceImgView" v-show="viewImgShow" @click="invoiceImgHide" title="点击关闭">
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
    name: 'workOrderInsuranceUnitForm',
    mixins: [formmixin],
    data(){
      return{
        unitname:'',//保险公司名称
        unitID:'',//保险公司id
        placeholder:'请输入内容',
        content:[],
        pager: {
          total: 0, // 总条数
          pageSize: 5, // 每页条数
          pageIndex: 1, // 当前页码
          selectCount: 0 // 选中条数
        },
        viewImgShow:false,  //显示发票图片
      }
    },
    methods:{
      inputBlur(item,index){
        console.log(this.$refs.input[index].value)
        if(this.$refs.input[index].value==''){
          this.$refs.input[index].style.border = '2px solid rgba(255,0,0,0.6)'
        }else{
          this.$refs.input[index].style.border = '2px solid #333'
        }
      },
      skip(item){
        window.open('/UploadFile/fixOrderUnitConcat/' + item.filepath)
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
      add(){
        this.content.push({
          id: guid(),
          ownerID:this.id,
          filepath:'',
          detailname:''
        })
      },
      save(){
        let a = this.validator()
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
        let params = {
          id:this.id,
          unitname:this.unitname,//保险公司名称
          unitID:this.unitID,//保险公司id
          manager:this.content
        }
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
          url: '/selectWorkOrderInsurance',
          title: '选择保险公司',
          closeCallBack: (data) => {
            if (data) {
              this.unitname = data.showName
              this.unitID = data.id
            }
          }
        })
      },
      initData () {
        this.init({
          url: '/fix/fixOrderUnit/initForm',
          data:{
            // id:this.id,
            // pageSize:this.pager.pageSize,
            // pageIndex:this.pager.pageIndex
          },
          all: (data) => {

          },
          add: (data) => {
            this.add()
            /* 需要添加的数据 */
          },
          look: (data) => {
            this.unitname = data.unitname
            this.unitID = data.unitID
            this.content = data.manager
          }
        })
      }
    },
    created () {
      this.initData()

    }
  }
</script>
<style lang="less" scoped>

  .iconAdd::before{
    color: #49a9ea;
    font-size: 22px;
  }
  .iconAdd{
    position: absolute;
    right: -36px;
    margin-top: 5px;
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
