(function flexible(window,document) {

  var docEl = document.documentElement;
  var dpr = window.devicePixelRatio || 1;

  function setBodyFontSize() {
    if(document.body){
      document.body.style.fontSize = (12 * dpr) +'px';
    }else{
      document.addEventListener('DOMContentLoaded',setBodyFontSize)
    }
  }

  setBodyFontSize();

  function setRemUnit() {
    if(docEl.clientWidth>750){
      docEl.style.fontSize = '60px';
      return;
    }
    if(docEl.clientWidth<320){
      docEl.style.fontSize = '42.66666667px';
      return;
    }

    var rem = docEl.clientWidth / 10;
    docEl.style.fontSize = rem +'px';
  }

  setRemUnit();

  window.addEventListener('resize',setRemUnit);
  window.addEventListener('pageshow',function (e) {
    if(e.persisted){
      setRemUnit();
    }
  });

  if(dpr>2){
    var fakeBody = document.createElement('body');
    var testElement = document.createElement('div');

    testElement.style.border = '.5px solid transparent';
    fakeBody.appendChild(testElement);
    docEl.appendChild(fakeBody);

    if(testElement.offsetHeight === 1){
      docEl.classList.add('hairlines');
    }
    docEl.removeChild(fakeBody)
  }

}(window,document));



XBack = {};

(function(XBack) {
  XBack.STATE = 'x - back';
  XBack.element;

  XBack.onPopState = function(event) {
    event.state === XBack.STATE && XBack.fire();
    XBack.record(XBack.STATE); //初始化事件时，push一下
  };

  XBack.record = function(state) {
    history.pushState(state, null, location.href);
  };

  XBack.fire = function() {
    var event = document.createEvent('Events');
    event.initEvent(XBack.STATE, false, false);
    XBack.element.dispatchEvent(event);
  };

  XBack.listen = function(listener) {
    XBack.element.addEventListener(XBack.STATE, listener, false);
  };

  XBack.init = function() {
    XBack.element = document.createElement('span');
    window.addEventListener('popstate', XBack.onPopState);
    XBack.record(XBack.STATE);
  };

})(XBack); // 引入这段js文件


XBack.init();
XBack.listen(function() {});
