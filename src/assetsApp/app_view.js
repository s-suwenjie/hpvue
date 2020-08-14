import Qs from 'qs'
import {formatDateHtml,tenThousandFormatHtml,tenThousandFormat} from '@/assets/common.js'
const appviewmixin = {
  provide () {
    return {
      p____page: this
    }
  },
  data () {
    return {
      id:'',
      loadFinish:false,
    }
  },
  methods: {
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
        this.$appDialog.toast({
          tipValue:'请求地址不能为空',
          alertImg:'error'
        })
        return
      }
      var params = {
        id:this.id
      }
      this.ajaxJson({
        url:url,
        data:params,
        loading:"0",
        call: (data) => {
          options && options.call && options.call(data)
          this.$nextTick(() => {
            this.loadFinish = !this.loadFinish
          })
        }
      })
    }
  },
  computed: {

  },
  watch: {

  },
  created () {
    let query = Qs.parse(location.search.substring(1))
    let id = query.id
    if (!id) {
      this.$appDialog.toast({
        tipValue:'View页面必须传入id参数！！！',
        alertImg:'error'
      })
    }
    else{
      this.id = id
    }
  }
}

export {
  appviewmixin
}
