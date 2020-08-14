<template>
<div style="background-color: #f3f3f3;">
  <div class="container">
    <div class="basicInfo">
      <div class="basicTit">基本信息</div>
      <div class="basicCon">
        <div class="top">
          <p class="basicConLft">申请人：</p><p class="basicConRgt">某某某</p>
        </div>
        <div>
          <p class="basicConLft">申请日期：</p><p class="basicConRgt">2019-02-05 周四</p>
        </div>
        <div>
          <p class="basicConLft">采购分类：</p><p class="basicConRgt">办公使用</p>
        </div>
        <div>
          <p class="basicConLft">到货日期：</p><p class="basicConRgt">2019-02-05 周四</p>
        </div>
        <div>
          <p class="basicConLft">采购类型：</p><p class="basicConRgt">固定资产</p>
        </div>
        <div>
          <p class="basicConLft">金额：</p><p class="basicConRgt red">1542.00</p>
        </div>
        <div>
          <p class="basicConLft">编号：</p><p class="basicConRgt">XXXXXXXXXXXX</p>
        </div>
      </div>
    </div>
    <div class="shopList">
      <div class="shopTit">商品列表</div>
      <div class="shopCon2">
        <div class="shopCon">
          <div class="conTit">列表1</div>
          <div class="shopConList">
            <div>
              <p class="basicConLft">商品名称：</p><p class="basicConRgt">5161615</p>
            </div>
            <div>
              <p class="basicConLft">型号：</p><p class="basicConRgt">下线</p>
            </div>
            <div>
              <p class="basicConLft">数量：</p><p class="basicConRgt">办公使用</p>
            </div>
            <div>
              <p class="basicConLft">单位：</p><p class="basicConRgt">2019-02-05 周四</p>
            </div>
            <div>
              <p class="basicConLft">参考单价：</p><p class="basicConRgt">固定资产</p>
            </div>
            <div>
              <p class="basicConLft">参考总额：</p><p class="basicConRgt">1542.00</p>
            </div>
            <div>
              <p class="basicConLft">建议：</p><p class="basicConRgt">XXXXXXXXXXXX</p>
            </div>
          </div>
        </div>
      </div>
      <div class="shopCon2">
        <div class="shopCon">
          <div class="conTit">列表1</div>
          <div class="shopConList">
            <div>
              <p class="basicConLft">商品名称：</p><p class="basicConRgt">5161615</p>
            </div>
            <div>
              <p class="basicConLft">型号：</p><p class="basicConRgt">下线</p>
            </div>
            <div>
              <p class="basicConLft">数量：</p><p class="basicConRgt">办公使用</p>
            </div>
            <div>
              <p class="basicConLft">单位：</p><p class="basicConRgt">2019-02-05 周四</p>
            </div>
            <div>
              <p class="basicConLft">参考单价：</p><p class="basicConRgt">固定资产</p>
            </div>
            <div>
              <p class="basicConLft">参考总额：</p><p class="basicConRgt">1542.00</p>
            </div>
            <div>
              <p class="basicConLft">建议：</p><p class="basicConRgt">XXXXXXXXXXXX</p>
            </div>
          </div>
        </div>
      </div>

    </div>
  </div>
  </div>
</template>

<script>
  export default {
    name: 'reimbursement',

  }
</script>

<style scoped lang="less">
@rem: 375/10rem;
body,html{
  background-color: #f3f3f3 !important;
}
.container{
  margin: 0;
  padding-top: 8/@rem;
}
  .basicInfo{
    margin-bottom: 16/@rem !important;
  }
  .basicInfo{
    margin: 0 16/@rem;
    background-color: #fff;
    border-radius: 8/@rem;
    border: 1/@rem solid #bfbfbf;
    .basicTit{
      font-size: 17/@rem;
      line-height: 48/@rem;
      border-bottom: 1px solid #bfbfbf;
      padding: 0 16/@rem;
    }
  }
.red{
  color: #f00;
}
  .basicCon{
    background-color: #fff;
    .top{
      margin-top: 16/@rem;
    }
    div{
      padding: 0 16/@rem;
      line-height: 14/@rem;
      p{
        font-size: 14/@rem;
        display: inline-block;
        line-height: 14/@rem;
        margin-bottom: 15/@rem;
      }
      .basicConLft{
        width: 60/@rem;
        color: #888;
        white-space: nowrap;
      }
      .basicConRgt{
        color: #333;
        margin-left: 36/@rem;
      }
    }
  }

.shopList{
  margin: 0 16/@rem;
  background-color: #fff;
  border-radius: 8/@rem;
  border: 1/@rem solid #bfbfbf;
  .shopTit{
    font-size: 17/@rem;
    line-height: 48/@rem;
    padding: 0 16/@rem;
  }
}


  .shopList{
    padding-bottom: 15/@rem;
    .shopCon2{
      border-top: 1/@rem solid #bfbfbf;
    }
    .shopCon{
      margin: 0 23/@rem 8/@rem;
      border-radius: 0 0 16/@rem 16/@rem;
      border: 2px dashed #bfbfbf;
      border-top: none;
      background-color: #fff;
      .conTit{
        padding: 0 9/@rem;
        line-height: 29/@rem;
        background-color: #d4ecfc;
        border-radius: 0 0 4/@rem 4/@rem;
        font-size:14/@rem;
      }
      .shopConList{
        padding: 0 8/@rem;
        div{
          padding: 0 16/@rem;
          line-height: 14/@rem;
          p{
            font-size: 14/@rem;
            display: inline-block;
            line-height: 14/@rem;
            margin-bottom: 15/@rem;
          }
          .basicConLft{
            width: 60/@rem;
            color: #888;
            white-space: nowrap;
          }
          .basicConRgt{
            color: #333;
            margin-left: 36/@rem;
          }
        }
      }
    }
  }
</style>
