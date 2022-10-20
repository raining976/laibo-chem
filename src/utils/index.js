// 防抖
function _debounce(fn, delay = 500) {
    var timer = null;
    return function () {
        var _this = this;
        var args = arguments;
        if (timer) clearTimeout(timer);
        timer = setTimeout(function () {
            fn.apply(_this, args);
        }, delay);
    };
}

// 节流
function _throttle(fn, delay = 500) {
    var lastTime, timer, delay;
    return function () {
        var _this = this;
        var args = arguments;
        var nowTime = Date.now();
        if (lastTime && nowTime - lastTime < delay) {
            if (timer) clearTimeout(timer);
            timer = setTimeout(function () {
                lastTime = nowTime;
                fn.apply(_this, args);
            }, delay)
        } else {
            lastTime = nowTime;
            fn.apply(_this, args);
        }
    }
}

export {
    _debounce,
    _throttle,
}