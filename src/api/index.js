import request from '@/utils/request';

export function action(url = '', params, method = 'get') {
  const obj = {
    url,
    method
  };
  method === 'get' ? obj.params = params : obj.data = params;
  return request(obj);
}

export function getAction(url = '', params) {
  return request({
    url,
    params
  });
}

export function putAction(url = '', data) {
  return request({
    url,
    method: 'put',
    data
  });
}

export function deleteAction(url = '', params) {
  return request({
    url,
    method: 'delete',
    params
  });
}


export function postAction(url = '', data) {
  return request({
    url,
    method: 'post',
    data
  });
}

/**
 * @description 文件上传
 * */

export function uploadFileAPI(url = '', params) {
  return request({
    url: '/minio/upload',
    method: 'post',
    params
  });
}

export function delFileAPI(params) {
  return request({
    url: '/minio/delete',
    method: 'post',
    params
  });
}

export function policy() {
  return request({
    url: '/aliyun/oss/policy',
    method: 'get'
  });
}
