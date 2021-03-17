<template>
  <div class="f_main f_main_customize">
    <yhm-formbody>
      <template #title>基本信息</template>
      <template #control>
        <yhm-form-date title="所属月份"  type='month' :value="dateTime" id="dateTime " position="t" rule="R0000"></yhm-form-date>
      </template>
    </yhm-formbody>
    <!-- 空行 -->
    <div class="f_split"></div>

    <yhm-form-list-edit>
      <template #title>分组成员信息</template>
      <template #operate>
        <!--<yhm-commonbutton value="添加分组成员" icon="btnAdd" @call="addDetail"></yhm-commonbutton>-->
      </template>
      <template #listHead>
        <yhm-managerth title="名称"></yhm-managerth>
        <yhm-managerth  title="金额"></yhm-managerth>
        <!--<yhm-managerth style="width: 240px" title="字体颜色"></yhm-managerth>-->
        <!--<yhm-managerth style="width: 120px" title="序号"></yhm-managerth>-->
        <!--<yhm-managerth style="width: 40px" title="删除"></yhm-managerth>-->
      </template>
      <template #listBody>
        <tr v-for="(item,index) in categoryList" :key="index" :class="{InterlacBg:index%2!==0}">
          <yhm-form-td-textbox width="460" :list="categoryList" listid="categoryList" :value="item" id="showName" no-edit="1"></yhm-form-td-textbox>
          <yhm-form-td-textbox width="460" :list="categoryList" listid="categoryList" :value="item" id="money"  rule="R0000"></yhm-form-td-textbox>
          <!--<yhm-form-td-textbox width="240" :list="details" listid="categoryList" :value="item" id="color"></yhm-form-td-textbox>-->
          <!--<yhm-form-td-textbox width="120" :list="details" listid="categoryList" :value="item" id="num" rule="R0000"></yhm-form-td-textbox>-->
          <!--<yhm-form-td-delete :must="1" width="40" :list="details" :value="item"></yhm-form-td-delete>-->
        </tr>
      </template>
    </yhm-form-list-edit>

    <yhm-formoperate :createName="createName" :insertDate="insertDate" :updateName="updateName" :updateDate="updateDate">
      <template #btn>
        <yhm-commonbutton value="保存" icon="btnSave" :flicker="true" @call="save()"></yhm-commonbutton>
      </template>
    </yhm-formoperate>
  </div>
</template>

<script>
  import { formmixin } from '@/assets/form.js'
  import { accMul, accAdd, guid, formatDate, number2chinese,formatTime ,formatPhone, formatIdNo,} from '@/assets/common.js'
  export default {
    name: 'reimbursementLlimitForm',
    mixins: [formmixin],
    data(){
      return {
        id:'',
        dateTime:'',//当前时间,//申请时间
        dateMoenth:'',
        money:'',
        categoryList:[],
        category:'',
        details:[],
        remark:'',
        subjectID:'',
      }
    },
    methods:{
      save(){
        if (this.validator()) {
          this.details=[]
          for(let i in this.categoryList){
            this.details.push({
              id: guid(),
              insertDate: formatTime(new Date()),
              ownerID:this.id,
              subjectID:this.categoryList[i].img,
              showName:this.categoryList[i].showName,
              money:this.categoryList[i].money,
            })
            this.remark += this.categoryList[i].showName+ ':'+this.categoryList[i].money+','
          }
          let params={
            id:this.id,
            dateTime:this.dateTime.substring(0,4),
            dateMonth:this.dateTime.substring(5,7),
            details:this.details,
            remark:this.remark
          }

          this.ajaxJson({
            url: '/dailyoffice/reimbursementLlimit/save',
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
        url: '/dailyoffice/reimbursementLlimit/initForm',
        all: (data) => {

          this.categoryList = data.categoryPsd.list
          this.category = data.categoryPsd.value
        },
        add: (data) => {
          /* 需要添加的数据 */
        },
        look: (data) => {
          /* 需要查看的数据 */
          this.dateTime=data.dateTime+'-'+data.dateMonth
          this.details=data.details
          this.categoryList=[]
          for (let i in this.details){
            this.categoryList.push({
              id: this.details[i].id,
              insertDate:this.details[i].insertDate,
              ownerID:this.details[i].ownerID,
              img:this.details[i].subjectID,
              showName:this.details[i].showName,
              money:this.details[i].money,
            })
          }
        }
      })
    },
  }
</script>

<style scoped>

</style>
