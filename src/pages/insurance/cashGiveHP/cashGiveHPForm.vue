<template>
    <div>
      <div class="center">

        <yhm-form-date  title="启用日期  "  :value="time" id="time" position="t" ></yhm-form-date>

        <div class="flex">
          <span>商业险金额:</span>
          <span>/</span>
          <input type="text"  v-model="one">
          <span>X</span>
          <div class="cashGiveHPinput">
            <input type="text" v-model="two">
            <div class="inputRight">%</div>
          </div>
        </div>
        <div class="flex flex2">
          <span>商业险金额:</span>
          <span>/</span>
          <input type="text"  v-model="one">
          <span>X</span>
          <div class="cashGiveHPinput">
            <input type="text" v-model="three">
            <div class="inputRight">%</div>
          </div>
          <span>X</span>
          <div class="cashGiveHPinput">
            <input type="text" v-model="four">
            <div class="inputRight">%</div>
          </div>
        </div>
        <div class="flex flex3">
          <span>交强险金额:</span>
          <span>/</span>
          <input type="text"  v-model="one">
          <span>X</span>
          <div class="cashGiveHPinput">
            <input type="text" v-model="fives">
            <div class="inputRight">%</div>
          </div>
        </div>
      </div>
      <yhm-formoperate :createName="createName" :insertDate="insertDate" :updateName="updateName" :updateDate="updateDate">
        <template #btn>
          <yhm-commonbutton value="提交" class="btnAddSave" :flicker="true" icon="btnSubSave" @call="save()" category="one"></yhm-commonbutton>
        </template>
      </yhm-formoperate>
    </div>
</template>

<script>
  import { formmixin } from '@/assets/form.js'
  import { accMul, accAdd, guid, formatDate, number2chinese,formatTime} from '@/assets/common.js'

  export default {
    name: 'cashGiveHPForm',
    mixins: [formmixin],
    data(){
      return{
        time:formatDate(new Date((new Date()).getTime())),
        one:'',
        two:'',
        three:'',
        four:'',
        fives:'',
        unitID:'',
        unit:'',
        ownerID: '',
      }
    },
    methods:{

      save(){
        this.$dialog.confirm({
          width: 350,
          tipValue: '请仔细核对，保存后将不能修改！',
          btnValueOk: '确定',
          alertImg: 'warn',
          okCallBack: (data) => {
            let params = {
              id:this.id,
              ownerID:this.ownerID,
              time:this.time,
              unitID:this.unitID,
              one:this.one,
              two:this.two,
              three:this.three,
              four:this.four,
              fives:this.fives
            }
            this.ajaxJson({
              url: '/Insurance/saveCashGiveHP',
              data:params,
              call:(data) =>{
                if(data.type === 0){
                  let details={
                    id:this.id,
                    ownerID: this.ownerID,
                    time:this.time,
                    one:this.one,
                    two:this.two,
                    three:this.three,
                    four:this.four,
                    fives:this.fives
                  }
                  this.$dialog.setReturnValue(details) //向父级页面传递参数
                  this.$dialog.alert({
                    tipValue: data.message,
                    closeCallBack: () => {

                      this.$dialog.close()
                    }
                  })
                }else {
                  this.$dialog.alert({
                    tipValue: data.message,
                    alertImg: 'error',
                    closeCallBack: () => {
                    }
                  })
                }
              }
            })
          }
        })


      },

    },
    created () {
      this.setQuery2Value('ownerID')
      this.setQuery2Value('unitID')

      this.init({
        url: '/Insurance/initCashGiveHPDetailsForm',
        all: (data) => {

        },
        add: (data) => {
          /* 需要添加的数据 */
        },
        look: (data) => {
          /* 需要查看的数据 */
          this.id=data.id
          this.ownerID=data.ownerID
          this.time=data.time
          this.one=data.one
          this.two=data.two
          this.three=data.three
          this.four=data.four
          this.fives=data.fives
          this.unitID=data.unitID

        }
      })



    }
  }
</script>

<style lang="less" scoped>
  .center{
    margin: auto;
    margin-top: 40px;
    width: 960px;
    margin: 0 auto;
    margin-top: 30px;
    background-color: #e9e9e9;
    border-radius: 8px;
    border: solid 1px #d9d9d9;
    padding:20px;
  }
  .cashGiveHPinput{
    position: relative;
    .inputRight{
      position: absolute;
      top: 0;
      right: 8px;
      font-size: 20px;
      line-height: 28px;
      padding-left: 10px;
      background-color: #fff;
    }
  }

.flex{
  width: 500px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-left: 18px;
  margin-top: 10px;
  span{
    font-size: 14px;
    height: 28px;
    line-height: 28px;
  }
  input{
    height: 28px;
    padding:0 10px;
    border-radius: 5px;
  }
}
.flex2{
  width: 712px;
  margin-top: 40px;
}
.flex3{
  margin-top: 40px;
}
</style>
