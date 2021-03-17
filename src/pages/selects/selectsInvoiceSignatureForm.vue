<template>
  <div class="f_main mb0">
    <div class="repairPrint">
      <div class="repairPrintItem" v-for="(index) in getCount" :key="index" @click="choicePrintEvent(index)">
        <div class="circle" :class="{'selectChoice': isSelectChoice === index}" :style="{color:isSelectChoice == index?'#fff':''}">{{index}}</div>
        <!--        <div class="circleTitle" :style="{color:isSelectChoice == index?'#49a9ea':''}">描述描述描述</div>-->
      </div>
    </div>
    <div class="regulation" style="text-align: left">
      <div style="width: 100%;border: 1px solid #ccc;margin: auto;"></div>
      <div v-for="(index) in regulationItem" :key="index" style="margin: 6px 0 4px 4px; font-size: 16px">{{index}}.{{titleList[index-1]}}</div>
    </div>
    <yhm-formoperate no-time-tip :createName="createName" :insertDate="insertDate" :updateName="updateName" :updateDate="updateDate">
      <template #btn>
        <yhm-commonbutton value="确定" icon="i-btn-print" :flicker="true" @call="selectPrintEvent" category="one"></yhm-commonbutton>
      </template>
    </yhm-formoperate>

  </div>
</template>

<script>
  import { formmixin } from '@/assets/form.js'
  export default {
    name: 'selectsInvoiceSignatureForm',
    mixins: [formmixin],
    data() {
      return {
        id:'',
        isSelectChoice: 1,
        titleList:['商业险和交强险报价','商业险报价','交强险报价','商业险和交强险报价和车船税','交强险报价和车船税'],
        count: 5,
        regulationItem:5,
        list:[],
        phone1:'',
        phone2:'',
      }
    },
    methods: {
      choicePrintEvent(index){
        this.isSelectChoice = index
      },
      selectPrintEvent(){
        if(this.isSelectChoice==1){
          this.$dialog.OpenWindow({
            width: '1050',
            height: '550',
            url: '/quotationFrom?ownerID=' + this.ownerID,
            title: '发送报价单',
            closeCallBack: (data)=>{
              this.initData()
            }
          })
        }else if (this.isSelectChoice==2){
          this.$dialog.OpenWindow({
            width: '1050',
            height: '550',
            url: '/templateShangYeFrom?ownerID=' + this.ownerID,
            title: '发送报价单',
            closeCallBack: (data)=>{
              this.initData()
            }
          })
        }else if(this.isSelectChoice==3){
          this.$dialog.OpenWindow({
            width: '1050',
            height: '550',
            url: '/templateCheForm?ownerID=' + this.ownerID,
            title: '发送报价单',
            closeCallBack: (data)=>{
              this.initData()
            }
          })
        }else if(this.isSelectChoice==4){
          this.$dialog.OpenWindow({
            width: '1050',
            height: '550',
            url: '/templateFourForm?ownerID=' + this.ownerID,
            title: '发送报价单',
            closeCallBack: (data)=>{
              this.initData()
            }
          })
        }else if(this.isSelectChoice==5){
          this.$dialog.OpenWindow({
            width: '1050',
            height: '550',
            url: '/templateFiveForm?ownerID=' + this.ownerID,
            title: '发送报价单',
            closeCallBack: (data)=>{
              this.initData()
            }
          })
        }
      },
    },
    computed:{
      getCount(){
        return parseInt(this.count)
      }
    },
    created () {
      this.setQuery2Value('ownerID');
      // this.setQuery2Value('plate');
      // this.setQuery2Value('phone1');
      // this.setQuery2Value('phone2');
      this.information();
    }
  }
</script>


<style scoped lang="less">
  .regulation{
    margin: 0 20px;
    text-align: left;
    background-color: #fff;
    /*border-radius: 8px;*/
    padding-bottom: 6px;
  }
  .repairPrint{
    margin: 0 20px;
    display: flex;
    flex-wrap: wrap;
    background-color: #fff;
    border-radius: 8px 8px 0 0 ;
    justify-content: space-around;
    padding-bottom: 16px;
    .circle{
      margin:16px 16px 12px;
      width: 50px;
      height: 50px;
      border-radius: 50%;
      border: 1px solid #bfbfbf;
      display: flex;
      align-items: center;
      user-select: none;
      justify-content: center;
      color: #333;
      cursor: pointer;
    }
    .circleTitle{
      text-align: center;
    }
    .repairPrintItem:hover .circle{
      border: 1px solid #49a9ea;
      color: #49a9ea;
    }
    .repairPrintItem:hover .circleTitle{
      color: #49a9ea;
    }
    .selectChoice{
      background-color: #49a9ea;
      color: #fff;
      border: 1px solid #1e8fdc;
    }
  }
</style>
