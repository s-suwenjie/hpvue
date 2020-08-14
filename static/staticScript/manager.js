// 鼠标移入
function ManagerListMonseOver (obj, className, op) {
  if (op == 0) {
    $(obj).css('cursor', 'pointer')
  }
  $(obj).addClass(className)
}

//鼠标移入
function ManagerListMonseOut (obj, className) {
  $(obj).removeClass(className)
}

// 展开收起筛选
function SwitchChoose (op) {
  if (op == 0) {
    $('#btnShowChoose').hide()
    $('#btnHideChoose').show()
    $('#chooseDiv').show()
  } else {
    $('#btnShowChoose').show()
    $('#btnHideChoose').hide()
    $('#chooseDiv').hide()
  }
}

var ____IsSearchEvent = 0
var ____DeleteSearchStr = 0

//初始化变量为搜索框事件
function InitSearchEvent () {
  ____IsSearchEvent = 1
}

function SearchMouseOver () {
  ____DeleteSearchStr = 1
  $('#btnDeleteSearchStr').show()
}

function SearchMouseOut () {
  if (____DeleteSearchStr == 1) {
    $('#btnDeleteSearchStr').hide()
  }
}

//快捷查询
function ShortcutSearch (ID, Val) {
  $('#' + ID).val(Val)
  InitPageData(1)
}

function DeleteSearchMouseOver () {
  ____DeleteSearchStr = 2
  $('#btnDeleteSearchStr').show()
}

function DeleteSearchMouseOut () {
  ____DeleteSearchStr = 0
  $('#btnDeleteSearchStr').hide()
}

function DeleteSearchStr () {
  if ($('#SearchStr').val() != '') {
    $('#SearchStr').val('')
    $('#SearchStr').change()
  }
}

//搜索框键盘事件
function SearchKeyUp (eventTag) {
  //初始化变量为搜索框事件
  InitSearchEvent()
  var event = eventTag || window.event
  var k = event.charCode || event.keyCode
  if (k == 13) {
    InitPageData(1)
  }
}

//分页控件输入纯数字
function ConfineNum () {
  $('body').on('keydown', '.PageTextBox', function (eventTag) {
    var event = eventTag || window.event
    var k = event.charCode || event.keyCode
    if ((k >= 48 && k <= 57) || (k >= 96 && k <= 105) || k == 8 || k == 46 || k == 9 || k == 37 || k == 39 || k == 13) {
      if (k == 13) {
        InitPageData()
      }
    } else {
      return false
    }
  })
}

function InitPageDataBase (pageIndex, call, controller, otherCall) {
  if (!pageIndex) {
    pageIndex = $('#pageIndex').val()
  }
  if (parseInt($('#pageIndex').attr('count')) < parseInt(pageIndex)) {
    pageIndex = $('#pageIndex').attr('count')
  }
  pageIndex = parseInt(pageIndex) < 1 ? 1 : pageIndex
  var pageSize = $('#pageSize').val()
  var postData = '&PageIndex=' + pageIndex + '&PageSize=' + pageSize + '&SearchStr=' + $('#SearchStr').val().trim() + '&totalCount=' + $('#totalCount').val() + '&OrderColumn=' + $('#OrderColumn').val() + '&Order=' + $('#Order').val()
  var ____MenuID = $('#____MenuID').val()
  if (!____MenuID) {
    ____MenuID = ''
  }
  postData += '&menuID=' + ____MenuID
  var otherParam = ''
  if (call) {
    otherParam = call()
  }
  postData += otherParam
  //选中的项
  var SelectItem = $.GetValueByClassName('____Select')
  postData += '&SelectItem=' + SelectItem
  $.AjaxJson(controller, postData, function (data) {
    if (data.type == 0) {
      $('#tbodyContent').html(data['content'])
      $('#divEmptyData').html(data['emptyContent'])
      $('#divTotal').html(data['total'])
      $('#divPager').html(data['pager'])
      var ShortcutSearchContent = data['shortcutSearchContent']
      $('#dicShortcutSearchContent').html(ShortcutSearchContent)
      if (ShortcutSearchContent == '') {
        $('#dicdicShortcutSearch').addClass('hide')
      } else {
        $('#dicdicShortcutSearch').removeClass('hide')
      }
      if (otherCall) {
        otherCall(data)
      }
      //初始化样式
      InitStyle()
    }
  }, 'init')
}

function InitNavigationPageDataBase (pageIndex, navigationViewType, call, controller, otherCall) {
  if (!pageIndex) {
    pageIndex = $('#pageIndex').val()
  }
  if (parseInt($('#pageIndex').attr('count')) < parseInt(pageIndex)) {
    pageIndex = $('#pageIndex').attr('count')
  }
  pageIndex = parseInt(pageIndex) < 1 ? 1 : pageIndex
  var pageSize = $('#pageSize').val()
  var postData = '&PageIndex=' + pageIndex + '&PageSize=' + pageSize + '&SearchStr=' + $('#SearchStr').val().trim() + '&totalCount=' + $('#totalCount').val() + '&OrderColumn=' + $('#OrderColumn').val() + '&Order=' + $('#Order').val()
  var otherParam = ''
  if (call) {
    otherParam = call()
  }
  postData += otherParam
  //选中的项
  var SelectItem = $.GetValueByClassName('____Select')
  postData += '&SelectItem=' + SelectItem
  $.AjaxJson(controller[navigationViewType], postData, function (data) {
    if (data.type == 0) {
      $('#tbodyContent').html(data['content'])
      $('#divEmptyData').html(data['emptyContent'])
      $('#divTotal').html(data['total'])
      $('#divPager').html(data['pager'])
      var ShortcutSearchContent = data['shortcutSearchContent']
      $('#dicShortcutSearchContent').html(ShortcutSearchContent)
      if (ShortcutSearchContent == '') {
        $('#dicdicShortcutSearch').addClass('hide')
      } else {
        $('#dicdicShortcutSearch').removeClass('hide')
      }
      if (otherCall) {
        otherCall(data)
      }
      //初始化样式
      InitStyle()
    }
  }, 'init')
}

//表头拉动
function InitTableMoveTab () {
  if ($('.tableMoveTab').length > 0) {
    $('.tableMoveTab').resizableColumns({})
  }
}

//排序事件
function OrderSort (orderName, obj) {
  var OrderColumn = $('#OrderColumn').val()
  $('.movetab').each(function () {
    $(this).removeClass('sorting_asc')
    $(this).removeClass('sorting_desc')
  })
  if (OrderColumn == orderName) {
    //排序字段相同，颠倒顺序
    var Order = $('#Order').val()
    obj = $(obj).parents('th')
    if (Order == 'DESC') {
      Order = 'ASC'
      obj.addClass('sorting_asc')
    } else {
      Order = 'DESC'
      obj.addClass('sorting_desc')
    }
    $('#Order').val(Order)
  } else {
    //排序字段不同，倒顺序排列
    $('#OrderColumn').val(orderName)
    $('#Order').val('DESC')
    obj = $(obj).parents('th')
    obj.addClass('sorting_desc')
  }
  InitPageData()
}

//统一的筛选事件
function BaseInitFilterButtonClickEvent (call, IsChange, IsChangeKey) {
  $('.QuitButton').each(function () {
    if ($(this).attr('t') && !$(this).attr('tt')) {
      $(this).click(function () {
        ____IsSearchEvent = 0
        var t = $(this).attr('t')
        var sign = true
        if (IsChangeKey && IsChangeKey != '') {
          var IsChangeKeyArray = IsChangeKey.split('☆')
          var IsChangeArray = IsChange.split('☆')
          for (var i = 0; i < IsChangeKeyArray.length; i++) {
            if (IsChangeKeyArray[i] == t) {
              if (IsChangeArray[i] != 0) {
                sign = false
              }
            }
          }
        }
        if (sign) {
          var str = $(this).val()
          if ($('#' + t).val() != str) {
            if (t) {
              $('.QuitButton').each(function () {
                if ($(this).attr('t') == t) {
                  $(this).removeClass('QuitButtonOn')
                }
              })
            }
            $(this).addClass('QuitButtonOn')
            if (call) {
              call(t, this)
            }
          }
        }
      })
    }
  })
}

//选择或者取消选择当前页的复选框
function CheckAll () {
  var chenked = false
  var src = $('#imgCheckAll').children('img').first().attr('src')
  if (src.indexOf('check.png') == -1) {
    //当前选中
    src = src.replace('checked.png', 'check.png')
  } else {
    //当前没有选中
    chenked = true
    src = src.replace('check.png', 'checked.png')
  }
  $('#imgCheckAll').children('img').first().attr('src', src)
  $('.ItemChk').each(function () {
    if ($(this).get(0).tagName == 'IMG') {
      $(this).attr('src', src)
      var id = $(this).attr('id')
      var obj = $('#Select' + id)
      if (obj.get(0)) {
        obj.remove()
      }
      if (chenked) {
        $('#divPagerHide').append('<input type="text" id="Select' + id + '" class="____Select" value="' + id + '" />')
      }
    }
  })
  $('#PagerSelectCount').text($('.____Select').length)
}

//初始化全选按钮
function InitSelectAllBtn () {
  if ($('#imgCheckAll').get(0)) {
    var chenked = true
    if ($('.ItemChk').length == 0) {
      chenked = false
    } else {
      $('.ItemChk').each(function () {
        if ($(this).get(0).tagName == 'IMG') {
          var src = $(this).attr('src')
          if (src.indexOf('checked.png') == -1) {
            chenked = false
          }
        }
      })
    }
    var src = $('#imgCheckAll').children('img').first().attr('src')
    if (chenked) {
      src = src.replace('check.png', 'checked.png')
    } else {
      src = src.replace('checked.png', 'check.png')
    }
    $('#imgCheckAll').children('img').first().attr('src', src)
  }
}

//点击checkbox复选框事件
function ItemChkClick (obj, ID) {
  var chenked = false
  var src = $(obj).attr('src')
  if (src.indexOf('check.png') == -1) {
    //当前选中
    src = src.replace('checked.png', 'check.png')
  } else {
    //当前没有选中
    chenked = true
    src = src.replace('check.png', 'checked.png')
  }
  $(obj).attr('src', src)
  var objHide = $('#Select' + ID)
  if (objHide.get(0)) {
    objHide.remove()
  }

  if (chenked) {
    $('#divPagerHide').append('<input type="text" id="Select' + ID + '" class="____Select" value="' + ID + '" />')
  }

  //初始化全选按钮
  InitSelectAllBtn()
  $('#PagerSelectCount').text($('.____Select').length)
}

//最后一条添加的闪烁
function InitTopItemFlicker () {
  var topItem = $('#topItem').val()
  $('.ItemChk').each(function () {
    if ($(this).get(0).tagName == 'IMG') {
      var ID = $(this).attr('id')
      if (ID && topItem == ID) {
        var obj = $(this)
        var index = 0
        setInterval(function () {
          if (index == 0) {
            index = 1
            obj.parent().parent().parent().addClass('trflicker')
          } else {
            index = 0
            obj.parent().parent().parent().removeClass('trflicker')
          }
        }, 600)
      }
    }
  })
}

//切换导航视图
function switchNavigationBase (obj, op, controller, call) {
  var navigationViewType = $('#navigationViewType').val()
  if (op == navigationViewType) {
    //说明点击的图标是当前页面，需要刷新当前页面
    switchNavigationOperateBase(obj, op, controller, call)
  } else {
    //页面不同，需要加载新的页面
    switchNavigationOperateBase(obj, op, controller, call)
  }
}

function switchNavigationOperateBase (obj, op, controller, call) {
  $.AjaxJson(controller, '&navigationViewType=' + op, function (data) {
    if (data.type == 0) {
      initNavigationSelect(obj, op)
      $('#divNavigationContext').html(data.html)
    }
  }, 'init')
}

//初始化导航切换选中图标
function initNavigationSelect (obj, op) {
  $('.NavigationImg').each(function () {
    var src = $(this).attr('src')
    if (src.indexOf('Hover.png') != -1) {
      src = src.replace('Hover.png', '.png')
    }
    $(this).attr('src', src)
  })
  var srcTemp = $(obj).children('div').first().children('img').first().attr('src')
  if (srcTemp.indexOf('Hover.png') == -1) {
    srcTemp = srcTemp.replace('.png', 'Hover.png')
  }
  $(obj).children('div').first().children('img').first().attr('src', srcTemp)
  $('#navigationViewType').val(op)
}

function initChooseBtnEvent () {
  $(document).on('click', '.ChooseBtn', function () {
    var t = $(this).attr('t')
    var obj = $('#' + t)
    if (t != 'prefixLetter') {
      $('button[t=\'' + t + '\']').each(function () {
        $(this).removeClass('choice')
      })
      $(this).addClass('choice')
      var selectVal = $(this).val()
      obj.val(selectVal)
      var call = obj.attr('call')
      if (call) {
        eval(call + '(selectVal)')
      }
    } else {
      $('button[t=\'' + t + '\']').each(function () {
        $(this).removeClass('letterChoiced')
      })
      $(this).addClass('letterChoiced')
      var selectVal = $(this).val()
      obj.val(selectVal)
      var call = obj.attr('call')
      if (call) {
        eval(call + '(selectVal)')
      }
    }
    InitPageData(1)
  })
}

function LookUnit (id, title) {
  if (!title) {
    title = '单位'
  }
  Dialog.OpenWindow('查看' + title + '信息', 1050, 800, '/BasicData/BasicData/UnitForm.aspx?&ID=' + id)
}

function LookPerson (id, title) {
  if (!title) {
    title = '联系人'
  }
  Dialog.OpenWindow('查看' + title + '信息', 1050, 800, '/BasicData/BasicData/PersonForm.aspx?&ID=' + id)
}

//初始化样式
function InitStyle () {
  //初始化全选按钮
  InitSelectAllBtn()
}

jQuery.extend({
  //手动预览图片
  previewImage: function (tag, urls) {
    var result = tag + '★' + urls + '★0'
    var dialogid = Dialog.OpenWindow('图片预览', $(window.top).width(), $(window.top).height(), '/Com/previewImage')
    Dialog.SetReturnValue(dialogid, result)
  },
})
$(function () {
  //最后一条添加的闪烁
  InitTopItemFlicker()
  //分页控件输入纯数字
  ConfineNum()
  //表头拉动
  InitTableMoveTab()
  initChooseBtnEvent()
})
