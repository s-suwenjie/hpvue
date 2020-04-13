import {formatDateHtml,tenThousandFormatHtml} from '@/assets/common.js'
import Qs from 'qs'
const managermixin = {
  provide(){
    return{
      p____page:this
    }
  },
  data(){
    return{
      /*固定属性*/
      isSelected:false,//显示选中信息  按钮
      sortTh: [], // 排序表头，固定写法，如需其他逻辑，表头需要排序的话，这个是必须的
      choose: false, // 选择区域是否打开
      content: [], // 接收列表数据
      empty: true, // 列表数据是否为空
      shortcutSearchContent: [], // 查询历史TOP5
      lastData: '', // 最后添加的记录
      allCheck:false,
      selectValue: [], // 选中的记录
      searchStr: '', // 搜索字符串
      orderColumn: 'insertDate', // 排序的列
      order: 'desc', // 排序的顺序
      pager: {
        total: 0, // 总条数
        pageSize: 15, // 每页条数
        pageIndex: 1, // 当前页码
        selectCount: 0 // 选中条数
      }
    }
  },
  methods: {
    // 筛选事件
    initChoose (op) {
      this.pager.pageIndex = 1
      this.selectValue = []
      this.initPageData(false)
    },
    setQuery2Value(key){
      let query = Qs.parse(location.search.substring(1))
      let js = 'let val = query.' + key + '; if(val) this.' + key + ' = val;'
      eval(js)
    },
    // 显示隐藏筛选
    switchChoose (op) {
      this.choose = !this.choose
    },
    //格式化日期带周几
    formatDateShow (data) {
      return formatDateHtml(data)
    },
    //万位分割金额，字体变色和缩放
    tenThousandFormatShow(data){
      return tenThousandFormatHtml(data)
    },
    initData(){
      this.pager.pageIndex = 1
      this.initPageData(false)
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
          init: initVal,
          pageSize: this.pager.pageSize
        }
      } else {
        params = {
          init: initVal,
          orderColumn: this.orderColumn,
          order: this.order,
          searchStr: this.searchStr,
          pageIndex: this.pager.pageIndex,
          pageSize: this.pager.pageSize
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
          // 赋值查询历史Top5
          this.shortcutSearchContent = data.shortcutSearchContent
          // 判断是否空数据
          this.empty = this.content.length == 0
          options && options.all && options.all(data)
          if (initVal) {
            // 赋值最后添加的数据
            this.lastData = data.lastData
            options && options.init && options.init(data)
          }
        }
      })
    }

  },
  watch: {
    content:{
      handler: function (val, oldval) {
        let check = true
        for(let i = 0; i < val.length; i++){
          if(this.selectValue.indexOf(val[i].id) === -1){
            check = false
            break
          }
        }
        this.allCheck = check
      },
      deep: true
    },
    selectValue: {
      handler: function (val, oldval) {
        this.pager.selectCount = val.length
        let check = true
        for(let i = 0; i < this.content.length; i++){
          if(val.indexOf(this.content[i].id) === -1){
            check = false
            break
          }
        }
        this.allCheck = check
        if(this.selectedSum) {
          if (this.selectValue.length > 0) {
            this.selectedSum()
            this.isSelected = true
          } else {
            this.isSelected = false
            this.initPageData(false)
          }
        }
      },
      deep: true
    }
  },
  computed: {
    // 检查是否选中
    checkSelect () {
      return function (id) {
        return this.selectValue.indexOf(id) !== -1
      }
    },
    getPsdSelectItem(){
      return function(psd,value) {
        let result = {}
        if (psd !== null && psd.length > 0) {
          for (let i = 0; i < psd.length; i++) {
            if (psd[i].num === value) {
              result = psd[i]
              break
            }
          }
        }
        return result
      }
    },
    getPsdSelectItemColor(){
      return function (psd,value) {
        let item = this.getPsdSelectItem(psd,value)
        let color = ''
        if(item.code.indexOf('#') !== -1){
          color = item.code
        }
        if(item.img.indexOf('#') !== -1){
          color = item.img
        }
        return color
      }
    }
  },

  created () {
    if(this.initPageData) {
      this.initPageData(true)
    }
  }
}

//选择项
function selectItem (selectValue,data) {
  let index = selectValue.indexOf(data.id)
  if(index === -1){
    selectValue.push(data.id)
    selectValue[data.id] = data
  }
  else{
    selectValue[data.id] = null
    selectValue.splice(index,1)
  }
  return selectValue
}



export{
  selectItem,managermixin
}
