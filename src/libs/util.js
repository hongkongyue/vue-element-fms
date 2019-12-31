import JSEncrypt from 'jsencrypt'
import Axios from 'axios';

var now = new Date(); //当前日期
var nowDayOfWeek = now.getDay(); //今天本周的第几天
var nowDay = now.getDate(); //当前日
var nowMonth = now.getMonth(); //当前月
var nowYear = now.getYear(); //当前年
nowYear += (nowYear < 2000) ? 1900 : 0; //


let util = {

};
util.title = function (title) {
  title = title || 'FMS 财务管理系统';
  window.document.title = title;
};

util.inOf = function (arr, targetArr) {
  let res = true;
  arr.forEach(item => {
    if (targetArr.indexOf(item) < 0) {
      res = false;
    }
  });
  return res;
};

util.oneOf = function (ele, targetArr) {
  if (targetArr.indexOf(ele) >= 0) {
    return true;
  } else {
    return false;
  }
};

util.showThisRoute = function (itAccess, currentAccess) {
  if (typeof itAccess === 'object' && Array.isArray(itAccess)) {
    return util.oneOf(currentAccess, itAccess);
  } else {
    return itAccess === currentAccess;
  }
};

util.getRouterObjByName = function (routers, name) {
  if (!name || !routers || !routers.length) {
    return null;
  }
  let routerObj = null;
  for (let item of routers) {
    if (item.name === name) {
      return item;
    }
    routerObj = util.getRouterObjByName(item.children, name);
    if (routerObj) {
      return routerObj;
    }
  }
  return null;
};

util.handleTitle = function (vm, item) {
  let title = util.getTitleByPath(item.name)
  if(title){
    return title
  }
  if (typeof item.title === 'object') {
    return item.title;
  } else {
    return item.title;
  }
};

util.setCurrentPath = function (vm, name) {
  let title = '';
  let isOtherRouter = false;
  vm.$store.state.app.routers.forEach(item => {
    if (item.children.length === 1) {
      if (item.children[0].name === name) {
        title = util.handleTitle(vm, item);
        if (item.name === 'otherRouter') {
          isOtherRouter = true;
        }
      }
    } else {
      item.children.forEach(child => {
        if (child.name === name) {
          title = util.handleTitle(vm, child);
          if (item.name === 'otherRouter') {
            isOtherRouter = true;
          }
        }
      });
    }
  });
  let currentPathArr = [];
  if (name === 'home_index') {
    currentPathArr = [{
      title: util.handleTitle(vm, util.getRouterObjByName(vm.$store.state.app.routers, 'home_index')),
      path: '',
      name: 'home_index'
    }];
  } else if ((name.indexOf('_index') >= 0 || isOtherRouter) && name !== 'home_index') {
    currentPathArr = [{
        title: util.handleTitle(vm, util.getRouterObjByName(vm.$store.state.app.routers, 'home_index')),
        path: '/home',
        name: 'home_index'
      },
      {
        title: title,
        path: '',
        name: name
      }
    ];
  } else {
    let currentPathObj = vm.$store.state.app.routers.filter(item => {
      if (item.children.length <= 1) {
        return item.children[0].name === name;
      } else {
        let i = 0;
        let childArr = item.children;
        let len = childArr.length;
        while (i < len) {
          if (childArr[i].name === name) {
            return true;
          }
          i++;
        }
        return false;
      }
    })[0];
    if (currentPathObj.children.length <= 1 && currentPathObj.name === 'home') {
      currentPathArr = [{
        title: '首页',
        path: '',
        name: 'home_index'
      }];
    } else if (currentPathObj.children.length <= 1 && currentPathObj.name !== 'home') {
      currentPathArr = [{
          title: '首页',
          path: '/home',
          name: 'home_index'
        },
        {
          title: util.getTitleByPath(currentPathObj.name),
          path: '',
          name: name
        }
      ];
    } else {
      let childObj = currentPathObj.children.filter((child) => {
        return child.name === name;
      })[0];
      currentPathArr = [{
          title: '首页',
          path: '/home',
          name: 'home_index'
        },
        {
          title: currentPathObj.title,
          path: '',
          name: currentPathObj.name
        },
        {
          title: util.getTitleByPath(childObj.name),
          path: currentPathObj.path + '/' + childObj.path,
          name: name
        }
      ];
    }
  }
  vm.$store.commit('setCurrentPath', currentPathArr);

  return currentPathArr;
};

util.openNewPage = function (vm, name, argu, query) {
  let pageOpenedList = vm.$store.state.app.pageOpenedList;
  let openedPageLen = pageOpenedList.length;
  let i = 0;
  let tagHasOpened = false;
  while (i < openedPageLen) {
    if (name === pageOpenedList[i].name) { // 页面已经打开
      vm.$store.commit('pageOpenedList', {
        index: i,
        argu: argu,
        query: query
      });
      tagHasOpened = true;
      break;
    }
    i++;
  }
  if (!tagHasOpened) {
    let tag = vm.$store.state.app.tagsList.filter((item) => {
      if (item.children) {
        return name === item.children[0].name;
      } else {
        return name === item.name;
      }
    });

    tag = tag[0];
    if (tag) {
      tag = tag.children ? tag.children[0] : tag;
      if (argu) {
        tag.argu = argu;
      }
      if (query) {
        tag.query = query;
      }
      vm.$store.commit('increateTag', tag);
    }
  }
  vm.$store.commit('setCurrentPageName', name);
};

util.toDefaultPage = function (routers, name, route, next) {
  let len = routers.length;
  let i = 0;
  let notHandle = true;
  while (i < len) {
    if (routers[i].name === name && routers[i].children && routers[i].redirect === undefined) {
      route.replace({
        name: routers[i].children[0].name
      });
      notHandle = false;
      next();
      break;
    }
    i++;
  }
  if (notHandle) {
    next();
  }
};

/**
 * 返回当前日期
 * @returns {string}
 */
util.currentDate = () => {
  let myDate = new Date();
  let year = parseInt(myDate.getFullYear()); //获取完整的年份(4位,1970-????)
  let month = parseInt(myDate.getMonth()) + 1; //获取当前月份(0-11,0代表1月)
  let day = parseInt(myDate.getDate()); //获取当前日(1-31)
  //小于10的时候
  if (month < 10) {
    month = 0 + month.toString();
  }
  if (day < 10) {
    day = 0 + day.toString();
  }
  return year.toString() + month + day;
};

/**
 * 给一个日期返回时间戳
 * @param date
 * @returns {number}
 */
util.getTimestamp = (date) => {
  if (date) {
    return Date.parse(new Date(date));
  }
  return Date.parse(new Date());
};

util.fullscreenEvent = function (vm) {
  vm.$store.commit('initCachepage');
  // 权限菜单过滤相关
  vm.$store.commit('updateMenulist');
  // 全屏相关
};

util.getType = function (obj) {
  //tostring会返回对应不同的标签的构造函数
  var toString = Object.prototype.toString;
  var map = {
    '[object Boolean]': 'boolean',
    '[object Number]': 'number',
    '[object String]': 'string',
    '[object Function]': 'function',
    '[object Array]': 'array',
    '[object Date]': 'date',
    '[object RegExp]': 'regExp',
    '[object Undefined]': 'undefined',
    '[object Null]': 'null',
    '[object Object]': 'object'
  };
  if (obj instanceof Element) {
    return 'element';
  }
  return map[toString.call(obj)];
}

/**
 * 深拷贝
 * @param {} data
 */
util.deepClone = function (data) {
  var type = util.getType(data);
  var obj;
  if (type === 'array') {
    obj = [];
  } else if (type === 'object') {
    obj = {};
  } else {
    //不再具有下一层次
    return data;
  }
  if (type === 'array') {
    for (var i = 0, len = data.length; i < len; i++) {
      obj.push(util.deepClone(data[i]));
    }
  } else if (type === 'object') {
    for (var key in data) {
      obj[key] = util.deepClone(data[key]);
    }
  }
  return obj;
}



/**
 * 格式化订单状态
    100  草稿
    200  待审核
    250  已驳回
    300  已审核
    350  推送失败
    400  已推送
    500  退还中
    600  已发货
    700  归还中
    750  部分归还
    900  已关闭
    950  已取消
    800  已完成
 * @param {*} value
 */
util.formatOrderStatus = function (value) {
  let orderStatus = '未知状态';
  switch (value) {
    case '0':
      orderStatus = '- -';
      break;
    case '100':
      orderStatus = '草稿';
      break;
    case '200':
      orderStatus = '待审核';
      break;
    case '250':
      orderStatus = '已驳回';
      break;
    case '300':
      orderStatus = '已审核';
      break;
    case '350':
      orderStatus = '推送失败';
      break;
    case '400':
      orderStatus = '已推送';
      break;
    case '450':
      orderStatus = '已下单';
      break;
    case '500':
      orderStatus = '退货中';
      break;
    case '600':
      orderStatus = '已发货';
      break;
    case '650':
      orderStatus = '部分生产';
      break;
    case '700':
      orderStatus = ' 归还中';
      break;
    case '750':
      orderStatus = '部分归还';
      break;
    case '800':
      orderStatus = '已完成';
      break;
      case '850':
      orderStatus = '部分完成';
      break;
    case '900':
      orderStatus = '已关闭';
      break;
    case '950':
      orderStatus = '已取消';
      break;
  }
  return orderStatus;
}

util.dateFormat = function (str, fmt) {
  var usedDate = new Date(str);
  var o = {
    "M+": usedDate.getMonth() + 1, //月份
    "d+": usedDate.getDate(), //日
    "h+": usedDate.getHours(), //小时
    "m+": usedDate.getMinutes(), //分
    "s+": usedDate.getSeconds(), //秒
    "q+": Math.floor((usedDate.getMonth() + 3) / 3), //季度
    "S": usedDate.getMilliseconds() //毫秒
  };
  if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (usedDate.getFullYear() + "").substr(4 - RegExp.$1.length));
  for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
  return fmt;
}

util.JSEncrypt = function (type, data) {
  var encrypt = new JSEncrypt();
  encrypt.setPublicKey('MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQC4twvFaGUZLb2Lq8sbj/Omz+kgSX2cJtqMtnT0/1itOiP4o7nGZ6zoo8UX+4iQk99ZAAUslN3cPiV42fkJ23MWp25MjDMTRW/VnWSZYndaqoqVdPh+mniEonSz8dHy4nfiH9D1vfdQooKSOsIPtsCE5njMiDR0fS7EGInF+I9ogwIDAQAB');
  encrypt.setPrivateKey('MIICdQIBADANBgkqhkiG9w0BAQEFAASCAl8wggJbAgEAAoGBALi3C8VoZRktvYuryxuP86bP6SBJfZwm2oy2dPT/WK06I/ijucZnrOijxRf7iJCT31kABSyU3dw+JXjZ+QnbcxanbkyMMxNFb9WdZJlid1qqipV0+H6aeISidLPx0fLid+If0PW991CigpI6wg+2wITmeMyINHR9LsQYicX4j2iDAgMBAAECgYAx7qlr79CEgezfOM1q4fsHeOSYKcWe1JH3v8rV/8DE8xaOPBQYIiaHrN22ofREwPR7Zpn/dy6SPup6RNIhbAUsAB05wjOlQtgnTflU/0nV9fMLgsRcoT7G5GwY6CUTcV/dy/U/sXEFEdJ+qkFkqwbQGCs3GYubt+4pZ9iE66VfAQJBAPWr+eDPjFQMPUzz1Q/JSg97F2FyQx45itgZ8t0nTbOhG4ded3hXQ0VDKi3xg92FWXcq97Cdk/dc+HQYr3tiiGMCQQDAewcENVocfPBBol/4wjglBEINg9A91GOT3OcNaa7brGtyMmWq8Jce1DySrjpmrWWY33E9gs1IHmuMXmg3jMlhAkAKHCavWrsypkJLjWlCOg1jL7SZnQMoFkQheoflE/39m26vlnKiMC0jh40P0PWVQyyYW9tPmFyDfH75AB8Qm9BzAkA8Eqmf8J7NIVlCwtC9LLClLO0IlskZYv4pGdqq3v8J5IgsPfppHWms34SAKwxjG18IFUScdARpq8TZLGXOYIxBAkAuKlCi9El7djruMDpw4RRoD00NijwbysSKQGapzoxpIEfDhw9pghMY6EoM6VfJvjzsiSRduAvgFYC+uvqJQPWF');
  if (type == 'encrypt') {
    return encrypt.encrypt(data);
  } else if (type == 'decrypt') {
    return encrypt.decrypt(data);
  }
}

util.cutDate = function (date, cutDay, boolean) {
  var Now_Timestamp = date.getTime();
  var CutDay_Timestamp = cutDay * 1000 * 60 * 60 * 24;
  var New_Timestamp = Now_Timestamp - CutDay_Timestamp;
  return util.dateFormat(new Date(New_Timestamp), 'yyyy-MM-dd');
}


/**
 * 去字符串空格
 * @param {*} str
 */
util.Trim = function (str) {
  return str.replace(/(^\s*)|(\s*$)/g, "");
}

/**
 * 手机正则验证
 */
util.isMobile = function (value) {
  return /^(13[0-9]|15[0-9]|16[0-9]|17[0-9]|1[89][0-9]|14[57])[0-9]{8}$/.test(this.Trim(value)) || /^(0\d{2,3}-\d{7,8})/.test(value);
}

/**
 *保留两位小数
  //功能：将浮点数四舍五入，取小数点后2位 } x
 */
util.toDecimal = function (x) {
  var f = parseFloat(x);
  if (isNaN(f)) {
    return 0;
  }
  f = Math.round(x * 100) / 100;
  return f;
}

var _AgentInfo = {
  deviceType: "", // pc or mobile
  OSname: "", // windows, Android, linux and so on...
  browserName: "", //  chrome, safari, firefox, IE and so on...
  browserVer: "", //  browser version， important if in IE environment.
  adaptType: 0, // A type value, Adapt to the screen due to width
  _init: function () {
    _AgentInfo.setDeviceAndOS();
    _AgentInfo.setBrowser();
  },
  setDeviceAndOS: function () {
    var name = "unknown";
    if (window.navigator.userAgent.indexOf("Android") != -1) {
      name = "Android";
    } else if (window.navigator.userAgent.indexOf("iPhone") != -1) {
      name = "iPhone";
    } else if (window.navigator.userAgent.indexOf("SymbianOS") != -1) {
      name = "SymbianOS";
    } else if (window.navigator.userAgent.indexOf("Windows Phone") != -1) {
      name = "Windows Phone";
    } else if (window.navigator.userAgent.indexOf("iPad") != -1) {
      name = "iPad";
    } else if (window.navigator.userAgent.indexOf("iPod") != -1) {
      name = "iPod";
    }
    if (name != "unknown") {
      _AgentInfo.OSname = name;
      _AgentInfo.deviceType = "mobile";
      return;
    }
    if (window.navigator.userAgent.indexOf("Windows NT 10.0") != -1) {
      name = "Windows 10";
    } else if (window.navigator.userAgent.indexOf("Windows NT 6.2") != -1) {
      name = "Windows 8";
    } else if (window.navigator.userAgent.indexOf("Windows NT 6.1") != -1) {
      name = "Windows 7";
    } else if (window.navigator.userAgent.indexOf("Windows NT 6.0") != -1) {
      name = "Windows Vista";
    } else if (window.navigator.userAgent.indexOf("Windows NT 5.1") != -1) {
      name = "Windows XP";
    } else if (window.navigator.userAgent.indexOf("Windows NT 5.0") != -1) {
      name = "Windows 2000";
    } else if (window.navigator.userAgent.indexOf("Mac") != -1) {
      name = "Mac/iOS";
    } else if (window.navigator.userAgent.indexOf("Linux") != -1) {
      name = "Linux";
    } else if (window.navigator.userAgent.indexOf("X11") != -1) {
      name = "UNIX";
    }
    _AgentInfo.OSname = name;
    _AgentInfo.deviceType = "pc";
  },
  setBrowser: function () {
    var nAgt = navigator.userAgent;
    var browserName = navigator.appName;
    var fullVersion = '' + parseFloat(navigator.appVersion);
    var majorVersion = parseInt(navigator.appVersion, 10);
    var nameOffset, verOffset, ix;
    if ((verOffset = nAgt.indexOf("Opera")) != -1) { // In Opera, the true version is after "Opera" or after "Version"
      browserName = "Opera";
      fullVersion = nAgt.substring(verOffset + 6);
      if ((verOffset = nAgt.indexOf("Version")) != -1)
        fullVersion = nAgt.substring(verOffset + 8);
    } else if ((nAgt.indexOf("Trident")) != -1) { // ( ver >= ie7) In MSIE, the true version is after "MSIE" in userAgent
      if ((verOffset = nAgt.indexOf("MSIE")) != -1) {
        fullVersion = nAgt.substring(verOffset + 5);
      } else {
        fullVersion = '11.0';
      }
      if (fullVersion == 5) {
        fullVersion = "11.0";
      }
      browserName = "IE";
    } else if ((verOffset = nAgt.indexOf("Chrome")) != -1) { // In Chrome, the true version is after "Chrome"
      browserName = "Chrome";
      fullVersion = nAgt.substring(verOffset + 7);
    } else if ((verOffset = nAgt.indexOf("Safari")) != -1) { // In Safari, the true version is after "Safari" or after "Version"
      browserName = "Safari";
      fullVersion = nAgt.substring(verOffset + 7);
      if ((verOffset = nAgt.indexOf("Version")) != -1)
        fullVersion = nAgt.substring(verOffset + 8);
    } else if ((verOffset = nAgt.indexOf("Firefox")) != -1) { // In Firefox, the true version is after "Firefox"
      browserName = "Firefox";
      fullVersion = nAgt.substring(verOffset + 8);
    } else if ((nameOffset = nAgt.lastIndexOf(' ') + 1) < (verOffset = nAgt.lastIndexOf('/'))) { // In most other browsers, "name/version" is at the end of userAgent
      browserName = nAgt.substring(nameOffset, verOffset);
      fullVersion = nAgt.substring(verOffset + 1);
      if (browserName.toLowerCase() == browserName.toUpperCase()) {
        browserName = navigator.appName;
      }
    }
    if ((ix = fullVersion.indexOf(";")) != -1) // trim the fullVersion string at semicolon/space if present
      fullVersion = fullVersion.substring(0, ix);
    if ((ix = fullVersion.indexOf(" ")) != -1)
      fullVersion = fullVersion.substring(0, ix);
    majorVersion = parseInt('' + fullVersion, 10);
    if (isNaN(majorVersion)) {
      fullVersion = '' + parseFloat(navigator.appVersion);
      majorVersion = parseInt(navigator.appVersion, 10);
    }
    _AgentInfo.browserName = browserName;
    _AgentInfo.browserVer = fullVersion;
  },
  isMobile: function () {
    if (_AgentInfo.deviceType == "mobile") {
      return true;
    }
    return false;
  },
  setAdaptType() { // A type value, Adapt to the screen due to width. For convenient
    if (screen.width <= 374) {
      _AgentInfo.adaptType = 0;
    } else if (screen.width <= 413) {
      _AgentInfo.adaptType = 1;
    } else {
      _AgentInfo.adaptType = 2;
    }
  }
}
_AgentInfo._init();

util.agentInfo = _AgentInfo;

/**
 * 上传操作日志
 * 操作类型　 type
 * 操作描述  desc
 */
util.uploadOperateLog = function (type, desc) {
  let data = {};
  data.type = type;
  data.description = desc;
  data.device_type = _AgentInfo.deviceType;
  data.browser_name = _AgentInfo.browserName;
  data.browser_version = _AgentInfo.browserVer;
  data.os_name = _AgentInfo.OSname
  Axios.post('/eop-node/api/user/uploadOperateLog', data).then((res) => {
    console.log(res)
  })
}

util.getWeekStartDate = function () {
  var weekStartDate;
  if (nowDayOfWeek == 0) {
    weekStartDate = new Date(nowYear, nowMonth, nowDay - nowDayOfWeek - 6);
  } else {
    weekStartDate = new Date(nowYear, nowMonth, nowDay - nowDayOfWeek + 1);
  }
  return util.dateFormat(weekStartDate, 'yyyy-MM-dd')
}

util.getYearStartDate = function () {
  //获得当前年份4位年
  var currentYear = now.getFullYear();
  //本年第一天
  var currentYearFirstDate = new Date(currentYear, 0, 1);
  return util.dateFormat(currentYearFirstDate, 'yyyy-MM-dd');
}

/**
 * 格式化金额为千分位显示
 */
util.toThousands = function (num) {
  if (num) {
    return num.toString().replace(/\d+/, function (n) {
      return n.replace(/(\d)(?=(\d{3})+$)/g, function ($1) {
        return $1 + ",";
      });
    });
  } else {
    return 0;
  }
}

/**
 * 小数转换为百分数
 */
util.toPercent = function (point) {
  var str = Number(point * 100).toFixed(2);
  str += "%";
  return str;
}

util.getDingtalkAppId = function () {
  let appList = {
    "cloud.eptison.com": "dingoaj6cka6ru8gug8fpb",
    "newwebuat.eptison.com": "dingoa7lebxh2ijfkzcxdy",
    "newweb.eptison.com": "dingoac8uglebjtgg5mv65",
    "localhost": "dingoauuxtdxsunkobfjkr",
  }

  let hostName = location.hostname
  return appList[hostName]
}

/**
 * 对菜单树遍历 返回需要的数据结构
 */
util.mapTree = function (org) {
  const haveChildren = Array.isArray(org.childrenResource) && org.childrenResource.length > 0;
  return {
    id: org.resourceId,
    label: org.resourceName,
    isLeaf: org.isLeaf,
    isDisabled: org.isLeaf == 0,
    children: haveChildren ? org.childrenResource.map(i => this.mapTree(i)) : []
  };
}

util.conversionStatus = function (data, type, value) {
  let newData;
  if (!value) {
    return ''
  }
  if (type == 'code') {
    data.map(x => {
      if (x.code == value) {
        newData = x.value;
      }
    })
  } else if (type == 'value') {
    data.map(x => {
      if (x.value == value) {
        newData = x.code;
      }
    })
  }
  return newData;
}

util.arrayToTree = function (data, id, pid) { //将ID、ParentID这种数据格式转换为树格式
  if (!data || !data.length) return [];
  var targetData = []; //存储数据的容器(返回) 
  var records = {};
  var itemLength = data.length; //数据集合的个数
  for (var i = 0; i < itemLength; i++) {
    var o = data[i];
    records[o[id]] = o;
  }
  for (var i = 0; i < itemLength; i++) {
    var currentData = data[i];
    var parentData = records[currentData[pid]];
    if (!parentData) {
      targetData.push(currentData);
      continue;
    }
    parentData.children = parentData.children || [];
    parentData.children.push(currentData);
  }
  return targetData;
}

/**
 * 获取页面操作按钮权限
 */
util.getButtonPermission = function (resourceName) {

  return Axios.post('/eop-node/api/sys/getButtonPermission', {
    resourceName: resourceName
  })
}

/**
 * 将部门转换为树形结构
 * @param {} data 
 */
util.arrayToDepartmentTree = function (data) {
  if (!data || !data.length) return [];
  var targetData = []; //存储数据的容器(返回) 
  var records = {};
  var itemLength = data.length;
  for (var i = 0; i < itemLength; i++) {
    var o = data[i];
    records[o['unit_path']] = o;
  }

  for (var i = 0; i < itemLength; i++) {
    var currentData = data[i];
    let len = currentData.unit_path.length
    var parentData = records[currentData.unit_path.substring(0, len - 4)];

    if (!parentData) {
      targetData.push(currentData);
      continue;
    }
    parentData.children = parentData.children || [];
    parentData.children.push(currentData);
  }
  return targetData
}

/**
 * 对象拼接成get参数
 */
util.serialize = function (obj) {
  var str = [];
  for (var p in obj)
    if (obj.hasOwnProperty(p) && obj[p]) {
      str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
    }
  return str.join("&");
}

util.toNumber = function (str) {

  let value = Number(str)

  if (isNaN(value)) {
    return 0
  } else {
    return value
  }
}

util.isRepeat = function (arr) {
  var hash = {};
  for (var i in arr) {
    if (hash[arr[i]])
      return true;
    hash[arr[i]] = true;
  }
  return false;
}

/**
 * 根据菜单路径获取 菜单名称
 */
util.getTitleByPath = function (path) {

  let userInfo = JSON.parse(window.sessionStorage.getItem('userinfo'));

  if (userInfo) {
    for (let item of userInfo.res.sysResourceList) {
      if (item.menuUrl == path) {
        return item.resourceName;
        break
      }
    }
  }
}

export default util;