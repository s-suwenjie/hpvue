import {formatDateHtml,tenThousandFormatHtml} from '@/assets/common.js'
import Qs from 'qs'
const appmanagermixin = {
  provide(){
    return{
      p____page:this
    }
  },
  data(){
    return{
      /*固定属性*/
      loadFinish:false,
      content: [], // 接收列表数据
      empty: false, // 列表数据是否为空
      searchStr: '', // 搜索字符串
      pageIndex: 1, // 当前页码
    }
  },
  methods: {
    //获取页面URL参数
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
      let initVal = options && options.initValue
      var params = {}
      if (initVal) {
        params = {
          init: initVal
        }
      } else {
        params = {
          init: initVal,
          searchStr: this.searchStr,
          pageIndex: this.pageIndex
        }
      }
      Object.assign(params, options && options.data || []);
      this.ajaxJson({
          url:url,
          data:params,
          loading:'0',
          call: (data) => {
            this.content = data.content || []
            this.empty = this.content.length == 0
            options && options.all && options.all(data)
            if (initVal) {
              // 赋值最后添加的数据
              options && options.init && options.init(data)
            }
            this.$nextTick(() => {
              this.loadFinish = !this.loadFinish
            })

          }
      })
    }
  },
  watch: {

  },
  computed: {

  },
  created () {
    if(this.initPageData) {
      this.$nextTick(() => {
        this.initPageData(true)
      })
    }
  }
}

export{
  appmanagermixin
}

