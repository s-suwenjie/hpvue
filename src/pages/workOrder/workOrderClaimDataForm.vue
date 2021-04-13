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

<!--    <div class="title">保 险 公 司 条 约</div>-->
<!--    <div class="main">-->
<!--      <div class="titleFullLine">-->
<!--        <span class="titleName borderRight">保险公司</span>-->
<!--        <span class="titleNameRight" @click="unitSelect" :style="{cursor:type=='2'?'pointer':'',color:unitname==''?'#757575':'#333'}">{{unitname==''?'点击选择保险公司':unitname}}</span>-->
<!--        <span class="btnAdd iconAdd" v-if="type=='2'" @click="add()" title="添加保险公司条约"></span>-->
<!--        <span v-if="type!='2'" class="titleName borderRight" style="border-left: 0;">工单号</span>-->
<!--        <span v-if="type!='2'" class="titleNameRight">{{code}}</span>-->
<!--        <div v-if="unitname==''&&type=='2'" style="margin-left: -37px;padding-right: 14px;font-size: 32px;color: #f00;user-select:none;">⨯</div>-->
<!--        <div v-else-if="unitname!=''&&type=='2'" style="margin-left: -32px;padding-right: 16px;font-size: 20px;color: #00bb6b;user-select:none;">✔</div>-->
<!--      </div>-->
<!--      <div class="titleFullLine" v-if="type==1">-->
<!--        <span class="titleName borderRight">车牌号</span>-->
<!--        <span class="titleNameRight">{{vehicle}}</span>-->
<!--        <span class="titleName borderRight" style="border-left: 0;">接待人</span>-->
<!--        <span class="titleNameRight">{{client}}</span>-->
<!--      </div>-->
<!--      <div class="titleFullLine" v-if="type==1">-->
<!--        <span class="titleName borderRight">送修人</span>-->
<!--        <span class="titleNameRight">{{contactPerson}}</span>-->
<!--        <span class="titleName borderRight" style="border-left: 0;">送修人手机号</span>-->
<!--        <span class="titleNameRight">{{contactPersonPhone}}</span>-->
<!--      </div>-->
<!--      <div class="titleFullLine" v-for="(item,index) in content" :key="index">-->
<!--        <span class="titleName borderRight" v-if="type=='1'">{{item.detailname}}</span>-->
<!--        <input class="titleName borderRight" v-else ref="input" @blur="inputBlur(item,index)" :placeholder="placeholder" v-model="item.detailname">-->
<!--        &lt;!&ndash;          <span style="cursor: pointer;"></span>&ndash;&gt;-->
<!--        &lt;!&ndash;          <yhm-form-td-textbox width="880" id="detailname" :list="content" listid="content" :value="item" rule="R0000"></yhm-form-td-textbox>&ndash;&gt;-->
<!--        <yhm-form-td-upload-image v-if="item.filepath==''" width="130" class="titleNameRight" style="justify-content: left;" tag="fixOrderUnitConcat" accept=" " @mouseover="invoiceImg(item)" @mouseout="invoiceImgHide(item)" :list="content" listid="content" :value="item" id="filepath" rule="#"></yhm-form-td-upload-image>-->
<!--        <span v-else-if="!/\.(gif|jpg|jpeg|png|GIF|JPG|PNG|svg)$/.test(item.filepath)" class="titleNameRight" @click="skip(item)" style="color: #49a9ea;padding-left: 6px;cursor: pointer;font-size: 16px;">点击查看文件</span>-->
<!--        <yhm-form-td-upload-image v-else-if="/\.(gif|jpg|jpeg|png|GIF|JPG|PNG|svg)$/.test(item.filepath)" width="130" class="titleNameRight" style="justify-content: left;" tag="fixOrderUnitConcat" accept=" " @mouseover="invoiceImg(item)" @mouseout="invoiceImgHide(item)" :list="content" listid="content" :value="item" id="filepath" rule="#"></yhm-form-td-upload-image>-->
<!--        <div v-if="item.detailname!=''&&item.filepath!=''" style="margin-left: -32px;padding-right: 16px;font-size: 20px;color: #00bb6b;user-select:none;">✔</div>-->
<!--        <div v-else style="margin-left: -37px;padding-right: 14px;font-size: 32px;color: #f00;user-select:none;">⨯</div>-->
<!--        &lt;!&ndash;          <span class="btnAdd iconAdd" @click="add()" v-if="content.length==index+1"></span>&ndash;&gt;-->
<!--        <span class="icon-delete2 iconDelete" v-if="type=='2'" @click="delFromList(index)" title="删除保险公司条约"></span>-->

<!--      </div>-->

<!--    </div>-->
    <div class="table" style="margin-bottom: 10px;background-color: #f7fcff;">
        <span style="border-right: 1px solid #ccc;height: 40px;text-align: center;line-height: 40px;color: #49a9ea;transition: 0.5s all;"
              :style="{width:active=='0'?'116px':'190px'}"
        >保险公司</span>
      <span style="font-size: 16px;flex: 1;height: 40px;line-height: 40px;text-indent: 10px;" class="titleNameRight" :style="{color:unitname==''?'#757575':'#333'}">{{unitname==''?'点击选择保险公司':unitname}}</span>
    </div>
    <div class="table" v-show="active=='0'&&unitType=='1'" >
      <div class="tableLeftTitle">
        个人车主资料要求
      </div>
<!--      {{content}}-->
      <div class="tableRight">
        <div class="tableContent" v-for="(item,index) in content" :key="index">
          <div class="tableMain">

            <textarea v-model="item.claimname" :readonly="type=='2'?'readonly':''" class="textareaFontWeight" style="width: 100%;height: 100%;font-weight: bold;padding: 20px 0 20px 10px; box-sizing: border-box;" placeholder="请输入资料名称"></textarea>
          </div>
          <div class="tableMain2">
            <textarea v-model="item.claimStr" :readonly="type=='2'?'readonly':''" class="tableMainTextarea textareaFontWeight" style="width: 100%;height: 100%;box-sizing: border-box;" placeholder="请输入资料要求"></textarea>
          </div>
          <div class="tableMain3">
            <yhm-form-td-upload-image width="130" class="titleNameRight" style="justify-content: left;" tag="fixOrderUnitConcat" accept=" " @mouseover="invoiceImg(item)" @mouseout="invoiceImgHide(item)" :list="content" listid="content" :value="item" id="filepath" rule="#"></yhm-form-td-upload-image>
            <span style="color: #49a9ea;font-weight: bold;cursor: pointer;" v-show="item.detailpath!=''" @click="skip(item)">查看示例</span>
            <span class="icon-delete2 tableIconDelete" v-show="type!='2'" @click="delFromList(index,'0')"></span>
          </div>
        </div>
        <div class="tableContent addContent" v-show="type!='2'" @click="add('0')" style="font-size: 34px;color: #49a9ea;">
          +
          <div class="addContentMessage">添加资料</div>
        </div>
      </div>
    </div>
    <div class="table" v-show="active=='0'&&unitType=='0'" style="margin-top: 20px;">
      <div class="tableLeftTitle">
        单位车主资料要求
      </div>
      <div class="tableRight">
        <div class="tableContent" v-for="(item,index) in content1" :key="index">
          <div class="tableMain">
            <textarea v-model="item.claimname" :readonly="type=='2'?'readonly':''" class="textareaFontWeight" style="width: 100%;height: 100%;font-weight: bold;padding: 20px 0 20px 10px; box-sizing: border-box;" placeholder="请输入资料名称"></textarea>
          </div>
          <div class="tableMain2">
            <textarea v-model="item.claimStr" :readonly="type=='2'?'readonly':''" class="tableMainTextarea textareaFontWeight" style="width: 100%;height: 100%;box-sizing: border-box;" placeholder="请输入资料要求"></textarea>
          </div>
          <div class="tableMain3">
            <yhm-form-td-upload-image width="130" class="titleNameRight" style="justify-content: left;" tag="fixOrderUnitConcat" accept=" " @mouseover="invoiceImg(item)" @mouseout="invoiceImgHide(item)" :list="content1" listid="content1" :value="item" id="filepath" rule="#"></yhm-form-td-upload-image>
            <span style="color: #49a9ea;font-weight: bold;cursor: pointer;" v-show="item.detailpath!=''" @click="skip(item)">查看示例</span>
            <span class="icon-delete2 tableIconDelete" v-show="type!='2'" @click="delFromList(index,'1')"></span>
          </div>
        </div>
        <div class="tableContent addContent" v-show="type!='2'" @click="add('1')" style="font-size: 34px;color: #49a9ea;">
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
        <div class="table" v-show="content2.length!='0'" style="margin-left: 0;width: 100%;border-left: none;">
          <div class="tableLeftTitle" style="border-left: none;">
            个人车主资料要求
          </div>
          <div class="tableRight">
            <div class="tableContent" v-for="(item,index) in content2" :key="index">
              <div class="tableMain">
                <textarea v-model="item.claimname" :readonly="type=='2'?'readonly':''" ref="textarea" class="textareaFontWeight" style="width: 100%;height: 100%;font-weight: bold;padding: 20px 0 20px 10px; box-sizing: border-box;" placeholder="请输入资料名称"></textarea>
              </div>
              <div class="tableMain2">
                <textarea v-model="item.claimStr" :readonly="type=='2'?'readonly':''" ref="textarea" class="tableMainTextarea textareaFontWeight" style="width: 100%;height: 100%;box-sizing: border-box;" placeholder="请输入资料要求"></textarea>
              </div>
              <div class="tableMain3">
                <yhm-form-td-upload-image width="130" class="titleNameRight" style="justify-content: left;" tag="fixOrderUnitConcat" accept=" " @mouseover="invoiceImg(item)" @mouseout="invoiceImgHide(item)" :list="content2" listid="content2" :value="item" id="filepath" rule="#"></yhm-form-td-upload-image>
                <span style="color: #49a9ea;font-weight: bold;cursor: pointer;" v-show="item.detailpath!=''" @click="skip(item)">查看示例</span>
                <span class="icon-delete2 tableIconDelete" v-show="type!='2'" @click="delFromList(index,'2')"></span>
              </div>
            </div>
            <div class="tableContent addContent" v-show="type!='2'" @click="add('2')" style="font-size: 34px;color: #49a9ea;">
              +
              <div class="addContentMessage">添加资料</div>
            </div>
          </div>
        </div>
        <div class="table" v-show="content3.length!='0'" style="margin-top: 20px;width: 100%;border-left: none;">
          <div class="tableLeftTitle">
            单位车主资料要求
          </div>
          <div class="tableRight">
            <div class="tableContent" v-for="(item,index) in content3" :key="index">
              <div class="tableMain">
                <textarea v-model="item.claimname" :readonly="type=='2'?'readonly':''" class="textareaFontWeight" style="width: 100%;height: 100%;font-weight: bold;padding: 20px 0 20px 10px; box-sizing: border-box;" placeholder="请输入资料名称"></textarea>
              </div>
              <div class="tableMain2">
                <textarea v-model="item.claimStr" :readonly="type=='2'?'readonly':''" class="tableMainTextarea textareaFontWeight" style="width: 100%;height: 100%;box-sizing: border-box;" placeholder="请输入资料要求"></textarea>
              </div>
              <div class="tableMain3">
                <yhm-form-td-upload-image width="130" class="titleNameRight" style="justify-content: left;" tag="fixOrderUnitConcat" accept=" " @mouseover="invoiceImg(item)" @mouseout="invoiceImgHide(item)" :list="content3" listid="content3" :value="item" id="filepath" rule="#"></yhm-form-td-upload-image>
                <span style="color: #49a9ea;font-weight: bold;cursor: pointer;" v-show="item.detailpath!=''" @click="skip(item)">查看示例</span>
                <span class="icon-delete2 tableIconDelete" v-show="type!='2'" @click="delFromList(index,'3')"></span>
              </div>
            </div>
            <div class="tableContent addContent" v-show="type!='2'" @click="add('3',true)" style="font-size: 34px;color: #49a9ea;">
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
        <div class="table" style="margin-left: 0;width: 100%;border-left: none;" v-show="content4.length!='0'">
          <div class="tableLeftTitle" style="border-left: none;">
            个人车主资料要求
          </div>
          <div class="tableRight">
            <div class="tableContent" v-for="(item,index) in content4" :key="index">
              <div class="tableMain">
                <textarea v-model="item.claimname" :readonly="type=='2'?'readonly':''" class="textareaFontWeight" style="width: 100%;height: 100%;font-weight: bold;padding: 20px 0 20px 10px; box-sizing: border-box;" placeholder="请输入资料名称"></textarea>
              </div>
              <div class="tableMain2">
                <textarea v-model="item.claimStr" :readonly="type=='2'?'readonly':''" class="tableMainTextarea textareaFontWeight" style="width: 100%;height: 100%;box-sizing: border-box;" placeholder="请输入资料要求"></textarea>
              </div>
              <div class="tableMain3">
                <yhm-form-td-upload-image width="130" class="titleNameRight" style="justify-content: left;" tag="fixOrderUnitConcat" accept=" " @mouseover="invoiceImg(item)" @mouseout="invoiceImgHide(item)" :list="content4" listid="content4" :value="item" id="filepath" rule="#"></yhm-form-td-upload-image>
                <span style="color: #49a9ea;font-weight: bold;cursor: pointer;" v-show="item.detailpath!=''" @click="skip(item)">查看示例</span>
                <span class="icon-delete2 tableIconDelete" v-show="type!='2'" @click="delFromList(index,'4')"></span>
              </div>
            </div>
            <div class="tableContent addContent" v-show="type!='2'" @click="add('4')" style="font-size: 34px;color: #49a9ea;">
              +
              <div class="addContentMessage">添加资料</div>
            </div>
          </div>
        </div>
        <div class="table" style="margin-top: 20px;width: 100%;border-left: none;" v-show="content5.length!='0'">
          <div class="tableLeftTitle">
            单位车主资料要求
          </div>
          <div class="tableRight">
            <div class="tableContent" v-for="(item,index) in content5" :key="index">
              <div class="tableMain">
                <textarea v-model="item.claimname" :readonly="type=='2'?'readonly':''" class="textareaFontWeight" style="width: 100%;height: 100%;font-weight: bold;padding: 20px 0 20px 10px; box-sizing: border-box;" placeholder="请输入资料名称"></textarea>
              </div>
              <div class="tableMain2">
                <textarea v-model="item.claimStr" :readonly="type=='2'?'readonly':''" class="tableMainTextarea textareaFontWeight" style="width: 100%;height: 100%;box-sizing: border-box;" placeholder="请输入资料要求"></textarea>
              </div>
              <div class="tableMain3">
                <yhm-form-td-upload-image width="130" class="titleNameRight" style="justify-content: left;" tag="fixOrderUnitConcat" accept=" " @mouseover="invoiceImg(item)" @mouseout="invoiceImgHide(item)" :list="content5" listid="content5" :value="item" id="filepath" rule="#"></yhm-form-td-upload-image>
                <span style="color: #49a9ea;font-weight: bold;cursor: pointer;" v-show="item.detailpath!=''" @click="skip(item)">查看示例</span>
                <span class="icon-delete2 tableIconDelete" v-show="type!='2'" @click="delFromList(index,'5')"></span>
              </div>
            </div>
            <div class="tableContent addContent" v-show="type!='2'" @click="add('5')" style="font-size: 34px;color: #49a9ea;">
              +
              <div class="addContentMessage">添加资料</div>
            </div>
          </div>
        </div>
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
        active:'',//
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
        viewImg:'',
        viewImgShow:false,  //显示发票图片
        content:[],//单方事故个人车主
        content1:[],//单方事故单位车主
        content2:[],//双方事故 主车  个人车主
        content3:[],//双方事故 主车  单位车主
        content4:[],//双方事故 三者车  个人车主
        content5:[],//双方事故 三者车  单位车主

      }
    },
    methods:{
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
      inputBlur(item,index){
        if(this.$refs.input[index].value==''){
          this.$refs.input[index].style.border = '2px solid rgba(255,0,0,0.6)'
        }else{
          this.$refs.input[index].style.border = '2px solid #333'
        }
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
      skip(item){
        window.open('/UploadFile/fixOrderUnitConcat/' + item.filepath)
      },
      save(){
        let a = this.validator()
        let manager = []
        let manager2 = []
        const arrNew = this.content.concat(this.content1,this.content2,this.content3,this.content4,this.content5)
        this.content = arrNew
        let item = {}//处理创建保险公司的数据
        let item2 = {}//处理上传保险公司资料的数据
        let arr = []
        // for(let i=0; i<this.$refs.input.length; i++){
        //   if(this.$refs.input[i].value==''){
        //     this.$refs.input[i].style.border = '2px solid rgba(255,0,0,0.6)'
        //     this.placeholder = '不能为空'
        //     arr.push('1')
        //   }else{
        //     arr.push('0')
        //   }
        // }
        // claimname:'',//资料名称
        //   claimStr:'',//资料要求
        //   unitstate:'0',//个人要求和单位车要求区别，0，个人车，1单位车
        //   oddstate:this.active,//单双事故区别字段： 0，单方事故，1，双方事故
        //   mainstate:'1'//区分主车和三者车，0，主车，1，三者车

        for(let i in this.content){
          item = {}
          item2 = {}

          item.id = guid()
          item.ownerID = this.unitEntity
          item.detailname = this.content[i].claimname
          item.claimStr = this.content[i].claimStr
          item.unitstate = this.content[i].unitstate
          item.oddstate = this.active
          item.mainstate = this.content[i].mainstate
          manager.push(item)

          item2.id = guid()
          item2.treaty = this.content[i].detailid//条约id
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
            // this.ajaxJson({
            //   url: '/fix/fixOrderUnit/saveFixOrderUnitEntity',
            //   data:params,
            //   call: (data) => {
            //     if(data.type=='0'){
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
                // }else{
                //   this.$dialog.alert({
                //     width:'350',
                //     alertImg: 'error',
                //     tipValue:data.message,
                //     closeCallBack: () => {
                //     }
                //   })
                // }
              // }
            // })
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
            this.content = data.content
            this.content1 = data.content1
            this.content2 = data.content2
            this.content3 = data.content3
            this.content4 = data.content4
            this.content5 = data.content5
            this.unitType = data.unitType//0单位 1个人
            this.active = data.miantype
            // const arrNew = this.content.concat(this.content1,this.content2,this.content3,this.content4,this.content5)
            // this.content = arrNew
            if(this.type!='2'){
              this.code = data.code//编号
              this.vehicle = data.vehicle//车牌号
              this.client = data.client//接待人
              this.contactPerson = data.contactPerson//送修人
              this.contactPersonPhone = data.contactPersonPhone//送修人手机
            }
            // if(data.manager!=null){
            //   if(data.fixOrderUnitConcatList.length!=0){
            //     this.content = data.fixOrderUnitConcatList
            //   }else{
            //     this.content = data.manager
            //   }
            //   for(let i in this.content){
            //     this.content[i].noEdit = '1'
            //   }
            //   console.log(this.content)
            // }
  ////////////////////////////////////////////////////////////////////
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
