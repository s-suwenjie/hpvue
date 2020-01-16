import Qs from 'qs'
let domainName = 'http://hp.yhm.hk/'

function isLogin (that) {
  let query = Qs.parse(location.search.substring(1))
  let code = query.code
  if(code){
    let params = {
      id:code
    }
    that.ajaxJsonMobile({
      url: '/SysManager/loginByWXCode',
      data:params,
      call: (data) => {
         if(data.type === 0){
           let url = sessionStorage.getItem('______currentPage______')
           if(url){
             window.location = url
           }
         }
      }
    })
  }
  else {
    that.ajaxJsonMobile({
      url: '/SysManager/getUserState',
      call: (data) => {
        if (data.type === 1) {
          //说明没有session
          let url = window.location.href
          sessionStorage.setItem("______currentPage______",url)
          let newUrl = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx970a9c63f5959f63&redirect_uri=' + encodeURIComponent(domainName + "homeApp") + '&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect'
          window.location = newUrl
        }
      }
    })
  }
}
//
// function login () {
//   let query = Qs.parse(location.search.substring(1))
//   let code = query.code
//   if(code){
//     let params = {
//       id:code
//     }
//     this.ajaxJsonMobile({
//       url: '/SysManager/loginByWXCode',
//       data:params,
//       call: (data) => {
//         alert(data.type)
//       }
//     })
//   }
//   else {
//
//   }
// }

export{
  isLogin
}
