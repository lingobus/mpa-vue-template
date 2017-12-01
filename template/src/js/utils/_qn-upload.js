/**
 * 添加图片和视频上传功能
 */

import axios from 'axios'

/**
 * 上传文件
 * @param  {File} file
 * @param  {String} token
 * @param  {String} key
 * @return {Promise}
 */
function uploadFile (uploadUrl, file, token, key, onProgress) {
  const fd = new window.FormData()
  fd.append('file', file)
  fd.append('token', token)
  fd.append('key', key)
  if (typeof onProgress === 'function') {
    const config = {
      onUploadProgress (e /* progressEvent */) {
        if (onProgress) onProgress(Math.floor(e.loaded / e.total) * 100)
      }
    }
    return axios.post(uploadUrl, fd, config)
  } else {
    return axios.post(uploadUrl, fd)
  }
}

const QnUpload = {
  generateFileName (from, id, fileName) {
    var extension = fileName.substring(fileName.lastIndexOf('.'), fileName.length).toLowerCase(),
      uploadFilename = from + '-' + id + extension
    return uploadFilename
  },
  
  /**
   * Upload file to Qiniu
   * @param  {Function} getTokenFn
   * @param  {String} filename   [description]
   * @param  {File} file
   * @param  {Function} onProgress onProgress(percentage)
   * @return {Promise}
   * @remark
   *  QnUpload.upload(filename, e.target.files[0], (percentage) => {
   *    console.log(`upload ${percentage}%`)
   *  }).then((e) => {
   *    console.log('upload succ')
   *    console.log(e.data.url)
   *  }).catch((e) => {
   *    console.log('upload filed')
   *  })
   *
   */
  upload (getTokenFn, fileName, file, onProgress, opts = {}) {
    if (typeof opts.imageOpts == null) {
      opts.imageOpts = 'imageView2/w/120/h/120'
    }
    const imgOpts = opts.imageOpts ? `&${opts.imageOpts}` : ''
    return new Promise((resolve, reject) => {
      getTokenFn({ fileName }).then(data => {
        const token = data.token
        const url = data.url
        var key = [data.resourcePath, fileName].join('/')
        uploadFile(data.uploadPath, file, token, key, onProgress).then((e) => {
          if (!e.data) e.data = {}
          var imageUrl = [url, key].join('/') + '?t=' + Date.now() + imgOpts
          resolve(imageUrl)
        }).catch((e) => {
          reject(e, 'uploadFile')
        })
      }).catch((e) => {
        reject(e, 'getToken')
      })
    })
  }
}

export default QnUpload
