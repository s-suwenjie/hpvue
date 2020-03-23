<template>
  <div id="selectUnit" class="container">
    <div class='container'>
      <div class="selectTb fcSeltTable formCont ptZero bdtNone">
        <div class="table">
          <table width="100%" border="1" cellspacing="0" >
            <thead>
            <tr class="tbHead">
              <td style="width: 38px">选择</td>
              <td>理由</td>
            </tr>
            </thead>
            <tbody>
            <tr @click="selectEvent(items,index)" v-for="(items,index) in content"
                :class="{InterlacBg:index%2!=0}"
                :key="index" class="tbBody">
              <td class="tacPlZero"><p class="letTbCheck" :class="{letTbChecked:checkSelect(items.id)}"></p></td>
              <td>{{items.content}}</td>
            </tr>
            </tbody>
          </table>
          <span class="noTableData" v-show="empty">没有更多数据...</span>
          <div class="f_split"></div>
          <yhm-form-textarea v-show="!isOther" title="驳回理由" :value="rejectIpt" id="rejectIpt" rule="R0000"></yhm-form-textarea>
          <yhm-form-textarea v-show="isOther" :no-edit="isEdit" title="驳回理由" :value="rejectIpt" id="rejectIpt"></yhm-form-textarea>
          <div class="tbBtm">
            <button type="button" class="selectConfirm" @click="selectConfirm">确定</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Qs from 'qs'
  import { selectClick, selectdbClick, selectConfirm, selectComputedSelected } from '@/assets/common.js'
  import { formmixin } from '../../assets/form'

  export default {
    provide(){
      return{
        p____page:this
      }
    },
    name: 'insuranceRejectReason',
    mixins: [formmixin],
    data () {
      return {
        id: '',
        category: '',
        rejectIpt: '',
        otherShow: false,
        selectType: '0', // 单选还是多选,0单选,1多选
        selectValue: [], // 选中的值：单选
        content: [],
        remark: '',
        index: '',
        checked: '',
        isEdit: '1',
        empty: false,
        tableName:'',
        tableDetailName:'',
        kind:'',
        isOther: true
      }
    },
    methods: {
      // 单击选择事件
      selectEvent (data,index) {
        this.checked = ''
        this.otherShow = false
        this.remark = data.content
        this.rejectIpt = data.content
        this.index = index
        this.otherShow = this.index === this.content.length - 1;
        if(this.index === this.content.length - 1){
          this.isEdit = '0'
          this.rejectIpt = ''
          this.isOther = false
        }else{
          this.isEdit = '1'
          this.isOther = true
        }
        this.selectValue = selectClick(this.selectType, this.selectValue, data)
      },
      selectConfirm () {
        let that = this
        if(that.selectValue.length === 0 ){
          that.$dialog.alert({
            width:320,
            alertImg: 'warn',
            tipValue:'你未选中任何理由,请重新选择！',
            okCallBack:()=> {
            }
          })
        }else{
          if(this.validator()){
            let params = {
              id: this.id,
              kind: this.kind,
              tableName: this.tableName,
              location: '0',
              remark: this.rejectIpt,
              tableDetailName: this.tableDetailName
            }
            this.ajaxJson({
              url: '/Fin/rejectStateNoVue',
              data: params,
              call: (data) => {
                if(data.type === 0){
                  this.$dialog.setReturnValue("123")
                  this.$dialog.alert({
                    tipValue: data.message,
                    closeCallBack: () => {
                      this.$dialog.close()
                    }
                  })
                }else if(data.type === 1){
                  this.$dialog.alert({
                    tipValue: data.message,
                    alertImg: 'error',
                    closeCallBack: () => {
                    }
                  })
                }else{
                  this.$dialog.alert({
                    tipValue: data.message,
                    alertImg: 'error',
                    closeCallBack: () => {
                      this.$dialog.setReturnValue(this.ownerID)
                      this.$dialog.close()
                    }
                  })
                }
              }
            })
          }
        }
      }
    },
    computed: {
      // 检查是否选中
      checkSelect () {
        return function (id) {
          return selectComputedSelected(this.selectValue, id)
        }
      }
    },
    created () {
      let query = Qs.parse(location.search.substring(1))
      if(query.tableName){
        this.tableName = query.tableName
      }
      if(query.tableDetailName){
        this.tableDetailName = query.tableDetailName
      }
      if(query.kind){
        this.kind = query.kind
      }
      if (query.category) {
        this.category = query.category
      }
      if(query.id){
        this.id = query.id
      }
      let params = {
        category: this.category,
      }
      this.ajaxJson({
        url: '/PersonOffice/rejectCause',
        data: params,
        call: (data)=>{
          this.content = data
          this.empty = this.content.length === 0
        }
      })
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
  .tbBtm{
    display: flex;
    justify-content: center;
    margin-bottom: 10px;
  }

  .tbHead td
  {
    font:bold 14px/0.75em Arial,'Times New Roman','Microsoft YaHei',SimHei;
    color: #fff;
    height: 34px;
    padding:0 3px;
    vertical-align:middle;
    line-height: 32px;
    background: linear-gradient(0deg, #49a9ea, #66c0ff );
    white-space: nowrap;
    cursor:pointer;
    overflow:hidden;
    position: relative;
  }
  .tbHead td:after {
    display: inline-block;
    content: '';
    position: absolute;
    right: 0;
    top: 8px;
    height: 18px;
    border-right: 1px solid #fff;
    background-color: transparent !important;
  }
  .tbBody td {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    box-shadow: -1px 0 0 0 #bfbfbf inset, 0 1px 0 0 #bfbfbf;
  }
</style>
