//////////////////验证相关 Start
//正则
var rules = {
  'RS00001': '/^[1-9]+$|^[1-9][0-9]+$/', //大于0的整数
  'RS00002': '/^(0)$|^[1-9]+$|^[1-9][0-9]+$/', //大于等于0的整数
  'RS00003': '/^[1-9]\\d*$|^[1-9]\\d*[\\.]\\d+$|^[0][.]\\d*[1-9]\\d*$/', //大于0的所有数字
  'RS00004': '/^(0)$|^[0][\\.]\\d*$|^[1-9]\\d*$|^[1-9]\\d*[\\.]\\d+$|^[0][.]\\d*[1-9]\\d*$/', //大于等于0的所有数字
  "RS00005": "/^1[3456789]\\d{9}$/", //手机号码
  "RS00006": "/^[1-9]\\d{5}(18|19|([23]\\d))\\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\\d{3}[0-9Xx]$/", //验证身份证号
  "RS00007": "/^-?(0\\.\\d*[1-9]+\\d*)$/", //验证大于0小于1
  "RS00008": "/^[\u4e00-\u9fa5 ]{2,5}$/", //验证中文姓名
  "RS00009":"/^(([京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领][A-Z](([0-9]{5}[DF])|([DF]([A-HJ-NP-Z0-9])[0-9]{4})))|([京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领][A-Z][A-HJ-NP-Z0-9]{4}[A-HJ-NP-Z0-9挂学警港澳使领]))$/", //验证车牌号
  "RS00010": "/^\\d{16}$/", //验证16位纯数字
  "RS00011": "/^\\d{18}$/", //验证18位纯数字
  "RS00012": "/^(?:0|\\-?(?:0\\.\\d*[0-9]|[0-9]\\d*(?:\\.\\d*[0-9])?))$/",  //验证数字格式   正负都可以是纯数字
  //"RS00012": "/^(?:0|\\-?(?:0\\.\\d*[1-9]|[1-9]\\d*(?:\\.\\d*[1-9])?))$/",  //验证数字格式   正负都可以是纯数字
  "RS00013": "/^\\d{0,3}$/", //验证最多3位纯数字
  "RS00014": "/^(\\d|[1-9]\\d|100)(\\.\\d{1,2})?$/", //大于0，小于等于100，并且最多保留两位小数。
  "RS00015": "/^[a-zA-Z0-9]{17}$/", //车架号
  "RS00016": "/^[a-zA-Z0-9]{7,8}$/", //发动机号
}
//验证规则
var rule = {
    R0000:{empty:"*",emptyMessage:"不能为空",rules:"",errormessage:""},                   //非空验证
    R1000:{empty:"*",emptyMessage:"不能为空",rules:"RS00001",errormessage:"格式错误"},    //大于0的整数不能为空且格式必须正确
    R1001:{empty:"",emptyMessage:"",rules:"RS00001",errormessage:"格式错误"},    //大于0的整数可以为空如果输入格式必须正确
    R2000:{empty:"*",emptyMessage:"不能为空",rules:"RS00002",errormessage:"格式错误"},  //大于等于0的整数不能为空且格式必须正确
    R3000:{empty:"*",emptyMessage:"不能为空",rules:"RS00003",errormessage:"格式错误"} ,  //大于0的所有数字不能为空且格式必须正确
    R4000:{empty:"*",emptyMessage:"不能为空",rules:"RS00005",errormessage:"格式错误"} ,  //验证手机号
    R5000:{empty:"*",emptyMessage:"不能为空",rules:"RS00006",errormessage:"格式错误"} ,  //验证身份证号
    R6000:{empty:"*",emptyMessage:"不能为空",rules:"RS00007",errormessage:"格式错误"} ,  //验证大于0小于1
    R7000:{empty:"*",emptyMessage:"不能为空",rules:"RS00008",errormessage:"格式错误"} ,  //验证中文姓名
    R8000:{empty:"*",emptyMessage:"不能为空",rules:"RS00009",errormessage:"请输入正确的车牌号,如京A12345"} ,  //验证车牌号
    R9000:{empty:"*",emptyMessage:"不能为空",rules:"RS00010",errormessage:"格式错误"} ,  //验证16位纯数字
    R1100:{empty:"*",emptyMessage:"不能为空",rules:"RS00011",errormessage:"格式错误"} ,  //验证18位纯数字
    R1200:{empty:"*",emptyMessage:"不能为空",rules:"RS00012",errormessage:"格式错误"} ,  //验证数字格式   正负都可以是纯数字
    R1300:{empty:"*",emptyMessage:"不能为空",rules:"RS00013",errormessage:"格式错误"} ,  //验证最多3位纯数字
    R1400:{empty:"*",emptyMessage:"不能为空",rules:"RS00014",errormessage:"格式错误"} ,  //大于0，小于等于100，并且最多保留两位小数。
    R1500:{empty:"*",emptyMessage:"不能为空",rules:"RS00004",errormessage:"格式错误"} ,  //大于等于0的所有数字
    R1600:{empty:"*",emptyMessage:"不能为空",rules:"RS00015",errormessage:"车架号为17位,请仔细核查"} ,
    R1700:{empty:"*",emptyMessage:"不能为空",rules:"RS00016",errormessage:"发动机号为7-8位,请仔细核查"} ,
    R1800:{empty:"*",emptyMessage:"不能为空",rules:"RS00004",errormessage:"不能为负数"} ,  //不能为空并且不能为负数
}

function verify(value,ruleKey) {
  var result = {key:true,value:'',category:-1}
  var r = rule[ruleKey]
  value = value.replace(/\s/g,"")
  if(r){
    if(r.empty === '*'){
      if (value === ""){
        result.key = false;
        result.value = r.emptyMessage
        result.category = 0
      }
      else{
        if(r.rules !== ''){
          if(!eval(rules[r.rules]).test(value)){
            result.key = false;
            result.value = r.errormessage
            result.category = 1
          }
        }
      }
    }
    else{
      if(r.rules !== ""){
        if(!eval(rules[r.rules]).test(value)){
          result.key = false
          result.value = r.errormessage
          result.category = 1
        }
      }
    }
  }
  return result
}

//////////////////验证相关 End

//格式化日期
function formatDate(date){
  return date.getFullYear()  + '-' + format(date.getMonth() + 1) + '-' + format(date.getDate())
  function format(val){
    if (val == undefined || val == '') {
      return ''
    }
    var result = val + ''
    if(result.length < 2){
      result = '0' + result
    }
    return result
  }
}
//格式化中文日期
function formatCnDate(date)
{
  var date = new Date(date);
  var year = date.getFullYear()
  var month = (date.getMonth() + 1) < 10 ? '0' + (date.getMonth() + 1) : (date.getMonth() + 1);
  date = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
  date = '' + year + month + date + '';
  var b = new Array("零", "壹", "贰", "叁", "肆", "伍", "陆", "柒", "捌", "玖");
  year = b[date.substring(0, 1)] + b[date.substring(1, 2)] + b[date.substring(2, 3)] + b[date.substring(3, 4)];
  month = date.substring(4, 6) < 10 ? b[date.substring(4, 5)] + b[date.substring(5, 6)] : date.substring(4, 6) == 10 ?
    '零壹拾' : b[date.substring(4, 5)] + '拾' + b[date.substring(5, 6)];
  date = date.substring(6, 8) < 10 ? b[date.substring(6, 7)] + b[date.substring(7, 8)] : date.substring(6, 8) == 10 ||
  date.substring(6, 8) == 20 || date.substring(6, 8) == 30 ? '零' + b[date.substring(6, 7)] + '拾' : b[date.substring(6,7)] + '拾' + b[date.substring(7, 8)];
  return year + '年' + month + '月' + date + '日';
}


//格式化日期Html格式添加周几
function formatDateHtml (date) {
  var weekday=["周日","周一","周二","周三","周四","周五","周六"]
  let index = new Date(date).getDay()
  let week = weekday[index]
  if(index === 0 || index === 6){
    week = "<span class='weeklast'>" + week + "<span>"
  }
  return date + "&nbsp;" + week
}

function formatTime (date) {
  return date.getFullYear()  + '-' + format(date.getMonth() + 1) + '-' + format(date.getDate()) + ' ' + format(date.getHours()) + ':' + format(date.getMinutes()) + ':' + format(date.getSeconds())
  function format(val){
    if (val === undefined || val === '') {
      return ''
    }
    var result = val + ''
    if(result.length < 2){
      result = '0' + result
    }
    return result
  }
}

//加法
function accMul (arg1, arg2) {
  var m = 0, s1 = arg1 + "", s2 = arg2 + "";
  try { m += s1.split(".")[1].length } catch (e) { }
  try { m += s2.split(".")[1].length } catch (e) { }
  return Number(s1.replace(".", "")) * Number(s2.replace(".", "")) / Math.pow(10, m)
}

//乘法
function accAdd(arg1, arg2) {
  var r1, r2, m;
  try { r1 = arg1.toString().split(".")[1].length } catch (e) { r1 = 0 }

  try { r2 = arg2.toString().split(".")[1].length } catch (e) { r2 = 0 }

  m = Math.pow(10, Math.max(r1, r2));
  return (accMul(arg1, m) + accMul(m, arg2)) / m
}

//生成Guid
function guid() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
    return v.toString(16).toLocaleUpperCase()
  });
}

//选择页面相关
function selectClick (selectType,selectValue,data) {
  if(selectType === "0"){
    //单选
    if(selectValue.length === 1){
      if(Object.keys(selectValue[0])[0] === data.id){
        selectValue =[]
      }
      else{
        selectValue =[]
        var val = {}
        val[data.id] = data;
        selectValue.push(val)
      }
    }
    else{
      var val = {}
      val[data.id] = data
      selectValue.push(val)
    }
  }
  else{
    //多选
    var sign = true
    if(selectValue.length > 0){
      for (var i = 0; i < selectValue.length; i++){
        if(Object.keys(selectValue[i])[0] === data.id){
          selectValue.splice(i,1)
          sign = false
          break;
        }
      }
    }
    if(sign) {
      var val = {}
      val[data.id] = data
      selectValue.push(val)
    }
  }
  return selectValue
}

function selectdbClick (selectType,selectValue,data,that) {
  if(selectType === "0"){
    //单选
    that.$dialog.setReturnValue(data)
    that.$dialog.close()
  }
  else{
    //多选
    var sign = true
    if(selectValue.length > 0){
      for (var i = 0; i < selectValue.length; i++){
        if(Object.keys(selectValue[i])[0] === data.id){
          sign = false
          break
        }
      }
    }
    if(sign){
      var val = {}
      val[data.id] = data
      selectValue.push(val)
    }

    var resultValue = [];
    for (var i = 0; i < selectValue.length; i++){
      var key = Object.keys(selectValue[i])[0]
      resultValue.push(selectValue[i][key])
    }
    that.$dialog.setReturnValue(resultValue)
    that.$dialog.close();
  }
}

function selectConfirm(selectType,selectValue,that){
  if(selectValue.length == 0){
    that.$dialog.confirm({
      tipValue:'您没有选择任何项，确定关闭此页面吗？',
      width:400,
      okCallBack:()=> {
        that.$dialog.close()
      }
    })
  }
  else {
    if(selectType === '0'){
      //单选
      that.$dialog.setReturnValue(selectValue[0][Object.keys(selectValue[0])[0]])
      that.$dialog.close()
    }
    else{
      //多选
      var resultValue = []
      for (var i = 0; i < selectValue.length; i++){
        var key = Object.keys(selectValue[i])[0]
        resultValue.push(selectValue[i][key])
      }
      that.$dialog.setReturnValue(resultValue)
      that.$dialog.close()
    }
  }
}

function selectComputedSelected(selectValue,id){
  var resultValue = false
  for (var i = 0; i < selectValue.length; i++){
    if(Object.keys(selectValue[i])[0] === id){
      resultValue = true
      break;
    }
  }
  return resultValue
}

/************ 金额转中文大写 Start **************/
function number2chinese(str) {
  if(isNaN(str)){
    return ''
  }
  var num = parseFloat(str)
  var strOutput = "",
    strUnit = '仟佰拾亿仟佰拾万仟佰拾元角分'
  num += '00'
  var intPos = num.indexOf('.')
  if (intPos >= 0){
    num = num.substring(0, intPos) + num.substr(intPos + 1, 2)
  }
  strUnit = strUnit.substr(strUnit.length - num.length)
  for (var i=0; i < num.length; i++){
    strOutput += '零壹贰叁肆伍陆柒捌玖'.substr(num.substr(i,1),1) + strUnit.substr(i,1)
  }
  return strOutput.replace(/零角零分$/, '整').replace(/零[仟佰拾]/g, '零').replace(/零{2,}/g, '零').replace(/零([亿|万])/g, '$1').replace(/零+元/, '元').replace(/亿零{0,3}万/, '亿').replace(/^元/, "零元")
}
/************ 金额转中文大写 End **************/

/************ 数字万位分割 Start **************/
function tenThousandFormat(data){
  if(isNaN(data)){
    return "0.00"
  }
  else if(data === ''){
    return ''
  }
  else{
    let index = data.indexOf(".")
    if(index === -1) {
      data = parseFloat(data).toFixed(2)
    }
    index = data.indexOf(".")
    let before = data.substring(0,index)
    let after = data.substring(index,data.length)
    before = before.split('').reverse().join('')
    before = before.replace(/(\d{4})(?=\d)/g,'$1,')
    before = before.split('').reverse().join('')
    return before + after
  }
}
function tenThousandFormatHtml(data){
  if(isNaN(data)){
    return "0.<u class=\"moneyDecimal\">00</u>"
  }
  else{
    let index = data.indexOf(".")
    if(index === -1) {
      data = parseFloat(data).toFixed(2)
    }
    index = data.indexOf(".")
    let before = data.substring(0,index)
    if(before.length > 12){
      return "数字太大"
    }
    let after = data.substring(index + 1,data.length)
    if(after.length === 1){
      after = after + '0'
    }
    after = ".<u class=\"moneyDecimal\">" + after + "</u>"
    before = before.split('').reverse().join('')
    before = before.replace(/(\d{4})(?=\d)/g,'$1,')
    before = before.split('').reverse().join('')

    before = before.split(",").reverse()
    for(var i = 1;i < before.length; i++){
      if(i === 1){
        before[i] = "<b>" + before[i] + "</b>"
      }
      else if (i === 2){
        before[i] = "<b class=\"moneyBillion\">" + before[i] + "</b>"
      }
    }
    before = before.reverse().join(',')

    return before + after
  }
}
/************ 数字万位分割 End **************/

/******************** 格式化手机号码 ****************************/
function formatPhone (data) {
  let result = ''
  if(data != null && data.length <= 11){
    result = data.substring(0,3) + ' ' + data.substring(3,7) + ' ' + data.substring(7,11)
  }
  return result
}

/******************** 格式化身份证 ****************************/
function formatIdNo (data) {
  let result = ''
  if(data != null && data.length <= 18){
    result = data.substring(0,6) + ' ' + data.substring(6,14) + ' ' + data.substring(14,18)
  }
  return result
}

/******************** 按规则回显 ************************/
function formatCustomizeTip (val,rule) {
  let index = 0,end = rule.length - 1
  for(let i = 0; i < rule.length; i++){
    index = accAdd(rule[i],index)
    if(val.length <= index){
      end = i
      break
    }
  }
  let result = '',next = 0
  index = 0
  for(let i = 0; i <= end; i++){
    next = index
    index = accAdd(rule[i],index)

    if(i === end){
      if(i == 0){
        result = val
      }
      else{
        // console.log('next:'+next)
        // console.log('val.length:'+val.length)
        result += ' ' + val.substring(next,val.length)
      }
    }
    else{
      if(result !== ''){
        result += ' '
      }
      result += val.substring(next,index)
    }
  }
  return result
}


function getDayNumByYearMonth(year,month){
  switch (month) {
    case 1:
    case 3:
    case 5:
    case 7:
    case 8:
    case 10:
    case 12:
      return 31;
      break;
    case 4:
    case 6:
    case 9:
    case 11:
      return 30;
      break;
    case 2:
      return isLeapYear(year) ? 29 : 28;
  }
}

function isLeapYear(year){
  if(year % 4 === 0 && year%100 !== 0 || year%400 === 0){
    return true
  }else{
    return false
  }
}

function zero(num) {
  if(isNaN(num)){
    return ''
  }else{
    if(num < 10){
      num = '0' + num
    }
  }

  return num
}

export{
  zero,getDayNumByYearMonth,accMul,accAdd,guid,selectClick,selectdbClick,selectConfirm,selectComputedSelected,verify,formatDate,number2chinese,formatCnDate,tenThousandFormat,formatDateHtml,tenThousandFormatHtml,formatTime,formatPhone,formatIdNo,formatCustomizeTip
}
