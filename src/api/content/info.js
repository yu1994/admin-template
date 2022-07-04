import request from '@/utils/request'


export function queryUnitAPI(params, isClick = false) {
  return request({
    url: `/discloseinformation/article/info/${params.id}/${isClick}`,
    params
  })
}
