import {formatDate,accAdd} from '@/assets/common.js'

//获取日期是否属于指定月份
function getCurrentMonthByDateApp(date,month) {
  return parseInt(accAdd(new Date(date).getMonth(),1)) === parseInt(month)
}

//获取当天
function getCurrentDate () {
  return formatDate(new Date())
}

//获取日期年份
function getCurrentYear(date){
  if(date){
    return new Date(date).getFullYear()
  }
  return new Date().getFullYear()
}

//获取日期月份
function getCurrentMonth(date){
  if(date){
    return new Date(date).getMonth() + 1
  }
  return new Date().getMonth() + 1
}

//获取年份
function returnYear(year,count) {
  return accAdd(year,count)
}

//根据年份和月份和数字获取日期
function returnDate(year,month,count) {
  var date = new Date(year + '-' + month + '-01')
  date = new Date(date.setMonth(accAdd(date.getMonth(),count)))
  return date
}

//根据年份和月份获取开始时间
function getPanelDatesApp(year,month) {
  var date = new Date(year + '-' + month + '-01')
  var week = date.getDay()
  if(week === 0){
    week = 7
  }
  date.setDate(date.getDate() - week);
  var arr = []
  for (var i = 0; i < 6; i++){
    var arrChild = []
    for (var j = 0; j < 7; j++){
      arrChild.push(formatDate(date))
      date.setDate(date.getDate() + 1);
    }
    arr.push(arrChild)
  }
  return arr
}

function  getYearsByChooseYear(year) {
  let start = accAdd(year,-10)
  var arr = []
  let index = 0
  for (var i = 0; i < 6; i++){
    var arrChild = []
    for (var j = 0; j < 3; j++){
      arrChild.push(accAdd(start,index))
      index++
    }
    arr.push(arrChild)
  }
  return arr
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

export{
  getPanelDatesApp,getCurrentMonthByDateApp,getCurrentDate,getCurrentYear,getCurrentMonth,getWeekByDate,isWeekEnd,returnDate,returnYear,getYearsByChooseYear,getRange
}
