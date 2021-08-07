import axios from 'axios';
import store from '../store/index'


// 封装get请求
/**
 * @param {*} url 请求地址,必须
 * @param {*} data 请求参数,非必须
 */
const get = (url, data = {}) => {
  let token = store.state.token;
  return new Promise((resolve, reject) => {
    axios.get(url, {
      headers: {
        "user-token": token,
      },
      params: data
    }).then(res => {
      if (res.data.code == 666) {
        resolve(res.data);
      } else {
        reject(res.data.msg);
      }
    }).catch(err => {
      reject('请求失败, 请稍后再试~~');
    });
  })
}


// 封装 post 请求
/**
 * @param {*} url 请求地址,必须
 * @param {*} data 请求参数,非必须
 */

const post = (url, data = {}) => {
  let token = store.state.token;
  return new Promise((resolve, reject) => {
    axios.post(url, data, {
      headers: {
        "user-token": token,
      },
    }).then(res => {
      if (res.data.code == 666) {
        resolve(res.data);
      } else {
        reject(res.data.msg);
      }
    }).catch(err => {
      reject('网络请求失败，请稍后重试~~~')
    })
  })
}
export default {
  get,
  post
}