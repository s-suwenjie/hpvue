import {formatDate,accAdd} from '@/assets/common.js'

//获取日期是否属于指定月份
function getCurrentMonthByDate(date,month) {
  return parseInt(accAdd(new Date(date).getMonth(),1)) === parseInt(month)
}

//根据参数获取日期
function getDate (value) {
  let date = new Date()
  if (value !== '') {
    date = new Date(value)
  }
  return date
}

function getSelectYear(start,count) {
  let arr = []
  for(var i = 0,start = start; i < count; i++,start++){
    arr.push(start)
  }
  return arr
}

//根据年份和月份获取开始时间
function getPanelDates(year,month) {
  var date = new Date(year + '-' + month + '-01')
  var week = date.getDay()
  if(week === 0){
    week = 7
  }
  date.setDate(date.getDate() - week);
  var arr = []
  for (var i = 0; i < 42; i++){
    arr.push(formatDate(date))
    date.setDate(date.getDate() + 1);

  }
  return arr
}

//获取年份
function returnYear(year,count) {
  return accAdd(year,count)
}

//获取月份
function returnDate(year,month,count) {
  var date = new Date(year + '-' + month + '-01')
  date = new Date(date.setMonth(accAdd(date.getMonth(),count)))
  return date
}

//格式化月份和日子
function formatMonthOrDate(val){
  if (val == undefined || val == '') {
    return ''
  }
  var result = val + ''
  if(result.length < 2){
    result = '0' + result
  }
  return result
}

//获取周几
function getWeekByDate(data) {
  var weekday=["周日","周一","周二","周三","周四","周五","周六"];
  return weekday[new Date(data).getDay()]
}

//判断是否周六周日
function isWeekEnd(data) {
  var week = new Date(data).getDay();
  return week === 0 || week === 6
}

//根据最小值最大值判断日期是否在此区间
function getRange(min,max,date){
  var result = true
  if(min && min !== ''){
    if(new Date(min).getTime() > new Date(date).getTime()){
      result = false
    }
  }
  if(max && max !== ''){
    if(new Date(max).getTime() < new Date(date).getTime()){
      result = false
    }
  }
  return result
}

function getReadySelectRange(start,end,date) {
  var result = false
  if(new Date(start).getTime() > new Date(end).getTime()){
    var temp = start
    start = end
    end = temp
  }
  if(new Date(date).getTime() > new Date(start).getTime() && new Date(date).getTime() < new Date(end).getTime()){
    result = true
  }
  return result
}

//返回日期选择范围
function confirmSelectRange(start,end) {
  if(new Date(start).getTime() > new Date(end).getTime()){
    var temp = start
    start = end
    end = temp
  }
  return {start:start,end:end}
}

export{
  getSelectYear,getDate,isWeekEnd,getWeekByDate,returnYear,returnDate,formatMonthOrDate,getPanelDates,getCurrentMonthByDate,getRange,getReadySelectRange,confirmSelectRange
}
