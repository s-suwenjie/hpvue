<template>
  <div class="f_main f_main_customize">
    <yhm-formbody>
      <template #title>添加信息</template>
      <template #control>
        <yhm-form-text placeholder=""  title="单据类型" subtitle="" :no-edit="'1'" value="库存盘点" id=""  ></yhm-form-text>
        <yhm-form-text  placeholder=""  title="单据编号" subtitle="" :no-edit="'1'" value="自动生成无需填写" id="code"  ></yhm-form-text>
        <!--<yhm-form-text v-else placeholder=""  title="单据编号" subtitle="" :no-edit="'1'" :value="code" id="code"  ></yhm-form-text>-->
        <yhm-form-select  title="盘点仓库"  tip="value" aria-autocomplete="both" @click="warehouseEvent" :value="warehouse" id="warehouse" rule="R0000"></yhm-form-select>
        <yhm-form-date title="盘点日期" :no-edit="true" :value="dateTime" id="dateTime " position="t" rule="R0000"></yhm-form-date>
        <yhm-form-select  title="经手人"  tip="value" aria-autocomplete="both" @click="principalEvent" :value="inventoryPersonName" id="inventoryPersonName" rule="R0000"></yhm-form-select>
        <yhm-form-textarea  placeholder=""  title="备注" subtitle=""  :value="remark" id="remark" ></yhm-form-textarea>

      </template>
    </yhm-formbody>
    <div class="f_split"></div>
    <!--    <div style="position: absolute;left: 50%;top: 340px;z-index: 99;transform: translateX(-50%);">提示提示提示提示提示提示提示提示提示提示</div>-->
    <yhm-form-list-edit>
      <template #title>盘点明细
        <!--autocomplete="new-password"-->
        <input type="text" autocomplete="off" class="btnLess" ref="test" @keyup="keyupEnter($event)"  v-model="test" id="coding" placeholder="点击这里开始扫描"/>
      </template>
      <template #operate>
        <!--<yhm-commonbutton  value="扫码枪扫描添加" icon="btnAdd" @call="addScanning"></yhm-commonbutton>-->
        <!--<yhm-commonbutton  value="添加" icon="btnAdd" @call="addProduct"></yhm-commonbutton>-->
      </template>
      <template #listHead>
        <yhm-managerth style="width:36px" title="序号"></yhm-managerth>
        <!--<yhm-managerth style="width: 140px" title="商品名称"></yhm-managerth>-->
        <yhm-managerth style="width:180px" title="规格型号"></yhm-managerth>
        <!--<yhm-managerth style="width: 50px" title="单位"></yhm-managerth>-->
        <!--<yhm-managerth style="width: 60px" title="库存数量"></yhm-managerth>-->
        <yhm-managerth style="width:80px" title="盘点数量"></yhm-managerth>
        <!--<yhm-managerth style="width: 90px" title="盈亏数量"></yhm-managerth>-->
        <yhm-managerth  title="备注"></yhm-managerth>

        <yhm-managerth style="width:40px" title="删除"></yhm-managerth>
      </template>
      <template #listBody>
        <tr v-for="(item,index) in productDetails" :key="index" :class="{InterlacBg:index%2!==0}">
          <div style="display: flex;justify-content: center;text-align: center">{{Number(index)+1}}</div>
          <!--          <yhm-form-td-textbox width="36"  no-edit="1" id="num" :list="productDetails" listid="productDetails" :value="item"></yhm-form-td-textbox>-->
          <!--<yhm-manager-td :value="item.product"></yhm-manager-td>-->
          <yhm-manager-td :value="item.model"></yhm-manager-td>
          <!--<yhm-manager-td :value="item.uuStr"></yhm-manager-td>-->
          <!--<yhm-manager-td :value="item.quantity"></yhm-manager-td>-->
          <!--<yhm-form-td-textbox width="65" min-number="0" :max-number="item.quantity" @input="profitLossInput(item)" id="physicalInventory" :list="productDetails" listid="productDetails" :value="item"></yhm-form-td-textbox>-->
          <yhm-manager-td :value="item.physicalInventory+''"></yhm-manager-td>
          <!--<yhm-form-td-textbox width="65" min-number="0" @input="profitLossInput(item)" id="physicalInventory" :list="productDetails" listid="productDetails" :value="item"></yhm-form-td-textbox>-->
          <!--<yhm-manager-td :value="Number(item.quantity)-Number(item.physicalInventory)"></yhm-manager-td>-->
          <yhm-form-td-textbox width="600"  id="remark" :list="productDetails" listid="productDetails" :value="item"></yhm-form-td-textbox>
          <yhm-form-td-delete  :list="productDetails" :value="item" :del-click="false" @click="delFromList(index,item.id)"></yhm-form-td-delete>
        </tr>
      </template>
      <template #empty>
        <span class="m_listNoData" v-show="productDetails.length=='0'?true:false">暂无数据</span>
      </template>
    </yhm-form-list-edit>
    <yhm-formoperate :createName="createName" :insertDate="insertDate" :updateName="updateName" :updateDate="updateDate">
      <template #btn>
        <yhm-commonbutton value="暂存" icon="btnSave" @call="save()"></yhm-commonbutton>
        <yhm-commonbutton value="保存并提交" icon="btnSave" :flicker="true" @call="submit()"></yhm-commonbutton>
      </template>
    </yhm-formoperate>
    <div class="copyTip" v-if="isCopyTip">{{txt}} 添加成功</div>
  </div>
</template>

<script>
  import { accMul, accAdd, guid, formatDate,formatTime } from '@/assets/common.js'
  import { formmixin } from '@/assets/form.js'
  export default {
    name: 'stockInventoryFrom',
    mixins: [formmixin],
    data(){
      return {
        id:'',
        dateTime:formatDate(new Date()),//盘点日期
        code:'',//编号
        warehouse:'',
        warehouseID:'',//库位
        inventoryPersonName:'',
        inventoryPersonID:'',//盘点人
        productDetails:[],
        remark:'',
        test:'',
        txt:'',
        time:'',//定时器编号
        isCopyTip:false
      }
    },
    methods: {
      keyupEnter(item){

        if (this.test!=''){
          if(item.keyCode=='13'||item.code=='Enter'){
          clearTimeout(this.time)//再次点击时关闭上次触发的定时器 防止多次执行
          this.isCopyTip = true
          this.txt = this.test
          this.$refs.test.focus()
          if(this.productDetails.length==0){
            this.productDetails.push({
              id:guid(),
              ownerID:this.id,
              model:this.test,
              physicalInventory:'1'
            })
            this.test = ''
          }else{
            let arr = []
            for(let j in this.productDetails){
              arr.push(this.productDetails[j].model)
            }
            if(arr.indexOf(this.test)!=-1){
              for (let i in this.productDetails) {
                if (this.productDetails[i].model==this.test) {
                  this.productDetails[i].physicalInventory++
                  this.test = ''
                  return
                }
              }
            }else{
              this.productDetails.push({
                id:guid(),
                ownerID:this.id,
                model:this.test,
                physicalInventory:'1'
              })
              this.test = ''
            }

          }
          this.time = window.setTimeout(()=>{//将定时器的id存入变量
            this.isCopyTip =  false
          },2000)
        }
        }
      },
      profitLossInput(item){
        let containSpecial = RegExp(/[(\ )(\~)(\~)(\!)(\！)(\@)(\#)(\$)(\￥)(\%)(\^)(\……)(\&)(\*)(\()(\（)(\))(\）)(\-)(\_))(\——)(\+)(\=)(\[)(\【)(\])(\】)(\{)(\})(\|))(\、))(\)(\\)(\;)(\；)(\:)(\：)(\')(\‘)(\’)(\")(\“)(\”)(\,)(\，)(\.)(\。)(\/)(\《)(\<)(\>)(\》)(\?)(\？)(\)]+/);
        if(Number(item.physicalInventory)<0){//输入为负数时变为0
          item.physicalInventory = '0'
        }else if(containSpecial.test(item.physicalInventory)){//输入特殊符号时变为0
          item.physicalInventory = '0'
        }else{
          item.profitLoss =  (Number(item.quantity)-Number(item.physicalInventory))+''
        }
      },
      delFromList(index,id){
        this.$dialog.alert({
          tipValue: '删除成功！！！',
          closeCallBack: ()=>{
            this.productDetails.splice(index, 1)
          }
        })
      },
      addProduct(){
        if(this.warehouseID!=''){
          this.$dialog.OpenWindow({
            width: 950,
            height: 692,
            url: '/selectStock?postid='+this.warehouseID,
            title: '选择商品',
            closeCallBack: (data) => {
              if (data) {
                for(let i in this.productDetails){
                  if(this.productDetails[i].aID==data.id){
                    this.$dialog.alert({
                      tipValue:'当前数据已存在',
                      alertImg:'warn',
                      width:'300'
                    })
                    return
                  }
                }
                this.productDetails.push({
                  id:guid(),
                  aID:data.id,
                  ownerID:this.id,
                  otherID:data.productID,
                  product:data.product,
                  model:data.model,
                  quantity:data.quantity,
                  physicalInventory:'0',//库存数量
                  uuStr:data.uuStr,
                  profitLoss:'0',//
                  remark:''
                })

              }
            }
          })
        }else{
          this.$dialog.alert({
            tipValue:'当前数据已存在',
            alertImg:'warn',
            width:'300'
          })
        }
      },
      //选择负责人
      principalEvent () {
        this.$dialog.OpenWindow({
          width: 950,
          height: 692,
          url: '/selectPerson?category=0&categoryBefore=1',
          title: '选择盘点人',
          closeCallBack: (data) => {
            if (data) {
              this.inventoryPersonID=data.id
              this.inventoryPersonName = data.name
            }
          }
        })
      },
      warehouseEvent(){
        this.$dialog.OpenWindow({
          width: 950,
          height: 692,
          url: '/selectLocation',
          title: '选择库位',
          closeCallBack: (data) => {
            if (data) {
                this.warehouse=data.name,
                this.warehouseID=data.id

            }
          }
        })
      },
      submit(){
        if (this.validator()) {
          let params={
            id:this.id,
            dateTime:this.dateTime,
            code:this.code,
            warehouseID:this.warehouseID,
            inventoryPersonID:this.inventoryPersonID,
            remark:this.remark,
            productDetails:this.productDetails

          }
          this.ajaxJson({
            url: '/stock/stockInventory/save',
            data: params,
            call: (data) => {
              if (data.type === 0) {
                let param={
                  id:this.id,
                  ownerID:this.warehouseID
                }
                this.ajaxJson({
                  url: '/stock/stockInventory/submit',
                  data: param,
                  call: (data) => {
                    if (data.type == '0') {
                      this.$dialog.setReturnValue(this.id)
                      this.$dialog.alert({
                        tipValue: data.message,
                        closeCallBack: () => {
                          this.$dialog.close()
                        }
                      })
                    } else {
                      this.$dialog.alert({
                        alertImg: 'error',
                        tipValue: data.message,
                        closeCallBack: () => {
                        }
                      })
                    }
                  }
                })

              } else {
                this.$dialog.alert({
                  alertImg: 'warn',
                  tipValue: data.message
                })
              }
            }
          })
        }
      },
      save(){
        if (this.validator()) {
          let params={
            id:this.id,
            dateTime:this.dateTime,
            code:this.code,
            warehouseID:this.warehouseID,
            inventoryPersonID:this.inventoryPersonID,
            remark:this.remark,
            productDetails:this.productDetails

          }
          this.ajaxJson({
            url: '/stock/stockInventory/save',
            data: params,
            call: (data) => {
              if (data.type === 0) {
                this.$dialog.setReturnValue(this.id)
                this.$dialog.alert({
                  tipValue: data.message,
                  closeCallBack: () => {
                    this.$dialog.close()
                  }
                })
              } else {
                this.$dialog.alert({
                  alertImg: 'warn',
                  tipValue: data.message
                })
              }
            }
          })
        }
      },
    },

    created () {



      this.init({
        url: '/stock/stockInventory/initForm',
        all: (data) => {

        },
        add: (data) => {
          /* 需要添加的数据 */
          /* 获取session的登录用户和登陆用户ID */
          this.inventoryPersonName = sessionStorage.getItem('____currentUser')
          this.inventoryPersonID = sessionStorage.getItem('____currentUserID')

        },
        look: (data) => {
          /* 需要查看的数据 */
          this.inventoryPersonID=data.inventoryPersonID
          this.inventoryPersonName=data.inventoryPersonName
          this.dateTime=data.dateTime
          this.warehouseID=data.warehouseID
          this.warehouse=data.warehouse
          this.productDetails=data.productDetails
          this.remark=data.remark
          this.code=data.code
        }
      })
    },
  }
</script>

<style lang="less" scoped>
.btnLess{
  font-size: 16px;
  margin-left: 400px;
  border:1px solid #ccc;
  height: 30px;
  width: 450px;
  border-radius: 10px;
}
/* 复制提示内容 */
/*.copyTip {*/
  /*position: fixed;*/
  /*top: 82px;*/
  /*z-index: 9999;*/
  /*background-color: #fff;*/
  /*color: black;*/
  /*padding: 16px;*/
  /*left: 0;*/
  /*right: 0;*/
  /*margin: auto;*/
  /*width: max-content;*/
  /*border-radius: 4px;*/
  /*font-size: 14px;*/
/*}*/
</style>
