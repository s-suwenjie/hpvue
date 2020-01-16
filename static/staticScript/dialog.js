
//键值对
function Map() {
    this.keys = new Array();
    this.data = new Array();
    this.set = function (key, value) {
        if (this.data[key] == null) {
            this.keys.push(value);
        }
        this.data[key] = value;
    };
    this.get = function (key) {
        return this.data[key];
    };
    this.remove = function (key) {
        this.keys.shift(key);
        this.data[key] = null;
    };
    this.isEmpty = function () {
        return this.keys.length == 0;
    };
    this.size = function () {
        return this.keys.length;
    };
}
let dialogMap = new Map();

//指定闪烁的按钮
let DialogInitButtonFlickerInterval;
function DialogInitButtonFlicker(id) {
    if (DialogInitButtonFlickerInterval) {
        clearInterval(DialogInitButtonFlickerInterval);
    }
    let index = 0;
    DialogInitButtonFlickerInterval = setInterval(function () {
        if (index == 0) {
            index = 1;
            $("#" + id, window.top.document).addClass("AlertButtonHover");
        }
        else {
            index = 0;
            $("#" + id, window.top.document).removeClass("AlertButtonHover");
        }
    }, 800);
}

//弹窗的模型
function Dialog(DialogID) {
    //弹窗的唯一ID
    this.ID = DialogID;
    //对话框的标题
    this.Title = "";
    //对话框的宽度
    this.Width = 400;
    //对话框的高度
    this.Height = 300;

    //显示表头
    this.IsHead = true;
    //是否自动关闭。如果是true弹出窗口上没有关闭按钮
    this.IsAutoClose = false;
    //是否有刷新按钮
    this.IsRefresh = false;
    //是否有编辑按钮
    this.IsEdit = false;
    //弹窗类型（0表示URL,1表示静态内容，3表示页面元素ID）
    this.Type = 0;
    //弹窗中要显示的URL地址
    this.Url = "";
    //弹窗中编辑后需要显示的URL地址
    this.SourceUrl = "";
    //弹窗显示数据的ID
    this.SourceID = "";
    //对话框中显示HTML内容
    this.innerHTML = "";
    //弹出页面元素的ID
    this.ControlID = "";

    //返回值（字符串）
    this.ReturnValue = null;

    this.IsClose = 0;
}


//弹窗的初始化
Dialog.prototype.showWindow = function () {
    let width = this.Width;
    let leftwidth = width / 2;
    let height = this.Height;
    let topwidth = height / 2;

    let T = window.top;
    let arr = [];
    if (this.Type == 0) {
        arr.push('<div id="____DialogDiv_' + this.ID + '" oncontextmenu="return false;" onselectstart="return false" class="AlertBox" style="width:' + width + 'px; height:' + height + 'px; margin-left:-' + leftwidth + 'px; margin-top:-' + topwidth + 'px; z-index:99999992; background-color:#ededed;">');
    }
    else {
        arr.push('<div id="____DialogDiv_' + this.ID + '" oncontextmenu="return false;" onselectstart="return false" class="AlertBox" style="width:' + width + 'px; height:' + height + 'px; margin-left:-' + leftwidth + 'px; margin-top:-' + topwidth + 'px; z-index:99999992;">');
    }
    if (this.IsHead) {
        arr.push('<div class="AlertBoxHead" oncontextmenu="return false;" onmousedown="Dialog.getInstance(\'' + this.ID + '\').mouseDown(event);">');
        arr.push('<h3><span id="____DialogDiv_Title_' + this.ID + '">' + this.Title + '</span>');

        if (!this.IsAutoClose) {
            arr.push('<img id="____DialogDiv_Close_' + this.ID + '" title="关闭" src="/HtmlStatic/Images/DialogImage/close.png" />');
        }
        else {
            arr.push('<img id="____DialogDiv_Close_' + this.ID + '" title="关闭" src="/HtmlStatic/Images/DialogImage/close.png"  style="display:none;"/>');
        }
        if (this.IsRefresh) {
            arr.push('<img id="____DialogDiv_Refresh_' + this.ID + '" title="刷新" style="margin-right:20px;" src="/HtmlStatic/Images/DialogImage/Refresh.png" />');
        }
        if (this.IsEdit) {
            arr.push('<img id="____DialogDiv_Edit_' + this.ID + '" title="编辑" style="margin-right:20px;" src="/HtmlStatic/Images/DialogImage/edit.png" />');
            arr.push('<img id="____DialogDiv_Back_' + this.ID + '" title="返回" style="margin-right:20px; display:none;" src="/HtmlStatic/Images/DialogImage/back.png" />');
        }
        arr.push('</h3>');
        arr.push('</div>');
        arr.push('<div id="____DialogDiv_AlertBoxMain' + this.ID + '" class="AlertBoxMain" oncontextmenu="return false;" style="width:' + width + 'px; height:' + (height - 40) + 'px;">');
    }
    else {
        arr.push('<div style="display:none;">');
        arr.push('<img id="____DialogDiv_Close_' + this.ID + '" src="/HtmlStatic/Images/DialogImage/close.png" />');
        arr.push('</div>');
        arr.push('<div id="____DialogDiv_AlertBoxMain' + this.ID + '" class="AlertBoxMain" oncontextmenu="return false;" style="width:' + width + 'px; height:' + height + 'px;">');
    }
    if (this.Type == 0) {
        arr.push('<iframe id="____DialogFrame_' + this.ID + '" src="' + this.URL + '" style="width:100%; height:100%;"  frameborder="0" tabindex="1"></iframe>');
    }
    else if (this.Type == 1 || this.Type == 2) {
        arr.push(this.innerHTML);
    }
    arr.push('</div>');

    arr.push('</div>');


    //获取背景层
    let bgDiv = $("#____DialogBgDiv", T.document).get(0);
    if (!bgDiv) {
        //添加遮罩层到顶层页面
        $("body", T.document).append('<div id="____DialogBgDiv" oncontextmenu="return false;" onselectstart="return false" class="PopBg" style="display:none;"></div>');
    }
    $("#____DialogBgDiv", T.document).show();
    let count = $(".AlertBox", T.document).length;
    let ZIndex = 99999990 - count;
    $(".AlertBox", T.document).each(function () {
        $(this).css("z-index", ZIndex);
        ZIndex++;
    });

    $("body", T.document).append(arr.join('\n')).css("overflow","hidden");
    T.dialogMap.set("____DialogDiv_" + this.ID, this);
    $("#____DialogBgDivInput", T.document).focus();
}


function Coords() {
    this.X = 0;
    this.Y = 0;
    this.XX = 0;
    this.YY = 0
    this.setX = function (value) {
        this.X = value;
    }

    this.setY = function (value) {
        this.Y = value;
    }

    this.getX = function () {
        return this.X;
    }

    this.getY = function () {
        return this.Y;
    }
    this.setXX = function (value) {
        this.XX = value;
    }

    this.setYY = function (value) {
        this.YY = value;
    }

    this.getXX = function () {
        return this.XX;
    }

    this.getYY = function () {
        return this.YY;
    }
    this.setNX = function (value) {
        this.NX = value;
    }

    this.setNY = function (value) {
        this.NY = value;
    }

    this.getNX = function () {
        return this.NX;
    }

    this.getNY = function () {
        return this.NY;
    }
}

let oldCoords = new Coords();

//鼠标按下事件
Dialog.prototype.mouseDown = function (ev) {
    ev = ev || window.event;
    let elementName = ev.target.tagName || ev.srcElement.tagName;
    if (elementName != "IMG") {
        let T = window.top;
        let div = $("#____DialogMoveDiv", T.document).get(0);
        if (!div) {
            $("body", T.document).append('<div id="____DialogMoveDiv" class="AlertBoxMove" oncontextmenu="return false;" onselectstart="return false" onmouseup="Dialog.getInstance(\'' + this.ID + '\').mouseUp();"  onmousemove="Dialog.getInstance(\'' + this.ID + '\').mouseMove(event);" onmouseout="Dialog.getInstance(\'' + this.ID + '\').mouseUp();"></div>');
        }
        let obj = $("#____DialogDiv_" + this.ID, T.document);

        let marginLeft = obj.css("margin-left").replace("px", "");
        let marginTop = obj.css("margin-top").replace("px", "");
        $("#____DialogMoveDiv", T.document).css("height", obj.height() + "px");
        $("#____DialogMoveDiv", T.document).css("width", obj.width() + "px");
        $("#____DialogMoveDiv", T.document).css("margin-left", (marginLeft - 3) + "px");
        $("#____DialogMoveDiv", T.document).css("margin-top", (marginTop - 3) + "px");
        obj.hide();
        T.oldCoords.setX(ev.pageX);
        T.oldCoords.setY(ev.pageY);
        T.oldCoords.setXX(marginLeft);
        T.oldCoords.setYY(marginTop);
        T.oldCoords.setNX(marginLeft);
        T.oldCoords.setNY(marginTop);
    }
}


//鼠标抬起事件
Dialog.prototype.mouseUp = function () {
    let T = window.top;
    let div = $("#____DialogMoveDiv", T.document).get(0);
    if (div) {
        $("#____DialogMoveDiv", T.document).remove();
        obj = $("#____DialogDiv_" + this.ID, T.document);
        obj.css("margin-left", T.oldCoords.getNX() + "px");
        obj.css("margin-top", T.oldCoords.getNY() + "px");
        obj.show();
    }
}

//鼠标移动事件
Dialog.prototype.mouseMove = function (ev) {
    ev = ev || window.event;
    let T = window.top;
    oldX = T.oldCoords.getX();
    oldY = T.oldCoords.getY();
    oldXX = T.oldCoords.getXX();
    oldYY = T.oldCoords.getYY();
    let X = ev.pageX;
    let Y = ev.pageY;
    let NX = oldXX, NY = oldYY;



    NX = parseInt(oldXX) + parseInt((parseInt(X) - parseInt(oldX)));
    NY = parseInt(oldYY) + parseInt((parseInt(Y) - parseInt(oldY)));
    $("#____DialogMoveDiv", T.document).css("margin-left", NX + "px");
    $("#____DialogMoveDiv", T.document).css("margin-top", NY + "px");
    T.oldCoords.setNX(NX);
    T.oldCoords.setNY(NY);
}

//按Esc关闭弹窗
Dialog.onKeyDown = function (event) {
    var event = event || window.event;
    let k = event.charCode || event.keyCode;
    if (k == 27) {
        let T = window.top;
        if ($(".AlertBox", T.document).length > 0) {
            if (T.dialogMap.get($(".AlertBox", T.document).last().attr("id"))) {
                let obj = T.dialogMap.get($(".AlertBox", T.document).last().attr("id"));
                if (obj.IsHead || !obj.IsAutoClose) {
                    $("#____DialogDiv_Close_" + obj.ID, T.document).click();
                }
            }
        }
    }
}

document.addEventListener("keydown", Dialog.onKeyDown, false);


//关闭弹窗
Dialog.prototype.close = function () {

    let T = window.top;
    if (this.Type == 2) {
        //当弹出页面是页面元素内容时，关闭窗口后把内容从新放回到页面
        T.document.getElementById(this.ControlID).style.display = "none";
        $("body").append(T.document.getElementById(this.ControlID).outerHTML);
    }
    $("#____DialogDiv_" + this.ID, T.document).remove();
    T.dialogMap.remove("____DialogDiv_" + this.ID);
    let length = $(".AlertBox", T.document).length;
    if (length == 0) {
        $("#____DialogBgDiv", T.document).hide();
    }
    else {
        let ZIndex = 99999990 - length;
        let currentWin = null;
        $(".AlertBox", T.document).each(function () {
            $(this).css("z-index", ZIndex);
            currentWin = this;
            ZIndex++;
        });
        $(currentWin).css("z-index", "99999992");
    }
    if (T.dialogMap.size() == 0){
        $("body", T.document).css("overflow","");
    }
}


//获取弹窗实例
Dialog.getInstance = function (id) {
    let T = window.top;
    return T.dialogMap.get("____DialogDiv_" + id);
}


//调用强制关闭窗口
Dialog.CloseButtonClick = function (id) {
    let T = window.top;
    if ($("#____DialogDiv_" + id, T.document).get(0)) {
        $("#____DialogDiv_Close_" + id, T.document).click();
    }
}

//调用强制关闭窗口
Dialog.CloseByThis = function (dialog) {
    let T = window.top;
    if ($("#____DialogDiv_" + dialog.ID, T.document).get(0)) {
        dialog.IsClose = 0;
        $("#____DialogDiv_Close_" + dialog.ID, T.document).click();
    }
}


//加载等待窗口
Dialog.OpenLoading = function (width, height, Context) {
    let id = guid() + new Date().getTime();
    let dialog = new Dialog(id);
    dialog.Width = width ? width : 400;
    dialog.Height = height ? height : 300;
    dialog.IsHead = false;
    dialog.IsAutoClose = true;
    dialog.IsRefresh = false;
    dialog.Type = 1;
    let arr = [];
    arr.push('<div class="AlertTest" style="height:' + height + 'px">');
    arr.push('<img src="/HtmlStatic/images/DialogImage/loading.gif" style="width:40px; height:40px;"/>');
    arr.push('<span id="____SpanOpenLoading_' + id + '" style="max-width:' + (width - 100) + 'px;">' + Context + '</span>');
    arr.push('</div>');
    dialog.innerHTML = arr.join('\n');
    dialog.showWindow();
    let T = window.top;
    $("#____DialogDiv_Close_" + id, T.document).click(function () {
        dialog.close();
    });
    return id;
}


//弹出窗口
Dialog.OpenWindow = function (title, width, height, url, closeCall, closeHint) {
    let id = guid() + new Date().getTime();
    let dialog = new Dialog(id);
    dialog.Title = title ? title : "系统提示";
    dialog.Width = width ? width : 400;
    dialog.Height = height ? height : 300;
    dialog.IsAutoClose = false;
    dialog.IsRefresh = true;
    dialog.Type = 0;
    if(url){
        if (url.indexOf("?") == -1)
            url = url + "?dialogid=" + id;
        else
            url = url + "&dialogid=" + id;

        if(url.indexOf(".aspx") != -1){
            url = url + "&GID123456789=" + $("#GID123456789").val();
        }
		else if(url.indexOf(".") == -1){
            url = url + "&GID123456789=" + $("#GID123456789").val();
		}
    }
    dialog.URL = url;
    dialog.showWindow();
    let T = window.top;
    if (closeHint) {
        dialog.IsClose = 1;
    }
    $("#____DialogDiv_Close_" + id, T.document).click(function () {
        let sign = true;
        if (closeHint) {
            if (dialog.IsClose != 0) {
                closeHint(dialog);
                sign = false;
            }
        }
        if (sign) {
            dialog.close();
            if (closeCall) {
                if (dialog.ReturnValue) {
                    closeCall(dialog.ReturnValue);
                }
                else {
                    closeCall();
                }
            }
        }
    });
    $("#____DialogDiv_Refresh_" + id, T.document).click(function () {
        $("#____DialogFrame_" + id, T.document).attr("src", dialog.URL);
    });
    return id;
}

Dialog.OpenWindowEdit = function (title, width, height, url, sourceUrl, SourceID, closeCall, editUrl, editHide) {
    let id = guid() + new Date().getTime();
    let dialog = new Dialog(id);
    dialog.Title = title ? title : "系统提示";
    dialog.Width = width ? width : 400;
    dialog.Height = height ? height : 300;
    dialog.IsAutoClose = false;
    dialog.IsRefresh = true;
    dialog.Type = 0;
    if(url){
        if (url.indexOf("?") == -1)
            url = url + "?dialogid=" + id;
        else
            url = url + "&dialogid=" + id;
    }

    dialog.URL = url;
    dialog.SourceUrl = sourceUrl + "?dialogid=" + id;
    dialog.SourceID = SourceID;
    if (editUrl) {
        dialog.IsEdit = true;
    }
    dialog.showWindow();
    let T = window.top;
    if (editUrl) {
        if (editHide) {
            if (editHide) {
                $("#____DialogDiv_Edit_" + id, T.document).hide();
            }
        }
    }
    $("#____DialogDiv_Close_" + id, T.document).click(function () {
        dialog.close();
        if (closeCall) {
            if (dialog.ReturnValue) {
                closeCall(dialog.ReturnValue);
            }
            else {
                closeCall();
            }
        }
    });
    $("#____DialogDiv_Refresh_" + id, T.document).click(function () {
        $("#____DialogFrame_" + id, T.document).attr("src", dialog.URL);
    });
    if (editUrl) {
        $("#____DialogDiv_Edit_" + id, T.document).click(function () {
            $("#____DialogDiv_Back_" + id, T.document).show();
            $(this).hide();
            let url ="";
            if (editUrl.indexOf("?") == -1){
                url = editUrl + "?dialogid=" + id + "&id=" + dialog.SourceID;
            }else{
                url = editUrl + "&dialogid=" + id + "&id=" + dialog.SourceID;
            }
            $("#____DialogFrame_" + id, T.document).attr("src", url);
            dialog.URL = url;
        });
        $("#____DialogDiv_Back_" + id, T.document).click(function () {
            $("#____DialogDiv_Edit_" + id, T.document).show();
            $(this).hide();
            let url = dialog.SourceUrl + "&id=" + dialog.SourceID;
            $("#____DialogFrame_" + id, T.document).attr("src", url);
            dialog.URL = url;
        })
    }
    return id;
}

Dialog.SetSourceUrl = function (id, sourceID) {
    let T = window.top;
    $("#____DialogDiv_Edit_" + id, T.document).show();
    $("#____DialogDiv_Back_" + id, T.document).hide();
    let obj = T.dialogMap.get("____DialogDiv_" + id);
    if (!sourceID) {
        sourceID = obj.SourceID;
    }
    else {
        obj.SourceID = sourceID;
    }
    let url = obj.SourceUrl + "&id=" + sourceID;
    $("#____DialogFrame_" + id, T.document).attr("src", url);

}


//弹出确认对话框
Dialog.OpenWindowConfirm = function (width, height, Context, OkCall, closeCall, OkText, closeText) {
    let id = guid() + new Date().getTime();
    let dialog = new Dialog(id);
    dialog.Title = "系统提示";
    dialog.Width = width ? width : 400;
    dialog.Height = height ? height : 300;
    dialog.IsAutoClose = false;
    dialog.IsRefresh = false;
    dialog.Type = 1;
    let arr = [];
    arr.push('<div class="AlertTest" style="height:' + (height - 100) + 'px">');
    arr.push('<img src="/HtmlStatic/images/DialogImage/inquiry.gif" style="width:44px; height:40px;"/>');
    arr.push('<span style="max-width:' + (width - 100) + 'px;">' + Context + '</span>');
    arr.push('</div>');
    arr.push('<div class="AlertBottom" style="height:50px">');
    if (!OkText || OkText == "") {
        OkText = "确定";
    }
    arr.push('<button class="AlertButton" type="button" id="____ButtonOK_' + id + '">' + OkText + '</button>');
    if (!closeText || closeText == "") {
        closeText = "取消";
    }
    arr.push('<button class="AlertButton" type="button" id="____ButtonCancel_' + id + '">' + closeText + '</button>');
    arr.push('</div>');
    dialog.innerHTML = arr.join('\n');
    dialog.showWindow();
    DialogInitButtonFlicker("____ButtonOK_" + id);
    let T = window.top;
    $("#____DialogDiv_Close_" + id, T.document).click(function () {
        dialog.close();
    });
    $("#____ButtonOK_" + id, T.document).click(function () {
        dialog.close()
        if (OkCall) {
            OkCall();
        }
    });
    $("#____ButtonCancel_" + id, T.document).click(function () {
        dialog.close()
        if (closeCall) {
            closeCall();
        }
    });
}

console.log(111);
//弹出确认对话框
Dialog.Alert = function (width, height, Context, OkCall, OkText, Type, mclose) {
    let id = guid() + new Date().getTime();
    let dialog = new Dialog(id);
    dialog.Title = "系统提示";
    dialog.Width = width ? width : 400;
    dialog.Height = height ? height : 300;
    dialog.IsAutoClose = false;
    dialog.IsRefresh = false;
	if(mclose && mclose == 1){
		 dialog.IsAutoClose = true;
	}
    dialog.Type = 1;
    let arr = [];
    arr.push('<div class="AlertTest" style="height:' + (height - 100) + 'px">');
    if (!Type) {
        Type = 0;
    }
    let Img = "ok";
    let ImgStyle = "";
    if (Type == 0) {
        Img = "ok";
        ImgStyle = ' style = "width:48px; height:48px;"';
    }
    else if (Type == 1) {
        Img = "warning";
        ImgStyle = ' style = "width:54px; height:40px;"';
    }
    arr.push('<img src="/HtmlStatic/images/DialogImage/' + Img + '.gif" ' + ImgStyle + '/>');
    arr.push('<span style="max-width:' + (width - 100) + 'px;">' + Context + '</span>');
    arr.push('</div>');
    arr.push('<div class="AlertBottom" style="height:50px">');
    if (!OkText || OkText == "") {
        OkText = "确定";
    }
    arr.push('<button class="AlertButton" type="button" id="____ButtonOK_' + id + '">' + OkText + '</button>');
    arr.push('</div>');
    dialog.innerHTML = arr.join('\n');
    dialog.showWindow();
    DialogInitButtonFlicker("____ButtonOK_" + id);
    let T = window.top;
    $("#____DialogDiv_Close_" + id, T.document).click(function () {
        dialog.close();
    });
    $("#____ButtonOK_" + id, T.document).click(function () {
        dialog.close()
        if (OkCall) {
            OkCall();
        }
    });
    return id;
}

//为弹窗设置值
Dialog.SetReturnValue = function (id, value) {
    let T = window.top;
    T.dialogMap.get("____DialogDiv_" + id).ReturnValue = value;
}

//获取弹窗的返回值
Dialog.GetReturnValue = function (id) {
    let T = window.top;
    return T.dialogMap.get("____DialogDiv_" + id).ReturnValue;
}




