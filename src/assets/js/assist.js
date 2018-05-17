

/**
 * 格式化日期
 * @param dat 日期对象
 * @param parttern 格式
 * @returns {*}
 */
function formatDate (dat, parttern) {
  if (!parttern || parttern === '') parttern = defaultDatePattern
  let o = {
    'M+': dat.getMonth() + 1, // 月份
    'd+': dat.getDate(), // 日
    'h+': dat.getHours() % 12 === 0 ? 12 : dat.getHours() % 12, // 小时
    'H+': dat.getHours(), // 小时
    'm+': dat.getMinutes(), // 分
    's+': dat.getSeconds(), // 秒
    'q+': Math.floor((dat.getMonth() + 3) / 3), // 季度
    'S': dat.getMilliseconds() // 毫秒
  };
  let week = {
    '0': '/u65e5',
    '1': '/u4e00',
    '2': '/u4e8c',
    '3': '/u4e09',
    '4': '/u56db',
    '5': '/u4e94',
    '6': '/u516d'
  };
  if (/(y+)/.test(parttern)) {
    parttern = parttern.replace(RegExp.$1, (dat.getFullYear() + '').substr(4 - RegExp.$1.length));
  }
  if (/(E+)/.test(parttern)) {
    parttern = parttern.replace(RegExp.$1, ((RegExp.$1.length > 1) ? (RegExp.$1.length > 2 ? '/u661f/u671f' : '/u5468') : '') + week[dat.getDay() + '']);
  }
  for (let k in o) {
    if (new RegExp('(' + k + ')').test(parttern)) {
      parttern = parttern.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)));
    }
  }
  return parttern;
}

export {formatDate}


const defaultDatePattern = 'yyyy-MM-dd'
/**
 * 解析日期字符串为日期Date对象
 * @param dateStr 字符串日期
 * @param pattern 日期格式
 * @returns {Date}
 */
function parseStrToDate (dateStr, pattern) {
  if (!pattern || pattern === '') pattern = defaultDatePattern
  let date = new Date()
  if (pattern.includes('yyyy')) { // 年份
    date.setFullYear(Number(dateStr.substr(pattern.indexOf('yyyy'), 4)))
  }
  if (pattern.includes('MM')) { // 月份
    date.setMonth(Number(dateStr.substr(pattern.indexOf('MM'), 2)) - 1)
  }
  if (pattern.includes('dd')) { // 天
    date.setDate(Number(dateStr.substr(pattern.indexOf('dd'), 2)))
  }
  if (pattern.includes('HH')) { // 小时
    date.setHours(Number(dateStr.substr(pattern.indexOf('HH'), 2)))
  }
  if (pattern.includes('mm')) { // 分钟
    date.setMinutes(Number(dateStr.substr(pattern.indexOf('mm'), 2)))
  }
  if (pattern.includes('ss')) { // 秒
    date.setSeconds(Number(dateStr.substr(pattern.indexOf('ss'), 2)))
  }
  if (pattern.includes('SSS')) { // 毫秒
    date.setMilliseconds(Number(dateStr.substr(pattern.indexOf('SSS'), 3)))
  }
  return date
}

export {parseStrToDate}