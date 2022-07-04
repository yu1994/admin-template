import request from '@/utils/request'

export function articleTopAPI(data) {
  return request({
    url: '/news/article/top',
    method: 'put',
    data
  })
}

export function editPrevAPI(params) {
  return request({
    url: `/news/article/info/${params.id}/${true}`,
    params
  })
}

export function updatePrevAPI(data) {
  return request({
    url: `/news/article/update`,
    method: 'put',
    data
  })
}
