/**
 * [urlEncode 将对象进行拼接
 * @param {[boolem]} state [是否拼接成url,true:拼接成带有&符号的字符串，false:拼接成不带任何符号的字符串]
 * @return {[str]} 返回最终拼成的字符串
 */
export function urlEncode(param, state) {
    if (param == null) return '';
    var paramStr = '';
    var t = typeof(param);
    if (state) {
        for (var i in param) {
            if (typeof param[i] === 'object') {
                param[i] = JSON.stringify(param[i])
            }
            paramStr += "&" + i + "=" + param[i];
        }
        paramStr = paramStr.replace(/&/, "?");


    } else {
        for (var i in param) {
            if (typeof param[i] === "object") {
                paramStr += i + JSON.stringify(param[i])
            } else {
                paramStr += i + param[i];
            }
        }
    }
    return paramStr;
};

/**
 * [getTimeStr 获取指定格式时间]
 * @param  {[str]} format  [要生成的时间格式，eg：'YYYY-MM-DD']
 * @param  {[str]} timeStr [源时间字符串，eg：'6/6/2017']
 * @return {[str]}         [返回生成后的值]
 */
export function getTimeStr(format, timeStr) {
    var date, y, m, d;
    date = new Date(timeStr);
    y = date.getFullYear();
    format = format.replace('YYYY', y);
    m = date.getMonth() + 1;
    m = m < 10 ? ('0' + m) : m;
    format = format.replace('MM', m);
    d = date.getDate();
    d = d < 10 ? ('0' + d) : d;
    format = format.replace('DD', d);
    return format;
}

//获取cookie
export function getCookie(name) {
    var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
    if (arr = document.cookie.match(reg)) {
        return unescape(arr[2]);
    } else {
        return null;
    }
}
/**
 *[setCookie 设置cookie]
 * @param {string} name  [cookie的名字]
 * @param {string} value [cookie的值]
 * @param {date} time    [s20是代表20秒 h是指小时，如12小时则是：h12 d是天数，30天则：d30]
 */
export function setCookie(name, value, time) {
    var strsec = getsec(time);
    var exp = new Date();
    exp.setTime(exp.getTime() + strsec * 1);
    document.cookie = name + "=" + escape(value) + ";expires=" + exp.toGMTString();
}
/**
 *[clearCookie 设置cookie]
 * @param {string} name  [cookie的名字]
 */
export function clearCookie(name) {
    var exp = new Date();
    exp.setTime(-1);
    var cval = getCookie(name);
    if (cval != null) {
        document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString();
    }
}
/**
 *判断是否是孔对象
 * @param {*} obj
 */
export function judge(obj) {
    for (var i in obj) { //如果不为空，则会执行到这一步，返回true
        　　　　
        return true;　　
    }　　
    return false;

}

/**
 *
 * @param {string} str  [时间参数： 按"秒","小时","天"来计算]
 */
function getsec(str) {
    var str1 = str.substring(1, str.length) * 1;
    var str2 = str.substring(0, 1);
    if (str2 == "s") {
        return str1 * 1000;
    } else if (str2 == "h") {
        return str1 * 60 * 60 * 1000;
    } else if (str2 == "d") {
        return str1 * 24 * 60 * 60 * 1000;
    }
}