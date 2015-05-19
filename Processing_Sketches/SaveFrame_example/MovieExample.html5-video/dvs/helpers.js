function DVS_fixEvent(e) {
    // get object event to IE
    e = e || window.event;
    // adding pageX/pageY property to IE
    if (e.pageX == null && e.clientX != null) {
        var html = document.documentElement;
        var body = document.body;
        e.pageX = e.clientX + (html && html.scrollLeft || body && body.scrollLeft || 0) - (html.clientLeft || 0);
        e.pageY = e.clientY + (html && html.scrollTop || body && body.scrollTop || 0) - (html.clientTop || 0);
    }
    //adding which property to IE
    if (!e.which && e.button) {
        e.which = e.button & 1 ? 1 : (e.button & 2 ? 3 : (e.button & 4 ? 2 : 0));
    }
    return e;
}
// convert second to min:sec format
function DVS_secTominsec(secund) {
    var min = Math.floor(secund / 60);
    var sec = secund - min * 60;
    return (min + ":" + sec.toFixed(0));
}

// correct x y position with parent objects
function DVS_CorrectXYparent(e) {
    e = DVS_fixEvent(e);
    if (e.which != 1) return

    var pos = DVS_getElementPosition(this);

    this.ChildPic.correctX = pos["left"];
    this.ChildPic.correctY = pos["top"];
    this.ChildPic.maxDragX = pos["width"];
    this.ChildPic.maxDragY = pos["height"];
}

function DVS_getElementPosition(elem) {
    //var elem = document.getElementById(elemId);
    var w = elem.offsetWidth;
    var h = elem.offsetHeight;
    var l = 0;
    var t = 0;
    while (elem) {
        l += elem.offsetLeft;
        t += elem.offsetTop;
        elem = elem.offsetParent;
    }
    return { "left": l, "top": t, "width": w, "height": h };
}

function DVS_getOffset(elem) {
    if (elem.getBoundingClientRect) {
        return DVS_getOffsetRect(elem);
    } else {
        return DVS_getOffsetSum(elem);
    }
}

function DVS_getOffsetRect(elem) {
    var box = elem.getBoundingClientRect();
    var body = document.body;
    var docElem = document.documentElement;
    var scrollTop = window.pageYOffset || docElem.scrollTop || body.scrollTop;
    var scrollLeft = window.pageXOffset || docElem.scrollLeft || body.scrollLeft;
    var clientTop = docElem.clientTop || body.clientTop || 0;
    var clientLeft = docElem.clientLeft || body.clientLeft || 0;
    var top = box.top + scrollTop - clientTop;
    var left = box.left + scrollLeft - clientLeft;
    return { top: Math.round(top), left: Math.round(left) };
}

function DVS_getOffsetSum(elem) {
    var top = 0, left = 0;
    while (elem) {
        top = top + parseInt(elem.offsetTop);
        left = left + parseInt(elem.offsetLeft);
        elem = elem.offsetParent;
    }
    return { top: top, left: left };
}

function browser() {
    var ua = navigator.userAgent;
    if (ua.search(/MSIE/) > 0) return 'IE';
    if (ua.search(/Firefox/) > 0) return 'FF';
    if (ua.search(/Chrome/) > 0) return 'CH';
    return 'null';
}
