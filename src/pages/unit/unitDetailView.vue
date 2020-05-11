<template>
    <div>
      <div class="main" ref="main_padding">
        <div class="main_left">
          <div class="left_top">
            <div class="main_top">
              <span class="text2">日期</span>
              <span class="test">{{content.cccurDate}}</span>
            </div>
            <div class="main_top left">
              <div class="img">
                <span class="img_test" v-show="!directionShow">支出</span>
                <img src="../../../static/staticImage/unit/disbursement.svg" class="rotateAgainst" width="46px" height="76px" alt="支出"  v-show="!directionShow">
                <span class="img_test" style="color: #49a9ea;" v-show="directionShow">收入</span>
                <img src="../../../static/staticImage/unit/income.svg" class="img_right rotateJust" width="46px" height="76px" alt="收入" v-show="directionShow">

              </div>
            </div>
            <div class="main_top left">
              <div class="text flex">
                <span >当前余额:</span>
                <span >{{currentBalance}}</span>
              </div>
              <div class="text flex"   >
                <span >交易后余额:</span>
                <span class="text_right col">{{balance}}</span>
              </div>
            </div>
          </div>
          <div class="left_center">
            <div class="main_center">
              <div class="title">基本信息<span class="title2 left">{{content.ownerSysName}}</span></div>
              <p class="main_center_test">{{content.selfUnit}}</p>
              <p class="main_center_test">{{content.selfAccountBank}}</p>
              <p class="main_center_test">{{content.selfAccount}}</p>
            </div>
            <div class="main_center left" :class="{'colRed':red,'colBlue':blue}">
              <div class="title">对方信息<span class="title2 left"  :class="{'colRed':red,'colBlue':blue}">{{content.brandName}}</span></div>
              <p class="main_center_test" v-if="otherName.length===0?otherName=' - - - - -':otherName=otherName">{{otherName}}</p>
              <p class="main_center_test">{{content.otherAccountBank}}</p>
              <p class="main_center_test">{{content.otherAccount}}</p>
            </div>

          </div>
          <div class="left_bottom" ref="leftBottomHeight">
            <div class="bottom_left float size" style="margin-top: 15px;">
              <div class="bottom_left_test" >事由：</div>
              <div class="fromTheTop bottom_left_test" ref="fromTheTop" style="margin: 17px 0px 23px 0px;">凭证号：</div>
              <div class="bottom_left_test">备注：</div>
              <div class="bottom_left_test" style="margin-top: 10px;">凭证：</div>
            </div>
            <div  class="bottom_right float" style="margin-top: 15px;">
              <p  class="size flex" style="width: 608px;height: 38px;" v-if="content.subjectType==='0'">
                <span v-if="content.subject.length!==0">{{content.subject }}</span>
                <span v-else>-----</span>
                <span style="margin: 0px 20px 0px 30px;">{{content.useMoney}}</span>
                <span style="text-align: center">{{content.remark}}</span>
              </p>
              <p  class="size flex" v-show="content.subjectType==='1'?true:false" style="width: 608px;height: 38px;" v-for="(item,index) in content.subjectList" :key="index">
                <span>{{item.subject }}</span>
                <span style="margin: 0px 20px 0px 30px;">{{item.useMoney}}</span>
                <span style="text-align: center">{{item.remark}}</span>
              </p>
              <p class="size flex" v-show="reasonsShow">
                <span>-----</span>
                <span style="margin: 0px 20px 0px 30px;">-----</span>
                <span style="text-align: center">-----</span>
              </p>
               <p style="margin: 4px 0px 24px;">
                 <span v-if="content.voucherNo">
                   {{content.voucherNo}}
                 </span>
                 <span v-else>
                   -----
                 </span>
              </p>

              <p style="font-size: 14px;margin-top: 2px;" v-if="content.remark==='' ">-----</p>
              <p style="font-size: 14px;margin-top: 2px;" v-else>{{content.remark}}</p>
              <p style="font-size: 14px;margin-top: 10px;" ref="top">
                <span v-for="(item,index) in content.files" :key="index" class="imgName" @click="imgSkip(item)" v-show="content.storeName!==''">查看凭证</span>
                <span  v-show="content.storeName===''">-----</span>
              </p>
              <br>
            </div>
          </div>
        </div>
      <div class="main_right" ref="mainRightHeight">
        <div class="title">当天交易信息</div>

        <div class="right_rectangle"  :class="{'backgroundChange':backgroundShow}" ref="backgroundColorBlue" v-show="item.direction==='0'" @click="switcher(item,index)" v-for="(item,index) in content.bankDetailMony" :key="index">
          <div class="rectangle_tit black" ref="colorBlue" >{{item.otherName}}</div>
          <div class="iconSwitch i-income" ref="iconColorBlue"  style="color: #49a9ea;"></div>
          <div class="rectangle_money black"  ref="colorBlue2">{{item.money}}</div>
        </div>
        <div class="right_rectangle"  ref="backgroundColorRed"  v-show="item.direction==='1'" @click="switcher(item,index)" v-for="(item,index) in content.bankDetailMony" :key="'info2-'+index">
          <div class="rectangle_tit black" ref="colorRed">{{item.otherName}}</div>
          <div class="iconSwitch i-expenditure"  ref="iconColorRed" style="color: #f00;"></div>
          <div class="rectangle_money black"  ref="colorRed2">{{item.money}}</div>
        </div>
      </div>
      </div>

      <div class="i-left fs48b colorFFF lftSwitchArrow" title="上一条" v-show="isLeftID"  @click="leftStrip">
      </div>
      <div class="i-right fs48b colorFFF rgtSwitchArrow" title="下一条" v-show="isRightID" @click="rightStrip">
      </div>

      <yhm-formoperate :createName="createName" :insertDate="insertDate" :updateName="updateName" :updateDate="updateDate">
      </yhm-formoperate>
    </div>
</template>

<script>
  import { formmixin } from '@/assets/form.js'

  export default {
    name: 'unitDetailView',
    mixins: [formmixin],
    data(){
      return{
        content:[],
        balance:'',//当前余额
        currentBalance:'',//交易后余额
        // bankDetailMony:[],
        storeName:'',
        otherName:'',
        reasonsShow:false,
        direction:'0',
        redShow:false,
        directionShow:false,
        backgroundShow:false,
        red:false,
        blue:false,
        cccurDate:'',

        isLeftID:false,//延长按钮
        leftID:'',//上一条ID
        isRightID:false,//延长按钮
        rightID:'',//下一条ID
      }
    },
    methods:{
      leftStrip(){
        window.location='/unitDetailView?id='+this.leftID+'&information=0'
      },
      rightStrip(){
        window.location='/unitDetailView?id='+this.rightID+'&information=0'
      },
      imgSkip(item){
        let img = '/UploadFile/' + item.tag + '/' + item.storeName
        window.open(img)
      },
      save(){
        this.setQuery2Value('ID')
        this.$dialog.OpenWindow({
          width: '1050',
          height: '750',
          url: '/addUnitForm?id=' + this.ID,
          title: '编辑单位信息',
          closeCallBack: (data)=>{
            this.$dialog.refresh()
          }
        })
      },
      switcher(item,index){
        this.otherName = item.otherName
        this.$nextTick(() => {//点击后先清除其它动画
          for (let i = 0; i<this.$refs.backgroundColorRed.length; i++){
            this.$refs.backgroundColorRed[i].style.backgroundColor = '#fff'
            this.$refs.iconColorRed[i].style.color = '#f00'
            this.$refs.colorRed[i].style.color = 'black'
            this.$refs.colorRed2[i].style.color = 'black'
          }
          for (let i = 0; i<this.$refs.backgroundColorBlue.length; i++){
            this.$refs.backgroundColorBlue[i].style.backgroundColor = '#fff'
            this.$refs.iconColorBlue[i].style.color = '#49a9ea'
            this.$refs.colorBlue[i].style.color = 'black'
            this.$refs.colorBlue2[i].style.color = 'black'
          }
        })
        this.backgroundShow = true
        if(item.direction==='1'){
          this.$nextTick(() => {
            this.directionShow = false
            this.red = true
            this.$refs.backgroundColorRed[index].style.background = '#f96868'
            this.$refs.iconColorRed[index].style.color = '#fff'
            this.$refs.colorRed[index].style.color = '#fff'
            this.$refs.colorRed2[index].style.color = '#fff'
          })
        }else{
          this.$nextTick(() => {
            this.directionShow = true
            this.blue = true
            this.$refs.backgroundColorBlue[index].style.background = '#49a9ea'
            this.$refs.iconColorBlue[index].style.color = '#fff'
            this.$refs.colorBlue[index].style.color = '#fff'
            this.$refs.colorBlue2[index].style.color = '#fff'
          })
        }
      },
      aa(){
        let params={
          id:this.id
        }
        this.ajaxJson({
          url: '/Fin/getBankDetailByID',
          data: params,
          call: (data) => {

          }
        })
      },
      selectedList() {
        let params = {
          id: this.id
        }
        this.ajaxJson({
          url: '/Fin/commonSelectedID',
          data: params,
          call: (data) => {
            if(data.leftID!==""){
              this.leftID=data.leftID
              this.isLeftID=true
            }
            if(data.rightID!==""){
              this.rightID=data.rightID
              this.isRightID=true
            }
          }
        })
      }
    },
    created () {
      this.setQuery2Value('id')
      this.selectedList()
      let params = {
        isPart:'1',
        id:this.id
      }
      this.init({
        url: '/Fin/getBankDetailByID',
        data: params,
        all: (data)=>{
          try {
            this.content = data
            this.balance = data.balance
            this.currentBalance = data.currentBalance
            if(this.content.subjectList.length>1){
              this.$refs.top.style.marginTop = '22px'
            }
            if(this.content.subjectList.length>=7){
              this.$refs.main_padding.style.paddingRight='0'
            }
            if(data.subjectID.length===0&&data.subjectList.length === 0){
              this.reasonsShow = true
            }

            if(data.subjectID.length===0||data.subjectList.length === 0){
              this.reasonsShow = false
            }
          }catch (e) {

          }

          this.$nextTick(() => {
              //将第一个收入的信息添加背景色
              this.$refs.backgroundColorBlue[0].style.background = '#49a9ea'
              this.$refs.iconColorBlue[0].style.color = '#fff'
              this.$refs.colorBlue[0].style.color = '#fff'
              this.$refs.colorBlue2[0].style.color = '#fff'

              //将第一个支出的信息添加背景色
              this.$refs.backgroundColorRed[0].style.background = '#f96868'
              this.$refs.iconColorRed[0].style.color = '#fff'
              this.$refs.colorRed[0].style.color = '#fff'
              this.$refs.colorRed2[0].style.color = '#fff'

              if (this.content.subjectType === '1'){//类型为多事由时添加底部高度
                let a = this.content.subjectList.length*38
                this.$refs.fromTheTop.style.marginTop = a+'px'
                if(this.content.subjectList.length>3){
                  let q = this.content.subjectList.length
                  let r = q-3
                  let w = r*38+225
                  let e = r*38+546
                  this.$refs.leftBottomHeight.style.height = w+'px'
                  this.$refs.mainRightHeight.style.height = e+'px'
                }
              }

              //拿取默认第一个交易信息的公司名称展示到对方信息中
              this.otherName = this.content.bankDetailMony[0].otherName
              //获取第一条交易信息的收支来设置首次默认颜色
              if(this.content.bankDetailMony[0].direction==='0'){
                this.directionShow = true//收入支出图标及字体切换
                this.blue = true//颜色变化
              }else{
                this.directionShow = false
                this.red = true
              }
          })
        },
        add: (data)=>{

        },
        look: (data)=>{

        }
      })
    }
  }
</script>
<!--getBankDetailByID-->
<style scoped>
  .backgroundChange{
    background-color: #FFFFFF ;
  }
  .colRed{color: #f00 !important;}
  .colBlue{color:#49a9ea !important}
  .rotateAgainst{
    transform:rotate(-7deg);
    -ms-transform:rotate(-7deg); 	/* IE 9 */
    -moz-transform:rotate(-7deg); 	/* Firefox */
    -webkit-transform:rotate(-7deg); /* Safari 和 Chrome */
    -o-transform:rotate(-7deg); 	/* Opera */
  }
  .rotateJust{
    transform:rotate(7deg);
    -ms-transform:rotate(7deg); 	/* IE 9 */
    -moz-transform:rotate(7deg); 	/* Firefox */
    -webkit-transform:rotate(7deg); /* Safari 和 Chrome */
    -o-transform:rotate(7deg); 	/* Opera */
  }
  .imgName{
    color: #49a9ea;
    cursor: pointer;
  }
  .imgName:hover{
    text-decoration: underline;
  }
  .iconSwitch{
    color: #fff;
    font-size: 30px;
    position: absolute;
    right: 16px;
    top: 34px;
  }
  .rectangle_money{
    color: #fff;
    font-size: 16px;
    position: absolute;
    right: 49px;
    bottom: 17px;
  }
  .flex{
    display: flex;
    justify-content: space-between;
  }
  .float{
    display: block;
    float: left;
  }
  .size{
    font-size: 14px;
  }
  .main{
    height: auto;
    display: flex;
    justify-content: space-between;
    padding: 16px 25px;
  }
  .main_left{
    width: 719px;
  }
  .left_top{
    display: flex;
    height: auto;
    justify-content: space-between;
  }
  .left_center{
    margin-top: 16px;
    display: flex;
    justify-content: space-around;
  }
  .left_bottom{
    height: 225px;
    margin-top: 16px;
    flex: 1;
    background: #FFFFFF;
    border-radius: 8px;
  }
  .rectangle_tit{
    width: 168px;
    height: 36px;
    font-size: 14px;
    color: #fff;
  }
  .main_center_test{
    font-size: 14px;
    margin:16px 0 20px 16px;
  }
  .main_center{
    width: 350px;
    height: 185px;
    background: #FFFFFF;
    border-radius: 8px;
  }
  .main_right{
    width: 268px;
    height:546px;
    overflow: auto;
    border-radius: 8px;
    background: #FFFFFF;
  }
  .right_rectangle{
    cursor: pointer;
    padding: 15px 0 0 8px;
    box-sizing: border-box;
    margin: 24px auto 32px auto;
    position: relative;
    width: 238px;
    height: 97px;
    /*border: 1px solid #bfbfbf;*/
    border-radius: 8px;
  }
  .bottom_left{
    width: 59px;
    text-align: right;
    margin-right: 8px;
  }
  .bottom_left_test{
    height: 19px;
    line-height: 19px
  }
  .red{
    background: #f96767;

  }
  .blue{
    cursor: pointer;
    background: #49a9ea;
    margin: 32px auto 31px auto;
  }
  .black{
    color: black;
  }
  .img{
    width: 73px;
    height: 76px;
    position: relative;
    margin: 16px 0 0 10px;
    background: url("../../../static/staticImage/unit/money.svg") no-repeat;
    background-size: 73px 76px;
  }
  .img .img_right{
    position: absolute;
    right: 0;
  }
  .img_test{
    color: #f00;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
  }
  .title{
    height: 50px;
    line-height: 50px;
    font-size: 18px;
    font-weight: 550;
    padding-left: 16px;
    border-bottom: 1px solid #bfbfbf;
  }
  .title2{
    font-size: 14px;
    color: #333;
  }
  .bottom_right{
    width: 640px;
  }
  .left{margin-left: 16px;}
  .text{
    width: auto;
    padding: 24px 8px 0px 8px;
    font-size: 14px;
  }
  .col{color: #333;font-weight: 600;}
  .text2{
    display: block;
    margin: 28px 0px 25px 11px;
    color: #333;
  }
  .test{
    font-size: 18px;
    margin-left: 12px;
  }
  .main_top{
    width: 229px;
    height: 104px;
    background-color: #ffffff;
    border-radius: 8px;
  }



</style>
