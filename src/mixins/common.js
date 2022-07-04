export default {
  methods: {
    /**
     * @description code码 转对应的 text中文值
     * @param list Array<Object>
     * @param val
     * @param key String
     * */
    transferText(list, val, key = 'value',) {
      if (Object.prototype.toString.call(list) === '[object Array]') {
        let temp = null;
        if (val !== null && val !== undefined) {
          temp = list.filter(item => String(item[key]) === String(val))[0];
        }
        return temp ? temp.label || temp.dictLabel: '---';
      } else return '----';
    },
    /**
     * @description Array 转 string
     * @param arr <Array>
     * @param sign <String>
     * */
    transferStr(arr, sign = ',') {
      if (Object.prototype.toString.call(arr) === '[object Array]') {
        return arr.join(sign);
      } return new Error('is not array');
    },
    /**
     * @description 传参的 时候 Array 转 string
     * @param obj <Object>
     * @param sign <String>
     * */
    transferMultiStr(obj, sign = ',') {
      const object = JSON.parse(JSON.stringify(obj));
      for (const i in object) {
        if (Object.prototype.toString.call(object[i]) === '[object Array]') {
          object[i] = this.transferStr(object[i], sign);
        }
      }
      return object;
    }
  }
};
