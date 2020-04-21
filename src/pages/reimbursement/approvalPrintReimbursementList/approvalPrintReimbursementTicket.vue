<template>
  <div>
<!--    <div @click="aaa">点击</div>-->
    <div class="print_main">
      <div class="print_main_top" v-if="category==0">
        <img src="data:image/jpg;base64,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" alt="">
        <span>费用报销单</span>
        <span style="width: 150px"></span>
      </div>
      <div class="print_main_top" v-if="category==1">
        <div class="print_main_left">
          <span class="print_main_left_span">编号:</span>
          <div class="print_main_left_div">
            <span>CXY200416</span>
            <span>616591</span>
          </div>
        </div>
        <span>费用报销单</span>
        <img src="data:image/jpg;base64,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" alt="">
      </div>
      <div class="print_main_top_border"></div>
      <p class="print_head">
        <span>报销部门: 销售部-程序员</span>
        <span>2020 年 04月 16日</span>
        <span class="print_head_span">附件 共 1 页</span>
      </p>
      <div class="print_main_table">
        <div class="print_main_table2">
          <span class="table_title_span span1">用 途</span>
          <span class="table_title_span span2">金 额 (元)</span>
          <span class="table_title_span span3">费 用 分 配</span>
          <span class="table_title_span span4">备 注</span>
        </div>
        <div class="print_main_table2 print_main_table2_height">
          <span class="table_title_span span1"></span>
          <span class="table_title_span span2"></span>
          <span class="table_title_span span3"></span>
          <span class="table_title_span span4"></span>
        </div>
        <div class="print_main_table2 print_main_table2_height">
          <span class="table_title_span span1"></span>
          <span class="table_title_span span2"></span>
          <span class="table_title_span span3"></span>
          <span class="table_title_span span4"></span>
        </div>
        <div class="print_main_table2 print_main_table2_height">
          <span class="table_title_span span1"></span>
          <span class="table_title_span span2"></span>
          <span class="table_title_span span3"></span>
          <span class="table_title_span span4"></span>
        </div>
        <div class="print_main_table2 print_main_table2_height" >
          <span style="height: 70px !important;" class="table_title_span span1">合 计</span>
          <span style="height: 70px !important;" class="table_title_span span2"></span>
            <div class="print_approver" style="">
              <span>领导审批</span>
            </div>
            <div class="print_approver2">
              <p>
                <span>部门经理: 王佳佳</span>
                <span>财务经理: 杜丽雅</span>
              </p>
              <p>
                <span>总经理: 张健</span>
                <span>董事长: N/A</span>
              </p>
            </div>
        </div>
        <div class="print_main_bottom">
          <span class="main_bottom">金额大写:</span>
          <span class="main_bottom"></span>
          <div class="main_bottom">
            <p class="main_bottom_p">原借款: <span class="main_bottom_border"> 0.00 </span> 元，本次报销: <span class="main_bottom_border"> 170.00 </span> 元</p>
            <p class="main_bottom_p">报销人应领取/退回: <span class="main_bottom_border"> 0.00 </span> 元</p>
          </div>
        </div>
      </div>
      <div class="print_main_bottom2">
        <span></span>
        <div>
          <span style="margin-right: 130px;">领款人</span>
          <span>170.00/170.00</span>
        </div>
      </div>
      <p style="text-align: right">
        <span>1/1页</span>
      </p>
    </div>
  </div>
</template>

<script>
  import { formmixin } from '@/assets/form.js'

  export default {
    name: "approvalPrintReimbursementTicket",
    mixins: [ formmixin ],

    data(){
      return{
        category:'0',//为0时图片在左不显示编号 为1是左边显示编号右边显示图片
        imgUrl:'',//编号一维码
        branch:'销售部-程序员',//部门
        time:'',//日期
        list:[
          {
            purpose:'',//用途
            money:'',//金额
            expenseAllocation:'',//费用分配
            remark:'',//备注
          },
          {
            purpose:'',//用途
            money:'',//金额
            expenseAllocation:'',//费用分配
            remark:'',//备注
          },
        ],
        totalMoney:'',//合计金额
        departmentManagerName:'',//部门经理 姓名
        generalManager:'',//总经理 姓名
        accountingDepartment:'',//财务部 姓名
        chairman:'',//董事长 姓名
        amountInWords:'',//大写金额
        borrowingBalance:'',//借款金额
        reimbursementMoney:'',//报销金额
        money:'',//报销人应领取/退回的金额
        totalAmount:'',//右下角总计金额
        pageCount:'',//总页数
        pageIndex:'',//当前页数
      }
    },
    methods:{
      aaa(){
        this.$dialog.OpenWindow({
          width: '940',
          height: '550',
          title: '打印报销单',
          url: '/approvalPrintReimbursementTicket',
          closeCallBack: (dataTwo)=>{
          }
        })
      }
    },
    created () {
      this.setQuery2Value('category')
    }
  }
</script>

<style lang="less" scoped>
.print_main{
  width: 920px;
  height: 480px;
  margin: 10px auto;
  padding: 0 50px;
  box-sizing: border-box;
  background-color: #fff;
  .print_main_bottom2{
    height: 30px;
    display: flex;
    align-items: center;
    font-size: 14px;
    justify-content: space-between;
  }
  .print_main_top{
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 15px 0;
    .print_main_left{
      width: 150px;
      display: flex;
      justify-content: space-between;
      .print_main_left_span{
        font-size: 15px;
        height: 40px;
        width: 40px;
        margin-right:3px;
        display: inline-block;
        display: flex;
        align-items: center;
      }
      .print_main_left_div{
        font-size: 15px;
        display: flex;
        align-items: center;
        flex-wrap: wrap;
        span{
          font-size: 15px;
        }
      }
    }
    span{
      font-size: 24px;
    }
  }
  .print_main_top_border{
    width: 260px;
    margin: auto;
    border-bottom: 3px dashed #7f7f7f;

  }
  .print_head{
    margin: 10px 0 5px 0;
    display: flex;
    font-size: 14px;
    justify-content: space-between;
    .print_head_span{
      width: 128px;
      text-align: right;
    }
  }
  .print_main_table{

    .print_main_bottom{
      height: 50px;
      display: flex;
      justify-content: center;
      font-size: 15px;
      .main_bottom{
        border:1px solid black;
        .main_bottom_p{
          padding: 5px 5px 0 ;
        }
        .main_bottom_p:nth-child(2){
          padding:0 5px;
        }
        .main_bottom_border{
          width:70px;
          text-align: right;
          display: inline-block;
          border-bottom:1px solid black;
        }
      }
      .main_bottom:nth-child(1){
        width: 80px;
        line-height: 50px;
        text-align: center;
        border-top: 0;
        border-right: 0;
      }
      .main_bottom:nth-child(2){
        width: 190px;
        border-top: 0;
        border-right: 0;
      }
      .main_bottom:nth-child(3){
        border-top: 0;
        flex: 1;
      }
    }
    .print_main_table2_height{
      .table_title_span{
        height: 50px !important;
        border-top: 0 !important;
      }
      .print_approver{
        display: flex;
        align-items: center;
        border: 1px solid black;
        width: 35px;
        padding: 0 10px;
        font-size: 16px;
        border-right: 0;
        border-top: 0
      }
      .print_approver2{
        border: 1px solid black;
        border-top: 0;
        flex: 1;
        font-size: 16px;
        p{
          display: flex;
          justify-content: space-between;
          padding: 10px;
          height: 20px;
        }
        p:nth-child(1){
          padding-bottom: 5px;
        }
        p:nth-child(2){
          padding-top: 5px;
        }

      }
    }
    .print_main_table2{
      display: flex;
      justify-content: center;

      .span1{
        width: 150px;
        border-right: 0 !important;
      }
      .span2{
        width: 120px;
        border-right: 0 !important;
      }
      .span3{
        width: 288px;
        border-right: 0 !important;
      }
      .span4{
        flex: 1;
      }
      .table_title_span{
        font-size: 14px;
        height: 30px;
        display: flex;
        align-items: center;
        text-align: center;
        justify-content: center;
        border: 1px solid black;
      }
    }
  }
}
</style>
