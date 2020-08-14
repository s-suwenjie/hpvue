<template>
  <div class="f_main">
    <div class="fluid container">
      <div class="col-md-3" v-for="(single,index) in content" :key="index">
        <h3 style="text-align: center">单据 {{index+1}}</h3>
        <draggable class="list-group" tag="ul" v-model="single.value" v-bind="dragOptions" @add="onRemove">
          <li class="list-group-item" v-for="(detail,i) in single.value" :key="i">
            {{detail.subject}}
            <span class="badge">￥{{detail.money}}</span>
          </li>
        </draggable>
      </div>
    </div>
    <div class="singleTip">
      <img src="../../../static/staticImage/singleTip.gif" alt="">
    </div>
    <yhm-formoperate :createName="createName" :insertDate="insertDate" :updateName="updateName" :updateDate="updateDate">
      <template #btn>
        <yhm-commonbutton value="保存" icon="btnSave" :flicker="true" @call="save()"></yhm-commonbutton>
      </template>
    </yhm-formoperate>
  </div>
</template>

<script>
  import draggable from 'vuedraggable'
  import { guid } from '@/assets/common'
  import { formmixin } from '@/assets/form.js'

  export default {
    name: 'approvalReimbursementSingleSplitForm',
    mixins: [formmixin],
    components: {
      draggable
    },
    data () {
      return {
        content: [],
        ownerID: '',
      }
    },
    methods: {
      addSingle () {
        this.content.push({ guid: guid(), value: [] })
      },
      delSingle () {
        this.content = this.content.filter(function (item) {
          return item.value.length !== 0
        })
      },
      onRemove () {
        this.delSingle();
        this.addSingle();
      },
      initData(){
        let params = {
          id: this.ownerID
        }
        this.ajaxJson({
          url: '/PersonOffice/initSingleSplitForm',
          data:params,
          call: (data) => {
            this.content.push(data)
            this.addSingle()
          }
        })
      },
      save(){
        this.$dialog.confirm({
          width: 250,
          tipValue: '是否分单?',
          alertImg: 'warn',
          okCallBack: () => {
            this.delSingle()

            let params = {
              guid: this.ownerID,
              value:this.content,
            }
            this.ajaxJson({
              url: '/PersonOffice/singleSplitSave',
              data: params,
              call: (data) => {
                if(data.type === 0){
                  this.$dialog.setReturnValue(this.id)
                  this.$dialog.alert({
                    tipValue: '分单成功！',
                    closeCallBack: () => {
                      this.$dialog.close()
                    }
                  })
                }
              }
            })
          }
        })
      }
    },
    computed: {
      dragOptions () {
        return {
          animation: 0,
          group: 'description',
          ghostClass: 'ghost'
        }
      },
      // contentString () {
      //   return JSON.stringify(this.content, null, 2)
      // }
    },
    created () {
      this.setQuery2Value('ownerID')
      this.initData();
    }
  }
</script>

<style scoped>
  .singleTip{
    margin: 16px auto 70px;
    text-align: center;
    width: 660px;
  }
  .singleTip img{
    width: 100%;
    height: 100%;
  }
  .f_main{
    margin-bottom: 0 !important;
  }
  .btn{
    position: fixed;
    bottom: 20px;
    left: 0;
    right: 0;
    text-align: center;
  }
  .container {
    padding-right: 15px;
    padding-left: 15px;
    display: flex;
    flex-wrap: wrap;
    background-color: #E9E9E9;
    margin: 0 20px;
  }
  .col-md-3 {
    width: 240px;
    position: relative;
    padding-right: 15px;
    padding-left: 15px;
    margin-right: 8px;
  }
  .col-md-3>h3{
    margin-top: 8px;
  }
  .list-group {
    padding-left: 0;
    margin-bottom: 20px;
    min-height: 20px;
  }
  ul {
    display: block;
    list-style-type: disc;
    margin-block-start: 1em;
    margin-block-end: 1em;
    margin-inline-start: 0px;
    margin-inline-end: 0px;
    padding-inline-start: 40px;
    margin-top: 10px;
    margin-bottom: 10px;
  }
  * {
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
  }

  .list-group-item {
    width: 240px;
    position: relative;
    display: block;
    padding: 10px 15px;
    margin-bottom: -1px;
    background-color: #fff;
    border: 1px solid #bfbfbf;
    cursor: move;
  }

  .list-group-item > .badge {
    float: right;
  }

  .list-group-item:first-child {
    border-top-left-radius: 4px;
    border-top-right-radius: 4px;
  }

  .badge {
    display: inline-block;
    min-width: 10px;
    padding: 3px 7px;
    font-size: 12px;
    font-weight: bold;
    line-height: 1;
    color: #fff;
    text-align: center;
    white-space: nowrap;
    vertical-align: middle;
    background-color: #777;
    border-radius: 10px;
  }
</style>
