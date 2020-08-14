import Qs from 'qs'
import { selectClick, selectdbClick, selectConfirm, selectComputedSelected } from '@/assets/common.js'
const selectmixin = {
  provide () {
    return {
      p____page: this
    }
  },
  data () {
    return {
      showTipDbSelect:false,
      left:0,
      top:0,
      selectType: '0', // 单选还是多选,0单选,1多选
      allCheck:false,  // 是否全部选中
      content: [], // 页面数据
      empty: false, // 页面数据是否为空
      selectValue: [], // 选中的值：单选
      searchStr: '',
      pager: { // 分页数据
        total: 0, // 数据总条数
        pageSize: 10, // 单页数据条数
        pageIndex: 1, // 当前页码
        selectCount: 0 // 选中数据的条数
      }
    }
  },
  methods: {
    getQueryParam(key){
      let query = Qs.parse(location.search.substring(1))
      let val = ''
      eval('val = query.' + key)
      return val
    },
    setQuery2Value(key){
      let query = Qs.parse(location.search.substring(1))
      let js = 'let val = query.' + key + '; if(val) this.' + key + ' = val;'
      eval(js)
    },
    initData(){
      this.pager.pageIndex = 1
      this.initPageData(false)
    },

    searchStrEvent(){
      this.pager.pageIndex = 1
      this.initPageData(false)
    },
    mouseoverEvent(){
      this.showTipDbSelect = true
    },
    mouseoutEvent(){
      this.showTipDbSelect = false
    },
    mousemoveEvent(event){
      this.left = event.clientX
      this.top = event.clientY + 6
    },
    // 单击选择事件
    selectEvent (data) {
      this.selectValue = selectClick(this.selectType, this.selectValue, data)
    },
    // 双击选择事件
    dblclickEvent (data) {
      var that = this
      selectdbClick(this.selectType, this.selectValue, data, that)
    },
    selectConfirmEvent () {
      var that = this
      selectConfirm(this.selectType, this.selectValue, that)
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
          pageIndex: this.pager.pageIndex
        }
      }
      Object.assign(params, options && options.data || []);
      this.ajaxJson({
        url:url,
        data:params,
        call: (data) => {
          // 列表数据赋值，没有数据时为空数组
          this.content = data.content || []
          // 将数据总条数赋值给分页控件
          this.pager.total = data.count
          // 判断是否空数据
          this.empty = this.content.length == 0
          options && options.all && options.all(data)
          if (initVal) {
            // 赋值最后添加的数据
            options && options.init && options.init(data)
          }
        }
      })
    }
  },
  computed: {
    // 检查是否选中
    checkSelect () {
      return function (id) {
        return selectComputedSelected(this.selectValue, id)
      }
    },
    getLeft(){
      return this.left + 'px'
    },
    getTop(){
      return this.top + 'px'
    }
  },
  watch: {
    'pager.pageIndex':{
      handler: function (val, oldval) {
        this.allCheck = false
      }
    },
    selectValue: {
      handler: function (val, oldval) {
        this.pager.selectCount = val.length
        //判断当前页数据是否全选
        let check = true
        for(let i in this.content){
          let id = this.content[i].id
          let sign = false
          if(this.selectValue.length > 0){
            for (var j = 0; j < this.selectValue.length; j++){
              if(Object.keys(this.selectValue[j])[0] === id){
                sign = true
              }
            }
          }
          if(!sign){
            check = false
          }
        }
        this.allCheck = check
        if(this.totalMethod){
          this.totalMethod()
        }
      },
      deep: true
    }
  },
  created () {
    this.setQuery2Value('selectType')
    if(this.initPageData) {
      this.$nextTick(() =>{
        this.initPageData(true)
      })
    }
  }
}

export {
  selectmixin
}
