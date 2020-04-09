<template>
    <div class="aaa">
      <yhm-app-scroll :empty="false" :init-load-finish="loadFinish" :is-allow-refresh="false">
        <div class="private_main">
          <yhm-app-view-table>
            <template #head>
              <th class="select_width">选择</th>
              <th>驳回理由</th>
            </template>
            <template #body>
              <tr @touchstart="touchStartEvent(item)" @touchend="touchEndEvent(item)" v-for="(item,index) in content" :key="item.id" :class="{app_touch:getTouch(item),app_td_split_color:index % 2 === 1}">
                <yhm-app-view-td-check :select="getSelect(item)"></yhm-app-view-td-check>
                <yhm-app-view-td :value="item.content"></yhm-app-view-td>
              </tr>
            </template>
          </yhm-app-view-table>
          <div class="private_bg">
          <yhm-app-form-text-box title="驳回理由"  v-if="category!=='00'" @blur="btnBlurEvent()" @focus="btnFocusEvent()" :no-edit="getNoEdit" :value="remark" id="remark" rule="R0000"></yhm-app-form-text-box>
            <yhm-app-form-text-box title="驳回理由" v-else :value="remark2" id="remark2"  @focus="aaa()"></yhm-app-form-text-box>

          </div>
        </div>
      </yhm-app-scroll>

      <yhm-app-form-operate>
        <yhm-app-button @call="rejectEvent" class="q"  value="驳回" category="ten"></yhm-app-button>
      </yhm-app-form-operate>
    </div>
</template>

<script>
  import { appformmixin } from '@/assetsApp/app_form.js'
  export default {
    name: 'm_rejectForm',
    mixins: [appformmixin],
    data(){
      return{
        loadFinish: false,
        category: '',
        tableName:'',
        tableDetailName:'',
        kind:'',
        content:[],
        selectItem:null,
        remark:'',
        remark2:''
      }
    },
    methods:{
      btnFocusEvent(){
        this.$nextTick(() => {
          this.$appDialog.setAaa('0','fixed')

        })
      },
      btnBlurEvent(){
        this.$nextTick(() => {
          setTimeout(()=>{
            this.$appDialog.setAaa('10','absolute')
          },0)

        })
      },
      aaa(){
        console.log(this.remark2)
      },
      touchStartEvent(item){
        item.touch = true
      },
      touchEndEvent(item){
        item.touch = false
        if(this.selectItem !== item) {
          this.selectItem = item
          if (item.other === '0') {
            this.remark = ''
          } else {
            this.remark = item.content
          }
        }
      },
      rejectEvent2(){//保单审批的驳回流程
        this.$appDialog.confirm({
          tipValue: '确定驳回吗？',
          btnValueOk: '驳回',
          okCallBack: () => {
            let params = {
              id: this.id,
              remark:this.remark2
            }
            this.ajaxJson({
              url: '/Insurance/m_rejectStateInsuranceApp',
              data: params,
              loading: '0',
              call: (data) => {
                if (data.type === 0) {
                  this.$appDialog.toast({
                    tipValue: data.message,
                    closeCallBack: () => {
                      this.$appDialog.setReturnValue(this.remark)
                      this.$appDialog.close()
                    }
                  })
                } else if (data.type === 1) {
                  this.$appDialog.toast({
                    tipValue: data.message,
                    alertImg: 'error'
                  })
                } else {
                  this.$appDialog.toast({
                    tipValue: data.message,
                    alertImg: 'error',
                    closeCallBack: () => {
                      this.$appDialog.close()
                    }
                  })
                }
              }
            })
          }
        })
      },
      rejectEvent(){
        if(this.category == '00'){
          this.rejectEvent2()
          return
        }
        if(this.validator()) {
          this.$appDialog.confirm({
            tipValue: '确定驳回吗？',
            btnValueOk: '驳回',
            okCallBack: () => {
              let params = {
                id: this.id,
                kind: this.kind,
                tableName: this.tableName,
                location: this.location,
                remark: this.remark,
                tableDetailName: this.tableDetailName
              }
              this.ajaxJson({
                url: '/Com/m_approvalNoVue',
                data: params,
                loading: '0',
                call: (data) => {
                  if (data.type === 0) {
                    this.$appDialog.toast({
                      tipValue: data.message,
                      closeCallBack: () => {
                        this.$appDialog.setReturnValue(this.remark)
                        this.$appDialog.close()
                      }
                    })
                  } else if (data.type === 1) {
                    this.$appDialog.toast({
                      tipValue: data.message,
                      alertImg: 'error'
                    })
                  } else {
                    this.$appDialog.toast({
                      tipValue: data.message,
                      alertImg: 'error',
                      closeCallBack: () => {
                        this.$appDialog.close()
                      }
                    })
                  }
                }
              })
            }
          })
        }
      }
    },
    computed:{
      getSelect(){
        return function(item) {
          return this.selectItem === item
        }
      },
      getTouch(){
        return function(item) {
          return item.touch
        }
      },
      getNoEdit(){
        if(this.selectItem && this.selectItem.other === '0'){
          return false
        }
        return true
      }
    },
    created () {
      this.setQuery2Value('category')
      this.setQuery2Value('tableName')
      this.setQuery2Value('tableDetailName')
      this.setQuery2Value('kind')
      this.setQuery2Value('location')
      if(this.category == '00'){
        return
      }
      this.$nextTick(()=>{
        window.οnscrοll=function(){
          $(".app_fixed").css("top",$(window).scrollTop());
          $(".aaa").css("top",$(window).scrollTop()+$(window).height());
        }
      })
      let params = {
        category: this.category,
      }
      this.ajaxJson({
        url: '/PersonOffice/m_rejectCause',
        data: params,
        loading:"0",
        call: (data)=>{
          this.selectItem = data[0]
          this.remark = this.selectItem.content
          this.content = data
        }
      })
    }
  }
</script>

<style scoped>
.private_main{
  height: calc(100vh - 2.4rem);
}
.private_bg{
  padding-top: 0.4267rem;
  background-color: #FFFFFF;
  margin: 0.2133rem;
  border-radius: 0.2133rem;
}
</style>
