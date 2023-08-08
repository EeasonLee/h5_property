export const transformTime = (time: string) => {
  return time.substring(0, 4) + '年' + time.substring(4, 6) + '月';
};

export function handlePhoneSensitiveWords(text: string) {
  return text.slice(0, 3) + '****' + text.slice(7, 11);
}

/**
 * 判断是不是手机号
 * @param number
 * @returns {boolean}
 */
export function isMobile(number: string) {
  return /^1\d{10}$/.test(number + '');
}

export function toast(title: string) {
  uni.showToast({
    title,
    icon: 'none',
  });
}

export function bankCardToHide(text: string) {
  try {
    return text.replace(/^(\d{4}).+(\d{4})$/, '$1 **** **** $2');
  } catch (e) {
    return text;
  }
}

export const debounceFn = (fn: () => void, time: number) => {
  let timer: number;
  return function () {
    clearTimeout(timer);
    timer = setTimeout(() => {
      fn();
    }, time);
  };
};

/**
 * 解析路由参数
 * @param scene {string} 路由参数 例如"?name=jack&age=18"
 * @returns {Object} { name: 'jack', age: '18' }
 */
export const parseWechatUrlParams = (scene: string): { [key: string]: string } => {
  const str = decodeURIComponent(scene).replace('?', '&');
  let strArr = str.split('&');
  strArr = strArr.filter((item) => item);
  const result: { [key: string]: string } = {};
  strArr.forEach((item) => {
    const key = item.split('=');
    result[key[0]] = key[1];
  });
  return result;
};
