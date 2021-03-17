<template>
  <div class="f_main f_main_customize mb16">
    <yhm-select-body :choose="false">

      <template #operate>
        <div v-show="showTipDbSelect" class="s_db_select" :style="{left:getLeft,top:getTop}">双击选择</div>
        <yhm-commonbutton  value="添加" icon="btnAdd" @call="selectAddEvent"></yhm-commonbutton>
        <yhm-managersearch :value="searchStr" id="searchStr" @call="initPageData"></yhm-managersearch>
        <span style="font-size: 16px;font-weight: bold;margin-left: 50px;">

          <span>名称:</span>
          <span style="color: #FF0000"> {{ownerName}}</span>

        </span>
      </template>

      <template #customize>
        <div class="cbl_main" v-for="(item,index) in content" :key="index" style="width: 950px;display: flex;flex-direction: row;height: 130px"  @dblclick="dblclickEvent(item)" :style="{boxShadow: (mouseStyle ? getHoverColor : getColor)}"
             @mouseover="mouseOverEvent" @mouseout="mouseOutEvent" @mousemove="mousemoveEvent">
          <div class="cbl_main_left">
            <div class="cbl_main_left_type" :class="getCategory">
              <span>发票抬头</span>
            </div>

          </div>
          <div style="display: flex;flex-direction: column; justify-content: center;margin-left: 10px;font-size: 14px">
            <div>发票抬头:{{item.unit}}</div>
            <div>纳税人识别号:{{item.taxNumber}}</div>
            <div>地址、手机号:<span>{{item.addressCN}}</span>
            <div style="margin-left: 89px">{{item.tel}}</div>
            </div>
            <div>开户行及账号:
              <span>{{item.bank}}</span>
              <span style="margin-left: 5px">{{item.account}}</span>
            </div>
          </div>

        </div>
      </template>
      <template #empty>
        <span class="m_listNoData" v-show="content.length=='0'?true:false">暂时没有数据</span>
      </template>
     </yhm-select-body>

            </div>

          </template>

          <script>
            import { selectmixin } from '@/assets/select.js'
            export default {
              name: 'selectUnitInvoice',
              mixins: [selectmixin],
              data(){
                return{
                  mouseStyle:false,
                  mouseStylePrompt:false,
                  mouseX:0,
                  mouseY:0,
                  rightMenuShow:false,
                  ownerName:'',
                  ownerID:'',
                }
              },
              props: {
                psd:{
                  type:Array,
                  default:function() {
                    return []
                  }
                },
                menu:{
                  type:Array,
                  default:function() {
                    return []
                  }
                },
                menuCategory:{
                  type: String,
                  default:'0'
                },
                item:{
                  type:Object,
                  default:function() {
                    return {}
                  }
                },
                //代码
                code:{
                  type:String,
                  default:''
                },
                //类型
                category:{
                  type:String,
                  default:'0'
                },
                //类型值
                categoryValue:{
                  type:String,
                  default:''
                },
                //底部颜色
                color:{
                  type:String,
                  default:'#7abcee'
                }
              },
              methods: {
                mousemoveEvent(event){
                  this.left = event.clientX
                  this.top = event.clientY + 6
                },
                selectAddEvent(){
                  this.$dialog.OpenWindow({
                    width: '1050',
                    height: '690',
                    url:'/unitInvoiceFrom?ownerID='+this.id,
                    title:'添加发票抬头',
                    closeCallBack:(data) =>{
                      if (data) {
                        this.initPageData()
                      }
                    }
                  })
                },
                initPageData(){
                  let params = {
                    id:this.id,
                    category: '0'
                  }
                  this.init({
                    initValue: false,
                    url: '/Basic/getInvoiceAll',
                    data: params,
                    all: (data) => {
                      // 不管是不是初始化都需要执行的代码
                      this.content = data.content
                      for (let i in data.content){
                        this.ownerName=data.content[i].ownerName
                        this.ownerID=data.content[i].ownerID
                      }
                      this.pager.total = data.count
                    },
                    init :data=>{

                    }
                  })
                },
                dblclickEvent(item){ //双击选择
                  this.$dialog.setReturnValue(item)
                  this.$dialog.close()

                },
                // clickAllEvent(item){ //单击选择
                //   //alert(item.id)
                //
                // },
                mouseOverEvent(){
                  this.showTipDbSelect = true
                  this.mouseStyle = true
                  this.$nextTick(() => {
                    this.$emit('mouseover')
                  })
                },
                mouseOutEvent(){
                  this.showTipDbSelect = false
                  this.mouseStyle = false
                  this.$nextTick(() => {
                    this.$emit('mouseout')
                  })
                },
                mouseOverPromptEvent(){
                  this.mouseStylePrompt = true
                },
                mouseOutPromptEvent(){
                  this.mouseStylePrompt = false
                },


              },

              created () {
                this.setQuery2Value("id")
                this.setQuery2Value('ownerName')
              },
              computed:{
                getCategoryValue(){
                  if(this.psd.length === 0){
                    return this.categoryValue
                  }
                  else{
                    let result = ''
                    for(let i = 0; i < this.psd.length; i++){
                      let item = this.psd[i]
                      if(item.num === this.categoryValue){
                        result = item.showName
                        break
                      }
                    }
                    return result
                  }
                },
                getRightMenuPosition(){
                  return 'left:' + this.mouseX + 'px;top:' + this.mouseY + 'px'
                },
                getColor(){
                  return '0px 0px 4px 0px #bfbfbf, inset 0px -8px 0px 0px ' + this.color
                },
                getHoverColor(){
                  return '0px 0px 12px 0px #49a9ea, inset 0px -8px 0px 0px ' + this.color
                },
                getCategory(){
                  let result = this.category
                  if(this.category === '' && this.category !== '1' && this.category !== '2' && this.category !== '3'&& this.category !== '4'){
                    result = '0'
                  }
                  return 'cbl_main_left_type' + result
                },
                getbeforeCode(){
                  let result = ''
                  if (this.code.length > 4) {
                    result = this.code.substring(0,this.code.length - 4)
                  }
                  return result
                },

              }
            }
          </script>

          <style scoped>

          </style>
