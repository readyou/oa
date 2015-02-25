/*
 FastClick: polyfill to remove click delays on browsers with touch UIs.

 @version 0.6.7
 @codingstandard ftlabs-jsv2
 @copyright The Financial Times Limited [All Rights Reserved]
 @license MIT License (see LICENSE.txt)
 */
function FastClick(a) {
    var b, c = this;
    this.trackingClick = !1;
    this.trackingClickStart = 0;
    this.targetElement = null;
    this.lastTouchIdentifier = this.touchStartY = this.touchStartX = 0;
    this.layer = a;
    if (!a || !a.nodeType)throw new TypeError("Layer must be a document node");
    this.onClick = function () {
        return FastClick.prototype.onClick.apply(c, arguments)
    };
    this.onMouse = function () {
        return FastClick.prototype.onMouse.apply(c, arguments)
    };
    this.onTouchStart = function () {
        return FastClick.prototype.onTouchStart.apply(c, arguments)
    };
    this.onTouchEnd =
        function () {
            return FastClick.prototype.onTouchEnd.apply(c, arguments)
        };
    this.onTouchCancel = function () {
        return FastClick.prototype.onTouchCancel.apply(c, arguments)
    };
    FastClick.notNeeded(a) || (this.deviceIsAndroid && (a.addEventListener("mouseover", this.onMouse, !0), a.addEventListener("mousedown", this.onMouse, !0), a.addEventListener("mouseup", this.onMouse, !0)), a.addEventListener("click", this.onClick, !0), a.addEventListener("touchstart", this.onTouchStart, !1), a.addEventListener("touchend", this.onTouchEnd, !1), a.addEventListener("touchcancel",
        this.onTouchCancel, !1), Event.prototype.stopImmediatePropagation || (a.removeEventListener = function (d, b, c) {
        var e = Node.prototype.removeEventListener;
        "click" === d ? e.call(a, d, b.hijacked || b, c) : e.call(a, d, b, c)
    }, a.addEventListener = function (b, c, f) {
        var e = Node.prototype.addEventListener;
        "click" === b ? e.call(a, b, c.hijacked || (c.hijacked = function (a) {
            a.propagationStopped || c(a)
        }), f) : e.call(a, b, c, f)
    }), "function" === typeof a.onclick && (b = a.onclick, a.addEventListener("click", function (a) {
        b(a)
    }, !1), a.onclick = null))
}
FastClick.prototype.deviceIsAndroid = 0 < navigator.userAgent.indexOf("Android");
FastClick.prototype.deviceIsIOS = /iP(ad|hone|od)/.test(navigator.userAgent);
FastClick.prototype.deviceIsIOS4 = FastClick.prototype.deviceIsIOS && /OS 4_\d(_\d)?/.test(navigator.userAgent);
FastClick.prototype.deviceIsIOSWithBadTarget = FastClick.prototype.deviceIsIOS && /OS ([6-9]|\d{2})_\d/.test(navigator.userAgent);
FastClick.prototype.needsClick = function (a) {
    switch (a.nodeName.toLowerCase()) {
        case "button":
        case "select":
        case "textarea":
            if (a.disabled)return !0;
            break;
        case "input":
            if (this.deviceIsIOS && "file" === a.type || a.disabled)return !0;
            break;
        case "label":
        case "video":
            return !0
    }
    return /\bneedsclick\b/.test(a.className)
};
FastClick.prototype.needsFocus = function (a) {
    switch (a.nodeName.toLowerCase()) {
        case "textarea":
        case "select":
            return !0;
        case "input":
            switch (a.type) {
                case "button":
                case "checkbox":
                case "file":
                case "image":
                case "radio":
                case "submit":
                    return !1
            }
            return !a.disabled && !a.readOnly;
        default:
            return /\bneedsfocus\b/.test(a.className)
    }
};
FastClick.prototype.sendClick = function (a, b) {
    var c, d;
    document.activeElement && document.activeElement !== a && document.activeElement.blur();
    d = b.changedTouches[0];
    c = document.createEvent("MouseEvents");
    c.initMouseEvent("click", !0, !0, window, 1, d.screenX, d.screenY, d.clientX, d.clientY, !1, !1, !1, !1, 0, null);
    c.forwardedTouchEvent = !0;
    a.dispatchEvent(c)
};
FastClick.prototype.focus = function (a) {
    var b;
    this.deviceIsIOS && a.setSelectionRange ? (b = a.value.length, a.setSelectionRange(b, b)) : a.focus()
};
FastClick.prototype.updateScrollParent = function (a) {
    var b, c;
    b = a.fastClickScrollParent;
    if (!b || !b.contains(a)) {
        c = a;
        do {
            if (c.scrollHeight > c.offsetHeight) {
                b = c;
                a.fastClickScrollParent = c;
                break
            }
            c = c.parentElement
        } while (c)
    }
    b && (b.fastClickLastScrollTop = b.scrollTop)
};
FastClick.prototype.getTargetElementFromEventTarget = function (a) {
    return a.nodeType === Node.TEXT_NODE ? a.parentNode : a
};
FastClick.prototype.onTouchStart = function (a) {
    var b, c, d;
    if (1 < a.targetTouches.length)return !0;
    b = this.getTargetElementFromEventTarget(a.target);
    c = a.targetTouches[0];
    if (this.deviceIsIOS) {
        d = window.getSelection();
        if (d.rangeCount && !d.isCollapsed)return !0;
        if (!this.deviceIsIOS4) {
            if (c.identifier === this.lastTouchIdentifier)return a.preventDefault(), !1;
            this.lastTouchIdentifier = c.identifier;
            this.updateScrollParent(b)
        }
    }
    this.trackingClick = !0;
    this.trackingClickStart = a.timeStamp;
    this.targetElement = b;
    this.touchStartX =
        c.pageX;
    this.touchStartY = c.pageY;
    200 > a.timeStamp - this.lastClickTime && a.preventDefault();
    return !0
};
FastClick.prototype.touchHasMoved = function (a) {
    a = a.changedTouches[0];
    return 10 < Math.abs(a.pageX - this.touchStartX) || 10 < Math.abs(a.pageY - this.touchStartY) ? !0 : !1
};
FastClick.prototype.findControl = function (a) {
    return void 0 !== a.control ? a.control : a.htmlFor ? document.getElementById(a.htmlFor) : a.querySelector("button, input:not([type=hidden]), keygen, meter, output, progress, select, textarea")
};
FastClick.prototype.onTouchEnd = function (a) {
    var b, c, d;
    d = this.targetElement;
    this.touchHasMoved(a) && (this.trackingClick = !1, this.targetElement = null);
    if (!this.trackingClick)return !0;
    if (200 > a.timeStamp - this.lastClickTime)return this.cancelNextClick = !0;
    this.lastClickTime = a.timeStamp;
    b = this.trackingClickStart;
    this.trackingClick = !1;
    this.trackingClickStart = 0;
    this.deviceIsIOSWithBadTarget && (d = a.changedTouches[0], d = document.elementFromPoint(d.pageX - window.pageXOffset, d.pageY - window.pageYOffset));
    c = d.tagName.toLowerCase();
    if ("label" === c) {
        if (b = this.findControl(d)) {
            this.focus(d);
            if (this.deviceIsAndroid)return !1;
            d = b
        }
    } else if (this.needsFocus(d)) {
        if (100 < a.timeStamp - b || this.deviceIsIOS && window.top !== window && "input" === c)return this.targetElement = null, !1;
        this.focus(d);
        if (!this.deviceIsIOS4 || "select" !== c)this.targetElement = null, a.preventDefault();
        return !1
    }
    if (this.deviceIsIOS && !this.deviceIsIOS4 && (b = d.fastClickScrollParent) && b.fastClickLastScrollTop !== b.scrollTop)return !0;
    this.needsClick(d) || (a.preventDefault(), this.sendClick(d,
        a));
    return !1
};
FastClick.prototype.onTouchCancel = function () {
    this.trackingClick = !1;
    this.targetElement = null
};
FastClick.prototype.onMouse = function (a) {
    return !this.targetElement || a.forwardedTouchEvent || !a.cancelable ? !0 : !this.needsClick(this.targetElement) || this.cancelNextClick ? (a.stopImmediatePropagation ? a.stopImmediatePropagation() : a.propagationStopped = !0, a.stopPropagation(), a.preventDefault(), !1) : !0
};
FastClick.prototype.onClick = function (a) {
    if (this.trackingClick)return this.targetElement = null, this.trackingClick = !1, !0;
    if ("submit" === a.target.type && 0 === a.detail)return !0;
    a = this.onMouse(a);
    a || (this.targetElement = null);
    return a
};
FastClick.prototype.destroy = function () {
    var a = this.layer;
    this.deviceIsAndroid && (a.removeEventListener("mouseover", this.onMouse, !0), a.removeEventListener("mousedown", this.onMouse, !0), a.removeEventListener("mouseup", this.onMouse, !0));
    a.removeEventListener("click", this.onClick, !0);
    a.removeEventListener("touchstart", this.onTouchStart, !1);
    a.removeEventListener("touchend", this.onTouchEnd, !1);
    a.removeEventListener("touchcancel", this.onTouchCancel, !1)
};
FastClick.notNeeded = function (a) {
    var b;
    if ("undefined" === typeof window.ontouchstart)return !0;
    if (/Chrome\/[0-9]+/.test(navigator.userAgent))if (FastClick.prototype.deviceIsAndroid) {
        if ((b = document.querySelector("meta[name=viewport]")) && -1 !== b.content.indexOf("user-scalable=no"))return !0
    } else return !0;
    return "none" === a.style.msTouchAction ? !0 : !1
};
FastClick.attach = function (a) {
    return new FastClick(a)
};
"undefined" !== typeof define && define.amd ? define(function () {
    return FastClick
}) : "undefined" !== typeof module && module.exports ? (module.exports = FastClick.attach, module.exports.FastClick = FastClick) : window.FastClick = FastClick;