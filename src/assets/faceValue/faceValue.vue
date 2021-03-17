<template>
  <div class="formradiobuttonWidth">
    <div  class="fc_box">
      <div class="fc_title">
        <div>{{title}}</div>
      </div>
      <div>
        <div style="width: 900px">
          <span style="margin-left: 10px"><img src="/UploadFile/money/100.png" style="border: 1px solid;"></span>
          <span style="margin-left: 10px"><img src="/UploadFile/money/50.png" style="border: 1px solid;"></span>
          <span style="margin-left: 10px"><img src="/UploadFile/money/20.png" style="border: 1px solid;"></span>
          <span style="margin-left: 10px"><img src="/UploadFile/money/10.png" style="border: 1px solid;"></span>
          <span style="margin-left: 10px"><img src="/UploadFile/money/5.png" style="border: 1px solid;"></span>
          <span style="margin-left: 10px"><img src="/UploadFile/money/1.png" style="border: 1px solid;"></span>
          <span class="hide" id="moneySpan05" style="margin-left: 10px"><img src="/UploadFile/money/0.5.png" style="border: 1px solid;"></span>
          <span class="hide" id="moneySpan01" style="margin-left: 10px"><img src="/UploadFile/money/0.1.png" style="border: 1px solid;"></span>
        </div>
        <div style='margin-left: 8px'>
          <span><input type="text" id="money100" v-model="txt_money100" @keyup="cashMoneyChange()" style="border:1px solid #99CFF5;width: 83px;height: 30px;" rule="R1501"></span>
          <span style="margin-left: 8px"><input id="money50" @input="$emit('input', $event.target.value)" v-model="txt_money50" type="text" @keyup="cashMoneyChange()" style="border:1px solid #99CFF5;width: 81px;height: 30px;" rule="R1501"></span>
          <span style="margin-left: 8px"><input id="money20" v-model="txt_money20" type="text" @keyup="cashMoneyChange()" style="border:1px solid #99CFF5;width: 81px;height: 30px;" rule="R1501" autocomplete="off"></span>
          <span style="margin-left: 10px"><input id="money10" v-model="txt_money10" type="text" @keyup="cashMoneyChange()" style="border:1px solid #99CFF5;width: 81px;height: 30px;" rule="R1501"></span>
          <span style="margin-left: 10px"><input id="money5" v-model="txt_money5" type="text" @keyup="cashMoneyChange()" style="border:1px solid #99CFF5;width: 81px;height: 30px;" rule="R1501"></span>
          <span style="margin-left: 10px"><input class="readonly" readonly="readonly" id="money1" @keyup="cashMoneyChange()" v-model="txt_money1" mtype="text" no-edit="1" style="border:1px solid #99CFF5;width: 81px;height: 30px;background: #D9D9D9;" rule="R1501"></span>
          <span class="hide" id="moneyInput05" style="margin-left: 10px"><input id="money05" v-model="txt_money05" type="text" @keyup="cashMoneyChange()" style="border:1px solid #99CFF5;width: 81px;height: 30px;" rule="R1501" class="hide"></span>
          <span class="hide" id="moneyInput01" style="margin-left: 10px"><input class="readonly hide" readonly="readonly" id="money01" v-model="txt_money01" type="text" no-edit="1" @keyup="cashMoneyChange()" style="background: #D9D9D9;border:1px solid #99CFF5;width: 82px;height: 30px;" rule="R1501"></span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'faceValue',
    inject: ["p____page"],
    data(){
      return{
        txt_money100:'',
        txt_money50:'',
        txt_money20:'',
        txt_money10:'',
        txt_money5:'',
        txt_money1:'',
        txt_money05:'',
        txt_money01:'',
      }
    },
    props:{
      title: {
        type: String,
        default: '标题'
      },
      money100:{
        type:String,
        required: true
      },
      money50:{
        type:String,
        required: true
      },
      money20:{
        type:String,
        required: true
      },
      money10:{
        type:String,
        required: true
      },
      money5:{
        type:String,
        required: true
      },
      money1:{
        type:String,
        required: true
      },
      money05:{
        type:String,
        required: true
      },
      money01:{
        type:String,
        required: true
      },
    },
    methods: {
      cashMoneyChange(){
        this.$nextTick(() =>{
          this.$emit("call")
        })
        //alert(this.money100+"----"+this.money50+"----"+this.money20+"----"+this.money10+"----"+this.money5+"----"+this.money1+"----"+this.money05+"----"+this.money01)
      }
    },
    watch: {
      money100(newVal,oldVal){
        this.txt_money100 = newVal
      },
      txt_money100(newVal,oldVal){
        let val = newVal
        var js = "this.p____page.money100 = \"" + val + "\""
        eval(js);
      },
      money50(newVal,oldVal){
        this.txt_money50 = newVal
      },
      txt_money50(newVal,oldVal){
        let val = newVal
        var js = "this.p____page.money50 = \"" + val + "\""
        eval(js);
      },
      money20(newVal,oldVal){
        this.txt_money20 = newVal
      },
      txt_money20(newVal,oldVal){
        let val = newVal
        var js = "this.p____page.money20 = \"" + val + "\""
        eval(js);
      },
      money10(newVal,oldVal){
        this.txt_money10 = newVal
      },
      txt_money10(newVal,oldVal){
        let val = newVal
        var js = "this.p____page.money10 = \"" + val + "\""
        eval(js);
      },
      money5(newVal,oldVal){
        this.txt_money5 = newVal
      },
      txt_money5(newVal,oldVal){
        let val = newVal
        var js = "this.p____page.money5 = \"" + val + "\""
        eval(js);
      },
      money1(newVal,oldVal){
        this.txt_money1 = newVal
      },
      txt_money1(newVal,oldVal){
        let val = newVal
        var js = "this.p____page.money1 = \"" + val + "\""
        eval(js);
      },
      money05(newVal,oldVal){
        this.txt_money05 = newVal
      },
      txt_money05(newVal,oldVal){
        let val = newVal
        var js = "this.p____page.money05 = \"" + val + "\""
        eval(js);
      },
      money01(newVal,oldVal){
        this.txt_money01 = newVal
      },
      txt_money01(newVal,oldVal){
        let val = newVal
        var js = "this.p____page.money01 = \"" + val + "\""
        eval(js);
      },
    }
  }
</script>

<style scoped>

</style>
