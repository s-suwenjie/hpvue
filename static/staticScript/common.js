//顶部菜单点击事件
function ClickTopMenu (namespace, url, language) {
  if (language == 0) {
    //目标语言是.net
    var GID123456789 = $('#GID123456789').val()
    url = url + 'Default.aspx?GID123456789=' + GID123456789 + '&gotourl=' + url + '&language=0'
    window.location = url
  } else {
    //目标语言是Java

  }
}

//子菜单点击事件
function ClickItemMenu (id, url, namespace, outOrIn, language, currentLanguage) {
  $.AjaxJson('getLeftPurview', '&id=' + id, function (data) {
    if (data.type == 0) {
      if (data.message == 0) {
        //表示没有权限
        Dialog.Alert(250, 160, '没有权限', null, null, 1)
      } else {
        //else if(data.message == 1){
        //表示有权限
        if (language == 0) {
          //目标语言是.net
          var GID123456789 = $('#GID123456789').val()
          url = '/Common/Default.aspx?GID123456789=' + GID123456789 + '&gotourl=' + url.replace(/&/g, '△') + '&language=0' + '&gotonamespace=' + namespace
          window.location = url
        } else {
          //目标语言是Java
          if (namespace != 'OA') {
            window.location = url
          } else {
            var GID123456789 = $('#GID123456789').val()
            url = '/Common/Default.aspx?GID123456789=' + GID123456789 + '&gotourl=' + url.replace(/&/g, '△') + '&language=1' + '&gotonamespace=' + namespace
            window.location = url
          }
        }
        //}
        //else if(data.message == 2){
        //获取权限
        // }
      }
    }
  })

}

//主菜单点击事件
function ClickMainMenu (obj) {
  var open = $(obj).attr('open')
  var className = ''
  if (open == 0) {
    //关上
    open = 1
    className = 'SiteLeftParentB'
    $(obj).removeClass('SiteLeftParentA')
    $(obj).next().slideUp('1000')
  } else {
    //打开
    open = 0
    className = 'SiteLeftParentA'
    $('.LeftMainMenu').each(function () {
      $(this).attr('open', '1')
      $(this).removeClass('SiteLeftParentA')
      $(this).removeClass('SiteLeftParentB')
      $(this).addClass('SiteLeftParentB')
    })
    $(obj).removeClass('SiteLeftParentB')
    $('.SiteLeftChild').slideUp('1000')
    $(obj).next().slideDown('1000')
  }
  $(obj).attr('open', open)
  $(obj).addClass(className)
}

//退出事件
function ConfirmLogout (language) {
  //JAVA退出
  $.AjaxJsonSync('getUserState', '', function (data) {
    if (data['type'] == '0') {
      var Guid = '8F5B12A9-038C-4195-BD61-166B9574829E'
      Dialog.OpenWindowConfirm(300, 170, '确定退出系统吗？', function () {
        $.AjaxJsonSync('logout', '', function (data) {
          if (data['type'] == '0') {
            window.location = '/Common/Default.aspx?clear=clear'
            // $.Logout(userID);
          }
        }, 'init')
      }, function () {
      }, '确定退出', '取消')
    } else {
      //表示Session不在
      window.location = '/Common/Default.aspx?clear=clear'
      //$.Logout(userID);
    }
  }, 'init')
}
