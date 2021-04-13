<template>
    <div class="periphery">
<!--      <div class="title">保 险 公 司 条 约</div>-->
<!--      <div class="main">-->
<!--        <div class="titleFullLine">-->
<!--          <span class="titleName borderRight">保险公司</span>-->
<!--          <span style="cursor: pointer;" class="titleNameRight" @click="unitSelect" :style="{color:unitname==''?'#757575':'#333'}">{{unitname==''?'点击选择保险公司':unitname}}</span>-->
<!--          <span class="btnAdd iconAdd" @click="add()" title="添加保险公司条约"></span>-->
<!--          <div v-if="unitname==''" style="margin-left: -37px;padding-right: 14px;font-size: 32px;color: #f00;user-select:none;">⨯</div>-->
<!--          <div v-else style="margin-left: -32px;padding-right: 16px;font-size: 20px;color: #00bb6b;user-select:none;">✔</div>-->
<!--        </div>-->
<!--        <div class="titleFullLine" v-for="(item,index) in content" :key="index">-->
<!--          <input class="titleName borderRight" ref="input" @blur="inputBlur(item,index)" :placeholder="placeholder" v-model="item.detailname">-->
<!--&lt;!&ndash;          <span style="cursor: pointer;"></span>&ndash;&gt;-->
<!--&lt;!&ndash;          <yhm-form-td-textbox width="880" id="detailname" :list="content" listid="content" :value="item" rule="R0000"></yhm-form-td-textbox>&ndash;&gt;-->
<!--          <yhm-form-td-upload-image v-if="item.filepath==''" width="130" class="titleNameRight" style="justify-content: left;" tag="fixOrderUnitConcat" accept=" " @mouseover="invoiceImg(item)" @mouseout="invoiceImgHide(item)" :list="content" listid="content" :value="item" id="filepath" rule="#"></yhm-form-td-upload-image>-->
<!--          <span v-else-if="!/\.(gif|jpg|jpeg|png|GIF|JPG|PNG|svg)$/.test(item.filepath)" class="titleNameRight" @click="skip(item)" style="color: #49a9ea;padding-left: 6px;cursor: pointer;font-size: 16px;">点击查看文件</span>-->
<!--          <yhm-form-td-upload-image v-else-if="/\.(gif|jpg|jpeg|png|GIF|JPG|PNG|svg)$/.test(item.filepath)" width="130" class="titleNameRight" style="justify-content: left;" tag="fixOrderUnitConcat" accept=" " @mouseover="invoiceImg(item)" @mouseout="invoiceImgHide(item)" :list="content" listid="content" :value="item" id="filepath" rule="#"></yhm-form-td-upload-image>-->
<!--          <div v-if="item.detailname!=''&&item.filepath!=''" style="margin-left: -32px;padding-right: 16px;font-size: 20px;color: #00bb6b;user-select:none;">✔</div>-->
<!--          <div v-else style="margin-left: -37px;padding-right: 14px;font-size: 32px;color: #f00;user-select:none;">⨯</div>-->
<!--          &lt;!&ndash;          <span class="btnAdd iconAdd" @click="add()" v-if="content.length==index+1"></span>&ndash;&gt;-->
<!--          <span class="icon-delete2 iconDelete" @click="delFromList(index)" title="删除保险公司条约"></span>-->
<!--        </div>-->
<!--      </div>-->
      <!--        <div style="display: flex;justify-content: center;flex: 1;align-items: center;">-->
      <!--          <span style="font-size: 20px;">保险公司 : </span>-->
      <!--          <span style="cursor: pointer;font-size: 20px;" class="titleNameRight" @click="unitSelect" :style="{color:unitname==''?'#757575':'#333'}">{{unitname==''?'点击选择保险公司':unitname}}</span>-->

      <!--        </div>-->
      <div class="buttonBox">
        <span class="button" v-for="(item,index) in btnList" :key="index" @click="active=index" :class="{active:active==index}">
          {{item}}
        </span>
      </div>
      <div class="table" style="margin-bottom: 10px;background-color: #f7fcff;">
        <span style="border-right: 1px solid #ccc;height: 40px;text-align: center;line-height: 40px;color: #49a9ea;transition: 0.5s all;"
          :style="{width:active=='0'?'116px':'190px'}"
        >保险公司</span>
        <span style="font-size: 16px;flex: 1;height: 40px;line-height: 40px;text-indent: 10px;" class="titleNameRight" :style="{color:unitname==''?'#757575':'#333'}">{{unitname==''?'点击选择保险公司':unitname}}</span>
      </div>
      <div class="table" v-show="active=='0'">
        <div class="tableLeftTitle">
          个人车主资料要求
        </div>
        <div class="tableRight">
          <div class="tableContent" v-for="(item,index) in content" :key="index">
            <div class="tableMain">

              <textarea v-model="item.claimname" class="textareaFontWeight" style="width: 100%;height: 100%;font-weight: bold;padding: 20px 0 20px 10px; box-sizing: border-box;" placeholder="请输入资料名称"></textarea>
            </div>
            <div class="tableMain2">
              <textarea v-model="item.claimStr" class="tableMainTextarea textareaFontWeight" style="width: 100%;height: 100%;box-sizing: border-box;" placeholder="请输入资料要求"></textarea>
            </div>
            <div class="tableMain3">
              <yhm-form-td-upload-image width="130" class="titleNameRight" style="justify-content: left;" tag="fixOrderUnitConcat" accept=" " @mouseover="invoiceImg(item)" @mouseout="invoiceImgHide(item)" :list="content" listid="content" :value="item" id="filepath" rule="#"></yhm-form-td-upload-image>
              <span style="color: #49a9ea;font-weight: bold;cursor: pointer;" v-show="item.filepath!=''" @click="skip(item)">查看示例</span>
              <span class="icon-delete2 tableIconDelete" @click="delFromList(index,'0')"></span>
            </div>
          </div>
          <div class="tableContent addContent" @click="add('0')" style="font-size: 34px;color: #49a9ea;">
            +
            <div class="addContentMessage">添加资料</div>
          </div>
        </div>
      </div>
      <div class="table" v-show="active=='0'" style="margin-top: 20px;">
        <div class="tableLeftTitle">
          单位车主资料要求
        </div>
        <div class="tableRight">
          <div class="tableContent" v-for="(item,index) in content1" :key="index">
            <div class="tableMain">
              <textarea v-model="item.claimname" class="textareaFontWeight" style="width: 100%;height: 100%;font-weight: bold;padding: 20px 0 20px 10px; box-sizing: border-box;" placeholder="请输入资料名称"></textarea>
            </div>
            <div class="tableMain2">
              <textarea v-model="item.claimStr" class="tableMainTextarea textareaFontWeight" style="width: 100%;height: 100%;box-sizing: border-box;" placeholder="请输入资料要求"></textarea>
            </div>
            <div class="tableMain3">
              <yhm-form-td-upload-image width="130" class="titleNameRight" style="justify-content: left;" tag="fixOrderUnitConcat" accept=" " @mouseover="invoiceImg(item)" @mouseout="invoiceImgHide(item)" :list="content1" listid="content1" :value="item" id="filepath" rule="#"></yhm-form-td-upload-image>
              <span style="color: #49a9ea;font-weight: bold;cursor: pointer;" v-show="item.filepath!=''" @click="skip(item)">查看示例</span>
              <span class="icon-delete2 tableIconDelete" @click="delFromList(index,'1')"></span>
            </div>
          </div>
          <div class="tableContent addContent" @click="add('1')" style="font-size: 34px;color: #49a9ea;">
            +
            <div class="addContentMessage">添加资料</div>
          </div>
        </div>
      </div>
      <!--             :style="{width:active=='0'?'116px':'190px'}"-->
      <div v-show="active=='1'" class="mainPart">
        <div class="mainPartTitle">
          主车
        </div>
        <div class="mainTableRight" style="width: 100%;">
          <div class="table" style="margin-left: 0;width: 100%;border-left: none;">
            <div class="tableLeftTitle" style="border-left: none;">
              个人车主资料要求
            </div>
            <div class="tableRight">
              <div class="tableContent" v-for="(item,index) in content2" :key="index">
                <div class="tableMain">
                  <textarea v-model="item.claimname" ref="textarea" class="textareaFontWeight" style="width: 100%;height: 100%;font-weight: bold;padding: 20px 0 20px 10px; box-sizing: border-box;" placeholder="请输入资料名称"></textarea>
                </div>
                <div class="tableMain2">
                  <textarea v-model="item.claimStr" ref="textarea" class="tableMainTextarea textareaFontWeight" style="width: 100%;height: 100%;box-sizing: border-box;" placeholder="请输入资料要求"></textarea>
                </div>
                <div class="tableMain3">
                  <yhm-form-td-upload-image width="130" class="titleNameRight" style="justify-content: left;" tag="fixOrderUnitConcat" accept=" " @mouseover="invoiceImg(item)" @mouseout="invoiceImgHide(item)" :list="content2" listid="content2" :value="item" id="filepath" rule="#"></yhm-form-td-upload-image>
                  <span style="color: #49a9ea;font-weight: bold;cursor: pointer;" v-show="item.filepath!=''" @click="skip(item)">查看示例</span>
                  <span class="icon-delete2 tableIconDelete" @click="delFromList(index,'2')"></span>
                </div>
              </div>
              <div class="tableContent addContent" @click="add('2')" style="font-size: 34px;color: #49a9ea;">
                +
                <div class="addContentMessage">添加资料</div>
              </div>
            </div>
          </div>
          <div class="table" style="margin-top: 20px;width: 100%;border-left: none;">
            <div class="tableLeftTitle">
              单位车主资料要求
            </div>
            <div class="tableRight">
              <div class="tableContent" v-for="(item,index) in content3" :key="index">
                <div class="tableMain">
                  <textarea v-model="item.claimname" class="textareaFontWeight" style="width: 100%;height: 100%;font-weight: bold;padding: 20px 0 20px 10px; box-sizing: border-box;" placeholder="请输入资料名称"></textarea>
                </div>
                <div class="tableMain2">
                  <textarea v-model="item.claimStr" class="tableMainTextarea textareaFontWeight" style="width: 100%;height: 100%;box-sizing: border-box;" placeholder="请输入资料要求"></textarea>
                </div>
                <div class="tableMain3">
                  <yhm-form-td-upload-image width="130" class="titleNameRight" style="justify-content: left;" tag="fixOrderUnitConcat" accept=" " @mouseover="invoiceImg(item)" @mouseout="invoiceImgHide(item)" :list="content3" listid="content3" :value="item" id="filepath" rule="#"></yhm-form-td-upload-image>
                  <span style="color: #49a9ea;font-weight: bold;cursor: pointer;" v-show="item.filepath!=''" @click="skip(item)">查看示例</span>
                  <span class="icon-delete2 tableIconDelete" @click="delFromList(index,'3')"></span>
                </div>
              </div>
              <div class="tableContent addContent" @click="add('3',true)" style="font-size: 34px;color: #49a9ea;">
                +
                <div class="addContentMessage">添加资料</div>
              </div>
            </div>
          </div>
        </div>
      </div>
<!--      <div v-show="active=='1'" style="width: 96%;border: 1px solid #49a9ea;margin: 10px auto;"></div>-->
      <div v-show="active=='1'" class="mainPart" style="margin-top: 20px;">
        <div class="mainPartTitle">
          三者车
        </div>
        <div class="mainTableRight" style="width: 100%;">
          <div class="table" style="margin-left: 0;width: 100%;border-left: none;">
            <div class="tableLeftTitle" style="border-left: none;">
              个人车主资料要求
            </div>
            <div class="tableRight">
              <div class="tableContent" v-for="(item,index) in content4" :key="index">
                <div class="tableMain">
                  <textarea v-model="item.claimname" class="textareaFontWeight" style="width: 100%;height: 100%;font-weight: bold;padding: 20px 0 20px 10px; box-sizing: border-box;" placeholder="请输入资料名称"></textarea>
                </div>
                <div class="tableMain2">
                  <textarea v-model="item.claimStr" class="tableMainTextarea textareaFontWeight" style="width: 100%;height: 100%;box-sizing: border-box;" placeholder="请输入资料要求"></textarea>
                </div>
                <div class="tableMain3">
                  <yhm-form-td-upload-image width="130" class="titleNameRight" style="justify-content: left;" tag="fixOrderUnitConcat" accept=" " @mouseover="invoiceImg(item)" @mouseout="invoiceImgHide(item)" :list="content4" listid="content4" :value="item" id="filepath" rule="#"></yhm-form-td-upload-image>
                  <span style="color: #49a9ea;font-weight: bold;cursor: pointer;" v-show="item.filepath!=''" @click="skip(item)">查看示例</span>
                  <span class="icon-delete2 tableIconDelete" @click="delFromList(index,'4')"></span>
                </div>
              </div>
              <div class="tableContent addContent" @click="add('4')" style="font-size: 34px;color: #49a9ea;">
                +
                <div class="addContentMessage">添加资料</div>
              </div>
            </div>
          </div>
          <div class="table" style="margin-top: 20px;width: 100%;border-left: none;">
            <div class="tableLeftTitle">
              单位车主资料要求
            </div>
            <div class="tableRight">
              <div class="tableContent" v-for="(item,index) in content5" :key="index">
                <div class="tableMain">
                  <textarea v-model="item.claimname" class="textareaFontWeight" style="width: 100%;height: 100%;font-weight: bold;padding: 20px 0 20px 10px; box-sizing: border-box;" placeholder="请输入资料名称"></textarea>
                </div>
                <div class="tableMain2">
                  <textarea v-model="item.claimStr" class="tableMainTextarea textareaFontWeight" style="width: 100%;height: 100%;box-sizing: border-box;" placeholder="请输入资料要求"></textarea>
                </div>
                <div class="tableMain3">
                  <yhm-form-td-upload-image width="130" class="titleNameRight" style="justify-content: left;" tag="fixOrderUnitConcat" accept=" " @mouseover="invoiceImg(item)" @mouseout="invoiceImgHide(item)" :list="content5" listid="content5" :value="item" id="filepath" rule="#"></yhm-form-td-upload-image>
                  <span style="color: #49a9ea;font-weight: bold;cursor: pointer;" v-show="item.filepath!=''" @click="skip(item)">查看示例</span>
                  <span class="icon-delete2 tableIconDelete" @click="delFromList(index,'5')"></span>
                </div>
              </div>
              <div class="tableContent addContent" @click="add('5')" style="font-size: 34px;color: #49a9ea;">
                +
                <div class="addContentMessage">添加资料</div>
              </div>
            </div>
          </div>
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
        btnList:['单方事故','双方事故'],
        active:'0',
        viewImg:'',
        unitname:'',//保险公司名称
        unitID:'',//保险公司id
        placeholder:'请输入内容',
        ownerID:'',
        fixorderunitID:'',
        content:[],//单方事故个人车主
        content1:[],//单方事故单位车主
        content2:[],//双方事故 主车  个人车主
        content3:[],//双方事故 主车  单位车主
        content4:[],//双方事故 三者车  个人车主
        content5:[],//双方事故 三者车  单位车主

        bothContent:[],//双方事故 主车个人车主资料列表
        bothContent1:[],//双方事故 主车单位车主资料列表
        // bothContent1:[],//双方事故 主车单位车主资料列表
        manager:[],//合并所有数据
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
        console.log(this.$refs.textarea[index].value)
        if(this.$refs.textarea[index].value==''){
          this.$refs.textarea[index].style.border = '2px solid rgba(255,0,0,0.6)'
        }else{
          this.$refs.textarea[index].style.border = '2px solid #333'
        }
      },
      skip(item){
        window.open('/UploadFile/fixOrderUnitConcat/' + item.detailpath)
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
      delFromList(index,type){
        this.$dialog.confirm({
          width: 300,
          tipValue: '是否确认删除当前条约记录？',
          alertImg: 'warn',
          okCallBack: ()=>{
            console.log(index,type)
            if(type=='0'){
              this.content.splice(index,1)
            }else if(type=='1'){
              this.content1.splice(index,1)
            }else if(type=='2'){
              this.content2.splice(index,1)
            }else if(type=='3'){
              this.content3.splice(index,1)
            }else if(type=='4'){
              this.content4.splice(index,1)
            }else if(type=='5'){
              this.content5.splice(index,1)
            }
          }
        })
      },
      add(type,show){
        if(type=='0'){
          this.content.push({
            id: guid(),
            ownerID:this.ownerID,
            filepath:'',
            claimname:'',//资料名称
            claimStr:'',//资料要求
            unitstate:'0',//个人要求和单位车要求区别，0，个人车，1单位车
            oddstate:this.active,//单双事故区别字段： 0，单方事故，1，双方事故
            mainstate:'0'//区分主车和三者车，0，主车，1，三者车
          })
        }else if(type=='1'){
          this.content1.push({
            id: guid(),
            ownerID:this.ownerID,
            filepath:'',
            claimname:'',//资料名称
            claimStr:'',//资料要求
            unitstate:'1',//个人要求和单位车要求区别，0，个人车，1单位车
            oddstate:this.active,//单双事故区别字段： 0，单方事故，1，双方事故
            mainstate:'0'//区分主车和三者车，0，主车，1，三者车
          })
          this.$nextTick(()=>{
            window.scrollTo(0,document.body.scrollHeight)
          })
        }else if(type=='2'){
          this.content2.push({
            id: guid(),
            ownerID:this.ownerID,
            filepath:'',
            claimname:'',//资料名称
            claimStr:'',//资料要求
            unitstate:'0',//个人要求和单位车要求区别，0，个人车，1单位车
            oddstate:this.active,//单双事故区别字段： 0，单方事故，1，双方事故
            mainstate:'0'//区分主车和三者车，0，主车，1，三者车
          })
        }else if(type=='3'){
          this.content3.push({
            id: guid(),
            ownerID:this.ownerID,
            filepath:'',
            claimname:'',//资料名称
            claimStr:'',//资料要求
            unitstate:'1',//个人要求和单位车要求区别，0，个人车，1单位车
            oddstate:this.active,//单双事故区别字段： 0，单方事故，1，双方事故
            mainstate:'0'//区分主车和三者车，0，主车，1，三者车
          })
        }else if(type=='4'){
          this.content4.push({
            id: guid(),
            ownerID:this.ownerID,
            filepath:'',
            claimname:'',//资料名称
            claimStr:'',//资料要求
            unitstate:'0',//个人要求和单位车要求区别，0，个人车，1单位车
            oddstate:this.active,//单双事故区别字段： 0，单方事故，1，双方事故
            mainstate:'1'//区分主车和三者车，0，主车，1，三者车
          })
        }else if(type=='5'){
          this.content5.push({
            id: guid(),
            ownerID:this.ownerID,
            filepath:'',
            claimname:'',//资料名称
            claimStr:'',//资料要求
            unitstate:'1',//个人要求和单位车要求区别，0，个人车，1单位车
            oddstate:this.active,//单双事故区别字段： 0，单方事故，1，双方事故
            mainstate:'1'//区分主车和三者车，0，主车，1，三者车
          })
          this.$nextTick(()=>{
            window.scrollTo(0,document.body.scrollHeight)
          })
        }else if(type=='99'){
          this.content.push({
            id: guid(),
            ownerID:this.ownerID,
            filepath:'',
            claimname:'',//资料名称
            claimStr:'',//资料要求
            unitstate:'0',//个人要求和单位车要求区别，0，个人车，1单位车
            oddstate:this.active,//单双事故区别字段： 0，单方事故，1，双方事故
            mainstate:'0'//区分主车和三者车，0，主车，1，三者车
          })
          this.content1.push({
            id: guid(),
            ownerID:this.ownerID,
            filepath:'',
            claimname:'',//资料名称
            claimStr:'',//资料要求
            unitstate:'1',//个人要求和单位车要求区别，0，个人车，1单位车
            oddstate:this.active,//单双事故区别字段： 0，单方事故，1，双方事故
            mainstate:'0'//区分主车和三者车，0，主车，1，三者车
          })
          this.content2.push({
            id: guid(),
            ownerID:this.ownerID,
            filepath:'',
            claimname:'',//资料名称
            claimStr:'',//资料要求
            unitstate:'0',//个人要求和单位车要求区别，0，个人车，1单位车
            oddstate:this.active,//单双事故区别字段： 0，单方事故，1，双方事故
            mainstate:'0'//区分主车和三者车，0，主车，1，三者车
          })
          this.content3.push({
            id: guid(),
            ownerID:this.ownerID,
            filepath:'',
            claimname:'',//资料名称
            claimStr:'',//资料要求
            unitstate:'1',//个人要求和单位车要求区别，0，个人车，1单位车
            oddstate:this.active,//单双事故区别字段： 0，单方事故，1，双方事故
            mainstate:'0'//区分主车和三者车，0，主车，1，三者车
          })
          this.content4.push({
            id: guid(),
            ownerID:this.ownerID,
            filepath:'',
            claimname:'',//资料名称
            claimStr:'',//资料要求
            unitstate:'0',//个人要求和单位车要求区别，0，个人车，1单位车
            oddstate:this.active,//单双事故区别字段： 0，单方事故，1，双方事故
            mainstate:'1'//区分主车和三者车，0，主车，1，三者车
          })
          this.content5.push({
            id: guid(),
            ownerID:this.ownerID,
            filepath:'',
            claimname:'',//资料名称
            claimStr:'',//资料要求
            unitstate:'1',//个人要求和单位车要求区别，0，个人车，1单位车
            oddstate:this.active,//单双事故区别字段： 0，单方事故，1，双方事故
            mainstate:'1'//区分主车和三者车，0，主车，1，三者车
          })
        }
      },
      save(){
        let a = this.validator()

        let arr = []
        // const arrNew = []
        const arrNew = this.content.concat(this.content1,this.content2,this.content3,this.content4,this.content5)
        // console.log(arrNew)
        // return
        try {
          for(let i=0; i<this.$refs.textarea.length; i++){
            if(this.$refs.textarea[i].value==''){
              this.$refs.textarea[i].style.border = '2px solid rgba(255,0,0,0.6)'
              this.placeholder = '不能为空'
              arr.push('1')
            }else{
              arr.push('0')
            }
          }
        }catch (e) {

        }

        let params = {
          id:this.ownerID,
          unitname:this.unitname,//保险公司名称
          unitID:this.unitID,//保险公司id
          manager:arrNew
        }
        // console.log(params)
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
          url: '/fix/fixOrderUnit/initFormUnit',
          data:{
            // id:this.id,
            // pageSize:this.pager.pageSize,
            // pageIndex:this.pager.pageIndex
          },
          all: (data) => {

          },
          add: (data) => {
            /* 需要添加的数据 */
          },
          look: (data) => {
            this.content = data.content
            this.content1 = data.content1
            this.content2 = data.content2
            this.content3 = data.content3
            this.content4 = data.content4
            this.content5 = data.content5
            // this.unitname = data.unitname
            // this.unitID = data.unitID
            // this.content = data.manager
            // this.add('99')

          }
        })
      }
    },
    created () {
      this.setQuery2Value('unitID')
      this.setQuery2Value('unitname')
      this.setQuery2Value('fixorderunitID')
      this.ownerID = this.fixorderunitID
      this.initData()

    }
  }
</script>
<style lang="less" scoped>
.buttonBox{
  width: 100%;
  height:42px;
  padding-left: 20px;
  margin-bottom: 10px;
  box-sizing: border-box;
  display: flex;
  align-items: center;
}
.button{
  padding: 10px 25px;
  /*border-radius: 5px;*/
  border: 1px solid #dcdfe6;
  border-radius: 4px 0 0 4px;
  cursor: pointer;
}
.active{
  color: #fff;
  background-color: #409eff;
  border-color: #409eff;
  box-shadow: -1px 0 0 0 #409eff;
}
.textareaFontWeight::-webkit-input-placeholder{
  font-weight: bold;
}
.tableMainTextarea::-webkit-input-placeholder{
  padding: 15px 0px 0px 5px;
  /*color:#ff3333 !important;*/
}
.mainPart{
  display: flex;
  justify-content: space-between;
  width: 96%;
  margin: auto;
}
.mainPartTitle{
  width: 80px;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #49a9ea;
  background-color: #f7fcff;
  border: 1px solid #ccc;
  /*border-right:none;*/
}
.table{
  width: 96%;
  height: auto;
  border:0.5px solid #ccc;
  margin: auto;
  display: flex;
  justify-content: center;
  .tableLeftTitle{
    width: 130px;
    font-weight: bold;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #49a9ea;
    background-color: #f7fcff;
    border-right: 1px solid #dcdfe6;
  }
  .tableRight:hover .addContent .addContentMessage{
    text-indent: 0;
    opacity: 1;
    color: #ccc;
  }
  .tableRight{
    width: 100%;
    display: flex;
    flex-direction: column;

    .addContent{
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;
      height: 40px;
    }
    .addContent:hover{
      background-color: #f9fafc;
    }
    .addContentMessage{
      opacity: 0;
      width: 60px;
      white-space:nowrap;
      text-indent: 30px;
      transition: 0.3s all;
      font-size: 16px;
      height: 100%;
      line-height: 40px;
      margin-left: 5px;
    }
    .addContent:hover .addContentMessage{
      color: #49a9ea;
      text-indent: 0;
      opacity: 1;
    }
    .tableContent{
      width: 100%;
      display: flex;
      border-top: 1px solid #dcdfe6;
      .tableMain{
        width: 200px;
        height: 60px;
        border-right: 1px solid #dcdfe6;
        /*background-color: #49a9ea;*/

      }
      .tableMain2{
        flex: 1;
        height: 60px;
        padding: 5px;
        box-sizing: border-box;
        border-right: 1px solid #dcdfe6;
        /*background-color: #1affff;*/
      }
      .tableMain3{
        width: 200px;
        height: 60px;
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        /*background-color: #f00;*/
        .tableIconDelete{
          position: absolute;
          right:6px;
          top: 18px;
          font-size: 22px;
          cursor: pointer;
        }
        .tableIconDelete::before{
          color: #f00;
        }
      }
    }
    .tableContent:nth-child(1){
      border-top: none;
    }
  }
}

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
  width: 680px;
  height: 600px;
  top: -40px;
  right: -56px;
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
