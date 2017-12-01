import dummy from 'utils/_1px_transparent_gif.js'
const CdnHost = 'files.{{host}}.com'
/**
 *
 * @param {String} url image url on Qiniu CDN
 * @param {Number} width desired image with
 * @param {Number} height desired image height
 * @param {Boolean} useDummy use 1px transparent gif if url is empty
 */
export default function resizeQnImg (url, width, height, useDummy ) {
  if (url) {
    //only resize image on Qiniu
    const joiner = url.indexOf('?') < 0 ? '?' : '&'
    return url.indexOf(CdnHost) < 0 ? url : `${url}${joiner}imageView2/2/w/${width}/h/${height}`
  } else {
    return useDummy ? dummy : ''
  }
}