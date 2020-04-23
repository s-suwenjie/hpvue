<template>
    <div>
      <div class="apply_main">
        <div class="apply_main_top">
          <div class="apply_main_left">
            <span>编号:</span>
            <img src="data:image/jpg;base64,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" alt="">
          </div>
          <span>付款申请单 Payment Order Form</span>
        </div>
        <div class="apply_main_tab">
          <div class="apply_main_tab_title">
            <span>申请人</span><span>{{name}}</span>
            <span>部门</span><span>{{branch}}</span>
            <span>付款日期</span><span>{{lastDate}}</span>
            <span>付款性质</span><span>{{nature}}</span>
          </div>
          <div class="apply_main_tab_content">
            <span>款项用途:</span>
            <span>{{paymentPurpose}}</span>
          </div>
          <div class="apply_main_tab_content content2">
            <span>付款金额(大写):</span>
            <span class="fontWeight">{{paymentAmount}}</span>
            <span class="fontWeight">￥{{money}}</span>
          </div>
          <div class="content3">
            <div class="content3_left content3_border">
              <p>收款人全称</p>
              <p>收款人银行</p>
              <p>收款人账号</p>
            </div>
            <div class="content3_center content3_border">
              <p class="fontWeight">{{payee}}</p>
              <p class="fontWeight">{{dueBank}}</p>
              <img src="data:image/jpg;base64,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" alt="">
            </div>
            <div class="content3_right content3_border">
              <div class="content3_center_img">
                <img width="70" height="70" src="https://dss1.bdstatic.com/6OF1bjeh1BF3odCf/it/u=829888290,2650878176&fm=74&app=80&f=JPG&size=f121,121?sec=1880279984&t=274501980523d63a7d93c94f85aabbab" alt="">
                <span>收款人全称</span>
              </div>
              <span></span>
            </div>
          </div>
          <div class="content4">
            <span class="content4_left">付款方式</span>
            <div class="content4_right">
              <span>网银转账<i class="icon-checkbox apply_main_icon"></i></span>
              <span>现金<i class="icon-checkbox apply_main_icon"></i></span>
              <span>支票<i class="icon-checkbox apply_main_icon"></i></span>
              <span>其它<i class="icon-checkbox apply_main_icon"></i></span>
            </div>
          </div>
          <div class="content5">
            <span>部门经理</span>
            <span style="flex-direction: column;" class="fontWeight">
              <p>2020-04-08</p>
              <p>18:08:33</p>
              <p>王佳佳 电子审批</p>
            </span>
            <span>财务部</span><span>杜丽雅</span>
            <span>总经理</span><span>张健</span>
            <span>董事长</span><span class="fontWeight">N/A</span>
          </div>
        </div>
        <div class="apply_main_bottom">
          <span>日期: 2020-04-22</span>
          <span>申请人签字:</span>
        </div>
      </div>
    </div>
</template>

<script>
  export default {
    name: 'approvalApplyPrint',
    data(){
      return{
        imgUrl:'',//顶部编号一维码图片
        accountUrl:'',//收款人账号一维码图片
        payeeUrl:'',//收款人全称二维码图片
        name:'程序员',//申请人
        branch:'销售部',//部门
        lastDate:'2020-04-22',//付款日期
        nature:'预付',//付款性质
        paymentPurpose:'',//款项用途
        paymentAmount:'二百贰拾贰元整',//付款金额大写
        money:'212.00',//金额
        payee:'山西三隆昌佳招标代理公司',//收款人
        dueBank:'大同银行股份有限公司鼓楼支行',//收款人银行
        paymentMethod:'',//付款方式
        approvalTime:'',//部门经理  审批时间
        departmentManagerName:'',//部门经理 姓名
        examineAndApprove:'',//部门经理 审批方式
        accountingDepartment:'',//财务部 姓名
        generalManager:'',//总经理 姓名
        chairman:'',//董事长 姓名
      }
    },
    methods:{
    },
  }
</script>

<style lang="less" scoped>
  .fontWeight{
    font-weight: bold;
  }
  .apply_main_icon{
    margin-left: 5px;
  }
.apply_main{
  width: 950px;
  background-color: #fff;
  box-sizing: border-box;
  font-size: 16px;
  padding:20px 50px;
  margin: 15px auto;
  .apply_main_bottom{
    display: flex;
    justify-content: space-between;
    padding: 20px 0;
    span:last-child{
      width: 230px;
    }
  }
  .apply_main_tab{
    margin-top: 15px;
    .apply_main_tab_title{
      display: flex;
      justify-content: space-between;
      span{
        flex: 1;
        height: 35px;
        line-height:35px;
        text-align: center;
        border: 1px solid black;
      }
      span:nth-child(even){
        width: 30px;
        font-weight: bold;
        border-right: 0;
        border-left: 0;
        color: black;
      }
      span:last-child{
        border-right: 1px solid black;
      }
    }
    .apply_main_tab_content{
      display: flex;
      justify-content: space-between;
      height: 35px;
      align-items: center;
      span{
        display: flex;
        justify-content: space-between;
        align-items: center;
        border: 1px solid black;
        border-top: 0;
        height: 35px;
      }
      span:nth-child(1){
        width: 105px;
        justify-content: center;
      }
      span:last-child{
        border-left: 0;
        flex: 1;
      }
    }
    .content2{
      span:nth-child(1){
        width: 142px;
        border-right: 0;
      }
      span:nth-child(2){
        text-indent: 10px;
        width: 516px;
      }
      span:last-child{
        text-indent: 5px;
        flex: 1;
      }
    }
    .content3{
      display: flex;
      justify-content: space-between;
      .content3_border{
        border: 1px solid black;
      }
      .content3_center_img{
        display: flex;
        width: 110px;
        height: 100%;
        justify-content: center;
        align-items: center;
        border-right: 1px solid black;
        flex-direction: column;
        span{
          margin-top: 4px;
          font-size: 12px;
          font-weight: bold;
        }
      }
      .content3_left{
        width: 122px;
        height: 80px;
        flex-direction: column-reverse;
        padding: 10px;
        border-right: 0;
        p{
          margin: 4px 0;
          text-align: center;
        }
      }
      .content3_center{
        width: 406px;
        height: 102px;
        padding:2px 10px;
        box-sizing: border-box;
        border-right: 0;
        p{
          margin: 4px 0;
        }
      }
      .content3_right{
        box-sizing: border-box;
        height: 102px;
        flex: 1;

      }
    }
    .content4{
      display: flex;
      justify-content: space-between;
      height: 37px;
      border: 1px solid black;
      border-top: 0;

      .content4_left{
        width: 142px;
        display: flex;
        justify-content: center;
        align-items: center;
        border-right: 1px solid black;
      }
      .content4_right{
        display: flex;
        justify-content: right;
        padding: 0 10px;
        flex: 1;
        box-sizing: border-box;
        span{
          display: flex;
          align-items: center;
          margin-right: 35px;
        }
      }
    }
    .content5{
      height: 60px;
      border: 1px solid black;
      border-top: 0;
      display: flex;
      span{
        display: inline-flex;
        justify-content: center;
        align-items: center;
        height: 100%;
        border-right: 1px solid black;
      }
      span:nth-child(1),span:nth-child(2){
        width: 142px;
      }
      span:nth-child(3),span:nth-child(5),span:nth-child(7){
        width: 80px;
      }
      span:nth-child(4),span:nth-child(6){
        width: 110px;
      }
      span:last-child{
        flex: 1;
        border-right: 0;
      }
    }
  }
  .apply_main_top{
    display: flex;
    justify-content: space-between;
    align-items: center;

    .apply_main_left{
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
  }
}
</style>
