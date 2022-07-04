import request from '@/utils/request'


export function articleTopAPI(data) {
  return request({
    url: '/notice/article/top',
    method: 'put',
    data
  })
}

export function editPrevAPI(params) {
  return request({
    url: `/notice/article/info/${params.id}/${true}`,
    params
  })
}

export function updatePrevAPI(data) {
  return request({
    url: `/notice/article/update`,
    method: 'put',
    data
  })
}
