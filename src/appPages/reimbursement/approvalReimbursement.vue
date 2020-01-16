<template>
  <div>
    <div class="basic">
      <div class="basicTit">
        基本信息
      </div>
      <div class="basicCon">
        <div>
          <p class="conLft">申请人：</p>
          <p class="conRgt">{{name}}</p>
        </div>
        <div>
          <p class="conLft">申请日期：</p>
          <p class="conRgt">{{workDate}}</p>
        </div>
        <div>
          <p class="conLft">报销编号：</p>
          <p class="conRgt">{{code}}</p>
        </div>
      </div>
    </div>
    <div class="reim" v-for="(item,index) in list" :key="index">
      <div class="reimTit" @click="toggle(index)">
        <p class="titTxt">报销明细</p>
        <p class="titNum">{{index+1}}/{{list.length}}</p>
      </div>
      <div class="reimCon">
        <div class="reimConTxt">
          <div>
            <p class="conLft">发生日期：</p>
            <p class="conRgt">{{workDate}}</p>
          </div>
          <div>
            <p class="conLft">事由：</p>
            <p class="conRgt">{{item.subject}}</p>
          </div>
          <div>
            <p class="conLft">实际金额：</p>
            <p class="conRgt">{{item.actualMoney}}</p>
          </div>
          <div>
            <p class="conLft">发票金额：</p>
            <p class="conRgt">{{item.invoiceMoney}}</p>
          </div>
          <div>
            <p class="conLft">发票类型：</p>
            <p class="conRgt">{{item.invoiceCategory}}</p>
          </div>
          <div>
            <p class="conLft">部分分配：</p>
            <p class="conRgt">{{item.details}}</p>
          </div>
          <div>
            <p class="conLft">费用开始日期：</p>
            <p class="conRgt">{{item.startDate}}</p>
          </div>
          <div>
            <p class="conLft">费用结束日期：</p>
            <p class="conRgt">{{item.endDate}}</p>
          </div>
          <div>
            <p class="conLft">备注：</p>
            <p class="conRgt">{{item.remark}}</p>
          </div>
        </div>
        <div class="reimDetail">
          <div class="reimDetailTit">发票明细</div>
          <div class="detailList">
            <div class="listPage">
              <div class="listTit">
                明细1
              </div>
              <div class="listPageCon">
                <div>
                  <p class="conLft">发生日期：</p>
                  <p class="conRgt">{{workDate}}</p>
                </div>
                <div>
                  <p class="conLft">事由：</p>
                  <p class="conRgt">{{item.subject}}</p>
                </div>
                <div>
                  <p class="conLft">实际金额：</p>
                  <p class="conRgt">{{item.actualMoney}}</p>
                </div>
                <div>
                  <p class="conLft">发票金额：</p>
                  <p class="conRgt">{{item.invoiceMoney}}</p>
                </div>
                <div>
                  <p class="conLft">发票类型：</p>
                  <p class="conRgt">{{item.invoiceCategory}}</p>
                </div>
                <div>
                  <p class="conLft">部分分配：</p>
                  <p class="conRgt">{{item.details}}</p>
                </div>
                <div>
                  <p class="conLft">费用开始日期：</p>
                  <p class="conRgt">{{item.startDate}}</p>
                </div>
                <div>
                  <p class="conLft">费用结束日期：</p>
                  <p class="conRgt">{{item.endDate}}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <yhm-app-form-operate>
      <!--<yhm-app-button @call="save" value="保存"></yhm-app-button>-->
      <yhm-app-button @call="save(0)" category="two" value="通过"></yhm-app-button>
      <yhm-app-button @call="save(1)" category="ten" value="驳回"></yhm-app-button>
    </yhm-app-form-operate>
  </div>
</template>
<script>
  import { accMul, accAdd, guid, formatDate,formatTime } from '@/assets/common.js'
  export default {
    name: 'approvalReimbursement',
    data(){
      return{
        name:'程序员',
        workDate:'2019-12-13',
        code:'CXY191213399189',
        list:[
          {
            subject:'鉴定费',
            actualMoney:'888',
            invoiceMoney:'999',
            invoiceCategory:'机打发票',
            details:'经营管理部 --- 7,8965.00',
            startDate:'2019-12-06 周五',
            endDate:'2019-12-06 周五',
            remark:'备注备注备注'
          },
          {
            subject:'洗车费',
            actualMoney:'868',
            invoiceMoney:'666',
            invoiceCategory:'机打发票',
            details:'财务部部 --- 168.00',
            startDate:'2019-12-06 周五',
            endDate:'2019-12-06 周五',
            remark:'备备注'
          }
        ],

      }
    },
    methods:{
      toggle(index){
        $(".reimCon").eq(index).toggle(300,);
      },
      save(type){
        if(this.validator()){
        }
        else{
        }
      }
    },
    created () {
      document.querySelector('body').setAttribute('style', 'margin: 0 auto; width: 100%;background:#f3f3f3; overflow-x: hidden;height: 100%;');
    }
  }
</script>

<style scoped lang="less">
  @rem: 375/10rem;
  .basic{
    margin-top: 80/@rem !important;
    margin-bottom: 16/@rem !important;
  }
  .basic,.reim{
    font-size: 18/@rem;
    border-radius: 8px;
    border: solid 1px #bfbfbf;
    margin: 0 16/@rem 0;
    background-color: #fff;
    .basicTit,.reimTit{
      line-height: 48/@rem;
      margin: 0 18/@rem;
      display: flex;
      justify-content: space-between;
      .titTxt{
        font-size: 18/@rem;
        color: #333;
      }
      .titNum{
        font-size: 16/@rem;
        color: #65b933;
      }
    }
    .basicCon>div:first-child{
      margin-top: 20/@rem;
    }
    .basicCon>div {
      margin: 0 18/@rem 16/@rem;
      display: flex;
      p {
        display: inline-block;
        font-size: 14/@rem;
      }
      .conLft {
        width: 88/@rem;
        color: #888;
        white-space: nowrap;
      }
      .conRgt {
        color: #333;
        margin-left: 8/@rem;
      }
    }
  }
  .basicCon,.reimCon{
    border-top: 1px solid #bfbfbf;
    .reimConTxt:first-child{
      margin-top: 16/@rem;
    }
    .reimConTxt>div{
      margin: 0 18/@rem 16/@rem;
      display: flex;
      p{
        display: inline-block;
        font-size: 14/@rem;
      }
      .conLft{
        width: 88/@rem;
        color: #888;
        white-space: nowrap;
      }
      .conRgt{
        width: 210/@rem;
        color: #333;
        margin-left: 8/@rem;
      }
    }
  }
  .reim{
    margin-bottom: 16/@rem;
  }

  .reimDetail{
    margin: 0 16/@rem 16/@rem;
    background-color: #fff;
    border-radius: 8px;
    border: solid 1px #bfbfbf;
    .reimDetailTit{
      line-height: 48/@rem;
      margin: 0 18/@rem;
    }
    .detailList{
      border-top: 1px solid #bfbfbf;
      .listPage{
        border: 1px dashed #bfbfbf;
        border-top: none;
        margin: 0 8/@rem 16/@rem;
        border-radius: 0 0 8px 8px;
        .listTit{
          margin: 0 10/@rem;
          background-color: #d4ecfc;
          border-radius: 0 0 4px 4px;
          line-height: 30/@rem;
          font-size: 14/@rem;
        }
        .listPageCon{
          div:first-child{
            margin-top: 20/@rem;
          }
          div{
            margin: 0 18/@rem 16/@rem;
            display: flex;
            p{
              display: inline-block;
              font-size: 14/@rem;
            }
            .conLft{
              width: 88/@rem;
              color: #888;
              white-space: nowrap;
            }
            .conRgt{
              color: #333;
              margin-left: 8/@rem;
            }
          }
        }
      }
    }
  }
</style>
