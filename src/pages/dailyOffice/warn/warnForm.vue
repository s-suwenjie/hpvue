<template>
  <div class="f_main">
    <yhm-formbody>
      <template #title>基本信息</template>
      <template #control>
        <yhm-form-date title="申请日期" :min="minWorkDate" :value="workDate" id="workDate" rule="R0000"></yhm-form-date>
        <yhm-form-textarea title="提醒事项" :value="content" id="content" rule="R0000"></yhm-form-textarea>
        <yhm-form-radio title="事项类型" :select-list="categoryList" :value="category" id="category" rule="R0000" width="1"></yhm-form-radio>
        <yhm-form-select-more title="提醒人员" :value="list" id="list" @click="selectPerson()" rule="#"></yhm-form-select-more>
      </template>
    </yhm-formbody>
    <div class="f_split"></div>
    <yhm-formoperate :createName="createName" :insertDate="insertDate" :updateName="updateName" :updateDate="updateDate">
      <template #btn>
        <yhm-commonbutton value="保存" icon="btnSave" :flicker="true" @call="save()"></yhm-commonbutton>
      </template>
    </yhm-formoperate>
  </div>
</template>

<script>
  import { formmixin } from '@/assets/form.js'
  import { formatDate ,accAdd, guid,number2chinese,formatCnDate,accMul,formatTime} from '@/assets/common.js'
  export default {
    name: 'warnForm',
    mixins: [formmixin],
    data(){
      return{
        workDate:'',
        minWorkDate:'',
        content:'',
        category:'',
        categoryList:[],
        list:[],
        year:'',
        day:'',
        month:'',
        ID:'',
      }
    },
    methods:{
      selectPerson () {
        this.$dialog.OpenWindow({
          width: 950,
          height: 690,
          url: '/selectPerson?category=0&categoryBefore=1&selectType=1',
          title: '选择提醒人员',
          closeCallBack: (data) => {
            if (data) {
              for (var j = 0; j < data.length; j++) {
                var temp = data[j]
                var index = -1

                for (var i = 0; i < this.list.length; i++) {
                  if (this.list[i].personID === temp.id) {
                    index = 0
                    break
                  }
                }
                if (index === -1) {
                  this.list.push({
                    id: guid(),
                    insertDate: formatTime(new Date(accAdd(new Date().getTime(), accMul(1, this.list.length)))),
                    ownerID: this.id,
                    personID: temp.id,
                    otherName: temp.name
                  })
                }
              }
            }
          }
        })
      },
      save () {
        if (this.validator()) {
          var params = {
            id: this.id,
            category:this.category,
            workDate:this.workDate,
            content:this.content,
            list:this.list
          }
          this.ajaxJson({
            url: '/dailyoffice/warn/save',
            data: params,
            call: (data) => {
              if (data.type == 0) {
                this.$dialog.setReturnValue(this.id)
                this.$dialog.alert({
                  tipValue: data.message,
                  closeCallBack: () => {

                  }
                })
              }
            }
          })
        }
      }
    },
    created(){
      this.setQuery2Value('year')
      this.setQuery2Value('month')
      this.setQuery2Value('day')
      this.setQuery2Value('ID')

      let date=new Date()//accAdd(new Date().getTime(), 86400000))

      console.log('输出当天日期:')
      console.log(date.getFullYear(),date.getMonth(),date.getDate())
      console.log(date)
      if(this.year < date.getFullYear() || (this.year == date.getFullYear() && this.month < (date.getMonth()+1)) || (this.year == date.getFullYear() && this.month == (date.getMonth()+1) && this.day <= date.getDate())){
        console.log('不可选当天')
        this.workDate=this.year+'-'+this.month+'-'+(Number(this.day)+1)
        this.minWorkDate=this.year+'-'+this.month+'-'+(Number(this.day)+1)
      }else{
        console.log('可以选当天')
        this.workDate=this.year+'-'+this.month+'-'+this.day
        this.minWorkDate=this.year+'-'+this.month+'-'+this.day
      }

      // if(this.year!==''&&this.year!==null&&this.month!==''&&this.month!==null&&this.day!==''&&this.day!==null){
      //   this.workDate=this.year+'-'+this.month+'-'+this.day
      //
      // }else{
      //   // let date=new Date(accAdd(new Date().getTime(), 86400000))
      //   this.workDate=date.getFullYear()+'-'+date.getMonth()+'-'+date.getDate()
      //   // this.workDate=date.getFullYear()+'-'+date.getMonth()+'-'+(date.getDate()+1)
      // }
      let params
      if(this.ID){
        params={
          id:this.ID
        }
      }else{
        params={}
      }
      this.init({
        url: '/dailyoffice/warn/initForm',
        data:params,
        all: (data) => {
          this.categoryList = data.categoryPsd.list
          console.log(data)
        },
        add: (data) => {
          console.log(data)
          this.category = data.categoryPsd.value
          this.list = data.list
          if(this.ID){
            this.content=data.content
            this.workDate=data.workDate
          }
        },
        look: (data) => {

        }
      })
    }
  }
</script>

<style scoped>

</style>
