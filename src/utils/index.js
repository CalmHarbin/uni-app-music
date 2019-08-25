const utils = {}
// eslint-disable-next-line no-unused-vars
utils.install = function(Vue, options) {
    /*
        * 时间格式化
        * @method GetDateTime
        * @param {Object} dateObj 时间对象 new Date()
        * @param {string} format 格式 例如 'Y-m-d h:i:s'
        * @return {string}
        */
    (Vue.prototype.$GetDateTime = function(dateObj, format) {
        if (dateObj) {
            if (typeof dateObj === 'string') {
                let tempIndex = dateObj.lastIndexOf('.')
                if (tempIndex > -1) {
                    dateObj = dateObj.substring(0, tempIndex)
                }

                dateObj = dateObj.replace('T', ' ').replace(/-/g, '/')
            }
            let date = new Date(dateObj)

            let obj = {
                y: date.getFullYear(),
                m: date.getMonth() + 1,
                d: date.getDate(),
                h: date.getHours(),
                min: date.getMinutes(),
                s: date.getSeconds()
            }
            for (const key in obj) {
                if (obj.hasOwnProperty(key)) {
                    let element = obj[key]
                    obj[key] = element < 10 ? '0' + element : element
                }
            }
            if (format) {
                return format
                    .replace('Y', obj.y)
                    .replace('m', obj.m)
                    .replace('d', obj.d)
                    .replace('h', obj.h)
                    .replace('i', obj.min)
                    .replace('s', obj.s)
            }

            return (
                obj.y +
                '-' +
                obj.m +
                '-' +
                obj.d +
                ' ' +
                obj.h +
                ':' +
                obj.min +
                ':' +
                obj.s
            ) //返回时间格式
        } else return ''
    })
}
export default utils
