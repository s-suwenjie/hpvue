import Qs from 'qs'
import { guid ,formatDateHtml,tenThousandFormatHtml} from '@/assets/common.js'
const formmixin = {
  provide(){
    return{
      p____page:this
    }
  },
  data(){
    return {
      id: '',
      isAdd:false,
      createName:"",
      insertDate:"",
      updateName:"",
      updateDate:"",
      p____rule:[]
    }
  },
  methods:{
    autoVerify(controlID,message){
      eval('this.$refs.' + controlID + '.errorEvent("' + message + '")')
    },
    //替换指定传入参数的值,paramName为参数,replaceWith为新值
    replaceParamVal(paramName,replaceWith,title) {
      if(paramName==''){//需要改变的参数值不能为空
        return
      }
      let oUrl = location.search.toString();
      let re=eval('/('+ paramName+'=)([^&]*)/gi');
      let newUrl = oUrl.replace(re,paramName+'='+replaceWith);
      let stateObject = 0;
      history.replaceState(stateObject,title,newUrl);
      console.log(oUrl)
      console.log(newUrl)
      console.log(window.location)
    },
    //格式化日期带周几
    formatDateShow (data) {
      return formatDateHtml(data)
    },
    //万位分割金额，字体变色和缩放
    tenThousandFormatShow(data){
      return tenThousandFormatHtml(data)
    },
    setQuery2Value(key){
      let query = Qs.parse(location.search.substring(1))
      let js = 'let val = query.' + key + '; if(val) this.' + key + ' = val;'
      eval(js)
    },
    init(options){
      let url = options && options.url || null
      if(url === null){
        this.$dialog.alert({
          tipValue: "请求地址不能为空",
          alertImg:"error"
        })
        return
      }
      var params = {}
      if(!this.isAdd){
        params = {
          id:this.id
        }
      }
      Object.assign(params, options && options.data || []);
      this.ajaxJson({
        url:url,
        data:params,
        loading:"1",
        call: (data) => {
          options && options.all && options.all(data)
          if(this.isAdd) {
            options && options.add && options.add(data)
          }
          else {
            this.id = data.id
            this.insertDate = data.insertDate
            this.createName = data.createName
            this.updateDate = data.updateDate
            this.updateName = data.updateName
            options && options.look && options.look(data)
          }
        }
      })
    }
  },
  computed:{
    showSchedule(){
      return function (scheduleConfig,index) {
        if (!scheduleConfig.reject && !scheduleConfig.isFinish) {
          return index === scheduleConfig.current
        }
        else{
          return index === scheduleConfig.select
        }
      }
    }
  },
  created(){
    let query = Qs.parse(location.search.substring(1))
    let id = query.id
    if (!id) {
      id = guid()
      this.isAdd = true;
      this.createName = sessionStorage.getItem('____currentUser')
      this.updateName = sessionStorage.getItem('____currentUser')
      this.insertDate = "当前时间"
      this.updateDate = "当前时间"
    }
    this.id = id
  }
}

export{
  formmixin
}
