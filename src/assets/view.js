import Qs from 'qs'
const viewmixin = {
  provide () {
    return {
      p____page: this
    }
  },
  data () {
    return {
      id:'',
      empty:true,
      pager: { // 分页数据
        total: '', // 数据总条数
        pageSize: 5, // 单页数据条数
        pageIndex: 1, // 当前页码
        selectCount: 0 // 选中数据的条数
      },
      createName:"",
      insertDate:"",
      updateName:"",
      updateDate:"",
    }
  },
  methods: {
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
      var params = {
        id:this.id
      }
      this.ajaxJson({
        url:url,
        data:params,
        loading:"1",
        call: (data) => {
          this.insertDate = data.insertDate
          this.createName = data.createName
          this.updateDate = data.updateDate
          this.updateName = data.updateName
          options && options.call && options.call(data)
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
      this.$dialog.alert({
        tipValue:'View页面必须传入id参数！！！',
        width:'350',
        alertImg:'error',
        closeCallBack:() => {
          this.$dialog.close()
        }
      })
    }
    else{
      this.id = id
    }
  }
}

export {
  viewmixin
}
